/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, OrbitControls } from "@react-three/drei";

function Model(props: any) {
    const group = useRef<THREE.Group>(null);
    const { nodes, materials } = useGLTF("/glbs/mac-draco.glb") as any;

    useEffect(() => {
        document.body.style.cursor = "default";
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (group.current) {
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 10) / 10 + 0.25, 0.1);
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 10) / 4, 0.1);
            group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 10) / 10, 0.1);
            group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-2 + Math.sin(t)) / 3, 0.1);
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <group position={[0, 2.5, -0.8]} rotation={[Math.PI / 2.8, 0, 0]}>
                <mesh material={materials.aluminium} geometry={nodes["Cube008"].geometry} />
                <mesh material={materials["matte.001"]} geometry={nodes["Cube008_1"].geometry} />
                <mesh material={materials["screen.001"]} geometry={nodes["Cube008_2"].geometry} />
            </group>
            <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
            <group position={[0, -0.1, 3.39]}>
                <mesh material={materials.aluminium} geometry={nodes["Cube002"].geometry} />
                <mesh material={materials.trackpad} geometry={nodes["Cube002_1"].geometry} />
            </group>
            <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
        </group>
    );
}

export default function Laptop() {
    const [modelScale, setModelScale] = useState(1.3);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let newScale = 1.3;
            if (width < 768) {
                newScale = 0.6;
            } else if (width < 1024) {
                newScale = 0.8;
            } else {
                newScale = 1.0;
            }
            setModelScale(newScale);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-[200px] sm:w-[250px] md:w-[400px] lg:w-[500px] h-[450px]">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, -30], fov: 30 }}
                gl={{ alpha: true }}
                style={{ background: "transparent", width: "100%", height: "100%" }}
            >
                {/* White light */}
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                {/* Red light */}
                <pointLight position={[-10, 10, 10]} intensity={1.5} color="#ff0000" />
                <Suspense fallback={null}>
                    <group rotation={[0, Math.PI, 0]}>
                        <Model scale={modelScale} />
                    </group>
                    <Environment preset="city" background={false} />
                </Suspense>
                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    minPolarAngle={Math.PI / 2.2}
                    maxPolarAngle={Math.PI / 2.2}
                />
            </Canvas>
        </div>
    );
}
