# AC: Job 023 nock-live-weather

The original AC text is not in this repository. These are the checks the Simulator gates ran.

## B1 Status-band wind arrows

B1. Wind arrows stay out of the status band on the 16 Pro and Pro Max.

Failed on `cde4ee9`. Passed on `68d69d8`.

## B2 Llano search landing

B2. Property lines and the zoom hint show at the Llano search landing.

Failed on `cde4ee9` (no property lines and no zoom hint). 023b was bounced once by the Mobile QA Lead: band A tiles served nothing because MapKit requests z15 at the fractional-z14 landing. Band caps changed to Z 13 and A 15. Passed on `68d69d8`.

## Proxy down

When the proxy is down, the map shows a "Wind unavailable" note.

Failed on `cde4ee9`. The fallback passed on `68d69d8`.

## Live weather and wind

Live weather and live wind pass on the Simulator gate. The passing run used release-style JS, and the bundle inlines the weather Worker URL.

`weatherProxyUrl`, the weather stub, and the history gate are literal reads, covered by the envLiteral test, so a release build inlines `EXPO_PUBLIC_*`.

Passed on `68d69d8` at 9:09am CT on 2026-10-02.

## Not in this job

Follow-ups for Job 024: an optional band B min z16 tidy-up, and AX3 bugs (the SE3 Scout tab empty-state line hidden under the title, tab labels truncating at AX3 on SE3 and the Pro Max, and Pro Max tour dead space).
