"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const brands = [
  {
    name: "Ayrak",
    logo: "/images/Logo1.png"
  },
  
  {
    name: "Marvel FItness",
    logo: "/images/Logo3.png" },
  {
    name: "Elite India",
    logo: "/images/Logo4.PNG"
  },
  {
    name: "Tanvi Bhandari",
    logo: "/images/Logo5.PNG"
  },
  {
    name: "snuggle",
    logo: "/images/Logo6.PNG" },
    {
    name: "udaan",
    logo: "/images/Logo7.PNG"
  },
  {
    name: "metro",
    logo: "/images/Logo8.PNG"
  },
  
  {
    name: "Nike",
    logo: "/images/Logo10.png"
  },
  {
    name: "ntsw",
    logo: "/images/Logo11.png"
  },
  {
    name: "ntx",
    logo: "/images/Logo12.png"
  },
  {
    name: "oxigreen",
    logo: "/images/Logo13.png"
  },
];

export default function BrandSlider() {
  const [animationDuration, setAnimationDuration] = useState(15);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setAnimationDuration(8);
      } else {
        setAnimationDuration(15);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full overflow-hidden bg-transparent py-8 md:py-12">
      <div className="relative w-full">
        <div
          className="flex whitespace-nowrap w-full"
          style={{
            animation: `scroll ${animationDuration}s linear infinite`,
          }}
        >
          {brands.map((brand, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 mx-8 md:mx-12 w-28 h-28 md:w-32 md:h-32 relative"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain filter brightness-0 invert"
              />
            </div>
          ))}
          {/* Duplicate brands for seamless scroll */}
          {brands.map((brand, idx) => (
            <div 
              key={`dup-${idx}`} 
              className="flex-shrink-0 mx-8 md:mx-12 w-20 h-20 md:w-28 md:h-28 relative"
            >
              <Image
                src={brand.logo}
                alt={`${brand.name} duplicate`}
                fill
                className="object-contain filter brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}