'use client';
import * as React from "react";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500'] });

const reasons = [
  {
    num: "01",
    title: "Creative Excellence",
    description: "Designs built to solve problems and make an impact on your target audience.",
  },
  {
    num: "02",
    title: "Data-Driven Strategy",
    description: "Creative instincts backed by hard data to drive actual business results.",
  },
  {
    num: "03",
    title: "Transparent Partnership",
    description: "Clear communication, realistic timelines, and tangible outcomes.",
  },
  {
    num: "04",
    title: "Dedicated Team",
    description: "A squad of experts who treat your brand like it's their own.",
  },
];

export default function AboutSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section 
      id="about"
      ref={containerRef} 
      className="relative py-24 md:py-32 bg-[#050505] text-white overflow-hidden"
    >
      {/* Subtle Noise Texture & Gold Ambient Glow */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[800px] bg-yellow-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-5 space-y-16">
            
            {/* Header Area */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-white/30"></div>
                <span className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase">Why Choose Us</span>
              </div>
              
              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] ${playfair.className}`}>
                Built with <span className="text-yellow-500 font-medium italic">purpose.</span><br />
                Driven by <span className="text-yellow-500 font-medium italic">results.</span>
              </h2>
              
              <p className={`text-base md:text-lg text-white/60 max-w-md leading-relaxed font-light ${inter.className}`}>
                Bizleap wasn’t built in a boardroom. We create for the dreamers and the builders who want to leave a mark. If you’re here, you’re one of them.
              </p>
            </motion.div>

            {/* Value Propositions */}
            <motion.div 
              className="space-y-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.3
                  }
                }
              }}
            >
              {reasons.map((reason, index) => (
                <motion.div 
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="group relative border-t border-white/10 last:border-b py-6 cursor-pointer overflow-hidden flex gap-6 md:gap-8 items-start"
                >
                  {/* Subtle hover accent line */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-yellow-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  
                  <span className={`text-2xl md:text-3xl font-light text-white/30 group-hover:text-yellow-500 transition-colors duration-500 ${playfair.className}`}>
                    {reason.num}
                  </span>
                  
                  <div className="flex-1 space-y-2 pt-1">
                    <h3 className={`text-lg md:text-xl font-medium text-white group-hover:text-white transition-colors duration-500 ${inter.className}`}>
                      {reason.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/50 leading-relaxed font-light line-clamp-2">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Editorial Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative w-full mt-16 lg:mt-0 py-10"
          >
            <div className="grid grid-cols-12 gap-4 md:gap-6 items-center relative z-20">
              
              {/* Image 1: Dominant (Strategy) */}
              <motion.div 
                style={{ y: y1 }}
                className="col-span-7 relative h-[350px] md:h-[500px] lg:h-[650px] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20"
              >
                <div className="absolute inset-0 bg-black/10 z-10 hover:bg-transparent transition-colors duration-700" />
                <Image 
                  src="/Team-Meeting.jpeg" 
                  alt="Strategy and Collaboration" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover scale-105 hover:scale-100 transition-transform duration-1000 ease-out" 
                />
              </motion.div>

              {/* Supporting Images Column */}
              <div className="col-span-5 flex flex-col gap-4 md:gap-6">
                
                {/* Image 2: Supporting (Creativity) */}
                <motion.div 
                  style={{ y: y2 }}
                  className="relative h-[180px] md:h-[260px] lg:h-[340px] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-10 -mt-12 md:-mt-20"
                >
                  <div className="absolute inset-0 bg-black/10 z-10 hover:bg-transparent transition-colors duration-700" />
                  <Image 
                    src="/opening.jpeg" 
                    alt="Creative Process" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover scale-105 hover:scale-100 transition-transform duration-1000 ease-out" 
                  />
                </motion.div>

                {/* Image 3: Supporting (Execution) */}
                <motion.div 
                  style={{ y: y3 }}
                  className="relative h-[200px] md:h-[280px] lg:h-[380px] rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] z-30"
                >
                  <div className="absolute inset-0 bg-black/10 z-10 hover:bg-transparent transition-colors duration-700" />
                  <Image 
                    src="/Akshat-meet.PNG" 
                    alt="Execution and Delivery" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover scale-105 hover:scale-100 transition-transform duration-1000 ease-out" 
                  />
                </motion.div>
              </div>

            </div>
            
            {/* Vignette Overlay for Depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(5,5,5,0.8)] pointer-events-none z-40 rounded-lg" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
