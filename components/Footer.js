'use client';
import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Creators", href: "/creators" },
  { name: "About", href: "/about" },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="sm:container px-4 mx-auto flex flex-col items-center gap-6">
        
       

        {/* Logo */}
        <div className="text-4xl font-bold text-center">
          <span className="text-white">Biz</span>
          <span className="text-yellow-400">Leap</span>
        </div>

        {/* Navigation */}
        <ul className="flex flex-wrap justify-center gap-6 text-base font-medium">
          {navLinks.map((link, index) => (
            <li key={index} className="hover:text-yellow-400">
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-yellow-400"><FaLinkedin /></a>
          <a href="#" className="hover:text-yellow-400"><FaFacebook /></a>
          <a href="#" className="hover:text-yellow-400"><FaInstagram /></a>
        </div>
      </div>
       {/* Top copyright */}
        <div className="text-sm text-center py-5">
          © 2025 BizLeap, All rights reserved
        </div>
    </footer>
  );
};

export default Footer;
