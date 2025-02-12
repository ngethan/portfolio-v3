// batman could not get this out of me

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
    const {
        scene,
        nodes: gltfNodes,
        materials: gltfMaterials,
    } = useGLTF("/glbs/911-transformed.glb") as unknown as {
        scene: THREE.Group;
        nodes: { [key: string]: THREE.Mesh };
        materials: { [key: string]: THREE.Material };
    };
    useLayoutEffect(() => {
        Object.values(gltfNodes).forEach((node) => {
            if (node instanceof THREE.Mesh) {
                node.receiveShadow = node.castShadow = true;
            }
        });
        applyProps(gltfMaterials.window, { color: "black", roughness: 0, clearcoat: 0.1 });
        applyProps(gltfMaterials.coat, { envMapIntensity: 4, roughness: 0.5, metalness: 1 });
        applyProps(gltfMaterials.paint, {
            envMapIntensity: 2,
            roughness: 0.45,
            metalness: 0.8,
            color: "#555",
        });
    }, [gltfNodes, gltfMaterials]);
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
            <AccumulativeShadows
                position={[0, -1.16, 0]}
                frames={100}
                alphaTest={0.9}
                scale={10}
                key={undefined}
                type={undefined}
                args={undefined}
                visible={undefined}
                attach={undefined}
                onUpdate={undefined}
                isGroup={undefined}
                isObject3D={undefined}
                id={undefined}
                uuid={undefined}
                name={undefined}
                parent={undefined}
                modelViewMatrix={undefined}
                normalMatrix={undefined}
                matrixWorld={undefined}
                matrixAutoUpdate={undefined}
                matrixWorldAutoUpdate={undefined}
                matrixWorldNeedsUpdate={undefined}
                castShadow={undefined}
                receiveShadow={undefined}
                frustumCulled={undefined}
                renderOrder={undefined}
                animations={undefined}
                userData={undefined}
                customDepthMaterial={undefined}
                customDistanceMaterial={undefined}
                onBeforeRender={undefined}
                onAfterRender={undefined}
                applyMatrix4={undefined}
                applyQuaternion={undefined}
                setRotationFromAxisAngle={undefined}
                setRotationFromEuler={undefined}
                setRotationFromMatrix={undefined}
                setRotationFromQuaternion={undefined}
                rotateOnAxis={undefined}
                rotateOnWorldAxis={undefined}
                rotateX={undefined}
                rotateY={undefined}
                rotateZ={undefined}
                translateOnAxis={undefined}
                translateX={undefined}
                translateY={undefined}
                translateZ={undefined}
                localToWorld={undefined}
                worldToLocal={undefined}
                lookAt={undefined}
                add={undefined}
                remove={undefined}
                removeFromParent={undefined}
                clear={undefined}
                getObjectById={undefined}
                getObjectByName={undefined}
                getObjectByProperty={undefined}
                getObjectsByProperty={undefined}
                getWorldPosition={undefined}
                getWorldQuaternion={undefined}
                getWorldScale={undefined}
                getWorldDirection={undefined}
                raycast={undefined}
                traverse={undefined}
                traverseVisible={undefined}
                traverseAncestors={undefined}
                updateMatrix={undefined}
                updateMatrixWorld={undefined}
                updateWorldMatrix={undefined}
                toJSON={undefined}
                clone={undefined}
                copy={undefined}
                addEventListener={undefined}
                hasEventListener={undefined}
                removeEventListener={undefined}
                dispatchEvent={undefined}
            >
                <RandomizedLight
                    amount={8}
                    radius={10}
                    ambient={0.5}
                    position={[1, 5, -1]}
                    key={undefined}
                    args={undefined}
                    visible={undefined}
                    attach={undefined}
                    onUpdate={undefined}
                    type={undefined}
                    getWorldDirection={undefined}
                    isObject3D={undefined}
                    id={undefined}
                    uuid={undefined}
                    name={undefined}
                    parent={undefined}
                    modelViewMatrix={undefined}
                    normalMatrix={undefined}
                    matrixWorld={undefined}
                    matrixAutoUpdate={undefined}
                    matrixWorldAutoUpdate={undefined}
                    matrixWorldNeedsUpdate={undefined}
                    receiveShadow={undefined}
                    frustumCulled={undefined}
                    renderOrder={undefined}
                    animations={undefined}
                    userData={undefined}
                    customDepthMaterial={undefined}
                    customDistanceMaterial={undefined}
                    onBeforeRender={undefined}
                    onAfterRender={undefined}
                    applyMatrix4={undefined}
                    applyQuaternion={undefined}
                    setRotationFromAxisAngle={undefined}
                    setRotationFromEuler={undefined}
                    setRotationFromMatrix={undefined}
                    setRotationFromQuaternion={undefined}
                    rotateOnAxis={undefined}
                    rotateOnWorldAxis={undefined}
                    rotateX={undefined}
                    rotateY={undefined}
                    rotateZ={undefined}
                    translateOnAxis={undefined}
                    translateX={undefined}
                    translateY={undefined}
                    translateZ={undefined}
                    localToWorld={undefined}
                    worldToLocal={undefined}
                    lookAt={undefined}
                    add={undefined}
                    remove={undefined}
                    removeFromParent={undefined}
                    clear={undefined}
                    getObjectById={undefined}
                    getObjectByName={undefined}
                    getObjectByProperty={undefined}
                    getObjectsByProperty={undefined}
                    getWorldPosition={undefined}
                    getWorldQuaternion={undefined}
                    getWorldScale={undefined}
                    raycast={undefined}
                    traverse={undefined}
                    traverseVisible={undefined}
                    traverseAncestors={undefined}
                    updateMatrix={undefined}
                    updateMatrixWorld={undefined}
                    updateWorldMatrix={undefined}
                    toJSON={undefined}
                    clone={undefined}
                    copy={undefined}
                    addEventListener={undefined}
                    hasEventListener={undefined}
                    removeEventListener={undefined}
                    dispatchEvent={undefined}
                    isGroup={undefined}
                >
                    <div></div>
                </RandomizedLight>
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
            <Lightformer
                intensity={0.75}
                rotation-x={Math.PI / 2}
                position={[0, 5, -9]}
                scale={[10, 10, 1]}
                key={undefined}
                visible={undefined}
                attach={undefined}
                onUpdate={undefined}
                type={undefined}
                id={undefined}
                uuid={undefined}
                name={undefined}
                parent={undefined}
                modelViewMatrix={undefined}
                normalMatrix={undefined}
                matrixWorld={undefined}
                matrixAutoUpdate={undefined}
                matrixWorldAutoUpdate={undefined}
                matrixWorldNeedsUpdate={undefined}
                castShadow={undefined}
                receiveShadow={undefined}
                frustumCulled={undefined}
                renderOrder={undefined}
                animations={undefined}
                userData={undefined}
                customDepthMaterial={undefined}
                customDistanceMaterial={undefined}
                isObject3D={undefined}
                onBeforeRender={undefined}
                onAfterRender={undefined}
                applyMatrix4={undefined}
                applyQuaternion={undefined}
                setRotationFromAxisAngle={undefined}
                setRotationFromEuler={undefined}
                setRotationFromMatrix={undefined}
                setRotationFromQuaternion={undefined}
                rotateOnAxis={undefined}
                rotateOnWorldAxis={undefined}
                rotateX={undefined}
                rotateY={undefined}
                rotateZ={undefined}
                translateOnAxis={undefined}
                translateX={undefined}
                translateY={undefined}
                translateZ={undefined}
                localToWorld={undefined}
                worldToLocal={undefined}
                lookAt={undefined}
                add={undefined}
                remove={undefined}
                removeFromParent={undefined}
                clear={undefined}
                getObjectById={undefined}
                getObjectByName={undefined}
                getObjectByProperty={undefined}
                getObjectsByProperty={undefined}
                getWorldPosition={undefined}
                getWorldQuaternion={undefined}
                getWorldScale={undefined}
                getWorldDirection={undefined}
                raycast={undefined}
                traverse={undefined}
                traverseVisible={undefined}
                traverseAncestors={undefined}
                updateMatrix={undefined}
                updateMatrixWorld={undefined}
                updateWorldMatrix={undefined}
                toJSON={undefined}
                clone={undefined}
                copy={undefined}
                addEventListener={undefined}
                hasEventListener={undefined}
                removeEventListener={undefined}
                dispatchEvent={undefined}
                material={undefined}
                geometry={undefined}
                morphTargetInfluences={undefined}
                morphTargetDictionary={undefined}
                isMesh={undefined}
                updateMorphTargets={undefined}
                getVertexPosition={undefined}
            >
                <div></div>
            </Lightformer>
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
                            visible={undefined}
                            attach={undefined}
                            onUpdate={undefined}
                            type={undefined}
                            id={undefined}
                            uuid={undefined}
                            name={undefined}
                            parent={undefined}
                            modelViewMatrix={undefined}
                            normalMatrix={undefined}
                            matrixWorld={undefined}
                            matrixAutoUpdate={undefined}
                            matrixWorldAutoUpdate={undefined}
                            matrixWorldNeedsUpdate={undefined}
                            castShadow={undefined}
                            receiveShadow={undefined}
                            frustumCulled={undefined}
                            renderOrder={undefined}
                            animations={undefined}
                            userData={undefined}
                            customDepthMaterial={undefined}
                            customDistanceMaterial={undefined}
                            isObject3D={undefined}
                            onBeforeRender={undefined}
                            onAfterRender={undefined}
                            applyMatrix4={undefined}
                            applyQuaternion={undefined}
                            setRotationFromAxisAngle={undefined}
                            setRotationFromEuler={undefined}
                            setRotationFromMatrix={undefined}
                            setRotationFromQuaternion={undefined}
                            rotateOnAxis={undefined}
                            rotateOnWorldAxis={undefined}
                            rotateX={undefined}
                            rotateY={undefined}
                            rotateZ={undefined}
                            translateOnAxis={undefined}
                            translateX={undefined}
                            translateY={undefined}
                            translateZ={undefined}
                            localToWorld={undefined}
                            worldToLocal={undefined}
                            lookAt={undefined}
                            add={undefined}
                            remove={undefined}
                            removeFromParent={undefined}
                            clear={undefined}
                            getObjectById={undefined}
                            getObjectByName={undefined}
                            getObjectByProperty={undefined}
                            getObjectsByProperty={undefined}
                            getWorldPosition={undefined}
                            getWorldQuaternion={undefined}
                            getWorldScale={undefined}
                            getWorldDirection={undefined}
                            raycast={undefined}
                            traverse={undefined}
                            traverseVisible={undefined}
                            traverseAncestors={undefined}
                            updateMatrix={undefined}
                            updateMatrixWorld={undefined}
                            updateWorldMatrix={undefined}
                            toJSON={undefined}
                            clone={undefined}
                            copy={undefined}
                            addEventListener={undefined}
                            hasEventListener={undefined}
                            removeEventListener={undefined}
                            dispatchEvent={undefined}
                            material={undefined}
                            geometry={undefined}
                            morphTargetInfluences={undefined}
                            morphTargetDictionary={undefined}
                            isMesh={undefined}
                            updateMorphTargets={undefined}
                            getVertexPosition={undefined}
                        >
                            <div></div>
                        </Lightformer>
                    ))}
                </group>
            </group>
            <Lightformer
                intensity={4}
                rotation-y={Math.PI / 2}
                position={[-5, 1, -1]}
                scale={[20, 0.1, 1]}
                key={undefined}
                material={undefined}
                copy={undefined}
                id={undefined}
                onUpdate={undefined}
                clear={undefined}
                translateX={undefined}
                translateY={undefined}
                translateZ={undefined}
                rotateX={undefined}
                rotateY={undefined}
                rotateZ={undefined}
                add={undefined}
                visible={undefined}
                name={undefined}
                type={undefined}
                attach={undefined}
                isObject3D={undefined}
                uuid={undefined}
                parent={undefined}
                modelViewMatrix={undefined}
                normalMatrix={undefined}
                matrixWorld={undefined}
                matrixAutoUpdate={undefined}
                matrixWorldAutoUpdate={undefined}
                matrixWorldNeedsUpdate={undefined}
                castShadow={undefined}
                receiveShadow={undefined}
                frustumCulled={undefined}
                renderOrder={undefined}
                animations={undefined}
                userData={undefined}
                customDepthMaterial={undefined}
                customDistanceMaterial={undefined}
                onBeforeRender={undefined}
                onAfterRender={undefined}
                applyMatrix4={undefined}
                applyQuaternion={undefined}
                setRotationFromAxisAngle={undefined}
                setRotationFromEuler={undefined}
                setRotationFromMatrix={undefined}
                setRotationFromQuaternion={undefined}
                rotateOnAxis={undefined}
                rotateOnWorldAxis={undefined}
                translateOnAxis={undefined}
                localToWorld={undefined}
                worldToLocal={undefined}
                lookAt={undefined}
                remove={undefined}
                removeFromParent={undefined}
                getObjectById={undefined}
                getObjectByName={undefined}
                getObjectByProperty={undefined}
                getObjectsByProperty={undefined}
                getWorldPosition={undefined}
                getWorldQuaternion={undefined}
                getWorldScale={undefined}
                getWorldDirection={undefined}
                raycast={undefined}
                traverse={undefined}
                traverseVisible={undefined}
                traverseAncestors={undefined}
                updateMatrix={undefined}
                updateMatrixWorld={undefined}
                updateWorldMatrix={undefined}
                toJSON={undefined}
                clone={undefined}
                addEventListener={undefined}
                hasEventListener={undefined}
                removeEventListener={undefined}
                dispatchEvent={undefined}
                isMesh={undefined}
                geometry={undefined}
                morphTargetInfluences={undefined}
                morphTargetDictionary={undefined}
                updateMorphTargets={undefined}
                getVertexPosition={undefined}
            >
                <div></div>
            </Lightformer>
            <Lightformer
                rotation-y={Math.PI / 2}
                position={[-5, -1, -1]}
                scale={[20, 0.5, 1]}
                key={undefined}
                material={undefined}
                type={undefined}
                visible={undefined}
                attach={undefined}
                onUpdate={undefined}
                isObject3D={undefined}
                id={undefined}
                uuid={undefined}
                name={undefined}
                parent={undefined}
                modelViewMatrix={undefined}
                normalMatrix={undefined}
                matrixWorld={undefined}
                matrixAutoUpdate={undefined}
                matrixWorldAutoUpdate={undefined}
                matrixWorldNeedsUpdate={undefined}
                castShadow={undefined}
                receiveShadow={undefined}
                frustumCulled={undefined}
                renderOrder={undefined}
                animations={undefined}
                userData={undefined}
                customDepthMaterial={undefined}
                customDistanceMaterial={undefined}
                onBeforeRender={undefined}
                onAfterRender={undefined}
                applyMatrix4={undefined}
                applyQuaternion={undefined}
                setRotationFromAxisAngle={undefined}
                setRotationFromEuler={undefined}
                setRotationFromMatrix={undefined}
                setRotationFromQuaternion={undefined}
                rotateOnAxis={undefined}
                rotateOnWorldAxis={undefined}
                rotateX={undefined}
                rotateY={undefined}
                rotateZ={undefined}
                translateOnAxis={undefined}
                translateX={undefined}
                translateY={undefined}
                translateZ={undefined}
                localToWorld={undefined}
                worldToLocal={undefined}
                lookAt={undefined}
                add={undefined}
                remove={undefined}
                removeFromParent={undefined}
                clear={undefined}
                getObjectById={undefined}
                getObjectByName={undefined}
                getObjectByProperty={undefined}
                getObjectsByProperty={undefined}
                getWorldPosition={undefined}
                getWorldQuaternion={undefined}
                getWorldScale={undefined}
                getWorldDirection={undefined}
                raycast={undefined}
                traverse={undefined}
                traverseVisible={undefined}
                traverseAncestors={undefined}
                updateMatrix={undefined}
                updateMatrixWorld={undefined}
                updateWorldMatrix={undefined}
                toJSON={undefined}
                clone={undefined}
                copy={undefined}
                addEventListener={undefined}
                hasEventListener={undefined}
                removeEventListener={undefined}
                dispatchEvent={undefined}
                geometry={undefined}
                morphTargetInfluences={undefined}
                morphTargetDictionary={undefined}
                isMesh={undefined}
                updateMorphTargets={undefined}
                getVertexPosition={undefined}
            >
                <div></div>
            </Lightformer>
            <Lightformer
                rotation-y={-Math.PI / 2}
                position={[10, 1, 0]}
                scale={[20, 1, 1]}
                key={undefined}
                material={undefined}
                visible={undefined}
                attach={undefined}
                onUpdate={undefined}
                copy={undefined}
                type={undefined}
                id={undefined}
                uuid={undefined}
                name={undefined}
                parent={undefined}
                modelViewMatrix={undefined}
                normalMatrix={undefined}
                matrixWorld={undefined}
                matrixAutoUpdate={undefined}
                matrixWorldAutoUpdate={undefined}
                matrixWorldNeedsUpdate={undefined}
                castShadow={undefined}
                receiveShadow={undefined}
                frustumCulled={undefined}
                renderOrder={undefined}
                animations={undefined}
                userData={undefined}
                customDepthMaterial={undefined}
                customDistanceMaterial={undefined}
                isObject3D={undefined}
                onBeforeRender={undefined}
                onAfterRender={undefined}
                applyMatrix4={undefined}
                applyQuaternion={undefined}
                setRotationFromAxisAngle={undefined}
                setRotationFromEuler={undefined}
                setRotationFromMatrix={undefined}
                setRotationFromQuaternion={undefined}
                rotateOnAxis={undefined}
                rotateOnWorldAxis={undefined}
                rotateX={undefined}
                rotateY={undefined}
                rotateZ={undefined}
                translateOnAxis={undefined}
                translateX={undefined}
                translateY={undefined}
                translateZ={undefined}
                localToWorld={undefined}
                worldToLocal={undefined}
                lookAt={undefined}
                add={undefined}
                remove={undefined}
                removeFromParent={undefined}
                clear={undefined}
                getObjectById={undefined}
                getObjectByName={undefined}
                getObjectByProperty={undefined}
                getObjectsByProperty={undefined}
                getWorldPosition={undefined}
                getWorldQuaternion={undefined}
                getWorldScale={undefined}
                getWorldDirection={undefined}
                raycast={undefined}
                traverse={undefined}
                traverseVisible={undefined}
                traverseAncestors={undefined}
                updateMatrix={undefined}
                updateMatrixWorld={undefined}
                updateWorldMatrix={undefined}
                toJSON={undefined}
                clone={undefined}
                addEventListener={undefined}
                hasEventListener={undefined}
                removeEventListener={undefined}
                dispatchEvent={undefined}
                geometry={undefined}
                morphTargetInfluences={undefined}
                morphTargetDictionary={undefined}
                isMesh={undefined}
                updateMorphTargets={undefined}
                getVertexPosition={undefined}
            >
                <div></div>
            </Lightformer>
            <Float
                speed={5}
                floatIntensity={2}
                rotationIntensity={2}
                key={undefined}
                visible={undefined}
                attach={undefined}
                args={undefined}
                onUpdate={undefined}
                position={undefined}
                up={undefined}
                scale={undefined}
                rotation={undefined}
                matrix={undefined}
                quaternion={undefined}
                layers={undefined}
                dispose={undefined}
                type={undefined}
                id={undefined}
                uuid={undefined}
                name={undefined}
                parent={undefined}
                modelViewMatrix={undefined}
                normalMatrix={undefined}
                matrixWorld={undefined}
                matrixAutoUpdate={undefined}
                matrixWorldAutoUpdate={undefined}
                matrixWorldNeedsUpdate={undefined}
                castShadow={undefined}
                receiveShadow={undefined}
                frustumCulled={undefined}
                renderOrder={undefined}
                animations={undefined}
                userData={undefined}
                customDepthMaterial={undefined}
                customDistanceMaterial={undefined}
                isObject3D={undefined}
                onBeforeRender={undefined}
                onAfterRender={undefined}
                applyMatrix4={undefined}
                applyQuaternion={undefined}
                setRotationFromAxisAngle={undefined}
                setRotationFromEuler={undefined}
                setRotationFromMatrix={undefined}
                setRotationFromQuaternion={undefined}
                rotateOnAxis={undefined}
                rotateOnWorldAxis={undefined}
                rotateX={undefined}
                rotateY={undefined}
                rotateZ={undefined}
                translateOnAxis={undefined}
                translateX={undefined}
                translateY={undefined}
                translateZ={undefined}
                localToWorld={undefined}
                worldToLocal={undefined}
                lookAt={undefined}
                add={undefined}
                remove={undefined}
                removeFromParent={undefined}
                clear={undefined}
                getObjectById={undefined}
                getObjectByName={undefined}
                getObjectByProperty={undefined}
                getObjectsByProperty={undefined}
                getWorldPosition={undefined}
                getWorldQuaternion={undefined}
                getWorldScale={undefined}
                getWorldDirection={undefined}
                raycast={undefined}
                traverse={undefined}
                traverseVisible={undefined}
                traverseAncestors={undefined}
                updateMatrix={undefined}
                updateMatrixWorld={undefined}
                updateWorldMatrix={undefined}
                toJSON={undefined}
                clone={undefined}
                copy={undefined}
                addEventListener={undefined}
                hasEventListener={undefined}
                removeEventListener={undefined}
                dispatchEvent={undefined}
                onClick={undefined}
                onContextMenu={undefined}
                onDoubleClick={undefined}
                onPointerUp={undefined}
                onPointerDown={undefined}
                onPointerOver={undefined}
                onPointerOut={undefined}
                onPointerEnter={undefined}
                onPointerLeave={undefined}
                onPointerMove={undefined}
                onPointerMissed={undefined}
                onPointerCancel={undefined}
                onWheel={undefined}
                isGroup={undefined}
                enabled={undefined}
                floatingRange={undefined}
            >
                <Lightformer
                    form="ring"
                    color="red"
                    intensity={1}
                    scale={10}
                    position={[-15, 4, -18]}
                    target={[0, 0, 0]}
                    key={undefined}
                    visible={undefined}
                    attach={undefined}
                    onUpdate={undefined}
                    type={undefined}
                    id={undefined}
                    uuid={undefined}
                    name={undefined}
                    parent={undefined}
                    modelViewMatrix={undefined}
                    normalMatrix={undefined}
                    matrixWorld={undefined}
                    matrixAutoUpdate={undefined}
                    matrixWorldAutoUpdate={undefined}
                    matrixWorldNeedsUpdate={undefined}
                    castShadow={undefined}
                    receiveShadow={undefined}
                    frustumCulled={undefined}
                    renderOrder={undefined}
                    animations={undefined}
                    userData={undefined}
                    customDepthMaterial={undefined}
                    customDistanceMaterial={undefined}
                    isObject3D={undefined}
                    onBeforeRender={undefined}
                    onAfterRender={undefined}
                    applyMatrix4={undefined}
                    applyQuaternion={undefined}
                    setRotationFromAxisAngle={undefined}
                    setRotationFromEuler={undefined}
                    setRotationFromMatrix={undefined}
                    setRotationFromQuaternion={undefined}
                    rotateOnAxis={undefined}
                    rotateOnWorldAxis={undefined}
                    rotateX={undefined}
                    rotateY={undefined}
                    rotateZ={undefined}
                    translateOnAxis={undefined}
                    translateX={undefined}
                    translateY={undefined}
                    translateZ={undefined}
                    localToWorld={undefined}
                    worldToLocal={undefined}
                    lookAt={undefined}
                    add={undefined}
                    remove={undefined}
                    removeFromParent={undefined}
                    clear={undefined}
                    getObjectById={undefined}
                    getObjectByName={undefined}
                    getObjectByProperty={undefined}
                    getObjectsByProperty={undefined}
                    getWorldPosition={undefined}
                    getWorldQuaternion={undefined}
                    getWorldScale={undefined}
                    getWorldDirection={undefined}
                    raycast={undefined}
                    traverse={undefined}
                    traverseVisible={undefined}
                    traverseAncestors={undefined}
                    updateMatrix={undefined}
                    updateMatrixWorld={undefined}
                    updateWorldMatrix={undefined}
                    toJSON={undefined}
                    clone={undefined}
                    copy={undefined}
                    addEventListener={undefined}
                    hasEventListener={undefined}
                    removeEventListener={undefined}
                    dispatchEvent={undefined}
                    material={undefined}
                    geometry={undefined}
                    morphTargetInfluences={undefined}
                    morphTargetDictionary={undefined}
                    isMesh={undefined}
                    updateMorphTargets={undefined}
                    getVertexPosition={undefined}
                >
                    <div></div>
                </Lightformer>
            </Float>
        </>
    );
}

export default Porsche;
