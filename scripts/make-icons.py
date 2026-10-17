"""
Render the PNG app icons from the measured logo geometry (the same numbers as
src/brand/logoSpec.ts and scripts/check-logo.py), so they never drift from the SVG mark.

    python scripts/make-icons.py      # writes public/apple-touch-icon.png and public/favicon-32.png
"""
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PATH = [(151.5, 415), (151.5, 307.5), (247, 307.5), (247, 201.5), (342.5, 201.5), (342.5, 95.5)]
STROKE = 42
CIRCLE = (342.5, 95.5, 31.5)
FOOT = (126, 391, 177, 439, 8)
BOX = (126, 64, 374, 439)  # tight bounding box
ORANGE = (255, 122, 27, 255)
VOID = (10, 10, 11, 255)


def icon(size, pad=0.2, radius=0.0, ss=8):
    s = size * ss
    im = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, s - 1, s - 1], radius=int(s * radius), fill=VOID)
    bw, bh = BOX[2] - BOX[0], BOX[3] - BOX[1]
    k = s * (1 - 2 * pad) / bh
    ox = (s - bw * k) / 2 - BOX[0] * k
    oy = (s - bh * k) / 2 - BOX[1] * k
    P = lambda x, y: (ox + x * k, oy + y * k)
    h = STROKE / 2
    for (x0, y0), (x1, y1) in zip(PATH, PATH[1:]):
        a, b = P(min(x0, x1) - (h if x0 == x1 else 0), min(y0, y1) - (h if y0 == y1 else 0)), P(
            max(x0, x1) + (h if x0 == x1 else 0), max(y0, y1) + (h if y0 == y1 else 0))
        d.rectangle([a, b], fill=ORANGE)
    for x, y in PATH[1:-1]:
        d.ellipse([P(x - h, y - h), P(x + h, y + h)], fill=ORANGE)
    cx, cy, r = CIRCLE
    d.ellipse([P(cx - r, cy - r), P(cx + r, cy + r)], fill=ORANGE)
    x0, y0, x1, y1, rr = FOOT
    d.rounded_rectangle([P(x0, y0), P(x1, y1)], radius=rr * k, fill=ORANGE)
    return im.resize((size, size), Image.LANCZOS)


if __name__ == '__main__':
    icon(180, pad=0.19).save(ROOT / 'public/apple-touch-icon.png', optimize=True)
    icon(32, pad=0.1, radius=0.19).save(ROOT / 'public/favicon-32.png', optimize=True)
    icon(512, pad=0.2, radius=0.0).save(ROOT / 'public/icon-512.png', optimize=True)
    print('icons written')
