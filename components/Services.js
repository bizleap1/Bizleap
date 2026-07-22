'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1400",
    url: "/webdesign",
    description: "We don't just design screens—we design moments."
  },
  {
    name: "Brand Identity",
    tags: ["Logo Design", "Brand Guidelines"],
    img: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&q=80&w=1400",
    url: "/brandidentity",
    description: "Your brand is a story waiting to be heard."
  },
  {
    name: "Social Media Marketing",
    tags: ["Meta Ads", "Content Strategy"],
    img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1400",
    url: "/socialmedia",
    description: "We create content that hits reach and engagement."
  },
  {
    name: "SEO & Website Audits",
    tags: ["Technical SEO", "On-Page Optimization"],
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1400",
    url: "/seowebsite",
    description: "We fix what's broken, polish what's dull."
  },
  {
    name: "AI Services",
    tags: ["AI Automation", "ChatBot Integration"],
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1400",
    url: "/aiservices",
    description: "We integrate cutting-edge AI into your business workflows."
  },
  {
    name: "Staffing Services",
    tags: ["Recruitment", "Talent Acquisition"],
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1400",
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
    <section className="py-20 bg-black text-white overflow-hidden relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Services</h2>
          <p className="text-gray-400 mt-4">Experience Our Digital Solutions</p>
        </div>

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
                  <Link href={service.url} className={`block w-full h-full relative ${!isCenter ? 'pointer-events-none' : ''}`}>
                    <Image
                      src={service.img}
                      alt={service.name}
                      fill
                      sizes="500px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-3xl font-bold mb-3">{service.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
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
            className="absolute left-0 z-40 w-12 h-12 rounded-full bg-[#2a3045] shadow-lg text-yellow-500 flex justify-center items-center hover:bg-yellow-500 hover:text-[#2a3045] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 z-40 w-12 h-12 rounded-full bg-[#2a3045] shadow-lg text-yellow-500 flex justify-center items-center hover:bg-yellow-500 hover:text-[#2a3045] transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
