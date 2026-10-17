import { founder } from '../../content/copy';
import { Emph } from '../../components/ui/Emph';
import { ArrowUpRight, GitHub, LinkedIn, Mail } from '../../components/icons';

const icons = [LinkedIn, GitHub, Mail];

/** The way on: his own portfolio (kept up to date by him), LinkedIn, GitHub, email. */
export function FounderCta() {
  const c = founder.cta;
  return (
    <section aria-labelledby="founder-cta-title" className="pb-[var(--section-y)]">
      <div className="shell">
        <div className="grid gap-10 border border-line bg-carbon p-6 sm:p-10 lg:grid-cols-12 lg:gap-8 lg:p-14">
          <div className="lg:col-span-7">
            <h2 id="founder-cta-title" className="text-[length:var(--text-h2)]">
              <Emph text={c.title} />
            </h2>
            <p className="mt-6 max-w-[32rem] text-bone">{c.body}</p>
            <a
              href={founder.portfolio.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-10"
            >
              {c.button}
              <ArrowUpRight />
            </a>
          </div>
          <ul className="self-end border-t border-line lg:col-span-4 lg:col-start-9">
            {c.links.map((l, i) => {
              const Icon = icons[i];
              const external = l.href.startsWith('http');
              return (
                <li key={l.href} className="border-b border-line">
                  <a
                    href={l.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 py-4 text-bone transition-colors hover:text-chalk"
                  >
                    <Icon size={16} className="text-signal-hi" />
                    <span className="flex-1 break-all">{l.label}</span>
                    <ArrowUpRight
                      size={14}
                      className="text-ash transition-colors group-hover:text-chalk"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
