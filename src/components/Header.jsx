import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { site } from '../data/site'
import { useCart } from '../context/CartContext'
import { fa } from '../utils/format'
import { useSectionLink } from '../hooks/useSectionLink'

const LINKS = [
  { id: 'top', label: 'خانه' },
  { id: 'vitrine', label: 'ویترین' },
  { id: 'about', label: 'درباره ما' },
  { id: 'contact', label: 'تماس' },
]

function CupIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M16 26h26v10a10 10 0 0 1-10 10h-6a10 10 0 0 1-10-10z" stroke="var(--gold)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M42 28h4a6 6 0 0 1 0 12h-3" stroke="var(--gold)" strokeWidth="3" />
      <path d="M20 24c0-3 2-3 2-6M30 24c0-3 2-3 2-6" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 50h34" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function Header() {
  const { count } = useCart()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [solid, setSolid] = useState(pathname !== '/')
  const [open, setOpen] = useState(false)
  const sectionLink = useSectionLink()

  useEffect(() => {
    const onScroll = () => {
      if (pathname !== '/') { setSolid(true); return }
      const hero = document.getElementById('hero')
      const limit = hero ? hero.offsetHeight - window.innerHeight - 80 : window.innerHeight
      setSolid(window.scrollY > limit)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    // وقتی ارتفاع هیرو پس از بارگذاری ویدیو تغییر می‌کند، دوباره محاسبه کن
    const hero = document.getElementById('hero')
    let ro = null
    if (hero && 'ResizeObserver' in window) {
      ro = new ResizeObserver(onScroll)
      ro.observe(hero)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (ro) ro.disconnect()
    }
  }, [pathname])

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
    <header className={`hdr ${solid ? 'solid' : ''}`}>
      <div className="container hdr-inner">
        <Link to="/" className="brand" aria-label={site.name}>
          <CupIcon />
          <span>
            <span className="brand-name">{site.name}</span>
            <span className="brand-en">{site.nameEn}</span>
          </span>
        </Link>
        <nav className="nav" aria-label="ناوبری اصلی">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={sectionLink(l.id)}>{l.label}</a>
          ))}
        </nav>
        <div className="hdr-actions">
          <button className="cart-btn" onClick={() => navigate('/checkout')} aria-label={`سبد خرید، ${fa(count)} قلم`}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 7h12l-1.2 12.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8Z" />
              <path d="M9 7V5.6A3 3 0 0 1 12 3a3 3 0 0 1 3 2.6V7" />
            </svg>
            <span className="cart-txt">سبد</span>
            {count > 0 && <span className="cart-count">{fa(count)}</span>}
          </button>
          <button
            className={`burger ${open ? 'open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="باز و بسته کردن منو"
            aria-expanded={open}
          >
            <span /><span />
          </button>
        </div>
      </div>
    </header>
    <div className={`mobile-menu ${open ? 'open' : ''}`}>
      {LINKS.map((l) => (
        <a key={l.id} href={`#${l.id}`} onClick={(e) => { setOpen(false); sectionLink(l.id)(e) }}>{l.label}</a>
      ))}
      <a href={`tel:${site.phone}`} onClick={() => setOpen(false)}>تماس: {site.phoneFa}</a>
      <span className="mm-note">{site.hours}</span>
    </div>
    </>
  )
}
