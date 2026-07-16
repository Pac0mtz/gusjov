import { useState } from 'react'
import { services, site } from '../data/site'

/**
 * Shared form engine for /contact and /quote.
 *
 * Posts JSON to /api/contact or /api/quote. The Express server (server/index.js)
 * validates again and mails via SMTP. The `company` field is a honeypot: real
 * users never see it, bots fill it, and the server silently drops those.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Accepts 10-digit US numbers in any common punctuation, optional +1.
const PHONE_RE = /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

export function ContactForm() {
  return (
    <BaseForm
      endpoint="/api/contact"
      submitLabel="Send Message"
      fields={['name', 'email', 'phone', 'subject', 'message']}
      required={['name', 'email', 'message']}
    />
  )
}

export function QuoteForm() {
  return (
    <BaseForm
      endpoint="/api/quote"
      submitLabel="Request My Free Quote"
      fields={['name', 'email', 'phone', 'service', 'squareFeet', 'timeline', 'message']}
      required={['name', 'email', 'phone', 'service']}
    />
  )
}

function BaseForm({ endpoint, submitLabel, fields, required }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: '',
    squareFeet: '',
    timeline: '',
    message: '',
    company: '', // honeypot
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [serverError, setServerError] = useState('')

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((x) => ({ ...x, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    for (const f of required) {
      if (!values[f]?.trim()) next[f] = 'This field is required.'
    }
    if (values.email && !EMAIL_RE.test(values.email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    if (values.phone?.trim() && !PHONE_RE.test(values.phone.trim())) {
      next.phone = 'Enter a valid phone number, e.g. (773) 986-2691.'
    }
    if (values.message && values.message.length > 5000) {
      next.message = 'Please keep it under 5000 characters.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    if (!validate()) {
      // Move focus to the first invalid control for screen-reader users.
      const first = document.querySelector('[aria-invalid="true"]')
      first?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setServerError(err.message)
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-7 w-7" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-5 text-xl font-bold text-charcoal-900">Thanks — we got your message.</h3>
        <p className="mt-2 text-charcoal-600">
          We will be in touch shortly. If it is urgent, call us on{' '}
          <a href={site.phoneHref} className="font-semibold text-ember-600 hover:underline">
            (773) 986-2691
          </a>
          .
        </p>
      </div>
    )
  }

  const has = (f) => fields.includes(f)

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from humans and assistive tech, irresistible to bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={set('company')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={`field ${errors.name ? 'field-error' : ''}`}
            placeholder="Your name"
            value={values.name}
            onChange={set('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </Field>

        <Field id="email" label="Email" required error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`field ${errors.email ? 'field-error' : ''}`}
            placeholder="you@example.com"
            value={values.email}
            onChange={set('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {has('phone') && (
          <Field id="phone" label="Phone" required={required.includes('phone')} error={errors.phone}>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              className={`field ${errors.phone ? 'field-error' : ''}`}
              placeholder="(773) 000-0000"
              value={values.phone}
              onChange={set('phone')}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
          </Field>
        )}

        {has('subject') && (
          <Field id="subject" label="Subject" error={errors.subject}>
            <input
              id="subject"
              type="text"
              className="field"
              placeholder="What is this about?"
              value={values.subject}
              onChange={set('subject')}
            />
          </Field>
        )}

        {has('service') && (
          <Field id="service" label="Service needed" required error={errors.service}>
            <select
              id="service"
              className={`field ${errors.service ? 'field-error' : ''}`}
              value={values.service}
              onChange={set('service')}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? 'service-error' : undefined}
            >
              <option value="">Select a service…</option>
              {services.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Something else">Something else</option>
            </select>
          </Field>
        )}
      </div>

      {(has('squareFeet') || has('timeline')) && (
        <div className="grid gap-5 sm:grid-cols-2">
          {has('squareFeet') && (
            <Field id="squareFeet" label="Approximate square footage" hint="A rough guess is fine">
              <input
                id="squareFeet"
                type="text"
                inputMode="numeric"
                className="field"
                placeholder="e.g. 800"
                value={values.squareFeet}
                onChange={set('squareFeet')}
              />
            </Field>
          )}
          {has('timeline') && (
            <Field id="timeline" label="When do you need it done?">
              <select id="timeline" className="field" value={values.timeline} onChange={set('timeline')}>
                <option value="">Select a timeframe…</option>
                <option>As soon as possible</option>
                <option>Within a month</option>
                <option>1–3 months</option>
                <option>Just getting prices</option>
              </select>
            </Field>
          )}
        </div>
      )}

      <Field
        id="message"
        label={has('service') ? 'Tell us about the project' : 'Message'}
        required={required.includes('message')}
        error={errors.message}
      >
        <textarea
          id="message"
          rows={5}
          className={`field resize-y ${errors.message ? 'field-error' : ''}`}
          placeholder={
            has('service')
              ? 'Which rooms, what is down now, and anything else we should know…'
              : 'How can we help?'
          }
          value={values.message}
          onChange={set('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
      </Field>

      {status === 'error' && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <button type="submit" className="btn-primary w-full" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <>
            <Spinner /> Sending…
          </>
        ) : (
          submitLabel
        )}
      </button>

      <p className="text-center text-xs text-charcoal-500">
        We use your details only to reply to this enquiry. No marketing lists, ever.
      </p>
    </form>
  )
}

function Field({ id, label, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {required && <span className="ml-0.5 text-ember-500">*</span>}
        {hint && <span className="ml-2 font-normal text-charcoal-400">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
    </svg>
  )
}
