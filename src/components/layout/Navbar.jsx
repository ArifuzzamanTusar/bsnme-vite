import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const NAV_SECTIONS = ['get-quote', 'how-it-works', 'coverage', 'services', 'shop-owners']

const navLinks = [
  { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
  { label: 'Coverage',     href: '#coverage',     id: 'coverage' },
  { label: 'Services',     href: '#services',      id: 'services' },
  { label: 'Shop Owners',  href: '#shop-owners',  id: 'shop-owners' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeId = useScrollSpy(NAV_SECTIONS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on link click
  const handleLinkClick = () => setMobileOpen(false)

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? 'rgba(10,10,10,0.96)' : 'rgba(10,10,10,0.88)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 5%',
          height: 64,
          transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img
            src="https://res.cloudinary.com/tusar/image/upload/v1782426672/clients/bodyshop-nearme/bsnme-white_ya5s3o.png"
            alt="BodyShopNearMe"
            style={{ height: 36, width: 'auto', display: 'block' }}
          />
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={link.href}
                style={{
                  color: activeId === link.id ? 'var(--orange)' : 'var(--silver)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#get-quote"
              style={{
                background: 'var(--grad)',
                color: '#fff',
                padding: '0.5rem 1.25rem',
                borderRadius: 4,
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Free Quote
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          id="nav-hamburger"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'var(--white)',
            fontSize: '1.4rem',
          }}
          className="hamburger-btn"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed',
              top: 64,
              left: 0,
              right: 0,
              zIndex: 99,
              background: 'rgba(17,19,24,0.98)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--border)',
              padding: '1.5rem 5%',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {navLinks.map(link => (
              <a
                key={link.id}
                href={link.href}
                onClick={handleLinkClick}
                style={{
                  color: activeId === link.id ? 'var(--orange)' : 'var(--silver)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#get-quote"
              onClick={handleLinkClick}
              className="btn-primary"
              style={{ textAlign: 'center', justifyContent: 'center' }}
            >
              Free Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
