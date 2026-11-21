'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

function Badge({ children, variant = "secondary", className = "" }) {
  const base = "inline-flex items-center justify-center rounded-full border px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap shrink-0 mr-2 mb-2 transition-colors";
  const colors = {
    default: "bg-white text-black border-transparent",
    secondary: "bg-zinc-800 text-white border-transparent",
    destructive: "bg-red-500 text-white border-transparent",
    outline: "border-zinc-500 text-gray-300 bg-black/40 hover:bg-white hover:text-black",
  };
  return <span className={`${base} ${colors[variant]} ${className}`}>{children}</span>;
}

const SERVICES_LIST = [
  {
    name: "Development services",
    tags: ["Figma", "Wireframing", "Prototyping"],
    img: "/development-workspace.png",
    url: "https://www.bizdevelopment.in/",
    description: "We don't just design screens—we design moments."
  },
  {
    name: "Brand Identity",
    tags: ["Logo Design", "Brand Guidelines"],
    img: "/brand identity.png",
    url: "/brandidentity",
    description: "Your brand is a story waiting to be heard."
  },
  {
    name: "Social Media Marketing",
    tags: ["Meta Ads", "Content Strategy"],
    img: "/smm.png",
    url: "/socialmedia",
    description: "We create content that hits reach and engagement."
  },
  {
    name: "SEO & Website Audits",
    tags: ["Technical SEO", "On-Page Optimization"],
    img: "/seo-audit-work.png",
    url: "/seowebsite",
    description: "We fix what's broken, polish what's dull."
  },
  {
    name: "AI Services",
    tags: ["AI Automation", "ChatBot Integration"],
    img: "/ai-automation-hand.png",
    url: "/aiservices",
    description: "We integrate cutting-edge AI into your business workflows."
  },
];

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const length = SERVICES_LIST.length;

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + length) % length);

  const minSwipeDistance = 45;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(handleNext, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-black text-white overflow-hidden relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl space-y-4 sm:space-y-6 mb-10 sm:mb-16 text-left"
        >
          <div className="flex items-center justify-start gap-3">
            <div className="w-6 h-[1px] bg-white/30"></div>
            <span className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase">Our Services</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] ${playfair.className}`}>
            Experience our digital <span className="text-[#E5A900] italic font-medium">solutions.</span>
          </h2>
        </motion.div>

        <div 
          className="relative h-[430px] sm:h-[480px] md:h-[550px] w-full flex justify-center items-center touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence initial={false}>
            {SERVICES_LIST.map((service, index) => {
              const relativeOffset = (index - currentIndex + length) % length;
              const normalizedOffset = relativeOffset > Math.floor(length / 2) ? relativeOffset - length : relativeOffset;
              
              const isCenter = normalizedOffset === 0;
              const isVisible = Math.abs(normalizedOffset) <= 1;

              return (
                <motion.div
                  key={service.name}
                  initial={false}
                  animate={{
                    x: `${normalizedOffset * 65}%`,
                    scale: isCenter ? 1 : 0.85,
                    zIndex: isCenter ? 10 : 5,
                    opacity: isVisible ? (isCenter ? 1 : 0.3) : 0,
                    filter: isCenter ? "blur(0px)" : "blur(4px)"
                  }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute w-[92%] sm:w-[86%] max-w-[420px] md:max-w-[600px] h-[390px] sm:h-[440px] md:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-2xl select-none"
                  onClick={() => {
                     if (!isCenter) {
                        setCurrentIndex(index);
                     }
                  }}>
                  <Link
                    href={service.url}
                    target={service.url.startsWith("http") ? "_blank" : undefined}
                    rel={service.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`block w-full h-full relative group ${!isCenter ? 'pointer-events-none' : ''}`}
                  >
                    <Image
                      src={service.img}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 90vw, 500px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/65 to-transparent opacity-95" />
                    
                    <div className="absolute inset-0 p-5 sm:p-8 md:p-10 flex flex-col justify-end">
                      <h3 className={`text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight mb-2.5 sm:mb-4 text-white group-hover:text-[#E5A900] transition-colors duration-300 ${playfair.className}`}>
                        {service.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2.5 sm:mb-4">
                        {service.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="border-white/20 text-white/70 bg-black/40 hover:bg-white/10 hover:text-white backdrop-blur-sm px-3 py-1 rounded-full text-[9px] sm:text-[10px] uppercase tracking-[0.15em]">{tag}</Badge>
                        ))}
                      </div>
                      <p className={`text-white/70 text-xs sm:text-sm leading-relaxed line-clamp-2 font-light ${inter.className}`}>
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Desktop Navigation Arrows (hidden on mobile) */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-2 md:-left-4 lg:-left-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white justify-center items-center hover:bg-[#E5A900] hover:text-black hover:border-[#E5A900] transition-all duration-300 shadow-2xl group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-2 md:-right-4 lg:-right-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white justify-center items-center hover:bg-[#E5A900] hover:text-black hover:border-[#E5A900] transition-all duration-300 shadow-2xl group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Navigation Controls: Dots + Subtle Arrows */}
        <div className="flex md:hidden items-center justify-between max-w-[280px] mx-auto mt-6 px-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white active:bg-[#E5A900] active:text-black transition-all"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5">
            {SERVICES_LIST.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-6 bg-[#E5A900]" : "w-1.5 bg-white/20"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white active:bg-[#E5A900] active:text-black transition-all"
            aria-label="Next service"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
