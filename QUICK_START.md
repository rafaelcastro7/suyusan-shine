# ⚡ QUICK START — Suyusan Shine + UI/UX Pro Max

Everything you need to know, in 60 seconds.

---

## 🚀 Start Both Projects

### Terminal 1: UI/UX Pro Max (Learning Lab)
```bash
cd E:\Documents\PROYECTOS\ui-ux-pro-max
npm run dev
# Opens: http://localhost:5173
```

### Terminal 2: Suyusan Shine (Cleaning Services)
```bash
cd E:\Documents\PROYECTOS\suyusan
npm run dev
# Runs on: http://localhost:3000
```

---

## 🌐 View in Browser

| Project | URL | Port | Status |
|---------|-----|------|--------|
| **UI/UX Pro Max** | http://localhost:5173 | 5173 | ✅ Learning lab with components |
| **Suyusan Shine** | http://localhost:3000 | 3000 | ✅ Cleaning services website |

---

## 🧪 Run Tests (Suyusan Only)

```bash
cd E:\Documents\PROYECTOS\suyusan

# Run all 12 E2E tests
npx playwright test e2e-test-complete.spec.ts

# View HTML report
npx playwright test e2e-test-complete.spec.ts --reporter=html
# Opens: playwright-report/index.html
```

**Expected Result:** ✅ 12 passed in 15.4 seconds

---

## 📊 Port Status

```bash
# Check if ports are in use
netstat -ano | findstr ":3000"   # Suyusan Shine
netstat -ano | findstr ":5173"   # UI/UX Pro Max
```

Both ports should show `LISTENING` ✅

---

## 📁 Project Structure

```
E:\Documents\PROYECTOS\
├── suyusan/
│   ├── src/
│   │   ├── routes/        (4 pages: home, about, services, contact)
│   │   ├── components/    (reusable UI components)
│   │   └── App.tsx
│   ├── e2e-test-complete.spec.ts  (12 E2E tests)
│   ├── vite.config.ts     (port: 3000)
│   ├── E2E_TEST_REPORT.md (test documentation)
│   └── package.json
│
└── ui-ux-pro-max/
    ├── src/
    │   ├── components/    (Button, Card, Badge)
    │   ├── App.tsx        (redesigned landing page)
    │   └── styles/
    ├── vite.config.ts     (port: 5173)
    ├── package.json
    └── LEARN_SKILLS_HERE.md (4-week curriculum)
```

---

## 🎓 Learning Path

### Week 1: Learn Skills (UI/UX Pro Max)
- Master 5 professional web development skills
- Build reusable components (Button, Card, Badge)
- Create glassmorphism designs

### Week 2-4: Apply to Suyusan
- Use learned skills to improve Suyusan
- Test with E2E suite
- Deploy confidently

See: `ui-ux-pro-max/LEARN_SKILLS_HERE.md`

---

## 🧹 Clean Start (If Needed)

```bash
# Suyusan
cd E:\Documents\PROYECTOS\suyusan
npm install          # Reinstall dependencies
npm run dev          # Start dev server

# UI/UX Pro Max
cd E:\Documents\PROYECTOS\ui-ux-pro-max
npm install
npm run dev
```

---

## 📝 Common Tasks

### Add a New Page to Suyusan
1. Create file in `src/routes/` (e.g., `src/routes/Blog/index.tsx`)
2. Add route in `src/App.tsx`
3. Add navigation link
4. Test with E2E suite: `npx playwright test`

### Customize UI/UX Pro Max Design
1. Edit `src/App.tsx` for layout
2. Modify `src/components/` for components
3. Update `tailwind.config.js` for colors
4. Test in browser: http://localhost:5173

### Run Tests
```bash
cd E:\Documents\PROYECTOS\suyusan
npx playwright test e2e-test-complete.spec.ts
```

---

## 🐛 Troubleshooting

### Dev Server Won't Start
```bash
# Kill any existing node processes
taskkill /F /IM node.exe

# Clear cache and reinstall
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Port Already in Use
```bash
# Find process using port 3000
netstat -ano | findstr ":3000"

# Kill the process (replace <PID>)
taskkill /PID <PID> /F
```

### Tests Fail
1. Check dev server is running: `npm run dev`
2. Wait 10 seconds for full startup
3. Run tests: `npx playwright test`
4. Check [E2E_TEST_REPORT.md](./E2E_TEST_REPORT.md)

---

## 📚 Documentation

- **[E2E_TEST_REPORT.md](./E2E_TEST_REPORT.md)** — Complete test documentation
- **[RUNNING_TESTS.md](./RUNNING_TESTS.md)** — How to run E2E tests
- **[LEARN_SKILLS_HERE.md](../ui-ux-pro-max/LEARN_SKILLS_HERE.md)** — Learning curriculum
- **[DUAL_PROJECT_GUIDE.md](../ui-ux-pro-max/DUAL_PROJECT_GUIDE.md)** — Learn→Apply workflow

---

## ✅ Checklist

Before shipping:

- [ ] Both dev servers running
- [ ] No console errors in browser
- [ ] E2E tests all passing (12/12)
- [ ] Changes committed to git
- [ ] Ready to push to GitHub

---

## 🎯 Next Steps

1. **Open browser tabs:**
   - http://localhost:5173 (UI/UX)
   - http://localhost:3000 (Suyusan)

2. **Run E2E tests:**
   ```bash
   cd E:\Documents\PROYECTOS\suyusan
   npx playwright test
   ```

3. **Explore code:**
   - UI/UX components: `src/components/`
   - Suyusan pages: `src/routes/`
   - Styles: `tailwind.config.js`

4. **Make changes & test:**
   ```bash
   # Edit code
   # Changes hot-reload in browser
   # Run tests to verify
   npx playwright test
   ```

---

## 🚀 Deploy

When ready:
```bash
# Build for production
npm run build

# Verify build
npm run preview

# Deploy your way (Vercel, Netlify, Docker, etc.)
```

---

**Last Updated:** 2026-06-02  
**Status:** ✅ Both projects running, all tests passing  
**Ports:** 5173 (UI/UX) + 3000 (Suyusan) — no conflicts
