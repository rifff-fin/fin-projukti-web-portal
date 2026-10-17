import { useId, useState } from 'react';
import { services } from '../content/copy';
import { ChapterHead } from '../components/ui/ChapterHead';
import { Emph } from '../components/ui/Emph';
import { Plus } from '../components/icons';

/**
 * 03 Services — an index list. Each row is a disclosure: number, title and one line; open,
 * it shows the full description and the stack. Hovering a row draws the signal along its
 * top hairline. One row open at a time (the first, to start).
 */
export function Services() {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section id="services" aria-labelledby="services-title" className="py-[var(--section-y)]">
      <div className="shell">
        <ChapterHead index={services.index} label={services.label} />
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <h2 id="services-title" className="text-[length:var(--text-h2)] lg:col-span-7">
            <Emph text={services.title} />
          </h2>
          <p
            data-reveal="fade"
            className="max-w-[30rem] self-end text-bone lg:col-span-4 lg:col-start-9"
          >
            {services.intro}
          </p>
        </div>

        <ul data-reveal="stagger" className="mt-14 border-b border-line lg:mt-20">
          {services.items.map((s, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            return (
              <li key={s.title} className="group relative border-t border-line">
                <span
                  aria-hidden="true"
                  className={`absolute -top-px left-0 h-px w-full origin-left bg-signal transition-transform duration-700 ease-liquid-expo ${
                    isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
                <h3 className="text-[length:var(--text-h3)]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="grid w-full grid-cols-[2.75rem_1fr_auto] items-center gap-x-4 py-7 text-left md:grid-cols-[5rem_1.1fr_1fr_auto] md:py-9"
                  >
                    <span className="eyebrow self-center text-signal-hi">0{i + 1}</span>
                    <span className="font-light tracking-[-0.02em] text-chalk">{s.title}</span>
                    <span className="hidden text-base font-normal tracking-normal text-ash md:block">
                      {s.summary}
                    </span>
                    <span
                      className={`flex h-10 w-10 items-center justify-center border transition-[border-color,color] duration-300 ease-liquid ${
                        isOpen
                          ? 'border-signal text-signal'
                          : 'border-line-hi text-bone group-hover:border-ash'
                      }`}
                    >
                      <Plus
                        size={16}
                        className={`transition-transform duration-300 ease-liquid ${isOpen ? 'rotate-45' : ''}`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-label={s.title}
                  className={`grid transition-[grid-template-rows] duration-500 ease-liquid ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <div className="grid gap-6 pb-9 md:grid-cols-[5rem_1.1fr_1fr_auto] md:gap-x-4">
                      <p className="max-w-[36rem] text-bone md:col-start-2">{s.body}</p>
                      <ul className="flex flex-wrap content-start gap-2 md:col-start-3">
                        {s.tags.map((t) => (
                          <li key={t} className="tag">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
