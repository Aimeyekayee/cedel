import React from "react";
import { MeshProps } from "@react-three/fiber";

const Box: React.FC<MeshProps> = (props) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default Box;
