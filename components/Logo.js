"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const brands = [
  { name: "Ayrak", logo: "/images/ayrak pharma_bw.png", customFilter: "" },
  { name: "Yofobo", logo: "/clients/yo-fo-bo.png", className: "scale-125" },
  { name: "Elite India", logo: "/images/elite india.PNG", className: "scale-[1.4]" },
  { name: "Tanvi Bhandari", logo: "/images/tanvi bhandari.PNG" },
  { name: "Snuggle", logo: "/images/snuggle store.PNG" },
  { name: "Udaan", logo: "/images/udan amity pune.PNG" },
  { name: "Metro", logo: "/images/metro dental care.PNG", className: "scale-[1.3]" },
  { name: "Nike", logo: "/images/kathmandu jhol momo.png" },
  { name: "NTSW", logo: "/images/ntsw.png" },
  { name: "NTX", logo: "/images/ntx.png" },
  { name: "amity", logo: "/clients/amity-unviersity.png" },
  { name: "Academypath", logo: "/new logos/Academypath.png", className: "scale-[1.3]" },
  { name: "ChatGPT 1", logo: "/new logos/ChatGPT Image Sep 24, 2026, 01_39_08 PM.png", className: "scale-[1.6]" },
  { name: "ChatGPT 2", logo: "/new logos/ChatGPT Image Sep 24, 2026, 01_41_58 PM.png", className: "scale-[1.6]" },
  { name: "ChatGPT 3", logo: "/new logos/ChatGPT Image Sep 24, 2026, 01_50_50 PM.png" },
  { name: "ChatGPT 4", logo: "/new logos/ChatGPT Image Sep 24, 2026, 01_52_08 PM.png", customFilter: "grayscale invert", className: "scale-[1.3]" },
  { name: "ChatGPT 5", logo: "/new logos/ChatGPT Image Sep 24, 2026, 01_56_27 PM.png", customFilter: "grayscale invert brightness-200 contrast-200" },
  { name: "ChatGPT 6", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_11_39 PM.png" },
  { name: "ChatGPT 7", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_23_11 PM.png" },
  { name: "ChatGPT 8", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_25_57 PM.png" },
  { name: "ChatGPT 9", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_27_36 PM.png", className: "scale-[1.3]" },
  { name: "ChatGPT 10", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_29_00 PM.png", className: "scale-[1.3]" },
  { name: "ChatGPT 11", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_30_21 PM.png", className: "scale-[1.3]" },
  { name: "ChatGPT 12", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_32_14 PM (1).png", className: "scale-[1.3]" },
  { name: "ChatGPT 14", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_35_09 PM.png", className: "scale-[1.3]" },
  { name: "ChatGPT 15", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_38_04 PM.png", customFilter: "grayscale invert" },
  { name: "ChatGPT 16", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_41_36 PM.png", customFilter: "grayscale invert" },
  { name: "ChatGPT 17", logo: "/new logos/ChatGPT Image Sep 24, 2026, 03_26_04 PM.png", customFilter: "grayscale mix-blend-screen" },
  { name: "ChatGPT 18", logo: "/new logos/ChatGPT Image Sep 24, 2026, 03_27_32 PM.png", customFilter: "grayscale invert" },
  { name: "ChatGPT 19", logo: "/new logos/ChatGPT Image Sep 24, 2026, 03_28_59 PM.png" },
  { name: "ChatGPT 20", logo: "/new logos/ChatGPT Image Sep 24, 2026, 03_30_17 PM.png" },
  { name: "MANI", logo: "/new logos/MANI.png", className: "scale-[1.3]" },
  { name: "ST", logo: "/new logos/ST.png", customFilter: "grayscale mix-blend-screen" },
  { name: "VIKALP EDUCATION", logo: "/new logos/VIKALP_EDUCATION_logo_1080x1350_transparent.png", className: "scale-[1.8]" },
  { name: "asian street", logo: "/new logos/asian street.png", className: "scale-[1.3]" },
  { name: "barcode", logo: "/new logos/barcode.png", className: "scale-[1.3]" },
  { name: "binous", logo: "/new logos/binous.png", customFilter: "grayscale invert", className: "scale-[1.3]" },
  { name: "mysa", logo: "/new logos/mysa.png", className: "scale-[1.3]" },
  { name: "rajwadi", logo: "/new logos/rajwadi.png", customFilter: "grayscale mix-blend-screen", className: "scale-[1.3]" },
  { name: "suko", logo: "/new logos/suko.png", className: "scale-[1.3]" },
  { name: "wealth acumen", logo: "/new logos/wealth acumen.png", className: "scale-[1.3]" },
  { name: "ziely", logo: "/new logos/ziely.png", customFilter: "grayscale invert", className: "scale-[1.3]" },
];

export default function BrandSlider() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();
    // Calculate speed based on screen size (roughly analogous to the previous duration math)
    const speed = window.innerWidth < 768 ? 0.08 : 0.05;

    const scroll = (time) => {
      if (containerRef.current && !isDragging) {
        const delta = time - lastTime;
        containerRef.current.scrollLeft += speed * delta;
        
        // Loop back seamlessly when halfway through
        if (
          containerRef.current.scrollLeft >=
          containerRef.current.scrollWidth / 2
        ) {
          containerRef.current.scrollLeft -= containerRef.current.scrollWidth / 2;
        }
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchEnd = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="w-full bg-black border-t border-b border-white/5 py-12 md:py-20 relative overflow-hidden">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 h-full w-24 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Label */}
      <p className="text-center text-[10px] md:text-xs text-white uppercase tracking-[0.3em] font-semibold mb-8">
        Trusted by brands across India
      </p>

      {/* Scrolling track */}
      <div 
        className="relative w-full overflow-x-auto cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex whitespace-nowrap w-max items-center">
          {[...brands, ...brands].map((brand, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 mx-8 md:mx-12 w-28 h-20 md:w-48 md:h-24 relative opacity-100 transition-all duration-500 pointer-events-none select-none"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                draggable={false}
                className={`object-contain select-none ${brand.customFilter !== undefined ? brand.customFilter : "filter brightness-0 invert"} ${brand.className || ""}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
