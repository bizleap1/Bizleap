"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

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
    <section ref={ref} className="py-20 px-6 md:px-12 bg-black text-white">
      
      {/* Heading */}
      <motion.div
        initial={{ filter: "blur(8px)", opacity: 0, y: 20 }}
        animate={inView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold leading-snug">
          Driven by Design. Backed by Results.
        </h2>
        <p className="text-base md:text-lg leading-relaxed">
          At <span className="font-extrabold text-white">Biz</span>
          <span className="font-extrabold text-yellow-400">Leap</span>, we don’t just make things look good — 
          we create thoughtful design experiences that help businesses grow.
        </p>
      </motion.div>

      {/* STATS */}
      <div className="
        grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto 
        mt-16 border-t border-gray-800 pt-10
      ">

        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
            animate={inView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className={`
              text-center px-6 
              relative overflow-hidden
              rounded-2xl shadow-lg md:shadow-none
              bg-zinc-900/40 md:bg-transparent
              backdrop-blur-xl md:backdrop-blur-0
              border border-zinc-800 md:border-none
              py-8 md:py-0
              ${i < stats.length - 1 ? "md:border-r md:border-gray-800" : ""}
            `}
          >

            {/* Mobile gradient glow ring */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-40 md:hidden" />

            {/* MOBILE hover/tap scale */}
            <div className="md:scale-100 active:scale-[0.97] transition-transform">

              <div className="text-5xl md:text-5xl font-extrabold relative z-10">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={4}
                    suffix={stat.suffix}
                  />
                )}
              </div>

              <p className="mt-3 text-lg md:text-lg font-semibold relative z-10">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
