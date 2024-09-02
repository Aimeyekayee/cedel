import React from 'react';
import { MeshProps } from '@react-three/fiber';

const Rectangle: React.FC<MeshProps> = (props) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[2, 0.5, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default Rectangle;