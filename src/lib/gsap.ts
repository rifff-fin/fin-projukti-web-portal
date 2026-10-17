/**
 * GSAP setup — the only place plugins are registered.
 * Import gsap and plugins from here, never from 'gsap' directly in components.
 * All GSAP plugins (SplitText, ScrollTrigger) are free for commercial use.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Mobile address-bar show/hide must not re-layout the page's triggers.
ScrollTrigger.config({ ignoreMobileResize: true });

// Long, liquid eases; no overshoot.
gsap.defaults({ ease: 'power2.out', duration: 0.9 });

export { gsap, ScrollTrigger, SplitText, useGSAP };
