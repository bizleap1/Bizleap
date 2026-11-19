"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { Poppins } from "next/font/google";
import {
  FiGlobe,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiLock,
  FiPhone,
  FiAlertTriangle,
  FiRefreshCw,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import SeoAuditReport from "../components/SeoAuditReport";
import { trackEvent } from "../lib/analytics";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const LOADING_MESSAGES = [
  "Crawling your website…",
  "Checking meta tags…",
  "Testing mobile speed…",
  "Analyzing Core Web Vitals…",
  "Finding SEO gaps…",
  "Preparing your report…",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

function cleanIndianPhone(raw) {
  let cleaned = (raw || "").replace(/[\s\-().]/g, "");
  if (cleaned.startsWith("+91")) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith("0") && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
}

function validateAndNormalizeClientUrl(rawInput) {
  const trimmed = (rawInput || "").trim();
  if (!trimmed) {
    return { error: "Please paste your website link to continue." };
  }

  const withProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let parsed;
  try {
    parsed = new URL(withProtocol);
  } catch {
    return { error: "Please enter a valid website URL (e.g. https://yourwebsite.com)." };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { error: "Only http:// and https:// website links are supported." };
  }

  const host = parsed.hostname.toLowerCase();
  if (
    !host ||
    host === "localhost" ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host.endsWith(".localhost") ||
    /^127\./.test(host) ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^169\.254\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(host) ||
    host === "::1" ||
    host === "[::1]"
  ) {
    return { error: "Please enter a live public website URL (local or private addresses cannot be audited)." };
  }

  if (!host.includes(".") || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(host)) {
    return { error: "Please enter a valid public domain name (e.g. https://yourwebsite.com)." };
  }

  return { url: parsed.toString() };
}

export default function FreeSeoAuditPage() {
  // steps: 1 (URL), 2 (Lead Capture), 3 (Loading), 4 (Report), "error" (Failure / Rate Limit)
  const [step, setStep] = useState(1);

  // Step 1 state
  const [urlInput, setUrlInput] = useState("");
  const [normalizedUrl, setNormalizedUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  // Step 2 state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Step 3 loading state
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [progressPct, setProgressPct] = useState(12);

  // Result / Error state
  const [report, setReport] = useState(null);
  const [errorState, setErrorState] = useState(null); // { code, message, url }

  const reportTrackedRef = useRef(false);

  // Rotate loading messages while auditing
  useEffect(() => {
    if (step !== 3) return;

    setLoadingMsgIndex(0);
    setProgressPct(12);

    const msgTimer = setInterval(() => {
      setLoadingMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 4200);

    const progTimer = setInterval(() => {
      setProgressPct((prev) => (prev < 92 ? prev + 3 : prev));
    }, 1000);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progTimer);
    };
  }, [step]);

  // Fire analytics event when report is viewed
  useEffect(() => {
    if (step === 4 && report && !reportTrackedRef.current) {
      reportTrackedRef.current = true;
      trackEvent("seo_audit_report_viewed", {
        website: report.url,
        seo_score: report.scores?.seo ?? undefined,
        perf_score: report.scores?.performance ?? undefined,
        critical_issues: report.summary?.criticalCount ?? 0,
        warnings: report.summary?.warningCount ?? 0,
      });
    }
  }, [step, report]);

  const handleStep1Submit = (e) => {
    e.preventDefault();
    const result = validateAndNormalizeClientUrl(urlInput);
    if (result.error) {
      setUrlError(result.error);
      return;
    }
    setUrlError("");
    setNormalizedUrl(result.url);
    setUrlInput(result.url);
    setStep(2);
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();

    const errors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const cleanedPhone = cleanIndianPhone(phone);

    if (!trimmedName || trimmedName.length < 2) {
      errors.name = "Please enter your full name.";
    }
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!INDIAN_MOBILE_REGEX.test(cleanedPhone)) {
      errors.phone = "Enter a valid 10-digit Indian mobile number (starts with 6–9).";
    }
    if (!consent) {
      errors.consent = "Please agree to be contacted by Bizleap about your audit results.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setErrorState(null);
    reportTrackedRef.current = false;

    trackEvent("seo_audit_lead_submitted", {
      website: normalizedUrl,
    });

    setStep(3);

    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: normalizedUrl,
          name: trimmedName,
          email: trimmedEmail,
          phone: cleanedPhone,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 400) {
          setFormErrors({ server: data.error || "Please check your details and try again." });
          setStep(2);
          return;
        }

        setErrorState({
          code: data.code || (res.status === 429 ? "RATE_LIMIT" : "AUDIT_FAILED"),
          message:
            data.error ||
            "We couldn't fully analyze this website. Our team has received your request and will send you a manual audit shortly.",
          url: data.url || normalizedUrl,
        });
        setStep("error");
        return;
      }

      setProgressPct(100);
      setReport(data);
      setStep(4);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setErrorState({
        code: "AUDIT_FAILED",
        message:
          "We couldn't fully analyze this website. Our team has received your request and will send you a manual audit shortly.",
        url: normalizedUrl,
      });
      setStep("error");
    }
  };

  const handleReset = () => {
    setStep(1);
    setUrlInput("");
    setNormalizedUrl("");
    setUrlError("");
    setFormErrors({});
    setReport(null);
    setErrorState(null);
    reportTrackedRef.current = false;
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const activeProgressStep = step === 4 || step === "error" ? 3 : step;

  const errorWhatsappHref = `https://wa.me/917097095152?text=${encodeURIComponent(
    `Hi Bizleap, I requested a free SEO audit for ${errorState?.url || normalizedUrl || "my website"}`
  )}`;

  const handleErrorCallClick = (phoneLabel) => {
    trackEvent("cta_call_clicked", {
      phone: phoneLabel,
      audited_url: errorState?.url || normalizedUrl,
      source: "seo_audit_error",
    });
  };

  return (
    <>
      <Head>
        <title key="title">Free SEO Audit Tool | Check Your Website SEO Score – Bizleap</title>
        <meta
          name="description"
          content="Run a free instant website SEO audit with Bizleap. Uncover critical SEO issues, Core Web Vitals problems, and on-page gaps hurting your Google rankings."
          key="description"
        />
        <link rel="canonical" href="https://www.bizleap.in/free-seo-audit" />
        <meta
          property="og:title"
          content="Free SEO Audit Tool | Check Your Website SEO Score – Bizleap"
          key="og:title"
        />
        <meta
          property="og:description"
          content="Find out what's hurting your website's Google rankings. Get a free SEO & Core Web Vitals audit report from Bizleap."
          key="og:description"
        />
        <meta property="og:url" content="https://www.bizleap.in/free-seo-audit" key="og:url" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:image" content="https://bizleap.in/og-image.png" key="og:image" />
        <meta
          name="twitter:title"
          content="Free SEO Audit Tool | Check Your Website SEO Score – Bizleap"
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content="Find out what's hurting your website's Google rankings with Bizleap's free SEO audit tool."
          key="twitter:description"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Bizleap Free SEO Audit Tool",
              url: "https://www.bizleap.in/free-seo-audit",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
              },
              provider: {
                "@type": "Organization",
                name: "Bizleap",
                url: "https://bizleap.in",
              },
            }),
          }}
        />
      </Head>

      <div
        className={`seo-audit-page-shell min-h-screen bg-black text-white pt-32 sm:pt-36 pb-28 sm:pb-24 px-4 sm:px-6 ${poppins.className}`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator (shown during Steps 1–3) */}
          {step !== 4 && (
            <nav aria-label="Audit progress" className="max-w-xl mx-auto mb-10 print:hidden">
              <ol className="flex items-center justify-between gap-2">
                {[
                  { num: 1, label: "Website URL" },
                  { num: 2, label: "Your Details" },
                  { num: 3, label: "SEO Audit" },
                ].map((item, idx) => {
                  const isCompleted = activeProgressStep > item.num;
                  const isCurrent = activeProgressStep === item.num;
                  return (
                    <li key={item.num} className="flex items-center flex-1 last:flex-none">
                      <div className="flex items-center gap-2.5">
                        <span
                          aria-current={isCurrent ? "step" : undefined}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors shrink-0 ${
                            isCompleted
                              ? "bg-[#FFD600] border-[#FFD600] text-black"
                              : isCurrent
                              ? "bg-[#FFD600] border-[#FFD600] text-black"
                              : "bg-white/5 border-white/15 text-neutral-400"
                          }`}
                        >
                          {isCompleted ? <FiCheck className="w-4 h-4" /> : item.num}
                        </span>
                        <span
                          className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
                            isCurrent || isCompleted ? "text-white" : "text-neutral-500"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {idx < 2 && (
                        <div
                          aria-hidden="true"
                          className={`h-px flex-1 mx-3 transition-colors ${
                            activeProgressStep > item.num ? "bg-[#FFD600]" : "bg-white/15"
                          }`}
                        />
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          {/* STEP 1 — URL Input */}
          {step === 1 && (
            <section className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <p className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFD600] mb-3">
                  100% Free Website Audit
                </p>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight !font-sans">
                  Find Out What&apos;s Hurting Your Website&apos;s Rankings
                </h1>
                <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
                  Get a live Google Lighthouse, Core Web Vitals, technical, and on-page SEO audit uncovering every gap costing you traffic and leads.
                </p>
              </div>

              <form
                onSubmit={handleStep1Submit}
                noValidate
                className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl"
              >
                <label
                  htmlFor="audit-url"
                  className="block text-sm font-semibold text-white mb-2.5"
                >
                  Paste your website link
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <FiGlobe
                      aria-hidden="true"
                      className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                    <input
                      id="audit-url"
                      name="url"
                      type="text"
                      inputMode="url"
                      autoComplete="url"
                      placeholder="https://yourwebsite.com"
                      value={urlInput}
                      onChange={(e) => {
                        setUrlInput(e.target.value);
                        if (urlError) setUrlError("");
                      }}
                      aria-invalid={Boolean(urlError)}
                      aria-describedby={urlError ? "audit-url-error" : undefined}
                      className="w-full pl-11 pr-4 py-4 rounded-xl bg-black border border-white/15 text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/30 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#FFD600] hover:bg-yellow-400 text-black font-bold text-sm sm:text-base whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    Start Free Audit
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {urlError && (
                  <p id="audit-url-error" role="alert" className="mt-3 text-sm text-red-400 font-medium">
                    {urlError}
                  </p>
                )}

                <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[#FFD600] shrink-0" />
                    <span>Mobile &amp; Desktop Speed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[#FFD600] shrink-0" />
                    <span>Core Web Vitals Check</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[#FFD600] shrink-0" />
                    <span>On-Page &amp; Technical Gaps</span>
                  </div>
                </div>
              </form>
            </section>
          )}

          {/* STEP 2 — Mandatory Lead Capture */}
          {step === 2 && (
            <section className="max-w-xl mx-auto">
              <div className="text-center mb-7">
                <p className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFD600] mb-2">
                  Step 2 of 3
                </p>
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white !font-sans">
                  Where Should We Prepare Your Report?
                </h1>
                <p className="mt-2.5 text-sm text-neutral-400">
                  Auditing{" "}
                  <span className="text-[#FFD600] font-medium break-all">{normalizedUrl}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white underline underline-offset-4 transition-colors"
                >
                  <FiArrowLeft className="w-3.5 h-3.5" />
                  Change website link
                </button>
              </div>

              <form
                onSubmit={handleStep2Submit}
                noValidate
                className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl"
              >
                {formErrors.server && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300"
                  >
                    {formErrors.server}
                  </div>
                )}

                <div>
                  <label htmlFor="lead-name" className="block text-sm font-medium text-neutral-200 mb-1.5">
                    Full Name <span className="text-[#FFD600]">*</span>
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    aria-invalid={Boolean(formErrors.name)}
                    aria-describedby={formErrors.name ? "lead-name-error" : undefined}
                    className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/30 transition-colors"
                  />
                  {formErrors.name && (
                    <p id="lead-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lead-email" className="block text-sm font-medium text-neutral-200 mb-1.5">
                    Email Address <span className="text-[#FFD600]">*</span>
                  </label>
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    aria-invalid={Boolean(formErrors.email)}
                    aria-describedby={formErrors.email ? "lead-email-error" : undefined}
                    className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/30 transition-colors"
                  />
                  {formErrors.email && (
                    <p id="lead-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lead-phone" className="block text-sm font-medium text-neutral-200 mb-1.5">
                    Phone Number (India) <span className="text-[#FFD600]">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-xl bg-white/5 border border-r-0 border-white/15 text-sm text-neutral-300 font-medium">
                      +91
                    </span>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      required
                      autoComplete="tel-national"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (formErrors.phone) setFormErrors((prev) => ({ ...prev, phone: "" }));
                      }}
                      aria-invalid={Boolean(formErrors.phone)}
                      aria-describedby={formErrors.phone ? "lead-phone-error" : undefined}
                      className="w-full px-4 py-3.5 rounded-r-xl bg-black border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/30 transition-colors"
                    />
                  </div>
                  {formErrors.phone && (
                    <p id="lead-phone-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      id="lead-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (formErrors.consent) setFormErrors((prev) => ({ ...prev, consent: "" }));
                      }}
                      aria-invalid={Boolean(formErrors.consent)}
                      aria-describedby={formErrors.consent ? "lead-consent-error" : undefined}
                      className="mt-0.5 w-4 h-4 rounded accent-[#FFD600] focus:ring-2 focus:ring-[#FFD600] shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      I agree to be contacted by Bizleap about my audit results.
                    </span>
                  </label>
                  {formErrors.consent && (
                    <p id="lead-consent-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {formErrors.consent}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#FFD600] hover:bg-yellow-400 text-black font-bold text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Generate My Free Report
                  <FiArrowRight className="w-4 h-4" />
                </button>

                <p className="flex items-center justify-center gap-1.5 text-xs text-neutral-500 pt-1">
                  <FiLock className="w-3.5 h-3.5" />
                  Your details are kept confidential and used only for your SEO audit.
                </p>
              </form>
            </section>
          )}

          {/* STEP 3 — Engaging Loading State */}
          {step === 3 && (
            <section
              role="status"
              aria-live="polite"
              aria-busy="true"
              className="max-w-xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 sm:p-12 text-center shadow-xl"
            >
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#FFD600] animate-spin" />
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-white !font-sans">
                {LOADING_MESSAGES[loadingMsgIndex]}
              </h1>
              <p className="mt-2 text-sm text-neutral-400 break-all">
                Running live Mobile &amp; Desktop checks on{" "}
                <span className="text-[#FFD600] font-medium">{normalizedUrl}</span>
              </p>

              {/* Progress Bar */}
              <div className="mt-7 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFD600] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <p className="mt-4 text-xs text-neutral-500">
                Deep Google Lighthouse + HTML analysis typically takes 15–40 seconds. Please keep this tab open.
              </p>

              <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-xs text-neutral-400">
                {LOADING_MESSAGES.map((msg, idx) => {
                  const done = idx < loadingMsgIndex;
                  const active = idx === loadingMsgIndex;
                  return (
                    <li
                      key={msg}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                        active
                          ? "border-[#FFD600]/40 bg-[#FFD600]/10 text-[#FFD600] font-medium"
                          : done
                          ? "border-white/5 bg-white/[0.02] text-neutral-300"
                          : "border-white/5 text-neutral-600"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          active ? "bg-[#FFD600] animate-pulse" : done ? "bg-neutral-400" : "bg-neutral-700"
                        }`}
                      />
                      <span>{msg}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* ERROR / RATE LIMIT STATE */}
          {step === "error" && errorState && (
            <section className="max-w-2xl mx-auto">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-7 sm:p-10 text-center shadow-xl">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#FFD600]/10 border border-[#FFD600]/30 flex items-center justify-center">
                  <FiAlertTriangle className="w-7 h-7 text-[#FFD600]" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-white !font-sans">
                  {errorState.code === "RATE_LIMIT"
                    ? "Hourly Audit Limit Reached"
                    : "Manual Audit Request Received"}
                </h1>

                <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-lg mx-auto leading-relaxed">
                  {errorState.message}
                </p>

                <div className="mt-8 pt-7 border-t border-white/10">
                  <p className="text-sm font-semibold text-[#FFD600] mb-4">
                    Call Us — Open 24 hours, 7 days a week.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href="tel:+917097095152"
                      onClick={() => handleErrorCallClick("+91 70970 95152")}
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#FFD600] hover:bg-yellow-400 text-black font-bold text-sm sm:text-base transition-colors"
                    >
                      <FiPhone className="w-4 h-4 shrink-0" />
                      +91 70970 95152
                    </a>
                    <a
                      href="tel:+919307198119"
                      onClick={() => handleErrorCallClick("+91 93071 98119")}
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#FFD600] hover:bg-yellow-400 text-black font-bold text-sm sm:text-base transition-colors"
                    >
                      <FiPhone className="w-4 h-4 shrink-0" />
                      +91 93071 98119
                    </a>
                  </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={errorWhatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-sm transition-colors"
                    >
                      <FaWhatsapp className="w-4 h-4 shrink-0" />
                      Chat on WhatsApp
                    </a>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition-colors"
                    >
                      Book a Free Consultation
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 inline-flex items-center gap-2 text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <FiRefreshCw className="w-3.5 h-3.5" />
                    Try Another Website
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* STEP 4 — A4 Report */}
          {step === 4 && report && (
            <SeoAuditReport
              report={report}
              onReset={handleReset}
              fontClassName={poppins.className}
            />
          )}
        </div>
      </div>
    </>
  );
}
