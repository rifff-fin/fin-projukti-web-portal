import { reducedQuery } from '../lib/motion';
import { sceneStore, tracks, type AnchorId } from '../store/scene';
import { FRAME } from './frame';

/**
 * Where the 3D logo stands, frame by frame. A station is a DOM box (a logo plate in the
 * static layout) whose height stands for FRAME.h scene units, so the logo lands exactly on
 * the flat logo it replaces. Between neighbouring stations the logo either
 *
 *   travel-wide  glides (wide screens with full motion): it stays on the screen's centre
 *                line while the page scrolls under it, crosses over, grows or shrinks to the
 *                next plate and turns once on the way. The glide spans the scroll from the
 *                moment the first plate passes the centre line to the moment the next one
 *                reaches it.
 *   cut          follows the first plate off the screen, then appears with the next one.
 *
 * Written by `updateTarget` once per frame (three/Scene.tsx), read by the logo in useFrame.
 */
type Link = 'travel-wide' | 'cut';

const ROUTE: AnchorId[] = ['hero', 'process', 'cta'];
const LINKS: Link[] = ['travel-wide', 'cut'];

/** The logo's pose at each station (radians): turned to show it is solid. */
const POSE: Record<AnchorId, { yaw: number; pitch: number }> = {
  hero: { yaw: -0.52, pitch: 0.1 },
  process: { yaw: -0.3, pitch: 0.05 },
  cta: { yaw: -0.46, pitch: 0.08 },
};

export interface LogoTarget {
  visible: boolean;
  /** Logo centre, viewport px. */
  x: number;
  y: number;
  /** Screen px per scene unit. */
  pxPerUnit: number;
  yaw: number;
  pitch: number;
  /** The station the logo is at, leaving or arriving at. */
  station: AnchorId | null;
  /** Standing at its station (not gliding). */
  settled: boolean;
  /** The Process track's progress while the logo stands there; null elsewhere. */
  climb: number | null;
}

export const target: LogoTarget = {
  visible: false,
  x: 0,
  y: 0,
  pxPerUnit: 1,
  yaw: POSE.hero.yaw,
  pitch: POSE.hero.pitch,
  station: null,
  settled: true,
  climb: null,
};

/** Scene-wide state the logo reads alongside its target. */
export const stage = {
  /** Full motion: build, pulses, idle float, pointer tilt, glides. Reduced: still, cuts. */
  motion: true,
  /** Pointer from the viewport centre, -1..1 (mouse only). */
  pointer: { x: 0, y: 0 },
};

const reduced = window.matchMedia(reducedQuery());
const wide = window.matchMedia('(min-width: 1024px)');

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const TAU = Math.PI * 2;

interface Placed {
  id: AnchorId;
  i: number;
  rect: DOMRect;
  x: number;
  y: number;
  s: number;
}

/** Resolve the logo's target from the plates' current rects. Returns whether it is on screen. */
export function updateTarget(vw: number, vh: number): boolean {
  const { anchors } = sceneStore.getState();
  const motion = !reduced.matches;
  const glides = motion && wide.matches;
  stage.motion = motion;
  const mid = vh / 2;
  const scrollY = window.scrollY;

  const present: Placed[] = [];
  ROUTE.forEach((id, i) => {
    const el = anchors[id];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.height === 0) return; // hidden at this screen size (the footer's plate on phones)
    present.push({
      id,
      i,
      rect,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      s: rect.height / FRAME.h,
    });
  });
  if (present.length === 0) {
    target.visible = false;
    return false;
  }

  // full turns already made by glides before a station (keeps the yaw continuous)
  const turnsAt = (p: Placed) =>
    LINKS.slice(0, p.i).filter((l) => l === 'travel-wide' && glides).length;
  const place = (p: Placed) => {
    target.x = p.x;
    target.y = p.y;
    target.pxPerUnit = p.s;
    target.yaw = POSE[p.id].yaw + turnsAt(p) * TAU;
    target.pitch = POSE[p.id].pitch;
    target.station = p.id;
    target.settled = true;
  };

  let placed = false;
  for (let k = 0; k < present.length && !placed; k++) {
    const a = present[k];
    const b = present[k + 1];
    // a station's pass line: the centre line, or its own start if it begins above it
    const line = Math.min(mid, a.y + scrollY);
    if (!b || a.y >= line - 0.5) {
      place(a);
      placed = true;
      break;
    }
    if (b.y <= mid + 0.5) continue; // b has arrived too: look further on
    const link: Link = b.i === a.i + 1 ? LINKS[a.i] : 'cut';
    if (link === 'travel-wide' && glides) {
      const start = a.y + scrollY - line;
      const end = b.y + scrollY - mid;
      const st = smooth(clamp01((scrollY - start) / Math.max(1, end - start)));
      target.x = lerp(a.x, b.x, st);
      target.y = lerp(line, mid, st);
      // a little smaller while it crosses the page, so it passes the text lightly
      target.pxPerUnit = lerp(a.s, b.s, st) * (1 - 0.28 * Math.sin(Math.PI * st));
      target.yaw = lerp(POSE[a.id].yaw, POSE[b.id].yaw, st) + (turnsAt(a) + st) * TAU;
      target.pitch = lerp(POSE[a.id].pitch, POSE[b.id].pitch, st);
      target.station = st < 0.5 ? a.id : b.id;
      target.settled = false;
    } else {
      place(a.rect.bottom > 0 ? a : b);
    }
    placed = true;
  }
  if (!placed) place(present[present.length - 1]);

  target.climb =
    target.station === 'process' && target.settled && tracks.process
      ? tracks.process.progress
      : null;

  const halfW = (target.pxPerUnit * FRAME.w) / 2;
  const halfH = (target.pxPerUnit * FRAME.h) / 2;
  target.visible =
    target.x + halfW > 0 && target.x - halfW < vw && target.y + halfH > 0 && target.y - halfH < vh;
  return target.visible;
}
