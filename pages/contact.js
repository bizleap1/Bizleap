"use client";
import Head from "next/head";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactPage() {
  return (
    <>
    <Head>
  <title>Contact Bizleap | Let’s Build Your Brand</title>
  <meta
    name="description"
    content="Get in touch with Bizleap to discuss digital marketing, web development, branding, or creative solutions tailored to your business goals."
  />
</Head>

    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4">Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Touch</span></h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            Have a project in mind? Let's discuss how we can help your brand leap forward.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Section: Form */}
          <div className="lg:col-span-7">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 focus:ring-1 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 focus:ring-1 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?" 
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 focus:ring-1 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Message</label>
                <textarea 
                  rows="5" 
                  placeholder="Tell us about your project..." 
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 focus:ring-1 focus:ring-yellow-500 focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full md:w-auto px-12 py-4 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 hover:scale-105 transition-all active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Section: Info & Map */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold">Contact Info</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 group-hover:border-yellow-500/50 transition-colors">
                    <FaPhoneAlt className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Call Us</p>
                    <p className="text-lg">+91 70970 95152 / +91 93071 98119</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 group-hover:border-yellow-500/50 transition-colors">
                    <FaEnvelope className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Email Us</p>
                    <a href="mailto:bizleapinc@gmail.com" className="text-lg hover:text-yellow-500 transition-colors">bizleapinc@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 group-hover:border-yellow-500/50 transition-colors shrink-0">
                    <FaMapMarkerAlt className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Visit Us</p>
                    <p className="text-lg text-gray-300">
                      8, Wardha Rd, Near Sai Mandir, Sawarkar Nagar, Gajanan Nagar, Nagpur, Maharashtra 440015
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[300px] rounded-3xl overflow-hidden border border-gray-800 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
              <iframe
                title="BizLeap Location"
                src="https://www.google.com/maps?q=8,+Wardha+Rd,+Near+Sai+Mandir,+Sawarkar+Nagar,+Gajanan+Nagar,+Nagpur,+Maharashtra+440015&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
  );
}
