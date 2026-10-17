import { preloader as copy } from '../content/copy';
import { gsap } from './gsap';
import { reducedQuery } from './motion';
import { hasWebGL } from './webgl';

/**
 * The loader (master plan §2.3). The small logo, its track and trace are static HTML and
 * CSS in index.html, so they show with the first frame. This fills the trace along the path
 * while the first screen gets ready (the headline fonts, the live 3D logo), then the end
 * ball lights, and the screen opens in a circle from it.
 *
 * Shown for at least MIN_MS and at most MAX_MS from navigation start (on a slow connection
 * the 3D logo arrives later; the flat logo stands in meanwhile). The page beneath renders
 * all along (it counts for first paint) but is held: no scrolling, no focus, and the hero's
 * build and headline wait for the reveal (`whenRevealed`).
 */
const MIN_MS = 1100;
const MAX_MS = 2600;

const el = document.getElementById('preloader');
let revealed = !el;
let started = false;
const waiting: (() => void)[] = [];

/** False while the loader covers the page. */
export const isRevealed = () => revealed;

/** Run `cb` when the page is revealed (at once if it already is). */
export function whenRevealed(cb: () => void) {
  if (revealed) cb();
  else waiting.push(cb);
}

function release() {
  if (revealed) return;
  revealed = true;
  document.documentElement.classList.remove('preloading');
  const root = document.getElementById('root');
  if (root) root.inert = false;
  for (const cb of waiting.splice(0)) cb();
}

const sleep = (ms: number) => new Promise((done) => setTimeout(done, Math.max(0, ms)));

/** The live 3D scene has compiled (three/Scene.tsx `Ready`). */
function webglReady() {
  const html = document.documentElement;
  if (html.dataset.webgl === 'ready') return Promise.resolve();
  return new Promise<void>((done) => {
    const watch = new MutationObserver(() => {
      if (html.dataset.webgl !== 'ready') return;
      watch.disconnect();
      done();
    });
    watch.observe(html, { attributes: true, attributeFilter: ['data-webgl'] });
  });
}

/** The faces the hero headline is set in. */
function fonts() {
  return Promise.all([
    document.fonts.load('300 1em Geist'),
    document.fonts.load('italic 400 1em "Instrument Serif"'),
  ]).then(() => document.fonts.ready);
}

/** Starts once, after the app's first render. */
export async function runPreloader() {
  if (!el || started) return;
  started = true;
  el.removeAttribute('aria-hidden');
  el.setAttribute('role', 'progressbar');
  el.setAttribute('aria-label', copy.label);
  el.setAttribute('aria-valuemin', '0');
  el.setAttribute('aria-valuemax', '100');

  const trace = el.querySelector<SVGPathElement>('.pl-trace');
  const count = el.querySelector<HTMLElement>('.pl-count');
  let progress = 0;
  const show = (p: number) => {
    progress = Math.min(1, p);
    const pct = Math.round(progress * 100);
    if (trace) trace.style.strokeDashoffset = String(1 - Math.max(0.06, progress));
    if (count) count.textContent = String(pct).padStart(3, '0');
    el.setAttribute('aria-valuenow', String(pct));
  };
  show(0);

  try {
    const tasks: [Promise<unknown>, number][] = [[fonts(), 1]];
    if (hasWebGL()) tasks.push([webglReady(), 2.5]);
    const total = tasks.reduce((sum, [, w]) => sum + w, 0);
    for (const [task, w] of tasks) {
      task.then(
        () => show(progress + w / total),
        () => show(progress + w / total),
      );
    }
    const ready = Promise.allSettled(tasks.map(([task]) => task));
    const now = performance.now();
    await Promise.race([Promise.all([ready, sleep(MIN_MS - now)]), sleep(MAX_MS - now)]);
  } catch {
    // whatever happened, never keep the page covered
  }
  show(1);
  reveal(el);
}

function reveal(cover: HTMLElement) {
  const done = () => cover.remove();
  if (window.matchMedia(reducedQuery()).matches) {
    gsap.to(cover, {
      autoAlpha: 0,
      duration: 0.45,
      ease: 'power1.out',
      delay: 0.2,
      onStart: release,
      onComplete: done,
    });
    return;
  }

  // the screen opens in a circle from the end ball
  const ball = cover.querySelector('.pl-ball')!.getBoundingClientRect();
  const cx = ball.left + ball.width / 2;
  const cy = ball.top + ball.height / 2;
  const far = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) + 2;
  const hole = { r: 0 };
  const paint = () => {
    const mask = `radial-gradient(circle at ${cx}px ${cy}px, transparent ${hole.r}px, #000 ${hole.r + 1}px)`;
    cover.style.maskImage = mask;
    cover.style.setProperty('-webkit-mask-image', mask);
  };
  // dev only: /?slowmo=6 plays the reveal six times slower, to check it frame by frame
  const slow = import.meta.env.DEV ? Number(new URLSearchParams(location.search).get('slowmo')) : 0;
  gsap
    .timeline({ onComplete: done, delay: 0.55 }) // let the trace finish filling
    .timeScale(slow > 0 ? 1 / slow : 1)
    .call(() => cover.classList.add('is-lit'))
    .add(release, '+=0.3')
    .to(hole, { r: far, duration: 1.15, ease: 'expo.inOut', onUpdate: paint }, '<')
    .to(
      cover.querySelector('.pl-mark'),
      { autoAlpha: 0, duration: 0.4, ease: 'power1.out' },
      '<0.15',
    );
}
