import '../styles/Sections.css';

export function TrustSection() {
  const features = [
    { title: 'ارسال سریع', desc: 'تحویل سریع سفارش‌ها', icon: TrustIcons.Shipping },
    { title: 'ضمانت اصالت', desc: 'تضمین اصالت محصولات', icon: TrustIcons.Shield },
    { title: 'پرداخت امن', desc: 'پرداخت کاملاً امن', icon: TrustIcons.Lock },
    { title: 'پشتیبانی', desc: 'پشتیبانی قبل و بعد از خرید', icon: TrustIcons.Support },
  ];

  return (
    <section className="container trust-section">
      <div className="trust-grid">
        {features.map((f) => (
          <div key={f.title} className="trust-card">
            <div className="trust-icon">{<f.icon />}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PromoBanner() {
  return (
    <section className="container promo-banner">
      <div className="promo-bg">
        <div className="promo-glow-gold" />
        <div className="promo-glow-cyan" />
      </div>
      <div className="promo-content">
        <h2>تخفیف ویژه گیمرها</h2>
        <p>تجهیزات منتخب گیمینگ با قیمت ویژه</p>
        <button className="btn-gold promo-cta">مشاهده تخفیف‌ها</button>
      </div>
    </section>
  );
}

const TrustIcons = {
  Shipping: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Support: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};
