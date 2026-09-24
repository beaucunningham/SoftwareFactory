# Test report

Origin tester on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/5, branch `cursor/map-system-d2fb`.

The tester added tests on that Origin PR branch. Product feature design is unchanged.

## Commands

- `npm test` — 136 pass / 0 fail
- `src/map/ac004.tester.test.ts` — 8 pass
- `tsc --noEmit` — ok

## Acceptance criteria

- After sign-in, Map is the default tab and shows a live MapView
- Job 003 hybrid default, style pill, and at most two floating controls still hold
- Tap empty map drops a provisional pin, then name and save create the spot
- Cancel clears the provisional pin
- Tap an existing pin opens detail and does not start a second create
- Archive syncs the map and hunt pick-spot
- Camera policy is fit-to-pins
- Weather stub from job 002 stays null-safe
- No Mapbox or Google Maps keys, no live weather, no onX, and no Guide memory

## Result

Pass. 0 failures.

## Gaps

- No iOS Simulator on the tester host. Lane owns Simulator sign-off.
- Map screen was not mounted this pass. Pin math and wiring were tested.
- Web preview still has +/- zoom buttons.
