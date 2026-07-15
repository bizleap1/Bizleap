"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
];

export default function BrandSlider() {
  const [animationDuration, setAnimationDuration] = useState(28);

  useEffect(() => {
    const handleResize = () => {
      setAnimationDuration(window.innerWidth < 768 ? 20 : 28);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div className="relative w-full overflow-hidden">
        <div
          className="flex whitespace-nowrap w-max items-center"
          style={{
            animation: `brand-scroll ${animationDuration}s linear infinite`,
          }}
        >
          {[...brands, ...brands].map((brand, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 mx-8 md:mx-12 w-28 h-20 md:w-48 md:h-24 relative opacity-100 transition-all duration-500"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className={`object-contain ${brand.customFilter !== undefined ? brand.customFilter : "filter brightness-0 invert"} ${brand.className || ""}`}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes brand-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
