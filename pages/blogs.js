import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, ArrowRight, User, Tag, ChevronLeft } from "lucide-react";

const BLOGS_DATA = [
  {
    id: "generative-ai-enterprise",
    title: "How Generative AI is Transforming Enterprise Operations",
    description: "Discover how modern enterprises are integrating custom LLMs and AI agents to automate high-impact operations and scale revenue.",
    category: "AI & Tech",
    date: "May 18, 2026",
    readTime: "6 min read",
    author: "Kaushal Banginwar",
    image: "/ai_hero.png",
    content: `
      <p class="lead text-xl text-neutral-300 mb-6 leading-relaxed">
        Generative Artificial Intelligence is no longer just a futuristic concept. Today, forward-thinking enterprises are moving beyond simple chatbots and implementing complex, automated AI systems that completely reshape how business is done.
      </p>
      
      <h3 class="text-2xl font-semibold text-white mt-8 mb-4">1. Automating High-Volume Operations</h3>
      <p class="text-neutral-400 mb-6 leading-relaxed">
        From automating customer support workflows with advanced sentiment analysis to draft-generation for legal documents and marketing assets, custom Large Language Model (LLM) pipelines are saving organizations thousands of manual hours. By fine-tuning models on proprietary data, companies can ensure brand consistency and operational security while operating at scale.
      </p>

      <h3 class="text-2xl font-semibold text-white mt-8 mb-4">2. Personalized Customer Experiences</h3>
      <p class="text-neutral-400 mb-6 leading-relaxed">
        AI-driven personalization is revolutionizing digital commerce. Algorithms can now analyze user behaviors, past purchases, and navigation history in real-time to generate custom product recommendations, tailored content feeds, and conversational purchasing assistants that increase customer lifetime value.
      </p>

      <blockquote class="border-l-4 border-yellow-400 pl-4 my-8 italic text-neutral-300">
        "The businesses that survive the next decade are not those that simply adopt AI, but those that design their core workflows around AI capabilities."
      </blockquote>

      <h3 class="text-2xl font-semibold text-white mt-8 mb-4">3. High-Impact AI Integrations at Bizleap</h3>
      <p class="text-neutral-400 mb-6 leading-relaxed">
        At Bizleap, we build custom generative AI solutions, automation pipelines, and machine learning models tailored to our clients' unique goals. Our team bridges the gap between state-of-the-art tech and real-world business growth, unlocking unmatched efficiency and scaling capabilities.
      </p>
    `
  },
  {
    id: "anatomy-high-converting-web-design",
    title: "The Anatomy of a High-Converting B2B Web Design",
    description: "A deep dive into user-centered design, cognitive load management, and premium visual design principles that drive measurable B2B leads.",
    category: "Web Design",
    date: "May 12, 2026",
    readTime: "5 min read",
    author: "Akshat Soni",
    image: "/images/b2b_web_design_hero.png",
    content: `
      <p class="lead text-xl text-neutral-300 mb-6 leading-relaxed">
        In the B2B world, your website is not just a digital brochure—it is your most powerful sales engine. A premium B2B web design must balance artistic visual storytelling with strategic user pathways that seamlessly guide visitors toward conversion.
      </p>
      
      <h3 class="text-2xl font-semibold text-white mt-8 mb-4">1. Reducing Cognitive Load</h3>
      <p class="text-neutral-400 mb-6 leading-relaxed">
        Modern users have incredibly short attention spans. Cluttered interfaces, dense blocks of text, and confusing navigation paths lead to high bounce rates. By implementing clean grid layouts, spacious vertical typography, and consistent color systems, we guide the user's eye exactly where it needs to go.
      </p>

      <h3 class="text-2xl font-semibold text-white mt-8 mb-4">2. The Power of Micro-Interactions</h3>
      <p class="text-neutral-400 mb-6 leading-relaxed">
        Premium websites feel alive. Smooth hover effects, subtle entry animations, and responsive elements build a sense of luxury and trust. These micro-interactions validate user actions and elevate the entire browsing experience from transactional to immersive.
      </p>

      <h3 class="text-2xl font-semibold text-white mt-8 mb-4">3. Mobil-First Responsiveness and Speed</h3>
      <p class="text-neutral-400 mb-6 leading-relaxed">
        Over 55% of global traffic originates from mobile devices. Ensuring fluid, high-velocity page loads and perfectly adapted mobile touch targets is critical. Fast websites improve bounce rates, increase session durations, and project absolute professional authority.
      </p>
    `
  },
  {
    id: "technical-seo-core-web-vitals",
    title: "Demystifying Modern Technical SEO & Core Web Vitals",
    description: "Learn how to optimize your site's technical structure to rank higher on Google Search by mastering Core Web Vitals and structured data.",
    category: "SEO & Audits",
    date: "May 05, 2026",
    readTime: "7 min read",
    author: "Kaushal Banginwar",
    image: "/images/technical_seo_vitals.png",
    content: `
      <p class="lead text-xl text-neutral-300 mb-6 leading-relaxed">
        SEO is no longer just about stuffing keywords into blog posts. Google's modern search algorithms prioritize user experience, website performance, and structural schema above almost everything else.
      </p>
      
      <h3 class="text-2xl font-semibold text-white mt-8 mb-4">1. Mastering Core Web Vitals</h3>
      <p class="text-neutral-400 mb-6 leading-relaxed">
        Google measures user experience using three core metrics: Largest Contentful Paint (load speed), First Input Delay (interactivity), and Cumulative Layout Shift (visual stability). Optimizing images, leveraging modern bundlers, and reducing redundant JS dependencies directly boosts your search visibility.
      </p>

      <h3 class="text-2xl font-semibold text-white mt-8 mb-4">2. The Crucial Role of Structured Data</h3>
      <p class="text-neutral-400 mb-6 leading-relaxed">
        Adding JSON-LD schemas provides search engines with context about your pages. Whether it's showcasing a business location, dynamic FAQ rich results, or detailed service offerings, structured data ensures your site stands out in SERPs with rich snippets and improved click-through rates.
      </p>
    `
  },
  {
    id: "creator-influencer-partnerships-guide",
    title: "The Ultimate Guide to Creator & Influencer Partnerships",
    description: "How to craft collaborative, high-ROI influencer marketing campaigns that build genuine trust and expand your brand's digital reach.",
    category: "Marketing",
    date: "April 28, 2026",
    readTime: "5 min read",
    author: "Akshat Soni",
    image: "/images/creator_influencer_network.png",
    content: `
      <p class="lead text-xl text-neutral-300 mb-6 leading-relaxed">
        Traditional advertising is facing declining engagement as audiences seek authenticity. Modern consumers turn to curators, creators, and niche influencers for trusted recommendations.
      </p>
      
      <h3 class="text-2xl font-semibold text-white mt-8 mb-4">1. Shifting from Metrics to Alignment</h3>
      <p class="text-neutral-400 mb-6 leading-relaxed">
        Follower count is a vanity metric. Successful campaigns target creators whose audience values align perfectly with your brand offerings. Micro-influencers with highly engaged communities consistently deliver higher conversion rates and ROI than macro-celebrities with disconnected followings.
      </p>

      <h3 class="text-2xl font-semibold text-white mt-8 mb-4">2. Creative Freedom and Collaboration</h3>
      <p class="text-neutral-400 mb-6 leading-relaxed">
        The best campaigns allow creators to express your brand value in their unique style. Audiences instantly notice highly rigid, copy-pasted corporate briefs. Trust your creative partners to tell your story in a language that resonates natively with their community.
      </p>
    `
  }
];

const CATEGORIES = ["All", "AI & Tech", "Web Design", "SEO & Audits", "Marketing"];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeBlog, setActiveBlog] = useState(null);

  const filteredBlogs = selectedCategory === "All"
    ? BLOGS_DATA
    : BLOGS_DATA.filter(b => b.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Insightful Blogs | Bizleap</title>
        <meta name="description" content="Explore Bizleap's latest articles and insights on digital marketing, web design, technology audits, and advanced generative AI innovations." />
        <link rel="canonical" href="https://bizleap.in/blogs" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": "https://bizleap.in/blogs#webpage",
              "url": "https://bizleap.in/blogs",
              "name": "Insightful Blogs | Bizleap",
              "description": "Explore Bizleap's latest articles and insights on digital marketing, web design, technology audits, and advanced generative AI innovations.",
              "isPartOf": { "@id": "https://bizleap.in/#website" },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bizleap.in/" },
                  { "@type": "ListItem", "position": 2, "name": "Blogs", "item": "https://bizleap.in/blogs" }
                ]
              },
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": BLOGS_DATA.map((blog, idx) => ({
                  "@type": "ListItem",
                  "position": idx + 1,
                  "name": blog.title,
                  "url": `https://bizleap.in/blogs?post=${blog.id}`
                }))
              }
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-black text-white px-6 py-24 md:px-12 lg:px-24">
        <AnimatePresence mode="wait">
          {!activeBlog ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto"
            >
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto mb-16">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-semibold mb-4 leading-tight"
                >
                  Our <span className="text-yellow-400">Insights</span> & Blogs
                </motion.h1>
                <p className="text-neutral-400 text-lg">
                  Deep-dives into modern web development, search engine rankings, brand architecture, and technology-driven operations.
                </p>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition duration-300 border ${
                      selectedCategory === cat
                        ? "bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/20"
                        : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <motion.div 
                layout
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredBlogs.map((blog) => (
                  <motion.article
                    layout
                    key={blog.id}
                    className="flex flex-col bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden hover:border-yellow-400/40 transition-all duration-300 group shadow-xl"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-yellow-400 text-xs px-3 py-1 rounded-full font-medium border border-neutral-800">
                        {blog.category}
                      </div>
                    </div>

                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {blog.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3">
                          {blog.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-neutral-900">
                        <span className="text-xs text-neutral-500 flex items-center gap-1">
                          <User className="w-3.5 h-3.5" /> By {blog.author}
                        </span>
                        <button
                          onClick={() => setActiveBlog(blog)}
                          className="flex items-center gap-1 text-sm font-semibold text-yellow-400 hover:text-white transition-colors"
                        >
                          Read Post <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="post"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="max-w-3xl mx-auto"
            >
              {/* Back Button */}
              <button
                onClick={() => setActiveBlog(null)}
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 font-semibold"
              >
                <ChevronLeft className="w-5 h-5" /> Back to Blogs
              </button>

              {/* Cover Image */}
              <div className="relative h-[25rem] rounded-3xl overflow-hidden mb-8 border border-neutral-900">
                <img
                  src={activeBlog.image}
                  alt={activeBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400 mb-4">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {activeBlog.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {activeBlog.readTime}</span>
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> By {activeBlog.author}</span>
                <span className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                  <Tag className="w-3.5 h-3.5" /> {activeBlog.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
                {activeBlog.title}
              </h1>

              {/* Body Content */}
              <div 
                className="prose prose-invert max-w-none text-neutral-300"
                dangerouslySetInnerHTML={{ __html: activeBlog.content }}
              />

              {/* CTA Section */}
              <div className="mt-16 p-8 rounded-2xl bg-neutral-950 border border-neutral-900 text-center">
                <h3 className="text-xl font-bold mb-2">Ready to transform your brand?</h3>
                <p className="text-neutral-400 mb-6 text-sm">Let's discuss how design, marketing, and modern technology can accelerate your business growth.</p>
                <Link href="/contact" className="px-6 py-3 bg-yellow-400 text-black hover:bg-yellow-300 font-bold rounded-xl transition duration-300 inline-block">
                  Let's Leap Forward
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
