import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin, Instagram, Mail, ChevronLeft, Globe, Award, Rocket,
  MapPin, Phone, Briefcase, Zap, Star, Users, BookOpen,
  Mic, GraduationCap, Heart, CheckCircle2, TrendingUp, Lightbulb,
  ArrowRight, ExternalLink, Quote, Menu, X, Play
} from "lucide-react";

export default function KaushalProfile() {
  const [activeTab, setActiveTab] = useState("all");

  const stats = [
    { label: "Years of Excellence", value: "6+", icon: <Award className="w-5 h-5 text-brand-accent" /> },
    { label: "Strategic Partners", value: "15+", icon: <Briefcase className="w-5 h-5 text-brand-accent" /> },
  ];

  const categories = ["all", "Automotive", "Hospitality", "Healthcare", "B2B"];

  const projects = [
    {
      title: "Nexa Cars - Social Media Growth",
      category: "Automotive",
      desc: "Managed social media for Nexa dealership in Yavatmal district. Developed comprehensive content strategy aligned with brand guidelines. Delivered consistent lead generation through targeted campaigns.",
      image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2070&auto=format&fit=crop",
      tags: ["Social Media", "Lead Gen", "Content Strategy"]
    },
    {
      title: "Resort & Travel Marketing",
      category: "Hospitality",
      desc: "Created SEO-driven content for Papillon India (tours & travel). Developed 3-month social media plans for resort properties. Integrated content marketing with direct booking funnels.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop",
      tags: ["SEO", "Conversion", "Booking Funnels"]
    },
    {
      title: "Dental Practice Video Series",
      category: "Healthcare",
      desc: "Produced educational video content for dental professionals. Focused on visual storytelling and audience engagement. Built trust through informative, value-driven content.",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop",
      tags: ["Video Marketing", "Storytelling", "Trust Building"]
    },
    {
      title: "Solar Manufacturing LinkedIn Strategy",
      category: "B2B",
      desc: "Developed LinkedIn content plan for solar manufacturing client. Corporate-focused messaging targeting decision-makers. Positioned brand as industry thought leader.",
      image: "https://images.unsplash.com/photo-1509391366360-feaffa64e4c9?q=80&w=2070&auto=format&fit=crop",
      tags: ["B2B", "LinkedIn", "Thought Leadership"]
    }
  ];

  const timeline = [
    {
      year: "2018",
      event: "Age 15: Modicare franchise",
      desc: "Launched Modicare franchise while in 10th standard. Built a network of 2,000+ distributors and learned the fundamentals of relationship management, sales operations, and business execution."
    },
    {
      year: "2019",
      event: "Started Marketing Journey",
      desc: "Began freelance marketing work while continuing studies. Started learning the digital ecosystem—social media, content strategy, and brand positioning."
    },
    {
      year: "2020",
      event: "Professional Certifications",
      desc: "Earned certifications across LinkedIn, Instagram, and Facebook marketing platforms. Committed to mastering the craft, not just learning surface-level tactics."
    },
    {
      year: "2020",
      event: "Founded Bizleap",
      desc: "Launched Bizleap as a full-service digital marketing agency. Started with solo projects, gradually building a team of passionate marketers and strategists."
    },
    {
      year: "2023",
      event: "Scaled to 20+ Members",
      desc: "Grew Bizleap to 35+ professionals. Established 250+ strategic brand partnerships across automotive, hospitality, healthcare, and startup sectors."
    },
    {
      year: "2024",
      event: "Public Speaking & Education",
      desc: "Delivered 15+ speaking engagements at prestigious institutions. Shared insights on digital marketing, entrepreneurship, and building scalable businesses."
    },
    {
      year: "2025",
      event: "Expanding to Content Creation",
      desc: "Launching educational content initiatives to make high-level marketing strategies accessible to aspiring entrepreneurs. Democratizing knowledge, not gatekeeping it."
    },
    {
      year: "2026",
      event: "AAI",
      desc: "Expansion into advanced AI integrated marketing solutions and institutional partnerships."
    },
    {
      year: "2026",
      event: "Aswaad by Vijaye",
      desc: "Collaborative venture focusing on premium brand storytelling and gourmet visual narratives."
    }
  ];

  const testimonials = [
    {
      name: "Neha Sharma",
      role: "Founder, NPM",
      content: "Strategic digital marketing that transformed our presence. The focus on ROI is phenomenal.",
      avatar: "https://i.pravatar.cc/150?u=ritesh"
    },
    {
      name: "Dr. Anjali Verma",
      role: "Lead Dentist, Smile Dental",
      content: "Educational content strategy that increased patient inquiries by 40% in just three months.",
      avatar: "https://i.pravatar.cc/150?u=anjali"
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
    <div className="bg-[#050505] text-white font-sans selection:bg-brand-accent/40 selection:text-black min-h-screen relative">
      <Head>
        <title>Kaushal Banginwar | Co-founder & CTO</title>
        <meta name="description" content="Official portfolio of Kaushal Banginwar - A premium founder and digital marketing visionary." />
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
            <Link href="#work" className="text-sm font-medium text-white/50 hover:text-brand-accent transition-colors">Work</Link>
            <Link href="#contact" className="px-6 py-2.5 bg-brand-accent text-black rounded-full text-sm font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
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
              <span className="text-xs font-bold text-white/80 tracking-widest uppercase">Available for Consulting</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-serif font-bold leading-[1.05] tracking-tight">
                Kaushal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-amber-200 to-amber-600 italic pr-4">
                  Banginwar
                </span>
              </h1>
              <p className="max-w-xl text-base md:text-lg text-white/50 leading-relaxed font-light mt-6">
                Co-founder & CTO of BizLeap. Strategic architect of digital narratives that scale brands and define industry standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-6"
            >
              <Link href="#contact" className="flex items-center gap-2 bg-brand-accent text-black px-6 py-3 text-sm rounded-full font-bold hover:bg-white transition-all duration-300 group hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]">
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:rotate-45 transition-transform" />
              </Link>
              <Link href="#work" className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 text-sm rounded-full font-bold hover:bg-white/10 transition-all duration-300">
                <Play className="w-4 h-4 text-brand-accent" />
                View Work
              </Link>
              <div className="flex gap-2 ml-auto lg:ml-4">
                <Link href="#" className="p-4 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-brand-accent hover:border-brand-accent transition-all group backdrop-blur-sm">
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
                <Link href="#" className="p-4 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-brand-accent hover:border-brand-accent transition-all group backdrop-blur-sm">
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
            <div className="relative w-full max-w-[480px] mx-auto aspect-[4/5] rounded-[2.5rem] p-4 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md border border-white/10 shadow-2xl overflow-visible group">
              <div className="absolute inset-x-8 -top-8 -bottom-8 bg-brand-accent/20 rounded-[3rem] blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 mix-blend-multiply" />
                <Image
                  src="/team/77.png"
                  alt="Kaushal Banginwar"
                  fill
                  className="object-cover object-top filter contrast-[1.1] grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0"
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
                      className="flex-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 transform transition-transform hover:-translate-y-2"
                    >
                      <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-brand-accent/80 font-bold mt-1 line-clamp-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative Tech Graphic */}
              <div className="absolute -right-12 top-1/2 w-24 h-24 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md bg-white/5 rotate-90 hidden lg:flex shadow-xl">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">BizLeap</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* LOGO TICKER (Conceptual) */}
        <section className="py-12 border-y border-white/5 bg-white/[0.02] flex relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          <div className="flex gap-24 items-center whitespace-nowrap px-12 animate-scroll opacity-40">
            {['Amity University', 'Symbiosis', 'Raisoni Group', 'Dhanwate National', 'Palloti College'].map((w, i) => (
              <span key={i} className="text-3xl font-serif font-black tracking-widest text-transparent paint-stroke text-white/20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>{w}</span>
            ))}
            {/* Duplicate for infinite effect */}
            {['Amity University', 'Symbiosis', 'Raisoni Group', 'Dhanwate National', 'Palloti College'].map((w, i) => (
              <span key={i + 'dup'} className="text-3xl font-serif font-black tracking-widest text-transparent paint-stroke text-white/20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>{w}</span>
            ))}
          </div>
        </section>

        {/* STATISTICS SECTION */}
        <section className="py-20 bg-black/50 backdrop-blur-sm border-b border-white/5">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { label: "Team Member", value: "35+" },
                { label: "Brands", value: "250+" },
                { label: "Students Mentor", value: "10k+" }
              ].map((stat, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="text-4xl md:text-5xl font-serif font-black text-brand-accent">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STORY SECTION */}
        <section id="story" className="relative min-h-[200vh]">
          <div className="max-w-[1400px] mx-auto px-6 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative h-full">
              {/* Image Frame - Left - LOCKED DURING SECTION SCROLL */}
              <div className="lg:col-span-5 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] lg:flex lg:items-center z-10">
                <div className="relative w-full max-w-[400px] mx-auto aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5">
                  <Image
                    src="/IMG_8071.JPEG"
                    alt="Kaushal Banginwar Story"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              </div>

              {/* Bio Text - Right - SCROLLABLE CONTENT */}
              <div className="lg:col-span-7 py-32 space-y-12 relative z-20">
                <motion.div {...fadeUp} className="prose prose-lg prose-invert text-white/70 font-light leading-loose max-w-none">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-10 leading-tight">
                    Beyond the <br /> <span className="text-brand-accent italic">Entrepreneurial Surface.</span>
                  </h2>
                  <p className="mb-8">
                    Most 15-year-olds worry about exams. I was building a 2,000-person network while juggling 10th standard homework. That's when I learned my first lesson in entrepreneurship: age is just a number—execution is everything.
                  </p>
                  <p className="mb-8">
                    My entrepreneurial journey started with a Modicare franchise. No fancy business plan, no seed funding—just pure hustle and a willingness to learn. I'd spend mornings in class, afternoons building relationships, and evenings managing operations. It was exhausting, exhilarating, and everything in between.
                  </p>
                  <p className="mb-8">
                    That early taste of business shaped everything that followed. I come from a business family—Banginwar Marketing has been serving the agricultural community for years. Growing up around customer relationships and operational excellence gave me a foundation that most MBA programs can't teach.
                  </p>
                  <div className="space-y-6 my-12">
                    <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-tighter">Current Ecosystem:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                      <li className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:bg-brand-accent transition-all duration-300">
                        <span className="text-brand-accent font-bold block mb-2 uppercase tracking-widest text-[10px] group-hover:text-black">Bizleap</span>
                        <h4 className="text-lg font-serif font-bold text-white group-hover:text-black mb-2">Digital Marketing Agency</h4>
                        <p className="text-xs leading-relaxed text-white/50 group-hover:text-black/70">A specialized team of 35+ professionals scaling brands across diverse sectors.</p>
                      </li>
                      <li className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:bg-brand-accent transition-all duration-300">
                        <span className="text-brand-accent font-bold block mb-2 uppercase tracking-widest text-[10px] group-hover:text-black">Banginwar Marketing</span>
                        <h4 className="text-lg font-serif font-bold text-white group-hover:text-black mb-2">Agriculture Business</h4>
                        <p className="text-xs leading-relaxed text-white/50 group-hover:text-black/70">Modernizing agriculture through strategic retail and agritech marketing.</p>
                      </li>
                      <li className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:bg-brand-accent transition-all duration-300">
                        <span className="text-brand-accent font-bold block mb-2 uppercase tracking-widest text-[10px] group-hover:text-black">AAI</span>
                        <h4 className="text-lg font-serif font-bold text-white group-hover:text-black mb-2">AI Software & Product</h4>
                        <p className="text-xs leading-relaxed text-white/50 group-hover:text-black/70">Building next-gen AI tools designed for marketing precision and automation.</p>
                      </li>
                      <li className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:bg-brand-accent transition-all duration-300">
                        <span className="text-brand-accent font-bold block mb-2 uppercase tracking-widest text-[10px] group-hover:text-black">Asaawad by vijaye</span>
                        <h4 className="text-lg font-serif font-bold text-white group-hover:text-black mb-2">Restaurant Venture</h4>
                        <p className="text-xs leading-relaxed text-white/50 group-hover:text-black/70">Redefining gourmet experiences through premium storytelling and hospitality.</p>
                      </li>
                      <li className="bg-white/5 border border-white/10 p-8 rounded-3xl md:col-span-2 group hover:bg-brand-accent transition-all duration-300">
                        <span className="text-brand-accent font-bold block mb-2 uppercase tracking-widest text-[10px] group-hover:text-black">Modicare</span>
                        <h4 className="text-lg font-serif font-bold text-white group-hover:text-black mb-2">Franchised Business Network</h4>
                        <p className="text-xs leading-relaxed text-white/50 group-hover:text-black/70">Leading a massive distribution network of 2,000+ individuals, focused on self-growth and sales operations.</p>
                      </li>
                    </ul>
                  </div>
                  <p className="mb-8">
                    But here's what I'm most proud of: I didn't just build businesses. I built a philosophy. Marketing isn't about tricks or hacks—it's about understanding people, telling authentic stories, and delivering measurable results.
                  </p>
                  <p className="mb-8">
                    At 21, I've had the privilege of speaking at prestigious institutions like Amity University, Symbiosis, and Raisoni Group. I've managed campaigns for automotive brands, hospitality businesses, healthcare professionals, and startups launching their first products. Each project taught me something new.
                  </p>
                  <p className="mb-8 font-medium text-white text-xl">
                    And I'm just getting started. My mission is to democratize access to high-level marketing strategies—to help the next generation of entrepreneurs build brands that don't just survive, but thrive.
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
                {/* TIMELINE - NOW ON LEFT SIDE */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12 py-8"
                >
                  <div className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-gradient-to-b from-brand-accent via-brand-accent/20 to-transparent origin-top scale-y-100" />

                  {timeline.map((item, i) => (
                    <motion.div key={i} variants={staggerItem} className="relative pl-10 md:pl-16 group">
                      <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-[#050505] border-2 border-brand-accent group-hover:bg-brand-accent group-hover:scale-150 transition-all duration-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />

                      <div className="bg-white/[0.05] border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/[0.08] hover:border-brand-accent/30 transition-all duration-500 backdrop-blur-md shadow-2xl relative overflow-hidden group/card text-white">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover/card:bg-brand-accent/10 transition-colors" />
                        <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-accent text-black text-[10px] font-black tracking-[0.2em] uppercase">{item.year}</span>
                        <h4 className="text-3xl font-serif font-bold text-white mb-4 leading-tight group-hover/card:text-brand-accent transition-colors">{item.event}</h4>
                        <p className="text-white/90 text-sm md:text-base leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="lg:col-span-4 sticky top-1/4 order-1 lg:order-2 h-fit">
                <motion.div {...fadeUp} className="space-y-10">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      <span className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">The Journey</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold leading-[1.1]">
                      How We <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-amber-600 italic">Got Here</span>.
                    </h2>
                    <p className="text-white/50 text-base leading-relaxed font-light">
                      From a 15-year-old with a dream to leading a 20+ person agency.
                    </p>
                  </div>

                  {/* MINI STATS IN THE JOURNEY SIDEBAR */}
                  <div className="grid grid-cols-1 gap-6 pt-10 border-t border-white/10">
                    {[
                      { label: "Team Member", value: "35+" },
                      { label: "Brands", value: "250+" },
                      { label: "Students Mentor", value: "10k+" }
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="text-2xl font-serif font-black text-brand-accent group-hover:scale-110 transition-transform">{stat.value}</div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* DOMAINS SECTION */}
        <section className="py-32 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <motion.div {...fadeUp} className="space-y-4">
                <h2 className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs flex items-center gap-4">
                  <Zap className="w-4 h-4" /> Core Competencies
                </h2>
                <h3 className="text-5xl md:text-6xl font-serif font-bold text-white">Value Engines.</h3>
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { title: "Digital Strategy", icon: <Rocket />, desc: "High-level roadmaps designed for market penetration and explosive brand growth." },
                { title: "Personal Branding", icon: <Star />, desc: "Transforming founders into industry thought leaders through strategic content." },
                { title: "ROI Marketing", icon: <TrendingUp />, desc: "Data-driven campaigns that prioritize measurable performance and conversions." },
                { title: "Social Authority", icon: <Instagram />, desc: "Building immersive social ecosystems that foster deep community loyalty." },
                { title: "Consulting", icon: <Lightbulb />, desc: "Actionable frameworks for early-stage ventures to navigate complex markets." },
                { title: "Lead Generation", icon: <Users />, desc: "Sophisticated funnels that capture high-intent prospects and drive revenue." },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="group p-8 rounded-[2rem] border border-white/5 bg-[#080808] hover:bg-white/[0.03] transition-all duration-500 relative overflow-hidden"
                >
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-black group-hover:scale-110 transition-all duration-500 mb-8 shadow-lg">
                      {React.cloneElement(service.icon, { className: "w-6 h-6" })}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 tracking-wide">{service.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed mt-auto">{service.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        <section id="work" className="py-32 relative">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
              <motion.div {...fadeUp} className="space-y-4">
                <h2 className="text-brand-accent font-bold uppercase tracking-[0.2em] text-xs">Case Studies</h2>
                <h3 className="text-5xl md:text-6xl font-serif font-bold text-white">Brands We've Transformed</h3>
                <p className="text-white/50 text-lg leading-relaxed font-light max-w-2xl mt-4">
                  Real results for real businesses. Here's how we've helped brands across industries find their voice and drive measurable growth.
                </p>
              </motion.div>
              <motion.div {...fadeUp} className="flex flex-wrap gap-2 bg-[#0A0A0A] p-1.5 rounded-full border border-white/10 backdrop-blur-xl">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === cat
                      ? "bg-brand-accent text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                      : "text-white/40 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </motion.div>
            </div>

            <div className="flex overflow-x-auto gap-8 pb-12 scrollbar-hide snap-x snap-mandatory px-4 -mx-4 lg:px-0 lg:mx-0">
              <AnimatePresence mode="popLayout">
                {projects
                  .filter(p => activeTab === "all" || p.category === activeTab)
                  .map((project, i) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, scale: 0.95, x: 50 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                      transition={{ duration: 0.5, ease: "backOut", delay: i * 0.1 }}
                      className="min-w-[85vw] md:min-w-[40vw] lg:min-w-[35vw] group relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#050505] isolate h-[400px] snap-center"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover absolute inset-0 z-0 transition-opacity duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-60 group-hover:opacity-40"
                      />
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent" />

                      {/* Content Overlay */}
                      <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-6 border border-white/20">
                            {project.category}
                          </div>
                          <h4 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">{project.title}</h4>
                          <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden">
                            {project.desc}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.map(tag => (
                              <span key={tag} className="text-[10px] font-bold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full uppercase tracking-tighter">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <Link href="#" className="inline-flex items-center gap-3 text-sm font-bold text-brand-accent hover:text-white transition-colors group/link pb-2 border-b border-brand-accent/30 hover:border-white">
                            View Case Study
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))
                }
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-32 relative overflow-hidden bg-brand-accent text-black">
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3 space-y-6">
              <h2 className="text-5xl font-serif font-bold leading-tight">Partners in <br />Progress.</h2>
              <p className="text-black/70 font-medium">The true measure of our strategic impact comes directly from the visionary founders we collaborate with.</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="p-10 bg-black/5 rounded-[2.5rem] border border-black/10 relative"
                >
                  <Quote className="absolute top-8 right-8 w-8 h-8 text-black/10" />
                  <p className="text-lg font-serif leading-relaxed mb-6 font-medium">"{t.content}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black/20">
                      <Image src={t.avatar} alt={t.name} fill />
                    </div>
                    <div>
                      <h4 className="font-bold text-base leading-none mb-1">{t.name}</h4>
                      <p className="text-[10px] text-black/60 uppercase tracking-[0.2em] font-bold">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 relative">
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 z-10">
              <div className="space-y-4">
                <h2 className="text-6xl md:text-[5.5rem] font-serif font-bold text-white leading-[0.9]">
                  Let's craft the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-amber-600 italic">Next Big Story.</span>
                </h2>
                <p className="text-white/50 max-w-md text-lg font-light leading-relaxed mt-6">
                  Currently open to strategic partnerships, keynote speaking, and high-impact consulting engagements.
                </p>
              </div>

              <div className="pt-8 space-y-8 border-t border-white/10">
                <a href="mailto:kaushal@bizleap.in" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-black transition-all duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Email Reach</p>
                    <p className="text-2xl font-serif text-white group-hover:text-brand-accent transition-colors">kaushal@bizleap.in</p>
                  </div>
                </a>
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-black transition-all duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Office Line</p>
                    <p className="text-2xl font-serif text-white group-hover:text-brand-accent transition-colors">+91 9356234057</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div {...fadeUp} className="bg-[#080808] p-10 md:p-14 rounded-[3rem] shadow-2xl border border-white/5 relative z-10 w-full overflow-hidden group">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-opacity opacity-50 group-hover:opacity-100 duration-1000" />
              <form className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">First Name</label>
                    <input type="text" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-accent focus:bg-white/10 outline-none transition-all text-white font-medium" placeholder="John" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">Last Name</label>
                    <input type="text" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-accent focus:bg-white/10 outline-none transition-all text-white font-medium" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">Project Inquiry</label>
                  <textarea className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-accent focus:bg-white/10 outline-none transition-all text-white h-40 resize-none font-medium" placeholder="Tell me about your vision..."></textarea>
                </div>
                <button className="w-full py-5 bg-brand-accent text-black rounded-2xl font-bold hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_30px_rgba(234,179,8,0.2)] flex items-center justify-center gap-3">
                  Submit Inquiry <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  );
}
