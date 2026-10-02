"use client";
import { useState } from "react";
import Head from "next/head";
import { FiMapPin, FiPhone, FiMail, FiArrowRight, FiBriefcase, FiMessageSquare } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default function ContactPage() {
  const [formType, setFormType] = useState("project"); // 'project' or 'career'
  const [status, setStatus] = useState("idle"); // 'idle', 'submitting', 'submitted'

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.target);
    formData.append("_subject", `New ${type === 'project' ? 'Project Inquiry' : 'Career Application'} from BizLeap Website`);
    formData.append("_captcha", "false");

    try {
      await fetch("https://formsubmit.co/ajax/bizleapinc@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      setStatus("submitted");
      setTimeout(() => {
        setStatus("idle");
        e.target.reset();
      }, 5000);
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title key="title">Contact | Bizleap</title>
        <meta name="description" content="Get in touch with Bizleap to discuss digital marketing, web development, branding, or creative solutions tailored to your business goals." key="description" />
        <link rel="canonical" href="https://bizleap.in/contact" />
      </Head>

      <main className={`min-h-screen bg-black text-white pt-32 pb-24 selection:bg-yellow-500/30 selection:text-white ${inter.className}`}>
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-yellow-500/15 blur-[150px] rounded-full pointer-events-none z-0" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className={`text-5xl md:text-7xl tracking-tight mb-6 ${playfair.className}`}>
              Get in <span className="italic text-yellow-500">Touch.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Have a project in mind, or looking to join our team? We'd love to hear from you. Our team is ready to help your brand leap forward.
            </p>
          </motion.div>

          {/* 3 Info Cards Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {/* Email Card */}
            <div className="p-8 rounded-[32px] bg-[#0a0a0a] border border-white/5 hover:border-yellow-500/30 hover:bg-[#0f0f0f] transition-all duration-300 group flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:border-yellow-500 transition-colors shrink-0">
                  <FiMail className="text-xl text-white group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl font-medium">Email Us</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 flex-1 pl-16">Drop us a line and we'll get back to you as soon as possible.</p>
              <div className="pl-16">
                <a href="mailto:bizleapinc@gmail.com" className="text-white hover:text-yellow-500 transition-colors font-medium">bizleapinc@gmail.com</a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-8 rounded-[32px] bg-[#0a0a0a] border border-white/5 hover:border-yellow-500/30 hover:bg-[#0f0f0f] transition-all duration-300 group flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:border-yellow-500 transition-colors shrink-0">
                  <FiPhone className="text-xl text-white group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl font-medium">Call Us</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 flex-1 pl-16">Mon-Sat from 8am to 10pm.</p>
              <div className="flex flex-col gap-1 pl-16">
                <a href="tel:+917097095152" className="text-white font-medium hover:text-yellow-500 transition-colors w-fit">+91 70970 95152</a>
                <a href="tel:+919307198119" className="text-white font-medium hover:text-yellow-500 transition-colors w-fit">+91 93071 98119</a>
              </div>
            </div>

            {/* Visit Card */}
            <div className="p-8 rounded-[32px] bg-[#0a0a0a] border border-white/5 hover:border-yellow-500/30 hover:bg-[#0f0f0f] transition-all duration-300 group flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:border-yellow-500 transition-colors shrink-0">
                  <FiMapPin className="text-xl text-white group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl font-medium">Visit Us</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 flex-1 pl-16">Come say hello at our office HQ.</p>
              <div className="pl-16">
                <p className="text-white text-sm font-medium leading-relaxed">
                  2, Wardha Rd, Near Sai Mandir, Sawarkar Nagar, Gajanan Nagar, Nagpur, Maharashtra 440015
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form and Map Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            
            {/* Form Section */}
            <div className="p-8 md:p-12 rounded-[32px] bg-[#0a0a0a] border border-white/5 relative overflow-hidden flex flex-col">
              
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[60px] pointer-events-none" />

              <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
                <button 
                  onClick={() => setFormType("project")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    formType === "project" ? "bg-yellow-500 text-black" : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FiMessageSquare className="text-sm" /> Project
                </button>
                <button 
                  onClick={() => setFormType("career")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    formType === "career" ? "bg-yellow-500 text-black" : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FiBriefcase className="text-sm" /> Career
                </button>
              </div>

              <div className="relative w-full flex-1">
                <AnimatePresence mode="wait">
                  
                  {/* PROJECT FORM */}
                  {formType === "project" && (
                    <motion.form 
                      key="project-form"
                      onSubmit={(e) => handleSubmit(e, 'project')}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 flex flex-col h-full"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs text-gray-400 font-medium mb-2">First Name</label>
                          <input type="text" name="firstName" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:bg-black transition-colors" placeholder="Your first name" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 font-medium mb-2">Last Name</label>
                          <input type="text" name="lastName" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:bg-black transition-colors" placeholder="Your last name" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs text-gray-400 font-medium mb-2">Email Address</label>
                          <input type="email" name="email" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:bg-black transition-colors" placeholder="Your email address" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 font-medium mb-2">Contact No.</label>
                          <input type="tel" name="phone" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:bg-black transition-colors" placeholder="Your contact number" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 font-medium mb-2">Message</label>
                        <textarea required name="message" rows="4" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:bg-black transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
                      </div>

                      <div className="pt-4 mt-auto">
                        <button type="submit" disabled={status !== 'idle'} className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                          {status === 'idle' && <>Submit Details <FiArrowRight /></>}
                          {status === 'submitting' && 'Sending...'}
                          {status === 'submitted' && 'Submitted Details! ✓'}
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {/* CAREER FORM */}
                  {formType === "career" && (
                    <motion.form 
                      key="career-form"
                      onSubmit={(e) => handleSubmit(e, 'career')}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 flex flex-col h-full"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs text-gray-400 font-medium mb-2">Full Name</label>
                          <input type="text" name="fullName" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:bg-black transition-colors" placeholder="Your full name" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 font-medium mb-2">Email Address</label>
                          <input type="email" name="email" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:bg-black transition-colors" placeholder="Your email address" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs text-gray-400 font-medium mb-2">Contact No.</label>
                          <input type="tel" name="phone" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:bg-black transition-colors" placeholder="Your contact number" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 font-medium mb-2">Applying For</label>
                          <input type="text" name="role" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:bg-black transition-colors" placeholder="e.g. Frontend Developer" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 font-medium mb-2">Portfolio URL</label>
                        <input type="url" name="portfolio" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:bg-black transition-colors" placeholder="https://" />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 font-medium mb-2">Cover Letter</label>
                        <textarea required name="coverLetter" rows="4" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:bg-black transition-colors resize-none" placeholder="Briefly tell us why you're a great fit..."></textarea>
                      </div>

                      <div className="pt-4 mt-auto">
                        <button type="submit" disabled={status !== 'idle'} className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                          {status === 'idle' && <>Submit Application <FiArrowRight /></>}
                          {status === 'submitting' && 'Sending...'}
                          {status === 'submitted' && 'Submitted Application! ✓'}
                        </button>
                      </div>
                    </motion.form>
                  )}

                </AnimatePresence>
              </div>
            </div>

            {/* Map Section */}
            <div className="rounded-[32px] bg-[#0a0a0a] border border-white/5 overflow-hidden min-h-[400px] relative group p-2">
              <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                <iframe
                  title="BizLeap Location"
                  src="https://www.google.com/maps?q=2,+Wardha+Rd,+Near+Sai+Mandir,+Sawarkar+Nagar,+Gajanan+Nagar,+Nagpur,+Maharashtra+440015&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>

          </motion.div>
        </div>
      </main>
    </>
  );
}
