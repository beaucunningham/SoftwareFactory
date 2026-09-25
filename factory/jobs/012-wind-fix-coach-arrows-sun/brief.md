# Brief — Job 012: Wind still broken (root-cause fix) + coach-mark arrows that point right + real sunrise/sunset

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `012-wind-fix-coach-arrows-sun`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: product `main` at `ca6afd1c71d30ab7b1754ea462044acf9b041876` (Job 011 merged, Origin PR #13). Do not follow an older tmp product URL. Do not start from an older product tip. Do not open on a commit before `ca6afd1`.  
**Stack:** Expo SDK 57, React Native, expo-router, react-native-maps (Apple Maps on iOS), `@shopify/react-native-skia` (from 010; wind path disabled by `USE_SKIA_WIND=false` in 011)  
**Build on:** Job 011 at Origin main `ca6afd1c71d30ab7b1754ea462044acf9b041876`. Do not regress Job 005–011 behavior. **All 237 existing tests stay green**; new tests are added on top.  
**Related:** `ac.md` (copy of `AC_WIND_FIX_COACH_ARROWS_SUN_v0.md`) · Job 003/006–011 quiet field-tool chrome (north star) · brand burnt orange `#BF5700` for accents only · pin style A (locked in 007) · `note.md` (UI-check screenshots stay out of the product repo)  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** Small focused Origin product pull request(s). F4a and F4b, if they ship, each go in their own separate PR so either can drop cleanly. The builder writes `factory/jobs/012-wind-fix-coach-arrows-sun/build.md` in this repo and documents everything listed under Constraints, including token usage. Lane runs the iOS Simulator sweep and captures the shots and recordings listed in Constraints for the ui worker.

Beau tested Job 011 on the iOS Simulator. His feedback is the build go, confirmed via Finley. Status: **FINAL, approved to build.** No open Decisions for Beau. **The AI's user-facing name stays Scout.** **USGS The National Map `USGSTopo` tiles stay approved.** Weather and wind stay stubs, with no keys or spend. This brief is approved and final for Kai.

Chrome north star: Job 003/006–011 quiet field tool: dark by default, calm neutrals, burnt orange `#BF5700` for accents only, pin style A.

## What to build

Priority order. Keep this scope exactly.

1. **F1 — TOP PRIORITY. Wind still doesn't work.** 011 shipped a static rotated-arrow fallback (`USE_SKIA_WIND=false`), and Beau says wind **still** doesn't work. The builder must reproduce it on the iOS Simulator, record the exact symptom, and write the root cause with evidence in build notes. **A flag flip doesn't count as a fix.** It passes when Wind on over Topo, Satellite, and Standard shows visible sample arrows over a map that stays visible, pannable, and tappable, and Wind off restores the map with no remount. **F1 must not ship broken.**
2. **F2 — Coach-mark tooltip arrows point at the target.** The tip bubble's arrow is computed from the target's measured on-screen rect by one pure placement function. The arrow flips above or below, slides clamped to the screen, and its tip lands within 4pt of the target center. Hide the arrow if the target can't be measured. Unit tests.
3. **F3 — Sunrise/sunset, real data.** (a) Sunrise and sunset on every forecast day, in both the 7-day list (at the map center) and the 3-day #1-pin list (at that day's #1 pin). (b) A small top-left chip on the Map with a sunrise icon + time and a sunset icon + time, nothing else. Computed on the device. **Real data, so no "sample" label on sun times.** NOAA math in-house is preferred (`suncalc` is BSD-2 and would need an attribution notice).
4. **F4 — Optional low-risk extras (droppable).** F4a Appearance setting (Dark / Match iPhone) in the You menu; F4b search box on the Pins list. Either or both can drop without blocking F1–F3. Each goes in its own separate PR.

**Bar order stays: Map | Pins | Forecast | Scout.** Map stays the default home. The top-right three-line You menu is unchanged, except for the F4a Appearance row if F4a ships.

Everything else from Jobs 005–011 stays the same. **Weather and wind data stay PLACEHOLDER/STUB** (no live feed, no keys, no spend). Sun times are **calculated on the device**. That's not a feed and not "weather," so it's allowed under the hold. The Scout chat stays an on-device stub.

**This job is on-device only. No gates.** The USGS topo tiles (010) are still the only network map source.

## Build order

1. **F1 first.** Reproduce, then root cause, then fix, then pass the F1 toggle test and soak.
2. **F1 must not ship broken.** A PR that merges F1 must pass every F1 item on all three styles. If Skia animation doesn't pass, static arrows ship (they're acceptable). If the root cause is found but the arrow-marker approach itself is what fails on iOS, switch to a rendering that works (native `Polyline` arrows) instead of patching around it. Either way, the root cause of the 011 failure goes in build notes. Changing or toggling a flag doesn't count as a fix.
3. Then F2 (pure function + tests first, then wire it in), then F3 (sun math + tests first, then the forecast rows, then the Map chip).
4. F4a / F4b last, only if F1–F3 are done and green. Put each in its own small PR so it can drop cleanly.
5. Run the full test suite (237 existing + new) and the regression checklist before handing to Lane.

### F1. Wind works on every basemap (TOP PRIORITY)

011 shipped a static rotated-arrow fallback (`USE_SKIA_WIND=false`), and Beau says wind **still** doesn't work. Reproduce it on the iOS Simulator, write down the exact symptom you see, find the root cause, and write it in build notes with evidence. **Changing or toggling a flag doesn't count as a fix.** Done means: on Topo, Satellite, and Standard, Wind on shows visible sample wind arrows over a map that stays visible and responsive.

- Builder reproduced the problem on the iOS Simulator at `ca6afd1` (or showed with evidence that a clean build doesn't reproduce it, see stale-build suspect) and recorded the exact symptom (device model, iOS version, basemap, map location, Reduce Motion on/off, pins present, Wind toggled from where).
- **Root cause** in build notes with evidence (logs, screenshots, the code path that ran, before/after), not just "flag flipped" or "re-enabled".
- On **Topo, Satellite, and Standard**: Wind **on** shows **visible sample wind arrows** (or animation) over a map that stays visible (tiles showing) within about 1 second.
- Arrows **cover the visible region** at a reasonable density (about 60–90pt apart, about 5×8 on iPhone SE up to about 6×10 on a Pro Max, **capped at ~80 arrows**; never zero for a valid region), including when the map is **outside TX** (e.g. the Simulator's default location).
- Arrows **update sensibly on pan/zoom**: after the map settles, the grid covers the new visible region (`onRegionChangeComplete`, debounced ~250–500ms); no clumping on one side, no huge or tiny arrows at zoom extremes.
- With Wind on, the map fully responds: pan, pinch, +/−, **tap empty map → new-pin popup**, **tap a pin → its popup**, Map Tools, Forecast button, glass bar tabs, You menu. Arrows never catch touches.
- Wind **off** restores the map unchanged: no arrows left behind, same style, region, zoom, pins, open measure line; `MapView` not remounted.
- **20-toggle test:** Wind on/off 20 times across the three styles (switch style between toggles, some pans/zooms between). Every time: arrows appear on on, disappear on off, map visible and responsive, **nothing blanks, nothing freezes**.
- **2-minute soak:** Wind on for 2 minutes with **20+ pins**, panning/zooming around (TX and at least one non-TX spot). No freeze, no growing lag, taps still land, no memory spike visible in the Simulator debug gauge.
- **"Sample wind" badge** and **mph legend** show whenever Wind is on (and only then), clear of the bar, Map Tools button, Topo attribution, Apple legal, and the F3 sun chip. A badge never shows without a visible layer.
- **Reduce Motion on:** static arrows (same visibility rules); no motion.
- Data still from the `WindSource` stub (plausible values for **any** region, deterministic); no live wind call.
- If Skia animation ships: `opaque={false}`, no full-size fill, `pointerEvents="none"` on the wrapper, UI-thread only, not inside `MapView`, **and** every item above passes. Otherwise static arrows ship and build notes say why.
- New unit tests: grid builder (visible region + screen size → N points inside the region, count capped, never zero for a valid region, sensible at zoom extremes); stub field (finite speed/direction for regions inside and outside TX, deterministic); toggle wiring (a component test if the test setup supports it, otherwise documented in build notes).

**Look:** readable on all three styles: light arrow with a thin dark outline/halo, speed shown by the existing 011 legend colors/opacity (minimum opacity high enough to see; no invisible low-speed arrows). No new orange. No arrows under the glass bar's opaque parts or the top controls if easy (not required).

**Rendering options (builder picks, records why):**

- **Static arrow `Marker`s** (011's approach), fixed per the suspects below: explicit size, `tracksViewChanges` handled correctly, `anchor={{x:0.5,y:0.5}}`, non-interactive (`tappable={false}` / no `onPress`, and they must not block map `onPress` or pin taps).
- **Native `Polyline` arrows (recommended if markers keep misbehaving):** each arrow is a short shaft plus two short head segments drawn with `Polyline`. MapKit draws them natively, with no marker snapshotting and no touch capture, and they stay anchored during pan/zoom. Length in meters derived from the current zoom so they look about the same size on screen.
- **Skia animation** may come back only if it passes **every** F1 item (see 011 E1 rules: `opaque={false}`, no full-size fill, `pointerEvents="none"` on the wrapper, UI-thread animation, never inside `MapView`). Static arrows that visibly work are the accepted bar.

### F2. Coach-mark tooltip arrows point at the target

The tip bubble's arrow is placed from the target's measured on-screen rect. The bubble flips above or below, and the arrow slides and stays clamped inside the bubble's rounded corners so it points at the center of the highlighted element. If the target can't be measured, hide the arrow. Put the placement in a pure function with unit tests.

Keep 011's in-house coach-mark overlay. Targets report their frame with `measureInWindow` after layout and after any tab transition ends. The root overlay is positioned at window origin (0,0) so the coordinates match. All geometry goes through **one pure function**, suggested shape:

- `placeTooltip({ target: {x,y,width,height}, screen: {width,height}, insets: {top,bottom,left,right}, bottomObstacleY /* glass bar top */, tooltip: {width,height}, arrow: {width,height}, cornerRadius, margin, gap })`
- → `{ side: 'above' | 'below', tooltipX, tooltipY, arrowX /* relative to tooltip left */, showArrow: boolean }`

**Rules:**

- **Side:** prefer **below** if the tooltip + arrow + gap fits between the target's bottom and `min(screen.height − insets.bottom, bottomObstacleY)`. Otherwise **above** if it fits between `insets.top` and the target's top. If neither fits, pick the side with more space and clamp inside the safe area.
- **Tooltip x:** `clamp(targetCenterX − w/2, insets.left + margin, screen.width − insets.right − margin − w)`. If the tooltip is wider than the usable width, shrink it to fit.
- **Arrow x:** `clamp(targetCenterX − tooltipX, cornerRadius + arrow.width/2, w − cornerRadius − arrow.width/2)`, so the arrow never overlaps a rounded corner.
- The arrow **slides horizontally** so its tip sits within **±4pt of the target's center x** (Lane checks from screenshots).
- **Hide the arrow** (`showArrow=false`) if the target rect has width or height ≤ 0, any NaN/undefined value, or is mostly (> 50%) off-screen; **or** if after clamping, the arrow tip wouldn't sit within the target's horizontal bounds. Never point the wrong way. (011's rule still applies on top: re-measure briefly, then skip the step if the target is still missing.)
- Near screen edges (e.g. You menu top-right; Map Tools button bottom-right): if the target center is beyond the clamp limit, the arrow sits at the limit and its tip is **still over the target's rect**; otherwise the arrow is hidden.
- Targets inside the glass tab bar (Pins, Forecast, Scout) → tooltip **above**, clear of the bar. You menu (top-right, under the notch/Dynamic Island) → tooltip **below**, arrow near the right side.
- The bubble is never under the notch/Dynamic Island, status bar, home indicator, or the glass tab bar, and never off-screen.
- Target rects come from `measureInWindow` (or equivalent) in the **same coordinate space** as the overlay; re-measured after layout, after tab transitions finish, and when the tour is **replayed**.
- **All 6 tour steps** checked on the **smallest and largest iPhone Simulators** (e.g. iPhone SE 3rd gen, 375×667pt, and a Pro Max, 440×956pt class), on first run **and after replay from You → App tour**. The builder records the exact devices and insets.
- Reduce Motion and VoiceOver behavior from 011 E5 unchanged.
- **Unit tests** for the placement function, at least: centered target (below); target near the top under the notch (below, clear of the inset); tab-bar target (above, clear of the bar); You menu top-right (below, arrow near the right, not in the corner); Map Tools bottom-right (above); target at the far left and far right edges; zero-size, NaN, and off-screen rects (showArrow false); tooltip wider than the usable width (shrinks, stays inside); SE and Pro Max screen/inset values.

### F3. Sunrise / sunset (real data)

(a) Sunrise and sunset on every forecast day, in both the 7-day list and the 3-day #1-pin list. (b) A small top-left chip on the Map with a sunrise icon + time and a sunset icon + time, nothing else. Computed on the device (NOAA solar equations or a small free lib). **Real data, so no "sample" label on sun times.** Times are in phone local time.

**Algorithm:** compute on the device. Two acceptable options; the builder picks and records which:

- **In-house NOAA equations (recommended):** a small pure module (e.g. `src/sun/solar.ts`) implementing NOAA's published solar calculator equations (sunrise/sunset at solar zenith 90.833°, which includes refraction and the solar disc). Source: NOAA GML "Solar Calculation Details" https://gml.noaa.gov/grad/solcalc/calcdetails.html (calculator: https://gml.noaa.gov/grad/solcalc/). No dependency, no license notice needed.
- **`suncalc` npm package:** free, no key, zero dependencies, ships its own types (latest `2.0.2` on npm, checked 2026-09-24). **Note: its license is BSD-2-Clause, not MIT** (https://github.com/mourner/suncalc/blob/master/LICENSE). Fine to use, but the copyright notice has to be reproduced in the app's acknowledgements, so the builder adds it wherever licenses are listed (or records in build notes that an acknowledgements screen is needed before App Store). v2 is ESM-first with a CommonJS `require` export, so confirm Metro and Jest resolve it (Jest `transformIgnorePatterns` may need it). With suncalc, pass **local noon** of the target date (not midnight) to avoid getting the neighbor day at western longitudes; invalid times come back as `Invalid Date`, which must render as a dash.

**Which location (explicit):**

- **Map chip:** **today's date at the map's current center** (not the user's GPS location, so there's no location-permission dependency, and it matches the place the user is looking at and scouting). Recalculates when the map **settles** (`onRegionChangeComplete`, debounced ~500ms), when the app returns to the foreground, and when the local date rolls over (midnight while open).
- **7-day list:** each day's date at the **map's last settled center** (same point as the chip). If the Map hasn't mounted yet this session, use the last persisted map region if one exists, otherwise the app's default initial map region. The builder records which. A small caption like "Sun times at map center" under the 7-day header is suggested.
- **3-day #1-pin list:** each day's date at **that day's #1 pin's coordinates**. If a day has no #1 pin (no pins), fall back to the same point as the 7-day.

**Time zone and format:** times display in the **device's local time zone**, formatted `h:mm AM/PM` (e.g. "7:14 AM"), rounded to the nearest minute. If the viewed place is in a different time zone than the device, times are still shown in device time (fine for the TX beta; noted, not fixed). iOS/Hermes `Intl` may put a narrow no-break space (U+202F) before "AM". Tests normalize whitespace, or the formatter builds the string itself.

**Edge cases:** polar night / midnight sun / invalid coordinates → show "—" for the missing value. Never crash, never show "NaN", "Invalid Date", or a wrong-day time.

**Forecast**

- Every day in the **7-day list** shows sunrise and sunset times (icons + "7:31 AM"-style times), computed for that date at the **map's last settled center** (fallback: persisted region, else the default initial region; builder records which).
- Every day in the **3-day #1-pin list** shows sunrise and sunset for **that day's #1 pin's coordinates** (fallback to the 7-day point if a day has no #1 pin).
- Days 1–3 of the 7-day and the 3-day stay aligned (010 rule); rows still fit and the last row isn't hidden behind the bar on SE.
- **No "sample" label on sun times.** The "Sample forecast" note is worded to cover weather only (e.g. "Sample weather. Sunrise and sunset are calculated."; builder picks the copy).

**Map chip**

- A small chip at the **top-left** of the Map: **sunrise icon + time, sunset icon + time, nothing else** (no location name, no date, no labels).
- Today's date at the **map center**; recalculates on map settle (debounced ~500ms), on app foreground, and on local date rollover.
- Clear of the safe area / Dynamic Island / status bar and existing top controls (You menu top-right, Forecast button, and anything else up there; builder confirms and records the final layout), the wind badge/legend, and the coach-mark tour's cutouts.
- Glass or dark styling consistent with the bar (same material; Reduce Transparency → solid dark); text/icons 4.5:1 over bright Satellite and dark Standard; no orange panel.
- Non-interactive: tapping the chip does nothing and **does not drop a pin**; it doesn't block map taps around it. VoiceOver reads "Sunrise 7:31 AM, sunset 6:53 PM".
- Visible on all three styles and with Wind on; stays put during pan/zoom (value updates on settle). It is not a control and doesn't count toward Map's floating controls.

**Verified test values (±2 min tolerance).** Three independent sources agree within a minute:

| Place (coords used) | Date | Sunrise | Sunset | Local zone |
|---|---|---|---|---|
| Dallas, TX (32.7767, −96.7970) | 2026-10-15 | **7:31 AM** | **6:53 PM** (USNO/NOAA eq. give 6:54 PM) | CDT (UTC−5) |
| Austin, TX (30.2672, −97.7431) | 2026-12-21 | **7:23 AM** | **5:34 PM** (USNO/NOAA eq. give 5:35 PM) | CST (UTC−6) |

- **timeanddate.com** (city pages, fetched 2026-09-24): Dallas Oct 2026 https://www.timeanddate.com/sun/usa/dallas?month=10&year=2026 → Oct 15: rise 7:31 am, set 6:53 pm. Austin Dec 2026 https://www.timeanddate.com/sun/usa/austin?month=12&year=2026 → Dec 21: rise 7:23 am, set 5:34 pm.
- **US Naval Observatory API** (exact coords above): https://aa.usno.navy.mil/api/rstt/oneday?date=2026-10-15&coords=32.7767,-96.7970&tz=-5 → Rise 07:31, Set 18:54; https://aa.usno.navy.mil/api/rstt/oneday?date=2026-12-21&coords=30.2672,-97.7431&tz=-6 → Rise 07:23, Set 17:35.
- **NOAA published equations** (calcdetails page above), run by Sage at the exact coords: Dallas rise 07:31:21 CDT (12:31:21 UTC), set 18:53:57 CDT (23:53:57 UTC); Austin rise 07:23:22 CST (13:23:22 UTC), set 17:35:00 CST (23:35:00 UTC).
- **Not directly verified:** the interactive NOAA calculator page itself (it runs in the browser and couldn't be read by fetch). Its results come from the same equations, so they should match the NOAA row above. The builder may spot-check it by hand and paste the numbers into build notes.
- Tests assert against the **UTC instants** (or set `TZ=America/Chicago` for format tests) so they pass on any CI time zone. The Dallas case covers CDT and the Austin case covers CST. Dallas sunset is **6:53–6:54 PM CDT** (≈23:54 UTC). Austin sunset is **5:34–5:35 PM CST** (≈23:35 UTC).
- Polar test: Longyearbyen (78.2232, 15.6267) on 2026-12-21 (polar night, no sunrise) and 2026-06-21 (midnight sun, no sunset): both render dashes without throwing.
- NaN/out-of-range coords → "—".
- A date across a DST change (e.g. Dallas 2026-11-01) returns correct local times.

### F4. Optional extras (droppable; never block F1–F3)

Scanned the Later / out-of-scope lists in 007–011 and the nav lock. Picked only items that need no Beau decision, add no network/keys/spend, and don't touch wind or map rendering. Each goes in its own separate PR and can drop freely.

**F4a: Appearance: Dark / Match iPhone** (Later in 007, 008, 009, 010, 011; 007 called it "easy because both palettes exist; needs a light-mode check"). A row in the You menu. **Default stays Dark** (locked). Match iPhone follows the system setting for app chrome only; **the map basemap and wind rendering don't change** (don't touch `MapView` `userInterfaceStyle`). Stored locally per install. Drop F4a if any screen (glass bar, coach-marks, sheets, Forecast, Scout, sign-in, sun chip) isn't clean and 4.5:1 in light.

**F4b: Pins list search** (Later in 008). A search field at the top of the Pins list that filters by pin name (case-insensitive, local only), with a clear (×) button and an empty-results line ("No pins match"). No sorting/filter-by-type changes (those stay Later). Tapping a result opens that pin's logs as before; list with no query is unchanged; keyboard dismisses on scroll.

Not picked: filter pins by type on the map (touches map rendering), Unpinned hunts in the Pins list (nav change, wants Beau's eye), measure area/saving measurements (new data), anything needing a key, provider, or Beau go.

## Research

- **Base:** Job 011 landed at Origin main `ca6afd1c71d30ab7b1754ea462044acf9b041876` (Origin PR #13). Don't open on an older commit.
- **Names/sources unchanged:** AI is **Scout**; topo is USGS `USGSTopo` (approved, attribution required).
- **Nav lock amendment (2026-09-24, Job 011 landed; Job 012 approved, Beau go):** Job 011 landed on main `ca6afd1`. Tabs stay **Map | Pins | Forecast | Scout** (Map default); You menu stays top-right. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. The amended lock text Sage handed with this brief is the source for the Job 012 nav changes; they are already specified in F3 above. The new amendment, in full:

  > Amendment 2026-09-24 (Job 011 landed; Job 012 approved, Beau go). Job 011 landed on main `ca6afd1`. Tabs stay **Map | Pins | Forecast | Scout** (Map default); You menu stays top-right.
  > - **Sunrise/sunset map chip:** the Map gets a small **top-left** chip showing a sunrise icon + time and a sunset icon + time (nothing else), for today at the map's center, updating when the map settles. It is not a control and doesn't count toward Map's floating controls. It stays clear of the safe area and the existing top controls.
  > - **Sun times on forecast rows:** every 7-day row (at the map center) and every 3-day #1-pin row (at that pin) shows sunrise and sunset.
  > - Sun times are **calculated on the device** (real, no network, no key) and carry **no "sample" label**. Weather and wind data stay placeholder until Beau's go.

- **F1 — symptom from Beau: _pending_.** Finley will forward the exact symptom (blank map, no arrows, frozen map, something else). When it arrives, Finley adds a dated line here and to the AC. The builder doesn't wait for it: reproduce on the Simulator first and record **what you saw**. When Beau's symptom arrives, compare. If it's different, reproduce Beau's conditions too, and fix and cover both.
- **What 011 said it shipped:** static rotated-arrow fallback behind `USE_SKIA_WIND=false`. The 010 root cause was a full-screen Skia canvas without `opaque={false}` painting over the tiles, plus a JS-thread particle loop starving taps. Assume nothing: confirm what code path actually runs today at `ca6afd1`.
- **Suspects to check (builder confirms with evidence, not guesses):**
  - **Arrow markers don't draw on iOS.** Custom `Marker` children with a `transform: rotate` not rasterized; `tracksViewChanges={false}` set **before** the child view's first layout, so Apple Maps snapshots an empty view. That's a known react-native-maps iOS pattern: the fix is to start `true` and flip to `false` after the child lays out (or after one frame), or use a static image. Also check zero-size child views (no explicit width/height), `opacity: 0` from a speed→opacity mapping, or arrows colored the same as the basemap.
  - **Markers off-screen or in the wrong place.** Grid computed from a stale or default region, lat/lng swapped, or `longitudeDelta` misused, so arrows land outside the visible map.
  - **The stub field returns nothing for the visible region.** The `WindSource` stub may only cover a TX bounding box, and the Simulator's default location/region may be outside it (e.g. Cupertino), or it returns an empty array/NaN for some regions. **The stub must return plausible values for any region the user can view.**
  - **Toggle not wired to the layer.** The Map Tools Wind switch updates state the layer doesn't read (e.g. the layer is still gated on `USE_SKIA_WIND`, on the Reduce Motion branch only, or on a context that isn't provided at that screen).
  - **Badge with no layer.** The "Sample wind" badge and legend render on toggle, but the layer returns `null`, which looks like "on" but shows nothing.
  - **Overlay still mounted over the map.** A leftover Skia `Canvas` / wrapper (even with the flag off) is still covering the map, opaque or catching touches; or Wind toggling remounts `MapView` (`key` change / conditional render).
  - **Stale build on Beau's side.** Beau's Simulator running an older JS bundle / dev client. The builder checks by reproducing on a **clean build at `ca6afd1`**. If a clean build works, say so with evidence, still harden the suspects above, and give Finley the exact steps to get Beau a clean build.
- **F2 — likely causes (builder confirms):** measuring in one coordinate space and drawing in another (e.g. overlay inside a `SafeAreaView` or offset by the status bar, while the target used `measureInWindow`); measuring during the 008 tab crossfade or before layout settles (stale rect); measuring a wrapper with padding so the "center" is off; the arrow placed at a fixed x (center of the bubble) instead of at the target's x; no re-measure on **replay** from the You menu.
- No live weather/wind, no AI model, no keys, no spend. Sun math is on-device. No schema changes beyond local preferences (F4a appearance).
- Do not edit Job 001–011 files.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### F1. Wind works on every basemap (TOP PRIORITY)

**Symptom from Beau: _pending_** (Finley to forward; add the dated text here).  
**Symptom observed by builder:** _(filled in build notes: device, iOS, basemap, location, what was seen)_

- [ ] Builder reproduced the problem on the iOS Simulator at `ca6afd1` (or showed with evidence that a clean build doesn't reproduce it, see stale-build suspect) and recorded the exact symptom
- [ ] **Root cause** in build notes with evidence (logs, screenshots, the code path that ran, before/after), not just "flag flipped" or "re-enabled"
- [ ] On **Topo, Satellite, and Standard**: Wind **on** shows **visible sample wind arrows** (or animation) over a map that stays visible (tiles showing) within about 1 second
- [ ] Arrows **cover the visible region** at a reasonable density (about 60–90pt apart, ~80 max; never zero for a valid region), including when the map is **outside TX** (e.g. the Simulator's default location)
- [ ] Arrows **update sensibly on pan/zoom**: after the map settles, the grid covers the new visible region; no clumping on one side, no huge or tiny arrows at zoom extremes
- [ ] With Wind on, the map fully responds: pan, pinch, +/−, **tap empty map → new-pin popup**, **tap a pin → its popup**, Map Tools, Forecast button, glass bar tabs, You menu. Arrows never catch touches
- [ ] Wind **off** restores the map unchanged: no arrows left behind, same style, region, zoom, pins, open measure line; `MapView` not remounted
- [ ] **20-toggle test:** Wind on/off 20 times across the three styles (switch style between toggles, some pans/zooms between). Every time: arrows appear on on, disappear on off, map visible and responsive, **nothing blanks, nothing freezes**
- [ ] **2-minute soak:** Wind on for 2 minutes with **20+ pins**, panning/zooming around (TX and at least one non-TX spot). No freeze, no growing lag, taps still land, no memory spike visible in the Simulator debug gauge
- [ ] **"Sample wind" badge** and **mph legend** show whenever Wind is on (and only then), clear of the bar, Map Tools button, Topo attribution, Apple legal, and the F3 sun chip. A badge never shows without a visible layer
- [ ] **Reduce Motion on:** static arrows (same visibility rules); no motion
- [ ] Data still from the `WindSource` stub (plausible values for **any** region, deterministic); no live wind call
- [ ] If Skia animation ships: `opaque={false}`, no full-size fill, `pointerEvents="none"` on the wrapper, UI-thread only, not inside `MapView`, **and** every item above passes. Otherwise static arrows ship and build notes say why
- [ ] New unit tests: grid builder (region → points inside, capped, non-zero), stub coverage outside TX; toggle wiring test if feasible

### F2. Coach-mark tooltip arrows point at the target

- [ ] Placement lives in **one pure function** (target rect + screen size + safe insets + bar top + tooltip size → side, tooltip x/y, arrow x, showArrow) used by the coach-mark overlay for every step
- [ ] The bubble **flips above/below** based on available space; it's never under the notch/Dynamic Island, status bar, home indicator, or the glass tab bar, and never off-screen
- [ ] The arrow **slides horizontally** so its tip sits within **±4pt of the target's center x** (Lane checks from screenshots), clamped inside the bubble's rounded corners (never overlapping a corner)
- [ ] Near screen edges (e.g. You menu top-right; Map Tools button bottom-right): if the target center is beyond the clamp limit, the arrow sits at the limit and its tip is **still over the target's rect**; otherwise the arrow is hidden
- [ ] **Unmeasurable target** (width/height ≤ 0, NaN, mostly off-screen, or not yet measured after the 011 re-measure wait) → **arrow hidden** (and the 011 skip-step rule applies). Never points the wrong way
- [ ] Target rects come from `measureInWindow` (or equivalent) in the **same coordinate space** as the overlay; re-measured after layout, after tab transitions finish, and when the tour is **replayed**
- [ ] **All 6 tour steps** checked on the **smallest and largest iPhone Simulators** (e.g. SE 3rd gen and a Pro Max), on first run **and after replay from You → App tour**
- [ ] **Unit tests** for the placement function, at least: centered target (below); target near the top under the notch (below, clear of the inset); tab-bar target (above, clear of the bar); You menu top-right (below, arrow near the right, not in the corner); Map Tools bottom-right (above); target at the far left and far right edges; zero-size, NaN, and off-screen rects (showArrow false); tooltip wider than the usable width (shrinks, stays inside); SE and Pro Max screen/inset values
- [ ] Reduce Motion and VoiceOver behavior from 011 E5 unchanged

### F3. Sunrise / sunset (real data)

**Forecast**

- [ ] Every day in the **7-day list** shows sunrise and sunset times (icons + "7:31 AM"-style times), computed for that date at the **map's last settled center** (fallback: persisted region, else the default initial region; builder records which)
- [ ] Every day in the **3-day #1-pin list** shows sunrise and sunset for **that day's #1 pin's coordinates** (fallback to the 7-day point if a day has no #1 pin)
- [ ] Days 1–3 of the 7-day and the 3-day stay aligned (010 rule); rows still fit and the last row isn't hidden behind the bar on SE
- [ ] **No "sample" label on sun times.** The "Sample forecast" note is worded to cover weather only

**Map chip**

- [ ] A small chip at the **top-left** of the Map: **sunrise icon + time, sunset icon + time, nothing else** (no location name, no date, no labels)
- [ ] Today's date at the **map center**; recalculates on map settle (debounced ~500ms), on app foreground, and on local date rollover
- [ ] Clear of the safe area / Dynamic Island / status bar and existing top controls (You menu top-right, Forecast button, and anything else up there; builder confirms and records the final layout), the wind badge/legend, and the coach-mark tour's cutouts
- [ ] Glass or dark styling consistent with the bar (same material; Reduce Transparency → solid dark); text/icons 4.5:1 over bright Satellite and dark Standard; no orange panel
- [ ] Non-interactive: tapping the chip does nothing and **does not drop a pin**; it doesn't block map taps around it. VoiceOver reads "Sunrise 7:31 AM, sunset 6:53 PM"
- [ ] Visible on all three styles and with Wind on; stays put during pan/zoom (value updates on settle)

**Math**

- [ ] Computed on the device with NOAA equations or `suncalc`; no network, no key. Choice recorded in build notes (and the BSD-2 notice handled if suncalc)
- [ ] Device local time zone, `h:mm AM/PM`, rounded to the nearest minute
- [ ] **Tests (±2 min):** Dallas (32.7767, −96.7970) 2026-10-15 → sunrise **7:31 AM CDT** (12:31 UTC), sunset **6:53–6:54 PM CDT** (≈23:54 UTC); Austin (30.2672, −97.7431) 2026-12-21 → sunrise **7:23 AM CST** (13:23 UTC), sunset **5:34–5:35 PM CST** (≈23:35 UTC). Sources in Research
- [ ] **Edge-case tests:** Longyearbyen 2026-12-21 (no sunrise) and 2026-06-21 (no sunset) → "—", no throw; NaN/out-of-range coords → "—"; a date across a DST change (e.g. Dallas 2026-11-01) returns correct local times
- [ ] Formatter tests pass regardless of the CI machine's time zone (assert UTC instants, or pin `TZ`)

### F4. Optional extras (droppable; never block F1–F3)

**F4a: Appearance**

- [ ] You menu has **Appearance: Dark / Match iPhone**; default **Dark**; choice persists locally per install
- [ ] Match iPhone follows the system light/dark setting live for app chrome; map basemap and wind unchanged
- [ ] In light, every screen passes 4.5:1 and looks finished (glass bar + line indicator, sheets, Forecast with sun times, Scout, coach-marks, sun chip, sign-in, pin/hunt detail); otherwise **drop F4a** and note it

**F4b: Pins list search**

- [ ] Search field at the top of Pins filters by pin name as you type (case-insensitive, local only); clear (×) resets; "No pins match" line when empty
- [ ] Tapping a result opens that pin's logs as before; list with no query is unchanged; keyboard dismisses on scroll

### Regression checklist (008–011 behavior must hold)

- [ ] **Tests:** all **237 existing tests green**, plus the new F1–F3 tests
- [ ] **010/011 Topo:** stays Topo at every zoom (5 → max → back at a TX spot), never Standard or blank; USGS attribution visible
- [ ] **011 E3:** selected tab marked by the thin light gray line (no capsule); Reduce Transparency solid bar keeps it
- [ ] **011 E4:** no Scout **suggestion** chips anywhere (empty state, after sending, after relaunch). Hunt-log **step chips** (species, pin, save) still appear while logging and disappear after save/cancel
- [ ] **011 E5:** coach-mark tour runs once after first sign-in; Skip works; replay from You → App tour works (now with F2 arrows)
- [ ] **011 E6:** Scout tutorial is one example + **Try it** focuses the composer; nothing saved to history
- [ ] **008 ruler:** drag from the end dot draws a live segment + label; Undo/Done; works on Topo and with Wind on
- [ ] **009 C7 tap-to-pin:** 20 single taps on empty map (all 3 styles, with Wind on, next to the sun chip) all open the new-pin popup
- [ ] **Pin popup:** 20 taps on existing pins across styles (and with Wind on) all open that pin's popup
- [ ] **010 Forecast:** 7-day on top + 3-day #1 pin below, aligned, now with sun times; Map Forecast button opens the same screen
- [ ] 009 glass see-through; "Scout" everywhere; 009 C6 stub replies start with full sentences
- [ ] Dark by default; pin style A; orange accent only; no pin/log data lost

### Hygiene

- [ ] Only F1–F3 (+ optional F4a/F4b) are new
- [ ] No live weather or wind, no backend or account changes, no new paid SDKs, keys, or spend
- [ ] Sun math is on-device; no new network calls; USGS tiles stay the only network map source
- [ ] No schema changes beyond local preferences (F4a appearance)
- [ ] iOS-first; Cloud Agents only; small focused PR(s) (F4a/F4b separate)

## User-facing UI

Wind finally shows up, on every map, without ever breaking it. The tour's arrows point exactly at what they're talking about. And hunters get the two times they plan every hunt around, sunrise and sunset, real and right there on the map and every forecast day.

- With Wind on over Topo, Satellite, and Standard, visible sample arrows sit over a map that stays visible, pannable, and tappable. Wind off restores the map with no remount. The Sample wind badge and mph legend show only while arrows are visible. Reduce Motion shows static arrows. Native Polyline arrows are the fallback if markers keep failing.
- Coach-mark arrows flip above or below the target, stay on screen, and the tip lands within 4pt of the target center. If the target can't be measured, the arrow is hidden.
- Every 7-day row shows sunrise and sunset at the map center. Every 3-day row shows them at that day's #1 pin. A top-left Map chip shows sunrise and sunset only, in phone local time, with no "sample" label.
- If F4a ships, the You menu gains Appearance: Dark / Match iPhone, default Dark. If F4b ships, the Pins list gains a name search.

## Payments and auth

- Payments: none. Do not invent spend. Weather stays the on-device stub. Wind stays the `WindSource` stub. The Scout chat stays an on-device stub. No live weather or live wind API. No keys, accounts, or spend. No parcels or paid map layers. Sun times are calculated on the device; that is not a feed and not a key.
- Auth: unchanged behavior (Apple primary, email secondary, no guest). No auth/BaaS provider swap. No account changes.
- Maps: existing Apple Maps stack plus the 010 USGS `USGSTopo` `UrlTile` only. No other tile provider. No new API keys or paid map SDKs. No new dependency unless `suncalc` is chosen, and then the BSD-2 notice is handled.
- Location: sun times use the map center, not GPS. No new location-permission dependency.
- Schema: no stored schema changes beyond local preferences (F4a appearance).

## Decisions for Beau

- None open. Sun times use the **map center** (not GPS) by design. If Beau later wants "my location," that's a small follow-up (Later). Weather and wind stay stubs, with no keys or spend.

## Later (not in this job)

- **Live wind and live weather** (needs Beau go; Finley → Morgan → Beau for any key/account/spend)
- Wind forecast time slider
- Gusts
- Offline topo cache
- Tour / tutorial analytics
- Sun times on pin detail
- Sun times at the user's GPS location (option); honoring the iPhone 24-hour setting; showing times in the viewed place's time zone
- Retrying the Skia wind animation if F1 ships static arrows
- Everything still on the 009–011 Later lists (trademark/name clearance, native tabs only if clearly better, paid topo/wind providers as a gate, filter pins by type, measure area)

## Out of scope

- Live weather/wind or any live data API
- Backend, sync, or account changes
- New paid SDKs, keys, or spend; new tile providers
- New map features beyond the sun chip; Forecast ranking changes
- Changing the coach-mark steps/copy (F2 fixes arrow placement only)
- App rename / App Store
- Anything not in F1–F4
- Editing Job 001–011 files

## Constraints

- Status: **FINAL, approved to build** (Beau's Simulator feedback on 011 is the go, confirmed via Finley)
- Base: Origin main **`ca6afd1c71d30ab7b1754ea462044acf9b041876`** (Job 011 landed, Origin PR #13)
- Do not touch product code from this SoftwareFactory ticket. Workers build on the product repo.
- **Build notes must include:**
  - **F1:** the symptom you observed (device, iOS, basemap, location, Reduce Motion, pins) and, once forwarded, how it compares to Beau's; the **root cause** with evidence; the fix; which rendering shipped (fixed markers / Polyline arrows / Skia) and why; final density numbers
  - **F2:** the placement approach (function signature, flip rule, clamp values: margin, corner radius, arrow size), what caused the old misalignment, devices and insets tested
  - **F3:** algorithm/lib (NOAA in-house vs suncalc + license handling), location rule per surface and fallback used, recalc triggers, the test values and sources, any manual NOAA calculator spot-check
  - F4: which shipped or dropped, and why
  - Test count before/after (237 → N), all green
  - Token usage
- **Lane Simulator signoff (shots / recordings):**
  - **Recording:** Wind on over **Topo, Satellite, and Standard**, arrows visible, with a pan, a zoom (arrows re-grid), a tap-to-pin, a pin tap, and Wind off/on
  - **Recording (short) or notes:** the 20-toggle run and the 2-minute soak with 20+ pins
  - Stills: Wind on each style with Sample wind badge + legend; Wind + Reduce Motion; Wind on at a non-TX location
  - **Recording:** full coach-mark tour on iPhone SE and a Pro Max, and once after replay from the You menu. Stills of the You menu step and a tab-bar step showing the arrow tip on the target center
  - Forecast: 7-day and 3-day rows with sun times (no sample label on them) on SE
  - Map sun chip top-left over bright Satellite and dark Standard, with Wind on, on SE and Pro Max (clear of the You menu, Forecast button, Dynamic Island)
  - F4a (if shipped): Appearance row, and two screens in light mode; F4b (if shipped): Pins search with results and with no match
  - Test run output showing all tests green
- UI-check screenshots must not be committed to the product repo. Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this job folder. See `note.md`. The same rule is already in `.cursor/agents/ui.md` from Job 008.
- Document token usage and the items above in `factory/jobs/012-wind-fix-coach-arrows-sun/build.md`.
- iOS-first. Cloud Agents only for code. Small focused PR(s). F4a and F4b each get their own PR and can drop freely.
- Hard hygiene: no live weather, no live wind, no backend, no account changes, no new paid SDKs, no keys, no spend. USGS topo tiles from 010 remain the only network map source. Sun math is on-device.
- This public job tree stays free of secrets.
- Do not edit any Job 001–011 files.

## Design intent (one line)

Wind finally shows up, on every map, without ever breaking it. The tour's arrows point exactly at what they're talking about. And hunters get the two times they plan every hunt around, sunrise and sunset, real and right there on the map and every forecast day.
