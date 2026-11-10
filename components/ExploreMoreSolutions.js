'use client'

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { FiArrowRight } from "react-icons/fi"

const SOLUTIONS = [
  {
    slug: "webdesign",
    href: "/webdesign",
    title: "UI/UX & Web Design",
    description: "Intuitive, visually stunning, and conversion-focused custom websites.",
  },
  {
    slug: "brandidentity",
    href: "/brandidentity",
    title: "Brand Identity Design",
    description: "Memorable logos, cohesive systems, and guidelines that stand out.",
  },
  {
    slug: "socialmedia",
    href: "/socialmedia",
    title: "Social Media Marketing",
    description: "Organic content curation, paid campaigns, and organic growth.",
  },
  {
    slug: "seowebsite",
    href: "/seowebsite",
    title: "SEO & Website Audits",
    description: "Technical audits, speed optimization, and search rankings.",
  },
  {
    slug: "aiservices",
    href: "/aiservices",
    title: "AI Services & Automation",
    description: "Custom LLMs, workflows, and AI agents to scale operations.",
  },
]

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

export default function ExploreMoreSolutions({ currentSlug = "" }) {
  const filteredSolutions = SOLUTIONS.filter((item) => item.slug !== currentSlug).slice(0, 4)

  return (
    <section className="py-24 px-6 bg-black border-t border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-3">
                Explore More <span className="text-yellow-500">Solutions</span>
              </h2>
              <p className="text-gray-400">
                Discover other high-impact services we offer to accelerate your brand&apos;s growth.
              </p>
            </div>
            <Link
              href="/services"
              className="mt-4 md:mt-0 flex items-center gap-2 text-yellow-500 hover:text-white transition-colors font-semibold group"
            >
              All Services <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSolutions.map((solution, index) => (
            <ScrollReveal key={solution.slug} delay={index * 0.05}>
              <Link
                href={solution.href}
                className="group p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-400 transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {solution.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs text-yellow-500 font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <FiArrowRight />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

