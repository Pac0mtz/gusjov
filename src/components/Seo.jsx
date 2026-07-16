import { Helmet } from 'react-helmet-async'
import { site } from '../data/site'
import { googleProfile } from '../data/reviews'

/**
 * Per-route metadata + JSON-LD.
 *
 * The LocalBusiness node deliberately carries NO postal address: Gusjov works
 * on customer sites and the WordPress build had no real address of its own
 * (the one it shipped with was Astra demo filler pointing at New York).
 * Publishing an invented address would poison local rankings and is exactly
 * the kind of thing Google penalises, so we model a service-area business
 * instead -- areaServed without address is valid and honest.
 */
export default function Seo({
  title,
  description,
  path = '/',
  image = '/images/gallery/hardwood-installation/engineered-hardwood-hallway.jpg',
  type = 'website',
  schema,
  noindex = false,
}) {
  const url = `${site.url}${path === '/' ? '' : path}`
  const fullTitle =
    path === '/' ? `${site.name} | Hardwood Flooring in Chicago` : `${title} | ${site.shortName}`
  const desc = description || site.description
  const imageUrl = image.startsWith('http') ? image : `${site.url}${image}`

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: '+1-773-986-2691',
    email: site.email,
    image: `${site.url}/images/gallery/hardwood-installation/engineered-hardwood-hallway.jpg`,
    logo: `${site.url}/images/brand/gusjov-logo.png`,
    priceRange: '$$',
    areaServed: site.areaServed.map((name) => ({ '@type': 'Place', name })),
    address: {
      // Region only. No streetAddress until a real one is supplied.
      '@type': 'PostalAddress',
      addressLocality: 'Chicago',
      addressRegion: site.region,
      addressCountry: site.country,
    },
    knowsAbout: [
      'Hardwood floor installation',
      'Hardwood floor refinishing',
      'Laminate flooring',
      'Engineered hardwood flooring',
    ],
    // The Google profile lists the business as "Gusjov Floors Co." while the
    // legal name here is "Gusjov Flooring Services Inc." Both are real and both
    // are in use, so declare the alias rather than pick a winner -- it helps
    // Google reconcile the two names as one entity.
    alternateName: googleProfile.name,
    // Service-area business: no street address (see the note above), so the
    // area is the location claim. serviceArea is the modern spelling of it.
    serviceArea: site.areaServed.map((name) => ({ '@type': 'Place', name })),
    ...(site.hoursSpec
      ? {
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: site.hoursSpec.days,
              opens: site.hoursSpec.opens,
              closes: site.hoursSpec.closes,
            },
          ],
        }
      : {}),
    ...(Object.values(site.social).some(Boolean)
      ? { sameAs: Object.values(site.social).filter(Boolean) }
      : {}),
  }

  /*
   * Deliberately NOT emitted here: aggregateRating / review.
   *
   * Gusjov genuinely has 13 five-star Google reviews, and they are shown on the
   * site (see components/Testimonials.jsx) because they help real visitors
   * decide. But marking them up on gusjov.com would be a "self-serving review"
   * -- a review of entity A hosted on entity A's own site. Google has ignored
   * those for LocalBusiness/Organization since 2019, so it buys no stars in the
   * SERP, and asserting a rating Google can't verify is the sort of thing that
   * attracts a spammy-structured-markup manual action instead.
   *
   * The stars come from the Google Business Profile itself, not from markup
   * here. https://developers.google.com/search/docs/appearance/structured-data/review-snippet
   */

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { '@id': `${site.url}/#business` },
  }

  return (
    // defer={false} writes head changes synchronously. Helmet's default defers
    // them into requestAnimationFrame, which a browser does not run in a
    // backgrounded tab -- so a route change queued there can leave the document
    // with the previous page's title and, mid-swap, no canonical at all. The
    // first paint of every route already comes from the prerender, so deferring
    // buys nothing here; determinism is worth more than one frame.
    <Helmet prioritizeSeoTags defer={false}>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-image-preview:large" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl} />

      <meta name="geo.region" content="US-IL" />
      <meta name="geo.placename" content="Chicago" />

      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  )
}

/** Breadcrumb JSON-LD helper. */
export function breadcrumb(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  }
}
