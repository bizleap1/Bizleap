import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllClients, getClientBySlug } from "../../data/clientsData";

export default function ClientCaseStudy({ client }) {
  if (!client) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">Client Not Found</h1>
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <>
      <Head>
        <title>{client.name} Project | Bizleap</title>
        <meta name="description" content={`Case study and project overview for ${client.name} by Bizleap.`} />
        <link rel="canonical" href={`https://bizleap.in/clients/${client.slug}`} />
      </Head>
      <div className="w-full min-h-screen bg-white text-black">
        {/* Hero Section */}
        <div className="relative w-full h-[40vh] md:h-[55vh] bg-gray-900 flex items-center justify-center overflow-hidden">
          {/* We use a placeholder or specific background as the hero image. */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('${client.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80"}')` }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6 md:px-20 z-20">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}
            >
              {client.name}
            </h1>
            <div className="w-16 h-1 bg-white/90 mb-6"></div>
            
            {/* Breadcrumb */}
            <div
              className="flex items-center gap-3 text-white/90 text-sm md:text-base"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}
            >
              <Link href="/" className="hover:underline transition-all duration-200">
                Home
              </Link>
              <span className="opacity-50">|</span>
              <Link href="/work" className="hover:underline transition-all duration-200">
                Projects
              </Link>
              <span className="opacity-50">|</span>
              <span className="font-semibold text-white">{client.name}</span>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-full px-6 md:px-20 py-16 md:py-24">
          <div className="max-w-4xl mx-auto md:max-w-none md:mx-0">
            <h2
              className="text-3xl md:text-4xl font-bold mb-8 text-gray-900"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}
            >
              Project Overview
            </h2>

            <div
              className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-700"
              style={{ fontFamily: '"Noto Sans", sans-serif' }}
            >
              <p>
                <strong className="text-gray-900">{client.name}</strong> approached us with a clear challenge: {client.problemStatement}
              </p>

              <p>
                To address this, {client.solution} Our strategic implementation helped redefine their digital presence and achieve their goals.
              </p>
              
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Key Results</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {client.results?.map((result, idx) => (
                    <li key={idx} className="text-gray-700">{result}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tags / Technologies */}
            <div className="flex flex-wrap gap-3 mt-12">
              {client.technologies?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2.5 border border-gray-800 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,0.1)] text-sm font-semibold bg-white hover:shadow-[3px_3px_0px_rgba(0,0,0,0.15)] transition-all duration-200"
                  style={{ fontFamily: '"Noto Sans", sans-serif' }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
          </div>
        </div>

      {/* Back to Projects Link */}
      <div className="w-full px-6 md:px-20 py-12">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/work"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all duration-200 font-semibold group"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Back to Projects
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const clients = getAllClients();
  const paths = clients.map((client) => ({
    params: { slug: client.slug },
  }));

  return {
    paths,
    fallback: false, // Return 404 for unknown slugs
  };
}

export async function getStaticProps({ params }) {
  const client = getClientBySlug(params.slug);
  
  return {
    props: {
      client,
    },
  };
}
