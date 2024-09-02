import React from 'react';
import { MeshProps } from '@react-three/fiber';

const Triangle: React.FC<MeshProps> = (props) => {
  return (
    <mesh {...props}>
      <coneGeometry args={[1, 1, 4]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

export default Triangle;