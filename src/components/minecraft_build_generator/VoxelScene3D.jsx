import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import VoxelMesh from './VoxelMesh';

export default function VoxelScene3D({ voxels }) {
  return (
    <div className="w-full h-full min-h-[400px] bg-zinc-900 rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [20, 20, 20], fov: 45 }}>
        <color attach="background" args={['#18181b']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 15]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />
        
        <VoxelMesh voxels={voxels} />
        
        {/* Blender-style Orbit Controls */}
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
        <Grid position={[0, -0.5, 0]} args={[40, 40]} cellSize={1} cellThickness={0.5} infiniteGrid />
      </Canvas>
    </div>
  );
}