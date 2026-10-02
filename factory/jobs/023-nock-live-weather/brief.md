# Factory Brief 023: nock-live-weather

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Go: Thu 10/1/2026 7:55pm CT. Landed: the Mobile QA Lead's Simulator gate passed on hunting-companion main `68d69d8` (#109) at 9:09am CT Fri 10/2/2026. Duration: about 13h14m, inflated by the QA Mac being offline 4:05–8:39am CT. No job record for 023 was in this repository before this status pull request. Figures that are not listed here were left blank.

Product docs in this folder: `FACTORY_BRIEF_023_nock-live-weather.md` and `AC_NOCK_LIVE_WEATHER_v0.md`.

## Product repository

https://cursor.com/codebase/beau-cunningham/hunting-companion

## What to build

Live weather on the hunting companion map. The main job's code pull requests run through #100, the final live-weather merge, as main `cde4ee972e706fd54b9d4165068335f86f2cfa6f`. Fix pull request #109 (023b) merged as main `68d69d83208ebc3a2637097901b02ea06357a85a` on 2026-10-02 at about 2:22am CT.

Builders: `bc-d9b374b6` (main job) and `bc-c8415162-1cd5-5b37-8707-41e368ae8458` (023b).

023b changes the band caps to Z 13 and A 15, because band A tiles served nothing when MapKit requests z15 at the fractional-z14 landing. It also makes release builds inline `EXPO_PUBLIC_*`: `weatherProxyUrl`, the weather stub, and the history gate are literal reads, covered by the envLiteral test.

## Research

The original brief text is not in this repository. Go was Thu 10/1/2026 7:55pm CT. Landed 9:09am CT Fri 10/2/2026. Duration about 13h14m, inflated by the QA Mac being offline 4:05–8:39am CT. Earlier stats that are not listed here are unknown.

## Acceptance criteria

The checks below are the ones the Simulator gates ran. The original AC text is not in this repository. Full notes are in `AC_NOCK_LIVE_WEATHER_v0.md`.

- [ ] B1. Wind arrows stay out of the status band on the 16 Pro and Pro Max.
- [ ] B2. Property lines and the zoom hint show at the Llano search landing.
- [ ] When the proxy is down, the map shows a "Wind unavailable" note.
- [ ] Fallback and live weather and live wind pass on the release-style Simulator bundle.
- [ ] Release-style JS inlines the weather Worker URL.

## User-facing UI

Map weather and wind: status-band arrows, property lines and the zoom hint at the Llano search landing, the wind-unavailable note, and live weather and wind.

## Payments and auth

Unknown. Not recorded in this repository.

## Out of scope

Follow-ups recorded for Job 024:

- Optional band B min z16 tidy-up.
- AX3: the SE3 Scout tab empty-state line is hidden under the title.
- AX3: tab labels truncate at AX3 on SE3 and the Pro Max.
- AX3: Pro Max tour dead space.

## Constraints

- The Mobile QA Lead (including Simulator steps) and the AI Product Owner review the diff. UI notes are markdown only.
