# Test report

Origin tester (bc-0d0d9753) on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/12, branch `cursor/topo-wind-7day-8fb0`, base `f43723f`.

First pass at `1a586a7` failed. After tester test commit `fdabcbe`, `npm test` was 230 pass / 0 fail, but WindOverlay particles used the nearest grid cell instead of `interpolateWind`. Low: Attu, AK (52.85N, 173.18E) fell outside the US topo box.

The builder fixed both at `19d1a67`: each frame calls `stepParticles` / `interpolateWind` at the particle position, and a lat 50–56, lng 172–180 slice covers Attu.

Re-check at `19d1a67` passed, with tester lock commit `e33c556` (tests only). Final product tip is `e33c5566c1485870ebb3dd0f1ee5d3432fb1cd3c`.

## Commands

- `npm test` — 230 pass / 0 fail at `e33c5566c1485870ebb3dd0f1ee5d3432fb1cd3c`
- `npx tsc --noEmit` — ok
- Web smoke test — clean

## Acceptance criteria

- D1 style order is Standard | Satellite | Topo. Topo uses the exact USGS URL, HTTPS, no key, maxZ 16
- Topo-only attribution is `USGS The National Map`, 4.5:1 or better, clear of the bar, Map Tools, zoom, and the legal label on SE and Pro Max
- Overlays render above the tiles. The US box keeps TX, AK, HI, and PR, and flags London and Tokyo. The Attu slice (lat 50–56, lng 172–180) covers 52.85N, 173.18E
- D3: the 7-day stub is deterministic and on top. The 3-day matches days 1–3 with the 005 ranking kept. The Sample forecast note stays. The Map Forecast route works
- D2: the WindSource stub has an 8×8 grid and 36 particles. Each frame calls `stepParticles` / `interpolateWind` at the particle position. Pause rules and cleanup work. Reduce Motion shows static arrows. `pointerEvents` is none
- The 009 tap path is kept
- Hygiene: the only new direct dependency is `@shopify/react-native-skia` 2.6.2. No D2 split

## Result

Pass. 0 failures at `e33c5566c1485870ebb3dd0f1ee5d3432fb1cd3c`.

D1–D3 match the brief on that tip. A Simulator pass goes to Lane.

## Gaps

- Non-blocking: style and Wind are memory-only.
- Non-blocking, web only: web draws 64 static arrows instead of 36 particles.
- Non-blocking: the native US-only line waits for the first settled region.
- Lane only: UrlTile sends only z/y/x, Skia adds no native gesture recognizer, background pause, Reduce Motion, and the prebuilt Info.plist. Only a real iOS build can confirm those.
