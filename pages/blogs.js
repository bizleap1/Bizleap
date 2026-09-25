import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Clock, Calendar, ArrowRight, User, Tag, ChevronLeft, Share2, Bookmark } from "lucide-react";

import { BLOGS_DATA } from "../data/blogsData";

const CATEGORIES = ["All", "AI & Tech", "Web Design", "SEO & Audits", "Marketing"];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = selectedCategory === "All"
    ? BLOGS_DATA
    : BLOGS_DATA.filter(b => b.category === selectedCategory);

  return (
    <>
      <Head>
        <title key="title">Bizleap Blog – Digital Marketing, AI & Technology Insights</title>
        <meta name="keywords" content="bizleap blog, digital marketing insights, web design tips, technical seo blog" />
        <meta name="description" key="description" content="Explore Bizleap's latest insights on digital marketing, web design, technology audits, SEO, and generative AI innovations." />
        <link rel="canonical" href="https://bizleap.in/blogs" />

        {/* Open Graph */}
        <meta property="og:title" content="Bizleap Blog – Digital Marketing, AI & Technology Insights" key="og:title" />
        <meta property="og:description" content="Explore Bizleap's latest insights on digital marketing, web design, technology audits, SEO, and generative AI innovations." key="og:description" />
        <meta property="og:url" content="https://bizleap.in/blogs" key="og:url" />
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

      {/* Reading Progress Bar (Only visible when reading an article) */}


      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pb-24 pt-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto"
          >
            {/* Ultra-Premium Hero Section */}
            <div className="relative text-center max-w-5xl mx-auto mb-10 pt-4">
              {/* Background Glow Effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[600px] h-[400px] bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none z-0" />

              <h1 className="sr-only">Bizleap Blog</h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight leading-[1.05] text-white"
              >
                Leap Into <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">Smarter</span><br />
                Business Decisions.
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative z-10 text-neutral-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed"
              >
                Mastering the intersection of advanced technology, premium design, and scalable brand growth.
              </motion.p>


            </div>

            {/* Static Glassmorphic Category Bar */}
            <div className="flex justify-center mb-16 pointer-events-none">
              <div className="pointer-events-auto flex gap-2 p-1.5 bg-[#111]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl overflow-x-auto max-w-full scrollbar-hide">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 whitespace-nowrap ${selectedCategory === cat
                      ? "text-black bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Bento Grid for All Posts */}
            {filteredBlogs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-[1400px] mx-auto px-4 lg:px-8">
                {filteredBlogs.map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (idx % 3) * 0.15, duration: 0.6 }}
                    className="group flex flex-col bg-transparent overflow-hidden h-full"
                  >
                    {/* Image — links to blog post */}
                    <Link href={`/blogs/${blog.id}`} className="block relative h-64 rounded-2xl overflow-hidden shrink-0 cursor-pointer">
                      <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-5 z-20 font-bold text-white tracking-wide text-sm drop-shadow-md">
                        Biz<span className="text-yellow-400">leap</span>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="mt-5 flex flex-col flex-1">
                      {/* Meta Row */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-neutral-800 text-white text-xs font-semibold px-3 py-1.5 rounded">
                          {blog.category}
                        </span>
                        <span className="text-neutral-400 text-sm font-medium">
                          {blog.readTime}
                        </span>
                      </div>

                      {/* Title — links to blog post */}
                      <Link href={`/blogs/${blog.id}`} className="block mb-3">
                        <h3 className="text-base md:text-lg font-bold text-white leading-snug hover:text-yellow-400 transition-colors">
                          {blog.title}
                        </h3>
                      </Link>

                      {/* Author — links to author profile */}
                      <div className="mt-auto pt-4">
                        <Link
                          href={`/authors/${blog.author.toLowerCase().replace(/ /g, '-')}`}
                          className="text-neutral-500 text-sm hover:text-yellow-400 transition-colors font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {blog.author}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}
