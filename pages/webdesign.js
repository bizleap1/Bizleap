'use client'

import { useRef, useState, useEffect } from "react"
import Head from "next/head";
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FiCheck, FiArrowRight, FiSmartphone, FiLayout, FiUsers, FiZap, FiChevronLeft, FiChevronRight } from "react-icons/fi"

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

// ------------------- Process Step Component -------------------
function ProcessStep({ number, title, description, icon: Icon }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-yellow-500/30 transition-all duration-300">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-black font-bold text-xl">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          {Icon && <Icon className="w-5 h-5 text-yellow-500" />}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-400 leading-relaxed">{description}</p>
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
          className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${currentIndex === 0 ? 'border-gray-800 text-gray-700 cursor-not-allowed' : 'border-white text-white hover:bg-white hover:text-black'
            }`}
        >
          <FiChevronLeft className="text-xl" />
        </button>
        <span className="text-white font-medium tabular-nums">
          <span className="text-2xl">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="text-gray-600 mx-2">/</span>
          <span className="text-gray-500">{String(PROJECTS.length).padStart(2, '0')}</span>
        </span>
        <button
          onClick={next}
          disabled={currentIndex === PROJECTS.length - 1}
          aria-label="Next project"
          className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${currentIndex === PROJECTS.length - 1 ? 'border-gray-800 text-gray-700 cursor-not-allowed' : 'border-white text-white hover:bg-white hover:text-black'
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
            <div className="group flex flex-col h-full hover:-translate-y-2 transition-transform duration-500">
              {/* MacBook Mockup */}
              <div className="relative pt-[5%] px-[10%] pb-0 mb-6">
                <div className="relative z-10 aspect-[16/10] bg-[#1a1a1a] rounded-t-[3%] overflow-hidden border-[7px] border-[#222] shadow-2xl">
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#333] z-20" />
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={project.img}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 88vw, 640px"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                      >
                        <FiArrowRight className="text-black text-xl" />
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Base */}
                <div className="h-2.5 bg-[#2a2a2a] rounded-b-2xl border-t border-white/5" />
                <div className="mx-auto w-1/3 h-1.5 bg-[#1a1a1a] rounded-b-xl" />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col px-2">
                <div className="flex items-start gap-3 mb-3">
                  <h3 className="text-2xl font-bold group-hover:text-yellow-400 transition-colors">{project.name}</h3>
                  <span className="mt-1 shrink-0 px-2 py-0.5 rounded border border-yellow-500/20 text-yellow-500/60 text-[10px] uppercase tracking-widest">{project.tags[0]}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">{project.description}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-yellow-500 font-semibold text-sm uppercase tracking-widest hover:gap-4 transition-all pt-4 border-t border-gray-800 group/link"
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
            className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-yellow-500 w-10' : 'bg-gray-700 w-3 hover:bg-gray-500'
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
  const features = [
    "User-Centered Design Approach",
    "Mobile-First Responsive Design",
    "Interactive Prototypes",
    "Accessibility Compliance (WCAG 2.1)",
    "Cross-Browser Compatibility",
    "Performance Optimization",
    "SEO-Friendly Structure",
    "Content Management Integration"
  ]

  const processSteps = [
    {
      number: "1",
      title: "Discovery & Research",
      description: "We analyze your business goals, target audience, and competitors to establish project requirements and user personas.",
      icon: FiUsers
    },
    {
      number: "2",
      title: "Wireframing & Planning",
      description: "Low-fidelity wireframes map out user flows and information architecture before visual design begins.",
      icon: FiLayout
    },
    {
      number: "3",
      title: "UI Design & Prototyping",
      description: "High-fidelity designs with interactive prototypes that showcase animations, transitions, and user interactions.",
      icon: FiSmartphone
    },
    {
      number: "4",
      title: "Development Handoff",
      description: "Complete design systems, assets, and documentation for seamless developer implementation.",
      icon: FiZap
    }
  ]



  return (
    <>
      <Head>
        <title>UI/UX & Web Design | Bizleap</title>
        <meta name="description" content="Bizleap crafts intuitive, visually stunning websites and applications. Our user-centered UI/UX design approach ensures every decision drives engagement." />
        <link rel="canonical" href="https://bizleap.in/webdesign" />
      </Head>
      <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-purple-500/5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <Badge variant="outline" className="mb-6">UI/UX & Web Design</Badge>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Digital Experiences That <span className="text-yellow-500">Convert</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  We craft intuitive, visually stunning websites and applications that don't just look good—they perform exceptionally. Our user-centered approach ensures every design decision drives engagement and achieves business objectives.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 flex items-center gap-2"
                  >
                    Start Your Project <FiArrowRight />
                  </Link>

                </div>
              </ScrollReveal>
            </div>
            <div className="relative">
              <ScrollReveal delay={0.4}>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200"
                    alt="Web Design Interface"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">What Sets Our Web Design Apart</h2>
              <p className="text-gray-400 text-lg">
                We combine aesthetic excellence with technical precision to deliver websites that excel in performance, accessibility, and user experience.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">Core Features</h3>
                <div className="grid gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <FiCheck className="w-4 h-4 text-yellow-500" />
                      </div>
                      <span className="text-lg">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Figma", "Adobe XD", "Sketch", "Webflow", "React", "Next.js", "Tailwind CSS", "GSAP"].map((tool, index) => (
                    <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                      {tool}
                    </Badge>
                  ))}
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
                  <h4 className="text-xl font-semibold mb-4">Design Standards</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-center gap-3">
                      <FiCheck className="text-green-500" /> Responsive across all devices
                    </li>
                    <li className="flex items-center gap-3">
                      <FiCheck className="text-green-500" /> Loading speed under 3 seconds
                    </li>
                    <li className="flex items-center gap-3">
                      <FiCheck className="text-green-500" /> WCAG 2.1 AA compliance
                    </li>
                    <li className="flex items-center gap-3">
                      <FiCheck className="text-green-500" /> Cross-browser tested
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Design Process</h2>
              <p className="text-gray-400 text-lg">
                A structured approach that ensures clarity, collaboration, and outstanding results at every stage.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {processSteps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <ProcessStep {...step} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900 border-t border-gray-800/50 overflow-hidden" id="portfolio">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Recent Web Design Projects
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                See how we&apos;ve transformed digital experiences for businesses across industries through modern UI/UX design, responsive development, and performance-optimized websites.
              </p>
            </div>
          </ScrollReveal>

          <ProjectsCarousel />

          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center">
              <Link
                href="/portfolio"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black transition-all hover:bg-yellow-500 hover:scale-105"
              >
                View Full Portfolio
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
    </>
  )
}
