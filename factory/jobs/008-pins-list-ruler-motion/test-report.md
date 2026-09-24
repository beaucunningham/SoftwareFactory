# Test report

Origin tester on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/10, branch `cursor/pins-list-ruler-motion-8a42`, tip `137a94c`, base `6b58f12`.

The tester made no commits on that Origin PR. There were no product changes and no test commits.

## Commands

- `npm test` — 214 pass / 0 fail at `137a94c`
- `npx tsc --noEmit` — ok
- Expo web 390×844, signed in: landed on Map with no crash

## Acceptance criteria

- B1 glass is `systemUltraThinMaterialDark`, scrim `rgba(22,20,17,0.53)`, hairline `rgba(243,239,230,0.42)`. Recomputed contrast over white ground: inactive `#C4B8AA` 4.55:1, active label `#F3EFE6` 7.71:1; over sand 4.90/8.31; light Standard 5.49. Alpha 0.52 (4.47:1) was correctly rejected
- B4 bar is Map | Pins | Forecast | Guide; the Pins glyph is `map-marker-multiple`; rows, sort, empty state, and Show on map were verified
- B5 Map Tools button: 48pt, glyph `tune`, 14pt from the right, 12pt above the bar, clear on SE and Pro Max frames, hidden in measure, faded under sheet/popup/menu, Map tab only
- B6: pin and hunt detail show `DetailGlassBar`
- B2/D1: ticks at 8pt or more, longer every 5th, pills at 80pt or more, 880 yd shows as 0.5 mi, end-dot drag draws and other drags pan
- B3: 180ms tab fade, 220/170ms sheets, 150ms popup and selection, no spring; Reduce Motion is respected
- Hygiene: no new dependencies, schema changes, keys, or images. Job 005–007 regressions: none

## Result

Pass. 0 failures.

Glass, bar order, ruler measure (D1), motion, the Pins list, the Map Tools button, and the bar on pin and hunt detail match the brief at `137a94c`. A Simulator pass goes to Lane.

## Gaps

- Non-blocking: the active tab icon orange is about 1.93:1 on white-ground glass. The label carries contrast, a 007 choice.
- Non-blocking: the You menu uses 200ms for both open and close.
- Non-blocking: pre-existing map camera moves are 280–350ms (outside the chrome cap, not new).
- Non-blocking: `hunt-new` and `spot-new` are platform modals.
- Non-blocking, web only: the web end-dot drag starts from the press point.
