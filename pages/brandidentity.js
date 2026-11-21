'use client'

import { useRef, useState, useEffect } from "react"
import Head from "next/head"
import { motion, useInView, useReducedMotion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FiCheck, FiArrowRight, FiArrowUpRight, FiArrowDown, FiFileText, FiGrid, FiGlobe, FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { Monitor, Megaphone, Search, Settings, Code2 } from "lucide-react"

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
function ScrollReveal({ children, delay = 0, y = 20, duration = 0.5, className = "", as = "div" }) {
  const Component = as === "li" ? motion.li : motion.div

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20px 0px" }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {children}
    </Component>
  )
}

// ------------------- Deliverable Card -------------------
function DeliverableCard({ icon: Icon, title, description }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-yellow-500/30 transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
        {Icon && <Icon className="w-6 h-6 text-yellow-500" />}
      </div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

// ------------------- Animated Brand Work Carousel -------------------
const BRAND_PORTFOLIO = [
  {
    title: "Solar Ark",
    category: "Renewable Energy & Tech",
    tag: "Renewable energy brand identity & web",
    description: "Brand strategy, clean-energy visual identity system, and high-performance digital presence for an advanced solar ecosystem.",
    img: "/images/Solar.png",
    impact: "Sustainable Brand Ecosystem",
    link: "/solarark",
  },
  {
    title: "Meher Infra Solutions",
    category: "Infrastructure & Real Estate",
    tag: "Infrastructure branding & portfolio",
    description: "Forward-thinking corporate identity, industrial brand architecture, and investor-ready digital showcase for sustainable infrastructure.",
    img: "/images/Meher.png",
    impact: "High-Value Investor Engagement",
    link: "/meher",
  },
  {
    title: "Lord of the Drinks",
    category: "Hospitality & Nightlife",
    tag: "Brand revival & social campaigns",
    description: "Revived Nagpur's landmark nightlife destination through refreshed brand visuals, experiential party campaigns, and viral food photography.",
    img: "/service/Amber-lit chevron wood bar interior-1.png",
    impact: "Renewed Footfall & Reach",
    link: "/clients/lord-of-the-drinks",
  },
  {
    title: "Tuli The Grand",
    category: "Luxury Dining & Hotel",
    tag: "Brand identity & luxury dining launch",
    description: "Prestigious identity system, bespoke typography, and launch strategy for an iconic hotel inaugurated by central ministers.",
    img: "/service/Golden paneer and grilled trio-2.png",
    impact: "VVIP Launch & Recognition",
    link: "/tulirestro",
  },
]

function BrandWorkCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef(null)

  const scrollToIndex = (index) => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const item = container.children[index]
    if (item) {
      const left = item.offsetLeft - container.offsetLeft
      container.scrollTo({ left, behavior: "smooth" })
      setCurrentIndex(index)
    }
  }

  const next = () => {
    const nextIdx = (currentIndex + 1) % BRAND_PORTFOLIO.length
    scrollToIndex(nextIdx)
  }

  const prev = () => {
    const prevIdx = (currentIndex - 1 + BRAND_PORTFOLIO.length) % BRAND_PORTFOLIO.length
    scrollToIndex(prevIdx)
  }

  // Auto-play: gently transitions every 4.5 seconds when not hovered
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prevIdx) => {
        const nextIdx = (prevIdx + 1) % BRAND_PORTFOLIO.length
        if (scrollContainerRef.current) {
          const item = scrollContainerRef.current.children[nextIdx]
          if (item) {
            const left = item.offsetLeft - scrollContainerRef.current.offsetLeft
            scrollContainerRef.current.scrollTo({ left, behavior: "smooth" })
          }
        }
        return nextIdx
      })
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused])

  // Sync index on manual drag / swipe
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    const handleScroll = () => {
      const itemWidth = container.children[0]?.clientWidth || 1
      const gap = 24
      const scrollPos = container.scrollLeft
      const idx = Math.round(scrollPos / (itemWidth + gap))
      if (idx >= 0 && idx < BRAND_PORTFOLIO.length && idx !== currentIndex) {
        setCurrentIndex(idx)
      }
    }
    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [currentIndex])

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative"
    >
      {/* Controls Bar */}
      <div className="flex items-center justify-between gap-4 mb-8">
        {/* Animated Progress Pills */}
        <div className="flex items-center gap-2">
          {BRAND_PORTFOLIO.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to project ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentIndex === idx
                  ? "w-10 bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-[0_0_12px_rgba(250,204,21,0.5)]"
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-3 font-mono">
            <span className="text-yellow-400 font-bold">0{currentIndex + 1}</span>
            <span className="text-gray-600 mx-1">/</span>
            <span>0{BRAND_PORTFOLIO.length}</span>
          </span>
        </div>

        {/* Prev / Next Slide Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous project"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-white/[0.03] hover:bg-yellow-400 hover:text-black hover:border-yellow-400 flex items-center justify-center text-white transition-all duration-300 shadow-lg active:scale-95 group"
          >
            <FiChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={next}
            aria-label="Next project"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-white/[0.03] hover:bg-yellow-400 hover:text-black hover:border-yellow-400 flex items-center justify-center text-white transition-all duration-300 shadow-lg active:scale-95 group"
          >
            <FiChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 sm:gap-8 pb-4 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing -mx-2 px-2 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {BRAND_PORTFOLIO.map((project) => (
          <div
            key={project.title}
            className="flex-shrink-0 w-[90vw] sm:w-[62vw] lg:w-[calc(50%-1rem)] snap-start"
          >
            <Link
              href={project.link}
              className="group block relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#141418] to-[#0d0d10] hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/15 transition-all duration-500 h-full flex flex-col justify-between hover:-translate-y-2"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 768px) 90vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                {/* Floating pill badge on image */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-gray-200 tracking-wider uppercase">
                  {project.category}
                </div>

                {/* Floating glowing action button */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all duration-300 shadow-[0_0_25px_rgba(250,204,21,0.55)]">
                  <FiArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <span className="inline-block text-xs text-yellow-400/90 font-medium tracking-wide mb-2.5">
                    {project.tag}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2.5 font-normal leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1.5 font-medium text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    {project.impact}
                  </span>
                  <span className="text-yellow-400 font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View project <FiArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BrandIdentityService() {
  const deliverables = [
    {
      icon: FiStar,
      title: "Logo Design",
      description: "Primary, secondary, and submark logos in multiple formats"
    },
    {
      icon: FiGlobe,
      title: "Color Palette",
      description: "Primary, secondary, and accent colors with usage guidelines"
    },
    {
      icon: FiFileText,
      title: "Typography System",
      description: "Font pairing recommendations and hierarchy guidelines"
    },
    {
      icon: FiGrid,
      title: "Brand Guidelines",
      description: "Comprehensive manual covering all brand applications"
    },
    {
      icon: FiGlobe,
      title: "Brand Assets",
      description: "Social media kits, business cards, and stationery designs"
    }
  ]

  const processSteps = [
    {
      title: "Discovery & Strategy",
      description: "Deep dive into your business, values, and target audience to establish brand positioning",
      color: "from-blue-500/20 to-blue-600/10"
    },
    {
      title: "Concept Development",
      description: "Multiple logo concepts and visual directions based on strategic insights",
      color: "from-purple-500/20 to-purple-600/10"
    },
    {
      title: "Visual Identity Design",
      description: "Development of complete brand system including colors, typography, and imagery",
      color: "from-yellow-500/20 to-yellow-600/10"
    },
    {
      title: "Application & Guidelines",
      description: "Creating real-world applications and comprehensive usage guidelines",
      color: "from-green-500/20 to-green-600/10"
    }
  ]

  const brandProjects = [
    {
      name: "EcoHarvest Organics",
      industry: "Organic Food Brand",
      description: "Complete rebranding with earthy color palette and sustainable packaging design",
      colors: ["#2D5A27", "#8DBB61", "#F5F5DC", "#1A1A1A"]
    },
    {
      name: "NexaTech Solutions",
      industry: "IT Services",
      description: "Modern tech brand with futuristic logo and clean, professional identity system",
      colors: ["#0066FF", "#00D4FF", "#0A0A0A", "#FFFFFF"]
    },
    {
      name: "Bloom Beauty",
      industry: "Cosmetics",
      description: "Feminine and elegant branding for premium skincare line with luxurious packaging",
      colors: ["#FF6B8B", "#FFD166", "#FFFFFF", "#1A1A1A"]
    },
    {
      name: "UrbanBrew Coffee",
      industry: "Coffee Shop Chain",
      description: "Vibrant urban coffee brand with distinctive typography and pattern system",
      colors: ["#8B4513", "#D4A76A", "#1A1A1A", "#FFFFFF"]
    }
  ]

  return (
    <>
      <Head>
        <title key="title">Brand Identity Design | Bizleap</title>
        <meta name="description" content="Bizleap crafts memorable brand identities that connect emotionally with your audience. From logos to complete brand systems, we build foundations for lasting success." key="description" />
        <meta name="keywords" content="brand identity, logo design Nagpur, corporate branding, brand systems" />
        <link rel="canonical" href="https://bizleap.in/brandidentity" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://bizleap.in/brandidentity#service",
              "url": "https://bizleap.in/brandidentity",
              "name": "Brand Identity Design",
              "description": "Bizleap crafts memorable brand identities that connect emotionally with your audience. From logos to complete brand systems, we build foundations for lasting success.",
              "provider": { "@id": "https://bizleap.in/#organization" },
              "serviceType": "Brand Identity & Design",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bizleap.in/" },
                  { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://bizleap.in/services" },
                  { "@type": "ListItem", "position": 3, "name": "Brand Identity Design", "item": "https://bizleap.in/brandidentity" }
                ]
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Brand Identity Deliverables",
                "itemListElement": [
                  { "@type": "Offer", "name": "Logo Design" },
                  { "@type": "Offer", "name": "Color Palette" },
                  { "@type": "Offer", "name": "Typography System" },
                  { "@type": "Offer", "name": "Brand Guidelines" },
                  { "@type": "Offer", "name": "Brand Assets & Social Media Kit" }
                ]
              }
            })
          }}
        />
      </Head>
      <main className="bg-black text-white min-h-screen">
      {/* Hero Section with Premium Stationery Background */}
      <section className="relative min-h-[82vh] lg:min-h-[860px] flex items-center pt-32 lg:pt-36 pb-20 px-6 sm:px-8 lg:px-16 overflow-hidden bg-black">
        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/service/Premium BIZLEAP Brand Stationery.png"
            alt="Premium BIZLEAP Brand Stationery"
            fill
            priority
            quality={100}
            className="object-cover object-right md:object-center"
          />
          {/* Subtle gradient overlays to ensure text is crisp & readable across all screen sizes */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent sm:via-black/60 lg:via-black/35 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gray-400 uppercase mb-5">
                BRAND IDENTITY DESIGN
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
                A brand people<br />
                <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">recognise.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-gray-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-lg mb-8">
                Distinctive logos. Cohesive visuals. A brand your audience remembers.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm sm:text-base rounded-md transition-all duration-300 shadow-lg shadow-yellow-400/10 hover:shadow-yellow-400/25 hover:-translate-y-0.5"
                >
                  Start a brand project
                  <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </Link>

                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white font-medium text-sm sm:text-base transition-colors hover:underline"
                >
                  See the work <FiArrowDown className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Concept watermark / caption at bottom right */}
        <div className="absolute bottom-6 right-8 lg:right-16 z-10 text-xs text-gray-400/70 tracking-wider font-light hidden sm:block pointer-events-none">
          identity system concept
        </div>
      </section>

      {/* Built For Recognition Section */}
      <section className="pt-14 pb-16 px-6 sm:px-8 lg:px-12 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Eyebrow + Headline */}
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-[2px] bg-yellow-400"></span>
                  <span className="text-[11px] font-semibold tracking-[0.25em] text-gray-400 uppercase font-sans">
                    BUILT FOR RECOGNITION
                  </span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-bold text-white tracking-tight leading-[1.08]">
                  More than a logo.<br />
                  A lasting impression.
                </h2>
              </ScrollReveal>
            </div>

            {/* Right Column: 3 Pillars aligned with headline */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 pt-1">
              {[
                {
                  num: "01",
                  title: "Be recognised",
                  desc: "A distinctive identity helps you stand out in a crowded market."
                },
                {
                  num: "02",
                  title: "Build trust",
                  desc: "Consistent branding creates credibility and deeper connections."
                },
                {
                  num: "03",
                  title: "Stay consistent",
                  desc: "Clear guidelines keep your brand unified across every touchpoint."
                }
              ].map((item, idx) => (
                <ScrollReveal key={idx} delay={0.15 + idx * 0.1}>
                  <div className="flex flex-col">
                    <div className="text-base font-bold text-gray-400 mb-2 font-sans">
                      {item.num}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-white mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <div className="w-6 h-[2px] bg-yellow-400 mb-3"></div>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get & Identity System Deliverables Section */}
      <section className="py-16 lg:py-20 px-6 sm:px-8 lg:px-12 bg-black border-t border-white/10 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column (7 of 12 cols, ~58% width): Eyebrow, Heading, and Book Mockup */}
            <div className="lg:col-span-7 flex flex-col">
              <ScrollReveal y={16} duration={0.5}>
                <span className="block text-[11px] font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3 font-sans">
                  WHAT YOU’LL GET
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] font-bold tracking-tight text-white leading-[1.05] mb-5 sm:mb-6">
                  Your complete<br />
                  <span className="font-serif italic font-normal text-yellow-400">identity system.</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal y={16} delay={0.12} duration={0.6}>
                <div className="relative w-full rounded-sm overflow-hidden bg-black shadow-2xl">
                  {/* High quality photograph of open brand manual on stone block */}
                  <Image
                    src="/service/Open BIZLEAP brand manual on stone.png"
                    alt="BIZLEAP Brand Guidelines open manual on stone specimen showing typography, colour swatches, and logo variations"
                    width={1536}
                    height={1024}
                    priority
                    className="w-full h-auto object-cover rounded-sm"
                    sizes="(max-width: 900px) 100vw, 58vw"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column (5 of 12 cols, ~42% width): Numbered Deliverables Box aligned with the top */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              <div className="border border-white/10 divide-y divide-white/10 bg-[#0a0a0c] rounded-none shadow-2xl">
                {[
                  {
                    num: "01",
                    title: "Logo suite",
                    desc: "Primary, secondary and icon variations."
                  },
                  {
                    num: "02",
                    title: "Colour palette",
                    desc: "HEX, RGB and CMYK specifications."
                  },
                  {
                    num: "03",
                    title: "Typography",
                    desc: "Type choices and hierarchy."
                  },
                  {
                    num: "04",
                    title: "Brand guidelines",
                    desc: "Usage rules and applications."
                  },
                  {
                    num: "05",
                    title: "Launch assets",
                    desc: "Stationery and social templates, as scoped."
                  }
                ].map((item, idx) => (
                  <ScrollReveal
                    key={idx}
                    as="div"
                    y={12}
                    delay={0.1 + idx * 0.08}
                    duration={0.45}
                    className="flex items-center px-6 sm:px-7 py-5 sm:py-6 gap-5 sm:gap-6"
                  >
                    {/* Number */}
                    <span className="font-serif font-bold text-2xl sm:text-3xl text-yellow-400 select-none w-10 shrink-0">
                      {item.num}
                    </span>

                    {/* Subtle vertical separator line */}
                    <div className="h-8 w-[1px] bg-white/20 shrink-0"></div>

                    {/* Title & Description */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-white leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 lg:py-20 px-6 sm:px-8 lg:px-12 bg-black border-t border-white/10 text-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-[11px] font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3 font-sans">
              OUR PROCESS
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-12">
              From brief to brand.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
            {[
              {
                num: "01",
                title: "Discover",
                desc: "We learn about your goals, audience and market."
              },
              {
                num: "02",
                title: "Explore",
                desc: "We develop strategic concepts and creative direction."
              },
              {
                num: "03",
                title: "Refine",
                desc: "We iterate and fine-tune the chosen direction."
              },
              {
                num: "04",
                title: "Deliver",
                desc: "You receive a complete, ready-to-use brand identity."
              }
            ].map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="relative flex flex-col">
                  {/* Circle number badge and horizontal connecting arrow to next step */}
                  <div className="relative flex items-center mb-5">
                    <div className="w-10 h-10 rounded-full border border-yellow-400 bg-black z-10 flex items-center justify-center text-yellow-400 font-serif font-bold text-sm shrink-0">
                      {step.num}
                    </div>

                    {/* Connecting line + arrow spanning across the column gap on desktop */}
                    {idx < 3 && (
                      <div className="hidden lg:flex items-center absolute left-10 right-[-2rem] top-1/2 -translate-y-1/2 z-0 pr-1">
                        <div className="h-[1px] bg-white/20 flex-1"></div>
                        <svg
                          className="w-2.5 h-2.5 text-white/40 -ml-0.5 shrink-0"
                          viewBox="0 0 6 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        >
                          <path d="M1 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section id="portfolio" className="py-20 lg:py-24 px-6 sm:px-8 lg:px-12 bg-[#0a0a0c] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gray-400 uppercase">
                    SELECTED WORK
                  </span>
                  <span className="w-8 h-[2px] bg-yellow-400"></span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  Brands in the <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">real world.</span>
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.15}>
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-white hover:text-yellow-400 transition-colors border-b border-white/30 pb-0.5 hover:border-yellow-400 w-fit"
              >
                View all work <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Animated Brand Work Carousel */}
          <BrandWorkCarousel />

          {/* Illustrative caption below cards */}
          <p className="mt-4 text-xs text-gray-500 font-normal">
            Swipe or use controls to browse selected work. Image previews are illustrative.
          </p>


        </div>
      </section>

      {/* Tools Behind The Craft Section */}
      <section className="py-20 lg:py-24 px-6 sm:px-8 lg:px-16 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Tools behind the craft.
              </h2>
              <span className="w-10 h-[2px] bg-yellow-400 mt-2"></span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 border border-white/10 divide-x divide-y divide-white/10 bg-[#0d0d0f]/60 rounded-xl overflow-hidden">
            {[
              { name: "Illustrator", icon: "/service/tools/illustrator.png" },
              { name: "Photoshop", icon: "/service/tools/photoshop.png" },
              { name: "Figma", icon: "/service/tools/figma.png" },
              { name: "InDesign", icon: "/service/tools/indesign.png" },
              { name: "Procreate", icon: "/service/tools/procreate.png" },
              { name: "After Effects", icon: "/service/tools/aftereffects.png" },
              { name: "Blender", icon: "/service/tools/blender.png" },
              { name: "Glyphs", icon: "/service/tools/glyphs.png" },
            ].map((tool, index) => (
              <ScrollReveal key={index} delay={index * 0.04}>
                <div className="flex items-center gap-4 p-5 sm:p-7 hover:bg-white/[0.04] transition-colors duration-300">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 relative flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={tool.icon}
                      alt={tool.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-semibold text-white text-sm sm:text-base tracking-wide">
                    {tool.name}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Identity Services Section */}
      <section className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-[#0a0a0c] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gray-400 uppercase">
                KEEP BUILDING
              </span>
              <span className="w-8 h-[2px] bg-yellow-400"></span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="max-w-3xl mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
                Your brand, <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">beyond identity.</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Connect your brand identity with scalable engineering, high-growth marketing, and modern automation.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 bg-gradient-to-b from-[#111115]/90 to-[#0a0a0d]/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl shadow-black/80">
            {/* 1. Development Services */}
            <ScrollReveal delay={0.15} className="border-b md:border-r border-white/10">
              <Link
                href="https://www.bizdevelopment.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-5 sm:gap-6 p-6 sm:p-8 lg:p-10 hover:bg-gradient-to-br hover:from-white/[0.05] hover:via-yellow-400/[0.02] hover:to-transparent transition-all duration-300 h-full"
              >
                <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-yellow-400 group-hover:border-yellow-400/40 group-hover:bg-yellow-400/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Code2 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                        Development Services
                      </h3>
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-yellow-400 bg-yellow-400/10 border border-yellow-400/25 px-2 py-0.5 rounded-md">
                        New Tab
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-normal leading-relaxed">
                      Custom websites, modern web applications, and scalable digital platforms.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 group-hover:text-yellow-400 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10 transition-all duration-300 shrink-0">
                  <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </ScrollReveal>

            {/* 2. Social media marketing */}
            <ScrollReveal delay={0.2} className="border-b border-white/10">
              <Link
                href="/socialmedia"
                className="group flex items-center justify-between gap-5 sm:gap-6 p-6 sm:p-8 lg:p-10 hover:bg-gradient-to-br hover:from-white/[0.05] hover:via-yellow-400/[0.02] hover:to-transparent transition-all duration-300 h-full"
              >
                <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-yellow-400 group-hover:border-yellow-400/40 group-hover:bg-yellow-400/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Megaphone className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      Social media marketing
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-normal leading-relaxed">
                      Show up with a consistent voice, impactful campaigns, and community growth.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 group-hover:text-yellow-400 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10 transition-all duration-300 shrink-0">
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </ScrollReveal>

            {/* 3. SEO & website audits */}
            <ScrollReveal delay={0.25} className="border-b md:border-b-0 md:border-r border-white/10">
              <Link
                href="/seowebsite"
                className="group flex items-center justify-between gap-5 sm:gap-6 p-6 sm:p-8 lg:p-10 hover:bg-gradient-to-br hover:from-white/[0.05] hover:via-yellow-400/[0.02] hover:to-transparent transition-all duration-300 h-full"
              >
                <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-yellow-400 group-hover:border-yellow-400/40 group-hover:bg-yellow-400/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Search className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      SEO & website audits
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-normal leading-relaxed">
                      Make your business easier to find with data-driven search and site optimization.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 group-hover:text-yellow-400 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10 transition-all duration-300 shrink-0">
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </ScrollReveal>

            {/* 4. AI & automation */}
            <ScrollReveal delay={0.3}>
              <Link
                href="/aiservices"
                className="group flex items-center justify-between gap-5 sm:gap-6 p-6 sm:p-8 lg:p-10 hover:bg-gradient-to-br hover:from-white/[0.05] hover:via-yellow-400/[0.02] hover:to-transparent transition-all duration-300 h-full"
              >
                <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-yellow-400 group-hover:border-yellow-400/40 group-hover:bg-yellow-400/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Settings className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      AI & automation
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-normal leading-relaxed">
                      Simplify the work behind your brand with intelligent workflows and automations.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 group-hover:text-yellow-400 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10 transition-all duration-300 shrink-0">
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>



    </main>
    </>
  )
}