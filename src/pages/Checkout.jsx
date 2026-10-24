import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { fa, toman, normalizeDigits } from '../utils/format'

const ORDER_TYPES = { takeaway: 'بیرون‌بر', dinein: 'حضوری' }
const PAY_METHODS = { desk: 'پرداخت در صندوق کافه', online: 'پرداخت آنلاین (نمایشی)' }

export default function Checkout() {
  const { entries, total, count, add, dec, clear } = useCart()
  const navigate = useNavigate()
  const [phase, setPhase] = useState('form') // form | processing | done
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [orderType, setOrderType] = useState('takeaway')
  const [payMethod, setPayMethod] = useState('desk')
  const [error, setError] = useState('')
  const [order, setOrder] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    if (count === 0) return
    const errs = []
    if (name.trim().length < 2) errs.push('لطفاً نام خود را کامل وارد کنید.')
    if (!/^0?9\d{9}$/.test(normalizeDigits(phone).replace(/[\s-]/g, '')))
      errs.push('شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹).')
    if (errs.length) { setError(errs[0]); return }
    setError('')
    setPhase('processing')
    setTimeout(() => {
      setOrder({
        code: `HZ-${fa(Math.floor(1000 + Math.random() * 9000))}`,
        lines: entries.map(({ item, qty }) => ({ name: item.name, qty })),
        total, orderType, payMethod, name: name.trim(),
      })
      clear()
      setPhase('done')
    }, 1500)
  }

  if (phase === 'processing') {
    return (
      <main className="checkout">
        <div className="container processing">
          <div className="spinner" role="status" aria-label="در حال ثبت سفارش" />
          <h1 className="h2">در حال ثبت سفارش…</h1>
          <p className="lead">لطفاً لحظه‌ای صبر کنید.</p>
        </div>
      </main>
    )
  }

  if (phase === 'done' && order) {
    return (
      <main className="checkout">
        <div className="container done">
          <div className="done-ico">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="h2">سفارش شما ثبت شد</h1>
          <p className="lead">{order.name} عزیز، سپاس از سفارش شما.</p>
          <span className="done-code">شماره سفارش: {order.code}</span>
          <div className="receipt" style={{ textAlign: 'start' }}>
            {order.lines.map((l) => (
              <div className="receipt-row" key={l.name}>
                <span className="rp-name">{l.name}<span className="rp-qty">× {fa(l.qty)}</span></span>
              </div>
            ))}
            <div className="receipt-total"><span>مبلغ سفارش</span><span>{toman(order.total)}</span></div>
          </div>
          <p className="done-msg">
            {order.payMethod === 'desk'
              ? 'برای پرداخت، به صندوق کافه مراجعه کنید؛ سفارش شما هم‌زمان آماده می‌شود.'
              : 'پرداخت آنلاین نمایشی انجام شد — پیش از انتشار نهایی، درگاه واقعی به همین صفحه متصل می‌شود.'}
            <br />
            {orderTypeLabel(order.orderType)}
          </p>
          <button className="btn btn-dark" onClick={() => navigate('/')}>بازگشت به ویترین</button>
        </div>
      </main>
    )
  }

  if (count === 0) {
    return (
      <main className="checkout">
        <div className="container empty">
          <h1 className="h2">سبد شما خالی است</h1>
          <p>از ویترین کافه انتخاب کنید و دوباره به صندوق بیایید.</p>
          <Link to="/" className="btn btn-gold">رفتن به ویترین</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="checkout">
      <div className="container">
        <div className="checkout-head">
          <p className="label">صندوق فروش</p>
          <h1 className="h2">پرداخت سفارش</h1>
          <p className="lead">سفارش را نهایی کنید؛ مبلغ را در صندوق کافه یا آنلاین پرداخت کنید.</p>
        </div>
        <div className="checkout-grid">
          <aside className="receipt" aria-label="خلاصه سفارش">
            <h2 className="receipt-title">سفارش شما</h2>
            <div className="receipt-rows">
              {entries.map(({ item, qty }) => (
                <div className="receipt-row" key={item.id}>
                  <span className="rp-name">{item.name}<span className="rp-qty">× {fa(qty)}</span></span>
                  <span className="rp-side">
                    <div className="stepper" aria-label={`تعداد ${item.name}`}>
                      <button onClick={() => dec(item.id)} aria-label="کاهش تعداد">−</button>
                      <span>{fa(qty)}</span>
                      <button onClick={() => add(item.id)} aria-label="افزایش تعداد">+</button>
                    </div>
                    <span className="rp-price">{toman(item.price * qty)}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="receipt-total"><span>مبلغ قابل پرداخت</span><span>{toman(total)}</span></div>
          </aside>

          <section className="pay" aria-label="اطلاعات و پرداخت">
            <h2 className="receipt-title">اطلاعات و پرداخت</h2>
            <form onSubmit={submit} noValidate>
              {error && <p className="form-error" role="alert">{error}</p>}
              <div className="field">
                <label htmlFor="ck-name">نام</label>
                <input id="ck-name" name="name" autoComplete="name" value={name}
                  onChange={(e) => setName(e.target.value)} placeholder="مثلاً سارا محمدی" />
              </div>
              <div className="field">
                <label htmlFor="ck-phone">شماره موبایل</label>
                <input id="ck-phone" name="phone" inputMode="tel" autoComplete="tel" value={phone}
                  onChange={(e) => setPhone(e.target.value)} placeholder="۰۹۱۲۳۴۵۶۷۸۹" />
              </div>
              <div className="field">
                <label>نوع سفارش</label>
                <div className="seg" role="group" aria-label="نوع سفارش">
                  <button type="button" className={orderType === 'takeaway' ? 'on' : ''}
                    onClick={() => setOrderType('takeaway')} aria-pressed={orderType === 'takeaway'}>بیرون‌بر</button>
                  <button type="button" className={orderType === 'dinein' ? 'on' : ''}
                    onClick={() => setOrderType('dinein')} aria-pressed={orderType === 'dinein'}>حضوری</button>
                </div>
              </div>
              <div className="field">
                <label>روش پرداخت</label>
                <div className="pay-methods">
                  <label className={`pay-opt ${payMethod === 'desk' ? 'on' : ''}`}>
                    <input type="radio" name="pay" checked={payMethod === 'desk'}
                      onChange={() => setPayMethod('desk')} />
                    <span>
                      <b>پرداخت در صندوق کافه</b>
                      <small>مبلغ را هنگام تحویل سفارش، نقدی یا با کارت می‌پردازید.</small>
                    </span>
                  </label>
                  <label className={`pay-opt ${payMethod === 'online' ? 'on' : ''}`}>
                    <input type="radio" name="pay" checked={payMethod === 'online'}
                      onChange={() => setPayMethod('online')} />
                    <span>
                      <b>پرداخت آنلاین <span className="demo-badge">نمایشی</span></b>
                      <small>درگاه نمایشی برای پیش‌نمایش تجربه پرداخت؛ پیش از انتشار به درگاه واقعی متصل می‌شود.</small>
                    </span>
                  </label>
                </div>
              </div>
              <div className="field">
                <label htmlFor="ck-note">یادداشت سفارش (اختیاری)</label>
                <textarea id="ck-note" name="note" rows="2" value={note}
                  onChange={(e) => setNote(e.target.value)} placeholder="مثلاً: کم‌شکر، بدون یخ…" />
              </div>
              <button type="submit" className="btn btn-gold pay-submit">
                ثبت سفارش و پرداخت
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M19 12H5m6-6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}

function orderTypeLabel(t) {
  return t === 'dinein'
    ? 'سفارش شما برای مصرف حضوری در کافه ثبت شد.'
    : 'سفارش شما به‌صورت بیرون‌بر بسته‌بندی می‌شود.'
}
