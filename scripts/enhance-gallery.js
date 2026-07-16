/**
 * One-shot: lift contrast/color on gallery full-size JPGs, then regenerate
 * matching .webp and -thumb.{jpg,webp} variants.
 *
 * Destructive — do not run twice on the same files (over-processes).
 * Requires: npm i --no-save sharp
 *
 * Usage: node scripts/enhance-gallery.js
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const galleryRoot = path.join(root, 'public/images/gallery')
const THUMB = 600
const FULL_MAX = 1400

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

function enhance(pipeline) {
  return pipeline
    .normalize({ lower: 1, upper: 99 })
    .modulate({ brightness: 1.05, saturation: 1.14 })
    .linear(1.1, -10)
    .sharpen({ sigma: 0.7, m1: 0.5, m2: 0.3 })
}

async function processBaseJpg(jpgPath) {
  const dir = path.dirname(jpgPath)
  const base = path.basename(jpgPath, '.jpg')
  const webpPath = path.join(dir, `${base}.webp`)
  const thumbJpg = path.join(dir, `${base}-thumb.jpg`)
  const thumbWebp = path.join(dir, `${base}-thumb.webp`)

  const meta = await sharp(jpgPath).metadata()
  const longest = Math.max(meta.width || 0, meta.height || 0)
  const needsResize = longest > FULL_MAX

  let pipeline = sharp(jpgPath).rotate()
  if (needsResize) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? FULL_MAX : undefined,
      height: meta.height > meta.width ? FULL_MAX : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  const enhanced = await enhance(pipeline).jpeg({ quality: 86, mozjpeg: true }).toBuffer()
  await fs.writeFile(jpgPath, enhanced)

  const webpBuf = await sharp(enhanced).webp({ quality: 78 }).toBuffer()
  await fs.writeFile(webpPath, webpBuf)

  const thumbBuf = await sharp(enhanced)
    .resize({ width: THUMB, height: THUMB, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer()
  await fs.writeFile(thumbJpg, thumbBuf)

  const thumbWebpBuf = await sharp(thumbBuf).webp({ quality: 72 }).toBuffer()
  await fs.writeFile(thumbWebp, thumbWebpBuf)

  const outMeta = await sharp(enhanced).metadata()
  console.log(
    `✓ ${path.relative(galleryRoot, jpgPath)} → ${outMeta.width}×${outMeta.height}`,
  )
}

async function main() {
  const all = await walk(galleryRoot)
  const bases = all
    .filter((f) => f.endsWith('.jpg') && !f.includes('-thumb'))
    .sort()

  console.log(`Enhancing ${bases.length} gallery images…`)
  for (const jpg of bases) {
    await processBaseJpg(jpg)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
