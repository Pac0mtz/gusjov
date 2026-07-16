import Seo, { breadcrumb } from '../components/Seo'
import { CtaBand, PageHero, SectionHeading } from '../components/Bits'
import BeforeAfter from '../components/BeforeAfter'
import Gallery from '../components/Gallery'
import { allPhotos, beforeAfterPairs, categories, photoCount } from '../data/gallery'
import { site } from '../data/site'

export default function Projects() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
      ]),
      {
        '@type': 'ImageGallery',
        name: 'Gusjov Flooring project gallery',
        description: `${photoCount} photos of hardwood refinishing, staircase, laminate and installation work completed across the Chicago area.`,
        url: `${site.url}/projects`,
        image: allPhotos.slice(0, 12).map((p) => ({
          '@type': 'ImageObject',
          contentUrl: `${site.url}${p.fallback}`,
          caption: p.alt,
        })),
      },
    ],
  }

  return (
    <>
      <Seo
        path="/projects"
        title="Our Projects"
        description={`${photoCount} photos of real Gusjov Flooring work across the Chicago area — hardwood refinishing, staircases, laminate and new installations.`}
        image="/images/gallery/staircases/curved-staircase-dark-stain.jpg"
        schema={schema}
      />

      <PageHero
        eyebrow="Recent Projects"
        title="What we have done"
        body="Every photo below is a floor we laid, sanded or finished ourselves in a real Chicago-area home. Nothing here is stock photography."
      />

      {/* ---------- Category overview ---------- */}
      <section className="section-pad bg-white">
        <div className="container-content">
          <SectionHeading
            eyebrow="Browse by category"
            title="Sorted by the kind of work"
            body="Filter the gallery below, or jump straight to what you are planning."
          />

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => {
              const count = allPhotos.filter((p) => p.category === c.slug).length
              const cover = allPhotos.find((p) => p.category === c.slug)
              return (
                <li key={c.slug}>
                  <a
                    href={`#gallery`}
                    className="group block overflow-hidden rounded-2xl bg-charcoal-50 shadow-card transition hover:-translate-y-1 hover:shadow-lift"
                  >
                    {cover && (
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={`${cover.thumb} 480w, ${cover.src} 1200w`}
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                        />
                        <img
                          src={cover.fallback}
                          srcSet={`${cover.thumbFallback} 480w, ${cover.fallback} 1200w`}
                          alt={cover.alt}
                          loading="lazy"
                          decoding="async"
                          width="900"
                          height="675"
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </picture>
                    )}
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold text-charcoal-900">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-600 text-pretty">
                        {c.blurb}
                      </p>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-ember-600">
                        {count} {count === 1 ? 'photo' : 'photos'}
                      </p>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
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
          <div className="mt-14">
            <BeforeAfter />
          </div>
        </div>
      </section>

      {/* ---------- Gallery ---------- */}
      <section id="gallery" className="section-pad scroll-mt-24 bg-white">
        <div className="container-content">
          <SectionHeading
            eyebrow="Project Gallery"
            title={`${photoCount} photos of our work`}
            body="Click any photo to view it full size. Use the arrow keys to move through the gallery."
          />
          <div className="mt-14">
            <Gallery />
          </div>
        </div>
      </section>

      {/*
        TODO(gusjov): the WordPress Projects page had case studies (NY Water Park,
        Sky Tail Tower) with client testimonials from John Doe and Margaret Curtis.
        Every one of those was Astra demo filler for an architecture firm. They
        are gone. If you want real case studies, send job details and client
        permission and they can be added as individual project pages — those rank
        well for local searches.
      */}

      <CtaBand title="Want your floors to look like this?" />
    </>
  )
}
