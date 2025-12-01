"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Lord Of the Drinks - Brand Revival",
    brand: "Lord Of the Drinks",
    description:
      "Once trending in Nagpur, Lord of the Drinks faced declining sales. Bizleap revived the brand with a six-month social media strategy, creative content, food photography, and high-impact events. The result: renewed buzz, higher footfall, and a strong comeback as one of Nagpur’s top F&B brands.",
    img: "/Casestudy/LOD.png",
    logo: "/clients/15.png",
  },
  {
    title: "Rasoi Express - Food Delivery for Small Towns",
    brand: "Rasoi Express",
    description:
      "Bizleap launched Rasoi Express in Pandharkawda, giving 50,000+ residents their first food delivery app. It brings hot meals home, supports local restaurants, and creates jobs—proving small towns deserve big-city convenience.",
    img: "/Casestudy/Rasoi.png",
    logo: "/clients/66.png",
  },
  {
    title: "Hotel Anantara - New Year Party",
    brand: "Hotel Anantara",
    description:
      "Bizleap transformed Nagpur’s biggest New Year party at Hotel Anantara into a record-breaking success — with impactful Instagram promotions, lead-driven campaigns, and flawless execution that made it the city’s most talked-about celebration.",
    img: "/Casestudy/Anantara.png",
    logo: "/clients/20.png",
  },
  {
    title: "Tuli The Grand - Brand Launch",
    brand: "Tuli The Grand",
    description:
      "We launched Tuli The Grand, a flagship venture of the Tuli Group of Hotels in Nagpur, creating its complete brand identity from logo to strategy. The inauguration was graced by Hon. Nitin Gadkari as chief guest.",
    img: "/Casestudy/tuli.png",
    logo: "/clients/14.png",
  },
  {
    title: "Bizleap x SolarArk: Website Revamp",
    brand: "SOLAR ARK",
    description:
      "Bizleap redesigned Solar Ark’s website with fresh content, on-site shoots, and client stories—creating a platform that highlights their solar expertise and strengthens brand credibility.",
    img: "/Casestudy/solar.webp",
    logo: "/clients/52.png",
  },
];

export default function Work() {
  const [current, setCurrent] = useState(0);

  const nextProject = () => setCurrent((prev) => (prev + 1) % projects.length);
  const prevProject = () =>
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section className="w-full min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* ===== Section Header ===== */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-yellow-400">Case Study</h2>
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

        {/* ===== Project Content ===== */}
        <div className="flex flex-col md:flex-row gap-10 overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={current}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col md:flex-row w-full gap-10 items-start md:items-center"
            >
              {/* ===== Left Side (Text + Logo) ===== */}
              <div className="flex-1">
                {/* Title above logo */}
                <h3 className="text-2xl font-semibold mb-1 text-white">
                  {projects[current].title}
                </h3>

                <div className="mb-1">
                  <Image
                    src={projects[current].logo}
                    alt={projects[current].brand}
                    width={180}
                    height={60}
                    className="object-contain"
                  />
                </div>

                <p className="mb-6 text-gray-300 leading-relaxed">
                  {projects[current].description}
                </p>

                <div className="text-sm text-gray-400 uppercase tracking-wide">
                  <span className="font-semibold text-white">Brand:</span>{" "}
                  {projects[current].brand}
                </div>
              </div>

              {/* ===== Right Side (Image) ===== */}
              <div className="flex-1">
                <Image
                  src={projects[current].img}
                  alt={projects[current].title}
                  width={600}
                  height={400}
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
