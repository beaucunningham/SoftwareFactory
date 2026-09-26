# Build

Origin builder `bc-aa0ed483` finished in four stacked draft Origin PRs on base main `af447ef` (Job 013). No new dependencies.

- H1, sun-stack glass, Origin PR #18: https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/18, branch `cursor/h1-sun-stack-glass-8299`, tip `222154e2c0bd987b3468a34dcc0b78709ac5c2c2`. 262 tests.
  - Root cause: the Map tab used `animation: 'fade'`, so expo-router's `forFade` took the scene's opacity through 0. expo-glass-effect 57.0.4 `GlassView.swift` (lines 66-67) skips the glass at low opacity and reinstalls it only while `!isMounted`, which clears only when the view leaves the window. So the glass stayed blank while the text stayed. BlurView fails the same way, and Map Tools had the same bug from its own opacity animation.
  - Fix: the Map scene stays at opacity 1 (`mapSceneStyle`). The stack host stays mounted on a stable key. Glass re-applies on foreground, Reduce Transparency, and appearance changes. Map Tools slides instead of fading. A 0.12 floor tint is backup only.
  - Regression test `src/ac014.h1.test.ts`: 3 of 6 fail on `af447ef` behavior, and 6 of 6 pass after the fix.
- H2, Log a hunt on Pins, Origin PR #19: https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/19, branch `cursor/h2-log-a-hunt-8299`, tip `81f614a406c54e44bb5a4f2c3635c568d6c4ddc6`. 264 tests.
- H3, tour v2 with per-account auto-launch, Origin PR #20: https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/20, branch `cursor/h3-tour-autolaunch-8299`, tip `f812d36971e14a9fe2cf7a438ef3048b798a366c`. 268 tests.
- H4, Property lines, Origin PR #21: https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/21, branch `cursor/h4-property-lines-8299`, tip `c179dac8720ee155f094608494fc6f876ef7484e`. 274 tests.
  - The SPEND GATE PASSED on 2026-09-26, before any UI:
    - Keyless TxGIO export returned 200 png at every Lane spot in 84-235ms.
    - The terms are a no-cost disclaimer with no key, account, or payment and no bar on app use. There's no explicit commercial-redistribution grant, which is a counsel note before TestFlight.
    - Coverage is present at Dallas, Llano, Port Lavaca, Amarillo, and Lufkin, and zero at Shreveport (correct).
    - Twelve exports in a row returned no 429 or 403.
  - The layer is off by default, lines only with no owner data, and appears at zoom 14 or closer inside the Texas outline.
- Tests pass under the default zone, TZ=UTC, and TZ=Pacific/Auckland. `tsc --noEmit` is clean at every tip. No new dependencies.
- Known lows: nothing is Simulator-verified yet; Lane confirms. Map Tools hides with a 160pt slide. Foreground re-applies the glass with a one-frame `none` style. F4a and F4b are not in this build. The zero-pin prompt is an in-app card. Parcel tile counts are unmeasured on a device (min zoom 14). Token usage is not metered.
