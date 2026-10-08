import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { TrustSection, PromoBanner } from '../components/Sections';
import { getProductsByCategory } from '../data/products';

export function HomePage() {
  const consoles = getProductsByCategory('consoles');
  const controllers = getProductsByCategory('controllers');
  const discs = getProductsByCategory('discs');
  const accounts = getProductsByCategory('accounts');
  const figures = getProductsByCategory('figures');
  const accessories = getProductsByCategory('accessories');

  return (
    <>
      <Hero />

      {/* Consoles */}
      <section className="container category-section">
        <h2 className="section-title">کنسول‌های گیمینگ</h2>
        <div className="product-grid">
          {consoles.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Controllers + Discs split */}
      <section className="container split-section">
        <div className="split-col">
          <h2 className="section-title">دسته‌های حرفه‌ای</h2>
          <div className="product-grid">
            {controllers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
        <div className="split-col">
          <h2 className="section-title">دیسک‌های بازی</h2>
          <div className="product-grid">
            {discs.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Accounts + Figures split */}
      <section className="container split-section">
        <div className="split-col">
          <h2 className="section-title">اکانت‌های قانونی</h2>
          <div className="product-grid">
            {accounts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
        <div className="split-col">
          <h2 className="section-title">فیگورها و کالکشن</h2>
          <div className="product-grid">
            {figures.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section className="container category-section">
        <h2 className="section-title">لوازم جانبی گیمینگ</h2>
        <div className="product-grid">
          {accessories.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Trust */}
      <TrustSection />
    </>
  );
}
