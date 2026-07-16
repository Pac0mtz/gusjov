import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import {
  CtaBand,
  Counter,
  HeroBackdrop,
  Reveal,
  ScrollPanImage,
  SectionHeading,
  ServiceIcon,
} from '../components/Bits'
import BeforeAfter from '../components/BeforeAfter'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import { beforeAfterPairs } from '../data/gallery'
import {
  consultationCopy,
  introCopy,
  serviceImages,
  servicePath,
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
      <section className="relative isolate flex h-[100svh] max-h-[100svh] items-center overflow-hidden bg-charcoal-950">
        <HeroBackdrop
          src="/images/hero-espresso-hallway.jpg"
          webp="/images/hero-espresso-hallway.webp"
          priority
          pan={false}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal-950 via-charcoal-950/85 to-charcoal-950/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/45 to-charcoal-950/25" />

        <div className="container-content relative z-0 w-full py-8 pt-24 sm:pb-16 sm:pt-32">
          <div className="measure-narrow flex flex-col justify-center">
            <p className="eyebrow animate-fade-up" style={{ animationDelay: '40ms' }}>
              {site.name}
            </p>
            <h1
              className="mt-3 text-5xl font-extrabold leading-[1.05] text-white animate-soft-rise sm:mt-4 sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ animationDelay: '120ms' }}
            >
              Great Prices,{' '}
              <span className="text-ember-400">Honest Service</span> &amp; Stunning Results
            </h1>
            <p
              className="mt-4 max-w-xl text-base leading-relaxed text-charcoal-200 animate-fade-up text-pretty sm:mt-7 sm:text-lg"
              style={{ animationDelay: '220ms' }}
            >
              Our goal then and now is to provide quality &amp; affordable hardwood flooring
              services across the Chicago area.
            </p>
            <div
              className="mt-8 flex flex-row flex-wrap gap-3 animate-fade-up sm:mt-12"
              style={{ animationDelay: '320ms' }}
            >
              <Link to="/quote" className="btn-primary">
                Get Free Quote
              </Link>
              <Link to="/contact" className="btn-ghost">
                Get In Touch
              </Link>
            </div>

            <dl
              className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-3 border-t border-white/10 pt-5 animate-fade-up sm:mt-10 sm:gap-x-10 sm:pt-8"
              style={{ animationDelay: '400ms' }}
            >
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
      <section className="section-pad bg-white">
        <div className="container-content grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <ScrollPanImage
              className="aspect-square w-full rounded-2xl shadow-card sm:aspect-[4/5]"
              webp="/images/gallery/hardwood-installation/light-oak-open-concept-arches.webp"
              src="/images/gallery/hardwood-installation/light-oak-open-concept-arches.jpg"
              alt="Light oak hardwood flooring through an open-concept living area with arched entryways, completed by Gusjov Flooring"
              width={756}
              height={1400}
            />
            <div className="absolute -bottom-4 -right-2 rounded-xl bg-ember-500 px-3.5 py-2.5 text-white shadow-lift sm:-bottom-5 sm:-right-3 sm:rounded-2xl sm:px-7 sm:py-6">
              <p className="font-display text-2xl font-extrabold leading-none sm:text-4xl">12</p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase leading-tight tracking-widest sm:mt-1 sm:text-xs">
                Years of
                <br />
                experience
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Welcome Gusjov Floors Co."
              title="Quality. On time. Professional."
              body={introCopy}
            />
            <Reveal delay={100}>
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="section-pad bg-charcoal-50">
        <div className="container-content">
          <SectionHeading
            eyebrow="Our Specialization"
            title="Everything we do underfoot"
            body="Six services, one crew. Whatever your floors need, we handle it end to end."
          />

          <ul className="mt-8 grid gap-5 sm:mt-14 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const img = serviceImages[s.slug]
              const imageRight = i % 2 === 1
              const dark = i % 2 === 1

              return (
                <Reveal key={s.slug} as="li" className="h-full" delay={Math.min(i, 5) * 70}>
                  <article className="group flex h-full overflow-hidden rounded-2xl bg-white shadow-card transition duration-500 ease-unveil hover:-translate-y-1.5 hover:shadow-lift">
                    <Link
                      to={servicePath(s.slug)}
                      className={`flex h-full min-h-[12rem] w-full sm:min-h-0 sm:flex-col ${
                        imageRight ? 'flex-row-reverse sm:flex-col' : ''
                      }`}
                    >
                      <div className="relative w-[48%] shrink-0 self-stretch overflow-hidden bg-charcoal-100 sm:aspect-[16/12] sm:w-full sm:self-auto">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet={`${img.src}-thumb.webp 480w, ${img.src}.webp 1600w`}
                            sizes="(min-width: 640px) 33vw, 48vw"
                          />
                          <img
                            src={`${img.src}.jpg`}
                            srcSet={`${img.src}-thumb.jpg 480w, ${img.src}.jpg 1600w`}
                            alt={img.alt}
                            loading="lazy"
                            decoding="async"
                            width="1200"
                            height="900"
                            sizes="(min-width: 640px) 33vw, 48vw"
                            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          />
                        </picture>
                      </div>
                      <div
                        className={`flex flex-1 flex-col justify-center px-3.5 py-3 sm:px-5 sm:py-4 ${
                          dark ? 'bg-charcoal-950 text-white' : 'bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition sm:h-9 sm:w-9 ${
                              dark
                                ? 'bg-white/10 text-ember-400 group-hover:bg-ember-500 group-hover:text-charcoal-950'
                                : 'bg-ember-50 text-ember-600 group-hover:bg-ember-500 group-hover:text-white'
                            }`}
                          >
                            <ServiceIcon name={s.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                          </span>
                          <h3
                            className={`text-sm font-bold sm:text-base ${
                              dark ? 'text-white' : 'text-charcoal-900'
                            }`}
                          >
                            {s.title}
                          </h3>
                        </div>
                        <p
                          className={`mt-1.5 line-clamp-2 text-xs leading-snug text-pretty sm:text-sm ${
                            dark ? 'text-charcoal-300' : 'text-charcoal-600'
                          }`}
                        >
                          {s.blurb}
                        </p>
                        <span
                          className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold sm:mt-2.5 sm:text-sm ${
                            dark ? 'text-ember-400' : 'text-ember-600'
                          }`}
                        >
                          Learn more
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-3.5 w-3.5 transition group-hover:translate-x-1"
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
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="section-pad relative isolate overflow-hidden bg-charcoal-950">
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
      <section id="before-after" className="section-pad scroll-mt-24 bg-charcoal-50">
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
      <section className="section-pad bg-white">
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
      <section className="section-pad bg-charcoal-50">
        <div className="container-content">
          <div className="measure-center rounded-3xl bg-white p-7 text-center shadow-card sm:p-14">
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
