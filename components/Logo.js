"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const brands = [
  { name: "Ayrak", logo: "/clients/50.png" },
  { name: "Yofobo", logo: "/clients/16.png" },
  { name: "Elite India", logo: "/images/Logo4.PNG" },
  { name: "Tanvi Bhandari", logo: "/images/Logo5.PNG" },
  { name: "Snuggle", logo: "/images/Logo6.PNG" },
  { name: "Udaan", logo: "/images/Logo7.PNG" },
  { name: "Metro", logo: "/images/Logo8.PNG" },
  { name: "Nike", logo: "/images/Logo10.png" },
  { name: "NTSW", logo: "/images/Logo11.png" },
  { name: "NTX", logo: "/images/Logo12.png" },
  { name: "amity", logo: "/clients/22.png" },
];

export default function BrandSlider() {
  const [animationDuration, setAnimationDuration] = useState(25);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setAnimationDuration(20);
      } else {
        setAnimationDuration(25);
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
          className="flex whitespace-nowrap w-max"
          style={{
            animation: `scroll ${animationDuration}s linear infinite`,
          }}
        >
          {/* Original + Duplicate for seamless loop */}
          {[...brands, ...brands].map((brand, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 mx-6 md:mx-12 w-24 h-24 md:w-32 md:h-32 relative"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
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
