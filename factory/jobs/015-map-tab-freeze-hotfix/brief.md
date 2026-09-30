# Brief — Job 015: Map tab freeze hotfix (URGENT) + Expo patch bump

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `015-map-tab-freeze-hotfix`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: product `main` at `3903bb27c2a869926c7d8935dbf55ce35f20514a` (Job 014 landed). Do not follow an older tmp product URL. Do not start from an older product tip. Do not open on a commit before `3903bb27c2a869926c7d8935dbf55ce35f20514a`.  
**Stack:** Expo SDK 57, React Native, expo-router, react-native-maps (Apple Maps on iOS), in-house NOAA sun math (012), 013 sun stack + shooting-light popover, 011/012 in-house coach-mark tour (`placeTooltip`), 009 glass (`expo-glass-effect` `GlassView` on iOS 26+ / `expo-blur` `BlurView` fallback), 014 H1 Map-scene opacity guard, 014 H2 Log a hunt, 014 H3 per-account tour, 014 H4 TxGIO property lines  
**Build on:** Job 014 at Origin main `3903bb27c2a869926c7d8935dbf55ce35f20514a`. Do not regress Job 005–014 behavior. **All existing tests stay green.** Sage recorded **274** at the 014 H4 tip. The factory accept note recorded **277** at final H4 tip `143cc53b171856a8c09fbaae16a07fd2949d7495`. The builder records the count on `3903bb27c2a869926c7d8935dbf55ce35f20514a` before and after. Every test that already exists on that commit stays green. New tests are added on top. **No new dependencies.**  
**Related:** `ac.md` (copy of `AC_MAP_TAB_FREEZE_HOTFIX_v0.md`) · Job 014 H1 sun-stack glass (Origin PR #18) · Job 003/006–014 quiet field-tool chrome (north star) · brand burnt orange `#BF5700` for accents only · pin style A (locked in 007) · `note.md` (UI-check screenshots stay out of the product repo; merges go through the normal permitted path only)  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** **One** Origin product pull request for both items below. A separate commit for the Expo bump is fine. Sage's handoff is one draft product PR. This hotfix must not ship half-fixed. The product PR merges through the normal permitted path only. The builder writes `factory/jobs/015-map-tab-freeze-hotfix/build.md` in this repo and documents everything listed under Constraints, including token usage. Lane runs the iOS Simulator sweep and captures the shots and recordings listed in Constraints for the ui worker.

Beau's go came via Finley on 2026-09-30 at 4:01 PM CT. Status: **FINAL, approved to build.** **URGENT hotfix.** Hand straight to Kai. **The AI's user-facing name stays Scout.** **USGS The National Map `USGSTopo` tiles stay approved.** Weather and wind stay stubs, with no keys or spend. This brief is approved and final for Kai. No open Decisions for Beau.

**Delta 2026-09-30 4:06 PM CT (Beau via Finley).** Sometimes the Map tab button has to be tapped twice before the map shows. Likely the same root cause as the freeze; verify that, and do not assume a second bug. **A single tap on the Map tab always shows the map, including after switching from every other tab 10 times.** The regression test covers it. Lane's Simulator steps include it.

Chrome north star: Job 003/006–014 quiet field tool: dark by default, calm neutrals, burnt orange `#BF5700` for accents only, pin style A. This job does not restyle chrome.

## What to build

Priority order. Keep this scope exactly. **One product PR.** Nothing else.

1. **Map tab freeze when returning to Map from any tab.** Beau, iOS Simulator, main `3903bb2`: returning to the **Map** (home) tab from ANY other tab (Pins, Forecast, Scout, and You/menu screens if reachable) freezes partway through the tab transition. After that the map is unusable (no pan, no zoom, no tap). The same session (Beau via Finley, 2026-09-30 4:06 PM CT): sometimes the Map tab button has to be tapped twice before the map shows. Treat that as the same root cause unless the trace shows otherwise. Find the real root cause first (likely a regression from 014 H1, Origin PR #18; **verify, do not assume**). Add a regression test that **fails on `3903bb2` before the fix and passes after**, and that covers a single tap showing the map, including after switching from every other tab 10 times. The transition back to Map completes smoothly, **one tap on the Map tab always shows the map**, and the map is fully interactive. The 014 H1 sun-times glass does not regress.
2. **Expo patch bump.** `expo` ~57.0.26, `expo-constants` ~57.0.20, `expo-router` ~57.0.24. Align with `npx expo install --fix` style. Lockfile updated. Note any peer warnings in the product PR.

**Bar order stays: Map | Pins | Forecast | Scout.** Map stays the default home. The top-right three-line You menu is unchanged.

Everything else from Jobs 005–014 stays the same. **Weather and wind data stay PLACEHOLDER/STUB** (no live feed, no keys, no spend). Sun and shooting-light times stay on-device. The Scout chat stays an on-device stub. Tour copy and behavior do not change. Property lines do not change unless H4 code is the proven root cause of the freeze.

**Network:** no new network source. **All existing tests on `3903bb27c2a869926c7d8935dbf55ce35f20514a` stay green**; new tests are added on top. **No new dependencies.** No secrets, no API keys, no spend, no proxy/server hosting.

## Build order

1. Trace the tab navigator and transition path. Rule the suspects in or out with evidence. Write the root cause before changing behavior.
2. Add the regression test so it fails on `3903bb2` and passes with the fix. It must cover a single tap on the Map tab showing the map, including after switching from every other tab 10 times. If a true UI freeze cannot be unit tested, the test asserts that the condition causing it is gone (including a first tap that does not settle on Map), and the PR explains the gap.
3. Fix the freeze. Preferred direction is below. Keep the sun-times glass intact.
4. Expo patch bump in its own commit if that keeps the diff readable. Lockfile updated. Peer warnings noted in the PR.
5. Run the full existing suite plus the new test, and the 008–014 regression checklist, before hand-off to Lane.

One product PR. It merges through the normal permitted path only.

### Builder constraint: no Simulator in the cloud

Cloud builders run on Linux and **cannot run the iOS Simulator**. The builder does the deepest reproduction possible without a device:

- **Code tracing:** follow the tab navigator and every transition path that can leave the Map scene mid-transition, block touches (`pointerEvents`), leave an outgoing scene mounted above Map, stall the JS thread, or remount glass on focus. Include the 014 H1 Map opacity guard, focus effects, the wind layer, the region-clean function, and the H4 parcels tile layer. Write down what each does.
- **Unit/component tests** on the navigator/transition (Jest, mocked navigation, `testID`s). The new test fails on `3903bb2` and passes with the fix.
- **Reasoning from source/docs** for the versions in the lockfile (`expo-router`, `expo-glass-effect`, `react-native-maps`), citing the file and line or the doc.
- **Root cause with evidence** (code path, the trigger, the test that fails before the fix and passes after). Say whether it came from 014 H1 (PR #18) or elsewhere.
- **Exact Simulator steps for Lane (Mobile)**, who does the on-device confirmation for AC sections B–D. If Lane's device result disagrees with the builder's root cause, that's reported back before merge, not patched around.

## 1. Map tab freeze

**Symptom (Beau, iOS Simulator, main `3903bb2`, 2026-09-30):** returning to the **Map** (home) tab from ANY other tab freezes partway through the tab transition. Pins, Forecast, Scout, and You/menu screens if those screens are reachable, all do it. After the freeze the map is unusable: no pan, no zoom, no tap.

**Same bug, second symptom (Beau via Finley, 2026-09-30 4:06 PM CT):** sometimes the Map tab button has to be tapped twice before the map shows. Likely the same root cause as the freeze. A single tap on the Map tab always shows the map, including after switching from every other tab (Pins, Forecast, Scout) 10 times.

**Recorded 014 H1 fix (verify; do not treat this note as the cause until the code says so).** Origin PR #18 (`cursor/h1-sun-stack-glass-8299`, tip `222154e2c0bd987b3468a34dcc0b78709ac5c2c2`). Factory accept note: the Map tab used `animation: 'fade'`, so expo-router's `forFade` took the scene's opacity through 0. `expo-glass-effect` 57.0.4 `GlassView.swift` skips the glass at low opacity and reinstalls it only while the view is unmounted. The fix keeps the Map scene at opacity 1 (`mapSceneStyle`). Map Tools slides instead of fading. A 0.12 floor tint is backup only. The 014 UI check saw the Map scene stay at opacity 1 through the tab crossfade while other tabs still fade.

**Suspects (builder confirms with evidence, not guesses):**

1. The Map scene is forced to opacity 1 but the tab animation still runs on it. The transition never completes (never reaches its end/settled state), so the navigator leaves the scene in a mid-transition state with touches blocked (`pointerEvents`, or an overlay from the outgoing scene left on top).
2. An override of the animation/style interpolator on one route only puts the Map and other tabs out of sync, so the outgoing scene stays mounted above Map.
3. A native MapView layer or JS thread deadlock/stall triggered when the Map scene re-appears (focus effects, the wind layer, the region-clean function, the parcels tile layer from H4). Rule it out with a profiler/trace.
4. Glass remount logic added in H1 loops on focus (re-render storm).

**Fix direction.** Find the real root cause first. Preferred fix: remove the fade from the Map tab entirely (animation `none` for Map, or `shift`/none consistently for all tabs), not per-scene opacity hacks. Keep the glass protected with a guard that doesn't depend on opacity, for example keep the glass view mounted and re-key it on focus only if still needed. The fix must keep **both**:

- smooth tab switches back to Map with the map fully interactive,
- a single tap on the Map tab always shows the map, including after switching from every other tab 10 times, and
- the sun-times glass intact (no H1 regression).

**Tests to add:** a navigator/transition unit or integration test that **fails on `3903bb2` and passes with the fix**. The same test covers the double-tap symptom: one tap on the Map tab shows the map (the Map scene is settled and visible), including after switching from every other tab 10 times. A second tap must not be required. If a true UI freeze can't be unit tested, the test asserts that the condition causing it is gone (transition config for Map, scene reaching its settled/focused state on the first tap, no leftover overlay or `pointerEvents` block). The PR explains that gap. The H1 regression test from PR #18 still passes, or is replaced by an equivalent that still guards the glass.

## 2. Expo patch bump

Align with `npx expo install --fix` style. A separate commit in the same product PR is fine.

- `expo` ~57.0.26
- `expo-constants` ~57.0.20
- `expo-router` ~57.0.24

The lockfile is updated. `npx expo-doctor` (or the equivalent the repo already uses) is clean, or its warnings are listed in the product PR. Peer warnings are noted in the PR. The app still builds and launches in the Simulator (Lane). No other dependency changes. No new dependencies.

## Research

- **Base:** Job 014 landed at Origin main `3903bb27c2a869926c7d8935dbf55ce35f20514a`. Don't open on an older commit.
- **014 H1:** Origin PR #18. Recorded root cause and `mapSceneStyle` opacity-1 guard are in the factory accept note for `014-loghunt-parcels-sunglass-tour`. The freeze is a **suspect** regression from that fix. The builder verifies against the code on `3903bb2`.
- **Names/sources unchanged:** AI is **Scout**; topo is USGS `USGSTopo` (approved, attribution required); sun math is the in-house NOAA module from 012; shooting-light table per the 013 Delta (Ellis-verified). **This job does not change the shooting-light table, state text, or note.**
- User-facing word is **pin**, never "spot".
- **Nav lock:** Tabs stay **Map | Pins | Forecast | Scout** (Map default); You menu stays top-right. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. This hotfix does not amend the nav lock.
- No live weather/wind, no AI model, no keys, no spend. Sun math and shooting-light math stay on-device. No schema changes.
- Do not edit Job 001–014 files.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### 1. Root cause and regression test

- [ ] The product PR states the root cause in plain words, citing the exact file and lines, and says whether it came from 014 H1 (PR #18) or elsewhere
- [ ] Each suspect above is ruled in or out with evidence
- [ ] A regression test fails on `3903bb2` and passes with the fix. It covers a single tap on the Map tab showing the map, including after switching from every other tab 10 times. If a true UI freeze can't be unit tested, the test asserts the causing condition is gone, and the PR explains the gap
- [ ] Preferred fix when it matches the cause: Map fade removed (`none`, or `shift`/none for all tabs), not a new per-scene opacity hack. Glass stays protected by a guard that does not depend on opacity

### 2. Tab switching (Lane, iOS Simulator, fresh install and existing install)

- [ ] From each tab (Pins, Forecast, Scout) tap Map **once**. The map shows on that single tap. The transition completes within about 300ms with no hang or half-drawn frame. A second tap is never required
- [ ] After switching from every other tab 10 times, a single tap on the Map tab still shows the map
- [ ] After each switch the map pans, pinch-zooms, and a pin tap opens its popup/detail
- [ ] Stress: cycle Map → Pins → Map → Forecast → Map → Scout → Map ten times quickly. No freeze, and the map is still fully interactive at the end
- [ ] Also with Wind on, Property lines on, Topo, Satellite, and Standard, and with the shooting-light popover opened and closed before switching
- [ ] Return from the You/hamburger menu and from pin detail/hunt detail to Map. No freeze
- [ ] Background the app on another tab, foreground it, and switch to Map. No freeze

### 3. No H1 regression (sun-times glass)

- [ ] The glass/blur behind the sunrise/sunset stack is visible after every switch above
- [ ] The H1 regression test from PR #18 still passes, or an equivalent still guards the glass
- [ ] The popover still works: countdown, colors, and game selector

### 4. Expo patch bump

- [ ] `package.json` has `expo` ~57.0.26, `expo-constants` ~57.0.20, and `expo-router` ~57.0.24, with the lockfile updated
- [ ] `npx expo-doctor` (or equivalent) is clean, or its warnings are listed in the PR. Peer warnings are noted. The app builds and launches in the Simulator

### Regression checklist (008–014 behavior must hold)

- [ ] **Tests:** every existing test on `3903bb27c2a869926c7d8935dbf55ce35f20514a` stays green (count recorded before and after; Sage recorded 274 at the 014 H4 tip, factory accept recorded 277 at final H4 tip `143cc53`). New tests are added on top
- [ ] **008 motion:** Pins, Forecast, and Scout still switch. Reduce Motion stays a plain fade (008 B3). The Map return may drop the fade so the transition can settle; it must finish with the map interactive. **008 ruler** drag still works on Topo, with Wind on, and with Property lines on. Pins empty state and most-recently-hunted sort stay
- [ ] **009 C7 tap-to-pin:** 20 single taps on empty map (3 styles, Wind on, Property lines on, next to the sun stack) all open the new-pin popup
- [ ] **Pin popup:** 20 pin taps (3 styles, Wind on, Property lines on) all open that pin's popup
- [ ] **009 glass** see-through on the bar; "Scout" everywhere; "pin" not "spot"; dark default; pin style A; `#BF5700` accent only
- [ ] **010/011 Topo:** stays Topo at every zoom, attribution visible (and not overlapped by the parcel attribution)
- [ ] **011 E3** thin gray tab line; **011 E4** no Scout suggestion chips (hunt-log step chips only while logging)
- [ ] **012 F1 wind:** arrows visible on all 3 styles, badge + legend only while showing; Wind off leaves nothing; toggling does not remount the map
- [ ] **012 F2 tour arrows** on target for every step (8)
- [ ] **012 F3 sun times** on every forecast row; no "sample" label on sun times
- [ ] **012 F4a/F4b** still work if shipped
- [ ] **013 G1 min zoom:** street → floor → street on all 3 styles, Wind on and off, Property lines on: no blank, no jolt, same style
- [ ] **013 G2/G3:** sun stack under Forecast, ≥ 44pt, opens the popover, never drops a pin; popover phases/colors/game selector/timer/persistence per the 013 Delta (Squirrel row, "No hour limit on private land", "Advisory only. Check local regs and verify current TPWD regulations.")
- [ ] **014 H1:** sun-times glass holds through the matrix in section 2. H1 test from PR #18 still passes or an equivalent still guards the glass. Floor tint stays backup only
- [ ] **014 H2:** "Log a hunt" on Pins, ≥ 44pt, existing form, no pin preselected from Pins; 0 pins still shows "Drop a pin first. Hunts are saved to a pin." After save the user is back on Pins and the new log shows under its pin. Pin detail still preselects that pin
- [ ] **014 H3:** 8-step tour, per-account auto-launch, never over a modal, replay from You → App tour. This job does not change tour copy or tour behavior
- [ ] **014 H4:** Property lines stay off by default, TxGIO lines only, no owner data, attribution and Texas/zoom notes unchanged, unless H4 code is the proven root cause and the fix is limited to that cause
- [ ] Forecast button opens Forecast; no pin or log data lost

### Hygiene

- [ ] Only the freeze fix and the Expo patch bump are new
- [ ] No live weather or wind, no backend changes, no keys, no spend, no proxy
- [ ] No new dependencies
- [ ] No schema changes
- [ ] iOS-first; Cloud Agents only; one product PR
- [ ] UI-check screenshots are not committed to the product repo. Only the UI report markdown is

## User-facing UI

Coming back to the map is one tap. The switch finishes, and the map still pans, zooms, and opens a pin. The sunrise/sunset glass is still there after every switch. The Expo bump does not change the screens. Lane confirms both on the iOS Simulator, on a fresh install and on an existing install.

- One tap on the Map tab always shows the map, including after switching from Pins, Forecast, and Scout 10 times each. A second tap is never required.
- From Pins, Forecast, Scout, the You menu, and pin or hunt detail, Map finishes the transition in about 300ms with no hang and no half-drawn frame.
- After each return the map pans, pinch-zooms, and a pin tap opens its popup.
- Ten quick Map → Pins → Map → Forecast → Map → Scout → Map cycles leave the map usable.
- The same holds with Wind on, Property lines on, Topo, Satellite, and Standard, and after the shooting-light popover is opened and closed.
- Background on another tab, foreground, then Map: no freeze.
- The glass behind the sunrise/sunset stack is visible after every one of those switches. The popover countdown, colors, and game selector still work.

## Payments and auth

- Payments: none. Do not invent spend. Weather stays the on-device stub. Wind stays the `WindSource` stub. The Scout chat stays an on-device stub. No live weather or live wind API. No keys, accounts, or spend. No new parcel source, proxy, or server.
- Auth: unchanged behavior (Apple primary, email secondary, no guest). No auth/BaaS provider swap. No account or backend change.
- Maps: existing Apple Maps stack plus the 010 USGS `USGSTopo` `UrlTile` plus the 014 TxGIO `WMSTile` overlay. No other tile provider. No new API keys or paid map SDKs. No new dependency.
- Location: sun times and shooting light stay on the map center, not GPS. No new location-permission dependency.
- Schema: no stored schema changes.

## Decisions for Beau

None. This brief is approved and final. Do not wait.

## Later (not in this job)

- Anything still on the 014 Later list
- Tour changes, new coach-mark steps, or parcels features
- A different tab animation for its own sake once the freeze is gone
- Expo upgrades beyond the three patch versions named above

## Out of scope

- New features
- Tour changes
- Parcels changes, unless H4 code is the proven root cause of the freeze
- Live weather/wind or any live data API
- Backend, auth, schema, keys, or spend
- New dependencies
- Anything other than the Map-tab freeze fix and the Expo patch bump
- Editing Job 001–014 files
- Product code changes from this SoftwareFactory ticket

## Constraints

- Status: **FINAL, approved to build** (Beau's go via Finley, 2026-09-30 at 4:01 PM CT). **Delta 2026-09-30 4:06 PM CT:** one tap on the Map tab always shows the map, including after switching from every other tab 10 times. **URGENT hotfix.**
- Base: Origin main **`3903bb27c2a869926c7d8935dbf55ce35f20514a`** (Job 014 landed)
- Do not touch product code from this SoftwareFactory ticket. Workers build on the product repo.
- **One product PR.** A separate commit for the Expo bump is fine. The PR merges through the normal permitted path only.
- **Build notes must include:**
  - Root cause in plain words, with the exact file and lines, and whether it came from 014 H1 (PR #18) or elsewhere
  - Each suspect ruled in or out, with the evidence
  - The regression test that fails on `3903bb2` and passes with the fix, including the single-tap case after switching from every other tab 10 times. If a true UI freeze cannot be unit tested, the condition the test asserts is gone, and the gap
  - The fix (animation `none` for Map, or `shift`/none for all tabs, when that matches the cause). How the glass stays protected without depending on opacity
  - Which glass path runs (GlassView/BlurView, Simulator iOS version) and that the H1 glass test still passes
  - Expo versions in `package.json`, lockfile update, `npx expo-doctor` (or equivalent) result, and any peer warnings, quoted
  - Exact Simulator steps for Lane covering AC B–D, including a single tap on the Map tab after switching from every other tab 10 times
  - Test count before and after on `3903bb2`, all green
  - Token usage
  - Confirmation that no new dependency was added
- **Lane Simulator signoff (shots / recordings):**
  - Recording: one tap on the Map tab from Pins, Forecast, and Scout shows the map. Repeat from every other tab 10 times; each return is still one tap. Also return from the You menu and from pin detail/hunt detail, on a fresh install and an existing install. No hang, no half-drawn frame, no second tap
  - After each return: pan, pinch-zoom, and a pin tap that opens the popup
  - Stress recording: the ten-cycle Map → Pins → Map → Forecast → Map → Scout → Map path, then pan/zoom/pin tap still work
  - The same with Wind on, Property lines on, Topo, Satellite, and Standard, and with the shooting-light popover opened and closed before the switch
  - Background on another tab, foreground, switch to Map
  - Stills of the sun-times glass after those switches, including bright Satellite, plus the popover (countdown, colors, game selector)
  - The app launches after the Expo bump
  - Test run output all green
- UI-check screenshots must not be committed to the product repo. Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this job folder. See `note.md`. The same rule is already in `.cursor/agents/ui.md` from Job 008.
- Merges go through the normal permitted path only. See `note.md`.
- Document token usage and the items above in `factory/jobs/015-map-tab-freeze-hotfix/build.md`.
- iOS-first. Cloud Agents only for code. One product PR.
- Hard hygiene: no live weather, no live wind, no backend, no new paid SDKs, no keys, no spend, no proxy. No new dependency. USGS topo tiles from 010 remain. The 014 TxGIO parcels overlay stays as it is unless it is the proven root cause. Sun math and shooting-light math stay on-device. The shooting-light table, state text, and note do not change.
- This public job tree stays free of secrets.
- Do not edit any Job 001–014 files.

## Design intent (one line)

One tap on Map shows the map, the switch finishes, the map still works, and the sunrise/sunset glass is still there.
