'use client';
import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6';

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Our Work", href: "/work" },
  { name: "Creators", href: "/creators" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "UI/UX & Web Design", href: "/webdesign" },
  { name: "Brand Identity", href: "/brandidentity" },
  { name: "Social Media Marketing", href: "/socialmedia" },
  { name: "SEO & Website Audits", href: "/seowebsite" },
  { name: "AI Services", href: "/aiservices" },
];

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] text-gray-400 overflow-hidden">
      {/* Top yellow glow accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Big CTA band */}
      <div className="border-b border-white/5 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-500 font-semibold">Ready to leap?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Let's build something<br />
              <span className="text-yellow-400">remarkable together.</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              From brand identity to AI-powered workflows — we've got everything your brand needs to make a mark.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full text-sm tracking-wide transition-all duration-300 text-center">
              Start a Project →
            </Link>
            <a
              href="https://drive.google.com/drive/folders/1xjoTpewKi2WMFEBPEWyVMqco8k_aVIhK?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/20 hover:border-yellow-500 text-white font-semibold rounded-full text-sm tracking-wide transition-all duration-300 text-center"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="text-4xl font-extrabold tracking-tight block">
              <span className="text-white">Biz</span>
              <span className="text-yellow-500">leap</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Where brands leap forward. Driven by design. Backed by results.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { icon: <FaInstagram size={16} />, href: "https://www.instagram.com/bizleap.in/reels/" },
                { icon: <FaLinkedin size={16} />, href: "https://www.linkedin.com/company/bizleapinc" },
                { icon: <FaXTwitter size={16} />, href: "#" },
                { icon: <FaYoutube size={16} />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:border-yellow-500 hover:text-yellow-500 hover:bg-yellow-500/10 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-white font-semibold text-[11px] uppercase tracking-[0.2em]">Company</h4>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-white font-semibold text-[11px] uppercase tracking-[0.2em]">Services</h4>
            <ul className="space-y-3">
              {services.map((s, i) => (
                <li key={i}>
                  <Link href={s.href} className="text-gray-400 text-sm hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-white font-semibold text-[11px] uppercase tracking-[0.2em]">Stay in the loop</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Get insights on brand building, design trends, and growth strategies. No spam.
            </p>
            <form className="space-y-3" onSubmit={e => e.preventDefault()}>
              <div className="flex border border-gray-800 rounded-xl overflow-hidden focus-within:border-yellow-500 transition-all duration-300 bg-white/[0.02]">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-transparent px-4 py-3 text-sm text-white placeholder-gray-600 flex-1 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold tracking-wider transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="flex items-center gap-2 pt-1">
              <a href="mailto:bizleapinc@gmail.com" className="text-xs text-gray-500 hover:text-yellow-400 transition-colors">
                bizleapinc@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600 tracking-wide">
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
