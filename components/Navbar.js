"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Creators", href: "/creators" },
  { name: "Team", href: "/team" },
  { name: "About", href: "/about" },
];


  // Handle scroll to toggle background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 shadow-md transition-colors duration-500 ${
        scrolled ? "bg-black text-white" : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          {/* Logo */}
<Link href="/" className="cursor-pointer flex items-center gap-2">
  <Image
    src="/2.png"
    alt="Bizleap Logo"
    width={140}  // adjust width as needed
    height={50}  // adjust height as needed
    priority
  />
</Link>


          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative font-medium hover:scale-105 transition-transform duration-200"
              >
                {link.name}
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-500 rounded"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-100 font-medium transition-transform duration-200"
            >
              Contact Us →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center items-center w-8 h-8 space-y-1"
            >
              <span
                className={`block h-1 w-8 bg-white transition-transform duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-1 w-8 bg-white transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-1 w-8 bg-white transition-transform duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`md:hidden px-2 pt-2 pb-4 space-y-2 ${
              scrolled ? "bg-black text-white" : "bg-black/80 text-white"
            }`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-2 font-medium hover:bg-gray-800 rounded"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block px-4 py-2 mt-2 bg-white text-black rounded font-medium hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
