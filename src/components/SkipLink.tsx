import { nav } from '../content/copy';

/** "Skip to content": the first stop for the keyboard on every page. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="eyebrow sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-chalk focus:px-4 focus:py-3 focus:text-void"
    >
      {nav.skipLink}
    </a>
  );
}
