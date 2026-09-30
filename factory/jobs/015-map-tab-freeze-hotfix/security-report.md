# Security report

Origin security pass (bc-3d0ba427) on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/25, branch `cursor/map-tab-freeze-hotfix-c958`. Checked at `ba89faf`. The later tip `821e6efe8138fc49730e0f983ae592bea2fb4da4` (`821e6ef`) is a test-only change.

Pass. No findings.

Lockfile changes are exactly expo 57.0.26, expo-constants 57.0.20, expo-router 57.0.24, @expo/ui 57.0.21 (transitive), and expo-modules-core 57.0.20 (transitive). All are from registry.npmjs.org with matching sha512 integrity and no install scripts.

`npm audit` is the same 14 moderate / 0 high / 0 critical before and after. None were introduced.

No new network destinations, env vars, logging, or permission or ATS changes. Location stays when-in-use. 281 pass at `ba89faf`. `tsc` is clean.

UI check skipped for this hotfix only. Beau approved the skip at 4:14pm CT on 2026-09-30, via Finley. Tester and security still ran.

## Result

Pass. No critical, high, medium, or low findings.

The lockfile changes are the Expo patch bump above, all from registry.npmjs.org, with matching sha512 integrity and no install scripts. `npm audit` stays 14 moderate / 0 high / 0 critical. No new network destinations, env vars, logging, or permission or ATS changes. Location stays when-in-use.

## Critical

None.

## High

None.

## Medium

None.

## Low

None.

## Secrets and providers

No live weather or wind. No new env vars, secrets, or install scripts. The lockfile changes are expo 57.0.26, expo-constants 57.0.20, expo-router 57.0.24, @expo/ui 57.0.21 (transitive), and expo-modules-core 57.0.20 (transitive), all from registry.npmjs.org with matching sha512 integrity. `npm audit` is unchanged: 14 moderate, 0 high, 0 critical. No new network destinations. No new logging. No permission or ATS changes. Location stays when-in-use. Payments, auth, and card handling are unchanged: no spend, no new accounts, no stored card data.

## Still to confirm

On a real iOS build: the generated `Info.plist` has no ATS exception. Simulator steps B1–B6, C1, C3, and D2 launch are Lane's.
