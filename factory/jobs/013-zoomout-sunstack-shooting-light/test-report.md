# Test report

Origin tester (bc-c2197541) on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/16, branch `cursor/sun-stack-shooting-light-8f8a`, and G1 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/15, branch `cursor/zoomout-root-cause-8f8a`, base `244b0ba`.

First pass failed on two High items. Under Fabric, react-native-maps 1.27.2 `Props.h:1328` defaults a missing `minCenterCoordinateDistance` to 0, and `RNMapsMapView.mm:619` calls the min/max initializer, which MapKit throws on. Standard and Satellite could crash. `solar.ts` folded sunset with `% 24` onto the previous local evening, so a September Texas morning read 'after'. One Medium: the popover card was `accessible`, so VoiceOver couldn't reach the game options.

The builder fixed them. Standard and Satellite now have a 10 m min, and Topo keeps 3,200 m, both under a 7,000 km max with stable module constants. `sunTimesUTC` adds 24h when sunset is at or before sunrise. The VoiceOver summary is now its own element, and the game options have a selected state.

Re-check passed all items: the September test at `src/ac013.g3.test.ts:147`; Denver, LA, and Anchorage across the DST edges; the 8-game phase table; Dallas 10/15 7:31/6:54 and Austin 12/21 7:23/5:34; polar and NaN inputs are safe; the 008–012 regression holds. Tester commits: `adfcf35` (timing flake), `7662485` (Ellis rows), and `886e2de` (September test).

G1 tip is `a7df6678e6f0cf760a59d63b7a19b6ddb58d42d5`. G2+G3 tip is `0f548818350a5a4e0b41bf5accdb0c7925cb0b67`, which has G1 merged in. Current product tip is `0f548818350a5a4e0b41bf5accdb0c7925cb0b67`.

## Commands

- `npm test` — 249 pass / 0 fail at G1 tip `a7df6678e6f0cf760a59d63b7a19b6ddb58d42d5`, and 256 pass / 0 fail at G2+G3 tip `0f548818350a5a4e0b41bf5accdb0c7925cb0b67`, under the default zone, `TZ=UTC`, and `TZ=Pacific/Auckland`
- `npx tsc --noEmit` — ok

## Acceptance criteria

- G1: Standard and Satellite have a 10 m min, and Topo keeps 3,200 m, both under a 7,000 km max with stable module constants. No MapKit path gets a 0 min
- G2: the sun stack sits under Forecast. Covered by the G2+G3 suite (256 pass)
- G3: `sunTimesUTC` adds 24h when sunset is at or before sunrise. The September test at `src/ac013.g3.test.ts:147` passes. Denver, LA, and Anchorage pass across the DST edges. The 8-game phase table passes. Dallas 10/15 7:31/6:54 and Austin 12/21 7:23/5:34 pass. Polar and NaN inputs are safe. The VoiceOver summary is its own element, and the game options have a selected state
- Regression: 008–012 hold
- Hygiene: tester commits `adfcf35` (timing flake), `7662485` (Ellis rows), and `886e2de` (September test)

## Result

Pass. 0 failures at `0f548818350a5a4e0b41bf5accdb0c7925cb0b67` (256 pass). G1 tip `a7df6678e6f0cf760a59d63b7a19b6ddb58d42d5` is 249 pass.

G1–G3 match the brief on that tip. A Simulator pass goes to Lane.

## Gaps

- Lane only: Standard and Satellite open without crashing; the 7,000 km stop feels natural, with no globe or snap; the Dynamic Island clearance on SE and Pro Max; VoiceOver on a device; restoring the last game after a kill and relaunch. The VM has no iOS Simulator.
