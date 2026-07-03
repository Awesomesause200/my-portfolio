import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Island from './components/Island';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Architecture from './components/Architecture';

// Your new voxel sub-components
import VoxelWorkspace from './components/minecraft_build_generator/VoxelWorkspace'; 

export default function App() {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showVoxelTool, setShowVoxelTool] = useState(false);

  // Top-bar is visible if the user is hovering near the top OR if it's explicitly pinned
  const isHeaderVisible = isHovered || isPinned;

  return (
    <div className="min-h-screen w-full relative select-none bg-[#07080e]">
      
      {/* ─── INVISIBLE HOVER DETECTOR ZONE ─── */}
      {/* Moving the mouse within the top 24px of the screen triggers the header */}
      <div 
        className="absolute top-0 left-0 right-0 h-6 z-50 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
      />

      {/* ─── AUTO-HIDING TOP-BAR ─── */}
      <header 
        className={`fixed top-0 left-0 right-0 h-16 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 z-50 px-8 flex items-center justify-between transition-transform duration-300 pointer-events-auto ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold tracking-wider text-white uppercase">Portfolio</span>
          <button 
            onClick={() => setShowVoxelTool(!showVoxelTool)}
            className={`text-sm font-medium px-3 py-1.5 rounded transition ${
              showVoxelTool 
                ? 'bg-emerald-500 text-black font-semibold' 
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {showVoxelTool ? "← Back to Home" : "🛠️ Voxel Guide Tool"}
          </button>
        </div>

        {/* Pin Control Button */}
        <button 
          onClick={() => setIsPinned(!isPinned)}
          className={`text-xs px-2.5 py-1 rounded border transition flex items-center gap-1.5 ${
            isPinned 
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' 
              : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
          }`}
        >
          📌 {isPinned ? 'Pinned' : 'Pin Top Bar'}
        </button>
      </header>

      {/* ─── VIEW CONDITIONAL ORCHESTRATION ─── */}
      {showVoxelTool ? (
        /* Voxel Project Fullscreen Workspace Page */
        <div className="relative z-20 pt-16 w-full h-screen bg-zinc-950 pointer-events-auto">
          <VoxelWorkspace />
        </div>
      ) : (
        /* Original Application Layout (Kept Exact Copy As-Is) */
        <>
          {/* Background 3D Viewport Layer */}
          <div className="absolute inset-0 z-0 h-[500px] lg:h-screen pointer-events-none lg:pointer-events-auto">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 4, 8]} fov={45} />
              <ambientLight intensity={0.65} />
              <pointLight position={[10, 10, 10]} intensity={2.5} color="#146EB4" />
              <pointLight position={[-10, 8, -5]} intensity={2.2} color="#FFAA33" />
              <directionalLight position={[0, 6, 0]} intensity={0.9} color="#ffffff" />
              
              <Island />
              <OrbitControls 
                enableZoom={false} 
                maxPolarAngle={Math.PI / 2.3} 
                minPolarAngle={Math.PI / 4} 
              />
            </Canvas>
          </div>

          {/* Scrollable Layout Structure */}
          <div className="relative z-10 w-full distribution-layout">
            <section className="max-w-7xl mx-auto px-6 min-h-screen flex flex-col justify-between pointer-events-none">
              <Hero />
              <Metrics />
            </section>
            <div className="bg-[#07080e]/90 w-full border-t border-white/5 backdrop-blur-xl">
              <Architecture />
            </div>
          </div>
        </>
      )}
    </div>
  );
}