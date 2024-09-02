import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Plane } from "@react-three/drei";
import OperateKit from "@/public/Operatorkit"; // Assuming this is your human model

const Model3d = () => {
  return (
    <Canvas style={{ background: "#f0f0f0" }}>
      <ambientLight intensity={2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls />
      <Suspense fallback={<span>Loading model...</span>}>
        <OperateKit />
      </Suspense>
    </Canvas>
  );
};

export default Model3d;
