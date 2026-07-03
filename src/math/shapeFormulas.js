export const generateVoxelData = (shapeType, settings) => {
  const blocks = [];
  
  if (shapeType === 'sphere') {
    const { radius } = settings;
    const size = radius * 2 + 1;
    const center = radius;

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const dx = x - center;
          const dy = y - center;
          const dz = z - center;
          
          if (dx * dx + dy * dy + dz * dz <= radius * radius) {
            blocks.push({ x, y, z });
          }
        }
      }
    }
  }
  
  if (shapeType === 'torus') {
    const { majorRadius, minorRadius } = settings;
    const size = (majorRadius + minorRadius) * 2 + 1;
    const center = majorRadius + minorRadius;

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const dx = x - center;
          const dy = y - center;
          const dz = z - center;
          
          const horizontalDist = Math.sqrt(dx * dx + dz * dz);
          const val = (majorRadius - horizontalDist);
          
          if (val * val + dy * dy <= minorRadius * minorRadius) {
            blocks.push({ x, y, z });
          }
        }
      }
    }
  }

  // Follow identical coordinate paradigms for 'ellipse' variations
  return blocks;
};