# Build

Brief: `FACTORY_BRIEF_023_nock-live-weather.md`. AC: `AC_NOCK_LIVE_WEATHER_v0.md`. Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Go: Thu 10/1/2026 7:55pm CT. Landed: the Mobile QA Lead's Simulator gate passed on hunting-companion main `68d69d8` (#109) at 9:09am CT Fri 10/2/2026. Duration: about 13h14m. That duration was inflated by the QA Mac being offline 4:05–8:39am CT. No job record for 023 was in this repository before this status pull request.

The main job builder is `bc-d9b374b6`. The 023b builder is `bc-c8415162-1cd5-5b37-8707-41e368ae8458`.

| Milestone | Origin PR | Main |
| --- | --- | --- |
| Live weather, through the final live-weather merge. Earlier pull requests in the series are unknown. | https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/100 | `cde4ee972e706fd54b9d4165068335f86f2cfa6f` |
| 023b. Band caps Z 13 and A 15. Release builds inline `EXPO_PUBLIC_*` (`weatherProxyUrl`, the weather stub, and the history gate are literal reads, plus the envLiteral test). Merged 2026-10-02 at about 2:22am CT. | https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/109 | `68d69d83208ebc3a2637097901b02ea06357a85a` |

Final main is `68d69d83208ebc3a2637097901b02ea06357a85a` (#109).

Opened and merged counts for the series are unknown. The recorded merges are #100 and #109.

## Simulator gate

The first iOS Simulator gate, on `cde4ee9`, failed three checks:

- B1. Wind arrows in the status band on the 16 Pro and Pro Max.
- B2. No property lines and no zoom hint at the Llano search landing.
- No "Wind unavailable" note when the proxy is down.

023b was bounced once by the Mobile QA Lead. B2: band A tiles served nothing because MapKit requests z15 at the fractional-z14 landing. The fix changes the band caps to Z 13 and A 15. The same change makes release builds inline `EXPO_PUBLIC_*`. The AI Product Owner and the Mobile QA Lead both passed `6bb3199`.

The Simulator gate passed on `68d69d8` on 2026-10-02 at 9:09am CT. The run used release-style JS, and the bundle inlines the weather Worker URL. B1, B2, fallback, and live weather and wind all passed. The run was paused about 4:05–8:39am CT because the test Mac was offline.

## Process stats

- Go: Thu 10/1/2026 7:55pm CT. Landed 9:09am CT Fri 10/2/2026 (Simulator pass on `68d69d8`, #109). Duration: about 13h14m, inflated by the QA Mac being offline 4:05–8:39am CT.
- Cloud-agent runs: builders `bc-d9b374b6` and `bc-c8415162-1cd5-5b37-8707-41e368ae8458`, plus this status agent. Any other runs: unknown.
- Origin pull requests recorded here: #100 merged as `cde4ee972e706fd54b9d4165068335f86f2cfa6f`, #109 merged as `68d69d83208ebc3a2637097901b02ea06357a85a`. Other pull requests in the series: unknown.
- Review bounces recorded here: 1 (Mobile QA Lead on 023b, B2). The first Simulator gate failed 3 checks on `cde4ee9`.
- The AI Product Owner and the Mobile QA Lead both passed `6bb3199`.
- Simulator run paused about 4:05–8:39am CT on 2026-10-02 because the test Mac was offline.

## Follow-ups for Job 024

- Optional band B min z16 tidy-up.
- AX3: the SE3 Scout tab empty-state line is hidden under the title.
- AX3: tab labels truncate at AX3 on SE3 and the Pro Max.
- AX3: Pro Max tour dead space.
