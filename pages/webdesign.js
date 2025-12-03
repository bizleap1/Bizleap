'use client'

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FiCheck, FiArrowRight, FiSmartphone, FiLayout, FiUsers, FiZap } from "react-icons/fi"

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
                    src="/images/abstract-1.webp"
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
<section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
  <div className="max-w-6xl mx-auto">
    <ScrollReveal>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold mb-6">Recent Web Design Projects</h2>
        <p className="text-gray-400 text-lg">
          See how we've transformed digital experiences for businesses across industries.
        </p>
      </div>
    </ScrollReveal>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          name: "Jain Brokers",
          description:
            "A modern business website built for a cotton and yarn sourcing company — designed to showcase their global network, product range, and export expertise with a clean and trustworthy interface.",
          img: "/portfolio/jain_broker.png",
          url: "https://jainbroker.com",
          tags: ["Business", "Corporate", "Export"]
        },
        {
          name: "Jain Groups",
          description:
            "A dynamic corporate website highlighting multiple business verticals under Jain Group — crafted with engaging visuals and a focus on brand consistency.",
          img: "/portfolio/jain_groups.png",
          url: "#",
          tags: ["Corporate", "Multi-Brand", "Business"]
        },
        {
          name: "Green Acres Realty",
          description:
            "An elegant real estate website showcasing premium projects, locations, and inquiry options — designed to reflect a high-end brand identity.",
          img: "/portfolio/green_acres.png",
          url: "https://greenacresrealty.co.in",
          tags: ["Real Estate", "Luxury", "Property"]
        },
        {
          name: "Eefa Hotel",
          description:
            "A luxury hospitality platform featuring rooms, events, and an intuitive online booking experience — optimized for both performance and elegance.",
          img: "/portfolio/eefa.png",
          url: "https://www.eefahotels.com",
          tags: ["Hospitality", "Booking", "Luxury"]
        },
      ].map((project, index) => (
        <ScrollReveal key={index} delay={index * 0.1}>
          <div className="group h-full flex flex-col overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-yellow-500/50 transition-all duration-500">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={project.img}
                alt={project.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4">
                <div className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <FiArrowRight className="text-yellow-500" />
                </div>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-800">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
                >
                  Visit Live Site <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
    
    <ScrollReveal delay={0.4}>
      <div className="text-center mt-12">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-8 py-3 border border-gray-700 rounded-lg hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300"
        >
          View All Projects <FiArrowRight />
        </Link>
      </div>
    </ScrollReveal>
  </div>
</section>

      
    </main>
  )
}