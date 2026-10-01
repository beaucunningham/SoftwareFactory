# AC: Job 021 nock-tworuler-fix-wind-inset (v0)

## L1 No tap on two-finger hold
1.1 Second finger within the defer window: no pin, no "Name this pin" popup, no flash (test plus Beau device).
1.2 If a draft was already shown from this touch sequence, it's cancelled with nothing saved (test).
1.3 A plain single tap still opens the pin popup in 250ms or less (measured; value in PR).
1.4 The PR names the root cause with a trace of the recognizer relationships.

## L2 Drag after placement
2.1 End-dot drag moves that endpoint, the line drag moves the whole ruler, and a drag elsewhere pans (test plus device).
2.2 After 20 alternating create/drag/pan cycles there's no stuck state (test).
2.3 Interrupts (background, tab switch, gesture cancel) reset the state. The next gesture works first try (test).
2.4 The distance label updates live and matches haversine to within 1%.

## L3 Toggle-independent
3.1 With Measure Distance OFF, a two-finger hold creates a ruler that drags and clears with X. One-finger taps still drop pins.
3.2 With it ON, behavior is unchanged from 020 plus the L1/L2 fixes.

## L4 Wind clear of chrome
4.1 With Wind on (arrows and streamlines), no wind pixels sit inside the credit-line, tab-bar or control rects (Sim screenshots on SE and Pro Max, rotated and unrotated).
4.2 The insets come from measured layout. No animated opacity and no opacity-0 parent (grep or trace).
4.3 "Sample wind, not live" is fully legible.

## L5 Forecast stub label
5.1 Every Forecast section showing stub values has a "Sample, not live" caption. Values are unchanged.

## D Device steps for Beau (Expo Go)
1. Measure Distance OFF. Put two fingers on the map at once, about 2 inches apart, and hold still for 1 second. Expect a buzz and a ruler, and no pin popup.
2. Put one finger down, then add the second about a quarter second later, and hold. Expect a ruler and no pin.
3. Drag one end dot: that end moves. Drag the middle of the line: the whole ruler moves. Drag empty map: the map pans.
4. Tap X to clear it. Single-tap the map: the normal pin popup appears quickly.
5. Turn Measure Distance ON and repeat steps 1 and 3.
6. If anything misbehaves, turn on Map Tools, then Gesture debug, repeat, and screenshot the readout.

## Regression
R1 019/020 approved behaviors are intact (Lane Sim pass). R2 All tests pass, with new tests per item.
