import { Link } from 'react-router-dom'
import Seo, { breadcrumb } from '../components/Seo'
import { CtaBand, PageHero, SectionHeading, ServiceIcon } from '../components/Bits'
import { serviceImages, services, site, specializationCopy, whyUs } from '../data/site'

export default function Services() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
      ...services.map((s) => ({
        '@type': 'Service',
        name: s.title,
        description: s.detail,
        serviceType: s.title,
        provider: { '@id': `${site.url}/#business` },
        areaServed: { '@type': 'City', name: 'Chicago' },
        url: `${site.url}/services#${s.slug}`,
      })),
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
        body="Six things we do, and we do them properly. Whether it is a single room refinish or a whole house of new hardwood, the same crew sees it through."
      />

      {/* ---------- Service detail ---------- */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-content space-y-24">
          {services.map((s, i) => {
            const img = serviceImages[s.slug]
            const flipped = i % 2 === 1
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-16"
              >
                <div className={flipped ? 'lg:order-2' : ''}>
                  <picture>
                    <source srcSet={`${img.src}.webp`} type="image/webp" />
                    <img
                      src={`${img.src}.jpg`}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      width="1400"
                      height="1050"
                      className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
                    />
                  </picture>
                </div>

                <div className={flipped ? 'lg:order-1' : ''}>
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-ember-50 text-ember-600">
                    <ServiceIcon name={s.icon} className="h-7 w-7" />
                  </span>
                  <p className="mt-6 font-display text-sm font-bold text-ember-500">
                    {String(i + 1).padStart(2, '0')}.
                  </p>
                  <h2 className="mt-1 text-3xl font-bold text-charcoal-900 sm:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-charcoal-700 text-pretty">
                    {s.blurb}
                  </p>
                  <p className="mt-4 leading-relaxed text-charcoal-600 text-pretty">{s.detail}</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link to="/quote" className="btn-primary">
                      Get a quote for this
                    </Link>
                    <a href={site.phoneHref} className="btn-ghost !border-charcoal-300 !text-charcoal-700 hover:!border-ember-500 hover:!text-ember-600">
                      Call {site.phone}
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ---------- Why us ---------- */}
      <section className="bg-charcoal-50 py-20 sm:py-28">
        <div className="container-content">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="We provide comfort, beauty and craftsmanship"
            body={specializationCopy}
          />
          <ul className="mt-16 grid gap-6 sm:grid-cols-2">
            {whyUs.map((w) => (
              <li key={w.title} className="rounded-2xl bg-white p-8 shadow-card">
                <h3 className="text-lg font-bold text-charcoal-900">{w.title}</h3>
                <p className="mt-3 leading-relaxed text-charcoal-600 text-pretty">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Materials ----------
          Kept from the WordPress build's "Our Materials" section. Only the three
          material families we can stand behind from the verified services list. */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-content">
          <SectionHeading
            eyebrow="Our Materials"
            title="Nice flooring will help you stand better on your own"
          />
          <ul className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              { name: 'Hardwood', note: 'Solid oak and more, in every common texture.' },
              { name: 'Engineered', note: 'Real wood over a stable core — good on slabs.' },
              { name: 'Laminate', note: 'Hard-wearing, budget-friendly, many textures.' },
            ].map((m) => (
              <li
                key={m.name}
                className="rounded-2xl border border-charcoal-200 p-8 text-center transition hover:border-ember-400"
              >
                <h3 className="font-display text-xl font-bold text-charcoal-900">{m.name}</h3>
                <p className="mt-2 text-sm text-charcoal-600 text-pretty">{m.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*
        TODO(gusjov): the WordPress Services page had a "Pricing Package" section
        and a testimonial slider. Both were unedited Astra demo content — the
        prices were the template's, and "Martha Stylar" is not a real client.
        Neither has been carried over. Send real prices or real reviews and they
        can go back in; a pricing table with invented numbers would cost you jobs.
      */}

      <CtaBand />
    </>
  )
}
