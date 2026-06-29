"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import type { Project } from "@/types";
import InfiniteMenu from "../ui/InfiniteMenu";

// ─── Single project card ────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  const categoryColors: Record<string, string> = {
    "AI Agent": "text-orange-DEFAULT border-orange-DEFAULT/40",
    "Web Development": "text-white/60 border-white/20",
  };

  return (
    <motion.article
      ref={ref}
      className="group relative border-t border-white/10 hover:border-orange-DEFAULT/50 transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="py-10 grid grid-cols-12 gap-6 items-start">
        {/* Index number */}
        <div className="col-span-1 hidden md:block">
          <span className="font-mono text-xs text-white/20">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Main content */}
        <div className="col-span-12 md:col-span-7">
          {/* Category badge */}
          <span
            className={`inline-block font-mono text-[10px] tracking-widest uppercase border px-2 py-1 mb-4 ${
              categoryColors[project.category] ||
              "text-white/40 border-white/10"
            }`}
          >
            {project.category}
          </span>

          {/* Title */}
          <div className="overflow-hidden mb-3">
            <motion.h3
              className="font-display text-4xl md:text-5xl text-white tracking-tight leading-none"
              animate={{ y: hovered ? -4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
          </div>

          {/* Description */}
          <p className="font-body text-sm text-white/40 leading-relaxed max-w-xl">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="col-span-12 md:col-span-3 flex flex-wrap gap-2 md:justify-end content-start">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-widest uppercase text-white/30 bg-white/5 px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Year + links */}
        <div className="col-span-12 md:col-span-1 flex md:flex-col items-center md:items-end gap-3 justify-between">
          <span className="font-mono text-xs text-white/20">
            {project.year}
          </span>
          <div className="flex gap-3">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-widest uppercase text-orange-DEFAULT hover:text-orange-light"
              >
                Live ↗
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-widest uppercase text-white/40 hover:text-white"
              >
                Code ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Hover accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-orange-DEFAULT"
        initial={{ width: "0%" }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.article>
  );
}

// ─── Projects section ────────────────────────────────────────────────────────
interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Web Development", "AI Agent"];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bigTextX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  type InfiniteMenuItem = {
    image: string;
    link: string;
    title: string;
    description: string;
  };

  const items: InfiniteMenuItem[] = [
    {
      image: "https://picsum.photos/300/300?grayscale",
      link: "https://google.com/",
      title: "Project 1",
      description: "Ecommerce website for a local business.",
    },
    {
      image: "https://picsum.photos/400/400?grayscale",
      link: "https://google.com/",
      title: "Project 2",
      description: "Mobile app for a startup.",
    },
    {
      image: "https://picsum.photos/500/500?grayscale",
      link: "https://google.com/",
      title: "Project 3",
      description: "Web application for a fitness tracker.",
    },
    {
      image: "https://picsum.photos/600/600?grayscale",
      link: "https://google.com/",
      title: "Project 4",
      description: "WhatsApp Automation for a local business.",
    },
    {
      image: "https://picsum.photos/500/500?grayscale",
      link: "https://google.com/",
      title: "Project 5",
      description: "Automation for email Marketing campaigns.",
    },
    {
      image: "https://picsum.photos/600/600?grayscale",
      link: "https://google.com/",
      title: "Project 6",
      description: "AI Agent for a local business.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Top divider */}
      <div className="section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-20">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16"
        >
          <div>
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-px bg-orange-DEFAULT" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-orange-DEFAULT">
                Selected Work
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(3rem,8vw,7rem)] text-white leading-none tracking-tight"
                initial={{ y: "100%" }}
                animate={isHeaderInView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                OUR WORK
              </motion.h2>
            </div>
          </div>

          {/* Filter pills */}
          {/* <motion.div
            className="flex gap-2 flex-wrap"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-mono text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                  filter === cat
                    ? "bg-orange-DEFAULT border-orange-DEFAULT text-black"
                    : "border-white/10 text-white/40 hover:border-orange-DEFAULT/40 hover:text-orange-DEFAULT"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div> */}
        </div>

        {/* Project list */}
        {/* <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length === 0 ? (
              <div className="py-20 text-center font-mono text-sm text-white/30 tracking-widest uppercase">
                No projects in this category yet.
              </div>
            ) : (
              filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))
            )}
          </motion.div>
        </AnimatePresence> */}
        <div style={{ height: "600px", position: "relative" }}>
          <InfiniteMenu items={items} scale={1} />
        </div>
        {/* All projects CTA */}
        <motion.div
          className="mt-16 pt-10 border-t border-white/5 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 font-mono text-sm tracking-widest uppercase text-white/50 hover:text-orange-DEFAULT transition-colors duration-300"
          >
            <span>Have a project in mind?</span>
            <motion.span
              className="text-xl"
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>

      {/* Massive bg text */}
      {/* <motion.div
        className="absolute top-20 right-0 overflow-hidden pointer-events-none select-none"
        style={{ x: bigTextX }}
      >
        <span className="font-display text-[20vw] text-white/[0.015] whitespace-nowrap leading-none">
          WORK
        </span>
      </motion.div> */}
    </section>
  );
}
