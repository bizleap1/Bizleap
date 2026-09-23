'use client'

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const REELS = [
  { src: "/videos/Masala-and-Morsales.mp4" },
  { src: "/videos/MilesAlongSmiles.mp4" },
  { src: "/videos/MirayabyGarima.mp4" },
  { src: "/videos/Suko.mp4" },
  { src: "/videos/Tifstay.mp4" },
  { src: "/videos/Toni-and-Guys.mp4" },
  { src: "/videos/WealthAcumen.mp4" },
  { src: "/videos/asma.mp4" },
  { src: "/videos/taubys.mp4" },
  { src: "/jhol-momo.mp4" },
  { src: "/meher-ganga-2.mp4" },
  { src: "/oswal-jwellers.mp4" },
];






// ------------------- Reel Card (hover-to-play) -------------------
function ReelCard({ reel, index, onClick }) {
  const videoRef = useRef(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px 0px", // Load slightly before it comes into view
  });

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(reel.src)}
      className="relative rounded-[1.75rem] overflow-hidden cursor-pointer border border-white/10 shadow-xl group bg-zinc-900 w-full"
      style={{ aspectRatio: "9/16" }}
    >
      <video
        ref={videoRef}
        src={inView ? `${reel.src}#t=0.1` : ""}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        poster={reel.poster}
      />

      {/* Cover image — always visible, fades to reveal video on hover */}
      {reel.poster && (
        <img
          src={reel.poster}
          alt="reel cover"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
      )}

      {/* Default pause icon overlay (visible when not hovered) */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />

      {/* Hover play glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
          <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </motion.div>
  );
}

// ------------------- Main Reels Section -------------------
export default function ReelsSection() {
  const [selectedReel, setSelectedReel] = useState(null);

  useEffect(() => {
    if (selectedReel) {
      document.body.style.setProperty('overflow', 'hidden', 'important');
      document.documentElement.style.setProperty('overflow', 'hidden', 'important');
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedReel]);

  // Split reels into two rows
  const half = Math.ceil(REELS.length / 2);
  const row1 = REELS.slice(0, half);
  const row2 = REELS.slice(half);

  // Duplicate for seamless infinite scroll
  const duplicatedRow1 = [...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2];
  const duplicatedAllReels = [...REELS, ...REELS, ...REELS];

  return (
    <section className="py-20 md:py-32 bg-black text-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-500 font-semibold mb-3">Our Content</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Featured Reels
            </h2>
            <p className="mt-3 text-gray-400 text-base max-w-md">
              Hover to preview. Click to watch.
            </p>
          </div>
          <a
            href="https://www.instagram.com/bizleap.in/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm font-semibold text-white hover:bg-white hover:text-black transition-all duration-300 self-start md:self-auto"
          >
            View on Instagram
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* Continuous Scrolling Rows within Container */}
        <div className="flex flex-col gap-6 md:gap-8 overflow-hidden relative">
          
          {/* Fade overlays for the edges */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none" />

          {/* Mobile View: Single Row */}
          <div className="relative w-full flex md:hidden overflow-hidden">
            <div className="flex gap-4 animate-scroll-left w-max pr-4 hover:[animation-play-state:paused]">
              {duplicatedAllReels.map((reel, index) => (
                <div 
                  key={`mobile-${index}`} 
                  className="flex-shrink-0 w-[50vw] sm:w-[35vw]"
                >
                  <ReelCard
                    reel={reel}
                    index={index}
                    onClick={setSelectedReel}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop View: Two Rows */}
          <div className="hidden md:flex flex-col gap-8 w-full">
            {/* Row 1 - Scrolls Left */}
            <div className="relative w-full flex overflow-hidden">
              <div className="flex gap-6 animate-scroll-left w-max pr-6 hover:[animation-play-state:paused]">
                {duplicatedRow1.map((reel, index) => (
                  <div 
                    key={`row1-${index}`} 
                    className="flex-shrink-0 w-[22vw] lg:w-[16vw]"
                  >
                    <ReelCard
                      reel={reel}
                      index={index}
                      onClick={setSelectedReel}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - Scrolls Right */}
            <div className="relative w-full flex overflow-hidden">
              <div className="flex gap-6 animate-scroll-right w-max pr-6 hover:[animation-play-state:paused]">
                {duplicatedRow2.map((reel, index) => (
                  <div 
                    key={`row2-${index}`} 
                    className="flex-shrink-0 w-[22vw] lg:w-[16vw]"
                  >
                    <ReelCard
                      reel={reel}
                      index={index}
                      onClick={setSelectedReel}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.333% - 8px)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-33.333% - 8px)); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 50s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 50s linear infinite;
        }
        @media (max-width: 768px) {
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-33.333% - 5px)); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(calc(-33.333% - 5px)); }
            100% { transform: translateX(0); }
          }
        }
      `}</style>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-6 md:p-12"
            onClick={() => setSelectedReel(null)}
            style={{ touchAction: 'none' }}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 28 }}
              className="relative max-w-[280px] sm:max-w-sm w-full mx-auto flex items-start justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedReel(null)}
                className="absolute -right-12 md:-right-16 top-0 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 hover:text-gray-200 transition-all z-50 backdrop-blur-sm"
              >
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <video
                src={selectedReel}
                controls
                autoPlay
                className="w-full rounded-[2rem] shadow-2xl"
                style={{ aspectRatio: "9/16" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}