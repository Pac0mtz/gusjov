import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'

/** Fires once when the element first scrolls into view. */
export function useInView(options = { threshold: 0.25, rootMargin: '0px 0px -60px 0px' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        obs.disconnect()
      }
    }, options)
    obs.observe(el)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, inView]
}

export function SectionHeading({ eyebrow, title, body, align = 'center', light = false }) {
  const centered = align === 'center'
  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={`mt-3 text-3xl font-bold leading-[1.15] sm:text-4xl md:text-[2.75rem] ${
          light ? 'text-white' : 'text-charcoal-900'
        }`}
      >
        {title}
      </h2>
      <span
        className={`mt-5 block h-1 w-14 rounded-full bg-ember-500 ${centered ? 'mx-auto' : ''}`}
      />
      {body && (
        <p
          className={`mt-5 text-base leading-relaxed text-pretty ${
            light ? 'text-charcoal-300' : 'text-charcoal-600'
          }`}
        >
          {body}
        </p>
      )}
    </div>
  )
}

/** Counts up to `value` once scrolled into view. Respects reduced-motion. */
export function Counter({ value, suffix = '', label }) {
  const [ref, inView] = useInView()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setN(value)
      return
    }
    let raf
    const duration = 1600
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      // easeOutExpo — fast start, gentle settle
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setN(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-2xl font-extrabold text-ember-400 sm:text-5xl">
        {n}
        {suffix}
      </p>
      <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-charcoal-300 sm:mt-2 sm:text-sm">
        {label}
      </p>
    </div>
  )
}

/** Closing call-to-action band, shared by every page. */
export function CtaBand({
  title = 'Get your free consultation',
  body = 'Tell us about your floors and we will come out, measure and give you an honest number — at no cost.',
}) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal-900">
      <picture>
        <source srcSet="/images/hero-hallway.webp" type="image/webp" />
        <img
          src="/images/hero-hallway.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal-950 via-charcoal-950/90 to-charcoal-950/60" />

      <div className="container-content py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Contact us</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mt-5 text-base leading-relaxed text-charcoal-300 text-pretty">{body}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/quote" className="btn-primary">
              Get a Free Quote
            </Link>
            <a href={site.phoneHref} className="btn-ghost">
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Page header used on every interior route. */
export function PageHero({ eyebrow, title, body }) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal-950 pb-16 pt-36 sm:pb-20 sm:pt-44">
      <picture>
        <source srcSet="/images/hero-solid-oak.webp" type="image/webp" />
        <img
          src="/images/hero-solid-oak.jpg"
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal-950/95 via-charcoal-950/80 to-charcoal-950" />

      <div className="container-content">
        <p className="eyebrow animate-fade-up">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.1] text-white animate-fade-up sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {body && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-300 animate-fade-up text-pretty">
            {body}
          </p>
        )}
      </div>
    </section>
  )
}

export function ServiceIcon({ name, className = 'h-6 w-6' }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }
  const paths = {
    plank: <path d="M3 7h18M3 12h18M3 17h18M8 7v5M16 12v5" />,
    hammer: <path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9M17.6 6.4l-4.2 4.2M14 3l7 7-2.5 2.5-7-7z" />,
    layers: <path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17l9 5 9-5" />,
    sparkle: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />,
    grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
    palette: (
      <path d="M12 3a9 9 0 1 0 0 18c.8 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1-.3-.3-.4-.6-.4-1 0-.9.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8Z M7.5 10.5h.01M12 7.5h.01M16.5 10.5h.01" />
    ),
  }
  return <svg {...common}>{paths[name] || paths.plank}</svg>
}
