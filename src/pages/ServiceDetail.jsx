import { Link, Navigate, useParams } from 'react-router-dom'
import Seo, { breadcrumb } from '../components/Seo'
import { CtaBand, HeroBackdrop, ServiceIcon } from '../components/Bits'
import {
  getService,
  serviceImages,
  serviceMetaDescription,
  servicePath,
  services,
  site,
  stats,
} from '../data/site'

function ServicePicture({ image, className, priority = false, sizes }) {
  return (
    <picture>
      <source srcSet={`${image.src}.webp`} type="image/webp" />
      <img
        src={`${image.src}.jpg`}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        width="1200"
        height="1500"
        sizes={sizes}
        className={className}
      />
    </picture>
  )
}

function StoryCopy({ service, paragraphs, light = false }) {
  return (
    <div>
      <p
        className={`text-xs font-semibold uppercase tracking-widest ${
          light ? 'text-ember-400' : 'text-ember-600'
        }`}
      >
        What we do
      </p>
      <h2
        className={`mt-3 text-2xl font-bold sm:text-3xl ${
          light ? 'text-white' : 'text-charcoal-900'
        }`}
      >
        {service.title} done properly
      </h2>
      <div
        className={`mt-5 space-y-4 text-base leading-relaxed text-pretty sm:mt-6 sm:text-lg ${
          light ? 'text-charcoal-200' : 'text-charcoal-700'
        }`}
      >
        {paragraphs.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
      </div>
    </div>
  )
}

function PointsList({ points, variant = 'soft' }) {
  if (!points?.length) return null

  if (variant === 'grid') {
    return (
      <ul className="mt-8 grid gap-3 sm:grid-cols-3">
        {points.map((point) => (
          <li
            key={point}
            className="rounded-2xl border border-charcoal-100 bg-white px-4 py-5 text-sm leading-relaxed text-charcoal-800 shadow-card sm:text-base"
          >
            <span className="mb-3 block h-1.5 w-1.5 rounded-full bg-ember-500" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className="mt-8 grid gap-3">
      {points.map((point) => (
        <li
          key={point}
          className={`flex gap-3 rounded-xl px-4 py-3.5 text-sm leading-relaxed sm:text-base ${
            variant === 'dark'
              ? 'bg-white/10 text-charcoal-100'
              : 'bg-charcoal-50 text-charcoal-800'
          }`}
        >
          <span
            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
              variant === 'dark' ? 'bg-ember-400' : 'bg-ember-500'
            }`}
            aria-hidden="true"
          />
          {point}
        </li>
      ))}
    </ul>
  )
}

function StoryActions({ light = false }) {
  return (
    <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
      <Link to="/quote" className={light ? 'btn-primary w-full sm:w-auto' : 'btn-dark w-full sm:w-auto'}>
        Request a quote
      </Link>
      <Link
        to="/projects"
        className={
          light
            ? 'btn-ghost w-full sm:w-auto'
            : 'btn-ghost w-full !border-charcoal-300 !text-charcoal-700 hover:!border-ember-500 hover:!text-ember-600 sm:w-auto'
        }
      >
        See our work
      </Link>
    </div>
  )
}

function StatsRow({ light = false }) {
  return (
    <dl
      className={`mt-4 grid grid-cols-3 gap-3 border-t pt-4 text-center ${
        light ? 'border-white/15' : 'border-charcoal-100'
      }`}
    >
      {stats.map((s) => (
        <div key={s.label}>
          <dt
            className={`text-[10px] font-semibold uppercase tracking-widest ${
              light ? 'text-charcoal-400' : 'text-charcoal-500'
            }`}
          >
            {s.label}
          </dt>
          <dd
            className={`mt-1 font-display text-xl font-bold sm:text-2xl ${
              light ? 'text-white' : 'text-charcoal-900'
            }`}
          >
            {s.value}
            {s.suffix}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function StorySection({ service, paragraphs, sectionImg }) {
  const layout = service.layout || 'aside-right'

  if (layout === 'aside-left') {
    return (
      <section className="section-pad bg-white">
        <div className="container-content grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <aside className="order-2 lg:sticky lg:top-28 lg:order-1">
            <ServicePicture
              image={sectionImg}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-card sm:aspect-[5/4] lg:aspect-[4/5]"
            />
            <StatsRow />
          </aside>
          <div className="order-1 lg:order-2">
            <StoryCopy service={service} paragraphs={paragraphs} />
            <PointsList points={service.points} />
            <StoryActions />
          </div>
        </div>
      </section>
    )
  }

  if (layout === 'image-band') {
    return (
      <>
        <section className="section-pad bg-white">
          <div className="container-content">
            <div className="measure">
              <StoryCopy service={service} paragraphs={paragraphs} />
              <StoryActions />
            </div>
          </div>
        </section>
        <section className="relative isolate overflow-hidden bg-charcoal-950">
          <ServicePicture
            image={sectionImg}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-charcoal-950/20" />
          <div className="container-content relative section-pad">
            <p className="text-xs font-semibold uppercase tracking-widest text-ember-400">Built for real rooms</p>
            <h2 className="mt-2 max-w-xl text-2xl font-bold text-white sm:text-3xl">
              {service.blurb}
            </h2>
            <PointsList points={service.points} variant="dark" />
            <StatsRow light />
          </div>
        </section>
      </>
    )
  }

  if (layout === 'dark-intro') {
    return (
      <section className="section-pad bg-charcoal-950">
        <div className="container-content grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <StoryCopy service={service} paragraphs={paragraphs} light />
            <PointsList points={service.points} variant="dark" />
            <StoryActions light />
          </div>
          <aside>
            <ServicePicture
              image={sectionImg}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lift sm:aspect-[5/4] lg:aspect-[3/4]"
            />
            <StatsRow light />
          </aside>
        </div>
      </section>
    )
  }

  if (layout === 'points-grid') {
    return (
      <section className="section-pad bg-charcoal-50">
        <div className="container-content">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <StoryCopy service={service} paragraphs={paragraphs} />
            <ServicePicture
              image={sectionImg}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="aspect-[16/11] w-full rounded-2xl object-cover shadow-card"
            />
          </div>
          <PointsList points={service.points} variant="grid" />
          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
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
          <div className="mt-10">
            <StatsRow />
          </div>
        </div>
      </section>
    )
  }

  if (layout === 'split-feature') {
    return (
      <section className="section-pad bg-white">
        <div className="container-content">
          <div className="grid overflow-hidden rounded-3xl bg-charcoal-950 shadow-lift lg:grid-cols-2">
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <StoryCopy service={service} paragraphs={paragraphs} light />
              <PointsList points={service.points} variant="dark" />
              <StoryActions light />
            </div>
            <div className="relative min-h-[18rem] lg:min-h-full">
              <ServicePicture
                image={sectionImg}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-8">
            <StatsRow />
          </div>
        </div>
      </section>
    )
  }

  // aside-right (default)
  return (
    <section className="section-pad bg-white">
      <div className="container-content grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <StoryCopy service={service} paragraphs={paragraphs} />
          <PointsList points={service.points} />
          <StoryActions />
        </div>
        <aside className="lg:sticky lg:top-28">
          <ServicePicture
            image={sectionImg}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-card sm:aspect-[5/4] lg:aspect-[4/5]"
          />
          <StatsRow />
        </aside>
      </div>
    </section>
  )
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)

  if (!service) return <Navigate to="/services" replace />

  const images = serviceImages[service.slug]
  const heroImg = images.hero || images
  const sectionImg = images.section || images
  const path = servicePath(service.slug)
  const related = services.filter((s) => s.slug !== service.slug)
  const paragraphs = service.body?.length ? service.body : [service.detail]

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
        image: `${site.url}${heroImg.src}.jpg`,
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
        image={`${heroImg.src}.jpg`}
        schema={schema}
      />

      <section className="relative isolate overflow-hidden bg-charcoal-950 pb-12 pt-28 sm:pb-16 sm:pt-36">
        <HeroBackdrop
          key={service.slug}
          src={`${heroImg.src}.jpg`}
          webp={`${heroImg.src}.webp`}
          priority
          pan={false}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal-950 via-charcoal-950/75 to-charcoal-950/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/45 to-transparent" />

        <div className="container-content relative z-0 w-full">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-charcoal-300">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/services" className="transition hover:text-ember-400">
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="text-charcoal-500">
                /
              </li>
              <li className="text-ember-400">{service.title}</li>
            </ol>
          </nav>
          <p className="eyebrow">{site.shortName}</p>
          <h1 className="measure-narrow mt-3 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            {service.title}
          </h1>
          <p className="measure-narrow mt-4 text-base leading-relaxed text-charcoal-200 text-pretty sm:mt-5 sm:text-lg">
            {service.blurb}
          </p>
          <div className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
            <Link to="/quote" className="btn-primary w-full sm:w-auto">
              Get Free Quote
            </Link>
            <a href={site.phoneHref} className="btn-ghost w-full sm:w-auto">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <StorySection service={service} paragraphs={paragraphs} sectionImg={sectionImg} />

      {service.process?.length > 0 && (
        <section
          className={`section-pad border-t border-charcoal-100 ${
            service.layout === 'dark-intro' || service.layout === 'points-grid'
              ? 'bg-white'
              : 'bg-charcoal-50'
          }`}
        >
          <div className="container-content">
            <p className="text-xs font-semibold uppercase tracking-widest text-ember-600">How we work</p>
            <h2 className="mt-2 text-2xl font-bold text-charcoal-900 sm:text-3xl">From quote to finish</h2>
            <ol
              className={`mt-8 grid gap-4 sm:mt-10 sm:gap-6 ${
                service.layout === 'split-feature' ? 'sm:grid-cols-1 lg:grid-cols-3' : 'sm:grid-cols-3'
              }`}
            >
              {service.process.map((step, i) => (
                <li
                  key={step.title}
                  className={
                    service.layout === 'aside-left'
                      ? 'border-l-2 border-ember-400 pl-4'
                      : 'rounded-2xl bg-white p-5 shadow-card sm:p-6'
                  }
                >
                  <p className="font-display text-sm font-bold text-ember-500">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-charcoal-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600 text-pretty">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {service.idealFor?.length > 0 && (
        <section
          className={`section-pad ${
            service.layout === 'image-band' || service.layout === 'split-feature'
              ? 'bg-charcoal-50'
              : 'bg-white'
          }`}
        >
          <div className="container-content">
            <div
              className={
                service.layout === 'points-grid' || service.layout === 'image-band'
                  ? 'grid gap-6 sm:grid-cols-3'
                  : 'measure-narrow'
              }
            >
              {service.layout === 'points-grid' || service.layout === 'image-band' ? (
                <>
                  <div className="sm:col-span-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-ember-600">A good fit when</p>
                    <h2 className="mt-2 text-2xl font-bold text-charcoal-900 sm:text-3xl">
                      Who this service is for
                    </h2>
                  </div>
                  {service.idealFor.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-charcoal-100 bg-white px-5 py-5 text-base leading-relaxed text-charcoal-700 shadow-card"
                    >
                      {item}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ember-600">A good fit when</p>
                  <h2 className="mt-2 text-2xl font-bold text-charcoal-900 sm:text-3xl">Who this service is for</h2>
                  <ul className="mt-6 space-y-3">
                    {service.idealFor.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 border-b border-charcoal-100 pb-3 text-base leading-relaxed text-charcoal-700 last:border-0"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section-pad border-t border-charcoal-100 bg-charcoal-50">
        <div className="container-content">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ember-600">More services</p>
              <h2 className="mt-2 text-xl font-bold text-charcoal-900 sm:text-2xl">Also available</h2>
            </div>
            <Link to="/services" className="shrink-0 text-sm font-semibold text-ember-600 hover:text-ember-700">
              All services
            </Link>
          </div>

          <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => {
              const relatedImg = serviceImages[s.slug]
              return (
                <li key={s.slug}>
                  <Link
                    to={servicePath(s.slug)}
                    className="group flex h-full items-stretch gap-3 rounded-2xl bg-white p-3 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift sm:p-4"
                  >
                    <picture className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-charcoal-100 sm:h-24 sm:w-24">
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
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-ember-50 text-ember-600">
                          <ServiceIcon name={s.icon} className="h-4 w-4" />
                        </span>
                        <h3 className="truncate text-sm font-bold text-charcoal-900 sm:text-base">
                          {s.title}
                        </h3>
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-snug text-charcoal-600 sm:text-sm">
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
        body="Tell us about the room and we will come out with a free, honest estimate across Chicago and the suburbs."
      />
    </>
  )
}
