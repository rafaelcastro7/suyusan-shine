# 🧪 RUNNING E2E TESTS — Suyusan Shine

Quick reference for running end-to-end tests locally.

---

## ⚡ Quick Start

### 1. Ensure Dev Server is Running
```bash
cd E:\Documents\PROYECTOS\suyusan
npm run dev
# Dev server runs on http://localhost:3000
```

### 2. Run All E2E Tests
```bash
npx playwright test e2e-test-complete.spec.ts
```

**Expected Output:**
```
Running 12 tests using 1 worker

✅ Test 1: should load homepage successfully (993ms)
✅ Test 2: should navigate between all pages (1.9s)
✅ Test 3: should be responsive on mobile (633ms)
✅ Test 4: should be responsive on tablet (764ms)
✅ Test 5: buttons should be clickable (947ms)
✅ Test 6: images should load (1.3s)
✅ Test 7: contact page form elements (1.1s)
✅ Test 8: should handle 404 pages (1.3s)
✅ Test 9: should load within 5s (873ms)
✅ Test 10: no console errors (1.5s)
✅ Test 11: internal links navigation (658ms)
✅ Test 12: layout stability (585ms)

12 passed (15.4s)
```

---

## 🎯 Common Commands

### Run Tests with Specific Reporter
```bash
# List reporter (simple output)
npx playwright test e2e-test-complete.spec.ts --reporter=list

# HTML reporter (detailed report)
npx playwright test e2e-test-complete.spec.ts --reporter=html
# Opens: playwright-report/index.html

# Verbose reporter
npx playwright test e2e-test-complete.spec.ts --reporter=verbose

# JSON reporter
npx playwright test e2e-test-complete.spec.ts --reporter=json > results.json
```

### Run Specific Test
```bash
# Run only the homepage test
npx playwright test -g "should load homepage successfully"

# Run all navigation tests
npx playwright test -g "navigate"
```

### Run Tests in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

### Run Tests with UI Mode (Interactive)
```bash
npx playwright test --ui
```

### Debug Tests
```bash
npx playwright test --debug
# Opens Playwright Inspector for step-by-step debugging
```

### Run Tests with Specific Browser
```bash
# Chromium only
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox

# WebKit (Safari)
npx playwright test --project=webkit

# All browsers
npx playwright test
```

---

## 📊 Test Configuration

**File:** `playwright.config.ts` (if exists) or defaults  
**Test File:** `e2e-test-complete.spec.ts`  
**Base URL:** `http://localhost:3000`  
**Timeout:** 30 seconds per test  
**Workers:** 1 (sequential execution)

---

## ✅ What Each Test Verifies

| Test # | Name | Verifies |
|--------|------|----------|
| 1 | Homepage Load | Page title and hero section visibility |
| 2 | Navigation | All 4 pages (/, /about, /services, /contact) |
| 3 | Mobile Responsive | 375×667px viewport rendering |
| 4 | Tablet Responsive | 768×1024px viewport rendering |
| 5 | Button Interaction | Buttons are enabled and clickable |
| 6 | Image Loading | Images load and are visible |
| 7 | Contact Form | Form elements (input, textarea, select) |
| 8 | 404 Handling | Error page displays gracefully |
| 9 | Performance | Page loads in <5 seconds |
| 10 | Console Errors | No critical JavaScript errors |
| 11 | Internal Links | Navigation links work correctly |
| 12 | Layout Stability | No cumulative layout shift (CLS) |

---

## 🔧 Troubleshooting

### Tests Can't Find Dev Server
**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:3000`

**Solution:**
1. Ensure dev server is running:
   ```bash
   npm run dev
   ```
2. Wait 10 seconds for full startup
3. Verify port 3000 is listening:
   ```bash
   netstat -ano | findstr ":3000"
   ```

### Tests Timeout
**Problem:** `Test timeout of 30000ms exceeded`

**Solution:**
1. Check if page is loading slowly
2. Increase timeout in test file:
   ```typescript
   test('test name', async ({ page }) => {
     // ...
   }, { timeout: 60000 }) // 60 seconds
   ```

### Chromium Not Installed
**Problem:** `PlaywrightError: Chromium binary not found`

**Solution:**
```bash
npx playwright install chromium
```

### Port 3000 Already in Use
**Problem:** `Error: listen EADDRINUSE :::3000`

**Solution:**
1. Change vite.config.ts port to another (e.g., 3001)
2. Or kill process using port 3000:
   ```bash
   netstat -ano | findstr ":3000"
   # Get PID and kill it
   taskkill /PID <PID> /F
   ```

---

## 📈 Performance Metrics

From last test run (2026-06-02):

```
Total Duration:     15.4 seconds
Average per Test:   1.28 seconds
Fastest Test:       Layout Stability (585ms)
Slowest Test:       Navigation (1.9s)
Pass Rate:          100% (12/12)
```

---

## 🚀 CI/CD Integration

### GitHub Actions Example
```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm install -D @playwright/test
      - run: npx playwright install
      - run: npm run dev &
      - run: sleep 10
      - run: npx playwright test e2e-test-complete.spec.ts
```

---

## 📚 Documentation

- **Full Report:** [E2E_TEST_REPORT.md](./E2E_TEST_REPORT.md)
- **Test Source:** [e2e-test-complete.spec.ts](./e2e-test-complete.spec.ts)
- **Port Config:** [vite.config.ts](./vite.config.ts)
- **Playwright Docs:** https://playwright.dev

---

## 💡 Pro Tips

1. **Run tests before commit:**
   ```bash
   npm run dev & npx playwright test && git commit -m "feat: ..."
   ```

2. **Watch specific test:**
   ```bash
   npx playwright test -g "test name" --headed --debug
   ```

3. **Generate coverage report:**
   ```bash
   npx playwright test --reporter=coverage
   ```

4. **Parallel execution (if needed):**
   Edit `playwright.config.ts`:
   ```typescript
   export default {
     workers: 4,  // Run 4 tests in parallel
   }
   ```

---

## 📞 Support

If tests fail:
1. Check [E2E_TEST_REPORT.md](./E2E_TEST_REPORT.md) for detailed test info
2. Run with `--debug` flag for interactive debugging
3. Check dev server is running on port 3000
4. Verify all dependencies: `npm install`
5. Clear Playwright cache: `rm -rf .playwright`

---

**Last Updated:** 2026-06-02  
**Status:** ✅ All tests passing  
**Framework:** Playwright + Chromium
