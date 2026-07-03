import { useEffect, useRef } from 'react';

export default function Map2DCanvas({ voxels, currentLayer, gridSize = 32 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const cellSize = canvas.width / gridSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Filter voxels belonging specifically to this single horizontal layer
    const layerVoxels = voxels.filter(v => v.y === currentLayer);

    // Draw grid background lines
    ctx.strokeStyle = '#3f3f46';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Render blocks on top of grid lines
    ctx.fillStyle = '#4ade80';
    layerVoxels.forEach(voxel => {
      ctx.fillRect(voxel.x * cellSize + 1, voxel.z * cellSize + 1, cellSize - 2, cellSize - 2);
    });

  }, [voxels, currentLayer, gridSize]);

  return (
    <div className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg">
      <canvas ref={canvasRef} width={400} height={400} className="border border-zinc-700 bg-zinc-950 rounded" />
    </div>
  );
}