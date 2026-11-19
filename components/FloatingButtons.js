"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";

export default function FloatingButtons() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const isAuditPage = router.pathname === "/free-seo-audit";

  // show "scroll to top" button after scrolling 300px
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Scroll to Top on the Left */}
      <div className={`fixed bottom-6 left-6 flex-col items-center gap-4 z-50 print:hidden ${isAuditPage ? "hidden md:flex" : "flex"}`}>
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 backdrop-blur-md hover:bg-yellow-500/80 text-white p-3 rounded-full shadow-lg border border-white/20 transition"
        >
          <FaArrowUp size={20} />
        </motion.button>
      </div>

      {/* WhatsApp on the Right */}
      <div className={`fixed bottom-6 right-6 flex-col items-center gap-4 z-50 print:hidden ${isAuditPage ? "hidden md:flex" : "flex"}`}>
        <motion.a
          href="https://wa.me/918128121004" // 🔁 replace with your number
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition"
        >
          <FaWhatsapp size={24} />
        </motion.a>
      </div>
    </>
  );
}
