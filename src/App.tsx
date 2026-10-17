import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MotionSwitch } from './components/MotionSwitch';
import { SceneHost } from './components/SceneHost';
import { SkipLink } from './components/SkipLink';
import { useReveals } from './hooks/useReveals';
import { ScrollTrigger } from './lib/gsap';
import { SmoothScroll } from './lib/lenis';
import { runPreloader, whenRevealed } from './lib/preloader';
import { useReducedMotion } from './hooks/useReducedMotion';
import { Hero } from './sections/Hero';
import { TechMarquee } from './sections/TechMarquee';
import { Process } from './sections/Process';
import { Services } from './sections/Services';
import { Nfc } from './sections/Nfc';
import { Work } from './sections/Work';
import { About } from './sections/About';
import { Contact } from './sections/Contact';

export function App() {
  const page = useRef<HTMLDivElement>(null);
  useReveals(page);

  // Web fonts reflow text after first paint; re-measure every trigger once they land.
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  // The loader (index.html) fills and lifts once the first screen is ready.
  useEffect(() => {
    void runPreloader();
  }, []);

  return (
    <SmoothScroll>
      <SkipLink />
      <HashLanding />
      <Header />
      <SceneHost />
      {/* The page sits above the single fixed WebGL canvas (z 0); transparent sections show it. */}
      <div ref={page} className="relative z-[1]">
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <TechMarquee />
          <Process />
          <Services />
          <Nfc />
          <Work />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
      <MotionSwitch />
    </SmoothScroll>
  );
}

/**
 * Arriving from another page at '/#work': the loader holds the page still, so go to the
 * section once it lifts, after the pinned sections have been measured. Through Lenis when
 * it runs (it would take a plain scroll back), natively otherwise.
 */
function HashLanding() {
  const lenis = useLenis();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!reduced && !lenis) return; // Lenis is still starting
    whenRevealed(() => {
      const hash = location.hash;
      const target = hash.length > 1 ? document.querySelector<HTMLElement>(hash) : null;
      if (!target) return;
      ScrollTrigger.refresh();
      requestAnimationFrame(() => {
        if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
        else target.scrollIntoView();
      });
    });
  }, [lenis, reduced]);
  return null;
}
