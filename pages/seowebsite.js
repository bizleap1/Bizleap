'use client'

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FiCheck, FiArrowRight, FiSearch, FiBarChart2, FiTrendingUp, FiGlobe, FiTool, FiTarget, FiZap, FiShield } from "react-icons/fi"

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

// ------------------- Audit Point Component -------------------
function AuditPoint({ icon: Icon, title, description }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-yellow-500/30 transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-yellow-500" />
      </div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

export default function SEOAuditsService() {
  const auditAreas = [
    {
      icon: FiSearch,
      title: "Technical SEO Audit",
      description: "Comprehensive analysis of site architecture, speed, mobile-friendliness, and technical health"
    },
    {
      icon: FiBarChart2,
      title: "Content Analysis",
      description: "Evaluation of content quality, keyword optimization, and content gaps"
    },
    {
      icon: FiGlobe,
      title: "Backlink Profile",
      description: "Analysis of backlink quality, toxic links, and link-building opportunities"
    },
    {
      icon: FiTarget,
      title: "Keyword Research",
      description: "Identification of high-value keywords and search intent analysis"
    },
    {
      icon: FiZap,
      title: "Performance Metrics",
      description: "Core Web Vitals analysis and performance optimization recommendations"
    },
    {
      icon: FiShield,
      title: "Security Audit",
      description: "SSL, security headers, and vulnerability assessment"
    }
  ]

  const seoBenefits = [
    {
      title: "Increased Organic Traffic",
      description: "Higher search rankings lead to more qualified visitors without paid advertising",
      icon: FiTrendingUp
    },
    {
      title: "Better User Experience",
      description: "Optimized sites load faster and provide better navigation for visitors",
      icon: FiGlobe
    },
    {
      title: "Higher Conversion Rates",
      description: "SEO-optimized sites convert better by meeting user intent effectively",
      icon: FiTarget
    },
    {
      title: "Long-Term Results",
      description: "SEO builds sustainable growth that continues to deliver over time",
      icon: FiBarChart2
    }
  ]

  const auditDeliverables = [
    "Comprehensive 50+ page audit report",
    "Technical SEO checklist with priorities",
    "Keyword opportunity analysis",
    "Competitor benchmarking",
    "Actionable implementation plan",
    "Performance improvement roadmap",
    "Monthly tracking dashboard",
    "Ongoing support & consultation"
  ]

  const seoTools = [
    "Google Search Console",
    "Google Analytics 4",
    "SEMrush/Ahrefs",
    "Screaming Frog",
    "GTmetrix",
    "PageSpeed Insights",
    "Mobile-Friendly Test",
    "Security Headers"
  ]

  const processSteps = [
    {
      step: "01",
      title: "Initial Analysis",
      description: "We conduct a thorough assessment of your current website performance and SEO health"
    },
    {
      step: "02",
      title: "Technical Audit",
      description: "Detailed examination of site structure, speed, mobile optimization, and technical issues"
    },
    {
      step: "03",
      title: "Content & Keywords",
      description: "Analysis of content quality, keyword targeting, and optimization opportunities"
    },
    {
      step: "04",
      title: "Reporting & Strategy",
      description: "Comprehensive report with prioritized recommendations and implementation plan"
    }
  ]

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <Badge variant="outline" className="mb-6">SEO & Website Audits</Badge>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Maximize Your <span className="text-yellow-500">Search Potential</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Uncover hidden opportunities and fix critical issues with our comprehensive SEO audits. We analyze every aspect of your website to boost rankings, improve user experience, and drive sustainable organic growth.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 flex items-center gap-2"
                  >
                    Get Your Website Audit <FiArrowRight />
                  </Link>
                  
                </div>
              </ScrollReveal>
            </div>
            <div className="relative">
              <ScrollReveal delay={0.4}>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="/images/abstract-5.webp"
                    alt="SEO & Website Audits"
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

      {/* Why SEO Matters */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Why SEO Audits Are Essential</h2>
              <p className="text-gray-400 text-lg">
                Regular SEO audits help you stay ahead of algorithm updates, fix issues before they impact rankings, and identify new growth opportunities.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seoBenefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 h-full">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Areas */}
      <section id="audit-areas" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">What Our Audit Covers</h2>
              <p className="text-gray-400 text-lg">
                Comprehensive analysis across all critical areas of SEO and website performance.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auditAreas.map((area, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <AuditPoint {...area} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Audit Process</h2>
              <p className="text-gray-400 text-lg">
                A systematic approach to identifying issues and opportunities for improvement.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="relative">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 h-full">
                    <div className="text-4xl font-bold text-yellow-500/30 mb-4">{step.step}</div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-700"></div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">What You'll Receive</h2>
              <p className="text-gray-400 text-lg">
                Comprehensive deliverables that provide clear insights and actionable steps.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">Audit Deliverables</h3>
                <div className="space-y-4">
                  {auditDeliverables.map((item, index) => (
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
                      <span className="text-lg">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">Tools We Use</h3>
                <div className="flex flex-wrap gap-3">
                  {seoTools.map((tool, index) => (
                    <Badge key={index} variant="secondary" className="px-4 py-2">
                      {tool}
                    </Badge>
                  ))}
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 mt-6">
                  <h4 className="text-xl font-semibold mb-4">Industry Standards</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-center gap-3">
                      <FiCheck className="text-green-500" /> Google's Webmaster Guidelines
                    </li>
                    <li className="flex items-center gap-3">
                      <FiCheck className="text-green-500" /> Core Web Vitals compliance
                    </li>
                    <li className="flex items-center gap-3">
                      <FiCheck className="text-green-500" /> Mobile-first indexing
                    </li>
                    <li className="flex items-center gap-3">
                      <FiCheck className="text-green-500" /> E-E-A-T principles
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Common Issues We Fix */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Common Issues We Identify & Fix</h2>
              <p className="text-gray-400 text-lg">
                These are the most frequent problems that hurt website performance and search rankings.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-red-400">Technical Issues</h3>
                <ul className="space-y-4">
                  {[
                    "Slow page loading speed (>3 seconds)",
                    "Poor mobile responsiveness",
                    "Broken links and 404 errors",
                    "Duplicate content issues",
                    "Missing or incorrect meta tags",
                    "Poor site structure and navigation",
                    "Security vulnerabilities",
                    "Poor Core Web Vitals scores"
                  ].map((issue, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <FiTool className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-yellow-400">SEO & Content Issues</h3>
                <ul className="space-y-4">
                  {[
                    "Poor keyword optimization",
                    "Thin or low-quality content",
                    "Missing alt text on images",
                    "Unoptimized title tags and descriptions",
                    "Content gaps vs competitors",
                    "Poor internal linking structure",
                    "Low-quality backlinks",
                    "Missing schema markup"
                  ].map((issue, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <FiSearch className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    
    </main>
  )
}