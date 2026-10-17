import { CanvasTexture, SRGBColorSpace } from 'three';

/**
 * Textures for the node's light, drawn once in a 2D canvas (no image files): a soft halo
 * (white-hot centre falling off through the logo orange) and a thin ring for the arrival
 * flare. Both are used on additive sprites, the cheap stand-in for bloom.
 */
function texture(size: number, draw: (ctx: CanvasRenderingContext2D, r: number) => void) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  draw(ctx, size / 2);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

export function haloTexture() {
  return texture(256, (ctx, r) => {
    const g = ctx.createRadialGradient(r, r, 0, r, r, r);
    g.addColorStop(0, 'rgba(255, 248, 238, 1)');
    g.addColorStop(0.08, 'rgba(255, 232, 205, 0.9)');
    g.addColorStop(0.22, 'rgba(255, 160, 80, 0.45)');
    g.addColorStop(0.5, 'rgba(255, 122, 27, 0.12)');
    g.addColorStop(1, 'rgba(255, 122, 27, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, r * 2, r * 2);
  });
}

export function ringTexture() {
  return texture(256, (ctx, r) => {
    const g = ctx.createRadialGradient(r, r, r * 0.78, r, r, r);
    g.addColorStop(0, 'rgba(255, 122, 27, 0)');
    g.addColorStop(0.55, 'rgba(255, 190, 130, 0.9)');
    g.addColorStop(0.7, 'rgba(255, 122, 27, 0.5)');
    g.addColorStop(1, 'rgba(255, 122, 27, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, r * 2, r * 2);
  });
}
