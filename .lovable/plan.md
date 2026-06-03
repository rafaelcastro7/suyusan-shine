# Internacionalización del sitio (EN / FR / ES / PT)

Añadir soporte completo de 4 idiomas en todo el sitio público usando `react-i18next`, con detección automática, persistencia y un selector visible en el header.

## Alcance

Idiomas: Inglés (default), Francés, Español, Portugués.
Rutas traducidas: Home, About, Services, Pricing, Gallery, FAQ, Contact, Booking, 404.
Componentes traducidos: SiteHeader (nav), SiteFooter, PricingTable, BookingWizard, FAQ, ServiceAreaMap, ThemeToggle (aria-labels).
Datos traducidos: `services`, `faqs`, `testimonials` (se mueven a archivos de traducción por idioma).

## Implementación

1. **Setup i18n**
   - Instalar `i18next`, `react-i18next`, `i18next-browser-languagedetector`.
   - Crear `src/i18n/index.ts` con configuración: fallback `en`, detección por `localStorage` → `navigator.language`, namespace único `translation`.
   - Importar el setup en `src/router.tsx` para que cargue antes del primer render.

2. **Archivos de traducción**
   - `src/i18n/locales/{en,fr,es,pt}.json` con todas las claves agrupadas por sección: `nav`, `home`, `about`, `services`, `pricing`, `gallery`, `faq`, `contact`, `booking`, `footer`, `common`, `meta` (titles + descriptions por ruta), y arrays `servicesData`, `faqsData`, `testimonialsData`.

3. **Selector de idioma**
   - Nuevo componente `src/components/LanguageSwitcher.tsx`: dropdown con banderas/códigos (EN, FR, ES, PT) usando shadcn DropdownMenu.
   - Insertarlo en `SiteHeader` (desktop + mobile menu) junto al `ThemeToggle`.
   - Al cambiar, `i18n.changeLanguage(code)` y actualizar `<html lang>`.

4. **Refactor de componentes y rutas**
   - Reemplazar strings hardcodeados por `t('clave')` en todos los componentes y rutas listados arriba.
   - `head()` de cada ruta: leer titles/descriptions desde `i18n.t(...)` para que cambien con el idioma activo (vía `useEffect` que invalida el head al cambiar idioma, o usando claves de meta dinámicas en el componente con `document.title` como complemento).
   - `<html lang>` en `__root.tsx` se actualiza dinámicamente.

5. **Datos**
   - `data/services.ts`, `data/faqs.ts`, `data/testimonials.ts`: mantener sólo IDs/iconos/datos no traducibles; el texto se lee con `t('servicesData.<slug>.title')` etc.

6. **JSON-LD**
   - El FAQPage JSON-LD se genera con las preguntas/respuestas del idioma activo.
   - LocalBusiness/Organization permanecen iguales (datos de negocio).

## Notas técnicas

- `react-i18next` es client-side; durante SSR servirá el idioma fallback (`en`). La hidratación cambia al idioma detectado del usuario. Aceptable para esta app.
- El selector persiste en `localStorage` bajo la clave `i18nextLng`.
- No se crean rutas `/fr/...`, `/es/...` — el idioma es un toggle global. Si más adelante se quiere SEO multilingüe por URL, se haría en una segunda iteración.
- Texto dentro de imágenes (Galeria) no se traduce.

## Archivos nuevos

- `src/i18n/index.ts`
- `src/i18n/locales/en.json`, `fr.json`, `es.json`, `pt.json`
- `src/components/LanguageSwitcher.tsx`

## Archivos modificados

- `src/router.tsx`, `src/routes/__root.tsx`
- Todas las rutas en `src/routes/*.tsx`
- `src/components/SiteHeader.tsx`, `SiteFooter.tsx`, `PricingTable.tsx`, `BookingWizard.tsx`, `FAQ.tsx`, `ServiceAreaMap.tsx`
- `src/data/services.ts`, `faqs.ts`, `testimonials.ts` (estructura sin strings)
