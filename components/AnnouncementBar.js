"use client";

import Link from "next/link";
import { FiX } from "react-icons/fi";

export default function AnnouncementBar({ visible, onDismiss }) {
  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Free SEO Audit announcement"
      className="fixed top-0 left-0 right-0 z-[60] h-10 bg-black border-b border-[#FFD600]/25 text-[#FFD600] print:hidden"
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
        <Link
          href="/free-seo-audit"
          className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold tracking-wide text-[#FFD600] hover:text-yellow-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-2 py-1 pr-8 sm:pr-2"
        >
          <span className="hidden sm:inline">
            🚀 Do Your SEO Analysis for FREE!! — Get Your Website Audit Now
          </span>
          <span className="sm:hidden">Free SEO Audit</span>
          <span
            aria-hidden="true"
            className="inline-block font-extrabold announcement-arrow-pulse"
          >
            →
          </span>
        </Link>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss announcement bar"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 text-[#FFD600]/70 hover:text-[#FFD600] transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
