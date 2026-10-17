# Fin Projukti — website

The studio website of **Fin Projukti**, a BRAC University student-led startup in Dhaka building
websites, apps, automations (n8n) and AI solutions.

**Live:** https://finprojukti.tech

> *The end of manual limits. The beginning of AI growth.*

The site's signature is a **real-time 3D version of the logo**. A glowing node travels from the
logo's square foot (manual work) up its steps to the round end (AI growth). It builds the logo
when the page opens, sends a pulse up it every few seconds, and climbs it corner by corner as you
scroll through the four-step process.

## Stack

- Vite 8, React 19, TypeScript, Tailwind CSS 4
- three.js with React Three Fiber and drei (one WebGL canvas, loaded lazily)
- GSAP (ScrollTrigger, SplitText) and Lenis smooth scrolling
- zustand for the scroll → 3D bridge
- The brief form posts to [Web3Forms](https://web3forms.com); no backend

## Run it

```bash
npm install
npm run dev          # http://localhost:5180
npm run build        # type-checks, then builds to dist/
npm run preview      # serves the build
npm run typecheck && npm run lint
```

Node 22 or newer.

## Where things are

```
src/
  content/copy.ts        every word on the site (edit text here)
  brand/logoSpec.ts      the logo's measured geometry (SVG mark, favicon, loader and 3D use it)
  brand/qr.ts            the QR code on the Fin NFC card preview (made by scripts/make-qr.py)
  sections/              one file per page section (Nfc.tsx = the Fin NFC Card)
  components/            header, footer, logo, logo plates (3D stations), Motion switch
  components/nfc/        the NFC card (front/back) and the phone profile it opens
  components/mockups/    the drawn UI mockups on Services and Work (one SVG scene each)
  three/                 the 3D logo: geometry, material, lighting, stations, scene
  lib/                   GSAP setup, Lenis, motion preference, loader
  styles/tokens.css      colours, type, spacing, easing
docs/
  FIN_PROJUKTI_Website_Master_Plan.md   the full plan
  STATUS.md                             what's done, what's next
  mockups/                              the mockups and the NFC card as PNGs (for posts, decks)
  reference/fin-nfc-card.png            the NFC card's print design
scripts/
  check-logo.py          checks logoSpec.ts against public/finlogo.png (Python + Pillow)
  make-icons.py          renders the PNG app icons from the same geometry
  make-qr.py             encodes the card preview's QR code (needs `pip install segno`)
```

## Motion and accessibility

The site respects the operating system's *reduced motion* setting. The **Motion** switch
(bottom-left on desktop, in the menu and footer on phones) lets visitors choose either way. With
reduced motion, the logo stands complete and nothing moves by itself. Without WebGL, the flat logo
is shown. All text is real HTML, and the 3D canvas is hidden from screen readers.

## Deploy

Netlify builds `main` with `npm run build` and publishes `dist/` (see `netlify.toml`).
