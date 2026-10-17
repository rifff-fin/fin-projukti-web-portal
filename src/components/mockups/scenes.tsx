import type { JSX, ReactNode } from 'react';
import type { MockupId } from '../../content/copy';
import { useUid } from '../../hooks/useUid';
import { Bar, Box, Browser, CheckDot, Cursor, Dots, Phone, Scene, T } from './kit';
import { Jobs, Kanban, Menu, NfcTap, Pos, Quake } from './scenes-work';
import '../../styles/mockups.css';

/**
 * The mockup scenes, one per MockupId. Services use the first six, project cards all of
 * them. Every scene is a still picture first (that is what reduced motion shows); the
 * classes from styles/mockups.css bring it to life while it is on screen.
 */
const scenes: Record<MockupId, () => JSX.Element> = {
  canvas: DesignCanvas,
  dashboard: Dashboard,
  storefront: Storefront,
  workflow: Workflow,
  cms: CmsSite,
  motion: MotionSite,
  nfc: NfcTap,
  quake: Quake,
  pos: Pos,
  menu: Menu,
  kanban: Kanban,
  jobs: Jobs,
};

export default function MockupScene({ id }: { id: MockupId }) {
  const Drawn = scenes[id];
  return <Drawn />;
}

/* ------------------------------------------------------------------ E-commerce */

const products = [
  { name: 'Glass bottle', price: '৳890' },
  { name: 'Field watch', price: '৳2,450' },
  { name: 'Canvas runner', price: '৳3,200' },
  { name: 'Clay mug', price: '৳650' },
];

function ProductGlyph({ i }: { i: number }) {
  const s = 'stroke-bone';
  if (i === 0)
    return (
      <g>
        <rect x={-7} y={-14} width={14} height={30} rx={4} className={`fill-carbon ${s}`} />
        <rect x={-3.5} y={-20} width={7} height={6} className="fill-line-hi" />
        <path d="M-7 -2h14" className="stroke-line-hi" />
      </g>
    );
  if (i === 1)
    return (
      <g>
        <rect x={-6} y={-24} width={12} height={48} className="fill-line" />
        <circle r={13} className={`fill-carbon ${s}`} strokeWidth={1.4} />
        <path d="M0 0V-8M0 0l5 3" className="stroke-chalk" strokeWidth={1.2} />
      </g>
    );
  if (i === 2)
    return (
      <path
        d="M-22 8c0-6 2-12 6-15l6 4 8-6c4 5 9 8 16 9 6 1 8 4 8 8z M-22 8h44v4h-44z"
        className={`fill-carbon ${s}`}
        strokeLinejoin="round"
      />
    );
  return (
    <g>
      <rect x={-11} y={-11} width={20} height={23} className={`fill-carbon ${s}`} />
      <path d="M9 -5h4a4 4 0 0 1 0 8h-4" className={s} />
    </g>
  );
}

function Storefront() {
  return (
    <Scene>
      <Browser x={14} y={14} w={364} h={272} url="atelier.store">
        <T x={14} y={20.5} size={14} serif className="fill-chalk">
          atelier
        </T>
        {['Shop', 'New in', 'Sale'].map((l, i) => (
          <T key={l} x={100 + i * 30} y={18} size={6.2} className="fill-ash">
            {l}
          </T>
        ))}
        <Box x={196} y={8} w={110} h={14} className="fill-carbon stroke-line" />
        <circle cx={205} cy={14.6} r={2.8} className="stroke-ash" strokeWidth={0.9} />
        <path d="M207 16.8l2 2" className="stroke-ash" strokeWidth={0.9} />
        <T x={213} y={17.2} size={5.6} className="fill-ash">
          Search products
        </T>
        <g transform="translate(322 7)">
          <path d="M1 5h12l-1.2 11H2.2z" className="stroke-bone" strokeLinejoin="round" />
          <path d="M4.5 5V3.6a2.5 2.5 0 0 1 5 0V5" className="stroke-bone" />
        </g>
        <g transform="translate(338 8)">
          <g className="sf-badge">
            <circle r={5.5} className="fill-signal" />
            <T
              className="sf-n2 fill-void"
              x={0}
              y={2.2}
              size={6.2}
              anchor="middle"
              fontWeight={600}
            >
              2
            </T>
            <T
              className="sf-n3 fill-void"
              x={0}
              y={2.2}
              size={6.2}
              anchor="middle"
              fontWeight={600}
            >
              3
            </T>
          </g>
        </g>
        <path d="M0 30.5H362" className="stroke-line" />

        {/* hero banner */}
        <Box x={14} y={40} w={334} h={84} />
        <T x={28} y={60} size={5.2} mono className="fill-ash">
          New season
        </T>
        <T x={28} y={80} size={15} className="fill-chalk" fontWeight={300}>
          Made to
        </T>
        <T x={88} y={80} size={17} serif className="fill-chalk">
          last.
        </T>
        <rect x={28} y={98} width={52} height={14} className="fill-signal" />
        <T x={54} y={107.2} size={6} anchor="middle" className="fill-void" fontWeight={500}>
          Shop now
        </T>
        <circle cx={286} cy={82} r={34} className="fill-carbon stroke-line-hi" />
        <path
          d="M279 56h14v7c0 3 9 8 9 22 0 15-7 25-16 25s-16-10-16-25c0-14 9-19 9-22z"
          className="fill-graphite stroke-bone"
          strokeLinejoin="round"
        />
        <path d="M273 84c4 2 22 2 26 0" className="stroke-line-hi" />

        {/* products */}
        {products.map((p, i) => {
          const x = 14 + i * 85.33;
          return (
            <g key={p.name}>
              <Box x={x} y={132} w={78} h={108} className="fill-carbon stroke-line" />
              <rect x={x + 1} y={133} width={76} height={60} className="fill-graphite" />
              <g transform={`translate(${x + 39} ${163})`}>
                <ProductGlyph i={i} />
              </g>
              <T x={x + 8} y={205} size={6.2} className="fill-bone">
                {p.name}
              </T>
              <T x={x + 8} y={224} size={7} className="fill-chalk" fontWeight={500}>
                {p.price}
              </T>
              <rect
                x={x + 52.5}
                y={212.5}
                width={17}
                height={14}
                className={`stroke-line-hi ${i === 1 ? 'sf-add fill-carbon' : 'fill-carbon'}`}
              />
              <path
                d={`M${x + 61} 216v7M${x + 57.5} 219.5h7`}
                className={i === 1 ? 'sf-plus stroke-chalk' : 'stroke-bone'}
              />
            </g>
          );
        })}

        <g transform="translate(161 219)">
          <circle className="sf-fly fill-signal" r={3.5} />
        </g>
        <g transform="translate(162 221)">
          <g className="sf-cursor">
            <Cursor />
          </g>
        </g>
      </Browser>

      <Phone x={352} y={66} w={114} h={226}>
        <T x={10} y={30} size={9.5} className="fill-chalk" fontWeight={500}>
          Checkout
        </T>
        <T x={10} y={39} size={4.6} mono className="fill-ash">
          2 items
        </T>
        {[
          { n: 'Field watch', p: '৳2,450', y: 46 },
          { n: 'Clay mug', p: '৳650', y: 68 },
        ].map((r) => (
          <g key={r.n}>
            <rect x={10} y={r.y} width={16} height={16} className="fill-graphite" />
            <T x={31} y={r.y + 7} size={5.8} className="fill-bone">
              {r.n}
            </T>
            <T x={31} y={r.y + 14} size={4.6} mono className="fill-ash">
              × 1
            </T>
            <T x={96} y={r.y + 10} size={5.8} anchor="end" className="fill-chalk">
              {r.p}
            </T>
          </g>
        ))}
        <path d="M10 92.5H96" className="stroke-line" />
        <T x={10} y={104} size={5.2} className="fill-ash">
          Delivery
        </T>
        <T x={96} y={104} size={5.2} anchor="end" className="fill-ash">
          ৳60
        </T>
        <T x={10} y={118} size={7} className="fill-chalk" fontWeight={500}>
          Total
        </T>
        <T x={96} y={118} size={7} anchor="end" className="fill-chalk" fontWeight={500}>
          ৳3,160
        </T>
        <T x={10} y={136} size={4.4} mono className="fill-ash">
          Pay with
        </T>
        <Box x={8} y={141} w={90} h={15} className="fill-carbon stroke-signal" />
        <circle cx={17} cy={148.5} r={3} className="stroke-signal" />
        <circle cx={17} cy={148.5} r={1.5} className="fill-signal" />
        <T x={24} y={150.6} size={5.4} className="fill-chalk">
          Cash on delivery
        </T>
        <Box x={8} y={159} w={90} h={15} className="fill-carbon stroke-line" />
        <circle cx={17} cy={166.5} r={3} className="stroke-line-hi" />
        <T x={24} y={168.6} size={5.4} className="fill-bone">
          Mobile wallet
        </T>
        <rect x={8} y={190} width={90} height={16} className="fill-signal" />
        <T x={53} y={200.2} size={6.4} anchor="middle" className="fill-void" fontWeight={500}>
          Place order
        </T>
        <g transform="translate(5 20)">
          <g className="sf-toast">
            <Box x={0} y={0} w={96} h={27} className="fill-graphite stroke-line-hi" />
            <CheckDot x={11} y={13.5} r={4.6} />
            <T x={20} y={11.6} size={5.8} className="fill-chalk" fontWeight={500}>
              Order confirmed
            </T>
            <T x={20} y={19.6} size={4.6} className="fill-ash">
              Update sent on WhatsApp
            </T>
          </g>
        </g>
      </Phone>
    </Scene>
  );
}

/* ------------------------------------------------------------- Web & app (dashboard) */

const salesY = [160, 151, 155, 141, 146, 131, 135, 121, 125, 112, 116, 104];

function Dashboard() {
  const grad = useUid('dash');
  const pts = salesY.map((y, i) => `${84 + i * 24} ${y}`);
  const line = `M${pts.join('L')}`;
  return (
    <Scene>
      <Browser x={14} y={14} w={372} h={272} url="stockly.app/inventory">
        <rect x={0} y={0} width={64} height={252} className="fill-carbon" />
        <path d="M64.5 0V252" className="stroke-line" />
        <rect x={12} y={12} width={7} height={7} className="fill-signal" />
        <T x={23} y={18.4} size={7} className="fill-chalk" fontWeight={500}>
          Stockly
        </T>
        {['Overview', 'Inventory', 'Orders', 'Suppliers', 'Reports', 'Settings'].map((l, i) => {
          const y = 40 + i * 17;
          const on = i === 1;
          return (
            <g key={l}>
              {on && <rect x={6} y={y - 7} width={52} height={14} className="fill-graphite" />}
              {on && <rect x={6} y={y - 7} width={1.5} height={14} className="fill-signal" />}
              <rect
                x={12.5}
                y={y - 3}
                width={6}
                height={6}
                className={on ? 'stroke-chalk' : 'stroke-ash'}
              />
              <T x={23} y={y + 2} size={5.8} className={on ? 'fill-chalk' : 'fill-ash'}>
                {l}
              </T>
            </g>
          );
        })}

        <T x={76} y={22} size={11} className="fill-chalk" fontWeight={300}>
          Inventory
        </T>
        <Box x={298} y={10} w={60} h={14} className="fill-void stroke-line" />
        <T x={328} y={19} size={4.8} anchor="middle" mono className="fill-ash">
          Last 30 days
        </T>

        {[
          { l: 'Orders', v: '1,284', d: '+12%' },
          { l: 'Revenue', v: '৳4.2L', d: '+8%' },
          { l: 'Low stock', v: '18', d: '−3' },
        ].map((k, i) => {
          const x = 76 + i * 96;
          return (
            <g key={k.l}>
              <Box x={x} y={32} w={88} h={42} className="fill-carbon stroke-line" />
              <T x={x + 8} y={44} size={4.8} mono className="fill-ash">
                {k.l}
              </T>
              <T
                x={x + 80}
                y={44}
                size={4.8}
                anchor="end"
                mono
                className={i === 0 ? 'fill-signal-hi' : 'fill-ash'}
              >
                {k.d}
              </T>
              <T x={x + 8} y={65} size={14} className="fill-chalk" fontWeight={300}>
                {k.v}
              </T>
            </g>
          );
        })}

        <Box x={76} y={82} w={280} h={98} className="fill-carbon stroke-line" />
        <T x={84} y={95} size={4.8} mono className="fill-ash">
          Sales · 30 days
        </T>
        {[110, 128, 146, 164].map((y) => (
          <path key={y} d={`M84 ${y + 0.5}H348`} className="stroke-line" strokeDasharray="2 3" />
        ))}
        <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--signal)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--signal)" stopOpacity="0" />
        </linearGradient>
        <path d={`${line}L348 172L84 172Z`} fill={`url(#${grad})`} className="m-fade" />
        <path
          d={line}
          pathLength={100}
          className="m-draw stroke-signal"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
        <circle cx={348} cy={104} r={2.4} className="fill-signal" />
        <circle cx={348} cy={104} r={2.4} className="m-ping stroke-signal" />

        {[
          { n: 'Cotton tee · M', q: '142', s: 'In stock' },
          { n: 'Leather wallet', q: '36', s: 'In stock' },
          { n: 'Ceramic mug', q: '4', s: 'Low stock' },
        ].map((r, i) => {
          const y = 188 + i * 20;
          const low = i === 2;
          return (
            <g key={r.n}>
              <rect x={84} y={y + 5} width={10} height={10} className="fill-graphite" />
              <T x={100} y={y + 12} size={5.8} className="fill-bone">
                {r.n}
              </T>
              <T x={240} y={y + 12} size={5.8} anchor="end" className="fill-chalk">
                {r.q}
              </T>
              <g className={low ? 'm-glow' : undefined}>
                <Box
                  x={292}
                  y={y + 4.5}
                  w={56}
                  h={12}
                  className={low ? 'fill-void stroke-signal' : 'fill-void stroke-line-hi'}
                />
                <T
                  x={320}
                  y={y + 12.4}
                  size={4.6}
                  anchor="middle"
                  mono
                  className={low ? 'fill-signal-hi' : 'fill-ash'}
                >
                  {r.s}
                </T>
              </g>
              <path d={`M84 ${y + 20.5}H348`} className="stroke-line" />
            </g>
          );
        })}
      </Browser>

      <Phone x={362} y={92} w={100} h={196}>
        <T x={9} y={28} size={8.5} className="fill-chalk" fontWeight={500}>
          Today
        </T>
        <T x={9} y={36} size={4.4} mono className="fill-ash">
          Sales target
        </T>
        <circle cx={46} cy={70} r={21} className="stroke-line" strokeWidth={5} />
        <circle
          cx={46}
          cy={70}
          r={21}
          pathLength={100}
          strokeDasharray="68 100"
          transform="rotate(-90 46 70)"
          className="m-arc stroke-signal"
          strokeWidth={5}
        />
        <T x={46} y={73.5} size={10} anchor="middle" className="fill-chalk" fontWeight={300}>
          68%
        </T>
        {[
          { n: 'Order #1042', p: '৳2,450' },
          { n: 'Order #1041', p: '৳650' },
          { n: 'Order #1040', p: '৳1,120' },
        ].map((r, i) => {
          const y = 104 + i * 18;
          return (
            <g key={r.n}>
              <rect x={9} y={y} width={9} height={9} className="fill-graphite" />
              <T x={22} y={y + 6.6} size={5.2} className="fill-bone">
                {r.n}
              </T>
              <T x={84} y={y + 6.6} size={5.2} anchor="end" className="fill-chalk">
                {r.p}
              </T>
            </g>
          );
        })}
        <path d="M0 165.5H92" className="stroke-line" />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={13 + i * 20}
            y={172}
            width={6}
            height={6}
            className={i === 0 ? 'fill-signal' : 'stroke-ash'}
          />
        ))}
      </Phone>
    </Scene>
  );
}

/* ------------------------------------------------------------- Automation (n8n) */

const flowEdges = [
  { d: 'M94 126H132', delay: 0 },
  { d: 'M208 126C232 126 232 72 256 72', delay: 1 },
  { d: 'M208 126C232 126 232 180 256 180', delay: 1 },
  { d: 'M332 72C368 72 368 126 396 126', delay: 2 },
  { d: 'M332 180C368 180 368 126 396 126', delay: 2 },
];

function FlowNode({
  x,
  y,
  title,
  sub,
  step,
  icon,
}: {
  x: number;
  y: number;
  title: string;
  sub: string;
  step: number;
  icon: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Box x={0} y={0} w={76} h={40} className="fill-carbon stroke-line-hi wf-node" />
      <rect
        x={0.5}
        y={0.5}
        width={75}
        height={39}
        className="wf-flash stroke-signal"
        style={{ animationDelay: `${step * 1}s` }}
      />
      <g transform="translate(14 20)">{icon}</g>
      <T x={27} y={18} size={6.4} className="fill-chalk" fontWeight={500}>
        {title}
      </T>
      <T x={27} y={27} size={4.4} mono className="fill-ash">
        {sub}
      </T>
    </g>
  );
}

function Workflow() {
  return (
    <Scene>
      <Browser x={14} y={14} w={452} h={272} url="n8n · orders-to-whatsapp">
        <Dots x={0} y={0} w={450} h={252} />
        <T x={12} y={18} size={8} className="fill-chalk" fontWeight={500}>
          Order to WhatsApp
        </T>
        <T x={12} y={27} size={4.6} mono className="fill-ash">
          Workflow · 5 nodes
        </T>
        <rect x={378} y={10} width={18} height={10} rx={5} className="fill-signal" />
        <circle cx={391} cy={15} r={3.4} className="fill-void" />
        <T x={401} y={17} size={5} mono className="fill-bone">
          Active
        </T>

        {flowEdges.map((e) => (
          <g key={e.d}>
            <path d={e.d} className="stroke-line-hi" strokeWidth={1.1} />
            <path
              d={e.d}
              pathLength={100}
              className="m-hop stroke-signal"
              strokeWidth={2.2}
              strokeLinecap="round"
              style={{ animationDelay: `${e.delay}s` }}
            />
          </g>
        ))}

        <FlowNode
          x={18}
          y={106}
          step={0}
          title="New order"
          sub="Webhook"
          icon={<rect x={-5} y={-5} width={10} height={10} className="fill-signal" />}
        />
        <FlowNode
          x={132}
          y={106}
          step={1}
          title="AI agent"
          sub="Classify + reply"
          icon={
            <g className="stroke-bone">
              <circle r={5.5} />
              <circle r={1.4} className="fill-bone" />
              <path d="M0 -5.5V-8M0 5.5V8M-5.5 0H-8M5.5 0H8" />
            </g>
          }
        />
        <FlowNode
          x={256}
          y={52}
          step={2}
          title="WhatsApp"
          sub="Send update"
          icon={
            <path
              d="M0 -5.5a5.5 5.5 0 0 0-4.8 8.2L-5.6 5.6l3-0.8A5.5 5.5 0 1 0 0 -5.5z"
              className="stroke-bone"
              strokeLinejoin="round"
            />
          }
        />
        <FlowNode
          x={256}
          y={160}
          step={2}
          title="Google Sheets"
          sub="Append row"
          icon={
            <g className="stroke-bone">
              <rect x={-5} y={-5.5} width={10} height={11} />
              <path d="M-5 -1.5H5M-5 2H5M-1 -5.5V5.5" />
            </g>
          }
        />

        <g transform="translate(411 126)">
          <circle r={15} className="fill-signal" />
          <circle r={15} className="wf-done stroke-signal" />
          <path d="M-5.5 0l3.8 3.8L5.8 -4.2" className="stroke-void" strokeWidth={2} />
        </g>
        <T x={411} y={153} size={4.6} anchor="middle" mono className="fill-ash">
          Done
        </T>

        <Box x={12} y={216} w={196} h={24} className="fill-carbon stroke-line" />
        <CheckDot x={24} y={228} r={4.2} />
        <T x={33} y={230} size={5} mono caps={false} className="fill-bone">
          Execution #1042 · succeeded in 1.8 s
        </T>
      </Browser>
    </Scene>
  );
}

/* ------------------------------------------------------------- UI/UX (design canvas) */

function DesignCanvas() {
  return (
    <Scene>
      <Browser x={14} y={14} w={452} h={272} url="design · checkout-flow">
        <rect x={0} y={0} width={450} height={20} className="fill-carbon" />
        <path d="M0 20.5H450" className="stroke-line" />
        <rect x={6} y={4} width={13} height={12} className="fill-graphite" />
        <path d="M10 7v6.5l1.7-1.5 1.2 2.6 1-.5-1.2-2.5h2.4z" className="fill-chalk" />
        <g className="stroke-ash">
          <path d="M26 7v7M30 7v7M24 9h8M24 12h8" />
          <rect x={38.5} y={7.5} width={7} height={6} />
          <circle cx={55} cy={10.5} r={3.5} />
          <path d="M62 7.5h6M65 7.5v6.5" />
        </g>
        <circle cx={392} cy={10} r={5} className="fill-graphite stroke-void" />
        <circle cx={400} cy={10} r={5} className="fill-line-hi stroke-void" />
        <Box x={412} y={4} w={32} h={12} className="fill-void stroke-line-hi" />
        <T x={428} y={11.8} size={5.2} anchor="middle" className="fill-chalk">
          Share
        </T>

        {/* layers */}
        <rect x={0} y={21} width={84} height={231} className="fill-carbon" />
        <path d="M84.5 21V252" className="stroke-line" />
        <T x={8} y={33} size={4.6} mono className="fill-ash">
          Layers
        </T>
        {[
          { l: 'Checkout — 01', d: 0 },
          { l: 'Header', d: 1 },
          { l: 'Title', d: 1 },
          { l: 'Email field', d: 1 },
          { l: 'Password field', d: 1 },
          { l: 'Button / Primary', d: 1, on: true },
          { l: 'Footer', d: 1 },
          { l: 'Desktop — 01', d: 0 },
        ].map((r, i) => {
          const y = 44 + i * 13;
          return (
            <g key={r.l}>
              {r.on && <rect x={1} y={y - 6} width={83} height={12} className="fill-graphite" />}
              <rect
                x={8 + r.d * 8}
                y={y - 2.5}
                width={5}
                height={5}
                className={r.on ? 'fill-signal' : 'stroke-ash'}
              />
              <T x={17 + r.d * 8} y={y + 2} size={5.2} className={r.on ? 'fill-chalk' : 'fill-ash'}>
                {r.l}
              </T>
            </g>
          );
        })}

        {/* properties */}
        <rect x={366} y={21} width={84} height={231} className="fill-carbon" />
        <path d="M365.5 21V252" className="stroke-line" />
        <T x={374} y={33} size={4.6} mono className="fill-ash">
          Design
        </T>
        {[
          { t: 'W 248', x: 374 },
          { t: 'H 48', x: 410 },
        ].map((f) => (
          <g key={f.t}>
            <Box x={f.x} y={39} w={33} h={12} className="fill-void stroke-line" />
            <T x={f.x + 5} y={46.8} size={5} mono caps={false} className="fill-bone">
              {f.t}
            </T>
          </g>
        ))}
        <T x={374} y={66} size={4.6} mono className="fill-ash">
          Fill
        </T>
        {[
          { c: 'fill-void', hex: '#0A0A0B' },
          { c: 'fill-graphite', hex: '#1A1A1E' },
          { c: 'fill-chalk', hex: '#F4F4F2' },
          { c: 'fill-signal', hex: '#FF7A1B', on: true },
        ].map((s, i) => {
          const y = 72 + i * 13;
          return (
            <g key={s.hex}>
              <rect
                x={374.5}
                y={y + 0.5}
                width={9}
                height={9}
                className={`${s.c} stroke-line-hi`}
              />
              <T
                x={388}
                y={y + 7.4}
                size={5}
                mono
                caps={false}
                className={s.on ? 'fill-chalk' : 'fill-ash'}
              >
                {s.hex}
              </T>
            </g>
          );
        })}
        <T x={374} y={136} size={4.6} mono className="fill-ash">
          Text
        </T>
        <T x={374} y={160} size={22} serif className="fill-chalk">
          Aa
        </T>
        <T x={374} y={171} size={5} mono caps={false} className="fill-ash">
          Geist · 300
        </T>

        {/* canvas */}
        <Dots x={85} y={21} w={280} h={231} gap={12} />
        <T x={104} y={35} size={4.4} mono className="fill-ash">
          iPhone — Checkout
        </T>
        <Box x={104} y={39} w={100} h={202} className="fill-carbon stroke-line" />
        <T x={114} y={66} size={10} className="fill-chalk" fontWeight={300}>
          Welcome
        </T>
        <T x={114} y={78} size={11} serif className="fill-chalk">
          back.
        </T>
        {[90, 118].map((y, i) => (
          <g key={y}>
            <T x={114} y={y} size={4.2} mono className="fill-ash">
              {i ? 'Password' : 'Email'}
            </T>
            <Box x={114} y={y + 3} w={80} h={15} className="fill-void stroke-line-hi" />
          </g>
        ))}
        <rect x={114} y={146} width={80} height={16} className="fill-chalk" />
        <T x={154} y={156.4} size={6} anchor="middle" className="fill-void" fontWeight={500}>
          Continue
        </T>
        <rect x={112.5} y={144.5} width={83} height={19} className="stroke-signal" />
        {[
          [112.5, 144.5],
          [195.5, 144.5],
          [112.5, 163.5],
          [195.5, 163.5],
        ].map(([x, y]) => (
          <rect
            key={`${x}${y}`}
            x={x - 1.8}
            y={y - 1.8}
            width={3.6}
            height={3.6}
            className="fill-void stroke-signal"
          />
        ))}
        <g className="m-glow">
          <rect x={134} y={168} width={40} height={9} className="fill-signal" />
          <T x={154} y={174.2} size={4.6} anchor="middle" mono caps={false} className="fill-void">
            248 × 48
          </T>
        </g>
        <Bar x={124} y={192} w={60} className="fill-line" />
        <Box x={114} y={202} w={38} h={14} className="fill-void stroke-line" />
        <Box x={156} y={202} w={38} h={14} className="fill-void stroke-line" />

        <T x={220} y={35} size={4.4} mono className="fill-ash">
          Desktop — Checkout
        </T>
        <Box x={220} y={39} w={134} h={90} className="fill-carbon stroke-line" />
        <Bar x={228} y={47} w={20} className="fill-line-hi" />
        <Bar x={300} y={47} w={46} className="fill-line" />
        <Box x={228} y={58} w={56} h={60} className="fill-void stroke-line" />
        <path d="M228.5 58.5l55 59M283.5 58.5l-55 59" className="stroke-line" />
        <Bar x={292} y={62} w={52} h={5} className="fill-line-hi" />
        <Bar x={292} y={72} w={44} className="fill-line" />
        <Bar x={292} y={79} w={48} className="fill-line" />
        <Box x={292} y={100} w={40} h={12} className="fill-void stroke-line-hi" />

        <T x={220} y={143} size={4.4} mono className="fill-ash">
          Components
        </T>
        <Box x={220} y={147} w={134} h={94} className="fill-carbon stroke-line" />
        <rect x={230} y={158} width={34} height={12} className="fill-chalk" />
        <Box x={270} y={158} w={34} h={12} className="fill-void stroke-line-hi" />
        <rect x={310} y={158} width={34} height={12} className="fill-graphite" />
        <Box x={230} y={178} w={114} h={14} className="fill-void stroke-line-hi" />
        {[0, 1, 2].map((i) => (
          <Box key={i} x={230 + i * 30} y={200} w={26} h={10} className="fill-void stroke-line" />
        ))}
        <circle cx={240} cy={226} r={6} className="fill-graphite stroke-line-hi" />
        <Bar x={252} y={221} w={50} className="fill-line-hi" />
        <Bar x={252} y={228} w={34} className="fill-line" />

        <g transform="translate(250 104)">
          <g className="cv-cursor">
            <Cursor />
            <rect x={9} y={13} width={20} height={9} className="fill-chalk" />
            <T x={19} y={19.4} size={5} anchor="middle" className="fill-void" fontWeight={500}>
              Fin
            </T>
          </g>
        </g>
      </Browser>
    </Scene>
  );
}

/* ------------------------------------------------------------- Webflow (CMS site) */

function Artwork({ i }: { i: number }) {
  if (i === 0) return <path d="M-14 16V0a14 14 0 0 1 28 0v16z" className="fill-line-hi" />;
  if (i === 1)
    return (
      <g>
        <circle r={16} className="fill-carbon stroke-line-hi" />
        <rect x={4} y={-22} width={12} height={12} className="fill-line-hi" />
      </g>
    );
  if (i === 2)
    return (
      <g className="stroke-line-hi" strokeWidth={3}>
        <path d="M-30 14l24-24M-18 14l24-24M-6 14l24-24M6 14l24-24" />
      </g>
    );
  if (i === 3)
    return (
      <g className="stroke-line-hi">
        <circle r={6} />
        <circle r={13} />
        <circle r={20} />
      </g>
    );
  if (i === 4)
    return (
      <g>
        <path d="M-20 8a20 20 0 0 1 40 0z" className="fill-line-hi" />
        <rect x={-20} y={11} width={40} height={4} className="fill-line" />
      </g>
    );
  return (
    <g className="fill-line-hi">
      {[-12, 0, 12].map((x) =>
        [-12, 0, 12].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r={2.2} />),
      )}
    </g>
  );
}

const tiles = [
  { x: 14, y: 106, h: 70, art: 0 },
  { x: 14, y: 182, h: 64, art: 3 },
  { x: 98, y: 106, h: 92, art: 1 },
  { x: 98, y: 204, h: 42, art: 5 },
  { x: 182, y: 106, h: 56, art: 2 },
  { x: 182, y: 168, h: 78, art: 4 },
];

function CmsSite() {
  return (
    <Scene>
      <Browser x={14} y={14} w={452} h={272} url="studio.site">
        <T x={14} y={20.5} size={13} serif className="fill-chalk">
          Studio
        </T>
        {['Work', 'About', 'Journal', 'Contact'].map((l, i) => (
          <T key={l} x={150 + i * 30} y={18} size={6} className="fill-ash">
            {l}
          </T>
        ))}
        <path d="M0 30.5H450" className="stroke-line" />
        <T x={14} y={60} size={20} className="fill-chalk" fontWeight={300}>
          We make
        </T>
        <T x={104} y={60} size={23} serif className="fill-chalk">
          brands
        </T>
        <T x={14} y={84} size={20} className="fill-chalk" fontWeight={300}>
          that move.
        </T>
        <Bar x={14} y={92} w={140} className="fill-line" />

        {tiles.map((t, i) => (
          <g key={i}>
            <Box x={t.x} y={t.y} w={78} h={t.h} />
            <g transform={`translate(${t.x + 39} ${t.y + t.h / 2})`}>
              <Artwork i={t.art} />
            </g>
          </g>
        ))}
        {/* the item that gets published */}
        <g className="cms-tile">
          <Box x={14} y={106} w={78} h={70} className="fill-carbon stroke-line-hi" />
          <circle cx={53} cy={141} r={17} className="fill-graphite stroke-line-hi" />
          <circle cx={62} cy={132} r={5} className="fill-signal" />
        </g>

        <Box x={272} y={40} w={168} h={206} className="fill-carbon stroke-line-hi" />
        <T x={282} y={54} size={4.8} mono className="fill-ash">
          CMS · Projects
        </T>
        <T x={430} y={54} size={4.8} anchor="end" mono className="fill-ash">
          12 items
        </T>
        <path d="M273 61.5H439" className="stroke-line" />
        <g className="cms-row">
          <rect x={273} y={63} width={166} height={22} className="fill-graphite" />
          <rect x={273} y={63} width={1.5} height={22} className="fill-signal" />
          <rect x={282} y={66} width={18} height={16} className="fill-carbon stroke-line-hi" />
          <circle cx={294} cy={71} r={2.4} className="fill-signal" />
          <T x={306} y={72.5} size={6} className="fill-chalk">
            Bloom identity
          </T>
          <T x={306} y={80} size={4.4} mono caps={false} className="fill-signal-hi">
            New · Draft
          </T>
        </g>
        {['Riverline', 'Kantha Co.', 'North arch', 'Field notes'].map((n, i) => {
          const y = 87 + i * 24;
          return (
            <g key={n}>
              <rect x={282} y={y + 3} width={18} height={16} className="fill-graphite" />
              <T x={306} y={y + 9.5} size={6} className="fill-bone">
                {n}
              </T>
              <T x={306} y={y + 17} size={4.4} mono caps={false} className="fill-ash">
                Published
              </T>
              <path d={`M273 ${y + 22.5}H439`} className="stroke-line" />
            </g>
          );
        })}
        <Box x={282} y={222} w={64} h={15} className="fill-void stroke-line-hi" />
        <T x={314} y={231.8} size={5.4} anchor="middle" className="fill-bone">
          + New item
        </T>
        <rect x={352} y={222} width={78} height={15} className="cms-publish fill-signal" />
        <T x={391} y={231.8} size={5.6} anchor="middle" className="fill-void" fontWeight={500}>
          Publish site
        </T>
      </Browser>
    </Scene>
  );
}

/* ------------------------------------------------------------- Framer (motion site) */

function MotionSite() {
  return (
    <Scene>
      <Browser x={14} y={14} w={452} h={272} url="portfolio.site">
        <rect x={14} y={11} width={7} height={7} className="fill-chalk" />
        <circle cx={28.5} cy={14.5} r={3.5} className="fill-chalk" />
        {['Work', 'About', 'Contact'].map((l, i) => (
          <T key={l} x={350 + i * 30} y={17} size={6} className="fill-ash">
            {l}
          </T>
        ))}
        <T x={24} y={66} size={5} mono className="fill-ash">
          Portfolio — 2026
        </T>
        <T x={24} y={98} size={26} className="fill-chalk" fontWeight={300}>
          Design in
        </T>
        <T x={24} y={128} size={30} serif className="fill-chalk">
          motion.
        </T>
        <Bar x={24} y={142} w={136} className="fill-line-hi" />
        <Bar x={24} y={150} w={104} className="fill-line-hi" />
        <Box x={24} y={166} w={70} h={18} className="fill-void stroke-line-hi" />
        <T x={34} y={177.6} size={6.2} className="fill-chalk">
          View work
        </T>
        <path d="M76 175h8M81 172l3 3-3 3" className="stroke-chalk" />

        {/* a floating stack of project cards */}
        <g transform="translate(300 118)">
          <g className="mo-f3">
            <g transform="translate(26 -46) rotate(8) skewX(-6)">
              <Box x={-56} y={-36} w={112} h={72} className="fill-graphite stroke-line" />
            </g>
          </g>
          <g className="mo-f2">
            <g transform="translate(10 -16) rotate(3) skewX(-6)">
              <Box x={-56} y={-36} w={112} h={72} className="fill-carbon stroke-line-hi" />
              <Bar x={-46} y={-26} w={40} className="fill-line-hi" />
              <Bar x={-46} y={-19} w={60} className="fill-line" />
            </g>
          </g>
          <g className="mo-f1">
            <g transform="translate(-8 18) rotate(-4) skewX(-6)">
              <Box x={-60} y={-38} w={120} h={76} className="fill-void stroke-line-hi" />
              <path d="M-48 18H-26V2H-4V-14H18" className="stroke-line-hi" strokeWidth={4} />
              <path
                d="M-37 18H-26V2H-4V-14H18"
                pathLength={100}
                className="m-hop stroke-signal"
                strokeWidth={2.4}
                strokeLinecap="round"
              />
              <g transform="translate(-37 18)">
                <rect className="mo-sq fill-signal" x={-6} y={-6} width={12} height={12} />
              </g>
              <g transform="translate(18 -14)">
                <circle className="mo-ci fill-signal" r={7} />
              </g>
              <T x={-48} y={33} size={4.4} mono className="fill-ash">
                Case 03 · 2026
              </T>
            </g>
          </g>
        </g>

        <path d="M440.5 40V200" className="stroke-line" />
        <rect className="mo-scroll fill-signal" x={439.5} y={40} width={2} height={28} />

        <path d="M0 214.5H450" className="stroke-line" />
        <svg x={0} y={215} width={450} height={37}>
          <g className="mo-marquee">
            {[0, 1, 2, 3].map((k) => (
              <T
                key={k}
                x={k * 220}
                y={22}
                size={7}
                mono
                className="fill-ash"
                textLength={210}
                lengthAdjust="spacing"
              >
                Branding · Web · Motion · 3D · Product ·
              </T>
            ))}
          </g>
        </svg>
      </Browser>
    </Scene>
  );
}
