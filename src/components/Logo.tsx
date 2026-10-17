import {
  LOGO_BOX,
  LOGO_CIRCLE,
  LOGO_COLOR,
  LOGO_FOOT,
  LOGO_STROKE,
  LOGO_STROKE_D,
} from '../brand/logoSpec';

interface LogoMarkProps {
  className?: string;
  /** Accessible name; omit when the mark sits next to the written name. */
  title?: string;
  /** Use the brand orange (default) or inherit the text colour. */
  tone?: 'brand' | 'current';
}

/** The logo mark, drawn from the measured geometry (brand/logoSpec.ts), cropped to its box. */
export function LogoMark({ className, title, tone = 'brand' }: LogoMarkProps) {
  const color = tone === 'brand' ? LOGO_COLOR : 'currentColor';
  return (
    <svg
      viewBox={`${LOGO_BOX.x} ${LOGO_BOX.y} ${LOGO_BOX.w} ${LOGO_BOX.h}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path
        d={LOGO_STROKE_D}
        fill="none"
        stroke={color}
        strokeWidth={LOGO_STROKE}
        strokeLinejoin="round"
      />
      <circle cx={LOGO_CIRCLE.cx} cy={LOGO_CIRCLE.cy} r={LOGO_CIRCLE.r} fill={color} />
      <rect
        x={LOGO_FOOT.x}
        y={LOGO_FOOT.y}
        width={LOGO_FOOT.w}
        height={LOGO_FOOT.h}
        rx={LOGO_FOOT.r}
        fill={color}
      />
    </svg>
  );
}

/** Mark + written name, for the header and footer. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <LogoMark className="h-7 w-auto" />
      <span className="text-[1.0625rem] font-medium tracking-[-0.02em] text-chalk">
        Fin Projukti
      </span>
    </span>
  );
}
