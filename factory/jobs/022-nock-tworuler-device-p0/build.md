# Build

Brief: `FACTORY_BRIEF_022_nock-tworuler-device-p0.md`. AC: `AC_NOCK_TWORULER_DEVICE_P0_v0.md`. Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Go: Beau via Finley, 2026-10-01 11:38am CT. Base at Go was main `bab84f5` (`bab84f57c7cf8061cec6a69b24a2a52e1d0d06bd`, Job 021). Final main is `ee700dd0f5f3a22fb1b8c516d5da4021d1ebd944`.

One builder (`bc-53491cd4`) ran the milestones and its own tests. Every final product pull request was squash-merged to main. PR3 was re-cut onto the new main after #91.

| Milestone | Origin PR |
| --- | --- |
| M1+M2. Two-finger gesture host. | https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/90 |
| M3+M4. Wind clears the status bar. Pins sit above wind. | https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/91 |
| M5. Search field fills the top bar. Re-cut of PR3 onto the new main after #91. Final main `ee700dd0f5f3a22fb1b8c516d5da4021d1ebd944`. | https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/92 |

Final main is `ee700dd0f5f3a22fb1b8c516d5da4021d1ebd944` (#92).

3 Origin pull requests were opened. 3 were merged (#90, #91, #92). 1 re-cut (PR3 re-cut onto the new main after #91).

## Simulator gate

Lane landed Origin main `ee700dd0f5f3a22fb1b8c516d5da4021d1ebd944` and finished the Simulator gate at 2:28pm CT on 2026-10-01.

- M1/M2 PASS. A real two-finger hold can't be tested in the Simulator. Beau verified it on his iPhone at about 7:54pm CT: "all looks good".
- AC 4.1 PASS.
- M5 PASS.
- Forecast caption PASS.
- AC 3.1 on Pro/Pro Max FAILED (wind arrows in the status band). The Engineering Manager deferred it to Job 023 as item B1.

## Process stats

- Go 11:38am CT. Landed 2:28pm CT (Sim pass). Duration 2h50.
- Cloud-agent runs: 1 builder (`bc-53491cd4`) plus this status agent.
- Origin PRs opened 3, merged 3 (#90, #91, #92).
- Re-cuts: 1 (PR3 re-cut onto the new main after #91).
- Review bounces: 4 (security #90, UI #90, UI #91, UI #92).
