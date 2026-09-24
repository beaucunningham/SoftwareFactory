# Brief — Job 004: Map system (spots on Map)

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction.

**Job id:** `004-map-system`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo (main after job 003 tip `26b09c5` or later). Do not follow an older tmp product URL.  
**Build on:** Job 003 map shell (hybrid default, style pill, quiet chrome, SpotMap pins). Do not regress.  
**Related:** `ac.md` (copy of `AC_MAP_SYSTEM_v0.md`), `PRODUCT_NAV_LOCK_2026-09-23.md`, job 003 brief (accepted) · brand burnt orange · job 001 auth/tabs · job 002 weather stub (do not regress)

## What to build

A **real map system** Beau can feel on iOS: the Map tab is unmistakably home and usable; every saved spot appears as a selectable pin; pin drop / create is solid end-to-end; empty and multi-pin states stay calm; keep a minimal style foundation (hybrid/satellite + standard toggle from 003 — no paid topo).

This job is **behavior + map data wiring**, not another visual-only polish pass. Job 003 shipped chrome; Job 004 makes spots the system of record on the map.

## Research

- Beau (via Finley, after 003): wants a real map system; he also couldn’t see Map on his own Simulator (Lane owns that repro path separately — factory still must make Map tab reliably present as default home).
- Job 003 accepted: hybrid default, style control, quiet UI, pins present — extend, don’t replace.
- Spots entity already exists (name, lat/lng, private, attach to hunts). Map must reflect user-scoped spots only.
- No true Apple topo; hybrid/satellite + clean pins remains the terrain bar. Stub-friendly (local spot store OK).

## Acceptance criteria

### Map tab reliability
- [ ] After sign-in, **Map tab is visible** in the tab bar and is the **default selected** tab (Map | Logs | Guide | You unchanged)
- [ ] Map screen shows a live map surface (not a blank/placeholder that hides the map) on iOS Simulator after a normal sign-in path
- [ ] Job 003: hybrid (or satellite) default **and** style control still work; quiet chrome / ≤~2 floating controls preserved

### Spots visible + selectable
- [ ] All non-archived spots for the signed-in user render as pins at their lat/lng
- [ ] Pins update when a spot is created, edited (coords/name), or archived/deleted (pin removed or hidden)
- [ ] Tap pin → selects it (clear selected state) and opens existing spot detail (sheet or push)
- [ ] If multiple pins on screen, only one selected at a time; selection chrome is calm (accent ring / small callout — not loud)

### Pin drop / create (solid)
- [ ] Primary “add spot” control on Map starts create flow
- [ ] User can set location by **long-press / drop pin on map** (or equivalent explicit drop) → lat/lng filled
- [ ] Create requires name + valid lat/lng; cancel leaves no orphan pin
- [ ] Save creates spot scoped to current user; new pin appears on Map without app restart
- [ ] Optional: after save, map animates/centers on the new pin

### Camera / empty / many pins
- [ ] **Empty state:** no spots → calm copy + one primary “Add spot” (map still visible underneath or as backdrop — not a dead white screen that hides Map)
- [ ] **With spots:** on Map focus, camera fits or centers so pins are findable (fit-to-pins or center on most recent / user region — pick one, document in build notes)
- [ ] User can still pan/zoom freely after initial camera

### Minimal layer / style foundation
- [ ] Keep Standard ↔ Hybrid/Satellite control from 003
- [ ] No additional paid layers; optional single free foundation only if zero new keys (e.g. none beyond Apple Maps). Prefer **no new tile sources** this job

### Cross-surface (minimal)
- [ ] Spot list (if present under Map or Spots entry) stays in sync with map pins for the same user
- [ ] Hunt create “pick spot” still lists user spots; picking a spot does not break Map pins
- [ ] Jobs 001–002 behaviors unchanged (auth, weather stub null-safe)
- [ ] Job 003 map shell still passes: hybrid default, style pill, quiet chrome, SpotMap pins

### Hygiene
- [ ] No paid map APIs and no new Mapbox or Google Maps keys
- [ ] No live weather API and no weather provider swap
- [ ] No auth or BaaS changes
- [ ] No Guide memory and no new Guide intents
- [ ] No onX feature-parity
- [ ] No new secrets or API keys in the repo
- [ ] This public job tree stays free of secrets
- [ ] iOS-first; Cloud Agents only for code
- [ ] Do not invent spend

## User-facing UI

- Map home: full-bleed map, style pill, add-spot control, clean pins, selected pin affordance, calm empty state
- Spot create: name + map drop/confirm coordinates + save/cancel
- Spot detail: unchanged path from pin tap; show name + coords at minimum

## Payments and auth

- Payments: none. Do not invent spend.
- Auth: unchanged
- Maps: Apple Maps via the existing Expo maps stack only. No new API keys.

## Out of scope

- Live weather / paid weather
- Paid Mapbox/Google/custom topo; onX parity (property lines, tracks, ranging, offline packs, wind layers)
- New Mapbox or Google API keys
- Auth / BaaS / multi-device sync beyond current local stub
- Guide memory or new Guide intents
- Clustering, heatmaps, trail recording, sharing public spots
- Fixing Beau’s personal Simulator install issues (Lane repro) except ensuring product AC above (Map visible as default tab with live map)
- Secrets of any kind in this public job tree

## Constraints

- Build on Job 003 components (`SpotMap`, style pill, tokens); small focused PR
- Do not regress the Job 003 map shell (hybrid default, style pill, quiet chrome, SpotMap pins)
- Document camera policy (fit vs center) in job `build.md`
- Tester/ui: Simulator checklist for empty → create via drop → pin appears → tap detail → second spot → both visible
- Lane may add Mobile notes; gaps → Finley → Kai
- Hard hygiene: no paid map APIs, no new Mapbox/Google keys, no live weather, no auth/BaaS changes, no Guide memory, no onX feature-parity, no secrets in this public job tree

## Design intent (one line)

Map is where spots live: drop, see, select — field-ready, still quiet.
