"use client";

import { useRef, useEffect } from "react";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-6 p-8 rounded-3xl shadow-md bg-white ${itemClassName}`}
    style={{ transformOrigin: "top center" }}
  >
    {children}
  </div>
);

const ScrollStack = ({ children }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const cards = Array.from(container.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      cardsRef.current.forEach((card, i) => {
        const cardOffset = i * 60; // spacing between stacked cards
        const progress = Math.min(Math.max((scrollTop - cardOffset) / 300, 0), 1);

        const scale = 0.9 + progress * 0.1;
        const translateY = Math.max(0, cardOffset - scrollTop + 60 * i);

        card.style.transform = `translateY(${translateY}px) scale(${scale})`;
        card.style.zIndex = i + 10;
      });
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // initial update

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="scroll-stack-container w-full h-[80vh] overflow-y-scroll px-8 py-12"
    >
      {children}
    </div>
  );
};

export default ScrollStack;
