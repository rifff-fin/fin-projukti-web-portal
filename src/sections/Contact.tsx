import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { contact, site } from '../content/copy';
import { looksLikeBot, sendToInbox, whatsappLink } from '../lib/web3forms';
import { ChapterHead } from '../components/ui/ChapterHead';
import { Emph } from '../components/ui/Emph';
import { Honeypot, TextField } from '../components/ui/form';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Phone,
  WhatsApp,
  socialIcons,
} from '../components/icons';

type Field = 'name' | 'email' | 'details';
type Status = 'idle' | 'sending' | 'sent' | 'error';

const empty = { name: '', email: '', company: '', details: '' };

function validate(v: typeof empty): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (v.name.trim().length < 2) e.name = contact.form.errors.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = contact.form.errors.email;
  if (v.details.trim().length < 10) e.details = contact.form.errors.details;
  return e;
}

/**
 * 06 Contact — the brief form (Web3Forms) and the direct lines. Errors show once a field
 * has been left, or on submit (focus goes to the first). A filled honeypot or an instant
 * submit is treated as a bot: it looks sent, nothing goes out. After sending, the visitor
 * can carry on in WhatsApp with a prefilled message (a click, so no pop-up blocker).
 */
export function Contact() {
  const [values, setValues] = useState(empty);
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [sentAs, setSentAs] = useState({ name: '', services: '' });
  const shownAt = useRef(0);
  const form = useRef<HTMLFormElement>(null);
  const successTitle = useRef<HTMLHeadingElement>(null);

  // when the form first appeared (same clock as event.timeStamp)
  useEffect(() => {
    shownAt.current = performance.now();
  }, []);

  const errors = validate(values);
  const visible = (f: Field) => (touched[f] ? errors[f] : undefined);

  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));
  const leave = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  const toggle = (s: string) =>
    setServices((list) => (list.includes(s) ? list.filter((x) => x !== s) : [...list, s]));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setTouched({ name: true, email: true, details: true });
    const first = (['name', 'email', 'details'] as Field[]).find((f) => errors[f]);
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const isBot = looksLikeBot(e.currentTarget, e.timeStamp, shownAt.current);
    const chosen = services.join(', ');
    setStatus('sending');

    if (!isBot) {
      try {
        await sendToInbox(`New project brief from ${values.name.trim()}`, {
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim() || 'Not provided',
          services: chosen || 'Not specified',
          budget: budget || 'Not specified',
          message: values.details.trim(),
        });
      } catch {
        setStatus('error');
        return;
      }
    }

    setSentAs({ name: values.name.trim(), services: chosen });
    setValues(empty);
    setServices([]);
    setBudget('');
    setTouched({});
    setStatus('sent');
    requestAnimationFrame(() => successTitle.current?.focus());
  }

  const whatsappHref = whatsappLink(
    site.whatsapp.number,
    contact.success.whatsappMessage(sentAs.name, sentAs.services),
  );

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-[var(--section-y)]">
      <div className="shell">
        <ChapterHead index={contact.index} label={contact.label} />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="contact-title" className="text-[length:var(--text-h2)]">
              <Emph text={contact.title} />
            </h2>
            <p data-reveal="fade" className="mt-8 max-w-[30rem] text-bone">
              {contact.intro}
            </p>

            <p className="eyebrow mt-12 text-ash">{contact.direct}</p>
            <ul data-reveal="stagger" className="mt-4 border-t border-line">
              <Line icon={<Mail size={16} />} href={`mailto:${site.email}`} text={site.email} />
              <Line icon={<Phone size={16} />} href={site.phone.href} text={site.phone.display} />
              <Line
                icon={<WhatsApp size={16} />}
                href={`https://wa.me/${site.whatsapp.number}`}
                text={`${site.whatsapp.display} · ${contact.whatsappSuffix}`}
                external
              />
              <Line icon={<MapPin size={16} />} text={site.location} />
            </ul>
            <div className="mt-8 flex gap-2">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.id];
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-11 w-11 items-center justify-center border border-line-hi text-bone transition-colors hover:border-signal hover:text-chalk"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-line bg-carbon p-6 sm:p-8 lg:p-10">
              {status === 'sent' ? (
                <div className="flex min-h-[28rem] flex-col justify-center">
                  <span className="flex h-12 w-12 items-center justify-center border border-signal text-signal">
                    <Check size={22} />
                  </span>
                  <h3
                    ref={successTitle}
                    tabIndex={-1}
                    className="mt-8 text-[length:var(--text-h3)] outline-none"
                  >
                    {contact.success.title}
                  </h3>
                  <p className="mt-3 max-w-[30rem] text-bone">{contact.success.body}</p>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <WhatsApp size={18} />
                      {contact.success.whatsapp}
                    </a>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setStatus('idle')}
                    >
                      {contact.success.again}
                    </button>
                  </div>
                </div>
              ) : (
                <form ref={form} noValidate onSubmit={submit} className="grid gap-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <TextField
                      name="name"
                      label={contact.form.name.label}
                      placeholder={contact.form.name.placeholder}
                      value={values.name}
                      onChange={set('name')}
                      onBlur={leave('name')}
                      error={visible('name')}
                      autoComplete="name"
                      required
                    />
                    <TextField
                      name="email"
                      type="email"
                      label={contact.form.email.label}
                      placeholder={contact.form.email.placeholder}
                      value={values.email}
                      onChange={set('email')}
                      onBlur={leave('email')}
                      error={visible('email')}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <TextField
                    name="company"
                    label={contact.form.company.label}
                    placeholder={contact.form.company.placeholder}
                    value={values.company}
                    onChange={set('company')}
                    autoComplete="organization"
                  />

                  <fieldset>
                    <legend className="eyebrow mb-3 text-ash">{contact.form.services.label}</legend>
                    <div className="flex flex-wrap gap-2">
                      {contact.form.services.options.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="chip"
                          aria-pressed={services.includes(s)}
                          onClick={() => toggle(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="eyebrow mb-3 text-ash">{contact.form.budget.label}</legend>
                    <div className="flex flex-wrap gap-2">
                      {contact.form.budget.options.map((b) => (
                        <button
                          key={b}
                          type="button"
                          className="chip"
                          aria-pressed={budget === b}
                          onClick={() => setBudget(budget === b ? '' : b)}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <TextField
                    name="details"
                    multiline
                    label={contact.form.details.label}
                    placeholder={contact.form.details.placeholder}
                    value={values.details}
                    onChange={set('details')}
                    onBlur={leave('details')}
                    error={visible('details')}
                    required
                  />

                  <Honeypot />

                  <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p
                      role="status"
                      aria-live="polite"
                      className={`text-[0.875rem] ${status === 'error' ? 'text-error' : 'text-ash'}`}
                    >
                      {status === 'error' ? contact.form.failed : contact.form.note}
                    </p>
                    <button
                      type="submit"
                      className="btn btn-primary shrink-0"
                      disabled={status === 'sending'}
                      aria-disabled={status === 'sending'}
                    >
                      {status === 'sending' ? contact.form.sending : contact.form.submit}
                      <ArrowRight />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({
  icon,
  text,
  href,
  external,
}: {
  icon: ReactNode;
  text: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="text-signal-hi">{icon}</span>
      <span className="flex-1">{text}</span>
      {href && (
        <ArrowUpRight size={14} className="text-ash transition-colors group-hover:text-chalk" />
      )}
    </>
  );
  return (
    <li className="border-b border-line">
      {href ? (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="group flex items-center gap-4 py-4 text-bone transition-colors hover:text-chalk"
        >
          {inner}
        </a>
      ) : (
        <span className="flex items-center gap-4 py-4 text-bone">{inner}</span>
      )}
    </li>
  );
}
