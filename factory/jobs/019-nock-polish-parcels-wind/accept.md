# Accept

Job `019-nock-polish-parcels-wind` is accepted.

Brief: SoftwareFactory #89. Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Every final product pull request was squash-merged to main:

- #36 J1+J2 → `89086c8` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/36
- #46 J10 camera + test glob → `ca34fc4` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/46
- #51 J7 wind streamlines → `e123c7e` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/51
- #56 J5 map credit → `0e4c8f2` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/56
- #61 J3 N mark → `c915a7d` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/61
- #64 J6 property lines from zoom 12 → `4e7ec95` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/64
- #67 J4 wordmark loading screen + native splash → `cb700c4` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/67
- #68 J9 map rotation + reset-north compass → `03016d1` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/68
- #70 J8 keyboard avoidance + save bars → `def44968cc0c467a8a249a7a43494613625cc473` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/70

Final main is `def44968cc0c467a8a249a7a43494613625cc473`.

- Tested: 373 pass / 0 fail on final main with TZ unset, `TZ=UTC`, and `TZ=Pacific/Auckland`. `tsc --noEmit` is clean. Each PR's builder ran `npm test`.
- Secured: no new dependencies except the `react-test-renderer` `^19.2.3` devDependency (J4). No version bump. `package.json` is otherwise unchanged. J8 report: `docs/job-019-j8-security-ui-report.md`.
- UI-checked: re-check reports by source review and frame math (iPhone SE 3rd gen, iPhone 15, iPhone 15 Pro Max). `docs/job-019-j4-recheck-report.md`, `docs/job-019-j6-recheck-report.md`, `docs/job-019-j8-recheck-report.md` (re-check 2 PASS), `docs/job-019-j9-recheck-report.md` (PASS, no findings). Simulator steps for J3–J9 are in the PR bodies and the docs.

Open low notes:

- J5's credit line can briefly remount during the sheet's 150–170ms slide-away.
- AC 7.9: `WIND_RENDERER` stays `'streamlines'` only if a 50 fps measurement holds on device.
- Pins search (F4b) is in the backlog.

Factory status is `accepted`.
