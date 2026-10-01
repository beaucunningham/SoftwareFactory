# Accept

Job `021-nock-tworuler-fix-wind-inset` is accepted.

Brief: `FACTORY_BRIEF_021_nock-tworuler-fix-wind-inset.md`. AC: `AC_NOCK_TWORULER_FIX_WIND_INSET_v0.md`. Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Go: Beau via Finley, 2026-10-01 9:45am CT. Lane's Simulator PASS was at 11:21am CT on final main `bab84f5` (1h36 go to landed).

L4b and L6 are not in the v0 brief or AC. Beau added both mid-job via Finley.

Every final product pull request was squash-merged to main:

- #82 C L5 "Sample, not live" caption on the Forecast stubs → `8a484c6` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/82
- #84 A L1–L3 two-finger gesture fix (tap defer 150ms: a 90ms tap opens at 150ms and a 200ms tap at 200ms, both 250ms or less; root cause: MapView onPress committed a pin on the first finger's tap with no wait for a second finger; after placement only the last end had a hit target, and a stuck two-finger watch left scrollEnabled false) → `2636f2a` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/84. Replaces #80.
- #88 B L4 wind inset from chrome (static exclusion rects, no opacity animation), plus L4b (arrow grid covers 1.5x the viewport, rotation-aware, rebuilt 200ms after settle or when leaving the padding, capped at 80) → `dcd40a5` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/88. Replaces #81 and #85.
- #89 D L6 town and city search icon left of the account menu, using the existing expo-location (Apple) geocoder, with no new package or key (3-character minimum, 500ms debounce, at most 2 reverse geocodes per search, stale stop, in-memory cache, hidden on web, flies to zoom 13 keeping heading, and wind holes for the icon, field and results) → `bab84f57c7cf8061cec6a69b24a2a52e1d0d06bd` (final main) — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/89. Replaces #83, #86, and #87.

- Tested: one builder ran its own tests. At the final D head, `npm test` was 416 pass / 0 fail with TZ unset, UTC, and Pacific/Auckland. `tsc --noEmit` was clean on every PR. Merge-tree against main was clean at each handoff.
- Secured: Ari PASSED D on data/privacy. Only trimmed query text goes to Apple's geocoder on iOS and Google's on Android. No storage, logging, keys, hosts, or packages. Round 1 required a reverse-call cap, a stale stop, and a cache; all three are fixed. No privacy doc exists in the repo; recommend adding one later.
- UI-checked: Lane round 1 C PASS, A BOUNCE (4 must-fixes), B BOUNCE (per-rotate rebuild); round 2 A PASS, B BOUNCE (rotation sign), D BOUNCE (stale results under 3 characters); round 3 B PASS, D PASS; D #89 delta PASS. Simulator final gate on `bab84f5`: PASS at 11:21am CT. Rotation to about 90 degrees, the two-finger ruler, and its haptic are pending as phone checks with Beau.

Open low notes, not in this job:

- Beau's phone checks: rotation to about 90 degrees, the two-finger ruler, and its haptic.
- C nits: font cap, VoiceOver repeat, caption wording.
- A nits: gate tap cancel on isGesture, movePlacedDrag rAF plus final commit, a touch-sequence behaviour test.
- B nits: streamline double re-seed per settle, flat mapping at continental zoom.
- D nits: glass field, field width on 15 and Pro Max, .catch on the in-flight promise, a non-vacuous extent test, behaviour tests.
- No privacy doc exists in the repo. Recommend adding one later.

Factory status is `accepted`.
