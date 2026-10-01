# Build

Brief: `FACTORY_BRIEF_021_nock-tworuler-fix-wind-inset.md`. AC: `AC_NOCK_TWORULER_FIX_WIND_INSET_v0.md`. Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Go: Beau via Finley, 2026-10-01 9:45am CT. Lane's Simulator PASS was at 11:21am CT on final main `bab84f5` (1h36 go to landed).

One builder ran the items and its own tests. L4b and L6 are not in the v0 brief or AC. Beau added both mid-job via Finley. Every final product pull request was squash-merged to main. Replaced pull requests were re-cuts onto a newer main. No force-push or rebase.

Base was main `2baf6c2` (Job 020). Final main is `bab84f57c7cf8061cec6a69b24a2a52e1d0d06bd`.

| Milestone | Origin PR | Main |
| --- | --- | --- |
| C. L5 "Sample, not live" caption on the Forecast stubs. | https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/82 | `8a484c6` |
| A. L1–L3 two-finger gesture fix. Tap defer is 150ms: a 90ms tap opens at 150ms and a 200ms tap at 200ms, both 250ms or less. Root cause: MapView onPress committed a pin on the first finger's tap with no wait for a second finger; after placement only the last end had a hit target, and a stuck two-finger watch left scrollEnabled false. Replaces #80. | https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/84 | `2636f2a` |
| B. L4 wind inset from chrome (static exclusion rects, no opacity animation), plus L4b (Beau via Finley, mid-job; not in the v0 brief or AC): the arrow grid covers 1.5x the viewport, rotation-aware, rebuilt 200ms after settle or when leaving the padding, capped at 80. Replaces #81 and #85. | https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/88 | `dcd40a5` |
| D. L6 (Beau via Finley, mid-job; not in the v0 brief or AC): a town and city search icon left of the account menu, using the existing expo-location (Apple) geocoder, with no new package or key. 3-character minimum, 500ms debounce, at most 2 reverse geocodes per search, stale stop, in-memory cache, hidden on web, flies to zoom 13 keeping heading, and wind holes for the icon, field and results. Replaces #83, #86, and #87. | https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/89 | `bab84f57c7cf8061cec6a69b24a2a52e1d0d06bd` |

Final main is `bab84f57c7cf8061cec6a69b24a2a52e1d0d06bd` (#89).

10 Origin pull requests were opened (#80–#89). 4 were merged (#82, #84, #88, #89). 6 were replaced by re-cuts onto a newer main (#80, #81, #83, #85, #86, #87).
