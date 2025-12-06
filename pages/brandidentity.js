'use client'

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FiCheck, FiArrowRight, FiFileText, FiGrid, FiGlobe, FiStar } from "react-icons/fi"

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

// ------------------- Deliverable Card -------------------
function DeliverableCard({ icon: Icon, title, description }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-yellow-500/30 transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
        {Icon && <Icon className="w-6 h-6 text-yellow-500" />}
      </div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

export default function BrandIdentityService() {
  const deliverables = [
    {
      icon: FiStar,
      title: "Logo Design",
      description: "Primary, secondary, and submark logos in multiple formats"
    },
    {
      icon: FiPalette,
      title: "Color Palette",
      description: "Primary, secondary, and accent colors with usage guidelines"
    },
    {
      icon: FiFileText,
      title: "Typography System",
      description: "Font pairing recommendations and hierarchy guidelines"
    },
    {
      icon: FiGrid,
      title: "Brand Guidelines",
      description: "Comprehensive manual covering all brand applications"
    },
    {
      icon: FiGlobe,
      title: "Brand Assets",
      description: "Social media kits, business cards, and stationery designs"
    }
  ]

  const processSteps = [
    {
      title: "Discovery & Strategy",
      description: "Deep dive into your business, values, and target audience to establish brand positioning",
      color: "from-blue-500/20 to-blue-600/10"
    },
    {
      title: "Concept Development",
      description: "Multiple logo concepts and visual directions based on strategic insights",
      color: "from-purple-500/20 to-purple-600/10"
    },
    {
      title: "Visual Identity Design",
      description: "Development of complete brand system including colors, typography, and imagery",
      color: "from-yellow-500/20 to-yellow-600/10"
    },
    {
      title: "Application & Guidelines",
      description: "Creating real-world applications and comprehensive usage guidelines",
      color: "from-green-500/20 to-green-600/10"
    }
  ]

  const brandProjects = [
    {
      name: "EcoHarvest Organics",
      industry: "Organic Food Brand",
      description: "Complete rebranding with earthy color palette and sustainable packaging design",
      colors: ["#2D5A27", "#8DBB61", "#F5F5DC", "#1A1A1A"]
    },
    {
      name: "NexaTech Solutions",
      industry: "IT Services",
      description: "Modern tech brand with futuristic logo and clean, professional identity system",
      colors: ["#0066FF", "#00D4FF", "#0A0A0A", "#FFFFFF"]
    },
    {
      name: "Bloom Beauty",
      industry: "Cosmetics",
      description: "Feminine and elegant branding for premium skincare line with luxurious packaging",
      colors: ["#FF6B8B", "#FFD166", "#FFFFFF", "#1A1A1A"]
    },
    {
      name: "UrbanBrew Coffee",
      industry: "Coffee Shop Chain",
      description: "Vibrant urban coffee brand with distinctive typography and pattern system",
      colors: ["#8B4513", "#D4A76A", "#1A1A1A", "#FFFFFF"]
    }
  ]

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-yellow-500/5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <Badge variant="outline" className="mb-6">Brand Identity Design</Badge>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Build a Brand That <span className="text-yellow-500">Stands Out</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  We craft memorable brand identities that connect emotionally with your audience and communicate your unique value proposition. From logos to complete brand systems, we build foundations for lasting success.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 flex items-center gap-2"
                  >
                    Start Your Brand Journey <FiArrowRight />
                  </Link>
                  
                </div>
              </ScrollReveal>
            </div>
            <div className="relative">
              <ScrollReveal delay={0.4}>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="/images/abstract-2.webp"
                    alt="Brand Identity Design"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Why Brand Identity Matters */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Why Your Brand Identity Matters</h2>
              <p className="text-gray-400 text-lg">
                A strong brand identity is more than just a logo—it's the visual language that tells your story, builds trust, and drives recognition.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "First Impressions Count",
                description: "Your brand identity is often the first interaction potential customers have with your business. We make sure it's memorable and impactful.",
                stat: "94%"
              },
              {
                title: "Builds Trust & Credibility",
                description: "Professional branding establishes authority and makes your business appear more established and reliable.",
                stat: "3.5x"
              },
              {
                title: "Differentiates From Competitors",
                description: "In crowded markets, distinctive branding helps you stand out and attract your ideal customers.",
                stat: "68%"
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
                  <div className="text-5xl font-bold text-yellow-500 mb-4">{item.stat}</div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section id="deliverables" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Complete Brand Package</h2>
              <p className="text-gray-400 text-lg">
                Every brand identity project includes a comprehensive set of deliverables ready for immediate use.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {deliverables.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <DeliverableCard {...item} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Brand Development Process</h2>
              <p className="text-gray-400 text-lg">
                A strategic approach to creating meaningful and effective brand identities.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className={`p-8 rounded-2xl border border-gray-800 bg-gradient-to-r ${step.color}`}>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
<section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
  <div className="max-w-6xl mx-auto">
    <ScrollReveal>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold mb-6">Brand Identity Portfolio</h2>
        <p className="text-gray-400 text-lg">
          Discover how we've transformed businesses through strategic brand design and marketing.
        </p>
      </div>
    </ScrollReveal>
    
    <div className="grid md:grid-cols-2 gap-8">
      {[
        {
          title: "Lord Of the Drinks - Brand Revival",
          brand: "Lord Of the Drinks",
          description: "Once trending in Nagpur, Lord of the Drinks faced declining sales. Bizleap revived the brand with a six-month social media strategy, creative content, food photography, and high-impact events. The result: renewed buzz, higher footfall, and a strong comeback as one of Nagpur's top F&B brands.",
          img: "/Casestudy/LOD.png",
          logo: "/clients/15.png",
          industry: "Hospitality & F&B"
        },
        {
          title: "Rasoi Express - Food Delivery for Small Towns",
          brand: "Rasoi Express",
          description: "Bizleap launched Rasoi Express in Pandharkawda, giving 50,000+ residents their first food delivery app. It brings hot meals home, supports local restaurants, and creates jobs—proving small towns deserve big-city convenience.",
          img: "/Casestudy/Rasoi.png",
          logo: "/clients/66.png",
          industry: "Food Tech"
        },
        {
          title: "Hotel Anantara - New Year Party",
          brand: "Hotel Anantara",
          description: "Bizleap transformed Nagpur's biggest New Year party at Hotel Anantara into a record-breaking success — with impactful Instagram promotions, lead-driven campaigns, and flawless execution that made it the city's most talked-about celebration.",
          img: "/Casestudy/Anantara.png",
          logo: "/clients/20.png",
          industry: "Hospitality"
        },
        {
          title: "Tuli The Grand - Brand Launch",
          brand: "Tuli The Grand",
          description: "We launched Tuli The Grand, a flagship venture of the Tuli Group of Hotels in Nagpur, creating its complete brand identity from logo to strategy. The inauguration was graced by Hon. Nitin Gadkari as chief guest.",
          img: "/Casestudy/tuli.png",
          logo: "/clients/14.png",
          industry: "Luxury Hotels"
        },
        {
          title: "Bizleap x SolarArk: Website Revamp",
          brand: "SOLAR ARK",
          description: "Bizleap redesigned Solar Ark's website with fresh content, on-site shoots, and client stories—creating a platform that highlights their solar expertise and strengthens brand credibility.",
          img: "/Casestudy/solar.webp",
          logo: "/clients/52.png",
          industry: "Renewable Energy"
        },
      ].map((project, index) => (
        <ScrollReveal key={index} delay={index * 0.1}>
          <div className="group overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-yellow-500/50 transition-all duration-500 h-full">
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              
              
              {/* Industry Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-black/80 backdrop-blur-sm">
                  {project.industry}
                </Badge>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <Badge variant="secondary" className="mb-3 text-xs">
                Case Study
              </Badge>
              
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                {project.title}
              </h3>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <FiStar className="w-3 h-3 text-yellow-500" />
                </div>
                <span className="font-medium text-gray-300">{project.brand}</span>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
    
  </div>
</section>

      {/* Tools & Software */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Design Tools & Software</h2>
              <p className="text-gray-400 text-lg">
                We use industry-standard tools to create professional, production-ready brand assets.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Adobe Illustrator", purpose: "Vector Logo Design" },
              { name: "Adobe Photoshop", purpose: "Image Editing & Mockups" },
              { name: "Figma", purpose: "Collaborative Design" },
              { name: "InDesign", purpose: "Brand Guidelines" },
              { name: "Procreate", purpose: "Hand-drawn Elements" },
              { name: "After Effects", purpose: "Animated Logos" },
              { name: "Blender", purpose: "3D Brand Elements" },
              { name: "Glyphs", purpose: "Custom Typography" },
            ].map((tool, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-yellow-500/30 transition-all duration-300">
                  <div className="text-lg font-semibold mb-2">{tool.name}</div>
                  <div className="text-sm text-gray-400">{tool.purpose}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      
    </main>
  )
}