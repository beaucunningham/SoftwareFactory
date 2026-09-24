# UI report

Origin UI pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/5, branch `cursor/map-system-d2fb` (~`1b4005a`).

The UI worker also filed a docs-only report at https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/6 (`docs/job-004-ui-report.md`).

Product code was not changed by the UI worker.

## What I opened

Expo web at 390×844. Stub Apple sign-in and onboarding.

## What worked

- Sign-in and onboarding land on Map home. Guide is not home.
- Tabs are Map | Logs | Guide | You.
- Map opens on a live map surface.
- Satellite (hybrid) is the default.
- One pill toggles Standard ↔ Satellite.
- Product floating controls stay at two: the style pill and New spot.
- Empty state is calm.
- Tap empty map opens a provisional name sheet.
- Cancel clears the provisional pin.
- Save keeps the pin.
- Tap a pin opens detail and does not start a second create.
- A second spot leaves both pins findable.
- Pan, zoom, and the style toggle still work.

## Gaps for Lane

- No iOS Simulator on the UI host. Apple Maps hybrid and native tap timing were not seen.
- Web +/- zoom buttons are web-only.
- Archive, hunt pick-spot, and the weather line were not walked this pass.

## Result

Pass. A person can finish tap-to-pin and spots-on-map on Expo web. Lane still owns iOS Simulator sign-off.
