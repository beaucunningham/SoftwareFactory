# UI report

Origin UI pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/13, branch `cursor/sim-fixes-coachmarks-ade4` (docs tip `b3c9bc4`, product tip `11df3c2`, base `6a94bc3`).

The UI worker filed a docs-only report on that same branch: `docs/job-011-ui-report.md` at docs commit `b3c9bc4`. Screenshots were not committed to the product repo. They are in the UI agent's artifacts (bc-8c3a8f05). Product code was not changed by the UI worker.

## What I opened

Expo web at 390×844, plus resize checks at 375×667 and 430×932.

The first run was at product `2af7118`. The re-run was at `560e6d9`. The narrow E5 re-check was at `11df3c2`. The later commit `b3c9bc4` is docs only (`docs/job-011-ui-report.md`) on top of code tip `11df3c2`. Full tip `b3c9bc49bd51ab0efcacf0436a3bc596ab111509`.

## What worked

Re-run PASS at `560e6d9` on the Expo web sweep at 390×844, 375×667, and 430×932. Narrow E5 re-check PASS at `11df3c2`. No High or Medium findings remain.

- E1 (Wind): 10 toggles on each style kept the map visible, with rotated arrows, the Sample wind badge, and the mph legend.
- E2: Topo caps at zoom 16 and the other styles at 20.
- E3: one 28×2 `#D8D8D8` line under the selected tab.
- E4: literal test. No chip row after ordinary Scout sends ('hi', 'saw 3 doves', 'harvested 2 ducks', '3 ducks', 'shot 3 teal this morning'). Guided-log chips appear only in a deliberately started 'Log a hunt' and clear on cancel or save.
- E5: all 6 tour steps in order at 3 sizes. Skip and replay from You > App work, and the highlight does not open a pin draft or the Map Tools sheet.
- E6: after Skip, Scout shows 'Where should I hunt Saturday?' and Try it.

## Screenshots

Named in the UI agent artifacts (bc-8c3a8f05). Not committed to this repo or the product repo.

## Issues

First run FAIL at `2af7118`. E5 was High because a web `findNodeHandle` crash stopped the tour. The web map had no tour target, and web capped every style at zoom 16. The builder fixed these at `c6fa99c` and `560e6d9`. Re-run PASS at `560e6d9`. 237 pass / 0 fail with a clean typecheck.

One Low, fixed in-job. The step-1 Skip box ran past the 844px viewport. The builder fixed it at `11df3c2` by placing the step-1 counter, tip, and Skip inside the cutout, clamped to the safe area, and added a layout test. Narrow E5 re-check PASS at `11df3c2`. The Skip box is at y=140, h=44 at all 3 sizes, inside the viewport and above the tab bar. Steps 2–6 are unchanged, Skip and replay are OK, and the Wind toggle, Scout 'hi' (no chips), and tab line spot checks passed.

## Gaps for Lane

Lane owns the iOS Simulator list after merge. These were not verifiable on web:

- Wind on all 3 styles with 20 toggles, a 2-minute pan with 20+ pins, backgrounding, Reduce Motion, and badge and legend placement.
- Topo zoom from 5 to max and back at 4 TX spots, with and without Wind. `maxZoomLevel` 16 stops pinch, and Standard does not show through.
- The tab line over bright Satellite and dark Standard, with Reduce Transparency, and the VoiceOver selected state.
- Scout after 'hi' and 'saw 3 doves' shows no chips.
- The full 6-step tour on SE and Pro Max, with Skip (the step-1 safe area), replay, Reduce Motion, and VoiceOver.
- The Scout tutorial's Try it focuses the composer.
- expo-doctor, and a clean Simulator build after the bumps.
- Ruler drag on Topo and with Wind on, glass, and Forecast 7-day above 3-day.

## Result

Pass. A person can finish the wind fallback, Topo zoom cap, tab line, chip-free Scout chat, coach-mark tour, and Scout tutorial on Expo web. Lane still owns iOS Simulator sign-off.
