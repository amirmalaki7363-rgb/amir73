import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from './Icons';

type Variant = 'primary' | 'outline' | 'light' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  showArrow?: boolean;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-navy text-white hover:bg-navy-light border border-navy hover:border-navy-light',
  outline:
    'border border-champagne/60 text-champagne hover:bg-champagne hover:text-navy',
  light:
    'bg-white text-navy border border-white hover:bg-ivory hover:border-ivory',
  ghost:
    'text-navy hover:text-champagne border border-transparent',
};

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4 text-base',
};

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  showArrow = false,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide uppercase transition-all duration-500 ease-luxury rounded-none group min-h-[48px]',
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRightIcon className="w-4 h-4 ltr-arrow transition-transform duration-500 ease-luxury group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={base} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
