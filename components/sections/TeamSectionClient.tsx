"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TeamCarousel from "../ui/TeamCarousel";
import type { TeamMember } from "@/types";

interface TeamSectionClientProps {
  members: TeamMember[];
}

export function TeamSectionClient({ members }: TeamSectionClientProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <div>
      <div ref={headerRef} className="text-center mb-16 px-6">
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-orange-DEFAULT" />
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-orange-DEFAULT">
            The People
          </span>
          <div className="w-8 h-px bg-orange-DEFAULT" />
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            className="font-display text-[clamp(3rem,8vw,7rem)] text-white leading-none tracking-tight"
            initial={{ y: "100%" }}
            animate={isHeaderInView ? { y: "0%" } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            OUR TEAM
          </motion.h2>
        </div>

        <motion.p
          className="font-body text-sm text-white/40 mt-6 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          A small, elite crew. No filler, no bureaucracy — just craft.
        </motion.p>
      </div>

      <TeamCarousel members={members} />
    </div>
  );
}
