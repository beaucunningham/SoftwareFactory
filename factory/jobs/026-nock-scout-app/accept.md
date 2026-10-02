# Accept

Job `026-nock-scout-app` is accepted for the code. Scout stays OFF in production.

Brief: `FACTORY_BRIEF_026_nock-scout-app.md`. AC: `AC_NOCK_SCOUT_APP_v0.md`. Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

The app is Nock. Go: unknown. Code landed Fri 10/2/2026 9:58am CT on main `33ba207136447e8809b01f880d1ed4b1b0c352f8`. Duration from go to landed: unknown.

Recorded product pull request:

- #112 026d, squash-merged Fri 10/2/2026 9:58am CT → `33ba207136447e8809b01f880d1ed4b1b0c352f8` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/112. Reviewed head `1417b48`.

The AX3 tour on SE3 and Pro Max passed on `68d69d8` (`68d69d83208ebc3a2637097901b02ea06357a85a`). No 026c.

- Tested: 576 tests pass. TZ splits and `tsc --noEmit` were not copied into this repository.
- Secured: the AI Product Owner bounced the first head on the consent rule. The fix hides and does not store any fetched result after consent is withdrawn, and withdrawing consent aborts the in-flight ask with no retry or re-register. Both reviewers (the Mobile QA Lead and the AI Product Owner) passed `1417b48`.
- UI-checked: AX3 tour passed on SE3 and Pro Max. Scout-on block B cases 2, 4, 7, and 8 passed on `68d69d8`. Case 3 (offline) failed there because a refused connection showed the upstream "try again" copy: RN fetch rejects with a plain Error, not a TypeError. 026d counts any non-abort fetch rejection as offline, with no retry. The UI report is markdown only.

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

Factory status is `accepted`. Scout stays OFF in production.
