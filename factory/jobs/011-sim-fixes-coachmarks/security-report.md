# Security report

Origin security pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/13, branch `cursor/sim-fixes-coachmarks-ade4`, reviewed at `2af7118`, base `6a94bc3`.

No security commit. The later fix commits only touch chat intent routing, web map rendering, and tour focus (`c6fa99c`, `560e6d9`). Product code was not changed by security. Those fixes added no dependencies or network calls. Final product tip is `560e6d9b2b1b5f61d2e3d3cd68cd968a76f66bea`.

## Result

Pass. No critical, high, medium, or low findings.

The only dependency changes are the 4 requested Expo patch bumps plus related Expo transitive patches. No new packages or install scripts. `@shopify/react-native-skia` 2.6.2 is still installed, but no Canvas or frame loop is mounted (`USE_SKIA_WIND=false`). The USGS tile URL is the only map source, with no `tileCachePath`. No live weather or wind. The tour is in-house. Tour flags `tour.coachmarks.v1` and `hc.tour.scout` store `'1'` only. `app.json` is unchanged (when-in-use location only). `npm audit` shows 14 moderate issues, all pre-existing in the Expo toolchain.

## Critical

None.

## High

None.

## Medium

None.

## Low

None.

## Secrets and providers

No live weather or wind. No new env vars or secrets. No new packages or install scripts. The only dependency changes are the 4 requested Expo patch bumps (expo 57.0.23 to 57.0.25, expo-constants 57.0.18 to 57.0.19, expo-linking 57.0.10 to 57.0.11, expo-router 57.0.21 to 57.0.23) plus related Expo transitive patches. `@shopify/react-native-skia` 2.6.2 stays installed from Job 010, but no Canvas or frame loop is mounted. The USGS tile URL (`https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}`) is the only map source, with no query string, key, user data, or `tileCachePath`. The tour is in-house. Tour flags `tour.coachmarks.v1` and `hc.tour.scout` store `'1'` only. `app.json` is unchanged (when-in-use location only). Later fixes (`c6fa99c`, `560e6d9`) touch only chat intent routing, web map rendering, and tour focus, and add no dependencies or network calls. `npm audit` shows 14 moderate issues, all pre-existing in the Expo toolchain. Payments, auth, and card handling are unchanged: no spend, no new accounts, no stored card data.
