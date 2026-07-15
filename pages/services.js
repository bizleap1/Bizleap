"use client";
import * as React from "react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

// ------------------- Badge Component -------------------
function Badge({ children, variant = "secondary", className = "" }) {
  const base =
    "inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 mr-2 mb-2 transition-all duration-300";
  const colors = {
    default: "bg-white text-black border-transparent",
    secondary: "bg-white/5 text-gray-300 border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20",
    outline: "border-white/10 text-gray-400 bg-white/5 backdrop-blur-md hover:text-white hover:border-white/20 hover:bg-white/10",
  };
  return (
    <span className={`${base} ${colors[variant]} ${className}`}>{children}</span>
  );
}

// ------------------- InView Scroll Reveal -------------------
function ScrollReveal({ children, delay = 0, stagger = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -100px 0px", once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)", transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          : {}
      }
    >
      {children}
    </motion.div>
  );
}

// ------------------- Data -------------------
const SERVICES = [
  {
    name: "UI/UX & Web Design",
    tags: ["Figma", "Wireframing", "Prototyping", "Responsive Design", "User Testing"],
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1400",
    url: "/webdesign",
    description:
      "End-to-end digital design from wireframes to polished interfaces. We create intuitive, visually appealing experiences for websites and apps, backed by user research and iterative testing.",
  },
  {
    name: "Brand Identity Design",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity", "Typography", "Color Theory"],
    img: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&q=80&w=1400",
    url: "/brandidentity",
    description:
      "Comprehensive branding packages including logos, style guides, and asset kits. We craft cohesive visual identities that communicate your brand’s essence across all touchpoints.",
  },
  {
    name: "SEO & Website Audits",
    tags: ["Technical SEO", "Keyword Strategy", "On-Page Optimization", "Analytics", "Performance Tuning"],
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1400",
    url: "/seowebsite",
    description:
      "Data-driven SEO audits and optimizations to improve rankings. We analyze technical health, content gaps, and backlink profiles to drive organic growth.",
  },
  {
    name: "Social Media Marketing",
    tags: ["Meta Ads", "Instagram Reels", "Content Strategy", "Community Management", "Performance Tracking"],
    img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1400",
    url: "/socialmedia",
    description:
      "Full-service social media management—from organic content creation to paid campaigns. We build engaging narratives and measurable strategies tailored to each platform.",
  },
  {
    name: "AI Services",
    tags: ["AI Automation", "ChatBot Integration", "Generative Content", "AI Strategy", "Workflow AI"],
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1400",
    url: "/aiservices",
    description:
      "We integrate cutting-edge AI into your business workflows — from intelligent chatbots to generative content engines that work while you sleep.",
  },
];

// ------------------- Final Section -------------------
export default function ServicesSection() {
  return (<>
    <Head>
      <title key="title">Our Services | Bizleap</title>
      <meta name="description" content="Bizleap offers digital marketing, web development, branding, SEO, and creative services designed to help businesses grow and succeed online." key="description" />
      <meta name="keywords" content="bizleap services, seo web design branding Nagpur" />
      <link rel="canonical" href="https://bizleap.in/services" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://bizleap.in/services#webpage",
            "url": "https://bizleap.in/services",
            "name": "Our Services | Bizleap",
            "description": "Bizleap offers UI/UX & Web Design, Brand Identity, SEO, Social Media Marketing, and AI Services for businesses looking to grow online.",
            "isPartOf": { "@id": "https://bizleap.in/#website" },
            "provider": { "@id": "https://bizleap.in/#organization" },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bizleap.in/" },
                { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://bizleap.in/services" }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "UI/UX & Web Design", "url": "https://bizleap.in/webdesign" },
                { "@type": "ListItem", "position": 2, "name": "Brand Identity Design", "url": "https://bizleap.in/brandidentity" },
                { "@type": "ListItem", "position": 3, "name": "SEO & Website Audits", "url": "https://bizleap.in/seowebsite" },
                { "@type": "ListItem", "position": 4, "name": "Social Media Marketing", "url": "https://bizleap.in/socialmedia" },
                { "@type": "ListItem", "position": 5, "name": "AI Services", "url": "https://bizleap.in/aiservices" }
              ]
            }
          })
        }}
      />
    </Head>

    <section className="relative pt-28 pb-20 md:pt-32 md:pb-28 bg-[#050505] text-white overflow-hidden" id="services">
      {/* Background Glow Effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[80vw] md:w-[600px] h-[400px] bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8 space-y-24 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 tracking-tight leading-[1.1] text-white">
              Elevate<br />
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Your Brand.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light text-center">
              Mastering the intersection of advanced technology, premium design, and scalable business growth.
            </p>
          </ScrollReveal>
        </div>

        {/* Services List */}
        <div className="space-y-32 md:space-y-48 mt-24">
          {SERVICES.map((service, i) => (
            <div
              key={service.name}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center group/section"
            >
              {/* Text Section */}
              <div className={`lg:col-span-5 space-y-8 ${i % 2 !== 0 ? "lg:order-last" : ""}`}>
                <ScrollReveal>
                  <div className="space-y-4">
                    <span className="text-yellow-500/80 font-mono text-sm tracking-wider uppercase">
                      0{i + 1} / Service
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white group-hover/section:text-yellow-500 transition-colors duration-500">
                      {service.name}
                    </h3>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <p className="text-gray-400 text-lg leading-relaxed font-light">
                    {service.description}
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                  <Link href={service.url}>
                    <button className="group mt-6 inline-flex items-center gap-3 text-white font-medium transition-all hover:text-yellow-400">
                      <span className="relative overflow-hidden inline-block">
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Explore Service</span>
                        <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-yellow-400">Explore Service</span>
                      </span>
                      <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transform transition-all duration-300 group-hover:border-yellow-400 group-hover:bg-yellow-400/10 group-hover:translate-x-2">
                        →
                      </span>
                    </button>
                  </Link>
                </ScrollReveal>
              </div>

              {/* Image Section */}
              <div className="lg:col-span-7">
                <ScrollReveal delay={0.2}>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-[0_0_50px_-20px_rgba(255,255,255,0.1)] group-hover/section:shadow-[0_0_50px_-20px_rgba(234,179,8,0.15)] transition-shadow duration-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 z-10" />
                    <Image
                      src={service.img}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover/section:scale-105 opacity-80 group-hover/section:opacity-100"
                    />
                    {/* Inner glowing ring effect */}
                    <div className="absolute inset-0 rounded-3xl border border-white/10 z-20 pointer-events-none mix-blend-overlay" />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
  );
}
