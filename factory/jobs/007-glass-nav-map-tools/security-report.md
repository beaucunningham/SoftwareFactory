# Security report

Origin security pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/9, branch `cursor/glass-nav-map-tools-757f` (re-check tip `b391b76`).

Product code was not changed by security.

## Result

Pass. No critical, high, or medium findings.

First review at `fd7300e` failed on one medium. `app.json` set only `locationWhenInUsePermission` for the `expo-location` 57.0.20 config plugin. Omitted props default on, so prebuild wrote `NSLocationAlwaysAndWhenInUseUsageDescription`, `NSLocationAlwaysUsageDescription`, and `NSMotionUsageDescription`. Runtime was fine: foreground permission only, one position read, and the coordinate was never stored, logged, sent, or passed to Guide. Security test commit `cd4ca9e` added `src/ac007.security.test.ts` (prebuild Info.plist when-in-use only). Builder fix `b391b76` sets plugin props `locationAlwaysAndWhenInUsePermission`, `locationAlwaysPermission`, and `motionUsagePermission` to false. Config and docs only. Re-check pass at `b391b76`. The medium is fixed. The test was not weakened. No new findings. Prebuild writes only `NSLocationWhenInUseUsageDescription` (`Centers the map on you. Your location is not saved or sent.`), no motion key, no `UIBackgroundModes`, and Android coarse plus fine only. `npx tsc --noEmit` clean. Product `npm test` 207 pass / 0 fail.

## Critical

None.

## High

None.

## Medium

None.

## Low

None.

## Secrets and providers

Dependencies added are only `expo-blur@57.0.3` and `expo-location@57.0.20`. No postinstall. No keys. No new endpoints. Measure mode is state-only: no pin drops while measuring, and Done clears it. The account menu stays behind the session gate, sign-out clears the session, and Unpinned hunts stay user-scoped. Guide `pin:<clientId>` and `action:save` tokens are unchanged. The pin icon change is presentation-only, with a safe fallback and no migration. Forced dark uses no dynamic eval, and the Reduce Transparency listener is cleaned up. The Settings link uses `Linking.openSettings()` only. No secrets, eval, or new URL schemes.

Device-only (Lane): permission sheet text, the Settings link lands on the app page, no Always option, blue dot, Reduce Transparency, and dark UI with the phone in light.
