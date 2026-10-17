import { LOGO_BOX } from '../brand/logoSpec';

/** Scene units per logo pixel (the logo is 375 px tall → 3.75 units). */
export const UNIT = 1 / 100;

/**
 * The box a logo plate represents, in scene units: the logo (2.48 × 3.75) plus room for
 * its turn, float and glow. Plates use this aspect ratio; their height maps to FRAME.h.
 */
export const FRAME = { w: 3.4, h: 4.6 } as const;

/** The flat logo's height as a share of the plate (matches the 3D model's size). */
export const STILL_HEIGHT = (LOGO_BOX.h * UNIT) / FRAME.h;
