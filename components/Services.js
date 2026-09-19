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
    name: "UI/UX & Web Design",
    tags: ["Figma", "Wireframing", "Prototyping"],
    img: "/ui ux & website.png",
    url: "/webdesign",
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
    img: "/seo.png",
    url: "/seowebsite",
    description: "We fix what's broken, polish what's dull."
  },
  {
    name: "AI Services",
    tags: ["AI Automation", "ChatBot Integration"],
    img: "/ai services.png",
    url: "/aiservices",
    description: "We integrate cutting-edge AI into your business workflows."
  },
  {
    name: "Staffing Services",
    tags: ["Recruitment", "Talent Acquisition"],
    img: "/staffing services.png",
    url: "/staffing",
    description: "End-to-end staffing solutions to help you build your dream team."
  },

];

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = SERVICES_LIST.length;

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + length) % length);

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-black text-white overflow-hidden relative" id="services">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl space-y-6 mb-16 text-left"
        >
          <div className="flex items-center justify-start gap-3">
            <div className="w-6 h-[1px] bg-white/30"></div>
            <span className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase">Our Services</span>
          </div>
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] ${playfair.className}`}>
            Experience our digital <span className="text-[#E5A900] italic font-medium">solutions.</span>
          </h2>
        </motion.div>

        <div className="relative h-[450px] md:h-[550px] w-full flex justify-center items-center">
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
                    opacity: isVisible ? (isCenter ? 1 : 0.4) : 0,
                    filter: isCenter ? "blur(0px)" : "blur(4px)"
                  }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute w-[90%] max-w-[450px] md:max-w-[600px] h-[400px] md:h-[480px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
                  onClick={() => {
                     if (!isCenter) {
                        setCurrentIndex(index);
                     }
                  }}
                >
                  <Link href={service.url} className={`block w-full h-full relative group ${!isCenter ? 'pointer-events-none' : ''}`}>
                    <Image
                      src={service.img}
                      alt={service.name}
                      fill
                      sizes="500px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent opacity-90" />
                    
                    <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                      <h3 className={`text-3xl md:text-4xl font-medium tracking-tight mb-4 text-white group-hover:text-[#E5A900] transition-colors duration-300 ${playfair.className}`}>
                        {service.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="border-white/20 text-white/70 bg-transparent hover:bg-white/10 hover:text-white backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.15em]">{tag}</Badge>
                        ))}
                      </div>
                      <p className={`text-white/60 text-sm leading-relaxed line-clamp-2 font-light ${inter.className}`}>
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:-left-4 lg:-left-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white flex justify-center items-center hover:bg-[#E5A900] hover:text-black hover:border-[#E5A900] transition-all duration-300 shadow-2xl group"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-2 md:-right-4 lg:-right-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white flex justify-center items-center hover:bg-[#E5A900] hover:text-black hover:border-[#E5A900] transition-all duration-300 shadow-2xl group"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
