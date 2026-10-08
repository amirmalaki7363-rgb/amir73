import Link from 'next/link';
import { HouseIcon, PhoneIcon, MailIcon, MapIcon } from './Icons';
import NewsletterForm from './NewsletterForm';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'About Us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Team', href: '/#team' },
  { label: 'Contact', href: '/#contact' },
];

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'X', href: '#' },
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
                <span className="font-serif text-xl tracking-wide">HORIZON</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/50">Properties</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Connecting people with extraordinary homes and smart investments. Integrity, transparency,
              and client satisfaction at the heart of everything we do.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-champagne mb-5 font-sans font-medium">
              Navigation
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
            <h3 className="text-xs uppercase tracking-[0.2em] text-champagne mb-5 font-sans font-medium">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <PhoneIcon className="w-4 h-4 text-champagne mt-0.5 shrink-0" />
                <a href="tel:+15552467890" className="text-sm text-white/60 hover:text-white transition-colors">
                  (555) 246-7890
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
                  1200 Architectural Way<br />
                  Suite 450, Austin, TX 78701
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-champagne mb-5 font-sans font-medium">
              Newsletter
            </h3>
            <p className="text-sm text-white/60 mb-4">
              Subscribe for exclusive listings and market insights.
            </p>
            <NewsletterForm />
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-xs text-white/50 hover:text-champagne transition-colors uppercase tracking-wide"
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
            © {new Date().getFullYear()} Horizon Properties. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
