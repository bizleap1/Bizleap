"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "800", "900"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });


export default function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      value: 200,
      suffix: "+",
      label: "Projects Launched",
    },
    {
      value: 40,
      suffix: "%",
      label: "Average Client Growth",
    },
    {
      value: 6,
      suffix: "+",
      label: "Years in the Game",
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-black text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30vw] h-[30vw] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading Group */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className={`text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-[1.1] ${playfair.className}`}>
          Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Design</span>.<br /> 
          Backed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Results</span>.
        </h2>
        <p className={`text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed ${inter.className}`}>
          At <span className="text-white font-bold">BizLeap</span>, we don’t just make things look good — 
          we create thoughtful design experiences that help businesses leap forward.
        </p>
      </motion.div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto mt-24 relative z-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="relative group p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-yellow-500/30 transition-all duration-500"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="text-6xl md:text-7xl font-black mb-4 tracking-tighter tabular-nums">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={3}
                    suffix={stat.suffix}
                    useEasing={true}
                  />
                )}
              </div>
              <div className="h-1 w-12 bg-yellow-500 mb-6 group-hover:w-20 transition-all duration-500" />
              <p className={`text-sm md:text-md uppercase tracking-[0.25em] font-bold text-gray-500 group-hover:text-yellow-500 transition-colors ${inter.className}`}>
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
