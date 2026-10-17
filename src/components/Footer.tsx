import type { ReactNode } from 'react';
import { footer, services, site } from '../content/copy';
import { firePulse } from '../store/scene';
import { Emph } from './ui/Emph';
import { LogoLockup } from './Logo';
import { LogoPlate } from './LogoPlate';
import { MotionSwitch } from './MotionSwitch';
import { ArrowRight, ArrowUp, socialIcons } from './icons';

/**
 * The closing call to action with the 3D logo (station `cta`; hovering the button sends a
 * pulse up it), then the site map, socials and the small print.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="shell grid items-center gap-10 py-[var(--section-y)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h2 className="text-[length:var(--text-display)] leading-[0.95]">
            <Emph text={footer.cta} />
          </h2>
          <a
            href="#contact"
            className="btn btn-primary mt-12"
            onPointerEnter={firePulse}
            onFocus={firePulse}
          >
            {footer.button}
            <ArrowRight />
          </a>
        </div>
        <div className="hidden justify-center lg:col-span-4 lg:col-start-9 lg:flex">
          <LogoPlate id="cta" className="h-[min(56svh,30rem)]" />
        </div>
      </div>

      <div className="shell grid gap-12 border-t border-line py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <LogoLockup />
          <p className="mt-5 max-w-[22rem] text-ash">{footer.tagline}</p>
          <a
            href={`mailto:${site.email}`}
            className="link-draw mt-5 inline-block text-bone hover:text-chalk"
          >
            {site.email}
          </a>
        </div>
        <FooterColumn title={footer.columns.services} className="lg:col-span-3 lg:col-start-6">
          {services.items.map((s) => (
            <li key={s.title}>
              <a href="#services" className="link-draw text-ash hover:text-chalk">
                {s.title}
              </a>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title={footer.columns.company} className="lg:col-span-2">
          {footer.companyLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-draw text-ash hover:text-chalk">
                {l.label}
              </a>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title={footer.columns.connect} className="lg:col-span-2">
          {site.socials.map((s) => {
            const Icon = socialIcons[s.id];
            return (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-ash transition-colors hover:text-chalk"
                >
                  <Icon size={15} />
                  {s.label}
                </a>
              </li>
            );
          })}
        </FooterColumn>
      </div>

      <div className="shell flex flex-col gap-4 border-t border-line py-7 text-[0.8125rem] text-ash sm:flex-row sm:items-center sm:justify-between">
        <p>{footer.copyright}</p>
        <div className="flex flex-wrap items-center gap-6">
          <span className="md:hidden">
            <MotionSwitch variant="inline" />
          </span>
          <p className="hidden md:block">{footer.crafted}</p>
          <a href="#top" className="inline-flex items-center gap-2 text-bone hover:text-chalk">
            {footer.backToTop}
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className = '',
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <h3 className="eyebrow text-chalk">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3 text-[0.9375rem]">{children}</ul>
    </div>
  );
}
