"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

function ServiceIcon({ type }) {
  const iconProps = {
    className: "w-6 h-6 text-[#FFC000] shrink-0",
  };

  switch (type) {
    // 1. SEO Services
    case "gear":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3.2" strokeWidth="2" />
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
          />
        </svg>
      );
    case "barchart":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="14" width="4.5" height="7" rx="1" strokeWidth="2" />
          <rect x="9.75" y="4" width="4.5" height="17" rx="1" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
          <rect x="16.5" y="9" width="4.5" height="12" rx="1" strokeWidth="2" />
        </svg>
      );
    case "filetext":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
        </svg>
      );

    // 2. Social Media
    case "megaphone":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 11 14-5v12L3 13v-2z" />
          <path d="M11 16.5 9.5 21" />
          <path d="M21 7.5c.9 1.3 1.3 2.8 1.3 4.5s-.4 3.2-1.3 4.5" />
          <path d="M18 9.5c.5.8.7 1.6.7 2.5s-.2 1.7-.7 2.5" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
        </svg>
      );
    case "strategy":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="18" x2="9" y2="13" />
          <line x1="12" y1="18" x2="12" y2="10" />
          <line x1="15" y1="18" x2="15" y2="15" />
        </svg>
      );

    // 3. Design & Development
    case "figma":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
          <circle cx="15.5" cy="12.5" r="3.5" />
          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
        </svg>
      );
    case "wireframe":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
          <line x1="2.5" y1="9.5" x2="21.5" y2="9.5" />
          <line x1="2.5" y1="4.5" x2="21.5" y2="19.5" opacity="0.35" />
          <line x1="2.5" y1="19.5" x2="21.5" y2="4.5" opacity="0.35" />
        </svg>
      );
    case "prototyping":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="8" width="13" height="13" rx="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2" />
        </svg>
      );

    // 4. Branding
    case "pentool":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 2 4.5 7.5L14 22h-4L7.5 9.5 12 2z" />
          <circle cx="12" cy="11" r="1.5" />
          <line x1="12" y1="12.5" x2="12" y2="22" />
        </svg>
      );
    case "guidelines":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    case "circles":
      return (
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="9" r="5.5" />
          <circle cx="15" cy="9" r="5.5" />
          <circle cx="12" cy="15" r="5.5" />
        </svg>
      );

    // 5. AI & Automation
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

const SERVICES = [
  {
    id: "seo",
    eyebrow: "SEO SERVICES",
    titleLine1: "SEO & Website",
    titleLine2: "Audits",
    name: "SEO & Website Audits",
    description:
      "Improve your search visibility with practical SEO audits. We identify technical issues, content gaps, and opportunities for organic growth.",
    img: "/seo-audit-work.png",
    url: "/seowebsite",
    features: [
      { name: "Technical SEO", icon: "gear" },
      { name: "Keyword Strategy", icon: "barchart" },
      { name: "On-Page Optimization", icon: "filetext" },
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
    img: "/smm.png",
    url: "/socialmedia",
    features: [
      { name: "Meta Ads", icon: "megaphone" },
      { name: "Instagram Reels", icon: "instagram" },
      { name: "Content Strategy", icon: "strategy" },
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
    img: "/development-workspace.png",
    url: "https://www.bizdevelopment.in/",
    features: [
      { name: "Figma", icon: "figma" },
      { name: "Wireframing", icon: "wireframe" },
      { name: "Prototyping", icon: "prototyping" },
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
    img: "/brand identity.png",
    url: "/brandidentity",
    features: [
      { name: "Logo Design", icon: "pentool" },
      { name: "Brand Guidelines", icon: "guidelines" },
      { name: "Visual Identity", icon: "circles" },
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
    img: "/ai-automation-hand.png",
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
    <>
      <Head>
        <title key="title">Our Services | Bizleap</title>
        <meta
          name="description"
          content="Bizleap offers digital marketing, web development, branding, SEO, and creative services designed to help businesses grow and succeed online."
          key="description"
        />
        <meta name="keywords" content="bizleap services, seo web design branding Nagpur" />
        <link rel="canonical" href="https://bizleap.in/services" />
      </Head>

      <main className={`bg-[#050505] min-h-screen text-white ${inter.className} selection:bg-yellow-500/30 selection:text-white pb-[100px]`}>
        {/* ====================================================
            HERO
            ==================================================== */}
        <section className="relative w-full min-h-[55vh] md:min-h-[65vh] overflow-hidden bg-black flex flex-col justify-start">
          {/* Dynamic Yellow Glows */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <motion.div
              animate={{
                x: ["-20vw", "80vw", "80vw", "-20vw", "-20vw"],
                y: ["-20vh", "-20vh", "80vh", "80vh", "-20vh"],
                opacity: [0.5, 0.7, 0.5, 0.7, 0.5],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-[50vh] h-[50vh] md:w-[70vh] md:h-[70vh] bg-yellow-400 rounded-full blur-[120px] md:blur-[150px] mix-blend-screen"
            />
            <motion.div
              animate={{
                x: ["80vw", "-20vw", "-20vw", "80vw", "80vw"],
                y: ["80vh", "80vh", "-20vh", "-20vh", "80vh"],
                opacity: [0.4, 0.6, 0.4, 0.6, 0.4],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-[60vh] h-[60vh] md:w-[80vh] md:h-[80vh] bg-yellow-500 rounded-full blur-[130px] md:blur-[160px] mix-blend-screen"
            />
          </div>

          <div className="pt-28 sm:pt-36 md:pt-[180px] pb-10 sm:pb-16 md:pb-[110px] max-w-[1360px] mx-auto px-4 sm:px-6 md:px-[60px] lg:px-[72px] relative z-10 w-full">
            <div className="flex flex-col justify-start relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[#FFC000] text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC000] animate-pulse" />
                Our Services
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`text-3xl sm:text-5xl md:text-[68px] lg:text-[80px] font-bold leading-[1.12] md:leading-[1.05] tracking-tight text-white max-w-[900px] ${playfair.className}`}
              >
                Everything you need<br className="hidden md:block" /> to{" "}
                <span className="text-[#FFC000] italic font-medium">scale.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-4 sm:mt-6 md:mt-8 max-w-xl"
              >
                <p className="text-sm sm:text-base md:text-lg text-[#999] font-normal leading-relaxed">
                  Engineered for performance and designed for conversion. We provide the complete stack for your digital presence.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ====================================================
            MAIN SERVICES (Mobile Optimized + Desktop Alternating)
            ==================================================== */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-[60px] lg:px-[72px]">
          {SERVICES.map((service, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <section
                id={`service-${index}`}
                key={service.name}
                className="py-10 sm:py-16 md:py-24 border-t border-[#1a1a1a] flex flex-col justify-center scroll-mt-24"
              >
                <div
                  className={`flex flex-col ${
                    isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-center justify-between gap-6 sm:gap-10 lg:gap-16`}
                >
                  {/* TEXT COLUMN */}
                  <div className="w-full lg:w-[46%] flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {/* Eyebrow */}
                      <span className="block text-xs md:text-[13px] font-bold uppercase tracking-[0.2em] text-[#FFC000] mb-2 sm:mb-3">
                        {service.eyebrow}
                      </span>

                      {/* Title */}
                      <h2 className={`text-2xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-bold leading-[1.12] mb-3 sm:mb-5 text-white tracking-tight ${playfair.className}`}>
                        <span className="block">{service.titleLine1}</span>
                        <span className="block">{service.titleLine2}</span>
                      </h2>

                      {/* Description */}
                      <p className="text-gray-300 text-sm sm:text-base font-normal leading-relaxed max-w-lg mb-5 sm:mb-8">
                        {service.description}
                      </p>
                    </motion.div>

                    {/* MOBILE IMAGE PREVIEW (shows after description on mobile) */}
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

                    {/* Features list */}
                    <div className="w-full max-w-lg mb-6 sm:mb-8 md:mb-10">
                      {service.features.map((feature, fIndex) => (
                        <motion.div
                          key={feature.name}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.4, delay: fIndex * 0.05 }}
                          className="py-3 sm:py-4 flex items-center gap-3.5 sm:gap-4 border-b border-[#222226]"
                        >
                          <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
                            <ServiceIcon type={feature.icon} />
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
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FFC000] hover:bg-[#ffcd33] active:scale-[0.98] text-black font-semibold text-sm transition-all duration-300 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/25 cursor-pointer text-center"
                      >
                        <span>View details</span>
                        <span className="text-base font-bold leading-none">→</span>
                      </Link>
                    </div>
                  </div>

                  {/* DESKTOP IMAGE COLUMN (hidden on mobile, visible on lg) */}
                  <div className="hidden lg:flex w-full lg:w-[54%] items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="relative w-full aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden bg-[#111] shadow-2xl border border-white/5"
                    >
                      <Image
                        src={service.img}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 54vw"
                        priority={index === 0}
                      />
                    </motion.div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
