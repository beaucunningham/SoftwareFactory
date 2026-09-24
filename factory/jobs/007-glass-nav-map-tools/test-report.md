# Test report

Origin tester on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/9, branch `cursor/glass-nav-map-tools-757f`.

The tester made no commits on that Origin PR. Product feature design is unchanged. The builder's fixes after the first fail are in `fd7300e`.

## Commands

- `npm test` — 205 pass / 0 fail at `fd7300e`
- `npx tsc --noEmit` — ok
- Expo web 390×844, system light: sign-in, onboarding, and Map load with no crash; Map Tools opens with the 5 tools in order; forced dark holds

## Acceptance criteria

- Floating dark glass bar, order Map | Map Tools | Forecast | Guide; Map is home
- You is off the bar; top-right menu opens You
- Map Tools sheet, tools in order: Map style, My location, Fit to pins, Add pin at center, Measure distance
- Measure: yards under half a mile, then miles to one decimal (879.5 yd shows 0.5 mi); taps do not drop pins
- Map options button is gone; Forecast button stays
- Style A glyphs, no star; Job 006 suites pass
- Dark by default, including with the system set to light; no small orange text
- Reduce Transparency does not crash web; the bar falls back to solid dark on iOS
- Map stack pads `glassBarClearance(insets.bottom)` (90 at inset 0, 124 at inset 34)
- Hygiene: dependencies added are only `expo-blur` and `expo-location`

## Result

Pass. 0 failures.

First pass failed at `eaede26` / `ea702f6` on two product bugs. Signed-in web crashed because `useReduceTransparency` called `AccessibilityInfo.isReduceTransparencyEnabled`, which React Native Web does not support. Map sheets padded with `glassBarOverlap()` (90) while the bar top is `insets.bottom + 78`, so on home-indicator iPhones the last Map Tools row, the measure banner, the pin popup, and the empty-map hint overlapped the bar by about 10pt.

Finley ruled the builder's low (active tab label `#BF5700` at 3.6:1 on the dark bar) must be fixed in-job per A8. That contrast fix landed at `ea702f6`: active label `#F3EFE6`, orange on the icon plus an 18×3 indicator; auth links, Go home, and guided-log done labels moved off orange.

Builder fixes at `fd7300e`: the reduce-transparency API is guarded, with listener cleanup; the map stack pads `glassBarClearance(insets.bottom)` (90 at inset 0, 124 at inset 34); inactive tab `#C4B8AA` (9.44:1 solid, 4.70:1 glass worst case); measure units come from rounded yards (879.5 yd shows 0.5 mi). Re-test pass at `fd7300e`.

Lane iOS Simulator: bar over Satellite and dark Standard, including the active indicator on a bright tile; Reduce Transparency solid; home-indicator gaps; Apple Maps legal label; location prompt, blue dot, and denied Settings link; white Sign in with Apple; light status bar, dark keyboard, no white splash flash; all 9 glyphs on Satellite and dark Standard with a calm selected ring; native measure polyline and press-and-hold does nothing; relaunch opens Map.

## Gaps

- Non-blocking: active and inactive labels are 1.70:1 apart. The orange icon and indicator mark the active tab. A bright satellite tile is the weakest case.
- Non-blocking: the loading spinner is orange. It is not text.
- Non-blocking: the home region on You is display-only.
- Non-blocking: pin and hunt detail stack screens pad for a bar that is not shown there.
- Non-blocking, web only: zoom buttons are 36×36, Standard is OpenStreetMap, there is no blue dot, and there is no Reduce Transparency.
