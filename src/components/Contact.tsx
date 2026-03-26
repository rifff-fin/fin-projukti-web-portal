import { useState, useRef } from 'react'
import type { FormEvent, CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
} from 'lucide-react'

const SERVICE_OPTIONS = [
  'UI/UX Design',
  'Web Development',
  'App Development',
  'Automation (n8n)',
  'Webflow',
  'Framer',
  'Not sure yet',
]

const BUDGET_OPTIONS = ['৳5k – ৳10k', '৳10k – ৳25k', '৳25k – ৳50k', '৳50k+']

const WEB3FORMS_KEY = '0ff5fa5d-94f1-4d99-92d6-115272782300'

const inputBase: CSSProperties = {
  width: '100%',
  padding: '0.875rem 1rem',
  backgroundColor: '#0d0d0d',
  border: '1px solid #2a2a2a',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  fontFamily: 'var(--font-sans)',
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState({ name: '', email: '', company: '', details: '' })
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedBudget, setSelectedBudget] = useState<string>('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  const toggleService = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc],
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitState('loading')

    const formData = new FormData()
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('subject', `New Project Brief from ${form.name}`)
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('company', form.company || 'Not provided')
    formData.append('services', selectedServices.join(', ') || 'Not specified')
    formData.append('budget', selectedBudget || 'Not specified')
    formData.append('message', form.details)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      if (data.success) {
        setSubmitState('success')
        setForm({ name: '', email: '', company: '', details: '' })
        setSelectedServices([])
        setSelectedBudget('')
        setTimeout(() => setSubmitState('idle'), 4000)
      } else {
        setSubmitState('error')
        setTimeout(() => setSubmitState('idle'), 4000)
      }
    } catch {
      setSubmitState('error')
      setTimeout(() => setSubmitState('idle'), 4000)
    }
  }

  const submitLabel =
    submitState === 'loading'
      ? 'Sending…'
      : submitState === 'success'
        ? 'Sent! ✓'
        : submitState === 'error'
          ? 'Failed — Retry'
          : 'Send Project Brief'

  const submitBg =
    submitState === 'success'
      ? '#16a34a'
      : submitState === 'error'
        ? '#dc2626'
        : 'var(--color-accent)'

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: '7rem 1.5rem',
        backgroundColor: '#050505',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 28rem), 1fr))',
            gap: '5rem',
            alignItems: 'start',
          }}
        >
          {/* ── Left Column ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label" style={{ marginBottom: '1.25rem', display: 'block' }}>
              Get in Touch
            </span>

            <h2
              style={{
                fontWeight: 900,
                fontSize: 'clamp(2.75rem, 7vw, 5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
                color: '#fff',
                marginBottom: '1.75rem',
              }}
            >
              Let's build
              <br />
              something
              <br />
              <span style={{ color: 'var(--color-accent)' }}>remarkable.</span>
            </h2>

            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: 'var(--color-text)',
                marginBottom: '2.5rem',
                maxWidth: '30rem',
              }}
            >
              Whether you have a clear vision or just a spark of an idea, we'd love to hear
              from you. Tell us about your project and let's explore what we can create
              together.
            </p>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <ContactInfo
                icon={<Mail size={15} />}
                text="finprojukti.tech@gmail.com"
                href="mailto:finprojukti.tech@gmail.com"
              />
              <ContactInfo
                icon={<Phone size={15} />}
                text="+880 1701-004480"
                href="tel:+8801701004480"
              />
              <ContactInfo
                icon={<MessageCircle size={15} />}
                text="+880 1743-666004 · WhatsApp"
                href="https://wa.me/8801743666004"
              />
              <ContactInfo icon={<MapPin size={15} />} text="Dhaka, Bangladesh · Remote-first" />
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
              <SocialLink
                href="https://www.instagram.com/finprojukti?igsh=MXV4MXlmYTRnaHVjNw=="
                icon={<Instagram size={16} />}
                label="Instagram"
              />
              <SocialLink
                href="https://www.facebook.com/share/1Fxj2fg7TS/?mibextid=wwXIfr"
                icon={<Facebook size={16} />}
                label="Facebook"
              />
              <SocialLink
                href="https://www.linkedin.com/in/fin-projukti-4785163a2/"
                icon={<Linkedin size={16} />}
                label="LinkedIn"
              />
            </div>
          </motion.div>

          {/* ── Right Column — Form ── */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* Name + Email row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
                gap: '1rem',
              }}
            >
              <FormField label="Your Name *">
                <input
                  type="text"
                  required
                  placeholder="Your name here"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
                />
              </FormField>
              <FormField label="Email *">
                <input
                  type="email"
                  required
                  placeholder="Your email here"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
                />
              </FormField>
            </div>

            {/* Company */}
            <FormField label="Business / Company">
              <input
                type="text"
                placeholder="Acme Corp"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                style={inputBase}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
              />
            </FormField>

            {/* Services Needed — multi-select chips */}
            <FormField label="Services Needed">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {SERVICE_OPTIONS.map((svc) => {
                  const active = selectedServices.includes(svc)
                  return (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => toggleService(svc)}
                      style={{
                        padding: '0.4rem 0.875rem',
                        borderRadius: '9999px',
                        border: `1px solid ${active ? 'var(--color-accent)' : '#333'}`,
                        backgroundColor: active ? 'rgba(255,102,0,0.12)' : 'transparent',
                        color: active ? 'var(--color-accent)' : 'var(--color-text)',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {svc}
                    </button>
                  )
                })}
              </div>
            </FormField>

            {/* Budget Range — single-select chips */}
            <FormField label="Budget Range">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {BUDGET_OPTIONS.map((b) => {
                  const active = selectedBudget === b
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBudget(active ? '' : b)}
                      style={{
                        padding: '0.4rem 0.875rem',
                        borderRadius: '9999px',
                        border: `1px solid ${active ? 'var(--color-accent)' : '#333'}`,
                        backgroundColor: active ? 'rgba(255,102,0,0.12)' : 'transparent',
                        color: active ? 'var(--color-accent)' : 'var(--color-text)',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {b}
                    </button>
                  )
                })}
              </div>
            </FormField>

            {/* Project Details */}
            <FormField label="Project Details *">
              <textarea
                required
                placeholder="Tell us about your project, goals, timeline..."
                rows={4}
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                style={{ ...inputBase, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
              />
            </FormField>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={submitState === 'loading'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  backgroundColor: submitBg,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  border: 'none',
                  borderRadius: '9999px',
                  cursor: submitState === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease, transform 0.15s ease',
                  fontFamily: 'var(--font-sans)',
                  opacity: submitState === 'loading' ? 0.75 : 1,
                }}
                onMouseEnter={(e) => {
                  if (submitState !== 'loading' && submitState !== 'success' && submitState !== 'error') {
                    ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e55a00'
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (submitState !== 'loading' && submitState !== 'success' && submitState !== 'error') {
                    ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-accent)'
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                  }
                }}
              >
                {submitLabel}
                {submitState === 'idle' && <ArrowUpRight size={17} />}
              </button>

              <p
                style={{
                  marginTop: '1rem',
                  fontSize: '0.78rem',
                  color: '#555',
                  letterSpacing: '0.02em',
                }}
              >
                {submitState === 'success'
                  ? "Brief received! We'll be in touch within 24 hours."
                  : submitState === 'error'
                    ? 'Something went wrong. Please try again or message us on WhatsApp.'
                    : 'We respond within 24 hours. No spam, ever.'}
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

/* ── Helper sub-components ── */
function FormField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '0.68rem',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          fontWeight: 600,
          color: '#666',
          marginBottom: '0.5rem',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

function ContactInfo({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode
  text: string
  href?: string
}) {
  const inner = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: 'var(--color-text)',
        fontSize: '0.9rem',
      }}
    >
      <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>{icon}</span>
      {text}
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'block',
          transition: 'opacity 0.2s ease',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
      >
        {inner}
      </a>
    )
  }

  return inner
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2.25rem',
        height: '2.25rem',
        borderRadius: '50%',
        border: '1px solid #2a2a2a',
        color: 'var(--color-text)',
        transition: 'border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.borderColor = 'var(--color-accent)'
        el.style.color = 'var(--color-accent)'
        el.style.backgroundColor = 'rgba(255,102,0,0.08)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.borderColor = '#2a2a2a'
        el.style.color = 'var(--color-text)'
        el.style.backgroundColor = 'transparent'
      }}
    >
      {icon}
    </a>
  )
}
