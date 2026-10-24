import { useCart } from '../context/CartContext'
import { fa, toman } from '../utils/format'

export default function MenuItemCard({ item }) {
  const { items, add, dec } = useCart()
  const qty = items[item.id] || 0
  return (
    <article className="menu-card" aria-label={item.name}>
      <div className="menu-media">
        <img src={item.img} alt={item.name} loading="lazy" width="800" height="600" />
        {item.tag && <span className="menu-tag">{item.tag}</span>}
      </div>
      <div className="menu-body">
        <h3 className="menu-name">{item.name}</h3>
        <p className="menu-desc">{item.desc}</p>
        <div className="menu-foot">
          <span className="price">{toman(item.price)}</span>
          {qty === 0 ? (
            <button className="add-btn" onClick={() => add(item.id)} aria-label={`افزودن ${item.name} به سبد`}>
              افزودن +
            </button>
          ) : (
            <div className="stepper" aria-label={`تعداد ${item.name}`}>
              <button onClick={() => dec(item.id)} aria-label="کاهش تعداد">−</button>
              <span>{fa(qty)}</span>
              <button onClick={() => add(item.id)} aria-label="افزایش تعداد">+</button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
