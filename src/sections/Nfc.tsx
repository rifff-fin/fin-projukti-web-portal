import { useEffect, useRef, useState, type FormEvent } from 'react';
import { nfc, site } from '../content/copy';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { motionQuery } from '../lib/motion';
import { looksLikeBot, sendToInbox, whatsappLink } from '../lib/web3forms';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ChapterHead } from '../components/ui/ChapterHead';
import { Emph } from '../components/ui/Emph';
import { Honeypot, TextField } from '../components/ui/form';
import { NfcCard } from '../components/nfc/NfcCard';
import { ProfilePhone } from '../components/nfc/ProfilePhone';
import { ArrowRight, Check, Contactless, Flip, WhatsApp } from '../components/icons';
import '../styles/nfc.css';

const empty = {
  name: '',
  role: '',
  company: '',
  phone: '',
  email: '',
  links: '',
  quantity: nfc.setup.quantity.options[0],
};
type Order = typeof empty;
type Field = 'name' | 'phone' | 'email';
type Status = 'idle' | 'sending' | 'sent' | 'error';

function validate(o: Order): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (o.name.trim().length < 2) e.name = nfc.setup.errors.name;
  if (o.phone.replace(/\D/g, '').length < 8) e.phone = nfc.setup.errors.phone;
  if (o.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(o.email.trim()))
    e.email = nfc.setup.errors.email;
  return e;
}

/**
 * The tap: the card moves onto the phone, rings go out from the read, the phone wakes and
 * the profile rises in, the card goes back. Distances come from the layout (offset*), so
 * they hold at every size and from wherever a replay starts.
 */
function tapTimeline(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const wrap = q('[data-card-wrap]')[0] as HTMLElement;
  const phone = q('[data-phone]')[0] as HTMLElement;
  const dx = () =>
    phone.offsetLeft + phone.offsetWidth * 0.42 - (wrap.offsetLeft + wrap.offsetWidth);
  const dy = () =>
    phone.offsetTop + phone.offsetHeight * 0.5 - (wrap.offsetTop + wrap.offsetHeight * 0.5);

  return gsap
    .timeline()
    .set(q('[data-idle]'), { autoAlpha: 1 })
    .set(q('[data-p]'), { autoAlpha: 0, y: 14 })
    .to(wrap, { x: dx, y: dy, rotation: -8, scale: 0.92, duration: 0.8, ease: 'power3.inOut' })
    .fromTo(
      q('[data-ring]'),
      { scale: 0.15, autoAlpha: 0.95 },
      { scale: 1.55, autoAlpha: 0, duration: 1.2, stagger: 0.17, ease: 'power2.out' },
      '-=0.12',
    )
    .to(q('[data-idle]'), { autoAlpha: 0, duration: 0.4, ease: 'power1.out' }, '<0.15')
    .to(
      q('[data-p]'),
      { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.05, ease: 'power3.out' },
      '<0.1',
    )
    .to(wrap, { x: 0, y: 0, rotation: 0, scale: 1, duration: 1.1, ease: 'power3.inOut' }, '<0.2');
}

/**
 * 03 Fin NFC — our own product. The stage shows the card in front of the phone it opens;
 * both fill in live from the setup form, which sends the order to the inbox (then on to
 * WhatsApp). Motion: the card turns from its back to its front and taps the phone when the
 * stage comes into view, tilts towards the pointer, and taps again on request.
 * Static (reduced motion): the card's front and the open profile; "Flip" still works.
 */
export function Nfc() {
  const [order, setOrder] = useState<Order>(empty);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const face = useRef<'front' | 'back'>('front');
  const played = useRef(true);
  const running = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const root = stage.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(motionQuery(), () => {
        // before the tap: the card shows its back, the phone sleeps
        gsap.set(q('[data-card]'), { rotationY: 180 });
        gsap.set(q('[data-idle]'), { autoAlpha: 1 });
        gsap.set(q('[data-p]'), { autoAlpha: 0, y: 14 });
        face.current = 'back';
        played.current = false;
        ScrollTrigger.create({
          trigger: root,
          start: 'top 62%',
          once: true,
          onEnter: () => {
            if (played.current) return;
            played.current = true;
            face.current = 'front';
            running.current = gsap
              .timeline()
              .to(q('[data-card]'), { rotationY: 0, duration: 1.3, ease: 'power3.inOut' })
              .add(tapTimeline(root), '-=0.2');
          },
        });
        return () => {
          face.current = 'front';
          played.current = true;
        };
      });

      // the card turns a little towards the pointer, and its gloss follows
      mm.add(motionQuery('(hover: hover) and (pointer: fine)'), () => {
        const tilt = q('[data-card-tilt]')[0];
        const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.9, ease: 'power3.out' });
        const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.9, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          const r = root.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          rx(-(py - 0.5) * 16);
          ry((px - 0.5) * 22);
          root.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
          root.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        root.addEventListener('pointermove', move);
        root.addEventListener('pointerleave', leave);
        return () => {
          root.removeEventListener('pointermove', move);
          root.removeEventListener('pointerleave', leave);
          root.style.removeProperty('--mx');
          root.style.removeProperty('--my');
        };
      });
    },
    { scope: stage },
  );

  // event handlers: their tweens join the section's GSAP context (wrapped when they run)
  const turn = (to: 'front' | 'back') =>
    contextSafe(() => {
      const card = stage.current?.querySelector('[data-card]');
      if (!card || face.current === to) return;
      face.current = to;
      gsap.to(card, {
        rotationY: to === 'front' ? 0 : 180,
        duration: reduced ? 0 : 1,
        ease: 'power3.inOut',
      });
    })();

  const tap = () =>
    contextSafe(() => {
      if (!stage.current) return;
      running.current?.kill();
      played.current = true;
      turn('front');
      running.current = tapTimeline(stage.current);
    })();

  /** Filling in the form: show the side being edited, and wake the phone if it still sleeps. */
  const wake = () => (played.current ? turn('front') : tap());

  return (
    <section id="nfc" aria-labelledby="nfc-title" className="py-[var(--section-y)]">
      <div className="shell">
        <ChapterHead index={nfc.index} label={nfc.label} />
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-ash">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
              {nfc.eyebrow}
            </p>
            <h2 id="nfc-title" className="mt-6 text-[length:var(--text-h2)]">
              <Emph text={nfc.title} />
            </h2>
          </div>
          <div
            data-reveal="fade"
            className="flex max-w-[30rem] flex-col gap-4 self-end lg:col-span-4 lg:col-start-9"
          >
            <p className="text-bone">{nfc.intro}</p>
            <p className="text-[0.9375rem] text-ash">{nfc.about}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <div role="group" aria-label={nfc.stage.label}>
                <div ref={stage} className="nfc-stage">
                  <div aria-hidden="true" className="dot-grid absolute inset-0" />
                  <div aria-hidden="true">
                    <ProfilePhone details={order} />
                    <NfcCard name={order.name} role={order.role} />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => turn(face.current === 'front' ? 'back' : 'front')}
                  >
                    <Flip size={16} />
                    {nfc.stage.flip}
                  </button>
                  {!reduced && (
                    <button type="button" className="btn btn-ghost btn-sm" onClick={tap}>
                      <Contactless size={16} />
                      {nfc.stage.tap}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-14 lg:col-span-5 lg:col-start-8">
            <div>
              <p className="eyebrow text-ash">{nfc.stepsLabel}</p>
              <ol data-reveal="stagger" className="mt-5 border-t border-line">
                {nfc.steps.map((s, i) => (
                  <li
                    key={s.title}
                    className="grid grid-cols-[2.75rem_1fr] gap-x-4 border-b border-line py-6"
                  >
                    <span className="eyebrow pt-1.5 text-signal-hi">0{i + 1}</span>
                    <div>
                      <h3 className="text-[1.25rem]">{s.title}</h3>
                      <p className="mt-2 text-ash">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="eyebrow text-ash">{nfc.includedLabel}</p>
              <ul data-reveal="stagger" className="mt-5 flex flex-col gap-3">
                {nfc.included.map((item) => (
                  <li key={item} className="flex gap-3 text-bone">
                    <Check size={18} className="mt-0.5 shrink-0 text-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <OrderForm order={order} setOrder={setOrder} onEdit={wake} />
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderForm({
  order,
  setOrder,
  onEdit,
}: {
  order: Order;
  setOrder: (fn: (o: Order) => Order) => void;
  onEdit: () => void;
}) {
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [sent, setSent] = useState<Order>(empty);
  const shownAt = useRef(0);
  const form = useRef<HTMLFormElement>(null);
  const successTitle = useRef<HTMLHeadingElement>(null);
  const s = nfc.setup;

  useEffect(() => {
    shownAt.current = performance.now();
  }, []);

  const errors = validate(order);
  const visible = (f: Field) => (touched[f] ? errors[f] : undefined);
  const set = (k: keyof Order) => (e: { target: { value: string } }) =>
    setOrder((o) => ({ ...o, [k]: e.target.value }));
  const leave = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));
  const trimmed = (o: Order) =>
    Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v.trim()])) as Order;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setTouched({ name: true, phone: true, email: true });
    const first = (['name', 'phone', 'email'] as Field[]).find((f) => errors[f]);
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const o = trimmed(order);
    const isBot = looksLikeBot(e.currentTarget, e.timeStamp, shownAt.current);
    setStatus('sending');
    if (!isBot) {
      try {
        await sendToInbox(`Fin NFC Card order from ${o.name}`, {
          name: o.name,
          phone: o.phone,
          ...(o.email ? { email: o.email } : {}),
          job_title: o.role || 'Not provided',
          company: o.company || 'Not provided',
          cards: o.quantity,
          profile_links: o.links || 'Not provided',
        });
      } catch {
        setStatus('error');
        return;
      }
    }
    setSent(o);
    setTouched({});
    setStatus('sent');
    requestAnimationFrame(() => successTitle.current?.focus());
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col border border-line bg-carbon p-6 sm:p-8">
        <span className="flex h-12 w-12 items-center justify-center border border-signal text-signal">
          <Check size={22} />
        </span>
        <h3
          ref={successTitle}
          tabIndex={-1}
          className="mt-8 text-[length:var(--text-h3)] outline-none"
        >
          {nfc.success.title}
        </h3>
        <p className="mt-3 text-bone">{nfc.success.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={whatsappLink(site.whatsapp.number, nfc.whatsappMessage(sent))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <WhatsApp size={18} />
            {nfc.success.whatsapp}
          </a>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setOrder(() => empty);
              setStatus('idle');
            }}
          >
            {nfc.success.again}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line bg-carbon p-6 sm:p-8">
      <h3 className="text-[length:var(--text-h3)]">{s.title}</h3>
      <p className="mt-3 text-ash">{s.intro}</p>
      <form ref={form} noValidate onSubmit={submit} className="mt-8 grid gap-6">
        <TextField
          name="name"
          label={s.name.label}
          placeholder={s.name.placeholder}
          value={order.name}
          onChange={set('name')}
          onFocus={onEdit}
          onBlur={leave('name')}
          error={visible('name')}
          autoComplete="name"
          maxLength={32}
          required
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            name="role"
            label={s.role.label}
            placeholder={s.role.placeholder}
            value={order.role}
            onChange={set('role')}
            onFocus={onEdit}
            autoComplete="organization-title"
            maxLength={48}
          />
          <TextField
            name="company"
            label={s.company.label}
            placeholder={s.company.placeholder}
            value={order.company}
            onChange={set('company')}
            onFocus={onEdit}
            autoComplete="organization"
            maxLength={40}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            name="phone"
            type="tel"
            inputMode="tel"
            label={s.phone.label}
            placeholder={s.phone.placeholder}
            value={order.phone}
            onChange={set('phone')}
            onFocus={onEdit}
            onBlur={leave('phone')}
            error={visible('phone')}
            autoComplete="tel"
            required
          />
          <TextField
            name="email"
            type="email"
            inputMode="email"
            label={s.email.label}
            placeholder={s.email.placeholder}
            value={order.email}
            onChange={set('email')}
            onFocus={onEdit}
            onBlur={leave('email')}
            error={visible('email')}
            autoComplete="email"
          />
        </div>
        <TextField
          name="links"
          multiline
          rows={3}
          label={s.links.label}
          placeholder={s.links.placeholder}
          value={order.links}
          onChange={set('links')}
          onFocus={onEdit}
        />
        <fieldset>
          <legend className="eyebrow mb-3 text-ash">{s.quantity.label}</legend>
          <div className="flex flex-wrap gap-2">
            {s.quantity.options.map((q) => (
              <button
                key={q}
                type="button"
                className="chip min-w-[3.25rem] justify-center"
                aria-pressed={order.quantity === q}
                onClick={() => setOrder((o) => ({ ...o, quantity: q }))}
              >
                {q}
              </button>
            ))}
          </div>
        </fieldset>

        <Honeypot />

        <div className="flex flex-col gap-4 border-t border-line pt-6">
          <button
            type="submit"
            className="btn btn-primary self-start"
            disabled={status === 'sending'}
            aria-disabled={status === 'sending'}
          >
            {status === 'sending' ? s.sending : s.submit}
            <ArrowRight />
          </button>
          <p
            role="status"
            aria-live="polite"
            className={`text-[0.875rem] ${status === 'error' ? 'text-error' : 'text-ash'}`}
          >
            {status === 'error' ? s.failed : s.note}
          </p>
          <a
            href={whatsappLink(site.whatsapp.number, nfc.whatsappMessage(trimmed(order)))}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw inline-flex items-center gap-2 self-start text-[0.9375rem] text-chalk"
          >
            <WhatsApp size={16} className="text-signal-hi" />
            {s.whatsapp}
          </a>
        </div>
      </form>
    </div>
  );
}
