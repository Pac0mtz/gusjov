import { Link, Navigate, useParams } from 'react-router-dom'
import Seo, { breadcrumb } from '../components/Seo'
import { CtaBand, ServiceIcon } from '../components/Bits'
import {
  getService,
  serviceImages,
  serviceMetaDescription,
  servicePath,
  services,
  site,
} from '../data/site'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)

  if (!service) return <Navigate to="/services" replace />

  const img = serviceImages[service.slug]
  const path = servicePath(service.slug)
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 4)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: service.title, path },
      ]),
      {
        '@type': 'Service',
        '@id': `${site.url}${path}#service`,
        name: service.title,
        description: service.detail,
        serviceType: service.title,
        url: `${site.url}${path}`,
        image: `${site.url}${img.src}.jpg`,
        provider: { '@id': `${site.url}/#business` },
        areaServed: [
          { '@type': 'City', name: 'Chicago' },
          { '@type': 'AdministrativeArea', name: 'Cook County' },
        ],
      },
    ],
  }

  return (
    <>
      <Seo
        path={path}
        title={service.title}
        description={serviceMetaDescription(service)}
        image={`${img.src}.jpg`}
        schema={schema}
      />

      {/* One composition hero: brand, headline, support, CTAs, full-bleed photo */}
      <section className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden bg-charcoal-950 sm:min-h-[70vh] sm:justify-center">
        <picture>
          <source srcSet={`${img.src}.webp`} type="image/webp" />
          <img
            src={`${img.src}.jpg`}
            alt=""
            aria-hidden="true"
            fetchpriority="high"
            decoding="async"
            width="1200"
            height="1600"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-charcoal-950/35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal-950/80 via-charcoal-950/40 to-transparent" />

        <div className="container-content w-full pb-10 pt-28 sm:pb-16 sm:pt-36">
          <p className="eyebrow animate-fade-up">{site.shortName}</p>
          <h1
            className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.05] text-white animate-soft-rise sm:text-5xl md:text-6xl"
            style={{ animationDelay: '80ms' }}
          >
            {service.title}
          </h1>
          <p
            className="mt-4 max-w-xl text-base leading-relaxed text-charcoal-200 animate-fade-up text-pretty sm:mt-5 sm:text-lg"
            style={{ animationDelay: '160ms' }}
          >
            {service.blurb}
          </p>
          <div
            className="mt-7 flex flex-col gap-2.5 animate-fade-up sm:mt-9 sm:flex-row sm:gap-3"
            style={{ animationDelay: '240ms' }}
          >
            <Link to="/quote" className="btn-primary w-full sm:w-auto">
              Get Free Quote
            </Link>
            <a href={site.phoneHref} className="btn-ghost w-full sm:w-auto">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-16 lg:py-20">
        <div className="container-content max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-ember-600">What we do</p>
          <p className="mt-3 text-base leading-relaxed text-charcoal-700 text-pretty sm:text-lg">
            {service.detail}
          </p>

          {service.points?.length > 0 && (
            <ul className="mt-8 space-y-3 border-t border-charcoal-100 pt-8">
              {service.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-charcoal-700 sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:gap-3">
            <Link to="/quote" className="btn-dark w-full sm:w-auto">
              Request a quote
            </Link>
            <Link
              to="/projects"
              className="btn-ghost w-full !border-charcoal-300 !text-charcoal-700 hover:!border-ember-500 hover:!text-ember-600 sm:w-auto"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-charcoal-100 bg-charcoal-50 py-10 sm:py-14">
        <div className="container-content">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ember-600">More services</p>
              <h2 className="mt-2 text-xl font-bold text-charcoal-900 sm:text-2xl">Also available</h2>
            </div>
            <Link to="/services" className="text-sm font-semibold text-ember-600 hover:text-ember-700">
              All services
            </Link>
          </div>

          <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2">
            {related.map((s) => {
              const relatedImg = serviceImages[s.slug]
              return (
                <li key={s.slug}>
                  <Link
                    to={servicePath(s.slug)}
                    className="group flex items-center gap-3 rounded-xl bg-white p-3 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift sm:gap-4 sm:p-4"
                  >
                    <picture className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-charcoal-100 sm:h-20 sm:w-20">
                      <source srcSet={`${relatedImg.src}-thumb.webp`} type="image/webp" />
                      <img
                        src={`${relatedImg.src}-thumb.jpg`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width="160"
                        height="160"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </picture>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-ember-50 text-ember-600">
                          <ServiceIcon name={s.icon} className="h-3.5 w-3.5" />
                        </span>
                        <h3 className="truncate text-sm font-bold text-charcoal-900 sm:text-base">
                          {s.title}
                        </h3>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-snug text-charcoal-600 sm:text-sm">
                        {s.blurb}
                      </p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`Ready for ${service.title.toLowerCase()}?`}
        body="Tell us about the room and we will come out with a free, honest estimate."
      />
    </>
  )
}
