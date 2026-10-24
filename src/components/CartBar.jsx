import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { fa, toman } from '../utils/format'

export default function CartBar() {
  const { count, total } = useCart()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  if (count === 0 || pathname === '/checkout') return null
  return (
    <div className="cartbar" role="region" aria-label="سبد خرید">
      <div className="cartbar-inner">
        <div className="cartbar-info">
          <span className="cartbar-count">{fa(count)} قلم</span>
          <span className="cartbar-total">{toman(total)}</span>
        </div>
        <button className="btn btn-gold" onClick={() => navigate('/checkout')}>
          ادامه به صندوق
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M19 12H5m6-6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
