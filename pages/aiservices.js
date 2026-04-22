'use client'

import { useRef } from "react"
import Head from "next/head";
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FiCheck, FiArrowRight, FiCpu, FiBarChart2, FiZap, FiSettings, FiStar, FiSearch } from "react-icons/fi"

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
  const ref = useRef(null)
  const inView = useInView(ref, { margin: "0px 0px -150px 0px", once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)", transition: { delay, duration: 0.6 } }
          : {}
      }
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
        <title>AI Innovation & Services | Bizleap</title>
        <meta name="description" content="Unlock the potential of Artificial Intelligence with Bizleap. We provide Generative AI, Automation, and Custom AI solutions for modern businesses." />
        <link rel="canonical" href="https://bizleap.in/aiservices" />
      </Head>
      
      <main className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-purple-500/5"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
              <div>
                <ScrollReveal>
                  <Badge variant="outline" className="mb-6">AI Innovation Lab</Badge>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                    Future-Proof Your Business with <br />
                    <span className="text-yellow-500">AI Innovation</span>
                  </h1>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                    Leverage the power of Artificial Intelligence to automate workflows, gain deeper insights, and deliver personalized customer experiences. We bridge the gap between complex AI technology and real-world business results.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="px-8 py-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 flex items-center gap-2 text-lg"
                    >
                      Schedule an AI Audit <FiArrowRight />
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
              <div className="relative">
                <ScrollReveal delay={0.4}>
                  <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                    <Image
                      src="/ai_hero.png"
                      alt="AI Innovation Lab"
                      width={600}
                      height={500}
                      className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-4xl font-bold mb-6">Our AI Capabilities</h2>
                <p className="text-gray-400 text-lg">
                  Comprehensive AI solutions designed to drive efficiency and innovation across every department of your organization.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiFeatures.map((feature, index) => (
                <ServiceCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 px-6 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <ScrollReveal>
                  <h2 className="text-4xl font-bold mb-8">The AI Implementation <span className="text-yellow-500">Journey</span></h2>
                  <p className="text-gray-400 text-lg mb-12">
                    We follow a rigorous, data-driven methodology to ensure your AI initiatives deliver measurable ROI and long-term value.
                  </p>
                </ScrollReveal>

                <div className="space-y-8">
                  {processSteps.map((step, index) => (
                    <ScrollReveal key={index} delay={index * 0.1}>
                      <div className="flex gap-6 items-start">
                        <div className="text-4xl font-bold text-yellow-500/30 font-mono leading-none">{step.number}</div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-400 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <ScrollReveal delay={0.4}>
                  <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
                      alt="AI Development Visualization"
                      width={600}
                      height={800}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                      <div className="text-yellow-500 font-bold mb-2">Did you know?</div>
                      <p className="text-sm text-gray-300">Businesses that integrate AI see an average of 40% increase in operational efficiency within the first year.</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Tools & Tech */}
        <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-4">Our AI Tech Stack</h2>
                <p className="text-gray-400">We use the most advanced tools and frameworks to build reliable, scalable AI systems.</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {aiTools.map((tool, index) => (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-yellow-500/20 transition-all text-center">
                    <div className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-2">{tool.category}</div>
                    <div className="text-lg font-semibold">{tool.name}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>


      </main>
    </>
  )
}
