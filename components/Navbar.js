'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { FiDownload, FiChevronDown } from "react-icons/fi"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Our Work", href: "/work" },
    { name: "Creators", href: "/creators" },
    { name: "Team", href: "/team" },
    { name: "About", href: "/about" },
  ]

  const serviceSubmenu = [
    { name: "UI/UX Web Design", href: "/webdesign" },
    { name: "Brand Identity", href: "/brandidentity" },
    { name: "Social Media Marketing", href: "/socialmedia" },
    { name: "SEO & Website Audits", href: "/seowebsite" },
  ]

  // Handle scroll to toggle background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
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
          <Link href="/" className="cursor-pointer flex items-center gap-2">
            <Image
              src="/2.png"
              alt="Bizleap Logo"
              width={140}
              height={50}
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.name === "Services" ? (
                  <div 
                    className="relative group"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        className="relative font-medium hover:scale-105 transition-transform duration-200 flex items-center gap-1"
                      >
                        {link.name}
                        <FiChevronDown className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                        <motion.span
                          layoutId="underline"
                          className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-500 rounded"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </div>
                    
                    {/* Services Submenu */}
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-sm rounded-lg shadow-lg py-2 z-50"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setServicesOpen(true)}
                          onMouseLeave={() => setServicesOpen(false)}
                        >
                          {serviceSubmenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 hover:bg-gray-800/50 transition-colors duration-200"
                            >
                              <span className="relative">
                                {subItem.name}
                                <motion.span
                                  className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-500 rounded"
                                  initial={{ scaleX: 0 }}
                                  whileHover={{ scaleX: 1 }}
                                  transition={{ duration: 0.3 }}
                                />
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
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
                )}
              </div>
            ))}

            {/* Brochure Button */}
            <a
              href="https://drive.google.com/drive/folders/1xjoTpewKi2WMFEBPEWyVMqco8k_aVIhK?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 bg-yellow-500 text-black rounded flex items-center gap-2 font-medium hover:bg-yellow-400 transition"
            >
              Portfolio <FiDownload />
            </a>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="ml-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-100 font-medium transition-transform duration-200"
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
            className={`md:hidden px-4 pt-2 pb-4 space-y-2 ${
              scrolled ? "bg-black text-white" : "bg-black/90 text-white"
            }`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.name === "Services" ? (
                  <div>
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        className="flex-1 px-4 py-2 font-medium hover:bg-gray-800 rounded"
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                      <button
                        className="px-3 py-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          setServicesOpen(!servicesOpen)
                        }}
                      >
                        <FiChevronDown className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    
                    {/* Mobile Services Submenu */}
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          className="ml-8 mt-1 space-y-1 border-l border-gray-700 pl-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {serviceSubmenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded"
                              onClick={() => {
                                setMenuOpen(false)
                                setServicesOpen(false)
                              }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-4 py-2 font-medium hover:bg-gray-800 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Brochure Mobile */}
            <a
              href="https://drive.google.com/drive/folders/1xjoTpewKi2WMFEBPEWyVMqco8k_aVIhK?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 mt-2 bg-yellow-500 text-black rounded flex items-center gap-2 font-medium hover:bg-yellow-400"
              onClick={() => setMenuOpen(false)}
            >
              Portfolio <FiDownload />
            </a>

            {/* Contact Mobile */}
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