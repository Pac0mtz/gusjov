import { useCallback, useEffect, useState } from 'react'
import { allPhotos, categories } from '../data/gallery'

/** Columns at each breakpoint — keep in sync with the grid classes below. */
function useGalleryCols() {
  const [cols, setCols] = useState(2)

  useEffect(() => {
    const md = window.matchMedia('(min-width: 768px)')
    const lg = window.matchMedia('(min-width: 1024px)')
    const update = () => setCols(lg.matches ? 4 : md.matches ? 3 : 2)
    update()
    md.addEventListener('change', update)
    lg.addEventListener('change', update)
    return () => {
      md.removeEventListener('change', update)
      lg.removeEventListener('change', update)
    }
  }, [])

  return cols
}

/**
 * Category-filtered gallery with a lightbox.
 * Photos live in per-category folders; see src/data/gallery.js.
 * Pass `rows={0}` to show every photo with no expand control.
 */
export default function Gallery({ initial = 'all', rows = 3 }) {
  const [active, setActive] = useState(initial)
  const [index, setIndex] = useState(-1)
  const [expanded, setExpanded] = useState(false)
  const cols = useGalleryCols()

  const shown = active === 'all' ? allPhotos : allPhotos.filter((p) => p.category === active)
  const limit = rows > 0 ? cols * rows : shown.length
  const hasMore = rows > 0 && shown.length > limit
  const visible = expanded || !hasMore ? shown : shown.slice(0, limit)
  const open = index >= 0 && index < shown.length

  const close = useCallback(() => setIndex(-1), [])
  const next = useCallback(() => setIndex((i) => (i + 1) % shown.length), [shown.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + shown.length) % shown.length), [shown.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, next, prev])

  const filters = [{ slug: 'all', title: 'All work' }, ...categories]

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects by category">
        {filters.map((f) => {
          const isActive = active === f.slug
          const count =
            f.slug === 'all' ? allPhotos.length : allPhotos.filter((p) => p.category === f.slug).length
          return (
            <button
              key={f.slug}
              type="button"
              onClick={() => {
                setActive(f.slug)
                setIndex(-1)
                setExpanded(false)
              }}
              aria-pressed={isActive}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-ember-500 text-white shadow-lift'
                  : 'bg-white text-charcoal-700 ring-1 ring-charcoal-200 hover:ring-ember-400 hover:text-ember-600'
              }`}
            >
              {f.title}
              <span className={`ml-2 text-xs ${isActive ? 'text-white/70' : 'text-charcoal-400'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((photo) => {
          const i = shown.indexOf(photo)
          return (
            <li key={`${photo.category}-${photo.slug}`}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden rounded-xl bg-charcoal-100 shadow-card"
                aria-label={`View larger: ${photo.alt}`}
              >
                <picture>
                  <source srcSet={photo.thumb} type="image/webp" />
                  <img
                    src={photo.thumbFallback}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="800"
                    className="aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-105 sm:aspect-[3/4]"
                  />
                </picture>
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left text-xs font-medium text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.categoryTitle}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {hasMore && (
        <div className="mt-8 text-center sm:mt-10">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="btn-dark"
            aria-expanded={expanded}
          >
            {expanded ? 'Show fewer photos' : `See more photos (${shown.length - limit})`}
          </button>
        </div>
      )}

      {shown.length === 0 && (
        <p className="mt-10 text-center text-charcoal-500">No photos in this category yet.</p>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal-950/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={shown[index].alt}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
              <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          {shown.length > 1 && (
            <>
              <NavButton side="left" onClick={prev} label="Previous photo" />
              <NavButton side="right" onClick={next} label="Next photo" />
            </>
          )}

          <figure className="max-h-full" onClick={(e) => e.stopPropagation()}>
            <picture>
              <source srcSet={shown[index].src} type="image/webp" />
              <img
                src={shown[index].fallback}
                alt={shown[index].alt}
                className="mx-auto max-h-[78vh] w-auto rounded-lg object-contain shadow-lift"
              />
            </picture>
            <figcaption className="mx-auto mt-4 max-w-xl text-center text-sm text-charcoal-300">
              {shown[index].alt}
              <span className="mt-1 block text-xs text-charcoal-500">
                {index + 1} of {shown.length} — {shown[index].categoryTitle}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}

function NavButton({ side, onClick, label }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      aria-label={label}
      className={`absolute ${
        side === 'left' ? 'left-2 sm:left-6' : 'right-2 sm:right-6'
      } top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d={side === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  )
}
