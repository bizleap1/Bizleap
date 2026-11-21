'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { FiArrowRight } from "react-icons/fi"
import { Code2, Palette, Megaphone, Search, Settings } from "lucide-react"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})

const ALL_SERVICES = [
  {
    slug: "webdesign",
    href: "/webdesign",
    title: "UI/UX & Web Design",
    description: "Custom websites, modern web applications, and intuitive user experiences.",
    Icon: Code2,
  },
  {
    slug: "brandidentity",
    href: "/brandidentity",
    title: "Brand identity design",
    description: "Memorable logos, cohesive visual systems, and brand guidelines that stand out.",
    Icon: Palette,
  },
  {
    slug: "socialmedia",
    href: "/socialmedia",
    title: "Social media marketing",
    description: "Show up with a consistent voice, impactful campaigns, and community growth.",
    Icon: Megaphone,
  },
  {
    slug: "seowebsite",
    href: "/seowebsite",
    title: "SEO & website audits",
    description: "Make your business easier to find with data-driven search and site optimization.",
    Icon: Search,
  },
  {
    slug: "aiservices",
    href: "/aiservices",
    title: "AI & automation",
    description: "Simplify the work behind your brand with intelligent workflows and automations.",
    Icon: Settings,
  },
]

const HEADINGS = {
  webdesign: {
    tagline: "beyond web design.",
    desc: "Connect your digital presence with memorable brand identity, organic search visibility, high-growth marketing, and modern AI automation.",
  },
  brandidentity: {
    tagline: "beyond identity.",
    desc: "Connect your brand identity with scalable engineering, high-growth marketing, and modern automation.",
  },
  socialmedia: {
    tagline: "beyond social.",
    desc: "Pair your social reach with scalable web engineering, memorable brand identity, and modern business automation.",
  },
  seowebsite: {
    tagline: "beyond search.",
    desc: "Connect your search performance with custom web engineering, cohesive brand identity, high-growth social marketing, and intelligent AI automation.",
  },
  aiservices: {
    tagline: "beyond AI.",
    desc: "Connect your AI intelligence with scalable engineering, high-growth marketing, and cohesive brand design.",
  },
}

const BORDER_CLASSES = [
  "border-b md:border-r border-white/10",
  "border-b border-white/10",
  "border-b md:border-b-0 md:border-r border-white/10",
  "",
]

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

export default function ExploreMoreSolutions({ currentSlug = "" }) {
  const filteredSolutions = ALL_SERVICES.filter((item) => item.slug !== currentSlug).slice(0, 4)
  const meta = HEADINGS[currentSlug] || {
    tagline: "beyond limits.",
    desc: "Discover other high-impact solutions we offer to accelerate your brand's growth and scale your digital presence.",
  }

  return (
    <section className="py-20 lg:py-28 px-6 sm:px-8 lg:px-16 bg-black border-t border-white/10 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-yellow-400 inline-block" />
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-yellow-400 uppercase font-sans">
              ECOSYSTEM
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mb-12">
            <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4 ${playfair.className}`}>
              Your brand,{" "}
              <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
                {meta.tagline}
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-sans">
              {meta.desc}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 bg-gradient-to-b from-[#111115]/90 to-[#0a0a0d]/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl shadow-black/80 font-sans">
          {filteredSolutions.map((solution, index) => {
            const { Icon } = solution
            const borderClass = BORDER_CLASSES[index] || ""
            return (
              <ScrollReveal
                key={solution.slug}
                delay={0.15 + index * 0.05}
                className={borderClass}
              >
                <Link
                  href={solution.href}
                  className="group flex items-center justify-between gap-5 sm:gap-6 p-6 sm:p-8 lg:p-10 hover:bg-gradient-to-br hover:from-white/[0.05] hover:via-yellow-400/[0.02] hover:to-transparent transition-all duration-300 h-full"
                >
                  <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-yellow-400 group-hover:border-yellow-400/40 group-hover:bg-yellow-400/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors ${playfair.className}`}>
                        {solution.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-normal leading-relaxed font-sans">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 group-hover:text-yellow-400 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10 transition-all duration-300 shrink-0">
                    <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
