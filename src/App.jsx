import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Island from './components/Island';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Architecture from './components/Architecture';

export default function App() {
  return (
    <div className="min-h-screen w-full relative select-none">
      
      {/* Background 3D Viewport Layer */}
      <div className="absolute inset-0 z-0 h-[500px] lg:h-screen pointer-events-none lg:pointer-events-auto">
        <Canvas>
					<PerspectiveCamera makeDefault position={[0, 4, 8]} fov={45} />
					
					{/* 1. Higher ambient light to bring up the base brightness of all objects */}
					<ambientLight intensity={0.65} />
					
					{/* 2. Primary Key Light (Front Right) - Crisp, powerful blue illumination */}
					<pointLight position={[10, 10, 10]} intensity={2.5} color="#146EB4" />
					
					{/* 3. Fill Light (Back Left) - Higher intensity to eliminate the dark side, set to a bright golden-orange */}
					<pointLight position={[-10, 8, -5]} intensity={2.2} color="#FFAA33" />
					
					{/* 4. Top Down Overhead Light - Adds a nice glossy sheen to the top faces */}
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
        
        {/* Landing Section Viewport Height Wrapper */}
        <section className="max-w-7xl mx-auto px-6 min-h-screen flex flex-col justify-between pointer-events-none">
          <Hero />
          <Metrics />
        </section>

        {/* Technical Architecture Context Deep Dives */}
        <div className="bg-[#07080e]/90 w-full border-t border-white/5 backdrop-blur-xl">
          <Architecture />
        </div>

      </div>
    </div>
  );
}