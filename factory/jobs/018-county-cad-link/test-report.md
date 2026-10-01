# Test report

Origin PR https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/35, branch `cursor/county-cad-link-018`, tip `e172b1cd898dc6a42d7573a6421a783dae165ca6`. Base is Origin main `8233083`.

The PR replays the identical 018 diff `2478868..889c91c` from the superseded draft #33 (closed unmerged). The only tree difference from `889c91c` is two Job 017 UI report docs that are already on main.

Tester check on `889c91c`: PASS.

## Commands

- `npm test` — 318 pass / 0 fail in the default TZ, UTC, and Pacific/Auckland
- `tsc --noEmit` — clean

## Table

250 real county CAD sites plus 4 Comptroller fallbacks (Montague, Motley, Palo Pinto, Sabine).

## Result

PASS. The tester check on `889c91c` passed. 318 pass / 0 fail in the default TZ, UTC, and Pacific/Auckland. `tsc --noEmit` is clean.
