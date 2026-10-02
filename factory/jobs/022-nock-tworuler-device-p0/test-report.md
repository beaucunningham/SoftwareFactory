# Test report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

One builder (`bc-53491cd4`) ran its own tests. On every pull request it ran `tsc`, then `npm test` with TZ unset, `TZ=UTC`, and `TZ=Pacific/Auckland`. At the final head (`ee700dd0f5f3a22fb1b8c516d5da4021d1ebd944`, Origin #92):

- `tsc` — clean on every PR
- `npm test` with TZ unset — 436 pass / 0 fail
- `npm test` with `TZ=UTC` — 436 pass / 0 fail
- `npm test` with `TZ=Pacific/Auckland` — 436 pass / 0 fail
- `npx expo install --check` — clean

## Merged tips

- #90 M1+M2 two-finger gesture host — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/90
- #91 M3+M4 wind clears the status bar, pins above wind — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/91
- #92 M5 search field fills the top bar → `ee700dd0f5f3a22fb1b8c516d5da4021d1ebd944` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/92. PR3 re-cut onto the new main after #91.

## Result

PASS. At the final head, 436 tests pass and 0 fail with TZ unset, UTC, and Pacific/Auckland. `tsc` is clean on every PR. `npx expo install --check` is clean.
