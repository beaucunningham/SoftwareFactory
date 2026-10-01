# Test report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Final main `def44968cc0c467a8a249a7a43494613625cc473` (Origin #70, J8). Each PR's builder ran `npm test`.

## Commands

On final main:

- `npm test` with TZ unset — 373 pass / 0 fail
- `npm test` with `TZ=UTC` — 373 pass / 0 fail
- `npm test` with `TZ=Pacific/Auckland` — 373 pass / 0 fail
- `tsc --noEmit` — clean

## Merged tips

- #36 J1+J2 → `89086c8`
- #46 J10 camera + test glob → `ca34fc4`
- #51 J7 wind streamlines → `e123c7e`
- #56 J5 map credit → `0e4c8f2`
- #61 J3 N mark → `c915a7d`
- #64 J6 property lines from zoom 12 → `4e7ec95`
- #67 J4 wordmark loading screen + native splash → `cb700c4`
- #68 J9 map rotation + reset-north compass → `03016d1`
- #70 J8 keyboard avoidance + save bars → `def44968cc0c467a8a249a7a43494613625cc473`

## Result

PASS. Final main runs 373 tests, 0 fail, with TZ unset, UTC, and Pacific/Auckland. `tsc` is clean.
