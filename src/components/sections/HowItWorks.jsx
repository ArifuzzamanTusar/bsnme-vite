import { motion } from 'motion/react'
import AnimatedSection, { itemVariants, containerVariants } from '../ui/AnimatedSection'

const steps = [
  {
    num: '1',
    icon: '📋',
    title: 'Submit Your Details',
    body: 'Fill out our quick form with your vehicle info, damage type, and ZIP code. Upload photos if you have them — it speeds up the match.',
  },
  {
    num: '2',
    icon: '🔍',
    title: 'We Analyze & Match',
    body: 'Our team reviews your submission and matches you with the highest-rated shop in our vetted network that specializes in your repair type.',
  },
  {
    num: '3',
    icon: '📞',
    title: 'Agent Calls You Within 15 Min',
    body: 'A dedicated agent contacts you to confirm your match, coordinate your insurance claim, and schedule your drop-off. Zero runaround.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: 'var(--carbon)', padding: '6rem 7%' }}>
      <AnimatedSection>
        <p className="section-eyebrow">The Process</p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '0.04em', lineHeight: 1, marginBottom: '1rem' }}>
          FIXED IN THREE STEPS
        </h2>
        <p style={{ color: 'var(--silver)', fontSize: '1rem', maxWidth: 560, lineHeight: 1.7, marginBottom: '3rem' }}>
          We cut out the confusion. Submit once, and our team matches you to the right shop for your damage type, location, and insurance.
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
          gap: '1.5px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
        className="steps-grid"
      >
        {steps.map(step => (
          <motion.div
            key={step.num}
            variants={itemVariants}
            style={{
              background: 'var(--panel)',
              padding: '2.5rem 2rem',
              position: 'relative',
              transition: 'background 0.2s',
            }}
            whileHover={{ background: '#272D36' }}
          >
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '4rem', lineHeight: 1, color: 'rgba(232,93,4,0.15)', position: 'absolute', top: '1.25rem', right: '1.5rem', letterSpacing: '-0.02em', pointerEvents: 'none' }}>
              {step.num}
            </div>
            <div style={{ fontSize: '1.8rem', marginBottom: '1.25rem' }}>{step.icon}</div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.6rem', letterSpacing: '0.02em' }}>{step.title}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--silver)', lineHeight: 1.65 }}>{step.body}</p>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 900px) { .steps-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
