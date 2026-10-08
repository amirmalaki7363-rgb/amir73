export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(2).replace(/\.?0+$/, '')} Million`;
  }
  return `$${price.toLocaleString()}`;
}
