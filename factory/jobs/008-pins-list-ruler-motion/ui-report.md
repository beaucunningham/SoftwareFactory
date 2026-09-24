# UI report

Origin UI pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/10, branch `cursor/pins-list-ruler-motion-8a42` (docs tip `4b1fadc`, product tip `9a81ce4`).

The UI worker filed a docs-only report on that same branch: `docs/job-008-ui-report.md` at docs commit `4b1fadc`. Screenshots were not committed to the product repo. They are in the UI agent's artifacts at https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18. Product code was not changed by the UI worker.

## What I opened

Expo web at 390×844 with a light system scheme, plus resize checks at 375×667 and 430×932.

Screens were checked at product `137a94c`. The later product commit `9a81ce4` is the tip: it moves the Map Tools button to the AC's about 12pt gap. Bar clearance and sheet/scroll padding are unchanged.

## What worked

All 8 sweep steps passed. No High or Medium findings.

- The bar is visibly lighter than 007 (center pixels about rgb(45,40,24) on Satellite vs 007's rgb(31,29,21)), with the hairline kept. The active label is rgb(243,239,230), the inactive is rgb(196,184,170) at 4.9:1 on the lightest bar sample, and the orange indicator is kept.
- Bar order is Map | Pins | Forecast | Guide, and the You menu is unchanged.
- The Map Tools button is on the Map tab only, opens the same sheet, fades under the sheet, popup, and menu, and is clear on all three sizes.
- Measure follows the pointer with a live label (`398 yd · total 398 yd`), and past 880 yd it shows one-decimal miles (0.6 mi, 9.2 mi). Dragging off the end dot pans without dropping a pin, and Undo and Done work.
- The sheet eases in over about 220ms with no overshoot, and reduced motion removes the slide.
- The Pins list count, rows, sort (it re-sorted after a hunt was logged), detail, Show on map, and empty state with Go to Map all passed.
- The bar shows on pin and hunt detail.
- The 005-007 spot-check passed.

## Screenshots

Named in the UI agent artifacts at https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18. Not committed to this repo or the product repo.

- [01-sign-in](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [04-map-satellite](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [05-map-tools-sheet](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [06-map-standard](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [07-you-menu](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [08-tools-390](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [10-pin-popup](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [11-tools-se](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [12-tools-promax](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [16-measure-drag-live](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [19-measure-three](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [25-measure-miles](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [42-pins-before-hunt](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [55-sorted-after-hunt](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [70-hunt-or-detail](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [75-reduced-sheet](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [76-pressed](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [80-guide](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [81-unpinned](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [82-empty-pins](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)
- [83-go-to-map](https://cursor.com/agents/bc-c66ffc21-9960-5d8c-8949-393bba27bc18)

## Issues

One Low, fixed in-job. The Map Tools button sat about 24pt above the bar instead of the AC's about 12pt. The builder fixed it at `9a81ce4`. The button bottom is bottomInset + 14 + 64 + 12, so 90pt on SE and 124pt on Pro Max. Bar clearance and sheet/scroll padding are unchanged. The tester re-checked `137a94c..9a81ce4` and it PASSED: 214/214, typecheck clean, the placement test asserts a 12pt gap, zoom is 12pt above, the button is clear of the legal label, location slot, and Forecast button, and the web Map renders.

Lows, documented and not blocking:

- The active tab icon orange is about 1.9:1 on bright glass (the label carries contrast, a 007 choice).
- The You menu uses 200ms for open and close.
- Pre-existing map camera moves are 280–350ms.
- Log-a-hunt and new pin are platform modals.
- The web Standard map is OSM with no blue dot and has web-only zoom.

## Gaps for Lane

Lane owns the iOS Simulator sweep after merge:

- System blur over Apple Satellite and dark Standard beside a 007 shot.
- Reduce Transparency on the bar and button.
- Reduce Motion.
- Finger drag on the end dot.
- Pinch while measuring.
- Pins full and empty.
- Pin and hunt detail with the bar and the originating tab highlighted.
- Map Tools on SE and Pro Max beside zoom and the Apple legal label.
- The teardrop tip on the coordinate.
- No stutter with 20+ pins.

## Result

Pass. A person can finish the clearer glass bar, Pins list, ruler measure, calm motion, and the Map Tools button on Expo web. Lane still owns iOS Simulator sign-off.
