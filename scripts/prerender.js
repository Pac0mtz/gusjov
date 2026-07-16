// Build-time prerender.
//
// THE PROBLEM THIS SOLVES: this is a client-rendered SPA, and the Express
// fallback hands the identical index.html to every URL. So before this script
// existed, /services, /about and /contact all served the Home page's <title>,
// the Home page's description and zero JSON-LD. Everything Seo.jsx carefully
// builds -- canonicals, per-page meta, LocalBusiness, breadcrumbs -- only
// appeared after React booted.
//
// Googlebot does render JS eventually, so the pages were not invisible, but:
//   - rendering is a second, queued pass; the first pass sees the wrong title
//   - Bing and most other crawlers are far weaker at it
//   - Facebook / iMessage / WhatsApp / LinkedIn / Slack unfurlers do not run JS
//     at all, so every shared link previewed as the Home page regardless of
//     which page was shared
//
// This walks each route, renders it to real HTML with the correct <head>, and
// writes dist/<route>/index.html. The client then hydrates it.
//
// Routes are derived from the sitemap so the two cannot drift apart.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const DIST = path.join(ROOT, 'dist')

// The SSR bundle lives OUTSIDE dist on purpose. Inside it, express.static
// would happily serve the whole thing at /server/entry-server.js -- build-only
// code, published and crawlable, for no reason.
const { render } = await import(path.join(ROOT, 'dist-ssr', 'entry-server.js'))

/** Read the routes out of the sitemap so it stays the single source of truth. */
async function routesFromSitemap() {
  const xml = await readFile(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8')
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (!locs.length) throw new Error('No <loc> entries found in public/sitemap.xml')
  return locs.map((loc) => new URL(loc).pathname)
}

const template = await readFile(path.join(DIST, 'index.html'), 'utf8')

if (!template.includes('<div id="root"></div>')) {
  throw new Error(
    'dist/index.html no longer contains <div id="root"></div> — prerender injection point is gone.',
  )
}

const routes = await routesFromSitemap()
let failed = 0

for (const route of routes) {
  try {
    const { html, helmet } = await render(route)

    // Helmet's tags replace the static fallbacks in index.html. Without this the
    // prerendered page would carry the Home <title> in the markup and only fix
    // itself once React hydrated — the exact bug we are removing.
    // `priority` MUST come first and MUST NOT be dropped. Seo.jsx renders
    // <Helmet prioritizeSeoTags>, which moves the tags that matter most --
    // title, description, canonical, the og:* set -- out of .meta/.link and
    // into .priority. Omit it and the prerendered head silently loses its
    // canonical, its description and every Open Graph tag, which is worse than
    // not prerendering at all.
    const head = helmet
      ? [
          helmet.priority.toString(),
          helmet.title.toString(),
          helmet.meta.toString(),
          helmet.link.toString(),
          helmet.script.toString(),
        ]
          .filter(Boolean)
          .join('\n    ')
      : ''

    const htmlAttrs = helmet?.htmlAttributes?.toString() ?? ''

    const page = template
      // Drop the static <title>/<description> fallbacks; Helmet supplies real ones.
      .replace(/<title>[\s\S]*?<\/title>\s*/, '')
      .replace(/<meta\s+name="description"[\s\S]*?\/>\s*/, '')
      .replace('</head>', `  ${head}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      // Helmet emits its own lang, so swap the tag wholesale rather than append
      // — otherwise the output is <html lang="en" lang="en">.
      .replace('<html lang="en">', htmlAttrs ? `<html ${htmlAttrs}>` : '<html lang="en">')

    const outDir = route === '/' ? DIST : path.join(DIST, route)
    await mkdir(outDir, { recursive: true })
    await writeFile(path.join(outDir, 'index.html'), page)

    const title = (helmet?.title?.toString() ?? '').replace(/<[^>]*>/g, '')
    console.log(`  ✓ ${route.padEnd(12)} ${title.slice(0, 62)}`)
  } catch (err) {
    failed++
    console.error(`  ✗ ${route} — ${err.message}`)
  }
}

if (failed) {
  // Fail the build. A half-prerendered dist is worse than none: the routes that
  // silently fell back to the SPA shell would look fine locally and serve the
  // wrong title in production.
  console.error(`\nPrerender failed for ${failed} route(s).`)
  process.exit(1)
}

console.log(`\nPrerendered ${routes.length} routes.`)
