"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltedCard from "../ui/TiltedCard";
import TeamCarousel from "../ui/TeamCarousel";

const team = [
  {
    name: "Alex Carter",
    role: "Founder & CEO",
    image: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
  },
  {
    name: "Sara Malik",
    role: "Lead Engineer",
    image: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
  },
  {
    name: "James Wu",
    role: "AI & Systems",
    image: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
  },
  {
    name: "Nour Hassan",
    role: "Design Lead",
    image: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
  },
  {
    name: "Riya Patel",
    role: "Product Strategy",
    image: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
  },
];

// Tilt angles: left cards lean left, right cards lean right, center is straight
const TILTS = [-8, -4, 0, 4, 8];

export default function TeamSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const stripRef = useRef<HTMLDivElement>(null);

  // Smooth wheel → horizontal scroll (passive:false so preventDefault works)
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    let target = 0;
    let current = 0;
    let raf: number | null = null;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      target = Math.max(
        0,
        Math.min(el.scrollWidth - el.clientWidth, target + e.deltaY * 2.5),
      );
      if (!raf) {
        const tick = () => {
          current += (target - current) * 0.12;
          el.scrollLeft = current;
          raf =
            Math.abs(target - current) > 0.5
              ? requestAnimationFrame(tick)
              : null;
        };
        raf = requestAnimationFrame(tick);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="">
      {/* ── Heading ── */}
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

        {/* Scroll hint */}
        {/* <motion.div
          className="flex items-center justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/20">
              ↕ scroll on cards →
            </span>
          </motion.div>
        </motion.div> */}
      </div>

      {/* ── Card strip ── */}
      {/* <div className="relative w-full">
        <div
          className="flex items-center gap-10 overflow-x-auto overflow-y-hidden scrollbar-none px-[20vw] py-16"
          style={{ scrollBehavior: "auto" }} // "auto" lets our lerp control it; "smooth" fights it
        >
          {team.map((member, i) => {
            const tilt = TILTS[i] ?? (i - Math.floor(team.length / 2)) * 4;
            const cardHeight = 280;
            const cardWidth = 200;

            return (
              <>
                <TiltedCard
                  imageSrc={member.image}
                  altText={member.name}
                  captionText={member.role}
                  containerHeight={`${cardHeight}px`}
                  containerWidth={`${cardWidth}px`}
                  imageHeight={`${cardHeight}px`}
                  imageWidth={`${cardWidth}px`}
                  rotateAmplitude={10}
                  scaleOnHover={1.06}
                  showMobileWarning={false}
                  showTooltip
                />

                <div className="text-center">
                  <div className="w-4 h-px bg-orange-DEFAULT mx-auto mb-2" />
                  <p className="font-display text-white text-base tracking-tight leading-none">
                    {member.name}
                  </p>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-orange-DEFAULT mt-1">
                    {member.role}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div> */}
      <TeamCarousel />
    </div>
  );
}
