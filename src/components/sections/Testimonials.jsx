import { motion } from 'motion/react'
import AnimatedSection, { itemVariants, containerVariants } from '../ui/AnimatedSection'

const testimonials = [
  {
    initials: 'MR',
    name: 'Marcus R.',
    city: 'Brooklyn, NY',
    quote: '"Got rear-ended on the BQE. Submitted the form on a Tuesday morning and had a shop confirmed by noon. The shop worked directly with my insurance and I paid zero out of pocket. Unreal service."',
  },
  {
    initials: 'DL',
    name: 'Diana L.',
    city: 'Miami, FL',
    quote: '"I was dreading dealing with insurance after someone hit my parked car in Miami. These guys made it easy — agent called me in 10 minutes, shop was certified, car came back perfect."',
  },
  {
    initials: 'JT',
    name: 'James T.',
    city: 'Dallas, TX',
    quote: '"Hail storm in Dallas destroyed my hood and roof. Filed through BodyShopNearMe and within 24 hours I had three quotes and a shop picked. Process was totally painless."',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ background: 'var(--black)', padding: '6rem 7%' }}>
      <AnimatedSection>
        <p className="section-eyebrow">Real Reviews</p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '0.04em', lineHeight: 1, marginBottom: '1rem' }}>
          WHAT CUSTOMERS SAY
        </h2>
        <p style={{ color: 'var(--silver)', fontSize: '1rem', maxWidth: 560, lineHeight: 1.7, marginBottom: '3rem' }}>
          Thousands of drivers across 6 states have used our network. Here's what a few of them had to say.
        </p>
      </AnimatedSection>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}
        className="testimonials-grid"
      >
        {testimonials.map(t => (
          <motion.div
            key={t.name}
            variants={itemVariants}
            style={{
              background: 'var(--carbon)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '2rem',
            }}
            whileHover={{ borderColor: 'rgba(232,93,4,0.3)', y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ color: 'var(--orange)', fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '0.1em' }}>
              ★★★★★
            </div>
            <blockquote style={{ fontSize: '0.9rem', color: 'var(--silver)', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
              {t.quote}
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'var(--grad)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.85rem', color: '#fff',
                flexShrink: 0,
              }}>
                {t.initials}
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{t.city}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 900px) { .testimonials-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
