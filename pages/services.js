"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import { Playfair_Display, Inter } from "next/font/google";
import { SERVICES_DATA } from "../components/Services";

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

export default function ServicesPage() {
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
          {SERVICES_DATA.map((service, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <section
                id={`service-${service.id}`}
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
                      viewport={{ once: true, margin: "0px" }}
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
                          viewport={{ once: true, margin: "0px" }}
                          transition={{ duration: 0.4, delay: fIndex * 0.05 }}
                          className="py-3 sm:py-4 flex items-center gap-3.5 sm:gap-4 border-b border-[#222226]"
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
                  <div className="hidden lg:flex w-full lg:w-[54%] items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "0px" }}
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
