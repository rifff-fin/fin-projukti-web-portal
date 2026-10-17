# Fin Projukti website — current status

**Updated:** 17 Oct 2026 · **Branch:** `redesign-3d` (not merged or pushed; `main` = the live site)
**Stage:** Phases 0 and 1 done (new stack and design, every section rebuilt). **Next: Phase 2, the 3D logo.**

> Keep this file current: update it at the end of every piece of work (what changed, what's
> next, what's blocked).

## What you see now (home page, top to bottom)

1. **Header**: the logo mark + "Fin Projukti", links, "Start a project". Clear over the hero,
   solid with a hairline after scrolling. Phones: a full-screen menu.
2. **Hero**: "The end of manual limits. *The beginning of AI growth.*", the lede, two buttons;
   the logo (flat for now; the 3D logo replaces it in Phase 2) on a faint grid with a warm glow.
3. **Tech band**: a slow strip of the stack.
4. **01 Process**: "From manual *to automatic.*" The steps are held on screen while you scroll,
   and the current step lights up (the 3D node will climb the logo here in Phase 3).
5. **02 Services**: five rows that open to show the details and the stack.
6. **03 Selected work**: filters (All, Websites, Full-stack apps, Automation & AI), six cards,
   then "Show all".
7. **04 About**: the BRACU story, প্রযুক্তি, three values, the numbers.
8. **05 Contact**: the brief form (checks as you go, spam trap, sends to Web3Forms; after
   sending, "Continue on WhatsApp" with a prefilled message) and the direct lines.
9. **Footer**: "Got a project *in mind?*" with the logo, site map, socials.

## Done

| Phase | What |
|---|---|
| Repo check | Local was 7 commits behind GitHub; fast-forwarded to `e6a68e4` (nothing lost). |
| 0 Setup | Stack upgraded to the LANGLOK versions; framer-motion, react-icons, lucide and svgr removed; ESLint + Prettier; design tokens; fonts; all copy in `copy.ts`; `CLAUDE.md`; this file. |
| 1 Skeleton | Every section rebuilt in the "Signal Path" design; the logo traced into exact geometry (`brand/logoSpec.ts`, 99.7% match) used by the SVG mark and favicon; Motion switch; scroll reveals; the contact flow from Phase 5 (validation, honeypot, WhatsApp follow-up). |

## Next

1. **Phase 2, the 3D logo**: geometry from `logoSpec.ts`, material, lighting, the node, the
   build, the heartbeat, pointer tilt; in the hero.
2. **Phase 3, the scroll story**: hero → Process glide, the node climbing the corners, the CTA
   station, pulses from button hovers.
3. Phase 4 loader and polish; Phase 6 SEO, performance and accessibility; Phase 7 launch.

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
