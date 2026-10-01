# Test report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

One builder ran its own tests. At the final PR head (`2baf6c25ddf4df3d72aea797c41d9f8f1b6630c9`, Origin #79):

- `npm test` with TZ unset — 390 pass / 0 fail
- `npm test` with `TZ=UTC` — 390 pass / 0 fail
- `npm test` with `TZ=Pacific/Auckland` — 390 pass / 0 fail
- `tsc --noEmit` — 0
- merge-tree against main — clean

## Merged tips

- #71 K1 → `496e8ccab4b15a66b5031549d220d6d9f9647fd4` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/71
- #75 K2 → `8d7abc6579314ef24a23c72a3f23bf2c683b6eef` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/75
- #78 K3+K5 → `57138d59702d791edbc46b104cd08e5c0819da4c` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/78
- #79 K4 → `2baf6c25ddf4df3d72aea797c41d9f8f1b6630c9` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/79

## Result

PASS. At the final PR head, 390 tests pass and 0 fail with TZ unset, UTC, and Pacific/Auckland. `tsc --noEmit` exits 0. Merge-tree against main is clean.
