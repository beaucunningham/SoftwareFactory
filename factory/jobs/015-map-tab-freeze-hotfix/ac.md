# AC — Map tab freeze hotfix + Expo patch bump (job 015)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_MAP_TAB_FREEZE_HOTFIX_v0.md`, updated by **Delta 2026-09-30 4:06 PM CT** (Beau via Finley). No secrets. **Status: FINAL, approved to build.** Beau's go came via Finley on 2026-09-30 at 4:01 PM CT. **URGENT hotfix.** Sometimes the Map tab button has to be tapped twice before the map shows (likely the same root cause as the freeze). **A single tap on the Map tab always shows the map, including after switching from every other tab 10 times.** The regression test covers it. Lane's Simulator steps include it. Weather and wind stay stubs (no live feed, no keys, no spend). Sun and shooting-light times stay on-device; the 013 shooting-light table and copy don't change. **The AI's user-facing name stays Scout.** Bar is **Map | Pins | Forecast | Scout**. Dark default, `#BF5700` accent only, pin style A. USGS topo stays approved. User-facing word is **pin**. **All existing tests stay green.** Sage recorded 274 at the 014 H4 tip. The factory accept note recorded 277 at final H4 tip `143cc53b171856a8c09fbaae16a07fd2949d7495`. The builder records the count on base `3903bb27c2a869926c7d8935dbf55ce35f20514a` before and after. **No new dependencies.** No secrets, no API keys, no spend, no proxy.

**Job id:** `015-map-tab-freeze-hotfix`  
**Builds on:** Job 014 at Origin main `3903bb27c2a869926c7d8935dbf55ce35f20514a` (Job 014 landed)  
**Product repo:** https://cursor.com/codebase/beau-cunningham/hunting-companion

Brief: `brief.md` in this folder. Full product detail is in that brief.  
**Delivery:** one product pull request for both items. A separate commit for the Expo bump is fine. The PR merges through the normal permitted path only.  
Lane captures the shots and recordings listed at the end of this file. Those screenshots stay out of the product repo (see `note.md`).

**No open Decisions for Beau.**

**Builder constraint:** cloud builders run on Linux and can't run the iOS Simulator. Deepest reproduction possible: code tracing of the tab navigator and transition path, a navigator/transition test that fails on `3903bb2` and passes with the fix, reasoning from the lockfile versions of `expo-router` / `expo-glass-effect` / `react-native-maps`, root cause with evidence. **Lane (Mobile) does the on-device confirmation** from the exact steps below and in build notes. If Lane disagrees with a root cause, it's reported before merge.

## Must pass

### 1. Root cause (AC A)

1.1. The product PR states the root cause in plain words, citing the exact file and lines, and says whether it came from 014 H1 (Origin PR #18) or elsewhere.
1.2. Suspects checked and each ruled in or out with evidence:
   1. Map scene forced to opacity 1 while the tab animation still runs, so the transition never settles and touches stay blocked (`pointerEvents`, or an outgoing-scene overlay left on top).
   2. An animation or style interpolator overridden on one route only, so Map and the other tabs are out of sync and the outgoing scene stays mounted above Map.
   3. A native MapView layer or JS thread stall when the Map scene re-appears (focus effects, wind layer, region-clean, H4 parcels tiles). Ruled out with a profiler or trace.
   4. H1 glass remount logic loops on focus (re-render storm).
1.3. A regression test (navigator/transition unit or integration test) **fails on `3903bb2` and passes with the fix**. It covers the double-tap symptom: **one tap on the Map tab shows the map**, including after switching from every other tab (Pins, Forecast, Scout) 10 times. A second tap is not required. If a true UI freeze can't be unit tested, the test asserts that the condition causing it is gone (transition config for Map, scene reaching its settled/focused state on the first tap, no leftover overlay or `pointerEvents` block). The PR explains the gap.
1.4. Preferred fix when it matches the cause: remove the fade from the Map tab (animation `none` for Map, or `shift`/none consistently for all tabs). Not a new per-scene opacity hack. The glass stays protected by a guard that does not depend on opacity (glass view kept mounted; re-key on focus only if still needed).

### 2. Tab switching (AC B) — Lane, iOS Simulator, fresh install and existing install

2.1. From each tab (Pins, Forecast, Scout) tap Map **once**. The map shows on that single tap. The transition completes within about 300ms with no hang or half-drawn frame. A second tap is never required.
2.1a. After switching from every other tab 10 times, a single tap on the Map tab still shows the map.
2.2. After each switch the map pans, pinch-zooms, and a pin tap opens its popup/detail.
2.3. Stress: cycle Map → Pins → Map → Forecast → Map → Scout → Map ten times quickly. No freeze, and 2.2 still passes at the end.
2.4. Also with Wind on, Property lines on, Topo, Satellite, and Standard styles, and with the shooting-light popover opened and closed before switching.
2.5. Return from the You/hamburger menu and from pin detail/hunt detail to Map. No freeze.
2.6. Background the app on another tab, foreground it, and switch to Map. No freeze.

### 3. No H1 regression, sun-times glass (AC C)

3.1. The glass/blur behind the sunrise/sunset stack is visible after every switch in 2.1–2.6, including the single-tap returns in 2.1 and 2.1a.
3.2. The H1 regression test from PR #18 still passes, or is replaced by an equivalent that still guards the glass.
3.3. The popover still works: countdown, colors, and game selector.

### 4. Expo patch bump (AC D)

4.1. `package.json` has `expo` ~57.0.26, `expo-constants` ~57.0.20, and `expo-router` ~57.0.24, with the lockfile updated.
4.2. `npx expo-doctor` (or equivalent) is clean, or its warnings are listed in the PR. Peer warnings are noted in the PR. The app builds and launches in the Simulator.

### 5. Guardrails (AC E)

5.1. All existing tests pass. Sage recorded 274 at the 014 H4 tip; the factory accept note recorded 277 at final H4 tip `143cc53`. The builder records the count on `3903bb27c2a869926c7d8935dbf55ce35f20514a` before and after. No new dependencies. Nothing outside this scope changes.
5.2. The product PR includes the exact Simulator steps for sections 2–4 so Lane can confirm on device, including a single tap on the Map tab after switching from every other tab 10 times.

### 6. Regression (008–014)

Every existing test on `3903bb27c2a869926c7d8935dbf55ce35f20514a` stays green, plus the new regression test.

- **008:** Pins, Forecast, and Scout still switch. Reduce Motion stays a plain fade (008 B3). The Map return may drop the fade so the transition can settle; it must finish with the map interactive. Ruler drag on Topo, with Wind on, and with Property lines on. Pins empty state and most-recently-hunted sort stay.
- **009:** 20 tap-to-pin taps on empty map (3 styles, Wind on, Property lines on, next to the sun stack) open the new-pin popup. Glass see-through on the bar. "Scout" everywhere. User-facing word is "pin". Dark default. Pin style A. `#BF5700` accent only.
- **010/011:** Topo stays Topo at every zoom. Attribution stays visible and is not covered by the parcel attribution. Thin gray tab line. No Scout suggestion chips (hunt-log step chips only while logging).
- **012:** Wind arrows, badge, and legend on all 3 styles; Wind off leaves nothing and does not remount the map. Tour arrows on target (8 steps). Forecast sun times on every row, no "sample" label. F4a/F4b still work if shipped.
- **013:** Min zoom, street → floor → street, on all 3 styles, Wind on and off, Property lines on: no blank, no jolt, same style. Sun stack under Forecast, ≥ 44pt, opens the popover, never drops a pin. Popover per the 013 Delta: Squirrel row, "No hour limit on private land", "Advisory only. Check local regs and verify current TPWD regulations."
- **014 H1:** sun-times glass holds through section 2. The PR #18 glass test still passes, or an equivalent still guards the glass. Floor tint is backup only.
- **014 H2:** "Log a hunt" on Pins, ≥ 44pt, existing form, no pin preselected from Pins. Zero pins: "Drop a pin first. Hunts are saved to a pin." After save, back on Pins with the new log under its pin. Pin detail still preselects that pin.
- **014 H3:** 8-step tour, per-account auto-launch, never over a modal, replay from You → App tour. This job does not change tour copy or tour behavior.
- **014 H4:** Property lines stay off by default. TxGIO lines only. No owner data. Attribution and Texas/zoom notes unchanged, unless H4 code is the proven root cause and the fix is limited to that cause.
- 20 pin taps (3 styles, Wind on, Property lines on) open that pin's popup. Forecast button opens Forecast. No pin or log data lost.

## Fail if

- The root cause is missing, or it does not cite the file and lines, or it does not say whether 014 H1 (PR #18) caused it
- There is no regression test that fails on `3903bb2` and passes with the fix, and the PR does not explain the gap
- The regression test does not cover a single tap showing the map after switching from every other tab 10 times
- The Map tab needs a second tap before the map shows, including after switching from Pins, Forecast, or Scout 10 times
- Returning to Map from Pins, Forecast, Scout, the You menu, or pin/hunt detail hangs, freezes mid-transition, or leaves the map unable to pan, zoom, or open a pin
- The ten-cycle stress path freezes, or the map fails pan/zoom/pin tap at the end
- The same freeze shows up with Wind on, Property lines on, Topo, Satellite, or Standard, after the shooting-light popover, or after background/foreground
- The sun-times glass is missing after any of those switches, or the H1 glass test from PR #18 fails and nothing equivalent guards the glass
- The popover countdown, colors, or game selector break
- `expo`, `expo-constants`, or `expo-router` are not at ~57.0.26, ~57.0.20, and ~57.0.24, or the lockfile is not updated
- Peer warnings or `expo-doctor` findings are hidden
- Any existing test fails, any 008–014 regression item fails, a new dependency is added, or anything outside this scope changes
- UI-check screenshots are committed to the product repo

## Simulator sweep (Lane signoff)

Setup: clean build of the product PR; iPhone SE (3rd gen) and a Pro Max Simulator; fresh install and an existing install; signed in with pins on the map; dark mode. Run once with Wind off and Property lines off, and once with Wind on, Property lines on, and each of Topo, Satellite, and Standard.

1. From Pins, tap Map **once**. The map shows on that tap. Do not tap Map again. Transition completes within about 300ms. No hang, no half-drawn frame. Pan, pinch-zoom, tap a pin: popup opens. Glass behind the sun stack is visible.
2. Same from Forecast. Same from Scout. One tap each. The map shows each time.
2a. From each other tab, switch away and back to Map 10 times, one tap on Map each time. Every one of those taps shows the map. No second tap.
3. Open the shooting-light popover, then close it. Switch to Pins and back to Map. Glass, countdown, colors, and game selector still work. Map still pans, zooms, and opens a pin.
4. Cycle Map → Pins → Map → Forecast → Map → Scout → Map ten times quickly. Then pan, pinch-zoom, and pin tap. No freeze.
5. Open the You/hamburger menu and return to Map. Open pin detail and hunt detail and return to Map. No freeze. Map still interactive. Glass still visible.
6. On Pins (or Forecast or Scout), background the app, foreground it, switch to Map. No freeze.
7. Repeat a short pass on bright Satellite (for example West Texas sand, ≈ 31.9, −102.3) and confirm the sun-stack glass is still there.
8. Launch the app after the Expo bump. Confirm it reaches Map.

Lane captures: a recording of steps 1–6, including step 2a (one tap from every other tab, 10 times each), on both phone sizes, fresh and existing install, plus the ten-cycle stress and one pass with Wind, Property lines, and each map style; stills of the sun-times glass after those switches, including bright Satellite, plus the popover; a launch still after the Expo bump; test output all green.

UI-check screenshots stay out of the product repo. Only the UI report markdown goes in the product repo. See `note.md`.
