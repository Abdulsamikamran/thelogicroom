"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { CorridorScene } from "@/components/canvas/CorridorScene";
import type { NotableProduct } from "@/types";

interface CorridorClientProps {
  products: NotableProduct[];
}

export function CorridorClient({ products }: CorridorClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 18,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative z-[100] bg-black"
      style={{ height: "900vh" }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CorridorScene scrollProgress={smoothProgress} />
        </div>

        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,black_85%)] pointer-events-none" />

        <div className="absolute top-8 left-6 md:top-16 md:left-16 z-30 flex flex-col pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.35em] text-orange-500 uppercase">
              Showcase Systems
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl text-white font-extrabold mt-2 tracking-tight">
            OUR NOTABLE PRODUCTS
          </h2>
        </div>

        <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-center">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              total={products.length}
              progress={smoothProgress}
            />
          ))}
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
          <div className="text-orange-500 font-mono text-[9px] tracking-widest uppercase mb-2">
            System Synchronization
          </div>
          <div className="w-64 h-[2px] bg-white/10 relative">
            <motion.div
              className="h-full bg-orange-500"
              style={{
                width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
                boxShadow: "0 0 10px #ff6b00",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: NotableProduct;
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}

function ProductCard({ product, index, total, progress }: ProductCardProps) {
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;

  const opacity = useTransform(
    progress,
    [start, start + segment * 0.15, end - segment * 0.15, end],
    [0, 1, 1, 0],
  );

  const scale = useTransform(
    progress,
    [start, start + segment * 0.15, end - segment * 0.15, end],
    [0.9, 1, 1, 1.05],
  );

  const y = useTransform(
    progress,
    [start, start + segment * 0.15, end - segment * 0.15, end],
    [60, 0, 0, -60],
  );

  const imageY = useTransform(progress, [start, end], ["-8%", "8%"]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute w-full max-w-3xl h-[450px] md:h-[520px] rounded-2xl border border-white/10 overflow-hidden bg-zinc-950/90 shadow-2xl backdrop-blur-md flex flex-col md:flex-row pointer-events-auto"
    >
      <div className="relative w-full md:w-1/2 h-44 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
        <motion.img
          src={product.image}
          alt={product.tag}
          style={{ y: imageY, scale: 1.15 }}
          className="absolute inset-0 w-full h-[120%] object-cover opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-black/40 to-zinc-950" />

        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 border border-white/5 font-mono text-[9px] tracking-wider text-orange-500 uppercase rounded-sm">
          {product.tag}
        </div>
      </div>

      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-[10px] tracking-widest text-zinc-500">
              [ STAGE 0{product.id} ]
            </span>
            <span className="text-[10px] font-mono text-orange-500">
              SYS ACTIVE
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight uppercase leading-[1.1]">
            {product.title.map((word, i) => (
              <span
                key={i}
                className={word.orange ? "text-orange-500" : "text-white"}
              >
                {word.text}
                {i !== product.title.length - 1 && " "}
              </span>
            ))}
          </h3>

          <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
            {product.description}
          </p>
        </div>

        <div className="border-t border-white/5 pt-6">
          <div className="grid grid-cols-3 gap-2">
            {product.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                  SPEC_0{i + 1}
                </span>
                <span className="text-white text-xs font-semibold mt-1 font-mono tracking-tight">
                  {stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-8 h-[1px] bg-orange-500/30" />
      <div className="absolute top-0 right-0 w-[1px] h-8 bg-orange-500/30" />
    </motion.div>
  );
}
