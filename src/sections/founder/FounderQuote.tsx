import { founder } from '../../content/copy';
import { Emph } from '../../components/ui/Emph';
import { LogoMark } from '../../components/Logo';

/** His line about the name: what "Fin" means to the founder. Lines rise in (useReveals). */
export function FounderQuote() {
  return (
    <section aria-label={founder.quote.by} className="border-y border-line bg-carbon">
      <figure className="shell grid gap-8 py-[clamp(4.5rem,9vw,8rem)] lg:grid-cols-12 lg:gap-8">
        <LogoMark className="h-12 w-auto lg:col-span-1 lg:h-16" />
        <blockquote className="lg:col-span-10">
          <p
            data-reveal="lines"
            className="headline text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.12] [&_em]:text-chalk"
          >
            <Emph text={founder.quote.text} />
          </p>
        </blockquote>
        <figcaption className="eyebrow text-ash lg:col-span-10 lg:col-start-2">
          — {founder.quote.by}
        </figcaption>
      </figure>
    </section>
  );
}
