'use client'

import { useRef } from "react"
import Head from "next/head";
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Playfair_Display } from "next/font/google"
import { FiCheck, FiArrowRight, FiArrowUpRight, FiCpu, FiBarChart2, FiZap, FiSettings, FiStar, FiSearch, FiLink, FiDatabase, FiSmile, FiActivity, FiCloud, FiLayers, FiBox } from "react-icons/fi"
import { Code2, Megaphone, Search, Palette } from "lucide-react"
import {
  SiOpenai,
  SiLangchain,
  SiTensorflow,
  SiPytorch,
  SiClaude,
} from "react-icons/si"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})

// ------------------- Badge Component -------------------
function Badge({ children, variant = "secondary", className = "" }) {
  const base = "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 mr-2 mb-2"
  const colors = {
    default: "bg-white text-black border-transparent",
    secondary: "bg-gray-700 text-white border-transparent",
    outline: "border-gray-400 text-white bg-transparent",
  }
  return <span className={`${base} ${colors[variant]} ${className}`}>{children}</span>
}

// ------------------- InView Scroll Reveal -------------------
function ScrollReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20px 0px" }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// ------------------- Service Card Component -------------------
function ServiceCard({ icon: Icon, title, description, delay }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 h-full flex flex-col">
        <div className="w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {Icon && <Icon className="w-7 h-7 text-yellow-500" />}
        </div>
        <h3 className="text-2xl font-semibold mb-4 group-hover:text-yellow-400 transition-colors">{title}</h3>
        <p className="text-gray-400 leading-relaxed flex-1">{description}</p>
      </div>
    </ScrollReveal>
  )
}

export default function AIServicesPage() {
  const aiFeatures = [
    {
      icon: FiZap,
      title: "Generative AI Integration",
      description: "Harness the power of LLMs like GPT-4 and Claude to automate content creation, customer support, and complex reasoning tasks.",
      delay: 0.1
    },
    {
      icon: FiSettings,
      title: "AI-Powered Automation",
      description: "Streamline your business operations by automating repetitive workflows with intelligent AI agents that learn and adapt.",
      delay: 0.2
    },
    {
      icon: FiBarChart2,
      title: "Predictive Analytics",
      description: "Turn your data into foresight. We build models that predict trends, customer behavior, and market shifts with high accuracy.",
      delay: 0.3
    },
    {
      icon: FiCpu,
      title: "Custom AI Solutions",
      description: "From fine-tuning specialized models to building custom neural networks, we tailor AI to your specific industry needs.",
      delay: 0.4
    },
    {
      icon: FiSearch,
      title: "AI-Driven Marketing",
      description: "Optimize your campaigns with AI that identifies the best audience, timing, and messaging for maximum conversion.",
      delay: 0.5
    },
    {
      icon: FiStar,
      title: "Computer Vision",
      description: "Implement visual recognition systems for quality control, security, or enhanced user experiences in physical spaces.",
      delay: 0.6
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Strategy & Assessment",
      description: "We evaluate your current infrastructure and business goals to identify the highest-impact AI opportunities."
    },
    {
      number: "02",
      title: "Data & Architecture",
      description: "Clean, structured data is the fuel for AI. We set up robust pipelines and the underlying architecture for your models."
    },
    {
      number: "03",
      title: "Model Development",
      description: "Our experts build, train, and fine-tune AI models using state-of-the-art frameworks to ensure peak performance."
    },
    {
      number: "04",
      title: "Integration & Scaling",
      description: "We seamlessly integrate AI into your existing systems and provide the tools to scale as your business grows."
    }
  ]

  const aiTools = [
    { name: "OpenAI / GPT-4", category: "LLMs" },
    { name: "LangChain", category: "Orchestration" },
    { name: "TensorFlow", category: "Deep Learning" },
    { name: "Hugging Face", category: "Models" },
    { name: "PyTorch", category: "Machine Learning" },
    { name: "AWS SageMaker", category: "Cloud AI" },
    { name: "Pinecone", category: "Vector Databases" },
    { name: "Claude 3", category: "AI Models" }
  ]

  return (
    <>
      <Head>
        <title key="title">AI Innovation & Services | Bizleap</title>
        <meta name="description" content="Unlock the potential of Artificial Intelligence with Bizleap. We provide Generative AI, Automation, and Custom AI solutions for modern businesses." key="description" />
        <meta name="keywords" content="artificial intelligence, generative ai, custom llm, ai automation, bizleap ai" />
        <link rel="canonical" href="https://bizleap.in/aiservices" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://bizleap.in/aiservices#service",
              "url": "https://bizleap.in/aiservices",
              "name": "AI Innovation & Services",
              "description": "Bizleap provides Generative AI integration, AI-powered automation, predictive analytics, and custom AI solutions to help businesses stay competitive.",
              "provider": { "@id": "https://bizleap.in/#organization" },
              "serviceType": "AI & Technology Services",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bizleap.in/" },
                  { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://bizleap.in/services" },
                  { "@type": "ListItem", "position": 3, "name": "AI Services", "item": "https://bizleap.in/aiservices" }
                ]
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Capabilities",
                "itemListElement": [
                  { "@type": "Offer", "name": "Generative AI Integration" },
                  { "@type": "Offer", "name": "AI-Powered Automation" },
                  { "@type": "Offer", "name": "Predictive Analytics" },
                  { "@type": "Offer", "name": "Custom AI Solutions" },
                  { "@type": "Offer", "name": "AI-Driven Marketing" },
                  { "@type": "Offer", "name": "Computer Vision" }
                ]
              }
            })
          }}
        />
      </Head>
      
      <main className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative pt-32 pb-12 px-6 overflow-hidden bg-black bg-no-repeat"
          style={{ backgroundImage: "url('/images/ai-hero-bg.jpg')", backgroundSize: '65%', backgroundPosition: 'right 30%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-0"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center text-left min-h-[600px]">
              <div className="pr-8">
                <ScrollReveal>
                  <Badge variant="outline" className="mb-6 border-yellow-500/30 text-yellow-500">AI Innovation Lab</Badge>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                    Build Smarter.<br />
                    Automate Faster.<br />
                    <span className="font-serif italic font-medium text-yellow-500">Grow with AI.</span>
                  </h1>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
                    Turn complex processes into intelligent workflows, unlock valuable insights, and create AI-powered experiences that drive real business growth.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                    <Link
                      href="/contact"
                      className="px-8 py-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 flex items-center gap-2 text-lg"
                    >
                      Explore AI Solutions <FiArrowRight />
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 font-medium mb-8">
                    <span>Automation</span> <span className="text-yellow-500/50">•</span>
                    <span>Analytics</span> <span className="text-yellow-500/50">•</span>
                    <span>AI Agents</span> <span className="text-yellow-500/50">•</span>
                    <span>Integration</span>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="flex items-center gap-2 mt-1">
                       <div className="w-6 h-[2px] bg-yellow-500"></div>
                       <FiStar className="text-yellow-500 w-4 h-4" />
                     </div>
                     <div>
                       <p className="text-sm font-medium text-white">Built for real business outcomes.</p>
                       <p className="text-sm text-gray-500">Not just AI experiments.</p>
                     </div>
                  </div>
                </ScrollReveal>
              </div>
              
              {/* Right side is intentionally left empty to reveal the background image graphic */}
              <div className="hidden">
                <ScrollReveal delay={0.4} className="w-full h-full">
                  <div className="relative w-full h-[550px] flex items-center justify-center group" style={{ perspective: '1200px' }}>
                    
                    {/* 3D Tilted Container */}
                    <div 
                      className="relative w-[500px] h-[400px] transition-transform duration-1000 ease-out group-hover:!transform-none mt-10"
                      style={{ transform: 'rotateY(-15deg) rotateX(8deg) rotateZ(-1deg)', transformStyle: 'preserve-3d' }}
                    >
                      {/* Decorative Background Glows */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" style={{ transform: 'translateZ(-50px)' }}></div>

                      {/* Main Performance Card */}
                      <div className="absolute top-0 left-0 w-[420px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-[0_0_40px_rgba(234,179,8,0.15)]" style={{ transform: 'translateZ(10px)' }}>
                        <div className="flex items-center gap-2 mb-6">
                          <h4 className="text-white font-sans font-bold text-sm tracking-wide">AI Performance</h4>
                        </div>
                        
                        <div className="flex items-center justify-between mb-8 gap-4">
                          <div className="shrink-0">
                            <div className="text-[10px] text-gray-500 font-sans font-medium uppercase tracking-widest mb-1">Automation</div>
                            <div className="flex items-start gap-1">
                              <span className="text-4xl font-sans font-bold text-white tracking-tight">+42%</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div>
                            </div>
                          </div>
                          {/* Large Line Chart SVG */}
                          <div className="flex-1 h-20 w-full relative">
                            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible preserve-3d" preserveAspectRatio="none">
                              <path d="M 0 35 L 15 25 L 30 30 L 45 15 L 60 25 L 75 10 L 90 20 L 100 0" fill="none" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="100" cy="0" r="3.5" fill="#EAB308" className="shadow-lg" />
                              <path d="M 0 35 L 15 25 L 30 30 L 45 15 L 60 25 L 75 10 L 90 20 L 100 0 L 100 40 L 0 40 Z" fill="url(#yellow-gradient-large)" opacity="0.2" />
                              <defs>
                                <linearGradient id="yellow-gradient-large" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#EAB308" stopOpacity="1" />
                                  <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                          <div>
                            <div className="text-[9px] text-gray-500 font-sans font-bold uppercase tracking-widest mb-1">Lead Response</div>
                            <div className="text-lg font-sans font-bold text-white">2.4x <span className="text-[9px] text-gray-500 font-normal ml-1 uppercase">Accelerated</span></div>
                          </div>
                          <div>
                            <div className="text-[9px] text-gray-500 font-sans font-bold uppercase tracking-widest mb-1">Level</div>
                            <div className="text-lg font-sans font-bold text-white">2.4x <span className="text-[9px] text-gray-500 font-normal ml-1 uppercase">Executed</span></div>
                          </div>
                          <div>
                            <div className="text-[9px] text-gray-500 font-sans font-bold uppercase tracking-widest mb-1">Customer Insights</div>
                            <div className="text-lg font-sans font-bold text-white">87%</div>
                          </div>
                          <div>
                            <div className="text-[9px] text-gray-500 font-sans font-bold uppercase tracking-widest mb-1">Insights</div>
                            <div className="text-lg font-sans font-bold text-white">24 <span className="text-[9px] text-white font-normal ml-1 uppercase">Active</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Smarter Workflows Badge */}
                      <div className="absolute -top-6 right-8 bg-[#0a0a0a] border border-yellow-500/30 rounded-xl px-4 py-2 flex items-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-transform hover:scale-105 cursor-default" style={{ transform: 'translateZ(40px)' }}>
                        <div className="p-1 bg-yellow-500/20 rounded-full">
                          <FiCheck className="w-3 h-3 text-yellow-500" />
                        </div>
                        <span className="text-[10px] font-sans font-semibold text-white tracking-wide">Smarter Workflows</span>
                      </div>

                      {/* Recent Activity Card */}
                      <div className="absolute top-16 -right-16 w-56 bg-[#0a0a0a] border border-gray-800 rounded-xl p-5 shadow-2xl hover:border-gray-700 transition-colors" style={{ transform: 'translateZ(30px)' }}>
                        <h5 className="text-[11px] font-sans font-bold text-white mb-5 tracking-wide">Recent Activity</h5>
                        
                        <div className="space-y-4">
                          {/* Item 1 */}
                          <div className="bg-[#111111] border border-gray-800 rounded-lg p-2.5 flex items-start gap-3">
                            <div className="w-4 h-4 rounded-full bg-black border-[1.5px] border-yellow-500 flex items-center justify-center shrink-0 mt-0.5">
                              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                            </div>
                            <div>
                              <p className="text-[10px] font-sans text-white font-medium">Lead captured</p>
                              <p className="text-[8px] font-sans text-gray-500 mt-0.5">2 min ago</p>
                            </div>
                          </div>
                          {/* Item 2 */}
                          <div className="bg-[#111111] border border-gray-800 rounded-lg p-2.5 flex items-start gap-3">
                            <div className="w-4 h-4 rounded-full bg-black border-[1.5px] border-gray-600 shrink-0 mt-0.5"></div>
                            <div>
                              <p className="text-[10px] font-sans text-gray-300 font-medium">Workflow completed</p>
                              <p className="text-[8px] font-sans text-gray-500 mt-0.5">12 min ago</p>
                            </div>
                          </div>
                          {/* Item 3 */}
                          <div className="bg-[#111111] border border-gray-800 rounded-lg p-2.5 flex items-start gap-3">
                            <div className="w-4 h-4 rounded-full bg-black border-[1.5px] border-gray-600 flex items-center justify-center shrink-0 mt-0.5">
                               <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                            </div>
                            <div>
                              <p className="text-[10px] font-sans text-gray-300 font-medium">Insight generated</p>
                              <p className="text-[8px] font-sans text-gray-500 mt-0.5">25 min ago</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Agents Card */}
                      <div className="absolute -bottom-16 left-0 w-[200px] bg-[#0a0a0a] border border-gray-800 hover:border-yellow-500/30 transition-colors rounded-xl p-4 shadow-xl cursor-default" style={{ transform: 'translateZ(20px)' }}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-yellow-500 border border-yellow-500/30 p-1.5 rounded-lg">
                            <FiCpu className="w-4 h-4" />
                          </div>
                          <h5 className="text-[11px] font-sans font-bold text-white">AI Agents</h5>
                        </div>
                        <p className="text-[9px] font-sans text-gray-400 leading-relaxed">Handle repetitive work.<br/>Free up your team.</p>
                      </div>

                      {/* Data Analytics Card */}
                      <div className="absolute -bottom-16 left-[220px] w-[200px] bg-[#0a0a0a] border border-gray-800 hover:border-yellow-500/30 transition-colors rounded-xl p-4 shadow-xl cursor-default" style={{ transform: 'translateZ(20px)' }}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-yellow-500 border border-yellow-500/30 p-1.5 rounded-lg">
                            <FiBarChart2 className="w-4 h-4" />
                          </div>
                          <h5 className="text-[11px] font-sans font-bold text-white">Data & Analytics</h5>
                        </div>
                        <p className="text-[9px] font-sans text-gray-400 leading-relaxed">Turn data into<br/>actionable insights.</p>
                      </div>
                      
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar: AI Capabilities */}
          <div className="max-w-7xl mx-auto mt-16 border-t border-b border-gray-800/80 py-6 relative z-10 bg-black/40 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
              <div className="text-xs font-bold text-yellow-500 tracking-[0.2em] uppercase shrink-0">AI Capabilities</div>
              
              <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-8 w-full md:w-auto flex-1 md:pl-12">
                 {/* Item 1 */}
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-yellow-500/10 rounded-xl">
                     <FiSettings className="w-6 h-6 text-yellow-500" />
                   </div>
                   <div>
                     <div className="font-semibold text-sm text-white">AI Automation</div>
                     <div className="text-xs text-gray-500">Reduce effort. Increase speed.</div>
                   </div>
                 </div>
                 <div className="hidden lg:block w-[1px] h-10 bg-gray-800"></div>

                 {/* Item 2 */}
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-yellow-500/10 rounded-xl">
                     <FiCpu className="w-6 h-6 text-yellow-500" />
                   </div>
                   <div>
                     <div className="font-semibold text-sm text-white">AI Agents</div>
                     <div className="text-xs text-gray-500">Your 24/7 digital workforce.</div>
                   </div>
                 </div>
                 <div className="hidden lg:block w-[1px] h-10 bg-gray-800"></div>

                 {/* Item 3 */}
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-yellow-500/10 rounded-xl">
                     <FiBarChart2 className="w-6 h-6 text-yellow-500" />
                   </div>
                   <div>
                     <div className="font-semibold text-sm text-white">Analytics</div>
                     <div className="text-xs text-gray-500">Smarter data. Better decisions.</div>
                   </div>
                 </div>
                 <div className="hidden lg:block w-[1px] h-10 bg-gray-800"></div>

                 {/* Item 4 */}
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-yellow-500/10 rounded-xl">
                     <FiZap className="w-6 h-6 text-yellow-500" />
                   </div>
                   <div>
                     <div className="font-semibold text-sm text-white">Integration</div>
                     <div className="text-xs text-gray-500">Seamless. Scalable. Future-ready.</div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Features Section */}
        <section className="py-24 px-6 bg-[#050505] relative overflow-hidden">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes node-glow {
              0%, 100% { box-shadow: 0 0 10px rgba(234, 179, 8, 0.2); }
              50% { box-shadow: 0 0 45px rgba(234, 179, 8, 1); }
            }
            .animate-node-glow {
              animation: node-glow 3.5s ease-in-out infinite;
            }
            .glow-delay-1 { animation-delay: 0s; }
            .glow-delay-2 { animation-delay: 0.5s; }
            .glow-delay-3 { animation-delay: 1s; }
            .glow-delay-4 { animation-delay: 1.5s; }
            .glow-delay-5 { animation-delay: 2s; }
            .glow-delay-6 { animation-delay: 2.5s; }
          `}} />
          <div className="max-w-7xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="mb-20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase">Our AI Capabilities</div>
                  <div className="w-12 h-[1px] bg-yellow-500/50"></div>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif max-w-4xl leading-tight">
                  One connected AI system.<br />
                  Six ways it moves your business.
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl">
                  A unified suite of AI solutions designed to drive efficiency, innovation, and measurable growth across every department of your organization.
                </p>
              </div>
            </ScrollReveal>

            {/* Path visualization */}
            <div className="relative w-full overflow-x-auto pb-20 pt-10 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
              <div className="w-[1350px] h-[500px] relative mt-10 mx-auto scale-[1.05]">
                
                {/* SVG Connecting Line */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 1350 500" preserveAspectRatio="none">
                  
                  {/* Main Winding Path */}
                  <path 
                    d="M 0,300 L 120,300 C 180,300 200,400 270,400 C 340,400 360,200 420,200 C 480,200 500,320 600,320 C 700,320 720,320 770,320 C 820,320 840,200 890,200 C 960,200 1000,350 1090,350 C 1140,350 1200,300 1350,300"
                    fill="none" 
                    stroke="#EAB308" 
                    strokeWidth="2.5" 
                  />
                  
                  {/* Node Dots on Path */}
                  <circle cx="120" cy="300" r="3.5" fill="#EAB308" />
                  <circle cx="270" cy="400" r="3.5" fill="#EAB308" />
                  <circle cx="420" cy="200" r="3.5" fill="#EAB308" />
                  <circle cx="600" cy="320" r="3.5" fill="#EAB308" />
                  <circle cx="770" cy="320" r="3.5" fill="#EAB308" />
                  <circle cx="890" cy="200" r="3.5" fill="#EAB308" />
                  <circle cx="1090" cy="350" r="3.5" fill="#EAB308" />
                  <circle cx="40" cy="300" r="2.5" fill="#EAB308" />
                </svg>

                {/* Nodes HTML content */}
                
                {/* Node 1 */}
                <div className="absolute" style={{ left: '120px', top: '300px' }}>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-yellow-500 bg-[#050505] flex items-center justify-center z-20 animate-node-glow glow-delay-1 hover:scale-110 hover:bg-yellow-500/20 transition-transform duration-300 cursor-pointer">
                    <FiZap className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
                    <div className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-1">Content</div>
                  </div>
                  <div className="absolute left-[36px] bottom-[10px] w-[220px]">
                    <h3 className="font-serif font-bold text-[17px] mb-1 text-white">Generative AI Integration</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Harness the power of LLMs like GPT-4 and Claude to automate content creation and support.</p>
                  </div>
                </div>

                {/* Node 2 */}
                <div className="absolute" style={{ left: '270px', top: '400px' }}>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-yellow-500 bg-[#050505] flex items-center justify-center z-20 animate-node-glow glow-delay-2 hover:scale-110 hover:bg-yellow-500/20 transition-transform duration-300 cursor-pointer">
                    <FiSettings className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
                    <div className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-1">Operations</div>
                  </div>
                  <div className="absolute left-[36px] top-[-12px] w-[220px]">
                    <h3 className="font-serif font-bold text-[17px] mb-1 text-white">AI-Powered Automation</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Streamline your business operations with intelligent AI agents that learn and adapt.</p>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="absolute" style={{ left: '420px', top: '200px' }}>
                  <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[2px] h-[60px] bg-yellow-500 z-10"></div>
                  <div className="absolute left-1/2 bottom-[60px] -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full border-2 border-yellow-500 bg-[#050505] flex items-center justify-center z-20 animate-node-glow glow-delay-3 hover:scale-110 hover:bg-yellow-500/20 transition-transform duration-300 cursor-pointer">
                    <FiBarChart2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-[92px] left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
                    <div className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-1">Data</div>
                  </div>
                  <div className="absolute left-[24px] bottom-[72px] w-[220px]">
                    <h3 className="font-serif font-bold text-[17px] mb-1 text-white">Predictive Analytics</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Turn your data into foresight. We build models that predict trends and customer behavior.</p>
                  </div>
                </div>

                {/* Center - Your Business */}
                <div className="absolute group cursor-pointer" style={{ left: '600px', top: '320px' }}>
                   <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border border-yellow-500/30 border-dashed flex items-center justify-center p-2 z-10 bg-[#050505] group-hover:scale-105 transition-all duration-500">
                     <div className="w-full h-full rounded-full border border-yellow-500/50 flex items-center justify-center p-1.5">
                       <div className="w-full h-full rounded-full bg-yellow-500 flex items-center justify-center text-center shadow-[0_0_30px_rgba(234,179,8,0.3)] group-hover:shadow-[0_0_60px_rgba(234,179,8,0.8)] transition-all duration-500">
                         <span className="text-black font-bold text-[11px] tracking-wider leading-tight">YOUR<br/>BUSINESS</span>
                       </div>
                     </div>
                   </div>
                </div>

                {/* Node 4 */}
                <div className="absolute" style={{ left: '770px', top: '320px' }}>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-yellow-500 bg-[#050505] flex items-center justify-center z-20 animate-node-glow glow-delay-4 hover:scale-110 hover:bg-yellow-500/20 transition-transform duration-300 cursor-pointer">
                    <FiSearch className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
                    <div className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-1">Custom</div>
                  </div>
                  <div className="absolute left-[36px] top-[-12px] w-[220px]">
                    <h3 className="font-serif font-bold text-[17px] mb-1 text-white">Custom AI Solutions</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">From fine-tuning specialized models to building custom neural networks, we tailor AI.</p>
                  </div>
                </div>

                {/* Node 5 */}
                <div className="absolute" style={{ left: '890px', top: '200px' }}>
                  <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[2px] h-[60px] bg-yellow-500 z-10"></div>
                  <div className="absolute left-1/2 bottom-[60px] -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full border-2 border-yellow-500 bg-[#050505] flex items-center justify-center z-20 animate-node-glow glow-delay-5 hover:scale-110 hover:bg-yellow-500/20 transition-transform duration-300 cursor-pointer">
                    <FiStar className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-[92px] left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
                    <div className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-1">Growth</div>
                  </div>
                  <div className="absolute left-[24px] bottom-[72px] w-[220px]">
                    <h3 className="font-serif font-bold text-[17px] mb-1 text-white">AI-Driven Marketing</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Optimize your campaigns with AI that identifies the best audience, timing, and messaging.</p>
                  </div>
                </div>

                {/* Node 6 */}
                <div className="absolute" style={{ left: '1090px', top: '350px' }}>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-yellow-500 bg-[#050505] flex items-center justify-center z-20 animate-node-glow glow-delay-6 hover:scale-110 hover:bg-yellow-500/20 transition-transform duration-300 cursor-pointer">
                    <FiCpu className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
                    <div className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-1">Vision</div>
                  </div>
                  <div className="absolute left-[36px] top-[-12px] w-[220px]">
                    <h3 className="font-serif font-bold text-[17px] mb-1 text-white">Computer Vision</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Implement visual recognition systems for quality control, security, or enhanced UX.</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Process Section */}
        {/* Process Section - Bento Grid */}
        <section className="py-24 px-6 bg-black relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-black to-black opacity-50 pointer-events-none"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                 <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight font-serif">The AI Implementation <span className="font-serif italic font-medium text-yellow-500">Journey</span></h2>
                 <p className="text-gray-400 text-lg leading-relaxed">
                   We follow a rigorous, data-driven methodology to ensure your AI initiatives deliver measurable ROI and long-term value.
                 </p>
              </div>
            </ScrollReveal>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Card 1 (Wide, Top Left) */}
              <div className="md:col-span-7 h-full">
                <ScrollReveal delay={0.1} className="h-full">
                  <div className="h-full bg-gradient-to-br from-[#111] to-[#050505] rounded-3xl p-8 md:p-10 flex flex-col justify-end border border-gray-800/80 hover:border-yellow-500/50 transition-all duration-500 relative overflow-hidden group min-h-[350px]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-yellow-500/20 transition-colors duration-700"></div>
                    <div className="relative z-10 mt-auto">
                      <div className="text-5xl font-bold text-yellow-500/20 font-mono mb-4">01</div>
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-yellow-500 transition-colors">Strategy & Assessment</h3>
                      <p className="text-gray-400 text-lg leading-relaxed max-w-lg">We evaluate your current infrastructure and business goals to identify the highest-impact AI opportunities.</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Card 2 (Square, Top Right) */}
              <div className="md:col-span-5 h-full">
                <ScrollReveal delay={0.2} className="h-full">
                  <div className="h-full bg-[#0a0a0a] rounded-3xl p-8 md:p-10 flex flex-col justify-end border border-gray-800/80 hover:border-yellow-500/50 transition-all duration-500 relative overflow-hidden group min-h-[350px]">
                     <div className="relative z-10 mt-auto">
                      <div className="text-5xl font-bold text-yellow-500/20 font-mono mb-4">02</div>
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-yellow-500 transition-colors">Data & Architecture</h3>
                      <p className="text-gray-400 text-lg leading-relaxed">Clean, structured data is the fuel for AI. We set up robust pipelines and the underlying architecture for your models.</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Card 3 (Square, Bottom Left) */}
              <div className="md:col-span-5 h-full">
                <ScrollReveal delay={0.3} className="h-full">
                  <div className="h-full bg-[#0a0a0a] rounded-3xl p-8 md:p-10 flex flex-col justify-end border border-gray-800/80 hover:border-yellow-500/50 transition-all duration-500 relative overflow-hidden group min-h-[350px]">
                    <div className="relative z-10 mt-auto">
                      <div className="text-5xl font-bold text-yellow-500/20 font-mono mb-4">03</div>
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-yellow-500 transition-colors">Model Development</h3>
                      <p className="text-gray-400 text-lg leading-relaxed">Our experts build, train, and fine-tune AI models using state-of-the-art frameworks to ensure peak performance.</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Card 4 (Wide, Bottom Right) */}
              <div className="md:col-span-7 h-full">
                <ScrollReveal delay={0.4} className="h-full">
                  <div className="h-full bg-gradient-to-tl from-[#111] to-[#050505] rounded-3xl p-8 md:p-10 flex flex-col justify-end border border-gray-800/80 hover:border-yellow-500/50 transition-all duration-500 relative overflow-hidden group min-h-[350px]">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 group-hover:bg-yellow-500/20 transition-colors duration-700"></div>
                    <div className="relative z-10 mt-auto">
                      <div className="text-5xl font-bold text-yellow-500/20 font-mono mb-4">04</div>
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-yellow-500 transition-colors">Integration & Scaling</h3>
                      <p className="text-gray-400 text-lg leading-relaxed max-w-lg">We seamlessly integrate AI into your existing systems and provide the tools to scale as your business grows.</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        {/* Technology / Tools Behind Our AI Solutions */}
        <section className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-black relative overflow-hidden z-10 border-t border-white/5">
          <div className="max-w-6xl mx-auto w-full relative z-10">
            {/* Header Area */}
            <ScrollReveal>
              <div className="mb-10 sm:mb-12">
                <span className="text-xs font-bold tracking-[0.2em] text-[#FFC000] uppercase block mb-3 font-sans">
                  TECHNOLOGY
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white mb-3">
                  Tools behind our AI solutions
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
                  We choose the tools that fit your data, workflow and deployment needs.
                </p>
              </div>
            </ScrollReveal>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {[
                {
                  name: "OpenAI",
                  category: "Language models",
                  desc: "Conversational AI and text generation.",
                  icon: <SiOpenai className="w-10 h-10 sm:w-11 sm:h-11 text-white" />,
                },
                {
                  name: "LangChain",
                  category: "Orchestration",
                  desc: "Connect models, tools and application workflows.",
                  icon: <SiLangchain className="w-10 h-10 sm:w-11 sm:h-11 text-white" />,
                },
                {
                  name: "TensorFlow",
                  category: "Deep learning",
                  desc: "Build and train machine learning models.",
                  icon: <SiTensorflow className="w-10 h-10 sm:w-11 sm:h-11 text-[#FF6F00]" />,
                },
                {
                  name: "Hugging Face",
                  category: "Model ecosystem",
                  desc: "Find and adapt pretrained models.",
                  icon: <span className="text-4xl sm:text-[42px] leading-none select-none">🤗</span>,
                },
                {
                  name: "PyTorch",
                  category: "Machine learning",
                  desc: "Develop and test custom models.",
                  icon: <SiPytorch className="w-10 h-10 sm:w-11 sm:h-11 text-[#EE4C2C]" />,
                },
                {
                  name: "Amazon SageMaker",
                  category: "Cloud platform",
                  desc: "Manage model training and deployment.",
                  icon: (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-2xl font-black tracking-tighter text-white leading-none font-sans lowercase">aws</span>
                      <svg className="w-10 h-2.5 -mt-0.5" viewBox="0 0 100 24" fill="none">
                        <path d="M8 6 C35 24, 65 24, 92 8" stroke="#FF9900" strokeWidth="5" strokeLinecap="round" />
                        <polygon points="95,9 84,3 87,14" fill="#FF9900" />
                      </svg>
                    </div>
                  ),
                },
                {
                  name: "Pinecone",
                  category: "Vector search",
                  desc: "Retrieve relevant information using embeddings.",
                  icon: (
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l1.6 2.4h-3.2L12 2zm-3.8 3.5l1.8 2.5H6.2l1.8-2.5zm7.6 0l1.8 2.5h-3.6l1.8-2.5zM6 10.2l2 2.8H4l2-2.8zm12 0l2 2.8h-4l2-2.8zm-8 0l2 2.8h-4l2-2.8zm4 0l2 2.8h-4l2-2.8zm-6.2 4.6l1.8 2.5H5.8l1.8-2.5zm8.4 0l1.8 2.5h-3.6l1.8-2.5zm-4.2 0l1.8 2.5h-3.6l1.8-2.5zm0 4.2l1.4 2h-2.8l1.4-2z" />
                    </svg>
                  ),
                },
                {
                  name: "Claude",
                  category: "Language models",
                  desc: "Support reasoning and document workflows.",
                  icon: <SiClaude className="w-10 h-10 sm:w-11 sm:h-11 text-[#D97757]" />,
                },
              ].map((tool, index) => (
                <ScrollReveal key={tool.name} delay={index * 0.04}>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d10] p-6 sm:p-7 flex items-center gap-5 sm:gap-6 hover:border-white/20 transition-all duration-300 h-full">
                    <div className="w-14 h-14 flex items-center justify-center shrink-0">
                      {tool.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                        {tool.name}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-gray-400 font-medium mt-0.5 font-sans">
                        {tool.category}
                      </p>
                      <p className="text-xs sm:text-[13px] text-gray-400 leading-relaxed mt-1 font-sans">
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Footnote */}
            <ScrollReveal delay={0.35}>
              <p className="text-xs sm:text-sm text-gray-500 font-normal mt-8 pt-4 border-t border-white/[0.04] font-sans">
                The final stack depends on the requirements of each project.
              </p>
            </ScrollReveal>
          </div>
        </section>


  
      {/* Beyond AI Services Section */}
      <section className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-[#0a0a0c] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gray-400 uppercase">
                KEEP BUILDING
              </span>
              <span className="w-8 h-[2px] bg-yellow-400"></span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="max-w-3xl mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
                Your brand, <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">beyond AI.</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Connect your AI intelligence with scalable engineering, high-growth marketing, and cohesive brand design.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 bg-gradient-to-b from-[#111115]/90 to-[#0a0a0d]/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl shadow-black/80">
            {/* 1. Development Services */}
            <ScrollReveal delay={0.15} className="border-b md:border-r border-white/10">
              <Link
                href="https://www.bizdevelopment.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-5 sm:gap-6 p-6 sm:p-8 lg:p-10 hover:bg-gradient-to-br hover:from-white/[0.05] hover:via-yellow-400/[0.02] hover:to-transparent transition-all duration-300 h-full"
              >
                <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-yellow-400 group-hover:border-yellow-400/40 group-hover:bg-yellow-400/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Code2 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                        Development Services
                      </h3>
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-yellow-400 bg-yellow-400/10 border border-yellow-400/25 px-2 py-0.5 rounded-md">
                        NEW TAB
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-normal leading-relaxed">
                      Custom websites, modern web applications, and scalable digital platforms.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 group-hover:text-yellow-400 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10 transition-all duration-300 shrink-0">
                  <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </ScrollReveal>

            {/* 2. Social media marketing */}
            <ScrollReveal delay={0.2} className="border-b border-white/10">
              <Link
                href="/socialmedia"
                className="group flex items-center justify-between gap-5 sm:gap-6 p-6 sm:p-8 lg:p-10 hover:bg-gradient-to-br hover:from-white/[0.05] hover:via-yellow-400/[0.02] hover:to-transparent transition-all duration-300 h-full"
              >
                <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-yellow-400 group-hover:border-yellow-400/40 group-hover:bg-yellow-400/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Megaphone className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      Social media marketing
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-normal leading-relaxed">
                      Show up with a consistent voice, impactful campaigns, and community growth.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 group-hover:text-yellow-400 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10 transition-all duration-300 shrink-0">
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </ScrollReveal>

            {/* 3. SEO & website audits */}
            <ScrollReveal delay={0.25} className="border-b md:border-b-0 md:border-r border-white/10">
              <Link
                href="/seowebsite"
                className="group flex items-center justify-between gap-5 sm:gap-6 p-6 sm:p-8 lg:p-10 hover:bg-gradient-to-br hover:from-white/[0.05] hover:via-yellow-400/[0.02] hover:to-transparent transition-all duration-300 h-full"
              >
                <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-yellow-400 group-hover:border-yellow-400/40 group-hover:bg-yellow-400/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Search className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      SEO & website audits
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-normal leading-relaxed">
                      Make your business easier to find with data-driven search and site optimization.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 group-hover:text-yellow-400 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10 transition-all duration-300 shrink-0">
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </ScrollReveal>

            {/* 4. Brand identity design */}
            <ScrollReveal delay={0.3}>
              <Link
                href="/brandidentity"
                className="group flex items-center justify-between gap-5 sm:gap-6 p-6 sm:p-8 lg:p-10 hover:bg-gradient-to-br hover:from-white/[0.05] hover:via-yellow-400/[0.02] hover:to-transparent transition-all duration-300 h-full"
              >
                <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-yellow-400 group-hover:border-yellow-400/40 group-hover:bg-yellow-400/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Palette className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      Brand identity design
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-normal leading-relaxed">
                      Memorable logos, cohesive systems, and guidelines that bring your identity together.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 group-hover:text-yellow-400 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10 transition-all duration-300 shrink-0">
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </main>
    </>
  )
}
