'use client';
import * as React from "react";
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import Image from "next/image";
import { Circle } from "lucide-react";

// ------------------- InView Component -------------------
const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function InView({ children, variants = defaultVariants, transition, viewOptions, as = 'div' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
    >
      {children}
    </MotionComponent>
  );
}

// ------------------- ScrollView Components -------------------
function ScrollView({ children, stagger = false, delay = 0, viewMargin = "0px 0px -200px 0px" }) {
  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { delay, staggerChildren: stagger ? 0.09 : 0, duration: 0.5 },
        },
      }}
      viewOptions={{ margin: viewMargin }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </InView>
  );
}

// ------------------- Why Choose Us Data -------------------
const reasons = [
  {
    title: "Creative Excellence",
    description: "Our designs aren’t just pretty; they’re built to solve problems and make an impact on your target audience.",
  },
  {
    title: "Data-Driven Strategy",
    description: "We back our creative instinct with hard data, ensuring your digital presence drives actual business results.",
  },
  {
    title: "Honest & Transparent",
    description: "No confusing jargon or hidden fees. Just clear communication, realistic timelines, and tangible outcomes.",
  },
  {
    title: "Dedicated Team",
    description: "When you work with us, you get a dedicated squad of experts who treat your brand like it's their own.",
  },
];

// ------------------- Why Choose Us Component -------------------
export default function AboutSection() {
  return (
    <section className="py-20 md:py-32 bg-black text-white overflow-hidden" id="about">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text and Values */}
          <div className="space-y-12">
            <div className="space-y-6">
              <ScrollView>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  Why Choose Us
                </div>
              </ScrollView>
              
              <ScrollView delay={0.1}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                  Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">purpose.</span><br />
                  Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">results.</span>
                </h2>
              </ScrollView>
              
              <ScrollView delay={0.2}>
                <p className="text-lg text-white/70 max-w-xl leading-relaxed">
                  Bizleap wasn’t built in a boardroom. We don’t create for “clients.” We create for the dreamers, the builders, the ones who wake up wanting to leave a mark. If you’re here, you’re probably one of them.
                </p>
              </ScrollView>
            </div>

            <div className="space-y-8">
              {reasons.map((reason, index) => (
                <ScrollView key={index} delay={0.3 + (index * 0.1)}>
                  <div className="flex gap-4 group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-yellow-500/10 group-hover:border-yellow-500/50 transition-colors">
                        <Circle className="w-4 h-4 text-zinc-400 group-hover:text-yellow-500 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{reason.title}</h3>
                      <p className="text-white/60 leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </ScrollView>
              ))}
            </div>
          </div>

          {/* Right Column: Masonry Image Grid */}
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-yellow-600/20 to-transparent blur-[80px] rounded-full pointer-events-none" />
            
            <ScrollView delay={0.4}>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4 md:space-y-6 translate-y-12">
                  <div className="relative w-full h-[240px] md:h-[360px] rounded-2xl overflow-hidden group border border-zinc-800">
                    <Image 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
                      alt="Team Collaboration" 
                      fill 
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="relative w-full h-[200px] md:h-[280px] rounded-2xl overflow-hidden group border border-zinc-800">
                    <Image 
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80" 
                      alt="Data Analysis" 
                      fill 
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="relative w-full h-[200px] md:h-[280px] rounded-2xl overflow-hidden group border border-zinc-800">
                    <Image 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
                      alt="Brainstorming" 
                      fill 
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="relative w-full h-[240px] md:h-[360px] rounded-2xl overflow-hidden group border border-zinc-800">
                    <Image 
                      src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" 
                      alt="Strategic Planning" 
                      fill 
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>
              </div>
            </ScrollView>
          </div>

        </div>
      </div>
    </section>
  );
}
