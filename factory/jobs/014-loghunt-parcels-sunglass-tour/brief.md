# Brief — Job 014: Sun-stack glass bug (root-cause fix) + Log a hunt on Pins + tour update with per-account auto-launch + Property lines layer (TX, free source, gated)

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `014-loghunt-parcels-sunglass-tour`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: product `main` at `af447ef4ee4127560cb7ed31619a8819b6269498` (Job 013 landed). Do not follow an older tmp product URL. Do not start from an older product tip. Do not open on a commit before `af447ef`.  
**Stack:** Expo SDK 57, React Native, expo-router, react-native-maps (Apple Maps on iOS), in-house NOAA sun math (012), 013 sun stack + shooting-light popover, 011/012 in-house coach-mark tour (`placeTooltip`), 009 glass (`expo-glass-effect` `GlassView` on iOS 26+ / `expo-blur` `BlurView` fallback)  
**Build on:** Job 013 at Origin main `af447ef4ee4127560cb7ed31619a8819b6269498`. Do not regress Job 005–013 behavior. **All 256 existing tests stay green**; new tests are added on top.  
**Related:** `ac.md` (copy of `AC_LOGHUNT_PARCELS_SUNGLASS_TOUR_v0.md`) · Job 003/006–013 quiet field-tool chrome (north star) · brand burnt orange `#BF5700` for accents only · pin style A (locked in 007) · `note.md` (UI-check screenshots stay out of the product repo; milestone PRs rebuild on fresh branches)  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** One Origin product pull request per milestone, in order: H1, H2, H3, H4. H1 ships in its own PR and must not ship half-fixed. H4 is gated and last; it can stop or drop without blocking H1–H3. Milestone PRs merge through the normal permitted path. After a lower PR is squash-merged, the next PR is rebuilt on the new main on a fresh branch (never force-pushed) to avoid stacked-squash conflicts. The builder writes `factory/jobs/014-loghunt-parcels-sunglass-tour/build.md` in this repo and documents everything listed under Constraints, including token usage. Lane runs the iOS Simulator sweep and captures the shots and recordings listed in Constraints for the ui worker.

Beau's go came via Finley on 2026-09-25 at 10:22 PM CT. Status: **FINAL, approved to build.** Beau is testing Job 013 on the iOS Simulator; if that testing turns up a blocker, Finley adds a dated Delta here and to the AC. **The AI's user-facing name stays Scout.** **USGS The National Map `USGSTopo` tiles stay approved.** Weather and wind stay stubs, with no keys or spend. This brief is approved and final for Kai. Decisions for Beau below are **non-blocking**; build with the stated defaults.

Chrome north star: Job 003/006–013 quiet field tool: dark by default, calm neutrals, burnt orange `#BF5700` for accents only, pin style A.

## What to build

Priority order. Keep this scope exactly. One PR per milestone.

1. **H1 — BUG, FIRST. The glass behind the sun stack disappears.** Its own PR. The glass/blur backing behind the stacked sunrise/sunset times (under the Forecast button, top-left, added in 013) vanished during normal use; trigger unknown. Reproduce across every trigger in the H1 matrix, find the root cause, write it in build notes with evidence, and fix it so the glass stays in **all** of them. Add regression tests where feasible. Include a test that **fails before the fix and passes after**.
2. **H2 — "Log a hunt" button at the top of the Pins tab.** Its own PR. Opens the **existing** log-a-hunt form (no new flow). Sits above the search field and list, ≥ 44pt tall, dark/glass styling. After save the user is back on Pins and the new log shows under its pin.
3. **H3 — Tour update + per-account auto-launch.** Its own PR. Add coach-mark steps (or step copy) for everything added since the 011 tour, one short sentence each. The tour auto-launches on the **first sign-in for each account** (flag keyed by `userId`, stored locally and on the profile record if the profile store persists), never over an open modal, and stays replayable from You → App tour. Skip and finish both set the flag.
4. **H4 — Property lines layer (Texas, free source only, GATED, own milestone, last).** Its own PR. A **Property lines** toggle in the Map Tools sheet's layer list, **off by default**, persisted locally. Lines come **only** from the free TxGIO StratMap statewide land parcels service named below. **Lines only, no owner data.** If free coverage or terms prove inadequate, the builder **stops H4 and reports** (SPEND GATE); no paid source substitution. H4 does not block H1–H3.

**Bar order stays: Map | Pins | Forecast | Scout.** Map stays the default home. The top-right three-line You menu is unchanged (App tour and Scout tour entries stay; App tour now plays the updated tour).

Everything else from Jobs 005–013 stays the same. **Weather and wind data stay PLACEHOLDER/STUB** (no live feed, no keys, no spend). Sun and shooting-light times stay on-device. The Scout chat stays an on-device stub.

**Network:** H1–H3 are on-device only. H4 adds **one** new free, keyless, public map source (TxGIO parcels) as a tile overlay; nothing else new. **All existing tests at `af447ef` stay green** (256 at open; builder records the count before and after); new tests are added on top. **No new dependencies unless truly needed** (justify any in the PR and build notes; none are expected). No secrets, no API keys, no spend, no proxy/server hosting.

## Build order

1. **H1 first (smallest), its own PR.** Trace, reproduce in tests, root cause, fix, regression tests. H1 must not ship half-fixed: Lane confirms the glass holds through the full H1 matrix before merge.
2. **H2**, its own PR (layout + wiring to the existing form).
3. **H3**, its own PR: pure `shouldAutoLaunchTour` + flag storage + tests first, then new steps/copy, then auto-launch wiring. H3 copy ships **without** the Property lines mention; H4's PR adds it.
4. **H4 last, its own PR, gated.** Run the SPEND GATE checks (below) before writing UI. H4 can stop or drop without blocking H1–H3.
5. Run the full test suite (256 existing + new) and the regression checklist before each hand-off to Lane.

Milestone PRs merge through the normal permitted path. After a lower PR is squash-merged, the next PR is rebuilt on the new main on a fresh branch (never force-pushed) to avoid stacked-squash conflicts.

### Builder constraint: no Simulator in the cloud

Cloud builders run on Linux and **cannot run the iOS Simulator**. For every milestone, especially H1 and H4, the builder does the deepest reproduction possible without a device:

- **Code tracing:** follow every path that can mount, unmount, re-key, restyle, clip, or reorder the sun-stack backing (H1); every path into and out of the log-hunt form (H2); every sign-in, onboarding, modal, and tour-flag path (H3); every path that adds, orders, or removes map overlays (H4). Write down what each does.
- **Unit/component tests** on pure functions and components (render trees in Jest with `testID`s, mocked `AppState`, mocked `Appearance`/`AccessibilityInfo`, fake timers, mocked `fetch`).
- **Reasoning from source/docs** for the versions in the lockfile (`expo-blur`, `expo-glass-effect`, `react-native-maps`), citing the file/line or doc.
- **Root cause with evidence** where a bug is involved (code path, the trigger, a test that fails before the fix and passes after).
- **Exact Simulator steps for Lane (Mobile)**, who does the on-device confirmation. If Lane's device result disagrees with the builder's root cause, that's reported back before merge, not patched around.

## H1. Sun-stack glass disappears (FIRST)

**Symptom (Beau via Finley, 2026-09-25):** the glass/blur behind the stacked sunrise/sunset times, under the Forecast button top-left, disappeared during normal use. Trigger unknown. The times may still show, but on bare map (readability drops over bright Satellite).

- **What "glass" means here:** whatever 013 G2 shipped for the stack (same family as 012's chip and the 009 bar): iOS 26+ `GlassView` when `isLiquidGlassAvailable()` / `isGlassEffectAPIAvailable()` allow it, else `BlurView` (dark/ultra-thin), Reduce Transparency → solid dark. Builder confirms which path runs on the Simulator's iOS version and records it.
- **Trigger matrix (builder traces each in code; Lane runs each on device):**
  1. Shooting-light popover open/close, **20 times in a row** (tap stack, dismiss by tap outside; also dismiss by pan, tab switch, You menu, Map Tools)
  2. Game selector change inside the popover (Duck → Deer → Feral hogs → Squirrel → Duck)
  3. Tab switch away and back (Map → Pins/Forecast/Scout → Map), including during the 008 crossfade
  4. Map style change: Standard → Satellite → Topo → Standard
  5. Wind on/off (5 toggles)
  6. Zoom to the 013 minimum zoom (floor) and back, and fast pinch at the floor
  7. App background/foreground (home gesture, ~5s and ~60s), and app switcher peek
  8. Appearance setting change (Dark ↔ Match iPhone, if 012 F4a shipped) and system light/dark flip with Match iPhone on; any theme/context re-render
  9. Reduce Transparency on → off (Settings → Accessibility) while the app is open
  10. Device rotation, **if** the app supports it (011 recorded portrait-only or not; if portrait-only, confirm and skip)
  11. Cold launch (kill → launch), and relaunch after sign-out/sign-in
  12. Coach-mark tour start/finish/skip over the Map (the tour's scrim sits above the stack)
- **Suspects (builder confirms with evidence, not guesses):**
  - **BlurView/GlassView unmount → remount.** The backing is conditionally rendered (`{open && ...}`, `phase`, `game`, theme, `reduceTransparency`, sun values) or sits inside a component whose `key` changes, so it remounts; a remounted native effect view can come back empty or one frame late.
  - **Conditional render keyed on state.** E.g. `backing = reduceTransparency ? solid : glass` where the Reduce Transparency value is briefly `undefined`/`false` on foreground and lands on a third branch that renders **nothing**; or the popover-open state swaps the stack's wrapper.
  - **Ancestor opacity < 1.** iOS `UIVisualEffectView` does not render correctly when it or any superview has `alpha < 1`. A fade (popover open, 008 tab crossfade, Reduce Motion fade, `Animated`/Reanimated `opacity` on a wrapper) can leave the blur blank, sometimes until remount. Check for `opacity` on any ancestor of the stack.
  - **Native effect lost after background.** The effect view drops its effect after `background`/`inactive` and doesn't restore on `active` (known class of iOS/Expo reports; builder cites what the installed `expo-blur` / `expo-glass-effect` versions do).
  - **Prop change not applied.** Changing `tint` / `intensity` / `glassEffectStyle` after mount (Appearance change, theme re-render) that the installed version doesn't re-apply without remount.
  - **Clipping.** `overflow: 'hidden'` + `borderRadius` on a wrapper whose layout goes to 0×0 or shifts (e.g. while the popover measures, or when sun values go to "—"), clipping the effect view away; or the effect view has no explicit size and collapses.
  - **Z-order under the map.** After a map style change or a `UrlTile` add/remove, the native map view or an overlay container is re-inserted above the stack's backing; or the backing is a sibling at a lower `zIndex` than the map while the text isn't.
  - **Tour scrim / popover leftovers.** The 011 tour or 013 popover leaves a view, mask, or `pointerEvents` layer that covers the backing after it closes.
- **Fix rules:**
  - The backing is **always mounted** while the stack is mounted: one stable component, stable `key`, no conditional that can yield "no backing". Switching glass ↔ solid (Reduce Transparency) swaps **material**, never leaves nothing.
  - No `opacity` < 1 on any ancestor of a native effect view. Animate the popover or the stack's **content** instead, or fade a sibling.
  - On `AppState` → `active`, and on Appearance / Reduce Transparency change, the backing re-applies its material (builder picks: a supported prop refresh, or a **deliberate, single** remount of the backing only; never the Map).
  - Explicit size (fills the stack's rounded rect via `StyleSheet.absoluteFill` inside a sized container), `borderRadius` + `overflow: 'hidden'` on the stack container only.
  - Stack container sits above the map with an explicit `zIndex` (and `elevation` where relevant) that doesn't depend on render order.
  - **Floor tint (allowed, not the fix):** a plain, non-native `View` under the effect with a residual dark tint (≤ ~0.15 alpha, same family as the 009 bar) so the stack never goes fully bare. It doesn't replace finding and fixing the root cause.
  - If the same component backs the glass bar, Map Tools button, or other chips, the fix covers them; Lane spot-checks them in the matrix.
- **Tests to add (where the setup allows):** a pure `getGlassBacking({ glassAvailable, reduceTransparency, appState })` (or equivalent) that **never returns "none"**; component tests that render the sun stack and assert the backing (`testID="sunStackBacking"`) is present, and **not remounted** (same instance/key), across popover open/close ×20, game change, mocked `AppState` background → active, Appearance change, Reduce Transparency change, style change, Wind toggle; a test that no ancestor of the backing has `opacity` < 1 in the popover-open state.

## H2. Log a hunt on Pins

- **Label:** **"Log a hunt"** (the existing action's name on pin detail since 005; this is Beau's "Log Hunt" button). Plus-style icon allowed. If Beau wants the literal "Log Hunt", that's a copy-only swap (non-blocking; default "Log a hunt").
- **Placement:** top of the Pins tab, **below** the screen title/header and You menu row, **above** the 012 F4b search field (if shipped) and the list. Button + search field form a **fixed header**; the list scrolls under it. Full width inside the list's horizontal padding; about 8–12pt gap above the search field.
- **Target:** ≥ **44pt** tall (suggest 48pt), whole row tappable. Clear of the Dynamic Island / status bar and the top-right You menu on SE and Pro Max.
- **Styling:** reuse the **existing "Log a hunt" button component** from pin detail if one exists (same shape, type, colors). If there's none, a dark/glass button consistent with the bar (dark surface or glass, white label, `#BF5700` only as a small accent such as the icon or pressed state). 4.5:1 label contrast. Reduce Transparency → solid dark. No new orange panel.
- **Tap:** opens the **existing** log-a-hunt form, the same one pin detail opens (no new screen, no new steps). **No pin preselected** (user picks in the form's existing pin picker; a pin is still required to save, 005 rule). If the existing form can't open without a pin, use its existing pin-picker entry; builder records what the form does. The weather-at-log stub (002) still uses the chosen pin's lat/lng.
- **No pins yet:** the button stays visible and enabled; tapping it shows a small dark alert: **"Drop a pin first. Hunts are saved to a pin."** with **Go to Map** (switches to the Map tab) and **Cancel**. The 008 empty state ("No pins yet. Tap the map to drop one." + Go to Map) stays below.
- **After save:** the form closes and the user is back on the **Pins list** (not pin detail, not Map). The search query (if any) is **cleared** and the list scrolls to the top, where the pin now sits (008 sort: most recently hunted first). That row's second line shows the updated hunt count and last-hunted date; tapping it shows the new log at the top of the pin's history. No relaunch needed.
- **Cancel / back out of the form:** back on the Pins list with query and scroll position unchanged; nothing saved.
- **Keyboard:** if the search keyboard is up, tapping the button dismisses it and opens the form.
- **VoiceOver:** "Log a hunt, button". Reduce Motion: form opens with the existing transition (plain fade under Reduce Motion, 008 B3).

## H3. Tour update + per-account auto-launch

- **What the tour covers today (from prior AC):** 011 E5 defined six steps: (1) Map "Tap the map to drop a pin." (2) Map Tools button "Map style, Wind, and measuring live here." (3) Pins tab (4) Forecast tab (5) Scout tab (6) You menu "…Replay this tour here anytime." 012 F2 fixed arrow placement only and kept steps/copy (012 Out of scope: "Changing the coach-mark steps/copy"). 013 added no steps. Flag: per-install `tour.coachmarks.v1` (011).
- **Added since, not in the tour:** 012 F1 wind arrows (Map Tools copy mentions "Wind" only generically); 012 F3 sun chip → **013 sun stack + shooting-light popover** (game selector, countdown); **013 zoom-out floor**; 012 F4a **Appearance** (You menu, if shipped); 012 F4b **Pins search** (if shipped); **014 H2 Log a hunt**; **014 H4 Property lines** (if it ships). The Map Forecast button (006) was never a step and stays out (the Forecast tab step covers it).
- **Updated steps** (one short sentence each; builder may tighten, not lengthen). **Eight** steps, counter "N of 8" (was 6):
  1. **Map (open area)**: "Tap the map to drop a pin; zooming out stops at the lower 48." *(updated: zoom floor)*
  2. **Sun stack** (top-left under Forecast): "Sunrise and sunset here; tap for a shooting-light countdown by game." *(new)*
  3. **Map Tools button**: "Map style, Wind arrows, and measuring live here." → after H4 ships: "Map style, Wind arrows, Property lines, and measuring live here." *(updated)*
  4. **Pins tab**: "Every pin in one list; search by name." *(updated; drop "; search by name" if F4b didn't ship)*
  5. **Log a hunt button** (on Pins): "Log a hunt to any pin from here." *(new)*
  6. **Forecast tab**: "The week ahead, plus the best pin for each of the next 3 days." *(unchanged)*
  7. **Scout tab**: "Ask Scout about your pins, hunts, and the forecast." *(unchanged)*
  8. **You menu**: "Profile, Appearance, and this tour live here." *(updated; "Profile and this tour live here." if F4a didn't ship)*
  - Wind arrows and Property lines are covered in the Map Tools copy (they live inside the sheet; the tour doesn't open it). The shooting-light game dropdown and countdown are covered in the sun-stack copy (the tour doesn't open the popover).
- **Step behavior (extends 011 E5):**
  - Step 1 (map): advances only, no pin draft. Step 2 (sun stack): **advances only; does not open the popover** (the popover is described, not opened, so the tour never fights 013's "tour closes the popover" rule). Step 3 (Map Tools): advances only, doesn't open the sheet. Step 4 (Pins tab): switches to Pins, then spotlights the Log a hunt button. Step 5 (Log a hunt): **advances only; doesn't open the form**. Steps 6–7 (tabs): switch tab and continue. Step 8 (You): finishes and returns to **Map**, menu closed.
  - Taps outside the highlight do nothing; Skip on every step; 012 `placeTooltip` for every bubble (arrow tip ±4pt of target center); 011 re-measure/skip-if-missing rule; Reduce Motion and VoiceOver per 011 E5. The Scout tutorial (011 E6) still waits until the tour ends.
  - Opening the tour closes the shooting-light popover (013 rule).
- **Per-account flag (decided from docs):** the account model (`ACCOUNTS_SIGNUP_LOGIN_v0.md`, `CORE_SCHEMA_v0.md`) has a stable `userId`/`accountId` from the `AuthSession` boundary (real provider TBD; a dev stub that survives relaunch is allowed), and a **profile** record per user (`homeState`, `defaultAnimals` from 005 M2, `tz`). Live backend sync is out of scope in every job so far, so the profile store may be local-only today. Therefore:
  - **Local (always):** AsyncStorage key **`tour.coachmarks.v2.<userId>`** = `{ doneAt: ISO string, via: 'finish' | 'skip' }`. Keyed by `userId`, so a second account on the same device gets its own tour.
  - **Profile (if the profile record persists through the account/profile boundary, stub or real):** add one optional profile field **`tourCoachmarksV2DoneAt`** (ISO string or null), written alongside the local flag. If the profile is persisted by the provider, the same account on reinstall/new device won't re-trigger; if it's local-only today, the field is still written so it syncs once a real backend lands. Builder traces the profile store and records which case applies. No backend change and no new backend fields beyond this one optional profile field.
  - **Auto-launch if and only if** (pure function, tested): signed in (`userId` present) AND onboarding (niche/region) complete AND local flag for this `userId` unset AND profile field unset AND Map tab focused AND **no modal open**.
  - **Skip and finish both** set the local flag and the profile field. Replay from You → App tour never changes flags.
  - **v1 → v2:** the tour changed materially, so existing accounts (Beau included) see the updated tour **once** after updating. The legacy per-install `tour.coachmarks.v1` key does **not** suppress v2 (left in place, unused). If Beau prefers existing accounts not to see it again, the switch is: treat a set v1 key as done for the account that signs in first after update. That alternative is **non-blocking**; default is existing accounts see v2 once.
  - **Sign-out** alone doesn't reset anything. Signing in as a new account B on the same device → B gets the tour once. Signing back in as A → no tour.
- **"No modal open" means none of:** onboarding screens, the Map Tools sheet, shooting-light popover, pin popup / new-pin popup, pin detail or hunt detail pushed over Map, log-a-hunt form, You menu, any system alert or Apple sign-in sheet, the "Drop a pin first" alert, keyboard up. If blocked, the tour waits and starts the next time Map is focused with nothing open, in the same session (no timer polling faster than about once per second; prefer event-driven: modal close / focus events). It never appears over a modal, and a modal opened while it's waiting cancels that attempt until clear.
- **Dev-only reset:** a `__DEV__`-only You-menu row "Reset tour for this account" clears the local flag (and profile field) so Lane can re-run auto-launch and the modal guard; unreachable in release builds.
- **Tests to add:** `shouldAutoLaunchTour` truth table (signed out, onboarding pending, local set, profile set, modal open, other tab, all clear); flag storage per `userId` (A done, B not → B launches, A doesn't); v1 key present → still launches v2; skip and finish both write both stores; replay doesn't write; step list/config test (8 steps, one sentence each, conditional copy for F4a/F4b/H4).

## H4. Property lines layer (free TX source only; GATED)

- **Source (memo Option A, the only allowed source):** Texas Geographic Information Office (TxGIO, formerly TNRIS) **StratMap statewide land parcels**, compiled from county appraisal districts. Public ArcGIS MapServer, no key:
  `https://feature.geographic.texas.gov/arcgis/rest/services/Parcels/stratmap_land_parcels_48_most_recent/MapServer`
  (the memo's older `feature.tnris.org` host returned nothing on 2026-09-25; use the `geographic.texas.gov` host.)
- **Sage's check of the live service (2026-09-25, ~10:30 PM CT; builder re-verifies):**
  - Title "StratMap 2025 Land Parcels"; capabilities `Query,Map`; spatial reference 102100 (3857); `singleFusedMapCache: false` (**no pre-cached `/tile` endpoint**, dynamic `export` only); `exportTilesAllowed: false` (no bulk/offline tile export); `supportsDynamicLayers: true`.
  - Layer 0 scale range `minScale 1:500,000` / `maxScale 1:1,000`: the server draws **nothing** wider than about zoom 10 at Texas latitudes.
  - Copyright text: **"Texas Geographic Information Office, Various Counties, Various Vendors"**.
  - `/export` for a Dallas z16 tile (`bboxSR=3857`, 256×256, `png32`, `transparent=true`) → **200 image/png in ~0.5s**; 512×512 at `dpi=192` → 200 in ~0.75s. Default look: 1px gold outline (`#D4AF37`), no fill.
  - `dynamicLayers` restyling **works** (tested a light line `#FFE08A` 1.25 width over a dark `rgba(0,0,0,0.55)` 3-width halo, two passes of layer 0; first array entry draws on top).
  - `/identify` works and returns **owner name, mailing address, and values** (PII). **Not used in v1.**
  - `/query` on layer 0 → "Requested operation is not supported" (the memo's caveat holds). No bulk vector download in-app.
  - TxGIO's program page: free, "not survey grade and should not be used for legal purposes", refreshed roughly annually per county, and **"Not all counties are available"** (memo: ~253/254 counties). License info on the items is a disclaimer only; there's **no explicit grant for commercial app redistribution** found (memo: ToS review Finley → Morgan / counsel).
- **Approach (supersedes the memo's tap-to-identify spike for this layer):** server-rendered **raster tiles** from the MapServer `export` operation, drawn with react-native-maps **`WMSTile`** (already installed; it fills `{minX},{minY},{maxX},{maxY},{width},{height}` with an EPSG:3857 tile bbox; see `src/MapWMSTile.tsx` and `ios/AirMaps/AIRMapWMSTile.m` in react-native-maps 1.29.x; builder confirms in the lockfile version). No vector download, no scraping, no bulk pulls, no proxy, no caching server. Memo's identify + `Polygon` + owner sheet stays **Later**.
  - **URL template (builder finalizes):** `…/MapServer/export?bbox={minX},{minY},{maxX},{maxY}&bboxSR=3857&imageSR=3857&size={width},{height}&dpi=<96 or 192>&format=png32&transparent=true&dynamicLayers=<percent-encoded JSON>&f=image`. The `dynamicLayers` JSON **must be percent-encoded** in the template (raw `{`/`}` and quotes break `NSURL` parsing and could collide with the placeholder replacement). One constant in one file (e.g. `src/map/parcels/parcelSource.ts`) with a comment naming TxGIO and the SPEND GATE.
  - `tileSize` 512 with `dpi=192` recommended for crisp lines on Retina (builder may pick 256; records it and request counts).
  - **Min zoom (performance):** `minimumZ` **14** (builder may tune 13–15 on device with Lane and records it). Below it: no parcel tiles requested, and a small hint shows while the layer is on: **"Zoom in to see property lines"**. `maximumNativeZ` about 18 (overzoom beyond; service max scale ~z19). **Never** `shouldReplaceMapContent` on this overlay (it would hide the basemap/Topo).
  - **Z-order:** parcel tiles above the basemap and USGS Topo tiles, **below** wind arrows, pins, the ruler line, and any pin popup. Toggling does **not** remount `MapView` or change its `key`/`mapType`; style, region, zoom, pins, wind, and ruler stay as they were.
  - **No disk tile cache in v1** (no `tileCachePath`); normal iOS HTTP caching only. Offline parcels are Later (`exportTilesAllowed: false` also points that way).
- **Styling (readable on Standard, Satellite, and Topo in dark mode):** two-pass `dynamicLayers` render: a thin **light warm line** (suggest `#FFE08A`, width ~1.25 at 96 dpi-equivalent) over a **dark halo** (`rgba(0,0,0,0.55)`, width ~3). No fill. Not `#BF5700` and not confusable with pins, the ruler, or wind arrows (builder checks side by side). Builder may tune color/width after Lane's stills on all three styles; records final values. Map-level `opacity` on the tile overlay allowed (e.g. 0.9).
- **Map Tools layer list:** a **Property lines** switch in the same layer list as **Wind** (below it), subtitle **"Texas tax parcels. Not a survey."** Off by default on fresh install. Persists locally per install (AsyncStorage `mapLayer.propertyLines.v1`); relaunch restores it. Works on all three styles and with Wind on/off.
- **On-map notes while the layer is on (one small line, same family as the "Sample wind" badge; clear of the bar, Map Tools button, Topo attribution, Apple legal, wind badge + legend, and the sun stack; builder records placement):**
  - **Attribution (always while on):** **"Property lines: TxGIO, Texas appraisal districts. Not a survey."**
  - **Zoomed out** (below min zoom): **"Zoom in to see property lines"**.
  - **Outside Texas** (map center outside a small bundled simplified Texas outline, pure `isInTexas(lat, lng)`): **"Property lines cover Texas only for now"**; no tile requests outside Texas (the `WMSTile` isn't mounted, or its bbox check skips; builder picks).
  - **Coverage varies:** the attribution sheet/row in Map Tools (not the map line) says "Coverage varies by county." Detecting a missing county inside Texas is **best-effort and optional in v1**; it must not use `/identify` (returns owner data) or any bulk query. If the builder finds a clean, PII-free way, it shows **"No property lines for this area"**; otherwise it's Later.
  - **Failed load / offline:** `WMSTile` doesn't report tile errors, so a **light health probe**: when the layer turns on and on map settle (debounced; at most once per ~30s while healthy, every ~15s while failing), `fetch` the export URL for the tile at the map center with an ~8s timeout (`AbortController`). Non-200, non-image content type, timeout, or network error → **"Property lines couldn't load. Check your connection."** The layer stays toggled on, the map keeps working, and the line clears on the next good probe. No new dependency (no NetInfo unless already installed). The probe sends nothing but the bbox; it never requests attributes.
- **Privacy / legal:** lines only. **No owner names, addresses, values, or parcel IDs** fetched, stored, or shown in v1 (the service has them; v1 doesn't touch them). No parcel tap behavior (tapping the map still opens the new-pin popup; tapping pins works as before). Disclaimer in the attribution line and Map Tools subtitle. Never implies "you can hunt here".
- **SPEND GATE (hard stop):** before writing H4 UI, the builder checks (and records in build notes, with links and dates): (a) the endpoint still serves `export` images keylessly from a client; (b) TxGIO's published terms/disclaimers for the parcels program and ArcGIS services; anything that **bars app use or redistribution**, requires a key, account, or payment, or asks for a formal agreement → **stop**; (c) coverage at the Lane test spots (below) and whether there are large gaps; (d) any rate limit/throttling signs (HTTP 429/403, captcha, very slow responses) at normal panning. **If any check fails, the builder stops H4, ships H1–H3, and reports what failed. Sage flags it to Finley. No paid or alternative source is substituted** (Regrid, ReportAll, LightBox, Land Owl, onX, county CAD scraping, or anything else is forbidden in this job), and no proxy/server is stood up (hosting is spend).
- **Test spots (Lane; builder uses the same for tile checks):** Dallas downtown (32.7767, −96.7970; dense urban); Llano County ranchland (≈ 30.75, −98.68; large rural tracts); a Gulf Coast marsh near Port Lavaca (≈ 28.62, −96.63); a Panhandle field near Amarillo (≈ 35.2, −101.8); an East TX timber tract near Lufkin (≈ 31.34, −94.73); one out-of-state point (e.g. Shreveport, LA ≈ 32.52, −93.75) for the Texas-only line.
- **Tests to add:** `isInTexas` (inside points, the out-of-state points above, border towns like Texarkana/El Paso sides, NaN → false); tile URL builder (placeholders present once each, `dynamicLayers` percent-encoded and decodes to valid JSON, no raw braces other than placeholders, no key/token params); min-zoom gating (zoom 13.9 → no overlay/hint, 14 → overlay); probe state machine with mocked `fetch` (200 image → ok; 500, text/html, timeout, reject → failed; recovers); persistence (fresh → off; on → relaunch on); a test that no field names like `owner_name`/`mail_addr` appear in parcel code paths or requests.

## Research

- **Base:** Job 013 landed at Origin main `af447ef4ee4127560cb7ed31619a8819b6269498`. Don't open on an older commit.
- **Names/sources unchanged:** AI is **Scout**; topo is USGS `USGSTopo` (approved, attribution required); sun math is the in-house NOAA module from 012; shooting-light table per the 013 Delta (Ellis-verified). **This job does not change the shooting-light table, state text, or note.**
- User-facing word is **pin**, never "spot".
- **Nav lock amendment (2026-09-25, Job 013 landed; Job 014 approved, Beau scope via Finley):** Job 013 landed on main `af447ef`. Tabs stay **Map | Pins | Forecast | Scout** (Map default); You menu stays top-right. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. The amended lock text Sage handed with this brief is the source for the Job 014 nav changes; H2, H3, and H4 above are the working spec. H1 is a bug fix of the 013 sun-stack backing and does not change the lock. The new amendment, as handed, in full:

  > Amendment 2026-09-25 (Job 013 landed; Job 014 approved, Beau scope via Finley). Job 013 landed on main `af447ef`. Tabs stay **Map | Pins | Forecast | Scout** (Map default); You menu stays top-right.
  > - **Log a hunt on Pins:** the Pins tab gets a **"Log a hunt"** button at the top, above the search field and list (fixed header, ≥ 44pt). It opens the existing log-a-hunt form (no new flow, no pin preselected); after save the user is back on the Pins list with the new log under its pin. Pin detail's "Log a hunt" (pin preselected) is unchanged.
  > - **Property lines layer (TX only):** Map Tools' layer list gets a **Property lines** switch under Wind, **off by default**, saved locally. Lines only (no owner data), from the free TxGIO StratMap statewide parcels service, shown from about zoom 14 in, with the attribution "Property lines: TxGIO, Texas appraisal districts. Not a survey." It's a map layer, not a control, and doesn't count toward Map's floating controls. Gated: if free coverage or terms fall short, it doesn't ship and no paid source replaces it.
  > - **App tour:** updated to 8 steps (adds the sun stack and the Pins "Log a hunt" button) and auto-launches once per account after first sign-in; still replayable from You → App tour.

- No live weather/wind, no AI model, no keys, no spend. Sun math and shooting-light math stay on-device. H4 is the only new network source, and only if the SPEND GATE passes. No schema changes beyond local prefs/flags (`mapLayer.propertyLines.v1`, `tour.coachmarks.v2.<userId>`) and the optional profile field `tourCoachmarksV2DoneAt`.
- Do not edit Job 001–013 files.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### H1. Sun-stack glass stays (FIRST)

**Symptom (Beau via Finley, 2026-09-25):** glass behind the sun stack disappeared during normal use; trigger unknown.  
**Failure mode found by builder:** _(filled in build notes: trigger(s), code path, evidence)_

- [ ] Builder traced every path in the 12-item trigger matrix and recorded what each does to the stack's backing (mount, key, opacity, clip, z-order, material)
- [ ] **Root cause** in build notes with evidence (code path, trigger, a test that failed before and passes after). If several, each listed. If the trigger can't be reproduced in tests, the most likely cause(s) with evidence and the hardening done for each suspect
- [ ] Backing always mounted with a stable key; no branch renders "no backing"; no ancestor `opacity` < 1; explicit size; explicit `zIndex`
- [ ] Glass (or solid under Reduce Transparency) present after **every** matrix item on device (Lane), on Standard, Satellite, Topo
- [ ] Fix also holds for the glass bar and Map Tools button if they share the component (Lane spot-check)
- [ ] Regression tests: backing present and not remounted across popover ×20, game change, AppState background → active, Appearance change, Reduce Transparency change, style change, Wind toggle; `getGlassBacking` never "none"

### H2. Log a hunt on Pins

- [ ] "Log a hunt" button at the top of Pins, above search (if shipped) and list, fixed header, ≥ 44pt, full width, clear of Dynamic Island and You menu on SE and Pro Max
- [ ] Styling matches the pin-detail button (or dark/glass fallback); 4.5:1; Reduce Transparency solid; no orange panel
- [ ] Opens the **existing** form, no pin preselected; save requires a pin; no new flow or screens
- [ ] 0 pins → "Drop a pin first. Hunts are saved to a pin." with Go to Map / Cancel
- [ ] After save → Pins list, query cleared, scrolled to top, pin at top with updated count/date, new log first in its history, no relaunch
- [ ] Cancel → Pins list unchanged (query, scroll)
- [ ] VoiceOver "Log a hunt, button"; keyboard dismissed on tap

### H3. Tour update + per-account auto-launch

- [ ] 8 steps with the copy above (conditional variants for F4a/F4b/H4), one short sentence each, counter "N of 8"
- [ ] Step behaviors as listed (sun stack and Log a hunt advance only; Pins tab switches then spotlights Log a hunt; You finishes on Map)
- [ ] Arrows on target (±4pt) on SE and Pro Max, first run and replay; unmeasured target → step skipped
- [ ] Local flag `tour.coachmarks.v2.<userId>`; profile field `tourCoachmarksV2DoneAt` written if the profile persists (builder records which case)
- [ ] Auto-launch once per account after first sign-in (after onboarding), on Map, never over a modal; waits and launches when clear
- [ ] Second account on the same device gets it; first account doesn't again; sign-out alone resets nothing
- [ ] Skip and finish set both stores; replay changes nothing; Scout tutorial waits
- [ ] `__DEV__`-only "Reset tour for this account" exists for testing and is absent from release builds
- [ ] Tests: `shouldAutoLaunchTour` truth table, per-user storage, v1 key doesn't suppress v2, skip/finish writes, replay doesn't

### H4. Property lines (gated)

- [ ] SPEND GATE checks recorded (endpoint, terms, coverage, rate limits) before UI; if any fails, H4 stopped and reported, no substitute
- [ ] Map Tools **Property lines** switch under Wind, subtitle "Texas tax parcels. Not a survey.", off on fresh install, persists
- [ ] TxGIO `export` via `WMSTile`, one constant, percent-encoded `dynamicLayers`, no key, no proxy, no disk cache, no `shouldReplaceMapContent`
- [ ] Lines render at zoom ≥ 14 (or recorded value), readable on Standard, Satellite, Topo (dark); below min zoom, "Zoom in to see property lines" and no requests
- [ ] Above basemap/Topo, below wind/pins/ruler/popups; toggling never remounts the map or changes style/region/pins/wind/ruler
- [ ] Attribution line while on; outside Texas → "Property lines cover Texas only for now" and no requests; failed/offline → "Property lines couldn't load. Check your connection." and recovers
- [ ] No owner/address/value/parcel-ID data fetched, stored, or shown; no `/identify`/`/query` calls; tap-to-pin and pin taps unchanged with the layer on
- [ ] Tests: `isInTexas`, URL builder, min-zoom gating, probe states, persistence, no PII fields

### Regression checklist (008–013 behavior must hold)

- [ ] **Tests:** all **256 existing tests** at `af447ef` green (count recorded), plus new H1–H4 tests
- [ ] **013 G1 min zoom:** street → floor → street on all 3 styles, Wind on and off: no blank, no jolt, same style; now also with Property lines on
- [ ] **013 G2/G3:** sun stack under Forecast, ≥ 44pt, opens the popover, never drops a pin; popover phases/colors/game selector/timer/persistence per the 013 Delta (Squirrel row, "No hour limit on private land", "Advisory only. Check local regs and verify current TPWD regulations.")
- [ ] **012 F1 wind:** arrows visible on all 3 styles, badge + legend only while showing; Wind off leaves nothing; no remount
- [ ] **010/011 Topo:** stays Topo at every zoom, attribution visible (and not overlapped by the parcel attribution)
- [ ] **012 F2 tour arrows** on target for every step (now 8)
- [ ] **012 F3 sun times** on every forecast row; no "sample" label on sun times
- [ ] **011 E3** thin gray tab line; **011 E4** no Scout suggestion chips (hunt-log step chips only while logging)
- [ ] **008 ruler** drag on Topo, with Wind on, and with Property lines on
- [ ] **009 C7 tap-to-pin:** 20 single taps on empty map (3 styles, Wind on, Property lines on, next to the sun stack) all open the new-pin popup
- [ ] **Pin popup:** 20 pin taps (3 styles, Wind on, Property lines on) all open that pin's popup
- [ ] **005 Log a hunt from pin detail** still preselects that pin and saves to it
- [ ] **012 F4a/F4b** still work if shipped
- [ ] Forecast button opens Forecast; glass see-through; "Scout" everywhere; "pin" not "spot"; dark default; pin style A; orange accent only; no pin/log data lost

### Hygiene

- [ ] Only H1–H4 are new
- [ ] No live weather or wind, no backend changes beyond the one optional profile field (H3), no keys, no spend, no proxy
- [ ] One new network source only (TxGIO parcels export, H4); USGS Topo unchanged
- [ ] No new dependencies (or each justified in the PR and build notes)
- [ ] No schema changes beyond local prefs/flags (`mapLayer.propertyLines.v1`, `tour.coachmarks.v2.<userId>`) and the optional profile field
- [ ] iOS-first; Cloud Agents only; one PR per milestone (H1, H2, H3, H4)

## User-facing UI

The sunrise/sunset glass just stays, whatever you do to the map. Logging a hunt is one tap from the Pins list. New hunters, and every new account on a shared iPhone, get a short tour of what's actually in the app now. And in Texas, a hunter can flip on property lines for free and see where the fences should be, clearly marked as tax parcels and not permission.

- The sun stack keeps its glass (or a solid backing under Reduce Transparency) through the full H1 trigger matrix, on Standard, Satellite, and Topo.
- Pins has a "Log a hunt" button above search and the list. It opens the existing form. After save, the new log is under its pin on the Pins list.
- The app tour is 8 steps and auto-launches once per account after first sign-in, on Map, never over a modal. You → App tour still replays it.
- Property lines, if the SPEND GATE passes, is an off-by-default Map Tools switch. Lines only, Texas only, with the TxGIO attribution. If the gate fails, H4 does not ship and H1–H3 still do.

## Payments and auth

- Payments: none. Do not invent spend. Weather stays the on-device stub. Wind stays the `WindSource` stub. The Scout chat stays an on-device stub. No live weather or live wind API. No keys, accounts, or spend. H4 uses only the free, keyless TxGIO StratMap parcels `export`. No paid parcel source, no proxy, no server. If the SPEND GATE fails, stop H4 and do not substitute.
- Auth: unchanged behavior (Apple primary, email secondary, no guest). No auth/BaaS provider swap. H3 keys the tour flag by `userId` and, if the profile store persists, writes optional `tourCoachmarksV2DoneAt`. No other account or backend change.
- Maps: existing Apple Maps stack plus the 010 USGS `USGSTopo` `UrlTile`, plus H4's TxGIO `WMSTile` overlay if the gate passes. No other tile provider. No new API keys or paid map SDKs. No new dependency unless justified in the PR and build notes.
- Location: sun times and shooting light stay on the map center, not GPS. Parcel notes use the map center for the Texas check and the health probe. No new location-permission dependency.
- Schema: no stored schema changes beyond local prefs/flags (`mapLayer.propertyLines.v1`, `tour.coachmarks.v2.<userId>`) and the optional profile field.

## Decisions for Beau

All three are **non-blocking**. Build with the defaults. Do not wait.

- **Non-blocking — button label:** "Log a hunt" (matches pin detail) vs literal "Log Hunt". Copy-only. **Default: "Log a hunt".**
- **Non-blocking — existing accounts and the updated tour:** existing accounts see the updated tour **once** (default yes, since steps changed). Alternative: suppress for accounts that already finished the v1 tour on this device (treat a set v1 key as done for the account that signs in first after update). **Default: they see v2 once.** The legacy `tour.coachmarks.v1` key does not suppress v2.
- **Non-blocking — Property lines before public beta:** TxGIO terms review (memo: Finley → Morgan / counsel) before the layer reaches TestFlight users. H4 can build and be tested on the Simulator meanwhile; the layer is **off by default**. This review does not block H1–H3, and it does not replace the builder's SPEND GATE. If the SPEND GATE fails, stop H4 and report it.

## Later (not in this job)

- **Owner names** and parcel details on tap (memo's identify + outline highlight + calm sheet with disclaimer), after ToS/legal review; never owner-name search
- Highlighting the tapped parcel outline; parcel acreage
- **Offline parcels** (service disallows tile export; would need a different free path or a gate)
- In-Texas county gap detection without PII (if not done in v1); a coverage map
- **Hunting-lease boundaries** (user-drawn or imported), public hunting land (TPWD APH/WMA) boundaries, and the public-land "check unit rules" warning from the shooting-hours pack
- Nationwide parcels (paid vendor only after Beau's spend unlock via Finley → Morgan → Beau)
- Logging a hunt from the Map screen directly; preselecting the nearest pin
- Tour analytics; per-feature "what's new" hints instead of re-running the tour
- Everything still on the 013 Later list (state-specific hours, shooting-light alarm, popover on pin detail/forecast rows, moon phase, live wind/weather behind a Beau go, wind slider, gusts, offline topo, GPS sun times, 24-hour setting, viewed-place time zone, Skia wind retry)

## Out of scope

- Live weather/wind or any live data API
- Backend or sync work (beyond writing one optional profile field if the profile store persists)
- Paid parcel/tile providers, keys, accounts, proxies, or spend of any kind
- Owner data, parcel search, parcel tap details, offline parcels
- Changes to the shooting-light table, copy, or timer
- A new log-hunt flow
- Anything not in H1–H4
- Editing Job 001–013 files

## Constraints

- Status: **FINAL, approved to build** (Beau's scope via Finley, 2026-09-25 10:22 PM CT). Decisions for Beau are non-blocking.
- Base: Origin main **`af447ef4ee4127560cb7ed31619a8819b6269498`** (Job 013 landed)
- Do not touch product code from this SoftwareFactory ticket. Workers build on the product repo.
- **Build notes must include:**
  - **H1:** which glass path runs (GlassView/BlurView, iOS version); each matrix item traced; **root cause** with evidence (failing-then-passing test); the fix; floor tint value if used; whether the bar/Map Tools button share the component
  - **H2:** where the button sits (offsets, height), which component/style reused, what the form does with no preselected pin, post-save behavior
  - **H3:** final step list + copy (and which conditional variants apply at `af447ef`: F4a/F4b shipped or not), flag key, profile-store finding (persisted or local-only) and the field written, modal-detection approach, v1 → v2 handling
  - **H4:** SPEND GATE results with links/dates; final URL template (no secrets; there are none); tile size/dpi; min zoom and why; line color/width/halo; overlay order; note placement; probe timings; `isInTexas` outline source and size; request counts seen per screen at min zoom
  - Any dependency added and why (none expected)
  - Test count before/after (256 → N), all green
  - Token usage
- **Lane Simulator signoff (shots / recordings):**
  - **H1 recording:** the full trigger matrix with the sun stack visible (popover ×20, game changes, tab switches, 3 styles, Wind, floor zoom, background/foreground, Appearance, Reduce Transparency, cold launch), glass present throughout; stills over bright Satellite before/after background
  - **H2:** Pins with the button on SE and Pro Max (with and without search text); the 0-pin alert; recording of Log a hunt → pick pin → save → back on Pins with the pin at top and the log in its history
  - **H3 recording:** full 8-step tour on SE and Pro Max after a fresh sign-in; second account on the same device gets it; first account relaunch doesn't; tour waiting while a modal is open, then launching when closed; You → App tour replay
  - **H4:** stills of Property lines at each test spot on Standard, Satellite, Topo (dark); min-zoom hint; Texas-only line at Shreveport; offline (Mac Wi-Fi off or Network Link Conditioner "100% Loss") error line and recovery; recording of toggling with Wind on and a pin tap / tap-to-pin while on
  - Test run output all green
- UI-check screenshots must not be committed to the product repo. Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this job folder. See `note.md`. The same rule is already in `.cursor/agents/ui.md` from Job 008.
- Milestone PRs merge through the normal permitted path. One PR per milestone (H1, H2, H3, H4). After a lower PR is squash-merged, the next PR is rebuilt on the new main on a fresh branch (never force-pushed) to avoid stacked-squash conflicts. See `note.md`.
- Document token usage and the items above in `factory/jobs/014-loghunt-parcels-sunglass-tour/build.md`.
- iOS-first. Cloud Agents only for code. One PR per milestone. H1 first. H4 last and gated.
- Hard hygiene: no live weather, no live wind, no backend beyond the one optional profile field, no new paid SDKs, no keys, no spend, no proxy. No new dependency unless justified in the PR and build notes. USGS topo tiles from 010 remain. H4's TxGIO parcels `export` is the only new network source, and only if the SPEND GATE passes. Sun math and shooting-light math stay on-device. The shooting-light table, state text, and note do not change.
- This public job tree stays free of secrets.
- Do not edit any Job 001–013 files.

## Design intent (one line)

The sunrise/sunset glass just stays, whatever you do to the map. Logging a hunt is one tap from the Pins list. New hunters, and every new account on a shared iPhone, get a short tour of what's actually in the app now. And in Texas, a hunter can flip on property lines for free and see where the fences should be, clearly marked as tax parcels and not permission.
