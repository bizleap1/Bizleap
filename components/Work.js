'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "XOOM PATROL",
    brand: "HERO MOTOCORP",
    published: "16 DEC 2024",
    description:
      "India's first-ever scooter-driven travel & adventure series. This 6 episode journey is all about the thrill of exploring new destinations and the excitement of adventure...",
    img: "/images/abstract-3.webp",
    logo: "/images/Hero.svg",
  },
  {
    title: "PRAGATI KE RANG",
    brand: "ASIAN PAINTS",
    published: "19 SEP 2024",
    description:
      "India's First Rural Content IP featuring Regional YouTube Creators... Each episode shows how these creators along with Asian Paints have transformed a community space...",
    img: "/images/abstract-1.webp",
    logo: "/images/Hero.svg",
  },
  // add more projects here
];

export default function Work() {
  const [current, setCurrent] = useState(0);

  const nextProject = () => setCurrent((prev) => (prev + 1) % projects.length);
  const prevProject = () =>
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section className="w-full min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Our Work</h2>
          <div className="flex gap-4">
            <button
              onClick={prevProject}
              className="border border-white rounded-full p-3 hover:bg-white hover:text-black transition"
            >
              &#8592;
            </button>
            <button
              onClick={nextProject}
              className="border border-white rounded-full p-3 hover:bg-white hover:text-black transition"
            >
              &#8594;
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={current}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row w-full gap-8 items-start md:items-center"
            >
              <div className="flex-1">
                <div className="mb-6">
                  <Image
                    src={projects[current].logo}
                    alt={projects[current].brand}
                    width={200}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <p className="mb-6 text-white">{projects[current].description}</p>
                <div className="grid grid-cols-2 gap-2 text-gray-300">
                  <div>TITLE</div>
                  <div>{projects[current].title}</div>
                  <div>BRAND</div>
                  <div>{projects[current].brand}</div>
                  <div>PUBLISHED</div>
                  <div>{projects[current].published}</div>
                </div>
              </div>

              <div className="flex-1">
                <Image
                  src={projects[current].img}
                  alt={projects[current].title}
                  width={600}
                  height={400}
                  className="object-cover rounded-lg"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
