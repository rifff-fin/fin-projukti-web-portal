import { useRef } from 'react';
import { founder } from '../../content/copy';
import { gsap, useGSAP } from '../../lib/gsap';
import { link } from '../../lib/links';
import { motionQuery } from '../../lib/motion';
import { Emph } from '../../components/ui/Emph';
import { ArrowRight, ArrowUpRight } from '../../components/icons';

/** The logo's path behind the portrait: from the square foot, up four steps, to the node. */
// the square sits left of his shoulder, the steps pass behind him and come out by his head
const STEPS = 'M6 116V93H34V70H56V47H78V24';

/**
 * /founder/ hero. The headline and buttons left; right, his portrait standing on a hairline,
 * with the logo's path behind it: an orange square foot, steps up behind him, a node on a
 * ring by his head. Motion: the portrait rises, the trace fills along the steps (like the
 * loader), the node lights and the ring draws; then a pulse runs up the path now and then.
 * Static: everything drawn and lit.
 */
export function FounderHero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Dash offsets are tweened as attributes: as CSS, GSAP rounds them to whole pixels,
      // which on a pathLength=1 path means no motion at all.
      const dash = (v: number) => ({ attr: { 'stroke-dashoffset': v } });
      gsap.matchMedia().add(motionQuery(), () => {
        gsap
          .timeline({ delay: 0.15 })
          .from('[data-portrait]', { y: 48, autoAlpha: 0, duration: 1.5, ease: 'expo.out' })
          .fromTo(
            '[data-trace]',
            dash(1),
            { ...dash(0), duration: 1.7, ease: 'power2.inOut' },
            0.35,
          )
          .from(
            '[data-node]',
            { scale: 0, autoAlpha: 0, transformOrigin: '50% 50%', duration: 0.7, ease: 'expo.out' },
            1.9,
          )
          .fromTo('[data-ring]', dash(1), { ...dash(0), duration: 1.6, ease: 'expo.inOut' }, 1.95);

        // the heartbeat: a pulse runs up the path and the node flares (a ring of its own,
        // so it never fights the node's entrance)
        gsap
          .timeline({ repeat: -1, repeatDelay: 3.2, delay: 4.2 })
          .set('[data-pulse]', { ...dash(0.1), autoAlpha: 1 })
          .to('[data-pulse]', { ...dash(-1), duration: 1.5, ease: 'power1.inOut' })
          .set('[data-pulse]', { autoAlpha: 0 })
          .fromTo(
            '[data-flare]',
            { scale: 1, autoAlpha: 0.9, transformOrigin: '50% 50%' },
            { scale: 3, autoAlpha: 0, duration: 1.1, ease: 'expo.out', immediateRender: false },
            '-=0.12',
          );
      });
    },
    { scope },
  );

  return (
    <section ref={scope} id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />
      </div>

      <div className="shell relative grid flex-1 content-center items-end gap-x-8 gap-y-12 pt-[calc(var(--header-h)+2.5rem)] pb-14 lg:grid-cols-12 lg:pb-16">
        <div className="lg:col-span-7 lg:pb-10">
          <p data-reveal="intro-fade" className="eyebrow flex items-center gap-3 text-ash">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
            {founder.eyebrow}
          </p>
          <h1
            data-reveal="intro"
            className="mt-6 text-[length:var(--text-hero)] [&_em]:text-chalk lg:mt-8"
          >
            <Emph text={founder.title} />
          </h1>
          <p
            data-reveal="intro-rise"
            className="mt-7 max-w-[36rem] text-[length:var(--text-lede)] leading-relaxed text-bone lg:mt-9"
          >
            {founder.lede}
          </p>
          <div data-reveal="intro-fade" className="mt-9 flex flex-wrap gap-3 lg:mt-11">
            <a
              href={founder.portfolio.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {founder.portfolio.label}
              <ArrowUpRight />
            </a>
            <a href={link('#contact')} className="btn btn-ghost">
              {founder.secondary}
              <ArrowRight />
            </a>
          </div>
          <ul
            data-reveal="intro-fade"
            className="eyebrow mt-12 flex flex-wrap gap-x-6 gap-y-2 text-ash"
          >
            {founder.meta.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>

        <figure className="mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none">
          <div className="relative aspect-[4/5]">
            <div
              aria-hidden="true"
              className="absolute top-[14%] left-1/2 h-[62%] w-[96%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--signal)_20%,transparent),transparent)] blur-2xl"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 100 125"
              className="absolute inset-0 h-full w-full overflow-visible"
              fill="none"
            >
              <circle
                data-ring
                cx={46}
                cy={50}
                r={41}
                pathLength={1}
                strokeDasharray="1 1"
                className="stroke-line-hi"
                vectorEffect="non-scaling-stroke"
              />
              <path d={STEPS} className="stroke-line" strokeWidth={2.2} strokeLinejoin="round" />
              <path
                data-trace
                d={STEPS}
                pathLength={1}
                strokeDasharray="1 1"
                className="stroke-signal"
                strokeWidth={0.9}
                strokeLinejoin="round"
              />
              <path
                data-pulse
                d={STEPS}
                pathLength={1}
                strokeDasharray="0.1 1.2"
                strokeDashoffset={0.1}
                className="invisible stroke-ember"
                strokeWidth={1.4}
                strokeLinecap="round"
              />
              <rect x={2.5} y={112.5} width={7} height={7} rx={1} className="fill-signal" />
              <circle
                data-flare
                cx={78}
                cy={24}
                r={3.6}
                className="invisible stroke-signal"
                vectorEffect="non-scaling-stroke"
              />
              <g data-node>
                <circle cx={78} cy={24} r={7} className="fill-signal/20" />
                <circle cx={78} cy={24} r={3.6} className="fill-signal" />
              </g>
            </svg>
            <img
              data-portrait
              src={founder.photo.src}
              width={founder.photo.width}
              height={founder.photo.height}
              alt={founder.photo.alt}
              fetchPriority="high"
              className="absolute bottom-0 left-[54%] h-auto w-[88%] -translate-x-1/2"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line-hi" />
          </div>
          <figcaption className="eyebrow mt-4 flex justify-between gap-4 text-ash">
            <span className="text-chalk">{founder.name}</span>
            <span>{founder.photo.caption}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
