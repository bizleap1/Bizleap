"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  // show "scroll to top" button after scrolling 300px
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-4 z-50">
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white/10 backdrop-blur-md hover:bg-yellow-500/80 text-white p-3 rounded-full shadow-lg border border-white/20 transition"
      >
        <FaArrowUp size={20} />
      </motion.button>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/919876543210" // 🔁 replace with your number
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition"
      >
        <FaWhatsapp size={24} />
      </motion.a>
    </div>
  );
}
