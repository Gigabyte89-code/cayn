import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function RobotHeadMesh() {
  const group = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  useFrame((state) => {
    const { pointer } = state;
    target.current.lerp(pointer, 0.08);
    if (!group.current) return;
    const targetY = target.current.x * 0.9;
    const targetX = -target.current.y * 0.6;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.1;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.1;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={group} scale={Math.min(viewport.width, viewport.height) * 0.32}>
        {/* Head — rounded chrome shell */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[1, 96, 96]} />
          <meshPhysicalMaterial
            color="#cfd4dc"
            metalness={1}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={1.4}
          />
        </mesh>

        {/* Faceplate — slightly darker, glassy front */}
        <mesh position={[0, 0.12, 0.62]} rotation={[-0.05, 0, 0]}>
          <sphereGeometry args={[0.62, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
          <MeshTransmissionMaterial
            color="#0b0d12"
            thickness={0.4}
            roughness={0.08}
            transmission={0.2}
            ior={1.4}
            chromaticAberration={0.05}
            metalness={0.9}
          />
        </mesh>

        {/* LED eye dots (left) */}
        <group position={[-0.22, 0.18, 1.08]}>
          {Array.from({ length: 16 }).map((_, i) => {
            const x = (i % 4) * 0.05 - 0.075;
            const y = Math.floor(i / 4) * 0.05 - 0.075;
            return (
              <mesh key={`l${i}`} position={[x, y, 0]}>
                <sphereGeometry args={[0.012, 12, 12]} />
                <meshBasicMaterial color="#e8efff" />
              </mesh>
            );
          })}
        </group>
        {/* LED eye dots (right) */}
        <group position={[0.22, 0.18, 1.08]}>
          {Array.from({ length: 16 }).map((_, i) => {
            const x = (i % 4) * 0.05 - 0.075;
            const y = Math.floor(i / 4) * 0.05 - 0.075;
            return (
              <mesh key={`r${i}`} position={[x, y, 0]}>
                <sphereGeometry args={[0.012, 12, 12]} />
                <meshBasicMaterial color="#e8efff" />
              </mesh>
            );
          })}
        </group>

        {/* Neck */}
        <mesh position={[0, -1.0, 0]}>
          <cylinderGeometry args={[0.18, 0.22, 0.45, 32]} />
          <meshPhysicalMaterial color="#1a1d24" metalness={0.8} roughness={0.35} />
        </mesh>

        {/* Tripod base */}
        <mesh position={[0, -1.35, 0]}>
          <cylinderGeometry args={[0.35, 0.5, 0.2, 32]} />
          <meshPhysicalMaterial color="#0e1014" metalness={0.7} roughness={0.45} />
        </mesh>
      </group>
    </Float>
  );
}

export function RobotHead3D() {
  return (
    <div className="relative mx-auto h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]">
      {/* Ambient glow that bleeds into the background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.55 0.22 270 / 55%), oklch(0.4 0.2 290 / 25%) 45%, transparent 72%)",
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#6a7cff" />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <RobotHeadMesh />
        </Suspense>
      </Canvas>

      {/* Soft fade-to-background mask on the edges so it blends in */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 55%, var(--background) 92%)",
        }}
      />
    </div>
  );
}
