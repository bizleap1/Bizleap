'use client';
import * as React from "react";
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import Image from "next/image";
import Link from "next/link";

// ------------------- Badge Component -------------------
function Badge({ children, variant = "secondary", className = "" }) {
  const base = "inline-flex items-center justify-center rounded-full border px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap shrink-0 mr-2 mb-2 transition-colors";
  const colors = {
    default: "bg-white text-black border-transparent",
    secondary: "bg-zinc-800 text-white border-transparent",
    destructive: "bg-red-500 text-white border-transparent",
    outline: "border-zinc-500 text-gray-300 bg-black/40 hover:bg-white hover:text-black",
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
        hidden: { opacity: 0, filter: "blur(10px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
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
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1400",
    url: "#",
    description: "We don't just design screens—we design moments. The kind your audience remembers without knowing why."
  },
  {
    name: "Brand Identity",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity", "Typography", "Color Theory"],
    img: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&q=80&w=1400",
    url: "#",
    description: "Your brand is a story waiting to be heard. We shape the colors, words, and visuals that make people feel like… 'Yeah, this brand gets me.'"
  },
  {
    name: "Social Media Marketing",
    tags: ["Meta Ads", "Instagram Reels", "Content Strategy", "Community Management", "Performance Tracking"],
    img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1400",
    url: "#",
    description: "Not content for the sake of posting. We create content that hits reach and engagement. The kind that builds communities, not just followers."
  },
  {
    name: "SEO & Website Audits",
    tags: ["Technical SEO", "Keyword Strategy", "On-Page Optimization", "Analytics", "Performance Tuning"],
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1400",
    url: "#",
    description: "We fix what's broken, polish what's dull, and bring your brand to the front where it deserves to be seen, chosen, and remembered."
  },
  {
    name: "AI Services",
    tags: ["AI Automation", "ChatBot Integration", "Generative Content", "AI Strategy", "Workflow AI"],
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1400",
    url: "#",
    description: "We integrate cutting-edge AI into your business workflows — from intelligent chatbots to generative content engines that work while you sleep."
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
        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${currentIndex === 0
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
        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${currentIndex === totalItems - 1
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
            <h2 className="text-4xl font-medium lg:text-5xl">Services</h2>
          </ScrollView>
          <ScrollView delay={0.2}>
            <p className="text-gray-300">
              Experience Our Digital Solutions
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
                  className="bg-black rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300"
                >
                  {/* Card Section with Full Background - MOBILE */}
                  <Link href={service.url} className="block relative h-[480px] md:h-96 w-full overflow-hidden group">
                    <motion.div
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 z-0"
                    >
                      <Image
                        src={service.img}
                        alt={service.name}
                        fill
                        sizes="(max-width: 768px) 85vw, 400px"
                        loading="lazy"
                        className="object-cover"
                      />
                    </motion.div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

                    {/* Content Section Overlay */}
                    <div className="absolute inset-0 z-20 p-6 sm:p-8 flex flex-col justify-end space-y-5">
                      <div className="space-y-4">
                        <ScrollView>
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-white mb-2 leading-tight">
                            {service.name}
                          </h3>
                        </ScrollView>
                        <ScrollView stagger delay={0.04}>
                          <div className="flex flex-wrap gap-2">
                            {service.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="backdrop-blur-md">{tag}</Badge>
                            ))}
                          </div>
                        </ScrollView>
                      </div>

                      <ScrollView delay={0.08}>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                          {service.description}
                        </p>
                      </ScrollView>
                    </div>
                  </Link>
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
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-6' : 'bg-gray-600'
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
          <h2 className="text-4xl md:text-5xl font-bold text-white m-0">Services</h2>
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
  const imageScale = 1; // Removed scroll-based scaling

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0"
    >
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
        className="flex flex-col relative -top-[25%] w-full max-w-6xl h-[600px] overflow-hidden rounded-[2.5rem] group cursor-pointer shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-800"
      >
        <Link href={service.url} className="w-full h-full block relative">
          {/* Full Background Image - DESKTOP */}
          <motion.div style={{ scale: imageScale }} className="w-full h-full relative z-0">
            <Image
              fill
              src={service.img}
              alt={service.name}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
              priority={i === 0}
            />
          </motion.div>

          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 p-12 lg:p-16 flex flex-col justify-end gap-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-3xl space-y-6"
            >
              <h2 className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
                {service.name}
              </h2>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                {service.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="backdrop-blur-md">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </Link>
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