import { useEffect, useId, useRef, useState } from 'react'
import { beforeAfterPairs } from '../data/gallery'
import { Reveal, useInView } from './Bits'

/**
 * Drag / keyboard before–after reveal for a single pair.
 * After image sits underneath; before is clipped from the left.
 * Pass `compact` for embedding in a service card (no caption, wider crop).
 */
export function BeforeAfterSlider({
  pair,
  priority = false,
  compact = false,
  className = '',
}) {
  const id = useId()
  const [pos, setPos] = useState(52)
  const [smooth, setSmooth] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.35 })
  const animated = useRef(false)

  // One-shot intro: wipe from after-only toward the middle when first seen.
  useEffect(() => {
    if (!inView || animated.current) return
    animated.current = true
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setPos(50)
      return
    }
    setPos(14)
    setSmooth(true)
    const t = window.setTimeout(() => {
      setPos(50)
      window.setTimeout(() => setSmooth(false), 750)
    }, 60)
    return () => window.clearTimeout(t)
  }, [inView])

  const move = (value) => {
    setSmooth(false)
    setPos(Math.min(92, Math.max(8, value)))
  }

  const frameClass = compact
    ? `relative aspect-[2.2/1] w-full overflow-hidden bg-charcoal-100 select-none sm:aspect-[16/10] ${className}`
    : `relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-charcoal-100 shadow-card select-none sm:aspect-[3/4] ${className}`

  return (
    <figure ref={ref} className={compact ? 'm-0' : undefined}>
      <div className={frameClass}>
        {/* After — thumbs in the slider for fast load; full images stay in gallery lightbox */}
        <picture>
          <source srcSet={pair.after.thumb} type="image/webp" />
          <img
            src={pair.after.thumbFallback}
            alt={pair.after.alt}
            width={pair.after.w}
            height={pair.after.h}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        {/* Before (clipped from the left) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - pos}% 0 0)`,
            transition: smooth ? 'clip-path 700ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
          }}
          aria-hidden="true"
        >
          <picture>
            <source srcSet={pair.before.thumb} type="image/webp" />
            <img
              src={pair.before.thumbFallback}
              alt=""
              width={pair.before.w}
              height={pair.before.h}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover"
            />
          </picture>
        </div>

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.45)]"
          style={{
            left: `${pos}%`,
            transition: smooth ? 'left 700ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
          }}
        >
          <span
            className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-ember-400 text-charcoal-950 shadow-lift ${
              compact ? 'h-9 w-9' : 'h-11 w-11'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={compact ? 'h-4 w-4' : 'h-5 w-5'}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12H4m0 0 3-3M4 12l3 3m9-3h4m0 0-3-3m3 3-3 3"
              />
            </svg>
          </span>
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-charcoal-950/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ember-400/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-charcoal-950">
          After
        </span>

        <label htmlFor={id} className="sr-only">
          Reveal before and after for {pair.title}
        </label>
        <input
          id={id}
          type="range"
          min="8"
          max="92"
          value={Math.round(pos)}
          onChange={(e) => move(Number(e.target.value))}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          aria-valuetext={`${Math.round(pos)} percent before`}
        />
      </div>

      {!compact && (
        <figcaption className="mt-5">
          <h3 className="font-display text-lg font-bold text-charcoal-900">{pair.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-charcoal-600 text-pretty">{pair.blurb}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-widest text-ember-600">
            Drag to compare · {pair.after.categoryTitle}
          </p>
        </figcaption>
      )}
    </figure>
  )
}

export default function BeforeAfter({ pairs = beforeAfterPairs }) {
  if (!pairs.length) return null

  return (
    <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {pairs.map((pair, i) => (
        <Reveal key={pair.id} as="li" delay={Math.min(i, 4) * 90}>
          <BeforeAfterSlider pair={pair} priority={i < 2} />
        </Reveal>
      ))}
    </ul>
  )
}
