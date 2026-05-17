import { expect, test } from '@playwright/test'

test.describe('Dolci Eoliani smoke', () => {
  test('home loads with hero and ordering section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Pasticceria Eoliana')
    await expect(page.locator('#dolci')).toBeVisible()
    await expect(page.locator('#come-ordinare')).toBeVisible()
    await expect(page.locator('#faq')).toBeVisible()
  })

  test('nav Ordina scrolls to section', async ({ page }) => {
    await page.goto('/')
    await page
      .getByRole('navigation', { name: /navigazione principale/i })
      .getByRole('link', { name: 'Ordina' })
      .click()
    await expect(page.locator('#come-ordinare')).toBeInViewport()
  })

  test('privacy route loads with prerendered content', async ({ request, page }) => {
    const res = await request.get('/informativa-privacy')
    expect(res.ok()).toBeTruthy()
    const html = await res.text()
    expect(html).toContain('Informativa privacy')

    await page.goto('/informativa-privacy')
    await expect(page.getByRole('heading', { name: /informativa privacy/i })).toBeVisible()
  })

  test('product modal opens from catalog', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /apri dettagli/i }).first().click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await dialog.getByLabel('Chiudi').click()
    await expect(dialog).toBeHidden()
  })

  test('FAQ accordion toggles', async ({ page }) => {
    await page.goto('/#faq')
    const firstQuestion = page.locator('#faq-zone-button')
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false')
    await firstQuestion.click()
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true')
    await firstQuestion.click()
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false')
  })

  test('scroll to top button appears and returns to top', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const scrollTop = page.getByRole('button', { name: /torna su/i })
    await expect(scrollTop).toBeHidden()
    await page.locator('#dolci').scrollIntoViewIfNeeded()
    await expect(scrollTop).toBeVisible()
    await scrollTop.click()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50)
  })

  test('unknown route shows 404', async ({ page }) => {
    await page.goto('/pagina-inesistente')
    await expect(page.getByRole('heading', { name: /pagina non trovata/i })).toBeVisible()
  })
})
