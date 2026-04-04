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
  const [teamOpen, setTeamOpen] = useState(false)
  const [founderOpen, setFounderOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Our Work", href: "/work" },
    { name: "Creators", href: "/creators" },
    { name: "Team", href: "#" },
    { name: "About", href: "/about" },
  ]

  const serviceSubmenu = [
    { name: "UI/UX Web Design", href: "/webdesign" },
    { name: "Brand Identity", href: "/brandidentity" },
    { name: "Social Media Marketing", href: "/socialmedia" },
    { name: "SEO & Website Audits", href: "/seowebsite" },
    { name: "AI Services", href: "/aiservices" },
  ]

  const teamSubmenu = [
    { 
      name: "Founder", 
      href: "#",
      subItems: [
        { name: "Kaushal Banginwar", href: "/kaushal" },
        { name: "Akshat Soni", href: "/akshat" },
      ]
    },
    { name: "Our Team", href: "/team" },
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
            <div className="relative w-[100px] h-[36px] md:w-[140px] md:h-[50px]">
              <Image
                src="/2.png"
                alt="Bizleap Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
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
                        className="relative font-medium flex items-center gap-1"
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
                ) : link.name === "Team" ? (
                  <div 
                    className="relative group"
                    onMouseEnter={() => setTeamOpen(true)}
                    onMouseLeave={() => setTeamOpen(false)}
                  >
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        className="relative font-medium flex items-center gap-1"
                      >
                        {link.name}
                        <FiChevronDown className={`transition-transform duration-200 ${teamOpen ? 'rotate-180' : ''}`} />
                        <motion.span
                          layoutId="underline"
                          className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-500 rounded"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </div>
                    
                    {/* Team Submenu */}
                    <AnimatePresence>
                      {teamOpen && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-sm rounded-lg shadow-lg py-2 z-50"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setTeamOpen(true)}
                          onMouseLeave={() => setTeamOpen(false)}
                        >
                          {teamSubmenu.map((subItem) => (
                            <div key={subItem.name} className="relative group/sub">
                              {subItem.subItems ? (
                                <div 
                                  className="relative"
                                  onMouseEnter={() => setFounderOpen(true)}
                                  onMouseLeave={() => setFounderOpen(false)}
                                >
                                  <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer">
                                    <span className="relative">
                                      {subItem.name}
                                    </span>
                                    <FiChevronDown className="rotate-[-90deg] w-4 h-4" />
                                  </div>
                                  
                                  {/* Founder Sub-submenu (Desktop) */}
                                  <AnimatePresence>
                                    {founderOpen && (
                                      <motion.div
                                        className="absolute top-0 left-full ml-0.5 w-60 bg-black/95 backdrop-blur-sm rounded-lg shadow-lg py-2 z-50"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        {subItem.subItems.map((child) => (
                                          <Link
                                            key={child.name}
                                            href={child.href}
                                            className="block px-4 py-3 hover:bg-gray-800/50 transition-colors duration-200"
                                          >
                                            {child.name}
                                          </Link>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ) : (
                                <Link
                                  href={subItem.href}
                                  className="block px-4 py-3 hover:bg-gray-800/50 transition-colors duration-200"
                                >
                                  {subItem.name}
                                </Link>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="relative font-medium"
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
                      <button
                        className="flex-1 text-left px-4 py-2 font-medium hover:bg-gray-800 rounded"
                        onClick={() => setServicesOpen(!servicesOpen)}
                      >
                        {link.name}
                      </button>
                      <button
                        className="px-3 py-2"
                        onClick={() => setServicesOpen(!servicesOpen)}
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
                ) : link.name === "Team" ? (
                  <div>
                    <div className="flex items-center">
                      <button
                        className="flex-1 text-left px-4 py-2 font-medium hover:bg-gray-800 rounded"
                        onClick={() => setTeamOpen(!teamOpen)}
                      >
                        {link.name}
                      </button>
                      <button
                        className="px-3 py-2"
                        onClick={() => setTeamOpen(!teamOpen)}
                      >
                        <FiChevronDown className={`transition-transform duration-200 ${teamOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    
                    {/* Mobile Team Submenu */}
                    <AnimatePresence>
                      {teamOpen && (
                        <motion.div
                          className="ml-8 mt-1 space-y-1 border-l border-gray-700 pl-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {teamSubmenu.map((subItem) => (
                            <div key={subItem.name}>
                              {subItem.subItems ? (
                                <div>
                                  <div className="flex items-center">
                                    <button
                                      className="flex-1 text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded"
                                      onClick={() => setFounderOpen(!founderOpen)}
                                    >
                                      {subItem.name}
                                    </button>
                                    <button
                                      className="px-3 py-2"
                                      onClick={() => setFounderOpen(!founderOpen)}
                                    >
                                      <FiChevronDown className={`transition-transform duration-200 ${founderOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                  </div>
                                  
                                  <AnimatePresence>
                                    {founderOpen && (
                                      <motion.div
                                        className="ml-8 mt-1 space-y-1 border-l border-gray-600 pl-2"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                      >
                                        {subItem.subItems.map((child) => (
                                          <Link
                                            key={child.name}
                                            href={child.href}
                                            className="block px-4 py-2 text-gray-400 hover:bg-gray-800 rounded"
                                            onClick={() => {
                                              setMenuOpen(false)
                                              setTeamOpen(false)
                                              setFounderOpen(false)
                                            }}
                                          >
                                            {child.name}
                                          </Link>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ) : (
                                <Link
                                  href={subItem.href}
                                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded"
                                  onClick={() => {
                                    setMenuOpen(false)
                                    setTeamOpen(false)
                                  }}
                                >
                                  {subItem.name}
                                </Link>
                              )}
                            </div>
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