import { founder } from '../../content/copy';
import { ChapterHead } from '../../components/ui/ChapterHead';
import { Emph } from '../../components/ui/Emph';

/** 03 Expertise — three fields, their tools, and what he does beyond code. */
export function Expertise() {
  const e = founder.expertise;
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-title"
      className="border-y border-line bg-carbon py-[var(--section-y)]"
    >
      <div className="shell">
        <ChapterHead index={e.index} label={e.label} total="05" />
        <h2 id="expertise-title" className="text-[length:var(--text-h2)]">
          <Emph text={e.title} />
        </h2>
        <ul
          data-reveal="stagger"
          className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3 lg:mt-20"
        >
          {e.areas.map((a, i) => (
            <li key={a.title} className="flex flex-col bg-carbon p-6 md:p-8">
              <span className="eyebrow text-signal-hi">0{i + 1}</span>
              <h3 className="mt-8 text-[length:var(--text-h3)] md:mt-12">{a.title}</h3>
              <p className="mt-3 text-ash">{a.body}</p>
              <ul className="mt-8 flex flex-wrap gap-1.5">
                {a.tags.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <p className="eyebrow shrink-0 text-ash">{e.beyondLabel}</p>
          <ul data-reveal="stagger" className="flex flex-wrap gap-2">
            {e.beyond.map((b) => (
              <li key={b} className="chip pointer-events-none">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
