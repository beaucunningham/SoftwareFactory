# Factory Brief 021: nock-tworuler-fix-wind-inset
Base: Origin main 2baf6c2 (Job 020 landed). Owner: Sage. Go: Beau via Finley, 2026-10-01 9:45am CT. Same new process as 020: one builder runs its own tests, status read from checks, Lane (UI) and Ari (data) diff review with PASS or bounce to the same builder, one SF status PR (commit these docs there), Lane Sim as the final gate, plus Beau's iPhone for L1–L3.
AC: AC_NOCK_TWORULER_FIX_WIND_INSET_v0.md

Beau (iPhone, Expo Go): "the two fingers doesnt work very well. half the time it thinks I am just tapping first and then it wont move after it does work. I also want that to work when measure distance isn't turned on."

## Items
L1. A two-finger hold never drops a pin. The root cause is likely that the single-tap or tap-to-pin recognizer fires on the first finger before the second arrives. Fix it in the gesture graph: the single tap must wait for the two-finger gesture to fail (requireExternalGestureToFail or an equivalent), with a short defer window of 120–180ms (tune and report the value). If a second finger lands while a pin draft or "Name this pin" popup is pending from the same touch sequence, cancel it with no saved pin and no flash. Normal single-tap pin drop must still feel instant enough: tap-to-popup in 250ms or less.

L2. Drag after placement is reliable. Trace the "won't move" state (likely the ruler gesture not releasing, or end-dot hit areas being lost after the two-finger create, or the map pan claiming the touch). After the ruler is placed:
  - one-finger drag on an end dot moves that endpoint (44pt hit target);
  - one-finger drag on the ruler line moves the whole ruler;
  - drag anywhere else pans the map.
  There must be no stuck state: every gesture end, cancel, or interrupt (call, app background, tab switch) resets the gesture state. Moving the fingers while still holding from creation keeps the 020 behavior (each finger drags its own endpoint).

L3. Two-finger long-press works whether Measure Distance is on or off. A ruler created with the toggle off behaves the same: draggable, with a clear (X) button that removes it. It does not switch on measure mode for one-finger taps. The toggle's existing behavior is unchanged.

L4. Wind arrows stay out of the chrome. Clip or inset the wind layer (arrows and streamlines) so nothing draws over the bottom-left credit lines (including "Sample wind, not live"), under the glass tab bar, or over map controls (sun stack, N, compass, locate-me, Map Tools, Log a hunt). Use exclusion insets from measured layout. An edge mask (static spatial gradient) is OK. No animated opacity, and no parent at opacity 0 (the 014/015 lessons). See the screenshots in /workspace/job020-sim/.

L5. Label stub mph in Forecast. Wherever Forecast shows wind mph (or any other stub value, such as temperature), show "Sample, not live" in a small secondary caption on that section. Text only. The full pre-TestFlight stub audit stays a separate backlog job.

## Device-testable path (the gesture can't be verified in the Simulator)
- Add a dev-only "Gesture debug" switch (__DEV__ only, under Map Tools). It shows a small text readout: touches, the active recognizer, ruler state, and the last cancel reason. It's hidden and absent in release builds.
- Write unit or integration tests for the gesture state machine: tap vs two-finger arbitration, cancel of a pending draft, drag after create, reset on cancel.
- The PR body includes the exact steps for Beau (also in the AC, section D).

## Do not regress
Everything 019 and 020 approved: N position, sun stack, parcels at all zooms, the wind arrow fallback and heading, no mph box on the Map, rotation and compass, the kept camera, the keyboard fix, tap-to-pin, CAD row, loading screen, and the 008 end-dot drag.

PR order: L1+L2+L3 (one gesture PR), L4, L5.
