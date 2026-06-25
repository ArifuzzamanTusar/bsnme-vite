import { motion } from 'motion/react'

export default function CTAStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      style={{
        background: 'var(--grad)',
        padding: '4rem 7%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        flexWrap: 'wrap',
      }}
      className="cta-strip"
    >
      <div>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          letterSpacing: '0.04em',
          color: '#fff',
          lineHeight: 1.05,
        }}>
          YOUR CAR WON'T FIX ITSELF.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
          Get matched with a top-rated shop in your area — free, fast, and stress-free.
        </p>
      </div>

      <motion.a
        href="#get-quote"
        className="btn-white"
        whileHover={{ scale: 1.03, translateY: -2 }}
        transition={{ duration: 0.15 }}
      >
        → Get My Free Quote
      </motion.a>

      <style>{`
        @media (max-width: 600px) {
          .cta-strip { flex-direction: column !important; text-align: center !important; }
        }
      `}</style>
    </motion.div>
  )
}
