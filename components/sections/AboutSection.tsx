"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const values = [
  {
    title: "Precision",
    body: "Every pixel, every line of code, every API contract — held to the highest standard. We don't ship good enough. We ship exceptional.",
  },
  {
    title: "Velocity",
    body: "Speed without compromise. Our opinionated stack and battle-tested patterns mean your product moves fast and breaks nothing.",
  },
  {
    title: "Intelligence",
    body: "We don't just build software — we embed intelligence. AI isn't a feature we add. It's a lens through which we architect everything.",
  },
];

const words =
  "We are a boutique digital studio obsessed with the intersection of elegant engineering and intelligent automation.".split(
    " ",
  );

function AnimatedStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.3"],
  });

  return (
    <div ref={ref} className="flex flex-wrap gap-x-3 gap-y-1">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
        const y = useTransform(scrollYProgress, [start, end], [8, 0]);
        return (
          <motion.span
            key={i}
            style={{ opacity, y }}
            className="font-display text-3xl md:text-5xl text-white leading-tight tracking-tight inline-block"
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="section-divider mb-20" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Top header row */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row gap-16 mb-24 items-start"
        >
          <div className="md:w-1/2">
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            >
              <div className="w-8 h-px bg-orange-DEFAULT" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-orange-DEFAULT">
                The Studio
              </span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(3rem,8vw,7rem)] text-white leading-none tracking-tight"
                initial={{ y: "100%" }}
                animate={isHeaderInView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                ABOUT US
              </motion.h2>
            </div>
          </div>

          {/* Right column intro text */}
          <motion.div
            className="md:w-1/2 mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="font-body text-lg text-white/50 leading-relaxed">
              The Logic Room is an elite boutique studio. We don't chase volume
              — we pursue excellence. Every engagement is a long-term
              partnership built on deep technical knowledge, creative ambition,
              and ruthless attention to detail.
            </p>
          </motion.div>
        </div>

        {/* Animated word-by-word statement */}
        <div className="py-10 md:py-16 mb-24">
          <AnimatedStatement />
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="bg-black p-10 relative group hover:bg-black-100 transition-colors"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
            >
              <div className="mb-6">
                <span className="font-mono text-xs tracking-widest uppercase text-white/20">
                  0{i + 1}
                </span>
                <h3 className="font-display text-4xl text-orange-DEFAULT mt-2 leading-none tracking-tight">
                  {v.title}
                </h3>
              </div>
              <p className="font-body text-sm text-white/40 leading-relaxed">
                {v.body}
              </p>
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-orange-DEFAULT"
                initial={{ width: 0 }}
                whileInView={{ width: "40%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Process timeline */}
        <div className="mt-32">
          <motion.h3
            className="font-display text-5xl md:text-6xl text-white mb-16 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            HOW WE WORK
          </motion.h3>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-px bg-white/5" />

            {[
              {
                step: "01",
                title: "Discovery",
                desc: "Deep dive into your goals, constraints, and users. We map every edge case before writing line one.",
              },
              {
                step: "02",
                title: "Architecture",
                desc: "We design the technical foundation with scalability, maintainability, and performance at its core.",
              },
              {
                step: "03",
                title: "Build",
                desc: "Iterative sprints with weekly demos. You see real, working software — never just mockups.",
              },
              {
                step: "04",
                title: "Deploy & Grow",
                desc: "Ship to production with full observability. Then we keep optimising, because launch is just the beginning.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className={`relative flex gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse md:text-right"}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
              >
                {/* Step indicator */}
                <div
                  className={`relative shrink-0 flex items-start ${i % 2 === 0 ? "" : "md:justify-end"} md:w-1/2`}
                >
                  <div className="relative">
                    <div className="w-6 h-6 border-2 border-orange-DEFAULT bg-black flex items-center justify-center">
                      <div className="w-2 h-2 bg-orange-DEFAULT" />
                    </div>
                  </div>
                  <div
                    className={`ml-6 md:ml-0 ${i % 2 === 0 ? "md:ml-8" : "md:mr-8"}`}
                  >
                    <span className="font-mono text-xs text-orange-DEFAULT tracking-widest">
                      {item.step}
                    </span>
                    <h4 className="font-display text-3xl text-white mt-1 mb-2">
                      {item.title}
                    </h4>
                    <p className="font-body text-sm text-white/40 leading-relaxed max-w-xs">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
