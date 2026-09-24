"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { motion } from "motion/react";

const SERVICES = [
  {
    name: "UI/UX & Web Design",
    tags: ["Figma", "Wireframing", "Prototyping", "Responsive Design", "User Testing"],
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1400",
    url: "/webdesign",
    description:
      "End-to-end digital design from wireframes to polished interfaces. We create intuitive, visually appealing experiences for websites and apps, backed by user research and iterative testing.",
  },
  {
    name: "Brand Identity Design",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity", "Typography", "Color Theory"],
    img: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&q=80&w=1400",
    url: "/brandidentity",
    description:
      "Comprehensive branding packages including logos, style guides, and asset kits. We craft cohesive visual identities that communicate your brand’s essence across all touchpoints.",
  },
  {
    name: "SEO & Website Audits",
    tags: ["Technical SEO", "Keyword Strategy", "On-Page Optimization", "Analytics", "Performance Tuning"],
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1400",
    url: "/seowebsite",
    description:
      "Data-driven SEO audits and optimizations to improve rankings. We analyze technical health, content gaps, and backlink profiles to drive organic growth.",
  },
  {
    name: "Social Media Marketing",
    tags: ["Meta Ads", "Instagram Reels", "Content Strategy", "Community Management", "Performance Tracking"],
    img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1400",
    url: "/socialmedia",
    description:
      "Full-service social media management—from organic content creation to paid campaigns. We build engaging narratives and measurable strategies tailored to each platform.",
  },
  {
    name: "AI Services",
    tags: ["AI Automation", "ChatBot Integration", "Generative Content", "AI Strategy", "Workflow AI"],
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1400",
    url: "/aiservices",
    description:
      "We integrate cutting-edge AI into your business workflows — from intelligent chatbots to generative content engines that work while you sleep.",
  },
  {
    name: "Staffing Services",
    tags: ["Recruitment", "Talent Acquisition", "Headhunting", "Screening"],
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1400",
    url: "/staffing",
    description:
      "End-to-end staffing solutions to help you build your dream team. We specialize in finding the right candidates to match your company's culture and needs.",
  },
];

const padZero = (num) => String(num).padStart(2, "0");

export default function ServicesSection() {
  const scrollToService = (e, index) => {
    e.preventDefault();
    const element = document.getElementById(`service-${index}`);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 50, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title key="title">Our Services | Bizleap</title>
        <meta name="description" content="Bizleap offers digital marketing, web development, branding, SEO, and creative services designed to help businesses grow and succeed online." key="description" />
        <meta name="keywords" content="bizleap services, seo web design branding Nagpur" />
        <link rel="canonical" href="https://bizleap.in/services" />
      </Head>

      <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-yellow-500/30 selection:text-white pb-[100px]">
        
        {/* ====================================================
            HERO
            ==================================================== */}
        <section className="relative w-full min-h-[70vh] md:min-h-[85vh] overflow-hidden bg-black flex flex-col justify-start">
          {/* Dynamic Yellow Glows */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <motion.div
              animate={{
                x: ["-20vw", "80vw", "80vw", "-20vw", "-20vw"],
                y: ["-20vh", "-20vh", "80vh", "80vh", "-20vh"],
                opacity: [0.5, 0.7, 0.5, 0.7, 0.5],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-[50vh] h-[50vh] md:w-[70vh] md:h-[70vh] bg-yellow-400 rounded-full blur-[120px] md:blur-[150px] mix-blend-screen"
            />
            <motion.div
              animate={{
                x: ["80vw", "-20vw", "-20vw", "80vw", "80vw"],
                y: ["80vh", "80vh", "-20vh", "-20vh", "80vh"],
                opacity: [0.4, 0.6, 0.4, 0.6, 0.4],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-[60vh] h-[60vh] md:w-[80vh] md:h-[80vh] bg-yellow-500 rounded-full blur-[130px] md:blur-[160px] mix-blend-screen"
            />
          </div>

          <div className="pt-[140px] md:pt-[240px] pb-[120px] md:pb-[250px] max-w-[1360px] mx-auto px-5 md:px-[60px] lg:px-[72px] relative z-10 w-full">
            <div className="flex flex-col justify-start relative">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-[46px] md:text-[76px] lg:text-[90px] font-serif font-light leading-[1.05] tracking-tight text-white max-w-[900px]"
              >
                Everything you need<br className="hidden md:block" /> to <span className="text-[#E5A900] italic font-medium">scale.</span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-6 md:mt-8 max-w-xl"
              >
                <p className="text-lg md:text-xl text-[#999] font-light leading-relaxed">
                  Engineered for performance and designed for conversion. We provide the complete stack for your digital presence.
                </p>
              </motion.div>
            </div>
          </div>
        </section>


        {/* ====================================================
            MAIN SERVICES
            ==================================================== */}
        <div className="max-w-[1360px] mx-auto px-5 md:px-[60px] lg:px-[72px]">
          {SERVICES.map((service, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <section 
                id={`service-${index}`} 
                key={service.name}
                className="min-h-[75vh] md:min-h-[85vh] py-[80px] md:py-[120px] lg:py-[150px] border-t border-[#222] flex flex-col justify-center relative scroll-mt-24"
              >
                <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-[10%]`}>
                  
                  {/* TEXT COLUMN */}
                  <div className={`w-full ${isReversed ? 'lg:w-[45%]' : 'lg:w-[42%]'} flex flex-col`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <h2 className="text-[32px] md:text-[44px] lg:text-[46px] xl:text-[52px] font-serif font-light leading-[1.1] mb-8 text-white lg:whitespace-nowrap">
                        {service.name}
                      </h2>
                      
                      <p className="text-[#999] text-base md:text-lg font-light leading-relaxed max-w-[500px] mb-12">
                        {service.description}
                      </p>
                    </motion.div>
                    
                    {/* CAPABILITIES */}
                    <div className="mb-10 w-full max-w-[500px]">
                      {service.tags.slice(0, 3).map((tag, tagIndex) => (
                        <motion.div 
                          key={tag}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.4, delay: tagIndex * 0.05 }}
                          className="border-t border-[#222] py-[16px] flex justify-between items-center"
                        >
                          <span className="text-[#999] font-light">
                            {tag}
                          </span>
                        </motion.div>
                      ))}
                      <div className="border-t border-[#222]" />
                      
                      {/* VIEW DETAILS LINK (Integrated into list) */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="mt-6"
                      >
                        <Link
                          href={service.url}
                          className="border-b border-[#222] py-[20px] group flex justify-between items-center cursor-pointer transition-all duration-300 hover:border-yellow-500/30 block w-full"
                        >
                          <span className="text-white font-bold text-xs md:text-[13px] uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-yellow-500">
                            View Details
                          </span>
                          <span className="text-[#555] group-hover:text-yellow-500 font-light text-xl leading-none transition-transform duration-300 group-hover:translate-x-2">
                            →
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  </div>

                  {/* IMAGE COLUMN */}
                  <div className={`w-full ${isReversed ? 'lg:w-[55%]' : 'lg:w-[58%]'} flex items-center`}>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-[#111]"
                    >
                      <Image 
                        src={service.img} 
                        alt={service.name} 
                        fill 
                        className="object-cover transition-transform duration-700 hover:scale-[1.02]" 
                      />
                    </motion.div>
                  </div>
                  
                </div>


              </section>
            );
          })}
        </div>



      </main>
    </>
  );
}
