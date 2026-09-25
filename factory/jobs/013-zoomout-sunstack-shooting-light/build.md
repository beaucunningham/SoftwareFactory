# Build

Origin builder `bc-a8e89237` finished in two draft Origin PRs on base main `244b0ba` (Job 012).

- G1 zoom-out fix, Origin PR #15: https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/15, branch `cursor/zoomout-root-cause-8f8a`, tip `f3b6ac7cb734554b00ce815f6c05903c3ed27944`.
  - Root cause: zoom-out had no native stop. The map set only the deprecated Apple Maps `maxZoomLevel` (the 011 Topo cap), and in react-native-maps 1.27.2 `cameraZoomRange` wins over the deprecated props. MapKit could open a world span and the 3D globe, and at that span the wind shaft length was uncapped: `22*|latDelta|*111320/height` is about 522 km at latDelta 180 on 844pt, so polylines streaked across the world.
  - Fix: one stable `cameraZoomRange` with a farthest camera of 7,000 km (`maxCenterCoordinateDistance` 7,000,000 m, about zoom 3.2-3.5) on every style, and a Topo closest camera of 3,200 m only while Topo is selected. A shared `cleanRegion` feeds wind, sun, and the saved map center. Wind stays at 80 arrows or fewer, with shaft length capped at 180 km.
- G2+G3, Origin PR #16: https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/16, branch `cursor/sun-stack-shooting-light-8f8a`, based on the G1 branch, tip `1524533f6d16cfc855ee10229ca554bb3180fb0f`.
  - The sun stack sits under Forecast and opens a shooting-light popover with a live countdown, a game selector (default Duck, persisted locally), and one hours config table including Sage's 2026-09-25 delta (squirrel added, 'No hour limit on private land', and the 'Advisory only. Check local regs and verify current TPWD regulations.' note).
- Tests: `npm test` 254 pass / 0 fail (244 existing plus 5 G1 and 5 G3) under the default zone, TZ=UTC, and TZ=Pacific/Auckland. `tsc --noEmit` clean. No new dependencies.
- Known lows: the 7,000 km stop and the 3,200 m Topo cap aren't device-tuned. Beau's exact symptom is pending. USGS z0-z3 tiles returned HTTP 200, so no blank tile was reproduced (`minimumZ` left unset). There's no dev clock override.
- Not verified by the builder, because the VM has no iOS Simulator: on-device zoom feel, the globe, and the popover on SE and Pro Max.
