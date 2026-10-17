import { marquee } from '../content/copy';

/**
 * The technical DNA band: an endless, slow strip of the stack (pauses on hover; still under
 * reduced motion). The list is real text once; the copy that makes the loop is hidden.
 */
export function TechMarquee() {
  return (
    <section
      aria-label={marquee.label}
      className="group relative overflow-hidden border-y border-line py-5"
    >
      <div className="flex w-max animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused]">
        <List />
        <List hidden />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-void to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-void to-transparent md:w-40" />
    </section>
  );
}

function List({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marquee.items.map((item) => (
        <li key={item} className="eyebrow flex items-center gap-8 pr-8 whitespace-nowrap text-ash">
          {item}
          <Glyph />
        </li>
      ))}
    </ul>
  );
}

/** A tiny square-to-circle mark between the names (the logo's start and end). */
function Glyph() {
  return (
    <svg width="22" height="6" viewBox="0 0 22 6" aria-hidden="true" className="text-signal">
      <rect x="0" y="0.5" width="5" height="5" fill="currentColor" />
      <path d="M5 3h12" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="19" cy="3" r="2.5" fill="currentColor" />
    </svg>
  );
}
