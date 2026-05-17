/**
 * Prerenders key SPA routes into dist/ for crawlers and faster first paint.
 * Run after `vite build` (npm run build).
 */
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const DIST = join(process.cwd(), 'dist')
const PORT = 4173
const PREVIEW_URL = `http://127.0.0.1:${PORT}/`
const VITE_BIN = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url))
const WAIT_MS = process.env.CI ? 120_000 : 30_000

const ROUTES = [
  { path: '/', outFile: 'index.html' },
  { path: '/informativa-privacy', outDir: 'informativa-privacy', outFile: 'index.html' },
]

/** @param {import('node:child_process').ChildProcess} child */
function attachPipeDrain(child) {
  let stderr = ''
  child.stderr?.on('data', (chunk) => {
    stderr += chunk.toString()
  })
  child.stdout?.on('data', () => {
    /* drain stdout so Linux CI does not block when the buffer fills */
  })
  return () => stderr
}

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [VITE_BIN, 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
      {
        cwd: process.cwd(),
        env: process.env,
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    )

    const getStderr = attachPipeDrain(child)

    child.once('error', (err) => {
      reject(err)
    })

    const done = () => resolve({ child, getStderr })

    if (child.pid) {
      done()
    } else {
      child.once('spawn', done)
    }
  })
}

/**
 * @param {string} url
 * @param {import('node:child_process').ChildProcess} preview
 * @param {() => string} getStderr
 * @param {number} timeoutMs
 */
function waitForServer(url, preview, getStderr, timeoutMs) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tick = async () => {
      if (preview.exitCode !== null) {
        const stderr = getStderr()
        reject(
          new Error(
            `vite preview exited with code ${preview.exitCode} before ${url} was ready${stderr ? `\n${stderr}` : ''}`,
          ),
        )
        return
      }

      try {
        const res = await fetch(url)
        if (res.ok) return resolve()
      } catch {
        /* retry */
      }

      if (Date.now() - start > timeoutMs) {
        const stderr = getStderr()
        reject(
          new Error(
            `Preview server did not start at ${url} within ${timeoutMs}ms${stderr ? `\n${stderr}` : ''}`,
          ),
        )
        return
      }

      setTimeout(tick, 300)
    }
    tick()
  })
}

/** @param {import('node:child_process').ChildProcess} child */
function stopPreview(child) {
  return new Promise((resolve) => {
    if (child.exitCode !== null) return resolve()

    const finish = () => resolve()
    child.once('exit', finish)
    child.kill('SIGTERM')

    setTimeout(() => {
      if (child.exitCode === null) child.kill('SIGKILL')
    }, 5000)
  })
}

const { child: preview, getStderr } = await startPreviewServer()

try {
  await waitForServer(PREVIEW_URL, preview, getStderr, WAIT_MS)

  const browser = await chromium.launch()
  const page = await browser.newPage()

  for (const route of ROUTES) {
    const url = `http://127.0.0.1:${PORT}${route.path}`
    await page.goto(url, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('#main-content', { timeout: 10_000 })
    const html = await page.content()
    const outPath = route.outDir
      ? join(DIST, route.outDir, route.outFile)
      : join(DIST, route.outFile)
    if (route.outDir) await mkdir(join(DIST, route.outDir), { recursive: true })
    await writeFile(outPath, html, 'utf8')
    console.log(`Prerendered ${route.path} → ${outPath}`)
  }

  await browser.close()
} finally {
  await stopPreview(preview)
}
