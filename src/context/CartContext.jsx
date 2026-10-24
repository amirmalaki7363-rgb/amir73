import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { menuById } from '../data/menu'

const CartCtx = createContext(null)
const KEY = 'horizon-cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object') return parsed
      }
    } catch { /* ignore */ }
    return {}
  })

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* ignore */ }
  }, [items])

  const add = (id) => setItems((s) => ({ ...s, [id]: (s[id] || 0) + 1 }))

  const dec = (id) => setItems((s) => {
    const q = (s[id] || 0) - 1
    const c = { ...s }
    if (q <= 0) delete c[id]
    else c[id] = q
    return c
  })

  const clear = () => setItems({})

  const entries = useMemo(
    () =>
      Object.entries(items)
        .map(([id, qty]) => ({ item: menuById[id], qty }))
        .filter((e) => e.item),
    [items]
  )
  const count = entries.reduce((a, e) => a + e.qty, 0)
  const total = entries.reduce((a, e) => a + e.qty * e.item.price, 0)

  return <CartCtx.Provider value={{ items, entries, count, total, add, dec, clear }}>{children}</CartCtx.Provider>
}

export const useCart = () => useContext(CartCtx)
