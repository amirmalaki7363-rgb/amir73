import Link from 'next/link';
import { ArrowRightIcon } from '@/components/Icons';

export default function NotFound() {
  return (
    <div className="pt-20 lg:pt-[88px] min-h-[70vh] flex items-center justify-center bg-ivory">
      <div className="text-center px-6">
        <span className="text-sm tracking-[0.15em] text-champagne font-medium font-sans">
          خطا ۴۰۴
        </span>
        <h1 className="mt-4 font-serif text-5xl lg:text-6xl text-navy font-bold">
          صفحه یافت نشد
        </h1>
        <p className="mt-4 text-near-black/60 text-lg max-w-md mx-auto">
          صفحه‌ای که به دنبال آن هستید ممکن است جابجا شده یا دیگر وجود نداشته باشد.
        </p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 bg-navy text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-navy-light transition-all duration-500 ease-luxury min-h-[48px]"
        >
          بازگشت به خانه
          <ArrowRightIcon className="w-4 h-4 ltr-arrow transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
