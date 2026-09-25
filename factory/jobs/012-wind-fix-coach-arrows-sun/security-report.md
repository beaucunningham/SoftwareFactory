# Security report

Origin security pass (bc-66d72738) on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/14, branch `cursor/wind-coach-sun-d426`, reviewed at `2536a18`, base `ca6afd1`.

No security commit. The later fix commit `6472f57` only swaps a view wrapper, the arrow direction, the chip Pressable, and the polyline paths. Product code was not changed by security. That fix added no network, dependencies, or storage (the tester confirmed this). Security was not re-run for `6472f57`. Code tip is `6472f57`. Current product tip is `3ba1b42` (UI report docs only).

## Result

Pass. No critical, high, medium, or low findings.

No dependency changes. The in-house NOAA `src/sun/solar.ts` makes no network calls. The Polylines are `tappable={false}`. The map-center fallback key `hc.map.center.v1` stores only finite lat/lng. `formatSunTime` returns '—' on null or NaN. Location stays when-in-use.

## Critical

None.

## High

None.

## Medium

None.

## Low

None.

## Secrets and providers

No live weather or wind. No new env vars, secrets, dependencies, or install scripts. The in-house NOAA module `src/sun/solar.ts` makes no network calls. USGS tiles stay the only network map source. The Polylines are `tappable={false}`. The map-center fallback key `hc.map.center.v1` stores only finite lat/lng. `formatSunTime` returns '—' on null or NaN. Location stays when-in-use (`app.json` unchanged). The fix commit `6472f57` only swaps a view wrapper, the arrow direction, the chip Pressable, and the polyline paths, and adds no network, dependencies, or storage. Security was not re-run for that commit; the tester confirmed the diff. Payments, auth, and card handling are unchanged: no spend, no new accounts, no stored card data.
