import { useLocation, useNavigate } from 'react-router-dom'

// اسکرول نرم به بخش‌های صفحه؛ اگر در صفحه دیگری باشیم، اول به خانه برمی‌گردیم.
export function useSectionLink() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (id) => (e) => {
    if (e) e.preventDefault()
    const scroll = () => {
      const el = id === 'top' ? document.documentElement : document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    if (pathname !== '/') {
      navigate('/')
      setTimeout(scroll, 90)
    } else {
      scroll()
    }
  }
}
