import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { MathUtils } from 'three';

function CodeMark() {
  // Logo geometris dibuat di kode sehingga tidak memerlukan model eksternal.
  return <group position={[0, 0, 0.3]}>
    {[-1, 1].map((side) => <group key={side} position={[side * 0.72, 0, 0]}>
      {[-1, 1].map((direction) => <RoundedBox key={direction} args={[0.64, 0.16, 0.14]} radius={0.07} smoothness={3} position={[0, direction * 0.2, 0]} rotation={[0, 0, -side * direction * 0.7]}><meshStandardMaterial color="#ff895d" metalness={0.3} roughness={0.25} /></RoundedBox>)}
    </group>)}
    <RoundedBox args={[0.16, 0.97, 0.15]} radius={0.06} smoothness={3} rotation={[0, 0, -0.28]}><meshStandardMaterial color="#ff895d" metalness={0.25} roughness={0.25} /></RoundedBox>
  </group>;
}

function Sculpture({ compact, paused }) {
  const sculpture = useRef();
  const orbit = useRef();
  useFrame(({ clock, pointer }, delta) => {
    if (paused) return;
    const elapsed = clock.getElapsedTime();
    sculpture.current.rotation.y = MathUtils.damp(sculpture.current.rotation.y, -0.35 + pointer.x * 0.28, 3, delta);
    sculpture.current.rotation.x = MathUtils.damp(sculpture.current.rotation.x, 0.12 - pointer.y * 0.18, 3, delta);
    orbit.current.rotation.z = elapsed * 0.055;
  });
  return <group scale={compact ? 0.92 : 1}>
    <Float speed={paused ? 0 : 1.5} rotationIntensity={paused ? 0 : 0.08} floatIntensity={paused ? 0 : 0.3}>
      <group ref={sculpture} rotation={[0.12, -0.35, -0.12]}>
        <RoundedBox args={[2.75, 2.3, 0.44]} radius={0.34} smoothness={compact ? 3 : 6}>
          <meshStandardMaterial color="#343e37" metalness={0.65} roughness={0.28} />
        </RoundedBox>
        <RoundedBox args={[2.59, 2.14, 0.05]} position={[0, 0, 0.24]} radius={0.27} smoothness={3}>
          <meshStandardMaterial color="#19221d" metalness={0.25} roughness={0.48} />
        </RoundedBox>
        <CodeMark />
        <mesh position={[-0.94, 0.78, 0.29]}><sphereGeometry args={[0.045, 12, 12]} /><meshBasicMaterial color="#c9edaa" /></mesh>
        <mesh position={[-0.77, 0.78, 0.29]}><sphereGeometry args={[0.045, 12, 12]} /><meshBasicMaterial color="#5a6659" /></mesh>
        <mesh position={[-0.60, 0.78, 0.29]}><sphereGeometry args={[0.045, 12, 12]} /><meshBasicMaterial color="#5a6659" /></mesh>
      </group>
    </Float>
    <group ref={orbit}>
      <mesh rotation={[1.07, -0.45, -0.25]}><torusGeometry args={[2.16, 0.075, compact ? 8 : 16, compact ? 64 : 128]} /><meshStandardMaterial color="#ff7849" metalness={0.4} roughness={0.3} /></mesh>
      <mesh rotation={[0.7, 0.35, 0.35]}><torusGeometry args={[2.42, 0.012, 6, compact ? 64 : 128]} /><meshBasicMaterial color="#687460" transparent opacity={0.5} /></mesh>
      <mesh position={[1.76, 1.13, 0.5]}><sphereGeometry args={[0.24, compact ? 16 : 32, compact ? 16 : 32]} /><meshStandardMaterial color="#d6edb2" metalness={0.4} roughness={0.18} /></mesh>
      <mesh position={[-1.65, -1.2, 0.6]} rotation={[0.3, 0.5, 0.3]}><octahedronGeometry args={[0.28]} /><meshStandardMaterial color="#ff9b6b" metalness={0.35} roughness={0.3} /></mesh>
    </group>
  </group>;
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2');
    if (!context) return false;
    // Lepaskan konteks pemeriksaan sebelum renderer utama dibuat.
    context.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function Scene3D({ compact, paused, onReady, onFailure }) {
  const [supported] = useState(supportsWebGL);
  useEffect(() => { if (!supported) onFailure(); }, [supported, onFailure]);
  if (!supported) return null;
  return <Canvas
    camera={{ position: [0, 0, 7.7], fov: 42 }}
    dpr={compact ? [1, 1.25] : [1, 1.75]}
    frameloop={paused ? 'demand' : 'always'}
    gl={{ antialias: !compact, alpha: true, powerPreference: 'low-power' }}
    onCreated={({ gl }) => {
      onReady();
      gl.domElement.addEventListener('webglcontextlost', onFailure, { once: true });
    }}
    fallback={<div className="scene-unavailable">Layar 3D tidak tersedia.</div>}
    aria-label="Objek 3D logo coding kelas yang mengikuti kursor"
  >
    <ambientLight intensity={1.8} />
    <directionalLight position={[3, 4, 5]} intensity={4} color="#fff3da" />
    <directionalLight position={[-4, 1, 3]} intensity={2.5} color="#c9e8d6" />
    <pointLight position={[0, -3, 3]} intensity={10} color="#ff7849" />
    <Sculpture compact={compact} paused={paused} />
  </Canvas>;
}
