import { Environment, Lightformer } from '@react-three/drei';

/**
 * Studio light for an orange object on a black page. The environment is built from
 * light panels (no HDR file to download), rendered once: a big soft key above-left, a tall
 * strip on the right (the long highlight down the risers), a top light, a back rim that
 * draws the silhouette against the dark, and a faint warm bounce from below. Two
 * directional lights add the direct shading the clear coat needs.
 */
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[4, 6, 8]} intensity={1.4} />
      <directionalLight position={[-6, -1, -5]} intensity={0.7} color="#ffd9b8" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.6} position={[-5, 4, 6]} scale={[8, 3.5, 1]} />
        <Lightformer form="rect" intensity={1.8} position={[7, 0.5, 2.5]} scale={[1.1, 9, 1]} />
        <Lightformer form="rect" intensity={2.4} position={[0, 7, 1]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={3} position={[-1, 1, -7]} scale={[12, 1.4, 1]} />
        <Lightformer
          form="circle"
          intensity={0.8}
          color="#ff9a4d"
          position={[0, -6, 3]}
          scale={5}
        />
      </Environment>
    </>
  );
}
