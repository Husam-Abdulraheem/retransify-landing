import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import PhoneModel from './PhoneModel';
import { cameraProxy } from '../hooks/useStoryAnimation';

// Floating code particles matching the original HTML
const CodeParticle = ({ position, text, fontSize = 2 }: { position: [number, number, number], text: string, fontSize?: number }) => {
  const meshRef = useRef<THREE.Group | null>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.005;
      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={fontSize}
      color="#22d3ee" // Cyan
      anchorX="center"
      anchorY="middle"
    >
      <meshBasicMaterial color="#22d3ee" toneMapped={false} />
      {text}
    </Text>
  );
};

export default function Scene() {
  useFrame((state) => {
    // Smoothly interpolate the camera position to the proxy values driven by GSAP
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, cameraProxy.x, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, cameraProxy.y, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, cameraProxy.z, 0.05);
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, cameraProxy.rx, 0.05);
  });

  // Define the path the camera and data will follow
  const pathPoints = useMemo(() => {
    return [
      new THREE.Vector3(0, 5, 0),        // Start (above intro)
      new THREE.Vector3(-5, -5, -5),     // Node 1 area
      new THREE.Vector3(5, -25, -10),    // Node 2 area
      new THREE.Vector3(-5, -45, -5),    // Node 3 area
      new THREE.Vector3(5, -65, -10),    // Node 4 area
      new THREE.Vector3(-5, -85, -5),    // Node 5 area
      new THREE.Vector3(5, -105, -10),   // Node 6 area
      new THREE.Vector3(0, -125, 0),     // Finale
    ];
  }, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(pathPoints), [pathPoints]);
  const linePoints = useMemo(() => curve.getPoints(200), [curve]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#22d3ee" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#10b981" />
      
      {/* Background Starfield to add depth to the dark void */}
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={1} fade speed={1.5} />
      
      {/* Original Parallax Floating Text Elements mapped to 3D Space */}
      <group position={[0, 0, -20]}>
        <CodeParticle position={[-15, 10, -5]} text="</>" fontSize={6} />
        <CodeParticle position={[15, -5, -10]} text="{}" fontSize={8} />
        <CodeParticle position={[-10, -15, -8]} text="()" fontSize={5} />
        <CodeParticle position={[20, 15, -15]} text=";" fontSize={9} />
        <CodeParticle position={[5, 8, -5]} text="[]" fontSize={7} />
      </group>

      {/* The Glowing Data Path */}
      <Line
        points={linePoints}
        color="#10b981"
        lineWidth={3}
        toneMapped={false}
      />

      {/* The Finale 3D Phone Model */}
      <PhoneModel position={[0, -125, 0]} />

      {/* Post Processing for WOW factor (Neon Glow) */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
      </EffectComposer>
    </>
  );
}
