import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazir',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'هورایزن | املاک لوکس و سرمایه‌گذاری',
  description:
    'کشف خانه‌های استثنایی و املاک سرمایه‌گذاری در بهترین موقعیت‌ها. هورایزن شما را با املاک فوق‌العاده در سراسر جهان آشنا می‌کند.',
  keywords: ['املاک لوکس', 'ملک‌های premium', 'املاک سرمایه‌گذاری', 'خانه‌های مدرن'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
