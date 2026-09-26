# Security report

Origin security pass (bc-7411065d) for H1 through H4 on the four stacked Origin PRs, base `af447ef`:

- H1 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/18, branch `cursor/h1-sun-stack-glass-8299`, tip `222154e2c0bd987b3468a34dcc0b78709ac5c2c2`
- H2 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/19, branch `cursor/h2-log-a-hunt-8299`, tip `81f614a406c54e44bb5a4f2c3635c568d6c4ddc6`
- H3 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/20, branch `cursor/h3-tour-autolaunch-8299`, tip `f812d36971e14a9fe2cf7a438ef3048b798a366c`
- H4 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/21, branch `cursor/h4-property-lines-8299`. Re-check at tip `1ea1e4db1e9fad91f571d84df2604ed090f15082`, after security fix `01af522`.

No dependency changes. The lockfile is unchanged, and only the test script changed.

One Low: in-flight probes ignored the 30s cap. It's fixed in `01af522` and locked by `src/ac014.h4.test.ts`. Re-check passed at `1ea1e4db1e9fad91f571d84df2604ed090f15082` with no findings (275 pass, `tsc` clean).

## Result

Pass. No critical, high, medium, or low findings.

No dependency changes (the lockfile is unchanged, and only the test script changed). The only new network destination is the HTTPS TxGIO MapServer `export`, keyless, with no identify, query, or owner data and no proxy. There's no ATS change, and location permission stays when-in-use. The bbox is the viewport, which is an acceptable disclosure; GPS and pins are not sent. The per-account tour flag is local and fails safe on corrupt values.

## Critical

None.

## High

None.

## Medium

None.

## Low

None.

## Secrets and providers

No live weather or wind. No new env vars, secrets, dependencies, or install scripts. The lockfile is unchanged, and only the test script changed. The only new network destination is the HTTPS TxGIO MapServer `export`, keyless, with no identify, query, or owner data and no proxy. There's no ATS change. Location permission stays when-in-use. The bbox is the viewport; GPS and pins are not sent. The per-account tour flag is local and fails safe on corrupt values. In-flight probes honor the 30s cap (`01af522`, locked by `src/ac014.h4.test.ts`). Payments, auth, and card handling are unchanged: no spend, no new accounts, no stored card data.

## Still to confirm

On a real iOS build: the generated `Info.plist` has no ATS exception, no `tileCache` dir is created, and the release build hides the dev reset.
