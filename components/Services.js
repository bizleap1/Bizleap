'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

function ServiceIcon({ type }) {
  const iconProps = {
    className: "w-5 h-5 text-[#FFC000] shrink-0",
  };

  switch (type) {
    case "bot":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16" />
          <line x1="16" y1="16" x2="16" y2="16" />
        </svg>
      );
    case "chat":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
        </svg>
      );
    default:
      return null;
  }
}

export const SERVICES_DATA = [
  {
    id: "seo",
    eyebrow: "SEO SERVICES",
    titleLine1: "SEO & Website",
    titleLine2: "Audits",
    name: "SEO & Website Audits",
    description:
      "Improve your search visibility with practical SEO audits. We identify technical issues, content gaps, and opportunities for organic growth.",
    img: "/service/seo-website-audits.png",
    url: "/seowebsite",
    features: [
      { name: "Technical SEO", icon: "/service/technical-seo.png" },
      { name: "Keyword Strategy", icon: "/service/keyword-strategy.png" },
      { name: "On-Page Optimization", icon: "/service/on-page-optimization.png" },
    ],
  },
  {
    id: "social-media",
    eyebrow: "SOCIAL MEDIA",
    titleLine1: "Social Media",
    titleLine2: "Marketing",
    name: "Social Media Marketing",
    description:
      "Build a consistent presence with content that connects. We plan, create, and manage social media campaigns to help your brand reach the right audience.",
    img: "/service/social-media-marketing.png",
    url: "/socialmedia",
    features: [
      { name: "Meta Ads", icon: "/service/meta-ads.png" },
      { name: "Instagram Reels", icon: "/service/instagram-reels.png" },
      { name: "Content Strategy", icon: "/service/content-strategy.png" },
    ],
  },
  {
    id: "development",
    eyebrow: "DESIGN & DEVELOPMENT",
    titleLine1: "Development",
    titleLine2: "services",
    name: "Development services",
    description:
      "From wireframes to polished interfaces, we design intuitive websites and apps with a clear focus on usability and your business goals.",
    img: "/service/development-services.png",
    url: "https://www.bizdevelopment.in/",
    features: [
      { name: "Figma", icon: "/service/figma.png" },
      { name: "Wireframing", icon: "/service/wireframing.png" },
      { name: "Prototyping", icon: "/service/prototyping.png" },
    ],
  },
  {
    id: "branding",
    eyebrow: "BRANDING",
    titleLine1: "Brand Identity",
    titleLine2: "Design",
    name: "Brand Identity Design",
    description:
      "Create a consistent brand that people recognise. We design logos, guidelines, and visual assets that bring your identity together across every touchpoint.",
    img: "/service/brand-identity-design.png",
    url: "/brandidentity",
    features: [
      { name: "Logo Design", icon: "/service/logo-design.png" },
      { name: "Brand Guidelines", icon: "/service/brand-guidelines.png" },
      { name: "Visual Identity", icon: "/service/visual-identity.png" },
    ],
  },
  {
    id: "ai",
    eyebrow: "AI & AUTOMATION",
    titleLine1: "AI & Automation",
    titleLine2: "Services",
    name: "AI Services",
    description:
      "We integrate cutting-edge AI into your business workflows — from intelligent chatbots to generative content engines that work while you sleep.",
    img: "/service/Golden wireframe AI hand and network.png",
    url: "/aiservices",
    features: [
      { name: "AI Automation", icon: "bot" },
      { name: "ChatBot Integration", icon: "chat" },
      { name: "Workflow AI", icon: "sparkles" },
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className={`py-16 sm:py-24 md:py-32 bg-black text-white overflow-hidden relative ${inter.className}`} id="services">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-yellow-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl space-y-4 sm:space-y-6 mb-12 sm:mb-20 text-left"
        >
          <div className="flex items-center justify-start gap-3">
            <div className="w-8 h-[2px] bg-[#FFC000]"></div>
            <span className="text-[#FFC000] text-xs font-bold tracking-[0.25em] uppercase">
              Our Services
            </span>
          </div>
          <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] ${playfair.className}`}>
            Experience our digital <span className="text-[#FFC000] italic font-medium">solutions.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
            Engineered for performance and designed for conversion. We provide the complete stack for your digital presence.
          </p>
        </motion.div>

        {/* Services Alternating Grid */}
        <div className="space-y-16 sm:space-y-24 md:space-y-32">
          {SERVICES_DATA.map((service, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                id={`service-${service.id}`}
                key={service.name}
                className="pt-8 sm:pt-12 border-t border-white/10"
              >
                <div
                  className={`flex flex-col ${
                    isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-center justify-between gap-8 sm:gap-12 lg:gap-16`}
                >
                  {/* TEXT COLUMN */}
                  <div className="w-full lg:w-[48%] flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "0px" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {/* Eyebrow */}
                      <span className="block text-xs md:text-[13px] font-bold uppercase tracking-[0.2em] text-[#FFC000] mb-2 sm:mb-3">
                        {service.eyebrow}
                      </span>

                      {/* Title */}
                      <h3 className={`text-2xl sm:text-4xl md:text-5xl lg:text-[44px] font-bold leading-[1.15] mb-3 sm:mb-5 text-white tracking-tight ${playfair.className}`}>
                        <span className="block">{service.titleLine1}</span>
                        <span className="block">{service.titleLine2}</span>
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300 text-sm sm:text-base font-normal leading-relaxed max-w-lg mb-6 sm:mb-8">
                        {service.description}
                      </p>
                    </motion.div>

                    {/* MOBILE IMAGE PREVIEW (shows between description & features on mobile) */}
                    <div className="block lg:hidden w-full mb-6">
                      <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-[#111] shadow-2xl border border-white/10">
                        <Image
                          src={service.img}
                          alt={service.name}
                          fill
                          className="object-cover"
                          sizes="100vw"
                          priority={index === 0}
                        />
                      </div>
                    </div>

                    {/* Features list with real icons */}
                    <div className="w-full max-w-lg mb-6 sm:mb-8 md:mb-10">
                      {service.features.map((feature, fIndex) => (
                        <motion.div
                          key={feature.name}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "0px" }}
                          transition={{ duration: 0.4, delay: fIndex * 0.05 }}
                          className="py-3 sm:py-3.5 flex items-center gap-3.5 sm:gap-4 border-b border-[#222226]"
                        >
                          <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0 p-1">
                            {feature.icon.startsWith("/") ? (
                              <Image
                                src={feature.icon}
                                alt={feature.name}
                                width={20}
                                height={20}
                                className="object-contain"
                              />
                            ) : (
                              <ServiceIcon type={feature.icon} />
                            )}
                          </div>
                          <span className="text-white text-sm sm:text-base font-medium">
                            {feature.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div>
                      <Link
                        href={service.url}
                        target={service.url.startsWith("http") ? "_blank" : undefined}
                        rel={service.url.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FFC000] hover:bg-[#ffcd33] active:scale-[0.98] text-black font-semibold text-sm transition-all duration-300 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/25 cursor-pointer text-center group"
                      >
                        <span>View details</span>
                        <span className="text-base font-bold leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>

                  {/* DESKTOP IMAGE COLUMN (hidden on mobile, visible on lg) */}
                  <div className="hidden lg:flex w-full lg:w-[52%] items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "0px" }}
                      transition={{ duration: 0.6 }}
                      className="relative w-full aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden bg-[#111] shadow-2xl border border-white/10 group"
                    >
                      <Image
                        src={service.img}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 52vw"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
