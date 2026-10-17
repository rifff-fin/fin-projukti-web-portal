import { LOGO_CIRCLE, LOGO_FOOT, LOGO_STROKE, LOGO_STROKE_D } from '../../brand/logoSpec';
import { QR_PATH, QR_SIZE } from '../../brand/qr';
import { useUid } from '../../hooks/useUid';
import { Bar, Box, Browser, CheckDot, Cursor, Phone, Scene, T } from './kit';

/** Mockup scenes for the project cards (the service scenes are in scenes.tsx). */

/* ------------------------------------------------------------- NFC card */

/** The Fin logo mark, scaled to `h` units tall and centred on (0,0). */
function Mark({ h }: { h: number }) {
  const k = h / 375;
  return (
    <g transform={`scale(${k}) translate(-250 -251.5)`}>
      <path
        d={LOGO_STROKE_D}
        className="stroke-signal"
        strokeWidth={LOGO_STROKE}
        strokeLinejoin="round"
      />
      <circle cx={LOGO_CIRCLE.cx} cy={LOGO_CIRCLE.cy} r={LOGO_CIRCLE.r} className="fill-signal" />
      <rect
        x={LOGO_FOOT.x}
        y={LOGO_FOOT.y}
        width={LOGO_FOOT.w}
        height={LOGO_FOOT.h}
        rx={LOGO_FOOT.r}
        className="fill-signal"
      />
    </g>
  );
}

export function NfcTap() {
  const q = 50 / QR_SIZE;
  return (
    <Scene>
      <Phone x={290} y={40} w={108} h={224}>
        <g className="nf-wake">
          <rect width={100} height={46} className="fill-graphite" />
          <path d="M0 46.5H100" className="stroke-line" />
          <circle cx={50} cy={48} r={16} className="fill-void stroke-signal" />
          <g transform="translate(50 48)">
            <Mark h={16} />
          </g>
          <T x={50} y={78} size={8} anchor="middle" className="fill-chalk" fontWeight={500}>
            Your name
          </T>
          <T x={50} y={86.5} size={4.8} anchor="middle" className="fill-ash">
            Founder · Company
          </T>
          <rect x={9} y={94} width={82} height={13} className="fill-signal" />
          <T x={50} y={102.6} size={5.4} anchor="middle" className="fill-void" fontWeight={500}>
            Save contact
          </T>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <Box x={9 + i * 28.5} y={111} w={25} h={20} className="fill-void stroke-line-hi" />
              <rect x={19 + i * 28.5} y={116} width={5} height={5} className="stroke-signal-hi" />
              <Bar x={16 + i * 28.5} y={125} w={11} h={2} className="fill-line-hi" />
            </g>
          ))}
          {[138, 152, 166].map((y) => (
            <g key={y}>
              <Bar x={12} y={y + 4} w={5} h={5} className="fill-line-hi" />
              <Bar x={21} y={y + 5} w={44} className="fill-line-hi" />
              <path d={`M9 ${y + 12.5}H91`} className="stroke-line" />
            </g>
          ))}
          <T x={50} y={208} size={3.8} anchor="middle" mono className="fill-ash">
            Powered by Fin NFC
          </T>
        </g>
      </Phone>

      {/* the read */}
      <g transform="translate(300 150)">
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            r={22}
            className="nf-ring stroke-signal"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </g>

      <g transform="translate(46 136) rotate(-5 108 67)">
        <g className="nf-card">
          <rect
            x={0.5}
            y={0.5}
            width={215}
            height={134}
            rx={16}
            className="fill-[#08080a] stroke-line-hi"
          />
          <path d="M16 1.5h184" className="stroke-[#ffffff22]" />
          <T
            x={17}
            y={66}
            size={14}
            className="fill-white"
            style={{ fontFamily: "'Quicksand', var(--ff-sans)" }}
            fontWeight={500}
          >
            Your name here
          </T>
          <T x={18} y={77} size={4.8} className="fill-[#e4e4e4]">
            Founder & CEO
          </T>
          <rect x={146} y={39} width={57} height={57} className="fill-white" />
          <path d={QR_PATH} transform={`translate(149.5 42.5) scale(${q})`} className="fill-void" />
        </g>
      </g>
    </Scene>
  );
}

/* ------------------------------------------------------------- Earthquake alerts */

/** A closed contour around (cx, cy): a wobbly circle, the same every render. */
function contour(cx: number, cy: number, r: number, seed: number) {
  const pts: string[] = [];
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    const k = 1 + 0.16 * Math.sin(3 * a + seed) + 0.07 * Math.cos(5 * a + seed * 2);
    pts.push(
      `${(cx + Math.cos(a) * r * k * 1.25).toFixed(1)} ${(cy + Math.sin(a) * r * k).toFixed(1)}`,
    );
  }
  return `M${pts.join('L')}Z`;
}

const seismo = (() => {
  const pts: string[] = [];
  for (let x = 8; x <= 442; x += 3) {
    const burst = Math.exp(-(((x - 250) / 38) ** 2));
    const amp = 1.6 + burst * 19;
    const y = 228 + Math.sin(x * 1.7) * amp * Math.sin(x * 0.37 + 1);
    pts.push(`${x} ${y.toFixed(1)}`);
  }
  return `M${pts.join('L')}`;
})();

const feed = [
  { m: '4.6', p: 'Sylhet', t: '2 min ago' },
  { m: '3.9', p: 'Myanmar border', t: '1 h ago' },
  { m: '3.2', p: 'Chattogram', t: '5 h ago' },
  { m: '4.1', p: 'Assam, India', t: '1 d ago' },
  { m: '2.8', p: 'Bay of Bengal', t: '2 d ago' },
];

export function Quake() {
  return (
    <Scene>
      <Browser x={14} y={14} w={452} h={272} url="bdquakealert · live">
        <rect x={0} y={0} width={296} height={196} className="fill-carbon" />
        {[40, 80, 120, 160, 200, 240, 280].map((x) => (
          <path key={x} d={`M${x + 0.5} 0V196`} className="stroke-line" strokeDasharray="1 3" />
        ))}
        {[40, 80, 120, 160].map((y) => (
          <path key={y} d={`M0 ${y + 0.5}H296`} className="stroke-line" strokeDasharray="1 3" />
        ))}
        {[16, 32, 50, 70].map((r, i) => (
          <path
            key={r}
            d={contour(214, 70, r, 1.3 + i * 0.2)}
            className={i < 2 ? 'stroke-line-hi' : 'stroke-line'}
          />
        ))}
        {[14, 28, 44].map((r, i) => (
          <path key={r} d={contour(78, 150, r, 4 + i * 0.3)} className="stroke-line" />
        ))}
        {[
          { n: 'Rajshahi', x: 36, y: 86 },
          { n: 'Dhaka', x: 128, y: 120 },
          { n: 'Sylhet', x: 240, y: 46 },
          { n: 'Chattogram', x: 206, y: 168 },
        ].map((c) => (
          <g key={c.n}>
            <rect x={c.x - 1.5} y={c.y - 1.5} width={3} height={3} className="fill-bone" />
            <T x={c.x + 5} y={c.y + 2} size={4.6} mono className="fill-ash">
              {c.n}
            </T>
          </g>
        ))}
        <g transform="translate(214 70)">
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              r={9}
              className="m-ping qk-ring stroke-signal"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}
          <circle r={3.2} className="fill-signal" />
        </g>
        <Box x={224} y={78} w={58} h={13} className="fill-void stroke-signal" />
        <T x={253} y={86.6} size={5} anchor="middle" mono caps={false} className="fill-chalk">
          M 4.6 · 10 km
        </T>

        <path d="M296.5 0V196M0 196.5H450" className="stroke-line" />
        <T x={308} y={16} size={4.8} mono className="fill-ash">
          Live feed
        </T>
        <circle cx={438} cy={14} r={2.4} className="m-blink fill-signal" />
        {feed.map((f, i) => {
          const y = 24 + i * 34;
          return (
            <g key={f.p}>
              {i === 0 && <rect x={297} y={y} width={153} height={32} className="fill-graphite" />}
              {i === 0 && <rect x={297} y={y} width={1.5} height={32} className="fill-signal" />}
              <T
                x={308}
                y={y + 20}
                size={11}
                className={i === 0 ? 'fill-chalk' : 'fill-bone'}
                fontWeight={300}
              >
                {f.m}
              </T>
              <T x={332} y={y + 14} size={5.6} className={i === 0 ? 'fill-chalk' : 'fill-bone'}>
                {f.p}
              </T>
              <T x={332} y={y + 22.5} size={4.4} mono caps={false} className="fill-ash">
                {f.t}
              </T>
              {i > 0 && <path d={`M297 ${y + 0.5}H450`} className="stroke-line" />}
            </g>
          );
        })}

        <T x={8} y={207} size={4.4} mono className="fill-ash">
          Seismograph · Sylhet station
        </T>
        <path d="M8 228.5H442" className="stroke-line" />
        <path
          d={seismo}
          pathLength={100}
          className="m-draw qk-wave stroke-signal"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
      </Browser>
    </Scene>
  );
}

/* ------------------------------------------------------------- POS */

const menuItems = [
  ['Latte', '৳220'],
  ['Croissant', '৳180'],
  ['Iced tea', '৳150'],
  ['Muffin', '৳160'],
  ['Sandwich', '৳320'],
  ['Cookie', '৳90'],
  ['Espresso', '৳180'],
  ['Brownie', '৳140'],
  ['Water', '৳40'],
  ['Bagel', '৳170'],
  ['Smoothie', '৳260'],
  ['Juice', '৳200'],
];

export function Pos() {
  return (
    <Scene>
      <rect
        x={18.5}
        y={22.5}
        width={443}
        height={263}
        rx={14}
        className="fill-[#050506] stroke-line-hi"
      />
      <svg x={28} y={32} width={424} height={244}>
        <rect width={424} height={244} rx={6} className="fill-void" />
        <T x={10} y={16} size={7.5} className="fill-chalk" fontWeight={500}>
          Counter 1
        </T>
        <T x={62} y={16} size={4.6} mono className="fill-ash">
          Cashier · Nadia
        </T>
        <T x={270} y={16} size={4.6} anchor="end" mono className="fill-ash">
          12:41
        </T>
        {['All', 'Coffee', 'Bakery', 'Drinks'].map((c, i) => (
          <g key={c}>
            <Box
              x={10 + i * 40}
              y={24}
              w={36}
              h={13}
              className={i === 0 ? 'fill-void stroke-signal' : 'fill-void stroke-line'}
            />
            <T
              x={28 + i * 40}
              y={32.6}
              size={5.2}
              anchor="middle"
              className={i === 0 ? 'fill-chalk' : 'fill-ash'}
            >
              {c}
            </T>
          </g>
        ))}
        {menuItems.map(([n, p], i) => {
          const x = 10 + (i % 4) * 66;
          const y = 44 + Math.floor(i / 4) * 64;
          const hit = i === 1;
          return (
            <g key={n}>
              <g className={hit ? 'pos-tap' : undefined}>
                <Box x={x} y={y} w={60} h={58} className="fill-carbon stroke-line" />
                <rect
                  x={x + 0.5}
                  y={y + 0.5}
                  width={59}
                  height={57}
                  className={hit ? 'pos-hit stroke-signal' : 'hidden'}
                />
                <circle cx={x + 30} cy={y + 21} r={11} className="fill-graphite stroke-line-hi" />
                <T x={x + 6} y={y + 44} size={5.6} className="fill-bone">
                  {n}
                </T>
                <T x={x + 6} y={y + 52} size={5.2} className="fill-chalk">
                  {p}
                </T>
              </g>
            </g>
          );
        })}

        <Box x={278} y={8} w={138} h={228} className="fill-carbon stroke-line" />
        <T x={288} y={24} size={7.4} className="fill-chalk" fontWeight={500}>
          Order #1042
        </T>
        <T x={288} y={32.5} size={4.4} mono className="fill-ash">
          Table 6 · Dine in
        </T>
        {[
          ['2×', 'Latte', '৳440'],
          ['1×', 'Sandwich', '৳320'],
          ['1×', 'Brownie', '৳140'],
          ['1×', 'Iced tea', '৳150'],
        ].map(([q, n, p], i) => {
          const y = 48 + i * 15;
          return (
            <g key={n}>
              <T x={288} y={y} size={5.2} mono caps={false} className="fill-ash">
                {q}
              </T>
              <T x={302} y={y} size={5.6} className="fill-bone">
                {n}
              </T>
              <T x={406} y={y} size={5.6} anchor="end" className="fill-chalk">
                {p}
              </T>
            </g>
          );
        })}
        <g className="pos-line">
          <rect x={279} y={101} width={136} height={14} className="fill-graphite" />
          <T x={288} y={110} size={5.2} mono caps={false} className="fill-signal-hi">
            1×
          </T>
          <T x={302} y={110} size={5.6} className="fill-chalk">
            Croissant
          </T>
          <T x={406} y={110} size={5.6} anchor="end" className="fill-chalk">
            ৳180
          </T>
        </g>
        <path d="M288 124.5H406" className="stroke-line" />
        <T x={288} y={138} size={5.2} className="fill-ash">
          Subtotal
        </T>
        <T x={406} y={138} size={5.2} anchor="end" className="fill-ash">
          ৳1,230
        </T>
        <T x={288} y={150} size={5.2} className="fill-ash">
          Discount
        </T>
        <T x={406} y={150} size={5.2} anchor="end" className="fill-ash">
          −৳50
        </T>
        <T x={288} y={170} size={7} className="fill-chalk" fontWeight={500}>
          Total
        </T>
        <T x={406} y={172} size={12} anchor="end" className="pos-new fill-chalk" fontWeight={300}>
          ৳1,180
        </T>
        <T x={406} y={172} size={12} anchor="end" className="pos-old fill-chalk" fontWeight={300}>
          ৳1,000
        </T>
        <rect x={288} y={204} width={118} height={20} className="fill-signal" />
        <T x={347} y={216.2} size={6.6} anchor="middle" className="fill-void" fontWeight={500}>
          Charge ৳1,180
        </T>
      </svg>

      <g transform="translate(338 6)">
        <g className="pos-receipt">
          <Box x={0} y={0} w={118} h={24} className="fill-graphite stroke-line-hi" />
          <CheckDot x={12} y={12} r={4.6} />
          <T x={22} y={10.6} size={5.6} className="fill-chalk" fontWeight={500}>
            Receipt sent
          </T>
          <T x={22} y={18.2} size={4.6} className="fill-ash">
            on WhatsApp · +880 17…
          </T>
        </g>
      </g>
    </Scene>
  );
}

/* ------------------------------------------------------------- QR menu */

export function Menu() {
  const scan = useUid('scan');
  const q = 64 / QR_SIZE;
  return (
    <Scene>
      {/* table tent */}
      <path
        d="M36 262L66 52H176L206 262Z"
        className="fill-carbon stroke-line-hi"
        strokeLinejoin="round"
      />
      <path d="M30 262.5H212" className="stroke-line-hi" />
      <T x={121} y={84} size={13} anchor="middle" serif className="fill-chalk">
        Table 4
      </T>
      <rect x={85} y={96} width={72} height={72} className="fill-white" />
      <path d={QR_PATH} transform={`translate(89 100) scale(${q})`} className="fill-void" />
      <linearGradient id={scan} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="var(--signal)" stopOpacity="0" />
        <stop offset="1" stopColor="var(--signal)" stopOpacity="0.45" />
      </linearGradient>
      <g className="mn-scan">
        <rect x={81} y={86} width={80} height={10} fill={`url(#${scan})`} />
        <rect x={81} y={95.5} width={80} height={1.5} className="fill-signal" />
      </g>
      <T x={121} y={186} size={5.6} anchor="middle" mono className="fill-bone">
        Scan to order
      </T>
      <T x={121} y={196} size={4.6} anchor="middle" className="fill-ash">
        No app needed
      </T>

      <Phone x={226} y={30} w={112} h={236}>
        <T x={10} y={30} size={12} serif className="fill-chalk">
          Bistro
        </T>
        <T x={94} y={29} size={4.4} anchor="end" mono className="fill-ash">
          Table 4
        </T>
        {['Popular', 'Rice', 'Curry', 'Drinks'].map((c, i) => (
          <g key={c}>
            <rect
              x={8 + i * 23}
              y={38}
              width={21}
              height={10}
              className={i === 0 ? 'fill-signal' : 'fill-void stroke-line'}
            />
            <T
              x={18.5 + i * 23}
              y={44.8}
              size={4.2}
              anchor="middle"
              className={i === 0 ? 'fill-void' : 'fill-ash'}
            >
              {c}
            </T>
          </g>
        ))}
        {[
          ['Kacchi biryani', '৳380', true],
          ['Chicken roast', '৳260', false],
          ['Beef bhuna', '৳320', false],
          ['Borhani', '৳90', true],
        ].map(([n, p, added], i) => {
          const y = 56 + i * 34;
          return (
            <g key={n as string}>
              <circle cx={20} cy={y + 13} r={11} className="fill-graphite stroke-line" />
              <circle cx={20} cy={y + 13} r={6} className="stroke-line-hi" />
              <T x={36} y={y + 10} size={5.8} className="fill-bone">
                {n}
              </T>
              <Bar x={36} y={y + 14} w={36} h={2} className="fill-line-hi" />
              <T x={36} y={y + 24} size={5.6} className="fill-chalk">
                {p}
              </T>
              <rect
                x={83.5}
                y={y + 15.5}
                width={12}
                height={12}
                className={added ? `mn-add fill-signal` : 'fill-void stroke-line-hi'}
                style={added ? { animationDelay: `${i ? 0.5 : 0}s` } : undefined}
              />
              <path
                d={`M89.5 ${y + 18.5}v6M86.5 ${y + 21.5}h6`}
                className={added ? 'stroke-void' : 'stroke-bone'}
              />
            </g>
          );
        })}
        <g className="mn-cart">
          <rect x={6} y={200} width={92} height={20} className="fill-signal" />
          <T x={52} y={212.4} size={5.6} anchor="middle" className="fill-void" fontWeight={500}>
            2 items · ৳470 · Order
          </T>
        </g>
      </Phone>

      <g transform="translate(352 72)">
        <g className="mn-ticket">
          <Box x={0} y={0} w={112} h={124} className="fill-graphite stroke-line-hi" />
          <T x={10} y={15} size={4.6} mono className="fill-ash">
            Kitchen
          </T>
          <T x={10} y={30} size={9} className="fill-chalk" fontWeight={500}>
            Order #12
          </T>
          <T x={10} y={39} size={4.6} mono caps={false} className="fill-ash">
            Table 4 · 12:41
          </T>
          <path d="M10 46.5H102" className="stroke-line-hi" strokeDasharray="2 2" />
          <T x={10} y={60} size={5.8} className="fill-bone">
            1× Kacchi biryani
          </T>
          <T x={10} y={72} size={5.8} className="fill-bone">
            1× Borhani
          </T>
          <g className="m-glow">
            <Box x={10} y={96} w={50} h={14} className="fill-void stroke-signal" />
            <T x={35} y={105.2} size={4.8} anchor="middle" mono className="fill-signal-hi">
              Preparing
            </T>
          </g>
        </g>
      </g>
    </Scene>
  );
}

/* ------------------------------------------------------------- Kanban (thesis board) */

function TaskCard({ x, y, title, tag }: { x: number; y: number; title: string; tag: string }) {
  return (
    <g>
      <Box x={x} y={y} w={116} h={42} className="fill-graphite stroke-line-hi" />
      <T x={x + 8} y={y + 14} size={6.2} className="fill-chalk">
        {title}
      </T>
      <Box x={x + 8} y={y + 22} w={30} h={11} className="fill-void stroke-line" />
      <T x={x + 23} y={y + 29.6} size={4.4} anchor="middle" mono className="fill-ash">
        {tag}
      </T>
      <circle cx={x + 104} cy={y + 28} r={5} className="fill-line-hi stroke-graphite" />
    </g>
  );
}

const columns = [
  {
    name: 'Draft',
    count: 2,
    cards: [
      ['Literature review', 'Ch. 2'],
      ['Survey design', 'Ch. 3'],
    ],
  },
  { name: 'In review', count: 2, cards: [['Methodology', 'Ch. 3']] },
  { name: 'Submitted', count: 1, cards: [['Proposal', 'Ch. 1']] },
];

export function Kanban() {
  return (
    <Scene>
      <Browser x={14} y={14} w={452} h={272} url="thesisflow · board">
        <T x={14} y={22} size={9.5} className="fill-chalk" fontWeight={500}>
          Thesis board
        </T>
        <T x={14} y={31} size={4.6} mono className="fill-ash">
          Spring 2026 · 14 tasks
        </T>
        <T x={292} y={22} size={4.6} anchor="end" mono className="fill-ash">
          64% done
        </T>
        <rect x={298} y={19} width={100} height={3} className="fill-line" />
        <rect x={298} y={19} width={64} height={3} className="m-grow fill-signal" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={414 + i * 10} cy={20} r={6} className="fill-graphite stroke-void" />
        ))}
        {columns.map((c, ci) => {
          const x = 14 + ci * 146;
          return (
            <g key={c.name}>
              <Box x={x} y={42} w={132} h={202} className="fill-carbon stroke-line" />
              <T x={x + 8} y={56} size={4.8} mono className="fill-ash">
                {c.name}
              </T>
              <T x={x + 124} y={56} size={4.8} anchor="end" mono className="fill-ash">
                {c.count}
              </T>
              {c.cards.map(([t, tag], i) => (
                <TaskCard key={t} x={x + 8} y={64 + i * 50} title={t} tag={tag} />
              ))}
            </g>
          );
        })}
        <rect
          x={306.5 + 8}
          y={114.5}
          width={115}
          height={41}
          className="kb-slot stroke-signal"
          strokeDasharray="3 3"
        />
        <g transform="translate(168 114)">
          <g className="kb-move">
            <TaskCard x={0} y={0} title="Data analysis" tag="Ch. 4" />
            <rect x={0.5} y={0.5} width={115} height={41} className="kb-edge stroke-signal" />
            <g transform="translate(84 24)">
              <Cursor />
            </g>
          </g>
        </g>
      </Browser>
    </Scene>
  );
}

/* ------------------------------------------------------------- Job portal */

const jobs = [
  {
    t: 'Frontend Developer',
    c: 'Nodi Labs · Remote',
    s: '৳90k–120k',
    tags: ['React', 'Full-time'],
  },
  { t: 'Product Designer', c: 'Shapla Studio · Dhaka', s: '৳70k–95k', tags: ['Figma', 'Hybrid'] },
  { t: 'Data Analyst', c: 'Megh Data · Remote', s: '৳80k–110k', tags: ['Python', 'Full-time'] },
  { t: 'Support Lead', c: 'Bazar Ltd · Remote', s: '৳60k–75k', tags: ['English', 'Shift'] },
];

export function Jobs() {
  const typed = useUid('typed');
  return (
    <Scene>
      <Browser x={14} y={14} w={452} h={272} url="kaajkaam · remote jobs">
        <T x={14} y={19} size={8} className="fill-chalk" fontWeight={600}>
          KAAJ KAAM
        </T>
        {['Jobs', 'Companies', 'Post a job'].map((l, i) => (
          <T key={l} x={330 + i * 38} y={18} size={5.8} className="fill-ash">
            {l}
          </T>
        ))}
        <Box x={14} y={32} w={300} h={22} className="fill-carbon stroke-line-hi" />
        <circle cx={26} cy={42.5} r={3.4} className="stroke-ash" />
        <path d="M28.6 45.1l2.4 2.4" className="stroke-ash" />
        <clipPath id={typed}>
          <rect className="jb-type" x={36} y={34} width={66} height={18} />
        </clipPath>
        <g clipPath={`url(#${typed})`}>
          <T
            x={36}
            y={46}
            size={7}
            className="fill-chalk"
            textLength={64}
            lengthAdjust="spacingAndGlyphs"
          >
            React developer
          </T>
        </g>
        <rect className="jb-caret m-blink fill-signal" x={102} y={37.5} width={1} height={11} />
        <rect x={320} y={32} width={62} height={22} className="fill-signal" />
        <T x={351} y={45.4} size={6.6} anchor="middle" className="fill-void" fontWeight={500}>
          Search
        </T>
        {['Remote', 'Full-time', '৳80k+', 'Dhaka', 'Entry level'].map((c, i) => (
          <g key={c}>
            <Box
              x={14 + i * 46}
              y={62}
              w={42}
              h={13}
              className={i === 0 ? 'fill-carbon stroke-signal' : 'fill-void stroke-line'}
            />
            <T
              x={35 + i * 46}
              y={70.6}
              size={5}
              anchor="middle"
              className={i === 0 ? 'fill-chalk' : 'fill-ash'}
            >
              {c}
            </T>
          </g>
        ))}
        <T x={14} y={90} size={4.6} mono className="fill-ash">
          128 jobs · newest first
        </T>
        {jobs.map((j, i) => {
          const y = 96 + i * 38;
          return (
            <g key={j.t} className="jb-row" style={{ animationDelay: `${i * 0.12}s` }}>
              <Box x={14} y={y} w={422} h={34} className="fill-carbon stroke-line" />
              <rect x={24} y={y + 8} width={18} height={18} className="fill-graphite" />
              <T x={33} y={y + 19.8} size={8} anchor="middle" serif className="fill-chalk">
                {j.c[0]}
              </T>
              <T x={50} y={y + 15} size={7} className="fill-chalk" fontWeight={500}>
                {j.t}
              </T>
              <T x={50} y={y + 25} size={5} className="fill-ash">
                {j.c}
              </T>
              {j.tags.map((tag, k) => (
                <g key={tag}>
                  <Box
                    x={214 + k * 44}
                    y={y + 11}
                    w={40}
                    h={12}
                    className="fill-void stroke-line"
                  />
                  <T
                    x={234 + k * 44}
                    y={y + 19.2}
                    size={4.6}
                    anchor="middle"
                    mono
                    className="fill-ash"
                  >
                    {tag}
                  </T>
                </g>
              ))}
              <T x={396} y={y + 19.4} size={6} anchor="end" className="fill-chalk">
                {j.s}
              </T>
              <path
                d={`M410 ${y + 10}h10v14l-5-3.5-5 3.5z`}
                className={i === 0 ? 'jb-save stroke-signal' : 'stroke-ash'}
                strokeLinejoin="round"
              />
            </g>
          );
        })}
      </Browser>
    </Scene>
  );
}
