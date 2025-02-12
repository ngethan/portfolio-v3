import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, ContactShadows, OrbitControls } from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { a as three } from "@react-spring/three";
import { a as web } from "@react-spring/web";

function Model({ hinge, ...props }) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/glbs/mac-draco.glb");

    useEffect(() => {
        document.body.style.cursor = "default";
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 10) / 10 + 0.25, 0.1);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 10) / 4, 0.1);
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 10) / 10, 0.1);
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-2 + Math.sin(t)) / 3, 0.1);
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
                <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh material={materials.aluminium} geometry={nodes["Cube008"].geometry} />
                    <mesh material={materials["matte.001"]} geometry={nodes["Cube008_1"].geometry} />
                    <mesh material={materials["screen.001"]} geometry={nodes["Cube008_2"].geometry} />
                </group>
            </three.group>
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
    // The spring is fixed to an open state.
    const springProps = useSpring({ open: 1 });
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
        <web.main style={{ background: "transparent" }}>
            {/* Responsive container with smaller dimensions */}
            <div className="w-[200px] sm:w-[250px] md:w-[400px] lg:w-[500px] h-[450px]">
                <Canvas
                    dpr={[1, 2]}
                    camera={{ position: [0, 0, -30], fov: 30 }}
                    gl={{ alpha: true }}
                    style={{ background: "transparent", width: "100%", height: "100%" }}
                >
                    <three.pointLight
                        position={[10, 10, 10]}
                        intensity={1.5}
                        color={springProps.open.to([0, 1], ["#f0f0f0", "#d25578"])}
                    />
                    <Suspense fallback={null}>
                        <group rotation={[0, Math.PI, 0]}>
                            <Model hinge={springProps.open.to([0, 1], [1.575, -0.425])} scale={modelScale} />
                        </group>
                        <Environment preset="city" background={false} />
                    </Suspense>
                    <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={1.75} far={4.5} />
                    <OrbitControls
                        enablePan={false}
                        enableZoom={false}
                        minPolarAngle={Math.PI / 2.2}
                        maxPolarAngle={Math.PI / 2.2}
                    />
                </Canvas>
            </div>
        </web.main>
    );
}
