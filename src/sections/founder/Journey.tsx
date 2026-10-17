import { useLayoutEffect, useRef } from 'react';
import { founder } from '../../content/copy';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { motionQuery } from '../../lib/motion';
import { ChapterHead } from '../../components/ui/ChapterHead';
import { Emph } from '../../components/ui/Emph';

/**
 * 02 Journey — 2016 to now on a rail, drawn like the logo: a square marker first, a round
 * one last. Motion: the rail fills with the signal as you scroll and each marker lights as
 * it is reached. Static: the whole rail is lit ([data-lit]).
 */
export function Journey() {
  const j = founder.journey;
  const list = useRef<HTMLDivElement>(null);

  // the rail runs from the first marker's centre to the last one's
  useLayoutEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const measure = () => {
      const marks = ol.querySelectorAll<HTMLElement>('.journey-mark');
      const box = ol.getBoundingClientRect();
      const centre = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2 - box.top;
      };
      const top = centre(marks[0]);
      ol.style.setProperty('--rail-top', `${top}px`);
      ol.style.setProperty('--rail-h', `${centre(marks[marks.length - 1]) - top}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ol);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const ol = list.current;
      if (!ol) return;
      gsap.matchMedia().add(motionQuery(), () => {
        ol.removeAttribute('data-lit');
        gsap.fromTo(
          '[data-rail-fill]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: ol, start: 'top 65%', end: 'bottom 65%', scrub: 0.6 },
          },
        );
        ol.querySelectorAll<HTMLElement>('[data-step]').forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 65%',
            onEnter: () => el.classList.add('is-on'),
            onLeaveBack: () => el.classList.remove('is-on'),
          });
        });
        return () => {
          ol.setAttribute('data-lit', '');
          ol.querySelectorAll('[data-step]').forEach((el) => el.classList.remove('is-on'));
        };
      });
    },
    { scope: list },
  );

  return (
    <section id="journey" aria-labelledby="journey-title" className="py-[var(--section-y)]">
      <div className="shell">
        <ChapterHead index={j.index} label={j.label} total="05" />
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <h2 id="journey-title" className="text-[length:var(--text-h2)] lg:col-span-7">
            <Emph text={j.title} />
          </h2>
          <p
            data-reveal="fade"
            className="max-w-[30rem] self-end text-bone lg:col-span-4 lg:col-start-9"
          >
            {j.intro}
          </p>
        </div>

        <div ref={list} data-lit="" className="journey mt-14 lg:mt-20">
          <span aria-hidden="true" className="journey-rail" />
          <span aria-hidden="true" data-rail-fill className="journey-fill" />
          <ol>
            {j.steps.map((s, i) => (
              <li
                key={s.year + s.title}
                data-step
                className={`journey-step ${i === 0 ? 'is-first' : ''} ${
                  i === j.steps.length - 1 ? 'is-last' : ''
                }`}
              >
                <span className="journey-year">{s.year}</span>
                <span aria-hidden="true" className="journey-mark" />
                <div className="journey-body">
                  <p className="eyebrow text-signal-hi">{s.kind}</p>
                  <h3 className="mt-2 text-[length:var(--text-h3)]">{s.title}</h3>
                  <p className="mt-2 max-w-[38rem] text-ash">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
