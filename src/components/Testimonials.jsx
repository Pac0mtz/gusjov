import { Reveal, SectionHeading } from './Bits'
import { googleProfile, googleRating, reviews, featuredReviews } from '../data/reviews'

/**
 * Real Google reviews, rendered as social proof.
 *
 * These are shown for the visitor's benefit, not the crawler's -- see the long
 * note in Seo.jsx about why no aggregateRating markup accompanies them. Every
 * quote links back to the Google profile so anyone can check it is genuine,
 * which is the whole point of showing them.
 */

function Stars({ rating, label }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={label || `${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < rating ? 'fill-ember-400' : 'fill-charcoal-300'}`}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleMark() {
  // Google's four-colour G. Inlined rather than hotlinked so it survives
  // offline and costs no extra request.
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.1-2.7-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.5 7l6.9 5.4c4.1-3.8 6.6-9.4 6.6-15.7z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8.1 41.1 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.5 28.4c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4l-7.1-5.5C2.9 17 2 20.4 2 24s.9 7 2.4 9.9l7.1-5.5z"
      />
      <path
        fill="#EA4335"
        d="M24 10.5c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 4.3 29.9 2 24 2 15.4 2 8.1 6.9 4.4 14.1l7.1 5.5c1.8-5.3 6.7-9.1 12.5-9.1z"
      />
    </svg>
  )
}

/** The rating badge — links out to the profile so the claim is checkable. */
export function GoogleRatingBadge({ light = false }) {
  return (
    <a
      href={googleProfile.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition ${
        light
          ? 'border-white/15 text-charcoal-200 hover:border-ember-400 hover:text-white'
          : 'border-charcoal-200 text-charcoal-600 hover:border-ember-400 hover:text-charcoal-900'
      }`}
    >
      <GoogleMark />
      <span className="font-semibold">{googleRating.value.toFixed(1)}</span>
      <Stars
        rating={5}
        label={`Rated ${googleRating.value} out of 5 from ${googleRating.count} Google reviews`}
      />
      <span>{googleRating.count} Google reviews</span>
    </a>
  )
}

function ReviewCard({ review, light = false }) {
  return (
    <figure
      className={`flex h-full flex-col rounded-2xl border p-6 ${
        light ? 'border-white/10 bg-white/5' : 'border-charcoal-200/70 bg-white shadow-card'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <Stars rating={review.rating} />
        <GoogleMark />
      </div>
      <blockquote
        className={`mt-4 flex-1 text-sm leading-relaxed text-pretty ${
          light ? 'text-charcoal-200' : 'text-charcoal-700'
        }`}
      >
        {review.text}
      </blockquote>
      <figcaption
        className={`mt-5 border-t pt-4 text-sm ${
          light ? 'border-white/10' : 'border-charcoal-200/70'
        }`}
      >
        <span className={`font-semibold ${light ? 'text-white' : 'text-charcoal-900'}`}>
          {review.author}
        </span>
        <span className={light ? 'text-charcoal-400' : 'text-charcoal-500'}> · {review.when}</span>
      </figcaption>
    </figure>
  )
}

/** Home page strip: three quotes plus the badge. */
export default function Testimonials({ light = false }) {
  return (
    <section className={light ? 'bg-charcoal-950 py-24' : 'bg-charcoal-50 py-24'}>
      <div className="container-content">
        <SectionHeading
          eyebrow="Reviews"
          title="What Chicago homeowners say"
          body={`Every word below is a real review left on our Google profile — ${googleRating.count} of them, all five stars.`}
          light={light}
        />

        <Reveal className="mt-8 flex justify-center" delay={80}>
          <GoogleRatingBadge light={light} />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredReviews.map((review, i) => (
            <Reveal key={review.author} delay={120 + i * 90}>
              <ReviewCard review={review} light={light} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center" delay={200}>
          <a
            href={googleProfile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-ember-500 underline-offset-4 hover:underline"
          >
            Read all {googleRating.count} reviews on Google →
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/** Full list, for the About page. */
export function AllReviews() {
  return (
    <section className="bg-charcoal-50 py-24">
      <div className="container-content">
        <SectionHeading
          eyebrow="Reviews"
          title="Every review, unedited"
          body="Our Google profile, reproduced here in full — including our replies. Typos and all; these are our customers' own words."
        />

        <div className="mt-8 flex justify-center">
          <GoogleRatingBadge />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.author} className="flex flex-col gap-3">
              <ReviewCard review={review} />
              {review.reply && (
                <div className="ml-4 rounded-xl border-l-2 border-ember-400 bg-white/60 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
                    Our reply
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-700">{review.reply}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-charcoal-500">
          Captured from Google on {googleRating.capturedOn}.{' '}
          <a
            href={googleProfile.writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ember-500 underline-offset-4 hover:underline"
          >
            Worked with us? Leave a review.
          </a>
        </p>
      </div>
    </section>
  )
}
