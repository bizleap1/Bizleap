"use client";

import { motion } from "framer-motion";

export default function CreatorsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
          Coming Soon
        </h1>
        <p className="text-gray-400 mt-4 text-lg md:text-xl">
          The Creator’s space is under construction 🚧
        </p>
      </motion.div>
    </main>
  );
}
