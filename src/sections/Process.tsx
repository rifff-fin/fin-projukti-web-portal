import { useRef, useState } from 'react';
import { process } from '../content/copy';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { motionQuery } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { registerTrack } from '../store/scene';
import { ChapterHead } from '../components/ui/ChapterHead';
import { Emph } from '../components/ui/Emph';
import { LogoPlate } from '../components/LogoPlate';

/** Scroll per step, in svh, while the stage is held. */
const STEP_SVH = 85;

/**
 * 02 Process — the climb. The four steps are the logo's four corners. With motion, the
 * section is a tall track holding a CSS-sticky stage: the 3D logo (station `process`) on
 * one side, the steps on the other, and scroll moves the node corner by corner (the track's
 * ScrollTrigger is read by the 3D every frame), lighting each step as the node reaches it;
 * after the fourth it runs on to the circle. Reduced motion: a plain list beside the
 * complete logo, nothing held.
 */
export function Process() {
  const reduced = useReducedMotion();
  const full = !reduced;
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.matchMedia().add(motionQuery(), () => {
        let last = -1;
        const st = ScrollTrigger.create({
          trigger: track.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const step = Math.min(3, Math.floor(self.progress * 4));
            if (step !== last) setActive((last = step));
            if (rail.current) rail.current.style.transform = `scaleY(${self.progress})`;
          },
        });
        registerTrack('process', st);
        return () => registerTrack('process', null);
      });
    },
    { scope: track },
  );

  return (
    <section id="process" aria-labelledby="process-title" className="relative">
      <div className="shell pt-[var(--section-y)]">
        <ChapterHead index={process.index} label={process.label} />
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <h2 id="process-title" className="text-[length:var(--text-h2)] lg:col-span-7">
            <Emph text={process.title} />
          </h2>
          <p
            data-reveal="fade"
            className="max-w-[30rem] self-end text-bone lg:col-span-4 lg:col-start-9"
          >
            {process.intro}
          </p>
        </div>
      </div>

      <div
        ref={track}
        style={full ? { height: `${100 + 4 * STEP_SVH}svh` } : undefined}
        className={full ? '' : 'pb-[var(--section-y)]'}
      >
        <div className={full ? 'sticky top-0 h-svh overflow-hidden' : 'pt-12 lg:pt-20'}>
          <div
            className={`shell grid gap-x-8 lg:grid-cols-12 lg:items-center ${
              full
                ? 'h-full grid-rows-[auto_1fr] content-center gap-y-6 pt-[var(--header-h)] pb-8 lg:grid-rows-1 lg:py-[var(--header-h)]'
                : 'gap-y-10'
            }`}
          >
            <div className="flex justify-center lg:col-span-5">
              <LogoPlate
                id="process"
                className={full ? 'h-[36svh] lg:h-[min(68svh,40rem)]' : 'h-[40svh] lg:h-[34rem]'}
              />
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              {full && (
                <div aria-hidden="true" className="mb-6 flex gap-1.5 lg:hidden">
                  {process.steps.map((s, i) => (
                    <span
                      key={s.title}
                      className={`h-0.5 flex-1 transition-colors duration-500 ${
                        i <= active ? 'bg-signal' : 'bg-line-hi'
                      }`}
                    />
                  ))}
                </div>
              )}
              <ol
                className={`relative ${
                  full
                    ? 'grid [grid-template-areas:"step"] lg:flex lg:flex-col lg:border-l lg:border-line'
                    : 'flex flex-col border-l border-line'
                }`}
              >
                {full && (
                  <span
                    ref={rail}
                    aria-hidden="true"
                    className="absolute top-0 -left-px hidden h-full w-px origin-top scale-y-0 bg-signal lg:block"
                  />
                )}
                {process.steps.map((s, i) => {
                  const on = !full || i === active;
                  const passed = full && i < active;
                  return (
                    <li
                      key={s.title}
                      aria-current={full && on ? 'step' : undefined}
                      className={`transition-[opacity,transform,color] duration-500 ease-liquid ${
                        full
                          ? `[grid-area:step] lg:py-7 lg:pl-10 ${
                              on
                                ? 'opacity-100'
                                : 'pointer-events-none translate-y-3 opacity-0 lg:pointer-events-auto lg:translate-y-0 lg:opacity-35'
                            }`
                          : 'py-6 pl-8 lg:pl-10'
                      }`}
                    >
                      <span
                        className={`eyebrow flex items-center gap-3 ${
                          on || passed ? 'text-signal-hi' : 'text-ash'
                        }`}
                      >
                        <CornerMark corner={i} />
                        {process.stepLabel} 0{i + 1}
                      </span>
                      <h3 className="mt-3 text-[length:var(--text-h3)]">{s.title}</h3>
                      <p className="mt-2 max-w-[30rem] text-bone">{s.body}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A tiny copy of the logo with this step's corner marked. */
function CornerMark({ corner }: { corner: number }) {
  const pts = [
    [2, 18],
    [2, 13],
    [7, 13],
    [7, 8],
    [12, 8],
    [12, 3],
  ];
  const [cx, cy] = pts[corner + 1];
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" aria-hidden="true" className="shrink-0">
      <polyline
        points={pts.map((p) => p.join(',')).join(' ')}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      <rect x="0" y="16.5" width="4" height="3" fill="currentColor" fillOpacity="0.4" />
      <circle cx="12" cy="2.5" r="2" fill="currentColor" fillOpacity="0.4" />
      <circle cx={cx} cy={cy} r="2.2" fill="currentColor" />
    </svg>
  );
}
