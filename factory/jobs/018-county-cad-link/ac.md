# AC — County appraisal district link (job 018)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_COUNTY_CAD_LINK_v0.md`. No secrets. **Status: FINAL, approved to build.** Beau's go came via Finley on 2026-09-30 at 10:30pm CT. Add a county appraisal district (CAD) link only. **No owner names and no phone numbers, ever.** **The AI's user-facing name stays Scout.** Weather and wind stay stubs (no live feed, no keys, no spend). Bar is **Map | Pins | Forecast | Scout**. Dark default, `#BF5700` accent only, pin style A. USGS topo stays approved. User-facing word is **pin**. **All 306 existing tests at the Job 017 I6 tip stay green.** No new dependencies. `expo-web-browser` is already in the repo. No new native code. No secrets, no API keys, no spend, no proxy.

**This job recovers the CAD-link part of Job 017's stopped I7.** I7 stopped because TxGIO `identify` always returns owner fields and iOS may cache them (`docs/job-017-build.md`, Origin PR #32). There is no parcel service call in this job.

**Job id:** `018-county-cad-link`  
**Builds on:** Job 017 I1–I6, Origin PRs #27–#31, tip `c1c9ba9`. Do not block 017's merge. Once 017 has landed on product main, move this diff to a fresh branch from that main. Never force-push. Do not base the work on stopped I7 (Origin PR #32).  
**Product repo:** https://cursor.com/codebase/beau-cunningham/hunting-companion

Brief: `brief.md` in this folder. Full product detail is in that brief.  
**Delivery:** one product pull request. The PR merges through the normal permitted path only.  
Lane captures the shots and recordings listed at the end of this file. Those UI-check screenshots stay out of the product repo (see `note.md`). Only the UI report markdown goes in the product repo.

**Out of scope until Beau asks:** acreage, parcel ID, and the full parcel popup (017 option (a)).

**Builder constraint:** cloud builders run on Linux and can't run the iOS Simulator. Deepest reproduction possible: the committed Census script and asset, `countyAt` unit tests, the 254-row CAD table tests, component tests for the row, and grep proof of no `identify` or `query`. **Lane (Mobile) does the on-device confirmation** from the exact steps below and in build notes. If Lane disagrees with the builder's trace, it's reported before merge.

## Must pass

### C1. `countyAt`

1.1. `countyAt(32.93, -96.46)` returns Rockwall (`name` Rockwall, plus `fips`).
1.2. `countyAt(32.7767, -96.7970)` returns Dallas.
1.3. `countyAt(30.75, -98.68)` returns Llano.
1.4. A point the test places in Brewster County returns Brewster. The test records the coordinates.
1.5. `countyAt(32.52, -93.75)` (Shreveport, LA) returns null.
1.6. A Gulf offshore point returns null. The test records the coordinates.
1.7. A point within about 50 m of a county line returns one county, and the same point always returns that same county. The test records the coordinates and the expected county.

### C2. Boundary asset

2.1. The simplified Texas county asset is committed, and the script that generates it is committed. Texas only (`STATEFP=48`), from US Census cartographic boundary counties (public domain).
2.2. The asset file header names the source, the year, and the license.
2.3. The product PR states the asset's size. The target is about 1 MB or less. If the file is materially larger, the PR says why, and C1 still passes.
2.4. Lookup takes 5 ms or less on a typical device or in the test benchmark. The benchmark asserts that bound. The PR states the machine and the measured time.

### C3. CAD table

3.1. The committed table has exactly 254 entries, one per Texas county.
3.2. Every CAD URL is `https`. Each one is that county's CAD home or property-search page. The URL has no parcel id, owner name, mailing address, phone, or value. No `PROP_ID` deep link.
3.3. A missing or blank URL falls back to the Comptroller's county directory page. The fallback is unit tested. A null `countyAt` does not show that fallback.
3.4. Rockwall, Dallas, Llano, and Brewster resolve to `https` CAD URLs, not the fallback.
3.5. The file header names the Texas Comptroller appraisal district directory as the source, and it names the as-of date. The product PR records the directory URL and the fallback URL.

### C4. Tap-to-pin popup

4.1. A tap in Texas still opens the existing popup and still drops the provisional pin (name, type, Save, Cancel).
4.2. The popup shows a small secondary row: `{County} County appraisal district ›` (for example `Rockwall County appraisal district ›`).
4.3. Tapping the row opens that CAD site in the in-app browser (`expo-web-browser`).
4.4. Closing the browser returns to the popup. The provisional pin is still there. Name and type are as the user left them.
4.5. Save and Cancel work exactly as they do in Job 017 at `c1c9ba9`.

### C5. Pin detail and outside Texas

5.1. Pin detail shows the same row for `countyAt` of that pin's coordinates.
5.2. A pin outside Texas shows no row on pin detail.
5.3. A tap outside Texas shows no row on the popup.
5.4. The county is computed. It is not a new stored field.

### C6. Property lines

6.1. The row is visible in Texas when the property-lines layer is on.
6.2. The row is visible in Texas when the property-lines layer is off.

### C7. Network, identify, and owner data

7.1. The only new network use is opening the CAD URL. There is no directory fetch and no Census fetch at runtime.
7.2. The product PR includes grep proof that the codebase has no TxGIO `identify` call and no TxGIO `query` call. The 014/017 `export` overlay may remain.
7.3. No owner name and no phone number is rendered, stored, requested, cached, or logged. No owner field and no phone field is added. Tests may name those words to assert they are absent.

### C8. Failed open

8.1. Offline, or a failed open, shows a short toast.
8.2. The app does not crash. The popup stays, and the provisional pin stays.

### C9. Regression

9.1. These 014–017 behaviors are unchanged: sun stack glass, tab switching, locate-me, parcel outlines at zoom 13, GPS sun times, per-pin forecast.
9.2. All **306** existing tests at `c1c9ba9` pass. The builder records the count before and after. New tests are added on top. No new dependencies. No new native code.

### C10. Lane's Simulator steps

10.1. The product PR lists exact Simulator steps that include all of the following:
- Custom Location
- A tap in Rockwall, a tap in Dallas, and a tap in Llano
- A tap across the Red River
- Opening the CAD link and closing it
- Pin detail

## Fail if

- `countyAt` misses Rockwall, Dallas, Llano, or Brewster, or it returns a county for Shreveport or a Gulf offshore point
- The county-line point is flaky or has no recorded expected county
- The boundary asset or its generation script is missing, the header has no source, year, and license, or the PR omits the size
- The lookup benchmark is slower than 5 ms
- The CAD table has any count other than 254, any non-https URL, or an untested fallback
- Rockwall, Dallas, Llano, or Brewster falls through to the Comptroller page because the join is wrong
- The URL carries a parcel id, an owner name, a phone number, or a `PROP_ID`
- The Texas tap-to-pin popup has no `{County} County appraisal district ›` row, or a tap no longer opens that popup and drops the provisional pin
- Closing the in-app browser drops the provisional pin or dismisses the popup
- Save or Cancel differs from Job 017
- Pin detail omits the row for a Texas pin, or an outside-Texas pin or tap shows a row
- The row is gated on the property-lines layer
- Any network call is added besides opening the CAD URL
- A TxGIO `identify` or `query` call exists, or the PR has no grep proof
- An owner name or a phone number appears anywhere
- A failed or offline open crashes, or it shows no toast
- Sun stack glass, tab switching, locate-me, parcel outlines at zoom 13, GPS sun times, or per-pin forecast regresses
- Any of the 306 existing tests fails, a new dependency is added, or new native code is added
- The product branch force-pushes, or this job holds up 017's merge
- UI-check screenshots are committed to the product repo
- Any Job 001–017 file is edited from this ticket

## Simulator sweep (Lane signoff)

Setup: clean build of the product PR; iPhone 15 (and iPhone SE if the popup crowds the row); dark mode. Use **Simulator → Features → Location → Custom Location…** (or `xcrun simctl location booted set <lat>,<lon>`).

**In Texas**

1. Custom Location in Rockwall (32.93, -96.46). Tap empty map. The existing popup opens, the provisional pin drops, and the row reads `Rockwall County appraisal district ›`.
2. Tap the row. The Rockwall CAD site opens in the in-app browser. The URL is the home or property-search page. Close the browser. The popup is back, and the provisional pin is still there.
3. Save, then Cancel on a second tap, both exactly as in 017.
4. Repeat the tap in Dallas (32.7767, -96.7970) and in Llano (30.75, -98.68). The row names that county.

**Pin detail**

5. Save a pin in Rockwall. Open pin detail. The same row is there. Open it, then close the browser, and pin detail is still there.
6. Custom Location across the Red River (Oklahoma side). Tap. The popup has no CAD row. Save a pin there. Pin detail has no CAD row.

**Property lines and failure**

7. At a Texas tap, turn property lines on. The row shows. Turn them off. The row still shows. Outlines at zoom 13 still behave as in 017.
8. Turn the network off, or otherwise fail the open. A short toast shows. The app does not crash. The popup and provisional pin remain.

**Regression spot-check**

9. Sun stack glass is visible. One tap returns to Map from another tab. Locate-me centers on the custom location. GPS sun times and a per-pin forecast row still show. Scout is still Scout.

Lane captures: the Rockwall popup with the row; a recording of open-and-close returning to that popup with the pin intact; Dallas and Llano rows; the Red River tap with no row; pin detail in Texas and across the river; property lines on and off; the failure toast; the C9 spot-check. Test output all green.

UI-check screenshots stay out of the product repo. Only the UI report markdown goes in the product repo. See `note.md`.
