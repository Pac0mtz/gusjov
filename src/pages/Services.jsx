import { Link } from 'react-router-dom'
import Seo, { breadcrumb } from '../components/Seo'
import { CtaBand, PageHero, SectionHeading, ServiceIcon } from '../components/Bits'
import {
  serviceImages,
  servicePath,
  services,
  site,
  specializationCopy,
  whyUs,
} from '../data/site'

export default function Services() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
      {
        '@type': 'ItemList',
        name: 'Gusjov Flooring services',
        itemListElement: services.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.title,
          url: `${site.url}${servicePath(s.slug)}`,
          item: {
            '@type': 'Service',
            name: s.title,
            description: s.blurb,
            provider: { '@id': `${site.url}/#business` },
            url: `${site.url}${servicePath(s.slug)}`,
          },
        })),
      },
    ],
  }

  return (
    <>
      <Seo
        path="/services"
        title="Flooring Services"
        description="Hardwood installation, floor refinishing, laminate, glued engineered flooring and more across the Chicago area. Free estimates from Gusjov Flooring."
        schema={schema}
      />

      <PageHero
        eyebrow="Our Services"
        title="We serve only quality flooring"
        body="Six things we do, and we do them properly. Tap a service for the full details — same crew from quote to finish."
      />

      {/* Fast hub grid — each card is a real page */}
      <section className="bg-white py-10 sm:py-16 lg:py-20">
        <div className="container-content">
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {services.map((s, i) => {
              const img = serviceImages[s.slug]
              return (
                <li key={s.slug} id={s.slug} className="scroll-mt-28">
                  <Link
                    to={servicePath(s.slug)}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-charcoal-100 transition duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-ember-200"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-100">
                      <picture>
                        <source srcSet={`${img.src}-thumb.webp`} type="image/webp" />
                        <img
                          src={`${img.src}-thumb.jpg`}
                          alt={img.alt}
                          loading={i < 2 ? 'eager' : 'lazy'}
                          decoding="async"
                          width="480"
                          height="300"
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      </picture>
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-ember-50 text-ember-600">
                          <ServiceIcon name={s.icon} className="h-5 w-5" />
                        </span>
                        <p className="font-display text-xs font-bold text-ember-500">
                          {String(i + 1).padStart(2, '0')}
                        </p>
                      </div>
                      <h2 className="mt-3 text-lg font-bold text-charcoal-900 sm:text-xl">{s.title}</h2>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-charcoal-600 text-pretty">
                        {s.blurb}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ember-600">
                        View service
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="bg-charcoal-50 py-12 sm:py-20 lg:py-24">
        <div className="container-content">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="We provide comfort, beauty and craftsmanship"
            body={specializationCopy}
          />
          <ul className="mt-8 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6">
            {whyUs.map((w) => (
              <li key={w.title} className="rounded-2xl bg-white p-5 shadow-card sm:p-8">
                <h3 className="text-base font-bold text-charcoal-900 sm:text-lg">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600 text-pretty sm:mt-3 sm:text-base">
                  {w.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
