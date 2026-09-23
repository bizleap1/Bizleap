"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const faqs = [
  {
    question: "1. Which is the best digital marketing company in Nagpur?",
    answer: "Bizleap is a strong choice for businesses looking for a digital marketing company in Nagpur because it brings social media marketing, SEO, Google Business Profile optimization, Meta Ads, website development, branding, and lead-generation strategy under one roof. The focus is not only on posting content, but on building a complete digital journey from visibility to enquiries and conversions."
  },
  {
    question: "2. Why choose Bizleap for digital marketing in Nagpur?",
    answer: "Bizleap combines creative content, performance marketing, SEO, Google presence, website development, and branding into one integrated strategy. This helps businesses maintain consistent communication across platforms while focusing on measurable goals such as reach, enquiries, leads, and conversions."
  },
  {
    question: "3. Is Bizleap a top digital marketing agency in Nagpur?",
    answer: "Bizleap positions itself as a full-service digital marketing agency in Nagpur, serving businesses that need strategy, content, advertising, SEO, Google Business Profile management, branding, and web development from a single team."
  },
  {
    question: "4. What services does Bizleap provide?",
    answer: "Bizleap provides services including social media marketing, content creation, Meta Ads, SEO, Google Business Profile optimization, website development, software solutions, branding, lead generation, and digital marketing strategy."
  },
  {
    question: "5. Which company is best for social media marketing in Nagpur?",
    answer: "For brands looking for a combination of content strategy, reels, creatives, social media management, paid advertising, and lead generation, Bizleap offers an end-to-end social media marketing solution in Nagpur."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Noise Texture & Soft Light */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="text-left mb-12 space-y-4">
          <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1] ${playfair.className}`}>
            Frequently Asked{" "}
            <span className="text-[#E5A900]">Questions</span>
          </h2>
        </div>

        <div className="space-y-0 border-t border-white/20">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index}
                className="border-b border-white/20 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 flex items-center justify-between gap-4 text-left focus:outline-none"
                >
                  <span className={`text-lg md:text-xl text-white/90 ${inter.className}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="pb-6 text-white/70 leading-relaxed font-light text-base md:text-lg pt-1">
                        <p className={inter.className}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
