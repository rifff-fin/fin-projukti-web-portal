import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const values = [
  {
    title: 'Craft over Quantity',
    description:
      'We build fewer things better. Every pixel, every function, every line of code is intentional and purposeful.',
  },
  {
    title: 'AI-First Thinking',
    description:
      'Before writing a single line, we ask: how can automation make this 10× more powerful?',
  },
  {
    title: 'Radical Transparency',
    description:
      'No black boxes. You know what we build, why we build it, and exactly how it scales.',
  },
]

export default function DNA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="dna"
      ref={ref}
      style={{
        position: 'relative',
        padding: '7rem 1.5rem',
        overflow: 'hidden',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      {/* Animated orange glow blob */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(255,102,0,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
          animation: 'pulse-glow 5s ease-in-out infinite',
        }}
      />
      {/* Top-right subtle noise */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(255,102,0,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: '80rem',
          margin: '0 auto',
        }}
      >
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'block', marginBottom: '0.5rem' }}
        >
          Who We Are
        </motion.span>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 26rem), 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Left — Bold statement */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '1.75rem',
              }}
            >
              Our DNA:{' '}
              <span style={{ color: 'var(--color-accent)' }}>From BRACU</span>
              <br />
              to Big Tech.
            </h2>
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: 'var(--color-text)',
                marginBottom: '1.25rem',
              }}
            >
              We are a startup founded by students of{' '}
              <strong style={{ color: '#fff' }}>BRAC University</strong> — one of
              Bangladesh's most prestigious institutions — with a singular dream: to become
              a physical tech giant that transforms how Bangladeshi entrepreneurs do business.
            </p>
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: 'var(--color-text)',
              }}
            >
              <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>"Fin"</span>{' '}
              isn't just a name. It's a commitment — to{' '}
              <em style={{ color: '#fff' }}>finishing</em> the era of manual struggle for
              Bangladeshi entrepreneurs and beginning the age of AI-powered growth.
            </p>
          </motion.div>

          {/* Right — Core values */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.12 }}
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(8px)',
                  transition: 'border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(255,102,0,0.35)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border)'
                }}
              >
                <h4
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {val.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.7,
                    color: 'var(--color-text)',
                  }}
                >
                  {val.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
