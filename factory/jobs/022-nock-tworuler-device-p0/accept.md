# Accept

Job `022-nock-tworuler-device-p0` is accepted.

Brief: `FACTORY_BRIEF_022_nock-tworuler-device-p0.md`. AC: `AC_NOCK_TWORULER_DEVICE_P0_v0.md`. Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Go: Beau via Finley, 2026-10-01 11:38am CT. Lane finished the Simulator gate at 2:28pm CT on final main `ee700dd0f5f3a22fb1b8c516d5da4021d1ebd944` (2h50 go to landed).

Every final product pull request was squash-merged to main:

- #90 M1+M2 two-finger gesture host — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/90
- #91 M3+M4 wind clears the status bar, pins above wind — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/91
- #92 M5 search field fills the top bar → `ee700dd0f5f3a22fb1b8c516d5da4021d1ebd944` (final main) — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/92. PR3 re-cut onto the new main after #91.

- Tested: one builder (`bc-53491cd4`) ran `tsc`, then `npm test` with TZ unset, UTC, and Pacific/Auckland on every PR. Final result is 436 pass / 0 fail. `npx expo install --check` is clean.
- Secured: data and security review passed #90 after one bounce. #91 and #92 are UI-only.
- UI-checked: UI QA passed #90, #91, and #92 after one bounce each.

Simulator gate on `ee700dd0f5f3a22fb1b8c516d5da4021d1ebd944`, finished 2:28pm CT on 2026-10-01:

- M1/M2 PASS. A real two-finger hold can't be tested in the Simulator. Beau verified it on his iPhone at about 7:54pm CT: "all looks good".
- AC 4.1 PASS.
- M5 PASS.
- Forecast caption PASS.
- AC 3.1 on Pro/Pro Max FAILED (wind arrows in the status band). The Engineering Manager deferred it to Job 023 as item B1.

Factory status is `accepted`.
