"use client";

import { motion } from "framer-motion";

const items = [
  "Web Development",
  "✦",
  "AI Agents",
  "✦",
  "Frontend Engineering",
  "✦",
  "Backend Architecture",
  "✦",
  "Automation",
  "✦",
  "LLM Integration",
  "✦",
  "Design Systems",
  "✦",
  "API Development",
  "✦",
  "Conversational AI",
  "✦",
  "Next.js",
  "✦",
  "React",
  "✦",
  "Python",
  "✦",
];

export function MarqueeSection() {
  const doubled = [...items, ...items];

  return (
    <div className="relative py-6 bg-orange-600 overflow-hidden">
      {/* Marquee track */}
      <div className="marquee-container">
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="font-mono text-xs tracking-[0.2em] uppercase text-black px-6 shrink-0"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
