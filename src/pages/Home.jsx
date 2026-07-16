import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { CtaBand, Counter, SectionHeading, ServiceIcon } from '../components/Bits'
import BeforeAfter from '../components/BeforeAfter'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import { beforeAfterPairs } from '../data/gallery'
import {
  consultationCopy,
  introCopy,
  serviceImages,
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
      <section className="relative isolate flex h-[100svh] max-h-[100svh] items-center overflow-hidden bg-charcoal-950 sm:h-auto sm:min-h-[92vh] sm:max-h-none">
        <picture>
          <source
            srcSet="/images/gallery/hardwood-refinishing/red-oak-refinish-gloss-hallway.webp"
            type="image/webp"
          />
          <img
            src="/images/gallery/hardwood-refinishing/red-oak-refinish-gloss-hallway.jpg"
            alt=""
            aria-hidden="true"
            fetchpriority="high"
            decoding="async"
            width="1400"
            height="1750"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_30%] sm:object-center"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal-950 via-charcoal-950/85 to-charcoal-950/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/45 to-charcoal-950/25 sm:from-charcoal-950 sm:via-transparent sm:to-transparent" />

        <div className="container-content w-full py-8 pt-24 sm:pb-16 sm:pt-32">
          <div className="flex max-w-2xl flex-col justify-center">
            <p className="eyebrow animate-fade-up">{site.name}</p>
            <h1 className="mt-3 text-[2.75rem] font-extrabold leading-[1.05] text-white animate-fade-up sm:mt-4 sm:text-6xl md:text-7xl">
              Great Prices,{' '}
              <span className="text-ember-400">Honest Service</span> &amp; Stunning Results
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal-200 animate-fade-up text-pretty sm:mt-7 sm:text-lg">
              Our goal then and now is to provide quality &amp; affordable hardwood flooring
              services across the Chicago area.
            </p>
            <div className="mt-9 flex flex-row flex-wrap gap-3 animate-fade-up sm:mt-12">
              <Link to="/quote" className="btn-primary">
                Get Free Quote
              </Link>
              <Link to="/contact" className="btn-ghost">
                Get In Touch
              </Link>
            </div>

            <dl className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-3 border-t border-white/10 pt-5 sm:mt-14 sm:gap-x-10 sm:pt-8">
              <div>
                <dt className="text-xs uppercase tracking-widest text-charcoal-400">Call us</dt>
                <dd>
                  <a
                    href={site.phoneHref}
                    className="font-display text-xl font-bold text-white transition hover:text-ember-400 sm:text-2xl"
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
                    className="text-base font-medium text-white transition hover:text-ember-400 sm:text-lg"
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
      <section className="bg-white py-12 sm:py-20 lg:py-28">
        <div className="container-content grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
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
                className="aspect-[16/10] w-full rounded-2xl object-cover shadow-card sm:aspect-[4/5]"
              />
            </picture>
            <div className="absolute -bottom-4 -right-2 rounded-xl bg-ember-500 px-3.5 py-2.5 text-white shadow-lift sm:-bottom-5 sm:-right-3 sm:rounded-2xl sm:px-7 sm:py-6">
              <p className="font-display text-2xl font-extrabold leading-none sm:text-4xl">12</p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase leading-tight tracking-widest sm:mt-1 sm:text-xs">
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
            <p className="mt-5 leading-relaxed text-charcoal-600 text-pretty sm:mt-6">
              {specializationCopy}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
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
      <section className="bg-charcoal-50 py-12 sm:py-20 lg:py-28">
        <div className="container-content">
          <SectionHeading
            eyebrow="Our Specialization"
            title="Everything we do underfoot"
            body="Six services, one crew. Whatever your floors need, we handle it end to end."
          />

          <ul className="mt-8 grid gap-3 sm:mt-14 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const img = serviceImages[s.slug]
              const imageRight = i % 2 === 1

              return (
                <li key={s.slug} className="h-full">
                  <article className="group flex h-full overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <Link
                      to={`/services#${s.slug}`}
                      className={`flex h-full min-h-[11.5rem] w-full sm:min-h-[22rem] sm:flex-col ${
                        imageRight ? 'flex-row-reverse sm:flex-col' : ''
                      }`}
                    >
                      <div className="relative w-[45%] shrink-0 self-stretch overflow-hidden bg-charcoal-100 sm:aspect-[16/11] sm:w-full sm:self-auto">
                        <picture>
                          <source srcSet={`${img.src}.webp`} type="image/webp" />
                          <img
                            src={`${img.src}.jpg`}
                            alt={img.alt}
                            loading="lazy"
                            decoding="async"
                            width="1400"
                            height="875"
                            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          />
                        </picture>
                      </div>
                      <div className="flex flex-1 flex-col p-4 sm:p-8">
                        <span className="hidden h-12 w-12 items-center justify-center rounded-xl bg-ember-50 text-ember-600 transition group-hover:bg-ember-500 group-hover:text-white sm:inline-flex">
                          <ServiceIcon name={s.icon} className="h-6 w-6" />
                        </span>
                        <h3 className="text-base font-bold text-charcoal-900 sm:mt-5 sm:text-xl">
                          {s.title}
                        </h3>
                        <p className="mt-1.5 flex-1 text-sm leading-snug text-charcoal-600 text-pretty sm:mt-3 sm:leading-relaxed">
                          {s.blurb}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-ember-600 sm:pt-5">
                          Learn more
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4 transition group-hover:translate-x-1"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13 5l7 7-7 7M5 12h15"
                            />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="relative isolate overflow-hidden bg-charcoal-950 py-12 sm:py-20">
        <div className="container-content">
          <h2 className="mx-auto max-w-2xl text-center text-xl font-bold text-white sm:text-3xl">
            Nice flooring will help you stand better on your own
          </h2>
          <dl className="mt-8 grid grid-cols-3 gap-4 sm:mt-14 sm:gap-12">
            {stats.map((s) => (
              <Counter key={s.label} {...s} />
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Before / After ---------- */}
      <section id="before-after" className="scroll-mt-24 bg-charcoal-50 py-12 sm:py-20 lg:py-24">
        <div className="container-content">
          <SectionHeading
            eyebrow="Before & after"
            title="Slide to see the difference"
            body={`${beforeAfterPairs.length} real jobs — same room or staircase, caught mid-work and after the finish went down. Drag the handle to compare.`}
          />
          <div className="mt-8 sm:mt-14">
            <BeforeAfter />
          </div>
          <div className="mt-8 text-center sm:mt-12">
            <Link to="/projects#before-after" className="btn-dark">
              See more projects
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Gallery ---------- */}
      <section className="bg-white py-12 sm:py-20 lg:py-28">
        <div className="container-content">
          <SectionHeading
            eyebrow="Project Gallery"
            title="Real floors, real Chicago homes"
            body="Every photo here is our own work — no stock photography."
          />
          <div className="mt-8 sm:mt-14">
            <Gallery />
          </div>
          <div className="mt-8 text-center sm:mt-12">
            <Link to="/projects" className="btn-dark">
              View all projects
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Reviews ---------- */}
      <Testimonials light />

      {/* ---------- Consultation ---------- */}
      <section className="bg-charcoal-50 py-12 sm:py-20 lg:py-24">
        <div className="container-content">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-7 text-center shadow-card sm:p-14">
            <p className="eyebrow">Get your free consultation</p>
            <h2 className="mt-3 text-2xl font-bold text-charcoal-900 sm:text-4xl">
              Talk to us about your floors
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-charcoal-600 text-pretty sm:mt-5 sm:text-base">
              {consultationCopy}
            </p>
            <a
              href={site.phoneHref}
              className="mt-6 inline-block font-display text-2xl font-extrabold text-ember-600 transition hover:text-ember-500 sm:mt-8 sm:text-4xl"
            >
              {site.phone}
            </a>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
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
