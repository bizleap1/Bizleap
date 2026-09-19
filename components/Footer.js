'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6';

const companyLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Work", href: "/work" },
  { name: "Contact", href: "/contact" },
];

const resourceLinks = [
  { name: "Services", href: "/services" },
  { name: "Blogs", href: "/blogs" },
  { name: "Creators", href: "/creators" },
];

const services = [
  { name: "UI/UX & Web Design", href: "/webdesign" },
  { name: "Brand Identity", href: "/brandidentity" },
  { name: "Social Media Marketing", href: "/socialmedia" },
  { name: "SEO & Website Audits", href: "/seowebsite" },
  { name: "AI Services", href: "/aiservices" },
];

const Footer = () => {
  const router = useRouter();
  const isContactPage = router.pathname === '/contact';

  return (
    <footer className="relative bg-[#050505] text-gray-400 overflow-hidden">
      {/* Top yellow glow accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Big CTA band (Hidden on Contact Page) */}
      {!isContactPage && (
      <div className="border-b border-white/5 py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
          <div className="space-y-4 max-w-xl">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-yellow-500 font-semibold">Ready to leap?</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Let's build something<br />
              <span className="text-yellow-400">remarkable together.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              From brand identity to AI-powered workflows — we've got everything your brand needs to make a mark.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
            <Link href="/contact" className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full text-sm tracking-wide transition-all duration-300 text-center w-full sm:w-auto">
              Start a Project →
            </Link>
          </div>
        </div>
      </div>
      )}

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16">

          {/* Brand column */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="block relative w-48 h-12">
              <Image
                src="/logo.png"
                alt="Bizleap"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Where brands leap forward. Driven by design. Backed by results.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { icon: <FaInstagram size={18} />, href: "https://www.instagram.com/bizleap.in/reels/" },
                { icon: <FaLinkedin size={18} />, href: "https://www.linkedin.com/company/bizleapinc" },
                { icon: <FaXTwitter size={18} />, href: "#" },
                { icon: <FaYoutube size={18} />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:border-[#E5A900] hover:text-[#E5A900] hover:bg-[#E5A900]/10 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="pt-2">
               <a href="mailto:bizleapinc@gmail.com" className="text-sm font-medium text-gray-400 hover:text-[#E5A900] transition-colors">
                  bizleapinc@gmail.com
               </a>
            </div>
          </div>

          {/* Company links */}
          <div className="md:col-span-1 space-y-6">
            <h4 className="text-white font-semibold text-[11px] uppercase tracking-[0.2em]">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-[#E5A900] transition-colors duration-200 hover:translate-x-1 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div className="md:col-span-1 space-y-6">
            <h4 className="text-white font-semibold text-[11px] uppercase tracking-[0.2em]">Resources</h4>
            <ul className="space-y-4">
              {resourceLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-[#E5A900] transition-colors duration-200 hover:translate-x-1 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="md:col-span-1 space-y-6">
            <h4 className="text-white font-semibold text-[11px] uppercase tracking-[0.2em]">Services</h4>
            <ul className="space-y-4">
              {services.map((s, i) => (
                <li key={i}>
                  <Link href={s.href} className="text-gray-400 text-sm hover:text-[#E5A900] transition-colors duration-200 hover:translate-x-1 inline-block">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-gray-600 tracking-wide text-center md:text-left">
            © {new Date().getFullYear()} BizLeap India Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-600 uppercase tracking-widest">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
          <p className="text-xs text-gray-600">
            Crafted with ♥ by <span className="text-yellow-500 font-semibold">BizLeap</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
