/**
 * The loader (master plan §2.3, Phase 4). Until its markup exists in index.html the page is
 * simply "revealed" from the start; everything that waits on the loader goes through
 * `whenRevealed`, so it works either way.
 */
const el = document.getElementById('preloader');
let revealed = !el;
const waiting: (() => void)[] = [];

/** False while the loader covers the page. */
export const isRevealed = () => revealed;

/** Run `cb` when the page is revealed (at once if it already is). */
export function whenRevealed(cb: () => void) {
  if (revealed) cb();
  else waiting.push(cb);
}

export function release() {
  if (revealed) return;
  revealed = true;
  document.documentElement.classList.remove('preloading');
  for (const cb of waiting.splice(0)) cb();
}

export async function runPreloader() {
  if (!el) return;
  el.remove();
  release();
}
