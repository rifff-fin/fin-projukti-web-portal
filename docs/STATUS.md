# Fin Projukti website — current status

**Updated:** 18 Oct 2026 · **Branch:** `main` = `redesign-3d` (merged and pushed; Netlify deploys `main`)
**Stage:** **Launched** (Phase 7): Phases 0–6, the **Fin NFC Card** section and the **mockup illustrations** are live on finprojukti.tech.
**Next: the after-launch checks below, and the NFC answers.**

> Keep this file current: update it at the end of every piece of work (what changed, what's
> next, what's blocked).

## What you see now (home page, top to bottom)

0. **Loader** (first load): a small copy of the logo whose trace fills along the path as the
   page gets ready (with a 000–100 count); the end ball lights, and the screen opens in a
   circle from it onto the hero, where the 3D build starts.
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
5. **02 Services**: six rows (UI/UX, Web & App, **E-commerce** (new), Automation, Webflow,
   Framer). A row opens to show the details, the stack and a **drawn mockup** of that kind
   of work (an online store template, a dashboard, an n8n workflow…), animated while on screen.
6. **03 Fin NFC** (new): our own product, the **Fin NFC Card**. "Tap. Connect. *Grow.*" A
   stage shows the card (rebuilt from your print design: front = name, title and a real QR
   code to finprojukti.tech/#nfc; back = TAP · CONNECT · GROW) in front of a phone with the
   profile it opens. When it comes into view the card turns from its back to its front and
   taps the phone: rings go out, the phone wakes, the profile rises in. It tilts towards the
   mouse; "Flip the card" and "Tap it again" buttons. Beside it: how it works (Tap, Connect,
   Grow), what you get, and **"Set up your card"**: name, job title, company, phone, email,
   links, how many cards. The card and the phone fill in live as you type. "Order my card"
   sends it to the inbox (Web3Forms), then offers WhatsApp with the order prefilled; a link
   also orders straight on WhatsApp.
7. **04 Selected work**: filters, six cards (each with a mockup cover now), then "Show all".
8. **05 About**: the BRACU story, প্রযুক্তি, three values, the numbers.
9. **06 Contact**: the brief form (checks as you go, spam trap, sends to Web3Forms; after
   sending, "Continue on WhatsApp" with a prefilled message) and the direct lines. "E-commerce"
   and "Fin NFC Card" are now among the services to tick.
10. **Footer**: "Got a project *in mind?*" with the 3D logo (desktop; the button sends a pulse
   up it), site map, socials.

## Done

| Phase | What |
|---|---|
| Repo check | Local was 7 commits behind GitHub; fast-forwarded to `e6a68e4` (nothing lost). |
| 0 Setup | Stack upgraded to the LANGLOK versions; framer-motion, react-icons, lucide and svgr removed; ESLint + Prettier; design tokens; fonts; all copy in `copy.ts`; `CLAUDE.md`; this file. |
| 1 Skeleton | Every section rebuilt in the "Signal Path" design; the logo traced into exact geometry (`brand/logoSpec.ts`, 99.7% match) used by the SVG mark and favicon; Motion switch; scroll reveals; the contact flow from Phase 5 (validation, honeypot, WhatsApp follow-up). |
| 2 3D logo | Built from the same geometry (tubes + ball joints, rounded foot, end ball), satin orange with a clear coat, studio light panels; one shader drives the build, the node, the corner lights and the ball; halo and ring sprites instead of bloom. |
| 3 Scroll story | One canvas behind the page, stations (`hero`, `process`, `cta`), the hero → Process glide with a turn, the Process climb tied to scroll, pulses on button hover. Reduced motion: the complete logo, standing still. |
| 4 Loader | The 2D logo trace fills with the page's readiness (fonts, the 3D logo; 1.1–2.6 s), the ball lights, the screen opens in a circle from it. Reduced motion: a short fade. |
| 5 Contact | Done in Phase 1: validation on leaving a field and on submit (focus to the first error), honeypot + minimum fill time, Web3Forms, success panel with "Continue on WhatsApp" (prefilled). |
| 6 SEO etc. | Open Graph/Twitter image rendered from the live hero (`public/og.jpg`), Organization JSON-LD, canonical, robots.txt, sitemap.xml, PNG icons from the logo geometry (`scripts/make-icons.py`), `netlify.toml`, README rewritten. |
| Fin NFC | New section `03 Fin NFC` (`sections/Nfc.tsx`): the card in HTML/CSS 3D from `docs/reference/fin-nfc-card.png` (Quicksand + Orbitron, real QR from `scripts/make-qr.py`), the phone profile, GSAP flip/tap/tilt, the order form (shared Web3Forms code now in `lib/web3forms.ts`, form fields in `components/ui/form.tsx`). Nav link "NFC Card"; chapters renumbered to 06. |
| Mockups | 12 drawn SVG scenes (`components/mockups/`): storefront (e-commerce template), dashboard, n8n workflow, design canvas, CMS site, motion site, NFC tap, quake map, POS, QR menu, kanban, job board. On every Services row and Work card; lazy chunk (11.5 KB gz); CSS animations that run only on screen. New service row "E-commerce". PNGs (1600 × 1000) in `docs/mockups/`, plus the NFC card front/back. |

## Next

1. A Lighthouse run on the live URL; a test brief through the live form.
2. Answers to the open questions below (until then those texts stay as they are, live).
4. Optional: a still render of the 3D logo for the no-WebGL fallback (today it is the flat SVG).
5. After launch: send one test card order through the live NFC form (it reaches the real
   inbox, so it was not sent from here).

## Waiting on you (master plan §1.5)

**Fin NFC Card (new):**
- The price (one card, and team/bulk prices)? Until then the site says "we reply with the
  price and delivery time".
- Delivery: Dhaka only, or all of Bangladesh? How long?
- Profile updates: included, and for how long? (The copy promises "updates without
  reprinting"; marked `TODO(client)`.) Where are the profiles hosted?
- Reply time for card orders: 24 h like briefs?
- E-commerce service: which payment gateways do you integrate (bKash, Nagad, SSLCommerz…)?
  The copy says "local payment gateways" for now.
- The mockups are illustrations in the site's style, not screenshots. For projects with a
  live site you may prefer a real screenshot later.

**From before:**

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
- Bundle: initial JS 147 KB gz (budget 160); the mockup scenes 11.5 KB gz and the 3D chunk
  271 KB gz, both loaded lazily (the 3D at once under the loader). LCP measured locally on the production build: 2.7 s before the lede change
  (the loader holds the headline until the page is ready); re-measure on the live site.
- The brief form has not been sent for real from here (it would reach the real inbox): send one
  test brief after launch.
- `public/og.jpg` is a screenshot of the hero; re-render it if the headline or logo changes.

## How to run and check

```bash
npm install
npm run dev                         # http://localhost:5180
npm run typecheck && npm run lint
python scripts/check-logo.py        # logo geometry vs public/finlogo.png
python scripts/make-qr.py           # the NFC card's QR (pip install segno)
```

## Log

- **17 Oct 2026**: Compared local and GitHub (7 behind), pulled. Wrote the master plan. Phase 0
  (stack, tooling, tokens, copy) and Phase 1 (all sections in the new design, exact logo
  geometry, Motion switch, contact flow) on `redesign-3d`. Checked at 1440 × 900 and 390 × 844:
  no console errors, no sideways scroll.
- **17 Oct 2026**: Phases 2–3. The real-time 3D logo (built from `logoSpec.ts`), the node's
  build, heartbeat and climb, the glide from the hero to Process, the footer station. Checked
  at 1440 × 900 and 390 × 844 with motion on and off: no console errors, no sideways scroll.
- **17 Oct 2026**: Phases 4–6. The loader (logo trace → circle reveal), SEO (OG image from the
  live hero, JSON-LD, sitemap, robots), icons from the logo geometry, `netlify.toml`, README.
  Fixed SplitText clipping the headline's descenders. Production build checked: no console
  errors, every control labelled; menu, services, filters and form validation tested.
- **18 Oct 2026**: The Fin NFC Card section (live card + phone preview from the print design,
  flip/tap/tilt, the order form to Web3Forms + WhatsApp) and 12 drawn mockup scenes on
  Services and Work (new "E-commerce" service), with PNG exports in `docs/mockups/`. Checked at
  1440 × 900 and 390 × 844 with motion on and off: no console errors, no sideways scroll;
  form validation and the WhatsApp link checked; production build checked.
- **18 Oct 2026**: Phase 7, launch: on the user's go-ahead, `main` fast-forwarded to
  `redesign-3d` and pushed; Netlify builds `main`. (The live site had not changed until now
  because only the `redesign-3d` branch had been pushed.)
