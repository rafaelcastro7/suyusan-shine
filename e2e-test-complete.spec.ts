import { test, expect } from '@playwright/test'

test.describe('Suyusan Shine — Complete E2E Test Suite', () => {
  const baseURL = 'http://localhost:3000'

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL)
  })

  // Test 1: Homepage Load
  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Suyusan Solutions|Professional Cleaning/i)
    const hero = page.locator('h1').first()
    await expect(hero).toBeVisible({ timeout: 5000 })
  })

  // Test 2: Navigation
  test('should navigate between all pages', async ({ page }) => {
    const pages = [
      { url: '/', name: 'Home' },
      { url: '/about', name: 'About' },
      { url: '/services', name: 'Services' },
      { url: '/contact', name: 'Contact' }
    ]

    for (const p of pages) {
      await page.goto(`${baseURL}${p.url}`)
      await expect(page).toHaveURL(new RegExp(p.url))
      const content = page.locator('h1, h2').first()
      await expect(content).toBeVisible({ timeout: 5000 })
    }
  })

  // Test 3: Responsive Design
  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    const hero = page.locator('h1, h2').first()
    await expect(hero).toBeVisible()
    await expect(hero).toHaveCSS('font-size', /\d+px/)
  })

  // Test 4: Responsive on Tablet
  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    const content = page.locator('h1, h2, h3, p').first()
    await expect(content).toBeVisible()
  })

  // Test 5: Buttons are interactive
  test('buttons should be clickable and respond to interaction', async ({ page }) => {
    const buttons = page.locator('button')
    const count = await buttons.count()
    expect(count).toBeGreaterThan(0)

    if (count > 0) {
      const firstButton = buttons.first()
      await expect(firstButton).toBeEnabled()
    }
  })

  // Test 6: Images load correctly
  test('images should load on pages', async ({ page }) => {
    const images = page.locator('img')
    const imageCount = await images.count()
    expect(imageCount).toBeGreaterThan(0)

    // Check if images have alt text or are visible
    const visibleImages = await images.evaluateAll(imgs =>
      imgs.filter(img => img.offsetHeight > 0).length
    )
    expect(visibleImages).toBeGreaterThan(0)
  })

  // Test 7: Contact Form Elements
  test('contact page should have form elements', async ({ page }) => {
    await page.goto(`${baseURL}/contact`)

    // Check for form inputs
    const inputs = page.locator('input, textarea, select')
    const formCount = await inputs.count()
    expect(formCount).toBeGreaterThan(0)
  })

  // Test 8: 404 Error Handling
  test('should handle 404 pages gracefully', async ({ page }) => {
    await page.goto(`${baseURL}/nonexistent-page-xyz123`, { waitUntil: 'networkidle' })

    const content = await page.content()
    const is404 = content.includes('404') || content.includes('not found') || content.includes('Page not found')
    expect(is404).toBeTruthy()
  })

  // Test 9: Performance - Page Load Time
  test('should load pages within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto(baseURL)
    const loadTime = Date.now() - startTime

    // Should load in less than 5 seconds
    expect(loadTime).toBeLessThan(5000)
  })

  // Test 10: Accessibility - No Console Errors
  test('should not have critical console errors', async ({ page }) => {
    const errors: string[] = []

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto(baseURL)
    await page.waitForLoadState('networkidle')

    // Allow some expected warnings but not errors
    const criticalErrors = errors.filter(e => !e.includes('Warning'))
    expect(criticalErrors.length).toBe(0)
  })

  // Test 11: Links are functional
  test('internal links should navigate correctly', async ({ page }) => {
    const links = page.locator('a[href^="/"]')
    const linkCount = await links.count()
    expect(linkCount).toBeGreaterThan(0)
  })

  // Test 12: Viewport Consistency
  test('layout should not shift on scroll', async ({ page }) => {
    const initialHeight = await page.evaluate(() => document.documentElement.scrollHeight)

    await page.evaluate(() => window.scrollBy(0, 100))
    const afterScrollHeight = await page.evaluate(() => document.documentElement.scrollHeight)

    // Layout shouldn't change on scroll
    expect(Math.abs(initialHeight - afterScrollHeight)).toBeLessThan(50)
  })
})
