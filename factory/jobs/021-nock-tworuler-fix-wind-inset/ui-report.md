# UI report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Final main `bab84f57c7cf8061cec6a69b24a2a52e1d0d06bd` (Origin #89, short `bab84f5`).

Lane (mobile/UI reviewer) reviewed the diff, then ran the Simulator final gate on `bab84f5`: PASS at 11:21am CT on 2026-10-01.

- Round 1: C PASS, A BOUNCE (4 must-fixes), B BOUNCE (per-rotate rebuild).
- Round 2: A PASS, B BOUNCE (rotation sign), D BOUNCE (stale results under 3 characters).
- Round 3: B PASS, D PASS.
- D #89 delta: PASS.

This report is markdown only. No screenshots.

## What landed

- C. L5. "Sample, not live" caption on the Forecast stubs (Origin #82, `8a484c6`).
- A. L1–L3. Two-finger gesture fix. Tap defer is 150ms: a 90ms tap opens at 150ms and a 200ms tap at 200ms, both 250ms or less. Root cause: MapView onPress committed a pin on the first finger's tap with no wait for a second finger; after placement only the last end had a hit target, and a stuck two-finger watch left scrollEnabled false (Origin #84, `2636f2a`). Replaces #80.
- B. L4 wind inset from chrome (static exclusion rects, no opacity animation), plus L4b (Beau via Finley, mid-job; not in the v0 brief or AC): the arrow grid covers 1.5x the viewport, rotation-aware, rebuilt 200ms after settle or when leaving the padding, capped at 80 (Origin #88, `dcd40a5`). Replaces #81 and #85.
- D. L6 (Beau via Finley, mid-job; not in the v0 brief or AC): a town and city search icon left of the account menu, using the existing expo-location (Apple) geocoder, with no new package or key. 3-character minimum, 500ms debounce, at most 2 reverse geocodes per search, stale stop, in-memory cache, hidden on web, flies to zoom 13 keeping heading, and wind holes for the icon, field and results (Origin #89, `bab84f57c7cf8061cec6a69b24a2a52e1d0d06bd`). Replaces #83, #86, and #87.

## Open notes

- Not testable in the Simulator, pending as phone checks with Beau: rotation to about 90 degrees, the two-finger ruler, and its haptic.
- C nits: font cap, VoiceOver repeat, caption wording.
- A nits: gate tap cancel on isGesture, movePlacedDrag rAF plus final commit, a touch-sequence behaviour test.
- B nits: streamline double re-seed per settle, flat mapping at continental zoom.
- D nits: glass field, field width on 15 and Pro Max, .catch on the in-flight promise, a non-vacuous extent test, behaviour tests.

## Result

PASS. Lane passed C on round 1, A on round 2, and B and D on round 3, plus the D #89 delta. Simulator final gate on `bab84f5` passed at 11:21am CT. Rotation to about 90 degrees, the two-finger ruler, and its haptic are pending as phone checks with Beau.
