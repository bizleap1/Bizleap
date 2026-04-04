import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Linkedin, Instagram, Mail, ChevronLeft, Globe, Award, Rocket, MapPin, Phone, Briefcase, Zap, Star, Users, BookOpen,
  Mic, GraduationCap, Heart, CheckCircle2, TrendingUp, Lightbulb, ArrowRight, ExternalLink, Quote, Menu, X, Play
} from "lucide-react";

export default function AkshatProfile() {
  const [activeTab, setActiveTab] = useState("all");

  const stats = [
    { label: "Clients Delivered", value: "50+", icon: <Award className="w-5 h-5 text-brand-accent" /> },
    { label: "Cities Reached", value: "15+", icon: <Globe className="w-5 h-5 text-brand-accent" /> },
  ];

  const timeline = [
    {
      year: "The Startup",
      event: "Foundations in Sales",
      desc: "Started with hands-on experience in sales and business development, mastering the art of conversion and relationship building."
    },
    {
      year: "The Strategy",
      event: "System Architecture",
      desc: "Built scalable marketing systems for businesses, focusing on the technical integration of SEO, social, and conversion funnels."
    },
    {
      year: "The Venture",
      event: "Retail Brand Launch",
      desc: "Founded a smoothie and shakes brand, gaining deep insights into operational excellence and hyper-local brand positioning."
    },
    {
      year: "The Digital",
      event: "Cloud Kitchen Growth",
      desc: "Architected the digital presence for QuickBites cloud kitchen, optimizing customer acquisition through data-driven storytelling."
    },
    {
      year: "The Scale",
      event: "Founded BizLeap",
      desc: "Launched BizLeap to help global brands dominate digital landscapes through high-performance, revenue-focused systems."
    }
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-brand-accent selection:text-black min-h-screen relative">
      <Head>
        <title>Akshat Soni | Co-founder & CEO, BizLeap</title>
        <meta name="description" content="Official portfolio of Akshat Soni - Revenue Growth Strategist and co-founder of BizLeap." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Akshat Soni",
              "jobTitle": "Co-founder & CEO",
              "worksFor": {
                "@type": "Organization",
                "name": "Bizleap"
              },
              "url": "https://bizleap.in/akshat",
              "sameAs": [
                "https://www.linkedin.com/in/akshat-soni-664879208/",
                "https://www.instagram.com/akshat.sonii/"
              ]
            })
          }}
        />
      </Head>

      {/* GLOBAL AMBIENT GLOWS */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] translate-y-1/4 translate-x-1/4 pointer-events-none z-0" />

      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex justify-between items-center text-white">
          <Link href="/team" className="flex items-center gap-2 group text-white/70 hover:text-white font-medium text-sm tracking-tight transition-colors">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-black group-hover:border-brand-accent transition-all duration-300">
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            </div>
            Back to Team
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#story" className="text-sm font-medium text-white/50 hover:text-brand-accent transition-colors">Story</Link>
            <Link href="#journey" className="text-sm font-medium text-white/50 hover:text-brand-accent transition-colors">Journey</Link>
            <Link href="#contact" className="px-6 py-2.5 bg-brand-accent text-black rounded-full text-sm font-bold hover:bg-white hover:scale-105 transition-all duration-300">
              Get in Touch
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="min-h-[100svh] pt-24 pb-12 flex flex-col lg:flex-row items-center justify-center relative max-w-[1400px] mx-auto px-6">
          <div className="flex-1 space-y-8 z-10 w-full lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-xs font-bold text-white/80 tracking-widest uppercase">Co-founder & CEO</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-8xl lg:text-[7.5rem] font-serif font-bold leading-[0.95] tracking-tight text-white">
                Akshat <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-amber-200 to-amber-600 italic pr-4">
                  Soni
                </span>
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-white/50 leading-relaxed font-light mt-6">
                Revenue Growth Strategist. Focused on building scalable marketing systems that drive measurable revenue growth and business impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-6"
            >
              <Link href="#contact" className="flex items-center gap-3 bg-brand-accent text-black px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 group hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]">
                Start a Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:rotate-45 transition-transform" />
              </Link>
              <div className="flex gap-2 ml-auto lg:ml-4">
                <Link href="#" className="p-4 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-brand-accent transition-all">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="#" className="p-4 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-brand-accent transition-all">
                  <Instagram className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="flex-1 w-full lg:w-auto relative mt-16 lg:mt-0 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-[2.5rem] p-4 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md border border-white/10 shadow-2xl group overflow-visible">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80" />
                <Image
                  src="/team/akshat.jpg"
                  alt="Akshat Soni"
                  fill
                  className="object-cover transition-all duration-1000"
                  priority
                />

                {/* FLOATING STATS */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-4">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + (i * 0.2) }}
                      className="flex-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
                    >
                      <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-brand-accent/80 font-bold mt-1 line-clamp-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* LOGO TICKER */}
        <section className="py-12 border-y border-white/5 bg-white/[0.02] flex relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          <div className="flex gap-24 items-center whitespace-nowrap px-12 animate-scroll opacity-40">
            {['ICAI', 'IIM Nagpur', 'Symbiosis Pune', 'Kirti College Mumbai', 'Raisoni Group'].map((w, i) => (
              <span key={i} className="text-3xl font-serif font-black tracking-widest text-transparent paint-stroke text-white/20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>{w}</span>
            ))}
            {['ICAI', 'IIM Nagpur', 'Symbiosis Pune', 'Kirti College Mumbai', 'Raisoni Group'].map((w, i) => (
              <span key={i + 'dup'} className="text-3xl font-serif font-black tracking-widest text-transparent paint-stroke text-white/20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>{w}</span>
            ))}
          </div>
        </section>

        {/* STORY SECTION */}
        <section id="story" className="relative min-h-[200vh]">
          <div className="max-w-[1400px] mx-auto px-6 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative h-full">
              {/* Image Frame - Left - LOCKED DURING SECTION SCROLL */}
              <div className="lg:col-span-5 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] lg:flex lg:items-center z-10">
                <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5">
                  <Image
                    src="/team/akshat.jpg"
                    alt="Akshat Soni Story"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              </div>

              {/* Bio Text - Right - SCROLLABLE */}
              <div className="lg:col-span-7 py-32 space-y-12 relative z-20">
                <motion.div {...fadeUp} className="prose prose-lg prose-invert text-white/70 font-light leading-loose max-w-none">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-10 leading-tight">
                    Engineering <br /> <span className="text-brand-accent italic">Strategic Growth.</span>
                  </h2>
                  <p className="mb-8">
                    Entrepreneur and digital marketing strategist specializing in revenue-focused marketing systems. My journey is defined by a shift from hands-on sales development to co-founding a high-performance marketing agency.
                  </p>
                  <p className="mb-8">
                    I believe that marketing is not just about reach; it is about building architectures that convert attention into measurable ROI. By combining operational precision with digital storytelling, I help brands bridge the gap between their vision and market dominance.
                  </p>
                  
                  <div className="space-y-6 my-12">
                    <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-tighter">Current Ecosystem:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                      <li className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:bg-brand-accent transition-all duration-300">
                        <span className="text-brand-accent font-bold block mb-2 uppercase tracking-widest text-[10px] group-hover:text-black">BizLeap</span>
                        <h4 className="text-lg font-serif font-bold text-white group-hover:text-black mb-2">Digital Growth Agency</h4>
                        <p className="text-xs leading-relaxed text-white/50 group-hover:text-black/70">Building next-gen systems for brands scaling globally.</p>
                      </li>
                      <li className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:bg-brand-accent transition-all duration-300">
                        <span className="text-brand-accent font-bold block mb-2 uppercase tracking-widest text-[10px] group-hover:text-black">Smoothie Brand</span>
                        <h4 className="text-lg font-serif font-bold text-white group-hover:text-black mb-2">Retail Venture</h4>
                        <p className="text-xs leading-relaxed text-white/50 group-hover:text-black/70">Mastering hyper-local operational excellence and customer strategy.</p>
                      </li>
                      <li className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:bg-brand-accent transition-all duration-300">
                        <span className="text-brand-accent font-bold block mb-2 uppercase tracking-widest text-[10px] group-hover:text-black">QuickBites</span>
                        <h4 className="text-lg font-serif font-bold text-white group-hover:text-black mb-2">Cloud Kitchen</h4>
                        <p className="text-xs leading-relaxed text-white/50 group-hover:text-black/70">Optimizing digital acquisition for high-velocity food delivery.</p>
                      </li>
                      <li className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:bg-brand-accent transition-all duration-300">
                        <span className="text-brand-accent font-bold block mb-2 uppercase tracking-widest text-[10px] group-hover:text-black">HiTech Circle</span>
                        <h4 className="text-lg font-serif font-bold text-white group-hover:text-black mb-2">Study Circle</h4>
                        <p className="text-xs leading-relaxed text-white/50 group-hover:text-black/70">Empowering future leaders through advanced technical education.</p>
                      </li>
                    </ul>
                  </div>

                  <p className="text-2xl font-serif font-bold text-white italic border-l-2 border-brand-accent pl-8 py-2">
                    "Growth comes from strategy, execution, and the ability to turn opportunities into measurable results."
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* THE JOURNEY SECTION */}
        <section id="journey" className="py-32 relative bg-white/[0.02] border-y border-white/5">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative">
              <div className="lg:col-span-8 order-2 lg:order-1">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12 py-8"
                >
                  <div className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-gradient-to-b from-brand-accent via-brand-accent/20 to-transparent" />

                  {timeline.map((item, i) => (
                    <motion.div key={i} variants={staggerItem} className="relative pl-10 md:pl-16 group text-white">
                      <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-[#050505] border-2 border-brand-accent group-hover:bg-brand-accent group-hover:scale-150 transition-all duration-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />

                      <div className="bg-white/[0.05] border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/[0.08] hover:border-brand-accent/30 transition-all duration-500 backdrop-blur-md shadow-2xl relative overflow-hidden group/card">
                        <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-accent text-black text-[10px] font-black tracking-[0.2em] uppercase">{item.year}</span>
                        <h4 className="text-3xl font-serif font-bold mb-4 leading-tight group-hover/card:text-brand-accent transition-colors">{item.event}</h4>
                        <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="lg:col-span-4 sticky top-1/4 order-1 lg:order-2 h-fit">
                <motion.div {...fadeUp} className="space-y-10 text-white">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      <span className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">The Experience</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-serif font-bold leading-[1.1]">
                      Defining <br /> <span className="text-brand-accent italic">Success</span>.
                    </h2>
                    <p className="text-white/40 text-lg leading-relaxed font-light">
                      Scaling from sales foundations to architecting global growth ecosystems.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 pt-10 border-t border-white/10">
                    {[
                      { label: "Clients Delivered", value: "50+" },
                      { label: "Cities Reached", value: "15+" }
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="text-3xl font-serif font-black text-brand-accent group-hover:scale-110 transition-transform">{stat.value}</div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSING SECTION */}
        <section className="py-24 relative overflow-hidden bg-brand-accent">
          <div className="max-w-[1400px] mx-auto text-center relative z-10">
            <motion.div {...fadeUp} className="max-w-4xl mx-auto space-y-8">
              <Quote className="w-16 h-16 text-black/10 mx-auto" />
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-black leading-tight tracking-tighter">
                "Strategy is empty without execution. <br /> Let's build a revenue-focused system for your brand."
              </h2>
              <div className="pt-6">
                <Link href="#contact" className="inline-flex items-center gap-4 px-10 py-4 bg-black text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all">
                  Get Started Today <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 relative">
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 z-10">
              <div className="space-y-4">
                <h2 className="text-6xl md:text-[5.5rem] font-serif font-bold text-white leading-[0.9]">
                  Let's craft the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-amber-600 italic">Next Scale.</span>
                </h2>
                <p className="text-white/50 max-w-md text-lg font-light leading-relaxed mt-6">
                  Ready to optimize your revenue funnels? Connect for a strategic growth audit.
                </p>
              </div>
            </div>

            <motion.div {...fadeUp} className="bg-[#080808] p-10 md:p-14 rounded-[3rem] shadow-2xl border border-white/5 relative z-10 w-full overflow-hidden group text-white">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-accent outline-none" placeholder="Akshat Soni" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">Email Address</label>
                    <input type="email" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-accent outline-none" placeholder="akshat@bizleap.in" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">Growth Goal</label>
                  <textarea className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-accent outline-none h-40 resize-none" placeholder="Tell me about your business goals..."></textarea>
                </div>
                <button className="w-full py-5 bg-brand-accent text-black rounded-2xl font-bold hover:bg-white transition-all duration-300 shadow-xl flex items-center justify-center gap-3">
                  Launch Growth <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
