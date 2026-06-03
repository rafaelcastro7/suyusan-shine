import { test, expect } from '@playwright/test'

const baseURL = 'http://localhost:3000'

test.describe('Suyusan 2026 — New Routes', () => {
  test('booking page loads with wizard', async ({ page }) => {
    await page.goto(`${baseURL}/booking`)
    await expect(page).toHaveURL(/\/booking/)
    await expect(page.locator('h1')).toBeVisible()
    // Service step options present
    await expect(page.getByText('Home Cleaning')).toBeVisible()
    await expect(page.getByText('Deep Clean')).toBeVisible()
  })

  test('pricing page shows tiers and rates', async ({ page }) => {
    await page.goto(`${baseURL}/pricing`)
    await expect(page).toHaveURL(/\/pricing/)
    await expect(page.locator('h1')).toBeVisible()
    // Starting rate visible
    await expect(page.getByText(/\$119/).first()).toBeVisible()
    await expect(page.getByText('Most popular')).toBeVisible()
  })

  test('faq page shows accordion and map', async ({ page }) => {
    await page.goto(`${baseURL}/faq`)
    await expect(page).toHaveURL(/\/faq/)
    await expect(page.locator('h1')).toBeVisible()
    // An FAQ question is present
    await expect(page.getByText(/Are you insured and bonded/i)).toBeVisible()
    // Service area iframe (map) is present
    await expect(page.locator('iframe')).toBeVisible()
  })
})

test.describe('Suyusan 2026 — Booking Wizard Flow', () => {
  test('completes a home cleaning booking with live quote', async ({ page }) => {
    await page.goto(`${baseURL}/booking`)

    // Step 0: pick Home Cleaning
    await page.getByText('Home Cleaning').click()
    await page.getByRole('button', { name: /Continue/i }).click()

    // Step 1: pick a size
    await page.getByText('3 bedrooms').click()
    // Live quote should now be visible
    await expect(page.getByText('Estimated quote')).toBeVisible()
    await page.getByRole('button', { name: /Continue/i }).click()

    // Step 2: pick frequency
    await page.getByText('Bi-weekly').click()
    await page.getByRole('button', { name: /Continue/i }).click()

    // Step 3: pick date
    await page.locator('input[type="date"]').fill('2026-07-15')
    await page.getByRole('button', { name: /Continue/i }).click()

    // Step 4: details
    await page.locator('input[placeholder="Your name"]').fill('Test User')
    await page.locator('input[placeholder="you@email.com"]').fill('test@example.com')
    await page.getByRole('button', { name: /Confirm booking/i }).click()

    // Success state
    await expect(page.getByText(/Booking request received/i)).toBeVisible()
  })
})

test.describe('Suyusan 2026 — Dark Mode', () => {
  test('theme toggle flips the dark class and persists', async ({ page }) => {
    await page.goto(baseURL)
    await page.setViewportSize({ width: 1280, height: 900 })

    const before = await page.evaluate(() => document.documentElement.classList.contains('dark'))

    // Only the hydrated toggle exposes this label (SSR renders "Toggle theme"),
    // so waiting for it guarantees React has attached the click handler.
    const toggle = page.getByRole('button', { name: /Switch to (dark|light) mode/i }).first()
    await expect(toggle).toBeVisible()
    await toggle.click()

    // Class should have flipped
    await expect.poll(() =>
      page.evaluate(() => document.documentElement.classList.contains('dark'))
    ).toBe(!before)

    // And persisted to sessionStorage
    const stored = await page.evaluate(() => sessionStorage.getItem('theme'))
    expect(stored === 'dark' || stored === 'light').toBeTruthy()
  })
})

test.describe('Suyusan 2026 — Gallery Lightbox', () => {
  test('opens lightbox and navigates', async ({ page }) => {
    await page.goto(`${baseURL}/gallery`)
    // Gate on hydration: the toggle's hydrated label only appears once React attaches handlers.
    await expect(page.getByRole('button', { name: /Switch to (dark|light) mode/i }).first()).toBeVisible()
    // Click the first gallery card (onClick lives on the card wrapper)
    await page.locator('section .cursor-pointer').first().click()
    // Lightbox open → close button present
    const close = page.getByRole('button', { name: 'Close lightbox' })
    await expect(close).toBeVisible()
    // Counter present
    await expect(page.getByText('1 / 15')).toBeVisible()
    // Next button advances
    await page.getByRole('button', { name: 'Next image' }).click()
    await expect(page.getByText('2 / 15')).toBeVisible()
    // Esc closes
    await page.keyboard.press('Escape')
    await expect(close).not.toBeVisible()
  })
})

test.describe('Suyusan 2026 — Header navigation', () => {
  test('header links reach pricing and faq', async ({ page }) => {
    await page.goto(baseURL)
    await page.setViewportSize({ width: 1280, height: 900 })

    await page.getByRole('link', { name: 'Pricing', exact: true }).first().click()
    await expect(page).toHaveURL(/\/pricing/)

    await page.getByRole('link', { name: 'FAQ', exact: true }).first().click()
    await expect(page).toHaveURL(/\/faq/)
  })
})
