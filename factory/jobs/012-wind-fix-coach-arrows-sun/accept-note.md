# Accept note

Kai accepted job `012-wind-fix-coach-arrows-sun`.

- Builder, tester, security, and ui passed on Origin https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/14, branch `cursor/wind-coach-sun-d426` (docs tip `3ba1b42d035fc7b773eb4e2869ebc942e57678c5`, product tip `6472f57`, base `ca6afd1`)
- Builder: F1 `5bb4bb7`, F2 `fac2587`, F3 `a30986a`, notes `2536a18`, tester and UI fixes `6472f57`, UI report `3ba1b42`
- Tester first pass at `2536a18` failed (the step-1 in-cutout arrow pointed up, and tapping the Map sun chip opened 'Name this pin'). Re-check at `6472f57` PASSED. Final code tip `6472f57` is 244 pass / 0 fail under 3 time zones with a clean typecheck. Docs tip `3ba1b42d035fc7b773eb4e2869ebc942e57678c5` is docs only
- Security PASS with no findings at `2536a18` (diff `ca6afd1..2536a18`). The later diff swaps a view wrapper, the arrow direction, the chip Pressable, and the polyline paths. Security was not re-run for `6472f57`; the tester confirmed that diff added no network, dependencies, or storage
- UI first run FAIL at `2536a18` (F1 High: a Themed `absoluteFill` wrapper painted `#161411` over the whole map). F2 and F3 passed on web. The builder fixed this, the step-1 arrow, and the sun-chip tap at `6472f57`. Re-run PASS at `6472f57` on Expo web at 390×844, 375×667, and 430×932. The docs report is `docs/job-012-ui-report.md` at `3ba1b42`. Screenshots stay in the UI agent artifacts (bc-343aed3d), not in the product repo
- F1, F2, and F3 are delivered. F4a and F4b were dropped (optional)
- F1 root cause: the Themed View `absoluteFill` wind wrapper painting the theme background, with the MapKit-ignored sibling glyph overlay as a contributing cause. The fix is a transparent plain wrapper plus native Polyline arrows inside MapView (one path per arrow, halo plus stroke, 110 overlays at 55 arrows, 160 at the cap of 80), locked by the regression test
- F3 uses in-house NOAA math, with no dependency and no network
- No new dependencies, no network sources, and no keys or spend
- The UI worker changed no product code
- Lane's iOS Simulator list, not verifiable on web: Wind on Topo, Satellite, and Standard shows visible arrows with the map visible, including outside TX (pan and zoom re-grid the arrows); 20 toggles and a 2-minute soak with 20+ pins (watch for lag with 110-160 polylines); taps on the empty map and on pins land with Wind on; Reduce Motion keeps the arrows static, and the badge and legend show only while arrows are showing, clear of the sun chip; the full 6-step tour on SE and Pro Max plus replay, with the arrow tip on the target and step 1 inside the cutout, clear of the home indicator; sun times on every forecast row, and the Map chip is top-left, updates after a far pan, and doesn't drop a pin; Dynamic Island clearance, and Topo not blanking at zoom 16
- Merge order: Finley squash-merges this SoftwareFactory PR, then Origin #14 (mark it ready first if it's still a draft)
- Factory status is `accepted`
