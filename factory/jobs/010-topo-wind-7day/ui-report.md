# UI report

Origin UI pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/12, branch `cursor/topo-wind-7day-8fb0` (docs tip `e54ebd6`, product tip `db8d1f1`, base `f43723f`).

The UI worker filed a docs-only report on that same branch: `docs/job-010-ui-report.md` at docs commit `e54ebd6`. Screenshots were not committed to the product repo. They are in the UI agent's artifacts (bc-391e5de4). Product code was not changed by the UI worker.

## What I opened

Expo web at 390×844 with a light system scheme, plus resize checks at 375×667 and 430×932.

Screens were checked at product `1a586a7`. On web, wind is static arrows and the bar is the blur fallback, not Liquid Glass. The later product commit `db8d1f1` is the tip: it clears the leftover lead from the empty Scout chat. The docs report is `e54ebd6`. Tester re-check is `19d1a67`, plus lock `e33c556`.

## What worked

All 5 sweep steps passed. No High or Medium findings.

- Step 1 Topo: USGS tiles loaded over Rockwall. The 'USGS The National Map' pill is readable and sits 12px from Map Tools at all widths. A pin and its popup sit above the tiles, and the ruler works on Topo with an end-dot drag. Zoom caps at 16 with no blank tiles or crash. 'Topo is US-only' appears south of the US and clears on return, and Standard and Satellite drop the pill.
- Step 2 Wind: calm arrows on all three styles. The Sample wind badge and the 4/10/16 mph legend are clear of the bar, Map Tools, and the pill. The arrows re-sample after pan and zoom, and empty-map taps went 10/10 with Wind on. Reduced motion keeps them static, Wind off removes the overlay, and 21 pins were OK.
- Step 3 Forecast: the 7-day list is above the 3-day, the 3-day matches days 1–3, the Sample forecast note is there, and the Map Forecast button opens it.
- Step 4: sizes OK.
- Step 5: 005–009 spot checks OK.

## Screenshots

Named in the UI agent artifacts (bc-391e5de4). Not committed to this repo or the product repo.

## Issues

One Low, fixed in-job. The empty Scout chat showed the 'I cite hunts and pins' lead, against 009 C3. The builder fixed it at the final product tip `db8d1f1`. The empty chat now shows one line plus the composer, the lead returns after the first message, and the pin-scoped chat keeps its lead. 230/230 with a clean typecheck. The sweep itself was PASS 5/5 at `1a586a7`.

Lows, documented and not blocking:

- Style and Wind are memory-only.
- Web wind is 64 static arrows.
- The native US-only line waits for the first settled region.

## Gaps for Lane

Lane owns the iOS Simulator sweep after merge. These were not verifiable on web:

- Liquid Glass on the bar and Map Tools.
- The USGS pill clear of the Apple legal label.
- Pinch past 16 (MapKit overzoom) and a pan outside the US.
- Skia particles on all three styles, including the pause when backgrounded.
- Reduce Motion on and then off.
- A finger drag of the ruler end dot with Wind on.
- 20+ spread pins under the moving layer.
- That the wind layer doesn't steal native taps.

The Sim shots are Topo with attribution and a pin, the ruler on Topo, Wind over all three styles with badge and legend, Wind under Reduce Motion, Forecast with the 7-day above the 3-day and the Sample note, and the Map Forecast button opening Forecast.

## Result

Pass. A person can finish Topo, the wind overlay, and the 7-day forecast on Expo web. Lane still owns iOS Simulator sign-off.
