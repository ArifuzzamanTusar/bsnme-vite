export default function Footer() {
  return (
    <footer style={{ background: 'var(--carbon)', borderTop: '1px solid var(--border)', padding: '3rem 7% 2rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border)',
        }}
        className="footer-top-grid"
      >
        {/* Brand col */}
        <div>
          <a href="#" style={{ textDecoration: 'none', display: 'inline-flex', marginBottom: '0.75rem' }}>
            <img
              src="https://res.cloudinary.com/tusar/image/upload/v1782426672/clients/bodyshop-nearme/bsnme-white_ya5s3o.png"
              alt="BodyShopNearMe"
              style={{ height: 32, width: 'auto', display: 'block' }}
            />
          </a>
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: 280 }}>
            Connecting drivers with top-rated auto body shops across NY, NJ, FL, CA, NV, and TX. Fast. Free. Stress-free.
          </p>
        </div>

        {/* Services */}
        <div>
          <h5 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--silver)', marginBottom: '1rem' }}>
            Services
          </h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {['Collision Repair', 'Paint & Refinish', 'Dent & PDR', 'Frame Straightening', 'Glass & Windshield'].map(s => (
              <li key={s}>
                <a href="#services" style={{ fontSize: '0.82rem', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--white)'}
                  onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Coverage */}
        <div>
          <h5 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--silver)', marginBottom: '1rem' }}>
            Coverage
          </h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {['New York', 'New Jersey', 'Florida', 'California', 'Nevada', 'Texas'].map(s => (
              <li key={s}>
                <a href="#coverage" style={{ fontSize: '0.82rem', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--white)'}
                  onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h5 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--silver)', marginBottom: '1rem' }}>
            Company
          </h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Why Choose Us', href: '#why-us' },
              { label: 'For Shop Owners', href: '#shop-owners' },
              { label: 'FAQ', href: '#faq' },
            ].map(l => (
              <li key={l.label}>
                <a href={l.href} style={{ fontSize: '0.82rem', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--white)'}
                  onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', flexWrap: 'wrap', gap: '0.75rem' }}>
        <span>© {new Date().getFullYear()} BodyShopNearMe. All rights reserved.</span>
        <span>NY · NJ · FL · CA · NV · TX</span>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-top-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 600px) {
          .footer-top-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
