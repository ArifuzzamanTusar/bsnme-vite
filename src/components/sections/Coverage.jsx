import { motion } from 'motion/react'
import AnimatedSection, { itemVariants, containerVariants } from '../ui/AnimatedSection'

const states = [
  {
    abbr: 'NY', flag: '🗽', name: 'New York', shops: '140+ Partner Shops',
    cities: ['New York City', 'Brooklyn', 'Queens', 'Bronx', 'Buffalo', 'Long Island', 'Yonkers'],
  },
  {
    abbr: 'NJ', flag: '🌿', name: 'New Jersey', shops: '85+ Partner Shops',
    cities: ['Newark', 'Jersey City', 'Trenton', 'Edison', 'Camden', 'Paterson'],
  },
  {
    abbr: 'FL', flag: '🌴', name: 'Florida', shops: '120+ Partner Shops',
    cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale', 'Hialeah'],
  },
  {
    abbr: 'CA', flag: '🌁', name: 'California', shops: '160+ Partner Shops',
    cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'Fresno', 'Long Beach'],
  },
  {
    abbr: 'NV', flag: '🎰', name: 'Nevada', shops: '45+ Partner Shops',
    cities: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks'],
  },
  {
    abbr: 'TX', flag: '🤠', name: 'Texas', shops: '150+ Partner Shops',
    cities: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth', 'El Paso'],
  },
]

export default function Coverage() {
  return (
    <section id="coverage" style={{ background: 'var(--black)', padding: '6rem 7%' }}>
      <AnimatedSection>
        <p className="section-eyebrow">Service Area</p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '0.04em', lineHeight: 1, marginBottom: '1rem' }}>
          6 STATES. YOUR CITY COVERED.
        </h2>
        <p style={{ color: 'var(--silver)', fontSize: '1rem', maxWidth: 560, lineHeight: 1.7, marginBottom: '3rem' }}>
          Our network spans the most vehicle-dense markets in the country. If you're in one of these states, we have vetted shops near you.
        </p>
      </AnimatedSection>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}
        className="states-grid"
      >
        {states.map(state => (
          <motion.div
            key={state.abbr}
            variants={itemVariants}
            style={{
              background: 'var(--carbon)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '2rem 1.75rem',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
            }}
            whileHover={{
              borderColor: 'rgba(232,93,4,0.5)',
              y: -4,
              boxShadow: '0 8px 32px rgba(232,93,4,0.1)',
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Background abbr watermark */}
            <div style={{
              position: 'absolute', right: '-0.5rem', top: '-1.5rem',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '5.5rem',
              color: 'rgba(255,255,255,0.03)',
              letterSpacing: '-0.02em',
              pointerEvents: 'none',
              userSelect: 'none',
            }}>
              {state.abbr}
            </div>

            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{state.flag}</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>
              {state.name}
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'var(--orange)', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              {state.shops}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {state.cities.map(city => (
                <span key={city} style={{
                  background: 'var(--steel)',
                  border: '1px solid var(--border)',
                  borderRadius: 100,
                  padding: '0.2rem 0.65rem',
                  fontSize: '0.72rem',
                  color: 'var(--silver)',
                  fontWeight: 500,
                }}>
                  {city}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 900px) { .states-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .states-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
