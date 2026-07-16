// Post-build SEO check.
//
// Asserts that what actually landed in dist/ is what a crawler needs: a unique
// title and description per route, a self-referencing canonical, indexability,
// Open Graph tags, and valid JSON-LD. It reads the built files rather than the
// source, so it catches the failure mode that matters -- the prerender quietly
// dropping tags -- which reading Seo.jsx would never reveal.
//
// Run: npm run seo:audit   (build first)

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')

const xml = await readFile(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8')
const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)

const pick = (html, re) => (html.match(re)?.[1] ?? '').trim()
const titles = new Map()
const descriptions = new Map()
let problems = 0

const fail = (route, msg) => {
  problems++
  console.error(`  ✗ ${route} — ${msg}`)
}

for (const route of routes) {
  const file = path.join(route === '/' ? DIST : path.join(DIST, route), 'index.html')
  let html
  try {
    html = await readFile(file, 'utf8')
  } catch {
    fail(route, 'not prerendered — no index.html')
    continue
  }

  const title = pick(html, /<title[^>]*>([^<]*)<\/title>/)
  const desc = pick(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/)
  const canonical = pick(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/)
  const robots = pick(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/)
  const ogTitle = pick(html, /<meta[^>]+property="og:title"[^>]+content="([^"]*)"/)
  const ogImage = pick(html, /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/)

  if (!title) fail(route, 'no <title>')
  if (title.length > 60) fail(route, `title is ${title.length} chars (>60 gets truncated in SERPs)`)
  if (!desc) fail(route, 'no meta description')
  if (desc && (desc.length < 70 || desc.length > 160))
    fail(route, `description is ${desc.length} chars (aim for 70–160)`)
  if (!canonical) fail(route, 'no canonical')

  const expected = `https://gusjov.com${route === '/' ? '' : route}`
  if (canonical && canonical !== expected) fail(route, `canonical is ${canonical}, expected ${expected}`)
  if (!/index/.test(robots)) fail(route, `robots is "${robots}" — route should be indexable`)
  if (!ogTitle) fail(route, 'no og:title')
  if (!ogImage) fail(route, 'no og:image')

  // JSON-LD must parse — a syntax error means Google silently ignores the block.
  const blocks = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)]
  if (!blocks.length) fail(route, 'no JSON-LD')
  // A block is either a single node, an array of nodes, or an @graph wrapper.
  const typesIn = (node) =>
    Array.isArray(node)
      ? node.flatMap(typesIn)
      : node?.['@graph']
        ? typesIn(node['@graph'])
        : node?.['@type']
          ? [node['@type']]
          : []

  const types = []
  for (const [, raw] of blocks) {
    try {
      types.push(...typesIn(JSON.parse(raw)))
    } catch (err) {
      fail(route, `invalid JSON-LD: ${err.message}`)
    }
  }

  // The body must be prerendered, not an empty shell.
  const rootHtml = pick(html, /<div id="root">([\s\S]*?)<\/div>\s*<script|<div id="root">([\s\S]*)/)
  if (html.includes('<div id="root"></div>')) fail(route, 'root is empty — not prerendered')
  if (!/<h1[\s>]/.test(html)) fail(route, 'no <h1> in prerendered markup')

  if (titles.has(title)) fail(route, `duplicate title, same as ${titles.get(title)}`)
  titles.set(title, route)
  if (descriptions.has(desc)) fail(route, `duplicate description, same as ${descriptions.get(desc)}`)
  descriptions.set(desc, route)

  console.log(
    `  ${problems ? ' ' : '✓'} ${route.padEnd(10)} ${String(title.length).padStart(2)}ch title · ${String(
      desc.length,
    ).padStart(3)}ch desc · ld+json: ${types.join(', ') || 'none'}`,
  )
}

console.log(
  problems ? `\n${problems} problem(s) found.` : `\nAll ${routes.length} routes pass.`,
)
process.exit(problems ? 1 : 0)
