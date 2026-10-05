import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Clock, Calendar, ArrowRight, User, Tag, ChevronLeft, Share2, Bookmark } from "lucide-react";
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

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


      <main className={`min-h-screen bg-black text-white ${inter.className}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pb-24 pt-28 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto relative overflow-hidden"
          >
            {/* Dynamic Yellow Glows - Matching Home Theme */}
            <div className="absolute inset-0 w-full h-[600px] pointer-events-none z-0 overflow-hidden opacity-50">
              <motion.div
                animate={{
                  x: ["-10vw", "60vw", "60vw", "-10vw", "-10vw"],
                  y: ["-10vh", "-10vh", "40vh", "40vh", "-10vh"],
                  opacity: [0.5, 0.7, 0.5, 0.7, 0.5],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-[40vh] h-[40vh] md:w-[50vh] md:h-[50vh] bg-yellow-400 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen"
              />
            </div>
            {/* Ultra-Premium Hero Section */}
            <div className="relative text-center max-w-5xl mx-auto mb-16 pt-8 z-10">
              <h1 className="sr-only">Bizleap Blog</h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className={`text-4xl md:text-5xl lg:text-[4rem] font-bold mb-6 tracking-tight leading-[1.1] text-white ${playfair.className}`}
              >
                Leap Into <span className="text-[#E5A900] italic font-medium">Smarter</span><br />
                <span className="text-[#E5A900] italic font-medium">Business</span> Decisions.
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white/80 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
                {filteredBlogs.map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (idx % 3) * 0.15, duration: 0.6 }}
                    className="group relative w-full h-full flex flex-col overflow-hidden rounded-3xl bg-neutral-900/40 border border-white/5 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]"
                  >
                    {/* Image Wrapper */}
                    <Link href={`/blogs/${blog.id}`} className="block relative aspect-video overflow-hidden shrink-0 cursor-pointer rounded-t-3xl">
                      <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                      {/* Elegant overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Bizleap Watermark */}
                      <div className="absolute top-4 left-5 z-20 font-bold text-white tracking-wide text-sm drop-shadow-md">
                        Biz<span className="text-yellow-400">leap</span>
                      </div>
                    </Link>

                    {/* Content Wrapper */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow justify-between z-10 relative">
                      <div>
                        {/* Meta Row */}
                        <div className="flex items-center gap-3 mb-5">
                          <span className="bg-yellow-400/10 text-yellow-400 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                            {blog.category}
                          </span>
                          <span className="text-neutral-400 text-xs sm:text-sm font-medium">
                            {blog.readTime}
                          </span>
                        </div>

                        {/* Title — links to blog post */}
                        <Link href={`/blogs/${blog.id}`} className="block mb-3">
                          <h3 
                            className={`text-xl md:text-2xl font-medium text-white leading-tight group-hover:text-[#E5A900] transition-colors duration-300 line-clamp-2 ${playfair.className}`}
                            title={blog.title}
                          >
                            {blog.title}
                          </h3>
                        </Link>
                      </div>

                      {/* Author & Arrow Button Row */}
                      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                        <Link
                          href={`/authors/${blog.author.toLowerCase().replace(/ /g, '-')}`}
                          className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          By {blog.author}
                        </Link>
                        
                        <Link href={`/blogs/${blog.id}`}>
                          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 cursor-pointer">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                          </div>
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
