# Factory Brief 022: nock-tworuler-device-p0
Base: Origin main bab84f5 (Job 021 landed). Owner: Sage. Go: Beau via Finley, 2026-10-01 11:38am CT. Same process: one builder, own tests, Lane (UI) and Ari (data) diff review with PASS or bounce to the same builder, one SF status PR carrying these docs, Lane Sim gate, plus Beau's iPhone (Expo Go) as the real gate for M1.
AC: AC_NOCK_TWORULER_DEVICE_P0_v0.md

Beau (iPhone, Expo Go, after 021): "it looks like it isnt recognizing the second tap." This is the second miss on this feature, so attack the premise and don't layer another tweak on the 021 approach.

## M1 (P0). The two-finger hold reliably starts the ruler on a real device
It must work whether the second finger lands at the same time or a beat later (up to about 400ms after the first), with Measure Distance on or off.
Investigate first and report in the PR:
- Which responder claims the first touch: the native map's pan, long-press or tap (react-native-maps onPress/onLongPress, MKMapView's own recognizers), our tap-to-pin, or 021's tap deferral.
- Whether the second pointer ever reaches our gesture. Log raw pointer count from a touch-level observer.
- Gesture composition: is GestureHandlerRootView at the app root (Expo Go needs it)? Check Simultaneous/Race/Exclusive with the map, simultaneousWithExternalGesture, Gesture.Native() for the map, numberOfPointers/minPointers support on LongPress vs Pan, and whether the 1-finger long-press or tap activates first and blocks.
Build: prototype 2–3 approaches behind a dev switch in Gesture debug so Beau can flip between them on his phone if needed. Candidates:
  (a) a pointer-tracking Manual gesture that runs simultaneously with everything (always sees every pointer), with our own state machine: 2 pointers down, both still for 500ms or less movement-wise, then activate;
  (b) RNGH LongPress/Pan with a 2-pointer minimum, composed simultaneously with Gesture.Native() on the map;
  (c) a touch-event observer on a wrapper View (onTouchStart/Move/End, which doesn't steal the responder).
On activation, temporarily set map scroll, zoom, rotate and pitch to disabled, cancel any pending pin draft, and restore them on end or cancel (guaranteed in finally/cancel paths).
Ship the approach that works on device as the default, and keep the others behind the dev switch until Beau confirms.
STOP RULE: if no JS/RNGH approach can see the second pointer in Expo Go, stop and report. A native module or dev build is a product decision (Expo Go testing changes). Do not ship a silent half-fix.

## M2. Gesture debug, device-verifiable
The readout shows: live raw pointer count (from the touch-level observer, not the winning recognizer), the recognizer that won, the last 6 state transitions with names and timestamps, the active approach (a/b/c), and the map interaction flags. It's large enough to read in a screenshot.
Gate: it stays visible in Map Tools for this job (__DEV__). Before TestFlight it must sit behind a dev-only gate. Release builds contain no Gesture debug row or overlay; it's only reachable via a hidden dev unlock. Implement the gate now so release is already clean (AC 2.3).

## M3. Wind arrows clear the status bar after a re-sample
The top safe-area and status-bar exclusion is applied on every regeneration (pan, zoom, rotate, fly-to). No arrow beside the clock (see /workspace/job021-sim/17-austin-flown.png).

## M4. Pins sit above wind
Pins (and the ruler, the selected pin, the provisional pin) render above the wind layer, or the arrows avoid pin rects. Either way, pins are fully legible with Wind on.

## M5. Wider town search field
The expanded place-search field fills the available top-bar width, between the safe-area margins and the options button minus spacing. It's at least 220pt on iPhone SE and at least 280pt on iPhone Pro. It isn't clipped, and the cancel/close control stays reachable.

## Do not regress
Everything from 019–021: no pin on a two-finger hold (L1), drag after placement (L2), the ruler with Measure off (L3), wind insets around credits, tab bar and controls (L4/L4b), the Forecast sample caption (L5), place search flying the map (L6), the N position, sun stack, parcels at all zooms, rotation and compass, the kept camera, tap-to-pin speed of 250ms or less.

PR order: M1+M2 (gesture), then M3+M4 (wind), then M5.
