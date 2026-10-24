import { site } from '../data/site'
import { useSectionLink } from '../hooks/useSectionLink'

const NAV = [
  { id: 'top', label: 'خانه' },
  { id: 'vitrine', label: 'ویترین' },
  { id: 'about', label: 'درباره ما' },
]

export default function Footer() {
  const sectionLink = useSectionLink()
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="f-brand">
            <span className="brand-name" style={{ color: '#fff', fontSize: '1.3rem' }}>{site.name}</span>
            <p className="f-brand-desc">{site.tagline} {site.about}</p>
            <div className="socials">
              <a href="#" aria-label="اینستاگرام" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" aria-label="تلگرام" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M21.5 4.5 2.9 11.7c-.8.3-.8 1.5.1 1.7l4.6 1.4 1.8 5.6c.3.8 1.3.9 1.8.2l2.6-3.4 4.7 3.5c.7.5 1.7.1 1.9-.8l3-13.6c.2-1-.8-1.8-1.9-1.8Z" />
                </svg>
              </a>
              <a href="#" aria-label="واتس‌اپ" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
                  <path d="M8.7 8.9c.4-.9 2.7-.5 3 .5l.7 1.9c.2.5-.6 1.3-.6 1.3s.3 1.9 2.3 3.2c0 0 1 .3 1.3-.2.6-.9 2.3-.5 2.6.3.3.9-.6 2.3-1.6 2.6-3.6 1-9.8-4.3-8.5-9.1" />
                </svg>
              </a>
            </div>
          </div>
          <nav aria-label="پیوندهای پاورقی">
            <h4>دسترسی سریع</h4>
            <div className="f-links">
              {NAV.map((l) => (
                <a key={l.id} href={`#${l.id}`} onClick={sectionLink(l.id)}>{l.label}</a>
              ))}
            </div>
          </nav>
          <div>
            <h4>ساعت کاری</h4>
            <div className="f-contact">
              <span>{site.hours}</span>
              <span style={{ color: '#8d8172' }}>سفارش حضوری و بیرون‌بر</span>
            </div>
          </div>
          <div>
            <h4>تماس</h4>
            <div className="f-contact">
              <span><b>تلفن</b>{site.phoneFa}</span>
              <span><b>ایمیل</b>{site.email}</span>
              <span><b>آدرس</b>{site.address}</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© ۱۴۰۵ {site.name} — تمامی حقوق محفوظ است.</span>
          <span>ساخته‌شده با عشق و دانه‌های تازه ☕</span>
        </div>
      </div>
    </footer>
  )
}
