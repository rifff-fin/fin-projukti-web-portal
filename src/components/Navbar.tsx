import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'DNA', href: '#dna' },
]


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          backgroundColor: scrolled ? 'rgba(0,0,0,0.88)' : 'rgba(0,0,0,0.3)',
          borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'var(--color-border-subtle)'}`,
          transition: 'background-color 0.3s ease, border-color 0.3s ease, padding 0.3s ease',
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              textDecoration: 'none',
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
                boxShadow: '0 0 16px rgba(255,102,0,0.4)',
              }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '-0.02em',
              }}
            >
              <span style={{ color: 'var(--color-accent)' }}>FIN</span>
              <span style={{ color: '#fff' }}> Projukti</span>
            </span>
          </a>

          {/* Desktop Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <a href="#contact" className="btn-primary hidden md:inline-flex">
            Start Project
          </a>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed',
              top: '4rem',
              left: 0,
              right: 0,
              zIndex: 99,
              backgroundColor: 'rgba(0,0,0,0.96)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid var(--color-border)',
              padding: '1.25rem 1.5rem 1.5rem',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.875rem 0',
                  borderBottom: '1px solid var(--color-border)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary"
              style={{ marginTop: '1rem', display: 'inline-flex' }}
            >
              Start Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        fontSize: '0.875rem',
        fontWeight: 500,
        color: 'var(--color-text)',
        textDecoration: 'none',
        transition: 'color 0.2s',
        letterSpacing: '0.01em',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
    >
      {children}
    </a>
  )
}
