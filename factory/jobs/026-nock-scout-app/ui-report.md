# UI report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

The app is Nock. Final code main `33ba207136447e8809b01f880d1ed4b1b0c352f8` (Origin #112, reviewed head `1417b48`).

This report is markdown only. No screenshots.

## AX3 tour

The AX3 tour on SE3 and Pro Max passed on `68d69d8`. No 026c was needed.

## Scout-on block B

On `68d69d8`:

- Cases 2, 4, 7, and 8 passed.
- Case 3 (offline) failed. A refused connection showed the upstream "try again" copy because RN fetch rejects with a plain Error, not a TypeError.

026d (Origin #112) counts any non-abort fetch rejection as offline, with no retry. Squash-merged Fri 10/2/2026 9:58am CT as main `33ba207136447e8809b01f880d1ed4b1b0c352f8`.

## Consent

The AI Product Owner bounced the first head on the consent rule. The fix hides and does not store any fetched result after consent is withdrawn. Withdrawing consent aborts the in-flight ask with no retry or re-register.

Both reviewers (the Mobile QA Lead and the AI Product Owner) passed `1417b48`.

## Production

Scout stays OFF in production. The Engineering Manager decides after the Mobile QA Lead's on-device recheck:

- Offline/airplane mode.
- A withdrawal mid-ask.
- Re-opt-in.
- A local Spot pick with consent off.

## Result

PASS for the code. The AX3 tour passed on `68d69d8`. Both reviewers (the Mobile QA Lead and the AI Product Owner) passed `1417b48`. Scout stays OFF in production until that on-device recheck and the 024 hardening.
