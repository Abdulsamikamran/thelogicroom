"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

const TEAM = [
  {
    name: "Shayan Khan",
    role: "Founder & CEO",
    image: "shayanjpeg.jpeg",
    desc: "Turns wildly ambitious ideas into actual roadmaps and still finds time to ask, 'what if we made it even cooler?' five minutes before launch. Somehow chaos listens to him.",
  },
  {
    name: "Talha Asif",
    role: "Chief Operations Officer (COO)",
    image: "/talha.jpeg",
    desc: "Keeps the machine running smoothly, the timelines realistic, and the team from accidentally turning one task into a full-blown side quest.",
  },
  {
    name: "Abdul Sami",
    role: "Chief Technology Officer (CTO)",
    image: "/sami.jpeg",
    desc: "Architect of complex systems, hunter of mysterious bugs, and the reason production survives our ‘small quick changes’ that are never small or quick.",
  },
  {
    name: "Ibtisam",
    role: "Chief Business Development Officer (CBDO)",
    image: "ibtesammain.png",
    desc: "Can turn a casual conversation into a partnership, a handshake into a pipeline, and a vague client brief into a very confident ‘leave it with us.’",
  },
  {
    name: "Mubeen",
    role: "Chief Marketing Officer (CMO)",
    image: "/mubeen.jpeg",
    desc: "Makes brands louder, campaigns sharper, and analytics prettier. If conversions drop, he stares at dashboards until they feel personally responsible.",
  },
];

function TeamCard({ member }) {
  return (
    <div className="group relative w-[320px] z-10 flex-shrink-0">
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
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [snapPoints, setSnapPoints] = useState([0]);

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const CARD_W = 320;
  const GAP = 32;
  const STEP = CARD_W + GAP;

  useEffect(() => {
    const calc = () => {
      if (!containerRef.current || !trackRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;
      const maxDrag = Math.max(trackWidth - containerWidth, 0);

      const points = [0];

      for (let offset = STEP; offset < maxDrag; offset += STEP) {
        points.push(-offset);
      }

      if (maxDrag > 0 && points[points.length - 1] !== -maxDrag) {
        points.push(-maxDrag);
      }

      setSnapPoints(points);
      setDragConstraints({
        left: -maxDrag,
        right: 0,
      });

      setCurrent((prev) => Math.min(prev, points.length - 1));
    };

    calc();

    const resizeObserver = new ResizeObserver(calc);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (trackRef.current) resizeObserver.observe(trackRef.current);

    window.addEventListener("resize", calc);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, []);

  const next = () => {
    setCurrent((prev) => Math.min(prev + 1, snapPoints.length - 1));
  };

  const prev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [snapPoints.length]);

  const xOffset = snapPoints[current] ?? 0;

  const handleDragEnd = (_, info) => {
    const draggedX = xOffset + info.offset.x;

    let nearestIndex = 0;
    let nearestDistance = Infinity;

    snapPoints.forEach((point, index) => {
      const distance = Math.abs(point - draggedX);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setCurrent(nearestIndex);
  };

  return (
    <section className="overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center mb-10 gap-4">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-white/10 hover:border-[#E8610A] transition text-white disabled:opacity-40"
            disabled={current === 0}
          >
            ←
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-white/10 hover:border-[#E8610A] transition text-white disabled:opacity-40"
            disabled={current === snapPoints.length - 1}
          >
            →
          </button>
        </div>

        <div ref={containerRef} className="overflow-hidden">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
            animate={{ x: xOffset }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-8 cursor-grab active:cursor-grabbing touch-pan-y"
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
