"use client";

import Link from "next/link";
import { FiDownload, FiRefreshCw, FiPhone, FiAlertTriangle, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { trackEvent } from "../lib/analytics";

function ScoreGauge({ label, score }) {
  const isCritical = score < 50;
  const strokeColor = isCritical ? "#DC2626" : "#EA580C";
  const trackColor = isCritical ? "#FEE2E2" : "#FFEDD5";
  const textColor = isCritical ? "text-red-600" : "text-orange-600";
  const statusLabel = isCritical ? "Poor" : "Needs Work";

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-4 rounded-xl border border-neutral-200 bg-neutral-50/70">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96" aria-hidden="true">
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth="8"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className={`absolute text-2xl font-bold ${textColor}`}>
          {score}
        </span>
      </div>
      <p className="mt-2.5 text-sm font-semibold text-neutral-900 text-center">{label}</p>
      <span
        className={`mt-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
          isCritical ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
        }`}
      >
        {statusLabel}
      </span>
    </div>
  );
}

function IssueCard({ issue, variant = "warning" }) {
  const isHigh = issue.impact === "High" || variant === "critical";

  return (
    <article className="seo-report-card rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 break-inside-avoid">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <h3 className="text-sm sm:text-base font-semibold text-neutral-900 leading-snug !font-sans">
          {issue.title}
        </h3>
        <span
          className={`shrink-0 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full ${
            isHigh
              ? "bg-red-100 text-red-700 border border-red-200"
              : "bg-orange-100 text-orange-700 border border-orange-200"
          }`}
        >
          Impact: {issue.impact || (isHigh ? "High" : "Medium")}
        </span>
      </div>

      {(issue.detail || issue.displayValue) && (
        <p className="text-xs font-medium text-neutral-500 mb-2">
          Finding: <span className="text-neutral-700">{issue.detail || issue.displayValue}</span>
          {Array.isArray(issue.devices) && issue.devices.length > 0 && (
            <span className="ml-2 text-neutral-400">({issue.devices.join(" & ")})</span>
          )}
        </p>
      )}

      <p className="text-sm text-neutral-700 leading-relaxed">
        <span className="font-semibold text-neutral-900">Why this hurts you: </span>
        {issue.whyItHurts}
      </p>

      {Array.isArray(issue.items) && issue.items.length > 0 && (
        <div className="mt-3 pt-3 border-t border-neutral-100">
          <p className="text-xs font-semibold text-neutral-600 mb-1.5">
            Sample affected image URLs (showing up to {issue.items.length}):
          </p>
          <ul className="space-y-1 text-xs text-neutral-600 font-mono break-all">
            {issue.items.map((src, idx) => (
              <li key={`${src}-${idx}`} className="bg-neutral-50 px-2 py-1 rounded border border-neutral-100">
                {src}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default function SeoAuditReport({ report, onReset, fontClassName = "" }) {
  const formattedDate = (() => {
    try {
      return new Intl.DateTimeFormat("en-IN", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date(report.generatedAt));
    } catch {
      return new Date(report.generatedAt).toLocaleString();
    }
  })();

  // NEGATIVES ONLY: Show only categories scoring below 90
  const problemGauges = [
    { key: "seo", label: "SEO", score: report.scores?.seo },
    { key: "performance", label: "Performance", score: report.scores?.performance },
    { key: "accessibility", label: "Accessibility", score: report.scores?.accessibility },
    { key: "bestPractices", label: "Best Practices", score: report.scores?.bestPractices },
  ].filter((g) => typeof g.score === "number" && g.score < 90);

  const criticalCount = report.summary?.criticalCount ?? 0;
  const warningCount = report.summary?.warningCount ?? 0;

  const whatsappText = encodeURIComponent(
    `Hi Bizleap, I just did the free SEO audit for ${report.url}`
  );
  const whatsappHref = `https://wa.me/917097095152?text=${whatsappText}`;

  const handleCallClick = (phoneLabel) => {
    trackEvent("cta_call_clicked", {
      phone: phoneLabel,
      audited_url: report.url,
      source: "seo_audit_report",
    });
  };

  const handleDownloadPdf = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className={`w-full ${fontClassName}`}>
      {/* Top Action Bar (hidden in print) */}
      <div className="max-w-[850px] mx-auto mb-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="text-xs sm:text-sm text-neutral-400">
          Audit completed for <span className="text-white font-medium break-all">{report.url}</span>
        </p>
        <div className="flex flex-wrap items-center gap-2.5 ml-auto">
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFD600] hover:bg-yellow-400 text-black text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <FiDownload className="w-4 h-4" />
            Download PDF
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
          >
            <FiRefreshCw className="w-4 h-4" />
            Audit Another Website
          </button>
        </div>
      </div>

      {/* A4-Style White Paper Document */}
      <div
        id="seo-audit-document"
        className="seo-report-paper max-w-[850px] mx-auto bg-white text-neutral-900 rounded-2xl shadow-2xl overflow-hidden border border-neutral-200"
      >
        {/* Document Header */}
        <header className="bg-black text-white px-6 py-7 sm:px-10 sm:py-9 border-b-4 border-[#FFD600]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <img
                src="/logo.png"
                alt="Bizleap"
                className="h-9 sm:h-10 w-auto object-contain mb-4"
              />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white !font-sans">
                Website SEO Audit Report
              </h2>
              <p className="mt-1.5 text-sm text-[#FFD600] font-medium break-all">
                {report.url}
              </p>
            </div>
            <div className="sm:text-right text-xs sm:text-sm text-neutral-300 space-y-1 shrink-0 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
              <p>
                <span className="text-neutral-400">Prepared for: </span>
                <span className="font-semibold text-white">{report.preparedFor}</span>
              </p>
              <p className="text-neutral-400">{formattedDate}</p>
            </div>
          </div>
        </header>

        {/* Report Body */}
        <div className="px-6 py-8 sm:px-10 sm:py-10 space-y-10">
          {/* Executive Summary */}
          <section className="seo-report-section">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-6 bg-[#FFD600] rounded-full" aria-hidden="true" />
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 !font-sans">
                Executive Summary
              </h2>
            </div>

            <div className="rounded-xl bg-red-50/80 border border-red-200 p-4 sm:p-5 mb-6">
              <p className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                We found{" "}
                <span className="text-red-600">
                  {criticalCount} critical {criticalCount === 1 ? "issue" : "issues"}
                </span>{" "}
                and{" "}
                <span className="text-orange-600">
                  {warningCount} {warningCount === 1 ? "warning" : "warnings"}
                </span>{" "}
                that are hurting your rankings and conversions.
              </p>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                Your website is losing visibility on Google Search and risking potential customer drop-offs due to the unresolved technical, speed, and on-page SEO gaps detailed below.
              </p>
            </div>

            {problemGauges.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                  Underperforming Audit Categories (Mobile Priority)
                </p>
                <div
                  className={`grid gap-4 ${
                    problemGauges.length === 1
                      ? "grid-cols-1 max-w-xs"
                      : problemGauges.length === 2
                      ? "grid-cols-2"
                      : problemGauges.length === 3
                      ? "grid-cols-2 sm:grid-cols-3"
                      : "grid-cols-2 sm:grid-cols-4"
                  }`}
                >
                  {problemGauges.map((gauge) => (
                    <ScoreGauge key={gauge.key} label={gauge.label} score={gauge.score} />
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Critical Issues */}
          {Array.isArray(report.criticalIssues) && report.criticalIssues.length > 0 && (
            <section className="seo-report-section">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b border-neutral-200">
                <div className="flex items-center gap-2.5">
                  <FiAlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-900 !font-sans">
                    Critical Issues
                  </h2>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-red-600 text-white">
                  {report.criticalIssues.length} High Risk
                </span>
              </div>
              <div className="space-y-3.5">
                {report.criticalIssues.map((issue) => (
                  <IssueCard key={`crit-${issue.id}`} issue={issue} variant="critical" />
                ))}
              </div>
            </section>
          )}

          {/* Warnings */}
          {Array.isArray(report.warnings) && report.warnings.length > 0 && (
            <section className="seo-report-section">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b border-neutral-200">
                <div className="flex items-center gap-2.5">
                  <FiAlertTriangle className="w-5 h-5 text-orange-600 shrink-0" />
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-900 !font-sans">
                    Warnings
                  </h2>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-500 text-white">
                  {report.warnings.length} {report.warnings.length === 1 ? "Warning" : "Warnings"}
                </span>
              </div>
              <div className="space-y-3.5">
                {report.warnings.map((issue) => (
                  <IssueCard key={`warn-${issue.id}`} issue={issue} variant="warning" />
                ))}
              </div>
            </section>
          )}

          {/* Core Web Vitals Problems */}
          {Array.isArray(report.coreWebVitalsProblems) &&
            report.coreWebVitalsProblems.length > 0 && (
              <section className="seo-report-section">
                <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-neutral-200">
                  <span className="w-1.5 h-6 bg-red-600 rounded-full" aria-hidden="true" />
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-900 !font-sans">
                    Core Web Vitals Problems
                  </h2>
                </div>
                <p className="text-sm text-neutral-600 mb-4">
                  Google uses Core Web Vitals as a direct ranking signal. The metrics below fail to meet Google&apos;s recommended thresholds:
                </p>

                <div className="overflow-x-auto rounded-xl border border-neutral-200">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-neutral-100 text-neutral-700 text-xs uppercase tracking-wider">
                        <th className="py-3 px-4 font-semibold">Metric</th>
                        <th className="py-3 px-4 font-semibold">Mobile</th>
                        <th className="py-3 px-4 font-semibold">Desktop</th>
                        <th className="py-3 px-4 font-semibold">Google Target</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {report.coreWebVitalsProblems.map((metric) => {
                        const isPoor = metric.status === "poor";
                        return (
                          <tr key={metric.id} className="bg-white break-inside-avoid">
                            <td className="py-3.5 px-4 align-top">
                              <p className="font-semibold text-neutral-900">{metric.label}</p>
                              <p className="text-xs text-neutral-600 mt-1">{metric.whyItHurts}</p>
                            </td>
                            <td className="py-3.5 px-4 align-top font-semibold whitespace-nowrap">
                              <span
                                className={
                                  metric.mobileStatus === "poor"
                                    ? "text-red-600"
                                    : metric.mobileStatus === "needs-improvement"
                                    ? "text-orange-600"
                                    : "text-neutral-700"
                                }
                              >
                                {metric.mobileValue}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 align-top font-semibold whitespace-nowrap">
                              <span
                                className={
                                  metric.desktopStatus === "poor"
                                    ? "text-red-600"
                                    : metric.desktopStatus === "needs-improvement"
                                    ? "text-orange-600"
                                    : "text-neutral-700"
                                }
                              >
                                {metric.desktopValue}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 align-top text-neutral-600 whitespace-nowrap">
                              {metric.target}
                            </td>
                            <td className="py-3.5 px-4 align-top whitespace-nowrap">
                              <span
                                className={`inline-block text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full ${
                                  isPoor
                                    ? "bg-red-100 text-red-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {isPoor ? "Poor" : "Needs Improvement"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

          {/* On-Page SEO Gaps */}
          {Array.isArray(report.onPageGaps) && report.onPageGaps.length > 0 && (
            <section className="seo-report-section">
              <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-neutral-200">
                <span className="w-1.5 h-6 bg-[#FFD600] rounded-full" aria-hidden="true" />
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 !font-sans">
                  On-Page SEO Gaps
                </h2>
              </div>
              <div className="space-y-3.5">
                {report.onPageGaps.map((issue) => (
                  <IssueCard
                    key={`onpage-${issue.id}`}
                    issue={issue}
                    variant={issue.severity === "critical" ? "critical" : "warning"}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Technical SEO Gaps */}
          {Array.isArray(report.technicalGaps) && report.technicalGaps.length > 0 && (
            <section className="seo-report-section">
              <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-neutral-200">
                <span className="w-1.5 h-6 bg-black rounded-full" aria-hidden="true" />
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 !font-sans">
                  Technical SEO Gaps
                </h2>
              </div>
              <div className="space-y-3.5">
                {report.technicalGaps.map((issue) => (
                  <IssueCard
                    key={`tech-${issue.id}`}
                    issue={issue}
                    variant={issue.severity === "critical" ? "critical" : "warning"}
                  />
                ))}
              </div>
            </section>
          )}

          {/* What This Is Costing You */}
          <section className="seo-report-section break-inside-avoid">
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-6">
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-4 !font-sans">
                What This Is Costing You
              </h2>
              <ul className="space-y-3 text-sm text-neutral-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-red-600 shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-neutral-900">Lost Organic Traffic:</strong>{" "}
                    Technical friction and missing on-page signals prevent your pages from capturing high-intent Google searches that instead go straight to competitors.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-500 shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-neutral-900">Lost Leads &amp; Conversions:</strong>{" "}
                    Slow mobile loading, layout instability, and weak search snippets cause prospective buyers to drop off before calling or submitting an inquiry.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-neutral-900 shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-neutral-900">Lower Google Rankings:</strong>{" "}
                    Unresolved Core Web Vitals and crawlability issues continuously suppress your search visibility even when your product or service is stronger than rivals.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Prominent Conversion CTA */}
          <section className="seo-report-section break-inside-avoid">
            <div className="rounded-2xl bg-black text-white p-6 sm:p-9 border-2 border-[#FFD600]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD600] mb-2">
                Fix Every Issue With Bizleap
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight !font-sans">
                Want Bizleap to Fix All These Issues?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
                Our SEO experts have helped 350+ brands rank higher. Let us fix these issues for you.
              </p>

              <p className="mt-5 text-sm font-semibold text-[#FFD600]">
                Call Us — Open 24 hours, 7 days a week.
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+917097095152"
                  onClick={() => handleCallClick("+91 70970 95152")}
                  className="flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl bg-[#FFD600] hover:bg-yellow-400 text-black font-bold text-base transition-colors"
                >
                  <FiPhone className="w-5 h-5 shrink-0" />
                  +91 70970 95152
                </a>
                <a
                  href="tel:+919307198119"
                  onClick={() => handleCallClick("+91 93071 98119")}
                  className="flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl bg-[#FFD600] hover:bg-yellow-400 text-black font-bold text-base transition-colors"
                >
                  <FiPhone className="w-5 h-5 shrink-0" />
                  +91 93071 98119
                </a>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 print:hidden">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-sm transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5 shrink-0" />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-colors"
                >
                  Book a Free Consultation
                  <FiArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Document Footer */}
        <footer className="px-6 py-5 sm:px-10 bg-neutral-100 border-t border-neutral-200 text-center">
          <p className="text-xs text-neutral-600">
            BizLeap India Pvt. Ltd. | bizleap.in | Report generated automatically using Google Lighthouse data.
          </p>
        </footer>
      </div>

      {/* Compact Sticky Mobile Bottom Call Bar while viewing report */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-[#FFD600]/40 px-4 py-3 print:hidden">
        <div className="flex items-center gap-2.5">
          <a
            href="tel:+917097095152"
            onClick={() => handleCallClick("+91 70970 95152")}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#FFD600] text-black font-bold text-sm"
          >
            <FiPhone className="w-4 h-4 shrink-0" />
            Call 24/7
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#25D366] text-black font-bold text-sm"
          >
            <FaWhatsapp className="w-4 h-4 shrink-0" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
