"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Project } from "@/types";
import InfiniteMenu from "../ui/InfiniteMenu";

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
        <div className="col-span-1 hidden md:block">
          <span className="font-mono text-xs text-white/20">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="col-span-12 md:col-span-7">
          <span
            className={`inline-block font-mono text-[10px] tracking-widest uppercase border px-2 py-1 mb-4 ${
              categoryColors[project.category] ||
              "text-white/40 border-white/10"
            }`}
          >
            {project.category}
          </span>

          <div className="overflow-hidden mb-3">
            <motion.h3
              className="font-display text-4xl md:text-5xl text-white tracking-tight leading-none"
              animate={{ y: hovered ? -4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
          </div>

          <p className="font-body text-sm text-white/40 leading-relaxed max-w-xl">
            {project.description}
          </p>
        </div>

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

        <div className="col-span-12 md:col-span-1 flex md:flex-col items-center md:items-end gap-3 justify-between">
          <span className="font-mono text-xs text-white/20">
            {project.year}
          </span>
          <div className="flex gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-widest uppercase text-orange-DEFAULT hover:text-orange-light"
              >
                Live ↗
              </a>
            )}
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-px bg-orange-DEFAULT"
        initial={{ width: "0%" }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.article>
  );
}

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bigTextX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const items = projects.map((project) => ({
    image: project.image,
    link: project.link,
    title: project.title,
    description: project.description,
  }));

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-20">
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
        </div>

        <div style={{ height: "600px", position: "relative" }}>
          <InfiniteMenu items={items} scale={1} />
        </div>

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
