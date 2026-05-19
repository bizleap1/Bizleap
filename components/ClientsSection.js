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
      { name: "Barcode", logo: "/clients/barcode.png" },
      { name: "Tuli", logo: "/clients/tuli grand.png" },
      { name: "Lord Of The Drinks", logo: "/clients/lord of the drinks.png" },
      { name: "YO FO BO", logo: "/clients/yo fo bo.png" },
      { name: "Crispy Crowns", logo: "/clients/crispy crowns.png" },
      { name: "Masato", logo: "/clients/masato.png" },
      { name: "Masala & Morsels", logo: "/clients/masala & morsels.png" },
      { name: "Hotel Anantara", logo: "/clients/hotel anantara.png" },
    ],
  },
  {
    title: "Education & Technology",
    clients: [
      { name: "SSit", logo: "/clients/ssit.png" },
      { name: "Amity", logo: "/clients/amity unviersity.png" },
      { name: "Academy Path", logo: "/clients/academypath.png" },
      { name: "Edu Solutions", logo: "/clients/a2z.png" },
      { name: "Hi Tech Pathshala", logo: "/clients/hi-tech pathshala.png" },
      { name: "Universal", logo: "/clients/universal education cosultants.png" },
      { name: "HS Global", logo: "/clients/ks global eduvisor.png" },
      { name: "Takshila", logo: "/clients/takshila.png" },
    ],
  },
  {
    title: "Fitness & Health",
    clients: [
      { name: "Doc's Fitness", logo: "/clients/doc's fitness.png" },
      { name: "Marvel FItness", logo: "/clients/m.png" },
      { name: "NTSW", logo: "/clients/ntsw.png" },
      { name: "NTX", logo: "/clients/ntx.png" },
      { name: "Metro Mental Care ", logo: "/clients/metro.png" },
      { name: "AYRAK", logo: "/clients/ayrak pharma.png" },
      { name: "Fitness Kickstart", logo: "/clients/fitness kickstart.png" },
      { name: "Aashwas Homoeo Care", logo: "/clients/aashwas homeo care.png" },
    ],
  },
  {
    title: "Fashion, Cosmetics & Jewellery",
    clients: [
      { name: "Tanvi Bhandari", logo: "/clients/tanvii.png" },
      { name: "Snuggle", logo: "/clients/snuggle.png" },
      { name: "Ellipses", logo: "/clients/ellipses.png" },
      { name: "LuxeSpark", logo: "/clients/oswal jwellers.png" },
      { name: "ISHIRRA", logo: "/clients/ishira.png" },
      { name: "Mahalaxmi", logo: "/clients/mahalaxmi.png" },
      { name: "Makeover Kajal", logo: "/clients/kp.png" },
      { name: "SEOUlUXE NAILS", logo: "/clients/seouluxe.png" },
    ],
  },
  {
    title: "Corporate & Industries",
    clients: [
      { name: "Meher Infra", logo: "/clients/meher.png" },
      { name: "NEW India", logo: "/clients/new india export.png" },
      { name: "A & T buildcon", logo: "/clients/A & T.png" },
      { name: "Green Acres", logo: "/clients/greenacres.png" },
      { name: "Jain Brokers", logo: "/clients/jb.png" },
      { name: "Tiger Brand", logo: "/clients/tiger brand.png" },
      { name: "KE", logo: "/clients/ke.png" },
      { name: "ECE India", logo: "/clients/ece india.png" },
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
    const speed = 1.8;
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
            <div className="w-[100px] h-[60px] sm:w-[130px] sm:h-[80px] lg:w-[160px] lg:h-[100px] flex items-center justify-center bg-zinc-900 rounded-xl shadow-md p-2.5 mx-1">
              <Image
                src={client.logo}
                alt={client.name}
                width={200}
                height={120}
                className="object-contain w-full h-full transition-transform duration-300"
              />
            </div>
            <p className="text-gray-500 text-[10px] sm:text-xs mt-1.5">{client.name}</p>
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
          <h2 className="text-3xl md:text-5xl font-bold">Our Clients</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-3 text-base md:text-lg">
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
