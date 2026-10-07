"use client";
import Head from "next/head";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '800', '900'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500'] });

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
      <div className={`text-gray-300 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${inter.className}`}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M22 3L2 3L10 12.46 10 19 14 21 14 12.46 22 3"></path></svg>
        {title}
        {selected.length > 0 && <span className="ml-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">{selected.length}</span>}
      </div>

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

  const aspectRatios = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/5]"];
  const ratio = aspectRatios[idx % 5];
  
  return (
    <div
      className={`relative w-full ${ratio} break-inside-avoid inline-block mb-6 lg:mb-8 cursor-pointer group rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-500 bg-[#0a0a0c] shadow-lg hover:shadow-[0_10px_40px_rgba(229,169,0,0.15)]`}
      onClick={() => onClick(item, "influencer")}
    >
      {item.image && item.image !== "-" ? (
        <SafeImage src={item.image} alt={item.name} width={600} height={800} className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110 ${item.imageClass || 'object-cover'}`} />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-[#0a0a0c] flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-2xl shadow-xl">
            {getInitials(item.name)}
          </div>
        </div>
      )}
      
      {/* Sleek Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top Right Tag - slides in on hover */}
      <div className="absolute top-4 right-4 z-10 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 max-w-[75%]">
        <span className={`block truncate px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-medium text-white uppercase tracking-wider ${inter.className}`}>
          {item.contentStyle || "Lifestyle"}
        </span>
      </div>

      {/* Content */}
      <div className={`absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end z-20 ${inter.className}`}>
        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h3 className={`text-2xl font-bold text-white tracking-tight mb-1 line-clamp-1 group-hover:text-yellow-400 transition-colors ${playfair.className}`}>{item.name}</h3>
          <div className="flex items-center justify-between mt-2 gap-2">
            <p className="text-[13px] text-gray-300 font-medium tracking-wide flex items-center gap-1.5 truncate">
              <span className="shrink-0"><LocationIcon /></span>
              <span className="truncate">{item.location || "India"}</span>
            </p>
            {item.followers && item.followers !== "-" && (
              <p className="text-[13px] text-white font-bold flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-md backdrop-blur-sm shrink-0">
                <InstaIcon /> {item.followers}
              </p>
            )}
          </div>
          
          {/* Extra stats that fade in on hover */}
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
            <div className="flex items-center gap-1.5 text-white">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Eng:</span> 
              <span className="font-semibold text-[13px]">{item.engagement && item.engagement !== "-" ? item.engagement : "N/A"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Cat:</span> 
              <span className="font-semibold text-[13px] truncate max-w-[80px]">{item.category || "Creator"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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

  const aspectRatios = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/5]"];
  const ratio = aspectRatios[idx % 5];
  
  return (
    <a
      href={item.websiteLink || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative w-full ${ratio} break-inside-avoid inline-block mb-6 lg:mb-8 cursor-pointer group rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-500 bg-[#0a0a0c] shadow-lg hover:shadow-[0_10px_40px_rgba(229,169,0,0.15)] block`}
      onClick={() => onClick(item, "magazine")}
    >
      <SafeImage src={item.image} alt={item.name} width={700} height={800} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute top-4 right-4 z-10 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 max-w-[75%]">
        <span className={`block truncate px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-medium text-white uppercase tracking-wider ${inter.className}`}>
          {item.genre || "Magazine"}
        </span>
      </div>

      <div className={`absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end z-20 ${inter.className}`}>
        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h3 className={`text-2xl font-bold text-white tracking-tight mb-1 line-clamp-1 group-hover:text-yellow-400 transition-colors ${playfair.className}`}>{item.name}</h3>
          <p className="text-[13px] text-gray-300 font-medium tracking-wide mt-2">{item.frequency || "Monthly"}</p>
          
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
            <div className="flex items-center gap-1.5 text-white">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Readers:</span> 
              <span className="font-semibold text-[13px]">{fmt(item.readership)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Starts at:</span> 
              <span className="font-semibold text-[13px] text-yellow-400">₹{fmt(Number(starting))}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
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
  
  const aspectRatios = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/5]"];
  const ratio = aspectRatios[idx % 5];
  
  return (
    <a
      href={item.websiteLink || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative w-full ${ratio} break-inside-avoid inline-block mb-6 lg:mb-8 cursor-pointer group rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-500 bg-[#0a0a0c] shadow-lg hover:shadow-[0_10px_40px_rgba(229,169,0,0.15)] block`}
      onClick={() => onClick(item, "newspaper")}
    >
      <SafeImage src={item.image} alt={item.name} width={700} height={800} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute top-4 right-4 z-10 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 max-w-[75%]">
        <span className={`block truncate px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-medium text-white uppercase tracking-wider ${inter.className}`}>
          {item.genre || "News"}
        </span>
      </div>

      <div className={`absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end z-20 ${inter.className}`}>
        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h3 className={`text-2xl font-bold text-white tracking-tight mb-1 line-clamp-1 group-hover:text-yellow-400 transition-colors ${playfair.className}`}>{item.name}</h3>
          <p className="text-[13px] text-gray-300 font-medium tracking-wide mt-2">{item.language || "English"}</p>
          
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
            <div className="flex items-center gap-1.5 text-white">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Circ:</span> 
              <span className="font-semibold text-[13px]">{fmt(item.circulation || "-")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Rate:</span> 
              <span className="font-semibold text-[13px] text-yellow-400">{item.adRate || "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function DigitalCard({ item, onClick, idx = 0 }) {
  const shortReach = item.reach ? item.reach.split(" ")[0] : "-";
  const shortModel = item.adRate === "Pay-Per-Click" ? "PPC" :
    item.adRate === "Pay-Per-View" ? "PPV" :
      item.adRate || item.pricingModel || "-";

  const aspectRatios = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/5]"];
  const ratio = aspectRatios[idx % 5];
  
  return (
    <a
      href={item.websiteLink || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative w-full ${ratio} break-inside-avoid inline-block mb-6 lg:mb-8 cursor-pointer group rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-500 bg-[#0a0a0c] shadow-lg hover:shadow-[0_10px_40px_rgba(229,169,0,0.15)] block`}
      onClick={() => onClick(item, "digital")}
    >
      <SafeImage src={item.image} alt={item.name} width={700} height={800} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute top-4 right-4 z-10 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 max-w-[75%]">
        <span className={`block truncate px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-medium text-white uppercase tracking-wider ${inter.className}`}>
          {item.platformType || "Digital"}
        </span>
      </div>

      <div className={`absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end z-20 ${inter.className}`}>
        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h3 className={`text-2xl font-bold text-white tracking-tight mb-1 line-clamp-1 group-hover:text-yellow-400 transition-colors ${playfair.className}`}>{item.name}</h3>
          <p className="text-[13px] text-gray-300 font-medium tracking-wide mt-2">{item.formats?.[0] || "Ads"}</p>
          
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
            <div className="flex items-center gap-1.5 text-white">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Reach:</span> 
              <span className="font-semibold text-[13px]">{shortReach}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Model:</span> 
              <span className="font-semibold text-[13px] text-yellow-400">{shortModel}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
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
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 truncate" title={format(item.followers)}>{format(item.followers)}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Followers</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 truncate" title={item.engagement || "-"}>{item.engagement || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Engagement</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 capitalize truncate" title={item.gender || "-"}>{item.gender || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Gender</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 truncate" title={item.location || "-"}>{item.location || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Location</div>
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
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 truncate" title={format(item.readership)}>{format(item.readership)}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Total Readership</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 truncate" title={item.adRate || "-"}>{item.adRate || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Avg. Ad Rate</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 truncate" title={`₹${Number(item.minBudget || item.startingPrice || 25000).toLocaleString()}`}>₹{Number(item.minBudget || item.startingPrice || 25000).toLocaleString()}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Starting Price</div>
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
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 truncate" title={format(item.circulation || "-")}>{format(item.circulation || "-")}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Daily Circulation</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 truncate" title={format(item.readership)}>{format(item.readership)}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Total Readership</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 truncate" title={item.adRate || "-"}>{item.adRate || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Avg. Ad Rate</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 truncate" title={`₹${Number(item.minBudget || item.startingPrice || 25000).toLocaleString()}`}>₹{Number(item.minBudget || item.startingPrice || 25000).toLocaleString()}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Starting Price</div>
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
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 truncate" title={item.reach || "-"}>{item.reach || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Potential Audience</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 truncate" title={item.adRate || item.pricingModel || "-"}>{item.adRate || item.pricingModel || "-"}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Pricing Model</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 truncate" title={`₹${Number(item.minBudget || 25000).toLocaleString()}`}>₹{Number(item.minBudget || 25000).toLocaleString()}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest truncate">Starting Budget</div>
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
        <h1 className="sr-only">Bizleap Creators</h1>
        <div className={`text-5xl sm:text-7xl md:text-7xl lg:text-[5rem] font-bold tracking-tight leading-[1.15] text-white drop-shadow-lg ${playfair.className}`}>
          Amplify <br />
          <span className="text-[#E5A900] italic font-medium">Your Reach.</span>
        </div>
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      const shuffled = [...data];

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
      influencer: customSort(influencersData, []),
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
      <title key="title">Bizleap Creators – Designers, Developers & Digital Experts</title>
      <meta name="keywords" content="creators network Nagpur, brand placements, influencer marketing Nagpur" />
      <meta
        name="description"
        key="description"
        content="Discover Bizleap's creators network of designers, developers, and digital experts building impactful digital and brand solutions."
      />
      <link rel="canonical" href="https://bizleap.in/creators" />
      
      {/* Open Graph */}
      <meta property="og:title" content="Bizleap Creators – Designers, Developers & Digital Experts" key="og:title" />
      <meta property="og:description" content="Discover Bizleap's creators network of designers, developers, and digital experts building impactful digital and brand solutions." key="og:description" />
      <meta property="og:url" content="https://bizleap.in/creators" key="og:url" />
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
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pt-16 pb-8 flex flex-col items-start text-left">
        <div className="w-full">
          <h2 className={`text-3xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold mb-6 text-white tracking-tight drop-shadow-md whitespace-normal sm:whitespace-nowrap ${playfair.className}`}>
            Connecting Brands with <span className="text-[#E5A900] italic font-medium">Authentic Voices.</span>
          </h2>
          <p className={`text-white/70 md:text-white/80 text-base md:text-xl leading-relaxed max-w-3xl font-light ${inter.className}`}>
            Bizleap's Creators Network is an exclusive ecosystem of premium influencers, renowned magazines, trusted newspapers, and leading digital platforms.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-20">
        
        {/* Sleek Toolbar */}
        <div className="mt-8 mb-10 w-full border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          {/* Categories */}
          <div className="flex overflow-x-auto whitespace-nowrap items-center gap-2 md:gap-3 pb-2 md:pb-0 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => {
                  setFilter(s.key);
                  setActiveFilters({});
                  setOpenDropdownKey(null);
                }}
                className={`relative px-6 py-3 rounded-full text-[13px] md:text-sm font-semibold transition-all duration-300 tracking-wide ${filter === s.key
                  ? "text-black bg-[#E5A900] shadow-[0_0_20px_rgba(229,169,0,0.3)]"
                  : "text-gray-400 hover:text-white bg-white/5 hover:bg-white/10"
                  }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          
          {/* Filter Button & Dropdown */}
          {filterMenus[filter].length > 0 && (
            <div className="relative z-50">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all text-white font-medium ${hasActiveOtherFilters || isFilterOpen ? "bg-[#E5A900]/10 border-[#E5A900]/50 text-[#E5A900]" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                Filters {hasActiveOtherFilters && <span className="bg-[#E5A900] text-black w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ml-1">{Object.values(activeFilters).flat().length}</span>}
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-[90]" 
                      onClick={() => setIsFilterOpen(false)} 
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-[280px] sm:w-[320px] bg-[#111]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-[100] flex flex-col overflow-hidden"
                    >
                      <div className="max-h-[400px] overflow-y-auto p-5 overscroll-contain scrollbar-hide" data-lenis-prevent="true">
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
                      </div>
                      
                      {showClearFilters && (
                        <div className="p-4 border-t border-white/10 bg-[#0a0a0c]/80 backdrop-blur-md">
                          <button
                            onClick={clearFilters}
                            className="w-full px-5 py-3 rounded-xl bg-red-500/10 text-red-400 text-[13px] font-semibold hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                          >
                            ✕ Clear Filters
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Full Width Grid */}
        <div className="w-full relative z-0">
          <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-2 sm:gap-6 lg:gap-8">
            {cardsForSection(sections.find(s => s.key === filter))}
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
  {
    id: 101,
    name: "Aira Shetty",
    location: "Nagpur",
    instagramLink: "#",
    gender: "female",
    contentStyle: "Lifestyle",
    followers: "46.3K",
    engagement: "3.9%",
    image: "/influencers pic/aira shetty/aira s (3).png",
    imageClass: "object-cover object-[center_25%]"
  },
  {
    id: 102,
    name: "Alandi Bhoyar",
    location: "Chandrapur/Nagpur/Delhi",
    instagramLink: "https://www.instagram.com/alandi._b?stkn=MTd1c2Z1NW8xbDhkeA==",
    gender: "female",
    contentStyle: "Beauty•lifestyle•fashion•ugc creator,Model",
    followers: "140.2K",
    engagement: "4.3%",
    image: "/influencers pic/alandi bhoyar/alandi b (1).png",
    imageClass: "object-cover object-[center_20%]"
  },
  {
    id: 103,
    name: "Angel Peter",
    location: "Nagpur",
    instagramLink: "https://www.instagram.com/angelpeterr_?stkn=MXQ1eXh2ODJsOHFvdw==",
    gender: "female",
    contentStyle: "Lifestyle | Food | Travel | Fashion",
    followers: "64.9K",
    engagement: "5.4%",
    image: "/influencers pic/angel peter/angel p (1).png",
    imageClass: "object-cover object-[center_70%] !scale-110 group-hover:!scale-[1.15]"
  },
  {
    id: 104,
    name: "Ankita Sampat",
    location: "Nagpur",
    instagramLink: "#",
    gender: "female",
    contentStyle: "Lifestyle",
    followers: "90.1K",
    engagement: "3.9%",
    image: "/influencers pic/ankita sampat/ankita (1).png",
    imageClass: "object-cover object-top"
  },
  {
    id: 105,
    name: "Divya Suryavanshi",
    location: "Nagpur",
    instagramLink: "#",
    gender: "female",
    contentStyle: "Lifestyle",
    followers: "119.6K",
    engagement: "5.2%",
    image: "/influencers pic/divya suryavanshi/divya s (5).png",
    imageClass: "object-cover object-[center_30%]"
  },
  {
    id: 106,
    name: "Diya",
    location: "nagpur",
    instagramLink: "https://www.instagram.com/diyaaaaaaaaa___/",
    gender: "female",
    contentStyle: "digital creator",
    followers: "116.0K",
    engagement: "4.8%",
    image: "/influencers pic/diya/diya (4).png"
  },
  {
    id: 107,
    name: "Himanshi Gosawi",
    location: "nagpur / mumbai",
    instagramLink: "https://www.instagram.com/himanshigosavi/",
    gender: "female",
    contentStyle: "fashion model",
    followers: "92.0K",
    engagement: "4.8%",
    image: "/influencers pic/Himanshi Gosawi/himanshi g (3).png"
  },
  {
    id: 108,
    name: "Himanshi jagyasi",
    location: "Nagpur",
    instagramLink: "https://www.instagram.com/himani_jagyasi08?stkn=MWFocGtqeXhjc2l6cg==",
    gender: "female",
    contentStyle: "Digital portfolio",
    followers: "14.7K",
    engagement: "2.1%",
    image: "/influencers pic/Himanshi jagyasi/himanshi j (3).png"
  },
  {
    id: 109,
    name: "Ishita Bhatti",
    location: "Nagpur",
    instagramLink: "#",
    gender: "female",
    contentStyle: "Lifestyle",
    followers: "14.7K",
    engagement: "2.5%",
    image: "/influencers pic/ishita/ishita (2).png"
  },
  {
    id: 110,
    name: "Jheel Chabbariya",
    location: "Nagpur",
    instagramLink: "https://www.instagram.com/withlovejheel_/",
    gender: "female",
    contentStyle: "Lifestyle",
    followers: "77.5K",
    engagement: "5.2%",
    image: "/influencers pic/jheel/sanvi sing (4).png"
  },
  {
    id: 111,
    name: "Jiya Rajput",
    location: "Nagpur",
    instagramLink: "#",
    gender: "female",
    contentStyle: "Lifestyle",
    followers: "87.4K",
    engagement: "4.8%",
    image: "/influencers pic/jiya rajput/jiya (4).png"
  },
  {
    id: 112,
    name: "Kartik",
    location: "Nagpur",
    instagramLink: "https://www.instagram.com/nagpurchakartik?stkn=MWR5eGR1cnY1Zmp6Yg==",
    gender: "male",
    contentStyle: "Digital creator",
    followers: "82.7K",
    engagement: "5.0%",
    image: "/influencers pic/kartik/karktik (1).png"
  },
  {
    id: 113,
    name: "Krutika ramteke",
    location: "Nagpur",
    instagramLink: "https://www.instagram.com/krutika.ramteke_?stkn=MXduMzdpYzk4ZmE4dg==",
    gender: "female",
    contentStyle: "Dance | Fashion | lifestyle | entertainment | Travel",
    followers: "46.5K",
    engagement: "5.6%",
    image: "/influencers pic/krutika r/krutika ramteke (1).png"
  },
  {
    id: 114,
    name: "Lachi Yadav",
    location: "Nagpur/Chandrapur",
    instagramLink: "https://www.instagram.com/lachi.yadao?stkn=YmQyNW1kanAzands",
    gender: "female",
    contentStyle: "Digital creator",
    followers: "127.8K",
    engagement: "4.4%",
    image: "/influencers pic/lachi yadav/lachi y (3).png"
  },
  {
    id: 115,
    name: "Muskan Sachdev",
    location: "Nagpur",
    instagramLink: "https://www.instagram.com/musskan.sachdev/",
    gender: "female",
    contentStyle: "Model",
    followers: "116.0K",
    engagement: "2.5%",
    image: "/influencers pic/Muskan Sachdev/muskan sac (5).png"
  },
  {
    id: 116,
    name: "Muskan Sharma",
    location: "delhi",
    instagramLink: "https://www.instagram.com/sharma_muskan_?stkn=dWZ1ZW5xZzJpMmI3",
    gender: "female",
    contentStyle: "digital creator",
    followers: "114.5K",
    engagement: "3.6%",
    image: "/influencers pic/muskan sharma/muskan (3).png"
  },
  {
    id: 117,
    name: "Parul Meshram",
    location: "nagpur",
    instagramLink: "https://www.instagram.com/parulm_23?stkn=MWwzenVyaTNyeHVucw==",
    gender: "female",
    contentStyle: "Beauty • Fashion • Lifestyle",
    followers: "25.5K",
    engagement: "3.5%",
    image: "/influencers pic/parul m/parul (1).png"
  },
  {
    id: 118,
    name: "Payal Biswa",
    location: "Nagpur",
    instagramLink: "#",
    gender: "female",
    contentStyle: "Lifestyle",
    followers: "58.6K",
    engagement: "5.2%",
    image: "/influencers pic/payal biswa/payal (1).png"
  },
  {
    id: 119,
    name: "Pragya chabra",
    location: "Nagpur",
    instagramLink: "https://www.instagram.com/pragyachhabra_?stkn=OWVpdWNwdHBtcnRk",
    gender: "female",
    contentStyle: "Anchor | Content writer/creator | VO artist",
    followers: "141.9K",
    engagement: "4.9%",
    image: "/influencers pic/pragya chabra/pragya (3).png"
  },
  {
    id: 120,
    name: "Priyal Giri",
    location: "Nagpur",
    instagramLink: "https://www.instagram.com/priyal_giri?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
    gender: "female",
    contentStyle: "ʟɪғᴇsᴛʏʟᴇ | ᴛʀᴀᴠᴇʟ | ғᴀsʜɪᴏɴ | ғᴏᴏᴅ🦋",
    followers: "66.2K",
    engagement: "5.8%",
    image: "/influencers pic/priyal giri/priyal g (4).png"
  },
  {
    id: 121,
    name: "Ragini",
    location: "Nagpur",
    instagramLink: "#",
    gender: "female",
    contentStyle: "Lifestyle",
    followers: "68.7K",
    engagement: "5.2%",
    image: "/influencers pic/ragini/ragini kaikade (3).png"
  },
  {
    id: 122,
    name: "Ria Kirplani",
    location: "Nagpur",
    instagramLink: "#",
    gender: "female",
    contentStyle: "Lifestyle",
    followers: "150.0K",
    engagement: "4.7%",
    image: "/influencers pic/ria kirplani/ria (5).png"
  },
  {
    id: 123,
    name: "Saiee Masakalkar",
    location: "Nagpur",
    instagramLink: "https://www.instagram.com/saieee_m?stkn=MXR1YW02emxobjJraA==",
    gender: "female",
    contentStyle: "digital creator",
    followers: "61.2K",
    engagement: "5.5%",
    image: "/influencers pic/saiee/saiee (2).png"
  },
  {
    id: 124,
    name: "Saumya",
    location: "Nagpur",
    instagramLink: "#",
    gender: "female",
    contentStyle: "Lifestyle",
    followers: "44.2K",
    engagement: "4.4%",
    image: "/influencers pic/saumya (mia)/saumya (mia) (5).png"
  },
  {
    id: 125,
    name: "Somya Kodan",
    location: "Nagpur",
    instagramLink: "#",
    gender: "female",
    contentStyle: "Lifestyle",
    followers: "339K",
    engagement: "4.7%",
    image: "/influencers pic/saumyakodan/saumya k (2).png"
  },
  {
    id: 126,
    name: "sejal malkani",
    location: "nagpur",
    instagramLink: "https://www.instagram.com/sejal_malkani000/",
    gender: "female",
    contentStyle: "Digital creator •Fasion •Lifestyle •beauty",
    followers: "127.1K",
    engagement: "4.8%",
    image: "/influencers pic/sejal malkani/sejal (6).png"
  },
  {
    id: 127,
    name: "Shraddha Lalwan",
    location: "Nagpur",
    instagramLink: "#",
    gender: "female",
    contentStyle: "Lifestyle",
    followers: "80.6K",
    engagement: "5.2%",
    image: "/influencers pic/shraddha lalwan/shraddha lalwani (4).png"
  },
  {
    id: 128,
    name: "Shreya Singh",
    location: "Nagpur",
    instagramLink: "#",
    gender: "female",
    contentStyle: "Lifestyle",
    followers: "78.8K",
    engagement: "2.7%",
    image: "/influencers pic/shreya singh/shre_Ay (3).png",
    imageClass: "object-cover object-top"
  },
  {
    id: 129,
    name: "Simran",
    location: "nagpur",
    instagramLink: "https://www.instagram.com/chimlann_/",
    gender: "female",
    contentStyle: "Artist • Dance | Fashion | Lifestyle",
    followers: "109.3K",
    engagement: "3.0%",
    image: "/influencers pic/simran/simran (2).png",
    imageClass: "object-cover object-top"
  },
  {
    id: 130,
    name: "Tricha sakharkar",
    location: "Nagpur/Bhopal",
    instagramLink: "https://www.instagram.com/trishaaa._s?stkn=cWplbHQxeTByM2F5",
    gender: "female",
    contentStyle: "digital creator",
    followers: "16.2K",
    engagement: "3.4%",
    image: "/influencers pic/tricha/tricha (2).png"
  },
  {
    id: 131,
    name: "vaishnavi lanjewar",
    location: "nagpur",
    instagramLink: "https://www.instagram.com/vaishnaviiii.____/",
    gender: "female",
    contentStyle: "travel - fashion",
    followers: "97.1K",
    engagement: "2.5%",
    image: "/influencers pic/vaishnavi lanjewar/vaishnavi (3).png"
  },
  {
    id: 132,
    name: "Vanshika",
    location: "delhi / nagpur",
    instagramLink: "https://www.instagram.com/vanshikkaahh/",
    gender: "female",
    contentStyle: "journalist and a VO artist",
    followers: "112.9K",
    engagement: "4.6%",
    image: "/influencers pic/Vanshika/vanshika (2).png"
  }
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