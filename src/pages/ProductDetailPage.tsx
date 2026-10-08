import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, getRelatedProducts } from '../data/products';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProduct(id) : undefined;
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container" style={{ marginTop: 120, textAlign: 'center', padding: 40 }}>
        <h1>محصول یافت نشد</h1>
        <Link to="/" className="btn-gold" style={{ marginTop: 20 }}>بازگشت به خانه</Link>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const isCyan = product.accent === 'cyan';

  return (
    <div className="container product-detail">
      {/* Breadcrumb */}
      <nav style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: 16 }}>
        <Link to="/">خانه</Link> › <Link to={`/category/${product.category}`}>{product.category}</Link> › {product.name}
      </nav>

      <div className="product-detail-grid">
        <div className="product-detail-image">
          <ProductImage id={product.image} alt={product.name} category={product.category} />
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="detail-subtitle">{product.subtitle}</p>
          <p className="detail-price">{product.priceText}</p>
          <div className="detail-stock">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            موجود در انبار
          </div>
          <p className="detail-desc">{product.description}</p>

          <div className="detail-specs">
            <h3>مشخصات محصول</h3>
            {product.specs.map((s, i) => (
              <div key={i} className="spec-row">
                <span className="spec-label">{s.label}</span>
                <span className="spec-value">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="detail-qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span>{qty.toLocaleString('fa-IR')}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <div className="detail-actions">
            <button className={isCyan ? 'btn-cyan' : 'btn-gold'} onClick={() => addItem(product, qty)}>
              افزودن به سبد
            </button>
            <button className="btn-outline" onClick={() => { addItem(product, qty); }}>
              خرید now
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-section">
          <h2 className="section-title">محصولات مرتبط</h2>
          <div className="product-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
