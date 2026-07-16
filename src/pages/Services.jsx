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

      {/* Mobile jump links — keep the long page scannable */}
      <nav
        aria-label="Jump to a service"
        className="border-b border-charcoal-100 bg-white lg:hidden"
      >
        <div className="container-content flex gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="shrink-0 rounded-full bg-charcoal-50 px-3.5 py-2 text-xs font-semibold text-charcoal-700 ring-1 ring-charcoal-200 transition hover:bg-ember-50 hover:text-ember-700 hover:ring-ember-300"
            >
              {s.title}
            </a>
          ))}
        </div>
      </nav>

      {/* ---------- Service detail ---------- */}
      <section className="bg-white py-12 sm:py-20 lg:py-24">
        <div className="container-content space-y-14 sm:space-y-20 lg:space-y-24">
          {services.map((s, i) => {
            const img = serviceImages[s.slug]
            const flipped = i % 2 === 1
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="grid scroll-mt-28 items-center gap-5 sm:gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={flipped ? 'lg:order-2' : ''}>
                  <picture>
                    <source
                      media="(max-width: 639px)"
                      srcSet={`${img.src}-thumb.webp`}
                      type="image/webp"
                    />
                    <source media="(max-width: 639px)" srcSet={`${img.src}-thumb.jpg`} />
                    <source srcSet={`${img.src}.webp`} type="image/webp" />
                    <img
                      src={`${img.src}.jpg`}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="900"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="aspect-[16/10] w-full rounded-xl object-cover shadow-card sm:aspect-[4/3] sm:rounded-2xl"
                    />
                  </picture>
                </div>

                <div className={flipped ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-3 sm:block">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ember-50 text-ember-600 sm:h-14 sm:w-14">
                      <ServiceIcon name={s.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                    </span>
                    <p className="font-display text-sm font-bold text-ember-500 sm:mt-6">
                      {String(i + 1).padStart(2, '0')}.
                    </p>
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-charcoal-900 sm:mt-1 sm:text-3xl md:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-charcoal-700 text-pretty sm:mt-5 sm:text-lg">
                    {s.blurb}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-600 text-pretty sm:mt-4 sm:text-base">
                    {s.detail}
                  </p>
                  <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
                    <Link to="/quote" className="btn-primary w-full sm:w-auto">
                      Get a quote for this
                    </Link>
                    <a
                      href={site.phoneHref}
                      className="btn-ghost w-full !border-charcoal-300 !text-charcoal-700 hover:!border-ember-500 hover:!text-ember-600 sm:w-auto"
                    >
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
      <section className="bg-charcoal-50 py-12 sm:py-20 lg:py-28">
        <div className="container-content">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="We provide comfort, beauty and craftsmanship"
            body={specializationCopy}
          />
          <ul className="mt-8 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6">
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

      {/* ---------- Materials ----------
          Kept from the WordPress build's "Our Materials" section. Only the three
          material families we can stand behind from the verified services list. */}
      <section className="bg-white py-12 sm:py-20 lg:py-24">
        <div className="container-content">
          <SectionHeading
            eyebrow="Our Materials"
            title="Nice flooring will help you stand better on your own"
          />
          <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-6">
            {[
              { name: 'Hardwood', note: 'Solid oak and more, in every common texture.' },
              { name: 'Engineered', note: 'Real wood over a stable core — good on slabs.' },
              { name: 'Laminate', note: 'Hard-wearing, budget-friendly, many textures.' },
            ].map((m) => (
              <li
                key={m.name}
                className="rounded-2xl border border-charcoal-200 p-5 text-center transition hover:border-ember-400 sm:p-8"
              >
                <h3 className="font-display text-lg font-bold text-charcoal-900 sm:text-xl">{m.name}</h3>
                <p className="mt-1.5 text-sm text-charcoal-600 text-pretty sm:mt-2">{m.note}</p>
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
