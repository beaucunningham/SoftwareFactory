# AC — Nock feedback: Map wordmark, Forecast button out, locate-me, property-line outlines, GPS forecast, parcel popup (job 017)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_NOCK_FEEDBACK_PARCELS_LOCATE_GPS_v0.md`. No secrets. **Status: FINAL, approved to build.** Beau's go came via Finley at 9:39pm CT on 2026-09-30. The app name stays **Nock**. **The AI's user-facing name stays Scout.** Weather and wind stay stubs (no live feed, no keys, no spend), sampled at the right coordinates. Sun and shooting-light times stay on-device. Bar is **Map | Pins | Forecast | Scout**. Dark default, `#BF5700` accent only (the I1 wordmark is Beau's approved brand use of it), pin style A. USGS topo stays approved. User-facing word is **pin**. **All 287 existing tests stay green.** The only allowed new dependency is `expo-location`, and only if it is not already in the repo. No secrets, no API keys, no spend, no proxy.

**Hard rule (I7):** a strict field allowlist. Owner, mailing, value, and legal-description fields are stripped right after the response is read and are never rendered, stored, cached, or logged. If the iOS URL cache keeps raw responses and that cannot be prevented without new native code, stop I7 and report it. I1–I6 still ship.

**Job id:** `017-nock-feedback-parcels-locate-gps`  
**Builds on:** Job 016 at Origin main `5bddc511dcaf6514115b13b997566d182df78d85` (Job 016 landed). Do not open on `0c7a672` or anything older. I1 replaces 016's cream wordmark image on the Map. I2 removes the Forecast control that 016 fixed. The 016 splash, app icon, sign-in/tour logo, and rename stay as they are.  
**Product repo:** https://cursor.com/codebase/beau-cunningham/hunting-companion

Brief: `brief.md` in this folder. Full product detail is in that brief.  
**Delivery:** one product pull request per milestone, in order: I1, I2, I3, I4, I5, I6, I7. I1 and I2 may share one pull request. I4 and I7 can stop without blocking the others. Each PR merges through the normal permitted path only.  
Lane captures the shots and recordings listed at the end of this file. Those UI-check screenshots stay out of the product repo (see `note.md`).

**Out of scope Beau gates (do not build, do not wait):** the alternatives to the Decisions for Beau defaults, and every Later item. Defaults are locked: locate-me stacks above Map Tools wherever that button already is; with Property lines on, a tap opens the parcel popup plus "Drop a pin here"; location is asked once on first Map focus after onboarding and the auto tour; the tour stays 8 steps; parcel lines are cream plus a dark casing. Later gates include owner names and owner phones (memo context only; never owner search), parcel highlight and paging and history, follow-me/heading, GPS for wind, background location, viewed-place time zone, the 24-hour clock setting, live weather/wind, offline parcels, county-gap detection, and nationwide parcels.

**Builder constraint:** cloud builders run on Linux and cannot run the iOS Simulator. Every milestone needs deep code tracing (written in the PR), unit and component tests, lockfile-version source citations, Linux-side `curl` measurements for I4 and I7, and exact Simulator steps that Lane runs and confirms. GPS items use **Simulator → Features → Location → Custom Location…** or `xcrun simctl location booted set <lat>,<lon>`. Permission resets use Settings → Privacy & Security → Location Services → Nock, or `xcrun simctl privacy booted reset location <bundleId>`. If Lane disagrees with a trace, it goes back before merge.

## Must pass

### I1. Map wordmark (Beau item 1)

1.1. Map top-center reads **"Nock"** in the iOS system font, **semibold**, color **`#BF5700`**. It isn't an image. 016's cream wordmark image is no longer used on the Map.
1.2. Splash, app icon, and sign-in/tour logo are unchanged from 016 (pixel-identical assets, same config).
1.3. A subtle dark text shadow (values recorded) keeps it legible on **Satellite, Topo, and Standard**. No pill, chip, or stroke. Glyphs read at ≥ 3:1 against their shadow halo over bright Satellite (31.9, −102.3), mid Topo, and dark Standard (Lane stills).
1.4. `pointerEvents="none"`: pan, pinch, a pin tap, and tap-to-pin directly under the wordmark all work. Not focusable as a button in VoiceOver. Fixed size (no Dynamic Type growth).
1.5. Inside the safe area, clear of the Dynamic Island, sun stack (I2 position), and You menu on SE (3rd gen), 15, and 15 Pro Max. Map tab only.

### I2. Forecast button removed; sun stack top-left (Beau item 4)

2.1. No Forecast button anywhere on the Map. The **Forecast tab** still opens the same Forecast screen. Tests and copy that referred to the Map Forecast button are updated (listed in the PR).
2.2. The sun stack sits in the Forecast button's former top-left spot (same top inset and left margin; offsets recorded), clear of the Dynamic Island, wordmark, You menu, wind badge/legend, parcel line, and Topo attribution on SE and Pro Max.
2.3. The stack keeps its glass, its ≥ 44×44pt target, and tap → shooting-light popover with unchanged contents (013 Delta table, copy, phases, timer, game persistence). The popover arrow points at the stack (±4pt) and the popover stays on screen.
2.4. **Glass regressions protected:** the backing has the same component, same stable `key`, and is always mounted (move = style only). No fade or animated move. No `opacity` < 1 on the stack or any ancestor. 015 tab transition config untouched. The 014 H1 tests (`sunStackBacking` present, not remounted, no ancestor opacity < 1) pass; only positional assertions change.
2.5. Tour stays 8 steps with the same copy. Step 2 spotlights the stack at its new spot (arrow ±4pt, SE and Pro Max, first run and replay). No step targets a removed control.

### I3. Locate-me; "My location" removed from Map Tools (Beau item 5)

3.1. The PR records which corner the Map Tools ("Filters") button is in at base (docs say bottom right). The locate-me button sits **directly above it in the same column, ~12pt gap**. The Map Tools button doesn't move. If the corner isn't bottom left, the PR flags it for Beau.
3.2. Round glass button, **≥ 44pt** target (matches Map Tools, ~48pt), the same glass backing component (014 H1 rules), Reduce Transparency → solid. VoiceOver: "Show my location, button".
3.3. **Granted:** tap → the camera animates to the user's location in ~600–800ms. Zoom is kept if ≥ 12, else it goes to ~14. Style unchanged, no `MapView` remount, blue dot shown. Reduce Motion → instant. Repeated taps restart, never queue.
3.4. **Not yet asked:** tap → system prompt. Allow → centers. Don't Allow → 3.5.
3.5. **Denied/restricted:** "Location is off for Nock." with **Open Settings** (opens the app's Settings page) and **Not now**. After enabling in Settings and returning, the next tap centers with no relaunch.
3.6. **Services off:** "Location Services are off. Turn them on in Settings." + Open Settings. **Unavailable** (no fix in ~10s / Simulator location None): "Can't find your location right now." hides in ~4s and the map doesn't move. Never a crash or a spinner forever.
3.7. When a pin or parcel popup opens, locate-me gets out of the way exactly as Map Tools does, **without opacity on a glass ancestor**. Clear of the Apple logo/Legal (visible), Topo attribution, parcel line, wind badge/legend, and bar.
3.8. The Map Tools sheet has **no "My location" row**. The other rows keep their order. Dead code removed.
3.9. Location is never written to disk, sent anywhere, or logged. If `expo-location` was added, the PR justifies it; otherwise there are no new deps.
3.10. Tests: button state machine (granted / undetermined→granted / undetermined→denied / denied / services off / timeout) with mocked location + `Linking.openSettings`; the zoom rule; debounce; sheet row list without My location.

### I4. Property lines: outline only, min zoom 13 (Beau item 2)

4.1. **Diagnosis in the PR:** the builder decodes 014's shipped template, fetches tiles with it (curl) at Dallas residential (32.81, −96.75) z14 and Llano rural (30.70, −98.75) z14, reports % non-transparent and % alpha ≥ 200 pixels, and names the white-block cause(s): A `transparent` missing/false, B `esriSLS` as the polygon symbol (gray fill), C stroke widths merging in dense areas, or other. Each cause found is fixed.
4.2. **Template:** `format=png32`, `transparent=true` exactly once, `bboxSR=3857&imageSR=3857`, `f=image`, `dynamicLayers` percent-encoded. Every renderer symbol is `esriSFS` with `esriSFSNull` and color alpha 0, plus an `esriSLS` outline. No key/token params. Same TxGIO service, `WMSTile`, no `shouldReplaceMapContent`, no disk cache.
4.3. **No fill/white block:** with the new template (Linux-measured, 512px @ 192dpi or the recorded size): Llano rural z13/z14 tiles < 10% non-transparent pixels; Dallas residential z14 ≤ ~10% and z15 ≤ ~25% of pixels at alpha ≥ 200. A pixel sampled in a parcel interior has alpha 0. On device (Lane): thin outlines only, no white/cream/gray blocks, on Satellite, Topo, and Standard at the 014 test spots.
4.4. **Style:** band A z13–14 cream hairline (~`#FFECBE` ~67% alpha, ~0.4, no casing); band B z ≥ 15 cream ~0.6 over dark casing ~0.55 alpha ~1.4. Final values and the implementation (two banded overlays or one) recorded. Not confusable with pins, ruler, or wind. Accent only if Lane's stills justify it (recorded).
4.5. **Min zoom 13:** tiles requested at zoom ≥ 13 only. Below 13 → "Zoom in to see property lines" and no parcel requests. `maximumNativeZ` ~18.
4.6. **Measured and justified:** tile requests per screen at z13.0 and z13.9 on SE and 15 Pro sizes; p50/p95 time to the last tile for a cold pan at Dallas and Llano; KB per screen. The PR justifies 13 against 12 (Sage's baseline: z12 urban ~2.1–2.4s/tile vs z13 ~1.2s, and z12 merges into blocks). If Dallas p95 at z13 exceeds ~5s, the builder brings the data back to Sage instead of shipping silently.
4.7. 014 behavior holds: off by default, persists, Map Tools subtitle, TX-only (no requests outside Texas), attribution line, health probe (uses the current band), offline line + recovery, z-order (above basemap/Topo, below wind/pins/ruler/popups), toggling never remounts the map.
4.8. Tests: URL builder (4.2 checks), band selection (12.9 none + hint / 13 A / 14.9 A / 15 B), probe uses the band. 014's 14-based gating test updated (recorded).

I4 can stop without blocking I1–I3, I5, or I6. A stop is reported. No paid or alternative source is substituted.

### I5. Stub weather by lat/lon; per-pin predictions (Beau item 7)

5.1. `ForecastProvider` takes `{ lat, lon, startDate, days }` (or equivalent, recorded) and returns its `location`. `source: "stub"` and the Sample note stay. 7/3 day alignment holds.
5.2. The stub is pure and deterministic, varies with location, and quantizes to ~0.05°. Invalid coords → null → "Forecast unavailable", no throw.
5.3. The 3-day section's weather row for each day uses **that day's #1 pin's coordinates** (fallback: the I6 point when there's no #1 pin). Every other pin-level prediction, ranking, or Scout-grounding weather read uses the pin's coordinates. The PR lists every consumer and the point it passes. 005 ranking rules unchanged.
5.4. Weather-at-log stays at the pin. `WindSource` samples by grid-point lat/lon and varies by location (fixed if not; no visual change).
5.5. **Tests prove it:** same input → equal; **Dallas (32.7767, −96.7970) vs Llano (30.75, −98.68) differ on ≥ 1 field every day**; same 0.05° cell → equal; NaN → null; a spy provider gets each #1 pin's coords for 3-day rows and the I6 point for the 7-day, never the map center while GPS is available.
5.6. On device (Lane): two pins far apart (Dallas, Llano) that are #1 on different days show different sample weather on their rows.

### I6. GPS location for sun times, shooting light, Forecast (Beau item 6)

6.1. A root-level resolver gives `{ lat, lon, source: gps | lastKnown | mapCenter, label }` per the brief's order. Truth-table tests cover granted+fix, granted+no fix+last known, granted+nothing, denied, restricted, services off, undetermined.
6.2. In `gps` mode the sun stack, popover (point fixed at open), Forecast 7-day sun + weather, and the 3-day no-pin fallback all use the user's location. **Panning the map doesn't change them.** The stack shows no extra label.
6.3. Fallback is labeled: stack third line "Map center" / "Last known location" (inside the same glass); popover line "At map center (location off)" etc.; Forecast caption "…at map center". In `mapCenter` mode values follow the map's settled center (012).
6.4. Refresh on foreground (and permission re-check), on a move > ~5 km, on midnight rollover, on permission change. `shouldRefresh` tests: 4.9 km no, 5.1 km yes.
6.5. Sun times are computed for the location and displayed in device time. A Hawaii point with the device in CT gives Hawaii's sun instants (UTC-asserted test). Polar/invalid → "—".
6.6. Permission is asked once at first Map focus after onboarding and after the auto tour (default), never over a modal; or per Beau's decision (recorded). Foreground-only: no "Always", no background modes.
6.7. The sun stack glass backing stays mounted and un-keyed across source/label changes (014 H1 test extended).

### I7. Parcel tap popup, hard allowlist (Beau item 3)

7.1. **SPEND GATE recheck recorded** (date, links): identify keyless, terms, no throttling. Failure → I7 stops; no substitute source, no proxy. I1–I6 still ship.
7.2. Request: TxGIO `MapServer/identify` only, `layers=all:0`, `returnGeometry=false`, `f=json`, no key/token, `credentials: 'omit'`. `/query` isn't used (unsupported on the service).
7.3. **Allowlist only:** mapped (GIS) acres, deed acres, property ID (+ Geo ID), county, situs/property address if present, data as-of (tax year + TxGIO data month). Normalization per the brief (leading-number parse, units, "0"/blank omitted, junk situs omitted).
7.4. **Never rendered, stored, cached, logged, or put into state/props/Scout/analytics:** owner name, care-of name, any mailing address field, land/improvement/market values, legal description, and every other non-allowlisted field (deny by default). `pickParcelFields` runs right after `JSON.parse` inside the fetch function; the raw object never escapes; error paths log only status/error class.
7.5. **No PII at rest:** the PR cites RN iOS networking (lockfile version) on `NSURLCache` behavior and the mitigation. Lane finds **no** `OWNER_NAME`, `MAIL_ADDR`, `NAME_CARE`, `MKT_VALUE`, or `LEGAL_DESC` strings anywhere in the app's data container (incl. `Library/Caches/**/Cache.db`, AsyncStorage) after 20 parcel taps. If the response lands on disk and that cannot be prevented without new native code, **stop I7 and report**. Do not ship I7. I1–I6 still ship.
7.6. **Tap gating:** only with Property lines on, zoom ≥ 13, and the point in Texas; otherwise tap-to-pin is unchanged. With it active, a tap on empty map → parcel popup with **"Drop a pin here"** (opens the existing new-pin popup at that point). Long-press for parcel info is an out-of-scope Beau gate.
7.7. **Pin tap wins:** 20 pin taps with the layer on open only pin popups and send zero identify requests. ~300ms debounce; marker press, double-tap zoom, or pan in the window → no request; a new tap aborts the old; taps < ~400ms apart ignored. An open popup/popover → the tap only dismisses.
7.8. **States:** loading "Looking up parcel…", no parcel "No parcel data here.", error "Couldn't load parcel info." + Try again, offline "You're offline. Parcel info needs a connection.", empty-after-filter "No details for this parcel.", "1 of N parcels here" when N > 1.
7.9. **Always shown:** "Not survey grade. Tax parcel data, not legal boundaries or permission to hunt." and "Source: TxGIO, Texas appraisal districts." Glass card, dark, 4.5:1, ≥ 44pt targets, close ×, VoiceOver order title → rows → footer.
7.10. The parcel popup counts as a modal for the tour guard and the I6 permission prompt. Pan, tour, Map Tools, You menu, and a pin popup all close it.
7.11. Tests: synthetic PII fixture (no real names) → no PII in output, render tree, console spies, AsyncStorage writes, or errors; unknown fields dropped; lowercase keys; normalization cases (`"16.02 a"`, `"0"`, `" , TX 78734"`, `"   , ,"`, `"20250201"`, square feet); tap state machine; fetch states; request builder. 014's static PII-identifier test updated (situs allowed; owner/mail/value/legal-desc only in the denylist constant/drop logic).

### G. Guardrails

G1. All **287** existing tests pass at every PR (count at base `5bddc511dcaf6514115b13b997566d182df78d85` and after each PR recorded) plus new tests. No unjustified new deps. The only allowed new dependency is `expo-location`, and only if it is not already in the repo. No keys, tokens, spend, or proxy. No live weather/wind. No backend changes.
G2. Each PR has the code-trace write-up and the exact Simulator steps below, and Lane confirms them on device before merge. GPS items name Custom Location.
G3. The nav lock amendment for Job 017 is in `brief.md` (handed by Product). Workers do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001.

## Fail if

- The wordmark is an image, isn't `#BF5700` system semibold, is unreadable on any style, blocks gestures, or splash/icon changed
- Any Forecast button remains on the Map, the Forecast tab breaks, or the sun-stack glass vanishes, fades, remounts, or a tab switch freezes
- Locate-me is < 44pt, not glass, not directly above Map Tools, moves Map Tools, has no denied/off/unavailable handling, or "My location" is still in the sheet
- Parcels show any fill, white/gray block, or casing mush on any style; render below zoom 13; request tiles below 13 or outside Texas; lack measurements and a justification
- The stub ignores lat/lon, the tests don't prove per-pin differences, or any pin prediction uses the map center or user location
- Sun/forecast use the map center while GPS is available, the fallback is unlabeled, or background/"Always" location is added
- Any excluded parcel field is rendered, stored (including the HTTP cache), logged, or held in state; a pin tap triggers identify; no attribution or "Not survey grade" note; any state is missing
- I7 ships when the iOS URL cache keeps raw identify responses and that cannot be stopped without new native code
- Any existing test or regression item fails; scope creep; an owner-name or owner-phone feature appears
- UI-check screenshots are committed to the product repo
- Any Job 001–016 file is edited

## Simulator sweep (Lane)

Setup: clean build at each PR's commit; iPhone SE (3rd gen) and 15 Pro Max (plus a 15 for I1); dark mode; signed in with 20+ pins including one in Dallas and one in Llano; Wi-Fi on. GPS items use **Simulator → Features → Location → Custom Location…** or `xcrun simctl location booted set <lat>,<lon>`.

**I1 wordmark**

1. Map on Satellite at West Texas sand (31.9, −102.3), then Topo, then Standard. "Nock" is orange, semibold, readable, top-center, clear of the Dynamic Island, sun stack, and You menu (stills on SE, 15, Pro Max).
2. Pan, pinch, tap a pin, and tap empty map directly under the wordmark: all work.
3. Kill and relaunch: the splash and home-screen icon are unchanged from 016.

**I2 sun stack**

1. No Forecast button on the Map. The sun stack is top-left in its place. Forecast tab → Forecast screen.
2. Tap stack → popover anchored and on screen; change game Duck → Deer → Feral hogs → Squirrel → Duck; dismiss by tap outside (no pin), pan, tab switch, You menu, Map Tools. Repeat open/close 20×.
3. Run the full 014 H1 trigger matrix (AC 014 sweep H1 steps 2–12): glass present after every step at the new spot, on all three styles.
4. 015 stress: Map → Pins → Map → Forecast → Map → Scout → Map ×10 quickly. One tap always shows Map, no freeze, map interactive, glass present.
5. You → App tour: step 2 arrow on the stack (stills SE + Pro Max).

**I3 locate-me**

1. Note which corner Map Tools is in. Locate-me sits directly above it, ~12pt gap, ≥ 44pt, glass, clear of Apple Legal/Topo attribution/bar.
2. `xcrun simctl privacy booted reset location <bundleId>`; Features → Location → Custom Location 30.2672, −97.7431. Pan to Dallas. Tap locate-me → prompt → Allow → calm move to Austin, blue dot, style unchanged.
3. Zoom out to ~z8, tap → lands ~z14. At ~z16, tap → stays ~z16. Reduce Motion on → instant.
4. Settings → Privacy & Security → Location Services → Nock → Never. Return, tap → "Location is off for Nock." → Open Settings opens Nock's page → set While Using → return → tap centers (no relaunch).
5. Turn Location Services off → tap → "Location Services are off…". Turn on. Features → Location → None → tap → "Can't find your location right now." disappears in ~4s; map unmoved.
6. Open a pin popup: locate-me and Map Tools get out of the way and return. Map Tools sheet: no "My location" row.

**I4 property lines**

1. Property lines on. At Dallas residential (32.81, −96.75), Llano (30.70, −98.75), Port Lavaca (28.62, −96.63), Amarillo (35.2, −101.8), Lufkin (31.34, −94.73) on Satellite, Topo, Standard at z13, z14, z16: thin outlines only, **no white/cream/gray blocks** (stills).
2. Zoom out through 13: lines go, "Zoom in to see property lines" shows; back in: lines return. Shreveport (32.52, −93.75): Texas-only line, no lines.
3. Network Link Conditioner "100% Loss" → offline line within ~10s; restore → recovers.
4. Wind on (arrows above lines), ruler drag, 20 pin taps (pin popups), toggle 10× across styles: no remount, no blank.

**I5 per-pin forecast**

1. Forecast tab: find days where the Dallas pin and the Llano pin are #1 (or temporarily retype pins so each tops a day). Their rows show different sample weather. "Sample" note present; sun times present.
2. Log a hunt at the Llano pin: weather-at-log uses the pin (no change from 002).

**I6 GPS**

1. Custom Location Dallas (32.7767, −96.7970), location allowed. Sun stack shows Dallas times, no label. Pan the map to El Paso: the stack doesn't change. Forecast caption says "your location".
2. Custom Location Lubbock (33.58, −101.85) (> 5 km): the stack and Forecast update without relaunch. Custom Location 3 km away: no visible change required.
3. During a US morning, Custom Location Hawaii (21.31, −157.86) → open popover → Before (red), "At your location". Dallas → During (green).
4. Set Never: the stack shows "Map center", values follow map pans; Forecast caption "…at map center"; popover "At map center (location off)". Re-allow in Settings → foreground → label gone, GPS values back.
5. Location None with permission granted after a prior fix → "Last known location".
6. Fresh install: no location prompt during onboarding or over the auto tour; it appears once on Map after the tour ends.
7. Background 60s, move Custom Location > 5 km, foreground → updated. Glass on the stack present throughout.

**I7 parcel popup**

1. Property lines on, z ≥ 13. Tap empty land at Llano (30.75, −98.68): loading, then a popup with Llano County, property ID, mapped/deed acres, address, "Tax year 2025 · TxGIO data from …", the footer note and source. **No owner name, mailing address, or values anywhere.**
2. Llano ranch (30.70, −98.75): acres + "1 of 2 parcels here". Lufkin (31.34, −94.73): property ID "0" and the blank address omitted, acres shown. Dallas (32.7767, −96.7970): deed acres 16.02, mapped acres omitted.
3. Galveston Bay (29.55, −94.85): "No parcel data here." Network Link Conditioner 100% Loss → tap → offline message; restore → Try again works.
4. Tap a pin (×20): only pin popups. Double-tap to zoom: no parcel popup. Tap then pan quickly: none.
5. "Drop a pin here" → the existing new-pin popup at that spot → save works. Layer off → tap → new-pin popup directly. Zoom 12 or Shreveport → tap-to-pin directly.
6. With the parcel popup open: tap elsewhere → dismiss only; open Map Tools / You menu / tour → popup closes.
7. **Privacy check** after 20 parcel taps: `cd "$(xcrun simctl get_app_container booted <bundleId> data)" && grep -rIl -e OWNER_NAME -e MAIL_ADDR -e NAME_CARE -e MKT_VALUE -e LEGAL_DESC . ; grep -rl -a -e OWNER_NAME -e MAIL_ADDR Library/Caches` → **no matches**. During the taps, `xcrun simctl spawn booted log stream --level debug --predicate 'process CONTAINS "Nock"'` (and the Metro console) shows no owner/mail/value data. A match in `Cache.db` that cannot be prevented without new native code stops I7.

**Regression (014–016 and earlier)**

- Full test run green (287 existing at `5bddc511dcaf6514115b13b997566d182df78d85`, count recorded, plus new tests).
- **014 H1:** glass matrix at the new spot (above). **014 H2:** Pins "Log a hunt" at top, opens the existing form, 0-pin alert, returns to Pins. **014 H3:** 8-step tour, step 2 re-targeted, auto-launch once per account, never over a modal (now including the parcel popup and the location prompt), replay. **014 H4:** off by default, persists, attribution, TX-only, offline line, z-order, no remount (now at z13).
- **015:** B1–B7 tab switching (smooth, one tap, no freeze, map interactive), including with Property lines on and the parcel popup opened/closed before switching; background on another tab → foreground → Map.
- **016:** "Nock" on the home screen, splash, sign-in, You/About, permission strings; "Scout" everywhere; icon and splash unchanged; bundle ID/scheme unchanged; existing install keeps pins, logs, tour flag, settings.
- Earlier: 013 floor zoom cycles (3 styles, Wind on/off, Property lines on); 012 wind arrows + badge; Topo + USGS attribution; ruler; tap-to-pin ×20 with the layer off; pin-detail Log a hunt preselects; thin gray tab line; no Scout suggestion chips; dark default; pin style A; orange accent only; no pin/log data lost.

Lane captures: I1 stills on 3 styles × 3 devices; I2 recording of the H1 matrix + 015 stress; I3 recording of allow/deny/Settings/off/unavailable; I4 stills per spot/style/zoom + zoom hint + offline; I5 Forecast still with differing pin rows; I6 recording of the Dallas → Lubbock → Hawaii → Never → re-allow sequence; I7 stills of each state + the privacy grep output; test output.

Lane's UI-check screenshots stay out of the product repo. Only the UI report markdown goes in the product repo. See `note.md`.
