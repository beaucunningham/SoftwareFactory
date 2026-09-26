# Test report

Origin tester (bc-94c8cfcf) on the four stacked Origin PRs, base `af447ef`:

- H1 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/18, branch `cursor/h1-sun-stack-glass-8299`, tip `222154e2c0bd987b3468a34dcc0b78709ac5c2c2`
- H2 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/19, branch `cursor/h2-log-a-hunt-8299`, tip `81f614a406c54e44bb5a4f2c3635c568d6c4ddc6`
- H3 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/20, branch `cursor/h3-tour-autolaunch-8299`, tip `f812d36971e14a9fe2cf7a438ef3048b798a366c`
- H4 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/21, branch `cursor/h4-property-lines-8299`, original tip `c179dac8720ee155f094608494fc6f876ef7484e`

Pass at all four tips. No product bugs. No test commits.

H1 root cause verified against expo-glass-effect 57.0.4 `GlassView.swift` (lines 54-67, 84, 294-307) and expo-router `forFade`. The regression test `src/ac014.h1.test.ts` is 3 of 6 fail with `af447ef` product files and 6 of 6 pass at the H1 tip.

H2, H3, H4, and the 008–013 regressions all pass. The H4 keyless exports were re-run: Dallas and Llano returned lines, Shreveport returned 0.

H4's current tip is `1ea1e4db1e9fad91f571d84df2604ed090f15082`, after security fix `01af522`. That re-check is in the security report (275 pass, `tsc` clean).

## Commands

- `npm test` — 262 pass / 0 fail at H1 tip `222154e2c0bd987b3468a34dcc0b78709ac5c2c2`, 264 pass / 0 fail at H2 tip `81f614a406c54e44bb5a4f2c3635c568d6c4ddc6`, 268 pass / 0 fail at H3 tip `f812d36971e14a9fe2cf7a438ef3048b798a366c`, and 274 pass / 0 fail at the original H4 tip `c179dac8720ee155f094608494fc6f876ef7484e`, under the default zone, `TZ=UTC`, and `TZ=Pacific/Auckland`
- `npx tsc --noEmit` — ok

## Acceptance criteria

- H1: root cause matches expo-glass-effect 57.0.4 `GlassView.swift` (lines 54-67, 84, 294-307) and expo-router `forFade`. `src/ac014.h1.test.ts` is 3 of 6 fail with `af447ef` product files and 6 of 6 pass at H1
- H2: Log a hunt on Pins. Covered by the H2 suite (264 pass)
- H3: tour update and per-account auto-launch. Covered by the H3 suite (268 pass)
- H4: property lines. Keyless exports re-run: Dallas and Llano returned lines, Shreveport returned 0. Covered by the original H4 suite (274 pass)
- Regression: 008–013 hold
- Hygiene: no product bugs and no test commits

## Result

Pass. 0 failures at the four tips (262 / 264 / 268 / 274).

H1–H4 match the brief on those tips. A Simulator pass goes to Lane.

## Gaps

- Simulator only: whether the glass comes back on device across the matrix, and the foreground re-apply if `active` fires during the app-switcher fade. The VM has no iOS Simulator.
