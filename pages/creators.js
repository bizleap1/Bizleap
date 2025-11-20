"use client";
import * as React from "react";
import { useState, useRef } from "react";
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

  if (isExternal) {
    return <img src={src} alt={alt} width={width} height={height} className={className} onError={() => setError(true)} />;
  }

  const safeSrc = src?.startsWith("/") ? src : `/${src}`;
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
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        active
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

// ------------------- Dropdown Filter (for magazines, newspapers, digital) -------------------
function DropdownFilter({ id, title, options = [], isRange = false, selected = [], onToggleOption, onApplyRange }) {
  const [open, setOpen] = useState(false);
  const [minVal, setMinVal] = useState("");
  const [maxVal, setMaxVal] = useState("");

  const applyRange = () => {
    onApplyRange && onApplyRange(minVal, maxVal);
    setOpen(false);
  };

  return (
    <div className={`border rounded-lg p-3 w-full sm:w-56 transition-all ${selected.length ? "border-yellow-500 bg-yellow-500/5" : "border-gray-700 bg-gray-900"}`}>
      <button onClick={() => setOpen(v => !v)} className={`flex items-center justify-between w-full text-sm font-medium ${selected.length ? "text-yellow-400" : "text-gray-300"}`}>
        <span className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 3L2 3L10 12.5V19L14 21V12.5L22 3Z"></path></svg>
          {title}
          {selected.length > 0 && <span className="ml-2 bg-yellow-500 text-black text-xs font-semibold px-2 rounded-full">{selected.length}</span>}
        </span>
        <span className={`text-xs ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-3 text-gray-300 text-sm">
            {isRange ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" value={minVal} onChange={(e) => setMinVal(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-md p-2 w-1/2 text-gray-300" />
                  <input type="number" placeholder="Max" value={maxVal} onChange={(e) => setMaxVal(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-md p-2 w-1/2 text-gray-300" />
                </div>
                <button onClick={applyRange} className="w-full bg-yellow-500 text-black rounded-md py-2 text-sm font-medium">Apply</button>
              </div>
            ) : (
              <div className="space-y-1 max-h-44 overflow-auto">
                {options.map(opt => {
                  const active = selected.includes(opt);
                  return (
                    <div key={opt} onClick={() => onToggleOption(opt)} className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${active ? "bg-yellow-500/10 text-yellow-400" : "hover:bg-gray-800"}`}>
                      <div className={`w-4 h-4 rounded-sm border ${active ? "bg-yellow-500 border-yellow-500" : "border-gray-600"}`}>{active && <svg width="10" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>}</div>
                      <div className="text-sm">{opt}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------- NEW INFLUENCER CARD (Updated for new data) -------------------
function InfluencerCard({ item, onClick }) {
  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const getGenderColor = (gender) =>
    gender === "female"
      ? "bg-pink-500/20 text-pink-400 border-pink-500/30"
      : gender === "male"
      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
      : "bg-purple-500/20 text-purple-400 border-purple-500/30";

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -6 }}
      onClick={() => onClick(item, "influencer")}
      className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-xl transition-all duration-400 cursor-pointer group hover:border-yellow-500/50"
    >
      {/* Image Section (Perfect Sizing) */}
      <div className="relative w-full h-60 overflow-hidden bg-gray-900">
        {item.image && item.image !== "-" ? (
          <SafeImage
            src={item.image}
            alt={item.name}
            width={1200}
            height={800}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2 shadow-lg">
                {getInitials(item.name)}
              </div>
              <div className="text-white font-semibold text-sm">{item.name}</div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name + IG */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-1">
              {item.name}
            </h3>

            <div className="flex items-center gap-2 mt-1">
              <LocationIcon />
              <span className="text-xs text-gray-400 line-clamp-1">
                {item.location || "Location not specified"}
              </span>
            </div>
          </div>

          <a
            href={item.instagramLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0 p-2 bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
          >
            <InstaIcon />
          </a>
        </div>

        {/* Gender + Style */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getGenderColor(
              item.gender
            )}`}
          >
            {item.gender === "female"
              ? "♀ Female"
              : item.gender === "male"
              ? "♂ Male"
              : "Other"}
          </span>

          {item.contentStyle && item.contentStyle !== "-" && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600">
              {item.contentStyle}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50 transition-colors group-hover:border-gray-600">
            <div className="text-lg font-bold text-yellow-400">
              {item.followers && item.followers !== "-" ? item.followers : "N/A"}
            </div>
            <div className="text-xs text-gray-400 mt-1">Followers</div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50 transition-colors group-hover:border-gray-600">
            <div className="text-lg font-bold text-green-400">
              {item.engagement && item.engagement !== "-" ? item.engagement : "N/A"}
            </div>
            <div className="text-xs text-gray-400 mt-1">Engagement</div>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full mt-4 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-yellow-500 hover:to-orange-500 text-gray-300 hover:text-black font-medium py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
          View Profile
        </button>
      </div>
    </motion.div>
  );
}




// ------------------- REST OF THE CARD COMPONENTS (UNCHANGED) -------------------
function MagazineCard({ item, onClick }) {
  const fmt = (n) => {
    if (!n && n !== 0) return "-";
    if (typeof n === "string") return n;
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(0) + "K";
    return n;
  };

  // Starting price use minBudget or fallback 25000
  const starting = item.minBudget || item.startingPrice || 25000;

  return (
    <motion.div whileHover={{ scale: 1.02, y: -4 }} onClick={() => onClick(item, "magazine")} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-400 cursor-pointer group">
      <div className="relative h-44 w-full overflow-hidden">
        <SafeImage src={item.image} alt={item.name} width={700} height={420} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
        <p className="text-sm text-gray-400">{item.genre} • {item.frequency}</p>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-sm text-yellow-400 font-semibold">{fmt(item.readership)}</div>
            <div className="text-xs text-gray-400">Total Readership</div>
          </div>
          <div>
            <div className="text-sm text-yellow-400 font-semibold">{item.adRate || "-"}</div>
            <div className="text-xs text-gray-400">Avg. Ad Rate</div>
          </div>
          <div>
            <div className="text-sm text-yellow-400 font-semibold">₹{Number(starting).toLocaleString()}</div>
            <div className="text-xs text-gray-400">Starting Price</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NewspaperCard({ item, onClick }) {
  const fmt = (v) => {
    if (!v && v !== 0) return "-";
    if (typeof v === "string") return v;
    if (v >= 1000000) return (v / 1000000).toFixed(1) + "M";
    if (v >= 1000) return (v / 1000).toFixed(0) + "K";
    return v;
  };

  const starting = item.minBudget || item.startingPrice || 25000;

  return (
    <motion.div whileHover={{ scale: 1.02, y: -4 }} onClick={() => onClick(item, "newspaper")} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-400 cursor-pointer group">
      <div className="relative h-44 w-full overflow-hidden">
        <SafeImage src={item.image} alt={item.name} width={700} height={420} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
        <p className="text-sm text-gray-400">{item.genre} • {item.language}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-sm text-yellow-400 font-semibold">{fmt(item.circulation || "-")}</div>
            <div className="text-xs text-gray-400">Daily Circulation</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-yellow-400 font-semibold">{fmt(item.readership)}</div>
            <div className="text-xs text-gray-400">Total Readership</div>
          </div>
          <div className="text-center mt-3">
            <div className="text-sm text-yellow-400 font-semibold">{item.adRate || "-"}</div>
            <div className="text-xs text-gray-400">Avg. Ad Rate</div>
          </div>
          <div className="text-center mt-3">
            <div className="text-sm text-yellow-400 font-semibold">₹{Number(starting).toLocaleString()}</div>
            <div className="text-xs text-gray-400">Starting Price</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DigitalCard({ item, onClick }) {
  const starting = item.minBudget || item.startingPrice || 25000;
  return (
    <motion.div whileHover={{ scale: 1.02, y: -4 }} onClick={() => onClick(item, "digital")} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-400 cursor-pointer group">
      <div className="relative h-44 w-full overflow-hidden">
        <SafeImage src={item.image} alt={item.name} width={700} height={420} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
        <p className="text-sm text-gray-400">{item.platformType || "Digital"}</p>

        <div className="mt-4 grid grid-cols-1 gap-2">
          <div className="text-center">
            <div className="text-sm text-yellow-400 font-semibold">{item.reach || "-"}</div>
            <div className="text-xs text-gray-400">Potential Audience</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-yellow-400 font-semibold">{item.adRate || item.pricingModel || item.formats?.[0] || "-"}</div>
            <div className="text-xs text-gray-400">Primary Pricing Model</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-yellow-400 font-semibold">₹{Number(starting).toLocaleString()}</div>
            <div className="text-xs text-gray-400">Recommended Starting Budget</div>
          </div>
        </div>
      </div>
    </motion.div>
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
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/75" onClick={onClose} />
        <motion.div initial={{ y: 20, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.96 }} className="relative bg-gray-900 border border-yellow-500/20 rounded-2xl max-w-2xl w-full p-6 mx-4">
          <button onClick={onClose} className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300">✕</button>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <SafeImage src={item.image} alt={item.name} width={300} height={300} className="rounded-lg object-cover" />
            </div>

            <div className="flex-1 text-white">
              <h2 className="text-2xl font-bold text-yellow-400">{item.name}</h2>
              <p className="text-gray-300 mt-2">
                {type === "influencer" && `${item.category || 'Influencer'} • ${item.location || 'Location not specified'}`}
                {type === "magazine" && `${item.genre} • ${item.frequency}`}
                {type === "newspaper" && `${item.genre} • ${item.language}`}
                {type === "digital" && (item.platformType || item.formats?.join(", "))}
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
                {type === "influencer" && (
                  <>
                    <div>
                      <div className="text-yellow-400 font-semibold">{format(item.followers)}</div>
                      <div className="text-xs text-gray-400">Followers</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-semibold">{item.engagement || "-"}</div>
                      <div className="text-xs text-gray-400">Engagement</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-semibold capitalize">{item.gender || "-"}</div>
                      <div className="text-xs text-gray-400">Gender</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-semibold">{item.location || "-"}</div>
                      <div className="text-xs text-gray-400">Location</div>
                    </div>
                    <div className="col-span-full mt-2">
                      <a href={item.instagramLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium">
                        <InstaIcon /> View on Instagram
                      </a>
                    </div>
                  </>
                )}

                {type === "magazine" && (
                  <>
                    <div>
                      <div className="text-yellow-400 font-semibold">{format(item.readership)}</div>
                      <div className="text-xs text-gray-400">Total Readership</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-semibold">{item.adRate || "-"}</div>
                      <div className="text-xs text-gray-400">Avg. Ad Rate</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-semibold">₹{Number(item.minBudget || item.startingPrice || 25000).toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Starting Price</div>
                    </div>
                    <div className="col-span-full mt-2">
                      <a href={item.websiteLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium">
                        Visit Website <ExternalIcon />
                      </a>
                    </div>
                  </>
                )}

                {type === "newspaper" && (
                  <>
                    <div>
                      <div className="text-yellow-400 font-semibold">{format(item.circulation || "-")}</div>
                      <div className="text-xs text-gray-400">Daily Circulation</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-semibold">{format(item.readership)}</div>
                      <div className="text-xs text-gray-400">Total Readership</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-semibold">{item.adRate || "-"}</div>
                      <div className="text-xs text-gray-400">Avg. Ad Rate</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-semibold">₹{Number(item.minBudget || item.startingPrice || 25000).toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Starting Price</div>
                    </div>
                    <div className="col-span-full mt-2">
                      <a href={item.websiteLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium">
                        Visit Website <ExternalIcon />
                      </a>
                    </div>
                  </>
                )}

                {type === "digital" && (
                  <>
                    <div>
                      <div className="text-yellow-400 font-semibold">{item.reach || "-"}</div>
                      <div className="text-xs text-gray-400">Potential Audience</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-semibold">{item.adRate || item.pricingModel || "-"}</div>
                      <div className="text-xs text-gray-400">Primary Pricing Model</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-semibold">₹{Number(item.minBudget || 25000).toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Recommended Starting Budget</div>
                    </div>
                    <div className="col-span-full mt-2">
                      <a href={item.websiteLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium">
                        Explore Platform <ExternalIcon />
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ------------------- Main Component -------------------
export default function CreatorsSection() {
  const [filter, setFilter] = useState("influencer");
  const [selected, setSelected] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [activeFilters, setActiveFilters] = useState({}); // { key: [values] or ["min-max"] }

  // NEW STATE FOR INFLUENCER FILTERS
  const [influencerSearch, setInfluencerSearch] = useState("");
  const [influencerGenderFilter, setInfluencerGenderFilter] = useState([]);
  const [influencerLocationFilter, setInfluencerLocationFilter] = useState([]);

  const sections = [
    { label: "Influencers", key: "influencer", data: influencersData },
    { label: "Magazines", key: "magazine", data: magazinesData },
    { label: "Newspapers", key: "newspaper", data: newspapersData },
    { label: "Digital Platforms", key: "digital", data: digitalPlatformsData },
  ];

  const filterMenus = {
    influencer: [
      { key: "category", title: "Category", options: ["Health & Fitness", "Real Estate", "Education", "Makeup & Nailart", "Jewellery", "Food & Restaurant"] },
      { key: "platform", title: "Platform", options: ["Instagram", "Facebook", "LinkedIn", "Twitter"] },
      { key: "budget", title: "Budget Range", isRange: true },
      { key: "gender", title: "Gender", options: ["Male", "Female", "Other"] },
      { key: "followers", title: "Followers Range", options: ["Micro (1K-100K)", "Macro (100K-1M)", "Mega (1M+)"] },
    ],
    magazine: [
      { key: "genre", title: "Genre", options: ["Fashion", "Business", "Lifestyle", "Technology", "Travel"] },
      { key: "frequency", title: "Frequency", options: ["Weekly", "Monthly", "Quarterly"] },
      { key: "language", title: "Language", options: ["English", "Hindi"] },
      { key: "budget", title: "Budget Range", isRange: true },
    ],
    newspaper: [
      { key: "genre", title: "Genre", options: ["National", "Regional", "Business", "Local", "Tabloid"] },
      { key: "language", title: "Language", options: ["English", "Hindi", "Marathi"] },
      { key: "budget", title: "Budget Range", isRange: true },
      { key: "circulation", title: "Circulation Range", options: ["Under 50,000", "50,000 - 500,000", "500,000+"] },
    ],
    digital: [
      { key: "platform", title: "Platform", options: ["Google", "Meta (FB/Insta)", "LinkedIn", "E-commerce"] },
      { key: "format", title: "Ad Format", options: ["Search Ads", "Display Ads", "Video Ads", "Social Media"] },
      { key: "budget", title: "Budget Range", isRange: true },
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
    setInfluencerSearch("");
    setInfluencerGenderFilter([]);
    setInfluencerLocationFilter([]);
  };

  // NEW: Filter logic for influencers with search and pill filters
  const filteredInfluencers = influencersData.filter(influencer => {
    // Search filter
    const matchesSearch = influencerSearch === "" || 
                         influencer.name.toLowerCase().includes(influencerSearch.toLowerCase()) ||
                         influencer.location?.toLowerCase().includes(influencerSearch.toLowerCase());

    // Gender filter
    const matchesGender = influencerGenderFilter.length === 0 || 
                         influencerGenderFilter.includes(influencer.gender);

    // Location filter
    const matchesLocation = influencerLocationFilter.length === 0 || 
                           influencerLocationFilter.some(loc => 
                             influencer.location?.includes(loc)
                           );

    return matchesSearch && matchesGender && matchesLocation;
  });

  // Available filter options for influencers
  const genderOptions = ['male', 'female'];
  const locationOptions = ['Mumbai', 'Delhi', 'Chembur', 'Navi Mumbai', 'New Delhi', 'Bombay', 'Lucknow', 'Mangalore'];

  const toggleInfluencerFilter = (filterType, value) => {
    if (filterType === 'gender') {
      setInfluencerGenderFilter(prev => 
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else if (filterType === 'location') {
      setInfluencerLocationFilter(prev => 
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    }
  };

  // simple filtering logic for other sections — extend as needed:
  function passesFilters(item, sectionKey) {
    const active = activeFilters;
    
    if (sectionKey === "influencer") {
      // Use the new influencer filtering logic
      return true; // This is handled separately above
    }

    if (sectionKey === "magazine") {
      if (active.genre && active.genre.length && !active.genre.includes(item.genre)) return false;
      if (active.frequency && active.frequency.length && !active.frequency.includes(item.frequency)) return false;
      if (active.language && active.language.length && !active.language.includes(item.language)) return false;
      if (active.budget && active.budget.length) {
        const v = active.budget[0].split("-").map(Number); const min = v[0], max = v[1];
        if (item.minBudget && (item.minBudget < min || item.minBudget > max)) return false;
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
    }

    if (sectionKey === "digital") {
      if (active.platform && active.platform.length) {
        if (!active.platform.includes(item.name) && !active.platform.includes(item.platformType)) {
          // loose match — skip strictness
        }
      }
      if (active.format && active.format.length) {
        const ok = item.formats?.some(f => active.format.includes(f));
        if (!ok) return false;
      }
    }

    return true;
  }

  function capitalize(s) { return (s && s[0]?.toUpperCase() + s.slice(1)) || s; }

  // Render cards per section
  const cardsForSection = (section) => {
    if (section.key === "influencer") {
      return filteredInfluencers.map(item => (
        <InfluencerCard key={item.id} item={item} onClick={(i,t)=>{ setSelected(i); setSelectedType(t); }} />
      ));
    }

    const dataToUse = section.data.filter(item => passesFilters(item, section.key));
    
    return dataToUse.map(item => {
      if (section.key === "magazine") return <MagazineCard key={item.id} item={item} onClick={(i,t)=>{ setSelected(i); setSelectedType(t); }} />;
      if (section.key === "newspaper") return <NewspaperCard key={item.id} item={item} onClick={(i,t)=>{ setSelected(i); setSelectedType(t); }} />;
      if (section.key === "digital") return <DigitalCard key={item.id} item={item} onClick={(i,t)=>{ setSelected(i); setSelectedType(t); }} />;
      return null;
    });
  };

  const hasActiveInfluencerFilters = influencerSearch || influencerGenderFilter.length > 0 || influencerLocationFilter.length > 0;
  const hasActiveOtherFilters = Object.keys(activeFilters).length > 0;
  const showClearFilters = hasActiveInfluencerFilters || hasActiveOtherFilters;

  return (
    <section className="py-20 bg-black text-white" id="creators">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-6 mt-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">
            Our Creators & Media Partners
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-2">
            Tap any card to view detailed info. Use filters to narrow results.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 mb-8">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => {
                setFilter(s.key);
                setActiveFilters({});
                setInfluencerSearch("");
                setInfluencerGenderFilter([]);
                setInfluencerLocationFilter([]);
              }}
              className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-300 ${
                filter === s.key
                  ? "bg-yellow-500 text-black border-yellow-500 shadow-lg"
                  : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* SIMPLIFIED FILTERS FOR INFLUENCERS */}
{filter === "influencer" && (
  <div className="mb-8 space-y-4">
    {/* Simple Search Only */}
    <div className="flex justify-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={influencerSearch}
          onChange={(e) => setInfluencerSearch(e.target.value)}
          placeholder="Search influencers by name or location..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent text-sm"
        />
      </div>
    </div>

    {/* Simple Filter Row */}
    <div className="flex flex-wrap justify-center gap-2">
      <select 
        value={influencerGenderFilter[0] || ""}
        onChange={(e) => setInfluencerGenderFilter(e.target.value ? [e.target.value] : [])}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
      >
        <option value="">All Genders</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>

      <select 
        value={influencerLocationFilter[0] || ""}
        onChange={(e) => setInfluencerLocationFilter(e.target.value ? [e.target.value] : [])}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
      >
        <option value="">All Locations</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
      </select>
    </div>

    {/* Simple Results Count */}
    <div className="text-center">
      <p className="text-gray-400 text-sm">
        Showing {filteredInfluencers.length} of {influencersData.length} influencers
      </p>
    </div>
  </div>
)}

        {/* ORIGINAL FILTERS FOR OTHER SECTIONS */}
        {filter !== "influencer" && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {filterMenus[filter].map(menu => (
              <DropdownFilter
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
        )}

        {/* Clear Filters Button */}
        {showClearFilters && (
          <div className="flex justify-center mb-6">
            <button onClick={clearFilters} className="px-4 py-2 rounded-md bg-yellow-500 text-black text-sm font-medium hover:bg-yellow-400 transition-colors">
              Clear All Filters
            </button>
          </div>
        )}

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsForSection(sections.find(s => s.key === filter))}
        </div>

        {/* Empty State for Influencers */}
        {filter === "influencer" && filteredInfluencers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No influencers found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filters to see more results.
            </p>
            <button
              onClick={clearFilters}
              className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <InfoModal open={!!selected} item={selected} type={selectedType} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ------------------- YOUR UPDATED INFLUENCER DATA ------------------- */
const influencersData = [
  { id: 1, name: "Himika Bose", location: "Delhi - Mumbai", instagramLink: "https://www.instagram.com/himika_bose/", gender: "female", contentStyle: "Lifestyle", followers: "102K", engagement: "0.37%", image: "Creators/himika.webp" },
  { id: 2, name: "Natasha Patel", location: "-", instagramLink: "https://www.instagram.com/natasshapatel/", gender: "female", contentStyle: "Lifestyle", followers: "146K", engagement: "1.05%", image: "Creators/Natasha.jpeg" },
  { id: 3, name: "Saanchi Gilani", location: "Mumbai", instagramLink: "https://www.instagram.com/saanchigilani/", gender: "female", contentStyle: "Fashion", followers: "98K", engagement: "5.36%", image: "Creators/Saanchi.jpg" },
  { id: 4, name: "Isha Sutaria", location: "Mumbai", instagramLink: "https://www.instagram.com/isha.sutaria/", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 5, name: "Alisha Pekha", location: "Delhi - Mumbai", instagramLink: "https://www.instagram.com/theallyedit/", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 6, name: "Vitallian Angel", location: "-", instagramLink: "https://www.instagram.com/vitallianangel/", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 7, name: "Prasad", location: "Mumbai", instagramLink: "https://www.instagram.com/kaccha.limboo/", gender: "male", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 8, name: "Sonam Babani", location: "Mumbai", instagramLink: "https://www.instagram.com/fashioneiress/", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 9, name: "Shyrin Anicka", location: "Delhi - Mumbai", instagramLink: "https://www.instagram.com/shyrinn_anicka?igsh=eW0wb2VmYjNidG9x", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 10, name: "Sahil Khattar", location: "Mumbai", instagramLink: "https://www.instagram.com/sahilkhattar/", gender: "male", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 11, name: "Vedika Pinto", location: "Mumbai", instagramLink: "https://www.instagram.com/vedikapinto/", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 12, name: "Nakul Mehta", location: "Mumbai", instagramLink: "https://www.instagram.com/nakuulmehta/", gender: "male", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 13, name: "Visha Vira", location: "Mumbai", instagramLink: "https://www.instagram.com/vishaviraaa?igsh=MTluaXl4eDNwa3RreA==", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 14, name: "Kajal Paigwar", location: "Chembur", instagramLink: "https://www.instagram.com/kajal_paigwar14._/", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 15, name: "Yuvika Abrol", location: "Mumbai - Delhi", instagramLink: "https://www.instagram.com/yuvika.abrol/", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 16, name: "Kishwer Merchantt", location: "Mumbai", instagramLink: "https://www.instagram.com/kishwersmerchantt/", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 17, name: "Sheen Rawat", location: "New Delhi | Mumbai", instagramLink: "https://www.instagram.com/sheenrawat", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 18, name: "Hitakshi Tewari", location: "Bombay | Lucknow", instagramLink: "https://www.instagram.com/hitakkshi", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 19, name: "Shruthi G Rao", location: "Mumbai / Mangalore", instagramLink: "https://www.instagram.com/ishruthigrao_", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 20, name: "Jya Mishra", location: "Mumbai", instagramLink: "https://www.instagram.com/jyamishra1", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 21, name: "Jyoti Rolla", location: "Mumbai", instagramLink: "https://www.instagram.com/jyotirolla", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 22, name: "Paulomi Shital", location: "Mumbai", instagramLink: "https://www.instagram.com/paulomishital", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 23, name: "Priyanka Negi", location: "Mumbai", instagramLink: "https://www.instagram.com/_priyankanegi_", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 24, name: "Ria Pednekar", location: "-", instagramLink: "https://www.instagram.com/riapednekar03", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 25, name: "Aachal Punjabi", location: "Mumbai", instagramLink: "https://www.instagram.com/aanchpunjabi", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 26, name: "Mansi Vanage", location: "Mumbai", instagramLink: "https://www.instagram.com/mansivanage", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 27, name: "Nidhi Shetty", location: "Mumbai", instagramLink: "https://www.instagram.com/nidhi_shetty13", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 28, name: "Rivya Rai", location: "Mumbai", instagramLink: "https://www.instagram.com/rivyarai_27", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 29, name: "Aavya Gupta", location: "Mumbai", instagramLink: "https://www.instagram.com/aavyagupta_/", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 30, name: "Sneha Malviya", location: "Mumbai", instagramLink: "https://www.instagram.com/theactual_sneha", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 31, name: "Ranjana Godara", location: "Mumbai", instagramLink: "https://www.instagram.com/ranjanagodaraofficial/", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 32, name: "Anukriti Bhatia", location: "Navi Mumbai", instagramLink: "https://www.instagram.com/anukritibhatia/profilecard", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 33, name: "Deeksha Suryawanshi", location: "Mumbai", instagramLink: "https://www.instagram.com/deeksha01_", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 34, name: "Miss Singh", location: "Mumbai", instagramLink: "https://www.instagram.com/miss_singhww", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 35, name: "Divya Dhoke", location: "-", instagramLink: "https://www.instagram.com/divya_dhoke", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 36, name: "Helly Shah", location: "Mumbai", instagramLink: "https://www.instagram.com/hellyshahofficial", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 37, name: "Krati Saini", location: "Mumbai", instagramLink: "https://www.instagram.com/kratisaini_", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 38, name: "Kritika Dagar", location: "Mumbai", instagramLink: "https://www.instagram.com/kritikadagar21", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 39, name: "Sakkshi Mhadolkar", location: "Mumbai", instagramLink: "https://www.instagram.com/sakkshi_mhadolkar", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 40, name: "Nita Shilimkar", location: "Mumbai", instagramLink: "https://www.instagram.com/nita_shilimkar", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 41, name: "Rits Badiani", location: "Mumbai", instagramLink: "https://www.instagram.com/rits_badiani", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
  { id: 42, name: "Navika Kotia", location: "Mumbai", instagramLink: "https://www.instagram.com/navika_kotia", gender: "female", contentStyle: "-", followers: "-", engagement: "-", image: "-" },
];

/* ------------------- REST OF YOUR ORIGINAL DATA (UNCHANGED) ------------------- */
const magazinesData = [
  { id: 1, name: "Vogue India", websiteLink: "https://www.vogue.in/", genre: "Fashion", readership: 1200000, frequency: "Monthly", adRate: "₹3,50,000/page", minBudget: 350000, language: "English", recommended: true, image: "images/Vogue India.jpg" },
  { id: 2, name: "Filmfare", websiteLink: "https://www.filmfare.com/", genre: "Lifestyle", readership: 1400000, frequency: "Monthly", adRate: "₹4,00,000/page", minBudget: 400000, language: "English", recommended: true, image: "images/filmfare.jpg" },
  { id: 3, name: "Business Today", websiteLink: "https://www.businesstoday.in/", genre: "Business", readership: 800000, frequency: "Weekly", adRate: "₹2,75,000/page", minBudget: 275000, language: "English", recommended: true, image: "images/business today.jpg" },
  { id: 4, name: "Femina", websiteLink: "https://www.femina.in/", genre: "Lifestyle", readership: 1100000, frequency: "Monthly", adRate: "₹3,00,000/page", minBudget: 300000, language: "English", recommended: false, image: "images/femina.jpg" },
  { id: 5, name: "Digit", websiteLink: "https://www.digit.in/", genre: "Technology", readership: 300000, frequency: "Monthly", adRate: "₹1,50,000/page", minBudget: 150000, language: "English", recommended: false, image: "images/digit.jpg" },
  { id: 6, name: "Outlook Traveller", websiteLink: "https://www.outlookindia.com/traveller/", genre: "Travel", readership: 450000, frequency: "Monthly", adRate: "₹2,00,000/page", minBudget: 200000, language: "English", recommended: false, image: "images/Outlook Traveller.jpg" },
  { id: 7, name: "Grihshobha", websiteLink: "#", genre: "Lifestyle", readership: 5000000, frequency: "Monthly", adRate: "₹1,80,000/page", minBudget: 180000, language: "Hindi", recommended: true, image: "images/grihshobha.jpg" },
  { id: 8, name: "Forbes India", websiteLink: "https://www.forbesindia.com/", genre: "Business", readership: 500000, frequency: "Monthly", adRate: "₹5,00,000/page", minBudget: 500000, language: "English", recommended: false, image: "images/Forbes India.jpg" }
];

const newspapersData = [
  { id: 1, name: "The Times of India", websiteLink: "https://timesofindia.indiatimes.com/", genre: "National", circulation: 2800000, readership: "7.6M", adRate: "₹2,500/sq.cm", minBudget: 25000, location: "National", language: "English", recommended: true, image: "images/The Times of India.jpg" },
  { id: 2, name: "Hindustan Times", websiteLink: "https://www.hindustantimes.com/", genre: "National", circulation: 1400000, readership: "4.5M", adRate: "₹1,800/sq.cm", minBudget: 18000, location: "National", language: "English", recommended: true, image: "images/Hindustan Times.jpg" },
  { id: 3, name: "The Hindu", websiteLink: "https://www.thehindu.com/", genre: "National", circulation: 1200000, readership: "4.1M", adRate: "₹1,600/sq.cm", minBudget: 16000, location: "National", language: "English", recommended: false, image: "images/The Hindu.jpg" },
  { id: 4, name: "Dainik Jagran", websiteLink: "https://www.jagran.com/", genre: "National", circulation: 3600000, readership: "16.4M", adRate: "₹2,800/sq.cm", minBudget: 28000, location: "National", language: "Hindi", recommended: true, image: "images/Dainik Jagran.jpg" },
  { id: 5, name: "Lokmat", websiteLink: "https://www.lokmat.com/", genre: "Regional", circulation: 1300000, readership: "18M", adRate: "₹1,500/sq.cm", minBudget: 15000, location: "Maharashtra", language: "Marathi", recommended: true, image: "images/Lokmat.jpg" },
  { id: 6, name: "The Economic Times", websiteLink: "https://economictimes.indiatimes.com/", genre: "Business", circulation: 800000, readership: "2.5M", adRate: "₹2,200/sq.cm", minBudget: 22000, location: "National", language: "English", recommended: false, image:"images/The Economic Times.jpg" },
  { id: 7, name: "Nagpur Today", websiteLink: "#", genre: "Local", circulation: 45000, readership: "150K", adRate: "₹300/sq.cm", minBudget: 3000, location: "Nagpur", language: "English", recommended: false, image: "images/Nagpur Today.jpg" },
  { id: 8, name: "Mumbai Mirror", websiteLink: "#", genre: "Tabloid", circulation: 400000, readership: "1.2M", adRate: "₹900/sq.cm", minBudget: 9000, location: "Mumbai", language: "English", recommended: false, image: "images/Mumbai Mirror.jpg" }
];

const digitalPlatformsData = [
  { id: 1, name: "Google Ads", websiteLink: "https://ads.google.com/", platformType: "Google", reach: "90% of Internet Users", reachVal: 90, formats: ["Search", "Display", "Video"], adRate: "Pay-Per-Click", minBudget: 25000, recommended: true, image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg" },
  { id: 2, name: "Meta Ads", websiteLink: "https://www.facebook.com/business/ads", platformType: "Meta", reach: "3.0B+ Monthly Users", reachVal: 80, formats: ["Social", "Video", "Display"], adRate: "Pay-Per-Impression", minBudget: 20000, recommended: true, image: "images/meta.jpg" },
  { id: 3, name: "LinkedIn Ads", websiteLink: "https://www.linkedin.com/business/marketing/ads", platformType: "LinkedIn", reach: "1B+ Professionals", reachVal: 50, formats: ["Social", "Display"], adRate: "Pay-Per-Click", minBudget: 35000, recommended: false, image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" },
  { id: 4, name: "YouTube Ads", websiteLink: "https://www.youtube.com/ads/", platformType: "Google", reach: "2.5B+ Monthly Users", reachVal: 75, formats: ["Video"], adRate: "Pay-Per-View", minBudget: 30000, recommended: true, image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" },
  { id: 5, name: "Amazon Ads", websiteLink: "https://advertising.amazon.com/", platformType: "E-commerce", reach: "300M+ Customers", reachVal: 60, formats: ["Display", "Search"], adRate: "Pay-Per-Click", minBudget: 40000, recommended: false, image: "images/Amazon.jpg" },
  { id: 6, name: "Programmatic Display", websiteLink: "#", platformType: "Programmatic", reach: "Vast Ad Exchanges", reachVal: 85, formats: ["Display", "Video"], adRate: "CPM Bidding", minBudget: 50000, recommended: false, image: "https://i.imgur.com/8aP2B3y.png" }
];