# Security report

Origin security pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/5, branch `cursor/map-system-d2fb` (tip ~`1b4005a`, diff vs job 003 tip `26b09c5`).

Product code was not changed by security.

## Result

Pass. No critical, high, or medium findings.

## Critical

None.

## High

None.

## Medium

None.

## Low

- Modal spot routes `/spot-new` and `/spot-detail` still lack the signed-out redirect. This is a job 001 residual. Create, update, and archive throw `No user`.
- Spot name and notes have no length cap. That can bloat local AsyncStorage only. React Native text is not HTML.
- A double-tap on Save can create two spots before `savingDraft` disables the button.
- Online map tiles reveal the viewport. Native uses Apple Maps. Web uses keyless Esri and OSM. There is no pin list upload and no new keys.

## Secrets and providers

No new Mapbox, Google, or weather keys. No paid map SDK. The weather stub is untouched. Auth and BaaS are untouched. Cancel leaves no orphan. Pins are user-scoped only.
