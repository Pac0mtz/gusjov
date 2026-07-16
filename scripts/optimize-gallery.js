/**
 * Recompress gallery assets for faster loading.
 * - Full: max 1200px, webp q68 / jpeg q76
 * - Thumb: max 480px, webp q62 / jpeg q70
 *
 * Requires: npm i --no-save sharp
 * Usage: node scripts/optimize-gallery.js
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const galleryRoot = path.join(root, 'public/images/gallery')
const FULL_MAX = 1200
const THUMB_MAX = 480

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) files.push(...(await walk(full)))
    else files.push(full)
  }
  return files
}

async function optimizeBase(jpgPath) {
  const dir = path.dirname(jpgPath)
  const base = path.basename(jpgPath, '.jpg')
  const webpPath = path.join(dir, `${base}.webp`)
  const thumbJpg = path.join(dir, `${base}-thumb.jpg`)
  const thumbWebp = path.join(dir, `${base}-thumb.webp`)

  const pipeline = sharp(jpgPath).rotate().resize({
    width: FULL_MAX,
    height: FULL_MAX,
    fit: 'inside',
    withoutEnlargement: true,
  })

  const fullJpg = await pipeline
    .clone()
    .jpeg({ quality: 76, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toBuffer()
  await fs.writeFile(jpgPath, fullJpg)

  const fullWebp = await sharp(fullJpg).webp({ quality: 68, effort: 5 }).toBuffer()
  await fs.writeFile(webpPath, fullWebp)

  const thumbBuf = await sharp(fullJpg)
    .resize({
      width: THUMB_MAX,
      height: THUMB_MAX,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: 70, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toBuffer()
  await fs.writeFile(thumbJpg, thumbBuf)

  const thumbWebpBuf = await sharp(thumbBuf).webp({ quality: 62, effort: 5 }).toBuffer()
  await fs.writeFile(thumbWebp, thumbWebpBuf)

  const before = (await fs.stat(jpgPath)).size
  console.log(`✓ ${path.relative(galleryRoot, jpgPath)} (${Math.round(before / 1024)}KB jpg)`)
}

async function main() {
  const bases = (await walk(galleryRoot))
    .filter((f) => f.endsWith('.jpg') && !f.includes('-thumb'))
    .sort()

  console.log(`Optimizing ${bases.length} gallery images…`)
  let beforeTotal = 0
  for (const jpg of bases) {
    // Rough before size of the set
    for (const ext of ['.jpg', '.webp', '-thumb.jpg', '-thumb.webp']) {
      const p = jpg.replace(/\.jpg$/, '') + (ext.startsWith('-') ? ext : ext)
      try {
        beforeTotal += (await fs.stat(path.join(path.dirname(jpg), path.basename(p)))).size
      } catch {
        /* missing variant */
      }
    }
  }

  for (const jpg of bases) await optimizeBase(jpg)

  let afterTotal = 0
  const all = await walk(galleryRoot)
  for (const f of all) {
    if (/\.(jpe?g|webp)$/i.test(f)) afterTotal += (await fs.stat(f)).size
  }

  console.log(
    `Done. Gallery ≈ ${Math.round(afterTotal / 1024 / 1024)}MB (was ~${Math.round(beforeTotal / 1024 / 1024)}MB tracked).`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
