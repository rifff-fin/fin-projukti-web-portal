# Fin Projukti website — project brief for Claude Code

Studio site for **Fin Projukti**, a BRAC University student-led startup in Dhaka (web, apps,
automation with n8n, AI). Slogan: "The end of manual limits. The beginning of AI growth."

Full specification: `docs/FIN_PROJUKTI_Website_Master_Plan.md` (read the relevant section before
starting a phase). **Current stage: `docs/STATUS.md`. Update it at the end of every piece of
work** (what changed, what's next, what's blocked, a dated log line) and commit it with the work.

## Creative direction — "Signal Path"

- Dark and precise (the SRS requires dark): void black, graphite, hairlines, a faint dot grid.
  **Orange (`--signal`, the logo's `#FF7A1B`) belongs to the signal only**: the logo, the node,
  the primary button, active states.
- The idea: "from the square to the circle". The logo is a path from a square foot (manual
  work) up three steps to a round node (AI growth). The signature is a **real-time 3D logo
  where a glowing node travels from the square to the circle**: it builds the logo in the
  hero, pulses up it while idle, and climbs it corner by corner in Process (four corners =
  four steps).
- Headlines have two voices: light Geist for the line, Instrument Serif italic for the accent.
  Copy marks the accent `*like this*`; render with `components/ui/Emph` (`\n` = line break).
  Mono labels (Geist Mono, uppercase, tracked) via `.eyebrow`.

## Stack

Vite 8, React 19 (`~19.3`: R3F 9.8 needs < 19.4), TypeScript `~6.0`, Tailwind v4, three +
@react-three/fiber 9 + drei 10, GSAP 3 (ScrollTrigger, SplitText) + `@gsap/react`, Lenis,
zustand (vanilla store), maath. No backend: the brief form posts to Web3Forms.

## Commands

- `npm run dev` — http://localhost:5180 (5173 is left to the LANGLOK project)
- `npm run typecheck`, `npm run lint`, `npm run build`
- `python scripts/check-logo.py` — checks the measured logo geometry against `public/finlogo.png`
- Deploy: Netlify builds `main` (`netlify.toml`). Work happens on branches; never push `main`
  without the user's go-ahead.
- Git here needs `git -c safe.directory=D:/finprojukti …` (the folder's owner SID differs).

## Architecture rules (do not break)

1. **One WebGL canvas**: fixed, full-viewport, transparent, behind the DOM (z 0). The page
   wrapper (`main` + footer) is z 1. A section that shows the logo keeps a transparent
   background. The page colour is on `html`; `body` is transparent, so backdrops portalled to
   `body` at a negative z-index sit behind the canvas (the hero's grid and glow).
2. **ScrollTrigger writes, `useFrame` reads.** Sections register DOM anchors (`useLogoAnchor`)
   and scroll tracks (`registerTrack`) in `store/scene.ts` without re-renders; the 3D reads
   rects and `trigger.progress` every frame and damps with `maath/easing`.
3. GSAP plugins are registered only in `lib/gsap.ts`. Every timeline uses `useGSAP()`.
   Responsive and reduced-motion variants use `gsap.matchMedia()` with queries from
   `lib/motion.ts` (`motionQuery()` / `reducedQuery()`), never a raw `prefers-reduced-motion`
   string: the Motion switch can override the OS. CSS uses `html[data-reduced]`.
4. Lenis drives the GSAP ticker; R3F runs `frameloop="never"` and is advanced from the same tick.
5. **All copy lives in `src/content/copy.ts`.** Unconfirmed facts carry `TODO(client)`.
6. All text is real DOM text. Canvases are `aria-hidden`.
7. The static layout is the reduced-motion and no-WebGL version. Enhance it; don't replace it.
8. **The logo geometry has one source: `src/brand/logoSpec.ts`** (measured from
   `public/finlogo.png`, 99.7% pixel agreement). The SVG mark, the favicon, the loader and the
   3D model are built from it. Never redraw the logo by eye.

## Design tokens (`src/styles/tokens.css`)

```
--void #0A0A0B  --carbon #111113  --graphite #1A1A1E  --line #26262B  --line-hi #3A3A40
--ash #8C8C93 (muted)  --bone #CFCFD2 (body)  --chalk #F4F4F2 (headings)
--signal #FF7A1B (logo orange)  --signal-hi #FF9A4D (small orange text)  --ember #FFF3E6 (node core)
```

Tailwind names: `bg-void`, `text-chalk`, `border-line`, `font-mono`, `ease-liquid`… Raw font
and ease tokens are `--ff-*` / `--ease-water-*` (they must not share names with Tailwind's
`--font-*` / `--ease-*`). Primary buttons are dark text on orange (white on orange fails
contrast). Square corners, 1 px hairlines.

## Never

- Purple-blue "AI gradients", neon, glassmorphism everywhere, floating blobs, heavy bloom.
- Text inside WebGL. Auto-playing audio.
- Invented statistics in new copy (the existing numbers are flagged `TODO(client)`).
- A second WebGL canvas.

## How to work in this repo

- After changes: `npm run typecheck` and `npm run lint`, then check the page in the browser at
  1440 × 900 and 390 × 844, with motion on and off. Then update `docs/STATUS.md` and commit.
- This dev PC has Windows *Animation effects* off, so its browsers report reduced motion; use
  the Motion switch (bottom-left on desktop, in the menu/footer on phones) to see the full
  version. The headless QA browser defaults to full motion, so check both.
- One section per file in `src/sections/`; 3D in `src/three/`; shared pieces in
  `src/components/` (`ui/` for primitives).
- **Mockups** (`components/mockups/`): drawn SVG UI, not screenshots. Build new ones from
  `kit.tsx` (tokens via `fill-*`/`stroke-*`, one orange accent); animate in
  `styles/mockups.css` with CSS only. An element's own style must be the finished still
  picture (reduced motion shows it). Re-export the PNGs in `docs/mockups/` if a scene changes.
- **Two pages**: `/` (`index.html` → `main.tsx` → `App`) and `/founder/` (`founder/index.html`
  → `founder.tsx` → `FounderApp`), both inputs in `vite.config.ts`. Shared links to home
  sections go through `lib/links.ts` (`link('#work')` → `/#work` off the home page). The
  founder page has no loader and no 3D canvas. Its facts come from abdullahalrifat.me.
- **GSAP and SVG dashes**: tween `stroke-dashoffset` with `attr: { 'stroke-dashoffset': v }`;
  as a CSS property GSAP rounds it to whole pixels (nothing moves on a `pathLength=1` path).
- **Fin NFC** (`sections/Nfc.tsx`): the card keeps its print design (round corners,
  Quicksand + Orbitron), unlike the square site. Prices and delivery terms stay off the site
  until the client confirms them.
