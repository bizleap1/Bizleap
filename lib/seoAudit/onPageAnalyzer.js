import * as cheerio from "cheerio";
import { safeFetch } from "./security";

function isRobotsBlockingAll(robotsText) {
  if (!robotsText) return false;
  const lines = robotsText
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*$/, "").trim())
    .filter(Boolean);

  let appliesToAll = false;
  for (const line of lines) {
    const match = line.match(/^([^:]+):\s*(.*)$/i);
    if (!match) continue;
    const directive = match[1].trim().toLowerCase();
    const value = match[2].trim();

    if (directive === "user-agent") {
      appliesToAll = value === "*";
    } else if (appliesToAll && directive === "disallow" && value === "/") {
      return true;
    }
  }
  return false;
}

function checkHeadingHierarchy($) {
  const levels = [];
  $("h1, h2, h3, h4, h5, h6").each((_, el) => {
    const tag = (el.tagName || el.name || "").toLowerCase();
    const level = Number(tag.replace("h", ""));
    if (level >= 1 && level <= 6) {
      levels.push(level);
    }
  });

  const skipped = [];
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      skipped.push(`H${levels[i - 1]} → H${levels[i]}`);
    }
  }
  return {
    skipped: Array.from(new Set(skipped)).slice(0, 4),
  };
}

/**
 * Fetches page HTML, robots.txt, and sitemap.xml, and flags ONLY problems.
 */
export async function runOnPageAudit(targetUrl) {
  const onPageIssues = [];
  const technicalIssues = [];

  // 1. Fetch main page HTML (10s timeout, max 3 redirects, max 2MB)
  const pageRes = await safeFetch(targetUrl, {
    timeoutMs: 10000,
    maxRedirects: 3,
    maxBytes: 2 * 1024 * 1024,
  });

  if (!pageRes.ok && pageRes.status >= 400) {
    throw new Error(`Website returned HTTP status ${pageRes.status}.`);
  }

  const finalUrl = pageRes.finalUrl;
  const parsedFinal = new URL(finalUrl);
  const origin = parsedFinal.origin;

  // Fetch robots.txt and sitemap.xml in parallel
  const [robotsResult, sitemapResult] = await Promise.all([
    safeFetch(`${origin}/robots.txt`, {
      timeoutMs: 6000,
      maxRedirects: 2,
      maxBytes: 256 * 1024,
      accept: "text/plain,*/*",
    }).catch(() => null),
    safeFetch(`${origin}/sitemap.xml`, {
      timeoutMs: 6000,
      maxRedirects: 2,
      maxBytes: 512 * 1024,
      accept: "application/xml,text/xml,*/*",
    }).catch(() => null),
  ]);

  const $ = cheerio.load(pageRes.text || "");

  // --- TECHNICAL CHECK: HTTPS ---
  if (parsedFinal.protocol !== "https:") {
    technicalIssues.push({
      id: "not-https",
      title: "Website Is Not Secured With HTTPS",
      whyItHurts:
        "Google treats non-HTTPS websites as insecure, displaying browser warnings that drive visitors away immediately and suppressing search rankings.",
      impact: "High",
      severity: "critical",
      category: "technical",
      detail: `Loaded over ${parsedFinal.protocol}`,
    });
  }

  // --- TECHNICAL CHECK: Noindex meta tag or X-Robots-Tag ---
  const robotsMetaContent = [];
  $('meta[name="robots"], meta[name="googlebot"]').each((_, el) => {
    const content = ($(el).attr("content") || "").toLowerCase();
    if (content) robotsMetaContent.push(content);
  });
  const xRobotsHeader = (pageRes.headers?.get("x-robots-tag") || "").toLowerCase();
  const hasNoindex =
    robotsMetaContent.some((c) => c.includes("noindex")) || xRobotsHeader.includes("noindex");

  if (hasNoindex) {
    technicalIssues.push({
      id: "noindex-present",
      title: "Page Is Blocked From Google Search (Noindex Tag Detected)",
      whyItHurts:
        "A noindex directive instructs Google to completely remove this page from search results, eliminating all organic traffic potential.",
      impact: "High",
      severity: "critical",
      category: "technical",
      detail: "noindex directive found in page meta tags or HTTP headers",
    });
  }

  // --- TECHNICAL CHECK: robots.txt ---
  if (!robotsResult || !robotsResult.ok || robotsResult.status === 404) {
    technicalIssues.push({
      id: "robots-missing",
      title: "Missing robots.txt File",
      whyItHurts:
        "Without a robots.txt file, search engine crawlers lack clear crawl instructions, wasting crawl budget and risking indexing of unwanted URLs.",
      impact: "Medium",
      severity: "warning",
      category: "technical",
      detail: `${origin}/robots.txt returned ${robotsResult ? `HTTP ${robotsResult.status}` : "no response"}`,
    });
  } else if (isRobotsBlockingAll(robotsResult.text)) {
    technicalIssues.push({
      id: "robots-blocking-all",
      title: "robots.txt Is Blocking Search Engines From Crawling Your Site",
      whyItHurts:
        "Your robots.txt contains a site-wide Disallow rule that prevents Google from crawling and ranking your pages, costing you organic visibility.",
      impact: "High",
      severity: "critical",
      category: "technical",
      detail: "User-agent: * paired with Disallow: /",
    });
  }

  // --- TECHNICAL CHECK: sitemap.xml ---
  if (!sitemapResult || !sitemapResult.ok || sitemapResult.status === 404) {
    technicalIssues.push({
      id: "sitemap-missing",
      title: "Missing XML Sitemap (/sitemap.xml)",
      whyItHurts:
        "Without an XML sitemap, Google struggles to discover and index your new or deeper service pages quickly, slowing down organic growth.",
      impact: "Medium",
      severity: "warning",
      category: "technical",
      detail: `${origin}/sitemap.xml returned ${sitemapResult ? `HTTP ${sitemapResult.status}` : "no response"}`,
    });
  }

  // --- TECHNICAL CHECK: Canonical tag ---
  const canonicalHref = ($('link[rel="canonical"]').first().attr("href") || "").trim();
  if (!canonicalHref) {
    technicalIssues.push({
      id: "canonical-missing",
      title: "Missing Canonical Tag",
      whyItHurts:
        "Without a canonical URL, search engines can split ranking signals across duplicate URL versions, weakening your main page's ranking strength.",
      impact: "Medium",
      severity: "warning",
      category: "technical",
    });
  }

  // --- TECHNICAL CHECK: Structured data (JSON-LD) ---
  const jsonLdScripts = $('script[type="application/ld+json"]');
  let hasValidJsonLd = false;
  jsonLdScripts.each((_, el) => {
    const raw = $(el).html()?.trim();
    if (raw && raw.length > 2) {
      hasValidJsonLd = true;
    }
  });
  if (!hasValidJsonLd) {
    technicalIssues.push({
      id: "structured-data-missing",
      title: "No Structured Data (Schema Markup) Found",
      whyItHurts:
        "Your site is missing JSON-LD schema markup, preventing Google from understanding your business entities and disqualifying you from rich search results.",
      impact: "Medium",
      severity: "warning",
      category: "technical",
    });
  }

  // --- ON-PAGE CHECK: Title tag ---
  const titleText = $("title").first().text().replace(/\s+/g, " ").trim();
  if (!titleText) {
    onPageIssues.push({
      id: "title-missing",
      title: "Missing Page Title Tag",
      whyItHurts:
        "Your title tag is the single strongest on-page ranking signal and the headline users see on Google; missing it severely hurts both rankings and clicks.",
      impact: "High",
      severity: "critical",
      category: "onpage",
    });
  } else if (titleText.length < 30) {
    onPageIssues.push({
      id: "title-too-short",
      title: "Page Title Tag Is Too Short",
      whyItHurts:
        "A short title fails to target high-intent search keywords and looks less compelling on Google search results, reducing click-through rates.",
      impact: "Medium",
      severity: "warning",
      category: "onpage",
      detail: `Current length: ${titleText.length} characters (recommended: 30–60)`,
    });
  } else if (titleText.length > 60) {
    onPageIssues.push({
      id: "title-too-long",
      title: "Page Title Tag Is Too Long",
      whyItHurts:
        "Google truncates overly long titles in search results, cutting off key messaging and lowering clicks from potential customers.",
      impact: "Medium",
      severity: "warning",
      category: "onpage",
      detail: `Current length: ${titleText.length} characters (recommended: 30–60)`,
    });
  }

  // --- ON-PAGE CHECK: Meta description ---
  const metaDesc = ($('meta[name="description"]').first().attr("content") || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!metaDesc) {
    onPageIssues.push({
      id: "meta-description-missing",
      title: "Missing Meta Description",
      whyItHurts:
        "Without a meta description, Google pulls random page snippets that rarely persuade searchers to click, costing you qualified organic leads.",
      impact: "High",
      severity: "critical",
      category: "onpage",
    });
  } else if (metaDesc.length < 70) {
    onPageIssues.push({
      id: "meta-description-short",
      title: "Meta Description Is Too Short",
      whyItHurts:
        "An under-written meta description misses valuable space to communicate your offer and attract clicks over competing search listings.",
      impact: "Medium",
      severity: "warning",
      category: "onpage",
      detail: `Current length: ${metaDesc.length} characters (recommended: 70–160)`,
    });
  } else if (metaDesc.length > 160) {
    onPageIssues.push({
      id: "meta-description-long",
      title: "Meta Description Exceeds Recommended Length",
      whyItHurts:
        "Google cuts off descriptions longer than 160 characters, hiding your call-to-action and weakening click-through rates.",
      impact: "Medium",
      severity: "warning",
      category: "onpage",
      detail: `Current length: ${metaDesc.length} characters (recommended: 70–160)`,
    });
  }

  // --- ON-PAGE CHECK: H1 & Heading Hierarchy ---
  const h1Elements = $("h1");
  const h1Count = h1Elements.length;
  if (h1Count === 0) {
    onPageIssues.push({
      id: "h1-missing",
      title: "Missing Main Heading (H1 Tag)",
      whyItHurts:
        "Search engines rely on the H1 tag to understand the primary topic of your page; missing it weakens keyword relevance and ranking potential.",
      impact: "High",
      severity: "critical",
      category: "onpage",
    });
  } else if (h1Count > 1) {
    onPageIssues.push({
      id: "h1-multiple",
      title: `Multiple H1 Headings Detected (${h1Count} Found)`,
      whyItHurts:
        "Using multiple H1 tags dilutes topical focus and confuses search engines about the primary keyword your page should rank for.",
      impact: "Medium",
      severity: "warning",
      category: "onpage",
      detail: `${h1Count} H1 tags present on the page`,
    });
  }

  const { skipped } = checkHeadingHierarchy($);
  if (skipped.length > 0) {
    onPageIssues.push({
      id: "heading-hierarchy-skipped",
      title: "Broken Heading Hierarchy (Skipped Heading Levels)",
      whyItHurts:
        "Skipping heading levels weakens content structure for both Google crawlers and visitors, hurting accessibility and topical clarity.",
      impact: "Medium",
      severity: "warning",
      category: "onpage",
      detail: `Skipped transitions: ${skipped.join(", ")}`,
    });
  }

  // --- ON-PAGE CHECK: Images missing alt text ---
  const missingAltSrcs = [];
  let missingAltCount = 0;
  $("img").each((_, el) => {
    const alt = $(el).attr("alt");
    if (alt === undefined || alt.trim() === "") {
      missingAltCount += 1;
      if (missingAltSrcs.length < 10) {
        const src =
          $(el).attr("src") ||
          $(el).attr("data-src") ||
          $(el).attr("srcset")?.split(",")[0]?.trim().split(" ")[0] ||
          "(inline/missing src)";
        missingAltSrcs.push(src);
      }
    }
  });

  if (missingAltCount > 0) {
    onPageIssues.push({
      id: "images-missing-alt",
      title: `${missingAltCount} Image${missingAltCount === 1 ? "" : "s"} Missing Alt Text`,
      whyItHurts:
        "Images without alt text are invisible to Google Image Search and screen readers, costing you visual search traffic and accessibility scores.",
      impact: missingAltCount >= 5 ? "High" : "Medium",
      severity: missingAltCount >= 5 ? "critical" : "warning",
      category: "onpage",
      detail: `${missingAltCount} image${missingAltCount === 1 ? "" : "s"} missing descriptive alt attributes`,
      items: missingAltSrcs,
    });
  }

  // --- ON-PAGE CHECK: Open Graph & Twitter Card tags ---
  const missingSocial = [];
  if (!($('meta[property="og:title"]').attr("content") || "").trim()) missingSocial.push("og:title");
  if (!($('meta[property="og:description"]').attr("content") || "").trim()) missingSocial.push("og:description");
  if (!($('meta[property="og:image"]').attr("content") || "").trim()) missingSocial.push("og:image");
  if (!($('meta[name="twitter:card"]').attr("content") || "").trim()) missingSocial.push("twitter:card");

  if (missingSocial.length > 0) {
    onPageIssues.push({
      id: "social-meta-missing",
      title: "Incomplete Social Sharing Tags (Open Graph / Twitter Cards)",
      whyItHurts:
        "When your link is shared on WhatsApp, LinkedIn, or X, missing social tags cause broken or plain previews that drastically reduce referral clicks.",
      impact: "Medium",
      severity: "warning",
      category: "onpage",
      detail: `Missing: ${missingSocial.join(", ")}`,
    });
  }

  // --- ON-PAGE CHECK: Meta viewport ---
  const viewport = ($('meta[name="viewport"]').attr("content") || "").trim();
  if (!viewport) {
    onPageIssues.push({
      id: "viewport-missing",
      title: "Missing Mobile Viewport Meta Tag",
      whyItHurts:
        "Without a viewport tag, your website fails Google's mobile-friendliness standards and displays poorly on phones where most visitors browse.",
      impact: "High",
      severity: "critical",
      category: "onpage",
    });
  }

  // --- ON-PAGE CHECK: HTML lang attribute ---
  const htmlLang = ($("html").attr("lang") || "").trim();
  if (!htmlLang) {
    onPageIssues.push({
      id: "html-lang-missing",
      title: "Missing Language Attribute on HTML Tag",
      whyItHurts:
        "Omitting the lang attribute makes it harder for search engines to match your content to the right regional audience and degrades accessibility.",
      impact: "Medium",
      severity: "warning",
      category: "onpage",
    });
  }

  // --- ON-PAGE CHECK: Low word count (< 300 visible words) ---
  const $clone = cheerio.load(pageRes.text || "");
  $clone("script, style, noscript, svg, template, iframe").remove();
  const visibleText = ($clone("body").text() || "").replace(/\s+/g, " ").trim();
  const wordCount = visibleText ? visibleText.split(" ").filter((w) => /[a-zA-Z0-9\u0900-\u097F]/.test(w)).length : 0;

  if (wordCount < 300) {
    onPageIssues.push({
      id: "low-word-count",
      title: "Thin Page Content (Low Word Count)",
      whyItHurts:
        "Pages with fewer than 300 words rarely provide enough topical depth for Google to rank them competitively against fuller competitor pages.",
      impact: "Medium",
      severity: "warning",
      category: "onpage",
      detail: `Only ${wordCount} visible words detected (recommended: 300+ words)`,
    });
  }

  // --- ON-PAGE CHECK: Too few internal links (< 5) ---
  const internalLinks = new Set();
  const hostNormalized = parsedFinal.hostname.replace(/^www\./i, "").toLowerCase();

  $("a[href]").each((_, el) => {
    const rawHref = ($(el).attr("href") || "").trim();
    if (
      !rawHref ||
      rawHref.startsWith("#") ||
      rawHref.startsWith("mailto:") ||
      rawHref.startsWith("tel:") ||
      rawHref.startsWith("javascript:")
    ) {
      return;
    }
    try {
      const resolved = new URL(rawHref, finalUrl);
      const linkHost = resolved.hostname.replace(/^www\./i, "").toLowerCase();
      if (linkHost === hostNormalized) {
        internalLinks.add(resolved.pathname + resolved.search);
      }
    } catch {
      // Ignore malformed links
    }
  });

  if (internalLinks.size < 5) {
    onPageIssues.push({
      id: "few-internal-links",
      title: "Weak Internal Linking Structure",
      whyItHurts:
        "Having too few internal links limits how well Google discovers your deeper pages and reduces the ranking authority passed across your site.",
      impact: "Medium",
      severity: "warning",
      category: "onpage",
      detail: `Only ${internalLinks.size} internal link${internalLinks.size === 1 ? "" : "s"} found (recommended: 5+)`,
    });
  }

  return {
    finalUrl,
    onPageIssues,
    technicalIssues,
  };
}
