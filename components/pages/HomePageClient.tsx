"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Scene } from "@/components/canvas/Scene";
import TLRIntro from "@/components/ui/TLRIntro";

interface HomePageClientProps {
  servicesSection: React.ReactNode;
  corridorSection: React.ReactNode;
  projectsSection: React.ReactNode;
  teamSection: React.ReactNode;
}

export function HomePageClient({
  servicesSection,
  corridorSection,
  projectsSection,
  teamSection,
}: HomePageClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    let active = true;
    const loader = new GLTFLoader();

    const assets = [
      "/models/esquire_teh/scene.gltf",
      "/models/spaceship_corridor/scene.gltf",
    ];

    Promise.all(
      assets.map(
        (src) =>
          new Promise((resolve, reject) => {
            loader.load(src, () => resolve(true), undefined, reject);
          }),
      ),
    )
      .then(() => {
        if (active) setModelsLoaded(true);
      })
      .catch((error) => {
        console.error("Model preload failed", error);
        if (active) setModelsLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const showLoader = !modelsLoaded;

  return (
    <>
      <div
        ref={containerRef}
        className="relative min-h-screen bg-black text-white"
      >
        <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
          <Scene scrollYProgress={scrollYProgress} />
        </div>

        <div className="relative z-10">
          <HeroSection />

          <div className="bg-black/50 backdrop-blur-md">
            <MarqueeSection />
          </div>

          {servicesSection}

          {corridorSection}

          {projectsSection}

          <div className="bg-black/65 backdrop-blur-sm">
            <AboutSection />
          </div>

          {teamSection}

          <div className="bg-black/80 backdrop-blur-lg">
            <ContactSection />
          </div>
        </div>
      </div>

      <TLRIntro visible={showLoader} />
    </>
  );
}
