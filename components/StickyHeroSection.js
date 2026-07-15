"use client";
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '800', '900'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500'] });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const StickyHeroSection = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // 1. Text Animation from original Hero
      const headlineWords = headlineRef.current.innerText.split(" ");
      headlineRef.current.innerHTML = headlineWords
        .map((word) => `<span class="word-wrapper inline-block overflow-hidden pb-1"><span class="word inline-block translate-y-full">${word}</span></span>`)
        .join(" ");

      gsap.to(".word", { y: 0, duration: 1.2, stagger: 0.08, ease: "power4.out", delay: 0.2 });
      gsap.fromTo(subtextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.8, ease: "expo.out" });
      gsap.fromTo(".hero-button", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.2, stagger: 0.15, ease: "power3.out" });


    }, containerRef);

    return () => ctx.revert();
  }, []);

  const isClient = typeof window !== 'undefined';
  const isMobile = isClient ? window.innerWidth < 768 : false;

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-start md:justify-center pt-28 pb-10 md:pt-0 md:pb-0">
      
      {/* --- HERO CONTENT (Background Glows & Text) --- */}
      <div ref={heroRef} className="md:absolute md:inset-0 w-full md:h-full pointer-events-none">
        {/* Dynamic Yellow Glows */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <motion.div animate={{ x: ["-20vw", "80vw", "80vw", "-20vw", "-20vw"], y: ["-20vh", "-20vh", "80vh", "80vh", "-20vh"], opacity: [0.5, 0.7, 0.5, 0.7, 0.5] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-[50vh] h-[50vh] md:w-[70vh] md:h-[70vh] bg-yellow-400 rounded-full blur-[120px] md:blur-[150px] mix-blend-screen" />
          <motion.div animate={{ x: ["80vw", "-20vw", "-20vw", "80vw", "80vw"], y: ["80vh", "80vh", "-20vh", "-20vh", "80vh"], opacity: [0.4, 0.6, 0.4, 0.6, 0.4] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-[60vh] h-[60vh] md:w-[80vh] md:h-[80vh] bg-yellow-500 rounded-full blur-[130px] md:blur-[160px] mix-blend-screen" />
        </div>

        {/* Hero Text */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pointer-events-auto flex flex-col justify-start md:justify-center md:h-full">
          <div className="max-w-3xl space-y-6 md:space-y-8 mt-12 md:mt-0">
            <div className="md:hidden flex items-center gap-3 mb-[-10px]">
              <div className="w-8 h-[1px] bg-white"></div>
              <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">Premium Digital Agency</span>
            </div>
            <h1 ref={headlineRef} className={`headline text-5xl sm:text-7xl md:text-7xl lg:text-[5rem] font-bold leading-[1.15] md:leading-[1.05] text-white tracking-tight ${playfair.className} text-left`}>
              Bizleap – Where Brands Leap Forward
            </h1>
            <p ref={subtextRef} className={`subtext max-w-xl text-base md:text-xl text-white/70 md:text-white/80 font-light leading-relaxed md:leading-relaxed ${inter.className} text-left`}>
              We craft digital experiences that captivate, convert, and scale your brand.
            </p>
            
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 sm:items-center">
              <Link href="/contact" className="z-30 w-full sm:w-auto">
                <button className="hero-button w-full sm:w-auto bg-white text-black px-8 py-4 md:py-3.5 rounded-sm md:rounded-full font-bold md:font-semibold text-[13px] md:text-base uppercase tracking-widest md:tracking-normal hover:bg-yellow-400 transition-all duration-300 flex justify-center items-center gap-2">
                  Get Started <span className="md:hidden font-light text-lg leading-none mt-[-2px]">&#8594;</span>
                </button>
              </Link>
              <Link href="/about" className="z-30 w-full sm:w-auto">
                <button className="hero-button w-full sm:w-auto border border-white/20 text-white px-8 py-4 md:py-3.5 rounded-sm md:rounded-full font-bold md:font-semibold text-[13px] md:text-base uppercase tracking-widest md:tracking-normal hover:bg-white hover:text-black transition-all duration-300">
                  Explore Our Work
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ease-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
        .word-wrapper {
          margin-right: 0.25em;
        }
      `}</style>
    </section>
  );
};

export default StickyHeroSection;
