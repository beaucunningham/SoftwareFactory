# AC — Sun-stack glass fix (root cause) + Log a hunt on Pins + tour update with per-account auto-launch + Property lines layer (job 014)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_LOGHUNT_PARCELS_SUNGLASS_TOUR_v0.md`. No secrets. **Status: FINAL, approved to build.** Beau's go came via Finley on 2026-09-25 at 10:22 PM CT. Beau is testing Job 013 on the iOS Simulator; if that testing turns up a blocker, Finley adds a dated Delta here and to the brief. Weather and wind stay stubs (no live feed, no keys, no spend). Sun and shooting-light times stay on-device; the 013 shooting-light table and copy don't change. **The AI's user-facing name stays Scout.** Bar is **Map | Pins | Forecast | Scout**. Dark default, `#BF5700` accent only, pin style A. USGS topo stays approved. User-facing word is **pin**. **All 256 existing tests stay green.** No new dependencies unless justified in the PR and build notes. No secrets, no API keys, no spend, no proxy.

**Job id:** `014-loghunt-parcels-sunglass-tour`  
**Builds on:** Job 013 at Origin main `af447ef4ee4127560cb7ed31619a8819b6269498` (Job 013 landed)  
**Product repo:** https://cursor.com/codebase/beau-cunningham/hunting-companion

Brief: `brief.md` in this folder. Full product detail is in that brief.  
**Build order:** H1 first, its own PR, and H1 must not ship half-fixed. Then H2, then H3, then H4. **One PR per milestone.** H4 is gated and last; it can stop or drop without blocking H1–H3. After a lower PR is squash-merged, the next PR is rebuilt on the new main on a fresh branch (never force-pushed).  
Lane captures the shots and recordings listed at the end of this file. Those screenshots stay out of the product repo (see `note.md`).

**Decisions for Beau are non-blocking.** Defaults: button label **"Log a hunt"**; existing accounts see the updated tour **once**; H4 may be built and tested on the Simulator with the layer **off by default** while TxGIO terms review (Finley → Morgan / counsel) is still open before TestFlight. Do not wait on these.

**Builder constraint:** cloud builders run on Linux and can't run the iOS Simulator. Deepest reproduction possible: code tracing, unit/component tests (mocked `AppState`, `Appearance`, `AccessibilityInfo`, `fetch`, fake timers), reasoning from the lockfile versions of `expo-blur` / `expo-glass-effect` / `react-native-maps`, root cause with evidence. **Lane (Mobile) does the on-device confirmation** from the exact steps below and in build notes. If Lane disagrees with a root cause, it's reported before merge.

## Must pass

### 1. H1: Sun-stack glass never disappears

1.1. Build notes list which backing path runs (iOS 26+ `GlassView` vs `BlurView`; Simulator iOS version) and trace all **12 triggers**: (1) popover open/close ×20 with every dismiss type, (2) game change, (3) tab switch away/back, (4) style change Standard/Satellite/Topo, (5) Wind on/off, (6) zoom to the 013 floor and back, (7) background/foreground (~5s, ~60s, app switcher), (8) Appearance Dark ↔ Match iPhone (if F4a shipped) and system light/dark flip, (9) Reduce Transparency on → off, (10) rotation if supported (else portrait-only confirmed), (11) cold launch and sign-out/sign-in, (12) coach-mark tour start/skip/finish.
1.2. **Root cause** with evidence: code path, trigger, and a test that **fails before the fix and passes after**. Suspects checked and each ruled in/out: remount/key change, state-keyed conditional render yielding no backing, **ancestor `opacity` < 1** on a native effect view, effect lost after background, `tint`/style prop change not re-applied, `overflow`/`borderRadius` clipping or 0×0 layout, z-order under the map after style/overlay change, tour/popover leftovers.
1.3. The backing is **always mounted** with a stable key; no branch renders nothing (glass ↔ solid swaps material only); no ancestor `opacity` < 1; explicit size; explicit `zIndex`. Material re-applied on `active`, Appearance, and Reduce Transparency changes without remounting the Map.
1.4. A residual dark floor tint (≤ ~0.15 alpha, plain `View`) under the effect is allowed but **isn't** accepted as the fix by itself.
1.5. On device, glass (or solid under Reduce Transparency) is present behind the stack **after every trigger**, on Standard, Satellite, and Topo; text stays 4.5:1 over bright Satellite.
1.6. If the glass bar / Map Tools button share the backing component, they pass the same triggers.
1.7. Tests: `getGlassBacking` (or equivalent) never returns "none"; component tests assert `testID="sunStackBacking"` is present and **not remounted** across popover ×20, game change, `AppState` background → active, Appearance change, Reduce Transparency change, style change, Wind toggle; no ancestor opacity < 1 with the popover open.

### 2. H2: "Log a hunt" button on Pins

2.1. A **"Log a hunt"** button sits at the top of the Pins tab, **below** the header / You menu row and **above** the search field (if F4b shipped) and the list; button + search are a fixed header and the list scrolls under them.
2.2. Height **≥ 44pt** (48pt suggested), full width inside list padding, whole row tappable; clear of the Dynamic Island / status bar and the You menu on **iPhone SE (3rd gen)** and a **Pro Max**.
2.3. Styling reuses the pin-detail "Log a hunt" button (or, if none exists, dark/glass with a white label and `#BF5700` only as a small accent). Label 4.5:1; Reduce Transparency → solid dark; no orange panel.
2.4. Tap opens the **existing** log-a-hunt form (same component pin detail uses), **no pin preselected**; the form's existing pin picker is used; save still requires a pin. No new screens or steps.
2.5. **0 pins:** tap shows "Drop a pin first. Hunts are saved to a pin." with **Go to Map** (switches to Map) and **Cancel**. The 008 empty state stays below the button.
2.6. **After save:** back on the **Pins list**; search query cleared; list scrolled to top; that pin is first (008 sort) with updated hunt count and last-hunted date; opening it shows the new log first in its history. No relaunch.
2.7. **Cancel:** back on Pins with query and scroll unchanged; nothing saved.
2.8. With the search keyboard up, tapping the button dismisses it and opens the form. VoiceOver reads "Log a hunt, button". Reduce Motion: existing plain-fade transition.
2.9. Weather-at-log stub still uses the chosen pin's coordinates; 005 pin-detail "Log a hunt" still preselects its pin.

### 3. H3: Tour update + per-account auto-launch

3.1. **Eight steps**, counter "N of 8", one short sentence each (builder may tighten, not lengthen):
   1. Map: "Tap the map to drop a pin; zooming out stops at the lower 48."
   2. Sun stack: "Sunrise and sunset here; tap for a shooting-light countdown by game."
   3. Map Tools button: "Map style, Wind arrows, and measuring live here." (H4 PR changes it to "Map style, Wind arrows, Property lines, and measuring live here.")
   4. Pins tab: "Every pin in one list; search by name." (drop "; search by name" if F4b didn't ship)
   5. Log a hunt button: "Log a hunt to any pin from here."
   6. Forecast tab: "The week ahead, plus the best pin for each of the next 3 days."
   7. Scout tab: "Ask Scout about your pins, hunts, and the forecast."
   8. You menu: "Profile, Appearance, and this tour live here." ("Profile and this tour live here." if F4a didn't ship)
3.2. Behavior: map, sun stack, Map Tools, and Log a hunt steps **advance only** (no pin draft, no popover, no sheet, no form); Pins tab switches to Pins then spotlights Log a hunt; Forecast and Scout switch tabs; You finishes on **Map** with the menu closed. Taps outside the highlight do nothing; Skip on every step; starting the tour closes the shooting-light popover.
3.3. Every bubble uses 012 `placeTooltip`: arrow tip within **±4pt** of target center x, bubble clear of notch/Dynamic Island, home indicator, and bar, on SE and Pro Max, first run and replay. Unmeasured target → re-measure briefly, then skip that step (011 rule). Reduce Motion: instant or ≤150ms fade. VoiceOver: tip + counter read first, highlight "double-tap to continue", Skip reachable.
3.4. **Local flag** `tour.coachmarks.v2.<userId>` = `{ doneAt, via: 'finish' | 'skip' }`. **Profile field** `tourCoachmarksV2DoneAt` written too if the profile record persists through the account/profile boundary; build notes say whether the profile store is persisted or local-only at `af447ef`.
3.5. **Auto-launch iff** signed in AND onboarding complete AND local flag unset for this `userId` AND profile field unset AND Map focused AND **no modal open** (onboarding, Map Tools sheet, shooting-light popover, pin/new-pin popup, pin or hunt detail, log form, You menu, system/Apple sheet, any alert, keyboard). If blocked, it starts the next time Map is focused with nothing open, same session; **never over a modal**.
3.6. **Skip and finish** both write the local flag and (if applicable) the profile field. Replay from You → App tour always works, starts on Map, and writes nothing.
3.7. **Per account:** account A finishes → sign out → new account B signs in on the same device → B gets the tour once → sign back in as A → no tour. Sign-out alone resets nothing. Existing accounts see the v2 tour once after update (legacy `tour.coachmarks.v1` doesn't suppress it).
3.8. Scout tutorial (011 E6) still waits until the tour ends.
3.9. A `__DEV__`-only "Reset tour for this account" row (You menu) clears this account's local flag (and profile field) so Lane can re-test; unreachable in release builds.
3.10. Tests: `shouldAutoLaunchTour` truth table (signed out, onboarding pending, local set, profile set, modal open, other tab, all clear → true); per-`userId` storage (A done ≠ B done); v1 key present → still launches; skip/finish write both; replay writes nothing; step config (8 steps, conditional copy variants).

### 4. H4: Property lines layer (Texas, free source, GATED, own milestone)

4.1. **SPEND GATE first** (recorded in build notes with links + dates, before UI): (a) TxGIO `export` serves images keylessly from a client; (b) TxGIO terms/disclaimers don't bar app use/redistribution or require a key, account, payment, or agreement; (c) coverage at the 6 test spots; (d) no throttling (429/403/captcha/very slow) under normal panning. **Any failure → stop H4, ship H1–H3, report; Sage flags to Finley. No paid or alternative source** (Regrid, ReportAll, LightBox, Land Owl, onX, CAD scraping, etc.), no proxy/server.
4.2. **Source:** only TxGIO StratMap statewide land parcels, `https://feature.geographic.texas.gov/arcgis/rest/services/Parcels/stratmap_land_parcels_48_most_recent/MapServer`, `export` operation, rendered with react-native-maps **`WMSTile`** (EPSG:3857 bbox placeholders). One constant in one file, `dynamicLayers` JSON **percent-encoded**, `bboxSR=3857&imageSR=3857&format=png32&transparent=true&f=image`, no key/token params. No `/identify`, no `/query`, no bulk download, no disk tile cache, **never `shouldReplaceMapContent`**.
4.3. **Map Tools:** a **Property lines** switch in the layer list under Wind, subtitle "Texas tax parcels. Not a survey." A "Coverage varies by county." note in the same sheet. **Off** on fresh install; state persists locally (`mapLayer.propertyLines.v1`) across relaunch.
4.4. **Min zoom:** tiles only at zoom **≥ 14** (builder may tune 13–15; value recorded). Below it, no parcel requests and the on-map line reads "Zoom in to see property lines". `maximumNativeZ` ≈ 18 (overzoom above).
4.5. **Styling:** two-pass `dynamicLayers` render, light warm line (≈ `#FFE08A`, ~1.25) over a dark halo (≈ `rgba(0,0,0,0.55)`, ~3), no fill; readable on **Standard, Satellite, and Topo** in dark mode at the test spots; not `#BF5700`; distinguishable from pins, ruler, and wind arrows. Final values recorded.
4.6. **Order and stability:** lines above basemap/Topo, **below** wind arrows, pins, ruler, and popups. Toggling never remounts `MapView` or changes style, region, zoom, pins, wind, or ruler. Topo attribution and Apple legal stay visible.
4.7. **On-map line** (one small line, same family as the Sample wind badge; clear of bar, Map Tools button, Topo attribution, Apple legal, wind badge/legend, sun stack; placement recorded): while on, **"Property lines: TxGIO, Texas appraisal districts. Not a survey."**; outside Texas (bundled simplified outline, pure `isInTexas`) → **"Property lines cover Texas only for now"** and **no requests**; failed/offline → **"Property lines couldn't load. Check your connection."**
4.8. **Health probe:** on toggle-on and on settle (debounced; ≤ once/~30s healthy, ~15s failing), `fetch` the center tile's export URL with ~8s timeout; non-200 / non-image / timeout / error → failed line; next good probe clears it; layer stays on; map keeps working. No new dependency.
4.9. **Privacy:** no owner names, addresses, values, or parcel IDs fetched, stored, or shown; no parcel tap behavior. Tap empty map → new-pin popup and tap a pin → its popup work unchanged with the layer on.
4.10. Optional: a PII-free in-Texas gap hint ("No property lines for this area"); otherwise Later.
4.11. Tests: `isInTexas` (inside, Shreveport/other out-of-state, Texarkana/El Paso border, NaN → false); URL builder (placeholders once each, `dynamicLayers` percent-encoded → valid JSON, no key params); min-zoom gating (13.9 no / 14 yes); probe state machine with mocked `fetch` (ok, 500, text/html, timeout, reject, recovery); persistence (fresh off, on survives relaunch); no `owner_name`/`mail_addr`/`situs` fields in parcel code or requests.

### 5. Regression (008–013)

**256 existing** tests at `af447ef` plus new tests green; 013 min-zoom 10-cycle behavior on all 3 styles (Wind on/off, and with Property lines on); 013 sun stack + popover per the 013 Delta (Squirrel row, "No hour limit on private land", "Advisory only. Check local regs and verify current TPWD regulations."); wind arrows + badge on 3 styles; Topo stays Topo with attribution; tour arrows on target; forecast sun times, no sample label; thin gray tab line; no Scout suggestion chips; ruler drag (Topo, Wind on, Property lines on); 20 tap-to-pin taps (3 styles, Wind on, Property lines on, next to the sun stack); 20 pin taps; pin-detail Log a hunt preselects; F4a/F4b if shipped; glass see-through; "Scout" everywhere; "pin" not "spot"; dark default; pin style A; no data lost.

## Fail if

- The sun-stack glass is missing after any of the 12 triggers on any style, or the "fix" is only the floor tint, or there's no root cause with a failing-then-passing test
- The Log a hunt button isn't above search/list, is under 44pt, collides with the You menu/Dynamic Island, opens a new flow, preselects a pin from Pins, lands anywhere but the Pins list after save, or the new log isn't visible under its pin without relaunch
- Tapping Log a hunt with 0 pins opens the form or does nothing
- The tour lacks any of the 8 steps, has multi-sentence tips, opens the popover/sheet/form during the tour, auto-launches over a modal, before sign-in or onboarding, twice for the same account, or not at all for a second account on the same device; Skip or finish doesn't set the flag; replay sets it or fails
- Any parcel data comes from anything other than TxGIO's free service; any key, token, account, proxy, or spend; a paid source substituted after a gate failure
- Property lines are on by default, don't persist, render below zoom 14 (or the recorded value), hide the basemap/Topo, draw above pins/wind/ruler, remount the map, or are unreadable on any of the 3 styles
- Owner names, addresses, values, or parcel IDs are requested, stored, or shown; `/identify` or `/query` is called
- No attribution while on; no Texas-only, zoom-in, or failed-load state; a failed load breaks the map
- Any existing test fails, or any regression item fails
- Any live weather/wind, backend change beyond the one optional profile field, unjustified new dependency, or scope creep

## Simulator sweep (Lane signoff)

Setup: clean build at each milestone's commit; iPhone SE (3rd gen) and a Pro Max Simulator; signed in with 20+ pins (plus a second test account with 0 pins); dark mode.

**H1 (glass)**

1. Map on Satellite over a bright area (e.g. West Texas sand, ≈ 31.9, −102.3). Confirm glass behind the sun stack.
2. Tap stack → popover → tap outside. Repeat **20×**. Then dismiss once each by pan, tab switch, You menu, Map Tools. Glass after each.
3. Open popover; switch Duck → Deer → Feral hogs → Squirrel → Duck; close. Glass.
4. Switch to Pins, Forecast, Scout and back to Map (tap quickly mid-crossfade too). Glass.
5. Map Tools: Standard → Satellite → Topo → Standard. Glass on each.
6. Wind on/off ×5. Glass.
7. Pinch out to the 013 floor, keep pinching, zoom back. Glass.
8. Home gesture (⇧⌘H), wait ~5s, return; again ~60s; open app switcher and return. Glass.
9. If F4a shipped: You → Appearance → Match iPhone, flip Simulator appearance (⇧⌘A) both ways, back to Dark. Glass.
10. Settings → Accessibility → Display & Text Size → Reduce Transparency on (solid backing) → off (glass back).
11. Rotate (⌘←/⌘→) if supported; otherwise confirm portrait-only.
12. Kill and relaunch; sign out and in. Glass. Replay the tour, Skip; replay, finish. Glass.
13. Spot-check the glass bar and Map Tools button through steps 2–12 if they share the component. Record any trigger that loses the glass (step, style, iOS version).

**H2 (Log a hunt)**

1. Pins tab on SE and Pro Max: button at top, above search and list, clear of You menu/Dynamic Island; scroll the list, button stays.
2. Type in search, then tap Log a hunt: keyboard drops, existing form opens, no pin preselected.
3. Pick a pin that isn't first in the list, fill species, save → back on Pins, query cleared, that pin at top with updated count/date → open it → new log first.
4. Tap Log a hunt → cancel → Pins unchanged.
5. Second account (0 pins): tap Log a hunt → "Drop a pin first…" → Go to Map lands on Map; Cancel stays.
6. Pin detail → Log a hunt still preselects that pin. VoiceOver reads the button. Reduce Transparency: solid button.

**H3 (tour)**

1. Account A with no v2 flag (fresh install or new account): sign in, finish onboarding → tour starts on Map, "1 of 8".
2. Walk all 8 steps: map/sun stack/Map Tools advance only (no pin, popover, or sheet); Pins tab switches and spotlights Log a hunt; Log a hunt advances only (no form); Forecast, Scout switch; You finishes on Map. Check arrow tips on target (stills of steps 2, 5, 8).
3. Relaunch: no tour. You → App tour: replays from Map; Skip on step 4 → back on Map. Relaunch: still no auto tour.
4. Sign out → sign in as account B → tour starts for B. Skip on step 1 → sign out → sign in as A → no tour → sign in as B → no tour.
5. Modal guard: (a) new account C: during onboarding, no tour; tour starts only after onboarding closes, on Map. (b) On Map, open You menu → `__DEV__`-only "Reset tour for this account" → the tour does **not** appear while the menu is still open or over any sheet; close the menu → tour starts. (c) Reset again, and immediately open Map Tools (or the shooting-light popover, or tap empty map for the new-pin popup) before closing things → no tour over it; close it → tour starts.
6. Confirm Scout tutorial didn't start during step 7. Reduce Motion on for one run; VoiceOver on for one run (tip read, Skip reachable).
7. If the profile store persists (per build notes): delete the app, reinstall, sign in as A → no tour. If local-only, reinstall → tour shows again (expected; noted).

**H4 (Property lines)** (only if the gate passed)

1. Fresh install: Map Tools → Property lines is **off**, subtitle and "Coverage varies by county." present. Turn it on.
2. At each test spot, zoom to ~15 on **Standard, Satellite, Topo**: Dallas (32.7767, −96.7970), Llano ranchland (30.75, −98.68), Port Lavaca marsh (28.62, −96.63), Amarillo field (35.2, −101.8), Lufkin timber (31.34, −94.73). Lines readable on all three; attribution line visible and clear of Topo attribution/Apple legal/bar/Map Tools/wind badge/sun stack.
3. Zoom out past 14: lines disappear, "Zoom in to see property lines" shows. Zoom back in: lines return.
4. Pan to Shreveport (32.52, −93.75): "Property lines cover Texas only for now", no lines.
5. With lines on: Wind on (arrows above lines), ruler drag (line above parcels), 20 tap-to-pin taps (popup each time), 20 pin taps (popup each time). Pins draw above lines.
6. Offline: turn off the Mac's Wi-Fi (or Network Link Conditioner "100% Loss"), pan to a new area → "Property lines couldn't load. Check your connection." within ~10s; map still pans/taps. Restore network → line clears and lines load.
7. Toggle off: lines and notes gone, style/region/pins/wind unchanged. Kill/relaunch with it on → still on. Toggle 10× across styles: no remount, no blank.
8. 013 floor 10-cycle on each style with Property lines on: no blank, no jolt.

**Regression**

Full test run green; 013 floor cycles (Wind on/off); popover phases + Squirrel + "No hour limit on private land"; wind on 3 styles; Topo max zoom; forecast sun times; tab line; no Scout suggestion chips; ruler; 20 tap-to-pin; 20 pin taps; F4a/F4b if shipped.

Lane captures: **H1 recording** of the trigger matrix with the glass visible throughout (+ bright-Satellite stills before/after background); **H2** Pins with the button on SE and Pro Max, the 0-pin alert, and a recording of log → save → back on Pins with the pin on top and the log in its history; **H3 recording** of the 8-step tour on SE and Pro Max, the account-B run, the modal-guard wait-then-launch, and replay; **H4** stills at each test spot on each style, the zoom-in hint, the Texas-only line, the offline line and recovery, and a recording with Wind on plus tap-to-pin/pin tap; test output all green.
