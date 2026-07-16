import { Link } from 'react-router-dom'
import { nav, servicePath, site, services } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = Object.entries(site.social).filter(([, url]) => Boolean(url))

  return (
    <footer className="border-t border-white/10 bg-charcoal-950">
      <div className="container-content py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:gap-12 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3" aria-label={`${site.name} — home`}>
              <img
                src={site.logo}
                alt=""
                width="48"
                height="48"
                className="h-10 w-10 sm:h-12 sm:w-12"
                aria-hidden="true"
              />
              <span className="font-display text-base font-bold leading-tight text-white sm:text-lg">
                Gusjov <span className="text-ember-400">Flooring</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal-300 text-pretty sm:mt-5">
              {site.tagline}. Hardwood installation, refinishing and laminate across the Chicago
              area.
            </p>
            {socials.length > 0 && (
              <div className="mt-4 flex gap-2 sm:mt-6 sm:gap-3">
                {socials.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium capitalize text-charcoal-200 transition hover:border-ember-400 hover:text-ember-300 sm:px-4 sm:py-2"
                  >
                    {key}
                  </a>
                ))}
              </div>
            )}
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              Pages
            </h2>
            <ul className="mt-3 space-y-2 sm:mt-5 sm:space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-charcoal-300 transition hover:text-ember-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              Services
            </h2>
            <ul className="mt-3 space-y-2 sm:mt-5 sm:space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={servicePath(s.slug)}
                    className="text-sm text-charcoal-300 transition hover:text-ember-400"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              Get in touch
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm sm:mt-5 sm:space-y-4">
              <li>
                <a
                  href={site.phoneHref}
                  className="font-display text-xl font-bold text-white transition hover:text-ember-400 sm:text-2xl"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="text-charcoal-300 transition hover:text-ember-400">
                  {site.email}
                </a>
              </li>
              <li className="text-charcoal-300">Serving Chicago &amp; surrounding suburbs</li>
              {site.hours && <li className="text-charcoal-300">{site.hours}</li>}
            </ul>
            <Link to="/quote" className="btn-primary mt-4 w-full sm:mt-6 sm:w-auto">
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-charcoal-400 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-8">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>
            Designed by{' '}
            <a
              href="https://webprochicago.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-300 transition hover:text-ember-400"
            >
              Web Pro Chicago
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
