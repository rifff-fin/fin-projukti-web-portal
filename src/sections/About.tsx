import { about } from '../content/copy';
import { ChapterHead } from '../components/ui/ChapterHead';
import { Emph } from '../components/ui/Emph';

/** 05 About — from BRACU to big tech: the story, what "Fin" means, values, numbers. */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-y border-line bg-carbon py-[var(--section-y)]"
    >
      <div className="shell">
        <ChapterHead index={about.index} label={about.label} />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h2 id="about-title" className="text-[length:var(--text-h2)]">
              <Emph text={about.title} />
            </h2>
            <div
              data-reveal="stagger"
              className="mt-10 flex max-w-[34rem] flex-col gap-5 text-bone"
            >
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <figure
              data-reveal="fade"
              className="mt-12 flex items-end gap-6 border-t border-line pt-8"
            >
              <span
                lang="bn"
                className="font-bengali text-[2.75rem] leading-none font-medium text-signal md:text-[3.5rem]"
              >
                {about.word.bengali}
              </span>
              <figcaption className="pb-1">
                <span className="block text-chalk italic">{about.word.latin}</span>
                <span className="eyebrow text-ash">{about.word.meaning}</span>
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="eyebrow text-ash">{about.valuesLabel}</p>
            <ol
              data-reveal="stagger"
              className="mt-6 flex flex-col gap-px border border-line bg-line"
            >
              {about.values.map((v, i) => (
                <li key={v.title} className="bg-carbon p-6 md:p-7">
                  <span className="eyebrow text-signal-hi">0{i + 1}</span>
                  <h3 className="mt-3 text-[1.25rem]">{v.title}</h3>
                  <p className="mt-2 text-ash">{v.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <dl
          data-reveal="stagger"
          className="mt-20 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3 lg:mt-28"
        >
          {about.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-2 bg-carbon p-6 md:p-8">
              <dt className="eyebrow text-ash">{s.label}</dt>
              <dd className="text-[clamp(2.5rem,5vw,4rem)] leading-none font-light tracking-[-0.04em] text-chalk">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
