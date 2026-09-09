"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <div className="group relative w-[290px] sm:w-[400px] md:w-[460px] shrink-0 border border-white/5 hover:border-orange-DEFAULT/40 transition-colors duration-500 overflow-hidden bg-black/40 backdrop-blur-sm select-none">
      {/* Orange glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-DEFAULT/5 to-transparent" />
      </div>

      <div className="p-8 md:p-12 flex flex-col justify-between h-full min-h-[480px] md:min-h-[520px]">
        <div>
          {/* Number & Dot indicator */}
          <div className="flex items-start justify-between mb-8">
            <span className="font-display text-6xl text-white/5 group-hover:text-orange-DEFAULT/20 transition-colors duration-500 leading-none">
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
          <div className="mb-6">
            <span className="font-mono text-xs tracking-widest uppercase text-orange-DEFAULT">
              {service.subtitle}
            </span>
            <h3 className="font-display text-3xl md:text-4xl text-white mt-2 leading-none tracking-tight">
              {service.title}
            </h3>
          </div>

          {/* Description */}
          <p className="font-body text-white/50 text-sm leading-relaxed mb-8 max-w-md">
            {service.description}
          </p>
        </div>

        <div>
          {/* Features list */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
            {service.features.slice(0, 4).map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 font-mono text-[10px] sm:text-xs tracking-wide text-white/40 group-hover:text-white/60 transition-colors"
              >
                <span className="w-2 h-px bg-orange-DEFAULT shrink-0" />
                <span className="truncate">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA link */}
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-orange-DEFAULT hover:gap-5 transition-all duration-300"
            whileHover={{ x: 4 }}
          >
            <span>Start This Project</span>
            <span className="text-sm leading-none">→</span>
          </motion.a>
        </div>
      </div>
    </div>
  );
}

interface ServicesClientProps {
  services: Service[];
}

export function ServicesClient({ services }: ServicesClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [cardWidth, setCardWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Triple array duplicate pattern to achieve infinite optical looping
  const extendedServices = [...services, ...services, ...services];
  const originalLength = services.length;

  // Set initial position to the first card of the middle set
  const [currentIndex, setCurrentIndex] = useState(originalLength);

  // Dynamically calculate slide measurements including tailwind gaps (24px)
  const updateMeasurements = () => {
    if (containerRef.current) {
      const firstCard = containerRef.current.firstElementChild as HTMLElement;
      if (firstCard) {
        setCardWidth(firstCard.offsetWidth + 24); // Card width + gap-6
      }
    }
  };

  useEffect(() => {
    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);
    return () => window.removeEventListener("resize", updateMeasurements);
  }, [services]);

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 2000); // Cycles cards every 4 seconds

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, cardWidth]);

  // Handle instant positional snaps when transitioning past loop barriers
  const handleAnimationComplete = () => {
    if (currentIndex >= originalLength * 2) {
      // Instantly snap to the first set equivalent
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - originalLength);
    } else if (currentIndex < originalLength) {
      // Instantly snap to the second set equivalent
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + originalLength);
    }
  };

  // Turn transitions back on after snapping instantly
  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    }
  }, [isTransitioning]);

  const handleNext = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // Drag controls
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Continuous infinite looping progress bar
  const activeProgress = originalLength > 1 
    ? (currentIndex % originalLength) / (originalLength - 1)
    : 1;

  return (
    <section
      id="services"
      className="relative py-20 md:py-28 overflow-hidden bg-black"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Block with Integrated Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-orange-DEFAULT" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-orange-DEFAULT">
                Our Capabilities
              </span>
            </div>

            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] text-white leading-none tracking-tight">
              OUR CRAFT
            </h2>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="w-14 h-14 border border-orange-DEFAULT/40 text-orange-DEFAULT hover:bg-orange-DEFAULT/10 active:scale-95 transition-all duration-300 flex items-center justify-center"
              aria-label="Previous service"
            >
              <span className="text-xl leading-none">←</span>
            </button>
            <button
              onClick={handleNext}
              className="w-14 h-14 border border-orange-DEFAULT/40 text-orange-DEFAULT hover:bg-orange-DEFAULT/10 active:scale-95 transition-all duration-300 flex items-center justify-center"
              aria-label="Next service"
            >
              <span className="text-xl leading-none">→</span>
            </button>
          </div>
        </div>

        {/* Outer Clip Container */}
        <div 
          className="overflow-hidden -mx-6 px-6 md:mx-0 md:px-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Moving Track */}
          <motion.div
            ref={containerRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            animate={{ x: -currentIndex * cardWidth }}
            transition={
              isTransitioning
                ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0 }
            }
            onAnimationComplete={handleAnimationComplete}
          >
            {extendedServices.map((service, i) => (
              <ServiceCard 
                key={`${service.id}-${i}`} 
                service={service} 
                index={i % originalLength} 
              />
            ))}
          </motion.div>
        </div>

        {/* Infinite Progress Indicator Track */}
        <div className="relative mt-12 h-[2px] w-full bg-white/10 overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-orange-DEFAULT"
            animate={{ width: `${activeProgress * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>
    </section>
  );
}