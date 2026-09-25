import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Home } from "lucide-react";
import { AUTHORS_DATA } from "../../data/authorsData";
import { BLOGS_DATA } from "../../data/blogsData";

export async function getStaticPaths() {
  // Only generate paths for the 3 approved authors. Aditya Sule is NOT included.
  const paths = AUTHORS_DATA.map((author) => ({
    params: { slug: author.id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const author = AUTHORS_DATA.find((a) => a.id === params.slug);
  if (!author) return { notFound: true };

  // Only show blogs where the author name exactly matches
  const authorBlogs = BLOGS_DATA.filter((b) => b.author === author.name);

  return { props: { author, authorBlogs } };
}

export default function AuthorProfile({ author, authorBlogs }) {
  const canonicalUrl = `https://www.bizleap.in/authors/${author.id}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author.name,
    "url": canonicalUrl,
    "jobTitle": author.role,
    "description": author.bio,
    "worksFor": {
      "@type": "Organization",
      "name": "Bizleap",
      "url": "https://www.bizleap.in",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.bizleap.in/" },
      { "@type": "ListItem", "position": 2, "name": "Blogs", "item": "https://www.bizleap.in/blogs" },
      { "@type": "ListItem", "position": 3, "name": author.name, "item": canonicalUrl },
    ],
  };

  return (
    <>
      <Head>
        <title key="title">{author.name} — {author.role} | Bizleap</title>
        <meta
          name="description"
          key="description"
          content={`${author.bio} Read articles by ${author.name} on the Bizleap blog.`}
        />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" key="og:type" />
        <meta property="og:site_name" content="Bizleap" key="og:site_name" />
        <meta property="og:title" content={`${author.name} — ${author.role} | Bizleap`} key="og:title" />
        <meta property="og:description" content={author.bio} key="og:description" />
        <meta property="og:url" content={canonicalUrl} key="og:url" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twitter:card" />
        <meta name="twitter:title" content={`${author.name} | Bizleap`} key="twitter:title" />
        <meta name="twitter:description" content={author.bio} key="twitter:description" />

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <main className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-neutral-500">
              <li>
                <Link href="/" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
                  <Home className="w-3 h-3" /> Home
                </Link>
              </li>
              <li>/</li>
              <li><Link href="/blogs" className="hover:text-yellow-400 transition-colors">Blogs</Link></li>
              <li>/</li>
              <li className="text-neutral-300">{author.name}</li>
            </ol>
          </nav>

          {/* Author Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-[#111] p-10 rounded-[2rem] border border-white/10 mb-16"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden border-4 border-yellow-400/20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center">
              {author.image ? (
                <img
                  src={author.image}
                  alt={`Profile photo of ${author.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-black text-yellow-400">
                  {author.name.split(" ").map((n) => n[0]).join("")}
                </span>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-black mb-2 text-white">{author.name}</h1>
              <p className="text-yellow-400 text-lg font-medium mb-4">{author.role}</p>
              <p className="text-neutral-300 max-w-2xl text-base md:text-lg leading-relaxed">{author.bio}</p>
              <p className="text-neutral-500 text-sm mt-4">
                {authorBlogs.length} article{authorBlogs.length !== 1 ? "s" : ""} published on Bizleap
              </p>
            </div>
          </motion.div>

          {/* Articles by Author */}
          <section aria-labelledby="author-articles-heading">
            <h2 id="author-articles-heading" className="text-2xl md:text-3xl font-bold mb-8 text-white">
              Articles by {author.name}
            </h2>

            {authorBlogs.length === 0 ? (
              <p className="text-neutral-400">No published articles found for this author yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {authorBlogs.map((blog, idx) => (
                  <Link href={`/blogs/${blog.id}`} key={blog.id} className="group block">
                    <motion.article
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: (idx % 3) * 0.12, duration: 0.5 }}
                      className="cursor-pointer flex flex-col bg-[#111] border border-white/5 rounded-2xl overflow-hidden h-full"
                    >
                      {/* Image */}
                      <div className="relative h-52 shrink-0 overflow-hidden bg-neutral-800">
                        {blog.image && (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">
                            {blog.category}
                          </span>
                          <span className="text-neutral-500 text-sm">{blog.readTime}</span>
                        </div>
                        <h3 className="text-base font-bold text-white mb-3 leading-snug group-hover:text-yellow-400 transition-colors flex-1">
                          {blog.title}
                        </h3>
                        <p className="text-neutral-400 text-sm line-clamp-2 mb-4">{blog.description}</p>
                        <p className="text-neutral-500 text-xs">{blog.date}</p>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Back to Blogs */}
          <div className="mt-16 flex justify-center">
            <Link
              href="/blogs"
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 text-neutral-300 hover:border-yellow-400 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all font-bold uppercase tracking-widest text-sm group"
            >
              <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
