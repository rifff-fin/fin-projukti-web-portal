import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    number: '01',
    title: 'UI/UX Design',
    description:
      'Crafting intuitive user experiences and pixel-perfect interfaces that convert visitors into loyal customers. Every pixel is intentional.',
    tags: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'Wireframing'],
  },
  {
    number: '02',
    title: 'Web & App Development',
    description:
      'Full-stack MERN applications and mobile apps built for performance, scalability, and real business impact. From DMs to dashboards.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Next.js', 'React Native'],
  },
  {
    number: '03',
    title: 'Automation (n8n)',
    description:
      'Custom automation workflows connecting your tools and eliminating repetitive tasks — so your team can focus on growth, not grunt work.',
    tags: ['n8n', 'WhatsApp API', 'Zapier', 'AI Agents', 'Python', 'Webhooks'],
  },
  {
    number: '04',
    title: 'Webflow Development',
    description:
      'Professional, responsive websites built in Webflow with pixel-perfect design, CMS integration, and powerful animations — no code compromises.',
    tags: ['Webflow', 'CMS', 'SEO', 'Responsive Design', 'Interactions'],
  },
  {
    number: '05',
    title: 'Framer Development',
    description:
      'Award-winning interactive websites built in Framer. We push the boundaries of what\'s possible — advanced scroll animations, 3D effects, custom components, and micro-interactions that wow visitors.',
    tags: ['Framer', '3D Effects', 'Scroll Animation', 'Micro-interactions', 'Custom Components'],
  },
]

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="services"
      ref={ref}
      style={{
        padding: '6rem 1.5rem',
        maxWidth: '80rem',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '4rem' }}
      >
        <span className="section-label">What We Build</span>
        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 900,
            color: '#fff',
            marginTop: '0.75rem',
            letterSpacing: '-0.03em',
          }}
        >
          Services built for impact.
        </h2>
        <p
          style={{
            marginTop: '1rem',
            fontSize: '0.95rem',
            color: 'var(--color-text)',
            maxWidth: '36rem',
            lineHeight: 1.7,
          }}
        >
          Every service we offer is designed around one goal: generating measurable results for
          your business through exceptional design and engineering.
        </p>
      </motion.div>

      {/* Service rows */}
      <div>
        {services.map((svc, i) => (
          <ServiceRow key={svc.number} service={svc} index={i} inView={inView} />
        ))}
        <div style={{ borderTop: '1px solid var(--color-border)' }} />
      </div>
    </section>
  )
}

function ServiceRow({
  service,
  index,
  inView,
}: {
  service: (typeof services)[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1 }}
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '2rem 0',
        transition: 'border-top-color 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderTopColor = 'var(--color-accent)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderTopColor = 'var(--color-border)'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'flex-start',
        }}
      >
        {/* Number */}
        <span
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: 'var(--color-accent)',
            flexShrink: 0,
            width: '5rem',
            letterSpacing: '-0.04em',
            opacity: 0.85,
          }}
        >
          {service.number}
        </span>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '0.75rem',
              letterSpacing: '-0.02em',
              transition: 'color 0.3s ease',
            }}
          >
            {service.title}
          </h3>
          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.75,
              color: 'var(--color-text)',
              marginBottom: '1.25rem',
              maxWidth: '44rem',
            }}
          >
            {service.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {service.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  borderRadius: '2px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
