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
    description: "Comprehensive branding packages including logos, style guides, and asset kits. We craft cohesive visual identities that communicate your brand’s essence across all touchpoints.",
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

// ------------------- Services Section -------------------
export default function ServicesSection() {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile Version (Scroll Reveal)
    return (
      <section className="py-16 md:py-32 bg-black text-white" id="services">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
            <ScrollView>
              <h2 className="text-4xl font-medium lg:text-5xl">Design That Works for You</h2>
            </ScrollView>
            <ScrollView delay={0.2}>
              <p>
                At Lume Studio, we create designs that are more than just visually appealing.
                They&apos;re built to solve problems, connect with audience, and drive results. <br /> 
                Whether you’re starting fresh or refining your existing identity, <br /> we’ve got you covered.
              </p>
            </ScrollView>
          </div>

          <div className="mt-12 md:mt-24 space-y-10">
            {SERVICES_LIST.map((service, index) => (
              <div key={service.name} className="group overflow-hidden border-b border-gray-700 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                  <div className="self-end lg:col-span-2 flex flex-col gap-8">
                    <div className="space-y-4">
                      <ScrollView>
                        <h3 className="text-2xl font-medium">{service.name}</h3>
                      </ScrollView>
                      <ScrollView stagger delay={0.04}>
                        <div>
                          {service.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </ScrollView>
                    </div>
                    <ScrollView delay={0.04}>
                      <p className="text-gray-300">{service.description}</p>
                    </ScrollView>
                  </div>

                  <div className="lg:col-span-3">
                    <CustomCursorElement>
                      <InView
                        variants={{
                          hidden: { opacity: 0, y: 20, filter: "blur(14px)", scale: 0.5, originX: 0, originY: 0 },
                          visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.01, duration: 0.5 } },
                        }}
                        viewOptions={{ margin: "0px 0px -250px 0px", once: true }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <Link href={service.url}>
                          <Image
                            src={service.img}
                            alt={service.name}
                            height={480}
                            width={720}
                            loading="lazy"
                            className="object-cover object-top transition-all duration-500 w-full aspect-[16/9]"
                          />
                        </Link>
                      </InView>
                    </CustomCursorElement>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop Version (Lenis + Stacking Cards)
  return <DesktopServices />;
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
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
        className={`flex flex-col lg:flex-row relative -top-[25%] w-full lg:w-[90%] h-[450px] rounded-xl overflow-hidden`}
      >
        <div className="lg:w-1/2 w-full h-64 lg:h-auto relative">
          <motion.div style={{ scale: imageScale }} className="w-full h-full">
            <Image fill src={service.img} alt={service.name} className="object-cover" />
          </motion.div>
        </div>

        <div className={`lg:w-1/2 w-full p-6 lg:p-10 flex flex-col justify-center gap-4 ${bgColor === 'white' ? 'bg-white text-black' : 'bg-yellow-400 text-black'}`}>
          <h2 className="text-2xl sm:text-3xl font-semibold">{service.name}</h2>
          <p className="text-sm sm:text-base leading-relaxed">{service.description}</p>
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, idx) => (
              <span key={idx} className="bg-black/10 text-black px-2 py-1 rounded text-xs">{tag}</span>
            ))}
          </div>
          <a href={service.url} target="_blank" className="mt-2 inline-block underline text-sm">
            See more
          </a>
        </div>
      </motion.div>
    </div>
  );
};
