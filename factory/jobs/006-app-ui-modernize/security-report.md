# Security report

Origin security pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/8, branch `cursor/app-ui-modernize-6baa` (re-check tip `307a925`).

Product code was not changed by security.

## Result

Pass. No critical, high, or medium findings.

First review at `c307773` passed with no high or medium findings and one low. A Guide pin chip sent the pin's display name, which was parsed as a command. A pin named save, cancel, suggest pins, 2, harvested 9, or start over misbehaved. The chip only sent the signed-in user's own pins. There was no cross-account read. Security test commit `0b245b1` added `src/ac006.security.test.ts`. Builder fix `307a925` makes chips send `pin:<clientId>`, resolved only against the signed-in user's pins, before the exit, intent, save, count, and ordinal parsers in both chat screens. Re-check pass at `307a925`. The low is fixed. The test was not weakened. Forged, garbage, and other-user `pin:` tokens cannot select, reveal, or crash. No new findings. `npx tsc --noEmit` clean. Product `npm test` 188 pass / 0 fail.

## Critical

None.

## High

None.

## Medium

None.

## Low

- Modal routes show an empty state rather than redirecting when signed out. Carried from job 005. Not worse.
- Vault parse is not per-row resilient. Carried from job 005. Not worse.

## Secrets and providers

No keys. No new hosts. No new dependencies. No analytics. Stub forecast only. User scoping and `focusPin` stay scoped to the signed-in user. The job 005 parked-draft sign-out fix is intact. Web pin hit edges are safe. No storage or migration change. Pin name cap 80, notes cap 2000, and save guards are intact. Auth is unchanged. The Forecast route stays inside the auth-guarded tab layout.
