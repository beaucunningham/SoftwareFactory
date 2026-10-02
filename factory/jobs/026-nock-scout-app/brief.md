# Factory Brief 026: nock-scout-app

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

The app is Nock. Go time and builder ids were not copied into this repository. Figures that are not listed here were left blank.

Product docs in this folder: `FACTORY_BRIEF_026_nock-scout-app.md` and `AC_NOCK_SCOUT_APP_v0.md`.

## Product repository

https://cursor.com/codebase/beau-cunningham/hunting-companion

## What to build

Scout in the Nock app. The code is DONE. Scout stays OFF in production until the Engineering Manager decides, after the checks listed under Out of scope.

The AX3 tour on SE3 and Pro Max passed on hunting-companion main `68d69d8`. No 026c was needed.

Scout-on block B on `68d69d8`: cases 2, 4, 7, and 8 passed. Case 3 (offline) failed. A refused connection showed the upstream "try again" copy because RN fetch rejects with a plain Error, not a TypeError.

026d is https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/112. It was squash-merged Fri 10/2/2026 9:58am CT as main `33ba207136447e8809b01f880d1ed4b1b0c352f8`. Any non-abort fetch rejection counts as offline, with no retry. The AI Product Owner bounced the first head on the consent rule. The fix hides and does not store any fetched result after consent is withdrawn, and withdrawing consent aborts the in-flight ask with no retry or re-register. 576 tests pass. Both reviewers (the Mobile QA Lead and the AI Product Owner) passed `1417b48`.

## Research

The original brief text is not in this repository. Go time is unknown. The code landed on main `33ba207136447e8809b01f880d1ed4b1b0c352f8` (Origin #112) at 9:58am CT Fri 10/2/2026.

## Acceptance criteria

Full notes are in `AC_NOCK_SCOUT_APP_v0.md`.

- [x] AX3 tour on SE3 and Pro Max passed on `68d69d8`. No 026c.
- [x] Scout-on block B cases 2, 4, 7, and 8 passed on `68d69d8`.
- [x] Case 3 (offline) is fixed in 026d: any non-abort fetch rejection counts as offline, with no retry.
- [x] After consent is withdrawn, a fetched result is hidden and not stored. Withdrawing consent aborts the in-flight ask with no retry or re-register.
- [x] 576 tests pass. Both reviewers (the Mobile QA Lead and the AI Product Owner) passed `1417b48`.
- [ ] Scout stays OFF in production until the Engineering Manager decides after the Mobile QA Lead's on-device recheck and the 024 hardening.

## User-facing UI

Scout in Nock: the AX3 tour on SE3 and Pro Max, and Scout-on block B (including offline and consent withdrawal). Scout stays OFF in production.

## Payments and auth

Unknown. Not recorded in this repository. Opt-out keeps the token and the 429 lock; that item is on the Job 024 list, not in this job.

## Out of scope

Scout stays OFF in production. The Engineering Manager decides after:

- The Mobile QA Lead's on-device recheck: offline/airplane mode, a withdrawal mid-ask, re-opt-in, and a local Spot pick with consent off.
- 024 hardening: do not treat a real HTTP 499 as a revoke, and use a closure flag instead of the abort reason.

Open product question for the Product Manager: Scout only gets a forecast cached in the last 12h for the current focus, so it often says "The forecast isn't available."

Job 024 list:

- `drain.tsx` online listener.
- `readOnlineFlag`.
- AX3 bugs: the SE3 Scout empty-state line, tab label truncation, and Pro Max tour dead space.
- Optional band B min z16.
- Skip the token copy on a mid-ask revoke.
- Clear history does not refresh an open chat.
- Opt-out keeps the token and the 429 lock.
- The `mergeScoutWrite` doc in `device.ts`.

## Constraints

- The Mobile QA Lead (including Simulator steps) and the AI Product Owner review the diff. UI notes are markdown only.
