import { founder } from '../../content/copy';
import { ChapterHead } from '../../components/ui/ChapterHead';
import { Emph } from '../../components/ui/Emph';

/** 01 Story — where he comes from, the facts at a glance, his numbers. */
export function Story() {
  const s = founder.story;
  return (
    <section id="story" aria-labelledby="story-title" className="py-[var(--section-y)]">
      <div className="shell">
        <ChapterHead index={s.index} label={s.label} total="05" />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h2 id="story-title" className="text-[length:var(--text-h2)]">
              <Emph text={s.title} />
            </h2>
            <div
              data-reveal="stagger"
              className="mt-10 flex max-w-[34rem] flex-col gap-5 text-bone"
            >
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="eyebrow text-ash">{s.factsLabel}</p>
            <dl data-reveal="stagger" className="mt-6 border-t border-line">
              {s.facts.map((f) => (
                <div
                  key={f.label}
                  className="grid gap-1 border-b border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-4"
                >
                  <dt className="eyebrow pt-1 text-ash">{f.label}</dt>
                  <dd className="text-chalk">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <dl
          data-reveal="stagger"
          className="mt-20 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3 lg:mt-28"
        >
          {s.stats.map((st) => (
            <div key={st.label} className="flex flex-col-reverse gap-2 bg-void p-6 md:p-8">
              <dt className="eyebrow text-ash">{st.label}</dt>
              <dd className="text-[clamp(2.5rem,5vw,4rem)] leading-none font-light tracking-[-0.04em] text-chalk">
                {st.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
