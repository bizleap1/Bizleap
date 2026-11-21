'use client'

import { useRef, useState, useEffect } from "react"
import Head from "next/head"
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Playfair_Display, Inter } from "next/font/google"
import { FiArrowRight, FiArrowUpRight, FiPlay, FiLayers, FiX, FiEye } from "react-icons/fi"
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6"
import { Code2, Palette, Search, Settings } from "lucide-react"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

// ------------------- Scroll Reveal Component -------------------
function ScrollReveal({ children, delay = 0, y = 20, duration = 0.5, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20px 0px" }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {children}
    </motion.div>
  )
}



export default function SocialMediaMarketingService() {
  const spotlightProjects = [
    {
      num: "01",
      title: "Masato",
      desc: "Restaurant content",
      image: "/service/Handcrafted Salmon Sushi on Ceramic Platter-4.png",
      link: "/masato"
    },
    {
      num: "02",
      title: "Tuli Restro",
      desc: "Dining campaigns",
      image: "/service/Elegant Gourmet Entrée with Wine-5.png",
      link: "/tulirestro"
    },
    {
      num: "03",
      title: "Solar Ark",
      desc: "Energy communications",
      image: "/service/Solar panels under golden sunrise-8.png",
      link: "/solarark"
    },
    {
      num: "04",
      title: "Meher Infra Solutions",
      desc: "Construction storytelling",
      image: "/service/Concrete construction site beneath blue sky-7.png",
      link: "/meher"
    }
  ]

  const [activeService, setActiveService] = useState(0)
  const [activeExpertiseTab, setActiveExpertiseTab] = useState(0)

  const expertisePlatforms = [
    {
      id: "instagram",
      tabName: "Instagram Marketing",
      icon: FaInstagram,
      eyebrow: "01 / INSTAGRAM",
      headlineMain: "Make your brand",
      headlineAccent: "worth following.",
      description: "Visual storytelling that connects your brand with the people who matter.",
      tags: ["Reels & Stories", "Creator collaborations", "Visual storytelling"],
      ctaText: "Plan my Instagram strategy",
      image: "/service/expertise-instagram.png",
      imageAlt: "Instagram marketing visual direction collage",
    },
    {
      id: "facebook",
      tabName: "Facebook Campaigns",
      icon: FaFacebookF,
      eyebrow: "02 / FACEBOOK",
      headlineMain: "Build a community.",
      headlineAccent: "Start conversations.",
      description: "Campaigns and content that connect your brand with the right audience.",
      tags: ["Community building", "Targeted campaigns", "Brand awareness"],
      ctaText: "Plan my Facebook strategy",
      image: "/service/expertise-facebook.png",
      imageAlt: "Facebook campaigns and community visual direction",
    },
    {
      id: "linkedin",
      tabName: "LinkedIn Marketing",
      icon: FaLinkedinIn,
      eyebrow: "03 / LINKEDIN",
      headlineMain: "Lead with insight.",
      headlineAccent: "Build credibility.",
      description: "B2B content that shares your expertise and starts relevant professional conversations.",
      tags: ["Thought leadership", "Company content", "Professional networking"],
      ctaText: "Plan my LinkedIn strategy",
      ctaLink: "https://www.linkedin.com/in/kaushalbanginwar/",
      isExternal: true,
      image: "/service/expertise-linkedin.png",
      imageAlt: "LinkedIn marketing and thought leadership visual direction",
    },
    {
      id: "youtube",
      tabName: "YouTube Strategy",
      icon: FaYoutube,
      eyebrow: "04 / YOUTUBE",
      headlineMain: "Go beyond the scroll.",
      headlineAccent: "Tell the full story.",
      description: "Tutorials, interviews and brand stories shaped for deeper viewing.",
      tags: ["Long-form videos", "Tutorials", "Brand storytelling"],
      ctaText: "Plan my YouTube strategy",
      image: "/service/expertise-youtube.png",
      imageAlt: "YouTube strategy and studio podcast visual direction",
    },
    {
      id: "video",
      tabName: "Video Content Strategy",
      icon: FiPlay,
      eyebrow: "05 / VIDEO",
      headlineMain: "Make the first seconds",
      headlineAccent: "worth watching.",
      description: "Clear concepts, strong hooks and stories made for short-form video.",
      tags: ["Creative concepts", "Hooks & scripts", "Short-form storytelling"],
      ctaText: "Plan my video strategy",
      image: "/service/expertise-video.png",
      imageAlt: "Video content strategy and short form timeline direction",
    },
    {
      id: "content",
      tabName: "Content Management",
      icon: FiLayers,
      eyebrow: "06 / CONTENT MANAGEMENT",
      headlineMain: "Consistent rhythm.",
      headlineAccent: "Flawless execution.",
      description: "Publishing schedules, asset organization and community response that keep your channels active.",
      tags: ["Publishing calendar", "Asset library", "Performance tracking"],
      ctaText: "Plan my content management",
      image: "/service/expertise-content.png",
      imageAlt: "Content management workflow and editorial calendar direction",
    },
  ]

  const whatWeDoServices = [
    {
      num: "01",
      title: "Social Media Strategy",
      desc: "A clear content plan shaped around your goals and audience.",
      link: "/contact"
    },
    {
      num: "02",
      title: "Content Creation",
      desc: "Photography, reels and copy made for each platform.",
      link: "/creators"
    },
    {
      num: "03",
      title: "Community Management",
      desc: "Thoughtful replies and daily engagement that build relationships.",
      link: "/contact"
    },
    {
      num: "04",
      title: "Paid Advertising",
      desc: "Targeted campaigns built around reach, enquiries and action.",
      link: "/contact"
    },
    {
      num: "05",
      title: "Influencer Marketing",
      desc: "Relevant creators. Considered collaborations. A natural brand fit.",
      link: "/creators"
    },
    {
      num: "06",
      title: "Visual Branding",
      desc: "A consistent visual identity across every social touchpoint.",
      link: "/brandidentity"
    }
  ]

  const feedFormats = [
    {
      num: "01",
      title: "Reels & Shorts",
      desc: "Short videos. Strong first impressions.",
      image: "/service/Chef Finishing a Gourmet Dish-1.png",
      alt: "Reels & Shorts - Chef finishing a gourmet dish",
      hasPlay: true,
      link: "/creators"
    },
    {
      num: "02",
      title: "Stories",
      desc: "Everyday moments that invite a reply.",
      image: "/service/Warm cafe latte on a smartphone-2.png",
      alt: "Stories - Warm cafe latte on a smartphone",
      link: "/creators"
    },
    {
      num: "03",
      title: "Carousels",
      desc: "Ideas worth swiping and saving.",
      image: "/service/Yellow and Charcoal Editorial Food Cards-3.png",
      alt: "Carousels - Yellow and charcoal editorial food cards",
      link: "/brandidentity"
    },
    {
      num: "04",
      title: "Live Sessions",
      desc: "Real conversations, in real time.",
      image: "/service/Live studio conversation-4.png",
      alt: "Live Sessions - Live studio conversation",
      isLive: true,
      link: "/creators"
    },
    {
      num: "05",
      title: "User Content",
      desc: "Your community, in their own words.",
      image: "/service/Natural skincare portrait at home-5.png",
      alt: "User Content - Natural skincare portrait at home",
      link: "/creators"
    },
    {
      num: "06",
      title: "Infographics",
      desc: "Complex ideas, made clear.",
      image: "/service/Yellow Circle and Three Vertical Bars-6.png",
      alt: "Infographics - Yellow circle and vertical bars graphic",
      link: "/work"
    },
    {
      num: "07",
      title: "Testimonials",
      desc: "Customer experiences that build trust.",
      image: "/service/Smiling Business Owner in Warm Office-7.png",
      alt: "Testimonials - Smiling business owner in warm office",
      hasQuotes: true,
      link: "/work"
    },
    {
      num: "08",
      title: "Behind the Scenes",
      desc: "The people and process behind your brand.",
      image: "/service/Camera in focus at a fashion shoot-8.png",
      alt: "Behind the Scenes - Camera in focus at a fashion shoot",
      link: "/work"
    }
  ]

  const processSteps = [
    {
      num: "01",
      title: "Understand",
      desc: "Learn about your brand, audience and goals."
    },
    {
      num: "02",
      title: "Create",
      desc: "Develop a tailored content strategy."
    },
    {
      num: "03",
      title: "Publish",
      desc: "Bring content to life across your channels."
    },
    {
      num: "04",
      title: "Improve",
      desc: "Review performance and refine the next move."
    }
  ]


  return (
    <>
      <Head>
        <title key="title">Social Media Marketing Services | Bizleap</title>
        <meta
          name="description"
          key="description"
          content="We plan, create and manage social content that gives your brand a clear voice. Stop the scroll and start a conversation with Bizleap's social media services."
        />
        <meta name="keywords" content="social media marketing, Instagram management, content creation, social strategy, paid social campaigns" />
        <link rel="canonical" href="https://bizleap.in/socialmedia" />

        {/* Open Graph */}
        <meta property="og:title" content="Social Media Marketing Services | Bizleap" key="og:title" />
        <meta
          property="og:description"
          content="We plan, create and manage social content that gives your brand a clear voice. Stop the scroll and start a conversation."
          key="og:description"
        />
        <meta property="og:url" content="https://bizleap.in/socialmedia" key="og:url" />
        <meta property="og:type" content="service" key="og:type" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://bizleap.in/socialmedia#service",
              "url": "https://bizleap.in/socialmedia",
              "name": "Social Media Marketing",
              "description": "Bizleap creates social media strategies that drive engagement, build communities, and generate real business results through content creation, community management, and paid campaigns.",
              "provider": { "@id": "https://bizleap.in/#organization" },
              "serviceType": "Social Media Marketing",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bizleap.in/" },
                  { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://bizleap.in/services" },
                  { "@type": "ListItem", "position": 3, "name": "Social Media Marketing", "item": "https://bizleap.in/socialmedia" }
                ]
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Social Media Services",
                "itemListElement": [
                  { "@type": "Offer", "name": "Direction & Strategy" },
                  { "@type": "Offer", "name": "Creation & Production" },
                  { "@type": "Offer", "name": "Publishing & Scheduling" },
                  { "@type": "Offer", "name": "Community & Conversations" },
                  { "@type": "Offer", "name": "Promotion & Paid Campaigns" },
                  { "@type": "Offer", "name": "Learning & Analytics" }
                ]
              }
            })
          }}
        />
      </Head>

      <main className={`bg-black text-white min-h-screen ${inter.className}`}>
        {/* ========================================================= */}
        {/* 1. HERO SECTION WITH PROPER FULL-BLEED BACKGROUND IMAGE   */}
        {/* ========================================================= */}
        <section className="relative min-h-[85vh] lg:min-h-[860px] flex items-center pt-32 lg:pt-36 pb-20 px-6 sm:px-8 lg:px-16 overflow-hidden bg-black">
          {/* Full-bleed Background Image with Seamless Dark Gradient Overlays */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/service/Smartphones showcase food reels and social grids-3.png"
              alt="Social Media Marketing - Smartphones showcase food reels and social grids"
              fill
              priority
              quality={100}
              className="object-cover object-right md:object-right"
              sizes="100vw"
            />
            {/* Subtle gradient overlays to ensure text is crisp & readable across all screen sizes */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent sm:via-black/60 lg:via-black/35 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
          </div>

          {/* Hero Content */}
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="max-w-2xl">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="w-8 h-[2px] bg-[#FFC000] inline-block" />
                  <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-gray-400 uppercase font-sans">
                    SOCIAL, WITH A STRATEGY
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className={`font-serif text-5xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-white leading-[1.08] mb-6 ${playfair.className}`}>
                  Stop the scroll.<br />
                  Start a<br />
                  <span className="font-serif italic font-medium text-[#FFC000]">conversation.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="font-sans text-gray-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-lg mb-8">
                  We plan, create and manage social content that gives your brand a clear voice.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex flex-wrap items-center gap-5 sm:gap-6 font-sans">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#FFC000] hover:bg-[#ffcd2b] text-black font-semibold text-sm sm:text-base rounded-md transition-all duration-300 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/25 hover:-translate-y-0.5"
                  >
                    Plan my social strategy
                    <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </Link>

                  <Link
                    href="/work"
                    className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white font-medium text-sm sm:text-base transition-colors hover:underline"
                  >
                    See our projects <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="font-sans text-xs sm:text-sm text-gray-400 tracking-wide mt-12 sm:mt-16">
                  Content · Community · Campaigns
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Concept creative caption at bottom right */}
          <div className="absolute bottom-6 right-8 lg:right-16 z-10 text-xs text-gray-400/70 tracking-wider font-light hidden sm:block pointer-events-none font-sans">
            Concept creative
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. PLATFORMS STRIP                                        */}
        {/* ========================================================= */}
        <section className="py-4 sm:py-5 px-6 sm:px-8 lg:px-12 bg-[#090909] border-t border-b border-[#1c1c1c]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-sans text-sm sm:text-base font-bold text-white tracking-wide text-center md:text-left">
              Built for the way people scroll.
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-sans">
              <a
                href="https://www.instagram.com/bizleap.in/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 hover:text-[#FFC000] transition-colors cursor-pointer"
              >
                <FaInstagram className="w-4 h-4 text-white" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/bizleap"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 hover:text-[#FFC000] transition-colors cursor-pointer"
              >
                <FaFacebookF className="w-3.5 h-3.5 text-white" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.linkedin.com/company/bizleapinc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 hover:text-[#FFC000] transition-colors cursor-pointer"
              >
                <FaLinkedinIn className="w-3.5 h-3.5 text-white" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.youtube.com/@bizleap"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 hover:text-[#FFC000] transition-colors cursor-pointer"
              >
                <FaYoutube className="w-4 h-4 text-white" />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. WHAT WE DO - YOUR SOCIAL PRESENCE. BUILT WITH PURPOSE  */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            
            {/* Header: Title Left + Strategy Description Right */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-14">
              <div>
                <ScrollReveal>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-6 h-[2px] bg-[#FFC000] inline-block" />
                    <span className="font-sans text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#FFC000] uppercase">
                      WHAT WE DO
                    </span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <h2 className={`font-serif text-4xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.08] ${playfair.className}`}>
                    Your social presence.<br />
                    Built with <span className="font-serif italic font-medium text-[#FFC000]">purpose.</span>
                  </h2>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.15}>
                <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm lg:text-left">
                  Strategy, content and conversations —<br className="hidden sm:inline" />
                  working together for your brand.
                </p>
              </ScrollReveal>
            </div>

            {/* 2-Column Grid with Horizontal Row Dividers */}
            <div className="border-t border-[#1c1c1c] divide-y divide-[#1c1c1c]">
              {/* Row 1: 01 & 02 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 divide-[#1c1c1c]">
                {[whatWeDoServices[0], whatWeDoServices[1]].map((item, idx) => {
                  const itemIndex = idx
                  const isActive = activeService === itemIndex
                  return (
                    <ScrollReveal key={item.num} delay={0.1 + idx * 0.05} className="h-full">
                      <Link
                        href={item.link}
                        onMouseEnter={() => setActiveService(itemIndex)}
                        className={`group flex items-start justify-between py-6 sm:py-7 px-5 sm:px-7 transition-all duration-300 relative cursor-pointer h-full ${
                          isActive
                            ? "bg-[#141414] border-l-4 border-[#FFC000] shadow-xl"
                            : "bg-transparent border-l-4 border-transparent hover:bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0 pr-4">
                          <span className="text-[#FFC000] font-bold text-lg sm:text-xl w-7 sm:w-8 shrink-0 select-none font-sans pt-0.5">
                            {item.num}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-sans text-xl sm:text-2xl font-bold text-white group-hover:text-[#FFC000] transition-colors leading-snug ${inter.className}`}>
                              {item.title}
                            </h3>
                            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5 max-w-md">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 pt-1">
                          <FiArrowUpRight className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                            isActive
                              ? "text-[#FFC000] translate-x-0.5 -translate-y-0.5"
                              : "text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          }`} />
                        </div>
                      </Link>
                    </ScrollReveal>
                  )
                })}
              </div>

              {/* Row 2: 03 & 04 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 divide-[#1c1c1c]">
                {[whatWeDoServices[2], whatWeDoServices[3]].map((item, idx) => {
                  const itemIndex = idx + 2
                  const isActive = activeService === itemIndex
                  return (
                    <ScrollReveal key={item.num} delay={0.15 + idx * 0.05} className="h-full">
                      <Link
                        href={item.link}
                        onMouseEnter={() => setActiveService(itemIndex)}
                        className={`group flex items-start justify-between py-6 sm:py-7 px-5 sm:px-7 transition-all duration-300 relative cursor-pointer h-full ${
                          isActive
                            ? "bg-[#141414] border-l-4 border-[#FFC000] shadow-xl"
                            : "bg-transparent border-l-4 border-transparent hover:bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0 pr-4">
                          <span className="text-[#FFC000] font-bold text-lg sm:text-xl w-7 sm:w-8 shrink-0 select-none font-sans pt-0.5">
                            {item.num}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-sans text-xl sm:text-2xl font-bold text-white group-hover:text-[#FFC000] transition-colors leading-snug ${inter.className}`}>
                              {item.title}
                            </h3>
                            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5 max-w-md">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 pt-1">
                          <FiArrowUpRight className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                            isActive
                              ? "text-[#FFC000] translate-x-0.5 -translate-y-0.5"
                              : "text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          }`} />
                        </div>
                      </Link>
                    </ScrollReveal>
                  )
                })}
              </div>

              {/* Row 3: 05 & 06 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 divide-[#1c1c1c]">
                {[whatWeDoServices[4], whatWeDoServices[5]].map((item, idx) => {
                  const itemIndex = idx + 4
                  const isActive = activeService === itemIndex
                  return (
                    <ScrollReveal key={item.num} delay={0.2 + idx * 0.05} className="h-full">
                      <Link
                        href={item.link}
                        onMouseEnter={() => setActiveService(itemIndex)}
                        className={`group flex items-start justify-between py-6 sm:py-7 px-5 sm:px-7 transition-all duration-300 relative cursor-pointer h-full ${
                          isActive
                            ? "bg-[#141414] border-l-4 border-[#FFC000] shadow-xl"
                            : "bg-transparent border-l-4 border-transparent hover:bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0 pr-4">
                          <span className="text-[#FFC000] font-bold text-lg sm:text-xl w-7 sm:w-8 shrink-0 select-none font-sans pt-0.5">
                            {item.num}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-sans text-xl sm:text-2xl font-bold text-white group-hover:text-[#FFC000] transition-colors leading-snug ${inter.className}`}>
                              {item.title}
                            </h3>
                            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5 max-w-md">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 pt-1">
                          <FiArrowUpRight className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                            isActive
                              ? "text-[#FFC000] translate-x-0.5 -translate-y-0.5"
                              : "text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          }`} />
                        </div>
                      </Link>
                    </ScrollReveal>
                  )
                })}
              </div>
            </div>

            {/* Bottom Bar: Brand Note + Yellow Plan My Strategy Button */}
            <ScrollReveal delay={0.25}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 sm:pt-12">
                <span className="font-sans text-xs sm:text-sm text-gray-400 tracking-wider text-center sm:text-left">
                  One team. Every social touchpoint.
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 bg-[#FFC000] hover:bg-[#ffcd2b] text-black font-semibold text-sm sm:text-base rounded-md transition-all duration-300 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/25 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto justify-center"
                >
                  Plan my social strategy
                  <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </Link>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 3.5. OUR EXPERTISE - INTERACTIVE PLATFORM TABS            */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-black text-white border-t border-[#1c1c1c]" suppressHydrationWarning>
          <div className="max-w-7xl mx-auto">

            {/* Header: Centered Eyebrow, Main Headline, Subtitle */}
            <ScrollReveal className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-8 sm:mb-10">
              <div className="flex items-center justify-center gap-2.5 mb-3">
                <span className="w-6 h-[2px] bg-[#FFC000] inline-block" />
                <span className="font-sans text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#FFC000] uppercase">
                  OUR EXPERTISE
                </span>
              </div>
              <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-white tracking-tight leading-tight ${playfair.className}`}>
                Different platforms.{" "}
                <span className="font-serif italic font-medium text-[#FFC000] whitespace-nowrap">
                  One clear voice.
                </span>
              </h2>
              <p className="font-sans text-gray-400 text-sm sm:text-base mt-2.5 sm:mt-3">
                Explore how we shape your presence across social.
              </p>
            </ScrollReveal>

            {/* Platform Tabs Navigation: Modern Compact Centered Dock */}
            <div className="flex justify-center mb-12 sm:mb-16">
              <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 bg-[#0e0e0e] rounded-2xl sm:rounded-full border border-neutral-800 shadow-2xl backdrop-blur-xl max-w-full">
                {expertisePlatforms.map((platform, idx) => {
                  const active = activeExpertiseTab === idx
                  const Icon = platform.icon
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => setActiveExpertiseTab(idx)}
                      className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                        active
                          ? "bg-[#FFC000] text-black shadow-lg shadow-yellow-500/25 font-bold scale-[1.02]"
                          : "text-gray-400 hover:text-white hover:bg-white/5 font-medium"
                      }`}
                    >
                      {Icon && <Icon className={`w-3.5 h-3.5 ${active ? "text-black" : "text-gray-400"}`} />}
                      <span>{platform.tabName}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active Platform Interactive Panel with AnimatePresence */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExpertiseTab}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
                >
                  {/* Left Column: Eyebrow, Two-tone Headline, Description, Tags & CTA */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <p className="font-sans text-xs sm:text-[13px] font-semibold tracking-[0.22em] text-[#FFC000] uppercase mb-3">
                      {expertisePlatforms[activeExpertiseTab].eyebrow}
                    </p>
                    <h3 className={`font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.1] mb-5 ${playfair.className}`}>
                      {expertisePlatforms[activeExpertiseTab].headlineMain} <br />
                      <span className="font-serif italic font-medium text-[#FFC000]">
                        {expertisePlatforms[activeExpertiseTab].headlineAccent}
                      </span>
                    </h3>
                    <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                      {expertisePlatforms[activeExpertiseTab].description}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-2.5 mb-8">
                      {expertisePlatforms[activeExpertiseTab].tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3.5 py-1.5 rounded-lg border border-[#2a2a2a] bg-[#101010] text-gray-300 text-xs sm:text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    {expertisePlatforms[activeExpertiseTab].isExternal ? (
                      <a
                        href={expertisePlatforms[activeExpertiseTab].ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FFC000] hover:bg-[#ffcd2b] text-black font-semibold text-sm sm:text-base rounded-md transition-all duration-300 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/25 hover:-translate-y-0.5 cursor-pointer w-fit"
                      >
                        {expertisePlatforms[activeExpertiseTab].ctaText}
                        <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </a>
                    ) : (
                      <Link
                        href={expertisePlatforms[activeExpertiseTab].ctaLink || "/contact"}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FFC000] hover:bg-[#ffcd2b] text-black font-semibold text-sm sm:text-base rounded-md transition-all duration-300 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/25 hover:-translate-y-0.5 cursor-pointer w-fit"
                      >
                        {expertisePlatforms[activeExpertiseTab].ctaText}
                        <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </Link>
                    )}
                  </div>

                  {/* Right Column: Visual Collage & Caption */}
                  <div className="lg:col-span-7">
                    {expertisePlatforms[activeExpertiseTab].isExternal ? (
                      <a
                        href={expertisePlatforms[activeExpertiseTab].ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block relative w-full rounded-none overflow-hidden bg-[#0c0c0c] border border-[#222222] hover:border-[#FFC000]/60 shadow-2xl transition-all duration-300"
                      >
                        <Image
                          src={expertisePlatforms[activeExpertiseTab].image}
                          alt={expertisePlatforms[activeExpertiseTab].imageAlt}
                          width={1586}
                          height={992}
                          quality={100}
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="w-full h-auto object-cover block group-hover:scale-[1.02] transition-transform duration-500"
                          priority
                        />
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFC000] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                          <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      </a>
                    ) : (
                      <div className="relative w-full rounded-none overflow-hidden bg-[#0c0c0c] border border-[#222222] shadow-2xl">
                        <Image
                          src={expertisePlatforms[activeExpertiseTab].image}
                          alt={expertisePlatforms[activeExpertiseTab].imageAlt}
                          width={1586}
                          height={992}
                          quality={100}
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="w-full h-auto object-cover block"
                          priority
                        />
                      </div>
                    )}
                    <p className="text-[11px] text-gray-500 font-sans tracking-wide mt-2">
                      {expertisePlatforms[activeExpertiseTab].id === "linkedin"
                        ? "Connect on LinkedIn with Kaushal Banginwar · Co-Founder & CTO"
                        : "Illustrative content direction"}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Footnote */}
            <p className="font-sans text-xs text-gray-500 tracking-wide mt-10 sm:mt-12 text-center sm:text-left">
              Select a service to explore our approach.
            </p>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. MADE FOR THE FEED - 8 FORMATS 4x2 GRID                 */}
        {/* ========================================================= */}
        <section className="pt-20 lg:pt-28 pb-10 sm:pb-12 px-6 sm:px-8 lg:px-12 bg-black text-white border-t border-[#1c1c1c]">
          <div className="max-w-7xl mx-auto">
            
            {/* Header: Title Left | Format Counter & Plan Content Button Right */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
              <div>
                <ScrollReveal>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-6 h-[2px] bg-[#FFC000] inline-block" />
                    <span className="font-sans text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#FFC000] uppercase">
                      MADE FOR THE FEED
                    </span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <h2 className={`font-serif text-4xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.08] ${playfair.className}`}>
                    Content that earns<br />
                    <span className="font-serif italic font-medium text-[#FFC000]">attention.</span>
                  </h2>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.15}>
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4">
                  <p className="font-sans text-gray-400 text-sm sm:text-base">
                    Eight formats. One consistent brand voice.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-white/20 hover:border-[#FFC000] text-white hover:text-[#FFC000] text-xs sm:text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 cursor-pointer"
                  >
                    Plan your content
                    <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* 8 Formats 4x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {feedFormats.map((format, idx) => (
                <ScrollReveal key={format.num} delay={0.06 + idx * 0.04}>
                  <Link
                    href={format.link}
                    className="group flex flex-col border border-[#1f1f22] rounded-xl overflow-hidden bg-[#0d0d0f] hover:border-[#FFC000]/50 hover:-translate-y-1 transition-all duration-300 h-full cursor-pointer shadow-lg"
                  >
                    {/* Image Container with Badges */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                      <Image
                        src={format.image}
                        alt={format.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />

                      {/* Top-Left Number Badge (01 - 08) */}
                      <div className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur-md text-[#FFC000] font-bold text-xs px-2.5 py-1 rounded-md select-none font-sans border border-white/10">
                        {format.num}
                      </div>

                      {/* Card 01: Play Button */}
                      {format.hasPlay && (
                        <div
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          aria-hidden="true"
                        >
                          <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                            <FiPlay className="w-4 h-4 ml-0.5 fill-white text-white" />
                          </div>
                        </div>
                      )}

                      {/* Card 04: Red LIVE Badge */}
                      {format.isLive && (
                        <div className="absolute top-3 right-3 z-10 bg-red-600/90 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider shadow-md font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          LIVE
                        </div>
                      )}

                      {/* Card 07: Yellow Quotes Badge */}
                      {format.hasQuotes && (
                        <div className="absolute top-2 right-3 z-10 text-[#FFC000] font-serif text-3xl font-black leading-none select-none drop-shadow-md">
                          “
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-start bg-[#0a0a0c]">
                      <h3 className={`font-sans text-base sm:text-lg font-bold text-white group-hover:text-[#FFC000] transition-colors leading-snug ${inter.className}`}>
                        {format.title}
                      </h3>
                      <p className="font-sans text-xs text-gray-400 mt-1.5 leading-relaxed">
                        {format.desc}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            {/* Bottom Tagline */}
            <ScrollReveal delay={0.25}>
              <div className="text-center mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#1a1a1a]">
                <p className="font-sans text-xs sm:text-sm text-gray-400 tracking-wider">
                  Built for your audience. Adapted to every platform.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </section>


        {/* ========================================================= */}
        {/* 6. HOW WE WORK / PROCESS SECTION                          */}
        {/* ========================================================= */}
        <section id="process" className="pt-10 sm:pt-14 pb-20 lg:pb-28 px-6 sm:px-8 lg:px-12 bg-black text-white border-t border-b border-[#1c1c1c]">
          <div className="max-w-7xl mx-auto">
            
            {/* Eyebrow: HOW WE WORK (yellow, tracking, sans) */}
            <ScrollReveal>
              <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                <span className="w-6 h-[2px] bg-[#FFC000] inline-block" />
                <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#FFC000] uppercase">
                  HOW WE WORK
                </span>
              </div>
            </ScrollReveal>

            {/* Headline: A clear plan. A consistent rhythm. */}
            <ScrollReveal delay={0.1}>
              <h2 className={`font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.08] mb-12 sm:mb-16 ${playfair.className}`}>
                A clear plan. A consistent <span className="font-serif italic font-medium text-[#FFC000]">rhythm.</span>
              </h2>
            </ScrollReveal>

            {/* 4 Process Columns with Serif Numbers, Yellow Dots, Horizontal Lines & Vertical Dividers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 sm:gap-y-12">
              {processSteps.map((step, idx) => (
                <ScrollReveal
                  key={step.num}
                  delay={0.1 + idx * 0.08}
                  className={`flex flex-col pb-8 sm:pb-0 border-b border-[#202024] sm:border-b-0 last:border-b-0 ${
                    idx === 0
                      ? "sm:pr-8 lg:pr-8"
                      : idx === 1
                      ? "sm:pl-8 sm:border-l sm:border-[#202024] lg:px-8"
                      : idx === 2
                      ? "sm:pr-8 sm:border-l-0 lg:px-8 lg:border-l lg:border-[#202024]"
                      : "sm:pl-8 sm:border-l sm:border-[#202024] lg:pl-8"
                  }`}
                >
                  {/* Large Serif Number */}
                  <div className={`font-serif text-5xl sm:text-6xl text-[#52525b] font-normal leading-none mb-3 select-none ${playfair.className}`}>
                    {step.num}
                  </div>

                  {/* Yellow Dot & Horizontal Line */}
                  <div className="flex items-center mb-4 sm:mb-5">
                    <span className="w-2 h-2 rounded-full bg-[#FFC000] shrink-0" />
                    <span className="h-[1px] bg-[#3a3a40] flex-1 ml-2.5" />
                  </div>

                  {/* Step Title */}
                  <h3 className={`font-sans text-lg sm:text-xl font-bold text-white mb-2 leading-tight tracking-tight ${inter.className}`}>
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#8e8e93] leading-relaxed max-w-[260px]">
                    {step.desc}
                  </p>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. KEEP BUILDING / BEYOND SOCIAL SERVICES                 */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-[#0a0a0c] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gray-400 uppercase font-sans">
                  KEEP BUILDING
                </span>
                <span className="w-8 h-[2px] bg-yellow-400"></span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="max-w-3xl mb-12">
                <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4 ${playfair.className}`}>
                  Your brand, <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">beyond social.</span>
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-sans">
                  Pair your social reach with scalable web engineering, memorable brand identity, and modern business automation.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 bg-gradient-to-b from-[#111115]/90 to-[#0a0a0d]/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl shadow-black/80 font-sans">
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
                        <h3 className={`font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors ${playfair.className}`}>
                          Development Services
                        </h3>
                        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-yellow-400 bg-yellow-400/10 border border-yellow-400/25 px-2 py-0.5 rounded-md font-sans">
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

              {/* 2. Brand Identity Design */}
              <ScrollReveal delay={0.2} className="border-b border-white/10">
                <Link
                  href="/brandidentity"
                  className="group flex items-center justify-between gap-5 sm:gap-6 p-6 sm:p-8 lg:p-10 hover:bg-gradient-to-br hover:from-white/[0.05] hover:via-yellow-400/[0.02] hover:to-transparent transition-all duration-300 h-full"
                >
                  <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-yellow-400 group-hover:border-yellow-400/40 group-hover:bg-yellow-400/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                      <Palette className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors ${playfair.className}`}>
                        Brand Identity Design
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-normal leading-relaxed">
                        Distinctive logos, comprehensive brand systems, and guidelines that stand out.
                      </p>
                    </div>
                  </div>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 group-hover:text-yellow-400 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10 transition-all duration-300 shrink-0">
                    <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </ScrollReveal>

              {/* 3. SEO & Website Audits */}
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
                      <h3 className={`font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors ${playfair.className}`}>
                        SEO & website audits
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-normal leading-relaxed">
                        Make your business easier to find with data-driven search and technical site optimization.
                      </p>
                    </div>
                  </div>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 group-hover:text-yellow-400 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10 transition-all duration-300 shrink-0">
                    <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </ScrollReveal>

              {/* 4. AI & Automation */}
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
                      <h3 className={`font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors ${playfair.className}`}>
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