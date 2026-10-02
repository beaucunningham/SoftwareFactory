# UI report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Final main `68d69d83208ebc3a2637097901b02ea06357a85a` (Origin #109, short `68d69d8`).

This report is markdown only. No screenshots.

The Mobile QA Lead ran the iOS Simulator gates. The AI Product Owner and the Mobile QA Lead both passed `6bb3199`.

## First gate

On `cde4ee9` (`cde4ee972e706fd54b9d4165068335f86f2cfa6f`, Origin #100), the first iOS Simulator gate failed three checks:

- B1. Wind arrows in the status band on the 16 Pro and Pro Max.
- B2. No property lines and no zoom hint at the Llano search landing.
- No "Wind unavailable" note when the proxy is down.

## 023b

The Mobile QA Lead bounced 023b once. B2: band A tiles served nothing because MapKit requests z15 at the fractional-z14 landing. The fix changes the band caps to Z 13 and A 15.

The same fix makes release builds inline `EXPO_PUBLIC_*`. `weatherProxyUrl`, the weather stub, and the history gate are literal reads, covered by the envLiteral test.

Origin #109 merged as main `68d69d83208ebc3a2637097901b02ea06357a85a` on 2026-10-02 at about 2:22am CT.

## Passing gate

The Simulator gate passed on `68d69d8` on 2026-10-02 at 9:09am CT. The run used release-style JS, and the bundle inlines the weather Worker URL. B1, B2, fallback, and live weather and wind all passed.

The run was paused about 4:05–8:39am CT because the test Mac was offline.

## What landed

- Live weather through Origin #100, main `cde4ee972e706fd54b9d4165068335f86f2cfa6f`.
- 023b on Origin #109, main `68d69d83208ebc3a2637097901b02ea06357a85a`: band caps Z 13 and A 15, and release inlining of the weather Worker URL.

## Follow-ups for Job 024

- Optional band B min z16 tidy-up.
- AX3: the SE3 Scout tab empty-state line is hidden under the title.
- AX3: tab labels truncate at AX3 on SE3 and the Pro Max.
- AX3: Pro Max tour dead space.

## Result

PASS. The Simulator gate on `68d69d8` passed at 9:09am CT on 2026-10-02: B1, B2, fallback, and live weather and wind. The Mobile QA Lead and the AI Product Owner passed `6bb3199`.
