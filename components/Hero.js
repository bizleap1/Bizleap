"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import Link from "next/link";
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '800', '900'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500'] });


export default function Hero() {
  const heroRef = useRef();
  const headlineRef = useRef();
  const subtextRef = useRef();
  const buttonsRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split headline into words for staggered reveal
      const headlineWords = headlineRef.current.innerText.split(" ");
      headlineRef.current.innerHTML = headlineWords
        .map((word) => `<span class="word-wrapper inline-block overflow-hidden pb-1"><span class="word inline-block translate-y-full">${word}</span></span>`)
        .join(" ");

      // Headline animation
      gsap.to(".word", {
        y: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.2,
      });

      // Subtext animation
      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.8,
          ease: "expo.out",
        }
      );

      // Buttons animation
      gsap.fromTo(
        ".hero-button",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-start pt-28 pb-32 px-8 md:px-16 lg:px-24 overflow-hidden bg-black"
    >
      {/* Dynamic Yellow Glows (Perimeter Path to Avoid Center) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Main Yellow Glow traversing the outer edges clockwise */}
        <motion.div
          animate={{
            x: ["-20vw", "80vw", "80vw", "-20vw", "-20vw"],
            y: ["-20vh", "-20vh", "80vh", "80vh", "-20vh"],
            scale: [1, 1.2, 1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5, 0.7, 0.5],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-[50vh] h-[50vh] md:w-[70vh] md:h-[70vh] bg-yellow-400 rounded-full blur-[120px] md:blur-[150px] mix-blend-screen"
        />
        
        {/* Secondary Yellow Glow traversing counter-clockwise for balance */}
        <motion.div
          animate={{
            x: ["80vw", "-20vw", "-20vw", "80vw", "80vw"],
            y: ["80vh", "80vh", "-20vh", "-20vh", "80vh"],
            scale: [1.2, 1, 1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4, 0.6, 0.4],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-[60vh] h-[60vh] md:w-[80vh] md:h-[80vh] bg-yellow-500 rounded-full blur-[130px] md:blur-[160px] mix-blend-screen"
        />
      </div>

      {/* Hero Content — Left Aligned */}
      <div className="max-w-4xl relative z-20 mt-6 space-y-8">
        <h1
          ref={headlineRef}
          className={`headline text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.08] text-white tracking-tight ${playfair.className}`}
        >
          Bizleap – Where Brands Leap Forward
        </h1>

        <p
          ref={subtextRef}
          className={`subtext max-w-xl text-lg md:text-xl text-white/60 font-light leading-relaxed ${inter.className}`}
        >
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



      <style>{`
        .ease-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
        .word-wrapper {
          margin-right: 0.25em;
        }
      `}</style>
    </section>
  );
}
