'use client'

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REELS = [
  { src: "/Reel1.mp4" },
  { src: "/Reel2.mp4" },
  { src: "/Reel3.mp4" },
];

// ------------------- Navigation Buttons -------------------
function NavigationButtons({ currentIndex, totalItems, onPrevious, onNext }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
          currentIndex === 0 
            ? 'border-gray-600 text-gray-600 cursor-not-allowed' 
            : 'border-white text-white hover:bg-white hover:text-black'
        }`}
        aria-label="Previous reel"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div className="flex items-center gap-2">
        <span className="text-white text-sm font-medium">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-gray-400 text-sm">/</span>
        <span className="text-gray-400 text-sm">
          {String(totalItems).padStart(2, '0')}
        </span>
      </div>

      <button
        onClick={onNext}
        disabled={currentIndex === totalItems - 1}
        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
          currentIndex === totalItems - 1
            ? 'border-gray-600 text-gray-600 cursor-not-allowed'
            : 'border-white text-white hover:bg-white hover:text-black'
        }`}
        aria-label="Next reel"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// ------------------- Mobile Reels Section -------------------
function MobileReels() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedReel, setSelectedReel] = useState(null);
  const scrollContainerRef = useRef(null);
  const videoRefs = useRef([]);

  const nextReel = () => {
    const newIndex = Math.min(currentIndex + 1, REELS.length - 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const previousReel = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const reelElement = scrollContainer.children[index];
      if (reelElement) {
        reelElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  // Handle scroll events to update current index
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.clientWidth;
      const newIndex = Math.round(scrollLeft / containerWidth);
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < REELS.length) {
        setCurrentIndex(newIndex);
      }
    };

    // Add scroll event listener
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [currentIndex]);

  // Auto-play current video and pause others
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play().catch(console.error);
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex]);

  return (
    <section className="py-16 bg-black text-white">
      <div className="mx-auto max-w-5xl space-y-8 px-6">
        {/* Header Section */}
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-medium lg:text-5xl"
          >
            Featured Reels
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Watch our latest video content
          </motion.p>
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons
          currentIndex={currentIndex}
          totalItems={REELS.length}
          onPrevious={previousReel}
          onNext={nextReel}
        />

        {/* Horizontal Scroll Reels */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 scrollbar-hide"
            style={{ 
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {REELS.map((reel, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] snap-center px-3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    filter: "blur(0px)",
                    transition: { duration: 0.5, ease: "easeOut" }
                  }}
                  className="bg-black rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedReel(reel.src)}
                >
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={reel.src}
                    className="w-full h-[70vh] object-cover rounded-2xl"
                    muted
                    loop
                    playsInline
                    autoPlay={index === currentIndex}
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-1" />
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {REELS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  scrollToIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-gray-600'
                }`}
                aria-label={`Go to reel ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedReel(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedReel(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <video
                src={selectedReel}
                controls
                autoPlay
                className="w-full h-auto max-h-[85vh] rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide scrollbar globally for this section */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// ------------------- Desktop Reels Section -------------------
function DesktopReels() {
  const [selectedReel, setSelectedReel] = useState(null);
  const videoRefs = useRef([]);

  // Auto-play videos when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(console.error);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.8 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-black text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-white"
        >
          Featured Reels
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 text-xl max-w-3xl mx-auto"
        >
          Watch our latest video content
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {REELS.map((reel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="relative group cursor-pointer bg-black rounded-2xl overflow-hidden border border-gray-800"
              onClick={() => setSelectedReel(reel.src)}
            >
              <video
                ref={el => videoRefs.current[index] = el}
                src={reel.src}
                className="w-full h-[400px] object-cover"
                muted
                loop
                playsInline
                autoPlay
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedReel(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedReel(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <video
                src={selectedReel}
                controls
                autoPlay
                className="w-full h-auto max-h-[85vh] rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ------------------- Responsive Hook -------------------
function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

// ------------------- Main Reels Section -------------------
export default function ReelsSection() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileReels />;
  }

  return <DesktopReels />;
}