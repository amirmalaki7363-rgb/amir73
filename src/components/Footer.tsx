import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top-border" />
      <div className="container">
        <div className="footer-grid">
          {/* Quick Links */}
          <div className="footer-col">
            <h4>دسترسی سریع</h4>
            <ul>
              <li><Link to="/">خانه</Link></li>
              <li><Link to="/category/consoles">فروشگاه</Link></li>
              <li><Link to="/category/consoles">محصولات</Link></li>
              <li><Link to="/about">درباره ما</Link></li>
              <li><Link to="/contact">تماس با ما</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4>دسته‌بندی‌ها</h4>
            <ul>
              <li><Link to="/category/consoles">کنسول‌ها</Link></li>
              <li><Link to="/category/discs">بازی‌ها</Link></li>
              <li><Link to="/category/controllers">دسته‌ها</Link></li>
              <li><Link to="/category/accounts">اکانت‌ها</Link></li>
              <li><Link to="/category/figures">فیگورها</Link></li>
              <li><Link to="/category/accessories">لوازم جانبی</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-col">
            <h4>خدمات مشتریان</h4>
            <ul>
              <li><Link to="/account">پیگیری سفارش</Link></li>
              <li><Link to="/about">سوالات متداول</Link></li>
              <li><Link to="/about">شرایط ارسال</Link></li>
              <li><Link to="/about">قوانین بازگشت</Link></li>
              <li><Link to="/about">حریم خصوصی</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>تماس با ما</h4>
            <ul className="contact-list">
              <li className="contact-item">
                <span className="contact-label">شماره تماس:</span>
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="contact-item">
                <span className="contact-label">ایمیل:</span>
                <span>info@pspro.ir</span>
              </li>
              <li className="contact-item">
                <span className="contact-label">آدرس:</span>
                <span>تهران، مرکز خرید گیمینگ</span>
              </li>
              <li className="contact-item">
                <span className="contact-label">ساعات کاری:</span>
                <span>شنبه تا پنجشنبه ۱۰-۲۲</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social + Bottom */}
        <div className="footer-bottom">
          <div className="footer-logo">
            <span className="logo-mark">PS</span>
            <span className="logo-text">PRO</span>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="Instagram" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="Telegram" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.94 4.6l-3.2 15.1c-.24 1.06-.88 1.32-1.78.82l-4.92-3.62-2.37 2.28c-.26.26-.48.48-.98.48l.35-4.96 9.06-8.18c.39-.35-.08-.54-.61-.19L6.46 13.1l-4.84-1.5c-1.05-.33-1.07-1.05.22-1.56l18.94-7.3c.88-.32 1.65.2 1.36 1.86z" />
              </svg>
            </a>
            <a href="#" aria-label="WhatsApp" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14 0-.31-.02-.48-.02-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.25 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
              </svg>
            </a>
          </div>
          <p className="footer-copy">© ۲۰۲۶ PS PRO — تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
