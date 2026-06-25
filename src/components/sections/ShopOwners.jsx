import { motion } from 'motion/react'
import AnimatedSection, { itemVariants, containerVariants } from '../ui/AnimatedSection'
import ShopOwnerForm from '../forms/ShopOwnerForm'

const perks = [
  {
    title: 'Pay Per Closed Claim Only',
    body: 'We work on a referral percentage of the repair total. Zero cost unless you get paid first.',
  },
  {
    title: 'Pre-Qualified Leads',
    body: 'Every lead includes damage photos, vehicle details, insurance info, and contact preference. No cold tire-kickers.',
  },
  {
    title: 'Exclusive Territory Zones',
    body: "We limit partner shops per ZIP code. If your area is available, you lock it in — competitors don't get the same leads.",
  },
  {
    title: 'Insurance-Ready Customers',
    body: 'We pre-screen for active claims and coverage. You spend time fixing cars, not chasing payments.',
  },
]

export default function ShopOwners() {
  return (
    <section
      id="shop-owners"
      style={{ background: 'var(--black)', padding: '6rem 7%', position: 'relative', overflow: 'hidden' }}
    >
      {/* Radial glow right */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 50% 60% at 90% 50%, rgba(232,93,4,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', position: 'relative', zIndex: 1 }}
        className="shop-owners-inner"
      >
        {/* LEFT — copy + perks */}
        <div>
          <AnimatedSection>
            <p className="section-eyebrow">For Body Shop Owners</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '0.04em', lineHeight: 1, marginBottom: '1rem' }}>
              GET EXCLUSIVE LEADS IN YOUR MARKET.
            </h2>
            <p style={{ color: 'var(--silver)', fontSize: '1rem', maxWidth: 460, lineHeight: 1.7 }}>
              We send you pre-qualified, insurance-verified repair leads — you only pay when a job closes. No monthly fees, no wasted ad spend.
            </p>
          </AnimatedSection>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}
          >
            {perks.map(perk => (
              <motion.div
                key={perk.title}
                variants={itemVariants}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  background: 'var(--carbon)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '1.25rem 1.5rem',
                }}
                whileHover={{ borderColor: 'rgba(232,93,4,0.4)' }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ color: 'var(--orange)', fontSize: '1.1rem', marginTop: '0.1rem', flexShrink: 0 }}>✔</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem' }}>{perk.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--silver)', lineHeight: 1.6 }}>{perk.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — form panel */}
        <AnimatedSection delay={0.2}>
          <div style={{
            background: 'var(--carbon)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '2.5rem',
          }}>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.75rem', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
              JOIN OUR NETWORK
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--silver)', marginBottom: '1.5rem' }}>
              Tell us about your shop. We'll follow up within 24 hours to confirm your market availability.
            </p>
            <ShopOwnerForm />
          </div>
        </AnimatedSection>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .shop-owners-inner { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
