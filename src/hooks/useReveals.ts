import type { RefObject } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { motionQuery } from '../lib/motion';
import { isRevealed, whenRevealed } from '../lib/preloader';

/**
 * Editorial scroll reveals for the page, set up from markup alone:
 *   h2, [data-reveal="lines"]   lines rise out of a mask (SplitText, re-split on resize);
 *                               h2[data-reveal="off"] is animated by its section instead
 *   [data-reveal="intro"]       same, on load (the hero headline; after the loader lifts)
 *   [data-reveal="intro-fade"]  fades up on load, after the headline
 *   [data-chapter-head]         hairline draws left to right, labels follow
 *   [data-reveal="fade"]        fades up
 *   [data-reveal="stagger"]     its children fade up in turn
 * Reduced motion: nothing runs, content is simply there.
 */
export function useReveals(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      gsap.matchMedia().add(motionQuery(), () => {
        const lines = (el: HTMLElement, onLoad: boolean) =>
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (self) => {
              const rise = gsap.from(self.lines, {
                yPercent: 110,
                duration: onLoad ? 1.25 : 1.05,
                delay: onLoad ? 0.1 : 0,
                ease: 'expo.out',
                stagger: 0.1,
                paused: onLoad && !isRevealed(),
                scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 88%', once: true },
              });
              if (onLoad) whenRevealed(() => rise.play());
              return rise;
            },
          });

        root
          .querySelectorAll<HTMLElement>('[data-reveal="intro"]')
          .forEach((el) => lines(el, true));
        root
          .querySelectorAll<HTMLElement>('h2:not([data-reveal="off"]), [data-reveal="lines"]')
          .forEach((el) => lines(el, false));

        const introFade = root.querySelectorAll<HTMLElement>('[data-reveal="intro-fade"]');
        if (introFade.length) {
          const tween = gsap.from(introFade, {
            autoAlpha: 0,
            y: 18,
            duration: 1,
            delay: 0.45,
            stagger: 0.08,
            ease: 'power2.out',
            paused: !isRevealed(),
          });
          whenRevealed(() => tween.play());
        }

        root.querySelectorAll<HTMLElement>('[data-chapter-head]').forEach((el) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
          tl.from(el.querySelector('hr'), {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.3,
            ease: 'expo.out',
          }).from(
            el.querySelectorAll('[data-chapter-label] > *'),
            { autoAlpha: 0, x: -12, stagger: 0.08, duration: 0.7, ease: 'power2.out' },
            0.2,
          );
        });

        root.querySelectorAll<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 28,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

        root.querySelectorAll<HTMLElement>('[data-reveal="stagger"]').forEach((el) => {
          gsap.from(el.children, {
            autoAlpha: 0,
            y: 32,
            duration: 0.95,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          });
        });
      });
    },
    { scope },
  );
}
