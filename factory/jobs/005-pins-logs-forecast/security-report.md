# Security report

Origin security pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/7, branch `cursor/pins-logs-forecast-0c75` (re-review tip `e8233a6`).

Product code was not changed by security.

## Result

Pass. No critical, high, or medium findings.

First review at `132b949` failed on one medium. The parked Log-with-Guide draft was process-global and survived sign-out, so a second stub account could see and save it. Builder fix `e8233a6` bound the draft to userId and accountId, cleared it on signOut, and discarded foreign drafts on pin save and Guide resume. That commit also added synchronous in-flight save guards on map saveDraft and hunt form onSave, and caps pin name at 80 and notes at 2000. Re-review pass at `e8233a6`. `npx tsc --noEmit` clean. Product `npm test` 174 pass / 0 fail.

## Critical

None.

## High

None.

## Medium

None.

## Low

- Modal routes `hunt-new`, `hunt-detail`, `spot-new`, and `spot-detail` still lack the signed-out redirect. Signed-out state is empty.
- One bad vault row fails hydration. The vault is left in place.
- Web tiles follow the viewport to the existing Esri and OSM hosts. There is no new tile host.
- `app/spot-new.tsx` onSave lacks the in-flight guard. A double tap there can create two pins.

## Secrets and providers

No keys. No live weather. Stub ForecastProvider only. No new tile hosts. Auth and BaaS are untouched. The only new dependency is `@expo/vector-icons` 15.0.3 (MIT icon font).
