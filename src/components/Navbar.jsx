import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav, site } from '../data/site'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Solid light bar once you leave the dark hero — fixes the black strip on white pages.
  const onLight = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        onLight
          ? 'border-b border-charcoal-200/80 bg-white/95 shadow-card backdrop-blur-md'
          : 'bg-gradient-to-b from-charcoal-950/85 via-charcoal-950/40 to-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ember-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <div className="container-content flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3" aria-label={`${site.name} — home`}>
          <img
            src={site.logo}
            alt=""
            width="44"
            height="44"
            className="h-9 w-9 shrink-0 sm:h-11 sm:w-11"
            aria-hidden="true"
          />
          <span
            className={`hidden font-display text-lg font-bold leading-tight sm:block ${
              onLight ? 'text-charcoal-900' : 'text-white'
            }`}
          >
            Gusjov <span className="text-ember-500">Flooring</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => {
                const active =
                  isActive || (item.to === '/services' && pathname.startsWith('/services/'))
                if (onLight) {
                  return `rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-ember-50 text-ember-700'
                      : 'text-charcoal-700 hover:bg-charcoal-50 hover:text-charcoal-900'
                  }`
                }
                return `rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? 'text-ember-400' : 'text-charcoal-100 hover:bg-white/5 hover:text-white'
                }`
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.phoneHref}
            className={`hidden items-center gap-2 text-sm font-semibold transition md:flex ${
              onLight ? 'text-charcoal-800 hover:text-ember-600' : 'text-white hover:text-ember-400'
            }`}
          >
            <PhoneIcon className={`h-4 w-4 ${onLight ? 'text-ember-600' : 'text-ember-400'}`} />
            {site.phone}
          </a>
          <Link to="/contact" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Get a Free Estimate
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-lg transition lg:hidden ${
              onLight
                ? 'text-charcoal-900 hover:bg-charcoal-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-charcoal-100 bg-white lg:hidden"
      >
        <nav className="container-content flex flex-col py-3" aria-label="Mobile">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => {
                const active =
                  isActive || (item.to === '/services' && pathname.startsWith('/services/'))
                return `border-b border-charcoal-100 py-3.5 text-base font-medium transition ${
                  active ? 'text-ember-600' : 'text-charcoal-800'
                }`
              }}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mt-5 flex flex-col gap-3 pb-2">
            <a href={site.phoneHref} className="btn-ghost w-full !border-charcoal-300 !text-charcoal-800">
              <PhoneIcon className="h-4 w-4" />
              {site.phone}
            </a>
            <Link to="/contact" className="btn-primary w-full">
              Get a Free Estimate
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      />
    </svg>
  )
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path strokeLinecap="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
    </svg>
  )
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}
