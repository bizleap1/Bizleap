"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const brands = [
  {
    name: "Nike",
    logo: "/images/logo2.avif"
  },
  {
    name: "Adidas",
    logo: "/images/logo3.avif"
  },
  {
    name: "Puma",
    logo: "/images/logo9.avif" },
  {
    name: "Nike",
    logo: "/images/logo5.avif"
  },
  {
    name: "Adidas",
    logo: "/images/logo6.avif"
  },
  {
    name: "Puma",
    logo: "/images/logo4.webp" },
    {
    name: "Nike",
    logo: "/images/logo8.avif"
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
              className="flex-shrink-0 mx-8 md:mx-12 w-20 h-20 md:w-28 md:h-28 relative"
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