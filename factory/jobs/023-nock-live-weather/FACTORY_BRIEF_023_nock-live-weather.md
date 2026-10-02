# Factory Brief 023: nock-live-weather

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Go: unknown. No job record for 023 was in this repository before this status pull request. The original brief text is not in this repository. Figures that are not listed here were left blank.

AC: `AC_NOCK_LIVE_WEATHER_v0.md`

Builders: `bc-d9b374b6` (main job) and `bc-c8415162-1cd5-5b37-8707-41e368ae8458` (023b).

Code pull requests run through #100, the final live-weather merge, as main `cde4ee972e706fd54b9d4165068335f86f2cfa6f`. Fix pull request #109 (023b) merged as main `68d69d83208ebc3a2637097901b02ea06357a85a` on 2026-10-02 at about 2:22am CT.

023b was bounced once by the Mobile QA Lead. Band A tiles served nothing because MapKit requests z15 at the fractional-z14 landing. The fix changes the band caps to Z 13 and A 15. The same fix makes release builds inline `EXPO_PUBLIC_*`: `weatherProxyUrl`, the weather stub, and the history gate are literal reads, plus the envLiteral test.

The AI Product Owner and the Mobile QA Lead both passed `6bb3199`.

The first iOS Simulator gate, on `cde4ee9`, failed three checks. The Simulator gate passed on `68d69d8` on 2026-10-02 at 9:09am CT, on release-style JS whose bundle inlines the weather Worker URL. That run was paused about 4:05–8:39am CT because the test Mac was offline.

## Follow-ups for Job 024

- Optional band B min z16 tidy-up.
- AX3: the SE3 Scout tab empty-state line is hidden under the title.
- AX3: tab labels truncate at AX3 on SE3 and the Pro Max.
- AX3: Pro Max tour dead space.
