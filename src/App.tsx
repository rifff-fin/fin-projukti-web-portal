import { useEffect, useRef } from 'react';
import { nav } from './content/copy';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MotionSwitch } from './components/MotionSwitch';
import { useReveals } from './hooks/useReveals';
import { ScrollTrigger } from './lib/gsap';
import { SmoothScroll } from './lib/lenis';
import { runPreloader } from './lib/preloader';
import { Hero } from './sections/Hero';
import { TechMarquee } from './sections/TechMarquee';
import { Process } from './sections/Process';
import { Services } from './sections/Services';
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
      <a
        href="#main"
        className="eyebrow sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-chalk focus:px-4 focus:py-3 focus:text-void"
      >
        {nav.skipLink}
      </a>
      <Header />
      {/* The page sits above the single fixed WebGL canvas (z 0); transparent sections show it. */}
      <div ref={page} className="relative z-[1]">
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <TechMarquee />
          <Process />
          <Services />
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
