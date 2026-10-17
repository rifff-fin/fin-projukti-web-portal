import { LogoMark } from './Logo';
import { useLogoAnchor } from '../hooks/useLogoAnchor';
import type { AnchorId } from '../store/scene';
import { FRAME, STILL_HEIGHT } from '../three/frame';

/**
 * A station for the 3D logo. The box is sized before anything loads (no layout shift) and
 * its height stands for FRAME.h scene units, so the live logo lands exactly where the flat
 * logo stands in. The flat SVG fades out once the 3D is ready (globals.css); without WebGL
 * it simply stays.
 */
export function LogoPlate({ id, className = '' }: { id: AnchorId; className?: string }) {
  const ref = useLogoAnchor(id);
  return (
    <div
      ref={ref}
      data-logo-plate={id}
      className={`relative ${className}`}
      style={{ aspectRatio: `${FRAME.w} / ${FRAME.h}` }}
    >
      <span
        className="plate-still absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center"
        style={{ height: `${STILL_HEIGHT * 100}%` }}
      >
        <LogoMark className="h-full w-auto" />
      </span>
    </div>
  );
}
