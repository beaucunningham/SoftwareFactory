# Test report

Origin tester on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/11, branch `cursor/glass-scout-tours-d746`, base `b52e433`.

First pass at `cd1a1c5` failed: 2 of 224 tests. The Map Tools button was dead on iOS because the `MapToolsButton.tsx` wrapper kept `pointerEvents="none"`. Inactive tab icons had no halo (3.59:1 over white, 4.15:1 over sand). The tester added lock commit `41f1522`. The builder fixed both and also cleared the long-press latch in `onTouchStart`.

Re-check at tip `58b2a53b092e77975e68d344601a9e37aed94c40` passed.

## Commands

- `npm test` — 224 pass / 0 fail at `58b2a53b092e77975e68d344601a9e37aed94c40`
- `npx tsc --noEmit` — ok
- Expo web smoke, signed in: Map, Map Tools sheet, empty-map tap opens Name this pin, Scout tab. No crash

## Acceptance criteria

- C1 glass path is `GlassView` only when `isLiquidGlassAvailable()` and `isGlassEffectAPIAvailable()` both pass; otherwise ultra-thin dark blur. Residual tint alpha 0. The 008 `rgba(22,20,17,0.53)` scrim is gone. Label and icon halo is 5.33:1 over white and 6.17:1 over sand. Orange on the black capsule is 4.58:1
- C2 display name is Scout. No user-facing Guide string. Bar order is Map | Pins | Forecast | Scout
- C3 suggested prompts are gone. Empty state is one short line plus the composer
- C4 and C5 both tours are gated and replayable
- C6 stub reply sweep of 45+ prompts: every reply starts with a full sentence
- C7 empty-map tap is decided in the same turn and opens the new-pin draft
- Hygiene: the only new dependency is `expo-glass-effect`. No live weather, keys, accounts, or spend

## Result

Pass. 0 failures at `58b2a53b092e77975e68d344601a9e37aed94c40`.

C1–C7 match the brief on that tip. A Simulator pass goes to Lane.

## Gaps

- Non-blocking: the Scout header still shows the 008 subtitle line above the one-line empty state.
- Non-blocking, web only: a `textShadow` / `shadow` deprecation warning.
- Lane only: Liquid Glass on iOS 26, halo on real Satellite, Reduce Transparency, VoiceOver through the tours, Reduce Motion in a tour, 20 native taps, `onTouchStart` delivery, SE and Pro Max placement.
