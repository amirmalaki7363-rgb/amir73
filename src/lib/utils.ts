export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: number): string {
  // Convert to Persian Toman (1 USD ≈ 60,000 Toman) for display
  const toman = Math.round(price * 60000);
  if (toman >= 1_000_000_000) {
    const billions = toman / 1_000_000_000;
    return `${billions.toLocaleString('fa-IR', { maximumFractionDigits: 1 })} میلیارد تومان`;
  }
  if (toman >= 1_000_000) {
    const millions = toman / 1_000_000;
    return `${millions.toLocaleString('fa-IR', { maximumFractionDigits: 0 })} میلیون تومان`;
  }
  return `${toman.toLocaleString('fa-IR')} تومان`;
}
