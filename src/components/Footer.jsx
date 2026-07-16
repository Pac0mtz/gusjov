import { Link } from 'react-router-dom'
import { nav, site, services } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = Object.entries(site.social).filter(([, url]) => Boolean(url))

  return (
    <footer className="border-t border-white/10 bg-charcoal-950">
      <div className="container-content py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
              <img src={site.logo} alt="" width="48" height="48" className="h-12 w-12" aria-hidden="true" />
              <span className="font-display text-lg font-bold leading-tight text-white">
                Gusjov <span className="text-ember-400">Flooring</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-charcoal-300 text-pretty">
              {site.tagline}. Hardwood installation, refinishing and laminate across the Chicago
              area.
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium capitalize text-charcoal-200 transition hover:border-ember-400 hover:text-ember-300"
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
            <ul className="mt-5 space-y-3">
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
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services#${s.slug}`}
                    className="text-sm text-charcoal-300 transition hover:text-ember-400"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="font-display text-2xl font-bold text-white transition hover:text-ember-400"
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
            <Link to="/quote" className="btn-primary mt-6 w-full sm:w-auto">
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-charcoal-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          {/*
            TODO(gusjov): if you are licensed and/or insured, say so here and add
            the licence number — it is a strong local trust signal. Left blank on
            purpose: it was not stated anywhere in the WordPress site, and it is
            not a claim to make on your behalf without confirmation.
          */}
          <p>Hardwood flooring installation, refinishing &amp; laminate — Chicago area.</p>
        </div>
      </div>
    </footer>
  )
}
