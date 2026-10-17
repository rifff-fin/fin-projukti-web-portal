import { useRef } from 'react';
import { founder } from '../../content/copy';
import { gsap, useGSAP } from '../../lib/gsap';
import { motionQuery } from '../../lib/motion';
import { Emph } from '../../components/ui/Emph';
import { LogoMark } from '../../components/Logo';
import { ArrowUpRight, LinkedIn } from '../../components/icons';

/**
 * /founder/ — the whole page: who leads Fin Projukti, in one screen. Name, role, a short
 * bio, his line about "Fin", the portrait in a quiet frame, and the way on to his own site
 * (abdullahalrifat.me), where everything else about him lives. Motion: the headline rises
 * (useReveals) and the portrait fades up; nothing else moves.
 */
export function FounderHero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(motionQuery(), () => {
        gsap.from('[data-portrait]', {
          y: 28,
          autoAlpha: 0,
          duration: 1.4,
          delay: 0.2,
          ease: 'expo.out',
        });
      });
    },
    { scope },
  );

  return (
    <section ref={scope} id="top" className="relative flex min-h-svh flex-col">
      <div className="shell grid flex-1 content-center items-center gap-x-8 gap-y-14 pt-[calc(var(--header-h)+3rem)] pb-[clamp(4rem,8vw,7rem)] lg:grid-cols-12">
        <div className="lg:col-span-6">
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
            className="mt-7 max-w-[34rem] text-[length:var(--text-lede)] leading-relaxed text-bone lg:mt-9"
          >
            {founder.lede}
          </p>
          <blockquote
            data-reveal="intro-fade"
            className="mt-9 max-w-[34rem] border-l border-signal pl-5"
          >
            <p className="headline text-[1.375rem] leading-snug [&_em]:text-chalk">
              <Emph text={founder.quote} />
            </p>
          </blockquote>
          <div data-reveal="intro-fade" className="mt-10 flex flex-wrap gap-3 lg:mt-12">
            <a
              href={founder.portfolio.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {founder.portfolio.label}
              <ArrowUpRight />
            </a>
            <a
              href={founder.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <LinkedIn size={16} />
              {founder.linkedin.label}
            </a>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-[26rem] lg:col-span-5 lg:col-start-8 lg:max-w-[30rem]">
          <div className="relative aspect-[4/5] overflow-hidden border border-line bg-carbon">
            <div aria-hidden="true" className="dot-grid absolute inset-0" />
            <div
              aria-hidden="true"
              className="absolute top-[12%] left-1/2 h-[60%] w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--signal)_16%,transparent),transparent)] blur-2xl"
            />
            <LogoMark className="absolute top-5 right-5 h-6 w-auto" />
            <img
              data-portrait
              src={founder.photo.src}
              width={founder.photo.width}
              height={founder.photo.height}
              alt={founder.photo.alt}
              fetchPriority="high"
              className="absolute bottom-0 left-1/2 h-auto w-[94%] -translate-x-1/2"
            />
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
