# Brief — Job 003: Map shell (onX-adjacent) + quiet UI polish

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction.

**Job id:** `003-map-shell-ui-polish`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo (main after job 002 tip `7c61b99` or later). Do not follow an older tmp product URL.  
**Related:** `ac.md` (copy of `AC_MAP_SHELL_UI_POLISH_v0.md`), `PRODUCT_NAV_LOCK_2026-09-23.md` · brand burnt orange · job 001 auth/tabs · job 002 weather stub (do not regress)

## What to build

1. **Map tab (home)** — hunting-GPS feel inspired by onX (not a clone, not feature-parity): interactive map with readable terrain (prefer **satellite/hybrid** as default or easy toggle with standard), **clean spot pins**, restrained overlay chrome, pan/zoom, tap pin → spot detail / create-pin flow already in product. Feels like a field map, not a marketing dashboard.
2. **Global UI quieting** — reduce tacky / busy chrome across Map, Logs, Guide, You, auth: simpler surfaces, less visual noise, fewer competing borders/gradients/shadows, calmer typography hierarchy. Burnt-orange brand stays as **refined accents** (CTAs, active tab, key pins), not loud full-bleed orange panels.

## Research

- Beau (2026-09-23 evening CT via Finley): likes weather stub; map should *slightly* resemble onX interactive map; overall UI feels tacky → wants very simple quieter chrome.
- Keep existing product locks unless overridden: tabs **Map | Logs | Guide | You**, Map default home, multi-user iOS, Apple+email auth unchanged.
- Brand tokens (locked earlier): `primary #BF5700`, `onPrimary #FFFFFF`, `primaryMuted #F5E6D8`, `primaryPressed #9A4600`.
- Prefer stock **Expo / react-native-maps** (Apple Maps on iOS). No paid Mapbox/Google Maps SDK keys in this job unless already in repo without new spend.
- Unknown: exact topo tiles — if Apple Maps has no true topo, **satellite/hybrid + clean pins** satisfies the onX-*feel* bar for this job; do not invent a paid topo provider.

## Acceptance criteria

### Map shell
- [ ] Map remains default tab after sign-in
- [ ] Map supports pan + zoom; spots render as **clean, readable pins** (not oversized cartoon markers)
- [ ] Default map style is **satellite or hybrid**, OR a one-tap control toggles Standard ↔ Satellite/Hybrid without leaving the Map tab
- [ ] Overlay chrome is minimal (thin top/bottom bars or floating controls); no dense toolbars stacked on the map
- [ ] Tap existing pin → existing spot detail path still works
- [ ] Drop/create pin (or existing create-spot entry) still works; lat/lng still saved
- [ ] Empty state (no spots) is calm: short copy + one primary action, not a busy illustration cluster

### Quiet UI (app shell)
- [ ] Tab bar: simple labels/icons; active state uses burnt-orange accent; inactive muted; no heavy fills
- [ ] Screens (Logs list, hunt detail/create, Guide chat, You, auth): reduced visual noise — prefer white/near-white or soft neutral backgrounds, clear spacing, one accent color for primary actions
- [ ] Avoid: loud gradients, thick multi-color borders, overly rounded “toy” cards stacked everywhere, competing primary buttons on one screen
- [ ] Burnt orange appears mainly on primary CTA, active tab, and map pin accent — not as full-screen background
- [ ] Guide remains secondary (not home); weather one-liner / unavailable from job 002 still renders null-safe

### Hygiene
- [ ] No new paid APIs, no live weather, no auth/BaaS changes, no new secrets in repo
- [ ] No paid map APIs and no new Mapbox or Google Maps keys
- [ ] No Guide memory and no onX feature-parity
- [ ] This public job tree stays free of secrets
- [ ] iOS Simulator: Map tab usable; pins visible on hybrid/satellite
- [ ] No regressions to sign-in / session / user-scoped data

## User-facing UI

- **Map:** full-bleed map, restrained floating controls (style toggle and/or “+ spot” only), clean pins, light sheet or nav push for spot detail
- **Logs / Guide / You / Auth:** quieter lists and forms; primary buttons in `#BF5700` with white label; secondary actions as text or outline

## Payments and auth

- Payments: none. Do not invent spend.
- Auth: unchanged
- Maps: use free/bundled Apple Maps via existing Expo maps stack; **no new API keys**

## Out of scope

- onX clone or feature-parity (offline topo packs, private property layers, wind/weather overlays, track recording, ranging tools, multi-layer hunt plans)
- Paid Mapbox / Google Maps / custom tile servers requiring keys or spend
- New Mapbox or Google API keys
- Live weather / provider swap
- Guide memory / new Guide intents
- BaaS / auth provider changes
- New tabs or renaming Map away from home
- App Store submit, Android visual polish as a goal (don’t break Android project if present)
- Rebrand / rename app
- Secrets of any kind in this public job tree

## Constraints

- Keep the change small and mostly presentation + Map shell; match existing Expo Router structure
- Add or update a short UI checklist in the job notes; screenshot-friendly acceptance for tester/ui workers
- Lane (Mobile) may attach iOS repro notes — fold gaps via Finley, no parallel App Desk coding
- Hard hygiene: no paid map APIs, no new Mapbox/Google keys, no live weather, no auth/BaaS changes, no Guide memory, no onX feature-parity, no secrets in this public job tree

## Design intent (one line)

Field tool, not toy: calm chrome, map-first, orange as accent.
