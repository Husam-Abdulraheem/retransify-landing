import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function PhoneModel({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating and subtle rotation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main Body (Chassis) */}
      <RoundedBox args={[3.2, 6.5, 0.4]} radius={0.3} smoothness={4} position={[0, 0, 0]}>
        <meshPhysicalMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.2} 
          clearcoat={1} 
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Screen Frame (Bezel) */}
      <RoundedBox args={[3.0, 6.3, 0.41]} radius={0.25} smoothness={4} position={[0, 0, 0.01]}>
        <meshBasicMaterial color="#050505" />
      </RoundedBox>
      
      {/* Screen Glass (Dark Reflection) */}
      <mesh position={[0, 0, 0.22]}>
        <planeGeometry args={[2.9, 6.2]} />
        <meshPhysicalMaterial 
          color="#000000" 
          transmission={0.9} // Glass-like transmission
          roughness={0.05} 
          transparent={true} 
          opacity={0.8}
          envMapIntensity={2}
        />
      </mesh>

      {/* Dynamic Screen Glow Effect inside the phone */}
      <mesh position={[0, 0, 0.21]}>
        <planeGeometry args={[2.9, 6.2]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.05} toneMapped={false} />
      </mesh>

      {/* Camera Notch */}
      <RoundedBox args={[1.2, 0.25, 0.42]} radius={0.1} smoothness={4} position={[0, 2.9, 0.02]}>
        <meshBasicMaterial color="#000000" />
      </RoundedBox>
    </group>
  );
}
