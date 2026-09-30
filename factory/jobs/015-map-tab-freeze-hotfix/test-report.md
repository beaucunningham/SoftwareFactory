# Test report

Origin tester (bc-2635f059) on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/25, branch `cursor/map-tab-freeze-hotfix-c958`, final tip `821e6efe8138fc49730e0f983ae592bea2fb4da4`. Base is Job 014 at `3903bb27c2a869926c7d8935dbf55ce35f20514a`.

Pass on every item. Tester commit `821e6ef` requires Map's duration to be exactly 0. The builder's parser let a missing duration pass. That commit is test-only.

Root cause verified against the installed expo-router `BottomTabView.js` and react-native-screens sources. H1's opacity pin plus `animation: 'fade'` leaves Map (index 0, progress -1) at activityState 1. `prepareDetach` runs without `detachScreen`, and the outgoing scene stays on top. The double tap is the animated-to-plain activityState handoff that `RNSScreen.mm` `setActivityStateOrNil` ignores.

An unattached progress node does not by itself cancel the outgoing fade. The half-detach plus the handoff race is what the source proves. Whether every return stalls, or only the race does, needs the Simulator.

Wind, cleanRegion, H4 parcels, and a glass focus loop are ruled out.

`src/ac015.test.ts` is 2 pass / 2 fail on `3903bb2` with only the helper `src/tabTransition.ts` copied over (it landed with the fix), and it passes at the tip. The updated H1 test fails 1 on `3903bb2` and passes at the tip.

The fix, the glass guard (`GlassView` `didMoveToWindow` / `layoutSubviews`), the stable sun-stack key, MapView with no key, the You / pin detail / hunt detail / background paths, the Expo bump (`npx expo-doctor` 21/21), scope (8 files), and the 008–014 checklist all pass.

Expo web export works. Web cannot show the iOS freeze.

UI check skipped for this hotfix only. Beau approved the skip at 4:14pm CT on 2026-09-30, via Finley. Tester and security still ran.

## Commands

- `npm test` — 282 pass / 0 fail at tip `821e6efe8138fc49730e0f983ae592bea2fb4da4`, under the default zone, `TZ=UTC`, and `TZ=Pacific/Auckland`
- `npx tsc --noEmit` — ok
- Expo web export — ok

## Acceptance criteria

- Root cause matches the installed expo-router `BottomTabView.js` and react-native-screens sources. Map (index 0, progress -1) stays at activityState 1 under H1's opacity pin plus `animation: 'fade'`. `prepareDetach` runs without `detachScreen`. The outgoing scene stays on top. The double tap is the animated-to-plain activityState handoff that `RNSScreen.mm` `setActivityStateOrNil` ignores
- Suspects ruled out: Wind, cleanRegion, H4 parcels, and a glass focus loop
- `src/ac015.test.ts` is 2 pass / 2 fail on `3903bb2` (helper `src/tabTransition.ts` copied over) and passes at the tip. The updated H1 test fails 1 on `3903bb2` and passes at the tip
- Fix: Map duration is exactly 0 (`821e6ef`). Glass guard is `GlassView` `didMoveToWindow` / `layoutSubviews`. The sun-stack key stays stable. MapView has no key
- Paths: You, pin detail, hunt detail, and background
- Expo bump: `npx expo-doctor` 21/21. Scope is 8 files
- Regression: 008–014 hold
- Hygiene: tester commit `821e6ef` is test-only

## Result

Pass. 0 failures at `821e6efe8138fc49730e0f983ae592bea2fb4da4` (282 pass) under three time zones. `tsc` is clean.

The hotfix matches the brief on that tip. Simulator steps B1–B6, C1, C3, and D2 launch go to Lane.

## Gaps

- Simulator only: B1–B6, C1, C3, and D2 launch. Whether every return stalls, or only the handoff race does, needs the Simulator. The VM has no iOS Simulator. Expo web export works and cannot show the iOS freeze.
- UI check skipped with Beau's approval (4:14pm CT 2026-09-30 via Finley), for this hotfix only.
