"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// ------------------- Scroll Animation -------------------
function ScrollView({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });

  const variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay, duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// ------------------- Client Data -------------------
const CLIENT_CATEGORIES = [
  {
    title: "Food & Beverages",
    clients: [
      { name: "Barcode", logo: "/clients/13.jpg" },
      { name: "Tuli", logo: "/clients/14.jpg" },
      { name: "Lord Of The Drinks", logo: "/clients/15.jpg" },
      { name: "YO FO BO", logo: "/clients/16.png" },
      { name: "Crispy Crowns", logo: "/clients/17.png" },
      { name: "Masato", logo: "/clients/18.png" },
      { name: "Masala & Morsels", logo: "/clients/19.png" },
      { name: "Hotel Anantara", logo: "/clients/20.png" },
    ],
  },
  {
    title: "Education & Technology",
    clients: [
      { name: "SSit", logo: "/clients/21.png" },
      { name: "Amity", logo: "/clients/22.png" },
      { name: "Academy Path", logo: "/clients/23.png" },
      { name: "Edu Solutions", logo: "/clients/24.png" },
      { name: "Hi Tech Pathshala", logo: "/clients/25.png" },
      { name: "Universal", logo: "/clients/26.png" },
      { name: "HS Global", logo: "/clients/27.png" },
      { name: "Takshila", logo: "/clients/28.png" },
    ],
  },
  {
    title: "Fitness & Health",
    clients: [
      { name: "Doc's Fitness", logo: "/clients/29.png" },
      { name: "Marvel FItness", logo: "/clients/30.png" },
      { name: "NTSW", logo: "/clients/31.png" },
      { name: "NTX", logo: "/clients/32.png" },
      { name: "Metro Mental Care ", logo: "/clients/33.png" },
      { name: "AYRAK", logo: "/clients/34.png" },
      { name: "Fitness Kickstart", logo: "/clients/35.png" },
      { name: "Aashwas Homoeo Care", logo: "/clients/36.png" },
    ],
  },
  {
    title: "Fashion, Cosmetics & Jewellery",
    clients: [
      { name: "Tanvi Bhandari", logo: "/clients/37.png" },
      { name: "Snuggle", logo: "/clients/38.png" },
      { name: "Ellipses", logo: "/clients/39.png" },
      { name: "LuxeSpark", logo: "/clients/40.png" },
      { name: "ISHIRRA", logo: "/clients/41.png" },
      { name: "Mahalaxmi", logo: "/clients/42.png" },
      { name: "Makeover Kajal", logo: "/clients/43.png" },
      { name: "SEOUlUXE NAILS", logo: "/clients/44.png" },
    ],
  },
  {
    title: "Corporate & Industries",
    clients: [
      { name: "Meher Infra", logo: "/clients/45.png" },
      { name: "NEW India", logo: "/clients/46.png" },
      { name: "A & T buildcon", logo: "/clients/47.png" },
      { name: "Green Acres", logo: "/clients/48.png" },
      { name: "Jain Brokers", logo: "/clients/49.png" },
      { name: "Tiger Brand", logo: "/clients/50.png" },
      { name: "KE", logo: "/clients/51.png" },
      { name: "ECE India", logo: "/clients/52.png" },
    ],
  },
];

// ------------------- Infinite Logo Slider -------------------
function InfiniteLogoSlider({ clients }) {
  const sliderRef = useRef(null);
  const total = [...clients, ...clients];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let x = 0;
    const speed = 0.7;
    let animationId;

    const scroll = () => {
      x -= speed;
      const totalWidth = slider.scrollWidth / 2;

      if (Math.abs(x) >= totalWidth) x = 0;

      slider.style.transform = `translateX(${x}px)`;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={sliderRef}
        className="flex items-center gap-8 md:gap-12 will-change-transform"
        style={{
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {total.map((client, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center text-center flex-shrink-0"
          >
            <div className="w-[130px] h-[80px] sm:w-[170px] sm:h-[110px] lg:w-[210px] lg:h-[130px] flex items-center justify-center bg-zinc-900 rounded-xl shadow-md p-3 mx-1.5">
              <Image
                src={client.logo}
                alt={client.name}
                width={300}
                height={200}
                className="object-contain w-full h-full hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p className="text-gray-400 text-sm mt-2">{client.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------- Clients Section (COMPACT VERSION) -------------------
export default function ClientsSection() {
  return (
    <section className="py-10 md:py-14 bg-black text-white text-center" id="clients">
      <div className="max-w-7xl mx-auto px-4 space-y-12">

        <ScrollView>
          <h2 className="text-4xl md:text-6xl font-bold">Our Clients</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-3 text-lg md:text-xl">
            Trusted by leading brands across industries — built on creativity, innovation, and growth.
          </p>
        </ScrollView>

        <div className="space-y-14 md:space-y-16">
          {CLIENT_CATEGORIES.map((category, index) => (
            <div key={index} className="space-y-6 md:space-y-8">

              <ScrollView delay={index * 0.1}>
                <h3 className="text-2xl md:text-3xl font-semibold text-center text-white">
                  {category.title}
                </h3>
              </ScrollView>

              <InfiniteLogoSlider clients={category.clients} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
