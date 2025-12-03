'use client'

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FiCheck, FiArrowRight, FiTrendingUp, FiUsers, FiBarChart2, FiTarget, FiCamera, FiVideo, FiImage } from "react-icons/fi"

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

// ------------------- Platform Card -------------------
function PlatformCard({ name, description }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-yellow-500/30 transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
        <FiCamera className="w-6 h-6 text-yellow-500" />
      </div>
      <h4 className="text-lg font-semibold mb-2">{name}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

export default function SocialMediaMarketingService() {
  const platforms = [
    {
      name: "Instagram Marketing",
      description: "Visual storytelling, Reels, Stories, and influencer collaborations"
    },
    {
      name: "Facebook Campaigns",
      description: "Community building, targeted ads, and brand awareness campaigns"
    },
    {
      name: "Video Content Strategy",
      description: "Short-form video content and viral marketing strategies"
    },
    {
      name: "LinkedIn Marketing",
      description: "B2B marketing, thought leadership, and professional networking"
    },
    {
      name: "Content Management",
      description: "Real-time engagement, trends, and brand conversations"
    },
    {
      name: "YouTube Strategy",
      description: "Video content, tutorials, and long-form brand storytelling"
    }
  ]

  const services = [
    {
      icon: FiTarget,
      title: "Social Media Strategy",
      description: "Customized social media plans aligned with your business goals and target audience"
    },
    {
      icon: FiUsers,
      title: "Community Management",
      description: "Daily engagement, response management, and community building"
    },
    {
      icon: FiTrendingUp,
      title: "Content Creation",
      description: "High-quality visuals, videos, and copy tailored for each platform"
    },
    {
      icon: FiBarChart2,
      title: "Paid Advertising",
      description: "Targeted ad campaigns on various platforms for maximum reach"
    },
    {
      icon: FiVideo,
      title: "Influencer Marketing",
      description: "Strategic partnerships with relevant influencers and creators"
    },
    {
      icon: FiImage,
      title: "Visual Branding",
      description: "Consistent visual identity across all social media channels"
    }
  ]

  const portfolioProjects = [
    {
      id: 1,
      title: "Solar Ark",
      subtitle: "Renewable Energy Branding",
      image: "/images/Solar.png",
      link: "/solarark",
      results: ["Branding"]
    },
    {
      id: 2,
      title: "Masato",
      subtitle: "Restaurant Branding",
      image: "/images/Masato.png",
      link: "/masato",
      results: ["Social Media"]
    },
    {
      id: 3,
      title: "Meher Infra Solutions",
      subtitle: "Construction Branding",
      image: "/images/Meher.png",
      link: "/meher",
      results: ["Branding"]
    },
    {
      id: 4,
      title: "Tuli Restro",
      subtitle: "Fine Dining Branding",
      image: "/images/Tuii.png",
      link: "/tulirestro",
      results: ["Social Media"]
    }
  ]

  const metrics = [
    { value: "3-5x", label: "Higher Engagement Rates" },
    { value: "40-60%", label: "Reduced Cost Per Lead" },
    { value: "200%", label: "Average Follower Growth" },
    { value: "24/7", label: "Community Management" }
  ]

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-blue-500/5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <Badge variant="outline" className="mb-6">Social Media Marketing</Badge>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Grow Your Brand <span className="text-yellow-500">Socially</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  We create social media strategies that drive engagement, build communities, and generate real business results. From content creation to paid campaigns, we make your brand the talk of the town.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 flex items-center gap-2"
                  >
                    Boost Your Social Presence <FiArrowRight />
                  </Link>
                  
                </div>
              </ScrollReveal>
            </div>
            <div className="relative">
              <ScrollReveal delay={0.4}>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="/images/abstract-3.webp"
                    alt="Social Media Marketing"
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

      {/* Metrics Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">{metric.value}</div>
                  <div className="text-gray-300 text-sm md:text-base">{metric.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms We Master */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Social Media Expertise</h2>
              <p className="text-gray-400 text-lg">
                We create platform-specific strategies that maximize engagement and reach across all social networks.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <PlatformCard {...platform} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Social Media Services</h2>
              <p className="text-gray-400 text-lg">
                Comprehensive social media solutions tailored to your business needs.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-yellow-500" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Social Media Success Stories</h2>
              <p className="text-gray-400 text-lg">
                See how we've transformed brands through strategic social media marketing.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <div className="group overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-yellow-500/50 transition-all duration-500 h-full">
                  {/* Project Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <Badge variant="secondary" className="mb-2">
                        {project.subtitle}
                      </Badge>
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      {project.results.map((result, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <span className="text-gray-300">{result}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-gray-800">
                      <Link
                        href={project.link}
                        className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
                      >
                        View Case Study
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Content Types */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Content That Converts</h2>
              <p className="text-gray-400 text-lg">
                We create diverse content formats that engage audiences and drive action.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Reels & Shorts", desc: "Short-form video content" },
              { name: "Stories", desc: "24-hour engaging content" },
              { name: "Carousels", desc: "Educational swipe content" },
              { name: "Live Sessions", desc: "Real-time engagement" },
              { name: "User Content", desc: "Community-generated" },
              { name: "Infographics", desc: "Visual data storytelling" },
              { name: "Testimonials", desc: "Social proof content" },
              { name: "Behind Scenes", desc: "Brand transparency" },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 text-center">
                  <div className="text-lg font-semibold mb-1">{item.name}</div>
                  <div className="text-sm text-gray-400">{item.desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      
    </main>
  )
}