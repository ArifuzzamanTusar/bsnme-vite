import { motion } from 'motion/react'
import AnimatedSection, { itemVariants, containerVariants } from '../ui/AnimatedSection'
import StatCounter from '../ui/StatCounter'

const metrics = [
  { val: 4.9, suffix: '★', label: 'Average Shop Rating', decimal: true },
  { val: 98, suffix: '%', label: 'Customer Satisfaction' },
  { val: 15, suffix: 'm', label: 'Avg Response Time' },
  { val: 0, suffix: '', prefix: '$', label: 'Cost to Consumer' },
]

const points = [
  {
    icon: '🔍',
    title: 'Every Shop is Vetted',
    body: "We don't list every shop in the area. We hand-select partners based on licensing, insurance carrier relationships, reviews, and repair certifications.",
  },
  {
    icon: '📋',
    title: 'We Speak Insurance',
    body: "Our team knows how claims work. We match you to shops with direct relationships with your carrier — so supplements get approved and repairs don't stall.",
  },
  {
    icon: '⚡',
    title: 'Live Agent Assigned to You',
    body: "Unlike lead aggregators who just email a list, you get a real agent who follows your job from submission to delivery.",
  },
  {
    icon: '🛡️',
    title: 'Guaranteed Quality',
    body: "Every repair through our network comes with a minimum 12-month workmanship warranty. If a shop doesn't stand behind it, we find you one that does.",
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" style={{ background: 'var(--carbon)', padding: '6rem 7%' }}>
      <AnimatedSection>
        <p className="section-eyebrow">Why We're Different</p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '0.04em', lineHeight: 1, marginBottom: '3rem' }}>
          NOT JUST A DIRECTORY.
        </h2>
      </AnimatedSection>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
        className="why-grid"
      >
        {/* Metrics panel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {metrics.map(m => (
            <motion.div
              key={m.label}
              variants={itemVariants}
              style={{ background: 'var(--panel)', padding: '2rem 1.75rem' }}
              whileHover={{ background: '#272D36' }}
              transition={{ duration: 0.15 }}
            >
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.8rem', lineHeight: 1, marginBottom: '0.25rem', letterSpacing: '0.02em' }}>
                {m.prefix || ''}
                {m.val === 0 ? <span>0</span> : <StatCounter target={m.val} suffix="" />}
                <span style={{ color: 'var(--orange)' }}>{m.suffix}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--silver)' }}>{m.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why points */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
        >
          {points.map(p => (
            <motion.div
              key={p.title}
              variants={itemVariants}
              style={{ display: 'flex', gap: '1.25rem' }}
            >
              <div style={{
                width: 44, height: 44,
                background: 'rgba(232,93,4,0.1)',
                border: '1px solid rgba(232,93,4,0.25)',
                borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem',
                flexShrink: 0,
                marginTop: '0.1rem',
              }}>
                {p.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--silver)', lineHeight: 1.65 }}>{p.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) { .why-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }
      `}</style>
    </section>
  )
}
