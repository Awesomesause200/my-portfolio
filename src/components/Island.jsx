import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Island() {
  const groupRef = useRef();

  // Floating animation loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
    groupRef.current.rotation.y = t * 0.05;
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0.5, 0]}>
      {/* Glossy Floating Base Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#121324"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Central "Redshift" Cluster Node */}
      <RoundedBox args={[2, 2, 2]} radius={0.05} smoothness={4} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#146EB4" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Pulsing Core Lights inside the cluster */}
      <mesh position={[0, 0.5, 1.01]}>
        <boxGeometry args={[1.5, 1.5, 0.01]} />
        <meshBasicMaterial color="#FF9900" />
      </mesh>

      {/* Surrounding Compute/Lambda Blocks */}
      <RoundedBox args={[0.8, 0.8, 0.8]} position={[-2, -0.1, -1.5]}>
        <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.1} />
      </RoundedBox>

      <RoundedBox args={[0.8, 1.2, 0.8]} position={[2, 0.1, 1.5]}>
        <meshStandardMaterial color="#a855f7" metalness={0.9} roughness={0.1} />
      </RoundedBox>

      {/* Subtle Grid Lines overlay */}
      <gridHelper args={[10, 20, '#146EB4', '#1f2242']} position={[0, -0.49, 0]} />
    </group>
  );
}