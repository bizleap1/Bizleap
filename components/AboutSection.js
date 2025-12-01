'use client';
import * as React from "react";
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import Image from "next/image";
import { Circle } from "lucide-react";

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

// ------------------- About Section Data -------------------
const ourPrinciples = [
  {
    title: "Creativity with Purpose",
    description:
      "Our designs aren’t just pretty; they’re built to solve problems and make an impact.",
  },
  {
    title: "Collaboration is Key",
    description:
      "We work with you, not just for you. Great ideas come from teamwork.",
  },
  {
    title: "Honest & Transparent",
    description:
      "No confusing jargon or hidden fees. Just clear communication and real results.",
  },
  {
    title: "Details Matter",
    description:
      "The little things make a big difference. We sweat the small stuff, so you don’t have to.",
  },
];

// ------------------- About Component -------------------
export default function AboutSection() {
  return (
    <section className="py-16 md:py-32 bg-black text-white" id="about">
<div className="mx-auto max-w-5xl px-6 space-y-12">
<div className="mx-auto max-w-2xl text-center space-y-8">
<ScrollView>
<h2 className="text-4xl lg:text-5xl font-semibold">About Us</h2>
</ScrollView>


<ScrollView delay={0.1}>
<p className="text-white/90 leading-relaxed space-y-4">
<span className="block font-semibold mt-4">Made with hard work. Built with purpose.</span>
<span className="block">BizLeap wasn’t built in a boardroom. It was built from late nights, messy drafts, too many coffees, and a stubborn belief that design should make people feel something.</span>
<span className="block">We don’t create for “clients.” We create for the dreamers, the builders, the ones who wake up wanting to leave a mark.</span>
<span className="block">And if you’re here, you’re probably one of them.</span>


<span className="block font-semibold mt-4">What we stand for:</span>
<span className="block">• Honest Work — no shortcuts, no fake promises.</span>
<span className="block">• Purpose in Every Pixel — everything we make has meaning.</span>
</p>
</ScrollView>
</div>

        <ScrollView delay={0.2}>
          <video
    className="rounded-lg object-cover aspect-[16/9] w-full"
    src="/significareel.mp4"
    autoPlay
    muted
    loop
    playsInline
  />
        </ScrollView>

        <ScrollView delay={0.3}>
          <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
            {ourPrinciples.map((principle, index) => (
              <div className="space-y-3" key={index}>
                <ScrollView delay={0.04 * index}>
                  <div className="flex items-center gap-2">
                    <Circle className="w-4 h-4 text-white" />
                    <h3 className="text-sm font-medium">{principle.title}</h3>
                  </div>
                  <p className="text-white/80 text-sm">{principle.description}</p>
                </ScrollView>
              </div>
            ))}
          </div>
        </ScrollView>
      </div>
    </section>
  );
}
