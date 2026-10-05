"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import MediaSection from "../components/MediaSection";
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

// ------------------- Hero Reveal -------------------
function HeroReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ------------------- Scroll Reveal -------------------
function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -50px 0px", once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            }
          : {}
      }
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className={`bg-black text-white min-h-screen overflow-x-hidden ${inter.className}`}>
      <Head>
        <title key="title">About BizLeap | Driven by Design. Backed by Results.</title>
        <meta name="description" content="Discover the story behind BizLeap - a team of dreamers and builders dedicated to high-impact design and digital growth." key="description" />
        <meta name="keywords" content="bizleap about, bizleap team, digital marketing agency about" />
        <link rel="canonical" href="https://bizleap.in/about" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "@id": "https://bizleap.in/about#webpage",
              "url": "https://bizleap.in/about",
              "name": "About BizLeap | Driven by Design. Backed by Results.",
              "description": "Discover the story behind BizLeap - a team of 30+ creatives, developers, and strategists dedicated to high-impact design and digital growth since 2020.",
              "isPartOf": { "@id": "https://bizleap.in/#website" },
              "about": { "@id": "https://bizleap.in/#organization" },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bizleap.in/" },
                  { "@type": "ListItem", "position": 2, "name": "About", "item": "https://bizleap.in/about" }
                ]
              },
              "mainEntity": {
                "@type": "Organization",
                "name": "Bizleap",
                "foundingDate": "2020",
                "numberOfEmployees": { "@type": "QuantitativeValue", "value": 30 },
                "description": "Bizleap is a full-service digital agency with 200+ projects completed across branding, SEO, social media, and web design."
              }
            })
          }}
        />
      </Head>

      {/* --- CINEMATIC HERO --- */}
      <section className="relative min-h-[70vh] md:min-h-[65vh] flex items-center justify-center pt-24 pb-16">
        {/* Dynamic Yellow Glows - Matching Home Theme */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Main Yellow Glow */}
          <motion.div
            animate={{
              x: ["-10vw", "60vw", "60vw", "-10vw", "-10vw"],
              y: ["-10vh", "-10vh", "50vh", "50vh", "-10vh"],
              opacity: [0.5, 0.7, 0.5, 0.7, 0.5],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-[40vh] h-[40vh] md:w-[60vh] md:h-[60vh] bg-yellow-400 rounded-full blur-[120px] md:blur-[150px] mix-blend-screen"
          />
          {/* Secondary Yellow Glow */}
          <motion.div
            animate={{
              x: ["60vw", "-10vw", "-10vw", "60vw", "60vw"],
              y: ["50vh", "50vh", "-10vh", "-10vh", "50vh"],
              opacity: [0.4, 0.6, 0.4, 0.6, 0.4],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-[50vh] h-[50vh] md:w-[70vh] md:h-[70vh] bg-yellow-500 rounded-full blur-[130px] md:blur-[160px] mix-blend-screen"
          />
        </div>
        
        {/* Fade mask at bottom to prevent sharp cut-off */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-0" />

        <div className="relative z-10 text-center px-6 max-w-6xl mt-8 md:mt-12">
          <HeroReveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-white"></div>
              <p className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                Since 2020
              </p>
              <div className="w-8 h-[1px] bg-white"></div>
            </div>
          </HeroReveal>
          
          <HeroReveal delay={0.1}>
            <h1 className={`text-4xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.1] md:leading-[1.1] mb-8 ${playfair.className}`}>
              Turning <span className="text-[#E5A900] italic font-medium">Vision</span> into <br className="hidden md:block" />
              Digital <span className="text-[#E5A900] italic font-medium">Reality</span>.
            </h1>
          </HeroReveal>
          
          <HeroReveal delay={0.2}>
            <div className="flex justify-center gap-10 md:gap-16 mt-16 items-center flex-wrap">
              <div className="text-center">
                <p className={`text-3xl md:text-4xl font-bold text-white ${playfair.className}`}>350+</p>
                <p className="text-[10px] md:text-xs text-neutral-400 font-semibold uppercase tracking-[0.2em] mt-3">Projects<br/>Delivered</p>
              </div>
              <div className="hidden md:block w-px h-16 bg-white/20" />
              <div className="text-center">
                <p className={`text-3xl md:text-4xl font-bold text-white ${playfair.className}`}>40%</p>
                <p className="text-[10px] md:text-xs text-neutral-400 font-semibold uppercase tracking-[0.2em] mt-3">Average Growth<br/>Impact</p>
              </div>
              <div className="hidden md:block w-px h-16 bg-white/20" />
              <div className="text-center">
                <p className={`text-3xl md:text-4xl font-bold text-white ${playfair.className}`}>6+</p>
                <p className="text-[10px] md:text-xs text-neutral-400 font-semibold uppercase tracking-[0.2em] mt-3">Years Building<br/>Digital Brands</p>
              </div>
            </div>
          </HeroReveal>
        </div>
      </section>

      {/* --- OUR STORY --- */}
      <section className="w-full bg-black relative z-20">
        <div className="py-24 px-6 md:px-16 container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] ${playfair.className}`}>
              Our Journey <span className="text-[#E5A900] italic font-medium">Started</span> <br/>
              with a Single Spark.
            </h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
              At Bizleap, we’re proud of our journey from humble beginnings to becoming a leading digital agency.
              We started from scratch, with no initial investments—just sheer determination and a vision to
              redefine how brands communicate.
            </p>
            <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
              Today, with over 6 years of expertise, we manage a diverse portfolio of clients across various
              industries. Our strength lies in our team—a squad of 30+ passionate creatives, developers,
              and strategists who treat every brand like it’s their own.
            </p>
            <div className="pt-8">
              <div className="p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#E5A900] transform origin-left transition-transform duration-500" />
                <p className={`italic text-white/90 text-lg md:text-xl leading-relaxed ${playfair.className}`}>
                  "We don't create for clients. We create for the dreamers who want to leave a mark."
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group">
              <Image
                src="/images/Office2.webp"
                alt="BizLeap Culture"
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            </div>
            {/* Premium Floating Badge */}
            <div className="absolute -bottom-8 -left-8 bg-[#E5A900] text-black p-8 rounded-full w-36 h-36 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(229,169,0,0.3)] backdrop-blur-md">
              <span className={`text-3xl font-bold uppercase tracking-tight leading-none ${playfair.className}`}>Best</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] mt-2">Agency</span>
            </div>
          </motion.div>
        </div>
        </div>
      </section>

      {/* --- CONTENT SECTION (REELS) --- */}
      <div className="relative z-10 bg-black">
        <MediaSection />
      </div>

      {/* Footer Space padding */}
      <div className="h-20 bg-black" />
    </div>
  );
}

