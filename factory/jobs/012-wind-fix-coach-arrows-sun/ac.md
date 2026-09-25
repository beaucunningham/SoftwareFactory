# AC — Wind fix (root cause) + coach-mark arrows + real sunrise/sunset (job 012)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_WIND_FIX_COACH_ARROWS_SUN_v0.md`. No secrets. **Status: FINAL, approved to build.** Beau's iOS Simulator feedback on Job 011 is the build go, confirmed via Finley. No open Decisions for Beau. Weather and wind stay stubs (no live feed, no keys, no spend). Sun times are calculated on the device (real). **The AI's user-facing name stays Scout.** Bar is **Map | Pins | Forecast | Scout**. Dark default, `#BF5700` accent only, pin style A. USGS topo stays approved. **All 237 existing tests stay green.**

**Job id:** `012-wind-fix-coach-arrows-sun`  
**Builds on:** Job 011 at Origin main `ca6afd1c71d30ab7b1754ea462044acf9b041876` (Job 011 merged, Origin PR #13)  
**Product repo:** https://cursor.com/codebase/beau-cunningham/hunting-companion

Brief: `brief.md` in this folder. Full product detail: the Sage brief this ticket was opened from.  
**Build order:** F1 first, and F1 must not ship broken. Then F2, then F3. F4a and F4b last, each in its own PR, each droppable without blocking F1–F3.  
Lane captures the shots and recordings listed at the end of this file. Those screenshots stay out of the product repo (see `note.md`).

**Symptom from Beau: _pending_** (Finley to forward; add a dated line here when it arrives). The builder does not wait. Reproduce on the Simulator first and record what was seen.

## Must pass

1. **F1 (TOP PRIORITY): Wind works.** Builder reproduces on the iOS Simulator at `ca6afd1`, records the exact symptom seen, and writes the **root cause with evidence** in build notes (flipping a flag doesn't count). Suspects: arrow markers not drawn on iOS (`tracksViewChanges` false before first layout, zero-size/rotated children, opacity 0), markers off-screen, stub returning nothing for the visible region (e.g. non-TX Simulator location), toggle not wired to the layer, badge showing with no layer, leftover overlay over the map, stale build. On **Topo, Satellite, and Standard**, Wind on shows **visible sample arrows** over a map that stays visible and pannable/tappable; Wind off restores the map unchanged (no remount). Arrows cover the visible region (~60–90pt apart, ≤ ~80, never zero, works outside TX) and re-grid when the map settles after pan/zoom. **20 toggles across the 3 styles plus a 2-minute soak with 20+ pins: nothing blanks, nothing freezes, taps land.** "Sample wind" badge + mph legend only while a layer is visible. Reduce Motion → static. Stub only. Skia animation only if it passes all of this; static arrows are fine. Native `Polyline` arrows are the fallback if markers keep failing. New tests: grid builder and stub coverage.
2. **F2: Coach-mark arrows point at the target.** One pure placement function (target rect + screen + safe insets + bar top + tooltip size → side, tooltip x/y, arrow x, showArrow). Bubble flips above/below, stays clear of notch/Dynamic Island, home indicator, and glass bar. Arrow tip within **±4pt of target center x**, clamped inside the rounded corners; at edges the tip must still sit over the target, otherwise it's hidden. Unmeasurable/zero/NaN/off-screen target → **arrow hidden** (011 re-measure/skip rule still applies). Rects from `measureInWindow` in the overlay's coordinate space, re-measured after tab transitions and on replay. All 6 steps on the **smallest and largest iPhone Simulators**, first run **and** after You → App tour replay. Unit tests cover center, notch, tab bar, You menu, Map Tools, both edges, zero/NaN/off-screen, oversized tooltip, SE and Pro Max values.
3. **F3: Sunrise/sunset (real).** (a) Every **7-day** row shows sunrise + sunset for that date at the **map's last settled center** (fallback: persisted region, else default region; recorded). Every **3-day** row uses **that day's #1 pin's coordinates** (fallback: 7-day point). (b) **Map chip top-left:** sunrise icon + time, sunset icon + time, nothing else; today at the **map center**; recalculates on map settle (debounced ~500ms), on foreground, and at midnight; clear of safe area and top controls (You menu, Forecast button; builder confirms layout), wind badge/legend; glass/dark like the bar (Reduce Transparency → solid); 4.5:1; non-interactive (no pin drop on tap); VoiceOver "Sunrise 7:31 AM, sunset 6:53 PM". On-device NOAA equations (preferred) or `suncalc` (**BSD-2-Clause, not MIT**: reproduce the notice). Device local time zone, "7:14 AM" format, nearest minute. Polar/invalid → "—", no crash. **No "sample" label on sun times**; the Sample forecast note covers weather only.
4. **F3 test values (±2 min),** verified 2026-09-24 against timeanddate.com, the US Naval Observatory API, and NOAA's published equations:
   - **Dallas** (32.7767, −96.7970), **2026-10-15**: sunrise **7:31 AM CDT** (12:31 UTC); sunset **6:53 PM CDT** per timeanddate, **6:54 PM** per USNO/NOAA eq. (23:53:57 UTC)
   - **Austin** (30.2672, −97.7431), **2026-12-21**: sunrise **7:23 AM CST** (13:23 UTC); sunset **5:34 PM CST** per timeanddate, **5:35 PM** per USNO/NOAA eq. (23:35:00 UTC)
   - Sources: https://www.timeanddate.com/sun/usa/dallas?month=10&year=2026 · https://www.timeanddate.com/sun/usa/austin?month=12&year=2026 · https://aa.usno.navy.mil/api/rstt/oneday?date=2026-10-15&coords=32.7767,-96.7970&tz=-5 · https://aa.usno.navy.mil/api/rstt/oneday?date=2026-12-21&coords=30.2672,-97.7431&tz=-6 · NOAA equations https://gml.noaa.gov/grad/solcalc/calcdetails.html. The interactive NOAA calculator page (https://gml.noaa.gov/grad/solcalc/) was **not** read directly (browser-only); builder may spot-check by hand and note it.
   - Edge tests: Longyearbyen (78.2232, 15.6267) 2026-12-21 no sunrise and 2026-06-21 no sunset → "—"; NaN coords → "—"; Dallas 2026-11-01 (DST ends) correct. Tests are TZ-independent (assert UTC or pin `TZ=America/Chicago`).
5. **F4 (optional, droppable):** **F4a** You menu **Appearance: Dark / Match iPhone**, default Dark, chrome only (map/wind unchanged); drop if any screen fails 4.5:1 or looks unfinished in light. **F4b** Pins list search by name (local, case-insensitive, clear ×, "No pins match"). Each goes in its own separate PR. Neither blocks F1–F3. Either or both can drop freely.
6. **Regression (008–011):** 237 existing tests + new tests green; Topo stays Topo at all zooms with USGS attribution; thin gray selected-tab line (no capsule); no Scout suggestion chips (hunt-log step chips allowed while logging, gone after save/cancel); coach-mark tour + replay; Scout tutorial one example + Try it; ruler drag (live segment + label, Undo/Done); 20 tap-to-pin taps (3 styles, Wind on, near the sun chip); 20 pin-tap popups; 7-day + 3-day forecast aligned; glass see-through; "Scout" everywhere; dark default, pin style A, no data lost.

## Fail if

- On any style, in any of the 20 toggles or during the soak, Wind on shows no arrows, blanks the map, freezes it, blocks touches, or needs a restart
- Wind off leaves arrows behind or resets style/region/pins
- The badge/legend shows with no visible layer, or wind calls a live API
- No F1 symptom or root cause (with evidence) in build notes, or the "fix" is only a flag change
- A tooltip arrow points away from its target, overlaps a rounded corner, or shows for an unmeasured/zero-size target; the bubble sits under the notch, home indicator, or tab bar; misalignment on SE, Pro Max, or after replay
- No unit tests for the placement function or sun math
- Any forecast day lacks sun times; sun times carry a "sample" label; the Sample forecast note implies sun times are sample
- The Map chip shows anything beyond the two icons + times, collides with the safe area or top controls, drops a pin when tapped, or fails 4.5:1
- Sun times are more than 2 minutes off the Dallas/Austin values, show "NaN"/"Invalid Date", or crash on polar input
- Any sun calculation uses the network or a key
- Any existing test fails, or any regression item fails
- Any live weather/wind, backend or account change, new paid SDK, key, spend, or scope creep; F4 blocking F1–F3

## Simulator sweep (Lane signoff)

1. **F1:** Clean build at the job commit. Map Tools → Wind on: Topo, Satellite, Standard, arrows visible over visible tiles each time. Pan and zoom: arrows re-grid to cover the view. Tap empty map (pin popup), tap a pin (popup), Map Tools, Forecast button, tabs, You menu, all with Wind on. Wind off: map unchanged. 20 toggles across the 3 styles with pans/zooms between. 2 minutes Wind on with 20+ pins, including a non-TX spot. Reduce Motion on: static arrows. Badge + legend present only while arrows show, clear of controls, attribution, and the sun chip. When Beau's symptom arrives, repeat his exact steps.
2. **F2:** Fresh tour on iPhone SE and a Pro Max: each of the 6 steps, arrow tip on the target center (screenshots), bubble clear of notch/home indicator/bar. You → App tour replay: same result. Switch tabs mid-tour: arrows still right.
3. **F3:** Forecast: every 7-day and 3-day row has sunrise/sunset, no sample label on them. Map chip top-left on SE and Pro Max over bright Satellite and dark Standard, with Wind on; pan to a far-away spot and let it settle: times update. Tap the chip: nothing happens, no pin. VoiceOver reads the chip. Reduce Transparency: solid chip.
4. **F4 (if shipped):** Appearance Dark ↔ Match iPhone with the Simulator in light mode; check the main screens. Pins search: match, no match, clear.
5. **Regression:** full test run green (237 + new); Topo 5 → max → back; tab line; Scout chat no suggestion chips, hunt-log step chips while logging; Scout tutorial; ruler drag; 20 tap-to-pin; 20 pin taps; Forecast 7-day + 3-day.

Lane captures: **recording** of Wind on over Topo, Satellite, and Standard (pan, zoom re-grid, tap-to-pin, pin tap, off/on); short recording or notes for the 20-toggle run and 2-minute soak; stills of Wind on each style (badge + legend), Wind + Reduce Motion, Wind at a non-TX spot; **recording** of the full coach-mark tour on SE and Pro Max plus one replay, with stills of the You menu step and a tab step; Forecast rows with sun times on SE; Map sun chip over bright Satellite and dark Standard, with Wind on, on SE and Pro Max; F4 shots if shipped; test output all green.
