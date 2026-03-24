"use client";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Linkedin, Instagram, Mail, ChevronLeft, Globe, Award, Code, Rocket, 
  MapPin, Phone, MessageSquare, Briefcase, Zap, Star, Users, BookOpen,
  Mic, GraduationCap, Heart, CheckCircle2, TrendingUp, Lightbulb
} from "lucide-react";

export default function KaushalProfile() {
  const stats = [
    { label: "Experience", value: "6+ Years", icon: <Award className="w-5 h-5" /> },
    { label: "Team Size", value: "20+", icon: <Users className="w-5 h-5" /> },
    { label: "Distributors", value: "2000+", icon: <Rocket className="w-5 h-5" /> },
  ];

  const coreCompetencies = [
    "Digital Marketing Strategy & Execution",
    "Social Media Marketing & Brand Development",
    "Startup Consulting & Business Growth",
    "Team Leadership & Organizational Development",
    "Public Speaking & Executive Education"
  ];

  const successStories = [
    {
      category: "Automotive Sector",
      items: [
        "Managed social media for Nexa Cars (Yavatmal)",
        "Developed comprehensive content strategies",
        "Consistent engagement & lead generation"
      ],
      icon: <Zap className="w-6 h-6 text-yellow-500" />
    },
    {
      category: "Hospitality & Tourism",
      items: [
        "SEO-driven strategies for Papillon India",
        "3-month social media sales conversion plans",
        "Content marketing & booking funnel integration"
      ],
      icon: <Globe className="w-6 h-6 text-yellow-500" />
    },
    {
      category: "Healthcare & Corporate",
      items: [
        "Educational video series for dental practices",
        "LinkedIn content for solar manufacturers",
        "Instagram marketing for bakery storytelling"
      ],
      icon: <Briefcase className="w-6 h-6 text-yellow-500" />
    }
  ];

  const achievements = [
    { title: "Built Multi-Venture Portfolio by Age 21", detail: "Founded & scaled BizLeap to 20+ members and 15+ brand partnerships." },
    { title: "Early Entrepreneurial Success", detail: "Launched first business at age 15, building a 2,000+ person network." },
    { title: "15+ Speaking Engagements", detail: "Guest Speaker at Amity, Symbiosis, Raisoni, and more." }
  ];

  const certifications = [
    "Certified LinkedIn Marketing Professional",
    "Certified Instagram Marketing Professional",
    "Certified Facebook Marketing Professional"
  ];

  const philosophy = [
    { title: "Strategy Over Tactics", desc: "Building sustainable frameworks that adapt to changing platforms rather than chasing short-term tactics." },
    { title: "Data-Driven Creativity", desc: "Balancing creative storytelling with measurable performance metrics for quantifiable results." },
    { title: "Long-Term Relationships", desc: "Prioritizing mutual value with clients, team, and partners over time." }
  ];

  return (
    <div className="bg-black text-white min-h-screen selection:bg-yellow-500/30 overflow-x-hidden">
      <Head>
        <title>Kaushal Banginwar | Founder & CEO at BizLeap</title>
        <meta name="description" content="Professional profile of Kaushal Banginwar - Digital Marketer, Entrepreneur, and Founder of BizLeap." />
      </Head>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 backdrop-blur-md bg-black/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link 
            href="/team"
            className="group flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
          >
            <div className="p-2 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-yellow-400/50">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Back to Team</span>
          </Link>
          <Image src="/logo.png" alt="BizLeap" width={100} height={30} className="opacity-80" />
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* --- HERO SECTION --- */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/5] max-w-[320px] mx-auto lg:mx-0 rounded-[2rem] overflow-hidden border border-zinc-800 group shadow-2xl shadow-yellow-500/5"
              >
                <Image
                  src="/team/77.png"
                  alt="Kaushal Banginwar"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6 bg-yellow-500/90 backdrop-blur-md text-black px-4 py-2 rounded-xl font-bold text-center text-sm">
                  FOUNDER & CEO
                </div>
              </motion.div>
              
              <div className="mt-8 flex justify-center lg:justify-start gap-4">
                {[
                  { icon: <Linkedin className="w-5 h-5" />, href: "https://in.linkedin.com/in/kaushalbanginwar" },
                  { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/kaushalbanginwar.in/" },
                  { icon: <Mail className="w-5 h-5" />, href: "mailto:kaushal@bizleap.in" }
                ].map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    target="_blank"
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-yellow-400/50 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-4">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-yellow-500 font-bold tracking-[0.3em] uppercase text-sm"
                >
                  Entrepreneur & Marketer
                </motion.h2>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-bold tracking-tighter"
                >
                  Kaushal Banginwar
                </motion.h1>
              </div>

              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }}
                className="space-y-6 text-lg md:text-xl text-gray-400 leading-relaxed"
              >
                <p>
                  I am a certified LinkedIn, Instagram, and Facebook marketer with over six years of hands-on experience in digital marketing and entrepreneurship. As the Founder & CEO of Bizleap, I lead a team of 20+ marketing professionals delivering strategic digital solutions to brands across diverse industries.
                </p>
                <p>
                  My expertise spans digital marketing strategy, brand development, startup consulting, and team leadership. I have been privileged to share my insights as a guest speaker at leading academic institutions across India, including Amity University, Symbiosis International University, Raisoni Group of Institutions, and Palloti College of Management & Technology.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl backdrop-blur-sm">
                    <div className="text-yellow-500 mb-3">{stat.icon}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- CORE COMPETENCIES --- */}
          <section className="mb-32">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Star className="text-yellow-500 w-6 h-6" /> Core Competencies
            </h3>
            <div className="flex flex-wrap gap-4">
              {coreCompetencies.map((skill, i) => (
                <span key={i} className="px-6 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-gray-300 hover:border-yellow-500/50 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* --- JOURNEY SECTION --- */}
          <section className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tight">Entrepreneurial <span className="text-yellow-500">Journey</span></h2>
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                <p>
                  My journey began at 15, while in 10th standard, when I successfully launched and managed a network marketing business that grew to over 2,000+ distributors. This early experience in business operations, relationship management, and strategic growth laid the foundation for my career.
                </p>
                <div className="space-y-4">
                  {[
                    { title: "Bizleap", desc: "Digital agency with 20+ members and 15+ active brand partnerships" },
                    { title: "Bangiwar Enterprises", desc: "Family business specializing in agricultural motors and pumps" },
                    { title: "Emerging Ventures", desc: "Influencer management and content creation initiatives" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800">
                      <TrendingUp className="text-yellow-500 shrink-0" />
                      <div>
                        <h4 className="font-bold text-white">{item.title}</h4>
                        <p className="text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[3rem] relative overflow-hidden">
               <QuoteIcon className="absolute top-8 right-8 text-yellow-500/10 w-24 h-24" />
               <p className="text-2xl font-medium leading-relaxed italic text-gray-300 relative z-10">
                 "Success in marketing isn't about following trends—it's about understanding people, building authentic connections, and delivering measurable value."
               </p>
               <div className="mt-8 flex items-center gap-4">
                  <div className="h-px bg-yellow-500 w-12" />
                  <span className="uppercase tracking-[0.2em] text-yellow-500 text-sm font-bold">The Philosophy</span>
               </div>
            </div>
          </section>

          {/* --- SUCCESS STORIES --- */}
          <section className="mb-32">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Success <span className="text-yellow-500">Stories</span></h2>
              <p className="text-gray-500 uppercase tracking-widest text-sm">Client Portfolio Highlights</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, i) => (
                <div key={i} className="p-8 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 hover:border-yellow-500/30 transition-all group">
                  <div className="mb-6 p-4 rounded-2xl bg-black inline-block group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                    {story.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-6">{story.category}</h3>
                  <ul className="space-y-4">
                    {story.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-sm text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* --- RECOGNITION --- */}
          <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-12">
               <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
                  <Award className="text-yellow-500" /> Recognition & Achievements
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {achievements.map((item, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
                       <h4 className="text-yellow-500 font-bold mb-3">{item.title}</h4>
                       <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-8">
                     <h4 className="text-xl font-bold flex items-center gap-3"><Mic className="text-yellow-500" /> Speaking Engagements</h4>
                     <div className="space-y-4">
                        {[
                          "Amity University (Guest Speaker & Chief Guest)",
                          "Symbiosis International University (Keynote)",
                          "Raisoni Group of Institutions (Expert Sessions)",
                          "Palloti College of Management & Tech (Workshops)",
                          "Dhanwate National College (Guest Lectures)"
                        ].map((uni, i) => (
                          <div key={i} className="flex items-center gap-3 text-gray-400">
                             <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                             {uni}
                          </div>
                        ))}
                     </div>
                  </div>
                  <div className="space-y-8">
                     <h4 className="text-xl font-bold flex items-center gap-3"><GraduationCap className="text-yellow-500" /> Professional Certifications</h4>
                     <div className="grid grid-cols-1 gap-4">
                        {certifications.map((cert, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-gray-300 italic">
                             <CheckCircle2 className="w-4 h-4 text-green-500" />
                             {cert}
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </section>

          {/* --- THOUGHT LEADERSHIP --- */}
          <section className="mb-32 p-12 rounded-[3rem] bg-zinc-900 border border-zinc-800 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-transparent" />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-6">
                   <h2 className="text-3xl font-bold flex items-center gap-3"><Lightbulb className="text-yellow-500" /> Thought Leadership</h2>
                   <p className="text-gray-400 leading-relaxed">
                     As a recognized voice in digital marketing, I deliver keynote presentations and workshops focusing on practical strategies for emerging entrepreneurs.
                   </p>
                   <div className="flex flex-wrap gap-2">
                      {["Personal Branding", "ROI Metrics", "Scalable Teams", "Startup Strategy"].map((tag, i) => (
                        <span key={i} className="px-4 py-2 bg-black border border-zinc-800 rounded-lg text-xs font-bold text-yellow-500 uppercase">#{tag}</span>
                      ))}
                   </div>
                </div>
                <div className="space-y-6">
                   <h4 className="font-bold">Focus Areas:</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["LinkedIn newsletter series", "Educational content for founders", "Case study analyses", "Industry trend reports"].map((item, i) => (
                        <div key={i} className="flex gap-2 text-sm text-gray-400">
                           <TrendingUp className="w-4 h-4 text-yellow-500 shrink-0" />
                           {item}
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </section>

          {/* --- PHILOSOPHY --- */}
          <section className="mb-32">
             <h2 className="text-3xl font-bold text-center mb-16">Professional <span className="text-yellow-500">Philosophy</span></h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {philosophy.map((item, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 text-center hover:bg-zinc-900 transition-colors">
                     <h4 className="text-lg font-bold mb-4 text-white uppercase tracking-wider">{item.title}</h4>
                     <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* --- BEYOND BUSINESS --- */}
          <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16">
             <div className="lg:col-span-8 space-y-8">
                <h2 className="text-3xl font-bold flex items-center gap-3"><Heart className="text-yellow-500" /> Beyond Business</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <h4 className="font-bold">Mentorship & Community</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Providing guidance to young entrepreneurs and mentoring students interested in marketing and entrepreneurship careers. Supporting the next generation of business leaders.
                      </p>
                   </div>
                   <div className="space-y-4">
                      <h4 className="font-bold">Continuous Learning</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Staying current with AI-powered marketing tools, global trends, and adapting strategies for the evolving Indian market landscape.
                      </p>
                   </div>
                </div>
             </div>
             <div className="lg:col-span-4 p-8 rounded-[2rem] bg-yellow-500 text-black">
                <h4 className="font-bold mb-4 flex items-center gap-2"><Briefcase /> Family Legacy</h4>
                <p className="text-sm font-medium leading-relaxed">
                  Active involvement in Bangiwar Enterprises, applying digital strategies to conventional business operations and agricultural retail/wholesale sectors.
                </p>
             </div>
          </section>

          {/* --- CONTACT SECTION --- */}
          <section id="contact" className="py-24 border-t border-zinc-900">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               <div className="space-y-8">
                  <h2 className="text-5xl font-bold">Connect for <br /><span className="text-yellow-500">Collaborations</span></h2>
                  <p className="text-gray-400 max-w-md">
                    Open to strategic partnerships, speaking opportunities, and consulting engagements that align with digital marketing and startup growth.
                  </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                     <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Consulting</p>
                     <p className="text-sm font-bold">kaushal@bizleap.in</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                     <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Speaking</p>
                     <p className="text-sm font-bold">Office: Nagpur, India</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                     <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Phone</p>
                     <p className="text-sm font-bold">+91 9356234057</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                     <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Availability</p>
                     <p className="text-sm font-bold">Global Consulting</p>
                  </div>
               </div>
            </div>
          </section>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 border-t border-zinc-900 text-center">
         <p className="text-gray-500 text-xs tracking-widest uppercase">&copy; 2024 Kaushal Banginwar • BizLeap Digital</p>
      </footer>
    </div>
  );
}

function QuoteIcon(props) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      {...props}
    >
      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H12.017V21H14.017ZM6.01701 21L6.01701 18C6.01701 16.8954 6.91244 16 8.01701 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H7.01701C6.46473 8 6.01701 8.44772 6.01701 9V12C6.01701 12.5523 5.56929 13 5.01701 13H4.01701V21H6.01701Z" />
    </svg>
  );
}
