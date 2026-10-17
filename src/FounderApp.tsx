import { useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MotionSwitch } from './components/MotionSwitch';
import { SkipLink } from './components/SkipLink';
import { useReveals } from './hooks/useReveals';
import { ScrollTrigger } from './lib/gsap';
import { SmoothScroll } from './lib/lenis';
import { FounderHero } from './sections/founder/FounderHero';
import { FounderQuote } from './sections/founder/FounderQuote';
import { Story } from './sections/founder/Story';
import { Journey } from './sections/founder/Journey';
import { Expertise } from './sections/founder/Expertise';
import { Recognition } from './sections/founder/Recognition';
import { Builds } from './sections/founder/Builds';
import { FounderCta } from './sections/founder/FounderCta';
import './styles/founder.css';

/**
 * /founder/ — the founder and CEO (founder/index.html). Same header, footer, Motion switch
 * and reveals as the home page; no loader and no 3D canvas (the footer shows the flat logo,
 * its designed stand-in), so the page stays light.
 */
export function FounderApp() {
  const page = useRef<HTMLDivElement>(null);
  useReveals(page);

  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <SmoothScroll>
      <SkipLink />
      <Header />
      <div ref={page} className="relative z-[1]">
        <main id="main" tabIndex={-1} className="outline-none">
          <FounderHero />
          <FounderQuote />
          <Story />
          <Journey />
          <Expertise />
          <Recognition />
          <Builds />
          <FounderCta />
        </main>
        <Footer />
      </div>
      <MotionSwitch />
    </SmoothScroll>
  );
}
