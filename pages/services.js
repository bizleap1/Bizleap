"use client";
import * as React from "react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";

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
    img: "/images/abstract-1.webp",
    url: "#",
    description:
      "End-to-end digital design from wireframes to polished interfaces. We create intuitive, visually appealing experiences for websites and apps, backed by user research and iterative testing.",
  },
  {
    name: "Brand Identity Design",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity", "Typography", "Color Theory"],
    img: "/images/abstract-2.webp",
    url: "#",
    description:
      "Comprehensive branding packages including logos, style guides, and asset kits. We craft cohesive visual identities that communicate your brand’s essence across all touchpoints.",
  },
  {
    name: "SEO & Website Audits",
    tags: ["Technical SEO", "Keyword Strategy", "On-Page Optimization", "Analytics", "Performance Tuning"],
    img: "/images/abstract-3.webp",
    url: "#",
    description:
      "Data-driven SEO audits and optimizations to improve rankings. We analyze technical health, content gaps, and backlink profiles to drive organic growth.",
  },
  {
    name: "Social Media Marketing",
    tags: ["Meta Ads", "Instagram Reels", "Content Strategy", "Community Management", "Performance Tracking"],
    img: "/images/abstract-5.webp",
    url: "#",
    description:
      "Full-service social media management—from organic content creation to paid campaigns. We build engaging narratives and measurable strategies tailored to each platform.",
  },
];

// ------------------- Final Section -------------------
export default function ServicesSection() {
  return (
    <section className="py-20 md:py-32 bg-black text-white" id="services">
      <div className="mx-auto max-w-6xl px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-semibold">Our Services</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              At BizLeap Studio, we create designs that do more than look good —
              they solve problems, connect with people, and drive measurable
              results. Whether you’re starting fresh or refining your brand, we’ve
              got you covered.
            </p>
          </ScrollReveal>
        </div>

        {/* Services */}
        <div className="space-y-16 md:space-y-24">
          {SERVICES.map((service, i) => (
            <div
              key={service.name}
              className={`grid grid-cols-1 lg:grid-cols-5 gap-10 border-b border-gray-700 pb-12 ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Text Section */}
              <div className="lg:col-span-2 flex flex-col justify-center gap-8">
                <ScrollReveal>
                  <h3 className="text-2xl md:text-3xl font-medium">{service.name}</h3>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    {service.description}
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.2} stagger>
                  <div className="flex flex-wrap">
                    {service.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                  
                </ScrollReveal>
              </div>

              {/* Image Section */}
              <div className="lg:col-span-3 relative">
                <ScrollReveal delay={0.2}>
                  <div className="rounded-xl overflow-hidden">
                    <Image
                      src={service.img}
                      alt={service.name}
                      width={900}
                      height={600}
                      className="w-full h-full object-cover aspect-[16/9] rounded-xl transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
