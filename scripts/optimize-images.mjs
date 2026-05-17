/**
 * Generates WebP variants, responsive widths, and social icons from JPG assets.
 * Skips work when source files are unchanged (see .cache/image-optimize.json).
 */
import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const CACHE_PATH = join(process.cwd(), '.cache/image-optimize.json')
const CACHE_VERSION = 4
const RESPONSIVE_WIDTHS = [640, 1280]
const PRODUCT_WIDTHS = [400, 800]

async function readCache() {
  try {
    const raw = await readFile(CACHE_PATH, 'utf8')
    return JSON.parse(raw)
  } catch {
    return { hash: '' }
  }
}

async function fileHash(paths) {
  const hash = createHash('sha256')
  for (const p of paths.sort()) {
    try {
      const buf = await readFile(p)
      hash.update(p)
      hash.update(buf)
    } catch {
      hash.update(p)
      hash.update('missing')
    }
  }
  return hash.digest('hex')
}

async function collectSourcePaths(root) {
  const paths = []
  const productsDir = join(root, 'public/images/products')
  const productFiles = await readdir(productsDir).catch(() => [])
  for (const f of productFiles.filter((x) => x.endsWith('.jpg'))) {
    paths.push(join(productsDir, f))
  }
  for (const name of ['hero.jpg', 'tradizione.jpg']) {
    paths.push(join(root, 'public/images', name))
  }
  paths.push(join(root, 'public/favicon.svg'))
  return paths
}

async function jpgToWebp(inputPath, outputPath) {
  await sharp(inputPath).webp({ quality: 82 }).toFile(outputPath)
  console.log(`  webp: ${outputPath}`)
}

async function writeResponsiveVariants(inputPath, basePath, stem) {
  for (const w of RESPONSIVE_WIDTHS) {
    const jpgOut = `${basePath}/${stem}-${w}.jpg`
    const webpOut = `${basePath}/${stem}-${w}.webp`
    await sharp(inputPath).resize(w).jpeg({ quality: 85 }).toFile(jpgOut)
    await sharp(inputPath).resize(w).webp({ quality: 82 }).toFile(webpOut)
    console.log(`  ${stem}-${w}.jpg/webp`)
  }
}

async function convertProductDir(dir) {
  const files = await readdir(dir)
  for (const file of files.filter((f) => f.endsWith('.jpg') && !/-\d+\.jpg$/.test(f))) {
    const input = join(dir, file)
    const stem = file.replace(/\.jpg$/i, '')
    await jpgToWebp(input, join(dir, `${stem}.webp`))
    for (const w of PRODUCT_WIDTHS) {
      await sharp(input).resize(w).jpeg({ quality: 85 }).toFile(join(dir, `${stem}-${w}.jpg`))
      await sharp(input).resize(w).webp({ quality: 82 }).toFile(join(dir, `${stem}-${w}.webp`))
      console.log(`  ${stem}-${w}.jpg/webp`)
    }
  }
}

const root = process.cwd()
await mkdir(join(root, '.cache'), { recursive: true })

const sources = await collectSourcePaths(root)
const nextHash = await fileHash(sources)
const cache = await readCache()

if (cache.hash === nextHash && cache.version === CACHE_VERSION) {
  console.log('Images unchanged — skipping optimize.')
  process.exit(0)
}

console.log('Products…')
await convertProductDir(join(root, 'public/images/products'))

const imagesDir = join(root, 'public/images')
for (const name of ['hero.jpg', 'tradizione.jpg']) {
  const input = join(imagesDir, name)
  const stem = name.replace('.jpg', '')
  await jpgToWebp(input, join(imagesDir, `${stem}.webp`))
  await writeResponsiveVariants(input, imagesDir, stem)
}

const ogSource = join(root, 'public/images/products/spicchiteddi.jpg')
await sharp(ogSource)
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 85 })
  .toFile(join(root, 'public/og-image.jpg'))
console.log('  og-image.jpg (1200x630)')

const faviconSvg = join(root, 'public/favicon.svg')
for (const { size, name } of [
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
]) {
  await sharp(faviconSvg).resize(size, size).png().toFile(join(root, 'public', name))
  console.log(`  ${name} (${size}x${size}, from favicon.svg)`)
}

await writeFile(
  CACHE_PATH,
  JSON.stringify({ version: CACHE_VERSION, hash: nextHash, updatedAt: new Date().toISOString() }, null, 2),
)
console.log('Done.')
