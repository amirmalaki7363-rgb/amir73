import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';
import type { Product } from '../data/products';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const isCyan = product.accent === 'cyan';

  return (
    <div className={`product-card ${isCyan ? 'accent-cyan' : ''}`}>
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-img-container">
          <ProductImage id={product.image} alt={product.name} category={product.category} />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-subtitle">{product.subtitle}</p>
          <p className="product-price">{product.priceText}</p>
        </div>
      </Link>
      <button
        className={`product-btn ${isCyan ? 'btn-cyan' : 'btn-gold'}`}
        onClick={() => addItem(product)}
      >
        افزودن به سبد
      </button>
    </div>
  );
}
