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
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <ScrollView>
            <h2 className="text-4xl font-medium lg:text-5xl">About Us</h2>
          </ScrollView>
          <ScrollView delay={0.1}>
            <p className="text-white/90">
              Lume Studio was born from a simple idea—great design should do
              more than just look good; it should make an impact. What started
              as a passion for creativity turned into a full-fledged design
              agency dedicated to helping brands tell their stories, connect
              with audiences, and stand out in a crowded world.
            </p>
          </ScrollView>
        </div>

        <ScrollView delay={0.2}>
          <Image
            className="rounded-lg object-cover aspect-[16/9] w-full"
            src="/images/office.webp"
            alt="team image"
            height={480}
            width={720}
            loading="lazy"
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
