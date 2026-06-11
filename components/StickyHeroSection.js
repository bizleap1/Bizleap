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
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !videoWrapperRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Text Animation from original Hero
      const headlineWords = headlineRef.current.innerText.split(" ");
      headlineRef.current.innerHTML = headlineWords
        .map((word) => `<span class="word-wrapper inline-block overflow-hidden pb-1"><span class="word inline-block translate-y-full">${word}</span></span>`)
        .join(" ");

      gsap.to(".word", { y: 0, duration: 1.2, stagger: 0.08, ease: "power4.out", delay: 0.2 });
      gsap.fromTo(subtextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.8, ease: "expo.out" });
      gsap.fromTo(".hero-button", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.2, stagger: 0.15, ease: "power3.out" });

      // 2. Scroll Animation for the Video
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%', // Shorter pin duration so it finishes faster
          pin: true,
          scrub: true, // Immediate scrub with no lag so it stays perfectly synced
        }
      });

      // Step 1: Move to bottom-center
      tl.to(videoWrapperRef.current, {
        right: 'calc(50% - 130px)',
        bottom: '24px',
        ease: 'power1.inOut',
        duration: 1
      }, 0);

      // Step 2: Zoom to cover the screen below the navbar
      tl.to(videoWrapperRef.current, {
        right: '32px',
        bottom: '24px',
        width: 'calc(100% - 64px)',
        height: 'calc(100vh - 88px)',
        borderRadius: '24px',
        ease: 'power1.inOut',
        duration: 1
      }, 1);

      // Fade out the hero text smoothly WHILE zooming
      tl.to([heroRef.current, ".video-caption"], {
        opacity: 0,
        y: -100,
        duration: 1,
        ease: 'power2.inOut'
      }, 1);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center">
      
      {/* --- HERO CONTENT (Background Glows & Text) --- */}
      <div ref={heroRef} className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Dynamic Yellow Glows */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <motion.div animate={{ x: ["-20vw", "80vw", "80vw", "-20vw", "-20vw"], y: ["-20vh", "-20vh", "80vh", "80vh", "-20vh"], opacity: [0.5, 0.7, 0.5, 0.7, 0.5] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-[50vh] h-[50vh] md:w-[70vh] md:h-[70vh] bg-yellow-400 rounded-full blur-[120px] md:blur-[150px] mix-blend-screen" />
          <motion.div animate={{ x: ["80vw", "-20vw", "-20vw", "80vw", "80vw"], y: ["80vh", "80vh", "-20vh", "-20vh", "80vh"], opacity: [0.4, 0.6, 0.4, 0.6, 0.4] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-[60vh] h-[60vh] md:w-[80vh] md:h-[80vh] bg-yellow-500 rounded-full blur-[130px] md:blur-[160px] mix-blend-screen" />
        </div>

        {/* Hero Text */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pointer-events-auto h-full flex flex-col justify-center">
          <div className="max-w-3xl space-y-8">
            <h1 ref={headlineRef} className={`headline text-6xl md:text-7xl lg:text-[5rem] font-bold leading-[1.05] text-white tracking-tight ${playfair.className}`}>
              Bizleap – Where Brands Leap Forward
            </h1>
            <p ref={subtextRef} className={`subtext max-w-xl text-lg md:text-xl text-white/60 font-light leading-relaxed ${inter.className}`}>
              We craft digital experiences that captivate, convert, and scale your brand.
            </p>
            <div className="mt-10 flex flex-row gap-4 items-center">
              <Link href="/contact" className="z-30">
                <button className="hero-button bg-white text-black px-8 py-3.5 rounded-full font-semibold text-base hover:bg-yellow-400 transition-all duration-300">
                  Get Started
                </button>
              </Link>
              <Link href="/about" className="z-30">
                <button className="hero-button border border-white/20 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-white hover:text-black transition-all duration-300">
                  Explore Our Work
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- VIDEO CONTAINER (Bottom Right) --- */}
      {/* Wrapper for the initial small video state so we can place text below it */}
      <div 
        ref={videoWrapperRef} 
        className="absolute z-30 overflow-hidden flex flex-col items-start justify-start pointer-events-auto shadow-2xl"
        style={{ 
          right: '8%', 
          bottom: '12%', 
          width: '260px', 
          height: '146px', 
          borderRadius: '12px' 
        }}
      >
        <video
          ref={videoRef}
          src="/team/herovideo.mp4" 
          autoPlay
          muted={true}
          loop
          playsInline
          onClick={toggleMute}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        />
        
        {/* Subtle Mute Toggle Icon */}
        <div className="absolute top-2 right-2 z-40 bg-black/50 p-1.5 rounded-full pointer-events-none">
          {isMuted ? (
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          ) : (
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          )}
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
