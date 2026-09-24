# Build

Origin builder finished on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/12 (draft), branch `cursor/topo-wind-7day-8fb0`, base main `f43723f` (Job 009). No D2 split.

Product notes: `docs/job-010-build.md` in the hunting-companion repo.

- M1 Topo `a8b8dee` covers Standard | Satellite | Topo, USGS USGSTopo `UrlTile` with the {z}/{y}/{x} template, attribution 'USGS The National Map', and 'Topo is US-only' outside a rough US box. maximumZ and maximumNativeZ are capped at 16 and overzoom past that. The wind overlay is also rendered in this commit so it sits above the tiles.
- M2 Forecast `13071db` adds the 7-day stub list on top; the ranked 3-day cards are days 1-3 of the 7.
- M3 Wind checks + build notes `1a586a7` (tip) add the WindSource tests and `docs/job-010-build.md`.
- Wind is an 8x8 `WindSource` stub (u, v, speedMph, dirDeg) with 36 Skia particles. It pauses when Wind is off, when the app is backgrounded, or when Reduce Motion is on, and Reduce Motion shows static arrows. The canvas wrapper is pointerEvents none. Style and the Wind toggle are in-memory only.
- New dependency: `@shopify/react-native-skia` 2.6.2 (npx expo install).
- On web, the same USGS template is on the existing tile layer, and wind is static arrows (no CanvasKit).
- Token usage in `docs/job-010-build.md`
- `npx tsc --noEmit` clean
- Product `npm test` 229 pass / 0 fail
- Real iOS Simulator pass: Lane (Topo against the Apple legal label, zoom past 16, pan outside the US, Skia motion, background pause, Reduce Motion, and 20+ pins)
