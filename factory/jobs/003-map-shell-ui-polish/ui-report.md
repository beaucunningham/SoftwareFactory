# UI report

Origin UI pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/4, branch `cursor/map-shell-ui-polish-c442`.

Product code was not changed by the UI worker.

## What I opened

Expo web at 390×844. Stub Apple sign-in and onboarding.

## What worked

- Sign-in and onboarding land on Map home. Guide is not home.
- Tabs are Map | Logs | Guide | You. The active tab uses burnt orange.
- Map opens on Satellite (hybrid) by default.
- One pill toggles Standard ↔ Satellite.
- Product floating controls stay at two: the style pill and New spot.
- Pins are clean orange dots.
- New spot saves lat/lng. Tapping a pin opens spot detail.
- Logs, Guide, You, and auth use quiet chrome.
- Job 002 weather stays null-safe: `Weather · stub` and `Weather unavailable`.

## Gaps for Lane

- No iOS Simulator on the UI host. Apple Maps hybrid and pinch zoom were not seen.
- Web +/- zoom buttons are web-only. Native does not render them.

## Result

Pass. A person can finish the map-shell path on Expo web. Lane still owns iOS Simulator sign-off.
