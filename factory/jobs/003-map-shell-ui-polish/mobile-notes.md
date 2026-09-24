# Mobile notes — Job 003 Map shell + quiet UI (iOS / Expo Simulator)

## Meta

| | |
|---|---|
| **Author** | Lane (Mobile product owner) |
| **Role** | AC / review only — **no coding** |
| **Platform** | iOS-first Expo Simulator (Apple Maps via react-native-maps) |
| **Implements** | Factory / Kai (via Finley); Lane signs off Simulator AC |
| **Job id** | `003-map-shell-ui-polish` |
| **Date** | 2026-09-23 (CT) |

**Sources (read; do not invent opposite):**

1. `FACTORY_BRIEF_003_map-shell-ui-polish.md`
2. `AC_MAP_SHELL_UI_POLISH_v0.md`
3. `PRODUCT_NAV_LOCK_2026-09-23.md` (Map home; tabs Map \| Logs \| Guide \| You)

---

## Simulator acceptance

Run on **iOS Simulator** after sign-in. Factory implements; Lane checks these.

### Map style toggle (satellite / hybrid vs default)

- [ ] **Given** signed-in user on Map tab  
      **When** Map loads  
      **Then** default style is **satellite or hybrid**, **OR** a one-tap control toggles Standard ↔ Satellite/Hybrid without leaving Map
- [ ] Toggle (if present) is one obvious control — not buried in a dense toolbar
- [ ] Pins remain visible and readable on hybrid/satellite

### Pin tap / select / clean pin style

- [ ] Spots render as **clean, readable pins** (not oversized cartoon markers)
- [ ] **Given** ≥1 spot pin visible  
      **When** user taps pin  
      **Then** existing spot-detail path opens (sheet or nav push)
- [ ] Create / drop pin (or existing create-spot entry) still works; lat/lng still saved
- [ ] Empty state (no spots): short calm copy + one primary action — no busy illustration cluster

### Map chrome quiet (must be absent or restrained)

- [ ] Overlay chrome is **minimal**: thin top/bottom bars or floating controls only
- [ ] Primary map actions ≤ **~2** obvious controls (e.g. style toggle and/or “+ spot”)
- [ ] **Absent / restrained:** dense stacked toolbars, loud gradients on map, thick multi-color borders, competing primary buttons on Map
- [ ] Full-bleed map; field-tool feel, not marketing dashboard
- [ ] Pan + zoom work

### Tab bar restraint

- [ ] Tabs in order: **Map \| Logs \| Guide \| You**
- [ ] **Map** is default landing after sign-in (not Guide)
- [ ] Active tab: burnt-orange accent (`#BF5700`); inactive muted; no heavy fills
- [ ] Simple labels/icons only

### App-wide simpler UI (only as far as the brief)

- [ ] Logs / Guide / You / auth: white/near-white or soft neutral backgrounds; clear spacing
- [ ] Burnt orange mainly on primary CTA, active tab, pin accent — **not** full-screen / full-bleed orange panels
- [ ] Prefer fewer competing borders, gradients, shadows; calmer type hierarchy
- [ ] Avoid: loud gradients, thick multi-color borders, overly rounded “toy” cards stacked everywhere, multiple competing primaries on one screen
- [ ] Job 002 weather one-liner / unavailable still null-safe; Guide stays secondary

### Hygiene (Simulator)

- [ ] No new API keys / paid map or weather SDKs
- [ ] Sign-in / session / user-scoped data not regressed
- [ ] Auth flows visually quieter but behavior unchanged (job 001)

---

## Repro steps — chrome clutter / tacky UI fails

Use these when filing a fail to Finley → Kai:

1. Sign in → confirm land on **Map** (fail if Guide or other is home).
2. Look at Map overlays: count obvious primary controls. **Fail if** > ~2 stacked toolbars / dense chrome / loud decorative panels on the map.
3. Toggle map style (or confirm satellite/hybrid default). Screenshot Standard vs Satellite/Hybrid. **Fail if** no satellite/hybrid path without leaving Map.
4. Tap a pin → spot detail. Create a pin if possible. **Fail if** create/detail broken or pins are cartoon-oversized.
5. Visit **Logs**, **Guide**, **You**, and auth screens. **Fail if** default look is loud full-bleed orange, stacked toy cards, or competing primary buttons.
6. Confirm tab bar: Map active = burnt-orange accent only; inactive muted. **Fail if** heavy filled tab chrome or Guide restored as home.
7. Confirm weather stub still renders without crash when unavailable (job 002).

**Screenshot-friendly:** Map hybrid with clean pins + quiet chrome; tab bar with Map active; one Logs/You screen showing quieter surfaces.

---

## Gaps / conflicts to flag to Sage → Finley

| Gap | Notes |
|-----|--------|
| **Default vs toggle** | Brief allows satellite/hybrid **default OR** one-tap toggle — Lane accepts either; prefer default hybrid if cheap. Factory must pick one and document which. |
| **Topo tiles** | Apple Maps has no true topo; satellite/hybrid + clean pins is the onX-*feel* bar. Do **not** invent paid topo. |
| **Android** | Out of goal; don’t break Android project if present — Lane AC is iOS Simulator only. |
| **“~2 controls”** | Soft bound from AC; if create-spot + style + one more is needed, flag to Sage before shipping three floating controls. |
| **No conflict** with nav lock: Map home + Map\|Logs\|Guide\|You unchanged. |

No product-direction conflicts found between brief, AC, and nav lock.

---

## Out of scope

- onX clone / feature-parity (offline topo, property layers, wind overlays, track recording, ranging, multi-layer hunt plans)
- Paid Mapbox / Google Maps / keyed custom tiles
- Live weather / provider swap
- Guide memory / new Guide intents
- BaaS / auth provider changes
- New tabs or demoting Map from home
- App Store submit; Android visual polish as a goal
- Rebrand / rename
- Lane coding or App Desk parallel implementation

**Design intent (locked):** Field tool, not toy — calm chrome, map-first, orange as accent.
