/**
 * Static link + asset check for the Gusjov site.
 * Verifies every internal route/hash target and public asset referenced from src/.
 *
 * Run: node scripts/link-check.js
 */
import { readFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { nav, services, site, serviceImages } from '../src/data/site.js'
import { allPhotos, beforeAfterPairs, categories } from '../src/data/gallery.js'
import { googleProfile } from '../src/data/reviews.js'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const routes = new Set(['/', '/about', '/services', '/projects', '/contact', '/quote'])
let problems = 0
const fail = (msg) => {
  problems++
  console.error(`  ✗ ${msg}`)
}
const ok = (msg) => console.log(`  ✓ ${msg}`)

const sitemap = await readFile(path.join(ROOT, 'public/sitemap.xml'), 'utf8')
const sitemapRoutes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
for (const r of sitemapRoutes) {
  if (!routes.has(r)) fail(`sitemap has unknown route ${r}`)
}
for (const r of routes) {
  if (!sitemapRoutes.includes(r)) fail(`sitemap missing ${r}`)
}
ok(`sitemap covers ${sitemapRoutes.length} routes`)

for (const item of nav) {
  if (!routes.has(item.to)) fail(`nav link ${item.to} is not a route`)
}
ok(`nav (${nav.length}) points at real routes`)

for (const s of services) {
  const hashRoute = `/services#${s.slug}`
  if (!serviceImages[s.slug]) fail(`serviceImages missing for ${s.slug}`)
  ok(`service deep link ${hashRoute}`)
}

const asset = (p) => {
  const full = path.join(ROOT, 'public', p.replace(/^\//, ''))
  if (!existsSync(full)) fail(`missing asset ${p}`)
}

asset(site.logo)
asset('/images/brand/gusjov-logo.png')
asset('/robots.txt')
asset('/sitemap.xml')
asset('/site.webmanifest')

for (const img of Object.values(serviceImages)) {
  for (const ext of ['.jpg', '.webp', '-thumb.jpg', '-thumb.webp']) asset(`${img.src}${ext}`)
}
for (const p of allPhotos) {
  asset(p.src)
  asset(p.fallback)
  asset(p.thumb)
  asset(p.thumbFallback)
}
for (const pair of beforeAfterPairs) {
  for (const side of [pair.before, pair.after]) {
    asset(side.thumb)
    asset(side.thumbFallback)
  }
}
ok(`${allPhotos.length} gallery photos + ${beforeAfterPairs.length} before/after pairs have files`)
ok(`${categories.length} gallery categories`)

const externals = [
  site.social.instagram,
  site.social.google,
  googleProfile.url,
  googleProfile.writeReviewUrl,
  'https://webprochicago.com',
].filter(Boolean)

for (const url of externals) {
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(10000) })
    if (!res.ok) fail(`external ${url} → HTTP ${res.status}`)
    else ok(`external ${url} → ${res.status}`)
  } catch (err) {
    fail(`external ${url} → ${err.message}`)
  }
}

// Scan JSX for Link to= / href= patterns that look internal
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) files.push(...(await walk(full)))
    else if (/\.(jsx|js)$/.test(e.name)) files.push(full)
  }
  return files
}

const files = await walk(path.join(ROOT, 'src'))
const hrefRe = /\b(?:to|href)=["'`](\/[^"'`#?]*)/g
for (const file of files) {
  const src = await readFile(file, 'utf8')
  for (const m of src.matchAll(hrefRe)) {
    const p = m[1]
    if (p.startsWith('/api') || p.startsWith('/images') || p.startsWith('/#') || p === '/#main') continue
    if (p.includes('.')) continue // asset-like
    if (!routes.has(p) && p !== '/404') fail(`${path.relative(ROOT, file)} links to unknown path ${p}`)
  }
}
ok('no broken internal path strings in src/')

console.log(problems ? `\n${problems} problem(s) found.` : '\nAll link checks passed.')
process.exit(problems ? 1 : 0)
