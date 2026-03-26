import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'Researching your manual limits. We map every friction point in your current workflow.',
  },
  {
    number: '02',
    title: 'Architecture',
    description: 'Designing your digital foundation. Scalable, modular, and built to outlast trends.',
  },
  {
    number: '03',
    title: 'Engineering',
    description: 'Building high-end, scalable code. Every function is intentional, every API battle-tested.',
  },
  {
    number: '04',
    title: 'Launch & Scale',
    description: 'Starting your automated journey. Deployed, monitored, and ready to grow with you.',
  },
]

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '6rem 1.5rem',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4.5rem' }}
        >
          <span className="section-label">How We Work</span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 900,
              color: '#fff',
              marginTop: '0.75rem',
              letterSpacing: '-0.03em',
            }}
          >
            Our Process
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '42rem' }}>
          {/* Connector line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              position: 'absolute',
              left: '10px',
              top: '10px',
              bottom: '10px',
              width: '1px',
              backgroundColor: 'var(--color-border)',
              transformOrigin: 'top',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
              >
                {/* Orange dot */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                    flexShrink: 0,
                    marginTop: '0.2rem',
                    boxShadow: '0 0 16px rgba(255,102,0,0.55)',
                  }}
                />

                <div>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'var(--color-accent)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {step.number}
                  </span>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      lineHeight: 1.7,
                      color: 'var(--color-text)',
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
