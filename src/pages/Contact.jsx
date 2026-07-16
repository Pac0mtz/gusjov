import Seo, { breadcrumb } from '../components/Seo'
import { PageHero } from '../components/Bits'
import { ContactForm } from '../components/Form'
import { site } from '../data/site'

export default function Contact() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
      {
        '@type': 'ContactPage',
        name: 'Contact Gusjov Flooring Services',
        url: `${site.url}/contact`,
        mainEntity: { '@id': `${site.url}/#business` },
      },
    ],
  }

  return (
    <>
      <Seo
        path="/contact"
        title="Contact Us"
        description="Get in touch with Gusjov Flooring Services. Call (773) 986-2691 or send us a message — free estimates across the Chicago area."
        schema={schema}
      />

      <PageHero
        eyebrow="Contact"
        title="Get in touch with us"
        body="Tell us what your floors need. We answer the phone, and we reply to messages — usually the same day."
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-content grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* ---- Contact details ---- */}
          <div>
            <h2 className="text-2xl font-bold text-charcoal-900 sm:text-3xl">Contact info</h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-ember-500" />

            <ul className="mt-10 space-y-8">
              <ContactItem label="Call us" icon="phone">
                <a
                  href={site.phoneHref}
                  className="font-display text-2xl font-bold text-charcoal-900 transition hover:text-ember-600"
                >
                  {site.phone}
                </a>
                <p className="mt-1 text-sm text-charcoal-500">
                  Fastest way to reach us — ask for a free estimate.
                </p>
              </ContactItem>

              <ContactItem label="Email us" icon="mail">
                <a
                  href={site.emailHref}
                  className="text-lg font-semibold text-charcoal-900 transition hover:text-ember-600"
                >
                  {site.email}
                </a>
                <p className="mt-1 text-sm text-charcoal-500">
                  Send photos of your floors and we can give you a ballpark.
                </p>
              </ContactItem>

              <ContactItem label="Service area" icon="pin">
                <p className="text-lg font-semibold text-charcoal-900">Chicago &amp; suburbs</p>
                <p className="mt-1 text-sm text-charcoal-500">
                  We work on-site across Chicago and the surrounding suburbs.
                </p>
              </ContactItem>

              {/* Hours render only once real ones are set in src/data/site.js.
                  The old site's "Mon-Fri: 10AM-5PM" was an Astra demo default. */}
              {site.hours && (
                <ContactItem label="Working hours" icon="clock">
                  <p className="text-lg font-semibold text-charcoal-900">{site.hours}</p>
                </ContactItem>
              )}
            </ul>

            <div className="mt-12 rounded-2xl bg-charcoal-50 p-8">
              <h3 className="font-display text-lg font-bold text-charcoal-900">
                Looking for a price?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-600 text-pretty">
                The quote form asks a few extra questions about your project, so we can come back
                with a more accurate number first time.
              </p>
              <a href="/quote" className="btn-primary mt-6">
                Request a Free Quote
              </a>
            </div>
          </div>

          {/* ---- Form ---- */}
          <div className="rounded-3xl bg-charcoal-50 p-8 shadow-card sm:p-10">
            <h2 className="text-2xl font-bold text-charcoal-900">Send us a message</h2>
            <p className="mt-2 text-sm text-charcoal-600">
              Fields marked <span className="text-ember-500">*</span> are required.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ContactItem({ label, icon, children }) {
  const icons = {
    phone: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z',
    mail: 'M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75',
    pin: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
    clock: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  }
  return (
    <li className="flex gap-5">
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ember-50 text-ember-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d={icons[icon]} />
        </svg>
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-400">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </li>
  )
}
