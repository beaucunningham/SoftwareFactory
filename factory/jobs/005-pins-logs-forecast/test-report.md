# Test report

Origin tester on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/7, branch `cursor/pins-logs-forecast-0c75`.

The tester added tests on that Origin PR branch. Product feature design is unchanged.

## Commands

- `npm test` — 167 pass / 0 fail
- `src/ac005.tester.test.ts` — 17 pass
- `npx tsc --noEmit` — ok

## Acceptance criteria

- Single tap on empty map drops a provisional pin and opens the Job 004 small popup with a type picker
- Save persists name and type; Cancel leaves no orphan; press-and-hold does nothing
- Selected pin is one slight scale plus a burnt-orange ring; tap target stays ≥44pt
- Visible copy says Pin; no visible "spot"
- Tabs are Map | Guide | You; hunts live on pins; Unpinned hunts show only when N > 0
- Multi-animal defaults persist; 3-day stub forecast and rule suggestions sit behind ForecastProvider
- Migration seed `{"stayed":1,"attachedNearest":1,"createdPin":1,"unpinned":1,"huntsBefore":4,"huntsAfter":4}`; re-run changes nothing
- No live weather, no API keys, no auth or BaaS changes

## Result

Pass. 0 failures.

First pass failed A12 (selected pin double-scaled) and A13 (visible "spot" copy). Builder fixed both in `132b949`. Re-test pass at `132b949278c2ffd554df4bc5654986ef66ac883c`.

## Gaps

- A11 Satellite and Standard screenshots with ≥3 types were not captured. The UI stage will attempt them on web.
- No real iOS Simulator finger tap on the tester host. Lane owns that tap.
- Non-blocking: dove Guide line says "hammered hotspot".
- Non-blocking: unused throw `Spot not found on this device.` in archiveSpotById.
