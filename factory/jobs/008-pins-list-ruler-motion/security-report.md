# Security report

Origin security pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/10, branch `cursor/pins-list-ruler-motion-8a42`, tip `137a94c`, diff `6b58f12..137a94c`.

Product code was not changed by security.

## Result

Pass. No critical, high, medium, or low findings.

Pins and logs come only from the signed-in user/account state. Route params are lookup keys resolved against the user's own lists (`findSpot`); the `from` param is allowlisted. Show on map only selects pins in the signed-in list. Measure points are in-memory only (no fetch, storage, logging, or analytics). Location is still when-in-use only (Always and motion props false; the 007 plist test passes). No new dependencies, network calls, or secrets; the lockfile is unchanged. `npm audit` shows 14 pre-existing moderate issues that this diff did not add. Reduce Transparency and Reduce Motion hooks are web-guarded and clean up listeners. Product `npm test` 214 pass / 0 fail. `npx tsc --noEmit` clean. Only a real iOS build can confirm the installed Info.plist and the system toggles.

## Critical

None.

## High

None.

## Medium

None.

## Low

None.

## Secrets and providers

No new dependencies. The lockfile is unchanged. No new network calls, keys, or secrets. `npm audit` shows 14 pre-existing moderate issues that this diff did not add. Pins and logs come only from the signed-in user/account state. Route params are lookup keys resolved against the user's own lists (`findSpot`); the `from` param is allowlisted. Show on map only selects pins in the signed-in list. Measure points stay in memory: no fetch, storage, logging, or analytics. Location stays when-in-use only (`locationAlwaysAndWhenInUsePermission`, `locationAlwaysPermission`, and `motionUsagePermission` remain false; the Job 007 plist test passes). Reduce Transparency and Reduce Motion hooks are web-guarded and remove their listeners. Device-only (Lane): the installed Info.plist and the system Reduce Transparency and Reduce Motion toggles.
