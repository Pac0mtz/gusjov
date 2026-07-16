# Gusjov Flooring Services — React + Vite + Tailwind

A rebuild of gusjov.com (previously WordPress + Astra + Elementor) as a React SPA
with an Express mail backend. Ready to upload to Replit.

---

## Quick start

```bash
npm install
cp .env.example .env     # then fill in SMTP — see "Email" below
npm run dev              # Vite dev server on :5173, proxies /api to :3000
npm run serve            # production: build + serve on :3000
```

On **Replit**: import the folder, press **Run**. `.replit` already runs
`npm run serve` and maps port 3000 to the web preview.

---

## Read this first: what came across, and what did not

The old WordPress database was mined directly (`wp_posts` / `wp_postmeta`,
`_elementor_data`). What it turned out to contain:

**Real content — carried over verbatim:**

- Company name, tagline "Great Prices, Honest Service & Stunning Results"
- Phone **(773) 986-2691**, email **info@gusjov.com**
- The six services and their descriptions (home page icon boxes)
- The stat counters: 87+ clients, 12 years, 230+ projects
- The welcome / specialization / consultation copy
- 20 genuine job photos

**Astra demo filler — deliberately NOT carried over:**

The About, Services, Projects and Contact pages (WordPress IDs 71–74) were never
edited after the Astra starter template was installed. They still described an
**architecture firm**, not a flooring company:

| What the old site said | Reality |
| --- | --- |
| "125, Central Square, New York, NY 286" | Template default. Not your address. |
| "1176 Saint Francis Way, Portland Oregon" | A different template's default. |
| `info@example.com`, `91 123-456-7890` | Template defaults. |
| Team: Juan George, Sean Hart, Emma Kelly | Template stock people. |
| Projects: NY Water Park, Sky Tail Tower | Template case studies. |
| Testimonials: John Doe, Martha Stylar | Template reviews. |
| Services: Landscape Design, Site Planning | Not services you offer. |
| "Mon-Fri: 10AM-5PM" | Template default hours. |
| Pricing packages | Template prices. |
| Lorem ipsum throughout | — |

None of it was yours, so none of it was copied. Invented addresses, fake reviews
and stock team photos actively damage local SEO (and fake reviews carry FTC
exposure), so the gaps were left open and marked instead.

**Search the code for `TODO(gusjov)` to find every gap.** Each one says exactly
what is missing and where to put it. The main ones:

1. `src/data/site.js` → `hours` — real opening hours (currently `null`, so the
   hours block simply does not render).
2. `src/data/site.js` → `social` — real Facebook/Instagram/Google profile URLs.
3. `src/pages/About.jsx` — a real team section, if you want one.
4. `src/pages/Services.jsx` — real pricing, if you want a pricing table.
5. `src/pages/Projects.jsx` — real case studies with client permission.
6. `src/components/Footer.jsx` — licence/insurance details, if you hold them.

The About page copy was written from your verified facts only (12 years, 230+
projects, 87+ clients, the supplier-quality claim, the six services). It invents
no history, awards or staff. Read it and make it sound like you.

---

## Email (contact + quote forms)

**The old site had no SMTP at all.** No SMTP plugin was installed, and the stored
mail settings were still WordPress's untouched placeholders
(`mail.example.com` / `login@example.com` / port 110). WPForms was falling back
to PHP `mail()`, which on shared hosting is why enquiries often land in spam or
vanish. **There were no credentials to migrate — you must supply them.**

Until you do, the forms still work: submissions are validated and printed to the
server console, and the server logs a loud warning at boot. Nothing is silently
dropped.

To turn mail on, set these (on Replit use the **Secrets** tab, not a file):

| Variable | Hostinger (recommended — your domain is already hosted there) | Gmail |
| --- | --- | --- |
| `SMTP_HOST` | `smtp.hostinger.com` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` | `465` |
| `SMTP_USER` | `info@gusjov.com` | your Gmail address |
| `SMTP_PASS` | mailbox password (hPanel → Emails) | a 16-char **App Password** |
| `MAIL_FROM` | `info@gusjov.com` | your Gmail address |
| `MAIL_TO` | where enquiries land | — |

Gmail requires an App Password (<https://myaccount.google.com/apppasswords>),
not your account password. Prefer the Hostinger option: mail then comes *from*
your own domain, which lands in the inbox far more reliably.

Check it worked: `curl localhost:3000/api/health` → `{"ok":true,"smtp":true}`.

**Never commit `.env`.** It is gitignored.

---

## Photo gallery

`public/images/gallery/<category>/` — sorted by **looking at every photo**, not
by filename:

| Category | Photos | What it is |
| --- | --- | --- |
| `hardwood-refinishing` | 13 | Red oak sanding, staining, polyurethane |
| `staircases` | 3 | Dark-stained treads, curved staircases |
| `laminate-flooring` | 3 | Basement laminate plank |
| `hardwood-installation` | 1 | Engineered hardwood hallway |

Every image is real Gusjov work. The stock photos and architecture-template
images from the old media library were left behind. Each photo exists as WebP +
JPEG at 1400px (`<slug>.webp`) and 600px (`<slug>-thumb.webp`). The media library
went from **98 MB → 17 MB**.

To add photos: drop the four files into a category folder and add an entry to
`src/data/gallery.js`. Write a real `alt` describing the actual floor — it is
both accessibility and image SEO.

---

## Google reviews

The 13 five-star reviews on the Google Business Profile ("Gusjov Floors Co.")
are reproduced on the site: three on the home page, all ten that have text on
the About page, with your replies.

They live in `src/data/reviews.js`, copied verbatim — typos, emoji and all.
**Do not tidy, shorten or write them.** They are real customers' words, they are
checkable against the profile one click away, and inventing or editing
testimonials is both an FTC matter and the fastest way to lose the profile.

To refresh: open the profile, re-read the reviews, update the file and its
`capturedOn` date. It is a manual step because there is no Google Places API key
wired up. If you want it automated, a key plus a build step against the Places
API (`place_id: ChIJGS_XOP26M2kR6XiA6b3WL0M`) would do it — but note Places only
ever returns **five** reviews, fewer than the ten sitting in the file today.

### Why there is no star rating in the search results

There is deliberately **no `aggregateRating` or `review` JSON-LD** on this site,
and adding it will not put stars next to gusjov.com in Google.

Since 2019 Google ignores "self-serving" review markup — a review of a business
hosted on that business's own website. `LocalBusiness` and `Organization` are
explicitly excluded from review rich results for exactly this case. So marking
these up earns nothing, while asserting a rating Google cannot verify is how
sites collect a *spammy structured markup* manual action.

The stars you want in search come from the Business Profile itself, which
already has them. The reviews on the site are there to persuade the human
reading the page. See the note at the top of `src/components/Seo.jsx`.
<https://developers.google.com/search/docs/appearance/structured-data/review-snippet>

## Technical SEO

- **Every route prerendered to static HTML** at build time — the head is in the
  markup, not assembled by JS (see below)
- Per-route `<title>`, meta description, canonical and Open Graph/Twitter tags
  (`src/components/Seo.jsx`)
- Real opening hours (`openingHoursSpecification`) and `sameAs` links to the
  Google Business Profile and Instagram, both verified against the live profiles
- Unknown URLs return a real **404**, not a soft-200 SPA shell
- JSON-LD: `HomeAndConstructionBusiness`, `WebSite`, `Service` × 6,
  `ImageGallery`, `ContactPage`, and `BreadcrumbList` on every interior page
- **Service-area business schema — no street address.** Correct for an on-site
  contractor, and honest: you do not have a published address. `areaServed` is
  Chicago + Cook County + suburbs, with `geo.region` `US-IL`.
- `sitemap.xml` (6 routes) and `robots.txt` in `public/`
- Semantic landmarks, skip-to-content link, real `alt` on every image,
  `aria-*` on the nav/gallery/forms, visible focus rings, reduced-motion support
- Explicit `width`/`height` on images to prevent layout shift (CLS)
- WebP with JPEG fallback, `loading="lazy"` below the fold,
  `fetchpriority="high"` on the hero
- Route-level code splitting; immutable cache headers on hashed assets

### Prerendering (this used to be the caveat)

`npm run build` now renders every route to static HTML before it ships, so the
markup a crawler downloads already contains that page's title, description,
canonical and JSON-LD — no JavaScript required. This closed a real hole: the
Express fallback previously served the identical `index.html` for every URL, so
`/services` and `/about` went out carrying the **home page's** title and no
structured data at all. Link unfurlers (Facebook, iMessage, WhatsApp, Slack),
which never run JS, previewed every shared URL as the home page.

    vite build            → client bundle + dist/index.html
    vite build --ssr      → dist-ssr/entry-server.js  (build-only, never served)
    scripts/prerender.js  → dist/<route>/index.html   (one per sitemap route)

Notes for whoever touches this next:

- Routes come from `public/sitemap.xml`, so the sitemap and the prerendered set
  cannot drift. Add a route there and it gets prerendered.
- The prerender **fails the build** if any route errors. A half-prerendered
  `dist` looks fine locally and serves wrong titles in production.
- `dist-ssr/` deliberately sits outside `dist/`. Inside, `express.static` would
  publish the SSR bundle at `/server/entry-server.js`.
- `npm run seo:audit` checks the built HTML (not the source) for unique titles,
  descriptions, self-referencing canonicals, OG tags and parseable JSON-LD.

### After you deploy

1. Point Google Search Console at the new site; submit `sitemap.xml`.
2. **Set up redirects** if any old WordPress URLs are indexed (`/contact-us/`
   → `/contact`, `/about/` → `/about`). Old links otherwise 404.
3. Validate the structured data: <https://search.google.com/test/rich-results>
4. Claim/refresh the Google Business Profile — for a local contractor that
   outranks almost everything on this list.

---

## Structure

```
gusjov-react/
├── .replit, replit.nix        Replit config (Run → build + serve on :3000)
├── .env.example               SMTP template — copy to .env
├── server/index.js            Express: /api/contact, /api/quote, static, SPA fallback
├── public/
│   ├── images/gallery/<cat>/  Categorised job photos (WebP + JPEG, 2 sizes)
│   ├── images/brand/          Logo + favicons
│   ├── robots.txt, sitemap.xml, site.webmanifest
└── src/
    ├── data/site.js           ← ALL copy and contact details live here
    ├── data/gallery.js        ← Photo manifest + categories
    ├── components/            Navbar, Footer, Seo, Gallery, Form, Bits
    └── pages/                 Home, About, Services, Projects, Contact, Quote, 404
```

`src/data/site.js` is the single source of truth: change the phone number there
and it updates the header, footer, every page and the JSON-LD at once.

---

## Form security

- Honeypot field (`company`) — bots fill it, submissions are dropped silently
- Rate limit: 8 submissions per IP per 15 minutes
- Validation on **both** client and server; HTML-escaped before templating
- 64 kB body cap; `replyTo` set to the customer so replies just work

---

## Verification status

Verified on the origin server:

- ✅ All 21 source files pass an esbuild syntax check
- ✅ All imports resolve; all named/default exports exist
- ✅ All 97 image references resolve to real files on disk
- ✅ Express API exercised end-to-end: valid submissions, validation errors,
  honeypot, `/api/health`, SPA fallback — all behave correctly

Not verified here:

- ⚠️ **`npm run build` has not been run.** The origin shared host (CloudLinux
  LVE) caps threads per user, which kills esbuild's service — a host limit, not
  a code problem. `npm install` needed `--ignore-scripts` for the same reason.
  Replit has no such cap. Run `npm run build` there first; it is expected to
  pass, but it has not been proven.
- ⚠️ Nothing has been rendered in a browser. Check the layout visually on first
  run.
- ⚠️ SMTP sending is untested — there were no credentials to test with.
