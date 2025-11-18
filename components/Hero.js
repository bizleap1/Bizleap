"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Logo from "./Logo";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import Link from "next/link";


export default function Hero() {
  const heroRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.from(".headline", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
      });

      // Paragraph animation
      gsap.from(".subtext", {
        opacity: 0,
        y: 15,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      // Buttons animation
      gsap.fromTo(
        ".hero-button",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      // Subtle background movement
      gsap.to(".shader-gradient-bg", {
        scale: 1.05,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 text-center overflow-hidden bg-black"
    >
      {/* Shader Gradient Background */}
      <div className="absolute inset-0 w-full h-full shader-gradient-bg pointer-events-none z-0">
        <ShaderGradientCanvas
          style={{ width: "100%", height: "100%" }}
          pixelDensity={1}
          pointerEvents="none"
        >
          <ShaderGradient
            animate="on"
            type="sphere"
            wireframe={false}
            shader="defaults"
            uTime={0}
            uSpeed={0.3}
            uStrength={0.3}
            uDensity={0.8}
            uFrequency={5.5}
            uAmplitude={3.2}
            positionX={-0.1}
            positionY={0}
            positionZ={0}
            rotationX={0}
            rotationY={130}
            rotationZ={70}
            color1="#73bfc4"
            color2="#ff810a"
            color3="#8da0ce"
            reflection={0.4}
            cAzimuthAngle={270}
            cPolarAngle={180}
            cDistance={0.5}
            cameraZoom={15.1}
            lightType="env"
            brightness={0.8}
            
            grain="on"
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* Hero Content */}
      <div
        className="
          max-w-4xl space-y-6 relative z-20 
          mt-20 md:mt-0
        "
      >
        <h1 className="headline mt-0 md:mt-20 text-5xl md:text-7xl font-semibold leading-tight text-white">
          Designs That <br /> Captivate, Brands That Shine.
        </h1>

        <p className="subtext mx-auto max-w-2xl text-lg text-white/90">
          At BizLeap, we blend creativity and strategy to craft stunning
          websites, striking visuals, and unforgettable brand experiences that
          set you apart.
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

      {/* Logo stays fixed below */}
      <Logo />
    </section>
  );
}
