# Security report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

The app is Nock. Final code main `33ba207136447e8809b01f880d1ed4b1b0c352f8` (Origin #112). Reviewed head `1417b48`.

The AI Product Owner bounced the first head on the consent rule. The fix hides and does not store any fetched result after consent is withdrawn, and withdrawing consent aborts the in-flight ask with no retry or re-register.

Both reviewers (the Mobile QA Lead and the AI Product Owner) passed `1417b48`.

## Critical

None recorded.

## High

None recorded.

## Medium

None recorded.

## Low

None recorded.

## Result

PASS. The AI Product Owner's consent bounce is fixed on the head both reviewers passed (`1417b48`). Scout stays OFF in production.

Before Scout turns on, 024 hardening still applies: do not treat a real HTTP 499 as a revoke, and use a closure flag instead of the abort reason. The Engineering Manager decides after that hardening and the Mobile QA Lead's on-device recheck.
