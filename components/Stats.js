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
      value: 120,
      suffix: "+",
      label: "Projects Launched",
    },
    {
      value: 40,
      suffix: "%",
      label: "Average Client Growth",
    },
    {
      value: 5,
      suffix: "+",
      label: "Years in the Game",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-12 bg-black text-white"
    >
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
          <span className="font-extrabold text-yellow-400">Leap</span>, we don’t just make things look good — we create thoughtful design experiences that help businesses grow, connect with their audience, and stand out in a crowded digital world.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16 border-t border-gray-800 pt-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
            animate={inView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className={`text-center ${
              i < stats.length - 1 ? "border-r border-gray-800" : ""
            } px-6`}
          >
            <div className="text-4xl md:text-5xl font-extrabold">
              {inView && <CountUp start={0} end={stat.value} duration={4} suffix={stat.suffix} />}
            </div>
            <p className="mt-2 text-lg font-semibold">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
