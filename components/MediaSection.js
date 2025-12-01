'use client'

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REELS = [
  {src: "/reel4.MP4"},
  { src: "/reel5.mp4" },
  { src: "/reel6.mp4" },
  { src: "/reel7.mp4" },
  { src: "/reel8.mp4" },
  { src: "/reel9.mp4" },
  { src: "/reel10.mp4" },
  { src: "/reel11.mp4" },
  { src: "/reel12.mp4" },
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
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);

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

  const scrollToIndex = useCallback((index) => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const reelElement = scrollContainer.children[index];
      if (reelElement) {
        isScrolling.current = true;
        reelElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
        
        // Clear previous timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        
        // Reset scrolling flag after animation
        scrollTimeout.current = setTimeout(() => {
          isScrolling.current = false;
          // Ensure the correct video plays after scroll
          videoRefs.current.forEach((video, i) => {
            if (video) {
              if (i === index) {
                video.play().catch(console.error);
              } else {
                video.pause();
              }
            }
          });
        }, 300);
      }
    }
  }, []);

  // Handle scroll events to update current index
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (isScrolling.current) return;
      
      const scrollLeft = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.clientWidth;
      const newIndex = Math.round(scrollLeft / containerWidth);
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < REELS.length) {
        setCurrentIndex(newIndex);
      }
    };

    // Add scroll event listener with debouncing
    const debouncedHandleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(handleScroll, 100);
    };

    scrollContainer.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    
    return () => {
      scrollContainer.removeEventListener('scroll', debouncedHandleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [currentIndex]);

  // Auto-play current video and pause others - FIXED VERSION
  useEffect(() => {
    // First pause all videos
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });
    
    // Then play only the current one
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0; // Reset to beginning
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play prevented:", error);
        });
      }
    }
  }, [currentIndex]);

  return (
    <section className="py-16 bg-black text-white lg:hidden">
      <div className="mx-auto max-w-5xl space-y-8 px-6">
        {/* Header Section */}
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-medium"
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
                  className="bg-black rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 cursor-pointer relative"
                  onClick={() => setSelectedReel(reel.src)}
                >
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={reel.src}
                    className="w-full h-[70vh] object-cover rounded-2xl"
                    muted
                    loop
                    playsInline
                  />
                  
                  {/* Play Overlay - Only show if not current video */}
                  {index !== currentIndex && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                        <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-1" />
                      </div>
                    </div>
                  )}
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

// ------------------- Desktop Reels Carousel -------------------
function DesktopReelsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedReel, setSelectedReel] = useState(null);
  const scrollContainerRef = useRef(null);
  const videoRefs = useRef([]);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  // Show 3 reels at once on desktop
  const itemsPerView = 3;
  const totalGroups = Math.ceil(REELS.length / itemsPerView);

  const nextGroup = () => {
    const newIndex = Math.min(currentIndex + 1, totalGroups - 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const previousGroup = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = useCallback((index) => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const groupElement = scrollContainer.children[index];
      if (groupElement) {
        isScrolling.current = true;
        groupElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
        
        // Clear previous timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        
        // Reset scrolling flag after animation
        scrollTimeout.current = setTimeout(() => {
          isScrolling.current = false;
        }, 300);
      }
    }
  }, []);

  // Handle scroll events to update current index
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (isScrolling.current) return;
      
      const scrollLeft = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.clientWidth;
      const newIndex = Math.round(scrollLeft / containerWidth);
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalGroups) {
        setCurrentIndex(newIndex);
      }
    };

    // Add scroll event listener with debouncing
    const debouncedHandleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(handleScroll, 100);
    };

    scrollContainer.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    
    return () => {
      scrollContainer.removeEventListener('scroll', debouncedHandleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [currentIndex, totalGroups]);

  // Auto-play videos when they come into view for desktop
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
      { threshold: 0.7 } // Higher threshold for better accuracy
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  // Group reels into sets of 3
  const groupedReels = [];
  for (let i = 0; i < REELS.length; i += itemsPerView) {
    groupedReels.push(REELS.slice(i, i + itemsPerView));
  }

  return (
    <section className="hidden lg:block py-20 bg-black text-white">
      <div className="mx-auto max-w-7xl space-y-12 px-6">
        {/* Header Section */}
        <div className="relative z-10 mx-auto max-w-3xl space-y-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-medium"
          >
            Featured Reels
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-xl"
          >
            Watch our latest video content
          </motion.p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={previousGroup}
            disabled={currentIndex === 0}
            className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300 ${
              currentIndex === 0 
                ? 'border-gray-600 text-gray-600 cursor-not-allowed' 
                : 'border-white text-white hover:bg-white hover:text-black'
            }`}
            aria-label="Previous group"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-white text-lg font-medium">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-gray-400 text-lg">/</span>
            <span className="text-gray-400 text-lg">
              {String(totalGroups).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={nextGroup}
            disabled={currentIndex === totalGroups - 1}
            className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300 ${
              currentIndex === totalGroups - 1
                ? 'border-gray-600 text-gray-600 cursor-not-allowed'
                : 'border-white text-white hover:bg-white hover:text-black'
            }`}
            aria-label="Next group"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Desktop Carousel - Shows 3 reels at once */}
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
            {groupedReels.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="flex-shrink-0 w-full snap-center px-3"
              >
                <div className="grid grid-cols-3 gap-6">
                  {group.map((reel, index) => {
                    const globalIndex = groupIndex * itemsPerView + index;
                    return (
                      <motion.div
                        key={globalIndex}
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          filter: "blur(0px)",
                          transition: { 
                            duration: 0.5, 
                            ease: "easeOut",
                            delay: index * 0.1
                          }
                        }}
                        whileHover={{ 
                          scale: 1.03,
                          transition: { duration: 0.2 }
                        }}
                        className="bg-black rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 cursor-pointer relative"
                        onClick={() => setSelectedReel(reel.src)}
                      >
                        <video
                          ref={el => videoRefs.current[globalIndex] = el}
                          src={reel.src}
                          className="w-full aspect-[9/16] object-cover rounded-2xl"
                          muted
                          loop
                          playsInline
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                              <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {groupedReels.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  scrollToIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-gray-600'
                }`}
                aria-label={`Go to group ${index + 1}`}
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

// ------------------- Main Reels Section -------------------
export default function ReelsSection() {
  return (
    <>
      <MobileReels />
      <DesktopReelsCarousel />
    </>
  );
}