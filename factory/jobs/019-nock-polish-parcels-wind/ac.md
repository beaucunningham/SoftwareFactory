# AC — Nock polish: sun pill, N mark, loading wordmark, parcel box, zoom-12 lines, wind streamlines, keyboard avoidance, map rotation (job 019)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_NOCK_POLISH_PARCELS_WIND_v0.md`, plus **Sage decision 2026-10-01 1:30am CT**, **Delta 2026-10-01 1:33am CT (Beau)**, **Delta 2026-10-01 1:36am CT (Beau, approved 1:35am CT)**, and **Delta 2026-10-01 1:37am CT (Beau)**. No secrets. **Status: FINAL, approved to build.** Beau's go came via Finley at 1:21am CT on 2026-10-01. The 1:30am call is in force: every visible "Map center" / "at map center" fallback string goes, including the sun stack, the shooting-light popover source note, and the Forecast caption. "Last known location" and "at last known location" go with them. The fallback logic stays. The 1:33am delta adds **J8 keyboard avoidance**. The 1:35am approval adds **J9 map rotation and reset-north** (the 1:36am delta). The 1:37am approval adds **J10 keep the camera position**. The app name stays **Nock**. **The AI's user-facing name stays Scout.** Weather and wind stay stubs (no live feed, no keys, no spend), sampled per lat/lon. Sun and shooting-light times stay on-device. Bar is **Map | Pins | Forecast | Scout**. Dark default, `#BF5700` accent only, pin style A. USGS topo stays approved. User-facing word is **pin**. **All existing tests stay green (313+ at base; the count on `25626283c55778c83f39c9b4fef9265bd1ca6310` is likely 318, and the builder records the real count).** No new dependencies unless justified in the product PR. The only pre-justified re-add is Skia or Reanimated, via `npx expo install`, if either is missing. `react-native-keyboard-controller` is allowed only when the PR shows KeyboardAvoidingView, keyboard events, or Reanimated `useAnimatedKeyboard` cannot meet J8. No secrets, no API keys, no tokens, no accounts, no spend, no proxy.

**Hard rules:** no owner names and no phone numbers anywhere, ever. No TxGIO `identify` or `query`. Parcels stay the server-rendered `export` raster. Protect 014 H1 + 015: glass backings stay mounted with stable keys, no fade, no `opacity` < 1 on any ancestor of a glass view or of the Map scene. Do not touch the 015 tab transition config.

**Job id:** `019-nock-polish-parcels-wind`  
**Builds on:** Origin main `25626283c55778c83f39c9b4fef9265bd1ca6310` (short `2562628`). Jobs 017 I1–I6 and 018 have landed. Do not open on anything older.  
**Product repo:** https://cursor.com/codebase/beau-cunningham/hunting-companion

Brief: `brief.md` in this folder. Full product detail is in that brief.  
**Delivery:** one product pull request per milestone, in this order: **J1+J2** (may share one) → **J8** (its own small PR) → **J9** (its own small PR) → **J10** (its own small PR) → **J3** → **J4** → **J5** → **J6** → **J7** (its own PR, last; accounts for the J9 heading; cannot block J1–J6, J8, J9, or J10). Item 2 (tap drops a pin with lines on) is **no change**. Each PR merges through the normal permitted path only. After a squash-merge, the next PR is rebuilt on the new main on a fresh branch (never force-pushed).  
Lane captures the shots and recordings listed at the end of this file. Those UI-check screenshots stay out of the product repo (see `note.md`). Only the UI report markdown goes in the product repo.

**Out of scope Beau gates (do not build, do not wait):** the alternatives to the locked defaults, and every Later item. Locked defaults: property-line floor zoom **12** (11 is a gate); attribution is one small map line plus a Map Tools **Map credits** row; if streamlines miss the perf bar, ship arrows and report; Item 2 stays no change. The 1:30am call replaces Decision 2's old default (keeping the popover source note and the Forecast location caption). Do not build that old default. Later gates: parcel lines at z11, offline parcels, county-gap detection, masking streamlines around pins, a wind time slider, gusts, streamline color by speed, live wind/weather, animated brand moments, a light-mode N mark, highlighting a tapped parcel outline, follow-me/heading, GPS for wind, and everything still on the 017 Later list except owner names and phone numbers, which are permanently out.

**Builder constraint:** cloud builders run on Linux and cannot run the iOS Simulator. Every milestone needs deep code tracing (written in the PR, file/line at `2562628`), unit and component tests, lockfile-version source citations (including what **Expo Go SDK 57** bundles), Linux-side `curl` measurements for J5 and J6, and exact Simulator steps that Lane runs and confirms. Lane runs **J4** and **J7** performance in **both Expo Go and a dev build**. Lane runs **J8** on iPhone SE (3rd gen), iPhone 15, and iPhone 15 Pro Max, and on a real iPhone. Lane runs **J9** and **J10** on those three Simulators and records whether Expo Go and a dev build differ. If Lane disagrees with a trace, it goes back before merge.

## Must pass

### J1. Sun-stack fallback label removed (Beau item 5)

1.1. The Map sun stack shows **only** the sunrise row and the sunset row in `gps`, `lastKnown`, and `mapCenter` modes. No "Map center", "Last known location", or any other fallback text, and no dimmed icon in its place.
1.2. The label's render branch and styles are deleted (no hidden, zero-opacity, or empty reserved row).
1.3. 017 I6 fallback logic is unchanged: `resolveForecastPoint` truth-table tests pass unmodified. `mapCenter` mode still follows the settled map center, and `gps` mode still ignores pans.
1.4. **Beau's call, 1:30am CT, replaces Decision 2.** The shooting-light popover source note and the Forecast caption do not show fallback wording in any mode. Absent strings: "At map center (location off)", "At last known location", "at map center", "at last known location", and any other visible fallback source phrase. Those render branches are deleted (no hidden, zero-opacity, or empty reserved row). The GPS-success phrases "At your location" and "at your location" may remain when the source is `gps`. The builder records that. The fallback logic is unchanged.
1.5. Sun-stack backing present, same key, not remounted across source changes (014 H1 / 017 6.7 tests green). New test: no label node in any source. New test: the popover and the Forecast caption have no fallback source string in `mapCenter` and `lastKnown`.

### J2. Sun-stack pill hugs its content (Beau item 6)

2.1. Glass padding ≈ **8–10pt horizontal, 6pt vertical**, row gap ≈ 2pt, radius consistent with the glass family. Final values and the rendered size per device are recorded.
2.2. No empty glass: no fixed/min width beyond the content, no leftover label space. It hugs in the "—" state too.
2.3. The effective hit area is **≥ 44×44pt via `hitSlop`** (math recorded), not visual padding. The slop doesn't overlap the N mark, You menu, locate-me, or Map Tools. Tap → shooting-light popover unchanged (013 Delta contents, timer, game persistence).
2.4. Same top-left position as 017. Resize is style-only: no conditional render, re-key, new wrapper, animated resize, or opacity. The 014 H1 tests pass (only size/position assertions change, listed).
2.5. Popover arrow on the stack (±4pt). Tour step 2 spotlights the smaller stack (arrow ±4pt, SE + Pro Max, first run + replay). Still 8 steps, same copy.
2.6. Text ≥ 4.5:1 over bright Satellite through the glass. Reduce Transparency → solid dark, same size.

### J3. N mark at top center (Beau item 3)

3.1. The top-center Map branding is an **image of the N mark** (cream N + rust triangle) on a **transparent background**: no black box, no drawn rounded outline, no JPG fringe or halo, no text "Nock". 017 I1's text component is removed.
3.2. The asset is derived from `nock-app-icon.jpg` by **crop + key + resize only** (no redraw, recolor, stroke, or baked shadow). The triangle keeps the art's rust (not recolored to `#BF5700`). @1x/@2x/@3x PNGs are committed with the derivation script (016's script extended if it exists; no new npm dep). The PR shows a source vs export side-by-side over black and mid-gray.
3.3. Position: centered, top edge at **`insets.top + 2pt` (±2)**, just under the status bar / Dynamic Island, never overlapping either. Higher than 017's text (old vs new offsets recorded for SE, 15, Pro Max). About 28pt tall (recorded), fixed size.
3.4. Legible on bright Satellite (31.9, −102.3), mid Topo, and dark Standard via a subtle image shadow (values recorded). No pill, chip, or glass. Lane stills.
3.5. `pointerEvents="none"`: pan, pinch, pin taps, and tap-to-pin directly under it work. Never a VoiceOver button. Map tab only. Clear of the sun stack (incl. hitSlop), You menu, and tour bubbles.
3.6. Splash, app icon, and sign-in/tour logo are unchanged by J3.

### J4. Loading screen + native splash (Beau item 4)

4.1. **PR documents what each case shows**, with Lane captures: (a) Expo Go cold open of the project (Expo Go's own loading UI with the project icon/N, or whatever SDK 57 shows), (b) dev build cold launch (native splash), (c) the JS loading screen in both.
4.2. **JS loading screen** in Expo Go **and** builds: `#000000` full screen with the **full N + NOCK wordmark** (incl. the rust underline), derived from `nock-logo-wordmark.jpg` by crop + key (+ resize) only, transparent PNG, no visible box/seam.
4.3. Visible **≥ ~600ms** from its first layout and until init is done (the PR lists the real init tasks: fonts if any, storage hydration, auth hydration, others). Gives up at **~8s** and proceeds to normal handling. Never traps the user.
4.4. **Dev/standalone native splash** = the same keyed wordmark on `#000000` (expo-splash-screen config), same width and centered position as the JS screen, so native → JS has **no visible jump or seam**. `hideAsync` runs only after the JS screen has laid out.
4.5. **No white (or any light) flash** at any point: native splash → JS loading → first screen (Map, or sign-in when signed out), in Expo Go and in a dev build, in dark mode **and with the iPhone in Light mode**. Any new dependency (e.g., `expo-system-ui`) is justified or absent.
4.6. **No fade:** the overlay is removed by a hard cut. It's a sibling above the app, never a parent. No `opacity` on the app tree or Map scene at any time. After it's gone, the sun-stack glass is present, a tab switch works with one tap, and the map is interactive.
4.7. The auto tour never starts under the loading overlay (treated as a modal) and starts normally after it, per 014 H3.
4.8. Tests: `shouldDismissLoading` truth table (599ms → no; init + layout + ≥ 600ms → yes; 8s → yes); fake-timer component test; no ancestor opacity < 1 on the Map scene during and after; config test (splash image = wordmark asset, background `#000000`).

### J5. Watermark-like box removed (Beau item 7)

5.1. The PR has the full inventory of overlays and views rendered with Topo and/or Property lines on (props, decoded URL templates, `tileSize`, opacity, min/max/native Z, attribution/hint Views with size, background, and text source), file/line cited.
5.2. The PR re-runs Sage's live checks (date/time recorded): USGS z16 OK / z17+ 404 HTML; USGS outside US = blank light opaque tiles; TxGIO outside TX / z20 / broken JSON = transparent or a non-image; TxGIO without `transparent=true` = opaque near-white tile. It also curls **every mounted parcel template** (each band) at Dallas z13/z15 and reports % opaque (must be 0% fully opaque pixels).
5.3. **Root cause named with evidence** (which layer/view, which request or code path) plus a failing-then-passing test where testable. Lane confirms which layer toggle makes the box appear.
5.4. Fixed at the source (request fixed, view removed, or overlay clamped). No covering it, no parent opacity. On device: **no box** on Standard, Satellite, or Topo with Property lines on/off, at z8–z18 at Rockwall, Dallas, Llano, Port Lavaca, and Lufkin, plus a non-Texas point.
5.5. **Attribution compliant:** while Topo is on, a USGS / The National Map credit is visible on the map. While Property lines are on, "Property lines: TxGIO, Texas appraisal districts. Not a survey." (or the recorded short form that keeps "TxGIO" and "not a survey") is visible. Full credits (USGS acknowledgment, TxGIO line, "Coverage varies by county.") are in a Map Tools "Map credits" row or You → About. Final copy is recorded. This is the locked default.
5.6. Attribution and status lines are **small text, no box**, one line at a time per the recorded priority, and **never overlap** Map Tools, locate-me, the bar, the wind badge/legend, popups, or Apple's logo/**Legal** (visible and untouched). Checked on SE and Pro Max for all Topo × Property lines × Wind combinations.

### J6. Property lines when zoomed out (Beau item 1)

6.1. **Cause analysis in the PR:** for each of (a) client gate, (b) tile z/bbox math with `tileSize`, (c) JS zoom formula vs MapKit, (d) server `minScale`, (e) density/performance, the PR says real or not, with evidence. It includes MapKit's `path.z` at display zoom 11.0, 12.0, 13.0 (source citation **and** Lane's capture of actual request URLs, see sweep J6).
6.2. **Live service check recorded** (date/time): service/layer `minScale` 1:500,000 / `maxScale` 1:1,000; z10 standard tile (512px @ dpi 192) empty, z11 draws.
6.3. **Honest scale:** every parcel request's server scale (bbox m ÷ (px ÷ dpi × 0.0254)) equals the standard web scale of the **displayed** zoom ±1%. There's no dpi misreporting. `serverScaleFor` is tested (z11 → ~288,895; z10 → ~577,791, never requested). Tile math is **`tileSize={256}` with a literal `size=512,512&dpi=192`**, or 512pt tiles with a literal `size=1024,1024&dpi=192` if the builder shows that performs better. 256pt tiles are the recommended path. No fake-dpi hack.
6.4. **Floor = display zoom 12** (Beau's locked default). At ≥ 12, outlines render; below 12, no parcel requests and the **"Zoom in to see property lines"** line shows. Bands: Z 12–12.99 (cream α140, ~0.25), A 13–14.99 (α170, 0.4), B ≥ 15 (0.6 over casing 1.4). Final values recorded. All outline-only per 017 I4 (`esriSFSNull`, alpha-0 fill, `esriSLS` outline, `png32`, `transparent=true` once, percent-encoded `dynamicLayers`, no key).
6.5. **Measurements (Linux, final template):** Rockwall, Dallas residential, Llano, plus one more rural county at z11/z12/z13: time, KB, % non-transparent, % α≥200, % α≥100. At z12, Dallas has ≤ ~5% of pixels at α≥200 and Llano < 10% non-transparent. Tile requests per screen at 12.0 and 12.9 (SE + 15 Pro), and p50/p95 time to the last tile for a cold pan at Dallas and Llano (Lane). If Dallas p95 at 12 > ~5s, the data goes back to Sage before merge.
6.6. On device: thin outlines only, no blocks/haze/white boxes, at z12, z13, z15 on Satellite, Topo, and Standard at the 014 spots. Lines appear at display zoom 12 (not 13 or 14).
6.7. 014/017 behavior holds: off by default, persists, TX-only (no requests outside Texas), health probe (current band + same tile math), offline line + recovery, z-order, no remount on toggle, no disk cache, no `shouldReplaceMapContent`. **No identify/query** (grep proof).
6.8. Tests: band selection (11.9 none + hint / 12.0 Z / 12.99 Z / 13 A / 14.99 A / 15 B); URL builder per band; `serverScaleFor`; probe uses band + math. 017's 13-based tests updated (listed).

### J7. Wind streamlines (Beau item 8; own PR, last)

7.1. With Wind on and Reduce Motion off: thin white/translucent **animated streamlines with fading trails** flow along the stub field on Standard, Satellite, and Topo. The "Sample wind" badge and mph legend (reflecting the alpha ramp) show. No orange, no fills.
7.2. The field comes from `WindSource` sampled per lat/lon at a grid over the **visible region**, re-sampled on settle, continuous across 0.05° cells (no seams), correct direction. J9 has already enabled rotation, so this PR accounts for camera heading: from-N wind moves down the screen at heading 0, and at heading 90° it points screen-left-to-right (J9.5). Screen and geographic directions convert through the camera heading. If the map is pitched, use the static arrows. J9 leaves pitch off unless it was already on.
7.3. Particle count = `clamp(round(w × h / 650), 300, 600)` (values per device recorded). Trails are bounded, drawn in a few batched paths.
7.4. **UI thread only:** Skia `<Canvas opaque={false}>` + Reanimated `useFrameCallback`/worklets. No per-frame `setState`, `requestAnimationFrame`, `setInterval`, or `Animated` loop on JS.
7.5. **Gestures:** lines clear when a pan/zoom starts and resume within ~300ms of settle with a fresh field. The gesture flag is set once, with no per-event JS work.
7.6. **Stops** (no per-frame work) when Wind is off (canvas unmounted), the Map tab is unfocused, the app isn't active, or during gestures. Resumes when all clear.
7.7. **Reduce Motion** → the 012 static arrows. Toggling Reduce Motion while open switches live without remounting `MapView`.
7.8. **010 regression guard:** `opaque={false}`; no `<Fill>`, no full-size rect, no background on canvas/wrapper; wrapper `pointerEvents="none"` + absoluteFill; canvas never inside `MapView`; `MapView` key/mapType unchanged across toggles and renderer switches; all per-frame work in worklets; particles capped; stops per 7.6; no opacity animation on any wrapper. **Each item has a named test or Lane check in the PR.**
7.9. **Perf (in the PR, with method, device, iOS version):** Perf Monitor UI/JS fps (plus Skia debug or Instruments if available) for wind off; wind on idle 30s (Satellite, Dallas, 20+ pins); panning 10s; pinching 10s; Pro Max. **UI 55–60 fps p50 (min ≥ 50) while animating; JS ≥ 55; gesture fps within ~3 fps of wind off; no memory growth over the 2-minute soak.** Lane records this in both Expo Go and a dev build where they differ.
7.10. Z-order: above `MapView`, below every RN control/popup/tour/N mark/sun stack. Pin taps, tap-to-pin, the ruler, Map Tools, locate-me, the sun stack, the You menu, and tabs all work with streamlines running.
7.11. Expo Go support confirmed from `bundledNativeModules.json`. If Skia isn't available in Expo Go, Expo Go shows arrows (recorded). `WIND_RENDERER` kill switch exists. If 7.8–7.10 can't pass, ship `'arrows'` and report. J1–J6, J8, J9, and J10 are never blocked. The arrows fallback also respects heading (J9.5). Wind sampling uses the restored camera from J10. It does not refit the map.
7.12. Tests: `particleCount`, `sampleGrid`, `stepParticle` (direction, respawn, NaN-safe), heading rotation, lifecycle (off / blur / background / gesture → inactive), static guard test (7.8), `MapView` key unchanged across 20 toggles.

### J8. Keyboard avoidance (Delta 2026-10-01 1:33am CT; own small PR, after J1+J2)

8.1. Dropping a pin opens the popup with the keyboard closed (no autofocus on the name field). The default "Pin n" name is fine.
8.2. Tapping the name field opens the keyboard. The whole popup (name, type, CAD row, Save/Cancel) sits fully above the keyboard on iPhone SE (3rd gen), iPhone 15, and iPhone 15 Pro Max, and on a real iPhone via Lane's steps. If the content is taller than the space left, the focused field scrolls into view.
8.3. Tapping outside the field inside the popup, or the Done return key, dismisses the keyboard. The popup and the provisional pin remain. The pin is not cancelled.
8.4. Save with the keyboard open saves in one tap and closes both. Cancel removes the provisional pin and closes the keyboard.
8.5. The map doesn't jump or pan when the keyboard shows or hides. The provisional pin stays visible above the popup where space allows.
8.6. The same checks pass for pin detail rename, the log-hunt notes field, and Pins search. The focused field is visible and dismissible. A Done or dismiss-on-scroll is fine for lists.
8.7. The keyboard appears and hides smoothly (no layout flash). The 015 tab-switch and 014 glass regressions still pass. No `opacity` < 1 on any ancestor of glass or of the Map scene. No new dependency unless `react-native-keyboard-controller` is justified in the PR because KeyboardAvoidingView, keyboard events, or Reanimated `useAnimatedKeyboard` cannot meet 8.1–8.6.

### J9. Map rotation and reset-north (Delta 2026-10-01 1:36am CT; Beau approved 1:35am CT; own small PR, after J8, before J10)

9.1. A two-finger twist rotates the map smoothly (`rotateEnabled`). Pan and zoom still work during and after. Pitch and tilt stay off unless they are already on at `2562628`. This is not follow-me or heading mode. Those stay Later.
9.2. When the heading is more than about 2° from north, a compass button appears directly above locate-me. The bottom-right stack is Map Tools, then locate-me, then the compass, with even spacing. The button is 44pt or larger and uses the same glass style as locate-me. Its needle or N tracks the current heading live. At north-up it is hidden. The native MapKit compass is off (`showsCompass={false}`). Only one compass shows.
9.3. Tapping the compass animates the camera to heading 0 in about 300ms or less (about 250–300ms). Then the button hides. Show and hide use mount or scale. They never fade a parent to `opacity` 0. The glass backing is intact. No `opacity` < 1 on any ancestor of glass or of the Map scene.
9.4. While rotated: a pin tap opens that pin, tap-to-pin drops at the tapped point, property lines align with the basemap at z12–z16, and the ruler measures correctly.
9.5. Wind arrows, and later J7 streamlines, point in the true geographic direction while rotated. A stub wind from the north at heading 90° points screen-left-to-right. J7 is the PR that finishes streamline heading. This PR states how the current arrow renderer uses heading, and J7 must not undo it.
9.6. Locate-me either recenters without resetting heading, or recenters and resets heading. The PR picks one and states it. Lane checks that stated behavior.
9.7. Screen-fixed UI does not rotate: the N mark (once J3 lands), the sun pill, and the controls. The 014–018 regressions pass, including locate-me still directly above Map Tools when the compass is hidden.

### J10. Keep the camera position (Delta 2026-10-01 1:37am CT; own small PR, after J9, before J3)

10.1. Returning to the Map tab restores the exact last camera: center, zoom, and heading. The map does not auto-fit to pins on that return.
10.2. The same camera comes back after Pins, Forecast, Scout, and pin detail. There is no jump and no second animation that recenters.
10.3. The camera persists per account across a kill and relaunch. Another account does not inherit it. Pins, logs, the tour flag, and settings still persist as in 016.
10.4. Fit-to-pins runs only on the first run for that account, when no camera has been saved yet, or when the user takes an explicit action. Map Tools "Fit to pins" stays that explicit action. It does not run on every Map focus. This supersedes the 004/005 "leave and return to Map: fit-to-pins" behavior.
10.5. Locate-me and the J9 compass reset still move the camera as those jobs specify. The camera they leave behind is the one J10 restores. This job does not add follow-me.
10.6. No fade and no freeze. Restoring the camera does not set `opacity` on the Map scene or on any glass ancestor, does not remount `MapView`, and does not touch the 015 tab transition config. One tap still returns to Map, and the map is interactive. The 014 H1 glass matrix still passes.

### Item 2. No change

I2.1. With Property lines on, a tap on empty map opens the tap-to-pin popup with the 018 "<County> County appraisal district ›" row (in Texas), exactly as at base. No parcel query of any kind.

### G. Guardrails

G1. All existing tests pass at every PR (313+ at base; the real count is recorded, likely 318) plus new tests. No unjustified new deps. No keys, tokens, accounts, spend, or proxy. No live weather/wind. No backend changes. No owner/phone fields. No identify/query.
G2. Each PR has the code-trace write-up and the exact Simulator steps below, and Lane confirms them on device before merge. J4 and J7 performance are confirmed in Expo Go and in a dev build. J8 is confirmed on SE, 15, Pro Max, and a real iPhone. J9 and J10 are confirmed on SE, 15, and Pro Max.
G3. The nav lock amendment for Job 019 is in `brief.md` (handed by Product). Workers do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. The 1:30am call supersedes the handed sentence that the popover and Forecast caption still name the source.

## Fail if

- Any visible fallback label remains on the sun stack, the shooting-light popover, or the Forecast caption ("Map center", "at map center", "Last known location", "at last known location"), or the fallback logic changed
- The sun pill has empty glass, a < 44pt effective target, a slop overlapping other controls, or its glass fades, remounts, or vanishes
- The top branding is text, shows a black box/outline/fringe, was redrawn or recolored, overlaps the Dynamic Island, blocks gestures, or isn't legible on any style
- Launch shows only the N with no wordmark screen after it (in Expo Go or a build), shows a white flash, fades the app tree, shows the wordmark for < ~600ms, or can hang past ~8s
- Any box remains over the map with Topo or Property lines on, attribution is missing or non-compliant, or it overlaps a control or Apple Legal
- Lines don't appear at display zoom 12, a request misreports dpi/scale, tiles are requested below the floor or outside Texas, z12 shows blocks or haze, or measurements are missing
- Wind animation runs any per-frame JS, lacks `opaque={false}`, catches touches, blanks the map, remounts `MapView`, keeps running when off/unfocused/backgrounded, ignores Reduce Motion, misses the perf targets without falling back to arrows, or has no perf numbers
- The tap-to-pin popup is covered by the keyboard, the name field autofocuses, dismissing the keyboard cancels the pin or closes the popup, Save with the keyboard open takes more than one tap, or the map jumps when the keyboard opens or closes
- Pin rename, log-hunt notes, or Pins search hides the focused field or cannot dismiss the keyboard
- J8 adds a dependency that the PR does not justify
- The map cannot be rotated with two fingers, a second compass shows, the compass fades in or out through opacity, the compass shows at north-up or stays hidden past about 2°, the reset takes longer than about 300ms, or pins, tap-to-pin, property lines, the ruler, or wind are geographically wrong while rotated
- J9 enables pitch, follow-me, or heading-follow
- Returning to Map auto-fits the pins, drops or changes the last center, zoom, or heading, forgets the camera after a restart, shares one account's camera with another account, or fades or freezes the map while restoring it
- Any 014–018 regression item fails; any existing test fails; scope creep; any owner-name/phone feature or identify/query call appears

## Simulator sweep (Lane)

**Setup:** clean build at each PR's commit, plus **Expo Go** (`npx expo start`, press `i`) where noted. iPhone SE (3rd gen), iPhone 15, iPhone 15 Pro Max. Dark mode unless noted. Signed in with 20+ pins including Dallas and Llano. Location allowed with Custom Location Dallas (32.7767, −96.7970) unless noted (Features → Location → Custom Location…, or `xcrun simctl location booted set 32.7767,-96.7970`). Wi-Fi on. J8 is also run on a real iPhone.

**J1 label**

1. GPS allowed: the stack shows two rows only. Settings → Privacy & Security → Location Services → Nock → Never, return: still two rows (no "Map center"); pan the map → times change (fallback still works). Features → Location → None after a prior fix with permission allowed → two rows, no "Last known location".
2. Open the popover and the Forecast tab in `gps`, `lastKnown`, and `mapCenter`. No visible "Map center", "at map center", "Last known location", or "at last known location". In `gps`, "At your location" / "at your location" may still show. The builder's recorded choice is what Lane checks.

**J2 pill**

1. Stills on SE / 15 / Pro Max: the glass hugs the two rows (no empty glass), radius matches the other chips.
2. Tap just outside the visible pill edge (within the slop): the popover opens. Tap the N mark area and You menu: they're not stolen by the slop.
3. Run the 014 H1 trigger matrix (AC 014 sweep H1 steps 2–12) on all three styles: glass present after every step. 015 stress: Map → Pins → Map → Forecast → Map → Scout → Map ×10.
4. You → App tour: step 2 arrow on the pill (stills SE + Pro Max).

**J8 keyboard** (after the J1+J2 PR; SE, 15, Pro Max, and a real iPhone)

1. Tap empty map. The tap-to-pin popup opens ("Name this pin", type picker, county CAD row in Texas, Save/Cancel). The keyboard is closed. The name field is not focused.
2. Tap the name field. The keyboard opens. The whole popup sits fully above it. If the popup is taller than the space left, the name field is scrolled into view.
3. Tap the popup background outside the field. The keyboard dismisses. The popup stays. The provisional pin stays.
4. Focus the name field again. Press the keyboard return key (Done). The keyboard dismisses. The popup and the provisional pin stay.
5. Focus the name field. Tap Save once. The pin saves. The keyboard and the popup both close.
6. Drop another pin, focus the name field, tap Cancel. The provisional pin is removed. The keyboard closes.
7. While the keyboard opens and closes, the map does not pan or jump. The provisional pin stays visible above the popup where space allows.
8. Pin detail rename, log-hunt notes, and Pins search: the focused field is visible above the keyboard and dismisses (Done, or dismiss on scroll for the list) without discarding the screen except Save/Cancel as designed.
9. Show and hide have no layout flash. Then one 015 tab cycle back to Map, and the sun-stack glass is still present.

**J9 rotation** (after the J8 PR; SE, 15, and Pro Max)

1. Two-finger twist the map. It rotates smoothly. Pan and pinch still work. The map does not tilt.
2. Past about 2° from north, one compass button is visible directly above locate-me, evenly spaced with Map Tools and locate-me, 44pt or larger, glass. Its needle tracks the heading. The native MapKit compass is absent. At north-up, before any twist, the button is absent.
3. Tap the compass. The camera returns to north-up in about 300ms or less. The button then hides. The hide is a mount or a scale, not an opacity fade. Sun-stack glass is still present. One tap still switches tabs.
4. Rotate again. Tap a pin: that pin opens. Tap empty land: the provisional pin drops at the tapped point. Property lines on, z12 through z16: lines sit on the basemap. Drag the ruler: the measurement follows the gesture.
5. Wind on, stub field from the north, heading about 90°: arrows point screen-left-to-right. After J7, repeat with streamlines.
6. Tap locate-me while rotated. It does what the PR stated (recenter only, or recenter and reset north).
7. The sun pill, You menu, Map Tools, and locate-me stay upright on the screen.

**J10 camera** (after the J9 PR; SE, 15, and Pro Max)

1. With 20+ pins, pan and zoom to a spot that is not a fit of every pin, and twist off north. Switch to Pins, then back to Map. The same center, zoom, and heading are back. The pins are not refit.
2. Repeat through Forecast, Scout, and a pin detail. Each return matches. No fade. One tap lands on Map, and the map pans.
3. Kill the app and relaunch, still signed in. The same camera is back.
4. Sign out and sign in as a different account. That account does not open on the first account's camera.
5. First run for an account with pins and no saved camera: the map may fit the pins once. Leave and return: it restores, it does not fit again. Map Tools → Fit to pins still fits, and the next return restores that fit.
6. After the return, sun-stack glass is present. Map → Pins → Map ×3 stays smooth (015).

**J3 N mark**

1. Satellite at West Texas sand (31.9, −102.3), then Topo, then Standard: the N sits just under the Dynamic Island / status bar, centered, legible, no box or outline (stills on 3 devices × 3 styles; zoom a still to 400% to check edges for fringe).
2. Pan, pinch, tap a pin, and tap empty map directly under the N: all work.
3. VoiceOver on: swipe through the Map top. The N is skipped or read as "Nock" header, never a button.

**J4 launch** (Expo Go and a dev build)

1. **Expo Go:** kill Expo Go, open the project: capture (video) what Expo Go shows natively (expected: its loading UI with the N icon), then the JS screen with the **full N + NOCK** wordmark on black for ≥ ~0.6s, then the Map. No white frame (step through the video frame by frame).
2. **Dev build:** kill, launch: native splash (wordmark) → JS screen (same image, no jump) → Map. No white frame. Repeat with the Simulator in **Light** appearance (Settings → Developer → Dark Appearance off, or Shift+Cmd+A).
3. Signed out: launch → wordmark → sign-in screen with no flash.
4. Network Link Conditioner "100% Loss" + launch: the wordmark shows, then the app proceeds (no hang past ~8s).
5. After launch: sun-stack glass present; one tap from each tab back to Map; map interactive. Fresh account: the auto tour starts only after the wordmark screen is gone.

**J5 box**

1. Reproduce at base first (screenshot the box: location, zoom, style, layers). Toggle Topo and Property lines separately and note which one owns the box.
2. At the PR commit: Topo + Property lines on at Rockwall (32.93, −96.46), Dallas (32.81, −96.75), Llano (30.70, −98.75), Port Lavaca (28.62, −96.63), Lufkin (31.34, −94.73), and Shreveport (32.52, −93.75); zoom 8 → 18 → 8: no box anywhere.
3. Attribution: visible as a small line (no box) with Topo on, with lines on, and with both; never over Map Tools, locate-me, the bar, the wind badge/legend, or Apple Legal (stills on SE + Pro Max, Wind on and off). Map Tools → Map credits shows the full credits.

**J6 property lines**

1. Property lines on. At Dallas residential, Rockwall, Llano, Lufkin on Satellite, Topo, Standard: zoom to **12.0** (use the app's dev zoom readout if present, or pinch until the hint disappears) → thin outlines, no blocks or haze. 11.9 → hint, no lines. z13 and z15 → bands A/B.
2. **Request capture:** run a free capture proxy on the Mac (mitmproxy, open source; or Proxyman's free tier) with the Simulator proxied. At display zoom 11.0, 12.0, 13.0 over Dallas, record the parcel `export` URLs: bbox width, `size`, `dpi`. Lane computes the server scale for 3 URLs per zoom and attaches it; it must match the PR's `serverScaleFor` table. Confirm no requests below 12 and none at Shreveport. Confirm `size` and `dpi` are the literal honest values (no dpi misreport).
3. Network Link Conditioner "LTE" (or a normal Wi-Fi): cold pan at Dallas z12 and Llano z12, stopwatch time to the last tile ×5 each → p50/p95.
4. Wind on (above lines), ruler drag, 20 pin taps, toggle the layer 10× across styles: no remount, no blank. Offline → "couldn't load" line → restore → recovers.

**J7 wind** (Expo Go and a dev build for the perf pass)

1. Perf Monitor on (Device → Shake → Perf Monitor, or Cmd+D menu). Wind off: note UI/JS fps idle and while panning 10s. Wind on at Dallas, Satellite, 20+ pins: idle 30s, pan 10s, pinch 10s: note UI/JS fps (p50/min) for each. Repeat on Pro Max. Attach screenshots/recording. Record Expo Go and the dev build separately when they differ.
2. Streamlines visible and flowing on all three styles. Start a pan: lines clear; release: they resume within ~0.3s along the new view.
3. Switch to Pins and back, background 60s and foreground, toggle Wind off: animation stops each time (Perf Monitor JS/UI idle) and resumes correctly.
4. Settings → Accessibility → Motion → Reduce Motion on: static arrows. Off: streamlines (no relaunch).
5. **010/011/012 guard checks:** 20 Wind toggles across styles (with pans/zooms between): map always visible and responsive, no blank, no stuck overlay. 2-minute soak with 20+ pins (TX + one non-TX spot): no freeze, no lag growth, taps land, no memory climb (Xcode debug gauge for the dev build).
6. With streamlines running: tap-to-pin ×20, pin taps ×20, ruler, Map Tools, locate-me, sun stack, You menu, tabs: all work. Also in Expo Go (streamlines or arrows per the PR).
7. Rotate to about 90°. Streamlines (or the arrows fallback) for a from-north stub field point screen-left-to-right. Reset north: they point down the screen. Pan still clears the lines.

**Item 2**

1. Property lines on, z ≥ 12, tap empty land in Rockwall: the tap-to-pin popup with the CAD row, provisional pin dropped. Same as base. After J8, this popup also meets the keyboard checks.

**Regression (014–018 and earlier)**

- Full test run green (count recorded).
- **014 H1:** glass matrix at the tightened pill. **014 H2:** Pins "Log a hunt". **014 H3:** 8-step tour, step 2 re-targeted, auto-launch once per account, never over a modal or the loading screen, replay. **014 H4:** off by default, persists, TX-only, offline line, z-order, no remount (now from z12), attribution (J5 form).
- **015:** B1–B7 tab switching (smooth, one tap, no freeze, map interactive), including with streamlines running and Property lines on; background on another tab → foreground → Map. Also after the keyboard has opened and closed on the tap-to-pin popup.
- **016:** "Nock" home-screen name; N app icon unchanged; sign-in/tour logo; "Scout" everywhere; bundle ID/scheme unchanged; existing install keeps pins, logs, tour flag, settings.
- **017:** locate-me above Map Tools (all states); no "My location" in Map Tools; outline-only parcels (no white block); per-pin stub forecast (Dallas vs Llano rows differ); GPS sun times with silent fallback (no visible fallback label); Forecast tab only path to Forecast. Locate-me still moves the camera. J10 then restores that camera.
- **004/005 camera:** "leave and return to Map: fit-to-pins" is superseded by J10. Return restores the last camera. Fit-to-pins remains the explicit Map Tools action, and the first run when nothing is saved.
- **018:** CAD row in tap-to-pin and pin detail (Rockwall, Dallas, Llano, across the Red River none); in-app browser opens/closes with the provisional pin intact; the builder's grep proof shows no TxGIO identify/query calls; no owner/phone fields anywhere. The CAD row stays visible above the keyboard (J8).
- Earlier: 013 floor zoom cycles (3 styles, Wind on/off, Property lines on); 012 arrows under Reduce Motion + badge; Topo stays Topo with attribution; ruler; tap-to-pin ×20 with the layer off; pin-detail Log a hunt preselects; thin gray tab line; no Scout chips; dark default; pin style A; orange accent only; no data lost.

**Lane captures:** J1 stills per source, including popover and Forecast with no fallback wording; J2 stills ×3 devices + H1 matrix recording; J8 stills or video on SE, 15, Pro Max, and a real iPhone (popup above the keyboard, dismiss, one-tap Save, no map jump) plus pin rename, log-hunt notes, and Pins search; J9 video of twist, compass show/hide without an opacity fade, reset-north, pin tap, tap-to-pin, property lines, ruler, and north-wind at heading 90° on SE, 15, and Pro Max; J10 stills or video of Map return, relaunch, a second account, first-run fit, and explicit Fit to pins, with no fade; J3 stills 3 styles × 3 devices + a 400% edge crop; J4 videos (Expo Go, dev build dark + light, signed out, offline); J5 before/after stills + attribution stills; J6 stills per spot/style/zoom + proxy URL log + scale table + timings; J7 Perf Monitor captures per scenario in Expo Go and a dev build + toggle/soak recording, including the heading-90° direction check; test output.
