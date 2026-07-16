import { Link } from 'react-router-dom'
import Seo, { breadcrumb } from '../components/Seo'
import { CtaBand, Counter, PageHero, SectionHeading } from '../components/Bits'
import { AllReviews } from '../components/Testimonials'
import { aboutCopy, consultationCopy, site, stats, whyUs } from '../data/site'

export default function About() {
  const schema = breadcrumb([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ])

  return (
    <>
      <Seo
        path="/about"
        title="About Us"
        description="Gusjov Flooring Services Inc. has spent 12 years installing and refinishing hardwood floors across the Chicago area — 230+ projects and counting."
        schema={schema}
      />

      <PageHero
        eyebrow="About Us"
        title="Twelve years of Chicago floors"
        body={aboutCopy.lead}
      />

      {/* ---------- Story ---------- */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-content grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <picture>
              <source srcSet="/images/gallery/hardwood-refinishing/red-oak-refinish-gloss-entryway.webp" type="image/webp" />
              <img
                src="/images/gallery/hardwood-refinishing/red-oak-refinish-gloss-entryway.jpg"
                alt="Freshly refinished red oak hardwood floor with a high-gloss finish in a home entryway"
                loading="lazy"
                decoding="async"
                width="1400"
                height="1750"
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-card"
              />
            </picture>
          </div>

          <div>
            <SectionHeading align="left" eyebrow="Our Story" title="Built on repeat customers" />
            <div className="mt-6 space-y-5">
              {aboutCopy.body.map((p) => (
                <p key={p.slice(0, 24)} className="leading-relaxed text-charcoal-600 text-pretty">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/projects" className="btn-dark">
                See our work
              </Link>
              <a href={site.phoneHref} className="btn-ghost !border-charcoal-300 !text-charcoal-700 hover:!border-ember-500 hover:!text-ember-600">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="bg-charcoal-950 py-20">
        <div className="container-content">
          <dl className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {stats.map((s) => (
              <Counter key={s.label} {...s} />
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- What we offer ---------- */}
      <section className="bg-charcoal-50 py-20 sm:py-28">
        <div className="container-content">
          <SectionHeading
            eyebrow="What We Offer"
            title="How we work"
            body="No surprises, no upselling, no disappearing mid-job."
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

      {/* ---------- Consultation ---------- */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-content">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading eyebrow="Get in touch" title="Get your free consultation" body={consultationCopy} />
            <a
              href={site.phoneHref}
              className="mt-8 inline-block font-display text-3xl font-extrabold text-ember-600 transition hover:text-ember-500 sm:text-4xl"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/*
        TODO(gusjov): the WordPress About page listed a team (Juan George, Sean
        Hart, Emma Kelly) and a company history. All of it was Astra demo filler,
        not your people, so none of it was carried over. Send real names, roles
        and photos and this page gets a team section.
      */}

      <AllReviews />

      <CtaBand />
    </>
  )
}
