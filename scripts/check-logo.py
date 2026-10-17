"""
Check that the measured logo geometry (used by the SVG logo and the 3D model) matches
public/finlogo.png. Renders the geometry at 4x, downsamples, and compares coverage.

    python scripts/check-logo.py            # prints the agreement, exits 1 below 99%
    python scripts/check-logo.py --diff out.png   # also writes a red/green diff image
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent

# Must match src/three/logoGeometry.ts and src/components/Logo.tsx (500x500 px, y down,
# pixel-edge coordinates). Fitted to the PNG: IoU 0.9967 (17 Oct 2026).
PATH = [(151.5, 415), (151.5, 307.5), (247, 307.5), (247, 201.5), (342.5, 201.5), (342.5, 95.5)]
STROKE = 42
CIRCLE = (342.5, 95.5, 31.5)
FOOT = (126, 391, 177, 439, 8)  # x0, y0, x1, y1, corner radius


def render(scale=4):
    s = scale
    im = Image.new('L', (500 * s, 500 * s), 0)
    d = ImageDraw.Draw(im)
    h = STROKE / 2
    for (x0, y0), (x1, y1) in zip(PATH, PATH[1:]):
        if x0 == x1:  # vertical
            d.rectangle([(x0 - h) * s, min(y0, y1) * s, (x0 + h) * s, max(y0, y1) * s], fill=255)
        else:
            d.rectangle([min(x0, x1) * s, (y0 - h) * s, max(x0, x1) * s, (y0 + h) * s], fill=255)
    for x, y in PATH[1:-1]:  # round joins
        d.ellipse([(x - h) * s, (y - h) * s, (x + h) * s, (y + h) * s], fill=255)
    cx, cy, r = CIRCLE
    d.ellipse([(cx - r) * s, (cy - r) * s, (cx + r) * s, (cy + r) * s], fill=255)
    x0, y0, x1, y1, rr = FOOT
    d.rounded_rectangle([x0 * s, y0 * s, x1 * s, y1 * s], radius=rr * s, fill=255)
    return np.asarray(im.resize((500, 500), Image.LANCZOS)).astype(float) / 255


def main():
    ref = np.asarray(Image.open(ROOT / 'public/finlogo.png').convert('RGBA'))[..., 3] / 255
    ours = render()
    a, b = ref > 0.5, ours > 0.5
    union = (a | b).sum()
    agree = (a & b).sum() / union
    print(f'logo pixels: ref {a.sum()}, ours {b.sum()}, IoU {agree:.4f}')
    print(f'only in ref: {(a & ~b).sum()}, only in ours: {(b & ~a).sum()}')
    if '--diff' in sys.argv:
        out = sys.argv[sys.argv.index('--diff') + 1]
        rgb = np.zeros((500, 500, 3), np.uint8)
        rgb[a & b] = (90, 90, 90)
        rgb[a & ~b] = (255, 60, 60)  # missing from ours
        rgb[b & ~a] = (60, 255, 60)  # extra in ours
        Image.fromarray(rgb).resize((1000, 1000), Image.NEAREST).save(out)
        print('diff written to', out)
    sys.exit(0 if agree >= 0.99 else 1)


if __name__ == '__main__':
    main()
