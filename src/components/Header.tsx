import { useState, useRef, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, categoryLabels, type Category } from '../data/products';
import '../styles/Header.css';

const navItems: { label: string; path: string }[] = [
  { label: 'خانه', path: '/' },
  { label: 'کنسول‌ها', path: '/category/consoles' },
  { label: 'دسته‌ها', path: '/category/controllers' },
  { label: 'بازی‌ها', path: '/category/discs' },
  { label: 'فیگورها', path: '/category/figures' },
  { label: 'لوازم جانبی', path: '/category/accessories' },
  { label: 'درباره ما', path: '/about' },
];

export function Header() {
  const { totalCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.trim().toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          categoryLabels[p.category].includes(searchQuery.trim())
      )
      .slice(0, 6);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/product/${searchResults[0].id}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Browser dots */}
          <div className="browser-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>

          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-mark">PS</span>
            <span className="logo-text">PRO</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <button className="action-btn" onClick={() => setSearchOpen(true)} aria-label="جستجو">
              <SearchIcon />
            </button>
            <Link to="/account" className="action-btn" aria-label="حساب کاربری">
              <UserIcon />
            </Link>
            <button className="action-btn cart-btn" onClick={() => setCartOpen(true)} aria-label="سبد خرید">
              <CartIcon />
              {totalCount > 0 && <span className="cart-badge">{totalCount.toLocaleString('fa-IR')}</span>}
            </button>
            <button className="action-btn mobile-menu-btn" onClick={() => setMobileOpen(true)} aria-label="منو">
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-panel" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="search-form">
              <SearchIcon className="search-icon" />
              <input
                ref={searchRef}
                type="text"
                placeholder="جستجوی محصولات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" className="search-close" onClick={() => setSearchOpen(false)}>
                بستن
              </button>
            </form>
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="search-result-item"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <span className="result-name">{p.name}</span>
                    <span className="result-cat">{categoryLabels[p.category]}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="logo">
                <span className="logo-mark">PS</span>
                <span className="logo-text">PRO</span>
              </div>
              <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
            </div>
            <nav className="mobile-nav">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="mobile-nav-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQty, totalPrice, totalCount, clearCart } = useCart();

  return (
    <>
      <div className={`cart-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>سبد خرید ({totalCount.toLocaleString('fa-IR')})</h3>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>
        {items.length === 0 ? (
          <div className="cart-empty">
            <CartIcon />
            <p>سبد خرید شما خالی است</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.product.name}</h4>
                    <p className="cart-item-price">{item.product.priceText}</p>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQty(item.product.id, item.qty - 1)}>-</button>
                      <span>{item.qty.toLocaleString('fa-IR')}</span>
                      <button onClick={() => updateQty(item.product.id, item.qty + 1)}>+</button>
                      <button className="cart-remove" onClick={() => removeItem(item.product.id)}>حذف</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span>مجموع:</span>
                <span className="total-price">{totalPrice.toLocaleString('fa-IR')} تومان</span>
              </div>
              <button className="btn-gold cart-checkout">تسویه حساب</button>
              <button className="cart-clear" onClick={clearCart}>پاک کردن سبد</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* Icons */
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
