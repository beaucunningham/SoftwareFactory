# Test report

Origin tester on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/8, branch `cursor/app-ui-modernize-6baa`.

The tester added tests on that Origin PR branch. Product feature design is unchanged.

## Commands

- `npm test` — 183 pass / 0 fail
- `src/ac006.tester.test.ts` — added in tester commit `b7b15f2`
- `npx tsc --noEmit` — ok

## Acceptance criteria

- Tabs are Map | Forecast | Guide | You; Map is home
- One ForecastScreen from the Forecast tab and the Map button
- iOS Map has 2 controls: Forecast and Options
- One pin per day; `suggestPins` ranking unchanged
- Teardrop pins
- Job 004/005 pin behavior intact
- Quiet log, Guide, You, and auth
- Guide pin-chip tap selects the pin and continues the save, with a test
- Hygiene: no new dependencies, keys, hosts, or migration

## Result

Pass. 0 failures.

First pass failed at `8b2e6bb`. On web, a teardrop head tap missed because `pinHit` was a radius-22 circle at the tip, and the web log-form map (`PinDropMap.web.tsx`) still drew a circle. Tester commit `b7b15f2` added `src/ac006.tester.test.ts`. The builder fixed both at `c307773` (hit-test uses the 44x44 teardrop box with its bottom center on the coordinate; web log-form map uses `SpotPin` with the bottom anchor). Re-test pass at `c307773`.

Lane iOS Simulator: only Forecast and Options on Map, head tap opens detail and the tip stays anchored when selected, calm selected state, cold start on Map, Add pin at center / Fit to pins / Satellite-Standard / press-and-hold creates nothing, suggestion centers the pin.

## Gaps

- Non-blocking: web +/- zoom buttons are app-added web-only preview controls (Finley ruled low, iOS-first).
- Non-blocking: duplicate pin names do not resolve on chip tap (the number still works).
- Non-blocking: suggestion centering has a short delay.
- Non-blocking: Job 005 carryovers (modal signed-out redirect, vault per-row parse).
