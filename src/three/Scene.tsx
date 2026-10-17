import { Suspense, useEffect, useState } from 'react';
import { Canvas, advance, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { NeutralToneMapping } from 'three';
import { gsap } from '../lib/gsap';
import { Lighting } from './Lighting';
import { LogoModel } from './LogoModel';
import { stage, updateTarget } from './stations';

/**
 * The site's single WebGL canvas: fixed, full-viewport, transparent, behind the DOM (the
 * page sits above it at z-index 1, so a section with a background covers the logo).
 *
 * One clock: the GSAP ticker already runs Lenis and ScrollTrigger, so the 3D frame renders
 * from the same tick, after scroll is updated (no lag behind the DOM). The loop sleeps
 * whenever the logo is off screen.
 */
export default function Scene() {
  const [dpr, setDpr] = useState(1.75);
  return (
    <Canvas
      aria-hidden="true"
      frameloop="never"
      dpr={[1, dpr]}
      camera={{ fov: 22, near: 1, far: 100, position: [0, 0, 30] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      onCreated={({ gl }) => {
        gl.toneMapping = NeutralToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <Driver />
      <PerformanceMonitor onDecline={() => setDpr(1.25)} onIncline={() => setDpr(1.75)} />
      <Lighting />
      <Suspense fallback={null}>
        <LogoModel />
        <Ready />
      </Suspense>
    </Canvas>
  );
}

function Driver() {
  useEffect(() => {
    let wasVisible = false;
    const tick = (time: number) => {
      const visible = updateTarget(window.innerWidth, window.innerHeight);
      // render while the logo is on screen, plus one frame to clear when it leaves
      if (visible || wasVisible) advance(time);
      wasVisible = visible;
    };
    // the canvas ignores pointer events (the DOM is on top), so listen on the window
    const point = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      stage.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      stage.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    gsap.ticker.add(tick);
    window.addEventListener('pointermove', point, { passive: true });
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('pointermove', point);
    };
  }, []);
  return null;
}

/** Compile the shaders up front, then flag the page so CSS fades the flat stand-ins out. */
function Ready() {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    gl.compile(scene, camera);
    const root = document.documentElement;
    root.dataset.webgl = 'ready';
    return () => {
      delete root.dataset.webgl;
    };
  }, [gl, scene, camera]);
  return null;
}
