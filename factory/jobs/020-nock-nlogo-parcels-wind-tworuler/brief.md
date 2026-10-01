# Factory Brief 020: nock-nlogo-parcels-wind-tworuler
Base: Origin main def4496 (Job 019 landed). Owner: Sage (Product). Go: Beau via Finley, 2026-10-01 3:38am CT.
AC: AC_NOCK_NLOGO_PARCELS_WIND_TWORULER_v0.md

## Process (first job on the new flow)
- One builder cloud agent does every item and runs its own tests. Status comes from the tools (checks), not from self-reporting.
- Diff review: Lane covers mobile/UI (K1, K3 render, K4) and Ari covers data (K2 tiles/sources, K3 data/heading). Each gives PASS or bounce. A bounce goes back to the SAME builder.
- One SoftwareFactory status PR tracks the job. The final gate is Lane's Simulator run, plus Beau's iPhone in Expo Go for K3.
- Builders run on Linux without the Simulator, so every item needs a deep code trace plus exact Simulator steps in the PR body.

## Items
K1. N logo position. Center the N mark vertically on the sun stack (sunrise/sunset), horizontally at the screen's true center. Derive it from the measured layout (onLayout of the sun stack plus safe area), not a magic number. It must hold on every iPhone size and with Dynamic Type sizes up to and including xxxLarge.

K2. Property lines at all zooms (feasibility first, then build).
  a) Deep zoom-in: lines must never vanish. Trace the cause (likely WMSTile maximumZ/maxNativeZ or a tile-cache cap) and fix it so lines render at every zoom up to the map max. Either request WMS natively at any zoom (WMS renders any scale) or overzoom from the highest good level. No blank.
  b) Zoom-out: the server's minScale of 1:500k means TxGIO returns nothing below about z11. 019 floors at z12. Lower the floor to the deepest level the server serves (expected z11), within the 019 perf budget.
  c) Below the server floor: spike 'underzoom' (draw z11 tiles scaled down at z9–10) with a hard request cap and measured cost. Report tile count per screen, load time (Dallas and Llano), memory, and legibility (screenshots). Ship it only if it meets the AC perf bars and the lines are legible. Otherwise keep the 'Zoom in to see property lines' hint. STOP RULE: do not add a paid or self-hosted vector tile source, pre-generalized data, or any new provider without a product decision. Report it as an option instead.
  Keep every 9/30 rule: no identify/query calls, no owner data. Keep transparent=true, the 019 style (width 0.25, alpha 140), and the J5 attribution.

K3. Wind filter shows nothing on a real iPhone in Expo Go (P0 bug).
  - Reproduce it and find the root cause (Skia canvas size 0, a worklet or Reanimated failure in Expo Go, a missing stub wind field for the region, an overlay mounted behind the map, an opacity-0 parent, etc.). Fix the cause, not the symptom.
  - The wind overlay must NEVER be blank while Wind is on. If the streamline renderer fails to init or draws no frames within 1s, auto-fall back to arrows (WIND_RENDERER 'arrows', AC 7.9) and log the reason in dev.
  - Ship streamlines as the default only if they're verified on device (Expo Go on iPhone), via Lane's Sim pass plus Beau's phone. Otherwise the default is 'arrows' and streamlines stay behind the flag.
  - Parked J7 follow-up: tie streamlines AND arrows to map heading (J9 rotation), so wind direction stays true-north correct when the map is rotated.

K4. Two-finger long-press ruler (addition).
  - Hold two fingers on the map, still (each moving under 10pt), for 500ms. That creates a ruler between the two touch points, with a light haptic. If both fingers are within about 24pt (one spot), the ruler starts at zero length and grows as the fingers spread.
  - While the fingers are still down, each finger drags its own endpoint and the distance label updates live. Lifting leaves the ruler placed, editable with the existing 008 end-dot drag (D1) and cleared the existing way.
  - It replaces any current ruler (only one at a time). It works while rotated (J9).
  - Conflicts: two-finger movement before 500ms stays pinch/rotate (J9) as today, and one-finger long-press/tap behavior is unchanged. Once the ruler gesture claims the touches, the map must not pan, zoom or rotate.
  - Units and label match the existing ruler.

## Do not regress (Beau: looked good in 019)
Sunrise/sunset pill and stack (J1/J2), locate-me tracking, the property-line watermark fix (J5), rotation and compass (J9), keeping the camera (J10), the keyboard fix (J8), tap-to-pin, the CAD row, the loading screen (J4), and the 014 H1/015 lessons (no fade, no parent at opacity 0).

## PR plan
One builder with stacked PRs: K1, then K3, then K2, then K4. K3 goes early because it's a P0 device bug. K2 opens with the feasibility report in the PR body.

## Delta 2026-10-01 3:41am (Beau via Finley)
K5. Remove the wind mph popup. With Wind on, the box that appears top-left showing wind mph is removed entirely (unmount it, don't hide it, with no leftover spacing or layout shift in the sun stack area). Wind speed lives in the Forecast tab only. Forecast mph is unchanged. This rides in the K3 PR.
Scope note: onX import stays OUT of 020 (backlog). K2 plan confirmed by Beau: no paid or self-hosted source.

## Product repository

https://cursor.com/codebase/beau-cunningham/hunting-companion

## User-facing UI

Map: N mark, property lines, wind overlay, and the two-finger ruler. Forecast tab wind mph stays.

## Payments and auth

None.

## Out of scope

onX import stays out of 020. No paid or self-hosted vector tile source.

## Acceptance criteria

Full checks are in `AC_NOCK_NLOGO_PARCELS_WIND_TWORULER_v0.md` in this folder.

- [ ] K1. N mark centered on the sun stack from measured layout
- [ ] K2. Property lines from the floor through map max; underzoom only if the perf bars pass
- [ ] K3. Wind overlay is never blank; arrows are the default unless streamlines are confirmed on device
- [ ] K4. Two-finger long-press ruler
- [ ] K5. Wind mph popup is removed from the Map; Forecast mph is unchanged
- [ ] Regression. 019 behavior still works, and the new tests pass
