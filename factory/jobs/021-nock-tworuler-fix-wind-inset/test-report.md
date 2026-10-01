# Test report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

One builder ran its own tests. At the final D head (`bab84f57c7cf8061cec6a69b24a2a52e1d0d06bd`, Origin #89):

- `npm test` with TZ unset — 416 pass / 0 fail
- `npm test` with `TZ=UTC` — 416 pass / 0 fail
- `npm test` with `TZ=Pacific/Auckland` — 416 pass / 0 fail
- `tsc --noEmit` — clean on every PR
- merge-tree against main — clean at each handoff

## Merged tips

- #82 C L5 → `8a484c6` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/82
- #84 A L1–L3 → `2636f2a` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/84. Replaces #80.
- #88 B L4+L4b → `dcd40a5` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/88. Replaces #81 and #85.
- #89 D L6 → `bab84f57c7cf8061cec6a69b24a2a52e1d0d06bd` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/89. Replaces #83, #86, and #87.

## Result

PASS. At the final D head, 416 tests pass and 0 fail with TZ unset, UTC, and Pacific/Auckland. `tsc --noEmit` is clean on every PR. Merge-tree against main is clean at each handoff.
