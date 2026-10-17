import { BufferAttribute, CylinderGeometry, SphereGeometry, type BufferGeometry } from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
  LOGO_ARCS,
  LOGO_BOX,
  LOGO_CIRCLE,
  LOGO_FOOT,
  LOGO_PATH,
  LOGO_STROKE,
} from '../brand/logoSpec';
import { UNIT } from './frame';

/**
 * The 3D logo, built from the measured 2D geometry (brand/logoSpec.ts). Units: 100 px = 1,
 * centred on the logo's bounding box, y up, the logo in the z = 0 plane.
 *
 * Path: open cylinders between the vertices plus a sphere at each corner. Seen from the
 * front that is exactly the 2D stroke with round joins (round outer corners, sharp inner
 * ones); turned, it reads as a solid conduit with ball joints. The foot is a rounded block,
 * the end a ball.
 *
 * Every vertex carries `aArc`, its position (0..1) along the centreline: one number drives
 * the build, the travelling node and the corner lights in the shader (logoMaterial.ts). The
 * foot is all 0 and the ball all 1, so they light up as wholes when the node is there.
 */

const CX = LOGO_BOX.x + LOGO_BOX.w / 2;
const CY = LOGO_BOX.y + LOGO_BOX.h / 2;

/** Logo px (y down) → scene units (y up, centred). */
export const toScene = (x: number, y: number): [number, number] => [
  (x - CX) * UNIT,
  -(y - CY) * UNIT,
];

export const VERTS = LOGO_PATH.map(([x, y]) => toScene(x, y));
export const TUBE_R = (LOGO_STROKE / 2) * UNIT;
export const BALL_R = LOGO_CIRCLE.r * UNIT;
export const FOOT = {
  w: LOGO_FOOT.w * UNIT,
  h: LOGO_FOOT.h * UNIT,
  d: LOGO_FOOT.w * UNIT,
  r: LOGO_FOOT.r * UNIT,
  center: toScene(LOGO_FOOT.x + LOGO_FOOT.w / 2, LOGO_FOOT.y + LOGO_FOOT.h / 2),
};
export const BALL_CENTER = toScene(LOGO_CIRCLE.cx, LOGO_CIRCLE.cy);

/** Point on the centreline at arc position `t` (0..1), in scene units. */
export function pointAt(t: number, out: { x: number; y: number }) {
  const a = Math.min(1, Math.max(0, t));
  let i = 1;
  while (i < LOGO_ARCS.length - 1 && LOGO_ARCS[i] < a) i++;
  const a0 = LOGO_ARCS[i - 1];
  const a1 = LOGO_ARCS[i];
  const k = a1 > a0 ? (a - a0) / (a1 - a0) : 0;
  out.x = VERTS[i - 1][0] + (VERTS[i][0] - VERTS[i - 1][0]) * k;
  out.y = VERTS[i - 1][1] + (VERTS[i][1] - VERTS[i - 1][1]) * k;
  return out;
}

/** Arc position (0..1) of the centreline point nearest to (x, y). */
function nearestArc(x: number, y: number) {
  let best = Infinity;
  let arc = 0;
  for (let i = 1; i < VERTS.length; i++) {
    const [ax, ay] = VERTS[i - 1];
    const [bx, by] = VERTS[i];
    const dx = bx - ax;
    const dy = by - ay;
    const len2 = dx * dx + dy * dy;
    const t = Math.min(1, Math.max(0, ((x - ax) * dx + (y - ay) * dy) / len2));
    const px = ax + dx * t - x;
    const py = ay + dy * t - y;
    const d = px * px + py * py;
    if (d < best - 1e-9) {
      best = d;
      arc = LOGO_ARCS[i - 1] + (LOGO_ARCS[i] - LOGO_ARCS[i - 1]) * t;
    }
  }
  return arc;
}

function withArc(geo: BufferGeometry, fixed?: number) {
  const pos = geo.getAttribute('position');
  const arc = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) {
    arc[i] = fixed ?? nearestArc(pos.getX(i), pos.getY(i));
  }
  geo.setAttribute('aArc', new BufferAttribute(arc, 1));
  return geo;
}

/** The climbing path: five tubes and four corner balls, one geometry. */
export function buildPath() {
  const parts: BufferGeometry[] = [];
  for (let i = 1; i < VERTS.length; i++) {
    const [ax, ay] = VERTS[i - 1];
    const [bx, by] = VERTS[i];
    const len = Math.hypot(bx - ax, by - ay);
    const tube = new CylinderGeometry(TUBE_R, TUBE_R, len, 48, 1, true);
    if (ay === by) tube.rotateZ(Math.PI / 2); // horizontal run
    tube.translate((ax + bx) / 2, (ay + by) / 2, 0);
    parts.push(tube);
  }
  for (let i = 1; i < VERTS.length - 1; i++) {
    const joint = new SphereGeometry(TUBE_R, 48, 32);
    joint.translate(VERTS[i][0], VERTS[i][1], 0);
    parts.push(joint);
  }
  const merged = mergeGeometries(parts.map((p) => withArc(p)));
  parts.forEach((p) => p.dispose());
  return merged;
}

/** The square foot (arc 0), centred on its own origin so it can rise and scale in place. */
export function buildFoot() {
  return withArc(new RoundedBoxGeometry(FOOT.w, FOOT.h, FOOT.d, 6, FOOT.r), 0);
}

/** The round end node (arc 1), centred on its own origin so it can grow in place. */
export function buildBall() {
  return withArc(new SphereGeometry(BALL_R, 64, 48), 1);
}
