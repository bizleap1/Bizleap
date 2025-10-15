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

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-800 text-gray-400 ${className}`} style={{ width, height }}>
        ⚠️
      </div>
    );
  }

  if (isExternal) {
    // use plain img tag so next/image domain restrictions won't crash
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

// ------------------- Dropdown Filter (per-instance open state) -------------------
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

// ------------------- Card components with default info per section -------------------
function InfluencerCard({ item, onClick }) {
  const format = (n) => {
    if (!n && n !== 0) return "-";
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(0) + "K";
    return String(n);
  };

  return (
    <motion.div whileHover={{ scale: 1.02, y: -4 }} onClick={() => onClick(item, "influencer")} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-400 cursor-pointer group">
      <div className="relative h-44 w-full overflow-hidden">
        <SafeImage src={item.image} alt={item.name} width={700} height={420} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{item.name}</h3>
            <p className="text-sm text-gray-400">{item.category}</p>
          </div>
          <a href={item.instagramLink} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 bg-gray-800 rounded-full hover:bg-yellow-500/10 transition-colors">
            <InstaIcon />
          </a>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-sm text-yellow-400 font-semibold">{format(item.followers)}</div>
            <div className="text-xs text-gray-400">Followers</div>
          </div>
          <div>
            <div className="text-sm text-yellow-400 font-semibold">{item.engagement || "-"}</div>
            <div className="text-xs text-gray-400">Engagement</div>
          </div>
          <div>
            <div className="text-sm text-yellow-400 font-semibold">{item.avgViews || "-"}</div>
            <div className="text-xs text-gray-400">Avg Views</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

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
                {type === "influencer" && item.category}
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
                      <div className="text-yellow-400 font-semibold">{item.avgViews || "-"}</div>
                      <div className="text-xs text-gray-400">Avg Views</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-semibold">₹{Number(item.minBudget || 0).toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Min Budget</div>
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

  const clearFilters = () => setActiveFilters({});

  // simple filtering logic — extend as needed:
  function passesFilters(item, sectionKey) {
    const active = activeFilters;
    // Category / genre filter
    if (sectionKey === "influencer") {
      if (active.category && active.category.length) {
        if (!active.category.includes(item.category)) return false;
      }
      if (active.platform && active.platform.length) {
        const has = item.platforms?.some(p => active.platform.includes(capitalize(p))) || false;
        // item.platforms stored lowercase in your data; we accept either
        if (!has) return false;
      }
      if (active.gender && active.gender.length) {
        if (!active.gender.includes(item.gender)) return false;
      }
      if (active.followers && active.followers.length) {
        // check ranges
        const matches = active.followers.some(r => {
          if (r === "Micro (1K-100K)" && item.followers >= 1000 && item.followers <= 100000) return true;
          if (r === "Macro (100K-1M)" && item.followers > 100000 && item.followers <= 1000000) return true;
          if (r === "Mega (1M+)" && item.followers > 1000000) return true;
          return false;
        });
        if (!matches) return false;
      }
      if (active.budget && active.budget.length) {
        const v = active.budget[0].split("-").map(Number);
        const min = v[0], max = v[1];
        if (item.minBudget && (item.minBudget < min || item.minBudget > max)) return false;
      }
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
    return section.data.filter(item => passesFilters(item, section.key)).map(item => {
      if (section.key === "influencer") return <InfluencerCard key={item.id} item={item} onClick={(i,t)=>{ setSelected(i); setSelectedType(t); }} />;
      if (section.key === "magazine") return <MagazineCard key={item.id} item={item} onClick={(i,t)=>{ setSelected(i); setSelectedType(t); }} />;
      if (section.key === "newspaper") return <NewspaperCard key={item.id} item={item} onClick={(i,t)=>{ setSelected(i); setSelectedType(t); }} />;
      if (section.key === "digital") return <DigitalCard key={item.id} item={item} onClick={(i,t)=>{ setSelected(i); setSelectedType(t); }} />;
      return null;
    });
  };

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


        {/* Filters row for active section */}
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
          {Object.keys(activeFilters).length > 0 && (
            <button onClick={clearFilters} className="px-4 py-2 rounded-md bg-yellow-500 text-black text-sm font-medium">Clear Filters</button>
          )}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsForSection(sections.find(s => s.key === filter))}
        </div>
      </div>

      {/* Modal */}
      <InfoModal open={!!selected} item={selected} type={selectedType} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ------------------- Your data (unchanged) ------------------- */
const influencersData = [
            { id: 1, name: "academypath.in", instagramLink: "https://www.instagram.com/academypath.in/", category: "Education", followers: 14, engagement: "1%", avgViews: "1,614", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/image_da3e27.png"},
       
            { id: 2, name: "ntskatesworld", instagramLink: "https://www.instagram.com/ntskatesworld/", category: "Health & Fitness", followers: 20100, engagement: " 1.59%", avgViews: "8,500", budget: "On Request", minBudget: 1200000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: true, image: "images/Nt Skates world.jpeg" },
            { id: 3, name: "playcreative.in", instagramLink: "https://www.instagram.com/playcreative.in/", category: "Jewellery", followers: 33500, engagement: " 1.44%", avgViews: "4,500", budget: "On Request", minBudget:  1000000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: true, image: "images/playcreative.in.jpg"},
            { id: 4, name: "marvelfitnessjaitala", instagramLink: "https://www.instagram.com/marvelfitnessjaitala/", category: "Health & Fitness", followers: 4654, engagement: "1,14%", avgViews: "1,614", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: true, image: "images/marvelfitnessjaitala.jpg" },
            { id: 5, name: "ntx_brand", instagramLink: "https://www.instagram.com/ntx_brand/", category: "Education", followers: 4659, engagement: "1%", avgViews: "1,614", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: true, image: "images/ntx_brand.jpg" },
            { id: 6, name: "kpmakeoverbykajal", instagramLink: "https://www.instagram.com/kpmakeoverbykajal/", category: "Makeup & Nailart", followers: 6845, engagement: "1.20%", avgViews: "1,614", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/kp make over .png"},
            { id: 7, name: "bizleap.in", instagramLink: "https://www.instagram.com/bizleap.in/", category: "Bussiness", followers: 871, engagement: "1%", avgViews: "1,614", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: true, image: "images/bizleap.jpg"},
            { id: 8, name: "ssitnagpur.in", instagramLink: "https://www.instagram.com/ssitnagpur.in/", category: "Education", followers: 183, engagement: "-", avgViews: "-", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/SSIT.PNG" },
            { id: 9, name: "taubys", instagramLink: "https://www.instagram.com/taubys/", category: "Food & Restaurant", followers: 829, engagement: "1%", avgViews: "1,614", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/taubys.jpg"},
            { id: 10, name: "barcode.ytl", instagramLink: "https://www.instagram.com/barcode.ytl/", category: "Food & Restaurant", followers: 150, engagement: "-", avgViews: "-", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/barcode.ytl.jpg"},
            { id: 11, name: "tanvibhandari.artistry", instagramLink: "https://www.instagram.com/tanvibhandari.artistry/", category: "Makeup & Nailart", followers: 639, engagement: "-", avgViews: "-", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/artistry.jpg"},
            { id: 12, name: "tulithegrand", instagramLink: "https://www.instagram.com/tulithegrand/", category: "Food & Restaurant", followers: 264, engagement: "-", avgViews: "-", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/tulithegrand.jpg"},
            { id: 13, name: "tunwal_emotors", instagramLink: "https://www.instagram.com/tunwal_emotors/", category: "bussiness", followers: 6313, engagement: "-", avgViews: "-", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/tunwal_emotors.jpg"},
            { id: 14, name: "meherinfrasolutions", instagramLink: "https://www.instagram.com/meherinfrasolutions/", category: "Real Estate", followers: 291, engagement: " -", avgViews: "-", budget: "On Request", minBudget: 1200000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/meherinfrasolutions.jpg" },
            { id: 15, name: "kathmandujholmomo", instagramLink: "https://www.instagram.com/kathmandujholmomo/", category: "Food & Restaurant", followers: 369, engagement: " -", avgViews: "-", budget: "On Request", minBudget: 1200000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/kathmandujholmomo.jpg" },
            { id: 16, name: "quik_fizzy", instagramLink: "https://www.instagram.com/quik_fizzy/", category: "Food & Restaurant", followers: 484, engagement: " -", avgViews: "-", budget: "On Request", minBudget: 1200000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/quik_fizzy.jpg" },
            { id: 17, name: "oswaljewellers_", instagramLink: "https://www.instagram.com/oswaljewellers_/", category: "Jewellery", followers: 1223, engagement: " -", avgViews: "-", budget: "On Request", minBudget: 1200000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/oswaljewellers_.PNG" },
            { id: 18, name: "chefjeets_bakesncakes", instagramLink: "https://www.instagram.com/chefjeets_bakesncakes/", category: "Food & Restaurant", followers: 344, engagement: " -", avgViews: "-", budget: "On Request", minBudget: 1200000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/chefjeets_bakesncakes.jpg" },
            { id: 19, name: "amitypune_udaan", instagramLink: "https://www.instagram.com/amitypune_udaan/", category: "Education", followers: 78, engagement: " -", avgViews: "-", budget: "On Request", minBudget: 400000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/amitypune_udaan.jpg" },
            { id: 20, name: "scsdedfoundation", instagramLink: "https://www.instagram.com/scsdedfoundation/", category: "Education", followers: 61, engagement: " -", avgViews: "-", budget: "On Request", minBudget: 20000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/scsdedfoundation.jpg"},
            { id: 21, name: "seouluxe_nails", instagramLink: "https://www.instagram.com/seouluxe_nails/", category: "Makeup & Nailart", followers: 45, engagement: " -", avgViews: "-", budget: "On Request", minBudget: 1200000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/seouluxe_nails.jpg" },
            { id: 22, name: "nilkanthachemicals", instagramLink: "https://www.instagram.com/nilkanthachemicals/", category: "Education", followers: 28, engagement: " -", avgViews: "-", budget: "On Request", minBudget: 1200000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/nilkanthachemicals.PNG" },
            { id: 23, name: "essencehouse.india", instagramLink: "https://www.instagram.com/essencehouse.india/", category: "Real Estate", followers: 40, engagement: " -", avgViews: "-", budget: "On Request", minBudget: 1200000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/IMG_0663.jpeg" },
            { id: 24, name: "ayrakcare", instagramLink: "https://www.instagram.com/ayrakcare/", category: "Food & Restaurant", followers: 20, engagement: " -", avgViews: "-", budget: "On Request", minBudget: 1200000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/ayrakcare.jpg" },
            { id: 25, name: "metrodentalcarenagpur", instagramLink: "https://www.instagram.com/metrodentalcarenagpur/", category: "Health & Fitness", followers: 136, engagement: " -", avgViews: "-", budget: "On Request", minBudget: 1200000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/metrodentalcarenagpur.jpg" },
            { id: 26, name: "spizy_tadkaa", instagramLink: "https://www.instagram.com/spizy_tadkaa/", category: "Food & Restaurant", followers: 1, engagement: " -", avgViews: "-", budget: "On Request", minBudget: 1200000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/spizy_tadkaa.jpg" },
]; 

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
