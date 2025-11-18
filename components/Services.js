'use client';
import * as React from "react";
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import Image from "next/image";
import Link from "next/link";

// ------------------- Badge Component -------------------
function Badge({ children, variant = "secondary", className = "" }) {
  const base = "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 mr-2 mb-2";
  const colors = {
    default: "bg-white text-black border-transparent",
    secondary: "bg-gray-700 text-white border-transparent",
    destructive: "bg-red-500 text-white border-transparent",
    outline: "border-gray-400 text-white bg-transparent",
  };
  return <span className={`${base} ${colors[variant]} ${className}`}>{children}</span>;
}

// ------------------- InView Component -------------------
const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function InView({ children, variants = defaultVariants, transition, viewOptions, as = 'div' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
    >
      {children}
    </MotionComponent>
  );
}

// ------------------- ScrollView Components -------------------
function ScrollView({ children, stagger = false, delay = 0, viewMargin = "0px 0px -200px 0px" }) {
  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { delay, staggerChildren: stagger ? 0.09 : 0, duration: 0.5 },
        },
      }}
      viewOptions={{ margin: viewMargin }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </InView>
  );
}

function ScrollViewStaggerWrapper({ children, className }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
        visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ------------------- CustomCursorElement -------------------
function CustomCursorElement({ children }) {
  return <div className="relative cursor-none group">{children}</div>;
}

// ------------------- Services Data -------------------
const SERVICES_LIST = [
  {
    name: "UI/UX & Web Design",
    tags: ["Figma", "Wireframing", "Prototyping", "Responsive Design", "User Testing"],
    img: "/images/abstract-1.webp",
    url: "#",
    description: "End-to-end digital design from wireframes to polished interfaces. We create intuitive, visually appealing experiences for websites and apps, backed by user research and iterative testing.",
  },
  {
    name: "Brand Identity Design",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity", "Typography", "Color Theory"],
    img: "/images/abstract-2.webp",
    url: "#",
    description: "Comprehensive branding packages including logos, style guides, and asset kits. We craft cohesive visual identities that communicate your brand's essence across all touchpoints.",
  },
  {
    name: "SEO & Website Audits",
    tags: ["Technical SEO", "Keyword Strategy", "On-Page Optimization", "Analytics", "Performance Tuning"],
    img: "/images/abstract-3.webp",
    url: "#",
    description: "Data-driven SEO audits and optimizations to improve rankings. We analyze technical health, content gaps, and backlink profiles to drive organic growth.",
  },
  {
    name: "Social Media Marketing",
    tags: ["Meta Ads", "Instagram Reels", "Content Strategy", "Community Management", "Performance Tracking"],
    img: "/images/abstract-5.webp",
    url: "#",
    description: "Full-service social media management—from organic content creation to paid campaigns. We build engaging narratives and measurable strategies tailored to each platform.",
  },
];

// ------------------- Responsive Hook -------------------
function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

// ------------------- Navigation Buttons -------------------
function NavigationButtons({ currentIndex, totalItems, onPrevious, onNext }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
          currentIndex === 0 
            ? 'border-gray-600 text-gray-600 cursor-not-allowed' 
            : 'border-white text-white hover:bg-white hover:text-black'
        }`}
        aria-label="Previous service"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div className="flex items-center gap-2">
        <span className="text-white text-sm font-medium">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-gray-400 text-sm">/</span>
        <span className="text-gray-400 text-sm">
          {String(totalItems).padStart(2, '0')}
        </span>
      </div>

      <button
        onClick={onNext}
        disabled={currentIndex === totalItems - 1}
        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
          currentIndex === totalItems - 1
            ? 'border-gray-600 text-gray-600 cursor-not-allowed'
            : 'border-white text-white hover:bg-white hover:text-black'
        }`}
        aria-label="Next service"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// ------------------- Mobile Services Section -------------------
function MobileServices() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const nextService = () => {
    const newIndex = Math.min(currentIndex + 1, SERVICES_LIST.length - 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const previousService = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const serviceElement = scrollContainer.children[index];
      if (serviceElement) {
        serviceElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  // Handle scroll events to update current index
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.clientWidth;
      const newIndex = Math.round(scrollLeft / containerWidth);
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < SERVICES_LIST.length) {
        setCurrentIndex(newIndex);
      }
    };

    // Add scroll event listener
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [currentIndex]);

  return (
    <section className="py-16 bg-black text-white" id="services">
      <div className="mx-auto max-w-5xl space-y-8 px-6">
        {/* Header Section */}
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <ScrollView>
            <h2 className="text-4xl font-medium lg:text-5xl">Design That Works for You</h2>
          </ScrollView>
          <ScrollView delay={0.2}>
            <p className="text-gray-300">
              At Lume Studio, we create designs that are more than just visually appealing.
              They're built to solve problems, connect with audience, and drive results.
            </p>
          </ScrollView>
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons
          currentIndex={currentIndex}
          totalItems={SERVICES_LIST.length}
          onPrevious={previousService}
          onNext={nextService}
        />

        {/* Horizontal Scroll Services */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 scrollbar-hide"
            style={{ 
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {SERVICES_LIST.map((service, index) => (
              <div
                key={service.name}
                className="flex-shrink-0 w-[85vw] snap-center px-3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    filter: "blur(0px)",
                    transition: { duration: 0.5, ease: "easeOut" }
                  }}
                  className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300"
                >
                  {/* Image Section - FIXED */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <CustomCursorElement>
                      <InView
                        variants={{
                          hidden: { opacity: 0, scale: 0.8, filter: "blur(14px)" },
                          visible: { 
                            opacity: 1, 
                            scale: 1, 
                            filter: "blur(0px)", 
                            transition: { duration: 0.6, ease: "easeOut" } 
                          },
                        }}
                        viewOptions={{ margin: "0px 0px -100px 0px", once: true }}
                      >
                        <Link href={service.url} className="block relative w-full h-48">
                          <Image
                            src={service.img}
                            alt={service.name}
                            fill
                            sizes="(max-width: 768px) 85vw, 400px"
                            loading="lazy"
                            className="object-cover object-top transition-all duration-500 hover:scale-105"
                          />
                        </Link>
                      </InView>
                    </CustomCursorElement>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      <ScrollView>
                        <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                      </ScrollView>
                      <ScrollView stagger delay={0.04}>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </ScrollView>
                    </div>
                    
                    <ScrollView delay={0.08}>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </ScrollView>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {SERVICES_LIST.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  scrollToIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-gray-600'
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar globally for this section */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// ------------------- Desktop Version -------------------
function DesktopServices() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <main className="bg-black" ref={containerRef}>
        <section className="w-full h-[10vh] flex items-center justify-center bg-black">
          <h1 className="text-4xl md:text-5xl font-bold text-white m-0">Services</h1>
        </section>

        <section className="w-full bg-black">
          {SERVICES_LIST.map((service, i) => {
            const targetScale = 1 - (SERVICES_LIST.length - i) * 0.05;
            const bgColor = i % 2 === 0 ? "white" : "yellow";
            return (
              <ServiceCard
                key={i}
                i={i}
                service={service}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                bgColor={bgColor}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

// Service Card Component for Desktop
const ServiceCard = ({ i, service, progress, range, targetScale, bgColor }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(progress, range, [1, targetScale]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.8, 1]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
        className={`flex flex-col lg:flex-row relative -top-[25%] 
          w-full h-[450px] overflow-hidden rounded-none lg:rounded-none`}
      >
        {/* Left Image Section */}
        <div className="lg:w-1/2 w-full h-64 lg:h-auto relative">
          <motion.div style={{ scale: imageScale }} className="w-full h-full relative">
            <Image
              fill
              src={service.img}
              alt={service.name}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Right Content Section */}
        <div
          className={`lg:w-1/2 w-full p-6 lg:p-16 flex flex-col justify-center gap-4 
          ${bgColor === 'white' ? 'bg-white text-black' : 'bg-yellow-400 text-black'}`}
        >
          <h2 className="text-3xl font-semibold">{service.name}</h2>
          <p className="text-base leading-relaxed">{service.description}</p>

          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-black/10 text-black px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ------------------- Main Services Section -------------------
export default function ServicesSection() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileServices />;
  }

  return <DesktopServices />;
}