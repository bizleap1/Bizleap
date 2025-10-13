'use client';
import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Creators", href: "/creators" },
  { name: "About", href: "/about" },
];

const Footer = () => {
  return (
    <footer className="bg-black text-gray-200 py-16 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

        {/* Left Section */}
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="text-4xl font-bold">
            <span className="text-white">Biz</span>
            <span className="text-yellow-400">Leap</span>
          </div>

          <p className="text-gray-400 text-lg">
            India&apos;s Largest Creator Business
          </p>

          {/* Email */}
          <div className="flex items-center gap-3 text-lg font-semibold text-white">
            <MdEmail size={26} />
            <a href="mailto:bizleapinc@gmail.com" className="hover:text-yellow-400">
              bizleapinc@gmail.com
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-xl mt-2">
            <a href="#" className="hover:text-yellow-400"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400"><FaYoutube /></a>
            <a href="#" className="hover:text-yellow-400"><FaXTwitter /></a>
            <a href="#" className="hover:text-yellow-400"><FaLinkedin /></a>
          </div>

          {/* Privacy Policy */}
          <Link href="/privacy" className="text-sm text-gray-500 hover:text-yellow-400 mt-4">
            Privacy Policy
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:items-end gap-5 text-lg">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:text-yellow-400 transition-all"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" className="hover:text-yellow-400">Contact</Link>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-10"></div>

      {/* Bottom Copyright */}
      <div className="text-center text-sm text-gray-500">
        Copyright © BizLeap 2025. All Rights Reserved —{' '}
        <span className="text-yellow-400">Website by BizLeap</span>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute right-6 bottom-6 bg-gray-900 hover:bg-yellow-400 hover:text-black text-white text-sm px-4 py-2 rounded-full transition-all"
      >
        Page Top ↑
      </button>
    </footer>
  );
};

export default Footer;
