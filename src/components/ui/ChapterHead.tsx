/**
 * Section opener: a hairline across the column, then "01 — Process" in mono with the total
 * on the right. useReveals draws the line and slides the labels in.
 */
export function ChapterHead({
  index,
  label,
  total = '06',
}: {
  index: string;
  label: string;
  total?: string;
}) {
  return (
    <div data-chapter-head className="mb-10 md:mb-14">
      <hr className="m-0 h-px border-0 bg-line" />
      <div data-chapter-label className="eyebrow mt-4 flex items-center justify-between text-ash">
        <span>
          <span className="text-signal-hi">{index}</span>
          <span className="mx-3 text-line-hi">—</span>
          {label}
        </span>
        <span aria-hidden="true">
          {index} / {total}
        </span>
      </div>
    </div>
  );
}
