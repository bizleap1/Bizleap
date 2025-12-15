"use client";
import Head from "next/head";
import Image from "next/image";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";

// ------------------- Scroll Reveal -------------------
function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px", once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { delay, duration: 0.5 },
            }
          : {}
      }
    >
      {children}
    </motion.div>
  );
}

export default function Work() {
  const categories = [
    "All Projects",
    "Branding",
    "Production",
    "Social Media",
    "Ad Campaigns",
  ];

  const [active, setActive] = useState("All Projects");
const [showMobileFilter, setShowMobileFilter] = useState(false);

  const items = [
    {
      id: 1,
      title: "Solar Ark",
      subtitle: "Branding",
      image: "/images/Solar.png",
      link: "/solarark",
    },
    {
      id: 2,
      title: "Masato",
      subtitle: "Branding",
      image: "/images/Masato.png",
      link: "/masato",
    },
    {
      id: 3,
      title: "Meher Infra Solutions",
      subtitle: "Branding",
      image: "/images/Meher.png",
      link: "/meher",
    },
    {
      id: 4,
      title: "Tuli Restro",
      subtitle: "Branding",
      image: "/images/Tuii.png",
      link: "/tulirestro",
    },
  ];

  const filtered =
    active === "All Projects"
      ? items
      : items.filter((item) => item.subtitle === active);

  return (
  <>
  <Head>
  <title>Our Work | Bizleap - Where Brands Leap Forward</title>
  <meta
    name="description"
    content="Explore Bizleap’s portfolio showcasing successful web development, digital marketing, branding, and creative projects delivered for growing brands."
  />
</Head>

    <div className="min-h-screen w-full bg-white text-black">

      {/* ------------------ HERO ------------------ */}
      <section
  className="bg-black text-white px-6 md:px-20 h-[40vh] md:h-[55vh] flex flex-col justify-end pb-5 md:pb-10"
>
  {/* ---- TOP LINE ---- */}
  <div className="w-16 h-[2px] bg-white/40 mb-3 md:mb-4"></div>

  <ScrollReveal>
    <h1
      className="text-4xl md:text-6xl leading-tight"
      style={{
        fontFamily: '"Noto Sans", sans-serif',
        fontWeight: 700,
        color: "white",
      }}
    >
      A Showcase of Our <br /> Finest Work.
    </h1>
  </ScrollReveal>

  <ScrollReveal delay={0.2}>
    <h2
      className="mt-3 md:mt-4 text-base md:text-xl max-w-xl"
      style={{
        fontFamily: '"Noto Sans", sans-serif',
        fontWeight: 400,
        color: "rgb(180,180,180)",
        lineHeight: "22px md:26px",
      }}
    >
      Dive into the creative solutions that brought these bespoke brands to life.
    </h2>
  </ScrollReveal>

  {/* ---- BOTTOM LINE ---- */}
  <div className="w-20 h-[2px] bg-white/30 mt-4 md:mt-5"></div>
</section>



      {/* ------------------ CATEGORY FILTER (Mobile Fixed) ------------------ */}
      {/* MOBILE FILTER (dropdown) */}
<div className="w-full px-4 mt-5  sm:hidden">
  <button
    onClick={() => setShowMobileFilter(!showMobileFilter)}
    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#F6FF00] text-black font-semibold shadow-sm active:scale-[0.98] transition"
    style={{ fontFamily: '"Noto Sans", sans-serif' }}
  >
    {active}
    <span className="text-lg">▾</span>
  </button>

  {showMobileFilter && (
    <div
      className="mt-2 rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden"
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
                ? "bg-[#F6FF00] text-black font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  )}
</div>

{/* DESKTOP FILTER (original, untouched) */}
<div className="w-full flex justify-center mt-9 px-4 hidden sm:flex">
  <div
    className="flex items-center gap-0 overflow-x-auto no-scrollbar border border-gray-300 rounded-full px-4 py-2 bg-white"
    style={{ fontFamily: '"Noto Sans", sans-serif' }}
  >
    {categories.map((cat, idx) => (
      <div key={cat} className="flex items-center">
        <button
          onClick={() => setActive(cat)}
          className={`
            whitespace-nowrap px-6 py-2 text-sm font-semibold transition rounded-full
            ${
              active === cat
                ? "bg-[#F6FF00] text-black"
                : "text-black bg-transparent"
            }
          `}
        >
          {cat}
        </button>

        {idx !== categories.length - 1 && (
          <div className="h-5 w-[1px] bg-gray-300 mx-3"></div>
        )}
      </div>
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
    <ScrollReveal key={idx} delay={idx * 0.1}>
      <Link href={item.link} className="group cursor-pointer block">

        {/* IMAGE (Full image visible – object-contain) */}
        <div className="w-full h-64 relative overflow-hidden rounded-lg shadow-sm bg-white">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
          />
        </div>

        <h3
          className="text-xl font-semibold mt-4"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          {item.title}
        </h3>

        <p
          className="text-gray-600 text-lg"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          {item.subtitle}
        </p>

        <div className="w-full h-[1px] bg-gray-200 mt-3" />

        {/* VIEW MORE BUTTON */}
        <div className="mt-4 inline-block relative group">
          <span
            className="absolute -bottom-1 -right-1 w-full h-full bg-black transition-all duration-200 group-hover:-bottom-2 group-hover:-right-2"
          ></span>

          <span
            className="border border-black px-5 py-2 bg-white font-semibold text-sm relative z-10 block"
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
