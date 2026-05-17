/**
 * Cloudflare / local production build entry.
 * Cloudflare build images (Pages: CF_PAGES, Workers CI: WORKERS_CI) lack
 * Playwright system libraries, so prerender is skipped there. GitHub Actions
 * uses `npm run build` instead.
 */
import { spawnSync } from 'node:child_process'

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: true,
    env: process.env,
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

// Classic Pages sets CF_PAGES=1; Workers Builds (Build + Deploy UI) sets WORKERS_CI=1.
const onCloudflare =
  process.env.CF_PAGES === '1' || process.env.WORKERS_CI === '1'

if (onCloudflare) {
  console.log(
    'Cloudflare CI detected: running static build without Playwright prerender (build image has no browser OS libs).',
  )
  run('npm', ['run', 'build:static'])
} else {
  run('npx', ['playwright', 'install', 'chromium', '--with-deps'])
  run('npm', ['run', 'build'])
}
