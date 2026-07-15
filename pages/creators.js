"use client";
import Head from "next/head";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";

// ------------------- Small icons -------------------
const InstaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M14 3h7v7"></path>
    <path d="M10 14L21 3"></path>
    <path d="M21 21H3V3"></path>
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

// ------------------- Scroll Reveal -------------------
function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0, transition: { delay, duration: 0.5 } } : {}}
    >
      {children}
    </motion.div>
  );
}

// ------------------- Safe Image (handles external) -------------------
function SafeImage({ src, alt, width, height, className = "" }) {
  const [error, setError] = useState(false);
  const isExternal = typeof src === "string" && (src.startsWith("http://") || src.startsWith("https://"));

  if (error || src === "-" || !src) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400 ${className}`} style={{ width, height }}>
        <div className="text-center">
          <div className="text-2xl mb-1">📷</div>
          <div className="text-xs">No Image</div>
        </div>
      </div>
    );
  }

  const safeSrc = src?.startsWith("/") ? src : `/${src}`;

  if (isExternal || src?.endsWith(".svg") || safeSrc?.endsWith(".svg")) {
    return <img src={isExternal ? src : safeSrc} alt={alt} width={width} height={height} className={className} onError={() => setError(true)} />;
  }

  return <Image src={safeSrc} alt={alt} width={width} height={height} className={className} onError={() => setError(true)} />;
}

// ------------------- Badge -------------------
function Badge({ children }) {
  return (
    <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-md px-2 py-0.5 text-xs font-medium mr-2 mb-2 inline-block">
      {children}
    </span>
  );
}

// ------------------- New Filter Components for Influencers -------------------
function FilterPill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active
        ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/25"
        : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
        }`}
    >
      {children}
    </button>
  );
}

function SearchFilter({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    </div>
  );
}

// ------------------- Sidebar Filter Section -------------------
function SidebarFilterSection({ id, title, options = [], isRange = false, selected = [], onToggleOption, onApplyRange }) {
  const [minVal, setMinVal] = useState("");
  const [maxVal, setMaxVal] = useState("");

  const applyRange = () => {
    onApplyRange && onApplyRange(minVal, maxVal);
  };

  return (
    <div className="mb-6">
      <h5 className="text-gray-300 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M22 3L2 3L10 12.46 10 19 14 21 14 12.46 22 3"></path></svg>
        {title}
        {selected.length > 0 && <span className="ml-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">{selected.length}</span>}
      </h5>

      {isRange ? (
        <div className="space-y-3 pl-1">
          <div className="flex gap-2">
            <input type="number" placeholder="Min" value={minVal} onChange={(e) => setMinVal(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg p-2 w-1/2 text-white outline-none focus:border-yellow-500 placeholder-gray-500 text-[13px]" />
            <input type="number" placeholder="Max" value={maxVal} onChange={(e) => setMaxVal(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg p-2 w-1/2 text-white outline-none focus:border-yellow-500 placeholder-gray-500 text-[13px]" />
          </div>
          <button onClick={applyRange} className="w-full bg-white/5 hover:bg-yellow-500 hover:text-black border border-white/10 text-gray-300 rounded-lg py-1.5 text-[12px] font-normal transition-all">Apply</button>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5 pl-1">
          {options.map(opt => {
            const active = selected.includes(opt);
            return (
              <button key={opt} onClick={() => onToggleOption(opt)} className={`flex items-center gap-3 text-left py-2 px-3 rounded-xl cursor-pointer transition-all duration-300 ${active ? "bg-yellow-500/10 text-yellow-400 font-medium border border-yellow-500/20" : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent"}`}>
                <div className={`w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center transition-colors shrink-0 ${active ? "bg-yellow-400 border-yellow-400" : "border-gray-500"}`}>
                  {active && <svg width="8" height="6" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>}
                </div>
                <div className="text-[13px] tracking-wide">{opt}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function InfluencerCard({ item, onClick, idx = 0 }) {
  const getInitials = (name) => name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (idx % 3) * 0.15, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative w-full h-[24rem] rounded-[1.5rem] p-2.5 flex flex-col border border-white/10 hover:border-white/20 transition-all shadow-2xl group overflow-hidden"
    >
      {/* Dynamic Colored Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[1.5rem]">
        {item.image && item.image !== "-" && (
          <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover blur-[40px] opacity-60 scale-125" />
        )}
        <div className="absolute inset-0 bg-[#141414]/70 backdrop-blur-3xl" />
      </div>

      <div className="relative z-10 h-[60%] w-full overflow-hidden rounded-xl bg-black">
        {item.image && item.image !== "-" ? (
          <SafeImage src={item.image} alt={item.name} width={600} height={800} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-2xl">
              {getInitials(item.name)}
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <div className="absolute top-2 right-2 z-10">
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-medium text-white">
            {item.contentStyle || "Lifestyle"}
          </span>
        </div>
      </div>

      <div className="relative z-10 h-[40%] px-1 py-1 flex flex-col justify-between font-sans">
        <div className="pt-1">
          <div className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-transparent text-[10px] font-semibold text-gray-300 tracking-wide">
              <span className="w-1 h-1 rounded-full bg-yellow-500"></span>
              {item.category || "Creator"}
            </span>
          </div>
          <h3 className="text-3xl font-serif font-bold text-white tracking-tight mb-1 line-clamp-1">{item.name}</h3>
          <p className="text-[14px] text-gray-400 font-semibold tracking-wide">{item.location || "India"}</p>
        </div>

        <div className="mt-2 pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {item.followers && item.followers !== "-" && (
              <a href={item.instagramLink || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white hover:text-yellow-400 transition-colors cursor-pointer z-20 relative">
                <InstaIcon /> <span className="font-bold text-[14px] tracking-tight">{item.followers}</span>
              </a>
            )}
            {item.youtubeSubscribers && (
              <a href={item.youtubeLink || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white hover:text-yellow-400 transition-colors cursor-pointer z-20 relative">
                <YoutubeIcon /> <span className="font-bold text-[14px] tracking-tight">{item.youtubeSubscribers}</span>
              </a>
            )}
          </div>
          {item.engagement && item.engagement !== "-" && (
            <div className="flex items-center gap-1.5 text-white">
              <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest">Eng:</span> <span className="font-bold text-[14px] tracking-tight text-white">{item.engagement}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function MagazineCard({ item, onClick, idx = 0 }) {
  const fmt = (n) => {
    if (!n && n !== 0) return "-";
    if (typeof n === "string") return n;
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(0) + "K";
    return n;
  };
  const starting = item.minBudget || item.startingPrice || 25000;

  return (
    <motion.a
      href={item.websiteLink || "#"}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (idx % 3) * 0.15, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative w-full h-[24rem] rounded-[1.5rem] p-2.5 flex flex-col border border-white/10 hover:border-white/20 transition-all shadow-2xl group overflow-hidden cursor-pointer block"
    >
      {/* Dynamic Colored Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[1.5rem]">
        {item.image && item.image !== "-" && (
          <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover blur-[40px] opacity-60 scale-125" />
        )}
        <div className="absolute inset-0 bg-[#141414]/70 backdrop-blur-3xl" />
      </div>

      <div className="relative z-10 h-[60%] w-full overflow-hidden rounded-xl bg-black">
        <SafeImage src={item.image} alt={item.name} width={700} height={800} className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <div className="absolute top-2 right-2 z-10">
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-medium text-white">
            {item.genre || "Magazine"}
          </span>
        </div>
      </div>

      <div className="relative z-10 h-[40%] px-1 py-1 flex flex-col justify-between font-sans">
        <div className="pt-1">
          <div className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-transparent text-[10px] font-semibold text-gray-300 tracking-wide">
              <span className="w-1 h-1 rounded-full bg-yellow-500"></span>
              Magazine
            </span>
          </div>
          <h3 className="text-3xl font-serif font-bold text-white tracking-tight mb-1 line-clamp-1">{item.name}</h3>
          <p className="text-[14px] text-gray-400 font-semibold tracking-wide">{item.frequency || "Monthly"}</p>
        </div>

        <div className="mt-2 pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white">
            <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest">Readers:</span> <span className="font-bold text-[14px] tracking-tight">{fmt(item.readership)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white">
            <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest">Starting:</span> <span className="font-bold text-[14px] tracking-tight text-white">₹{fmt(Number(starting))}</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function NewspaperCard({ item, onClick, idx = 0 }) {
  const fmt = (v) => {
    if (!v && v !== 0) return "-";
    if (typeof v === "string") return v;
    if (v >= 1000000) return (v / 1000000).toFixed(1) + "M";
    if (v >= 1000) return (v / 1000).toFixed(0) + "K";
    return v;
  };
  return (
    <motion.a
      href={item.websiteLink || "#"}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (idx % 3) * 0.15, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative w-full h-[24rem] rounded-[1.5rem] p-2.5 flex flex-col border border-white/10 hover:border-white/20 transition-all shadow-2xl group overflow-hidden cursor-pointer block"
    >
      {/* Dynamic Colored Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[1.5rem]">
        {item.image && item.image !== "-" && (
          <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover blur-[40px] opacity-60 scale-125" />
        )}
        <div className="absolute inset-0 bg-[#141414]/70 backdrop-blur-3xl" />
      </div>

      <div className="relative z-10 h-[60%] w-full overflow-hidden rounded-xl bg-black">
        <SafeImage src={item.image} alt={item.name} width={700} height={800} className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <div className="absolute top-2 right-2 z-10">
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-medium text-white">
            {item.genre || "News"}
          </span>
        </div>
      </div>

      <div className="relative z-10 h-[40%] px-1 py-1 flex flex-col justify-between font-sans">
        <div className="pt-1">
          <div className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-transparent text-[10px] font-semibold text-gray-300 tracking-wide">
              <span className="w-1 h-1 rounded-full bg-yellow-500"></span>
              Newspaper
            </span>
          </div>
          <h3 className="text-[26px] font-serif font-bold text-white tracking-tight mb-1 line-clamp-1">{item.name}</h3>
          <p className="text-[14px] text-gray-400 font-semibold tracking-wide">{item.language || "English"}</p>
        </div>

        <div className="mt-2 pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white">
            <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest">Circ:</span> <span className="font-bold text-[14px] tracking-tight">{fmt(item.circulation || "-")}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white">
            <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest">Rate:</span> <span className="font-bold text-[14px] tracking-tight text-white">{item.adRate || "-"}</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function DigitalCard({ item, onClick, idx = 0 }) {
  const shortReach = item.reach ? item.reach.split(" ")[0] : "-";
  const shortModel = item.adRate === "Pay-Per-Click" ? "PPC" :
    item.adRate === "Pay-Per-View" ? "PPV" :
      item.adRate || item.pricingModel || "-";

  return (
    <motion.a
      href={item.websiteLink || "#"}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (idx % 3) * 0.15, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative w-full h-[24rem] rounded-[1.5rem] p-2.5 flex flex-col border border-white/10 hover:border-white/20 transition-all shadow-2xl group overflow-hidden cursor-pointer block"
    >
      {/* Dynamic Colored Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[1.5rem]">
        {item.image && item.image !== "-" && (
          <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover blur-[40px] opacity-60 scale-125" />
        )}
        <div className="absolute inset-0 bg-[#141414]/70 backdrop-blur-3xl" />
      </div>

      <div className="relative z-10 h-[60%] w-full overflow-hidden rounded-xl bg-black">
        <SafeImage src={item.image} alt={item.name} width={700} height={800} className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <div className="absolute top-2 right-2 z-10">
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-medium text-white">
            {item.platformType || "Digital"}
          </span>
        </div>
      </div>

      <div className="relative z-10 h-[40%] px-1 py-1 flex flex-col justify-between font-sans">
        <div className="pt-1">
          <div className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-transparent text-[10px] font-semibold text-gray-300 tracking-wide">
              <span className="w-1 h-1 rounded-full bg-yellow-500"></span>
              Platform
            </span>
          </div>
          <h3 className="text-[26px] font-serif font-bold text-white tracking-tight mb-1 line-clamp-1">{item.name}</h3>
          <p className="text-[14px] text-gray-400 font-semibold tracking-wide">{item.formats?.[0] || "Ads"}</p>
        </div>

        <div className="mt-2 pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white">
            <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest">Reach:</span> <span className="font-bold text-[14px] tracking-tight">{shortReach}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white">
            <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest">Model:</span> <span className="font-bold text-[14px] tracking-tight text-white">{shortModel}</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

// ------------------- Modal -------------------
function InfoModal({ open, item, type, onClose }) {
  if (!open || !item) return null;

  const format = (n) => {
    if (!n && n !== 0) return "-";
    if (typeof n === "string") return n;
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(0) + "K";
    return String(n);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 bg-[#0a0a0c] overflow-y-auto flex items-center justify-center"
      >
        <button onClick={onClose} className="fixed top-6 right-6 md:top-10 md:right-10 z-[60] bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-4 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>
        </button>

        <div className="max-w-7xl w-full mx-auto p-6 md:p-12 flex flex-col md:flex-row gap-12 lg:gap-24 items-center justify-center min-h-screen py-24">

          {/* Image */}
          <div className="w-full md:w-5/12 flex justify-center">
            <SafeImage src={item.image} alt={item.name} width={600} height={800} className="rounded-[2.5rem] object-cover shadow-[0_0_50px_rgba(250,204,21,0.15)] w-full max-w-md aspect-[4/5]" />
          </div>

          {/* Details */}
          <div className="w-full md:w-7/12 text-white">
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tighter"
            >
              {item.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-yellow-400 font-medium mb-12 tracking-wide"
            >
              {type === "influencer" && `${item.category || 'Influencer'} • ${item.location || 'Location not specified'}`}
              {type === "magazine" && `${item.genre} • ${item.frequency}`}
              {type === "newspaper" && `${item.genre} • ${item.language}`}
              {type === "digital" && (item.platformType || item.formats?.join(", "))}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-y-12 gap-x-8 text-sm"
            >
              {type === "influencer" && (
                <>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">{format(item.followers)}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Followers</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">{item.engagement || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Engagement</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2 capitalize">{item.gender || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Gender</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">{item.location || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Location</div>
                  </div>
                  <div className="col-span-full mt-6">
                    <a href={item.instagramLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                      <InstaIcon /> View on Instagram
                    </a>
                  </div>
                </>
              )}

              {type === "magazine" && (
                <>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">{format(item.readership)}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Readership</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">{item.adRate || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Avg. Ad Rate</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">₹{Number(item.minBudget || item.startingPrice || 25000).toLocaleString()}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Starting Price</div>
                  </div>
                  <div className="col-span-full mt-6">
                    <a href={item.websiteLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                      Visit Website <ExternalIcon />
                    </a>
                  </div>
                </>
              )}

              {type === "newspaper" && (
                <>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">{format(item.circulation || "-")}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Daily Circulation</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">{format(item.readership)}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Readership</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">{item.adRate || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Avg. Ad Rate</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">₹{Number(item.minBudget || item.startingPrice || 25000).toLocaleString()}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Starting Price</div>
                  </div>
                  <div className="col-span-full mt-6">
                    <a href={item.websiteLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                      Visit Website <ExternalIcon />
                    </a>
                  </div>
                </>
              )}

              {type === "digital" && (
                <>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">{item.reach || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Potential Audience</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">{item.adRate || item.pricingModel || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Pricing Model</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">₹{Number(item.minBudget || 25000).toLocaleString()}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Starting Budget</div>
                  </div>
                  <div className="col-span-full mt-6">
                    <a href={item.websiteLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                      Explore Platform <ExternalIcon />
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ------------------- Creators Hero (Monk-E Exact Replica) -------------------
function CreatorsHero() {
  const [hoveredCreator, setHoveredCreator] = useState(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  const influencers = [
    { name: "Vogue India", image: "/Creators/Vogue India.png" },
    { name: "Filmfare", image: "/Creators/filmfare.png" },
    { name: "Business Today", image: "/Creators/business today.png" },
    { name: "Femina", image: "/Creators/femina.png" },
    { name: "Digit", image: "/Creators/digit.png" },
    { name: "Outlook Traveller", image: "/Creators/Outlook Traveller.png" },
    { name: "Forbes India", image: "/Creators/Forbes India.png" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % influencers.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [influencers.length]);

  return (
    <div className="w-full bg-black text-white overflow-hidden relative h-screen min-h-[600px] flex items-center justify-center pt-16">

      {/* Static Yellow Glows */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] md:w-[70vh] md:h-[70vh] bg-yellow-400 rounded-full blur-[120px] md:blur-[150px] mix-blend-screen opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vh] h-[60vh] md:w-[80vh] md:h-[80vh] bg-yellow-500 rounded-full blur-[130px] md:blur-[160px] mix-blend-screen opacity-30" />
      </div>

      {/* Top Left Typography */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute top-24 left-6 md:top-32 md:left-12 z-30 pointer-events-none"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans tracking-tight leading-[1.1] text-white drop-shadow-lg">
          <span className="font-light">Amplify</span><br />
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">Your Reach.</span>
        </h1>
      </motion.div>

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 flex items-center justify-center relative z-20 h-full">

        {/* Desktop 3D Cascade */}
        <div className="hidden md:flex w-full relative h-full justify-center items-center" style={{ perspective: "1500px" }}>
          {influencers.map((creator, i) => {
            const offset = i;

            // Tilt inwards slightly to form a diagonal from bottom-left to top-right
            const stepX = 80;
            const stepY = -65;

            // Mathematically center the entire cascade block
            const maxOffset = influencers.length - 1;
            const totalWidthOffset = maxOffset * stepX;
            const totalHeightOffset = maxOffset * stepY;

            // Shift starting point back by half the total offset so the center of the cascade is at 0,0
            const startX = -(totalWidthOffset / 2);
            const startY = -(totalHeightOffset / 2);

            // Shift the entire diagonal slightly to the right so it ends under "Contact Us"
            const rightShift = 100;
            const upShift = -80; // Shift up to balance the vertical space

            const translateX = startX + (offset * stepX) + rightShift;
            const translateY = startY + (offset * stepY) + upShift;

            const zIndex = 20 - offset;
            const brightness = 1 - (offset * 0.12);

            return (
              <motion.div
                key={creator.name + i}
                onMouseEnter={() => setHoveredCreator(creator)}
                onMouseLeave={() => setHoveredCreator(null)}
                className="absolute w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[240px] lg:h-[240px] rounded-lg md:rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] overflow-hidden border border-white/60 cursor-pointer group"
                initial={{
                  x: `calc(-50% + ${translateX}px)`,
                  y: `calc(-50% + ${translateY}px)`,
                  rotateY: -25,
                  filter: `brightness(${brightness})`,
                  zIndex: zIndex
                }}
                whileHover={{
                  x: `calc(-50% + ${translateX + 50}px)`,
                  y: `calc(-50% + ${translateY}px)`,
                  rotateY: -25,
                  filter: "brightness(1.15)",
                  transition: { type: "spring", stiffness: 300, damping: 25 }
                }}
                style={{
                  top: '50%',
                  left: '50%',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/Creators/Vogue India.png' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Horizontal Auto-scroll */}
        <div className="md:hidden w-full overflow-hidden mt-20 flex flex-col justify-center items-center relative h-[450px]">
          <div className="relative w-full h-[300px] flex justify-center items-center">
            {influencers.map((creator, i) => {
              const total = influencers.length;
              let offset = i - mobileIndex;
              if (offset > Math.floor(total / 2)) offset -= total;
              if (offset < -Math.floor(total / 2)) offset += total;

              const isActive = offset === 0;
              const isWrapping = Math.abs(offset) > 1.5;
              const spacing = 210;

              return (
                <div 
                  key={i} 
                  className="absolute transition-all duration-500 ease-in-out rounded-2xl overflow-hidden shadow-lg border"
                  style={{
                    width: '180px',
                    height: '180px',
                    transform: `translateX(${offset * spacing}px) scale(${isActive ? 1.35 : 0.85})`,
                    zIndex: isActive ? 10 : 0,
                    opacity: isWrapping ? 0 : (isActive ? 1 : 0.5),
                    borderColor: isActive ? '#facc15' : 'rgba(255,255,255,0.2)',
                    boxShadow: isActive ? '0 0 30px rgba(250,204,21,0.4)' : 'none'
                  }}
                >
                  <img src={creator.image} alt={creator.name} className="w-full h-full object-cover object-top" />
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center text-white h-16 flex flex-col justify-center">
             <p className="text-3xl font-bold tracking-tight text-yellow-400 transition-opacity duration-500">{influencers[mobileIndex].name}</p>
             <p className="text-[12px] uppercase tracking-widest text-gray-500 mt-1">Magazine</p>
          </div>
        </div>

      </div>

      {/* Separate Hover Popup Card (Desktop only) */}
      <AnimatePresence>
        {hoveredCreator && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, rotateZ: 5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateZ: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.9, rotateZ: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="hidden md:block absolute bottom-10 right-24 md:bottom-16 md:right-32 w-[180px] h-[240px] md:w-[240px] md:h-[320px] bg-white rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden z-[100] pointer-events-none"
          >
            <img
              src={hoveredCreator.image}
              alt={hoveredCreator.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => { e.target.onerror = null; e.target.src = '/Creators/Vogue India.png' }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-3 md:p-4 border-t border-gray-100 flex flex-col items-start">
              <span className="text-xs md:text-sm font-bold text-black uppercase tracking-widest leading-tight">{hoveredCreator.name}</span>
              <span className="text-[9px] md:text-[10px] font-medium text-gray-500 uppercase mt-1">Magazine</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------- Main Component -------------------
export default function CreatorsSection() {
  const [filter, setFilter] = useState("influencer");
  const [selected, setSelected] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [activeFilters, setActiveFilters] = useState({}); // { key: [values] or ["min-max"] }
  const [openDropdownKey, setOpenDropdownKey] = useState(null); // Tracks which dropdown is open

  // NEW STATE FOR INFLUENCER FILTERS
  const [influencerSearch, setInfluencerSearch] = useState("");
  const [influencerGenderFilter, setInfluencerGenderFilter] = useState([]);
  const [influencerLocationFilter, setInfluencerLocationFilter] = useState([]);

  const [shuffledData, setShuffledData] = useState({
    influencer: influencersData,
    magazine: magazinesData,
    newspaper: newspapersData,
    digital: digitalPlatformsData,
  });

  useEffect(() => {
    const customSort = (data, topNames = []) => {
      // First, shuffle the data
      const shuffled = [...data].sort(() => Math.random() - 0.5);

      const topCreators = [];
      const withImage = [];
      const withoutImage = [];

      shuffled.forEach(item => {
        const isTopCreator = topNames.some(name => item.name.toLowerCase().includes(name.toLowerCase()));
        if (isTopCreator) {
          topCreators.push(item);
        } else if (item.image && item.image !== "-") {
          withImage.push(item);
        } else {
          withoutImage.push(item);
        }
      });

      // Ensure topCreators strictly follow the order defined in topNames
      topCreators.sort((a, b) => {
        const idxA = topNames.findIndex(name => a.name.toLowerCase().includes(name.toLowerCase()));
        const idxB = topNames.findIndex(name => b.name.toLowerCase().includes(name.toLowerCase()));
        return idxA - idxB;
      });

      return [...topCreators, ...withImage, ...withoutImage];
    };

    setShuffledData({
      influencer: customSort(influencersData, ["faimin malik", "aishwarya lad", "samrin khan"]),
      magazine: customSort(magazinesData),
      newspaper: customSort(newspapersData),
      digital: customSort(digitalPlatformsData),
    });
  }, []);

  const sections = [
    { label: "Influencers", key: "influencer", data: shuffledData.influencer },
    { label: "Magazines", key: "magazine", data: shuffledData.magazine },
    { label: "Newspapers", key: "newspaper", data: shuffledData.newspaper },
    { label: "Digital Platforms", key: "digital", data: shuffledData.digital },
  ];

  const filterMenus = {
    influencer: [
      { key: "category", title: "Category", options: ["Health & Fitness", "Real Estate", "Education", "Makeup & Nailart", "Jewellery", "Food & Restaurant"] },
      { key: "gender", title: "Gender", options: ["Male", "Female", "Other"] },
      { key: "followers", title: "Followers Range", options: ["Micro (1K-100K)", "Macro (100K-1M)", "Mega (1M+)"] },
    ],
    magazine: [
      { key: "genre", title: "Genre", options: ["Fashion", "Business", "Lifestyle", "Technology", "Travel"] },
      { key: "frequency", title: "Frequency", options: ["Weekly", "Monthly", "Quarterly"] },
      { key: "language", title: "Language", options: ["English", "Hindi"] },
    ],
    newspaper: [
      { key: "genre", title: "Genre", options: ["National", "Regional", "Business", "Local", "Tabloid"] },
      { key: "language", title: "Language", options: ["English", "Hindi", "Marathi"] },
      { key: "circulation", title: "Circulation Range", options: ["Under 50,000", "50,000 - 500,000", "500,000+"] },
    ],
    digital: [
      { key: "platformType", title: "Type", options: ["Social Media", "Video", "Search", "Influencer", "Display"] },
      { key: "format", title: "Format", options: ["Video", "Image", "Carousel", "Reels", "Stories"] },
    ],
  };

  const toggleOption = (filterKey, value) => {
    setActiveFilters(prev => {
      const list = prev[filterKey] || [];
      return {
        ...prev,
        [filterKey]: list.includes(value) ? list.filter(v => v !== value) : [...list, value]
      };
    });
  };

  const applyRange = (filterKey, min, max) => {
    if (!min && !max) return;
    setActiveFilters(prev => ({ ...prev, [filterKey]: [`${min || 0}-${max || 0}`] }));
  };

  const clearFilters = () => {
    setActiveFilters({});
    setOpenDropdownKey(null);
  };

  // Unified filtering logic for all sections:
  function passesFilters(item, sectionKey) {
    const active = activeFilters;

    if (sectionKey === "influencer") {
      if (active.category && active.category.length) {
        const ok = active.category.some(cat =>
          item.contentStyle?.toLowerCase().includes(cat.toLowerCase()) ||
          item.category?.toLowerCase().includes(cat.toLowerCase())
        );
        if (!ok) return false;
      }

      if (active.gender && active.gender.length) {
        const ok = active.gender.some(g => g.toLowerCase() === item.gender?.toLowerCase());
        if (!ok) return false;
      }

      if (active.followers && active.followers.length) {
        let numStr = item.followers?.toUpperCase() || "0";
        let val = parseFloat(numStr);
        if (numStr.includes("K")) val *= 1000;
        if (numStr.includes("M")) val *= 1000000;

        const ok = active.followers.some(fRange => {
          if (fRange === "Micro (1K-100K)") return val >= 1000 && val <= 100000;
          if (fRange === "Macro (100K-1M)") return val > 100000 && val <= 1000000;
          if (fRange === "Mega (1M+)") return val > 1000000;
          return false;
        });
        if (!ok) return false;
      }
      return true;
    }

    if (sectionKey === "magazine") {
      if (active.genre && active.genre.length && !active.genre.includes(item.genre)) return false;
      if (active.frequency && active.frequency.length && !active.frequency.includes(item.frequency)) return false;
      if (active.language && active.language.length && !active.language.includes(item.language)) return false;
      if (active.budget && active.budget.length) {
        const v = active.budget[0].split("-").map(Number); const min = v[0], max = v[1];
        const itemBudget = item.minBudget || item.startingPrice || 25000;
        if (min > 0 && itemBudget < min) return false;
        if (max > 0 && itemBudget > max) return false;
      }
    }

    if (sectionKey === "newspaper") {
      if (active.genre && active.genre.length && !active.genre.includes(item.genre)) return false;
      if (active.language && active.language.length && !active.language.includes(item.language)) return false;
      if (active.circulation && active.circulation.length) {
        const val = item.circulation || 0;
        const ok = active.circulation.some(c => {
          if (c === "Under 50,000") return val < 50000;
          if (c === "50,000 - 500,000") return val >= 50000 && val <= 500000;
          if (c === "500,000+") return val > 500000;
          return false;
        });
        if (!ok) return false;
      }
      if (active.budget && active.budget.length) {
        const v = active.budget[0].split("-").map(Number); const min = v[0], max = v[1];
        const itemBudget = item.minBudget || item.startingPrice || 25000;
        if (min > 0 && itemBudget < min) return false;
        if (max > 0 && itemBudget > max) return false;
      }
    }

    if (sectionKey === "digital") {
      if (active.platformType && active.platformType.length) {
        if (!active.platformType.includes(item.name) && !active.platformType.includes(item.platformType)) {
          return false;
        }
      }
      if (active.format && active.format.length) {
        const ok = item.formats?.some(f => active.format.includes(f));
        if (!ok) return false;
      }
      if (active.budget && active.budget.length) {
        const v = active.budget[0].split("-").map(Number); const min = v[0], max = v[1];
        const itemBudget = item.minBudget || item.startingPrice || 25000;
        if (min > 0 && itemBudget < min) return false;
        if (max > 0 && itemBudget > max) return false;
      }
    }

    return true;
  }

  // Render cards per section
  const cardsForSection = (section) => {
    const dataToUse = section.data.filter(item => passesFilters(item, section.key));

    if (dataToUse.length === 0) {
      return (
        <div className="col-span-full text-center py-16 w-full">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
          <p className="text-gray-400 mb-6">
            Try adjusting your filters to see more results.
          </p>
          <button
            onClick={clearFilters}
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-all duration-300 inline-block"
          >
            Clear All Filters
          </button>
        </div>
      );
    }

    return dataToUse.map((item, idx) => {
      if (section.key === "influencer") return <InfluencerCard key={item.id} item={item} idx={idx} onClick={(i, t) => { setSelected(i); setSelectedType(t); }} />;
      if (section.key === "magazine") return <MagazineCard key={item.id} item={item} idx={idx} onClick={(i, t) => { setSelected(i); setSelectedType(t); }} />;
      if (section.key === "newspaper") return <NewspaperCard key={item.id} item={item} idx={idx} onClick={(i, t) => { setSelected(i); setSelectedType(t); }} />;
      if (section.key === "digital") return <DigitalCard key={item.id} item={item} idx={idx} onClick={(i, t) => { setSelected(i); setSelectedType(t); }} />;
      return null;
    });
  };

  const hasActiveOtherFilters = Object.keys(activeFilters).length > 0;
  const showClearFilters = hasActiveOtherFilters;

  return (<>
    <Head>
      <title key="title">Creators Network | Bizleap</title>
      <meta name="keywords" content="creators network Nagpur, brand placements, influencer marketing Nagpur" />
      <meta
        name="description"
        content="Discover Bizleap's creators network — designers, developers, and digital experts collaborating to deliver impactful and innovative brand solutions."
      />
      <link rel="canonical" href="https://bizleap.in/creators" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://bizleap.in/creators#webpage",
            "url": "https://bizleap.in/creators",
            "name": "Creators Network | Bizleap",
            "description": "Discover Bizleap's curated network of social media influencers, print magazines, newspapers, and digital platforms for impactful brand partnerships and media placements.",
            "isPartOf": { "@id": "https://bizleap.in/#website" },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bizleap.in/" },
                { "@type": "ListItem", "position": 2, "name": "Creators Network", "item": "https://bizleap.in/creators" }
              ]
            }
          })
        }}
      />
    </Head>
    <section className="bg-black text-white" id="creators">
      <CreatorsHero />

      {/* Information Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-10 flex flex-col items-center text-center">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-sans font-light mb-6 leading-tight text-white drop-shadow-md">
            Connecting Brands with <br />
            <span className="font-bold text-yellow-400">Authentic Voices.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl font-light mx-auto">
            Bizleap's Creators Network is an exclusive ecosystem of premium influencers, renowned magazines, trusted newspapers, and leading digital platforms. We bridge the gap between visionary brands and influential storytellers to create high-impact, authentic media placements that drive real engagement.
          </p>
        </div>

        {/* Horizontal Category Tabs */}
        <div className="mt-16 flex flex-col items-center w-full">
          <div className="flex items-center justify-center gap-6 mb-8 w-full max-w-2xl">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
            <h3 className="text-gray-300 text-xs md:text-sm font-medium uppercase tracking-[0.3em]">Categories</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/20"></div>
          </div>
          <div className="flex flex-wrap items-center justify-center p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => {
                  setFilter(s.key);
                  setActiveFilters({});
                  setOpenDropdownKey(null);
                }}
                className={`relative px-6 sm:px-8 py-2.5 rounded-full text-[13px] md:text-sm tracking-wide transition-all duration-500 ease-out ${filter === s.key
                  ? "text-black bg-yellow-400 font-semibold shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                  : "text-gray-400 font-light hover:text-white hover:bg-white/10"
                  }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-20">

        {/* MAIN LAYOUT WITH CONDITIONAL SIDEBAR */}
        <div className="flex flex-col lg:flex-row gap-8 w-full relative z-40">

          {/* Sidebar (Filters) - Only render if category has filters */}
          {filterMenus[filter].length > 0 && (
            <div className="w-full lg:w-[250px] flex flex-col shrink-0 lg:sticky lg:top-28 h-fit z-10">

              {/* Filters (Vertical List) */}
              <div className="bg-[#111]/90 backdrop-blur-3xl border border-white/10 p-5 md:p-6 rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.9)] flex flex-col gap-2 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-3 mb-6 pl-1 border-b border-white/10 pb-4 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-yellow-400"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  <h4 className="text-white text-sm md:text-base font-semibold uppercase tracking-[0.25em]">Filters</h4>
                </div>

                {filterMenus[filter].map(menu => (
                  <SidebarFilterSection
                    key={menu.key}
                    id={menu.key}
                    title={menu.title}
                    options={menu.options}
                    isRange={menu.isRange}
                    selected={activeFilters[menu.key] || []}
                    onToggleOption={(opt) => toggleOption(menu.key, opt)}
                    onApplyRange={(min, max) => applyRange(menu.key, min, max)}
                  />
                ))}

                {showClearFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-2 w-full px-5 py-3 rounded-xl bg-red-500/10 text-red-400 text-[13px] font-semibold hover:bg-red-500/20 border border-red-500/20 transition-all flex items-center justify-center gap-2 tracking-wide"
                  >
                    ✕ Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Cards Grid (3 columns max on desktop) */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {cardsForSection(sections.find(s => s.key === filter))}
            </div>
          </div>
        </div>

      </div>

      {/* Modal */}
      <InfoModal open={!!selected} item={selected} type={selectedType} onClose={() => setSelected(null)} />
    </section>
  </>
  );
}

/* ------------------- YOUR UPDATED INFLUENCER DATA ------------------- */
const influencersData = [
  { id: 3, name: "Santoshi Telgu", location: "Pune", instagramLink: "https://www.instagram.com/trippydimple", gender: "female", contentStyle: "Food", followers: "39K", engagement: "0.54%", image: "/Creators/SantoshiTelgu.jpg" },
  { id: 1, name: "Sneha Roy", location: "Pune", instagramLink: "https://www.instagram.com/lifestyle_with_shona/profilecard/?igsh=NnVidmoxNHRuNGlr", gender: "female", contentStyle: "Lifestyle", followers: "43K", engagement: "0.92%", image: "/Creators/SnehaRoy.jpg" },
  { id: 5, name: "Faimin Malik", location: "Pune Hinjewadi", instagramLink: "https://instagram.com/faimin_malik", gender: "female", contentStyle: "Lifestyle", followers: "112K", engagement: "1.45%", image: "/Creators/FaiminMalik.jpg" },
  { id: 2, name: "Nidhi Sethi", location: "Pune", instagramLink: "https://Instagram.com/sethinidhi01", gender: "female", contentStyle: "Fashion", followers: "32K", engagement: "3.42%", image: "/Creators/NidhiSethi.jpg" },
  { id: 4, name: "Arpita Chandekar", location: "Pune", instagramLink: "https://www.instagram.com/chandekararpita/profilecard/?igsh=MXMxcWxwZzNjdXB2dA==", gender: "female", contentStyle: "Beauty", followers: "53K", engagement: "0.95%", image: "/Creators/ArpitaChandekar.jpg" },
  { id: 6, name: "Alisha Ranawat", location: "Swargate", instagramLink: "https://www.instagram.com/alisharanawat?", gender: "female", contentStyle: "Host", followers: "60K", engagement: "0.17%", image: "/Creators/AlishaRanawat.jpg" },
  { id: 7, name: "Usha", location: "Pune", instagramLink: "https://instagram.com/dhruvaautade?igshid=YmMyMTA2M2Y=", gender: "female", contentStyle: "Lifestyle", followers: "13K", engagement: "0.97%", image: "Creators/Usha.jpg" },
  { id: 8, name: "Poonam P", location: "Pune", instagramLink: "https://www.instagram.com/p.o.o.n.a.m_p", gender: "female", contentStyle: "Beauty", followers: "24K", engagement: "0.13%", image: "Creators/PoonamP.jpg" },
  { id: 9, name: "Apurva Pardeshi", location: "Pune", instagramLink: "https://www.instagram.com/apurwaah?igsh=b2J2bzFuZGhieWc4&utm_source=qr", gender: "female", contentStyle: "Fashion", followers: "40K", engagement: "2.25%", image: "Creators/ApurvaPardeshi.jpg" },
  { id: 10, name: "Ketaki Sogavkar", location: "Pune", instagramLink: "https://instagram.com/happysoul_ketaki?igshid=ZDc4ODBmNjlmNQ==", gender: "female", contentStyle: "Lifestyle", followers: "13K", engagement: "2.67%", image: "Creators/KetakiSogavkar.jpg" },
  { id: 11, name: "Sudha Jain", location: "Pune", instagramLink: "https://www.instagram.com/thecrazy_explorer", gender: "female", contentStyle: "Lifestyle", followers: "43K", engagement: "0.07%", image: "Creators/SudhaJain.jpg" },
  { id: 12, name: "Reetu Agrawal", location: "Hadapsar", instagramLink: "https://www.instagram.com/thepunemother/profilecard/?igsh=dXoxczJqaGI3cGh6", gender: "female", contentStyle: "Lifestyle", followers: "42K", engagement: "0.8%", image: "Creators/ReetuAgrawal.jpg" },
  { id: 13, name: "Shakshi Dung", location: "Pune", instagramLink: "https://www.instagram.com/tales_of_yuvi/profilecard/?igsh=MXNyNDVyaGphamM5YQ==", gender: "female", contentStyle: "Lifestyle", followers: "13K", engagement: "13.45%", image: "Creators/SakshiDung.jpg" },
  { id: 14, name: "Vatsala Sharma", location: "Pune Baner", instagramLink: "https://www.instagram.com/theladywholeads/profilecard/?igsh=YTV0dnRudjBmdjlr", gender: "female", contentStyle: "Lifestyle", followers: "76K", engagement: "1.59%", image: "Creators/VatsalaSharma.jpg" },
  { id: 15, name: "Aishwarya Lad", location: "Pune", instagramLink: "https://www.instagram.com/aishwarya_1506/profilecard/?igsh=MjhpZTkxbGMxcTZt", gender: "female", contentStyle: "Lifestyle", followers: "45K", engagement: "2.55%", image: "Creators/AishwaryaLad.jpg" },
  { id: 16, name: "Sonam Sharma", location: "Magarpatta", instagramLink: "https://instagram.com/styleupwithsonam", gender: "female", contentStyle: "Fashion", followers: "56K", engagement: "5.3%", image: "Creators/SonamSharma.jpg" },
  { id: 17, name: "Samrin Khan", location: "Mumbai", instagramLink: "https://www.instagram.com/samrinkhanofficial", gender: "female", contentStyle: "Fashion", followers: "26K", engagement: "0.59%", image: "Creators/SamrinKhan.jpg" },
  { id: 18, name: "Bhagyashree", location: "Pune", instagramLink: "https://www.instagram.com/worldofbhagyashri/profilecard/?igsh=MWE2Z3Aweml4NWthNw==", gender: "female", contentStyle: "Food", followers: "12K", engagement: "0.71%", image: "Creators/Sania.jpg" },
  { id: 19, name: "Sania", location: "Pune", instagramLink: "https://www.instagram.com/glowithsaanu/profilecard/?igsh=MWtkZmY0ZXRhZDYzdw==", gender: "female", contentStyle: "Beauty", followers: "66K", engagement: "0.56%", image: "Creators/Sania.jpg" },
  { id: 20, name: "Payal Mehta", location: "Pune", instagramLink: "https://www.instagram.com/pylmehta?igsh=MWwwY2liM3NxOW55Ng==", gender: "female", contentStyle: "Fashion", followers: "20K", engagement: "0.39%", image: "Creators/PayalMehta.jpg" },
  { id: 21, name: "Priya Rajput", location: "Pune", instagramLink: "https://www.instagram.com/__foodbyprriyaa__/profilecard/?igsh=a3V1ZWIwejBqdXpk", gender: "female", contentStyle: "Food", followers: "3K", engagement: "33.4%", image: "Creators/PriyaRajput.jpg" },
  { id: 22, name: "Shweta Godse", location: "Pune", instagramLink: "https://www.instagram.com/ta_ta_bish?igsh=djZocjVsaDF2aW93", gender: "female", contentStyle: "-", followers: "14K", engagement: "10.58%", image: "-" },
  { id: 23, name: "Mugdha Karandikar", location: "Pune", instagramLink: "https://www.instagram.com/mugdhaspeaks?igsh=aTh1ZnZnYmRhaTB3&utm_source=qr", gender: "female", contentStyle: "Food", followers: "64K", engagement: "1.69%", image: "-" },
  { id: 24, name: "Vaishnavi Sakpal", location: "Raviwar Peth", instagramLink: "https://www.instagram.com/vaishnavi_991/profilecard/?igsh=MTA5d3g5bWhtdGxraw==", gender: "female", contentStyle: "Lifestyle", followers: "11K", engagement: "2.3%", image: "-" },
  { id: 25, name: "Madhu", location: "East Delhi", instagramLink: "https://www.instagram.com/minniemadhu_?igsh=ajB2dW9zb2dzeWFh", gender: "female", contentStyle: "Lifestyle", followers: "5K", engagement: "13.69%", image: "-" },
  { id: 26, name: "Akshata Lokhande", location: "Pune", instagramLink: "https://www.instagram.com/akshataaa.1/profilecard/?igsh=MXcyMHluNW9lY2hvbw==", gender: "female", contentStyle: "Fashion", followers: "55K", engagement: "1.88%", image: "-" },
  { id: 27, name: "Pragya Kalapad", location: "Gurugram, Delhi", instagramLink: "https://www.instagram.com/prxgya_404/profilecard", gender: "female", contentStyle: "Lifestyle", followers: "11K", engagement: "7.41%", image: "-" },
  { id: 28, name: "Mayuri Navhate", location: "Pune", instagramLink: "https://www.instagram.com/mayurinavhate?igsh=djljdHh3eGsxZ3Vv", gender: "female", contentStyle: "-", followers: "10K", engagement: "1.69%", image: "-" },
  { id: 29, name: "Anmol Milaney", location: "Cloud 9, NIBM", instagramLink: "https://www.instagram.com/anmol_milaney?igsh=dm9qenJtdDBheGtx&utm_source=qr", gender: "female", contentStyle: "Food & Lifestyle", followers: "27K", engagement: "1.48%", image: "-" },
  { id: 30, name: "Daljeet Kaur", location: "Hadapsar", instagramLink: "https://www.instagram.com/nehadkaur?igsh=MWN2eWw0dzJ5a3Aydg==", gender: "female", contentStyle: "Makeup", followers: "12K", engagement: "2.93%", image: "-" },
  { id: 31, name: "Nikita Sohoni", location: "Pune", instagramLink: "https://www.instagram.com/sangriamulgi/profilecard/?igsh=MW5iMXVtcDNkb2x1eA==", gender: "female", contentStyle: "Travel", followers: "11K", engagement: "2.5%", image: "-" },
  { id: 32, name: "Nibedita Nayak", location: "Pune", instagramLink: "https://www.instagram.com/iamnibeditta?igsh=bmNtd3o0bjI2ZzJx", gender: "female", contentStyle: "Actor", followers: "94K", engagement: "0.11%", image: "-" },
  { id: 33, name: "Shruti", location: "Pune", instagramLink: "https://www.instagram.com/shrutiiyyyyyy?igsh=ZDg0YWd6MzZtNHhp&utm_source=qr", gender: "female", contentStyle: "Lifestyle", followers: "11K", engagement: "9.77%", image: "-" },
  { id: 34, name: "Komal Jain", location: "Pune", instagramLink: "https://www.instagram.com/kdkomaljain?igsh=MWdrbTZhbndoMGZrYQ%3D%3D&utm_source=qr", gender: "female", contentStyle: "Model", followers: "51K", engagement: "1.14%", image: "-" },
  { id: 35, name: "Jayti Moitra", location: "Pune", instagramLink: "https://www.instagram.com/jaytimoitra/profilecard/?igsh=MW42eDZvazllM2swaA==", gender: "female", contentStyle: "-", followers: "28K", engagement: "5.54%", image: "-" },
  { id: 36, name: "Sarika", location: "Pune", instagramLink: "https://www.instagram.com/foodsie_mum", gender: "female", contentStyle: "Food", followers: "27K", engagement: "1.18%", image: "-" },
  { id: 37, name: "Pune Food Lover", location: "Pune", instagramLink: "https://instagram.com/punefoodloverzz?utm_medium=copy_link", gender: "female", contentStyle: "Food", followers: "9K", engagement: "3.43%", image: "-" },
  { id: 38, name: "Kanchan Uma Rajak", location: "Pune", instagramLink: "https://www.instagram.com/kanchan_2812/profilecard", gender: "female", contentStyle: "Lifestyle", followers: "21K", engagement: "1.4%", image: "-" },
  { id: 39, name: "Shruti Borkar", location: "Swargate", instagramLink: "https://www.instagram.com/shruti_the_explorer_?igsh=MTF5MW9xdGU0aW85dQ==", gender: "female", contentStyle: "Fashion, Fitness, Food", followers: "17K", engagement: "0.11%", image: "-" },
  { id: 40, name: "Surajita Das", location: "Pune", instagramLink: "https://www.instagram.com/myra_the_angel/profilecard/?igsh=MTdldDAyZ3Rsb2F1Yg==", gender: "female", contentStyle: "Digital Creator", followers: "14K", engagement: "4.41%", image: "-" },
  { id: 41, name: "Mrunal Mungi", location: "Pune", instagramLink: "https://instagram.com/mrunal_mungi?igshid=MzRlODBiNWFlZA==", gender: "female", contentStyle: "Luxury Lifestyle", followers: "61K", engagement: "1.79%", image: "-" },
  { id: 42, name: "Aarti Kolte", location: "Pune", instagramLink: "https://www.instagram.com/yourfoodescort/profilecard/?igsh=MTlhbWtncGN1amFrZg==", gender: "female", contentStyle: "Food", followers: "12K", engagement: "15.78%", image: "-" },
  { id: 43, name: "Rishi Barad", location: "Pune", instagramLink: "https://www.instagram.com/puneriblogger/profilecard/?igsh=dXJ4MXk2dGkyY2Zs", gender: "male", contentStyle: "Real Estate & Lifestyle", followers: "55K", engagement: "3.59%", image: "-" },
  { id: 44, name: "Kratika Pandey", location: "Pune", instagramLink: "https://www.instagram.com/kratika_vogue_?igsh=cXh5YTdhN2IzcTZn&utm_source=qr", gender: "female", contentStyle: "Fashion, Fitness", followers: "29K", engagement: "0.13%", image: "-" },
  { id: 45, name: "Preeti", location: "Pune", instagramLink: "https://instagram.com/simple_yet_classy_preeti", gender: "female", contentStyle: "Beauty Influencer", followers: "37K", engagement: "0.07%", image: "-" },
  { id: 46, name: "Vidhi Gupta", location: "Delhi", instagramLink: "https://www.instagram.com/vidhigupta1923/profilecard/?igsh=dTBlNHA3czcycnFw", gender: "female", contentStyle: "Influencer", followers: "98K", engagement: "0.64%", image: "-" },
  { id: 47, name: "Rajat Wankhede", location: "Amravati", instagramLink: "https://www.instagram.com/rajatwankhade007?igsh=cDhrYTlpbzFteW1k", gender: "male", contentStyle: "Model / Lifestyle", followers: "49K", engagement: "29.08%", image: "-" },
  { id: 48, name: "Riya Narula", location: "Pune / Delhi / Bangalore / Mumbai", instagramLink: "https://www.instagram.com/riyabeni?igsh=MTAybHE5NWM1cWNm", gender: "female", contentStyle: "Fitness", followers: "22K", engagement: "5.92%", image: "-" },
  { id: 49, name: "Sneha Misal", location: "Pune / Delhi / Bangalore / Mumbai", instagramLink: "https://www.instagram.com/sssnehahaha_?igsh=MWVoNW9tbTdqbXZjMQ==", gender: "female", contentStyle: "-", followers: "20K", engagement: "37.22%", image: "-" },
  { id: 50, name: "Plate For Two", location: "Nagpur", instagramLink: "https://www.instagram.com/plate_for_two/", gender: "female", contentStyle: "Food", followers: "12K", engagement: "5.7%", image: "-" },
  { id: 51, name: "Ruchika Asatkar", location: "Nagpur", instagramLink: "https://www.instagram.com/ruchika_asatkar/", gender: "female", contentStyle: "Blogger", followers: "290K", engagement: "1%", image: "-" },
  { id: 52, name: "The Tongue and Scissors", location: "Nagpur", instagramLink: "https://www.instagram.com/thetongueandscissors/", gender: "female", contentStyle: "Lifestyle", followers: "117K", engagement: "0.9%", image: "-" },
  { id: 53, name: "Girly N Gluttony", location: "Nagpur", instagramLink: "https://www.instagram.com/girly_n_gluttony/", gender: "female", contentStyle: "Food / Lifestyle", followers: "61K", engagement: "1.7%", image: "-" },
  { id: 54, name: "Binge Life", location: "Nagpur", instagramLink: "https://www.instagram.com/bingelife/", gender: "female", contentStyle: "Food / Travel", followers: "147K", engagement: "0.7%", image: "-" },
  { id: 55, name: "Angel Peter", location: "Nagpur", instagramLink: "https://www.instagram.com/angelpeterr_/", gender: "female", contentStyle: "Lifestyle", followers: "172K", engagement: "1%", image: "-" },
  { id: 56, name: "Doyash", location: "Nagpur", instagramLink: "https://www.instagram.com/doyash/", gender: "male", contentStyle: "Food", followers: "92K", engagement: "20%", image: "-" },
  { id: 57, name: "Rustoodie", location: "Nagpur", instagramLink: "https://www.instagram.com/rustoodie/", gender: "female", contentStyle: "Lifestyle", followers: "20K", engagement: "0.9%", image: "-" },
  { id: 58, name: "Dilmange Veg", location: "Nagpur", instagramLink: "https://www.instagram.com/dilmange_veg/", gender: "male", contentStyle: "Food", followers: "14K", engagement: "5.7%", image: "-" },
  { id: 59, name: "Khate Raho Dilse", location: "Nagpur", instagramLink: "https://www.instagram.com/khate_raho_dilse/", gender: "male", contentStyle: "Food", followers: "78K", engagement: "0.7%", image: "-" },
  { id: 60, name: "Wandering Jojo", location: "Nagpur", instagramLink: "https://www.instagram.com/wandering_jojo/", gender: "female", contentStyle: "Travel", followers: "17K", engagement: "5.4%", image: "-" },
  { id: 61, name: "Nagpurchi Santri", location: "Nagpur", instagramLink: "https://www.instagram.com/nagpurchi_santri/", gender: "female", contentStyle: "Reel Creator", followers: "16K", engagement: "1.7%", image: "-" },
  { id: 62, name: "Sakshi Mood", location: "Nagpur", instagramLink: "https://www.instagram.com/sakshimood/", gender: "female", contentStyle: "Content Creator", followers: "21K", engagement: "5.9%", image: "-" },
  { id: 63, name: "Life Swaadanusar", location: "Nagpur", instagramLink: "https://www.instagram.com/life_swaadanusar/", gender: "female", contentStyle: "Digital Creator", followers: "1K", engagement: "79.5%", image: "-" },
  { id: 64, name: "Nagpur Foodpedia", location: "Nagpur", instagramLink: "https://www.instagram.com/nagpurfoodpedia/", gender: "male", contentStyle: "Content Creator", followers: "51K", engagement: "12.4%", image: "-" },
  { id: 65, name: "Nagpur Hone", location: "Nagpur", instagramLink: "https://www.instagram.com/nagpurhone/", gender: "male", contentStyle: "Content Creator", followers: "11K", engagement: "30.4%", image: "-" },
  { id: 66, name: "Pizzandpie", location: "Nagpur", instagramLink: "https://www.instagram.com/pizzandpie/", gender: "female", contentStyle: "Content Creator", followers: "49K", engagement: "3%", image: "-" },
  { id: 67, name: "Gourmet Musafir", location: "Nagpur", instagramLink: "https://www.instagram.com/gourmetmusafir/", gender: "male", contentStyle: "Content Creator", followers: "125K", engagement: "0.7%", image: "-" },
  { id: 68, name: "Priyal Giri", location: "Nagpur", instagramLink: "https://www.instagram.com/priyal_giri/", gender: "female", contentStyle: "Lifestyle", followers: "15K", engagement: "12.3%", image: "-" },
  { id: 69, name: "Daawat.e.ishq", location: "Nagpur", instagramLink: "https://www.instagram.com/daawat.e.ishq/", gender: "female", contentStyle: "Lifestyle", followers: "66K", engagement: "1.2%", image: "-" },
  { id: 70, name: "Tarushi Sinha", location: "Nagpur", instagramLink: "https://www.instagram.com/tarushisinhaa/", gender: "female", contentStyle: "Blogger", followers: "1K", engagement: "9.3%", image: "-" },
  { id: 71, name: "The Flavourful Sagas", location: "Nagpur", instagramLink: "https://www.instagram.com/the_flavourful_sagas/", gender: "female", contentStyle: "Blogger", followers: "5K", engagement: "4.1%", image: "-" },
  { id: 72, name: "Foodie Ank", location: "Nagpur", instagramLink: "https://www.instagram.com/foodie_ank/", gender: "female", contentStyle: "Blogger", followers: "32K", engagement: "0.8%", image: "-" },
  { id: 73, name: "Khana Khajana Nagpur", location: "Nagpur", instagramLink: "https://www.instagram.com/khana_khajana_nagpur/", gender: "male", contentStyle: "Food", followers: "22K", engagement: "3.3%", image: "-" },
  { id: 74, name: "Not Just Chapatti", location: "Nagpur", instagramLink: "https://www.instagram.com/not_just_chapatti/", gender: "female", contentStyle: "Food", followers: "4K", engagement: "6.3%", image: "-" },
  { id: 75, name: "Nagpurcha Patel", location: "Nagpur", instagramLink: "https://www.instagram.com/nagpurcha_patel/", gender: "male", contentStyle: "Lifestyle", followers: "3K", engagement: "9.9%", image: "-" },
  { id: 76, name: "Jamocu", location: "Nagpur", instagramLink: "https://www.instagram.com/jamocu/", gender: "female", contentStyle: "Beauty", followers: "124K", engagement: "0.7%", image: "-" },
  { id: 77, name: "Nagpurcha Kartik", location: "Nagpur", instagramLink: "https://www.instagram.com/nagpurchakartik/", gender: "male", contentStyle: "Lifestyle", followers: "164K", engagement: "1.5%", image: "-" },
  { id: 78, name: "Crushonfood", location: "Nagpur", instagramLink: "https://www.instagram.com/crushonfood/", gender: "male", contentStyle: "Food", followers: "24K", engagement: "95%", image: "-" },
  { id: 79, name: "Shroodiee", location: "Nagpur", instagramLink: "https://www.instagram.com/shroodiee/", gender: "female", contentStyle: "Food / Lifestyle", followers: "10K", engagement: "1.6%", image: "-" }
];

/* ------------------- REST OF YOUR ORIGINAL DATA (UNCHANGED) ------------------- */
const magazinesData = [
  { id: 1, name: "Vogue India", websiteLink: "https://www.vogue.in/", genre: "Fashion", readership: 1200000, frequency: "Monthly", adRate: "₹3,50,000/page", minBudget: 350000, language: "English", recommended: true, image: "/Creators/Vogue India.png" },
  { id: 2, name: "Filmfare", websiteLink: "https://www.filmfare.com/", genre: "Lifestyle", readership: 1400000, frequency: "Monthly", adRate: "₹4,00,000/page", minBudget: 400000, language: "English", recommended: true, image: "/Creators/filmfare.png" },
  { id: 3, name: "Business Today", websiteLink: "https://www.businesstoday.in/", genre: "Business", readership: 800000, frequency: "Weekly", adRate: "₹2,75,000/page", minBudget: 275000, language: "English", recommended: true, image: "/Creators/business today.png" },
  { id: 4, name: "Femina", websiteLink: "https://www.femina.in/", genre: "Lifestyle", readership: 1100000, frequency: "Monthly", adRate: "₹3,00,000/page", minBudget: 300000, language: "English", recommended: false, image: "/Creators/femina.png" },
  { id: 5, name: "Digit", websiteLink: "https://www.digit.in/", genre: "Technology", readership: 300000, frequency: "Monthly", adRate: "₹1,50,000/page", minBudget: 150000, language: "English", recommended: false, image: "/Creators/digit.png" },
  { id: 6, name: "Outlook Traveller", websiteLink: "https://www.outlookindia.com/traveller/", genre: "Travel", readership: 450000, frequency: "Monthly", adRate: "₹2,00,000/page", minBudget: 200000, language: "English", recommended: false, image: "/Creators/Outlook Traveller.png" },
  { id: 7, name: "Grihshobha", websiteLink: "#", genre: "Lifestyle", readership: 5000000, frequency: "Monthly", adRate: "₹1,80,000/page", minBudget: 180000, language: "Hindi", recommended: true, image: "/Creators/grihshobha.png" },
  { id: 8, name: "Forbes India", websiteLink: "https://www.forbesindia.com/", genre: "Business", readership: 500000, frequency: "Monthly", adRate: "₹5,00,000/page", minBudget: 500000, language: "English", recommended: false, image: "/Creators/Forbes India.png" }
];

const newspapersData = [
  { id: 1, name: "The Times of India", websiteLink: "https://timesofindia.indiatimes.com/", genre: "National", circulation: 2800000, readership: "7.6M", adRate: "₹2,500/sq.cm", minBudget: 25000, location: "National", language: "English", recommended: true, image: "/Creators/the times of india.png" },
  { id: 2, name: "Hindustan Times", websiteLink: "https://www.hindustantimes.com/", genre: "National", circulation: 1400000, readership: "4.5M", adRate: "₹1,800/sq.cm", minBudget: 18000, location: "National", language: "English", recommended: true, image: "/Creators/hindustan times.png" },
  { id: 3, name: "The Hindu", websiteLink: "https://www.thehindu.com/", genre: "National", circulation: 1200000, readership: "4.1M", adRate: "₹1,600/sq.cm", minBudget: 16000, location: "National", language: "English", recommended: false, image: "/Creators/the hindu.png" },
  { id: 4, name: "Dainik Jagran", websiteLink: "https://www.jagran.com/", genre: "National", circulation: 3600000, readership: "16.4M", adRate: "₹2,800/sq.cm", minBudget: 28000, location: "National", language: "Hindi", recommended: true, image: "/Creators/dainik jagran.png" },
  { id: 5, name: "Lokmat", websiteLink: "https://www.lokmat.com/", genre: "Regional", circulation: 1300000, readership: "18M", adRate: "₹1,500/sq.cm", minBudget: 15000, location: "Maharashtra", language: "Marathi", recommended: true, image: "/Creators/lokmat.png" },
  { id: 6, name: "The Economic Times", websiteLink: "https://economictimes.indiatimes.com/", genre: "Business", circulation: 800000, readership: "2.5M", adRate: "₹2,200/sq.cm", minBudget: 22000, location: "National", language: "English", recommended: false, image: "/Creators/the economic times.png" },
  { id: 7, name: "Nagpur Today", websiteLink: "#", genre: "Local", circulation: 45000, readership: "150K", adRate: "₹300/sq.cm", minBudget: 3000, location: "Nagpur", language: "English", recommended: false, image: "/Creators/nagpur today.png" },
  { id: 8, name: "Mumbai Mirror", websiteLink: "#", genre: "Tabloid", circulation: 400000, readership: "1.2M", adRate: "₹900/sq.cm", minBudget: 9000, location: "Mumbai", language: "English", recommended: false, image: "/Creators/mumbai mirror.png" }
];

const digitalPlatformsData = [
  { id: 1, name: "Google Ads", websiteLink: "https://ads.google.com/", platformType: "Search & Display", reach: "90% of Internet Users", formats: ["Search", "Display", "Video", "Shopping"], adRate: "Pay-Per-Click", minBudget: 25000, image: "/Creators/goggle ads.png" },
  { id: 2, name: "Meta Ads", websiteLink: "https://www.facebook.com/business/ads", platformType: "Social Media", reach: "3B+ Users (FB/IG)", formats: ["Feed", "Stories", "Reels", "video"], adRate: "CPM / CPC", minBudget: 20000, image: "/Creators/meta ads.png" },
  { id: 3, name: "LinkedIn Ads", websiteLink: "https://www.linkedin.com/business/marketing/ads", platformType: "B2B Social", reach: "1B+ Professionals", formats: ["Sponsored Content", "InMail", "Dynamic Ads"], adRate: "Pay-Per-Click", minBudget: 35000, image: "/Creators/linkedin ads.png" },
  { id: 4, name: "YouTube Ads", websiteLink: "https://www.youtube.com/ads/", platformType: "Video Platform", reach: "2.5B+ Users", formats: ["In-stream", "Discovery", "Bumper Ads"], adRate: "Pay-Per-View", minBudget: 30000, image: "/Creators/youtube ads.png" },
  { id: 5, name: "Amazon Ads", websiteLink: "https://advertising.amazon.com/", platformType: "Retain & E-comm", reach: "300M+ Customers", formats: ["Sponsored Products", "Brands", "Display"], adRate: "Pay-Per-Click", minBudget: 40000, image: "/Creators/amazon ads.png" }
];