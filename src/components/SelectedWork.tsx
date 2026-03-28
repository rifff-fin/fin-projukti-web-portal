import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'

type Project = {
  title: string
  category: string
  description: string
  tags: string[]
  year: string
  metric: string
  link?: string
  githubLink?: string
}

const projects: Project[] = [
  {
    title: 'Al Rifat Portfolio',
    category: 'React + Vite',
    description:
      'A personal developer portfolio showcasing projects, skills, and achievements with a modern UI, smooth scroll animations, and responsive design.',
    tags: ['React', 'Vite', 'Framer Motion', 'Portfolio', 'Netlify'],
    year: '2025',
    metric: 'Digital Identity Built',
    link: 'https://abdullahalrifatportfolio.netlify.app/',
  },
  {
    title: 'Artographica Studios',
    category: 'Web Design',
    description:
      'A premium creative studio website showcasing design portfolio, services, and brand identity with smooth animations and a modern aesthetic for a design agency.',
    tags: ['React', 'Framer Motion', 'Web Design', 'Portfolio', 'Netlify'],
    year: '2025',
    metric: 'Live Studio Presence',
    link: 'https://artographica-studios.netlify.app/',
  },
  {
    title: 'E-Commerce Evolution',
    category: 'MERN + AI',
    description:
      'A full-scale e-commerce platform with AI-powered product recommendations, WhatsApp order tracking, and automated inventory management for a leading Dhaka retailer.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'OpenAI', 'WhatsApp API'],
    year: '2025',
    metric: '3× Revenue Growth',
  },
  {
    title: 'Digital Inventory System',
    category: 'Python + Automation',
    description:
      'An enterprise-grade inventory and analytics dashboard with Python-based automation pipelines, reducing manual overhead by 80% for a multi-branch operation.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Automation', 'React'],
    year: '2025',
    metric: '80% Less Manual Work',
  },
  {
    title: 'NFC Digital Portfolio Card',
    category: 'NFC + Web',
    description:
      'A sleek NFC-enabled smart card solution that instantly shares a full digital portfolio and contact info on a single tap. No app needed — tap, connect, impress.',
    tags: ['NFC Tech', 'React', 'Node.js', 'Digital Portfolio', 'PWA'],
    year: '2025',
    metric: 'Instant Digital Presence',
    link: 'https://msdiganto.netlify.app/',
  },
  {
    title: 'Smart POS System',
    category: 'MERN + Analytics',
    description:
      'A complete Point-of-Sale system with real-time inventory management, multi-branch sales analytics, staff roles, and WhatsApp receipt delivery for modern retail.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'WhatsApp API', 'Charts'],
    year: '2026',
    metric: '60% Faster Checkout',
  },
  {
    title: 'Restaurant QR Menu & Orders',
    category: 'QR + Real-time',
    description:
      'A full QR-based digital menu and order management system. Customers scan, browse, order and pay — all from their phone. Kitchen gets real-time order updates.',
    tags: ['React', 'Node.js', 'QR Tech', 'Socket.io', 'Real-time Orders', 'Payments'],
    year: '2026',
    metric: 'Zero Paper Menus',
  },
  {
    title: 'ThesisFlow',
    category: 'MERN Stack',
    description:
      'A full-stack MERN application for streamlining thesis management, collaboration, and submission workflows for academic institutions and research teams.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Academic'],
    year: '2025',
    metric: 'Academic Workflow Automated',
    githubLink: 'https://github.com/rifff-fin/thesisflow-mern',
  },
  {
    title: 'KAAJ KAAM',
    category: 'MERN + Job Portal',
    description:
      'A remote job portal built for Bangladesh — connecting local talent with remote employers through a clean, modern interface and powerful search & filter capabilities.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Remote Jobs', 'BD'],
    year: '2025',
    metric: 'BD Remote Workforce Enabled',
    githubLink:
      'https://github.com/rifff-fin/KAAJ_KAAM-A-Remote-job-portal-for-Bangladesh',
  },
  {
    title: 'BdQuakeAlert',
    category: 'Real-time + API',
    description:
      'A real-time Bangladesh earthquake monitoring and alert system, delivering live seismic data and safety notifications for at-risk regions across the country.',
    tags: ['React', 'Real-time', 'REST API', 'Public Safety', 'Netlify'],
    year: '2025',
    metric: 'Real-time Safety Data',
    link: 'https://bdquakealert.netlify.app/',
  },
]

const INITIAL_COUNT = 4

export default function SelectedWork() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT)

  return (
    <section
      id="work"
      ref={ref}
      style={{
        padding: '6rem 1.5rem',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            marginBottom: '4rem',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <span className="section-label">Portfolio</span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 900,
                color: '#fff',
                marginTop: '0.75rem',
                letterSpacing: '-0.03em',
              }}
            >
              Selected Work
            </h2>
          </div>

          {/* GitHub profile CTA */}
          <a
            href="https://github.com/rifff-fin"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.25rem',
              border: '1px solid #2a2a2a',
              borderRadius: '9999px',
              color: 'var(--color-text)',
              fontSize: '0.82rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, color 0.2s ease',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'var(--color-accent)'
              el.style.color = 'var(--color-accent)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = '#2a2a2a'
              el.style.color = 'var(--color-text)'
            }}
          >
            <Github size={15} />
            View All on GitHub
          </a>
        </motion.div>

        {/* Cards grid — 2 col on mobile, auto on desktop */}
        <div className="work-grid">
          <AnimatePresence initial={false}>
            {visible.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </div>

        {/* See More / See Less */}
        {projects.length > INITIAL_COUNT && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}
          >
            <button
              onClick={() => setShowAll((s) => !s)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 2rem',
                border: '1px solid #2a2a2a',
                borderRadius: '9999px',
                backgroundColor: 'transparent',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.02em',
                fontFamily: 'var(--font-sans)',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = 'var(--color-accent)'
                el.style.color = 'var(--color-accent)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = '#2a2a2a'
                el.style.color = 'var(--color-text)'
              }}
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp size={15} />
                </>
              ) : (
                <>
                  See More ({projects.length - INITIAL_COUNT} more) <ChevronDown size={15} />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
  inView?: boolean
}) {
  const primaryLink = project.link ?? project.githubLink

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="project-card"
      style={{
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: primaryLink ? 'pointer' : 'default',
        transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(255,102,0,0.45)'
        el.style.transform = 'translateY(-5px)'
        el.style.boxShadow = '0 24px 64px rgba(255,102,0,0.08)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'var(--color-border)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.875rem',
          flexWrap: 'wrap',
          gap: '0.375rem',
        }}
      >
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            padding: '0.3rem 0.75rem',
            backgroundColor: 'var(--color-accent-dim)',
            color: 'var(--color-accent)',
            borderRadius: '2px',
          }}
        >
          {project.category}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-border)', fontWeight: 500 }}>
          {project.year}
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '0.75rem',
          marginBottom: '0.5rem',
        }}
      >
        <h3
          style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>
        {primaryLink && (
          <ArrowUpRight
            size={17}
            style={{
              flexShrink: 0,
              marginTop: '0.2rem',
              color: 'var(--color-accent)',
              opacity: 0.6,
            }}
          />
        )}
      </div>

      {/* Metric */}
      <div
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          color: 'var(--color-accent)',
          marginBottom: '0.875rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        ↑ {project.metric}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 'clamp(0.72rem, 1.5vw, 0.875rem)',
          lineHeight: 1.65,
          color: 'var(--color-text)',
          flex: 1,
          marginBottom: '1rem',
        }}
      >
        {project.description}
      </p>

      {/* Bottom: tags + link buttons */}
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: (project.link || project.githubLink) ? '1rem' : '0' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '0.2rem 0.6rem',
                fontSize: '0.66rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                borderRadius: '2px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link buttons */}
        {(project.link || project.githubLink) && (
          <div
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
            onClick={(e) => e.stopPropagation()}
          >
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={linkBtnStyle}
                onMouseEnter={(e) => applyLinkHover(e, true)}
                onMouseLeave={(e) => applyLinkHover(e, false)}
              >
                <ExternalLink size={12} />
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                style={linkBtnStyle}
                onMouseEnter={(e) => applyLinkHover(e, true)}
                onMouseLeave={(e) => applyLinkHover(e, false)}
              >
                <Github size={12} />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )

  if (primaryLink) {
    return (
      <a
        href={primaryLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'block' }}
      >
        {cardContent}
      </a>
    )
  }

  return cardContent
}

const linkBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem',
  padding: '0.3rem 0.75rem',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  border: '1px solid #2a2a2a',
  borderRadius: '9999px',
  color: 'var(--color-text)',
  textDecoration: 'none',
  transition: 'border-color 0.2s ease, color 0.2s ease',
}

function applyLinkHover(e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) {
  const el = e.currentTarget as HTMLAnchorElement
  el.style.borderColor = enter ? 'var(--color-accent)' : '#2a2a2a'
  el.style.color = enter ? 'var(--color-accent)' : 'var(--color-text)'
}
