import Seo, { breadcrumb } from '../components/Seo'
import { PageHero } from '../components/Bits'
import { QuoteForm } from '../components/Form'
import { site, stats } from '../data/site'

const steps = [
  {
    title: 'Tell us about the job',
    body: 'Which rooms, roughly how big, and what is down there now. Photos help but are not essential.',
  },
  {
    title: 'We come and measure',
    body: 'We visit, look at the floor and the subfloor, and talk through your options in person.',
  },
  {
    title: 'You get a real number',
    body: 'A written quote with no obligation. If a refinish will do the job, we will say so.',
  },
]

export default function Quote() {
  const schema = breadcrumb([
    { name: 'Home', path: '/' },
    { name: 'Request a Quote', path: '/quote' },
  ])

  return (
    <>
      <Seo
        path="/quote"
        title="Request a Free Quote"
        description="Get a free, no-obligation quote for hardwood installation, refinishing or laminate flooring anywhere in the Chicago area. Call (773) 986-2691."
        schema={schema}
      />

      <PageHero
        eyebrow="Free Estimate"
        title="Request your free quote"
        body="A few quick questions so we can come back with an accurate number — not a guess."
      />

      <section className="section-pad bg-white">
        <div className="container-content grid gap-8 sm:gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* ---- How it works ---- */}
          <div>
            <h2 className="text-2xl font-bold text-charcoal-900 sm:text-3xl">How it works</h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-ember-500" />

            <ol className="mt-10 space-y-8">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ember-500 font-display text-base font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-charcoal-900">{s.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-charcoal-600 text-pretty">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <dl className="mt-12 grid grid-cols-3 gap-4 rounded-2xl bg-charcoal-50 p-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-extrabold text-charcoal-900">
                      {s.value}
                      {s.suffix}
                    </span>
                    <span className="mt-1 block text-xs font-medium uppercase tracking-wider text-charcoal-500">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-sm text-charcoal-600">
              Prefer to talk it through?{' '}
              <a href={site.phoneHref} className="font-semibold text-ember-600 hover:underline">
                Call {site.phone}
              </a>
            </p>
          </div>

          {/* ---- Form ---- */}
          <div className="rounded-3xl bg-charcoal-50 p-8 shadow-card sm:p-10">
            <h2 className="text-2xl font-bold text-charcoal-900">Your project</h2>
            <p className="mt-2 text-sm text-charcoal-600">
              Fields marked <span className="text-ember-500">*</span> are required. It takes about a
              minute.
            </p>
            <div className="mt-8">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
