"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

const TEAM = [
  {
    name: "Shayan Khan",
    role: "Founder & CEO",
    image: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
    desc: "Turns ambitious ideas into company roadmaps and somehow keeps everyone moving in the same direction. Known for asking 'what if we made it even better?' five minutes before launch.",
  },
  {
    name: "Ibtisam",
    role: "Chief Technology Officer (CTO)",
    image: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
    desc: "Architect of complex systems, destroyer of production bugs, and collector of tabs with documentation nobody else knew existed.",
  },
  {
    name: "Mubeen",
    role: "Chief AI Officer (CAIO)",
    image: "/mubeen.jpeg",
    desc: "Teaches machines to think and occasionally reminds humans to do the same.",
  },
  {
    name: "Abdul Sami",
    role: "Chief Design Officer (CDO)",
    image: "/sami.jpeg",
    desc: "Makes pixels behave and interfaces look effortless.",
  },
];

function TeamCard({ member }) {
  return (
    <div className="group relative w-[320px] z-99 flex-shrink-0">
      <div
        className="
          relative overflow-hidden rounded-3xl
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          transition-all duration-500
          
          hover:border-[#E8610A]/50
          hover:shadow-[0_0_40px_rgba(232,97,10,0.15)]
        "
      >
        <div className="relative h-[400px] overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white text-2xl font-semibold">{member.name}</h3>
            <p className="text-[#E8610A] text-sm mt-1">{member.role}</p>
          </div>
        </div>

        <div
          className="
            absolute inset-0
            bg-black/90 backdrop-blur-lg
            opacity-0 invisible
            group-hover:opacity-100
            group-hover:visible
            transition-all duration-300
            flex items-center justify-center
            p-8
          "
        >
          <p className="text-white/80 text-sm leading-relaxed text-center">
            {member.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TeamCarousel() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  const CARD_W = 320;
  const GAP = 32; // gap-8 = 32px

  // Calculate drag constraints based on actual content width
  useEffect(() => {
    const calc = () => {
      if (!containerRef.current || !trackRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;
      const maxDrag = trackWidth - containerWidth;
      setDragConstraints({
        left: -Math.max(maxDrag, 0),
        right: 0,
      });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const next = () => {
    setCurrent((prev) => Math.min(prev + 1, TEAM.length - 1));
  };

  const prev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Animate to current card when buttons are clicked
  const xOffset = -(current * (CARD_W + GAP));

  return (
    <section className="overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center mb-10 gap-4">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-white/10 hover:border-[#E8610A] transition text-white"
          >
            ←
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-white/10 hover:border-[#E8610A] transition text-white"
          >
            →
          </button>
        </div>

        <div ref={containerRef} className="overflow-hidden">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={0.1}
            animate={{ x: xOffset }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-8 cursor-grab active:cursor-grabbing"
          >
            {TEAM.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
