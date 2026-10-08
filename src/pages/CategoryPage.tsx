import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { products, categoryLabels, getProductsByCategory, type Category, type Product } from '../data/products';

const priceRanges = [
  { label: 'همه', min: 0, max: Infinity },
  { label: 'زیر ۵ میلیون', min: 0, max: 5_000_000 },
  { label: '۵ تا ۱۰ میلیون', min: 5_000_000, max: 10_000_000 },
  { label: '۱۰ تا ۳۰ میلیون', min: 10_000_000, max: 30_000_000 },
  { label: 'بالای ۳۰ میلیون', min: 30_000_000, max: Infinity },
];

type SortKey = 'newest' | 'cheapest' | 'expensive' | 'popular';

export function CategoryPage() {
  const { category } = useParams<{ category: Category }>();
  const [priceFilter, setPriceFilter] = useState(0);
  const [sort, setSort] = useState<SortKey>('newest');

  const baseProducts = category ? getProductsByCategory(category) : products;
  const label = category ? categoryLabels[category] : 'فروشگاه';

  const filtered = useMemo(() => {
    const range = priceRanges[priceFilter];
    let list = baseProducts.filter(
      (p) => p.price >= range.min && p.price <= range.max
    );

    switch (sort) {
      case 'cheapest': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'expensive': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'popular': list = [...list].sort((a, b) => (b.accent === 'gold' ? 1 : 0) - (a.accent === 'gold' ? 1 : 0)); break;
    }
    return list;
  }, [baseProducts, priceFilter, sort]);

  return (
    <div className="container category-page">
      <h1>{label}</h1>

      {/* Price filters */}
      <div className="price-filters">
        {priceRanges.map((r, i) => (
          <button
            key={i}
            className={`price-chip ${priceFilter === i ? 'active' : ''}`}
            onClick={() => setPriceFilter(i)}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="filters-bar">
        <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
          <option value="newest">جدیدترین</option>
          <option value="cheapest">ارزان‌ترین</option>
          <option value="expensive">گران‌ترین</option>
          <option value="popular">پرفروش‌ترین</option>
        </select>
      </div>

      <div className="product-grid">
        {filtered.map((p: Product) => <ProductCard key={p.id} product={p} />)}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
          محصولی با این فیلتر یافت نشد
        </p>
      )}
    </div>
  );
}
