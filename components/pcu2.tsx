import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Box from "@/components/box";
import Rectangle from "@/components/rectangle";
import Triangle from "@/components/triangle";

const Pcu2: React.FC = () => {
  const [assembled, setAssembled] = useState<boolean>(false);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box position={[assembled ? 0 : -2, 0, 0]} />
        <Rectangle position={[assembled ? 0 : 2, 0, 0]} />
        <Triangle position={[0, assembled ? 1.5 : 3, 0]} />
        <OrbitControls />
      </Canvas>
      <button
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={() => setAssembled(!assembled)}
      >
        {assembled ? "Disassemble" : "Assemble"}
      </button>
    </div>
  );
};

export default Pcu2;
