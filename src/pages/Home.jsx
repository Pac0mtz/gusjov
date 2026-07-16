import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { CtaBand, Counter, SectionHeading, ServiceIcon } from '../components/Bits'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import {
  consultationCopy,
  introCopy,
  services,
  site,
  specializationCopy,
  stats,
} from '../data/site'

export default function Home() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Flooring services',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.blurb,
        serviceType: s.title,
        provider: { '@id': `${site.url}/#business` },
        areaServed: { '@type': 'City', name: 'Chicago' },
      },
    })),
  }

  return (
    <>
      <Seo
        path="/"
        description="Hardwood flooring installation, refinishing and laminate across the Chicago area. 12 years, 230+ projects, 87+ clients. Free estimates — call (773) 986-2691."
        schema={serviceSchema}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-charcoal-950">
        <picture>
          <source
            srcSet="/images/gallery/hardwood-installation/engineered-hardwood-hallway.webp"
            type="image/webp"
          />
          <img
            src="/images/gallery/hardwood-installation/engineered-hardwood-hallway.jpg"
            alt=""
            aria-hidden="true"
            fetchpriority="high"
            decoding="async"
            width="1400"
            height="1867"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal-950 via-charcoal-950/85 to-charcoal-950/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />

        <div className="container-content pb-16 pt-32">
          <div className="max-w-2xl">
            <p className="eyebrow animate-fade-up">{site.name}</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white animate-fade-up sm:text-6xl md:text-7xl">
              Great Prices,{' '}
              <span className="text-ember-400">Honest Service</span> &amp; Stunning Results
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-charcoal-200 animate-fade-up text-pretty">
              Our goal then and now is to provide quality &amp; affordable hardwood flooring
              services across the Chicago area.
            </p>
            <div className="mt-10 flex flex-col gap-3 animate-fade-up sm:flex-row">
              <Link to="/quote" className="btn-primary">
                Get Free Quote
              </Link>
              <Link to="/contact" className="btn-ghost">
                Get In Touch
              </Link>
            </div>

            <dl className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-white/10 pt-8">
              <div>
                <dt className="text-xs uppercase tracking-widest text-charcoal-400">Call us</dt>
                <dd>
                  <a
                    href={site.phoneHref}
                    className="font-display text-2xl font-bold text-white transition hover:text-ember-400"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-charcoal-400">Email</dt>
                <dd>
                  <a
                    href={site.emailHref}
                    className="text-lg font-medium text-white transition hover:text-ember-400"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- Welcome ---------- */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-content grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <picture>
              <source srcSet="/images/gallery/staircases/curved-staircase-dark-stain.webp" type="image/webp" />
              <img
                src="/images/gallery/staircases/curved-staircase-dark-stain.jpg"
                alt="Curved staircase with dark-stained oak treads above a refinished hardwood foyer, completed by Gusjov Flooring"
                loading="lazy"
                decoding="async"
                width="1400"
                height="1866"
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-card"
              />
            </picture>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-ember-500 px-7 py-6 text-white shadow-lift sm:block">
              <p className="font-display text-4xl font-extrabold leading-none">12</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest">
                Years of
                <br />
                experience
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Welcome Gusjov Floors Co."
              title="Quality. On time. Professional."
              body={introCopy}
            />
            <p className="mt-6 leading-relaxed text-charcoal-600 text-pretty">
              {specializationCopy}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/services" className="btn-dark">
                Our Services
              </Link>
              <Link to="/projects" className="btn-ghost !border-charcoal-300 !text-charcoal-700 hover:!border-ember-500 hover:!text-ember-600">
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="bg-charcoal-50 py-20 sm:py-28">
        <div className="container-content">
          <SectionHeading
            eyebrow="Our Specialization"
            title="Everything we do underfoot"
            body="Six services, one crew. Whatever your floors need, we handle it end to end."
          />

          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services#${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-white p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-ember-50 text-ember-600 transition group-hover:bg-ember-500 group-hover:text-white">
                    <ServiceIcon name={s.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-charcoal-900">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-600 text-pretty">
                    {s.blurb}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ember-600">
                    Learn more
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 12h15" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="relative isolate overflow-hidden bg-charcoal-950 py-20">
        <div className="container-content">
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-bold text-white sm:text-3xl">
            Nice flooring will help you stand better on your own
          </h2>
          <dl className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-3">
            {stats.map((s) => (
              <Counter key={s.label} {...s} />
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Gallery ---------- */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-content">
          <SectionHeading
            eyebrow="Project Gallery"
            title="Real floors, real Chicago homes"
            body="Every photo here is our own work — no stock photography."
          />
          <div className="mt-14">
            <Gallery />
          </div>
          <div className="mt-12 text-center">
            <Link to="/projects" className="btn-dark">
              View all projects
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Reviews ---------- */}
      <Testimonials light />

      {/* ---------- Consultation ---------- */}
      <section className="bg-charcoal-50 py-20 sm:py-24">
        <div className="container-content">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-card sm:p-14">
            <p className="eyebrow">Get your free consultation</p>
            <h2 className="mt-3 text-3xl font-bold text-charcoal-900 sm:text-4xl">
              Talk to us about your floors
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-charcoal-600 text-pretty">
              {consultationCopy}
            </p>
            <a
              href={site.phoneHref}
              className="mt-8 inline-block font-display text-3xl font-extrabold text-ember-600 transition hover:text-ember-500 sm:text-4xl"
            >
              {site.phone}
            </a>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/quote" className="btn-primary">
                Schedule a Call Back
              </Link>
              <Link to="/contact" className="btn-ghost !border-charcoal-300 !text-charcoal-700 hover:!border-ember-500 hover:!text-ember-600">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
