# UI report

Origin UI pass (bc-1e742a3f) on merged Origin main `0c7a6729600bd6ba3196a12891c15edc16a236ff`. Beau approved merging Origin #25 before this UI check. That PR is merged. The check was carried into job 016 (item 4) and has now passed. This record replaces the skip note from the tested and secured pass.

- Product PR https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/25, branch `cursor/map-tab-freeze-hotfix-c958`, merged. Origin main is `0c7a6729600bd6ba3196a12891c15edc16a236ff`.
- The UI worker filed `docs/job-015-ui-report.md` on branch `cursor/nock-brand-forecast-glass-cbca` (Origin PR #26 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/26).

Screenshots were not committed to the product repo. They are in the UI agent's artifacts (`job-015-ui/`, bc-1e742a3f). Product code was not changed by the UI worker.

## What I opened

Expo web of commit `0c7a672` at 390×844, plus 375×667 and 430×932. Chrome headless, dark mode, `TZ=America/Chicago`. The host is Linux. There is no iOS Simulator.

## What worked

PASS on the Expo web walk. No high or medium issues.

- B1 and B7: one tap on Map showed the map 10/10 from Pins, Forecast, Scout, and You at 390×844, 375×667, and 430×932. The Map scene stayed at opacity 1 with `animation-name: none` and `transition-duration: 0s`. The other tabs still fade. No second tap was required.
- B3: 30 stress-cycle Map taps per size, 0 failures. Pan still moved a tile after each cycle.
- B2: pan, button zoom, and a pin tap to detail pass on web. Pinch is Lane's.
- B4: Wind, the property-lines controls, Topo, Satellite, Standard, and the popover open and close all return to the map. Parcel tiles are not drawn on web.
- B5: You and pin detail return to the map in one tap. Hunt detail was not opened.
- B6: a full reload returns to the map still signed in. Background is Lane's.
- C1: the sun-stack backing is 156×72 at y=60, opacity 1, after every recorded return. Liquid glass is Lane's.
- C2: `npx tsx --test src/ac015.test.ts src/ac014.h1.test.ts` — 11 pass, 0 fail.
- C3: the shooting-light popover passes. Duck during is green. Feral hogs are gray. Reopen works.
- D1 and D2: expo 57.0.26, expo-constants 57.0.20, expo-router 57.0.24. `npx expo-doctor` 21/21. The iOS Simulator launch is Lane's.
- The 008–014 spot check passed on web. Tour steps 2–8 were not fully walked.

## Screenshots

Named in the UI agent artifacts (`job-015-ui/`, bc-1e742a3f). Not committed to this repo or the product repo.

## Issues

No high or medium product issue in this web walk.

On web, a blurred Map stays `display: flex` at z-index −1 and does not detach. The departing tab fades under the opaque map. Parcel tiles, pinch, liquid glass, app background, and hunt detail were not shown. Two pin-detail return samples reported the sun stack at y=40 on the passing frame. Settled screens measure y=60.

## Gaps for Lane

Native-only items go to the iOS Simulator check of `0c7a672`. They are not product fails from this walk: detach, MapKit, pinch, the fade on top of the map, liquid glass, background and foreground, and the hunt-detail return. Lane's list is in `docs/job-015-ui-report.md` and `docs/job-015-build.md`.

## Result

Pass. One tap on Map shows the map on Expo web, including ten switches from Pins, Forecast, Scout, and You, and the stress cycles. Lane still runs the iOS Simulator check.
