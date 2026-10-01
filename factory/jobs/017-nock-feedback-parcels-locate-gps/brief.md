# Brief — Job 017: Nock Map wordmark, Forecast button out, locate-me, property-line outlines, GPS forecast, parcel popup

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `017-nock-feedback-parcels-locate-gps`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: product `main` at `5bddc511dcaf6514115b13b997566d182df78d85` (Job 016 landed). Do not follow an older tmp product URL. Do not start from an older product tip. Do not open on `0c7a672` or on anything before `5bddc511dcaf6514115b13b997566d182df78d85`.  
**Stack:** Expo SDK 57 (patch levels per 015), React Native, expo-router, react-native-maps (Apple Maps on iOS; `WMSTile` for parcels per 014 H4), in-house NOAA sun math (012), 013 sun stack + shooting-light popover, 009/014 glass (`expo-glass-effect` `GlassView` on iOS 26+ / `expo-blur` `BlurView` fallback, 014 H1 backing rules), 005/010 `ForecastProvider` stub, 010 `WindSource` stub  
**Build on:** Job 016 at Origin main `5bddc511dcaf6514115b13b997566d182df78d85`. Do not regress Job 005–016 behavior. **All 287 existing tests stay green.** New tests are added on top. The builder records the count at that base and after each product PR. **The only allowed new dependency is `expo-location`, and only if it is not already in the repo** (I3/I6). Nothing else.  
**Related:** `ac.md` (copy of `AC_NOCK_FEEDBACK_PARCELS_LOCATE_GPS_v0.md`) · Job 016 brand (Origin main `5bddc511`) · Job 014 H1 sun-stack glass and H4 TxGIO property lines · Job 015 Map `animation: 'none'` freeze fix · Job 003/006–016 quiet field-tool chrome (north star) · brand burnt orange `#BF5700` for accents only (I1 is a Beau-approved brand use of it) · pin style A (locked in 007) · `note.md` (UI-check screenshots stay out of the product repo; merges go through the normal permitted path only) · `MEMO_PARCEL_OWNER_DATA_v0` is context for what is out of scope only  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** One Origin product pull request per milestone, in order: I1, I2, I3, I4, I5, I6, I7. I1 and I2 may share one pull request, because both touch the Map top chrome. I4 and I7 can stop without blocking the others. Each product PR merges through the normal permitted path only. After a lower PR is squash-merged, the next PR is rebuilt on the new main on a fresh branch (never force-pushed). The builder writes `factory/jobs/017-nock-feedback-parcels-locate-gps/build.md` in this repo and documents everything listed under Constraints, including token usage. Lane runs the iOS Simulator sweep and captures the shots and recordings listed in Constraints for the ui worker.

Beau's go came via Finley at 9:39pm CT on 2026-09-30. Status: **FINAL, approved to build.** **The AI's user-facing name stays Scout.** **USGS The National Map `USGSTopo` tiles stay approved.** Weather and wind stay stubs, with no keys or spend, sampled at the right coordinates. This brief is approved and final for Kai. Decisions for Beau below are **non-blocking defaults**. The alternatives, and every Later item, are **out-of-scope Beau gates**. Do not wait. Do not build the alternatives.

**Delta 2026-09-30 9:48pm CT (Beau).** Owner names and phone numbers will never appear in the app. That is permanent. Drop owner names from every Later list. Do not leave them as a future gate. I7 adds a **County appraisal district** link on the parcel popup. Beau confirmed these defaults: locate-me sits above Map Tools, wherever Map Tools is; a tap with property lines on opens the popup with "Drop a pin here"; the location prompt shows on the first Map visit after the tour; lines are cream with a dark casing. The tour stays 8 steps, the locked default from the 9:39pm go. This delta does not reopen it.

**Builds on 016:** I1 replaces 016's cream wordmark image on the Map (016 F4 / B1–B4) with a text wordmark. I2 removes the Forecast control that 016 C fixed. The 016 splash, app icon, sign-in/tour logo, and rename stay as they are.

Chrome north star: Job 003/006–016 quiet field tool: dark by default, calm neutrals, burnt orange `#BF5700` for accents only, pin style A. Beau's logo colors (cream, rust-orange, black) stay on the splash, icon, and sign-in/tour art. Do not recolor them.

## What to build

Priority order. Keep this scope exactly. One product PR per milestone. I1 and I2 may share one. Nothing else.

| Milestone | Beau item | What |
| --- | --- | --- |
| **I1** | 1 | Map wordmark "Nock": system font, semibold, `#BF5700`, subtle shadow |
| **I2** | 4 | Remove the Map Forecast button. The sun stack (glass + popover) moves up into that top-left spot |
| **I3** | 5 | Locate-me glass button, bottom, directly above the Map Tools ("Filters") button. Remove "My location" from the Map Tools sheet |
| **I4** | 2 | Property lines: outline-only fix (diagnose the white block), new style, min zoom **13** |
| **I5** | 7 | Stub weather takes lat/lon. Pin predictions use the forecast at the pin |
| **I6** | 6 | Sun stack, shooting light, and Forecast tab use the user's GPS location, with a labeled fallback |
| **I7** | 3 | Parcel tap popup with a hard field allowlist (TxGIO identify), plus a County appraisal district link |

I5 comes before I6 because I6 feeds the GPS point into the I5 provider signature. I7 is last: it is the biggest and the only item that touches PII-bearing data. I4 and I7 can stop without blocking I1–I3, I5, or I6.

**Bar order stays: Map | Pins | Forecast | Scout.** Map stays the default home. The top-right three-line You menu is unchanged. The user-facing word is **pin**.

Everything else from Jobs 005–016 stays the same. **Weather and wind data stay PLACEHOLDER/STUB** (no live feed, no keys, no spend), but from now on they are sampled at the right coordinates (GPS point, pin, or grid point), so a live provider can drop in later without UI changes. Sun and shooting-light times stay on the device. The Scout chat stays an on-device stub.

**Network:** I4 keeps the existing free TxGIO `export` overlay and changes the request and style. I7 may add TxGIO `identify` on the same free service, and only if the SPEND GATE and the cache hard rule both pass. No other new network source. **All 287 existing tests at `5bddc511dcaf6514115b13b997566d182df78d85` stay green.** **No new dependencies except `expo-location` if it is not already installed.** No secrets, no API keys, no spend, no proxy/server hosting. No store submit. No bundle-id or scheme change.

## Build order

1. **I1**, its own PR, or shared with I2. Text wordmark on the Map only. Leave 016 splash, icon, and sign-in/tour logo untouched. Keep the 016 wordmark asset in the repo.
2. **I2**, its own PR, or shared with I1. Remove the Map Forecast button. Move the sun stack into that spot without remounting or fading the glass. Re-measure tour step 2.
3. **I3**, its own PR. Locate-me above Map Tools. Remove the "My location" sheet row. Record the location module. Add `expo-location` only if it is absent.
4. **I4**, its own PR, and it can stop. Diagnose the white block with `curl` against the shipped 014 template, then fix every cause found. If the measurements say min zoom 13 is too slow, bring the data back instead of shipping silently.
5. **I5**, its own PR. Coordinates on `ForecastProvider`. Per-pin predictions. Tests that prove Dallas and Llano differ.
6. **I6**, its own PR. Root location resolver. GPS first, labeled fallbacks. No background location.
7. **I7 last**, its own PR, and it can stop. SPEND GATE before UI. Allowlist at the parse boundary. Commit the static 254-county appraisal-district table and the County appraisal district link. If `NSURLCache` keeps the raw response and that cannot be prevented without new native code, stop I7 and report it. I1–I6 still ship.

Run the full existing suite (287) plus the new tests, and the 014–016 regression checklist, before each hand-off to Lane.

Milestone PRs merge through the normal permitted path only. After a lower PR is squash-merged, the next PR is rebuilt on the new main on a fresh branch (never force-pushed).

### Builder constraint: no Simulator in the cloud

Cloud builders run on Linux and **cannot run the iOS Simulator**. For every milestone the builder:

- **Traces the code deeply.** Write down every path that mounts, positions, restyles, or removes the touched controls. For I4/I7, trace every map press path (map `onPress`, marker `onPress`, `onLongPress`, double-tap zoom, the 005 A5 "tap only dismisses" rule, the 013 popover's consumed dismiss tap). For I3/I6, trace every permission and location path. For I5, trace every consumer of forecast or weather data.
- **Writes unit and component tests** (Jest, `testID`s, mocked `fetch`, `AppState`, `Linking`, location module, `AccessibilityInfo`, fake timers).
- **Reasons from source** for the lockfile versions (`react-native-maps`, `expo-location` if present, `expo-glass-effect`, `expo-blur`, RN networking on iOS), citing file/line or doc.
- **Hits the parcel service from Linux** for I4/I7. `curl` works from the VM. Measure the tiles and the identify responses. No device needed.
- **Writes exact Simulator steps for Lane (Mobile)**, who does the on-device confirmation. GPS items use **Simulator → Features → Location → Custom Location…** (or `xcrun simctl location booted set <lat>,<lon>`). Permission resets use Settings → Privacy & Security → Location Services → Nock, or `xcrun simctl privacy booted reset location <bundleId>`. If Lane's device result disagrees with the builder's trace, it goes back to the builder before merge. Do not patch around it.

## I1. Map wordmark "Nock" (builds on 016)

- **What:** top-center **"Nock"** on the Map is plain text: the iOS **system font** (SF Pro via the default `fontFamily`), **semibold** (`fontWeight: '600'`), color **`#BF5700`**. Suggested size 20–22pt; the builder records the final value. It replaces 016's cream wordmark image **on the Map only**. The 016 splash, app icon, and sign-in/tour logo keep Beau's art unchanged. Keep the 016 wordmark asset in the repo (it may still be referenced elsewhere). Stop using it on the Map.
- **Legibility:** `#BF5700` alone is about **4.6:1 against pure black and against pure white**, and close to 1:1 against mid-tones (bright Satellite fields, Topo tan). It needs a **subtle dark text shadow**, for example `textShadowColor: rgba(0,0,0,0.6)`, `textShadowRadius` 3–4, offset `{0, 1}`. The builder tunes and records the values. No pill, no glass chip, no outline stroke. Target: the glyphs read at **≥ 3:1 against their immediate shadow halo** over the brightest Satellite spot (West Texas sand, 31.9, −102.3), mid Topo, and dark Standard. Lane takes stills.
- **Behavior:** not interactive (`pointerEvents="none"`). Pan, zoom, pin taps, and tap-to-pin under it all still work. Map tab only. Fixed size (`allowFontScaling={false}` or `maxFontSizeMultiplier={1}`), since it is a logo. VoiceOver can read it as the header "Nock" or skip it, and it must never be focusable as a button.
- **Placement:** horizontally centered, inside the safe area, clear of the Dynamic Island. Clear of the **sun stack (now top-left, I2)** and the **top-right You menu** on iPhone SE (3rd gen), 15, and 15 Pro Max. The builder records the top offset.
- **Accent rule:** this is Beau's explicit brand use of the accent. Do not use `#BF5700` anywhere else new in this job except as an accent.

## I2. Remove the Map Forecast button; sun stack moves up to top-left

- **Remove** the top-left Forecast button from the Map. Remove its component usage, styles, and the 016 C black-box fix for that control (that fix is now moot for this control; keep any shared glass fix that also covers other controls). **The Forecast tab is unchanged** and is now the only way into Forecast. Update any code, tour copy, or tests that reference the Map Forecast button (tests asserting "Map Forecast button opens Forecast" become "the Forecast tab opens Forecast"; record each change).
- **Sun stack** (sunrise row and sunset row, 013 G2) moves **up into the Forecast button's former spot**: same top inset and left margin the button had. It keeps its **glass backing**, its **≥ 44×44pt hit target**, and **tap → shooting-light popover** (013 G3 + Delta, unchanged contents, table, copy, timer). The popover re-anchors to the new position through 012 `placeTooltip`, with the arrow on target and the popover clear of the Dynamic Island, wordmark, and You menu.
- **Protect the glass (014 H1 + 015):**
  - The backing stays **always mounted** with a stable `key`. Moving it is a **style/layout change only**. It does not conditionally render, re-key, or wrap in a new parent.
  - **No fade, no `opacity` < 1** on the stack or any ancestor (no animated move or fade-in for the relocation). It renders in the new spot.
  - **No tab-switch freeze:** do not touch the 015 tab transition config. The Map scene keeps the 015 fix (no Map fade).
  - The 014 H1 regression tests (`sunStackBacking` present and not remounted; no ancestor opacity < 1) still pass at the new position. Update positional assertions only.
- **Clearances:** stack clear of the safe area and Dynamic Island, the wordmark (I1), the You menu, the wind badge + legend (move the badge if it collides; record where), the parcel attribution/hint line, and the Topo attribution.
- **Tour (014 H3):** stays **8 steps, same copy**. Step 2's target (sun stack) is re-measured at its new spot, with the arrow tip within ±4pt on SE and Pro Max. Nothing in the tour may point at the removed Forecast button.
- **Floating controls count:** the Map now has the Map Tools button and the locate-me button (I3). The sun stack still does not count (nav lock).

## I3. Locate-me button; remove "My location" from Map Tools

- **Name check (docs):** Beau's "Filters" button is the **Map Tools button**: the round floating dark-glass button (about 48pt, 44pt minimum) on the Map tab only, which opens the Map Tools sheet (008 B5). **The docs place it at the bottom right**: about 12–16pt from the right edge and about 12pt above the glass bar (008, nav lock). Beau described it as bottom left. **Rule:** the locate-me button sits **directly above the Map Tools button, in the same column**, about 12pt gap, left edges aligned (or right edges, if it is on the right), whichever corner Map Tools is actually in at base. The builder records the actual corner from code. If it is bottom right (as documented), the builder still stacks locate-me above it and flags it in the PR so Finley can confirm with Beau. **Do not move the Map Tools button** in this job. Moving it is an out-of-scope Beau gate.
- **Look:** round, **≥ 44pt target (match Map Tools, ~48pt)**, same glass backing component as Map Tools (014 H1 rules: always-mounted backing, no ancestor opacity < 1, Reduce Transparency → solid dark). Icon: a location arrow, white. `#BF5700` only as the pressed-state accent, if at all. VoiceOver label: "Show my location", button.
- **Pin popup behavior:** whatever Map Tools does when a pin popup or parcel popup opens (008: it gets out of the way), locate-me does the same, by the **same non-opacity method** (014 H1). If Map Tools still fades with opacity on a glass ancestor at base, report it. Do not copy that fade.
- **Tap:**
  - **Permission granted:** get a current fix and **animate the camera** to it calmly, about **600–800ms** with `animateCamera`. Keep the current zoom if it is ≥ 12. If it is wider, go to about zoom 14. Never change map style, never remount `MapView`, no follow/heading mode (that is Later). Show the standard blue dot (`showsUserLocation` once permission is granted). Reduce Motion → instant move. A second tap during the animation restarts it. Debounce about 500ms. Nothing queues.
  - **Permission not asked yet:** request when-in-use permission (the Info.plist string, renamed to Nock in 016). If granted → center. If denied → the denied prompt.
  - **Denied/restricted:** a short glass prompt anchored above the button, **"Location is off for Nock."** with **Open Settings** (`Linking.openSettings()`) and **Not now**. One line, dismissible, no modal stack. Returning from Settings with permission granted works on the next tap with no relaunch (re-check on foreground).
  - **Location Services off device-wide:** **"Location Services are off. Turn them on in Settings."** + Open Settings.
  - **Unavailable** (no fix in ~10s, `kCLErrorLocationUnknown`, Simulator location "None"): **"Can't find your location right now."** It auto-hides after about 4s. The map does not move.
  - Approximate location (Precise off) works normally.
- **Privacy:** location is never stored to disk, sent anywhere, or logged (007 rule kept). The in-memory last fix is allowed (I6). The OS's own last-known position may be read (I6).
- **Map Tools sheet:** **remove the "My location" row**. All other rows keep their order (base order per 007/008/014: Map style, Fit to pins, Add pin at center, Measure distance, plus the Wind / Property lines layer list). Remove the dead code path. Tests that counted sheet rows are updated (record it).
- **Tour:** no new step in 017 (Decision). The Map Tools step copy does not mention My location, so it stays.
- **Collisions:** clear of the Apple Maps logo and **Legal** label (Apple requires them visible, bottom-left by default; use `mapPadding` or offsets if needed, and record it), the Topo USGS attribution, the parcel attribution/hint line, the wind badge + legend, the glass bar, and the pin popup.
- **Dependency:** use the location API already in the repo (007 added when-in-use permission; the builder records which module: `expo-location` or MapView user-location events). If `expo-location` is not installed, adding it (`npx expo install expo-location`; Expo first-party, free, no key) is the one **justified** new dependency for I3/I6, documented in the PR. Nothing else.

## I4. Property lines: outlines only, min zoom 13

I4 can stop without blocking I1–I3, I5, or I6. A stop is reported. No paid source replaces it.

### Diagnosis (builder confirms against the real 014 constant)

The service's default renderer is already outline-only (`esriSFS` fill color `[0,0,0,0]`, 1pt gold outline), so the white/cream block comes from **014's request or style**. These checks were run from a Linux box on **2026-09-30 ~9:45 PM CT**. Tiles were 512×512 at `dpi=192` (014's recommendation), Llano z16, from the `export` endpoint:

| Cause (reproduced) | Result |
| --- | --- |
| **A. `transparent=true` missing or not applied** (dropped by encoding, or `false`) | Tile is **100% opaque, ~87% white background**: a white block |
| **B. Renderer symbol is an `esriSLS` (line) on this polygon layer** instead of `esriSFS` + `outline` | Server **fills every parcel light gray**: **~73% of pixels opaque** |
| **C. 014 suggested widths (1.25 line over a 3-wide halo at dpi 192) in dense subdivisions** | Lines merge into **solid cream blocks**. Dallas residential (32.81, −96.75): **~84–86% of pixels at alpha ≥ 200 at z12, z13, and z14**. Rural Llano z14: ~6% |
| `esriSFS` with `outline` and **no fill color** | OK: transparent fill (not a cause) |

The builder decodes the shipped 014 URL template, re-fetches a tile at the spots above with it (`curl`), reports % non-transparent and % alpha ≥ 200 pixels, and names the cause(s) found (A, B, C, or other, for example a white note pill, a `WMSTile` `opacity`/`tileSize` mismatch, or a basemap issue). The fix covers every cause found.

### Fix

- **Request:** `format=png32`, **`transparent=true`** (present exactly once), `bboxSR=3857&imageSR=3857`, `f=image`, `dynamicLayers` percent-encoded (014 rule). Every symbol is **`esriSFS` with `style: esriSFSNull` and `color: [0,0,0,0]`** plus an `esriSLS` outline. Never `esriSLS` as the polygon symbol.
- **Style (recommended; tune with Lane stills, record final values):** two zoom bands, both outline-only:
  - **Band A, z13–14:** a single **hairline**, cream `#FFECBE` at ~67% alpha (`[255,236,190,170]`), width **0.4**, **no casing**. Measured: Dallas residential z13 ~11% and z14 ~5% of pixels at alpha ≥ 200 (dense blocks read as a fine mesh, not a block). Llano rural z13 ~0.6%.
  - **Band B, z ≥ 15:** cream `#FFECBE` line width **0.6** over a **dark casing** `[0,0,0,140]` width **1.4** (two passes; the first array entry draws on top). Measured: Dallas residential z15 ~19% alpha ≥ 200. Llano rural z15 ~2%.
  - Widths are ArcGIS symbol widths at `dpi=192` with 512px tiles. If the builder changes `tileSize`/`dpi`, scale accordingly and record it.
  - Implementation: two `WMSTile` overlays with `minimumZ`/`maximumZ` bands (13–14 and 15+), stable keys, mounted only while the layer is on and the map is in Texas. Or a single overlay with one compromise style, if the two-band approach flickers at the band edge on device. The builder records which.
  - **Color:** cream line + dark casing is the default. `#BF5700` only if Lane's stills show cream failing on a style. It is discouraged: parcels cover the whole map and would turn it orange, competing with the I1 wordmark, pins, and the accent rule. Never confusable with pins, the ruler, or wind arrows. Switching the default to the accent without those stills is an out-of-scope Beau gate.
- **Min zoom: 13** (was 14). Below 13: no parcel tiles requested, and the hint "Zoom in to see property lines" shows. **Not 12:** at z12 the server takes **~2.1–2.4s per urban tile** (vs ~1.2s at z13) and dense areas collapse into blocks even with a hairline. The service draws nothing wider than about z10 (layer `minScale` 1:500,000), so 12 was the practical floor anyway. `maximumNativeZ` stays about 18.
- **Measurements the builder records** (Sage's single-tile baseline, 512px @ 192dpi, from Linux):

| Spot | z12 | z13 | z14 | z15 |
| --- | --- | --- | --- | --- |
| Dallas residential (32.81, −96.75) | ~2.3s, 85–177 KB | ~1.2s, 84–260 KB | ~0.9–1.1s, 140–180 KB | ~0.77s, 87 KB |
| Llano rural (30.70, −98.75) | ~0.85–0.97s, ~85 KB | ~0.65–0.70s, 17–27 KB | ~0.5–0.65s, ~10 KB | ~0.6s, ~8 KB |

  The builder measures the **tile request count per screen** at zoom 13.0 and 13.9 on an iPhone 15 Pro-size viewport (393×852pt) and an SE (375×667pt). Expect roughly 6–8 tiles at 512 and 15–20 at 256. Also measure the **p50/p95 time to the last tile** for a cold pan at Dallas and Llano, plus the total KB. The PR justifies 13 with those numbers. If p95 for a full screen at z13 in Dallas is over about 5s on a normal connection, the builder may set 13 for rural and keep the hint until 14 in dense areas (only if it can be done without per-region hacks); otherwise propose 14 back to Sage with the data. Do not ship a silent change.
- **Unchanged from 014:** Map Tools switch (off by default, persists `mapLayer.propertyLines.v1`), z-order (above basemap/Topo, below wind/pins/ruler/popups), no `shouldReplaceMapContent`, no disk tile cache, TX-only with `isInTexas` (no requests outside Texas), the attribution line, the health probe (now probing with the current band's style), and the offline line. Toggling never remounts the map.
- **Tests:** URL builder (`transparent=true` once; `png32`; every renderer symbol is `esriSFS` + `esriSFSNull` + alpha-0 color with an outline; no `esriSLS` as the top-level symbol; percent-encoded; no key params); band selection (12.9 → none + hint; 13 → band A; 14.9 → band A; 15 → band B); probe uses the current band. Update 014's "13.9 → no overlay / 14 → overlay" test to the new value (record it).

## I5. Stub weather takes lat/lon; pin predictions use the pin's forecast

- **Provider signature:** the `ForecastProvider` (005/010) takes coordinates: for example `getForecast({ lat, lon, startDate, days }) → { days[], source: 'stub', capturedAt, location: { lat, lon } }`. Days stay aligned (the 3-day is the first 3 of the 7; 010 D3). `source: "stub"` and the "Sample forecast" / "Sample weather. Sunrise and sunset are calculated." note stay.
- **Stub behavior:** a **pure, deterministic** function of (lat, lon, date) with plausible Texas values, **varying by location**. For example: highs/lows drift with latitude (cooler north), precip chance rises eastward, wind direction/speed seeded by a hash of the coordinates. Quantize coordinates to a **~0.05° cell (~5 km)** so nearby pins match and the result is a natural cache key for a later live provider. The same inputs always give the same output. Invalid coords (NaN, out of range) → `null` → the existing "Forecast unavailable" path; never a throw.
- **Who passes which point:**
  - **7-day list (Forecast tab):** the I6 forecast point (GPS, else labeled fallback).
  - **3-day #1-pin rows:** each day's weather row is the forecast **at that day's #1 pin's coordinates** (sun times there already are, per 012). If a day has no #1 pin, use the I6 point.
  - **Any pin-level prediction/ranking** that reads weather at base (005 ranking, pin detail, Scout grounding for a pin): uses **that pin's coordinates**. The builder traces every consumer and lists it. 005 ranking **rules do not change** (type vs animals, recency). If ranking reads weather, it reads each candidate's own forecast.
  - **Weather-at-log (002):** stays at the chosen pin's lat/lng.
  - **Wind (010 `WindSource`):** confirm it already samples per grid point by lat/lon and that the stub varies by location. Fix it if it does not. No visual change.
- **Never** the map center or the user's location for a pin's prediction.
- **Tests (must prove it):** determinism (same input → deep-equal output); **two pins at Dallas (32.7767, −96.7970) and Llano (30.75, −98.68) produce different values** for at least one field on every day; two points inside one 0.05° cell → equal; NaN/out-of-range → null, no throw; 7/3 alignment at the same point; a **spy provider** asserts the 3-day rows call it with each #1 pin's coords and the 7-day with the I6 point (and never the map center when GPS is available).

## I6. Sun times, shooting light, and Forecast use the user's GPS location

- **One source of truth:** a root-level location context/hook (so the Forecast tab works when Map is not focused), backed by a pure `resolveForecastPoint({ permission, servicesEnabled, fix, lastKnown, mapCenter, persistedRegion, defaultRegion }) → { lat, lon, source, label }`:
  1. **`gps`**: permission granted and a current fix → the user's location. **No label** on the sun stack.
  2. **`lastKnown`**: permission granted but no current fix (timeout/unavailable) → the in-memory last fix this session, else the OS last-known position (if the API offers it, ≤ ~24h old). Label **"Last known location"**.
  3. **`mapCenter`**: permission denied/restricted, Location Services off, or no fix and no last known → the Map's last settled center (012 rule: else the persisted region, else the default region). Label **"Map center"**. In this mode it recomputes on map settle (012 behavior). In `gps` mode, panning the map does not change sun times.
- **Where it applies:** the sun stack (I2), the shooting-light popover (the point is resolved **when it opens** and fixed while open; pan still closes it, 013), the Forecast 7-day rows (sun + I5 weather), and the 3-day fallback when a day has no #1 pin. 3-day #1-pin rows stay **at the pin** (012/I5).
- **Labels:** sun stack: a small third line ("Map center" / "Last known location") **only in fallback**, inside the same glass. Keep 013's two-row stack in `gps` mode (this supersedes 013's "nothing else" only for fallback). Popover: one small line, "At your location" / "At map center (location off)" / "At last known location". Forecast caption under the 7-day header: "Forecast and sun times at your location" / "…at map center" / "…at last known location".
- **Refresh:** on app foreground (also re-checks permission, for example after returning from Settings); when a new fix is **> ~5 km** (haversine) from the point in use; on local date rollover (012); on permission change. Foreground-only updates: `Balanced`/reduced accuracy, a distance filter around 500m–1km or one-shot fixes on focus/foreground (builder picks and records). **No background location, no "Always" permission**, no new Info.plist background modes.
- **When to ask permission (default; Decision for Beau):** once, on the first Map focus after onboarding **and after the auto-launched tour ends**, never over a modal (reuse the 014 H3 "no modal open" guard). Until answered, use the `mapCenter` fallback label. The locate-me tap (I3) also asks if it has not been asked yet. Asking only on the locate-me tap is an out-of-scope Beau gate.
- **Time zone:** sun times are computed **for the location**. They are displayed in the **device time zone** (fine in v1). Polar/invalid → "—" (012). Showing times in the viewed place's time zone, and the iPhone 24-hour setting, are Later.
- **Tests:** `resolveForecastPoint` truth table (granted+fix, granted+no fix+last known, granted+nothing, denied, restricted, services off, undetermined); `shouldRefresh(prev, next)` (4.9 km → no, 5.1 km → yes, NaN safe); foreground triggers a re-resolve (mocked `AppState`); a Hawaii fix with the device in CT gives Hawaii's sun instants (UTC-asserted); popover point fixed while open; label text per source; the sun stack backing stays mounted and un-keyed across source changes (014 H1).
- **Lane phase testing (replaces 013's "pan the map" trick when GPS is on):** set a Custom Location (for example Hawaii 21.31, −157.86 during a US morning → before shooting light; Dallas → during).

## I7. Parcel tap popup (TxGIO identify, hard allowlist)

I7 can stop without blocking I1–I6. A stop is reported. No paid or alternative source. No proxy.

**Hard rule:** a strict field allowlist. Owner, mailing, value, and legal-description fields are stripped right after the response is read and are never rendered, stored, cached, or logged. Owner names and phone numbers never appear anywhere in the app. That is permanent. If the iOS URL cache keeps raw responses and that cannot be prevented without new native code, **stop I7 and report it**. I1–I6 still ship.

### Source and request

- **Endpoint (same free TxGIO service as 014; no key):** `…/stratmap_land_parcels_48_most_recent/MapServer/identify?geometry={lon},{lat}&geometryType=esriGeometryPoint&sr=4326&layers=all:0&tolerance=1&mapExtent={visible bbox, 4326}&imageDisplay={w},{h},96&returnGeometry=false&returnZ=false&returnM=false&f=json`. One constant next to the 014 export constant, with a comment naming TxGIO, the SPEND GATE, and the allowlist.
- **`/query` is not available** (re-checked 2026-09-30 ~9:45 PM CT: layer 0 `/query` → 400 "Requested operation is not supported"). `identify` is the only path, and **it returns every field** (no `outFields` support), including owner name, care-of name, mailing address, legal description, and land/improvement/market values. The PII **does reach the device over HTTPS** and must be **dropped at the parse boundary**.
- **Verified live (2026-09-30):** keyless 200 JSON in ~0.4–0.6s. Response keys are field **aliases in UPPER CASE** (for example `PROP_ID`, `GIS_AREA`). `results: []` for open water (Galveston Bay 29.55, −94.85). Some points return **2 results** (overlapping parcels, for example Llano ranch 30.70, −98.75). The response carries `cache-control: must-revalidate,max-age=0,public` + `etag` (so iOS may cache it to disk; see below) and a short-lived `AGS_ROLES` cookie.
- **SPEND GATE re-check (before UI, recorded with dates):** identify is still keyless, no new terms bar app use, and there is no throttling (429/403/captcha) at normal tap rates. Any failure → stop I7, ship the rest, report. No paid or alternative source. No proxy.

### Hard allowlist (the only fields that may exist past the boundary)

| Show as | Source field(s) (match case-insensitively) | Normalization |
| --- | --- | --- |
| **Mapped acres** | `GIS_AREA` + `GIS_AREA_UNIT` | Parse number. Units Acres → as is; square feet → ÷ 43,560; other/unknown units → omit. 0 or blank → omit. Format: < 10 → 2 decimals, < 1000 → 1 decimal, else whole with commas |
| **Deed acres** | `LEGAL_AREA` + `LGL_AREA_UNIT` | Parse the **leading number** (`"16.02 a"` → 16.02). Same unit/zero rules |
| **Property ID** | `PROP_ID` (and `GEO_ID` as "Geo ID" if present) | Trim. Omit if blank or `"0"` |
| **County** | `COUNTY` | Title-case + " County" ("LLANO" → "Llano County") |
| **Property address (situs)** | `SITUS_ADDR` | Collapse whitespace/stray commas. Omit if nothing remains but the state and/or ZIP (for example `" , TX 78734"`, `"   , ,"`) |
| **Data as of** | `TAX_YEAR`, `DATE_ACQ` (YYYYMMDD) | "Tax year 2025 · TxGIO data from Feb 2025". Omit parts that don't parse |

**Excluded, never rendered, stored, cached by the app, logged, or passed to state/props/analytics/Scout:** `OWNER_NAME`, `NAME_CARE`, all `MAIL_*` fields, `LAND_VALUE`, `IMP_VALUE`, `MKT_VALUE`, `LEGAL_DESC` (can contain names), `YEAR_BUILT`, land-use codes, `SOURCE`, `FIPS`, `objectid`, shape fields, and **anything not in the table** (deny by default: new server fields are dropped automatically).

- **Boundary rule:** the fetch module calls a pure `pickParcelFields(rawResult) → ParcelInfo` **immediately after `JSON.parse`, inside the same function**. The raw object never leaves that function, is not returned, is not thrown in an error, and is not attached to a log, breadcrumb, Redux/Zustand/context state, or Scout context. Error paths log only the status code or error class, never the body. No `console.*` of responses (dev builds included).
- **No PII at rest, including the HTTP cache:** use `credentials: 'omit'` and a no-store/no-cache request. The builder proves from RN's iOS networking source (lockfile version) whether `NSURLCache` will store the identify response, given the server's `public, max-age=0` + etag. **Lane checks the app container's `Cache.db` and storage for owner fields** (AC). If the response lands on disk and cannot be prevented without new native code, **stop I7 and report** (Sage → Finley). Do not ship I7.
- **Coordinates/IDs:** the tap point and parcel ID live in memory only while the popup is open. Nothing is persisted. No parcel history, no "recent parcels".

### Tap behavior (default locked; the alternative is an out-of-scope Beau gate)

- Applies **only while** Property lines is on **and** zoom ≥ 13 **and** the tap point is in Texas (`isInTexas`). Otherwise taps behave exactly as today (tap-to-pin, 009 C7).
- **Pin tap wins.** A tap on a pin opens the pin popup and never queries a parcel. Reuse the existing marker-vs-map discrimination (005 A5 / 009 C7; the builder cites how `react-native-maps` reports marker presses on iOS at the lockfile version). Debounce: the parcel query starts **~300ms after** a map tap and is **cancelled** if a marker press, a second tap (double-tap zoom), a pan, or a popup open happens in that window. A new tap aborts any in-flight identify (`AbortController`); the last tap wins. Taps within ~400ms of the previous one are ignored.
- **With the layer on, a tap on empty map opens the parcel popup instead of the new-pin popup.** The popup has a **"Drop a pin here"** button that opens the existing new-pin popup at the tap point, so tap-to-pin stays one extra tap away. Long-press = parcel info, with tap staying tap-to-pin, is an out-of-scope Beau gate. Do not build it.
- If a popup (pin, new-pin, parcel) or the shooting-light popover is open, a tap only dismisses (005 A5 / 013). Opening a pin popup closes the parcel popup. Map pan closes it. Opening the tour, Map Tools, or the You menu closes it. The parcel popup counts as a **modal** for the 014 H3 tour guard and the I6 permission prompt.

### Popup

- **Small glass card** anchored to the tap point (a small dot marks the point; 012 `placeTooltip` for placement; same family as the pin popup), clear of the bar, Dynamic Island, sun stack, wordmark, and floating buttons. A close (×) button. ≥ 44pt targets. 4.5:1 text. Dark. Reduce Transparency → solid.
- **Title:** the situs address if present, else "Parcel". Then the allowlisted rows that have values. If there are 2+ results: "1 of N parcels here" (showing the first; paging is Later).
- **States:**
  - **Loading:** spinner + "Looking up parcel…" (appears immediately after the debounce).
  - **No parcel:** `results: []` → "No parcel data here."
  - **Error:** non-200, bad JSON, `{error}` body, or timeout (~8s) → "Couldn't load parcel info." + **Try again**.
  - **Offline:** fetch rejects with a network failure → "You're offline. Parcel info needs a connection." No NetInfo needed (or reuse NetInfo if already installed).
  - **Empty after filtering:** "No details for this parcel."
- **Always shown footer:** **"Not survey grade. Tax parcel data, not legal boundaries or permission to hunt."** and **"Source: TxGIO, Texas appraisal districts."**
- **County appraisal district link (Delta 2026-09-30 9:48pm CT).** The popup has a **County appraisal district** control. It opens that parcel's county CAD site. Use `expo-web-browser` for an in-app browser when that package is already in the repo. Otherwise use `Linking`. Do not add `expo-web-browser` or any other dependency for this link. The only allowed new dependency in this job remains `expo-location`, and only if it is not already installed.
  - Link to the CAD **home or property-search page only**. No owner name, mailing address, or value in the URL.
  - A `PROP_ID` deep link is allowed only where that CAD documents a public one. The product PR lists those CADs. Every other county stays on the home or property-search page.
  - URLs come from a **static, committed table of all 254 Texas counties**, built from the Texas Comptroller appraisal district directory. The table header names that source and the as-of date. The builder records the exact directory URL. No fetching and no scraping at runtime. The app does not download the directory when the link is tapped.
  - A missing or blank CAD URL falls back to the Comptroller county directory page. The lookup uses the allowlisted county. If the county was omitted, use the same fallback.
  - Every URL in the table is `https`.
  - If the open fails, or there is no network, show a toast and do not crash. Use an in-repo toast if one exists. Do not add a toast library.
- VoiceOver reads the title, then the rows, then the footer. Close, "Drop a pin here", and the County appraisal district link are reachable. The link is at least 44pt.

### Tests

- `pickParcelFields` with a **synthetic** fixture shaped like the live response (fake owner "TEST OWNER ZZZ", fake mail address, fake values; never real people): output keys ⊆ allowlist; no fixture PII string appears in output, the rendered popup tree, any `console.*` spy call, any `AsyncStorage` write, or any thrown error message. Unknown new fields are dropped. Lowercase keys work too.
- Normalization cases from real shapes: `"16.02 a"` → 16.02; `GIS_AREA "0"` → omitted; `PROP_ID "0"` → omitted; `" , TX 78734"` and `"   , ,"` → address omitted; `"  RANCH ROAD 2323 , , TX"` → "Ranch Road 2323, TX" (or uppercase as given; the builder picks); square feet → acres; `DATE_ACQ "20250201"` → "Feb 2025".
- Tap state machine (fake timers): marker press within the debounce → no fetch; double-tap → no fetch; pan → cancel; second tap aborts the first; the layer off / zoom < 13 / outside Texas → tap-to-pin path, no fetch.
- Fetch states with mocked `fetch`: 200 results → info; `[]` → no parcel; 500, `{error}`, text/html, timeout → error; reject → offline; retry works.
- Request builder: identify URL has no key/token, `returnGeometry=false`, `f=json`, `layers=all:0`, and nothing else is requested. Update **014's static "no `owner_name`/`mail_addr`/`situs` in parcel code" test**: situs is now allowed; owner/name-care/mail/value/legal-description identifiers may appear **only** in the denylist test constant and the boundary's drop logic (if the builder uses an explicit denylist on top of the allowlist). Record the change.
- County table: 254 entries, every URL `https`, missing or blank CAD URL returns the Comptroller county directory page. The built URL has no owner, mailing, or value data. A `PROP_ID` query is present only for a county on the documented list in the PR. Open failure and a network failure show a toast and do not throw. No owner field and no phone field in the popup tree, storage writes, cache, or logs.

## Regression (014–016 must hold)

- **014 H1:** glass matrix at the sun stack's new spot. Backing present, not remounted, no ancestor opacity < 1.
- **014 H2:** Pins "Log a hunt" at the top, existing form, 0-pin alert "Drop a pin first. Hunts are saved to a pin.", returns to Pins with the new log under its pin. Pin detail still preselects that pin.
- **014 H3:** 8-step tour, step 2 re-targeted, same copy, per-account auto-launch, never over a modal (now including the parcel popup and the location prompt), replay from You → App tour.
- **014 H4:** property lines off by default, persist, TX-only, attribution, offline line, z-order, no remount, now at min zoom 13.
- **015:** tab switching stays smooth, one tap shows Map, no freeze, map stays interactive (B1–B7), including with Property lines on and the parcel popup opened or closed before switching. `animation: 'none'` on Map stays. Background on another tab, then foreground, then Map, still works.
- **016:** "Nock" on the home screen, splash, sign-in, You/About, and permission strings. "Scout" everywhere the guide is named. Icon and splash unchanged from 016. Bundle ID and scheme unchanged. An existing install keeps pins, logs, the tour flag, and settings. The Forecast tab opens Forecast.
- **013 floor zoom:** street → floor → street on all 3 styles, Wind on and off, Property lines on: no blank, no jolt, same style.
- **012 wind:** arrows, badge, and legend on all 3 styles; Wind off leaves nothing and does not remount the map.
- **010/011 Topo:** stays Topo at every zoom. USGS attribution visible and not covered by the parcel attribution or the wordmark.
- **008 ruler:** drag still works on Topo, with Wind on, and with Property lines on.
- **005:** pin-detail Log a hunt preselects that pin. 20 pin taps open that pin's popup. Tap-to-pin ×20 with the layer off opens the new-pin popup.
- Thin gray tab line. No Scout suggestion chips. Dark default. Pin style A. `#BF5700` accent only, except the I1 wordmark and Beau's existing logo art. No pin or log data lost.

## Research

- **Base:** Job 016 landed at Origin main `5bddc511dcaf6514115b13b997566d182df78d85`. Don't open on `0c7a672` or anything older. **287** existing tests on that commit stay green.
- **Names:** the app is **Nock**. The AI stays **Scout**. Topo stays USGS `USGSTopo` (approved, attribution required). Sun math stays the in-house NOAA module from 012. The 013 shooting-light table, state text, and note do not change.
- User-facing word is **pin**, never "spot".
- **Nav lock amendment (2026-09-30, Job 017 approved, Beau GO 9:39pm CT via Finley):** Builds on Job 016. Tabs stay **Map | Pins | Forecast | Scout** (Map default); You menu stays top-right. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. The amended lock text Sage handed with this brief is the source for the Job 017 nav changes. The new amendment, as handed, in full:

  > Amendment 2026-09-30 (Job 017 approved, Beau GO 9:39 PM CT via Finley). Builds on Job 016 (Nock rename/brand). Tabs stay **Map | Pins | Forecast | Scout** (Map default); You menu stays top-right. Map top-center wordmark becomes plain "Nock" text (system semibold, `#BF5700`); splash/icon keep Beau's logo.
  > - **Forecast button removed from the Map.** The Forecast tab is the only way into Forecast (supersedes the 2026-09-24 "Map Forecast button stays" line).
  > - **Sun stack moves top-left** into the Forecast button's old spot, with its glass and tap-to-open shooting-light popover. Sun times and the Forecast now use the user's GPS location, with a labeled fallback ("Map center" / "Last known location").
  > - **Locate-me button**, bottom, directly **above the Filters (Map Tools) button**, ≥ 44pt glass. It counts as a floating control (Map now has Map Tools + locate-me).
  > - **"My location" removed** from the Map Tools/Filters sheet.
  > - **Parcel tap popup:** with Property lines on (TX, zoom ≥ 13, was 14), tapping a parcel opens a small popup with allowlisted TxGIO fields only (acres, property ID, county, property address, as-of date). No owner names, mailing addresses, or values. "Not survey grade." A pin tap always wins.

The 9:48pm delta adds the County appraisal district link to that popup. It does not put owner names or phone numbers into the lock. Workers still do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001.

- **Owner-data memo:** `MEMO_PARCEL_OWNER_DATA_v0` is context for what stays out. Owner names and phone numbers never appear in the app. That is permanent (Delta 2026-09-30 9:48pm CT), not a Later item. Mailing addresses, values, legal descriptions, owner search, and owner-name labels stay out. The memo's county appraisal link-out is in this job, narrowed to the I7 County appraisal district link: a static table, home or property-search page, no owner data in the URL.
- No live weather/wind, no AI model, no keys, no spend. No schema changes beyond what I3/I6 keep in memory. Storage keys from 016 stay so an existing install keeps pins, logs, the tour flag, and settings.
- Do not edit Job 001–016 files.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### I1. Map wordmark

- [ ] Map top-center reads "Nock" in the iOS system font, semibold, `#BF5700`, with a recorded dark text shadow. It is not an image. 016's cream wordmark image is not used on the Map
- [ ] Splash, app icon, and sign-in/tour logo are unchanged from 016
- [ ] Legible on Satellite, Topo, and Standard. No pill, chip, or stroke. Not a tap target. Map only. Clear of the Dynamic Island, sun stack, and You menu on SE, 15, and 15 Pro Max

### I2. Forecast button removed; sun stack top-left

- [ ] No Forecast button on the Map. The Forecast tab still opens Forecast
- [ ] Sun stack is in the old Forecast-button spot, glass kept, ≥ 44pt, popover unchanged and re-anchored
- [ ] Backing stays mounted with a stable key. No fade. No ancestor opacity < 1. 015 tab config untouched. 014 H1 tests pass
- [ ] Tour stays 8 steps, same copy. Step 2 arrow is on the stack (±4pt)

### I3. Locate-me

- [ ] Locate-me sits directly above Map Tools, ~12pt gap, ≥ 44pt glass. Map Tools does not move. The PR records the corner
- [ ] Granted, not-yet-asked, denied, services-off, and unavailable states match the copy and behavior in I3
- [ ] "My location" is gone from the Map Tools sheet. Other rows keep their order
- [ ] Location is never written to disk, sent, or logged. `expo-location` is added only if it was absent, and the PR says so

### I4. Property lines

- [ ] White-block root cause is named from `curl` measurements of the shipped 014 template, and every cause found is fixed
- [ ] Template is png32, `transparent=true` once, `esriSFS` + null fill + outline. No key
- [ ] Outlines only. Min zoom 13, with the hint below 13. Measurements justify 13. 014 TX-only, off-by-default, attribution, and no-remount behavior holds
- [ ] I4 may stop without blocking the other milestones

### I5. Stub weather by lat/lon

- [ ] `ForecastProvider` takes coordinates, stays `source: "stub"`, and varies by location on a ~0.05° cell
- [ ] 3-day weather rows use that day's #1 pin. 7-day uses the I6 point. A pin's prediction never uses the map center or the user location
- [ ] Tests prove Dallas vs Llano differ, same cell matches, and invalid coords return null

### I6. GPS for sun, shooting light, and Forecast

- [ ] Resolver order is gps, then last known, then map center, with the labels in I6
- [ ] Panning does not change sun times while GPS is available. Fallback is labeled
- [ ] Refresh rules and the 5 km threshold are tested. No background location and no "Always" permission
- [ ] Permission is asked once on first Map focus after onboarding and the auto tour, never over a modal

### I7. Parcel tap popup

- [ ] SPEND GATE recorded. Identify only. Allowlist only. Owner, mailing, value, and legal-description fields are stripped immediately after the response is read
- [ ] Those fields are never rendered, stored, cached, or logged. If the iOS URL cache keeps the raw response and that cannot be prevented without new native code, I7 stops and I1–I6 still ship
- [ ] With the layer on, zoom ≥ 13, and the point in Texas, a tap opens the parcel popup with "Drop a pin here". A pin tap never queries a parcel
- [ ] Loading, empty, error, offline, and filtered-empty states, plus the not-survey-grade footer, are present
- [ ] **I7-CAD1.** The County appraisal district link opens that county's CAD. Lane checks Rockwall, Dallas, Llano, and one rural county
- [ ] **I7-CAD2.** The committed table has 254 entries, every URL is `https`, and the missing or blank fallback to the Comptroller county directory page is unit-tested
- [ ] **I7-CAD3.** No owner, mailing, or value data is in the URL. `PROP_ID` links are listed per CAD in the product PR, and only those CADs use one
- [ ] **I7-CAD4.** No owner field and no phone field anywhere in the UI, storage, cache, or logs
- [ ] **I7-CAD5.** If the link fails or there is no network, a toast shows and the app does not crash

### Guardrails

- [ ] All **287** existing tests pass at every PR. Count recorded at `5bddc511dcaf6514115b13b997566d182df78d85` and after each PR
- [ ] No new dependency except `expo-location` if it was not already in the repo
- [ ] Exact Simulator steps, including Custom Location for GPS items, are in each product PR
- [ ] The 014–016 regression list above holds

### Hygiene

- [ ] UI-check screenshots are not committed to the product repo. Only the UI report markdown is
- [ ] No Job 001–016 file is edited
- [ ] No live weather or wind, no keys, no spend, no proxy, no store submit, no bundle-id change
- [ ] No owner name and no phone number anywhere in the app. That exclusion is permanent, not a Later item

## User-facing UI

Open the map and it says Nock in the brand color, as text, at the top center. Sunrise and sunset sit where the Forecast button was, and they are for where you are standing. One tap on locate-me brings the map back to you. Property lines are thin cream outlines, visible from zoom 13. Tap a parcel and you get its size, ID, county, and address, marked as tax data and not permission to hunt, plus a link to that county's appraisal district. Owner names and phone numbers never appear. The Forecast tab is the only way into Forecast. Scout is still Scout.

- Map only: "Nock" in system semibold `#BF5700`, subtle shadow, not tappable.
- Sun stack top-left, glass, tap opens the same shooting-light popover.
- Locate-me glass button directly above Map Tools. "My location" is gone from the sheet.
- Property lines: outlines only, hint below zoom 13.
- Forecast and sun times follow GPS, with a short fallback label when they do not.
- Parcel popup: allowlisted rows, "Drop a pin here", a County appraisal district link, not-survey-grade footer. No owner name and no phone number.

## Payments and auth

- Payments: none. Do not invent spend. Weather stays the on-device stub, now sampled at coordinates. Wind stays the `WindSource` stub. The Scout chat stays an on-device stub. No live weather or live wind API. No keys, accounts, or spend. No store billing change. No new parcel vendor, proxy, or server. TxGIO `export` (014) and, if I7 ships, TxGIO `identify` stay the same free keyless service.
- Auth: unchanged behavior (Apple primary, email secondary, no guest). No auth/BaaS provider swap. No account or backend change. Storage keys stay, so an existing install keeps pins, logs, the tour flag, and settings.
- Maps: existing Apple Maps stack plus the 010 USGS `USGSTopo` `UrlTile` plus the 014 TxGIO `WMSTile` overlay. No other tile provider. No new API keys or paid map SDKs.
- Location: when-in-use only. No "Always" permission. No background mode. Location is not written to disk, sent, or logged. The in-memory last fix is allowed for I6.
- Schema: no stored schema changes for parcel data. Parcel fields and the tap point live in memory only while the popup is open.

## Decisions for Beau

None that block this build. Beau's go came via Finley at 9:39pm CT on 2026-09-30. Beau confirmed the four defaults below at 9:48pm CT on 2026-09-30. Do not wait. Build them. Each confirmed default is locked. The alternative is an **out-of-scope Beau gate**. Do not build the alternative.

1. **Locate-me corner. Confirmed.** Locate-me sits directly above the Map Tools button, in the same column, wherever Map Tools already is. The docs put Map Tools at the bottom right. If that is what the code shows, flag it in the PR and still stack above it. Moving Map Tools is an out-of-scope Beau gate.
2. **Parcel tap vs tap-to-pin. Confirmed.** With Property lines on and zoom ≥ 13 in Texas, a tap opens the parcel popup, and "Drop a pin here" opens the existing new-pin popup. Long-press for parcel info, with tap staying tap-to-pin, is an out-of-scope Beau gate.
3. **When to ask for location. Confirmed.** The location prompt shows once, on the first Map visit after the tour (after onboarding), never over a modal. Asking only when locate-me is tapped is an out-of-scope Beau gate. The locate-me tap still asks if permission has not been asked yet.
4. **Parcel line color. Confirmed.** Lines are cream `#FFECBE` with a dark casing on the upper zoom band. Using `#BF5700` for the lines is allowed only when Lane's stills show cream failing, and that choice is recorded. Making orange the default without those stills is an out-of-scope Beau gate.

The tour default from the 9:39pm go stays locked and was not reopened by this delta: no locate-me step and no parcel-tap step. The tour stays 8 steps with the same copy. Step 2 is only re-measured. Adding a step is an out-of-scope Beau gate.

## Later (not in this job)

These are **out-of-scope Beau gates**. Do not do them in this job, and do not treat them as defaults to invent. Owner names and phone numbers are not on this list. Beau removed owner names at 9:48pm CT on 2026-09-30, and phone numbers never appear either. Both are a permanent exclusion, below, not a deferred feature.

- Highlighting the tapped parcel outline. Paging through overlapping parcels. Parcel history and "recent parcels".
- Follow-me / heading mode. GPS for wind. Any background location, including "Always".
- Showing times in the viewed place's time zone. The iPhone 24-hour setting.
- Live weather or live wind (Beau go via Finley → Morgan → Beau).
- Offline parcels. County-gap detection. Nationwide parcels (paid, gated).
- Everything still on the 014 Later list that this job does not name, except owner names. Owner names are not later. This job does name GPS for sun times, shooting light, and Forecast (I6), stub weather sampled at coordinates and per-pin predictions (I5), an allowlisted parcel tap popup (I7), and the County appraisal district link. The rest of that list stays later: hunting-lease and public-land boundaries, logging a hunt from the Map, tour analytics, state-specific shooting hours, a shooting-light alarm, moon phase, a wind slider, gusts, offline topo, and a Skia wind retry.

## Out of scope

- **Permanent:** owner names and phone numbers never appear in the app. Not in the UI, not in storage, not in the cache, not in logs, and not on any Later list. Mailing addresses, land/improvement/market values, and legal descriptions stay out the same way
- The alternatives listed under Decisions for Beau (Beau gates)
- Every Later item above (Beau gates)
- Live weather or wind
- Backend or sync changes
- New map sources. TxGIO `identify` is the same service as 014's `export`
- Moving the Map Tools button
- Changing the shooting-light table, copy, or timer
- Tour step changes beyond re-targeting step 2
- A new locate-me or parcel tour step
- Bundle ID, Expo slug/owner, EAS project ID, URL scheme, or storage-key changes
- Store submission
- Redrawing 016's splash, icon, or sign-in/tour logo
- New dependencies other than `expo-location`, and `expo-location` only when it is not already in the repo
- New native code to suppress `NSURLCache`. If that is the only way to keep identify responses off disk, stop I7
- Editing Job 001–016 files, including `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001
- Product code changes from this SoftwareFactory ticket

## Constraints

- Status: **FINAL, approved to build** (Beau's go via Finley, 2026-09-30 at 9:39pm CT). Delta 2026-09-30 9:48pm CT is in this brief: permanent ban on owner names and phone numbers, the County appraisal district link, and the four confirmed defaults.
- Base: Origin main **`5bddc511dcaf6514115b13b997566d182df78d85`** (Job 016 landed). **287** existing tests stay green.
- Do not touch product code from this SoftwareFactory ticket. Workers build on the product repo.
- **One product PR per milestone**, in order. I1 and I2 may share one. I4 and I7 can stop without blocking the others. Each PR merges through the normal permitted path only. After a squash-merge, the next PR is rebuilt on the new main on a fresh branch (never force-pushed). See `note.md`.
- **Build notes must include:**
  - Test count at base `5bddc511dcaf6514115b13b997566d182df78d85` (287) and after each PR, all green; every changed test and why
  - **I1:** font size, shadow values, top offset; contrast notes
  - **I2:** removed files and lines; the stack's new offsets; proof the backing key and mount are unchanged; popover re-anchor
  - **I3:** Map Tools' actual corner at base; button offsets; location module used (and the `expo-location` justification, if it was added); permission and state handling; how it gets out of the way of popups without opacity
  - **I4:** white-block root cause(s) with the 014 tile measurements; the final URL template (no secrets); band styles; tile counts and timings per screen at z13 (SE and 15 Pro); why 13. If I4 stops, the reason
  - **I5:** provider signature; stub formula; consumer list (every weather reader and the point it passes)
  - **I6:** resolver states, refresh mechanics, permission timing, labels
  - **I7:** SPEND GATE recheck; the identify template; the allowlist code location; proof of no PII in logs, state, storage, or the HTTP cache (source citation for RN iOS caching, plus the mitigation). If the iOS URL cache keeps raw responses and that cannot be prevented without new native code, the stop report, and confirmation that I1–I6 still shipped. Tap discrimination citation. Debounce values. County table path, 254 entries, source, as-of date, Comptroller fallback URL, whether the opener is `expo-web-browser` or `Linking`, and the per-CAD list of documented `PROP_ID` deep links. Proof the built URL has no owner, mailing, or value data, and that no owner or phone field is rendered, stored, cached, or logged
  - Exact Simulator steps for Lane, including Custom Location for every GPS item
  - Token usage
  - Confirmation that the only new dependency, if any, is `expo-location`, and only because it was not already in the repo
- **Lane Simulator signoff (shots / recordings):** the sweep in `ac.md`. GPS items use Simulator → Features → Location → Custom Location…, or `xcrun simctl location booted set <lat>,<lon>`.
  - I1 stills on Satellite, Topo, and Standard, on SE, iPhone 15, and 15 Pro Max, plus a pan, pinch, pin tap, and tap-to-pin under the wordmark. Splash and icon unchanged from 016
  - I2 recording of the 014 H1 matrix at the new spot, the 015 ten-cycle stress, and tour step 2 on SE and Pro Max
  - I3 recording of allow, deny, Settings return, services off, and unavailable, plus the sheet with no "My location" row
  - I4 stills at the 014 spots on three styles at z13, z14, and z16, the zoom hint, the Texas-only line, and offline recovery
  - I5 Forecast still with Dallas and Llano rows showing different sample weather
  - I6 recording of Custom Location Dallas → Lubbock → Hawaii → Never → re-allow
  - I7 stills of each popup state, the County appraisal district link opening Rockwall, Dallas, Llano, and one rural county, a toast when the link fails or the network is off, and the privacy grep of the app container, including `Cache.db`
  - Test run output all green
- UI-check screenshots must not be committed to the product repo. Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this job folder. See `note.md`. The same rule is already in `.cursor/agents/ui.md` from Job 008.
- Merges go through the normal permitted path only. See `note.md`.
- Document token usage and the items above in `factory/jobs/017-nock-feedback-parcels-locate-gps/build.md`.
- iOS-first. Cloud Agents only for code.
- Hard hygiene: no live weather, no live wind, no backend, no new paid SDKs, no keys, no spend, no proxy, no store submit. No new dependency except `expo-location` when it is absent. USGS topo tiles from 010 remain. Sun math and shooting-light math stay on-device. The shooting-light table, state text, and note do not change. Beau's splash, icon, and sign-in/tour art are not redrawn.
- This public job tree stays free of secrets. Do not commit signing keys, store credentials, or EAS tokens. Do not paste live owner names, mailing addresses, or values from the parcel service into this ticket. I7 tests use a synthetic fixture.
- Do not edit any Job 001–016 files.

## Design intent (one line)

The map says Nock in the brand color, sunrise and sunset are for where you are standing, one tap returns you to yourself, property lines are thin cream outlines, and a parcel tap shows size, ID, county, address, and a link to that county's appraisal district, never an owner name or a phone number.
