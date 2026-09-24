# Test report

Origin tester on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/13, branch `cursor/sim-fixes-coachmarks-ade4`, base `6a94bc3`.

First pass at `2af7118` failed on two issues. Open chat called `looksLikeGuidedLog`, so "saw 3 doves" and "3 ducks" started a guided log with a chip row. `CoachMarkTour` called `findNodeHandle`, which crashed web.

The builder fixed both in `c6fa99c` and `560e6d9`. A log starts only from "Log a hunt", a forced intent, or the Log with Scout route, and `GUIDE_STARTER_PROMPTS` is removed. `findNodeHandle` is skipped on web. The same fixes cover web wind tiles and arrows (rotated to wind direction), the web map tour target, the web Topo-only zoom-16 cap, and the Scout card fade at 150ms.

Re-check at `560e6d9` passed. Final product tip is `560e6d9b2b1b5f61d2e3d3cd68cd968a76f66bea`.

## Commands

- `npm test` — 237 pass / 0 fail at `560e6d9b2b1b5f61d2e3d3cd68cd968a76f66bea`
- `npx tsc --noEmit` — ok
- Web smoke at 390×844 — no page error

## Acceptance criteria

- E1 ships the arrow fallback (`USE_SKIA_WIND=false`). Root cause: the Skia canvas lacked `opaque={false}`, and its `requestAnimationFrame` loop ran on the JS thread. Wind on all 3 styles works on web, with tiles visible and arrows rotated to wind direction
- E2 is Topo-only `maxZoomLevel` 16. UrlTile uses `maximumNativeZ` 16, `maximumZ` 20, and `shouldReplaceMapContent`. The web zoom-16 cap applies only while Topo is selected
- E3 is a 2pt `#D8D8D8` line under the selected tab
- E4: literal sends ("saw 3 doves", "3 ducks") produce no chips. "Log a hunt" shows step chips that clear on cancel and save. `GUIDE_STARTER_PROMPTS` is removed
- E5: the web tour runs all 6 steps plus Skip and replay. The Scout tutorial does not start during step 5. The web map tour target is hit. `findNodeHandle` is skipped on web
- E6: the Scout card fades at 150ms
- E7: the four Expo patch bumps are in. E1–E7 pass in code on this tip

## Result

Pass. 0 failures at `560e6d9b2b1b5f61d2e3d3cd68cd968a76f66bea`.

E1–E7 match the brief on that tip. A Simulator pass goes to Lane.

## Gaps

- Non-blocking, web only: at 390×844 the step-1 Skip box extends past the viewport bottom. Being fixed now.
- Lane only: 20 Wind toggles and a 2-minute pan, Topo zoom at four TX spots, coach-mark alignment on SE and Pro Max, VoiceOver, Reduce Motion, and a clean Simulator build after the patch bumps.
