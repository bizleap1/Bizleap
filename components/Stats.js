"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "-50px"
  });

  const stats = [
    {
      value: 350,
      suffix: "+",
      label: "Projects\nDelivered",
    },
    {
      value: 40,
      suffix: "%",
      label: "Average Growth\nImpact",
    },
    {
      value: 6,
      suffix: "+",
      label: "Years Building\nDigital Brands",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Subtle Noise Texture & Soft Radial Lighting */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-yellow-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
            <div className="w-6 h-[1px] bg-white/30"></div>
            <span className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase">Our Impact</span>
            <div className="w-6 h-[1px] bg-white/30"></div>
          </motion.div>

          <motion.h2 variants={itemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] ${playfair.className}`}>
            Creative thinking. Measurable <span className="text-[#E5A900] italic font-medium">growth.</span>
          </motion.h2>
        </motion.div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="w-full mx-auto h-[1px] bg-white/10 my-12 origin-center"
        />

        {/* Statistics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 w-full mx-auto md:divide-x divide-white/10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center px-6"
            >
              <div className="relative mb-6 flex flex-col items-center">
                <div className={`text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter tabular-nums text-white ${playfair.className}`}>
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      useEasing={true}
                    />
                  ) : "0"}
                  <span className="text-[#E5A900] font-light">{stat.suffix}</span>
                </div>
                
                {/* Gold Accent Line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 1, delay: 0.6 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-12 h-[1px] bg-[#E5A900] origin-center mt-6"
                />
              </div>
              
              <p className={`text-sm md:text-sm uppercase tracking-[0.2em] text-white/50 whitespace-pre-line leading-relaxed ${inter.className}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
