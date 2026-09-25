import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, ChevronLeft, Share2, Bookmark, Home } from "lucide-react";
import { BLOGS_DATA } from "../../data/blogsData";
import { AUTHORS_DATA, getAuthorSlug } from "../../data/authorsData";

// Maps categories to relevant service pages on the existing Bizleap website
const CATEGORY_SERVICE_MAP = {
  "AI & Tech": { label: "AI Integration Services", href: "/" },
  "SEO & Audits": { label: "SEO & Technical Audits", href: "/seowebsite" },
  "Marketing": { label: "Social Media Marketing", href: "/socialmedia" },
  "Web Design": { label: "Web Design Services", href: "/" },
};

export async function getStaticPaths() {
  const paths = BLOGS_DATA.map((blog) => ({
    params: { slug: blog.id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const blog = BLOGS_DATA.find((b) => b.id === params.slug);
  if (!blog) return { notFound: true };

  const authorDetails = AUTHORS_DATA.find((a) => a.name === blog.author) || null;
  const authorSlug = getAuthorSlug(blog.author);

  // Related articles: same category, excluding current post, max 3
  const relatedBlogs = BLOGS_DATA.filter(
    (b) => b.id !== blog.id && b.category === blog.category
  ).slice(0, 3);

  return {
    props: {
      blog,
      authorDetails,
      authorSlug,
      relatedBlogs,
    },
  };
}

export default function BlogPost({ blog, authorDetails, authorSlug, relatedBlogs }) {
  const canonicalUrl = `https://www.bizleap.in/blogs/${blog.id}`;
  const serviceLink = CATEGORY_SERVICE_MAP[blog.category] || null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    "headline": blog.title,
    "description": blog.description,
    "image": blog.image || undefined,
    "author": {
      "@type": "Person",
      "name": blog.author,
      ...(authorSlug && { "url": `https://www.bizleap.in/authors/${authorSlug}` }),
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bizleap",
      "url": "https://www.bizleap.in",
    },
    "datePublished": blog.publishedAt || blog.date,
    "dateModified": blog.updatedAt || blog.date,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.bizleap.in/" },
      { "@type": "ListItem", "position": 2, "name": "Blogs", "item": "https://www.bizleap.in/blogs" },
      { "@type": "ListItem", "position": 3, "name": blog.title, "item": canonicalUrl },
    ],
  };

  return (
    <>
      <Head>
        <title key="title">{blog.metaTitle || `${blog.title} | Bizleap Blog`}</title>
        <meta name="description" key="description" content={blog.metaDescription || blog.description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:site_name" content="Bizleap" key="og:site_name" />
        <meta property="og:title" content={blog.metaTitle || `${blog.title} | Bizleap Blog`} key="og:title" />
        <meta property="og:description" content={blog.metaDescription || blog.description} key="og:description" />
        <meta property="og:url" content={canonicalUrl} key="og:url" />
        {blog.image && <meta property="og:image" content={blog.image} key="og:image" />}
        {blog.publishedAt && <meta property="article:published_time" content={blog.publishedAt} key="article:published_time" />}
        {blog.updatedAt && <meta property="article:modified_time" content={blog.updatedAt} key="article:modified_time" />}
        {authorSlug && <meta property="article:author" content={`https://www.bizleap.in/authors/${authorSlug}`} key="article:author" />}

        {/* Twitter */}
        <meta name="twitter:card" content={blog.image ? "summary_large_image" : "summary"} key="twitter:card" />
        <meta name="twitter:title" content={blog.metaTitle || `${blog.title} | Bizleap Blog`} key="twitter:title" />
        <meta name="twitter:description" content={blog.metaDescription || blog.description} key="twitter:description" />
        {blog.image && <meta name="twitter:image" content={blog.image} key="twitter:image" />}

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full"
        >
          {/* Hero Image */}
          <div className="relative w-full h-[55vh] md:h-[75vh] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0a0a0a] z-10" />
            {blog.image ? (
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800" />
            )}

            {/* Hero overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-20 md:pb-28 max-w-[1400px] mx-auto w-full">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-sm text-neutral-400">
                  <li><Link href="/" className="hover:text-yellow-400 transition-colors flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link></li>
                  <li className="text-neutral-600">/</li>
                  <li><Link href="/blogs" className="hover:text-yellow-400 transition-colors">Blogs</Link></li>
                  <li className="text-neutral-600">/</li>
                  <li className="text-neutral-300 truncate max-w-[200px]">{blog.title}</li>
                </ol>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 mb-5"
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
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl"
              >
                {blog.title}
              </motion.h1>
            </div>
          </div>

          {/* Page Layout */}
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-30 -mt-6 pb-32 flex flex-col lg:flex-row gap-12 lg:gap-20 w-full">

            {/* Sticky Author Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              aria-label="Author information"
              className="lg:w-[240px] shrink-0 lg:sticky lg:top-28 h-fit order-2 lg:order-1 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-8 py-8 lg:py-0 border-t lg:border-t-0 border-white/10"
            >
              {/* Author */}
              {authorSlug ? (
                <Link
                  href={`/authors/${authorSlug}`}
                  className="group flex items-center gap-4 cursor-pointer"
                  aria-label={`View author profile for ${blog.author}`}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-black text-xl shadow-lg overflow-hidden border-2 border-transparent group-hover:border-yellow-400 transition-colors shrink-0">
                    {authorDetails?.image ? (
                      <img src={authorDetails.image} alt={`Profile photo of ${blog.author}`} className="w-full h-full object-cover" />
                    ) : (
                      <span>{blog.author.split(" ").map((n) => n[0]).join("")}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-1">Written By</p>
                    <p className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors">{blog.author}</p>
                    <p className="text-xs text-neutral-400 mt-1">{blog.date}</p>
                  </div>
                </Link>
              ) : (
                /* Author not in approved registry — display name only, no link */
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 font-black text-xl shrink-0">
                    {blog.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-1">Written By</p>
                    <p className="text-base font-bold text-neutral-300">{blog.author}</p>
                    <p className="text-xs text-neutral-400 mt-1">{blog.date}</p>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex lg:flex-col gap-4 mt-4">
                <button
                  aria-label="Share this article"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-yellow-400 hover:bg-yellow-400/10 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  aria-label="Bookmark this article"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-yellow-400 hover:bg-yellow-400/10 transition-all"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Internal Service Link */}
              {serviceLink && (
                <div className="hidden lg:block mt-6 w-full">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-3">Related Service</p>
                  <Link
                    href={serviceLink.href}
                    className="block text-sm text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                  >
                    {serviceLink.label} →
                  </Link>
                </div>
              )}
            </motion.aside>

            {/* Article Body */}
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex-1 order-1 lg:order-2"
            >
              <div className="bg-[#111]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 lg:p-16 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)]">
                {/* Article content */}
                <div
                  className="prose prose-invert md:prose-lg max-w-none
                    prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:font-light
                    prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                    prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-5
                    prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-4 prose-blockquote:border-yellow-500 prose-blockquote:bg-yellow-500/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                    prose-ul:text-neutral-300 prose-li:marker:text-yellow-400
                    prose-strong:text-white"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* FAQ Section */}
                {blog.faqs && blog.faqs.length > 0 && (
                  <section aria-labelledby="faq-heading" className="mt-16 pt-12 border-t border-white/10">
                    <h2 id="faq-heading" className="text-2xl font-bold mb-8 text-white">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-5">
                      {blog.faqs.map((faq, idx) => (
                        <div key={idx} className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5">
                          <h3 className="text-base font-bold text-yellow-400 mb-2">{faq.question}</h3>
                          <p className="text-neutral-300 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                    {/* FAQ Schema — only rendered when FAQs are visibly on page */}
                    <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                          "@context": "https://schema.org",
                          "@type": "FAQPage",
                          "mainEntity": blog.faqs.map((faq) => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
                          })),
                        }),
                      }}
                    />
                  </section>
                )}

                {/* Internal Service CTA */}
                {serviceLink && (
                  <div className="mt-12 p-6 bg-yellow-400/5 border border-yellow-400/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                    <div>
                      <p className="text-xs text-yellow-400 uppercase tracking-widest font-semibold mb-1">Relevant Service</p>
                      <p className="text-white font-bold">{serviceLink.label}</p>
                    </div>
                    <Link
                      href={serviceLink.href}
                      className="shrink-0 px-6 py-3 bg-yellow-400 text-black font-bold text-sm rounded-full hover:bg-yellow-300 transition-colors"
                    >
                      Learn More →
                    </Link>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-16 p-10 md:p-14 rounded-[2rem] bg-[#0a0a0c] border border-white/5 text-center relative overflow-hidden shadow-2xl shadow-black/50">
                  <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter text-white">
                      Ready to scale <span className="font-serif italic font-light text-yellow-400">differently?</span>
                    </h2>
                    <p className="text-neutral-400 font-medium mb-8 max-w-md mx-auto text-base">
                      Let's discuss how design, marketing, and AI can accelerate your business growth.
                    </p>
                    <Link
                      href="/contact"
                      className="px-8 py-4 bg-yellow-400 text-black hover:bg-yellow-300 font-black uppercase tracking-widest text-sm rounded-full transition-all duration-300 inline-flex items-center gap-3"
                    >
                      Let's Leap Forward <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Back Button */}
                <div className="mt-10 flex justify-center">
                  <Link
                    href="/blogs"
                    className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 text-neutral-300 hover:border-yellow-400 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all font-bold uppercase tracking-widest text-sm group"
                  >
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    Back to Blogs
                  </Link>
                </div>
              </div>

              {/* Related Articles */}
              {relatedBlogs.length > 0 && (
                <section aria-labelledby="related-heading" className="mt-16">
                  <h2 id="related-heading" className="text-2xl font-bold mb-8 text-white">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedBlogs.map((related, idx) => (
                      <Link href={`/blogs/${related.id}`} key={related.id} className="group block">
                        <motion.article
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col"
                        >
                          <div className="relative h-44 shrink-0 overflow-hidden">
                            {related.image ? (
                              <img
                                src={related.image}
                                alt={related.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full bg-neutral-800" />
                            )}
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2">{related.category}</span>
                            <h3 className="text-sm font-bold text-white leading-snug group-hover:text-yellow-400 transition-colors">
                              {related.title}
                            </h3>
                          </div>
                        </motion.article>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </motion.article>
          </div>
        </motion.div>
      </main>
    </>
  );
}
