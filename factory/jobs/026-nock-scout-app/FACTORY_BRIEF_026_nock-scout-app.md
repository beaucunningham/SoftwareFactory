# Factory Brief 026: nock-scout-app

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

The app is Nock. Go time is unknown. The original brief text is not in this repository. Figures that are not listed here were left blank.

AC: `AC_NOCK_SCOUT_APP_v0.md`

Scout app code is DONE. Scout stays OFF in production. The Engineering Manager decides when it turns on.

The AX3 tour on SE3 and Pro Max passed on main `68d69d8`. No 026c was needed.

Scout-on block B on `68d69d8`: cases 2, 4, 7, and 8 passed. Case 3 (offline) failed. A refused connection showed the upstream "try again" copy because RN fetch rejects with a plain Error, not a TypeError.

026d is Origin #112, squash-merged Fri 10/2/2026 9:58am CT as main `33ba207136447e8809b01f880d1ed4b1b0c352f8`. Any non-abort fetch rejection counts as offline, with no retry. The AI Product Owner bounced the first head on the consent rule. The fix hides and does not store any fetched result after consent is withdrawn, and withdrawing consent aborts the in-flight ask with no retry or re-register. 576 tests pass. Both reviewers (the Mobile QA Lead and the AI Product Owner) passed `1417b48`.

## Before Scout turns on

The Engineering Manager decides after:

- The Mobile QA Lead's on-device recheck: offline/airplane mode, a withdrawal mid-ask, re-opt-in, and a local Spot pick with consent off.
- 024 hardening: do not treat a real HTTP 499 as a revoke, and use a closure flag instead of the abort reason.

Open product question for the Product Manager: Scout only gets a forecast cached in the last 12h for the current focus, so it often says "The forecast isn't available."

## Job 024 list

- `drain.tsx` online listener.
- `readOnlineFlag`.
- AX3 bugs: the SE3 Scout empty-state line, tab label truncation, and Pro Max tour dead space.
- Optional band B min z16.
- Skip the token copy on a mid-ask revoke.
- Clear history does not refresh an open chat.
- Opt-out keeps the token and the 429 lock.
- The `mergeScoutWrite` doc in `device.ts`.
