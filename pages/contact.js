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

    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 md:px-20 pt-32 pb-24">
      {/* Heading */}
      <h1 className="text-center text-[4rem] md:text-[6rem] font-extrabold leading-tight mb-16">
        Contact
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-6xl gap-16">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-[2.5rem] md:text-[3rem] font-bold leading-snug">
            Tell Us What You’re Dreaming Of. We’ll Build It. <br />
          </h2>

          <div className="space-y-4 text-gray-300 text-lg">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-yellow-400 text-xl" />
              <span className="text-white font-medium">+91 70970 95152</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-yellow-400 text-xl" />
              <span className="text-white font-medium">+91 93071 98119</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-yellow-400 text-xl" />
              <a
                href=""
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                bizleapinc@gmail.com
              </a>
            </div>
          </div>

          <div className="border-b border-gray-700 w-2/3 mt-6"></div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex flex-col items-start md:items-end space-y-6">
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-yellow-400 text-2xl mt-1" />
            <p className="text-gray-300 leading-relaxed max-w-sm">
              8, Wardha Rd, Near Sai Mandir, <br />
              Sawarkar Nagar, Gajanan Nagar, <br />
              Nagpur, Maharashtra 440015
            </p>
          </div>

          <div className="w-full md:w-[450px] h-[300px] rounded-2xl overflow-hidden border border-gray-800 shadow-lg hover:shadow-yellow-500/20 transition-shadow duration-300">
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
    </main>
  </>
  );
}
