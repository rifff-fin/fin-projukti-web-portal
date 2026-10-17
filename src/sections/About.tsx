import { about, founder } from '../content/copy';
import { ChapterHead } from '../components/ui/ChapterHead';
import { Emph } from '../components/ui/Emph';
import { ArrowRight } from '../components/icons';

/**
 * 05 About — from BRACU to big tech: the story, what "Fin" means, values, numbers, and the
 * way to the founder's page (/founder/).
 */
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

        <a
          href={about.founder.href}
          data-reveal="fade"
          className="group relative mt-6 grid items-center gap-x-6 gap-y-5 border border-line bg-void p-5 transition-colors duration-300 ease-liquid hover:bg-graphite sm:grid-cols-[auto_1fr_auto] md:p-6"
        >
          <span
            aria-hidden="true"
            className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-700 ease-liquid-expo group-hover:scale-x-100"
          />
          <span className="relative block h-24 w-24 overflow-hidden border border-line bg-carbon">
            <span className="absolute inset-0 bg-[radial-gradient(closest-side_at_50%_45%,color-mix(in_oklab,var(--signal)_24%,transparent),transparent)]" />
            <img
              src={founder.photo.src}
              alt=""
              width={founder.photo.width}
              height={founder.photo.height}
              loading="lazy"
              className="absolute top-0 left-[-24%] w-[190%] max-w-none"
            />
          </span>
          <span>
            <span className="eyebrow text-signal-hi">{about.founder.role}</span>
            <span className="mt-2 block text-[length:var(--text-h3)] text-chalk">
              {about.founder.name}
            </span>
            <span className="mt-1 block max-w-[40rem] text-ash">{about.founder.line}</span>
          </span>
          <span className="inline-flex items-center gap-2 text-chalk">
            {about.founder.link}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 ease-liquid group-hover:translate-x-1"
            />
          </span>
        </a>
      </div>
    </section>
  );
}
