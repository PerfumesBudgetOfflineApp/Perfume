# Perfume · بيرفيوم

A **local-first, fully offline, bilingual (English / Arabic)** perfume companion — a personal
fragrance journal, collection manager and scent-knowledge base that runs entirely in the
browser and ships to Android via Capacitor.

> **Clean open-source edition.** This is the developer / source-available build. The heavy
> proprietary catalogs (≈130k perfumes, thousands of brands and perfumers, the literary
> story library) have been stripped out. What remains is the **complete working app** plus a
> small, self-explanatory set of example data so you can see exactly how every feature links
> together — and a full notes catalogue to build on.

---

## Highlights · المزايا

- **100% local & offline.** All data lives in the browser's IndexedDB on the device. No
  account, no login, no server, no cloud sync, no tracking. Data never leaves the device.
- **Bilingual everywhere.** Every screen works in both English and Arabic (full RTL support).
- **Personal fragrance journal.** Log daily wears, build a collection, rate bottles, track
  samples, purchases and budget.
- **Scent knowledge base.** A notes catalogue, accords, an editable vocabulary glossary,
  curated wisdom and quotes, and reading/timeline guides — all extendable.
- **Admin panel.** A built-in data-management dashboard (formerly "Maestro") for browsing,
  bulk-adding and editing every entity, plus encrypted local backup/restore.
- **Installable.** Runs as a web app or builds to a native Android package with Capacitor.

## Tech stack · التقنيات

React 18 · Vite · Tailwind CSS · React Router · TanStack Query · IndexedDB (local data layer) ·
Capacitor (Android shell) · shadcn/ui · lucide-react.

---

## Quick start · البدء السريع

```bash
# 1. install
npm install

# 2. run the dev server  ->  http://localhost:5173
npm run dev

# 3. production build  ->  dist/
npm run build
npm run preview
```

### Android (Capacitor)

```bash
npm run build
npx cap sync android
npx cap open android      # opens Android Studio
```

App id: `com.perfume.app` · see `MOBILE_AND_WINDOWS.md` and `WINDOWS_SETUP.md` for platform notes.

---

## How data is seeded · كيف تُزرع البيانات

On first launch the app seeds its bundled JSON into IndexedDB (see `src/lib/localSeeder.js`).

| Source file | Ships in this edition |
|---|---|
| `public/seed/notes_builtin.json` | full notes catalogue (deduplicated, one Arabic name each) |
| `src/data/builtin_database/accords_builtin.json` | accords |
| `public/seed/glossary_builtin.json` | 20 example perfume terms |
| `public/seed/wisdom_builtin.json` | 20 example wisdom entries |
| `public/seed/quotes_builtin.json` | 20 example perfume quotes |
| `public/seed/brands_builtin.json` | empty `[]` |
| `public/seed/perfumers_builtin.json` | empty `[]` |
| `public/seed/perfumes_*` (shards) | removed — `perfumes_manifest.json` lists no shards |
| `public/seed/storiesa_builtin.json` | empty `[]` |

The interlinked **example records** (a "Perfume / بيرفيوم" brand, the "Attarah / عطارة" perfumer,
the "Aaaatr" perfume, a "Perfume Store", the example note "Cheerful / بشاشة", plus an example
glossary term, story, wisdom and quote) are **not** in the JSON — they are created at runtime by
`seedExamplesLocal()` and `seedAppPreviewLocal()`, so they survive even when the catalogs are
empty. They demonstrate how brands -> perfumers -> perfumes -> notes -> stores link together, and
are safe to delete in-app.

### Adding your own catalog

Drop shard files into `public/seed/` and append their filenames to the `shards` array in
`public/seed/perfumes_manifest.json` — the loader is order-independent. Each shard is a
`{ BRAND: [perfume, ...] }` dictionary.

---

## Project layout · بنية المشروع

```
src/
  pages/         route screens (perfumes, explore, shopping, goals, admin...)
  components/    feature + ui components
  lib/           data layer, hooks, theme, seeder, helpers
  data/          accords + tag catalogues, translations
public/
  seed/          bundled JSON seed data
  note-icons/    a single default note image (default-note.svg)
  fonts/         bundled fonts
```

A deeper architecture walkthrough lives in **[`DEVELOPER.md`](./DEVELOPER.md)**.

## Privacy

There is nothing to configure: the app collects nothing, sends nothing, and works with the
network turned off. Clearing the site/app data wipes everything.

## License

See [`LICENSE`](./LICENSE).

---

**PerfumesBudgetOfflineApp**
