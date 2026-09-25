import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Clock, ArrowRight, ChevronLeft, Share2, Bookmark } from "lucide-react";
import { BLOGS_DATA } from "../../data/blogsData";

export async function getStaticPaths() {
  const paths = BLOGS_DATA.map((blog) => ({
    params: { slug: blog.id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const blog = BLOGS_DATA.find((b) => b.id === params.slug);
  return { props: { blog } };
}

export default function BlogPost({ blog }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bizleap.in/blogs/${blog.id}`
    },
    "headline": blog.title,
    "description": blog.description,
    "image": blog.image,
    "author": {
      "@type": "Person",
      "name": blog.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bizleap",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bizleap.in/logo.png" // Update with actual logo
      }
    },
    "datePublished": new Date(blog.date).toISOString()
  };

  return (
    <>
      <Head>
        <title key="title">{blog.title} | Bizleap Blog</title>
        <meta name="description" key="description" content={blog.description} />
        <link rel="canonical" href={`https://bizleap.in/blogs/${blog.id}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${blog.title} | Bizleap Blog`} key="og:title" />
        <meta property="og:description" content={blog.description} key="og:description" />
        <meta property="og:url" content={`https://bizleap.in/blogs/${blog.id}`} key="og:url" />
        <meta property="og:image" content={blog.image} key="og:image" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={`${blog.title} | Bizleap Blog`} key="twitter:title" />
        <meta name="twitter:description" content={blog.description} key="twitter:description" />
        <meta name="twitter:image" content={blog.image} key="twitter:image" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <motion.div
          key="post"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
        >
          {/* Full Bleed Parallax Cover */}
          <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0a0a0a] z-10" />
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover object-center"
            />

            {/* Hero Title Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-12 lg:px-24 pt-32 pb-24 md:pb-32 max-w-[1400px] mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 mb-6"
              >
                <span className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  {blog.category}
                </span>
                <span className="text-neutral-300 text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {blog.readTime}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight md:leading-[1.15] max-w-4xl"
              >
                {blog.title}
              </motion.h1>
            </div>
          </div>

          {/* Content Layout */}
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-30 -mt-8 md:-mt-12 pb-32 flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
            {/* Left Sidebar (Sticky Meta) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:w-[250px] shrink-0 lg:sticky lg:top-32 h-fit order-2 lg:order-1 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-8 py-8 lg:py-0 border-t lg:border-t-0 border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-yellow-500/20">
                  {blog.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-1">Written By</p>
                  <Link href={`/authors/${blog.author.toLowerCase().replace(/ /g, '-')}`}>
                     <p className="text-base font-bold text-white hover:text-yellow-400 transition-colors cursor-pointer">{blog.author}</p>
                  </Link>
                  <p className="text-xs text-neutral-400 mt-1">{blog.date}</p>
                </div>
              </div>

              <div className="flex lg:flex-col gap-4">
                <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-yellow-400 hover:bg-yellow-400/10 transition-all">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-yellow-400 hover:bg-yellow-400/10 transition-all">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Main Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex-1 order-1 lg:order-2 bg-[#111]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)]"
            >
              {/* Article Body */}
              <div
                className="prose prose-invert md:prose-lg max-w-none
                           prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:font-light
                           prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                           prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6
                           prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:underline
                           prose-blockquote:border-l-4 prose-blockquote:border-yellow-500 prose-blockquote:bg-yellow-500/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:text-xl prose-blockquote:italic prose-blockquote:font-serif prose-blockquote:my-10"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* FAQ Section */}
              {blog.faqs && blog.faqs.length > 0 && (
                <div className="mt-16 pt-16 border-t border-white/10">
                  <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
                  <div className="space-y-6">
                    {blog.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5">
                        <h4 className="text-lg font-bold text-yellow-400 mb-2">{faq.question}</h4>
                        <p className="text-neutral-300">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                  {/* FAQ Schema */}
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": blog.faqs.map(faq => ({
                          "@type": "Question",
                          "name": faq.question,
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer
                          }
                        }))
                      })
                    }}
                  />
                </div>
              )}
              
              {/* Premium CTA Footer inside Article */}
              <div className="mt-20 p-10 md:p-16 rounded-[2.5rem] bg-[#0a0a0c] border border-white/5 text-center relative overflow-hidden group shadow-2xl shadow-black/50">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

                <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-black mb-5 tracking-tighter text-white">
                    Ready to scale <span className="font-serif italic font-light text-yellow-400">differently?</span>
                  </h3>
                  <p className="text-neutral-400 font-medium mb-10 max-w-lg mx-auto text-base md:text-lg">
                    Let's discuss how design, marketing, and modern technology can accelerate your business growth today.
                  </p>
                  <Link href="/contact" className="px-10 py-4 bg-yellow-400 text-black hover:bg-yellow-300 font-black uppercase tracking-widest text-sm rounded-full transition-all duration-500 inline-flex items-center gap-3 shadow-[0_0_40px_rgba(250,204,21,0.15)] hover:shadow-[0_0_60px_rgba(250,204,21,0.3)] hover:-translate-y-1">
                    Let's Leap Forward <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Bottom Back Button */}
              <div className="mt-12 flex justify-center">
                <Link href="/blogs" className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-neutral-300 hover:border-yellow-400 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all font-bold uppercase tracking-widest text-sm group">
                  <ChevronLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                  Back to Blogs Hub
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
