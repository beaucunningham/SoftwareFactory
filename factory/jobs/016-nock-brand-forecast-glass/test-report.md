# Test report

Origin tester (bc-1813818b) on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/26, branch `cursor/nock-brand-forecast-glass-cbca`, final tip `83fe9943174cd5b42abe2b82074426ff8f365f2c`. Base is Job 015 at `0c7a6729600bd6ba3196a12891c15edc16a236ff`.

Pass on every item. No product bug. No tester commit.

C2 Forecast root cause verified against `0c7a672`. A Themed `View` wrapper with no `lightColor` or `darkColor` paints `#161411` with no radius and no clip around the pill. `src/ac016.test.ts` Forecast check fails on the base map file and passes at the tip. The fix is a rounded glass pill at rest, pressed, with Reduce Transparency, and across appearance and foreground.

Rename A1–A5 pass. No leftover old name in app strings. The README still says Hunting Companion, and that string is not user-facing. Scout is unchanged. Bundle id, package, slug, scheme, package name, and storage keys are unchanged. There is no `eas.json`, project id, or owner.

Assets F pass. Source hashes match. `scripts/derive-nock-brand.py` reproduces all four PNGs byte-identical. The icon is 1024 RGB with no alpha. Splash `#010101` matches config. The hard rule holds: field fill replaces only neutral non-ink pixels with sampled black to remove the outline. Keyed wordmark interior ink stays at source RGB. Edge pixels are stored as median cream and rust with coverage alpha. Composite mean error is 0.27. Android adaptive icons are still the old art. Only `icon` and `ios.icon` are wired. The job is iOS-first.

Wordmark B and F4 pass. The mark is on Map only, with `pointerEvents` none. It clears Forecast, the sun stack, and the menu at SE 320, SE 375, iPhone 15, and iPhone 15 Pro Max. Contrast is 7.63-9.03:1.

Scope and the 008–015 checklist pass.

## Commands

- `npm test` — 287 pass / 0 fail at tip `83fe9943174cd5b42abe2b82074426ff8f365f2c`, under the default zone, `TZ=UTC`, and `TZ=Pacific/Auckland`
- `npx tsc --noEmit` — exit 0
- `npx expo-doctor` — 21/21

## Acceptance criteria

- C2: root cause is a Themed `View` wrapper with no `lightColor` or `darkColor`, painting `#161411` with no radius and no clip around the pill. `src/ac016.test.ts` Forecast check fails on the base map file and passes at the tip. The fix is a rounded glass pill at rest, pressed, with Reduce Transparency, and across appearance and foreground
- A1–A5: no leftover old name in app strings. README still says Hunting Companion and is not user-facing. Scout is unchanged. Bundle id, package, slug, scheme, package name, and storage keys are unchanged. No `eas.json`, project id, or owner
- F: source hashes match. `scripts/derive-nock-brand.py` reproduces all four PNGs byte-identical. Icon is 1024 RGB with no alpha. Splash `#010101` matches config. Hard rule holds (field fill of neutral non-ink pixels only; wordmark interior ink at source RGB; edge pixels median cream/rust with coverage alpha; composite mean error 0.27). Android adaptive icons stay old (`icon` and `ios.icon` only, iOS-first)
- B and F4: Map only, `pointerEvents` none, clears Forecast, the sun stack, and the menu at SE 320, SE 375, iPhone 15, and iPhone 15 Pro Max. Contrast 7.63-9.03:1
- Scope and 008–015 hold
- Hygiene: no product bug and no tester commit

## Result

Pass. 0 failures at `83fe9943174cd5b42abe2b82074426ff8f365f2c` (287 pass) under three time zones. `tsc` exits 0. `expo-doctor` is 21/21.

The change matches the brief on that tip. Simulator steps go to Lane.

## Gaps

- Simulator only: home-screen icon and mask, splash with no flash, wordmark under the Dynamic Island and hit-testing, Forecast pill states on device, and an upgrade over an existing install. The VM has no iOS Simulator.
- The UI check for this job, and the carried-over 015 UI check, are still running. This record does not include them.
