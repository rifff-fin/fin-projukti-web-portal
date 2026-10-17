import { useState } from 'react';
import { work, type Project, type WorkGroup } from '../content/copy';
import { ScrollTrigger } from '../lib/gsap';
import { ChapterHead } from '../components/ui/ChapterHead';
import { Emph } from '../components/ui/Emph';
import { ArrowUpRight, GitHub } from '../components/icons';

/**
 * 04 Work — filterable project cards on a hairline grid. Six to start, "Show all" for the
 * rest. A card with a live site is one big link (the source link sits above it).
 */
export function Work() {
  const [filter, setFilter] = useState<WorkGroup | 'all'>('all');
  const [expanded, setExpanded] = useState(false);

  const matching = work.projects.filter((p) => filter === 'all' || p.groups.includes(filter));
  const shown = expanded ? matching : matching.slice(0, work.initialCount);
  const hidden = matching.length - shown.length;

  // the page below changes height: re-measure the scroll triggers after React paints
  const relayout = () => requestAnimationFrame(() => ScrollTrigger.refresh());

  return (
    <section id="work" aria-labelledby="work-title" className="py-[var(--section-y)]">
      <div className="shell">
        <ChapterHead index={work.index} label={work.label} />
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <h2 id="work-title" className="text-[length:var(--text-h2)] lg:col-span-7">
            <Emph text={work.title} />
          </h2>
          <div className="flex flex-col gap-6 self-end lg:col-span-4 lg:col-start-9">
            <p data-reveal="fade" className="max-w-[30rem] text-bone">
              {work.intro}
            </p>
            <a
              href={work.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw inline-flex items-center gap-2 self-start text-chalk"
            >
              <GitHub size={16} />
              {work.github.label}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div
          role="group"
          aria-label={work.filterLabel}
          className="mt-14 flex flex-wrap gap-2 lg:mt-20"
        >
          {work.filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              aria-pressed={filter === f.id}
              onClick={() => {
                setFilter(f.id);
                setExpanded(false);
                relayout();
              }}
            >
              {f.label}
              <span className="eyebrow text-ash">
                {f.id === 'all'
                  ? work.projects.length
                  : work.projects.filter((p) => p.groups.includes(f.id as WorkGroup)).length}
              </span>
            </button>
          ))}
        </div>

        <ul className="mt-8 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {shown.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </ul>

        {(hidden > 0 || expanded) && matching.length > work.initialCount && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setExpanded((e) => !e);
                relayout();
              }}
            >
              {expanded ? work.showLess : `${work.showAll} (${matching.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <li className="group relative flex flex-col bg-void p-6 transition-colors duration-300 ease-liquid hover:bg-carbon md:p-8">
      <div className="eyebrow flex items-center justify-between gap-4">
        <span className="text-signal-hi">{p.category}</span>
        <span className="text-ash">{p.year}</span>
      </div>
      <h3 className="mt-8 text-[length:var(--text-h3)] md:mt-12">
        {p.link ? (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-signal-hi"
          >
            {p.title}
          </a>
        ) : (
          p.title
        )}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ash">{p.description}</p>
      <p className="mt-6 flex items-center gap-3 text-chalk">
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-signal" />
        {p.metric}
      </p>
      <ul className="mt-6 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center gap-5 pt-8 text-[0.875rem]">
        {p.link && (
          <span className="inline-flex items-center gap-1.5 text-chalk">
            {work.live}
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 ease-liquid group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        )}
        {p.githubLink && (
          <a
            href={p.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw relative z-[1] inline-flex items-center gap-1.5 text-bone hover:text-chalk"
          >
            <GitHub size={14} />
            {work.code}
          </a>
        )}
        {!p.link && !p.githubLink && <span className="text-ash">{work.onRequest}</span>}
      </div>
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-liquid-expo group-hover:scale-x-100"
      />
    </li>
  );
}
