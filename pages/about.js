"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import MediaSection from "../components/MediaSection";

export default function About() {
  const founders = [
    {
      name: "Akshat Soni",
      role: "Co-Founder & CEO",
      image: "/team/akshat.jpg",
      bio: "Visionary leader with a passion for creative excellence and brand growth."
    },
    {
      name: "Kaushal Banginwar",
      role: "Co-Founder & CTO",
      image: "/team/77.png",
      bio: "Strategic mastermind behind BizLeap's most successful digital campaigns."
    }
  ];

  const galleryImages = [
    { src: "/images/Team1.png", aspect: "aspect-square" },
    { src: "/images/Team2.png", aspect: "aspect-[4/5]" },
    { src: "/images/Team3.png", aspect: "aspect-video" },
    { src: "/images/Team4.png", aspect: "aspect-square" },
    { src: "/images/Office2.webp", aspect: "aspect-[3/4]" },
    { src: "/images/Office2.webp", aspect: "aspect-square" },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <Head>
        <title>About BizLeap | Driven by Design. Backed by Results.</title>
        <meta name="description" content="Discover the story behind BizLeap - a team of dreamers and builders dedicated to high-impact design and digital growth." />
      </Head>

      {/* --- CINEMATIC HERO --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Office2.webp"
            alt="BizLeap Team"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-yellow-500 font-bold tracking-[0.3em] uppercase mb-4 text-sm"
          >
            Since 2020
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8"
          >
            Turning <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Vision</span> into <br />
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Reality</span>.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-12 mt-12 items-center flex-wrap"
          >
            <div className="text-left">
              <p className="text-3xl font-bold text-white">200+</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Projects</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-left">
              <p className="text-3xl font-bold text-white">30+</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Experts</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-left">
              <p className="text-3xl font-bold text-white">6Y+</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Experience</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- OUR STORY --- */}
      <section className="py-24 px-6 md:px-16 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Our Journey <span className="text-yellow-500">Started </span> 
              with a Single Spark.
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              At Bizleap, we’re proud of our journey from humble beginnings to becoming a leading digital agency. 
              We started from scratch, with no initial investments—just sheer determination and a vision to 
              redefine how brands communicate.
            </p>
            <p className="text-lg text-gray-500">
              Today, with over 6 years of expertise, we manage a diverse portfolio of clients across various 
              industries. Our strength lies in our team—a squad of 30+ passionate creatives, developers, 
              and strategists who treat every brand like it’s their own.
            </p>
            <div className="pt-6">
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                <p className="italic text-gray-300">
                  "We don't create for clients. We create for the dreamers who want to leave a mark."
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative group">
              <Image
                src="/images/Office2.webp"
                alt="BizLeap Culture"
                fill
                className="object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -left-10 bg-yellow-500 text-black p-8 rounded-full w-32 h-32 flex flex-col items-center justify-center animate-bounce shadow-xl">
              <span className="text-2xl font-bold uppercase tracking-tight leading-none">Best</span>
              <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Agency</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- LEADERSHIP (CO-FOUNDERS) --- */}
      <section className="py-24 bg-zinc-950 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet the Visionaries</h2>
            <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">The Creative Minds Behind BizLeap</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {founders.map((founder, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-black p-8 rounded-3xl border border-white/5 hover:border-yellow-500/50 transition-all duration-500 cursor-pointer"
                onClick={() => {
                  if (founder.name.includes("Kaushal")) {
                    window.location.href = "/kaushal";
                  }
                }}
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden shrink-0 border-2 border-zinc-800">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-1">{founder.name}</h3>
                    <p className="text-yellow-500 font-bold mb-4 uppercase text-xs tracking-[0.2em]">{founder.role}</p>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* --- CONTENT SECTION (REELS) --- */}
      <MediaSection />
      
      {/* Footer Space padding */}
      <div className="h-20" />
    </div>
  );
}

