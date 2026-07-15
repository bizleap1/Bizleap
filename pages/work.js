"use client";
import Head from "next/head";
import Image from "next/image";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";

// ------------------- Scroll Reveal -------------------
function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -50px 0px", once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { delay, duration: 0.4, ease: "easeOut" },
            }
          : {}
      }
    >
      {children}
    </motion.div>
  );
}

import { CLIENT_CATEGORIES } from "../data/clientsData";

export default function Work() {
  const categories = [
    "All Projects",
    "Food & Beverages",
    "Education & Technology",
    "Fitness & Health",
    "Corporate & Industries",
    "Fashion, Cosmetics & Jewellery",
    "Real Estate",
    "Export",
  ];

  const [active, setActive] = useState("All Projects");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const originalItems = [
    {
      id: 1,
      title: "Solar Ark",
      subtitle: "Corporate & Industries",
      image: "/images/Solar.png",
      link: "/solarark",
      isOriginal: true,
    },
    {
      id: 2,
      title: "Masato",
      subtitle: "Food & Beverages",
      image: "/images/Masato.png",
      link: "/masato",
      isOriginal: true,
    },
    {
      id: 3,
      title: "Meher Infra Solutions",
      subtitle: "Real Estate",
      image: "/images/Meher.png",
      link: "/meher",
      isOriginal: true,
    },
    {
      id: 4,
      title: "Tuli Restro",
      subtitle: "Food & Beverages",
      image: "/images/Tuii.png",
      link: "/tulirestro",
      isOriginal: true,
    },
  ];

  const skipNames = ["Solar Ark", "Masato", "Meher Infra", "Tuli", "Meher Infra Solutions", "Tuli Restro"];
  
  const categoryBackgrounds = {
    "Food & Beverages": "/images/food_bg.png",
    "Education & Technology": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "Fitness & Health": "/images/fitness_bg.png",
    "Corporate & Industries": "/images/at_buildcon_bg.png",
    "Fashion, Cosmetics & Jewellery": "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&q=80",
  };

  const contextBackgrounds = {
    "Food & Beverages": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
    ],
    "Education & Technology": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
    ],
    "Fitness & Health": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80"
    ],
    "Corporate & Industries": [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
    ],
    "Fashion, Cosmetics & Jewellery": [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80"
    ],
  };

  // Group clients by category to interleave them
  const clientsByCategory = {};
  CLIENT_CATEGORIES.forEach(cat => {
    clientsByCategory[cat.title] = cat.clients.filter(c => !skipNames.includes(c.name));
  });

  const interleavedClients = [];
  const maxLen = Math.max(...Object.values(clientsByCategory).map(arr => arr.length));
  const catNames = Object.keys(clientsByCategory);

  for (let i = 0; i < maxLen; i++) {
    for (let cat of catNames) {
      if (clientsByCategory[cat][i]) {
        interleavedClients.push({ client: clientsByCategory[cat][i], category: cat, idx: i });
      }
    }
  }

  // Convert to consistent format
  const dynamicItems = interleavedClients.map(({ client, category, idx }) => {
    // Determine title
    let displayName = client.name;
    if (client.name.includes("Lord Of The Drinks")) displayName = "Lord of Drinks";
    else if (client.name.includes("Hotel Anantara")) displayName = "Anantara";

    return {
      id: `dyn-${category}-${idx}`,
      title: displayName,
      subtitle: category,
      image: client.image,
      logo: client.logo,
      link: `/clients/${client.slug}`,
      isOriginal: false,
    };
  });

  const items = [...originalItems, ...dynamicItems];

  const filtered =
    active === "All Projects"
      ? items
      : items.filter((item) => item.subtitle === active);

  return (
  <>
  <Head>
  <title key="title">Our Work | Bizleap - Where Brands Leap Forward</title>
  <meta name="description" content="Explore Bizleap’s portfolio showcasing successful web development, digital marketing, branding, and creative projects delivered for growing brands." key="description" />
        <meta name="keywords" content="bizleap work, branding portfolio, website portfolio Nagpur" />
  <link rel="canonical" href="https://bizleap.in/work" />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "https://bizleap.in/work#webpage",
        "url": "https://bizleap.in/work",
        "name": "Our Work | Bizleap Portfolio",
        "description": "Explore Bizleap's portfolio showcasing branding, web development, digital marketing, and creative projects delivered for growing brands.",
        "isPartOf": { "@id": "https://bizleap.in/#website" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bizleap.in/" },
            { "@type": "ListItem", "position": 2, "name": "Work", "item": "https://bizleap.in/work" }
          ]
        },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Solar Ark - Branding", "url": "https://bizleap.in/solarark" },
            { "@type": "ListItem", "position": 2, "name": "Masato - Branding", "url": "https://bizleap.in/masato" },
            { "@type": "ListItem", "position": 3, "name": "Meher Infra Solutions - Branding", "url": "https://bizleap.in/meher" },
            { "@type": "ListItem", "position": 4, "name": "Tuli Restro - Branding", "url": "https://bizleap.in/tulirestro" }
          ]
        }
      })
    }}
  />
</Head>

    <div className="min-h-screen w-full bg-[#0a0a0a] text-white">

      {/* ------------------ HERO ------------------ */}
      <section className="relative pt-20 pb-10 text-center max-w-5xl mx-auto">
        {/* Background Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[600px] h-[400px] bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none z-0" />

        <div className="relative z-10 mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <ScrollReveal>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight leading-[1.05] text-white">
                A Showcase of Our<br />
                <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">Finest Work.</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
                Dive into the creative solutions that brought these bespoke brands to life.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>



      {/* ------------------ CATEGORY FILTER (Mobile Fixed) ------------------ */}
{/* MOBILE FILTER (dropdown) */}
<div className="w-full px-4 mt-8 sm:hidden relative z-20">
  <button
    onClick={() => setShowMobileFilter(!showMobileFilter)}
    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white font-semibold shadow-sm active:scale-[0.98] transition"
    style={{ fontFamily: '"Noto Sans", sans-serif' }}
  >
    {active}
    <span className="text-lg text-neutral-400">▾</span>
  </button>

  {showMobileFilter && (
    <div
      className="absolute top-full left-4 right-4 mt-2 rounded-xl bg-[#111] shadow-2xl border border-white/10 overflow-hidden z-30"
      style={{
        animation: "fadeSlide 0.25s ease-out",
        fontFamily: '"Noto Sans", sans-serif',
      }}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            setActive(cat)
            setShowMobileFilter(false)
          }}
          className={`w-full text-left px-4 py-3 text-sm transition
            ${
              active === cat
                ? "bg-yellow-400 text-black font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  )}
</div>

{/* DESKTOP FILTER */}
<div className="w-full flex justify-center mt-12 px-4 hidden sm:flex">
  <div
    className="flex gap-2 p-1.5 bg-[#111]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl overflow-x-auto"
    style={{ fontFamily: '"Noto Sans", sans-serif' }}
  >
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setActive(cat)}
        className={`
          whitespace-nowrap px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-full
          ${
            active === cat
              ? "bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.3)]"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          }
        `}
      >
        {cat}
      </button>
    ))}
  </div>
</div>

{/* INLINE ANIMATION */}
<style>
  {`
    @keyframes fadeSlide {
      0% { opacity: 0; transform: translateY(-6px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `}
</style>



      {/* ------------------ PROJECT GRID ------------------ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 md:px-20 py-5 md:py-12">
  {filtered.map((item, idx) => (
    <ScrollReveal key={idx} delay={(idx % 3) * 0.1}>
      <Link href={item.link} className="group cursor-pointer block">

        {/* CARD CONTAINER */}
        <div className={`w-full relative overflow-hidden rounded-lg shadow-sm bg-[#111] border border-gray-800 transition-colors duration-300 ${item.isOriginal ? "group-hover:border-yellow-400/50" : "group-hover:border-yellow-400/30"}`}>
          {/* Uniform Layout (Full Image) for all cards */}
          <div className="w-full aspect-[4/3] overflow-hidden bg-gray-900 relative">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <h3
          className="text-xl font-semibold mt-4 text-white"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          {item.title}
        </h3>

        <p
          className="text-gray-400 text-lg"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          {item.subtitle}
        </p>

        <div className="w-full h-[1px] bg-gray-700 mt-3" />

        {/* VIEW MORE BUTTON */}
        <div className="mt-4 inline-block relative group">
          <span
            className="absolute -bottom-1 -right-1 w-full h-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all duration-300 group-hover:-bottom-1.5 group-hover:-right-1.5 group-hover:shadow-[0_0_25px_rgba(250,204,21,0.6)]"
          ></span>

          <span
            className="border border-yellow-400/40 px-5 py-2 bg-[#0a0a0a] text-white font-semibold text-sm relative z-10 block transition-colors duration-300 group-hover:text-yellow-400"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            VIEW MORE
          </span>
        </div>

      </Link>
    </ScrollReveal>
  ))}
</div>

    </div>
  </>
  );
}
