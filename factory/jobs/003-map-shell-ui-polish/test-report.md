# Test report

Origin tester on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/4, branch `cursor/map-shell-ui-polish-c442`.

The tester added tests on that Origin PR branch. Product feature design is unchanged.

## Commands

- `npm test` — 123 pass / 0 fail
- `src/map/ac003.mapShell.test.ts` — 7 pass
- `tsc --noEmit` — ok

## Acceptance criteria

- Map opens on hybrid by default, with a one-tap Standard ↔ Satellite pill
- Primary map floating controls stay at or under two
- Spots render as clean pins
- Map stays the home tab
- Tabs remain Map | Logs | Guide | You
- Weather stub from job 002 stays null-safe
- No Mapbox or Google Maps keys, and no live weather

## Result

Pass. 0 failures.

## Gaps

- No iOS Simulator on the tester host. Lane owns Simulator sign-off.
- Web preview still has +/- zoom buttons. Those are excluded from the iOS checklist.
- Create-spot was not mounted on device this pass.
