import { lazy, Suspense, useEffect, useState } from 'react';
import { useStore } from 'zustand';
import { isRevealed } from '../lib/preloader';
import { hasWebGL } from '../lib/webgl';
import { sceneStore } from '../store/scene';

// three + R3F + drei live in their own chunk, fetched only when the page has logo stations.
const Scene = lazy(() => import('../three/Scene'));

/**
 * Mounts the 3D scene once a logo station exists. The chunk is fetched when the browser is
 * idle, so it never competes with the first paint (the flat logo stands in meanwhile); under
 * the loader it is fetched at once, since the loader waits for it. Reduced motion still
 * gets the live logo, only still. Without WebGL the flat logo stays.
 */
export function SceneHost() {
  const wanted = useStore(sceneStore, (s) => Object.keys(s.anchors).length > 0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!wanted || active || !hasWebGL()) return;
    const go = () => setActive(true);
    if (!isRevealed()) {
      go();
      return;
    }
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(go, { timeout: 1200 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(go, 600);
    return () => clearTimeout(id);
  }, [wanted, active]);

  if (!active) return null;
  return (
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  );
}
