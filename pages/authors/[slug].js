import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { AUTHORS_DATA } from "../../data/authorsData";
import { BLOGS_DATA } from "../../data/blogsData";

export async function getStaticPaths() {
  const paths = AUTHORS_DATA.map((author) => ({
    params: { slug: author.id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const author = AUTHORS_DATA.find((a) => a.id === params.slug);
  const authorBlogs = BLOGS_DATA.filter((b) => b.author === author.name);
  
  return { props: { author, authorBlogs } };
}

export default function AuthorProfile({ author, authorBlogs }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": author.name,
      "description": author.bio,
      "image": author.image,
      "jobTitle": author.role,
      "worksFor": {
        "@type": "Organization",
        "name": "Bizleap"
      }
    }
  };

  return (
    <>
      <Head>
        <title key="title">{author.name} | Bizleap Authors</title>
        <meta name="description" key="description" content={`Read articles by ${author.name}, ${author.role} at Bizleap.`} />
        <link rel="canonical" href={`https://bizleap.in/authors/${author.id}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${author.name} | Bizleap Authors`} key="og:title" />
        <meta property="og:description" content={author.bio} key="og:description" />
        <meta property="og:url" content={`https://bizleap.in/authors/${author.id}`} key="og:url" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Back Button */}
          <Link href="/blogs" className="inline-flex items-center gap-2 text-neutral-400 hover:text-yellow-400 mb-12 transition-colors">
            <ChevronLeft className="w-5 h-5" /> Back to Blogs
          </Link>

          {/* Author Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-[#111] p-10 rounded-[2rem] border border-white/10 mb-16"
          >
            <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-yellow-400/20">
              <img src={author.image} alt={author.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black mb-2">{author.name}</h1>
              <p className="text-yellow-400 text-lg font-medium mb-4">{author.role}</p>
              <p className="text-neutral-300 max-w-2xl text-lg leading-relaxed">{author.bio}</p>
            </div>
          </motion.div>

          {/* Articles by Author */}
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Articles by {author.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {authorBlogs.map((blog, idx) => (
              <Link href={`/blogs/${blog.id}`} key={blog.id} passHref>
                <motion.a
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (idx % 3) * 0.15, duration: 0.6 }}
                  className="group cursor-pointer flex flex-col bg-[#111] border border-white/5 rounded-2xl overflow-hidden h-full"
                >
                  {/* Image */}
                  <div className="relative h-56 shrink-0">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">{blog.category}</span>
                      <span className="text-neutral-500 text-sm">{blog.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-yellow-400 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-neutral-400 text-sm line-clamp-3">
                      {blog.description}
                    </p>
                  </div>
                </motion.a>
              </Link>
            ))}
          </div>
          
        </div>
      </main>
    </>
  );
}
