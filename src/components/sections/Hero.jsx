import { motion } from 'motion/react'
import StatCounter from '../ui/StatCounter'
import QuoteForm from '../forms/QuoteForm'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const words = ['YOUR CAR.', 'FIXED FAST.', 'ZERO STRESS.']

export default function Hero() {
  return (
    <section
      id="get-quote"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        paddingTop: 64,
        position: 'relative',
        overflow: 'hidden',
      }}
      className="hero-section"
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 80% at 70% 50%, rgba(232,93,4,0.08) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* LEFT — copy */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5% 5% 5% 7%', position: 'relative', zIndex: 2 }}>
        {/* Eyebrow */}
        <motion.p
          className="hero-eyebrow"
          {...fadeUp(0)}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ display: 'inline-block', width: 28, height: 1, background: 'var(--orange)' }} />
          NY · NJ · FL · CA · NV · TXHAHAHA
        </motion.p>

        {/* H1 — word stagger */}
        <h1
          aria-label="Your Car. Fixed Fast. Zero Stress."
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 0.95, letterSpacing: '0.03em', marginBottom: '1.5rem' }}
        >
          {words.map((word, i) => (
            <motion.span
              key={word}
              {...fadeUp(0.1 + i * 0.1)}
              style={{ display: 'block' }}
            >
              {i === 1 ? (
                <span className="grad-text">{word}</span>
              ) : word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.4)}
          style={{ fontSize: '1.05rem', color: 'var(--silver)', maxWidth: 440, marginBottom: '2.5rem', lineHeight: 1.7 }}
        >
          We connect you with top-rated, vetted auto body shops in your area — and work with your insurance so you don't have to chase anything.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.6)}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <a href="#get-quote" className="btn-primary">Get Your Free Quote</a>
          <a href="#how-it-works" className="btn-ghost">See How It Works</a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.8)}
          style={{
            display: 'flex',
            gap: '2.5rem',
            marginTop: '3rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid var(--border)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { target: 600, suffix: '+', label: 'Vetted Shops' },
            { target: 15, suffix: 'min', label: 'Avg Response Time' },
            { target: 6, suffix: '', label: 'States Covered' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
            >
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', lineHeight: 1 }}>
                <StatCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT — form panel */}
      <motion.div
        initial={{ opacity: 0, x: 48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'var(--carbon)',
          borderLeft: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '4% 5%',
          position: 'relative',
          zIndex: 2,
          overflowY: 'auto',
        }}
        className="hero-form-panel"
      >
        {/* Response badge */}
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(232,93,4,0.12)',
            border: '1px solid rgba(232,93,4,0.3)',
            borderRadius: 100,
            padding: '0.3rem 0.85rem',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: 'var(--orange2)',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            width: 'fit-content',
          }}
        >
          <span
            style={{
              width: 7, height: 7,
              borderRadius: '50%',
              background: 'var(--orange)',
              boxShadow: '0 0 6px var(--orange)',
              flexShrink: 0,
            }}
            className="pulse"
          />
          Agents Online — Avg 15 min Response
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.9rem', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
            GET A FREE QUOTE
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--silver)' }}>
            Tell us about your vehicle — we'll handle the rest.
          </p>
        </div>

        <QuoteForm />
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .hero-section { grid-template-columns: 1fr !important; min-height: auto !important; }
          .hero-form-panel { border-left: none !important; border-top: 1px solid var(--border) !important; }
        }
      `}</style>
    </section>
  )
}
