import type { ReactNode, SVGProps } from 'react';
import { useUid } from '../../hooks/useUid';

/**
 * Drawing kit for the mockup scenes: every scene is a 480 x 300 SVG built from these
 * pieces, coloured with the site's tokens through Tailwind's fill-* / stroke-* utilities.
 * Hairlines, square corners, one orange accent per scene (the signal).
 *
 * Animated parts carry an m-* / scene class (styles/mockups.css). A CSS animation of
 * `transform` replaces an element's transform attribute, so anything that moves sits in
 * its own <g> inside the one that positions it.
 */
const VIEW = '0 0 480 300';

export function Scene({ children }: { children: ReactNode }) {
  return (
    <svg viewBox={VIEW} className="absolute inset-0 block h-full w-full" fill="none">
      {children}
    </svg>
  );
}

type TProps = Omit<SVGProps<SVGTextElement>, 'fontSize'> & {
  size?: number;
  mono?: boolean;
  /** Mono only: upper case and tracked, like the site's labels (default). */
  caps?: boolean;
  serif?: boolean;
  anchor?: 'start' | 'middle' | 'end';
};

/** Text: Geist by default, Geist Mono (tracked, upper case) or Instrument Serif italic. */
export function T({
  size = 8,
  mono,
  caps = true,
  serif,
  anchor,
  className,
  style,
  children,
  ...rest
}: TProps) {
  const label = mono && caps;
  const face = mono
    ? `font-mono${label ? ' uppercase' : ''}`
    : serif
      ? 'font-serif italic'
      : 'font-sans';
  return (
    <text
      fontSize={size}
      textAnchor={anchor}
      className={`${face} ${className ?? 'fill-bone'}`}
      style={label ? { letterSpacing: '0.12em', ...style } : style}
      {...rest}
    >
      {children}
    </text>
  );
}

/** A line of placeholder text. */
export function Bar({
  x,
  y,
  w,
  h = 3,
  className = 'fill-line-hi',
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  className?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} className={className} />;
}

/** A hairline box (pixel-aligned). */
export function Box({
  x,
  y,
  w,
  h,
  className = 'fill-graphite stroke-line',
  rx,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  className?: string;
  rx?: number;
}) {
  return (
    <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} rx={rx} className={className} />
  );
}

/**
 * A browser window: hairline frame, three squares, the address. Children draw in the page's
 * own coordinates (0,0 = top left under the bar) and are clipped to it.
 */
export function Browser({
  x,
  y,
  w,
  h,
  url,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  url?: string;
  children?: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Box x={0} y={0} w={w} h={h} className="fill-void stroke-line-hi" />
      <path d={`M1 18.5H${w - 1}`} className="stroke-line" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={9 + i * 8} y={7} width={4} height={4} className="fill-line-hi" />
      ))}
      {url && (
        <>
          <rect x={w / 2 - 64} y={5} width={128} height={9} className="fill-graphite" />
          <T x={w / 2} y={11.6} size={5.5} anchor="middle" mono caps={false} className="fill-ash">
            {url}
          </T>
        </>
      )}
      <svg x={1} y={19} width={w - 2} height={h - 20}>
        {children}
      </svg>
    </g>
  );
}

/** A phone: rounded body, screen clipped to its corners, the camera island. */
export function Phone({
  x,
  y,
  w = 100,
  h = 206,
  children,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  children?: ReactNode;
}) {
  const clip = useUid('ph');
  const sw = w - 8;
  const sh = h - 8;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={0.5}
        y={0.5}
        width={w - 1}
        height={h - 1}
        rx={14}
        className="fill-[#050506] stroke-line-hi"
      />
      <clipPath id={clip}>
        <rect width={sw} height={sh} rx={10.5} />
      </clipPath>
      <g transform="translate(4 4)" clipPath={`url(#${clip})`}>
        <rect width={sw} height={sh} className="fill-void" />
        {children}
      </g>
      <rect x={w / 2 - 11} y={8} width={22} height={6} rx={3} className="fill-black" />
      <T x={14} y={14.5} size={5.5} className="fill-chalk" fontWeight={600}>
        9:41
      </T>
    </g>
  );
}

/** The pointer arrow, tip at (0,0). */
export function Cursor({ className = 'fill-chalk' }: { className?: string }) {
  return (
    <path
      d="M0 0v13.5l3.4-3.1 2.5 5.4 2.2-1-2.4-5.3h4.8z"
      className={`${className} stroke-void`}
      strokeWidth={0.8}
      strokeLinejoin="round"
    />
  );
}

/** A faint dot grid filling a rectangle. */
export function Dots({
  x,
  y,
  w,
  h,
  gap = 10,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  gap?: number;
}) {
  const id = useUid('dots');
  return (
    <>
      <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse">
        <circle cx={1} cy={1} r={0.6} className="fill-line-hi" />
      </pattern>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id})`} />
    </>
  );
}

/** A check in a circle (success). */
export function CheckDot({
  x,
  y,
  r = 5,
  className = 'fill-signal',
}: {
  x: number;
  y: number;
  r?: number;
  className?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} className={className} />
      <path
        d={`M${-r * 0.45} 0l${r * 0.3} ${r * 0.32} ${r * 0.55}-${r * 0.6}`}
        className="stroke-void"
        strokeWidth={Math.max(1, r * 0.24)}
        strokeLinecap="square"
      />
    </g>
  );
}
