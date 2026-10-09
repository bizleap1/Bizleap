'use client'

import { useRef } from "react"
import Head from "next/head";
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import ExploreMoreSolutions from "../components/ExploreMoreSolutions"
import { FiCheck, FiArrowRight, FiArrowUpRight, FiSearch, FiBarChart2, FiTrendingUp, FiGlobe, FiTool, FiTarget, FiZap, FiShield } from "react-icons/fi"
import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

// ------------------- Badge Component -------------------
function Badge({ children, variant = "secondary", className = "" }) {
  const base = "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 mr-2 mb-2"
  const colors = {
    default: "bg-white text-black border-transparent",
    secondary: "bg-gray-700 text-white border-transparent",
    outline: "border-gray-400 text-white bg-transparent",
  }
  return <span className={`${base} ${colors[variant]} ${className}`}>{children}</span>
}

// ------------------- InView Scroll Reveal -------------------
function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: "0px 0px -150px 0px", once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)", transition: { delay, duration: 0.6 } }
          : {}
      }
    >
      {children}
    </motion.div>
  )
}


// ------------------- Card Illustrations -------------------
function TrafficChartIllustration() {
  return (
    <svg viewBox="0 0 190 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[210px] h-auto select-none">
      <rect x="2" y="2" width="186" height="136" rx="8" stroke="#262C38" strokeWidth="1.5" fill="#0E1116" />
      <line x1="2" y1="26" x2="188" y2="26" stroke="#262C38" strokeWidth="1.5" />
      <circle cx="16" cy="14" r="2.5" fill="#4B5568" />
      <circle cx="25" cy="14" r="2.5" fill="#4B5568" />
      <circle cx="34" cy="14" r="2.5" fill="#4B5568" />
      
      <defs>
        <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFC000" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFC000" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path
        d="M 22 96 C 44 96, 52 82, 72 82 C 92 82, 102 92, 122 74 C 142 56, 152 50, 168 36 L 168 106 L 22 106 Z"
        fill="url(#trafficGradient)"
      />
      <path
        d="M 22 96 C 44 96, 52 82, 72 82 C 92 82, 102 92, 122 74 C 142 56, 152 50, 168 36"
        stroke="#FFC000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 157 36 H 168 V 47"
        stroke="#FFC000"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      <line x1="22" y1="116" x2="108" y2="116" stroke="#333C4D" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="22" y1="126" x2="72" y2="126" stroke="#333C4D" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

function SpeedExperienceIllustration() {
  return (
    <svg viewBox="0 0 190 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[210px] h-auto select-none">
      <rect x="2" y="2" width="186" height="136" rx="8" stroke="#262C38" strokeWidth="1.5" fill="#0E1116" />
      <line x1="2" y1="26" x2="188" y2="26" stroke="#262C38" strokeWidth="1.5" />
      <circle cx="16" cy="14" r="2.5" fill="#4B5568" />
      <circle cx="25" cy="14" r="2.5" fill="#4B5568" />
      <circle cx="34" cy="14" r="2.5" fill="#4B5568" />

      <rect x="20" y="38" width="64" height="38" rx="4" fill="#181D26" />

      <line x1="94" y1="44" x2="156" y2="44" stroke="#333C4D" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="94" y1="54" x2="142" y2="54" stroke="#333C4D" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="94" y1="64" x2="122" y2="64" stroke="#333C4D" strokeWidth="3.5" strokeLinecap="round" />

      <line x1="20" y1="94" x2="88" y2="94" stroke="#333C4D" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="20" y1="106" x2="70" y2="106" stroke="#333C4D" strokeWidth="3.5" strokeLinecap="round" />

      {/* Speedometer gauge circle in bottom-right */}
      <circle cx="146" cy="100" r="26" fill="#0E1116" stroke="#262C38" strokeWidth="2.5" />
      <path
        d="M 130 108 A 18 18 0 1 1 162 108"
        stroke="#333C4D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="146" cy="100" r="3" fill="#FFC000" />
      <line x1="146" y1="100" x2="160" y2="86" stroke="#FFC000" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function ConversionClickIllustration() {
  return (
    <svg viewBox="0 0 190 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[210px] h-auto select-none">
      <rect x="2" y="2" width="186" height="136" rx="8" stroke="#262C38" strokeWidth="1.5" fill="#0E1116" />
      <line x1="2" y1="26" x2="188" y2="26" stroke="#262C38" strokeWidth="1.5" />
      <circle cx="16" cy="14" r="2.5" fill="#4B5568" />
      <circle cx="25" cy="14" r="2.5" fill="#4B5568" />
      <circle cx="34" cy="14" r="2.5" fill="#4B5568" />

      <line x1="20" y1="44" x2="156" y2="44" stroke="#333C4D" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="20" y1="56" x2="132" y2="56" stroke="#333C4D" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="20" y1="68" x2="98" y2="68" stroke="#333C4D" strokeWidth="3.5" strokeLinecap="round" />

      <rect x="20" y="86" width="68" height="28" rx="5" stroke="#333C4D" strokeWidth="1.5" fill="#141822" />

      {/* Yellow Cursor Arrow with Click Sparks */}
      <g transform="translate(100, 84)">
        <line x1="16" y1="-8" x2="16" y2="-1" stroke="#FFC000" strokeWidth="2" strokeLinecap="round" />
        <line x1="27" y1="-3" x2="22" y2="2" stroke="#FFC000" strokeWidth="2" strokeLinecap="round" />
        <line x1="31" y1="10" x2="24" y2="10" stroke="#FFC000" strokeWidth="2" strokeLinecap="round" />
        <line x1="6" y1="1" x2="1" y2="4" stroke="#FFC000" strokeWidth="2" strokeLinecap="round" />
        <polygon
          points="16,4 16,30 22,24 29,38 33,36 26,22 34,22"
          fill="#FFC000"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

function LongTermGrowthIllustration() {
  return (
    <svg viewBox="0 0 190 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[210px] h-auto select-none">
      {/* 4 ascending bar charts */}
      <rect x="18" y="104" width="18" height="24" rx="3" fill="#141822" stroke="#262C38" strokeWidth="1.5" />
      <rect x="46" y="88" width="18" height="40" rx="3" fill="#141822" stroke="#262C38" strokeWidth="1.5" />
      <rect x="74" y="72" width="18" height="56" rx="3" fill="#141822" stroke="#262C38" strokeWidth="1.5" />
      <rect x="102" y="56" width="18" height="72" rx="3" fill="#141822" stroke="#262C38" strokeWidth="1.5" />
      <rect x="132" y="36" width="22" height="92" rx="3" fill="#FFC000" fillOpacity="0.12" stroke="#FFC000" strokeWidth="2" />

      {/* Sweeping growth trend curve with arrow */}
      <path
        d="M 12 108 C 50 102, 90 85, 142 22"
        stroke="#FFC000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 131 22 H 143 V 34"
        stroke="#FFC000"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function SEOAuditsService() {
  const auditCoverages = [
    {
      num: "01",
      icon: "/service/Warm Yellow Code Brackets and Slash-3.png",
      title: "Technical SEO Audit",
      description: "Find crawl issues, indexing gaps, and structural barriers.",
      features: "Crawlability · Site architecture"
    },
    {
      num: "02",
      icon: "/service/Yellow folded-page document icon-2.png",
      title: "Content Analysis",
      description: "Review content quality, relevance, and missing opportunities.",
      features: "Content gaps · On-page SEO"
    },
    {
      num: "03",
      icon: "/service/Yellow diagonal chain-link icon-5.png",
      title: "Backlink Profile",
      description: "Evaluate link quality and discover relevant opportunities.",
      features: "Link quality · Referring domains"
    },
    {
      num: "04",
      icon: "/service/Yellow bullseye target icon-4.png",
      title: "Keyword Research",
      description: "Identify relevant searches and understand user intent.",
      features: "Search intent · Keyword gaps"
    },
    {
      num: "05",
      icon: "/service/Yellow Pulse Line Icon-7.png",
      title: "Performance Metrics",
      description: "Assess page speed, mobile usability, and Core Web Vitals.",
      features: "Core Web Vitals · Page speed"
    },
    {
      num: "06",
      icon: "/service/Yellow shield outline icon-6.png",
      title: "Security Audit",
      description: "Review HTTPS, security headers, and common website risks.",
      features: "HTTPS · Security headers"
    }
  ]

  const seoBenefits = [
    {
      num: "01",
      title: "Increased organic traffic",
      description: "Reach more relevant visitors through better search visibility.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#FFC000]">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      illustration: <TrafficChartIllustration />
    },
    {
      num: "02",
      title: "Better user experience",
      description: "Make your website faster, clearer, and easier to navigate.",
      icon: <FiGlobe className="w-5 h-5 text-[#FFC000]" />,
      illustration: <SpeedExperienceIllustration />
    },
    {
      num: "03",
      title: "Higher conversion potential",
      description: "Align your pages with user intent and remove friction.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#FFC000]">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
      illustration: <ConversionClickIllustration />
    },
    {
      num: "04",
      title: "Long-term growth",
      description: "Build a stronger foundation with regular improvements.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5 text-[#FFC000]">
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="12" y1="20" x2="12" y2="8" />
          <line x1="18" y1="20" x2="18" y2="4" />
        </svg>
      ),
      illustration: <LongTermGrowthIllustration />
    }
  ]

  const auditDeliverables = [
    { num: "01", title: "Comprehensive 50+ page audit report", active: true },
    { num: "02", title: "Technical SEO checklist with priorities", active: false },
    { num: "03", title: "Keyword opportunity analysis", active: false },
    { num: "04", title: "Competitor benchmarking", active: false },
    { num: "05", title: "Actionable implementation plan", active: false },
    { num: "06", title: "Performance improvement roadmap", active: false }
  ]

  const auditToolRows = [
    ["Google Search Console", "Google Analytics 4"],
    ["SEMrush / Ahrefs", "Screaming Frog"],
    ["GTmetrix", "PageSpeed Insights"],
    ["Mobile usability checks", "Security Headers"]
  ]

  const reviewStandards = [
    "Google search guidelines",
    "Core Web Vitals",
    "Mobile-first indexing",
    "E-E-A-T principles"
  ]

  const technicalIssues = [
    { title: "Slow page loading speed (>3 seconds)", impact: "Speed" },
    { title: "Poor mobile responsiveness & shifts", impact: "Mobile UX" },
    { title: "Broken links and 404 crawl errors", impact: "Crawlability" },
    { title: "Duplicate content & canonical issues", impact: "Indexing" },
    { title: "Missing or incorrect meta tags", impact: "Metadata" },
    { title: "Poor site structure and navigation", impact: "Architecture" },
    { title: "Security vulnerabilities & headers", impact: "Security" },
    { title: "Poor Core Web Vitals (LCP, INP, CLS)", impact: "Vitals" }
  ]

  const seoContentIssues = [
    { title: "Poor keyword targeting & intent mismatch", impact: "Keywords" },
    { title: "Thin, unhelpful or low-quality content", impact: "Quality" },
    { title: "Missing alt text on images & media", impact: "Accessibility" },
    { title: "Unoptimized title tags and descriptions", impact: "CTR" },
    { title: "Content gaps vs top-ranking competitors", impact: "Relevance" },
    { title: "Poor internal linking architecture", impact: "Link Flow" },
    { title: "Low-quality or toxic backlink profiles", impact: "Authority" },
    { title: "Missing structured schema markup", impact: "Rich Snippets" }
  ]

  const processSteps = [
    {
      step: "01",
      title: "Initial Analysis",
      description: "Review your website, business goals, and current SEO performance.",
      output: "Baseline assessment",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 text-[#FFC000]" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="14" cy="14" r="8" />
          <line x1="20" y1="20" x2="27" y2="27" />
        </svg>
      )
    },
    {
      step: "02",
      title: "Technical Audit",
      description: "Examine crawlability, site structure, speed, and mobile usability.",
      output: "Technical findings",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 text-[#FFC000]" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="10 9 4 16 10 23" />
          <polyline points="22 9 28 16 22 23" />
          <line x1="18" y1="7" x2="14" y2="25" />
        </svg>
      )
    },
    {
      step: "03",
      title: "Content & Keywords",
      description: "Assess content quality, keyword relevance, and search intent.",
      output: "Content opportunities",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 text-[#FFC000]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h12l6 6v7" />
          <polyline points="17 4 17 10 23 10" />
          <line x1="9" y1="12" x2="13" y2="12" />
          <line x1="9" y1="17" x2="14" y2="17" />
          <path d="M5 4v22h12" />
          <circle cx="22" cy="22" r="6" fill="#0B0D12" strokeWidth="2" />
          <circle cx="22" cy="22" r="2.5" />
        </svg>
      )
    },
    {
      step: "04",
      title: "Reporting & Strategy",
      description: "Receive prioritized findings and a practical implementation plan.",
      output: "Prioritized roadmap",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 text-[#FFC000]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="4" width="22" height="24" rx="4" />
          <path d="M9 11l2 2 3-3" strokeWidth="1.8" />
          <line x1="17" y1="11" x2="22" y2="11" strokeWidth="2" />
          <path d="M9 19l2 2 3-3" strokeWidth="1.8" />
          <line x1="17" y1="19" x2="22" y2="19" strokeWidth="2" />
        </svg>
      )
    }
  ]

  return (
    <>
      <Head>
        <title key="title">SEO & Website Audit Services | Bizleap</title>
        <meta name="keywords" content="seo Nagpur, technical seo audit, core web vitals speed audit" />
        <meta name="description" key="description" content="Improve your search visibility with Bizleap's SEO and website audits covering technical SEO, content, keywords, and backlinks." />
        <link rel="canonical" href="https://bizleap.in/seowebsite" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SEO & Website Audit Services | Bizleap" key="og:title" />
        <meta property="og:description" content="Improve your search visibility with Bizleap's SEO and website audits covering technical SEO, content, keywords, and backlinks." key="og:description" />
        <meta property="og:url" content="https://bizleap.in/seowebsite" key="og:url" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://bizleap.in/seowebsite#service",
              "url": "https://bizleap.in/seowebsite",
              "name": "SEO & Website Audits",
              "description": "Bizleap provides comprehensive SEO and website audits including technical SEO analysis, content evaluation, backlink profile review, and keyword research to drive organic growth.",
              "provider": { "@id": "https://bizleap.in/#organization" },
              "serviceType": "SEO & Digital Marketing",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bizleap.in/" },
                  { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://bizleap.in/services" },
                  { "@type": "ListItem", "position": 3, "name": "SEO & Website Audits", "item": "https://bizleap.in/seowebsite" }
                ]
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "SEO Audit Services",
                "itemListElement": [
                  { "@type": "Offer", "name": "Technical SEO Audit" },
                  { "@type": "Offer", "name": "Content Analysis" },
                  { "@type": "Offer", "name": "Backlink Profile Review" },
                  { "@type": "Offer", "name": "Keyword Research" },
                  { "@type": "Offer", "name": "Performance Metrics & Core Web Vitals" },
                  { "@type": "Offer", "name": "Security Audit" }
                ]
              }
            })
          }}
        />
      </Head>
      <main className="bg-black text-white min-h-screen">
        {/* ========================================================= */}
        {/* TOP FREE SEO AUDIT ANNOUNCEMENT BAR (BELOW NAVBAR)        */}
        {/* ========================================================= */}
        <div className="relative z-30 pt-16 sm:pt-20 bg-gradient-to-r from-[#0d0d0f] via-[#1a170b] to-[#0d0d0f] border-b border-[#FFC000]/25 shadow-md">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex flex-row items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#FFC000] text-black text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-sm font-sans shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                FREE AUDIT
              </span>
              <p className="font-sans text-[11px] sm:text-xs md:text-sm text-gray-200 font-medium truncate">
                <span className="hidden sm:inline">Want to know where your website is losing traffic?</span>
                <span className="sm:hidden">Losing website traffic?</span>
                <span className="hidden md:inline text-gray-400 ml-1">Get a comprehensive 50+ page manual &amp; technical review.</span>
              </p>
            </div>

            <Link
              href="/free-seo-audit"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-5 sm:py-2 bg-[#FFC000] hover:bg-[#ffcd2b] active:scale-[0.98] text-black font-bold text-[11px] sm:text-xs md:text-sm rounded-lg sm:rounded-md transition-all duration-300 shadow-md shadow-yellow-500/20 hover:shadow-yellow-500/35 shrink-0 font-sans whitespace-nowrap"
            >
              <span className="hidden sm:inline">Get Free SEO Audit</span>
              <span className="sm:hidden">Get Audit</span>
              <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Hero Section with Charcoal Backdrop and Cream Audit Report */}
        <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 px-6 sm:px-8 lg:px-16 overflow-hidden bg-black text-white">
          {/* Full-bleed Background Image with Vertical Offset to Clear Navbar */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="relative w-full h-full translate-y-6 sm:translate-y-8 lg:translate-y-12">
              <Image
                src="/service/Charcoal backdrop and cream audit report.png"
                alt="Bizleap SEO & Website Audit Report"
                fill
                priority
                quality={100}
                className="object-cover object-right md:object-center select-none"
              />
            </div>
            {/* Subtle gradient overlays to ensure text and navbar are crisp & readable across all screen sizes */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent sm:via-black/60 lg:via-black/25 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/50 pointer-events-none" />
          </div>

          {/* Hero Content */}
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="max-w-2xl">
              <ScrollReveal>
                <div className="font-sans flex items-center gap-3 mb-5 sm:mb-7">
                  <span className="w-8 h-[2.5px] bg-[#FFC000] inline-block"></span>
                  <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-gray-400 uppercase">
                    SEO &amp; WEBSITE AUDITS
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-bold tracking-tight text-white leading-[1.05] mb-5">
                  <span className="block font-serif">Be found.</span>
                  <span className="block font-serif italic text-[#FFC000]">
                    Be chosen.
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="font-sans text-gray-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl mb-8">
                  Find what is holding your website back. Get a clear, actionable plan for stronger search visibility.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="font-sans flex flex-wrap items-center gap-6 sm:gap-8 mb-8 sm:mb-10">
                  <Link
                    href="/free-seo-audit"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#FFC000] hover:bg-[#ffcd2b] text-black font-semibold text-sm sm:text-base rounded-md transition-all duration-300 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/25 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Get a free website audit</span>
                    <FiArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </Link>

                <a
                  href="#audit-areas"
                  className="inline-flex items-center gap-2 text-white hover:text-[#FFC000] font-medium text-sm sm:text-base transition-colors duration-200 group"
                >
                  <span>Explore our approach</span>
                  <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="font-sans text-gray-400 text-xs sm:text-sm font-medium tracking-wide flex flex-wrap items-center gap-x-3 gap-y-2">
                <span>Technical SEO</span>
                <span className="text-gray-600">·</span>
                <span>Content strategy</span>
                <span className="text-gray-600">·</span>
                <span>Website performance</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The Value of SEO Section */}
      <section className="pt-6 sm:pt-10 pb-20 sm:pb-24 px-6 sm:px-8 lg:px-16 bg-black text-white relative">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <ScrollReveal>
                <div className="font-sans text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#FFC000] uppercase mb-4">
                  THE VALUE OF SEO
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.08]">
                  Why SEO audits<br />
                  <span>are </span>
                  <span className="font-serif italic text-[#FFC000]">essential.</span>
                </h2>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.2}>
              <p className="font-sans text-gray-400 text-base sm:text-lg leading-relaxed max-w-md lg:mb-2 font-normal">
                Find what holds your website back. Turn technical insights into a clearer path to growth.
              </p>
            </ScrollReveal>
          </div>

          {/* 2x2 Grid of Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {seoBenefits.map((benefit, index) => (
              <ScrollReveal key={benefit.num} delay={index * 0.1}>
                <div className="p-6 sm:p-7 rounded-2xl bg-[#0B0D12] border border-white/[0.08] hover:border-yellow-500/30 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-6 group">
                  {/* Left content */}
                  <div className="flex-1 flex flex-col justify-between w-full">
                    <div>
                      <div className="flex items-center gap-3.5 mb-5">
                        <div className="w-10 h-10 rounded-full bg-[#151922] border border-[#262C3A] flex items-center justify-center shrink-0">
                          {benefit.icon}
                        </div>
                        <span className="font-sans text-xs sm:text-sm font-semibold text-gray-500 tracking-wider">
                          {benefit.num}
                        </span>
                      </div>
                      <h3 className="font-sans text-xl sm:text-[22px] font-bold text-white mb-2.5 tracking-tight group-hover:text-yellow-400/90 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="font-sans text-gray-400 text-sm sm:text-[15px] leading-relaxed max-w-[260px]">
                        {benefit.description}
                      </p>
                    </div>
                  </div>

                  {/* Vertical divider */}
                  <div className="hidden sm:block w-[1px] bg-white/[0.07] self-stretch my-1" />

                  {/* Right illustration */}
                  <div className="w-full sm:w-[210px] md:w-[220px] shrink-0 flex items-center justify-center pt-2 sm:pt-0">
                    {benefit.illustration}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What our audit covers */}
      <section id="audit-areas" className="pt-10 sm:pt-14 pb-14 sm:pb-16 lg:pb-20 px-6 sm:px-8 lg:px-12 bg-black border-t border-white/[0.06] relative">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12 items-start justify-between">
            
            {/* Left Column: Heading, Graphic & CTA */}
            <div className="w-full lg:w-[350px] xl:w-[390px] shrink-0 flex flex-col items-start">
              <ScrollReveal>
                {/* Eyebrow */}
                <span className="font-sans text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#FFC000] uppercase mb-3 block">
                  360° WEBSITE REVIEW
                </span>

                {/* Headline */}
                <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[50px] xl:text-[56px] text-white leading-[1.06] tracking-tight mb-4">
                  What our <br />
                  <span className="text-[#FFC000]">audit</span> <br />
                  covers.
                </h2>

                {/* Subtitle */}
                <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed mb-5">
                  A complete review of your website.<br />
                  Clear priorities for what to improve next.
                </p>

                {/* Checklist Graphic */}
                <div className="w-full max-w-[270px] sm:max-w-[290px] mb-5">
                  <img
                    src="/service/Audit report checklist with magnifying glass-1.png"
                    alt="Audit report checklist illustration"
                    className="w-full h-auto select-none pointer-events-none drop-shadow-md"
                  />
                </div>

                {/* CTA Button */}
                <div className="w-full max-w-[270px] sm:max-w-[290px]">
                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#FFC000] hover:bg-[#e6ad00] text-black font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md shadow-[#FFC000]/10 group"
                  >
                    <span>Request an SEO audit</span>
                    <span className="transition-transform group-hover:translate-x-1 font-bold">→</span>
                  </a>

                  {/* Button Subtext */}
                  <p className="font-sans text-gray-400 text-xs sm:text-[13px] mt-2 text-left">
                    Clear findings. Practical next steps.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: 2x3 Grid */}
            <div className="w-full lg:flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                {auditCoverages.map((card, idx) => (
                  <ScrollReveal key={card.num} delay={idx * 0.08}>
                    <div className="group h-full p-5 sm:p-6 lg:p-7 rounded-2xl bg-[#0B0D12] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
                      <div>
                        {/* Top row: Icon + Number */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
                            <img
                              src={card.icon}
                              alt={card.title}
                              className="w-full h-full object-contain select-none"
                            />
                          </div>
                          <span className="font-sans text-xs sm:text-sm font-medium text-gray-500">
                            {card.num}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-sans text-lg sm:text-[20px] font-bold text-white mb-2 tracking-tight group-hover:text-yellow-400/90 transition-colors">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed mb-5">
                          {card.description}
                        </p>
                      </div>

                      {/* Bottom tag / features */}
                      <div className="mt-auto flex items-center text-xs sm:text-[13px] text-gray-400 font-sans">
                        <span className="inline-block w-4 h-[2px] bg-[#FFC000] rounded-full mr-2.5 shrink-0" />
                        <span>{card.features}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Process */}
      <section id="process" className="pt-10 sm:pt-14 pb-14 sm:pb-16 lg:pb-20 px-6 sm:px-8 lg:px-12 bg-black border-t border-white/[0.06] relative">
        <div className="max-w-[1360px] mx-auto">
          {/* Header row */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-12">
              <div>
                <span className="font-sans text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#FFC000] uppercase mb-3 block">
                  HOW WE WORK
                </span>
                <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[54px] text-white tracking-tight leading-[1.08]">
                  Our audit <span className="text-[#FFC000]">process.</span>
                </h2>
              </div>
              <p className="font-sans text-gray-400 text-sm sm:text-base max-w-sm leading-relaxed md:pb-1">
                From understanding your website to a clear, prioritized action plan.
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline Sequence Bar (Desktop) */}
          <div className="hidden lg:grid grid-cols-4 gap-5 mb-7 items-center relative">
            {/* Continuous horizontal line passing through */}
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-[1px] bg-white/[0.18]" />

            {/* Step 01 */}
            <div className="relative flex items-center justify-center">
              <div className="relative z-10 w-11 h-11 rounded-full border-2 border-[#FFC000] bg-black text-[#FFC000] font-sans font-bold text-sm flex items-center justify-center shadow-md shadow-black">
                01
              </div>
              <span className="absolute -right-3.5 z-10 text-white/40 text-xs font-bold select-none">→</span>
            </div>

            {/* Step 02 */}
            <div className="relative flex items-center justify-center">
              <div className="relative z-10 w-11 h-11 rounded-full border-2 border-[#FFC000] bg-black text-[#FFC000] font-sans font-bold text-sm flex items-center justify-center shadow-md shadow-black">
                02
              </div>
              <span className="absolute -right-3.5 z-10 text-white/40 text-xs font-bold select-none">→</span>
            </div>

            {/* Step 03 */}
            <div className="relative flex items-center justify-center">
              <div className="relative z-10 w-11 h-11 rounded-full border-2 border-[#FFC000] bg-black text-[#FFC000] font-sans font-bold text-sm flex items-center justify-center shadow-md shadow-black">
                03
              </div>
              <span className="absolute -right-3.5 z-10 text-white/40 text-xs font-bold select-none">→</span>
            </div>

            {/* Step 04 */}
            <div className="relative flex items-center justify-center">
              <div className="relative z-10 w-11 h-11 rounded-full border-2 border-[#FFC000] bg-black text-[#FFC000] font-sans font-bold text-sm flex items-center justify-center shadow-md shadow-black">
                04
              </div>
            </div>
          </div>

          {/* 4 Process Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.08}>
                <div className="group h-full p-6 sm:p-7 rounded-2xl bg-[#0B0D12] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Top Row: Icon + Mobile Step Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
                        {step.icon}
                      </div>
                      <div className="lg:hidden w-8 h-8 rounded-full border-2 border-[#FFC000] bg-black text-[#FFC000] font-sans font-bold text-xs flex items-center justify-center">
                        {step.step}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans text-xl font-bold text-white mb-2.5 tracking-tight group-hover:text-yellow-400/90 transition-colors">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* Output block */}
                  <div className="pt-4 border-t border-white/[0.08] mt-auto">
                    <span className="font-sans font-bold text-[10px] sm:text-[11px] tracking-[0.2em] text-gray-500 uppercase mb-1 block">
                      OUTPUT
                    </span>
                    <span className="font-sans font-semibold text-white text-sm sm:text-base">
                      {step.output}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section id="deliverables" className="pt-10 sm:pt-14 pb-14 sm:pb-16 lg:pb-20 px-6 sm:px-8 lg:px-12 bg-black border-t border-white/[0.06] relative">
        <div className="max-w-[1360px] mx-auto">
          {/* Header row */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-12">
              <div>
                <span className="font-sans text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#FFC000] uppercase mb-3 block">
                  YOUR AUDIT, DELIVERED
                </span>
                <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[52px] text-white tracking-tight leading-[1.08]">
                  Clear findings. <span className="text-[#FFC000] italic font-serif">A practical way forward.</span>
                </h2>
              </div>
              <p className="font-sans text-gray-400 text-sm sm:text-base max-w-xs sm:max-w-sm leading-relaxed md:pb-1">
                A detailed view of your website, with priorities your team can act on.
              </p>
            </div>
          </ScrollReveal>

          {/* Grid Layout: Left Column Deliverables & Right Column Toolkits */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
            
            {/* Left Column: 01 / WHAT YOU RECEIVE */}
            <div className="lg:col-span-7 flex flex-col">
              <ScrollReveal>
                <div className="mb-4 flex items-center gap-1.5">
                  <span className="text-[#FFC000] font-sans font-bold text-xs tracking-wider">01</span>
                  <span className="text-gray-500 font-sans font-semibold text-xs tracking-[0.2em] uppercase">/ WHAT YOU RECEIVE</span>
                </div>

                <div className="space-y-3">
                  {auditDeliverables.map((item) => (
                    <div
                      key={item.num}
                      className={`group flex items-center justify-between p-4 sm:p-5 rounded-xl transition-all duration-300 ${
                        item.active
                          ? "bg-[#0B0D12] border border-white/[0.08] relative overflow-hidden"
                          : "border-b border-white/[0.06] hover:bg-white/[0.02]"
                      }`}
                    >
                      {item.active && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFC000] rounded-r" />
                      )}
                      
                      <div className="flex items-center min-w-0 pr-4">
                        <span className="text-[#FFC000] font-sans font-bold text-sm sm:text-base w-8 sm:w-10 text-center shrink-0">
                          {item.num}
                        </span>
                        <div className="w-[1px] h-6 bg-white/[0.08] mx-3 sm:mx-5 shrink-0" />
                        <span className="font-serif text-white font-medium text-base sm:text-lg lg:text-xl group-hover:text-yellow-400/90 transition-colors truncate sm:whitespace-normal">
                          {item.title}
                        </span>
                      </div>

                      <span className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all text-xl font-light shrink-0">
                        →
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: 02 & 03 Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Card 02: Audit Toolkit */}
              <ScrollReveal delay={0.1}>
                <div className="p-6 sm:p-7 rounded-2xl bg-[#0B0D12] border border-white/[0.08]">
                  <div className="mb-3 flex items-center gap-1.5">
                    <span className="text-[#FFC000] font-sans font-bold text-xs tracking-wider">02</span>
                    <span className="text-gray-500 font-sans font-semibold text-xs tracking-[0.2em] uppercase">/ AUDIT TOOLKIT</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-[26px] text-white tracking-tight mb-6">
                    Tools behind the insights
                  </h3>

                  {/* 2x4 Table */}
                  <div className="border border-white/[0.08] rounded-xl overflow-hidden divide-y divide-white/[0.08]">
                    {auditToolRows.map((row, rIdx) => (
                      <div key={rIdx} className="grid grid-cols-2 divide-x divide-white/[0.08]">
                        <div className="p-3.5 sm:p-4 text-xs sm:text-sm text-gray-300 font-sans">
                          {row[0]}
                        </div>
                        <div className="p-3.5 sm:p-4 text-xs sm:text-sm text-gray-300 font-sans">
                          {row[1]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Card 03: Review Framework */}
              <ScrollReveal delay={0.2}>
                <div className="p-6 sm:p-7 rounded-2xl bg-[#0B0D12] border border-white/[0.08]">
                  <div className="mb-3 flex items-center gap-1.5">
                    <span className="text-[#FFC000] font-sans font-bold text-xs tracking-wider">03</span>
                    <span className="text-gray-500 font-sans font-semibold text-xs tracking-[0.2em] uppercase">/ REVIEW FRAMEWORK</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-[26px] text-white tracking-tight mb-6">
                    Standards we consider
                  </h3>

                  {/* 4 Standards */}
                  <div className="space-y-4">
                    {reviewStandards.map((std, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4 text-[#FFC000] shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="font-sans text-sm sm:text-[15px] text-gray-200">
                          {std}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

            </div>

          </div>
        </div>
      </section>

      {/* Common Issues We Fix - Revamped */}
      <section id="common-issues" className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-black border-t border-white/[0.06] relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-500/[0.03] blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-yellow-400/[0.04] blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-[1360px] mx-auto relative z-10">
          {/* Header row */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-3.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC000] animate-pulse" />
                  <span className="font-sans text-[11px] font-bold tracking-[0.25em] text-[#FFC000] uppercase">
                    DIAGNOSTIC BENCHMARKS
                  </span>
                </div>
                <h2 className={`font-serif font-bold text-3xl sm:text-4xl lg:text-[46px] text-white tracking-tight leading-[1.1] ${playfair.className}`}>
                  Common issues{" "}
                  <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
                    we identify & fix.
                  </span>
                </h2>
              </div>
              <p className="font-sans text-gray-400 text-sm sm:text-base max-w-sm leading-relaxed md:pb-1">
                These are the most frequent problems that drain rankings, slow down users, and hurt conversions.
              </p>
            </div>
          </ScrollReveal>

          {/* 2 Comparison Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            
            {/* Panel 1: Technical & Site Health */}
            <ScrollReveal delay={0.08}>
              <div className="relative rounded-2xl bg-gradient-to-b from-[#111218]/95 via-[#0c0d12]/95 to-[#07080b]/98 border border-white/[0.08] hover:border-red-500/30 p-6 sm:p-8 lg:p-9 shadow-2xl transition-all duration-500 flex flex-col justify-between h-full overflow-hidden group">
                {/* Top Red Glow Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Ambient Corner Radial */}
                <div className="absolute -top-16 -right-16 w-44 h-44 bg-red-500/10 blur-3xl rounded-full pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-red-400 font-mono font-bold text-xs tracking-wider">01</span>
                      <span className="text-gray-500 font-sans font-semibold text-[11px] tracking-[0.2em] uppercase">
                        / TECHNICAL BARRIERS
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/25 shadow-[0_0_15px_rgba(239,68,68,0.12)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      Critical Health
                    </span>
                  </div>

                  <h3 className={`font-serif text-2xl sm:text-[28px] font-bold text-white mb-2.5 tracking-tight ${playfair.className}`}>
                    Technical & Speed Bottlenecks
                  </h3>
                  <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    Structural flaws that stop search crawlers, cause indexing gaps, and degrade Core Web Vitals.
                  </p>

                  <div className="divide-y divide-white/[0.05] border-y border-white/[0.06]">
                    {technicalIssues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="py-3 sm:py-3.5 px-3 -mx-3 rounded-xl hover:bg-white/[0.03] flex items-center justify-between gap-3 group/item transition-all duration-200 cursor-default"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 group-hover/item:border-red-500/50 group-hover/item:bg-red-500 group-hover/item:text-black text-red-400 flex items-center justify-center transition-all duration-200 shrink-0 shadow-sm">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4 transition-transform duration-200 group-hover/item:scale-110"
                            >
                              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                            </svg>
                          </div>
                          <span className="font-sans text-sm sm:text-[15px] text-gray-300 font-medium group-hover/item:text-white transition-colors truncate sm:whitespace-normal">
                            {issue.title}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-gray-400 group-hover/item:border-red-500/30 group-hover/item:text-red-400 group-hover/item:bg-red-500/[0.06] transition-all shrink-0">
                          {issue.impact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400 font-sans relative z-10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                    Audit scope: 100+ technical checkpoints
                  </span>
                  <span className="text-[#FFC000] font-semibold flex items-center gap-1">
                    <FiShield className="w-3.5 h-3.5" />
                    Priority scoring included
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Panel 2: SEO, Content & Keyword Deficits */}
            <ScrollReveal delay={0.16}>
              <div className="relative rounded-2xl bg-gradient-to-b from-[#111218]/95 via-[#0c0d12]/95 to-[#07080b]/98 border border-white/[0.08] hover:border-yellow-400/40 p-6 sm:p-8 lg:p-9 shadow-2xl transition-all duration-500 flex flex-col justify-between h-full overflow-hidden group">
                {/* Top Yellow Glow Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Ambient Corner Radial */}
                <div className="absolute -top-16 -right-16 w-44 h-44 bg-yellow-400/10 blur-3xl rounded-full pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-mono font-bold text-xs tracking-wider">02</span>
                      <span className="text-gray-500 font-sans font-semibold text-[11px] tracking-[0.2em] uppercase">
                        / CONTENT & RANKINGS
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/25 shadow-[0_0_15px_rgba(255,192,0,0.12)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                      Growth Deficit
                    </span>
                  </div>

                  <h3 className={`font-serif text-2xl sm:text-[28px] font-bold text-white mb-2.5 tracking-tight ${playfair.className}`}>
                    SEO, Content & Keyword Gaps
                  </h3>
                  <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    Search intent mismatches and indexing deficits that prevent high-intent pages from ranking on Page 1.
                  </p>

                  <div className="divide-y divide-white/[0.05] border-y border-white/[0.06]">
                    {seoContentIssues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="py-3 sm:py-3.5 px-3 -mx-3 rounded-xl hover:bg-white/[0.03] flex items-center justify-between gap-3 group/item transition-all duration-200 cursor-default"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 group-hover/item:border-yellow-400/50 group-hover/item:bg-yellow-400 group-hover/item:text-black text-yellow-400 flex items-center justify-center transition-all duration-200 shrink-0 shadow-sm">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4 transition-transform duration-200 group-hover/item:scale-110"
                            >
                              <circle cx="11" cy="11" r="8" />
                              <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                          </div>
                          <span className="font-sans text-sm sm:text-[15px] text-gray-300 font-medium group-hover/item:text-white transition-colors truncate sm:whitespace-normal">
                            {issue.title}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-gray-400 group-hover/item:border-yellow-400/30 group-hover/item:text-yellow-400 group-hover/item:bg-yellow-400/[0.06] transition-all shrink-0">
                          {issue.impact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400 font-sans relative z-10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                    Keyword intent & content analysis
                  </span>
                  <span className="text-[#FFC000] font-semibold flex items-center gap-1">
                    <FiTarget className="w-3.5 h-3.5" />
                    Competitor benchmarked
                  </span>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>



      {/* Explore More Solutions */}
      <ExploreMoreSolutions currentSlug="seowebsite" />

    </main>
    </>
  )
}