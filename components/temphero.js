"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Logo from "./Logo";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Now we know we are on client

    const ctx = gsap.context(() => {
      gsap.from(".headline", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".subtext", {
        opacity: 0,
        y: 15,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.fromTo(
        ".hero-button",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, delay: 1, stagger: 0.2, ease: "power3.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 text-center overflow-hidden bg-black"
    >
      {/* Video Background */}
      {isClient && (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Hero Content */}
      <div className="max-w-4xl space-y-6 relative z-20 mt-20 md:mt-0">
        <h1 className="headline mt-0 md:mt-20 text-5xl md:text-7xl font-semibold leading-tight text-white">
          Designs That <br /> Captivate, Brands That Shine.
        </h1>

        <p className="subtext mx-auto max-w-2xl text-lg text-white/90">
          At BizLeap, we blend creativity and strategy to craft stunning websites,
          striking visuals, and unforgettable brand experiences that set you apart.
        </p>

        <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/contact">
            <button className="hero-button bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
              Get Started
            </button>
          </Link>

          <Link href="/about">
            <button className="hero-button border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </Link>
        </div>
      </div>

      {/* Logo */}
      <Logo />
    </section>
  );
}
