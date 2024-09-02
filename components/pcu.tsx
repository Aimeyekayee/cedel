import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface AssemblyPartProps {
  position: [number, number, number];
  targetPosition: [number, number, number];
  assembled: boolean;
  children: React.ReactNode;
}

const AssemblyPart: React.FC<AssemblyPartProps> = ({
  position,
  targetPosition,
  assembled,
  children,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position);

  useFrame(() => {
    if (assembled) {
      setCurrentPosition((prevPos) => [
        prevPos[0] + (targetPosition[0] - prevPos[0]) * 0.05,
        prevPos[1] + (targetPosition[1] - prevPos[1]) * 0.05,
        prevPos[2] + (targetPosition[2] - prevPos[2]) * 0.05,
      ]);
    }
  });

  return <group position={currentPosition}>{children}</group>;
};

interface SceneProps {
  assembled: boolean;
}

const TriangularPrism: React.FC = () => {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    // Base triangle (bottom)
    -1, 0, -1, 1, 0, -1, 0, 0, 1,

    // Top triangle (top)
    -1, 2, -1, 1, 2, -1, 0, 2, 1,
  ]);

  const indices = [
    // Bottom face
    0, 1, 2,
    // Top face
    3, 5, 4,
    // Side faces
    0, 2, 3, 2, 5, 3, 2, 1, 5, 1, 4, 5, 1, 0, 4, 0, 3, 4,
  ];

  geometry.setIndex(indices);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

const Scene: React.FC<SceneProps> = ({ assembled }) => {
  return (
    <>
      {/* Box */}
      <AssemblyPart
        position={[-4, 0, 0]}
        targetPosition={[0, 0, 0]}
        assembled={assembled}
      >
        <Box args={[4, 2, 2]}>
          <meshStandardMaterial color="blue" />
        </Box>
      </AssemblyPart>

      {/* Triangular Prism */}
      <AssemblyPart
        position={[4, 4, 0]}
        targetPosition={[0, 2, 0]}
        assembled={assembled}
      >
        <TriangularPrism />
      </AssemblyPart>
    </>
  );
};

const Pcu: React.FC = () => {
  const [assembled, setAssembled] = useState(false);

  return (
    <>
      <button
        onClick={() => setAssembled(true)}
        style={{ position: "absolute", top: "20px", left: "20px" }}
      >
        Assemble
      </button>
      <Canvas style={{ height: "100vh", background: "lightgrey" }}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Scene assembled={assembled} />
      </Canvas>
    </>
  );
};

export default Pcu;
