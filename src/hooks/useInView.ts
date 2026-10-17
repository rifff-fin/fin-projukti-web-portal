import { useEffect, useState, type RefObject } from 'react';

/** True while the element is on screen (or within `margin` of it). */
export function useInView(ref: RefObject<Element | null>, margin = '120px') {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: margin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return inView;
}
