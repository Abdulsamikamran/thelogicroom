"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, PerspectiveCamera } from "@react-three/drei";
import { MotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

function CorridorModel({ progress }: { progress: MotionValue<number> }) {
  const { scene } = useGLTF("/models/spaceship_corridor/scene.gltf");
  const camRef = useRef<any>(null);

  // Move camera from Z=10 (start) to Z=-100 (deep inside)
  // ADJUST THE -100 value based on how long your model is!
  const zPosition = useTransform(progress, [0, 1], [15, -20]);

  // Slight "walking" bobbing effect
  const yPosition = useTransform(progress, (v) => Math.sin(v * 40) * 0.1);

  useFrame((state) => {
    state.camera.position.z = zPosition.get();
    state.camera.position.y = yPosition.get();
    state.camera.lookAt(0, 0, zPosition.get() - 10);
  });

  return <primitive object={scene} />;
}

export function CorridorScene({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault fov={45} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 2, 0]} color="#ff6b1a" intensity={2} />
      <Environment preset="night" />
      <CorridorModel progress={scrollProgress} />
    </Canvas>
  );
}
