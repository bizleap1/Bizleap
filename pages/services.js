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
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 mr-2 mb-2";
  const colors = {
    default: "bg-white text-black border-transparent",
    secondary: "bg-gray-700 text-white border-transparent",
    outline: "border-gray-400 text-white bg-transparent",
  };
  return (
    <span className={`${base} ${colors[variant]} ${className}`}>{children}</span>
  );
}

// ------------------- InView Scroll Reveal -------------------
function ScrollReveal({ children, delay = 0, stagger = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -150px 0px", once: true });

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
      <title>Our Services | Bizleap</title>
      <meta
        name="description"
        content="Bizleap offers digital marketing, web development, branding, SEO, and creative services designed to help businesses grow and succeed online."
      />
    </Head>

    <section className="py-20 md:py-32 bg-black text-white" id="services">
      <div className="mx-auto max-w-6xl px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-semibold">Our Services</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="text-gray-300 text-base md:text-lg leading-relaxed">
              At BizLeap Studio, we create designs that do more than look good —
              they solve problems, connect with people, and drive measurable
              results. Whether you’re starting fresh or refining your brand, we’ve
              got you covered.
            </h2>
          </ScrollReveal>
        </div>

        {/* Services */}
        <div className="space-y-20 md:space-y-32">
          {SERVICES.map((service, i) => (
            <div
              key={service.name}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center border-b border-gray-800 pb-20 last:border-0"
            >
              {/* Text Section */}
              <div className={`lg:col-span-5 space-y-8 ${i % 2 !== 0 ? "lg:order-last" : ""}`}>
                <ScrollReveal>
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
                    {service.name}
                  </h3>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                    {service.description}
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="opacity-70">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                  <Link href={service.url}>
                    <button className="text-yellow-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                      Learn More <span>→</span>
                    </button>
                  </Link>
                </ScrollReveal>
              </div>

              {/* Image Section */}
              <div className="lg:col-span-7">
                <ScrollReveal delay={0.2}>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden group border border-gray-800 shadow-2xl">
                    <Image
                      src={service.img}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
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
