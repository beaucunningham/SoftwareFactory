# Test report

Origin tester (bc-17230eb7) on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/14, branch `cursor/wind-coach-sun-d426`, base `ca6afd1`.

First pass at `2536a18` failed on two High issues. The step-1 in-cutout `placeTooltip` returned side 'below', so the arrow pointed up. Tapping the Map sun chip fell through and opened 'Name this pin'. Two Lows: 330 wind polylines (6 per arrow, index keys), and the DST test checked only hour bands.

The UI check failed F1 (High). With Wind on, the Sample wind wrapper in `app/(tabs)/index.tsx` was a Themed View with `absoluteFill` painting `#161411` over the whole map. It had been present since Job 010 `6a94bc3`, and it is the root cause of wind not showing.

The builder fixed all of this at `6472f57`. The wrapper is now a plain transparent View, locked by the test 'wind-on chrome is not a themed sheet over the map' in `src/ac012.test.ts`. Step 1 now returns arrow 'down'. The sun chip is a Pressable that swallows taps. Each arrow is one path, halo plus stroke (110 overlays at 55 arrows, 160 at the cap). The DST test asserts 6:44 AM / 5:36 PM.

Re-check at `6472f57` passed, all 6 items. No test commit. Code tip is `6472f57`. Current product tip is `3ba1b42` (UI report docs only).

## Commands

- `npm test` — 244 pass / 0 fail in the default zone, `TZ=UTC`, and `TZ=Pacific/Auckland` at `6472f57`
- `npx tsc --noEmit` — ok
- Web pixel checks — the map shows (not a solid sheet) on all 3 styles

## Acceptance criteria

- F1: Wind on shows the map, not a themed sheet. The Sample wind wrapper in `app/(tabs)/index.tsx` is a plain transparent View. The test 'wind-on chrome is not a themed sheet over the map' in `src/ac012.test.ts` locks that. Web pixel checks show the map on Topo, Satellite, and Standard. Each arrow is one path, halo plus stroke (110 overlays at 55 arrows, 160 at the cap)
- F2: step 1 returns arrow 'down'. The in-cutout `placeTooltip` no longer returns side 'below' with the arrow pointing up
- F3: the Map sun chip is a Pressable that swallows taps, so a tap does not open 'Name this pin'. Sun times are on-device NOAA. The DST test asserts 6:44 AM / 5:36 PM
- F4: F4a Appearance and F4b Pins search were dropped
- Regression: 008–011 hold
- Hygiene: no new dependencies. No test commit

## Result

Pass. 0 failures at `6472f57`.

F1–F3 match the brief on that tip. A Simulator pass goes to Lane.

## Gaps

- Lane only: the 20-toggle run, the 2-minute soak with 20+ pins, and the coach-mark tour on SE and Pro Max. The VM has no iOS Simulator.
