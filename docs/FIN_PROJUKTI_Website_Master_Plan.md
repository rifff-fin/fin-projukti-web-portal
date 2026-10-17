# Fin Projukti — Website Master Plan

**Version:** 1.0 · **Date:** 17 Oct 2026 · **Branch:** `redesign-3d`
**Live site:** https://finprojukti.tech (Netlify, builds `main`)
**Repo:** https://github.com/rifff-fin/fin-projukti-web-portal

This is the full plan for rebuilding the Fin Projukti website to the same standard and the
same way of working as the LANGLOK site: a written plan, phases with clear "done" checks, a
`docs/STATUS.md` updated after every piece of work, and a `CLAUDE.md` that holds the rules.

---

## 0. TL;DR

- **Repo check (17 Oct 2026).** The local copy was **7 commits behind** GitHub (README rewrite,
  new logo PNG, deleted `finprojukti.txt` and `.kombai/resources`). No local-only work existed,
  so it was fast-forwarded to `e6a68e4`. They are now identical; the redesign lives on
  `redesign-3d`.
- **The idea: "From the square to the circle."** The logo is a signal path: it starts at a
  square foot (the manual, boxed-in way of working), climbs three steps, and ends in a round
  node (AI growth). The site turns that into its signature: a **real-time 3D logo** where a
  glowing **node travels from the square to the circle**, lays the path as it goes and lights
  the circle when it arrives. This matches the slogan word for word:
  *The end of manual limits → the beginning of AI growth.*
- **Where the 3D logo appears.**
  1. Hero: the node builds the logo, then keeps sending a pulse up the path every few seconds.
  2. Process: scroll moves the node corner by corner. The **four corners are the four steps**
     (Discovery, Architecture, Engineering, Launch); it reaches the circle at "Launch & Scale".
  3. Footer call to action: hovering "Start a project" fires a pulse.
- **Look: "Signal Path".** Dark and precise, as the SRS requires (black, grey, one orange).
  Hairlines, a faint engineering grid, two-voice headlines and mono labels. Orange is only
  for the signal: the logo, the node, active states and the main button.
- **Stack: the LANGLOK stack.** Vite, React 19, TypeScript, Tailwind v4, three.js with
  React Three Fiber and drei, GSAP (ScrollTrigger, SplitText), Lenis and zustand.
  framer-motion is removed, so the site runs on one animation clock.

---

## 1. Audit — what's in the repo

### 1.1 Local vs GitHub

| | Local (before) | GitHub `main` |
|---|---|---|
| Head | `ee4b177 wordupdate` | `e6a68e4 Update README.md` |
| `public/finlogo.png` | old round orange logo (955 KB) | **new stepped-path logo** (500×500, 25 KB) |
| `README.md` | 1 line | long README (see 1.3) |
| `finprojukti.txt`, `.kombai/resources/*` | present | deleted |

Pulled with `git pull --ff-only`. Nothing was lost.

### 1.2 What the current site is

One page, React 19 + Vite + Tailwind v4 + framer-motion. Sections: Navbar, Hero, TechMarquee,
Services (5), SelectedWork (10 projects), Process (4 steps), DNA (about + 3 values),
Contact (Web3Forms), Footer.

Problems to fix:

1. **The new logo is barely used.** The header shows it as a 36 px rounded avatar with an
   orange glow, and the favicon is still a generated "F" in a circle.
2. **Everything is inline styles** (about 2,500 lines across 9 files), with hover effects done
   in `onMouseEnter` handlers. That makes it hard to restyle and impossible to theme.
3. **Copy is scattered** through the components, with no single source.
4. **Motion is generic**: fade-ups, a scanning line, a pulsing radial glow and counters. It
   looks like a template, not a studio.
5. **No reduced-motion support.** This matters on the dev PC: it has Windows animation
   effects off, so browsers report reduced motion (the LANGLOK lesson). The site needs a
   Motion switch.
6. Footer LinkedIn and GitHub links are `#`, even though the real URLs exist in `Contact.tsx`.
7. No SEO beyond a title and description: no Open Graph image, no structured data, no
   sitemap and no robots.txt.
8. `dist/` exists locally (gitignored, fine), and `img/` is an empty folder.

### 1.3 The README describes a different product

The new README lists features the code doesn't have: Redux, Axios, JWT auth, a dashboard,
payments (Stripe/bKash), i18n and an API. **It will be rewritten** to describe the real site,
how to run it and how to deploy it.

### 1.4 Brand facts pulled from the assets

- **Logo colour:** `#FF7A1B` (sampled from `finlogo.png`; 13,499 of 24,707 pixels are exactly
  this). The SRS says `#FF6600`; the logo is the newer source, so the site uses `#FF7A1B`.
- **Logo geometry** (500×500 px canvas, y down, pixel-edge coordinates), fitted to the PNG
  by `scripts/check-logo.py` (99.7% of pixels agree):
  - stroke 42 px wide with **round joins**: outer corners are arcs of radius 21 around each
    vertex, inner corners are sharp;
  - centreline `(151.5,415) → (151.5,307.5) → (247,307.5) → (247,201.5) → (342.5,201.5) →
    (342.5,95.5)`;
  - circle node: centre `(342.5,95.5)`, r 31.5;
  - square foot: `x 126–177, y 391–439` (51 × 48), corner radius 8;
  - bounding box `x 126–374, y 64–439` (248 × 375).
  - Segment lengths 107.5 / 95.5 / 106 / 95.5 / 106, total 510.5 px. The corners sit at
    21.1% / 39.8% / 60.5% / 79.2% of the path's length, which the Process section uses.
- **Name:** Fin Projukti (প্রযুক্তি = "technology" in Bangla). "Fin" = finishing the era of
  manual work.
- **Slogan:** "The End of Manual Limits. The Beginning of AI Growth."
- **Positioning:** a BRAC University student-led studio for web, apps, automation and AI.

### 1.5 Things to confirm (open questions)

1. **Dark, permanently?** The SRS (§4.1) says dark is the default and only theme. The plan
   follows that. Say if you'd rather have a light site like LANGLOK.
2. **Numbers.** "50+ solutions shipped", "30+ businesses scaled", "100% secure architecture",
   and project metrics like "3× revenue growth" and "80% less manual work". Are they real and
   checkable? Until confirmed they stay as they are, marked `TODO(client)` in `copy.ts`.
3. **Unlinked projects.** E-Commerce Evolution, Digital Inventory System, Smart POS and
   Restaurant QR have no link. Are they client work under NDA, or concepts? Concepts should
   be labelled as such.
4. **Master logo file.** Is there an original SVG or AI file? Until then the site uses an SVG
   traced from `finlogo.png` (checked by pixel overlay, §3.1).
5. **Two phone numbers.** `tel:+8801701004480` and WhatsApp `8801743666004`. Are both right?
6. **"Est. 2024"**: correct?
7. **Domain:** finprojukti.tech (README links both it and finprojukti.netlify.app).
8. **Bangla version** (the README mentions it). Out of scope for this rebuild; the copy file
   makes it easy to add later.

---

## 2. Creative direction — "Signal Path"

### 2.1 The idea in one line

> Every business starts as a square: boxed in by manual work. We build the path that takes it,
> step by step, to the circle.

The node is the client's business, or their data, or a signal. The path is our process. The
circle is the outcome. The same picture is the logo, the hero, the Process section and the
loading screen.

### 2.2 How it avoids looking like every other "AI agency" site

- **One colour of light.** Orange belongs to the signal only. No purple-blue gradients, no
  neon, no rainbow meshes.
- **Engineering, not sci-fi.** Hairline rules, a faint 8 px dot grid, mono numbering
  (`01 / 04`), a precise grid layout. The look of a circuit board's silkscreen, not a game.
- **Real 3D with studio lighting.** The logo is a lit object with soft reflections and depth,
  not a glowing wireframe.
- **Motion with meaning.** Things move because the signal moves. Nothing floats around just
  to fill space.

### 2.3 Signature moments

1. **The build (hero, on load).** The square foot appears, then the node leaves it and lays
   the path behind it, step by step. It reaches the top, the circle forms around it and
   lights up with a soft ring of light.
2. **The heartbeat (hero, idle).** Every 7 s a pulse runs from the square to the circle, and
   the circle answers with a short flare. The logo floats slightly and turns a little towards
   the mouse pointer.
3. **The journey (scroll, hero → Process).** On wide screens the logo glides from the hero's
   right column to the Process section's left column with one full turn, staying on the
   screen's centre line while the page scrolls under it (the LANGLOK `travel`).
4. **The climb (Process).** Scroll moves the node up the path. Each corner lights up as its
   step becomes active, and the circle lights up at "Launch & Scale".
5. **The signal on demand.** Hovering or focusing the main buttons fires a pulse.
6. **The loader.** A small 2D version of the logo: a thin trace fills along the path as the
   page loads, the node reaches the circle, and the screen opens in a circle from that point.

### 2.4 Anti-patterns (never)

- Light leaks, lens flares, heavy bloom, particles drifting everywhere, floating blobs.
- Glassmorphism on everything (only the header gets a subtle blur, and only after scrolling).
- Text inside WebGL. Auto-playing sound.
- Redrawing or "improving" the logo. The 3D model is built from the measured geometry.
- Invented statistics in new copy.
- Scroll-jacking that fights the user: Lenis lerp stays light, and touch scrolling is native.

---

## 3. The logo in 3D

### 3.1 Vector logo (the 2D source)

`src/components/Logo.tsx` and `public/favicon.svg` use the measured geometry:

```svg
<svg viewBox="0 0 500 500">
  <path d="M151.5 404V307.5H247V201.5H342.5V95.5" fill="none" stroke="#FF7A1B"
        stroke-width="42" stroke-linejoin="round"/>
  <circle cx="342.5" cy="95.5" r="31.5" fill="#FF7A1B"/>
  <rect x="126" y="391" width="51" height="48" rx="8" fill="#FF7A1B"/>
</svg>
```

`scripts/check-logo.py` rasterises it and compares it with `finlogo.png`. It must match to
within anti-aliasing (≥ 99% of pixels agree; currently 99.7%). Header and footer use a cropped viewBox
(`126 64 248 375`).

### 3.2 Construction (`src/three/logoGeometry.ts`)

Units: 100 px = 1 unit, centred on the bounding box, y up.

| Part | Geometry | Size (units) |
|---|---|---|
| Path | five open cylinders between the vertices, plus a sphere at each of the four corners (a 3D round join) | radius 0.21 |
| Circle node | sphere | radius 0.315 |
| Square foot | rounded box | 0.51 × 0.48 × 0.51, radius 0.08 |

Viewed from the front, cylinders with sphere joints give exactly the 2D outline: round outer
corners and sharp inner ones. Turned, it reads as a solid conduit with ball joints, ending in
a block and a ball.

Every vertex gets an `aArc` attribute: the position (0–1) along the path of the nearest
centreline point. One number drives the build, the pulse and the corner lights for all three
meshes.

### 3.3 Material and light

- **Material:** `MeshPhysicalMaterial`, colour `#FF7A1B`, roughness 0.3, clearcoat 0.6,
  metalness 0. That reads as satin ceramic or anodised paint, which looks premium on dark.
  One material instance is shared by the three meshes.
- **Shader additions** (`onBeforeCompile`, uniforms only, no re-compiles):
  - `uDraw`: fragments with `aArc > uDraw` are discarded (the build).
  - `uHead`, `uHeadGlow`: a hot white band (`#FFF3E6`) at the node, with an orange tail that
    fades over about 15% of the path behind it.
  - `uCorner[4]`: the corners glow when the node is resting on them (Process).
  - `uCircle`: the circle's glow (arrival flare, then a soft "on" level).
- **The node itself:** an additive halo sprite (a radial gradient made in a canvas, so no image
  file) plus a warm point light that rides with the node and catches the nearby surfaces.
  The arrival flare is a thin ring that expands from the circle and fades.
- **Studio lighting** (`src/three/Lighting.tsx`): drei `Environment` built from
  `Lightformer`s (a soft key strip, a top light, a cool rim behind; no HDR file to download)
  plus one directional key light. The page is dark, so the rim light is what draws the
  silhouette.
- **Tone mapping:** `NeutralToneMapping`, so the orange stays the brand orange.

### 3.4 Timeline (full motion)

| t (s) | What happens |
|---|---|
| 0.0–0.5 | The foot rises 0.15 units and fades in. |
| 0.4–2.2 | The node leaves the foot and lays the path (`uDraw` = `uHead`, `power2.inOut`). |
| 2.2–2.7 | The circle forms around the node (scale 0.4 → 1, `expo.out`), flares and sends out a ring. |
| 2.7 → | Idle: floats ±0.04 units, sways ±5°, tilts towards the pointer. A pulse runs every 7 s (1.4 s per run). |

The build waits for the loader to lift.

### 3.5 Scroll states

- **Hero station** (`hero`): the right column on desktop; on phones, above the headline.
  Turned 3/4 (yaw −28°, pitch 8°).
- **Travel to Process** (wide screens only): the logo stays on the centre line, glides across,
  turns once, and lands facing almost front (yaw −14°) so the node is easy to follow.
- **Process station** (`process`): a plate in a CSS-sticky stage (a tall track holds the
  stage; no GSAP pin). Track progress drives the node through four holds, one at each corner,
  then to the circle; the path behind the node stays lit. Idle pulses stop here, because
  scroll owns the node.
- **CTA station** (`cta`, footer): smaller, the circle on; button hover fires a pulse.
- Between Process and CTA the logo **cuts** while off screen.

### 3.6 Reduced motion and no WebGL

- **Reduced motion** (OS setting or the Motion switch off): the logo is shown complete, with
  the circle lit. No build, no pulses, no float or pointer tilt, no travel (only cuts).
  Process becomes a plain list of the four steps beside the complete logo (nothing is held
  on screen).
- **No WebGL:** every station shows the flat SVG logo, and Process highlights the corners
  in 2D.

### 3.7 Performance

- One canvas. `frameloop="never"`, advanced from the GSAP ticker only while the logo is on
  screen (plus one frame to clear).
- `dpr [1, 1.75]` with `PerformanceMonitor` dropping to 1.25.
- No postprocessing: the glow is emissive colour plus an additive sprite.
- The 3D chunk (three, R3F, drei) loads lazily at idle, or immediately under the loader.

---

## 4. Design system

### 4.1 Colour tokens (`src/styles/tokens.css`)

```
--void      #0A0A0B   page
--carbon    #111113   raised surface (cards, form)
--graphite  #1A1A1E   hover surface, chips
--line      #26262B   hairlines
--line-hi   #3A3A40   strong hairline, input borders
--ash       #8C8C93   muted text (≥ 4.5:1 on --void)
--bone      #CFCFD2   body text  (SRS grey)
--chalk     #F4F4F2   headings
--signal    #FF7A1B   the logo orange: logo, node, buttons, active states
--signal-hi #FF9A4D   orange for small text and links on dark
--ember     #FFF3E6   the node's hot core (3D only)
--ok #3FB97A   --error #F2555A
```

### 4.2 Type (Google Fonts)

- **Geist** (300–600): headlines in light 300, UI and body in 400.
- **Instrument Serif** italic: the second voice in headlines (`*like this*` in the copy,
  rendered by `Emph`).
- **Geist Mono** (400–500): eyebrows, numbers, tags, labels; uppercase, tracked 0.14em.
- **Noto Sans Bengali**: the single প্রযুক্তি accent in About.

Fluid sizes: `--text-hero clamp(2.75rem, 6.4vw, 6.25rem)`, `--text-display`, `--text-h2`,
`--text-h3`, body 1rem/1.65.

### 4.3 Layout

- Max width 88rem, 12-column grid, gutter `clamp(1rem, 4vw, 3rem)`.
- Sections start with a **chapter head**: a hairline, then `01 / 06 — Process` in mono.
- Cards are square-cornered, with 1 px hairline borders that turn orange on hover or focus.

### 4.4 Motion

- Eases: `power2.out` (UI), `expo.out` (reveals), `sine.inOut` (idle). No bounce.
- UI 200–300 ms; reveals 800–1100 ms; headlines rise line by line from masks (SplitText).
- Respect reduced motion everywhere through `lib/motion.ts`; never write a raw
  `prefers-reduced-motion` query.

---

## 5. Site map and sections

One page (`/`), anchors for navigation. Order:

| # | Section | Anchor | Notes |
|---|---|---|---|
| 0 | Loader | — | §2.3 (6); home page only, 1–3 s |
| 1 | Hero | `#top` | headline, sub, two buttons, 3D logo (station `hero`), meta line |
| 2 | Tech marquee | — | mono, separators are tiny square→circle glyphs, pauses on hover |
| 3 | Process | `#process` | "From manual to *automatic.*" sticky 3D logo + 4 steps |
| 4 | Services | `#services` | 5 services as an index list; a row opens to show details and tags |
| 5 | Work | `#work` | filter chips (All / Web / MERN / Automation & AI), 6 cards then "Show all" |
| 6 | About | `#about` | "From BRACU to *big tech.*" story, the meaning of "Fin", 3 values, stats |
| 7 | Contact | `#contact` | brief form + direct lines |
| 8 | Footer | — | "Got a project *in mind?*" + 3D logo (station `cta`), links, socials |

Header: mark + "Fin Projukti", links (Process, Services, Work, About), "Start a project".
Transparent over the hero; after 40 px of scroll it gets a solid `--void` background with a
blur and a bottom hairline. Mobile: a full-screen menu with large links. Bottom-left: the
Motion switch.

### 5.1 Section specs

- **Hero:** eyebrow `BRAC University student-led studio · Dhaka · Est. 2024`; H1
  "The end of manual limits. *The beginning of AI growth.*"; sub (the current text);
  buttons "Automate my business" (primary; hover fires a pulse) and "See our work". Stats
  move to About. Bottom-left: a mono scroll hint.
- **Process:** chapter head `01 — Process`, title, intro line. Desktop: sticky logo plate on
  the left (5 columns), steps on the right (7 columns), each about 70 svh tall; the active
  step is chalk, the others ash, with a corner index `■ → ●`. Phones: the plate sticks at
  the top (40 svh) and the steps scroll under it.
- **Services:** 5 rows: number, title, short line, and an arrow. Clicking opens the row (an
  accessible disclosure); hover draws an orange trace along the row's top hairline. Opened:
  description and tags.
- **Work:** cards with category, year, title, description, a metric (flagged), tags, and
  links (Live ↗ / Code ↗). Cards without links get a "Case study on request" note.
- **About:** two-column story, "Fin = finish" callout, three value cards, stats row
  (TODO(client)).
- **Contact:** left: title, response promise, direct lines (email, phone, WhatsApp, location),
  socials. Right: the form (§7).
- **Footer:** big CTA with the logo, three link columns, socials, copyright line.

---

## 6. Tech stack and architecture

### 6.1 Stack (the versions LANGLOK runs on this machine)

`react ~19.3.1` (R3F 9.8 needs < 19.4), `three ^0.186.1`, `@react-three/fiber ^9.8.2`,
`@react-three/drei ^10.7.9`, `gsap ^3.15.0`, `@gsap/react ^2.1.2`, `lenis ^1.3.27`,
`zustand ^5.0.15`, `maath ^0.10.8`; dev: `vite ^8.3.4`, `@vitejs/plugin-react ^6.1.2`,
`tailwindcss` + `@tailwindcss/vite ^4.3.3`, `typescript ~6.0.3`, ESLint 10 +
typescript-eslint, Prettier.

Removed: `framer-motion`, `react-icons`, `lucide-react`, `vite-plugin-svgr` (icons become a
small `components/icons.tsx`).

No backend: the form posts to Web3Forms, as it does now.

### 6.2 Architecture rules (from LANGLOK)

1. **One WebGL canvas**: fixed, full screen, transparent, behind the DOM (z 0; `main` and the
   footer at z 1).
2. **ScrollTrigger writes, `useFrame` reads.** Sections register anchors and progress
   triggers in a vanilla zustand store (`store/scene.ts`) without React re-renders; the 3D
   reads them every frame and damps with `maath/easing`.
3. GSAP plugins are registered once in `lib/gsap.ts`. Every timeline uses `useGSAP()`.
   Responsive and reduced-motion variants use `gsap.matchMedia()` with queries from
   `lib/motion.ts`.
4. Lenis drives the GSAP ticker; R3F is `advance()`d from the same tick (one clock).
5. **All copy lives in `src/content/copy.ts`.**
6. All text is real DOM text. Canvases are `aria-hidden`.
7. The static layout is the reduced-motion and no-WebGL version. Enhance it; never replace it.

### 6.3 Folder structure

```
src/
  main.tsx  App.tsx
  content/copy.ts            all text, links, projects
  styles/tokens.css  globals.css
  lib/gsap.ts  motion.ts  lenis.tsx  webgl.ts  preloader.ts  pulse.ts
  hooks/useReducedMotion.ts  useReveals.ts  useLogoAnchor.ts
  store/scene.ts             anchors, progress triggers, pulse requests
  components/Header.tsx  Footer.tsx  Logo.tsx  LogoPlate.tsx  MotionSwitch.tsx
             SceneHost.tsx  icons.tsx  ui/(Button, ChapterHead, Container, Emph, Eyebrow)
  sections/Hero.tsx  TechMarquee.tsx  Process.tsx  Services.tsx  Work.tsx  About.tsx  Contact.tsx
  three/Scene.tsx  Lighting.tsx  LogoModel.tsx  logoGeometry.ts  logoMaterial.ts
        stations.ts  halo.ts
docs/  FIN_PROJUKTI_Website_Master_Plan.md  STATUS.md
scripts/check-logo.py
```

---

## 7. Contact flow

- Fields: name*, email*, company, services (multi-select chips), budget (chips: ৳5k–10k /
  ৳10k–25k / ৳25k–50k / ৳50k+), details*.
- Validation: native constraints plus inline messages on blur, with `aria-invalid` and
  `aria-describedby`.
- Spam: a hidden honeypot field (`botcheck`, which Web3Forms supports) and a minimum time
  on the form.
- Submit: POST to Web3Forms (the current key). States: sending → sent → error, announced in an
  `aria-live` region.
- **After sending** (SRS §3.5): a success panel with "Continue on WhatsApp", which opens
  `wa.me/8801743666004` with a prefilled message containing the brief summary. It is a
  button the visitor clicks, not an automatic redirect, since browsers block pop-ups that
  happen without a click.

---

## 8. Performance, accessibility and SEO

- **Budgets:** LCP < 2.5 s (the hero headline is text); initial JS < 160 KB gz, not counting
  the lazy 3D chunk; 3D at 60 fps on desktop and ≥ 40 fps on a mid-range Android;
  Lighthouse ≥ 90 in every category.
- **Accessibility:** skip link; visible focus rings (`--signal-hi`); every interactive element
  works from the keyboard; colour contrast AA; reduced motion respected; the Motion switch
  labelled; `aria-hidden` canvas.
- **SEO:** title and description, canonical, Open Graph and Twitter cards with a 1200×630
  image (rendered from the 3D logo), `Organization` JSON-LD, `robots.txt`, `sitemap.xml`,
  favicon SVG plus a 180 px apple-touch-icon.

---

## 9. Build phases

Each phase ends with: `npm run typecheck`, `npm run lint`, `npm run build`, a browser check
at 1440×900 and 390×844 with motion on and off, a `docs/STATUS.md` update, and a commit
on `redesign-3d`.

| Phase | What | Done when |
|---|---|---|
| **0 Setup** | Upgrade the stack, remove old libraries, add ESLint/Prettier, tokens, fonts, `copy.ts`, `CLAUDE.md`, `STATUS.md`, `netlify.toml` | dev server runs; the old site still renders on the new stack |
| **1 Skeleton** | Every section rebuilt in the new design as a static, responsive layout; the SVG logo; header, footer, Motion switch; reveals | the site is complete without any 3D, and fine with reduced motion |
| **2 3D logo** | Geometry, material, lighting, node, build, heartbeat, arrival flare, pointer tilt; hero station; flat-SVG fallback | the hero shows the 3D logo built by the node, at 60 fps |
| **3 Scroll story** | Lenis, stations, hero → Process travel, Process climb, CTA station, pulse on button hover | the node climbs with scroll and lands on each corner in step with the text |
| **4 Loader and polish** | The loader, marquee, services rows, work filters, micro-interactions | the first load feels intentional; every hover and focus state is designed |
| **5 Contact** | Validation, honeypot, states, WhatsApp follow-up | a test brief arrives; errors are clear |
| **6 SEO, performance, accessibility** | Meta, OG image, JSON-LD, sitemap, robots, icons, a Lighthouse pass, README rewrite | Lighthouse ≥ 90 ×4; budgets met |
| **7 Launch** | Merge into `main` → Netlify; check the live domain | live on finprojukti.tech (needs your go-ahead) |

---

## 10. References

- LANGLOK website (`D:\langlok`): the process, architecture rules and code patterns reused
  here (`lib/motion.ts`, `lib/lenis.tsx`, `SceneHost`, the station router, `useReveals`, the
  preloader).
- `srs.txt`: the original requirements (colours, dark mode, sections, the WhatsApp redirect,
  performance).
- three.js `TubeGeometry` / `CylinderGeometry` / `RoundedBoxGeometry`; drei `Environment` +
  `Lightformer`; GSAP ScrollTrigger and SplitText (free since GSAP 3.13).
