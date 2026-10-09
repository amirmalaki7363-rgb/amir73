import Link from 'next/link';
import { HouseIcon, PhoneIcon, MailIcon, MapIcon } from './Icons';
import NewsletterForm from './NewsletterForm';

const navLinks = [
  { label: 'خانه', href: '/' },
  { label: 'املاک', href: '/properties' },
  { label: 'درباره ما', href: '/#about' },
  { label: 'خدمات', href: '/#services' },
  { label: 'تیم', href: '/#team' },
  { label: 'تماس', href: '/#contact' },
];

const socialLinks = [
  { label: 'اینستاگرام', href: '#' },
  { label: 'لینکدین', href: '#' },
  { label: 'فیسبوک', href: '#' },
  { label: 'توییتر', href: '#' },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <HouseIcon className="w-7 h-7 text-champagne" />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl tracking-wide">هورایزن</span>
                <span className="text-[10px] tracking-[0.15em] text-white/50">املاک</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              پیوند مردم با خانه‌های استثنایی و سرمایه‌گذاری‌های هوشمند. صداقت، شفافیت
              و رضایت مشتری در قلب همه کارهای ما.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs tracking-[0.15em] text-champagne mb-5 font-sans font-medium">
              ناوبری
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.15em] text-champagne mb-5 font-sans font-medium">
              تماس با ما
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <PhoneIcon className="w-4 h-4 text-champagne mt-0.5 shrink-0" />
                <a href="tel:+15552467890" className="text-sm text-white/60 hover:text-white transition-colors">
                  ۰۲۱-۸۸۷۷۶۶۵۵
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MailIcon className="w-4 h-4 text-champagne mt-0.5 shrink-0" />
                <a href="mailto:info@horizonproperties.com" className="text-sm text-white/60 hover:text-white transition-colors">
                  info@horizonproperties.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapIcon className="w-4 h-4 text-champagne mt-0.5 shrink-0" />
                <span className="text-sm text-white/60 leading-relaxed">
                  خیابان ولیعصر، پلاک ۱۲۰۰<br />
                  طبقه ۴، تهران، ایران
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs tracking-[0.15em] text-champagne mb-5 font-sans font-medium">
              خبرنامه
            </h3>
            <p className="text-sm text-white/60 mb-4">
              برای دریافت لیست‌های اختصاصی و تحلیل بازار مشترک شوید.
            </p>
            <NewsletterForm />
            <div className="flex gap-4 mt-6 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-xs text-white/50 hover:text-champagne transition-colors tracking-wide"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear().toLocaleString('fa-IR')} هورایزن املاک. تمام حقوق محفوظ است.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              سیاست حریم خصوصی
            </Link>
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              شرایط و قوانین
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
