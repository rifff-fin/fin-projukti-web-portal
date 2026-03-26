const techs = [
  'MERN Stack',
  'Python',
  'AI Stacks',
  'Java',
  'C#',
  'C++',
  'React',
  'Node.js',
  'WhatsApp API',
  'PHP',
  'ASP.NET',
]

const SEPARATOR = '✦'

export default function TechMarquee() {
  // Triple the items for a seamless infinite loop
  const items = [...techs, ...techs, ...techs]

  return (
    <div
      style={{
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        padding: '1rem 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Left fade */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '8rem',
          background: 'linear-gradient(to right, var(--color-surface), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      {/* Right fade */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '8rem',
          background: 'linear-gradient(to left, var(--color-surface), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'marquee 35s linear infinite',
          willChange: 'transform',
        }}
      >
        {items.map((tech, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '0 1.5rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--color-text)',
              flexShrink: 0,
            }}
          >
            {tech}
            <span style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>
              {SEPARATOR}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
