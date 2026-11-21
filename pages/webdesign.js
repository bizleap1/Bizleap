'use client'

import { useRef, useState, useEffect } from "react"
import Head from "next/head"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import ExploreMoreSolutions from "../components/ExploreMoreSolutions"
import { Playfair_Display, Inter } from "next/font/google"
import { FiArrowRight, FiSmartphone, FiLayout, FiUsers, FiZap, FiChevronLeft, FiChevronRight } from "react-icons/fi"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

// ------------------- InView Scroll Reveal -------------------
function ScrollReveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20px 0px" }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {children}
    </motion.div>
  )
}

// ------------------- Process Step Component -------------------
function ProcessStep({ number, title, description, icon: Icon }) {
  return (
    <div className="group flex flex-col md:flex-row gap-6 items-start p-7 rounded-2xl bg-[#0d0d0f] border border-[#222222] hover:border-[#FFC000]/40 transition-all duration-300">
      <div className="flex-shrink-0">
        <div className={`w-12 h-12 rounded-xl bg-[#141416] border border-[#2c2c30] group-hover:border-[#FFC000] group-hover:bg-[#FFC000] group-hover:text-black flex items-center justify-center text-[#FFC000] font-bold text-xl transition-all duration-300 font-serif ${playfair.className}`}>
          {number}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2.5">
          {Icon && <Icon className="w-5 h-5 text-[#FFC000]" />}
          <h3 className={`text-xl font-bold text-white group-hover:text-[#FFC000] transition-colors ${inter.className}`}>
            {title}
          </h3>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed font-sans">{description}</p>
      </div>
    </div>
  )
}

// ------------------- Projects Carousel -------------------
const PROJECTS = [
  { name: "Anantara Hotel", description: "Luxury hospitality website designed with premium visuals and a seamless user experience.", url: "https://anantarahotel.com", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200", tags: ["Hospitality", "Luxury", "UI/UX"] },
  { name: "Best Resort in Konkan", description: "Tourism and resort website focused on immersive visuals and smooth navigation.", url: "https://bestresortinkonkan.com", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200", tags: ["Tourism", "Resort", "Visuals"] },
  { name: "Kuber Groups", description: "Corporate business website designed to represent a strong digital presence.", url: "https://kubergroups.in", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200", tags: ["Corporate", "Business", "Modern"] },
  { name: "The Tiger Brand", description: "Brand-focused website highlighting products with modern design elements.", url: "https://thetigerbrand.in", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=1200", tags: ["E-commerce", "Branding", "Minimal"] },
  { name: "CITL Nagpur", description: "Educational institute website built with structured information architecture.", url: "https://citlnagpur.com", img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200", tags: ["Education", "Institute", "Structured"] },
  { name: "Jain Broker", description: "Professional brokerage and financial services website with clear navigation.", url: "https://www.jainbroker.com", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200", tags: ["Finance", "Brokerage", "Professional"] },
  { name: "Jain Groups", description: "Modern corporate website built with responsive and scalable design.", url: "https://jain-groups-chi.vercel.app", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", tags: ["Corporate", "Responsive", "Scalable"] },
  { name: "SSIT Nagpur", description: "Educational institution website with student-focused interface and accessibility.", url: "https://ssitngp.in", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200", tags: ["Education", "Accessibility", "UI/UX"] },
  { name: "The Solar Ark", description: "Renewable energy company website presenting solar solutions and services.", url: "https://thesolarark.com", img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200", tags: ["Renewable", "Energy", "Clean"] },
  { name: "EEFA Hotel", description: "Hotel website designed with elegant UI and hospitality-focused layout.", url: "https://eefa-hotel.vercel.app", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200", tags: ["Hotel", "UI/UX", "Elegant"] },
  { name: "Nilkantha Chemicals", description: "Industrial corporate website showcasing products and manufacturing services.", url: "https://nilkanthachemicals.com", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200", tags: ["Industrial", "Manufacturing", "B2B"] },
]

function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef(null)

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current.children[index]
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  const next = () => { const i = Math.min(currentIndex + 1, PROJECTS.length - 1); setCurrentIndex(i); scrollToIndex(i) }
  const prev = () => { const i = Math.max(currentIndex - 1, 0); setCurrentIndex(i); scrollToIndex(i) }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    const onScroll = () => {
      const itemW = container.children[0]?.clientWidth || 1
      const idx = Math.round(container.scrollLeft / itemW)
      if (idx !== currentIndex && idx >= 0 && idx < PROJECTS.length) setCurrentIndex(idx)
    }
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [currentIndex])

  return (
    <div>
      {/* Nav Controls */}
      <div className="flex items-center justify-center gap-6 mb-10">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          aria-label="Previous project"
          className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${
            currentIndex === 0
              ? 'border-gray-800 text-gray-700 cursor-not-allowed'
              : 'border-[#333333] text-white hover:border-[#FFC000] hover:text-[#FFC000] hover:bg-[#FFC000]/10'
          }`}
        >
          <FiChevronLeft className="text-xl" />
        </button>
        <span className="text-white font-medium tabular-nums font-sans">
          <span className="text-2xl text-[#FFC000]">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="text-gray-600 mx-2">/</span>
          <span className="text-gray-500">{String(PROJECTS.length).padStart(2, '0')}</span>
        </span>
        <button
          onClick={next}
          disabled={currentIndex === PROJECTS.length - 1}
          aria-label="Next project"
          className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${
            currentIndex === PROJECTS.length - 1
              ? 'border-gray-800 text-gray-700 cursor-not-allowed'
              : 'border-[#333333] text-white hover:border-[#FFC000] hover:text-[#FFC000] hover:bg-[#FFC000]/10'
          }`}
        >
          <FiChevronRight className="text-xl" />
        </button>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory pb-10 gap-6 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PROJECTS.map((project, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[88vw] sm:w-[45vw] lg:w-[calc(33.333%-1rem)] snap-center"
          >
            <div className="group flex flex-col h-full hover:-translate-y-2 transition-transform duration-500 bg-[#0d0d0f] border border-[#202024] hover:border-[#FFC000]/50 rounded-2xl p-4 sm:p-5 shadow-xl">
              {/* MacBook Mockup */}
              <div className="relative pt-[4%] px-[6%] pb-0 mb-6">
                <div className="relative z-10 aspect-[16/10] bg-[#1a1a1a] rounded-t-[3%] overflow-hidden border-[6px] border-[#222] shadow-2xl">
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#333] z-20" />
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={project.img}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 88vw, 640px"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full bg-[#FFC000] flex items-center justify-center -translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_0_30px_rgba(255,192,0,0.5)]"
                      >
                        <FiArrowRight className="text-black text-xl stroke-[2.5]" />
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Base */}
                <div className="h-2.5 bg-[#2a2a2a] rounded-b-2xl border-t border-white/5" />
                <div className="mx-auto w-1/3 h-1.5 bg-[#1a1a1a] rounded-b-xl" />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col px-1">
                <div className="flex items-start gap-3 mb-2.5 justify-between">
                  <h3 className={`text-xl sm:text-2xl font-bold text-white group-hover:text-[#FFC000] transition-colors leading-snug ${playfair.className}`}>
                    {project.name}
                  </h3>
                  <span className="mt-1 shrink-0 px-2 py-0.5 rounded border border-[#FFC000]/30 text-[#FFC000] text-[10px] uppercase font-sans tracking-widest bg-[#FFC000]/5">
                    {project.tags[0]}
                  </span>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-2 flex-1 font-sans">
                  {project.description}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#FFC000] font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider hover:gap-3 transition-all pt-3.5 border-t border-[#222224] group/link"
                >
                  Visit Website
                  <FiArrowRight className="transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentIndex(i); scrollToIndex(i) }}
            aria-label={`Go to project ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              i === currentIndex ? 'bg-[#FFC000] w-10' : 'bg-gray-700 w-3 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}

export default function WebDesignService() {
  const [activeFeature, setActiveFeature] = useState("04")

  const workHoldUpFeatures = [
    {
      num: "01",
      title: "User-centred design",
      desc: "We design around real user needs and business goals to create intuitive, effective experiences."
    },
    {
      num: "02",
      title: "Mobile-first layouts",
      desc: "Layouts are built for smaller screens first, then enhanced for larger devices."
    },
    {
      num: "03",
      title: "Interactive prototypes",
      desc: "We use interactive prototypes to validate ideas, refine user flows and align early on design and functionality."
    },
    {
      num: "04",
      title: "Accessible experiences",
      desc: "We follow WCAG 2.1 guidance to help more people access and use your website effectively."
    },
    {
      num: "05",
      title: "Cross-browser testing",
      desc: "We test across modern browsers to ensure a consistent and reliable experience."
    },
    {
      num: "06",
      title: "Performance optimisation",
      desc: "We optimise code, assets and structure to help your site run smoothly and respond quickly."
    },
    {
      num: "07",
      title: "SEO-ready structure",
      desc: "We build with clean code, logical structure and on-page best practices to support search visibility."
    },
    {
      num: "08",
      title: "CMS integration",
      desc: "We integrate content management systems so you can easily update and manage your content."
    }
  ]

  const deliveryStandards = [
    "Responsive across key screen sizes",
    "Performance tested before launch",
    "Accessibility considered against WCAG guidance",
    "Reviewed across modern browsers"
  ]

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Research",
      description: "We analyze your business goals, target audience, and competitors to establish project requirements and user personas.",
      icon: FiUsers
    },
    {
      number: "02",
      title: "Wireframing & Planning",
      description: "Low-fidelity wireframes map out user flows and information architecture before visual design begins.",
      icon: FiLayout
    },
    {
      number: "03",
      title: "UI Design & Prototyping",
      description: "High-fidelity designs with interactive prototypes that showcase animations, transitions, and user interactions.",
      icon: FiSmartphone
    },
    {
      number: "04",
      title: "Development Handoff",
      description: "Complete design systems, assets, and documentation for seamless developer implementation.",
      icon: FiZap
    }
  ]

  return (
    <>
      <Head>
        <title key="title">UI/UX &amp; Web Design | Bizleap</title>
        <meta name="description" content="Bizleap crafts intuitive, visually stunning websites and applications. Our user-centered UI/UX design approach ensures every decision drives engagement." key="description" />
        <meta name="keywords" content="web design Nagpur, ui ux design agency, custom website development" />
        <link rel="canonical" href="https://bizleap.in/webdesign" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://bizleap.in/webdesign#service",
              "url": "https://bizleap.in/webdesign",
              "name": "UI/UX & Web Design",
              "description": "Bizleap crafts intuitive, visually stunning websites and applications using user-centered design principles. Mobile-first, responsive, and SEO-friendly by default.",
              "provider": { "@id": "https://bizleap.in/#organization" },
              "serviceType": "Web Design & UI/UX",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bizleap.in/" },
                  { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://bizleap.in/services" },
                  { "@type": "ListItem", "position": 3, "name": "UI/UX & Web Design", "item": "https://bizleap.in/webdesign" }
                ]
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Web Design Services",
                "itemListElement": [
                  { "@type": "Offer", "name": "User-Centered Design" },
                  { "@type": "Offer", "name": "Mobile-First Responsive Design" },
                  { "@type": "Offer", "name": "Interactive Prototypes" },
                  { "@type": "Offer", "name": "Accessibility Compliance (WCAG 2.1)" },
                  { "@type": "Offer", "name": "Performance Optimization" },
                  { "@type": "Offer", "name": "SEO-Friendly Structure" }
                ]
              }
            })
          }}
        />
      </Head>

      <main className={`bg-black text-white min-h-screen ${inter.className}`}>
        {/* ========================================================= */}
        {/* 1. HERO SECTION WITH EXACT SHOWCASE BACKGROUND            */}
        {/* ========================================================= */}
        <section className="relative min-h-[88vh] lg:min-h-[880px] flex items-center pt-32 lg:pt-36 pb-20 px-6 sm:px-8 lg:px-16 overflow-hidden bg-black">
          {/* Full-bleed Background Image with Subtle Overlays */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/service/Responsive website showcase with open space.png"
              alt="UI/UX & Web Design - Digital experiences designed to work beautifully"
              fill
              priority
              quality={100}
              className="object-cover object-right md:object-right"
              sizes="100vw"
            />
            {/* Subtle gradient overlays to guarantee crisp text readability across viewports */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent sm:via-black/75 lg:via-black/35 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />
          </div>

          {/* Hero Content */}
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="max-w-xl lg:max-w-2xl">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="w-8 h-[2px] bg-[#FFC000] inline-block" />
                  <span className="font-sans text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#FFC000] uppercase">
                    UI/UX &amp; WEB DESIGN
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className={`font-serif text-5xl sm:text-6xl lg:text-[70px] xl:text-[76px] font-bold tracking-tight text-white leading-[1.08] mb-6 ${playfair.className}`}>
                  Digital experiences<br />
                  designed to<br />
                  <span className="font-serif italic font-medium text-[#FFC000]">work beautifully.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="font-sans text-gray-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-lg mb-8 sm:mb-10">
                  We create clear, intuitive websites and digital products that help users take action and support real business goals.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10 sm:mb-12 font-sans">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FFC000] hover:bg-[#ffcd2b] text-black font-semibold text-sm sm:text-base rounded-md transition-all duration-300 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/25 hover:-translate-y-0.5"
                  >
                    <span>Start your project</span>
                    <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>

                  <Link
                    href="#portfolio"
                    className="inline-flex items-center justify-center px-7 py-3.5 bg-transparent hover:bg-white/5 text-white font-medium text-sm sm:text-base rounded-md border border-[#333333] hover:border-white/40 transition-all duration-300"
                  >
                    View our work
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="font-sans text-xs sm:text-sm text-gray-400 tracking-wide flex items-center gap-3">
                  <span>User journeys</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC000]/60 inline-block" />
                  <span>Responsive design</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC000]/60 inline-block" />
                  <span>Conversion-focused</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. BUILT WITH INTENT - WHAT MAKES THE WORK HOLD UP        */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-black text-white border-t border-[#1c1c1c]">
          <div className="max-w-7xl mx-auto">
            {/* Header: Title Left + Subtitle Right with Vertical Divider */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <ScrollReveal>
                  <p className="font-sans text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#FFC000] uppercase mb-3 sm:mb-4">
                    BUILT WITH INTENT
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <h2 className={`font-serif text-4xl sm:text-5xl lg:text-[56px] xl:text-[60px] font-bold text-white tracking-tight leading-[1.06] ${playfair.className}`}>
                    What makes the work<br />
                    <span className="font-serif italic font-medium text-[#FFC000]">hold up.</span>
                  </h2>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.15}>
                <div className="border-l border-[#333333] pl-6 py-1 max-w-sm lg:max-w-md">
                  <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed">
                    Thoughtful design decisions, reliable development and a clear standard for every screen.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Main Grid: 8 Items Left | Tools + Delivery Standards Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column (Col 7): 8 Features Grid in 4 Rows x 2 Cols */}
              <div className="lg:col-span-7 border-t border-b border-[#1c1c1f]">
                {[0, 2, 4, 6].map((startIndex, rowIdx) => {
                  const itemA = workHoldUpFeatures[startIndex]
                  const itemB = workHoldUpFeatures[startIndex + 1]

                  return (
                    <div
                      key={rowIdx}
                      className="grid grid-cols-1 sm:grid-cols-2 border-b border-[#1c1c1f] last:border-b-0 divide-y sm:divide-y-0 sm:divide-x divide-[#1c1c1f]"
                    >
                      {/* Left Cell */}
                      <ScrollReveal delay={0.08 + rowIdx * 0.04} className="h-full">
                        <div
                          onMouseEnter={() => setActiveFeature(itemA.num)}
                          className={`p-6 sm:p-7 transition-all duration-300 relative h-full flex flex-col justify-start cursor-pointer rounded-xl m-1 ${
                            activeFeature === itemA.num
                              ? "bg-[#141416] border border-[#2a2a2e] shadow-lg"
                              : "bg-transparent border border-transparent hover:bg-white/[0.03]"
                          }`}
                        >
                          <div className="flex items-start gap-4 sm:gap-5">
                            <span className="text-[#FFC000] font-bold text-sm sm:text-base font-sans select-none shrink-0 pt-0.5">
                              {itemA.num}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-base sm:text-lg font-bold text-white mb-2 leading-snug ${inter.className}`}>
                                {itemA.title}
                              </h3>
                              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
                                {itemA.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>

                      {/* Right Cell */}
                      <ScrollReveal delay={0.12 + rowIdx * 0.04} className="h-full">
                        <div
                          onMouseEnter={() => setActiveFeature(itemB.num)}
                          className={`p-6 sm:p-7 transition-all duration-300 relative h-full flex flex-col justify-start cursor-pointer rounded-xl m-1 ${
                            activeFeature === itemB.num
                              ? "bg-[#141416] border border-[#2a2a2e] shadow-lg"
                              : "bg-transparent border border-transparent hover:bg-white/[0.03]"
                          }`}
                        >
                          <div className="flex items-start gap-4 sm:gap-5">
                            <span className="text-[#FFC000] font-bold text-sm sm:text-base font-sans select-none shrink-0 pt-0.5">
                              {itemB.num}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-base sm:text-lg font-bold text-white mb-2 leading-snug ${inter.className}`}>
                                {itemB.title}
                              </h3>
                              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
                                {itemB.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    </div>
                  )
                })}
              </div>

              {/* Right Column (Col 5): Tools We Work With + Delivery Standards */}
              <div className="lg:col-span-5 space-y-6">
                {/* Card 1: Tools we work with */}
                <ScrollReveal delay={0.15}>
                  <div className="bg-[#0c0c0e] border border-[#1f1f22] rounded-2xl p-6 sm:p-7 shadow-xl">
                    <h3 className={`font-serif text-2xl font-bold text-white mb-6 ${playfair.className}`}>
                      Tools we work with
                    </h3>

                    {/* Row 1: DESIGN */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1c1c1f]">
                      <span className="font-sans text-[11px] font-semibold tracking-widest text-gray-500 uppercase w-32 shrink-0">
                        DESIGN
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3.5 sm:px-4 py-1.5 rounded-lg border border-[#FFC000] text-[#FFC000] bg-[#FFC000]/5 text-xs sm:text-sm font-medium font-sans">
                          Figma
                        </span>
                        <span className="px-3.5 sm:px-4 py-1.5 rounded-lg border border-[#26262a] text-gray-300 hover:text-white hover:border-[#38383e] text-xs sm:text-sm font-medium font-sans transition-colors">
                          Adobe XD
                        </span>
                        <span className="px-3.5 sm:px-4 py-1.5 rounded-lg border border-[#26262a] text-gray-300 hover:text-white hover:border-[#38383e] text-xs sm:text-sm font-medium font-sans transition-colors">
                          Sketch
                        </span>
                      </div>
                    </div>

                    {/* Row 2: BUILD */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-[#1c1c1f]">
                      <span className="font-sans text-[11px] font-semibold tracking-widest text-gray-500 uppercase w-32 shrink-0">
                        BUILD
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3.5 sm:px-4 py-1.5 rounded-lg border border-[#26262a] text-gray-300 hover:text-white hover:border-[#38383e] text-xs sm:text-sm font-medium font-sans transition-colors">
                          Webflow
                        </span>
                        <span className="px-3.5 sm:px-4 py-1.5 rounded-lg border border-[#26262a] text-gray-300 hover:text-white hover:border-[#38383e] text-xs sm:text-sm font-medium font-sans transition-colors">
                          React
                        </span>
                        <span className="px-3.5 sm:px-4 py-1.5 rounded-lg border border-[#26262a] text-gray-300 hover:text-white hover:border-[#38383e] text-xs sm:text-sm font-medium font-sans transition-colors">
                          Next.js
                        </span>
                      </div>
                    </div>

                    {/* Row 3: STYLING & MOTION */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
                      <span className="font-sans text-[11px] font-semibold tracking-widest text-gray-500 uppercase w-32 shrink-0">
                        STYLING &amp; MOTION
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3.5 sm:px-4 py-1.5 rounded-lg border border-[#26262a] text-gray-300 hover:text-white hover:border-[#38383e] text-xs sm:text-sm font-medium font-sans transition-colors">
                          Tailwind CSS
                        </span>
                        <span className="px-3.5 sm:px-4 py-1.5 rounded-lg border border-[#26262a] text-gray-300 hover:text-white hover:border-[#38383e] text-xs sm:text-sm font-medium font-sans transition-colors">
                          GSAP
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Card 2: Delivery standards */}
                <ScrollReveal delay={0.25}>
                  <div className="bg-[#0c0c0e] border border-[#1f1f22] rounded-2xl p-6 sm:p-7 shadow-xl">
                    <h3 className={`font-serif text-2xl font-bold text-white mb-6 ${playfair.className}`}>
                      Delivery standards
                    </h3>

                    <div className="space-y-0 divide-y divide-[#1c1c1f]">
                      {deliveryStandards.map((standard, idx) => (
                        <div key={idx} className="flex items-center gap-3.5 py-3.5 first:pt-0 last:pb-0">
                          <span className="w-3 h-3 bg-[#FFC000] rounded-[2px] shrink-0" />
                          <span className="font-sans text-xs sm:text-sm text-gray-300 font-medium">
                            {standard}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="font-sans text-xs text-gray-500 mt-6 tracking-wide">
                      Final targets depend on project scope, content and hosting.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. PROCESS - A STRUCTURED PATH                            */}
        {/* ========================================================= */}
        <section id="process" className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-black text-white border-t border-[#1c1c1c]">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="flex items-center justify-center gap-2.5 mb-3">
                  <span className="w-6 h-[2px] bg-[#FFC000] inline-block" />
                  <span className="font-sans text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#FFC000] uppercase">
                    HOW WE WORK
                  </span>
                </div>
                <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.08] mb-4 ${playfair.className}`}>
                  Our design <span className="font-serif italic font-medium text-[#FFC000]">process.</span>
                </h2>
                <p className="font-sans text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  A structured approach that ensures clarity, collaboration, and outstanding results at every stage.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {processSteps.map((step, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <ProcessStep {...step} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. PORTFOLIO - RECENT WEB DESIGN PROJECTS                 */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-black text-white border-t border-[#1c1c1c] overflow-hidden" id="portfolio">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
                <div className="flex items-center justify-center gap-2.5 mb-3">
                  <span className="w-6 h-[2px] bg-[#FFC000] inline-block" />
                  <span className="font-sans text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#FFC000] uppercase">
                    FEATURED WORK
                  </span>
                </div>
                <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.08] mb-4 ${playfair.className}`}>
                  Recent web design <span className="font-serif italic font-medium text-[#FFC000]">projects.</span>
                </h2>
                <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                  See how we&apos;ve transformed digital experiences for businesses across industries through modern UI/UX design, responsive development, and performance-optimized websites.
                </p>
              </div>
            </ScrollReveal>

            <ProjectsCarousel />
          </div>
        </section>

        {/* Explore More Solutions */}
        <ExploreMoreSolutions currentSlug="webdesign" />
      </main>
    </>
  )
}
