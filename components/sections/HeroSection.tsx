"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Dynamically import Three.js scene to avoid SSR issues
const Scene = dynamic(
  () => import("@/components/canvas/Scene").then((m) => m.Scene),
  { ssr: false },
);

// ─── Animated text line ──────────────────────────────────────────────────────
function TextReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className={className}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          duration: 1.0,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  });

  // Parallax transforms
  const yText = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const opacityHero = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const scaleCanvas = useTransform(smoothProgress, [0, 1], [1, 0.7]);
  const xCanvas = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grid"
      id="hero"
    >
      {/* Radial orange glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: opacityHero }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-DEFAULT/8 rounded-full blur-[160px]" />
      </motion.div>

      {/* Vertical label left */}
      <motion.div
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-orange-DEFAULT to-transparent" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 rotate-90 whitespace-nowrap">
          Scroll to Explore
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-orange-DEFAULT to-transparent" />
      </motion.div>

      {/* Vertical label right */}
      <motion.div
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 -rotate-90 whitespace-nowrap">
          Est. 2024 — PKK Studio
        </span>
      </motion.div>

      {/* Main text content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-20 w-full"
        style={{ y: yText }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-8 h-px bg-orange-DEFAULT" />
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-orange-DEFAULT">
            Web Dev · AI Agents · Mobile Dev
          </span>
        </motion.div>

        {/* Massive display headline */}
        <h1 className="font-display leading-none mb-8">
          <TextReveal
            text="WE BUILD"
            delay={0.6}
            className="text-[clamp(4rem,12vw,11rem)] text-white tracking-tight leading-none"
          />
          <TextReveal
            text="THINGS THAT"
            delay={0.72}
            className="text-[clamp(4rem,12vw,11rem)] text-white tracking-tight leading-none"
          />
          <div className="overflow-hidden">
            <motion.div
              className="text-[clamp(4rem,12vw,11rem)] text-orange-DEFAULT tracking-tight leading-none glow-text-orange"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 1.0,
                delay: 0.84,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              THINK.
            </motion.div>
          </div>
        </h1>

        {/* Sub copy */}
        <motion.p
          className="font-body text-base md:text-lg text-white/50 max-w-md leading-relaxed mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Precision-engineered frontends, scalable backends, and AI agents that
          automate the complex — so your business moves at the speed of thought.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.8 }}
        >
          <a
            href="#projects"
            className="group relative font-mono text-sm tracking-widest uppercase px-8 py-4 bg-orange-DEFAULT text-black overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          >
            <span className="relative z-10">View Our Work</span>
            <motion.div
              className="absolute inset-0 bg-orange-light"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </a>
          <a
            href="#contact"
            className="font-mono text-sm tracking-widest uppercase px-8 py-4 border border-white/20 text-white/70 hover:border-orange-DEFAULT hover:text-orange-DEFAULT transition-all duration-300"
          >
            Start a Project
          </a>
        </motion.div>

        {/* Stats row */}
        {/* <motion.div
          className="flex flex-wrap gap-12 mt-20 pt-10 border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[
            { value: "40+", label: "Projects Shipped" },
            { value: "99%", label: "Client Satisfaction" },
            { value: "3×", label: "Faster Delivery" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-4xl md:text-5xl text-orange-DEFAULT tracking-tight">
                {stat.value}
              </div>
              <div className="font-mono text-xs tracking-widest uppercase text-white/30 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div> */}
      </motion.div>

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
