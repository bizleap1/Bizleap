import { assertPublicUrl } from "../../lib/seoAudit/security";
import { checkRateLimit, getClientIp } from "../../lib/seoAudit/rateLimit";
import { runOnPageAudit } from "../../lib/seoAudit/onPageAnalyzer";
import { runPageSpeedAudit } from "../../lib/seoAudit/lighthouseMapper";
import { recordLeadInExcel } from "../../lib/seoAudit/excelStore";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "16kb",
    },
  },
  maxDuration: 60,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

function sanitizeIndianPhone(rawPhone) {
  if (typeof rawPhone !== "string") return "";
  let cleaned = rawPhone.replace(/[\s\-().]/g, "");
  if (cleaned.startsWith("+91")) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith("0") && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
}

async function saveLeadToWebhook({ name, email, phone, website, seoScore = null, perfScore = null }) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const webhookSecret = process.env.LEADS_WEBHOOK_SECRET;

  if (!webhookUrl) {
    console.warn("[SEO Audit] LEADS_WEBHOOK_URL is not set; skipping lead webhook.");
    return false;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);

  try {
    const payload = {
      secret: webhookSecret || "",
      name,
      email,
      phone: `+91${phone}`,
      website,
      seoScore,
      perfScore,
      submittedAt: new Date().toISOString(),
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[SEO Audit] Lead webhook failed (${res.status}):`, body.slice(0, 300));
      return false;
    }

    return true;
  } catch (err) {
    console.error("[SEO Audit] Error saving lead to webhook:", err?.message || err);
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  // 1. Validate inputs server-side
  const { url: rawUrl, name: rawName, email: rawEmail, phone: rawPhone } = req.body || {};

  const name = typeof rawName === "string" ? rawName.trim() : "";
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  const phone = sanitizeIndianPhone(rawPhone);

  if (!name || name.length < 2 || name.length > 120) {
    return res.status(400).json({ error: "Please enter your full name." });
  }

  if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  if (!INDIAN_MOBILE_REGEX.test(phone)) {
    return res.status(400).json({
      error: "Please enter a valid 10-digit Indian mobile number.",
    });
  }

  // 2. Validate & SSRF-check target URL
  let validatedUrl;
  try {
    validatedUrl = await assertPublicUrl(rawUrl);
  } catch (err) {
    return res.status(400).json({
      error: err?.message || "Please enter a valid public website URL.",
    });
  }

  // 3. Rate limiting: max 5 audits per IP per hour
  const clientIp = getClientIp(req);
  const rate = checkRateLimit(clientIp);
  if (!rate.allowed) {
    res.setHeader("Retry-After", String(rate.retryAfterSec));
    return res.status(429).json({
      code: "RATE_LIMIT",
      error:
        "You've reached the limit of 5 free SEO audits per hour. Need immediate help? Call our team and we'll run a complete manual audit for you.",
    });
  }

  // 4. Run Google PageSpeed Insights (mobile + desktop) and On-Page HTML audit in parallel
  const apiKey = process.env.PAGESPEED_API_KEY;
  const [psiOutcome, onPageOutcome] = await Promise.allSettled([
    runPageSpeedAudit(validatedUrl, apiKey),
    runOnPageAudit(validatedUrl),
  ]);

  const psiData = psiOutcome.status === "fulfilled" ? psiOutcome.value : null;
  const onPageData = onPageOutcome.status === "fulfilled" ? onPageOutcome.value : null;

  if (psiOutcome.status === "rejected") {
    console.error("[SEO Audit] PageSpeed Insights error:", psiOutcome.reason?.message || psiOutcome.reason);
  }
  if (onPageOutcome.status === "rejected") {
    console.error("[SEO Audit] On-Page analyzer error:", onPageOutcome.reason?.message || onPageOutcome.reason);
  }

  const finalUrl = onPageData?.finalUrl || validatedUrl;

  // If both PSI and HTML analysis failed (or PSI failed completely), save the lead and return graceful fallback
  if (!psiData && !onPageData) {
    recordLeadInExcel({
      name,
      email,
      phone,
      website: finalUrl,
      seoScore: null,
      perfScore: null,
      status: "Manual Audit Required",
    });

    await saveLeadToWebhook({
      name,
      email,
      phone,
      website: finalUrl,
      seoScore: null,
      perfScore: null,
    });

    return res.status(502).json({
      code: "AUDIT_FAILED",
      leadSaved: true,
      url: finalUrl,
      error:
        "We couldn't fully analyze this website. Our team has received your request and will send you a manual audit shortly.",
    });
  }

  // If PSI failed completely, still save lead and return the graceful manual-audit message
  if (!psiData) {
    recordLeadInExcel({
      name,
      email,
      phone,
      website: finalUrl,
      seoScore: null,
      perfScore: null,
      status: "Manual Audit Required",
    });

    await saveLeadToWebhook({
      name,
      email,
      phone,
      website: finalUrl,
      seoScore: null,
      perfScore: null,
    });

    return res.status(502).json({
      code: "AUDIT_FAILED",
      leadSaved: true,
      url: finalUrl,
      error:
        "We couldn't fully analyze this website. Our team has received your request and will send you a manual audit shortly.",
    });
  }

  // Primary headline scores use Mobile (Google mobile-first indexing) with fallback to Desktop
  const headlineScores = {
    seo: psiData.scores.mobile.seo ?? psiData.scores.desktop.seo,
    performance: psiData.scores.mobile.performance ?? psiData.scores.desktop.performance,
    accessibility: psiData.scores.mobile.accessibility ?? psiData.scores.desktop.accessibility,
    bestPractices: psiData.scores.mobile.bestPractices ?? psiData.scores.desktop.bestPractices,
  };

  // Assemble categorized problem lists (NEGATIVES ONLY)
  const onPageGaps = onPageData?.onPageIssues || [];
  const technicalGaps = onPageData?.technicalIssues || [];
  const lighthouseIssues = psiData.failingAudits || [];

  const majorOnPageAndTechCritical = [...technicalGaps, ...onPageGaps].filter(
    (issue) => issue.severity === "critical"
  );
  const lighthouseCritical = lighthouseIssues.filter((issue) => issue.severity === "critical");
  const lighthouseWarnings = lighthouseIssues.filter((issue) => issue.severity === "warning");

  const criticalIssues = [...majorOnPageAndTechCritical, ...lighthouseCritical];
  const warnings = [...lighthouseWarnings];

  // Count unique critical & warning issues across all findings for Executive Summary
  const allUniqueIssues = new Map();
  for (const item of [...criticalIssues, ...warnings, ...onPageGaps, ...technicalGaps]) {
    if (!allUniqueIssues.has(item.id)) {
      allUniqueIssues.set(item.id, item);
    }
  }

  let criticalCount = 0;
  let warningCount = 0;
  for (const item of allUniqueIssues.values()) {
    if (item.severity === "critical") criticalCount += 1;
    else warningCount += 1;
  }

  // Record lead in backend Excel sheet
  recordLeadInExcel({
    name,
    email,
    phone,
    website: finalUrl,
    seoScore: headlineScores.seo,
    perfScore: headlineScores.performance,
    status: "Completed",
  });

  // Save lead with audit scores BEFORE returning response (single clean webhook POST)
  const leadSaved = await saveLeadToWebhook({
    name,
    email,
    phone,
    website: finalUrl,
    seoScore: headlineScores.seo,
    perfScore: headlineScores.performance,
  });

  return res.status(200).json({
    url: finalUrl,
    preparedFor: name,
    generatedAt: new Date().toISOString(),
    leadSaved,
    scores: headlineScores,
    scoresByDevice: psiData.scores,
    summary: {
      criticalCount,
      warningCount,
      totalIssues: criticalCount + warningCount,
    },
    criticalIssues,
    warnings,
    coreWebVitalsProblems: psiData.coreWebVitalsProblems || [],
    onPageGaps,
    technicalGaps,
  });
}
