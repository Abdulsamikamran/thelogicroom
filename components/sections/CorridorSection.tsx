"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { CorridorScene } from "@/components/canvas/CorridorScene";

const CORRIDOR_PROJECTS = [
  {
    id: 1,
    title: [
      { text: "Voice", orange: true },
      { text: "Calling", orange: false },
      { text: "Bot", orange: true },
    ],
    description: "Our very own custom calling bot",
  },
  {
    id: 2,
    title: [
      { text: "WhatsApp", orange: true },
      { text: "Inventory", orange: false },
      { text: "Management", orange: true },
    ],
    description: "Efficiently manage your inventory through WhatsApp",
  },
  {
    id: 3,
    title: [
      { text: "Email", orange: true },
      { text: "Automation", orange: false },
    ],
    description: "Automate your email workflows",
  },
  {
    id: 4,
    title: [
      { text: "LinkedIn", orange: true },
      { text: "Automation", orange: false },
    ],
    description: "Automate your LinkedIn outreach",
  },
];
export function CorridorSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Calculate scroll progress through this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. SMOOTH out the scroll. This prevents the "fast scroll" jumpiness.
  // Increase 'damping' for more "weight", lower 'stiffness' for slower movement.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative z-[100] bg-black"
      /* Height is 800vh - this is your "Scroll Room". 
         If it feels too fast, increase this to 1000vh */
      style={{ height: "800vh" }}
    >
      {/* 
          THIS IS THE STICKY WINDOW 
          If this doesn't stick, check if any parent div 
          has 'overflow: hidden' or 'overflow: clip'
      */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* 3D Scene - Drives Camera Z based on smoothProgress */}
        <div className="absolute inset-0 z-0">
          <CorridorScene scrollProgress={smoothProgress} />
        </div>

        {/* Cinematic darkness around edges */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />

        {/* Project Cards */}
        <div className="relative z-20 w-full h-full">
          {CORRIDOR_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={CORRIDOR_PROJECTS.length}
              progress={smoothProgress}
            />
          ))}
        </div>

        {/* Simple Progress HUD */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
          <div className="text-cyan-500 font-mono text-[10px] tracking-widest uppercase mb-2">
            System Synchronization
          </div>
          <div className="w-64 h-[2px] bg-white/10">
            <motion.div
              className="h-full bg-cyan-500"
              style={{
                width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
                boxShadow: "0 0 10px #06b6d4",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total, progress }: any) {
  // We divide the 0 to 1 scroll progress into segments for each card
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;

  // These timings create a "Fade in, stay, Fade out" effect
  // Adjust these to make cards stay visible longer
  const opacity = useTransform(
    progress,
    [start, start + segment * 0.2, end - segment * 0.2, end],
    [0, 1, 1, 0],
  );

  const scale = useTransform(
    progress,
    [start, start + segment * 0.2, end - segment * 0.2, end],
    [0.8, 1, 1, 1.2], // Cards grow slightly as you pass them
  );

  const y = useTransform(
    progress,
    [start, start + segment * 0.2, end - segment * 0.2, end],
    [100, 0, 0, -100], // Cards slide up from bottom and exit through top
  );

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex items-center justify-center p-6"
    >
      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-10 rounded-2xl max-w-xl text-center">
        <h2 className="text-5xl font-black mb-4 tracking-tight uppercase leading-tight">
          {project.title.map(
            (word: { text: string; orange: boolean }, i: number) => (
              <span
                key={i}
                className={word.orange ? "text-orange-500" : "text-white"}
              >
                {word.text}
                {i !== project.title.length - 1 && " "}
              </span>
            ),
          )}
        </h2>
        <p className="text-cyan-100/60 text-lg font-light leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}
