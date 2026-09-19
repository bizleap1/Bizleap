"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Playfair_Display, Inter } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

const projects = [
  {
    title: "Lord Of the Drinks",
    subtitle: "Brand Revival & Digital Growth",
    industry: "Hospitality / F&B",
    challenge: "Once trending, the brand faced declining footfall and engagement in a competitive local market.",
    whatWeDid: "Executed a 6-month social strategy, premium food photography, and high-impact event promotions.",
    outcome: "Generated renewed buzz, restored brand visibility, and significantly improved footfall.",
    chips: ["Hospitality", "Social Media", "6 Month Campaign"],
    img: "/Casestudy/LOD.png"
  },
  {
    title: "Rasoi Express",
    subtitle: "Food Delivery for Small Towns",
    industry: "FoodTech / Delivery",
    challenge: "Pandharkawda lacked food delivery infrastructure, limiting local restaurant growth and resident convenience.",
    whatWeDid: "Launched a complete food delivery platform, streamlining operations and local marketing.",
    outcome: "Served 50,000+ residents, supported local restaurants, and created new employment opportunities.",
    chips: ["FoodTech", "App Launch", "Local Impact"],
    img: "/Casestudy/Rasoi.png"
  },
  {
    title: "Hotel Anantara",
    subtitle: "New Year Party Promotion",
    industry: "Events / Hospitality",
    challenge: "Needed to maximize ticket sales and visibility for Nagpur's biggest New Year celebration.",
    whatWeDid: "Ran lead-driven social media campaigns, high-impact Instagram promotions, and event branding.",
    outcome: "Achieved record-breaking attendance and established the event as the city's most talked-about celebration.",
    chips: ["Events", "Performance Mktg", "Record Sales"],
    img: "/Casestudy/Anantara.png"
  },
  {
    title: "Tuli The Grand",
    subtitle: "Flagship Brand Launch",
    industry: "Luxury Hospitality",
    challenge: "Required a prestigious brand identity and launch strategy for a new flagship hotel venture.",
    whatWeDid: "Developed the complete brand identity from logo to launch strategy, ensuring a premium positioning.",
    outcome: "Successfully launched with high-profile visibility, inaugurated by Hon. Nitin Gadkari.",
    chips: ["Branding", "Strategy", "Launch Event"],
    img: "/Casestudy/tuli.png"
  },
  {
    title: "Solar Ark",
    subtitle: "Website Revamp & Content",
    industry: "Renewable Energy",
    challenge: "The existing digital presence lacked the credibility and storytelling needed to showcase their solar expertise.",
    whatWeDid: "Redesigned the website with fresh content, on-site professional shoots, and compelling client stories.",
    outcome: "Created a modern platform that strongly highlights their expertise and builds immediate trust.",
    chips: ["Web Design", "Content Creation", "B2B"],
    img: "/Casestudy/solar.webp"
  },
];

export default function Work() {
  const [current, setCurrent] = useState(0);

  const nextProject = () => setCurrent((prev) => (prev + 1) % projects.length);
  const prevProject = () =>
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section className="w-full py-24 md:py-32 bg-[#050505] text-white relative overflow-hidden" id="work">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-yellow-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ===== Header & Navigation ===== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-[#E5A900]"></div>
              <span className="text-[#E5A900] text-[10px] font-bold tracking-[0.3em] uppercase">Selected Work</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-medium tracking-tight ${playfair.className}`}>Overview</h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={prevProject}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 text-white flex justify-center items-center hover:bg-[#E5A900] hover:text-black hover:border-[#E5A900] transition-all duration-300 group shadow-xl"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={nextProject}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 text-white flex justify-center items-center hover:bg-[#E5A900] hover:text-black hover:border-[#E5A900] transition-all duration-300 group shadow-xl"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ===== Horizontal Slider Module ===== */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
            >
              
              {/* Left Side: Content */}
              <div className="lg:col-span-5 flex flex-col order-2 lg:order-1">
                <h2 className={`text-4xl md:text-5xl lg:text-5xl xl:text-[3.5rem] whitespace-nowrap font-medium tracking-tight mb-4 leading-[1.1] ${playfair.className}`}>
                  {projects[current].title.split(' ').map((word, i, arr) => 
                    i === arr.length - 1 ? <span key={i} className="text-[#E5A900] italic">{word}</span> : <span key={i}>{word} </span>
                  )}
                </h2>
                
                <p className={`text-white/70 text-lg md:text-xl font-light mb-12 leading-relaxed ${inter.className}`}>
                  {projects[current].subtitle}
                </p>

                {/* Structured Text */}
                <div className={`space-y-8 mb-12 ${inter.className}`}>
                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] text-[#E5A900] uppercase tracking-[0.2em] font-bold mb-3">
                      <span className="w-3 h-[1px] bg-[#E5A900]"></span> Challenge
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed font-light">
                      {projects[current].challenge}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] text-[#E5A900] uppercase tracking-[0.2em] font-bold mb-3">
                      <span className="w-3 h-[1px] bg-[#E5A900]"></span> What We Did
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed font-light">
                      {projects[current].whatWeDid}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] text-[#E5A900] uppercase tracking-[0.2em] font-bold mb-3">
                      <span className="w-3 h-[1px] bg-[#E5A900]"></span> Outcome
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed font-light">
                      {projects[current].outcome}
                    </p>
                  </div>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-3">
                  {projects[current].chips.map(chip => (
                    <span 
                      key={chip} 
                      className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-[10px] uppercase tracking-[0.1em]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side: Image */}
              <div className="lg:col-span-7 order-1 lg:order-2 relative h-[350px] md:h-[450px] lg:h-[550px] w-full rounded-[1.5rem] overflow-hidden shadow-2xl group">
                <Image
                  src={projects[current].img}
                  alt={projects[current].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[1.5rem] pointer-events-none" />
                
                <div className="absolute top-6 right-6 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                  <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                    {projects[current].industry}
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
