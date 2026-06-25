const items = [
  { icon: '✅', text: '600+ Vetted Partner Shops' },
  { icon: '🔒', text: 'We Work With All Major Insurers' },
  { icon: '⚡', text: '15-Min Average Response' },
  { icon: '⭐', text: '4.9 / 5 Average Customer Rating' },
  { icon: '📍', text: '6 States · Growing Network' },
  { icon: '🆓', text: '100% Free to Consumers' },
]

export default function TrustBar() {
  return (
    <div
      style={{
        background: 'var(--carbon)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 7%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        flexWrap: 'wrap',
      }}
    >
      {items.map(item => (
        <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--silver)', fontWeight: 500 }}>
          <span style={{ fontSize: '1rem' }}>{item.icon}</span>
          {item.text}
        </div>
      ))}
    </div>
  )
}
