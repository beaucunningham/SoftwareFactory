# UI report

Origin UI pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/11, branch `cursor/glass-scout-tours-d746` (docs tip `57b0bf7`, product tip `b5493da`, base `b52e433`).

The UI worker filed a docs-only report on that same branch: `docs/job-009-ui-report.md` at docs commit `57b0bf7`. Screenshots were not committed to the product repo. They are in the UI agent's artifacts at https://cursor.com/agents/bc-372a5779-4acb-58cc-ae8b-c84f79dec5a9 (`/opt/cursor/artifacts/job-009-ui/`, `01-sign-in` through `30-show-on-map`). Product code was not changed by the UI worker.

## What I opened

Expo web at 390×844 with a light system scheme, plus resize checks at 375×667 and 430×932.

Screens were checked at product `cd1a1c5`. The later product commit `b5493da` is the tip: it removes the leftover 008 header lead from the empty Scout chat. The docs report is `57b0bf7`. Tester locks are `41f1522`. Map Tools hit and icon halo fixes are `58b2a53`.

## What worked

All 7 sweep steps passed. No High or Medium findings.

- Web uses the blur fallback, not Liquid Glass. The bar is transparent with only the blur material `rgba(37,37,37,0.55)`. The 008 `rgba(22,20,17,0.53)` scrim is gone. Labels are white with a 0.58 halo. Active is orange on a black capsule. The hairline is kept.
- The bar reads Map | Pins | Forecast | Scout. There is no user-facing Guide and no suggested prompts.
- Map Tools is a 48px circle, 14px from the right and 12px above the bar at all three sizes, clear of Forecast, zoom, and attribution.
- The app tour runs after sign-in with 5 cards, Skip/Next/Done, and dots. It does not reappear on reload, it replays from You, and it respects reduced motion.
- The Scout Example walkthrough has a SAMPLE badge. Try it focuses the composer. Nothing is saved to history.
- 20 stub replies all start with a full sentence.
- Tap-to-pin was 20/20.
- The 005–008 spot-check passed.

## Screenshots

Named in the UI agent artifacts at https://cursor.com/agents/bc-372a5779-4acb-58cc-ae8b-c84f79dec5a9. Not committed to this repo or the product repo. Files `01-sign-in` through `30-show-on-map`.

- [01-sign-in](https://cursor.com/agents/bc-372a5779-4acb-58cc-ae8b-c84f79dec5a9)
- [30-show-on-map](https://cursor.com/agents/bc-372a5779-4acb-58cc-ae8b-c84f79dec5a9)

## Issues

One Low, fixed in-job. The empty Scout chat still showed the 008 header lead. The builder fixed it at the final product tip `b5493da`. The sweep itself was PASS 7/7 at `cd1a1c5`. The tip is 224/224 with a clean typecheck.

Lows, documented and not blocking:

- Web `textShadow` / `shadow` deprecation warning.
- Web Standard is still OSM with extra web zoom buttons.

## Gaps for Lane

Lane owns the iOS Simulator sweep after merge:

- Liquid Glass on iOS 26 beside an 008 shot over bright Satellite and dark Standard.
- The halo on real Satellite.
- Reduce Transparency solid `#161411`.
- VoiceOver through both tours.
- Reduce Motion during a tour.
- 20 native empty-map taps after pan, zoom, sheet close, and measure Done.
- Press-and-hold does nothing.
- Map Tools button tap on device.
- SE and Pro Max placement beside zoom and the Apple legal label.
- The Scout empty state.
- A stub reply starting with a full sentence.

## Result

Pass. A person can finish the see-through glass bar, the Scout rename, both tours, full-sentence stub replies, and tap-to-pin on Expo web. Lane still owns iOS Simulator sign-off.
