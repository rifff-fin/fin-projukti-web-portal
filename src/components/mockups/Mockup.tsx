import { lazy, Suspense, useRef } from 'react';
import type { MockupId } from '../../content/copy';
import { useInView } from '../../hooks/useInView';

// The drawings load in their own chunk: they all sit below the first screen.
const Scene = lazy(() => import('./scenes'));

/**
 * A mockup illustration (scenes.tsx): drawn UI in the site's palette, 16:10. Decorative
 * (aria-hidden); its animations run only while it is on screen ([data-play]) and stop
 * with reduced motion (globals.css), where every scene rests on a complete picture.
 */
export function Mockup({ id, className }: { id: MockupId; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const play = useInView(ref);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-play={play ? '' : undefined}
      className={`mock relative aspect-[16/10] overflow-hidden ${className ?? ''}`}
    >
      <div className="dot-grid absolute inset-0" />
      <Suspense fallback={null}>
        <Scene id={id} />
      </Suspense>
    </div>
  );
}
