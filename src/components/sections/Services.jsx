import { motion } from 'motion/react'
import AnimatedSection, { itemVariants, containerVariants } from '../ui/AnimatedSection'

const services = [
  { icon: '💥', title: 'Collision Repair',     body: 'Full structural and panel repair after accidents. Insurance-coordinated and guaranteed.' },
  { icon: '🎨', title: 'Paint & Refinish',     body: 'Color-matched refinishing, blending, and full resprays using OEM-grade materials.' },
  { icon: '🔧', title: 'Dent & PDR',           body: 'Paintless dent repair for hail, door dings, and minor impacts — fast and paint-free.' },
  { icon: '🏗️', title: 'Frame Straightening',  body: 'Computer-measured frame and unibody alignment to OEM specs with certified equipment.' },
  { icon: '🪟', title: 'Glass & Windshield',   body: 'Same-day chip fills and full windshield replacement. Calibrated for ADAS systems.' },
  { icon: '🚗', title: 'Bumper Repair',        body: 'Cracked, scuffed, or detached bumpers repaired or replaced and painted to match.' },
  { icon: '📋', title: 'Insurance Claims',     body: 'We work directly with Geico, State Farm, Progressive, Allstate, and all major carriers.' },
  { icon: '🚘', title: 'Rental Coordination', body: "We coordinate rental vehicles through your claim so you're never without a car." },
]

export default function Services() {
  return (
    <section id="services" style={{ background: 'var(--carbon)', padding: '6rem 7%' }}>
      <AnimatedSection>
        <p className="section-eyebrow">What We Handle</p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '0.04em', lineHeight: 1, marginBottom: '1rem' }}>
          EVERY TYPE OF BODY REPAIR
        </h2>
        <p style={{ color: 'var(--silver)', fontSize: '1rem', maxWidth: 560, lineHeight: 1.7, marginBottom: '3rem' }}>
          From minor scratches to total collision rebuilds — our network shops are certified for every job type.
        </p>
      </AnimatedSection>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
        className="services-grid"
      >
        {services.map(svc => (
          <motion.div
            key={svc.title}
            variants={itemVariants}
            style={{
              background: 'var(--panel)',
              padding: '2rem 1.5rem',
              textAlign: 'center',
            }}
            whileHover={{ background: '#272D36' }}
            transition={{ duration: 0.15 }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{svc.icon}</div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.02em' }}>{svc.title}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--silver)', lineHeight: 1.6 }}>{svc.body}</p>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  )
}
