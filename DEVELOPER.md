# Developer Guide · دليل المطوّرين

This document explains how the **Perfume / بيرفيوم** app is put together so you can extend it.

## 1. Architecture in one paragraph

The app is a **single-page React app** with **no backend**. A thin data layer
(`src/lib/localApphost.js`) exposes a small entity API (`apphost.entities.<Entity>.create / list /
filter / update / delete / bulkCreate`) backed entirely by **IndexedDB**. Everything the UI needs
is read from and written to the device. Capacitor wraps the built `dist/` into a native Android
WebView. There is no auth, no network calls for app data, and no telemetry.

## 2. Local data layer

| Concern | File |
|---|---|
| Entity API over IndexedDB | `src/lib/localApphost.js` |
| Process-tracker store | `src/lib/indexedDB.js` |
| Headache-log store | `src/lib/headacheLogStore.js` |
| First-run seeding | `src/lib/localSeeder.js` |
| Perfume shard loader | `src/lib/perfumeShards.js` |

### IndexedDB database names

Three separate databases are used. **Renaming any of these orphans existing on-device data** —
that is intentional for a fresh fork, but be aware of it:

- `PerfumAppDB` — main app entities (`src/lib/localApphost.js`)
- `PerfumAppProcessesDB` — process tracker (`src/lib/indexedDB.js`)
- `PerfumHeadacheLogDB` — headache log (`src/lib/headacheLogStore.js`)

The **display name** ("Perfume / بيرفيوم") is separate from these technical ids and is editable
in-app — see `src/lib/useAppName.js` (`APP_NAME_DEFAULTS`). Changing the display name never
touches the database ids.

## 3. Seeding model

`seedAllLocal()` runs the bundled JSON into IndexedDB on first launch, then calls
`seedExamplesLocal()` and `seedAppPreviewLocal()` **last**. The example/preview records are
generated in code (not in JSON), so they always appear regardless of how empty the catalogs are.
`getExpectedSeedCounts()` only drives the progress splash — update it if you change the bundled
data volumes.

Bundled in this edition: the full **notes** catalogue + **accords**, and curated 20-entry
**glossary / wisdom / quotes** sets. Empty by design: **brands, perfumers, perfumes, stories,
symbolism**.

## 4. Notes & images

Notes (`public/seed/notes_builtin.json`) are deduplicated so each **Arabic name** appears once.
Every note points its `image_url` at a single shared placeholder, `/note-icons/default-note.svg`,
so no large per-note image set ships. Replace that one file (or repopulate `image_url` per note)
to add real artwork.

## 5. Internationalisation

The whole UI is bilingual. Language state comes from `src/lib/LanguageContext.jsx`; Arabic renders
RTL. When adding strings, always provide both `en` and `ar`.

## 6. Theming

`src/lib/themeColor.js` defines the selectable brand palettes; `src/lib/theme.js` handles
light/dark. Default brand color and the swatch list are set there.

## 7. Admin (data management)

The in-app admin dashboard lives at `/maestro` (`src/pages/Maestro.jsx` + `src/pages/maestro/*`)
and is gated behind an in-settings toggle. It offers a DB viewer, per-entity editors and bulk-add
tools, plus encrypted backup/restore (`src/lib/backupCrypto.js`).

## 8. Conventions

- Always go through `apphost.entities.*` — never touch IndexedDB directly from components.
- Keep new bundled data small; large catalogs belong in shards, fetched at runtime, not imported.
- Run `npm run lint` and `npm run typecheck` before committing.
