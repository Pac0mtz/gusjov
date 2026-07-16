import express from 'express'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, '..', 'dist')
const PORT = process.env.PORT || 3000

const app = express()
app.set('trust proxy', 1) // Replit sits behind a proxy; needed for rate-limit IPs
app.use(compression())
app.use(express.json({ limit: '64kb' }))

/* ------------------------------------------------------------------ *
 * Mail transport
 *
 * NOTE: the old WordPress site had NO SMTP configured at all -- it fell back
 * to PHP mail(), and its `mailserver_*` options were still WordPress's stock
 * placeholders (mail.example.com / port 110). So there were no credentials to
 * migrate. Fill in .env (see .env.example) and this starts sending.
 *
 * Until then the endpoints still work: submissions are validated, logged to the
 * console and returned as success, so the UI is testable. Nothing is silently
 * dropped -- an unconfigured server says so in the logs.
 * ------------------------------------------------------------------ */
const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      // Port 465 is implicit TLS; 587 upgrades via STARTTLS.
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null

if (smtpConfigured) {
  transporter.verify((err) => {
    if (err) console.error('[smtp] connection failed:', err.message)
    else console.log('[smtp] ready:', process.env.SMTP_HOST)
  })
} else {
  console.warn(
    '[smtp] NOT CONFIGURED — form submissions will be logged to the console, not emailed.\n' +
      '       Copy .env.example to .env and fill in SMTP_HOST / SMTP_USER / SMTP_PASS.',
  )
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8, // 8 submissions per IP per 15 min — generous for humans, useless for bots
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please try again in a few minutes.' },
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const clean = (v, max = 2000) => String(v ?? '').trim().slice(0, max)
const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

function validate(body, required) {
  const errors = []
  for (const f of required) {
    if (!clean(body[f])) errors.push(`${f} is required`)
  }
  const email = clean(body.email)
  if (email && !EMAIL_RE.test(email)) errors.push('email is invalid')
  return errors
}

function renderEmail(kind, data) {
  const rows = Object.entries(data)
    .filter(([, v]) => v)
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:8px 14px;background:#f6f6f5;font-weight:600;color:#3d3a37;
                   text-transform:capitalize;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>
        <td style="padding:8px 14px;color:#211e1b">${escapeHtml(v).replace(/\n/g, '<br>')}</td>
      </tr>`,
    )
    .join('')

  return `<!doctype html>
<html><body style="margin:0;background:#f6f6f5;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
  <div style="max-width:620px;margin:0 auto;padding:24px">
    <div style="background:#151311;border-radius:14px 14px 0 0;padding:22px 26px">
      <h1 style="margin:0;color:#fff;font-size:18px">${escapeHtml(kind)}</h1>
      <p style="margin:6px 0 0;color:#ff7a38;font-size:13px">gusjov.com</p>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:0 0 14px 14px;overflow:hidden">
      ${rows}
    </table>
    <p style="color:#88837b;font-size:12px;margin-top:18px;text-align:center">
      Sent from the gusjov.com website. Reply directly to respond to the customer.
    </p>
  </div>
</body></html>`
}

async function handle(req, res, { kind, required, subject }) {
  // Honeypot: real browsers leave this empty. Pretend success so bots stop retrying.
  if (clean(req.body.company)) {
    console.log('[spam] honeypot triggered, dropped silently')
    return res.json({ ok: true })
  }

  const errors = validate(req.body, required)
  if (errors.length) return res.status(400).json({ error: errors.join(', ') })

  const data = {
    name: clean(req.body.name, 120),
    email: clean(req.body.email, 160),
    phone: clean(req.body.phone, 40),
    subject: clean(req.body.subject, 200),
    service: clean(req.body.service, 120),
    'square feet': clean(req.body.squareFeet, 40),
    timeline: clean(req.body.timeline, 80),
    message: clean(req.body.message, 5000),
  }

  const line = `[${kind}] ${data.name} <${data.email}> ${data.phone} ${data.service}`

  if (!transporter) {
    console.log('--- FORM SUBMISSION (SMTP not configured, not emailed) ---')
    console.log(JSON.stringify(data, null, 2))
    return res.json({ ok: true, warning: 'smtp-not-configured' })
  }

  try {
    await transporter.sendMail({
      // From must be a mailbox the SMTP account is allowed to send as; the
      // customer's address goes in replyTo so hitting reply just works.
      from: `"Gusjov Website" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `${subject} — ${data.name}`,
      html: renderEmail(kind, data),
      text: Object.entries(data)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n'),
    })
    console.log(`${line} — sent`)
    res.json({ ok: true })
  } catch (err) {
    console.error(`${line} — FAILED:`, err.message)
    res.status(500).json({
      error: 'We could not send your message. Please call us on (773) 986-2691.',
    })
  }
}

app.post('/api/contact', limiter, (req, res) =>
  handle(req, res, {
    kind: 'New contact message',
    required: ['name', 'email', 'message'],
    subject: 'New contact message',
  }),
)

app.post('/api/quote', limiter, (req, res) =>
  handle(req, res, {
    kind: 'New quote request',
    required: ['name', 'email', 'phone', 'service'],
    subject: 'New QUOTE request',
  }),
)

app.get('/api/health', (_req, res) => res.json({ ok: true, smtp: smtpConfigured }))

/* ---- static + SPA fallback ---- */
app.use(
  express.static(DIST, {
    // Prerendering puts each route at dist/<route>/index.html, which makes
    // /services look like a directory to serve-static -- and its default is to
    // 301 /services -> /services/. Every canonical this site emits is
    // slash-less, so that default would point every interior page at a URL that
    // redirects away from its own canonical. Off; the catch-all below resolves
    // the route to its index.html without the round trip.
    redirect: false,
    setHeaders(res, filePath) {
      // Hashed build assets are immutable; everything else revalidates.
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      } else if (/\.(jpg|jpeg|png|webp|svg|ico)$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=604800')
      } else {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
      }
    },
  }),
)

/*
 * Client-side routing.
 *
 * `npm run build` prerenders every sitemap route to dist/<route>/index.html, so
 * prefer that file: it carries the page's real title, description, canonical and
 * JSON-LD in the markup, which is what non-JS crawlers and link unfurlers read.
 * express.static above already serves those directly; this is the fallback for
 * anything it missed.
 *
 * Falling back to the bare SPA shell is correct for genuinely unknown URLs --
 * React renders the 404 page client-side, and NotFound sets noindex.
 */
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next()

  const prerendered = path.join(DIST, req.path, 'index.html')
  // Guard against `..` escaping DIST via a crafted path.
  if (prerendered.startsWith(DIST) && existsSync(prerendered)) {
    return res.sendFile(prerendered)
  }
  res.status(404).sendFile(path.join(DIST, 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Gusjov Flooring running on http://0.0.0.0:${PORT}`)
})
