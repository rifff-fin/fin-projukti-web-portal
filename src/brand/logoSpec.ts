/**
 * The Fin Projukti logo, measured from public/finlogo.png (500 x 500 px, y down, pixel-edge
 * coordinates) and checked by scripts/check-logo.py (99.7% of pixels agree). The SVG logo
 * (components/Logo.tsx), the loader and the 3D model (three/logoGeometry.ts) are all built
 * from these numbers, so they can never drift apart. Keep scripts/check-logo.py in step.
 *
 * Shape: a stroke with round joins (outer corners round, inner corners sharp) that starts in
 * a square foot, climbs three steps and ends in a round node.
 */
export const LOGO_COLOR = '#FF7A1B';

/** Centreline from the foot's centre to the circle's centre. */
export const LOGO_PATH: readonly (readonly [number, number])[] = [
  [151.5, 415],
  [151.5, 307.5],
  [247, 307.5],
  [247, 201.5],
  [342.5, 201.5],
  [342.5, 95.5],
];

export const LOGO_STROKE = 42;
export const LOGO_CIRCLE = { cx: 342.5, cy: 95.5, r: 31.5 } as const;
export const LOGO_FOOT = { x: 126, y: 391, w: 51, h: 48, r: 8 } as const;

/** Tight bounding box (for cropped viewBoxes and centring the 3D model). */
export const LOGO_BOX = { x: 126, y: 64, w: 248, h: 375 } as const;

/** Arc-length position (0..1) of every vertex along the centreline. */
export const LOGO_ARCS: readonly number[] = (() => {
  const lens = LOGO_PATH.slice(1).map(([x, y], i) => {
    const [px, py] = LOGO_PATH[i];
    return Math.hypot(x - px, y - py);
  });
  const total = lens.reduce((a, b) => a + b, 0);
  let run = 0;
  return [0, ...lens.map((l) => (run += l) / total)];
})();

/** The four corners (milestones): Discovery, Architecture, Engineering, Launch. */
export const CORNER_ARCS = LOGO_ARCS.slice(1, 5);

/** SVG path data for the stroke; it starts inside the foot so the cap never shows. */
export const LOGO_STROKE_D = (() => {
  const [first, ...rest] = LOGO_PATH;
  return `M${first[0]} ${LOGO_FOOT.y + 13}` + rest.map(([x, y]) => `L${x} ${y}`).join('');
})();
