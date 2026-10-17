import { founder } from '../../content/copy';
import { ChapterHead } from '../../components/ui/ChapterHead';
import { Emph } from '../../components/ui/Emph';

/** 04 Recognition — prizes and awards, newest first; hovering a row draws the signal. */
export function Recognition() {
  const r = founder.recognition;
  return (
    <section id="recognition" aria-labelledby="recognition-title" className="py-[var(--section-y)]">
      <div className="shell">
        <ChapterHead index={r.index} label={r.label} total="05" />
        <h2 id="recognition-title" className="text-[length:var(--text-h2)]">
          <Emph text={r.title} />
        </h2>
        <ul data-reveal="stagger" className="mt-14 border-b border-line lg:mt-20">
          {r.items.map((it) => (
            <li
              key={it.year + it.title}
              className="group relative grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-1 border-t border-line py-6 md:grid-cols-[6rem_1.4fr_1fr] md:items-baseline md:py-7"
            >
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-700 ease-liquid-expo group-hover:scale-x-100"
              />
              <span className="eyebrow pt-1 text-signal-hi md:pt-0">{it.year}</span>
              <span className="text-[1.125rem] text-chalk md:text-[1.25rem]">{it.title}</span>
              <span className="col-start-2 text-ash md:col-start-3">{it.by}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
