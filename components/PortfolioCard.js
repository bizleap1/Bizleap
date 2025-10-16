"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";


// ------------------- ScrollView -------------------
function ScrollView({ children, delay = 0, viewMargin = "0px 0px -200px 0px" }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { margin: viewMargin, once: true });

  const variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay, duration: 0.5, ease: "easeInOut" },
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

// ------------------- Portfolio Data -------------------
const PORTFOLIO_CONTENT = [
  {
    name: "Jain Brokers",
    description:
      "A modern business website built for a cotton and yarn sourcing company — designed to showcase their global network, product range, and export expertise with a clean and trustworthy interface.",
    img: "/portfolio/jain_broker.png",
    url: "https://jainbroker.com",
  },
  {
    name: "Jain Groups",
    description:
      "A dynamic corporate website highlighting multiple business verticals under Jain Group — crafted with engaging visuals and a focus on brand consistency.",
    img: "/portfolio/jain_groups.png",
    url: "#",
  },
  {
    name: "Green Acres Realty",
    description:
      "An elegant real estate website showcasing premium projects, locations, and inquiry options — designed to reflect a high-end brand identity.",
    img: "/portfolio/green_acres.png",
    url: "https://greenacresrealty.co.in",
  },
  {
    name: "Eefa Hotel",
    description:
      "A luxury hospitality platform featuring rooms, events, and an intuitive online booking experience — optimized for both performance and elegance.",
    img: "/portfolio/eefa.png",
    url: "https://www.eefahotels.com",
  },
];


// ------------------- Portfolio Card -------------------
function PortfolioCard({ card }) {
  return (
    <ScrollView>
      <div className="group hover:scale-105 transition-all duration-500">
        <a href={card.url} target="_blank" rel="noreferrer">
          <Image
            className="w-full grayscale-[25%] hover:grayscale-0 rounded-md object-cover object-top transition-all duration-500"
            height={480}
            width={720}
            src={card.img}
            alt={card.name}
          />
          <div className="mt-4">
            <h3 className="text-title text-2xl font-medium">{card.name}</h3>
            <p className="text-muted-foreground">{card.description}</p>
          </div>
        </a>
      </div>
    </ScrollView>
  );
}

// ------------------- Portfolio Section -------------------
export default function PortfolioSection() {
  return (
    <section
      className="py-16 md:py-32 bg-gray-50 dark:bg-transparent"
      id="portfolio"
    >
      <div className="mx-auto max-w-5xl space-y-12 px-6">
        {/* Header */}
        <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
          <h2 className="text-4xl font-semibold">
            The Bizleap ecosystem — where creativity meets technology.
          </h2>
          <p className="max-w-sm sm:ml-auto">
            We design and develop responsive websites and applications that blend creativity with technology to help your brand stand out.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {PORTFOLIO_CONTENT.map((item, index) => (
            <div key={index} className={index % 2 === 1 ? "md:mt-20" : ""}>
              <PortfolioCard card={item} />
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
