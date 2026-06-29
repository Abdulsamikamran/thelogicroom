"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Web Development",
    subtitle: "Frontend & Backend",
    description:
      "We craft bleeding-edge web applications with Next.js, React, and Node.js. Pixel-perfect UIs, performant APIs, and robust architectures that scale from launch to millions of users.",
    features: [
      "Next.js App Router & Server Components",
      "RESTful & GraphQL API Design",
      "Supabase / PostgreSQL / Redis",
      "Performance budgets & Core Web Vitals",
      "CI/CD pipelines & DevOps",
      "Design systems & component libraries",
    ],
    accent: "#FF6B00",
  },
  {
    number: "02",
    title: "AI Agents & Bots",
    subtitle: "Intelligent Automation",
    description:
      "We design and deploy AI systems that work for you around the clock. From customer support bots to fully autonomous agents that orchestrate complex multi-step workflows.",
    features: [
      "LLM-powered conversational agents",
      "LangChain / LangGraph orchestration",
      "RAG pipelines & vector databases",
      "Multi-agent collaboration systems",
      "Tool use & function calling",
      "Fine-tuning & model evaluation",
    ],
    accent: "#FF6B00",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="group relative border border-white/5 hover:border-orange-DEFAULT/40 transition-colors duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Orange glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-DEFAULT/5 to-transparent" />
      </div>

      <div className="p-10 md:p-14">
        {/* Number */}
        <div className="flex items-start justify-between mb-10">
          <span className="font-display text-7xl text-white/5 group-hover:text-orange-DEFAULT/20 transition-colors duration-500 leading-none">
            {service.number}
          </span>
          <div className="w-10 h-10 border border-orange-DEFAULT/30 flex items-center justify-center group-hover:bg-orange-DEFAULT/10 transition-colors duration-300">
            <motion.div
              className="w-2 h-2 bg-orange-DEFAULT rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
            />
          </div>
        </div>

        {/* Title block */}
        <div className="mb-8">
          <span className="font-mono text-xs tracking-widest uppercase text-orange-DEFAULT">
            {service.subtitle}
          </span>
          <h3 className="font-display text-5xl md:text-6xl text-white mt-2 leading-none tracking-tight">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="font-body text-white/50 text-base leading-relaxed mb-10 max-w-lg">
          {service.description}
        </p>

        {/* Features list */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {service.features.map((feature, i) => (
            <motion.li
              key={feature}
              className="flex items-center gap-3 font-mono text-xs tracking-wide text-white/40 group-hover:text-white/60 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.06 + index * 0.1 }}
            >
              <span className="w-3 h-px bg-orange-DEFAULT shrink-0" />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* CTA link */}
        <motion.a
          href="#contact"
          className="inline-flex items-center gap-3 mt-12 font-mono text-xs tracking-widest uppercase text-orange-DEFAULT hover:gap-5 transition-all duration-300"
          whileHover={{ x: 4 }}
        >
          <span>Start This Project</span>
          <span className="text-lg leading-none">→</span>
        </motion.a>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bigTextX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div ref={headerRef} className="mb-20">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px bg-orange-DEFAULT" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-orange-DEFAULT">
              What We Do
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(3rem,8vw,7rem)] text-white leading-none tracking-tight"
              initial={{ y: "100%" }}
              animate={isHeaderInView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              OUR CRAFT
            </motion.h2>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>

      {/* Massive background text */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
        style={{ x: bigTextX }}
      >
        <span className="font-display text-[20vw] text-white/[0.015] whitespace-nowrap leading-none">
          SERVICES
        </span>
      </motion.div>
    </section>
  );
}
