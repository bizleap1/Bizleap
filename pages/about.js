"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function About() {
  const galleryImages = [
    "/images/Team1.png",
    "/images/Team2.png",
    "/images/Team3.png",
    "/images/Team4.png",
  ];

  const bottomMedia = [
    
    { type: "video", src: "/Reel2.mp4" },
    { type: "video", src: "/Reel1.mp4" },
    { type: "video", src: "/Reel3.mp4" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-16 lg:px-32 py-20">

      {/* ===== TOP IMAGE GALLERY WITH ARROWS ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col items-center text-center mb-24"
      >
        {/* Main Image Carousel */}
        <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[currentIndex]}
                alt={`Gallery ${currentIndex + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-white/20"
          >
            ←
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-white/20"
          >
            →
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>

        {/* Caption */}
        <p className="text-gray-300 text-lg mt-8 max-w-2xl">
          A full service talent management, influencer marketing, and video production company.
        </p>

        {/* Thumbnail Row */}
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`relative w-40 h-24 rounded-xl overflow-hidden border-2 cursor-pointer transition-transform duration-300 ${
                i === currentIndex ? "border-yellow-400 scale-105" : "border-gray-700 hover:scale-105"
              }`}
            >
              <Image src={src} alt={`Thumb ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ===== ABOUT US SECTION ===== */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex-1"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-8">About Us</h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            BizLeap is a next-generation business solutions company empowering
            brands and creators through strategy, technology, and creative media.
            We specialize in talent management, influencer marketing, and content
            production — driving authentic growth in the digital landscape.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Our advantage lies in our integrated approach. From managing digital
            creators to executing full-scale marketing campaigns, we build
            strategies that connect with audiences and amplify brand presence.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            With a team of experts across domains, we ensure every collaboration
            drives measurable results and long-term success in a rapidly evolving
            digital world.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <Image
              src="/images/Office2.webp"
              alt="BizLeap Office"
              width={800}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      </div>

      {/* ===== BOTTOM SECTION (MEDIA GRID) ===== */}
      {/* ===== BOTTOM SECTION (MEDIA GRID - FULL WIDTH MASONRY) ===== */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
  viewport={{ once: true }}
  className="w-full mt-24 px-4 md:px-10"
>
  <div className="text-center max-w-5xl mx-auto mb-12">
    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      India’s Leading Creator Business
    </h2>
    <p className="text-gray-400 text-lg max-w-3xl mx-auto">
      We collaborate with top creators, influencers, and brands to craft
      meaningful campaigns that inspire, engage, and deliver impact at scale.
    </p>
  </div>

  {/* Masonry Layout */}
  <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 max-w-7xl mx-auto">
    {bottomMedia.map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: i * 0.1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-800 cursor-pointer hover:scale-[1.02] transition-transform duration-300 break-inside-avoid"
        onClick={() => setSelectedMedia(item.src)}
      >
        {item.type === "image" ? (
          <Image
            src={item.src}
            alt="Media"
            width={800}
            height={600}
            className="object-cover w-full h-auto"
          />
        ) : (
          <video
            src={item.src}
            className="object-cover w-full h-auto"
            muted
            autoPlay
            loop
          />
        )}
      </motion.div>
    ))}
  </div>
</motion.div>


      {/* ===== FULLSCREEN MEDIA MODAL ===== */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setSelectedMedia(null)}
          >
            {selectedMedia.endsWith(".mp4") ? (
              <video src={selectedMedia} controls autoPlay className="max-h-[90vh] rounded-lg" />
            ) : (
              <Image
                src={selectedMedia}
                alt="Full view"
                width={1000}
                height={700}
                className="object-contain max-h-[90vh] rounded-lg"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
