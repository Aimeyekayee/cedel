import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props: any) {
  const { nodes, materials } = useGLTF("/operatorkit.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        //@ts-ignore
        geometry={nodes.Solid2.geometry}
        material={materials.Default}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload("/operatorkit.gltf");
