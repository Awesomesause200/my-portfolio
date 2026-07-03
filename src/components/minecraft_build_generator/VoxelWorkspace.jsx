import { useState, useMemo } from 'react';
import { generateVoxelData } from '../../math/shapeFormulas';
import VoxelScene3D from './VoxelScene3D';
import Map2DCanvas from './Map2DCanvas';

export default function VoxelWorkspace() {
  const [shape, setShape] = useState('sphere');
  const [radius, setRadius] = useState(8);
  const [currentLayer, setCurrentLayer] = useState(8);
  const [sliceMode, setSliceMode] = useState('cumulative'); // 'single' | 'cumulative'

  const allVoxels = useMemo(() => {
    return generateVoxelData(shape, { radius, majorRadius: 10, minorRadius: 4 });
  }, [shape, radius]);

  const filtered3DVoxels = useMemo(() => {
    if (sliceMode === 'single') {
      return allVoxels.filter(v => v.y === currentLayer);
    }
    return allVoxels.filter(v => v.y <= currentLayer);
  }, [allVoxels, currentLayer, sliceMode]);

  const layerBlockCount = useMemo(() => {
    return allVoxels.filter(v => v.y === currentLayer).length;
  }, [allVoxels, currentLayer]);

  return (
    <div className="flex h-full w-full bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Tool Sidebar */}
      <div className="w-80 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col gap-6 overflow-y-auto">
        <div>
          <h2 className="text-lg font-bold text-emerald-400">Voxel Builder Guide</h2>
          <p className="text-xs text-zinc-400 mt-1">Minecraft Blueprint Companion</p>
        </div>
        
        {/* Shape Picker */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Shape Profile</label>
          <select 
            value={shape} 
            onChange={(e) => setShape(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="sphere">Sphere</option>
            <option value="torus">Torus (Donut)</option>
          </select>
        </div>

        {/* Dimension Configurations */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Radius ({radius})</label>
          <input 
            type="range" min="4" max="16" value={radius} 
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setRadius(val);
              setCurrentLayer(val); // Sync height default to center
            }} 
            className="w-full accent-emerald-500"
          />
        </div>

        {/* Slice Layer System */}
        <div className="border-t border-zinc-800 pt-4">
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Slicing Filters</label>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
              <input type="radio" checked={sliceMode === 'single'} onChange={() => setSliceMode('single')} className="accent-emerald-500" /> Single Layer
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
              <input type="radio" checked={sliceMode === 'cumulative'} onChange={() => setSliceMode('cumulative')} className="accent-emerald-500" /> Cumulative Base
            </label>
          </div>
          <input 
            type="range" min="0" max={radius * 2} value={currentLayer} 
            onChange={(e) => setCurrentLayer(parseInt(e.target.value))} 
            className="w-full accent-emerald-500"
          />
          <div className="text-xs text-zinc-500 mt-1 text-right">Active Layer Height Index: {currentLayer}</div>
        </div>

        {/* Summary Metrics block */}
        <div className="mt-auto bg-zinc-950 border border-zinc-800 p-4 rounded-md">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Block Count Metrics</h3>
          <div className="text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-zinc-500">Current Slice:</span> 
              <span className="font-mono text-emerald-400 font-semibold">{layerBlockCount} blocks</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Total Blueprint:</span> 
              <span className="font-mono text-zinc-300">{allVoxels.length} blocks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Working Grid Canvases */}
      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center overflow-hidden h-full">
        <div className="lg:col-span-2 h-full py-4">
          <VoxelScene3D voxels={filtered3DVoxels} />
        </div>
        <div className="h-full flex items-center justify-center">
          <Map2DCanvas voxels={allVoxels} currentLayer={currentLayer} gridSize={radius * 2 + 1} />
        </div>
      </div>
    </div>
  );
}