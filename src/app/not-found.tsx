import Link from 'next/link';
import { ArrowRightIcon } from '@/components/Icons';

export default function NotFound() {
  return (
    <div className="pt-20 lg:pt-[88px] min-h-[70vh] flex items-center justify-center bg-ivory">
      <div className="text-center px-6">
        <span className="text-xs uppercase tracking-[0.25em] text-champagne font-medium font-sans">
          Error 404
        </span>
        <h1 className="mt-4 font-serif text-5xl lg:text-6xl text-navy font-bold">
          Page Not Found
        </h1>
        <p className="mt-4 text-near-black/60 text-lg max-w-md mx-auto">
          The page you are looking for may have been moved or no longer exists.
        </p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 bg-navy text-white px-8 py-4 text-sm font-medium uppercase tracking-wide hover:bg-navy-light transition-all duration-500 ease-luxury min-h-[48px]"
        >
          Return Home
          <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
