# AC: Job 026 nock-scout-app

The app is Nock. The original AC text is not in this repository. These are the checks recorded with the status.

## AX3 tour

The AX3 tour on SE3 and Pro Max passed on `68d69d8`. No 026c was needed.

## Scout-on block B

On `68d69d8`:

- Cases 2, 4, 7, and 8 passed.
- Case 3 (offline) failed. A refused connection showed the upstream "try again" copy because RN fetch rejects with a plain Error, not a TypeError.

026d (Origin #112, main `33ba207136447e8809b01f880d1ed4b1b0c352f8`) counts any non-abort fetch rejection as offline, with no retry.

## Consent

The AI Product Owner bounced the first head on the consent rule. The fix hides and does not store any fetched result after consent is withdrawn. Withdrawing consent aborts the in-flight ask with no retry or re-register.

Both reviewers (the Mobile QA Lead and the AI Product Owner) passed `1417b48`. 576 tests pass.

## Production

Scout stays OFF in production. The Engineering Manager decides after the Mobile QA Lead's on-device recheck (offline/airplane mode, a withdrawal mid-ask, re-opt-in, and a local Spot pick with consent off) and the 024 hardening (do not treat a real HTTP 499 as a revoke, and use a closure flag instead of the abort reason).

## Not in this job

Open product question for the Product Manager: Scout only gets a forecast cached in the last 12h for the current focus, so it often says "The forecast isn't available."

Job 024 list: `drain.tsx` online listener, `readOnlineFlag`, AX3 bugs (SE3 Scout empty-state line, tab label truncation, Pro Max tour dead space), optional band B min z16, skip the token copy on a mid-ask revoke, Clear history does not refresh an open chat, opt-out keeps the token and the 429 lock, and the `mergeScoutWrite` doc in `device.ts`.
