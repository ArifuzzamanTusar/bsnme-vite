import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import AnimatedSection, { itemVariants, containerVariants } from '../ui/AnimatedSection'

const faqs = [
  {
    num: '01',
    q: 'Is this service really free for customers?',
    a: "Yes — 100%. We are compensated by our partner shops when a repair is completed. You pay nothing to use our matching service, and your quote is always free with zero obligation.",
  },
  {
    num: '02',
    q: 'How do you select your partner shops?',
    a: "Every shop in our network goes through a vetting process that includes license verification, insurance carrier relationship checks, customer review analysis, and repair certification review. We only add shops that meet our quality threshold.",
  },
  {
    num: '03',
    q: 'What if I already have an insurance claim open?',
    a: "Perfect — that's actually ideal. We specialize in connecting customers who have active claims with shops that have direct relationships with that carrier. Tell us your carrier in the form and we'll prioritize accordingly.",
  },
  {
    num: '04',
    q: 'How quickly will someone contact me?',
    a: "Our average agent response time is 15 minutes during business hours (Mon–Sat, 8am–8pm local time). Submissions made after hours receive a callback first thing the next morning.",
  },
  {
    num: '05',
    q: 'What if I\'m not happy with the shop you match me to?',
    a: "We stand behind every match. If for any reason you're not satisfied — whether it's communication, timeline, or quality — contact our team and we'll reassign you to another partner shop at no cost.",
  },
  {
    num: '06',
    q: 'Do you work with all insurance companies?',
    a: "We work with all major carriers including Geico, State Farm, Progressive, Allstate, Liberty Mutual, Farmers, Nationwide, and more. We also help with out-of-pocket repairs if you're paying privately.",
  },
]

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      variants={itemVariants}
      onClick={() => setOpen(v => !v)}
      style={{
        background: 'var(--panel)',
        padding: '2rem',
        cursor: 'pointer',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
        userSelect: 'none',
      }}
      whileHover={{ background: '#272D36' }}
      transition={{ duration: 0.15 }}
    >
      <div style={{ position: 'absolute', top: '2rem', right: '1.75rem', fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: 'var(--orange)', letterSpacing: '0.08em' }}>
        {item.num}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingRight: '3.5rem', gap: '1rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.01em' }}>{item.q}</h3>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: 'var(--orange)', fontSize: '0.9rem', flexShrink: 0, marginTop: '0.1rem' }}
        >
          ▼
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontSize: '0.875rem', color: 'var(--silver)', lineHeight: 1.65, marginTop: '1rem', paddingRight: '3.5rem' }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" style={{ background: 'var(--carbon)', padding: '6rem 7%' }}>
      <AnimatedSection>
        <p className="section-eyebrow">Common Questions</p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '0.04em', lineHeight: 1, marginBottom: '1rem' }}>
          STRAIGHT ANSWERS.
        </h2>
        <p style={{ color: 'var(--silver)', fontSize: '1rem', maxWidth: 560, lineHeight: 1.7, marginBottom: '3rem' }}>
          No fluff. If you have a question we haven't answered here, our agents will pick up in minutes.
        </p>
      </AnimatedSection>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          border: '1px solid var(--border)',
          borderRadius: 8,
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
        className="faq-grid"
      >
        {faqs.map((item, i) => (
          <FAQItem key={item.num} item={item} />
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 900px) { .faq-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
