# Test report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

The app is Nock. Build 9 is live in internal TestFlight.

In-session `npm test` counts (TZ unset, `TZ=UTC`, and `TZ=Pacific/Auckland`) and `tsc --noEmit` results were not copied into this repository. Pass and fail counts: unknown. Builder ids were not copied into this repository.

## Merged tips

- #111 TestFlight release → `6b598fb` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/111. Squash-merged Fri 10/2/2026 9:43am CT. The Mobile QA Lead passed `97d0d6f` after bounces on `a08b887` and `73e194d`. The AI Product Owner passed throughout.
- #113 027b → `c08df858` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/113. Squash-merged Fri 10/2/2026 1:20pm CT. Both reviewers (the Mobile QA Lead and the AI Product Owner) passed.

## TestFlight

Build 8 (`6b598fb`) was rejected by Apple with ITMS-90683. Build 9 is live at 3:41pm CT Fri 10/2/2026 (EAS `633d1c10`, submission `ff49de5e`), internal group "Nock Internal", Beau only.

EAS labels it "snapshot 6b598fb" because of working-tree changes. The shipping files match `c08df85`. Two test files are at their `6b598fb` versions.

## Result

PASS for internal TestFlight. In-session unit-test and `tsc` counts are unknown. The Mobile QA Lead passed `97d0d6f`. Both reviewers passed 027b. Build 9 is live for "Nock Internal".
