import { useMemo, useState } from 'react'
import HeroVideo from '../components/HeroVideo'
import Reveal from '../components/Reveal'
import MenuItemCard from '../components/MenuItemCard'
import { categories, menu } from '../data/menu'
import { site } from '../data/site'

const FEATURES = [
  {
    title: 'دانه‌های تازه',
    desc: 'رست هفتگی و دم‌آوری دقیق برای هر فنجان؛ عطر دانه از لحظه آسیاب حس می‌شود.',
    icon: <><ellipse cx="12" cy="12" rx="5.5" ry="8"/><path d="M12 8c-1.8 2-1.8 6 0 8"/></>,
  },
  {
    title: 'پخت روزانه',
    desc: 'کیک‌ها و شیرینی‌های ویترین هر صبح در همان آشپزخانه پخت می‌شوند.',
    icon: <><path d="M4 9h16v3a8 8 0 0 1-16 0Z"/><path d="M20 9a2.5 2.5 0 0 0 0-5c-1 0-2 .8-2 2"/><path d="M7 22h10"/></>,
  },
  {
    title: 'فضای دنج',
    desc: 'نور گرم، موسیقی ملایم و میزهایی که برای ماندن ساخته شده‌اند.',
    icon: <><path d="M5 21V11a7 7 0 0 1 14 0v10"/><path d="M3 21h18"/><path d="M12 3V1"/></>,
  },
]

export default function Home() {
  const [cat, setCat] = useState('all')
  const items = useMemo(() => (cat === 'all' ? menu : menu.filter((m) => m.cat === cat)), [cat])

  return (
    <>
      <HeroVideo />
      <main>
        <section id="vitrine" className="section" aria-labelledby="vitrine-title">
          <div className="container">
            <div className="section-head">
              <p className="label">ویترین کافه</p>
              <h2 className="h2" id="vitrine-title">از ویترین انتخاب کنید</h2>
              <p className="lead">
                هر چیز که در ویترین می‌بینید، همین‌جا قابل سفارش است. آیتم‌ها را انتخاب کنید و برای پرداخت به صندوق بروید.
              </p>
            </div>
            <div className="chips" role="group" aria-label="دسته‌بندی ویترین">
              {categories.map((c) => (
                <button
                  key={c.id}
                  className={`chip ${cat === c.id ? 'on' : ''}`}
                  onClick={() => setCat(c.id)}
                  aria-pressed={cat === c.id}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="menu-grid">
              {items.map((item, i) => (
                <Reveal key={item.id} delay={(i % 4) * 70}>
                  <MenuItemCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section about" aria-labelledby="about-title">
          <div className="container">
            <div className="section-head">
              <p className="label">درباره ما</p>
              <h2 className="h2" id="about-title">چرا {site.name}؟</h2>
              <p className="lead">{site.about}</p>
            </div>
            <div className="features">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 100}>
                  <div className="feature">
                    <div className="feature-ico">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" aria-hidden="true">{f.icon}</svg>
                    </div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
