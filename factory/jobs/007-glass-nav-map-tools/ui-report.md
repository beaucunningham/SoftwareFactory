# UI report

Origin UI pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/9, branch `cursor/glass-nav-map-tools-757f` (docs tip `d51bc54`, product tip `b391b76`).

The UI worker filed a docs-only report on that same branch: `docs/job-007-ui-report.md` and screenshots in `docs/job-007-ui/` (screenshots in `196e6b1`).

Product code was not changed by the UI worker.

## What I opened

Expo web at 390×844 with the browser forced light. The page stayed dark `#161411`.

Screens were checked at product `fd7300e`. Later product commits `cd4ca9e` (security test) and `b391b76` (location plist opt-out) change no screens.

## What worked

All 9 sweep steps passed. No High or Medium findings.

- The bar is Map | Map Tools | Forecast | Guide, inset and rounded, dark glass.
- Tabs stay readable on Satellite and Standard. The active tab has a light label, an orange icon, and an indicator. Inactive labels are `#C4B8AA`.
- Forecast, history, the Guide composer, and the map credit clear the bar.
- The 44×44 top-right menu sits in the same spot on Map, Forecast, Guide, and Map Tools. You content, Close, and Sign out work.
- Map Tools lists five tools in order, with no placeholders. Add pin at center saves.
- Measure shows 2.7 mi. Undo returns it to 1.4 mi. A short span shows 90 yd. Done restores the pin popup. No pins drop while measuring.
- Map Forecast opens the same screen as the Forecast tab, with one pin per day. The options button is gone.
- All 9 types use style A white glyphs, with no star, and a calm selected ring.
- Every screen is dark. Orange appears only on buttons, the active tab icon and indicator, selection, and the General pin.

## Issues

Lows, documented and not blocking:

- Web-only +/− zoom pair in `components/SpotMap.web.tsx`. It is not on iOS.
- Web has no blue dot and uses OpenStreetMap for Standard.
- Active and inactive labels are 1.70:1 apart. The orange icon and indicator mark the active tab.
- The loading spinner is orange. It is not text.
- Home region on You is display-only, as in job 006.
- Pin and hunt detail stack screens pad for a bar they do not show.

## Gaps for Lane

Lane owns the iOS Simulator sweep after merge, with the Simulator in light mode:

- No white launch flash.
- System dark blur, and a solid fallback when Reduce Transparency is on.
- Apple Satellite and dark Standard.
- Apple legal label above the bar.
- Location prompt text, blue dot, denied Settings link, and no Always option.
- Teardrop tip on the coordinate.
- Calm selected pin.
- White Sign in with Apple.
- All 9 glyphs on Satellite and dark Standard.
- Native measure polyline.
- Press-and-hold does nothing.
- Relaunch opens Map.

## Result

Pass. A person can finish the glass bar, top-right menu, Map Tools, measure, and style A pins on Expo web. Lane still owns iOS Simulator sign-off.
