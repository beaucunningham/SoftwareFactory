# AC: Job 022 nock-tworuler-device-p0 (v0)

## M1 Two-finger ruler on device (P0)
1.1 The PR states the root cause: which responder claimed the first touch, and evidence on whether the second pointer arrived.
1.2 Simultaneous landing: a ruler on 10/10 tries on Beau's iPhone, Measure on and off.
1.3 Staggered second finger (about 150–400ms later): a ruler on 9/10 tries or better, and no pin or popup appears.
1.4 While the ruler gesture is active, the map doesn't pan, zoom or rotate. Map interaction flags are restored after end, cancel or background (test).
1.5 Single tap still opens the pin popup in 250ms or less. One-finger pan, pinch and rotate are unchanged when no hold occurs.
1.6 State-machine tests cover simultaneous, staggered, a moving-too-much reject, cancel paths and flag restore.
1.7 If the stop rule fires, the PR reports the evidence and no partial gesture change ships.

## M2 Gesture debug
2.1 The readout shows a live pointer count, the winning recognizer, the last 6 transitions, the approach a/b/c, and map flags, legible in a phone screenshot.
2.2 Visible in Map Tools in __DEV__ for this job.
2.3 In a release/production build, no Gesture debug row, overlay or switch is reachable without the hidden dev unlock (test or config proof).

## M3 Status bar
3.1 After a pan, zoom, rotate or fly-to (Austin repro), no wind pixels sit in the status-bar or top safe-area rect (Sim screenshots, SE and Pro Max).

## M4 Pins over wind
4.1 With Wind on, every pin, the selected pin, the provisional pin and the ruler draw fully above the arrows or streamlines (Sim screenshot over a dense pin area).

## M5 Search width
5.1 The expanded field is at least 220pt on SE and at least 280pt on Pro, fills the space up to the options button, and close stays reachable (screenshots).

## D Device steps for Beau (Expo Go)
1. Map Tools, then Gesture debug ON. Leave it on.
2. Put two fingers down at once, about 2 inches apart, and hold still for 1 second. Expect a buzz and a ruler. The readout's pointer count should show 2.
3. Put one finger down, then add the second a beat later, and hold. Expect a ruler and no pin popup.
4. Repeat steps 2–3 five times each with Measure off, then with Measure on.
5. If any try fails, screenshot the readout right after. If it still fails, switch the Approach to b, then c, repeat, and screenshot.

## Regression
R1 019–021 approved behaviors are intact (Lane Sim pass). R2 All tests pass, with new tests per item.
