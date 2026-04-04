'use client'

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REELS = [
  { src: "/reel4.MP4" },
  { src: "/reel5.mp4" },
  { src: "/reel6.mp4" },
  { src: "/reel7.mp4" },
  { src: "/reel8.mp4" },
{ src: "/reel 1.mp4" },
  { src: "/reel10.mp4", poster: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80" },
  { src: "/reel11.mp4", poster: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80" },
  { src: "/reel12.mp4" },
  { src: "/reel 2.mp4" },
  { src: "/reel 3.mp4" },
  { src: "/reel 4.mp4" },
];






// ------------------- Reel Card (hover-to-play) -------------------
function ReelCard({ reel, index, onClick }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
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
        src={reel.src}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        preload="none"
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
  const [numCols, setNumCols] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setNumCols(2);
      else if (window.innerWidth < 1024) setNumCols(3);
      else setNumCols(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Split reels into dynamic columns
  const columns = Array.from({ length: numCols }, () => []);
  REELS.forEach((reel, i) => {
    columns[i % numCols].push({ reel, originalIndex: i });
  });

  // Alternating vertical offset
  const getOffset = (index) => {
    if (numCols === 2) return index === 1 ? "mt-12" : "mt-0";
    if (numCols === 3) return index === 1 ? "mt-12" : "mt-0";
    if (numCols === 4) return (index === 1 || index === 3) ? "mt-12" : "mt-0";
    return "mt-0";
  };

  return (
    <section className="py-20 md:py-32 bg-black text-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
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

        {/* Staggered grid for Desktop/Tablet, Horizontal scroll for Mobile */}
        {numCols > 2 ? (
          <div className="flex gap-4 md:gap-5 items-start">
            {columns.map((col, colIndex) => (
              <div
                key={colIndex}
                className={`flex-1 flex flex-col gap-4 md:gap-5 ${getOffset(colIndex)}`}
              >
                {col.map(({ reel, originalIndex }) => (
                  <ReelCard
                    key={originalIndex}
                    reel={reel}
                    index={originalIndex}
                    onClick={setSelectedReel}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6 scrollbar-hide">
            {REELS.map((reel, index) => (
              <div key={index} className="flex-shrink-0 w-[70vw] snap-center">
                <ReelCard
                  reel={reel}
                  index={index}
                  onClick={setSelectedReel}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedReel(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 28 }}
              className="relative max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedReel(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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