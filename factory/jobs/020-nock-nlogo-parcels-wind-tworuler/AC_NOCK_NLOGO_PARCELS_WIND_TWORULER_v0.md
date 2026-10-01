# AC: Job 020 nock-nlogo-parcels-wind-tworuler (v0)

## K1 N logo
1.1 The N mark's vertical center is within 1pt of the sun stack's vertical center, on iPhone SE, 15, 15 Pro Max (Sim screenshots).
1.2 Its horizontal center is within 1pt of the screen center. It doesn't overlap the sun stack or the Dynamic Island at Dynamic Type sizes up to and including xxxLarge.
1.3 The position comes from measured layout. The trace shows no hard-coded top offset.

## K2 Property lines
2.1 With Property lines on, lines are visible at every zoom from the floor to the map max. No blank tiles at max zoom in Dallas or Llano (screenshots at max, max-1, max-2).
2.2 The floor is the deepest server-served zoom (expected z11). The PR states the measured floor and why.
2.3 z11 full-screen load in Dallas is under 4s on Linux measurement (019 z12 was 2.2–2.7s). The PR reports it.
2.4 Underzoom (z9–10) ships only if per-screen tile requests are 64 or fewer, load is under 6s, memory is stable over 5 pan cycles, and the screenshots are legible. Otherwise the hint shows below the floor, and the PR includes the measured numbers plus a recommendation for Finley.
2.5 No identify/query calls (grep proof), no owner fields, transparent=true kept, coverage bar per the 019 amendment (pixels with alpha >= 100 under 10%).
2.6 Hint copy: "Zoom in to see property lines". It shows only below the effective floor.

## K3 Wind
3.1 The PR names the root cause of the blank overlay, with a code trace.
3.2 With Wind on, something visible always renders: streamlines or arrows. If no streamline frame draws within 1s or init throws, it falls back to arrows automatically. A unit test covers the fallback.
3.3 The default renderer is 'streamlines' only if Lane confirms frames on the Sim AND Beau confirms them on his iPhone in Expo Go. Otherwise the default is 'arrows'.
3.4 At map heading 90°, a wind-from-north field still shows flow toward true south on screen, for both renderers (test plus Sim).
3.5 Panning and zooming stay smooth with Wind on. Particles pause during gestures (as in 019). Reduce Motion means arrows.

## K4 Two-finger ruler
4.1 Two fingers held still for 500ms create a ruler between the touch points, with a haptic. On the Sim, use Option-drag and hold.
4.2 Fingers within 24pt start a zero-length ruler that grows as they spread.
4.3 While the fingers are held, the endpoints follow them and the distance updates live. After lifting, the ruler stays and end-dot drag still works.
4.4 Two-finger motion over 10pt before 500ms pinches or rotates as today. No ruler appears.
4.5 After the ruler claims the touches, the map camera doesn't change (heading, zoom and center all the same before and after).
4.6 A new two-finger ruler replaces the old one. It works with the map rotated, and the distance is correct to within 1% of the haversine distance in a test.

## Regression
R1 Every 019 behavior Beau approved still works (see the brief's list), shown on Lane's Sim pass.
R2 All tests pass, with new tests for K2 zoom config, K3 fallback and heading, and K4 gesture state.

## K5 Wind mph popup removed (delta 3:41am)
5.1 With Wind on, no mph box or popup appears anywhere on the Map (Sim screenshot with Wind on and off).
5.2 The component is unmounted or deleted, not set to opacity 0 (trace or grep). The sun stack and N position (K1) are identical with Wind on and off.
5.3 Forecast tab wind mph is still present and unchanged.
