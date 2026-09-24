# Brief — Job 010: Topo map style + stub wind layer + 7-day forecast on top

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `010-topo-wind-7day`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: product `main` at `f43723f4d4351866f79ee8bd91984c79ab6b647c` (Job 009 merged, Origin PR #11). Do not follow an older tmp product URL. Do not start from an older product tip. Do not open on `b52e433`.  
**Build on:** Job 009 at Origin main `f43723f4d4351866f79ee8bd91984c79ab6b647c`. Do not regress Job 005–009 behavior.  
**Related:** `ac.md` (copy of `AC_TOPO_WIND_7DAY_v0.md`, with the locked name Scout substituted for `<AI_NAME>`) · Job 003/006/007/008/009 quiet field-tool chrome (north star) · brand burnt orange `#BF5700` for accents only · pin style A (locked in 007) · `note.md` (UI-check screenshots stay out of the product repo)  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** Small focused Origin product pull request(s). The builder writes `factory/jobs/010-topo-wind-7day/build.md` in this repo and documents token usage, the topo zoom cap, the WindSource stub shape, and any D2 split in those build notes. Lane runs the iOS Simulator sweep and captures the shots listed in Constraints for the ui worker.

Beau approved this as scoped via Finley at 1:26pm CT on 2026-09-24. The draft "do not open until" lines are satisfied. This brief is approved and final for Kai. **The AI's user-facing name stays Scout** (locked in Job 009; see bar order). It is not an open choice. **Decision: free USGS The National Map `USGSTopo` tiles are approved (answered yes).** Attribution is required. Weather and wind stay placeholder / stub only. No live weather or live wind API.

Chrome north star: Job 003/006/007/008/009 quiet field tool: dark by default, calm neutrals, burnt orange `#BF5700` for accents only, pin style A.

## What to build

1. **Topo map style (D1).** Add **Topo** to Map style in the Map Tools sheet: **Standard | Satellite | Topo**. USGS The National Map `USGSTopo` cached tiles via `react-native-maps` `UrlTile` (MKTileOverlay on Apple Maps). Free, public domain, no key. Beau answered yes: this source is approved. Attribution is required.
2. **Wind map layer (D2).** A **Wind** toggle in Map Tools (layer ON/OFF over any style) shows calm animated wind flow (particles or streamlines). Ships on a **STUB** wind field behind a swappable `WindSource` interface. Sample wind badge + mph legend. Real-time wind is Later (needs Beau go).
3. **Forecast tab: 7-day on top (D3).** Compact 7-day list above the existing 3-day section. Stub weather extended to 7 days. "Sample forecast" note stays. No spot suggestions in the 7-day row. Days align with the 3-day.

**Bar order stays: Map | Pins | Forecast | Scout** (from 009). You menu unchanged. Weather and wind stay **placeholder / stub** (Beau decided 2026-09-24 via Finley). No live weather or live wind ships in this job.

**Split note:** 010 is the heavier job. If the builder finds wind (D2) too big, **split D2 into its own job (011-wind-layer)** and ship D1 + D3 first. Say so early in build notes and stop D2 work rather than slipping the whole job. Note the split as "split to 011-wind-layer".

### D1. Topography map style

- Map Tools → Map style offers **Standard | Satellite | Topo** (Topo is new; Standard/Satellite unchanged).
- Topo uses USGS `USGSTopo` tiles via `react-native-maps` `UrlTile` / MKTileOverlay with this HTTPS URL template and no other tile provider:
  `https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}`
- Visible **attribution** on the map when Topo is selected (USGS acknowledgment, or equivalent short form that includes USGS / The National Map). USGS requests: *"Map services and data available from U.S. Geological Survey, National Geospatial Program."* Does not collide with the glass bar, the Map Tools button, or the Apple Maps legal label.
- Pins, pin popup, measure ruler, and wind overlay (if on) draw **above** topo tiles.
- Dark chrome; topo tiles themselves stay readable (contours/labels not crushed by app overlays).
- Graceful behavior past reliable zoom (~16): no crash; empty/white tiles acceptable with a calm fallback or zoom clamp noted in build notes.
- US-centric: outside coverage, empty tiles or a quiet "Topo is US-only" note is fine; no crash.
- No key, account, or spend. No other tile provider.

### D2. Wind map layer (stub)

- Map Tools has a **Wind** toggle (layer ON/OFF), independent of map style (works on Standard, Satellite, and Topo).
- When ON: calm animated particles or streamlines show direction and speed; color or opacity by speed; not garish; readable on all 3 styles.
- Small **mph legend** and a clear **"Sample wind"** badge while on stub data.
- Drawn with `@shopify/react-native-skia` over the map; does not steal taps from the map, pins, or controls.
- Driven by a coarse grid (~8×8 over the visible region), interpolated per particle; re-sampled when the map settles after pan/zoom; **paused** when the app is backgrounded or Wind is OFF.
- Performance: smooth on the Simulator; no dropped taps; no obvious frame hitch with 20+ pins.
- **Reduce Motion on:** static direction arrows (or equivalent static marks), no moving particles.
- Data: **stub only** behind a `WindSource` interface (deterministic, plausible TX winds). No NWS, Open-Meteo, or other live call in this job.
- If D2 threatens the schedule: stop, note "split to 011-wind-layer", and ship D1+D3.

### D3. Forecast tab: 7-day on top

- Top of Forecast is a compact **7-day** list: day, icon, high/low, wind speed and direction, precip chance. **No** spot / #1 pin suggestions in this block.
- Below it, the existing **3-day** section is unchanged (#1 pin per day, 005 ranking).
- The 3-day's days are the **first 3** of the 7 (aligned).
- Data still from the **stub**, extended to 7 days behind the existing weather interface.
- Clear **"Sample forecast"** note remains until real weather gets Beau's go.
- Map Forecast button still opens this same screen.
- Dark, 4.5:1 text, orange accent only for selected/pressed accents; last rows not hidden behind the bar.

Everything else from Jobs 005–009 stays the same (glass bar, Scout name, tours, Pins list, ruler measure, calm motion, tap-to-pin, style A pins, #1 pin per day, Map Forecast button, dark by default, logs in pins, Unpinned hunts in the You menu, stub AI replies that start with full sentences). Weather stays a STUB. Wind stays a STUB. The AI chat stays an on-device stub (no real model).

**Topo tiles are the only new network source.** No other live network data, keys, accounts, or spend. The only new dependency allowed is the free `@shopify/react-native-skia` (Expo SDK 57).

## Research

- Runs **after** 009. Base is main with 009 glass / AI name Scout / tours / tap-to-pin fixes landed at Origin main `f43723f4d4351866f79ee8bd91984c79ab6b647c` (Origin PR #11).
- **Topo source (approved, verified):** USGS The National Map `USGSTopo` XYZ tiles:
  - URL template: `https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}`
  - Terms: free, public domain, no key, no spend. USGS requests attribution: *"Map services and data available from U.S. Geological Survey, National Geospatial Program."* (https://www.usgs.gov/faqs/what-are-terms-uselicensing-map-services-and-data-national-map)
  - Coverage: US (and territories). Cached tiles reliably useful through about zoom **16**; some listings advertise higher maxZoom but empty/white tiles are common past that. Cap or fall back gracefully. Record the zoom cap in build notes.
  - Does **not** count as "weather" under the hold (not weather; no key/account/spend). It **is** the first live network map data in the app.
  - **Decision for Beau: answered yes.** Free USGS `USGSTopo` tiles are approved. Attribution is required.
- **OpenTopoMap (rejected for v1):** `https://{a|b|c}.tile.opentopomap.org/{z}/{x}/{y}.png`, CC-BY-SA. App embedding is allowed if you don't hammer the server, but there is **no SLA**, capacity is limited, and they ask big projects to contact them (https://opentopomap.org/about). Share-alike also complicates a closed app. Prefer USGS. Do not use it.
- Paid topo alternatives (MapTiler / Thunderforest Outdoors, etc.): key + free tier or paid. Any of those is a **gate** (Finley → Morgan → Beau). Not used here.
- **Wind render:** `@shopify/react-native-skia` is listed for Expo SDK 57 (`npx expo install @shopify/react-native-skia`; https://docs.expo.dev/versions/v57.0.0/sdk/skia/). Free, no key. Coarse wind grid (~8×8 over the visible region), interpolate per particle, re-sample on map move, pause when backgrounded or layer off. Reduce Motion → static arrows. This is the only new dependency allowed.
- **Wind data for this job:** stub only. Deterministic, plausible TX winds behind a `WindSource` interface so a live source can plug in later without rewriting the overlay. Record the stub shape in build notes.
- **Live wind candidates (Later only, short):** NWS `api.weather.gov` gridpoints / hourly forecast — free, public domain, no key, User-Agent required, US (https://www.weather.gov/documentation/services-web-api). Open-Meteo — free for non-commercial; commercial needs a paid plan / key (https://open-meteo.com/en/terms). Paid animated wind tile providers are the heavier alternative. **Do not wire any of these in 010.**
- Forecast 7-day: extend the existing stub weather interface to 7 days. Existing 3-day block (with #1 pin per day and 005 ranking) stays below and unchanged. Days 1–3 of the 7 match the 3-day.
- Beau (via Finley, 2026-09-24, 1:26pm CT): placeholder weather **and** placeholder wind are decided for now. Live wind/forecast stay on hold until an explicit Beau go. This brief is approved.
- The user-facing AI name is Scout from Job 009. Substitute Scout for `<AI_NAME>`. Do not re-ask the name.
- Do not edit Job 001–009 files. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### D1. Topography map style

- [ ] Map Tools → Map style offers **Standard | Satellite | Topo** (Topo is new; Standard/Satellite unchanged)
- [ ] Topo uses USGS `USGSTopo` tiles via `UrlTile` / MKTileOverlay with the URL template above (HTTPS). No other tile provider
- [ ] Visible **attribution** on the map when Topo is selected (USGS acknowledgment, or equivalent short form that includes USGS / The National Map). Does not collide with the glass bar, Map Tools button, or Apple Maps legal label
- [ ] Pins, pin popup, measure ruler, and wind overlay (if on) draw **above** topo tiles
- [ ] Dark chrome; topo tiles themselves stay readable (contours/labels not crushed by app overlays)
- [ ] Graceful behavior past reliable zoom (~16): no crash; empty/white tiles acceptable with a calm fallback or zoom clamp noted in build notes
- [ ] US-centric: outside coverage, empty tiles or a quiet "Topo is US-only" note is fine; no crash
- [ ] No key, account, or spend

### D2. Wind map layer (stub)

- [ ] Map Tools has a **Wind** toggle (layer ON/OFF), independent of map style (works on Standard, Satellite, and Topo)
- [ ] When ON: calm animated particles/streamlines show direction and speed; color or opacity by speed; not garish; readable on all 3 styles
- [ ] Small **mph legend** and a clear **"Sample wind"** badge while on stub data
- [ ] Drawn with `@shopify/react-native-skia` over the map; does not steal taps from the map, pins, or controls
- [ ] Driven by a coarse grid (~8×8 over the visible region), interpolated per particle; re-sampled when the map settles after pan/zoom; **paused** when the app is backgrounded or Wind is OFF
- [ ] Performance: smooth on the Simulator; no dropped taps; no obvious frame hitch with 20+ pins
- [ ] **Reduce Motion on:** static direction arrows (or equivalent static marks), no moving particles
- [ ] Data: **stub only** behind a `WindSource` interface (deterministic, plausible TX winds). No NWS, Open-Meteo, or other live call in this job
- [ ] If D2 threatens the schedule: stop, note "split to 011-wind-layer", and ship D1+D3

### D3. Forecast tab: 7-day on top

- [ ] Top of Forecast is a compact **7-day** list: day, icon, high/low, wind speed + direction, precip chance. **No** spot / #1 pin suggestions in this block
- [ ] Below it, the existing **3-day** section is unchanged (#1 pin per day, 005 ranking)
- [ ] The 3-day's days are the **first 3** of the 7 (aligned)
- [ ] Data still from the **stub**, extended to 7 days behind the existing weather interface
- [ ] Clear **"Sample forecast"** note remains until real weather gets Beau's go
- [ ] Map Forecast button still opens this same screen
- [ ] Dark, 4.5:1 text, orange accent only for selected/pressed accents; last rows not hidden behind the bar

### Hygiene

- [ ] Only D1–D3 are new (or D1+D3 if D2 splits to 011-wind-layer)
- [ ] No live weather, no live wind, no new keys, accounts, or spend
- [ ] Topo is the only new network map source; attribution shown
- [ ] No pin / log data lost; no schema change required beyond local preferences for style/layer if needed
- [ ] iOS-first; Cloud Agents only; small focused PR(s)
- [ ] The only new dependency is free `@shopify/react-native-skia` (Expo SDK 57)
- [ ] All Job 005–009 behavior unchanged otherwise
- [ ] Bar order stays **Map | Pins | Forecast | Scout**

## User-facing UI

Hunters get real terrain under their pins, a calm sample wind layer that can go live later without a rewrite, and a week of stub forecast up top without losing the ranked 3-day below.

- Map Tools → Map style reads **Standard | Satellite | Topo**. Topo shows USGS contours with a visible USGS / The National Map attribution that sits clear of the glass bar, the Map Tools button, and the Apple legal label. Pins, the pin popup, the measure ruler, and the wind overlay (when on) draw above the tiles. Past about zoom 16, and outside the US, the map stays calm and does not crash.
- Map Tools has a **Wind** toggle that works over any style. When on, a calm Skia particle or streamline overlay shows direction and speed, with an mph legend and a **Sample wind** badge. It pauses when the app is backgrounded or the toggle is off. It never steals taps. Reduce Motion shows static arrows.
- Forecast opens with a compact **7-day** list (day, icon, high/low, wind speed and direction, precip chance; no spot suggestions). The existing **3-day** section sits below it, unchanged, and its days are the first 3 of the 7. The **Sample forecast** note stays. The Map Forecast button still opens this screen.
- Bar order stays **Map | Pins | Forecast | Scout**. Glass, tours, Pins, measure, and tap-to-pin from 009 stay as they are.

## Payments and auth

- Payments: none. Do not invent spend. Weather stays the on-device stub. Wind stays a deterministic stub behind `WindSource`. The AI chat stays an on-device stub. No live weather or live wind API. No keys, accounts, or spend beyond the free public-domain USGS topo tiles (attribution required). No parcels or paid map layers.
- Auth: unchanged behavior (Apple primary, email secondary, no guest). No auth/BaaS provider swap.
- Maps: existing Apple Maps stack plus USGS `USGSTopo` `UrlTile` only. No other tile provider. No new API keys or paid map SDKs. The only new dependency is free `@shopify/react-native-skia` (Expo SDK 57).
- Location: unchanged from Job 009. No new location storage.

## Decisions for Beau

- **OK to use free USGS topo tiles?** **Answered yes** (Beau, via Finley, 2026-09-24, 1:26pm CT). First live network map data in the app; no key, no cost, public domain. **Attribution is required.**
- AI name was decided / defaulted in Job 009 (**Scout**). Not re-asked here. Substitute Scout for `<AI_NAME>`.

## Later (not in this job)

Not shown in the app as placeholders beyond the Sample wind and Sample forecast badges this job requires. Each needs its own job.

- **Live weather everywhere and live wind** (needs Beau go; Finley → Morgan → Beau for any key/account/spend). Likely free path: NWS (US, User-Agent) or Open-Meteo (watch commercial terms). Flip `WindSource` + weather stub without rewriting UI.
- Wind forecast time slider; gusts
- Offline topo cache; satellite+topo hybrid
- Paid topo / animated wind tile providers (gate)
- Tutorial analytics; Appearance Dark / Match iPhone
- Everything on the 009 Later list

## Out of scope

- Wiring NWS, Open-Meteo, or any live weather/wind API
- Changing AI chat, tours, glass bar, Pins list, or measure beyond what 009 already did
- Property lines / parcels
- App rename / App Store
- Any key, account, or spend
- OpenTopoMap or any other tile provider
- Editing Job 001–009 files

## Constraints

- Opened after Beau's go via Finley at 1:26pm CT on 2026-09-24. This brief is approved and final. USGS `USGSTopo` tiles are approved (answered yes) with attribution required. Weather and wind stay placeholder / stub. The user-facing AI name is Scout.
- Base: Origin main `f43723f4d4351866f79ee8bd91984c79ab6b647c` (Job 009 merged, Origin PR #11). Not `b52e433`.
- Do not touch product code from this SoftwareFactory ticket. Workers build on the product repo.
- If wind is too large: split D2 → job `011-wind-layer` and ship D1+D3 under 010. Note "split to 011-wind-layer" in build notes and stop D2 work.
- Lane Simulator shots: Topo style with USGS attribution visible and clear of the bar, Map Tools button, and Apple legal label; pins and ruler above topo; Wind ON over Standard, Satellite, and Topo with Sample wind badge + legend; Wind with Reduce Motion (static); Forecast with 7-day above 3-day and Sample forecast note; Map Forecast button still opens it. Lane also runs the sweep in `ac.md`.
- UI-check screenshots must not be committed to the product repo. Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this job folder. See `note.md`. The same rule is already in `.cursor/agents/ui.md` from Job 008.
- Document token usage, topo zoom cap choice, WindSource stub shape, and any D2→011 split in `factory/jobs/010-topo-wind-7day/build.md`.
- iOS-first. Cloud Agents only for code. Small focused PR(s).
- Hard hygiene: no live weather, no live wind, no parcels, no paid layers, no new keys, no accounts, no spend. Topo tiles are the only new network map source, with attribution shown.
- This public job tree stays free of secrets.
- Do not edit any Job 001–009 files.

## Design intent (one line)

Hunters get real terrain under their pins, a calm sample wind layer that can go live later without a rewrite, and a week of stub forecast up top without losing the ranked 3-day below.
