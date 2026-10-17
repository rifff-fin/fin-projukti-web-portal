# Fin Projukti website — current status

**Updated:** 17 Oct 2026 · **Branch:** `redesign-3d` (not merged or pushed; `main` = the live site)
**Stage:** Phases 0–3 done (new design, the real-time 3D logo, the scroll story). **Next: Phase 4, the loader and polish.**

> Keep this file current: update it at the end of every piece of work (what changed, what's
> next, what's blocked).

## What you see now (home page, top to bottom)

1. **Header**: the logo mark + "Fin Projukti", links, "Start a project". Clear over the hero,
   solid with a hairline after scrolling. Phones: a full-screen menu.
2. **Hero**: "The end of manual limits. *The beginning of AI growth.*", the lede, two buttons,
   and the **live 3D logo**. On first sight the square foot rises and lights up, then a white-hot
   node leaves it and lays the path behind it, step by step; at the top the ball forms around the
   node, flashes and sends out a ring of light. Then a pulse runs from the square to the circle
   every few seconds (hovering "Automate my business" or "Start a project" sends one at once);
   the logo floats and turns a little towards the mouse.
3. **Tech band**: a slow strip of the stack.
4. **01 Process**: "From manual *to automatic.*" On wide screens the logo glides over from the
   hero with one full turn. Then the stage holds while you scroll and the **node climbs the logo
   corner by corner**: each of the four corners is a step (Discovery, Architecture, Engineering,
   Launch). The path behind the node stays lit, each corner lights as it is reached, and at
   "Launch & Scale" the node runs on to the ball, which flares. Phones: the logo on top, the
   current step below with four progress bars.
5. **02 Services**: five rows that open to show the details and the stack.
6. **03 Selected work**: filters (All, Websites, Full-stack apps, Automation & AI), six cards,
   then "Show all".
7. **04 About**: the BRACU story, প্রযুক্তি, three values, the numbers.
8. **05 Contact**: the brief form (checks as you go, spam trap, sends to Web3Forms; after
   sending, "Continue on WhatsApp" with a prefilled message) and the direct lines.
9. **Footer**: "Got a project *in mind?*" with the 3D logo (desktop; the button sends a pulse
   up it), site map, socials.

## Done

| Phase | What |
|---|---|
| Repo check | Local was 7 commits behind GitHub; fast-forwarded to `e6a68e4` (nothing lost). |
| 0 Setup | Stack upgraded to the LANGLOK versions; framer-motion, react-icons, lucide and svgr removed; ESLint + Prettier; design tokens; fonts; all copy in `copy.ts`; `CLAUDE.md`; this file. |
| 1 Skeleton | Every section rebuilt in the "Signal Path" design; the logo traced into exact geometry (`brand/logoSpec.ts`, 99.7% match) used by the SVG mark and favicon; Motion switch; scroll reveals; the contact flow from Phase 5 (validation, honeypot, WhatsApp follow-up). |
| 2 3D logo | Built from the same geometry (tubes + ball joints, rounded foot, end ball), satin orange with a clear coat, studio light panels; one shader drives the build, the node, the corner lights and the ball; halo and ring sprites instead of bloom. |
| 3 Scroll story | One canvas behind the page, stations (`hero`, `process`, `cta`), the hero → Process glide with a turn, the Process climb tied to scroll, pulses on button hover. Reduced motion: the complete logo, standing still. |

## Next

1. **Phase 4, the loader**: a small 2D logo whose trace fills as the page loads; the screen
   opens in a circle from the ball.
2. Phase 6: SEO (Open Graph image, structured data, sitemap), a Lighthouse pass, README rewrite.
3. Phase 7: merge into `main` and launch (needs your go-ahead).

## Waiting on you (master plan §1.5)

- Dark site, permanently (as the SRS says)? Or light like LANGLOK?
- Are the numbers real (50+ solutions, 30+ businesses, project metrics like "3× revenue")?
- The four projects without links: client work under NDA, or concepts?
- An original logo file (SVG/AI), if one exists.
- Two phone numbers (+880 1701-004480 for calls, +880 1743-666004 for WhatsApp): both right?
- "Est. 2024": correct?

## Good to know

- **Windows "Animation effects" off = reduced motion.** This PC's browsers ask for reduced
  motion, so the site shows its calm version. Use the **Motion** switch (bottom-left on
  desktop) to see the full version.
- Dev server: http://localhost:5180 (5173 is the LANGLOK project).
- Git needs `git -c safe.directory=D:/finprojukti …` on this machine.

## How to run and check

```bash
npm install
npm run dev                         # http://localhost:5180
npm run typecheck && npm run lint
python scripts/check-logo.py        # logo geometry vs public/finlogo.png
```

## Log

- **17 Oct 2026**: Compared local and GitHub (7 behind), pulled. Wrote the master plan. Phase 0
  (stack, tooling, tokens, copy) and Phase 1 (all sections in the new design, exact logo
  geometry, Motion switch, contact flow) on `redesign-3d`. Checked at 1440 × 900 and 390 × 844:
  no console errors, no sideways scroll.
- **17 Oct 2026**: Phases 2–3. The real-time 3D logo (built from `logoSpec.ts`), the node's
  build, heartbeat and climb, the glide from the hero to Process, the footer station. Checked
  at 1440 × 900 and 390 × 844 with motion on and off: no console errors, no sideways scroll.
