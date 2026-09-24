# Build

Origin builder finished on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/8 (draft), branch `cursor/app-ui-modernize-6baa`, base main `7cd26c9`.

Product notes: `docs/job-006-build.md` in the hunting-companion repo.

- M1 `aa95974` quiet shell
- M2 `c79a3e8` Forecast tab
- M3 `108af94` one pin per day
- M4 `36055f2` teardrop pins
- M5 `78f0bd3` Guide chip tap
- Follow-up `8b2e6bb` pin head uses `PIN_VISUAL_SIZE`
- Forecast suggestion tap switches to Map, selects and centers the pin
- Map Forecast button and Forecast tab both render `ForecastScreen`
- Token usage in `docs/job-006-build.md`
- `npx tsc --noEmit` clean
- Product `npm test` 180 pass / 0 fail
- Known lows: suggestion centering waits briefly so fit-to-pins doesn't overwrite it; duplicate pin names ambiguous on chip tap (typing the number selects by position); web still draws +/- zoom buttons (iOS doesn't)
- Carried from 005: modal routes don't redirect when signed out, vault parse not per-row resilient
- Real iOS Simulator taps: Lane
