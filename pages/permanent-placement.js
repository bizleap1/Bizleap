'use client'

import { useRef } from "react"
import Head from "next/head";
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FiCheck, FiArrowRight, FiCpu, FiBarChart2, FiZap, FiSettings, FiStar, FiSearch } from "react-icons/fi"

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

// ------------------- Service Card Component -------------------
function ServiceCard({ icon: Icon, title, description, delay }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 h-full flex flex-col">
        <div className="w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {Icon && <Icon className="w-7 h-7 text-yellow-500" />}
        </div>
        <h3 className="text-2xl font-semibold mb-4 group-hover:text-yellow-400 transition-colors">{title}</h3>
        <p className="text-gray-400 leading-relaxed flex-1">{description}</p>
      </div>
    </ScrollReveal>
  )
}

export default function PermanentPlacementPage() {
  const aiFeatures = [
    {
      icon: FiStar,
      title: "Dedicated Search",
      description: "Proactive headhunting for the best passive candidates.",
      delay: 0.1
    },
    {
      icon: FiStar,
      title: "Cultural Fit",
      description: "Deep behavioral assessments to ensure long-term harmony.",
      delay: 0.2
    },
    {
      icon: FiStar,
      title: "Reduced Turnover",
      description: "Focusing on retention through better initial matching.",
      delay: 0.30000000000000004
    },
    {
      icon: FiStar,
      title: "Employer Branding",
      description: "Representing your company positively in the talent market.",
      delay: 0.4
    },
    {
      icon: FiStar,
      title: "Salary Negotiation",
      description: "Expert mediation to secure talent within your budget.",
      delay: 0.5
    },
    {
      icon: FiStar,
      title: "Guarantee Period",
      description: "Peace of mind with our replacement guarantee program.",
      delay: 0.6000000000000001
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Deep Discovery",
      description: "Understanding your company DNA and the role requirements."
    },
    {
      number: "02",
      title: "Targeted Headhunting",
      description: "Identifying and engaging the best talent in the market."
    },
    {
      number: "03",
      title: "Rigorous Evaluation",
      description: "Multi-stage interviews and skill verifications."
    },
    {
      number: "04",
      title: "Placement & Follow-up",
      description: "Ensuring long-term success post-hire."
    }
  ]

  return (
    <>
      <Head>
        <title key="title">Permanent Placement | Bizleap</title>
        <meta name="description" content="Dedicated professionals committed to your long-term success." key="description" />
        <meta name="keywords" content="permanent placement, full-time hire, direct hire" />
        <link rel="canonical" href="https://bizleap.in/permanent-placement" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://bizleap.in/aiservices#service",
              "url": "https://bizleap.in/permanent-placement",
              "name": "Permanent Placement",
              "description": "Dedicated professionals committed to your long-term success.",
              "provider": { "@id": "https://bizleap.in/#organization" },
              "serviceType": "AI & Technology Services",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bizleap.in/" },
                  { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://bizleap.in/services" },
                  { "@type": "ListItem", "position": 3, "name": "AI Services", "item": "https://bizleap.in/aiservices" }
                ]
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Capabilities",
                "itemListElement": [
                  { "@type": "Offer", "name": "Generative AI Integration" },
                  { "@type": "Offer", "name": "AI-Powered Automation" },
                  { "@type": "Offer", "name": "Predictive Analytics" },
                  { "@type": "Offer", "name": "Custom AI Solutions" },
                  { "@type": "Offer", "name": "AI-Driven Marketing" },
                  { "@type": "Offer", "name": "Computer Vision" }
                ]
              }
            })
          }}
        />
      </Head>
      
      <main className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-purple-500/5"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
              <div>
                <ScrollReveal>
                  <Badge variant="outline" className="mb-6">Long-term Growth</Badge>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                    Secure Top Talent with <br />
<span className="text-yellow-500">Permanent Placement</span>
                  </h1>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                    Find dedicated, full-time employees who will grow with your business and contribute to your long-term vision and success.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="px-8 py-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 flex items-center gap-2 text-lg"
                    >
                      Get Started <FiArrowRight />
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
              <div className="relative">
                <ScrollReveal delay={0.4}>
                  <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl aspect-[4/3] md:aspect-[5/4] w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200"
                      alt="Long-term Growth"
                      fill
                      className="object-cover object-top transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-4xl font-bold mb-6">Permanent Hiring Benefits</h2>
                <p className="text-gray-400 text-lg">
                  Building the foundation of your company with the right people.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiFeatures.map((feature, index) => (
                <ServiceCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 px-6 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <ScrollReveal>
                  <h2 className="text-4xl font-bold mb-8">The Permanent <span className="text-yellow-500">Search</span></h2>
                  <p className="text-gray-400 text-lg mb-12">
                    A comprehensive methodology to find your next key team member.
                  </p>
                </ScrollReveal>

                <div className="space-y-8">
                  {processSteps.map((step, index) => (
                    <ScrollReveal key={index} delay={index * 0.1}>
                      <div className="flex gap-6 items-start">
                        <div className="text-4xl font-bold text-yellow-500/30 font-mono leading-none">{step.number}</div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-400 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <ScrollReveal delay={0.4}>
                  <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                      alt="Team Collaboration"
                      width={600}
                      height={800}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                      <div className="text-yellow-500 font-bold mb-2">Did you know?</div>
                      <p className="text-sm text-gray-300">Companies with highly engaged teams see a 21% increase in profitability. The right hire changes everything.</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

      {/* Explore More Solutions */}
      <section className="py-24 px-6 bg-black border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-3">Explore More <span className="text-yellow-500">Solutions</span></h2>
                <p className="text-gray-400">Discover other high-impact services we offer to accelerate your brand&apos;s growth.</p>
              </div>
              <Link href="/services" className="mt-4 md:mt-0 flex items-center gap-2 text-yellow-500 hover:text-white transition-colors font-semibold group">
                All Services <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <ScrollReveal delay={0}>
              <Link href="/webdesign" className="group block p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-400 transition-colors">UI/UX & Web Design</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Intuitive, visually stunning, and conversion-focused custom websites.</p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs text-yellow-500 font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <FiArrowRight />
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <Link href="/brandidentity" className="group block p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-400 transition-colors">Brand Identity Design</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Memorable logos, cohesive systems, and guidelines that stand out.</p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs text-yellow-500 font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <FiArrowRight />
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Link href="/socialmedia" className="group block p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-400 transition-colors">Social Media Marketing</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Organic content curation, paid campaigns, and organic growth.</p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs text-yellow-500 font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <FiArrowRight />
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.15000000000000002}>
              <Link href="/seowebsite" className="group block p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-400 transition-colors">SEO & Website Audits</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Technical audits, speed optimization, and search rankings.</p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs text-yellow-500 font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <FiArrowRight />
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
