import { Link } from 'react-router-dom';
import '../styles/Hero.css';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-glow-gold" />
        <div className="hero-glow-cyan" />
        <div className="hero-grid-overlay" />
      </div>
      <div className="container hero-inner">
        {/* Text */}
        <div className="hero-text fade-in">
          <h1 className="hero-title">
            خوش آمدید به
            <br />
            دنیای گیمینگ لوکس
          </h1>
          <p className="hero-subtitle">
            تجربه‌ای فراتر از انتظار، با برترین تجهیزات و خدمات گیم
          </p>
          <div className="hero-cta">
            <Link to="/category/consoles" className="btn-gold hero-cta-primary">
              اکنون کشف کنید
            </Link>
            <Link to="/category/discs" className="btn-outline hero-cta-secondary">
              مشاهده محصولات
            </Link>
          </div>
        </div>

        {/* Product visual */}
        <div className="hero-visual fade-in">
          <div className="hero-product-glow" />
          <svg viewBox="0 0 400 400" className="hero-product-svg" aria-hidden="true">
            <defs>
              <linearGradient id="hero-console" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3a3a3a" />
                <stop offset="1" stopColor="#0a0a0a" />
              </linearGradient>
              <linearGradient id="hero-controller" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f5f5f5" />
                <stop offset="1" stopColor="#d0d0d0" />
              </linearGradient>
              <radialGradient id="hero-glow" cx="0.5" cy="0.5">
                <stop offset="0" stopColor="rgba(0, 217, 255, 0.15)" />
                <stop offset="1" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* Glow under products */}
            <ellipse cx="200" cy="370" rx="160" ry="20" fill="url(#hero-glow)" />
            <ellipse cx="200" cy="375" rx="120" ry="8" fill="rgba(0, 217, 255, 0.12)" />

            {/* Console - PS5 style */}
            <rect x="150" y="80" width="100" height="180" rx="6" fill="url(#hero-console)" stroke="#D4AF5A" strokeWidth="0.5" />
            {/* Vents */}
            <rect x="165" y="95" width="70" height="3" rx="1" fill="#333" />
            <rect x="165" y="102" width="70" height="3" rx="1" fill="#333" />
            <rect x="165" y="109" width="70" height="3" rx="1" fill="#333" />
            <rect x="165" y="116" width="70" height="3" rx="1" fill="#333" />
            {/* Blue LED */}
            <rect x="155" y="135" width="90" height="4" rx="2" fill="#00D9FF" opacity="0.7" />
            <rect x="155" y="135" width="90" height="4" rx="2" fill="#00D9FF" />
            {/* Logo area */}
            <rect x="175" y="155" width="50" height="30" rx="3" fill="#1a1a1a" />
            <text x="200" y="175" textAnchor="middle" fill="#D4AF5A" fontSize="14" fontWeight="bold" fontFamily="sans-serif">PS5</text>
            {/* Lower section */}
            <rect x="170" y="200" width="60" height="40" rx="3" fill="#0a0a0a" />

            {/* Controller - floating to the right */}
            <g className="hero-controller-group">
              <path d="M250 250 Q250 230 265 230 L310 230 Q325 230 325 250 L325 270 Q325 285 315 285 Q308 285 305 278 L270 278 Q267 285 260 285 Q250 285 250 270 Z"
                fill="url(#hero-controller)" stroke="#D4AF5A" strokeWidth="0.5" />
              <circle cx="265" cy="258" r="6" fill="#1a1a1a" />
              <circle cx="265" cy="258" r="4" fill="#333" />
              <circle cx="305" cy="265" r="6" fill="#1a1a1a" />
              <circle cx="305" cy="265" r="4" fill="#333" />
              <rect x="280" y="235" width="16" height="2" rx="1" fill="#D4AF5A" opacity="0.6" />
            </g>

            {/* Headset - floating to the left */}
            <g className="hero-headset-group">
              <path d="M70 260 Q70 230 100 230 Q130 230 130 260" fill="none" stroke="url(#hero-controller)" strokeWidth="5" strokeLinecap="round" />
              <rect x="65" y="255" width="18" height="28" rx="6" fill="#1a1a1a" stroke="#D4AF5A" strokeWidth="0.5" />
              <rect x="117" y="255" width="18" height="28" rx="6" fill="#1a1a1a" stroke="#D4AF5A" strokeWidth="0.5" />
              <circle cx="74" cy="269" r="5" fill="#333" />
              <circle cx="126" cy="269" r="5" fill="#333" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
