# UI report

Origin UI pass (bc-a1267047) on Origin PR #26, web walk of `83fe9943174cd5b42abe2b82074426ff8f365f2c`.

- Product PR https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/26, branch `cursor/nock-brand-forecast-glass-cbca`.
- The UI worker filed `docs/job-016-ui-report.md` on that branch. Final tip `6e4f3b2479d0a6fd5a397d267e411611bc28b36f` adds only the two report docs (`docs/job-015-ui-report.md` and `docs/job-016-ui-report.md`) after `83fe994`. Product code is unchanged from what was checked.

Screenshots were not committed to the product repo. They are in the UI agent's artifacts (bc-a1267047). Product code was not changed by the UI worker.

## What I opened

Expo web of commit `83fe994` at 390×844, plus 375×667, 430×932, and 320×568.

## What worked

PASS on the Expo web walk. No high or medium issues.

- Design fidelity holds. The icon, splash, wordmark, and lockup are crops, black-field cleanup, resize, and a black key of Beau's JPGs. Opaque ink matches the source. Icon cream is 237,219,195 and rust is 182,62,23 on both the source and the export. Wordmark cream is 233,216,191.
- The icon is 1024 RGB, with no alpha. The edge is `#010101`, and it is clean under a simulated iOS mask. The splash edge and pad are `#010101`, matching `backgroundColor`.
- The NOCK wordmark is top center in a dark pill. It is clear of Forecast, the sun stack, and the menu at 390×844, 375×667, 430×932, and 320×568. It is readable on Satellite, Standard, and Topo. Taps pass through. It appears on Map only.
- Forecast is a 104×44 radius-22 pill with map pixels in its corners at rest, pressed, after a tab return, after each style, after reload, and after an appearance change. The app stays dark.
- Nock appears on sign-in, create account, onboarding, and About. Scout is unchanged. The lockup is on a transparent background.
- Sun-stack glass, one-tap Map, the tab line, the tour, Log a hunt, and property lines all behave.

## Screenshots

Named in the UI agent artifacts (bc-a1267047). Not committed to this repo or the product repo.

## Issues

No high or medium product issue in this web walk.

The keyed edge is a faint 1-2px light rim when magnified on gray. On black, on `#161411`, and in the map pill, it follows the source edge and does not read as an outline (about 0.3px at map size).

## Gaps for Lane

iOS Simulator only. They are not product fails from this walk: the home-screen icon mask on light and dark wallpaper, the native splash (no flash or seam), liquid glass, Reduce Transparency, background and foreground, and Dynamic Island clearance.

## Result

Pass. Design fidelity holds, the wordmark sits clear on Map, and the Forecast pill shows map pixels in its corners. Lane still runs the iOS Simulator items.
