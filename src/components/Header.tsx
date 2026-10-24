'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { HouseIcon, PhoneIcon, MenuIcon, CloseIcon } from './Icons';

const navLinks = [
  { label: 'خانه', href: '/' },
  { label: 'املاک', href: '/properties' },
  { label: 'درباره ما', href: '/#about' },
  { label: 'خدمات', href: '/#services' },
  { label: 'تیم', href: '/#team' },
  { label: 'تماس', href: '/#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury',
          isTransparent
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(10,22,34,0.06)]'
        )}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-center justify-between h-20 lg:h-[88px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="هورایزن املاک">
              <HouseIcon
                className={cn(
                  'w-7 h-7 transition-colors duration-500',
                  isTransparent ? 'text-champagne' : 'text-champagne'
                )}
              />
              <div className="flex flex-col leading-none">
                <span
                  className={cn(
                    'font-serif text-xl tracking-wide transition-colors duration-500',
                    isTransparent ? 'text-white' : 'text-navy'
                  )}
                >
                  هورایزن
                </span>
                <span
                  className={cn(
                    'text-[10px] tracking-[0.15em] font-sans transition-colors duration-500',
                    isTransparent ? 'text-white/70' : 'text-navy/50'
                  )}
                >
                  املاک
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-9" aria-label="منوی اصلی">
              {navLinks.map((link) => {
                const active =
                  link.href === '/' ? pathname === '/' : pathname.startsWith(link.href.split('#')[0]) && link.href !== '/';
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'group relative text-sm font-medium tracking-wide transition-colors duration-300 py-1',
                      isTransparent
                        ? active
                          ? 'text-white'
                          : 'text-white/70 hover:text-white'
                        : active
                          ? 'text-navy'
                          : 'text-navy/60 hover:text-navy'
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        'absolute -bottom-0.5 right-0 h-px bg-champagne transition-all duration-500 ease-luxury',
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Phone CTA */}
            <div className="hidden lg:flex items-center">
              <a
                href="tel:+15552467890"
                className={cn(
                  'inline-flex items-center gap-2.5 px-5 py-3 text-sm font-medium tracking-wide transition-all duration-500 ease-luxury border min-h-[48px]',
                  isTransparent
                    ? 'border-white/30 text-white hover:bg-white hover:text-navy'
                    : 'border-navy/15 text-navy hover:bg-navy hover:text-white'
                )}
              >
                <PhoneIcon className="w-4 h-4" />
                ۰۲۱-۸۸۷۷۶۶۵۵
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className={cn(
                'lg:hidden p-2 transition-colors duration-300',
                isTransparent ? 'text-white' : 'text-navy'
              )}
              onClick={() => setMenuOpen(true)}
              aria-label="باز کردن منو"
            >
              <MenuIcon className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[60] lg:hidden transition-all duration-500 ease-luxury',
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div
          className={cn(
            'absolute left-0 top-0 h-full w-[85%] max-w-sm bg-navy shadow-2xl transition-transform duration-500 ease-luxury flex flex-col',
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
            <div className="flex items-center gap-3">
              <HouseIcon className="w-6 h-6 text-champagne" />
              <span className="font-serif text-lg text-white tracking-wide">هورایزن</span>
            </div>
            <button
              className="text-white/80 hover:text-white p-2 transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="بستن منو"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-1" aria-label="منوی موبایل">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'text-lg font-medium py-3.5 border-b border-white/5 transition-all duration-500 ease-luxury',
                  menuOpen ? 'text-white translate-x-0 opacity-100' : 'text-white -translate-x-4 opacity-0'
                )}
                style={{ transitionDelay: menuOpen ? `${i * 60 + 100}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-6 pb-10">
            <a
              href="tel:+15552467890"
              className="flex items-center justify-center gap-2.5 w-full px-5 py-4 border border-champagne/50 text-champagne text-sm font-medium tracking-wide hover:bg-champagne hover:text-navy transition-all duration-500 min-h-[48px]"
            >
              <PhoneIcon className="w-4 h-4" />
              ۰۲۱-۸۸۷۷۶۶۵۵
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
