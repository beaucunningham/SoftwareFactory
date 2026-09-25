# UI report

Origin UI pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/14, branch `cursor/wind-coach-sun-d426` (docs tip `3ba1b42`, product tip `6472f57`, base `ca6afd1`).

The UI worker filed a docs-only report on that same branch: `docs/job-012-ui-report.md` at docs commit `3ba1b42`. Screenshots were not committed to the product repo. They are in the UI agent's artifacts (bc-343aed3d). Product code was not changed by the UI worker.

## What I opened

Expo web at 390×844, plus resize checks at 375×667 and 430×932.

The first run was at product `2536a18`. The re-run was at `6472f57`. The later commit `3ba1b42` is docs only (`docs/job-012-ui-report.md`) on top of code tip `6472f57`. Full tip `3ba1b42d035fc7b773eb4e2869ebc942e57678c5`.

## What worked

Re-run PASS at `6472f57` on the Expo web sweep at 390×844, 375×667, and 430×932. No High or Medium findings remain.

- F1 (Wind): Wind on over Topo, Satellite, and Standard at Rockwall and Cupertino shows the tiles, arrows (about 75pt apart), sun chip, badge, legend, and the USGS line on Topo. The Topo frame is only 4.7% `#161411`. Wind held for 20 toggles with the style, region, and pin kept. Empty-map and pin taps work with Wind on, and a 2-minute soak with 20 pins still took a tap at the end.
- F2: arrow tip delta 0 at all 6 steps and 3 sizes. The step-1 arrow sits on the bubble's bottom and points into the map. Skip and replay work.
- F3: the Map chip shows sunrise and sunset in local time and updates after a pan settles. Tapping it (Wind on and off) never opens 'Name this pin'. Every 7-day and 3-day row shows sun times, with no 'sample', 'NaN', or 'Invalid Date'. The on-device math matches the brief's Dallas 2026-10-15 value (7:31 AM / 6:54 PM).
- The 008–011 spot check passed.
- Web draws static glyph arrows. The native one-path Polyline arrows inside MapView can't show on web.

## Screenshots

Named in the UI agent artifacts (bc-343aed3d). Not committed to this repo or the product repo.

## Issues

First run FAIL at `2536a18`. F1 was High because with Wind on, a Themed `absoluteFill` wrapper painted `#161411` over the whole map, leaving only the badge and legend visible. This was the real root cause, present since Job 010. F2 and F3 passed on web. The tester additionally failed the step-1 arrow direction and the sun-chip tap falling through to the map. The builder fixed all of this at `6472f57`. Re-run PASS at `6472f57`. 244 pass / 0 fail under 3 time zones with a clean typecheck.

## Gaps for Lane

Lane owns the iOS Simulator list after merge. These were not verifiable on web:

- Wind on Topo, Satellite, and Standard shows visible arrows with the map visible, including outside TX. Pan and zoom re-grid the arrows.
- 20 toggles and a 2-minute soak with 20+ pins. Watch for lag with 110-160 polylines.
- Taps on the empty map and on pins land with Wind on.
- Reduce Motion keeps the arrows static. The badge and legend show only while arrows are showing, clear of the sun chip.
- The full 6-step tour on SE and Pro Max plus replay, with the arrow tip on the target and step 1 inside the cutout, clear of the home indicator.
- Sun times on every forecast row. The Map chip is top-left, updates after a far pan, and doesn't drop a pin.
- Dynamic Island clearance, and Topo not blanking at zoom 16.

## Result

Pass. A person can finish the wind overlay, coach-mark arrows, and sun times on Expo web. Lane still owns iOS Simulator sign-off.
