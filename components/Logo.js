"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const logos = [
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDAgMTUwQzEyNy42MTQgMTUwIDE1MCAxMjcuNjE0IDE1MCAxMDBDMTUwIDcyLjM4NTggMTI3LjYxNCA1MCAxMDAgNUM3Mi4zODU4IDUgNTAgMjcuMzg1OCA1MCA1NUM1MCA4Mi42MTQyIDcyLjM4NTggMTA1IDEwMCAxMDVDMTI3LjYxNCAxMDUgMTUwIDgyLjYxNDIgMTUwIDU1QzE1MCAyNy4zODU4IDEyNy42MTQgNSAxMDAgNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPg==",
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik01MCA1MEgxNTBWMTUwSDUwVjUwWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI4Ii8+CjxwYXRoIGQ9Ik03MCA3MFYxMzBIMTMwVjcwSDcwWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI2Ii8+Cjwvc3ZnPg==",
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik04MCA4MEgxMjBWMTIwSDgwVjgwWiIgZmlsbD0iIzAwMCIvPgo8L3N2Zz4=",
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNDAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iOCIvPgo8cGF0aCBkPSJNNzAgMTAwSDEzME0xMDAgNzBWMTMwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjgiLz4KPC9zdmc+",
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik02NSA4NVYxMTVIMTM1Vjg1SDY1WiIgZmlsbD0iIzAwMCIvPgo8L3N2Zz4=",
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cjxwb2x5Z29uIHBvaW50cz0iMTAwLDUwIDE1MCwxMDAgMTAwLDE1MCA1MCwxMDAiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==",
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNDAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iOCIvPgo8bGluZSB4MT0iNjAiIHkxPSIxMDAiIHgyPSIxNDAiIHkyPSIxMDAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iOCIvPgo8L3N2Zz4="
];

export default function BrandSlider() {
  const [animationDuration, setAnimationDuration] = useState(10); // default desktop speed

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setAnimationDuration(3); // faster on mobile
      } else {
        setAnimationDuration(10); // slower on desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full overflow-hidden bg-transparent pt-[120px] md:pt-[100px]">
      <div className="relative w-full">
        <div
          className="flex whitespace-nowrap gap-16 w-full"
          style={{
            animation: `scroll ${animationDuration}s linear infinite`,
          }}
        >
          {logos.map((logo, idx) => (
            <div key={idx} className="flex-shrink-0 w-32 h-32 relative">
              <Image
                src={logo}
                alt={`Brand logo ${idx + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
          {/* Duplicate logos for seamless scroll */}
          {logos.map((logo, idx) => (
            <div key={`dup-${idx}`} className="flex-shrink-0 w-32 h-32 relative">
              <Image
                src={logo}
                alt={`Brand logo duplicate ${idx + 1}`}
                fill
                className="object-contain"
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