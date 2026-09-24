# Security report

Origin security pass (bc-d9577f9c) on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/12, branch `cursor/topo-wind-7day-8fb0`, reviewed at `1a586a7`, base `f43723f`.

No security commit. The later fix commits only touch wind stepping, the US box, and tests (`19d1a67`, tester lock `e33c556`). Product code was not changed by security. Final product tip is `e33c5566c1485870ebb3dd0f1ee5d3432fb1cd3c`.

## Result

Pass. No critical, high, medium, or low findings.

`@shopify/react-native-skia` 2.6.2 is the official Shopify package (MIT), pinned, and matches Expo SDK 57 `bundledNativeModules`. Its postinstall copies prebuilt binaries from the npm packages `react-native-skia-apple-ios`, `react-native-skia-apple-macos`, `react-native-skia-apple-tvos`, and `react-native-skia-android` @147.1.0 and downloads nothing. Other transitives are `canvaskit-wasm` 0.41.0, `@webgpu/types` 0.1.21, `react-reconciler` 0.31.0, and `scheduler` 0.25.0. The only new URL is the USGS tile template, with no query string, key, or user data. No live weather or wind. No new env vars or secrets. The stubs are pure local functions. Style and wind are `useState` only. The Skia wrapper is `pointerEvents` none. `createSpot` still sets `ownerUserId`. AppState and frame-loop cleanup is correct. `app.json` is unchanged (when-in-use only). No `dangerouslySetInnerHTML` and no logging of coordinates. `npm audit`: 14 moderate, all in the existing Expo toolchain, none in Skia. Product `npm test` 229 pass / 0 fail at `1a586a7`. `npx tsc --noEmit` clean. Only a real iOS build can confirm: UrlTile sends only z/y/x, Skia does not add a native gesture recognizer, the background pause, Reduce Motion, and the prebuilt Info.plist.

## Critical

None.

## High

None.

## Medium

None.

## Low

None.

## Secrets and providers

No live weather or wind. No new env vars or secrets. The stubs are pure local functions. Style and wind stay in `useState` only. The only new URL is the USGS tile template (`https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}`), with no query string, key, or user data. The only new direct dependency is `@shopify/react-native-skia` 2.6.2 (official Shopify, MIT, pinned, Expo SDK 57 `bundledNativeModules`). Its postinstall copies prebuilt binaries from `react-native-skia-apple-ios`, `react-native-skia-apple-macos`, `react-native-skia-apple-tvos`, and `react-native-skia-android` @147.1.0 and downloads nothing. Transitives: `canvaskit-wasm` 0.41.0, `@webgpu/types` 0.1.21, `react-reconciler` 0.31.0, and `scheduler` 0.25.0. The Skia wrapper is `pointerEvents` none. `createSpot` still sets `ownerUserId`. AppState and frame-loop cleanup is correct. `app.json` is unchanged (when-in-use only). No `dangerouslySetInnerHTML`. No logging of coordinates. `npm audit` shows 14 moderate issues, all in the existing Expo toolchain, none in Skia. Payments, auth, and card handling are unchanged: no spend, no new accounts, no stored card data. Device-only (Lane): UrlTile sends only z/y/x, Skia adds no native gesture recognizer, background pause, Reduce Motion, and the prebuilt Info.plist.
