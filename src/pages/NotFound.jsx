import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { nav, site } from '../data/site'

export default function NotFound() {
  return (
    <>
      <Seo
        path="/404"
        title="Page not found"
        description="That page does not exist. Head back to the Gusjov Flooring home page or call (773) 986-2691."
        noindex
      />

      <section className="flex min-h-[80vh] items-center bg-charcoal-950 pt-20">
        <div className="container-content text-center">
          <p className="font-display text-7xl font-extrabold text-ember-500 sm:text-8xl">404</p>
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            We could not find that page
          </h1>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-charcoal-300 text-pretty">
            The link may be old or mistyped. Try one of these instead, or just call us — that
            always works.
          </p>

          <nav className="mt-10 flex flex-wrap justify-center gap-2" aria-label="Site pages">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-charcoal-100 transition hover:border-ember-400 hover:text-ember-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn-primary">
              Back to home
            </Link>
            <a href={site.phoneHref} className="btn-ghost">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
