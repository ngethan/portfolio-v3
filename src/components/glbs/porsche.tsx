"use client";

import * as THREE from "three";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { applyProps, Canvas, useFrame } from "@react-three/fiber";
import {
    Environment,
    RandomizedLight,
    useGLTF,
    Lightformer,
    AccumulativeShadows,
    Float,
    PerformanceMonitor,
    OrbitControls,
} from "@react-three/drei";

interface PorscheProps {
    scale: number;
    position: number[];
    rotation: number[];
}

function Car(props: PorscheProps) {
    const { scene, nodes, materials } = useGLTF("/glbs/911-transformed.glb");
    useLayoutEffect(() => {
        Object.values(nodes).forEach((node) => (node.receiveShadow = node.castShadow = true));
        applyProps(materials.window, { color: "black", roughness: 0, clearcoat: 0.1 });
        applyProps(materials.coat, { envMapIntensity: 4, roughness: 0.5, metalness: 1 });
        applyProps(materials.paint, {
            envMapIntensity: 2,
            roughness: 0.45,
            metalness: 0.8,
            color: "#555",
        });
    }, [nodes, materials]);
    return <primitive object={scene} {...props} />;
}

const Porsche = () => {
    const [degraded, setDegraded] = useState(false);
    const [carScale, setCarScale] = useState(1.7);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setCarScale(1);
            } else if (width < 1024) {
                setCarScale(1.3);
            } else {
                setCarScale(1.7);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Canvas shadows camera={{ position: [5, 0, 15], fov: 30 }} gl={{ alpha: true }} style={{ background: "transparent" }}>
            <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
            <ambientLight intensity={0.5} />
            <Car scale={carScale} position={[-0.5, -0.18, 0]} rotation={[0, Math.PI / 5, 0]} />
            <AccumulativeShadows position={[0, -1.16, 0]} frames={100} alphaTest={0.9} scale={10}>
                <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
            </AccumulativeShadows>
            <PerformanceMonitor onDecline={() => setDegraded(true)} />
            <Environment frames={degraded ? 1 : Infinity} resolution={256} blur={1}>
                <Lightformers />
            </Environment>
            <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />
        </Canvas>
    );
};

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
    const group = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (group.current) {
            group.current.position.z += delta * 10;
            if (group.current.position.z > 20) group.current.position.z = -60;
        }
    });
    return (
        <>
            <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <group rotation={[0, 0.5, 0]}>
                <group ref={group}>
                    {positions.map((x, i) => (
                        <Lightformer
                            key={i}
                            form="circle"
                            intensity={2}
                            rotation={[Math.PI / 2, 0, 0]}
                            position={[x, 4, i * 4]}
                            scale={[3, 1, 1]}
                        />
                    ))}
                </group>
            </group>
            <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
            <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
            <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
            <Float speed={5} floatIntensity={2} rotationIntensity={2}>
                <Lightformer form="ring" color="red" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
            </Float>
        </>
    );
}

export default Porsche;
