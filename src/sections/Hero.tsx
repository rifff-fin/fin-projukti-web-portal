import { createPortal } from 'react-dom';
import { hero } from '../content/copy';
import { firePulse } from '../store/scene';
import { Emph } from '../components/ui/Emph';
import { LogoPlate } from '../components/LogoPlate';
import { ArrowRight } from '../components/icons';

/**
 * 01 Hero. Headline left, the live 3D logo right (station `hero`; on phones it sits above
 * the headline). The node builds the logo on load and keeps sending a pulse up the path;
 * hovering the main button sends one too.
 */
export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col">
      <HeroBackdrop />
      <div className="shell grid flex-1 content-center items-center gap-x-8 gap-y-4 pt-[calc(var(--header-h)+1.5rem)] pb-10 lg:grid-cols-12 lg:pb-6">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <p data-reveal="intro-fade" className="eyebrow flex items-center gap-3 text-ash">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
            {hero.eyebrow}
          </p>
          <h1
            data-reveal="intro"
            className="mt-6 text-[length:var(--text-hero)] [&_em]:text-chalk lg:mt-8"
          >
            <Emph text={hero.title} />
          </h1>
          <p
            data-reveal="intro-fade"
            className="mt-7 max-w-[36rem] text-[length:var(--text-lede)] leading-relaxed text-bone lg:mt-9"
          >
            {hero.lede}
          </p>
          <div data-reveal="intro-fade" className="mt-9 flex flex-wrap gap-3 lg:mt-11">
            <a
              href="#contact"
              className="btn btn-primary"
              onPointerEnter={firePulse}
              onFocus={firePulse}
            >
              {hero.primary}
              <ArrowRight />
            </a>
            <a href="#work" className="btn btn-ghost">
              {hero.secondary}
            </a>
          </div>
        </div>
        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <LogoPlate
            id="hero"
            className="h-[34svh] max-h-[22rem] lg:h-[min(74svh,44rem)] lg:max-h-none"
          />
        </div>
      </div>
      <div
        data-reveal="intro-fade"
        className="shell eyebrow relative flex items-end justify-end gap-6 pb-7 text-ash"
      >
        <span
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
          aria-hidden="true"
        >
          {hero.scroll}
          <span className="block h-8 w-px bg-gradient-to-b from-line-hi to-transparent" />
        </span>
        <ul className="flex flex-wrap justify-end gap-x-6 gap-y-1">
          {hero.meta.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * The hero's backdrop: a faint dot grid and a soft warm light behind the logo. It sits
 * behind the 3D canvas (portalled to body at a negative z-index; the page colour is on
 * html), so the logo is lit from behind instead of having the grid drawn over it.
 */
function HeroBackdrop() {
  return createPortal(
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-svh min-h-[40rem] overflow-hidden"
    >
      <div className="dot-grid absolute inset-0" />
      <div className="absolute top-[24%] left-1/2 h-[46svh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--signal)_16%,transparent),transparent)] blur-2xl lg:top-1/2 lg:left-[74%] lg:h-[70svh] lg:w-[46vw] lg:-translate-y-1/2" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />
    </div>,
    document.body,
  );
}
