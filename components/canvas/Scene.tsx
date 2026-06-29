"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { MotionValue, useTransform } from "framer-motion";
import * as THREE from "three";

// ─── The actual 3D model ─────────────────────────────────────────────────────
function MechModel({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const { scene } = useGLTF("/models/esquire_teh/scene.gltf");
  const ref = useRef<THREE.Group>(null);

  // Map scroll 0→1 to the values you want per section
  const rotationY = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [1, Math.PI * 0.6, Math.PI * 1.2, Math.PI * 2],
  );
  const positionX = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [1.5, -1.5, 1.5, 0],
  );
  const positionY = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [-0.8, -2, -2, 0],
  );
  const modelScale = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0.06, 0.1, 0.1, 0.1],
  );

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y = rotationY.get();
    ref.current.position.x = positionX.get();
    ref.current.position.y = positionY.get();
    const s = modelScale.get();
    ref.current.scale.set(s, s, s);
    // Gentle idle rotation on top of scroll-driven rotation
    ref.current.rotation.y += 0.003;
  });

  return <primitive ref={ref} object={scene} />;
}

// ─── Canvas wrapper ───────────────────────────────────────────────────────────
export function Scene({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ff6600" />
      <directionalLight
        position={[-5, -2, -3]}
        intensity={0.8}
        color="#4444ff"
      />
      <Environment preset="city" />
      <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={10} blur={2} />
      <MechModel scrollYProgress={scrollYProgress} />
    </Canvas>
  );
}

// Preload the model
useGLTF.preload("/models/esquire_teh/scene.gltf");
