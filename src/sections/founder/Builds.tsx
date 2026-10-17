import { founder } from '../../content/copy';
import { ChapterHead } from '../../components/ui/ChapterHead';
import { Emph } from '../../components/ui/Emph';
import { ArrowUpRight, GitHub } from '../../components/icons';

/** 05 Selected builds — a few of his own projects, with the code where it is public. */
export function Builds() {
  const b = founder.builds;
  return (
    <section id="builds" aria-labelledby="builds-title" className="pb-[var(--section-y)]">
      <div className="shell">
        <ChapterHead index={b.index} label={b.label} total="05" />
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <h2 id="builds-title" className="text-[length:var(--text-h2)] lg:col-span-7">
            <Emph text={b.title} />
          </h2>
          <p
            data-reveal="fade"
            className="max-w-[30rem] self-end text-bone lg:col-span-4 lg:col-start-9"
          >
            {b.intro}
          </p>
        </div>
        <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:mt-20 xl:grid-cols-3">
          {b.items.map((it) => (
            <li
              key={it.title}
              className="group relative flex flex-col bg-void p-6 transition-colors duration-300 ease-liquid hover:bg-carbon md:p-8"
            >
              <span className="eyebrow text-signal-hi">{it.kind}</span>
              <h3 className="mt-8 text-[length:var(--text-h3)] md:mt-10">{it.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ash">{it.body}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {it.tags.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
              {it.href && (
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${it.title}: ${b.code}`}
                  className="mt-auto inline-flex items-center gap-1.5 self-start pt-8 text-[0.875rem] text-bone after:absolute after:inset-0 after:content-[''] hover:text-chalk focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-signal-hi"
                >
                  <GitHub size={14} />
                  {b.code}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 ease-liquid group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-liquid-expo group-hover:scale-x-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
