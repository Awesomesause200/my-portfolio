import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function VoxelMesh({ voxels }) {
  const meshRef = useRef();
  
  useEffect(() => {
    if (!meshRef.current) return;
    
    const count = voxels.length;
    meshRef.current.count = count;
    
    const dummy = new THREE.Object3D();
    
    voxels.forEach((voxel, index) => {
      // Set position for each instance relative to the voxel matrix
      dummy.position.set(voxel.x, voxel.y, voxel.z);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [voxels]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, 100000]}>
      <boxGeometry args={[0.98, 0.98, 0.98]}>
        {/* Subtle padding gap makes voxel block counts immediately visible */}
      </boxGeometry>
      <meshStandardMaterial color="#86efac" roughness={0.4} />
    </instancedMesh>
  );
}