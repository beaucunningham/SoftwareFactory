# Build

Origin builder finished on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/14 (draft), branch `cursor/wind-coach-sun-d426`, base main `ca6afd1` (Job 011). One PR. F4a and F4b were dropped.

Product notes: `docs/job-012-build.md` in the hunting-companion repo.

- F1 `5bb4bb7`: root cause: at `ca6afd1`, `WindOverlay` sat beside `MapView` and drew rotated `↑` text nodes. MapKit (react-native-maps 1.27.2) never treats that sibling as map content, so the Sample wind badge could show with no arrows. The stub already returned a finite breeze outside TX (including Cupertino), so the drawing path was the gap. Shipped native `Polyline` arrows inside `MapView` (a shaft plus two barbs, not tappable). The sibling overlay no longer paints. Web keeps static glyphs from the same grid. Density is about 75pt: 45 arrows on SE, 55 at 390x844, 72 on Pro Max, capped at 80.
- F2 `fac2587`: coach-mark arrows come from one pure placement function using the measured target rect.
- F3 `a30986a`: in-house NOAA sunrise and sunset on the 7-day and 3-day rows and a top-left Map chip, in phone local time.
- Notes `2536a18` (tip): `docs/job-012-build.md`, including token usage.
- Product `npm test` 243 pass / 0 fail (237 existing plus 6 new). `tsc --noEmit` clean. No new dependencies.
- Known lows: a pre-existing web `backgroundImage` type error is silenced with a `ViewStyle` cast. Beau's exact symptom is still pending; the code predicts a badge with no arrows over a map that stays up.
- Not verified by the builder, because the VM has no iOS Simulator (this goes to Lane's Simulator pass): the 20-toggle run, the 2-minute soak, and the tour on SE and Pro Max.
