# UI report

Origin UI pass (bc-083e34e6) on the four stacked Origin PRs, base `af447ef`.

- H1 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/18, branch `cursor/h1-sun-stack-glass-8299`, tip `222154e2c0bd987b3468a34dcc0b78709ac5c2c2` (262 tests)
- H2 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/19, branch `cursor/h2-log-a-hunt-8299`, tip `81f614a406c54e44bb5a4f2c3635c568d6c4ddc6` (264 tests)
- H3 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/20, branch `cursor/h3-tour-autolaunch-8299`, tip `d9add6c969cd43218ee5d46feb24b679bb724240` (270 tests)
- H4 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/21, branch `cursor/h4-property-lines-8299`, tip `143cc53b171856a8c09fbaae16a07fd2949d7495` (277 tests; includes the UI report)

The UI worker filed `docs/job-014-ui-report.md` on the H4 branch. That report is included at H4 tip `143cc53b171856a8c09fbaae16a07fd2949d7495`. Screenshots were not committed to the product repo. They are in the UI agent's artifacts (bc-083e34e6). Product code was not changed by the UI worker. The builder fix is `a1de2bb`.

## What I opened

Expo web at 390×844, plus resize checks at 375×667 and 430×932.

The first walk was at `c179dac`. The re-check was at `6a3e8e7`.

## What worked

Re-check PASS at `6a3e8e7` on the Expo web sweep at 390×844, 375×667, and 430×932. No High or Medium findings remain.

- The auto-launch walk goes 1 through 8 of 8 at all three sizes. The Pins step holds at 5 of 8 on Log a hunt. Skip and relaunch leave no tour. Replay cutouts are on the controls.
- H1: the Map scene stayed at opacity 1 through 20 popover cycles, game and style changes, and the tab crossfade, while other tabs still fade. Map Tools slides instead of fading, and the 0.12 floor is present.
- H2: the Log a hunt button is 48pt, saving reorders the pin first, the zero-pin card copy is exact, and pin detail still preselects its pin.
- H4: the sheet is off by default, with exact copy, zoom and outside-Texas and offline notes. It persists across reload, and there are 0 requests zoomed out. Web does not paint the ArcGIS overlay, so the device check covers that.
- H1, H2, and H4 are unchanged from the first walk.

## Screenshots

Named in the UI agent artifacts (bc-083e34e6). Not committed to this repo or the product repo.

## Issues

First walk FAIL at `c179dac` on H3.

- HIGH: the auto-launch tour dropped at the Pins step and restarted at 1 of 8.
- MED: replay cutouts were off at 390 wide (You off-screen, Map Tools about 90px low).

H1 passed on that walk: the Map scene stayed at opacity 1 through 20 popover cycles, game and style changes, and the tab crossfade, while other tabs still fade. Map Tools slides instead of fading, and the 0.12 floor is present. H2 passed: the Log a hunt button is 48pt, saving reorders the pin first, the zero-pin card copy is exact, and pin detail still preselects its pin. The H4 sheet passed: off by default, exact copy, zoom and outside-Texas and offline notes, persists across reload, 0 requests zoomed out.

The builder fixed H3 at `a1de2bb`. The Map-focus gate now only starts the tour, and replay remeasures after Map settles, with clamped cutouts. Re-check PASS at `6a3e8e7`.

Tester re-check PASS. H3 has 270 tests and H4 has 277 in three time zones, `tsc` is clean, and the new H3 tests fail on the old code. Security re-check of the probe-cap fix `01af522`: PASS.

## Gaps for Lane

Lane runs the iOS Simulator steps in `docs/job-014-build.md` separately after the merge. They are not an acceptance gate. Web does not paint the ArcGIS overlay, so the device check covers that.

## Result

Pass. A person can finish the sun-stack glass, Log a hunt on Pins, the 8-step tour, and the Property lines sheet on Expo web. Lane still runs the iOS Simulator steps after the merge.
