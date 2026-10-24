import { useEffect, useRef } from 'react'
import { site } from '../data/site'

// سرعت حرکت: به‌ازای هر ثانیه ویدیو چند پیکسل اسکرول لازم است.
const PX_PER_SEC = 480
const MIN_SCROLL_VIEWPORTS = 2.2

// هیرو: با اسکرول، ویدیوی «ورود به کافه» نرم و روان جلو/عقب می‌رود.
export default function HeroVideo() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const overlayRef = useRef(null)
  const hintRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let target = 0
    let ready = false
    let seeking = false
    let dur = 10

    const setSize = () => {
      if (reduced) { section.style.height = '100vh'; return }
      const scroll = Math.max(window.innerHeight * MIN_SCROLL_VIEWPORTS, dur * PX_PER_SEC)
      section.style.height = `${Math.round(scroll + window.innerHeight)}px`
    }

    const onMeta = () => {
      if (isFinite(video.duration) && video.duration > 0) dur = video.duration
      ready = true
      setSize()
      video.pause()
      try { video.currentTime = 0.001 } catch { /* ignore */ }
    }

    const onScroll = () => {
      if (reduced) return
      const rect = section.getBoundingClientRect()
      const span = Math.max(section.offsetHeight - window.innerHeight, 1)
      const p = Math.min(Math.max(-rect.top / span, 0), 1)
      target = p * dur
      if (overlayRef.current) {
        overlayRef.current.style.opacity = p < 0.03 ? '' : String(Math.max(0, 1 - (p - 0.03) * 4.5))
      }
      if (hintRef.current) hintRef.current.style.opacity = p > 0.02 ? '0' : ''
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
    }

    // تعقیب نرم زمان هدف: هر فریم ۴۵٪ فاصله باقی‌مانده جلو می‌رویم.
    const tick = () => {
      if (ready && !seeking && !reduced) {
        const diff = target - video.currentTime
        if (Math.abs(diff) > 0.02) {
          seeking = true
          try {
            video.currentTime = Math.min(Math.max(video.currentTime + diff * 0.45, 0), dur - 0.05)
          } catch { seeking = false }
        }
      }
      raf = requestAnimationFrame(tick)
    }
    const onSeeked = () => { seeking = false }

    // iOS: با اولین لمس، بافر ویدیو آزاد می‌شود.
    const unlock = () => {
      video.play().then(() => video.pause()).catch(() => {})
    }

    video.addEventListener('loadedmetadata', onMeta)
    video.addEventListener('seeked', onSeeked)
    window.addEventListener('touchstart', unlock, { once: true, passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    if (reduced) { video.loop = true; video.play().catch(() => {}) }
    onScroll()
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('seeked', onSeeked)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="hero-scroll" aria-label="ورود به کافه با اسکرول">
      <div className="hero-sticky">
        <div className="hero-frame">
          <img className="hero-blur" src="/media/poster.jpg" alt="" aria-hidden="true" />
          <video
            ref={videoRef}
            className="hero-video"
            src="/media/hero.mp4"
            poster="/media/poster.jpg"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
          />
        </div>
        <div className="hero-overlay" ref={overlayRef}>
          <p className="hero-kicker">{site.name}</p>
          <h1 className="hero-title">قدم بزنید به داخل کافه</h1>
          <p className="hero-sub">با اسکرول، آرام و روان وارد {site.name} شوید و از ویترین انتخاب کنید.</p>
        </div>
        <div className="hero-hint" ref={hintRef}>
          <span>برای ورود اسکرول کنید</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="hero-progress" aria-hidden="true"><i ref={barRef} /></div>
      </div>
    </section>
  )
}
