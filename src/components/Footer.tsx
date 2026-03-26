import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Facebook, Instagram, Linkedin, Github, ArrowRight } from 'lucide-react'

const serviceLinks = [
  'UI/UX Design',
  'Web & App Development',
  'Automation (n8n)',
  'Webflow Development',
  'Framer Development',
]

const companyLinks = [
  { label: 'Our DNA', href: '#dna' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/1Fxj2fg7TS/?mibextid=wwXIfr' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/finprojukti?igsh=MXV4MXlmYTRnaHVjNw==' },
  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
  { Icon: Github, label: 'GitHub', href: '#' },
]

export default function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })
  const footerInView = useInView(footerRef, { once: true, margin: '-60px' })

  return (
    <footer style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* ── Pre-footer CTA ── */}
      <div
        ref={ctaRef}
        style={{
          padding: '6rem 1.5rem 7rem',
          borderTop: '1px solid var(--color-border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '20%',
            width: '500px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(255,102,0,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '2.5rem',
            }}
          >
            {/* Large display text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75 }}
            >
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(3rem, 9vw, 7rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.04em',
                  color: '#fff',
                }}
              >
                Got a project
                <br />
                <span style={{ color: 'var(--color-text)', fontWeight: 900 }}>in mind?</span>
              </h2>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '1.1rem 2.25rem',
                  backgroundColor: 'var(--color-accent)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease, transform 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.backgroundColor = '#e55a00'
                  el.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.backgroundColor = 'var(--color-accent)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                Start a Conversation
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Footer columns ── */}
      <div
        ref={footerRef}
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={footerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '4rem 1.5rem 3rem',
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 13rem), 1fr))',
            gap: '2.5rem',
          }}
        >
          {/* Col 1 — Brand */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                marginBottom: '1rem',
              }}
            >
              <img
                src="/finlogo.png"
                alt="Fin Projukti"
                style={{
                  height: '2.25rem',
                  width: '2.25rem',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  flexShrink: 0,
                  boxShadow: '0 0 14px rgba(255,102,0,0.35)',
                }}
              />
              <span style={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
                <span style={{ color: 'var(--color-accent)' }}>FIN</span>
                <span style={{ color: '#fff' }}> Projukti</span>
              </span>
            </div>
            <p
              style={{
                fontSize: '0.85rem',
                lineHeight: 1.75,
                color: 'var(--color-text)',
                marginBottom: '0.875rem',
              }}
            >
              Engineering the beginning of your AI growth.
            </p>
            <a
              href="mailto:finprojukti.tech@gmail.com"
              style={{
                fontSize: '0.8rem',
                color: '#555',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
            >
              finprojukti.tech@gmail.com
            </a>
          </div>

          {/* Col 2 — Services */}
          <div>
            <FooterHeading>Services</FooterHeading>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem',
              }}
            >
              {serviceLinks.map((s) => (
                <li key={s}>
                  <FooterLink href="#services">{s}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem',
              }}
            >
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Social */}
          <div>
            <FooterHeading>Social</FooterHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    fontSize: '0.875rem',
                    color: 'var(--color-text)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                >
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            padding: '1.25rem 1.5rem',
          }}
        >
          <div
            style={{
              maxWidth: '80rem',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
            }}
          >
            <p style={{ fontSize: '0.72rem', color: '#333', letterSpacing: '0.03em' }}>
              © 2026 Fin Projukti | A BRAC University Student-Led Startup | Next-Gen Web &amp;
              AI Solutions.
            </p>
            <p style={{ fontSize: '0.72rem', color: '#333' }}>
              Crafted with precision · Built for impact.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4
      style={{
        fontSize: '0.68rem',
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        fontWeight: 700,
        color: 'var(--color-accent)',
        marginBottom: '1.25rem',
      }}
    >
      {children}
    </h4>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        fontSize: '0.875rem',
        color: 'var(--color-text)',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
    >
      {children}
    </a>
  )
}
