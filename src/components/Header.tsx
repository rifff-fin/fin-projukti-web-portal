import { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { nav, site } from '../content/copy';
import { current, link, page } from '../lib/links';
import { firePulse } from '../store/scene';
import { LogoLockup } from './Logo';
import { MotionSwitch } from './MotionSwitch';
import { ArrowRight, Close, Menu, socialIcons } from './icons';

/**
 * Fixed header. Clear over the hero; after a little scroll it takes the page colour with a
 * light blur and a hairline. Phones get a full-screen menu (focus kept inside, Escape
 * closes it, the page stops scrolling underneath).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = 'hidden';
    lenis?.stop();
    panel.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key !== 'Tab' || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>('a, button');
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    const button = menuButton.current;
    return () => {
      html.style.overflow = '';
      lenis?.start();
      window.removeEventListener('keydown', onKey);
      button?.focus();
    };
  }, [open, lenis]);

  // close the menu if the screen grows past the menu layout (phones and tablets)
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mql.matches && setOpen(false);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ease-liquid ${
        solid
          ? 'border-b border-line bg-void/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
        <a
          href={page === 'home' ? '#top' : '/'}
          aria-label={nav.home}
          onClick={() => setOpen(false)}
        >
          <LogoLockup />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex xl:gap-9">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={link(l.href)}
              aria-current={current(l.href)}
              className="link-draw text-[0.9375rem] text-bone transition-colors hover:text-chalk aria-[current=page]:text-chalk aria-[current=page]:[background-size:100%_1px]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={link('#contact')}
            className="btn btn-primary btn-sm hidden lg:inline-flex"
            onPointerEnter={firePulse}
            onFocus={firePulse}
          >
            {nav.cta}
          </a>
          <button
            ref={menuButton}
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-chalk lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.close : nav.open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={panel}
          id="mobile-menu"
          className="fixed inset-x-0 top-[var(--header-h)] bottom-0 flex flex-col overflow-y-auto border-t border-line bg-void px-[var(--gutter)] pt-8 pb-10 lg:hidden"
        >
          <nav aria-label="Main" className="flex flex-col">
            {nav.links.map((l, i) => (
              <a
                key={l.href}
                href={link(l.href)}
                aria-current={current(l.href)}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line py-5 text-[2rem] font-light tracking-[-0.03em] text-chalk"
              >
                <span className="eyebrow text-signal-hi">0{i + 1}</span>
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={link('#contact')}
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-8 self-start"
          >
            {nav.cta}
            <ArrowRight />
          </a>
          <div className="mt-auto pt-10">
            <a href={`mailto:${site.email}`} className="text-bone">
              {site.email}
            </a>
            <div className="mt-5 flex flex-wrap gap-2">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.id];
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-11 w-11 items-center justify-center border border-line-hi text-bone"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
            <div className="mt-6">
              <MotionSwitch variant="inline" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
