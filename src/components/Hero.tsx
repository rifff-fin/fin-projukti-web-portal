import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion'
import type { Transition, TargetAndTransition } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

/* ─── Animated counter ────────────────────────────────────────────── */
function Counter({
  to,
  suffix,
  inView,
  delay = 0,
}: {
  to: number
  suffix: string
  inView: boolean
  delay?: number
}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let stopped = false
    const timer = setTimeout(() => {
      if (stopped) return
      const controls = animate(0, to, {
        duration: 2.2,
        ease: 'easeOut',
        onUpdate: (v) => setValue(Math.round(v)),
      })
      // store stop ref on timer object for cleanup
      ;(timer as unknown as { _stop: () => void })._stop = () => controls.stop()
    }, delay * 1000)
    return () => {
      stopped = true
      clearTimeout(timer)
    }
  }, [inView, to, delay])

  return (
    <>
      {value}
      {suffix}
    </>
  )
}

/* ─── Word-by-word animated heading ──────────────────────────────── */
function AnimatedWords({
  text,
  accentWords,
  delay = 0,
  className,
}: {
  text: string
  accentWords?: string[]
  delay?: number
  className?: string
}) {
  const words = text.split(' ')
  return (
    <span className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => {
        const isAccent = accentWords?.some((a) =>
          word.replace(/[.,!?]/, '').toLowerCase() === a.toLowerCase(),
        )
        return (
          <motion.span
            key={i}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
            }}
            initial={{ opacity: 0, y: '60%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: delay + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span
              style={{
                display: 'inline-block',
                color: isAccent ? 'var(--color-accent)' : undefined,
              }}
            >
              {word}
            </span>
            {i < words.length - 1 ? '\u00a0' : ''}
          </motion.span>
        )
      })}
    </span>
  )
}

const EASE_CURVE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const fadeUp = (
  delay = 0,
): { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition } => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: EASE_CURVE },
})

const stats = [
  { value: 50, suffix: '+', label: 'Solutions Shipped' },
  { value: 30, suffix: '+', label: 'Businesses Scaled' },
  { value: 100, suffix: '%', label: 'Secure Architecture' },
]

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.65], [0, -40])
  const statsInView = useInView(statsRef, { once: true })

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {/* Parallax grid background */}
      <motion.div
        style={{ y: bgY, position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,102,0,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,102,0,0.035) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
        {/* Central radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,102,0,0.1) 0%, transparent 65%)',
            animation: 'pulse-glow 4s ease-in-out infinite',
          }}
        />
        {/* Vignette overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
          }}
        />
      </motion.div>

      {/* Floating horizontal scan line */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(255,102,0,0.4), transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
        animate={{ top: ['10%', '90%', '10%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content */}
      <motion.div
        style={{
          opacity: contentOpacity,
          y: contentY,
          position: 'relative',
          zIndex: 10,
          maxWidth: '64rem',
          margin: '0 auto',
          padding: '6rem 1.5rem 0',
          textAlign: 'center',
        }}
      >
        {/* Animated badge */}
        <motion.div {...fadeUp(0.05)}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
              padding: '0.375rem 1rem',
              borderRadius: '9999px',
              border: '1px solid var(--color-border)',
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--color-accent)',
              backgroundColor: 'var(--color-accent-dim)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent)',
                display: 'inline-block',
              }}
            />
            BRAC University Student Startup · Est. 2024
          </span>
        </motion.div>

        {/* Word-by-word animated headline */}
        <h1
          style={{
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#fff',
            marginBottom: '1.5rem',
          }}
        >
          <AnimatedWords
            text="The End of Manual Limits."
            accentWords={['Limits.']}
            delay={0.15}
          />
          <br />
          <AnimatedWords
            text="The Beginning of AI Growth."
            accentWords={['AI', 'Growth.']}
            delay={0.45}
          />
        </h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.75)}
          style={{
            maxWidth: '38rem',
            margin: '0 auto 2.5rem',
            fontSize: '1.05rem',
            lineHeight: 1.75,
            color: 'var(--color-text)',
          }}
        >
          A BRAC University student-led startup engineering the future of digital commerce
          through high-end automation and scalable web architecture.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.9)}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '4rem',
          }}
        >
          <a href="#contact" className="btn-primary" style={{ fontSize: '0.9rem' }}>
            Automate My Business
            <ArrowRight size={16} />
          </a>
          <a href="#services" className="btn-outline" style={{ fontSize: '0.9rem' }}>
            See Our Tech Stack
          </a>
        </motion.div>

        {/* Stats with animated counters */}
        <motion.div
          ref={statsRef}
          {...fadeUp(1.05)}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '3rem',
            justifyContent: 'center',
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 900,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                <Counter to={stat.value} suffix={stat.suffix} inView={statsInView} delay={1.3 + i * 0.15} />
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-text)',
                  marginTop: '0.4rem',
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
          color: 'var(--color-border)',
          zIndex: 10,
        }}
      >
        <span
          style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}
        >
          Scroll
        </span>
        <ChevronDown size={14} style={{ animation: 'bounce 1.5s infinite' }} />
      </motion.div>
    </section>
  )
}
