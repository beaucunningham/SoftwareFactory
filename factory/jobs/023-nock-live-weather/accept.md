# Accept

Job `023-nock-live-weather` is accepted.

Brief: `FACTORY_BRIEF_023_nock-live-weather.md`. AC: `AC_NOCK_LIVE_WEATHER_v0.md`. Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Go: Thu 10/1/2026 7:55pm CT. The Mobile QA Lead finished the Simulator gate at 9:09am CT Fri 10/2/2026 on final main `68d69d83208ebc3a2637097901b02ea06357a85a` (#109). Duration from go to landed: about 13h14m. That duration was inflated by the QA Mac being offline 4:05–8:39am CT. No job record for 023 was in this repository before this status pull request.

Recorded product pull requests:

- #100 final live-weather merge → `cde4ee972e706fd54b9d4165068335f86f2cfa6f` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/100
- #109 023b, merged 2026-10-02 at about 2:22am CT → `68d69d83208ebc3a2637097901b02ea06357a85a` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/109

Earlier pull requests in the series are unknown.

- Tested: builders `bc-d9b374b6` (main job) and `bc-c8415162-1cd5-5b37-8707-41e368ae8458` (023b). In-session `npm test` and `tsc --noEmit` counts are unknown. 023b adds the envLiteral test so release builds inline `EXPO_PUBLIC_*`.
- Secured: the AI Product Owner passed `6bb3199`. Findings were not copied into this repository.
- UI-checked: the Mobile QA Lead bounced 023b once (B2, band caps Z 13 and A 15), then passed `6bb3199` with the AI Product Owner. The UI report is markdown only.

Simulator gates:

- On `cde4ee9`, the first iOS Simulator gate failed three checks: B1 wind arrows in the status band on the 16 Pro and Pro Max, B2 no property lines and no zoom hint at the Llano search landing, and no "Wind unavailable" note when the proxy is down.
- On `68d69d8`, the Simulator gate passed at 9:09am CT on 2026-10-02 (release-style JS, bundle inlines the weather Worker URL): B1, B2, fallback, and live weather and wind all passed. The run was paused about 4:05–8:39am CT because the test Mac was offline.

Follow-ups for Job 024:

- Optional band B min z16 tidy-up.
- AX3: the SE3 Scout tab empty-state line is hidden under the title.
- AX3: tab labels truncate at AX3 on SE3 and the Pro Max.
- AX3: Pro Max tour dead space.

Factory status is `accepted`.
