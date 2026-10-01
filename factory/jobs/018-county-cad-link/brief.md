# Brief — Job 018: County appraisal district link

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `018-county-cad-link`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Do not follow an older tmp product URL.  
**Stack:** Expo SDK 57 (patch levels per 015), React Native, expo-router, react-native-maps (Apple Maps on iOS; `WMSTile` for parcels per 014 H4), in-house NOAA sun math (012), 013 sun stack + shooting-light popover, 009/014 glass, 017 I1–I6 (text wordmark, Forecast button removed, locate-me, property-line outlines at zoom 13, coordinate-sampled forecast stub, GPS sun times). `expo-web-browser` is already in the repo.  
**Build on:** Job 017 I1–I6, Origin PRs **#27–#31**, tip **`c1c9ba9`**. Do not open on an older commit. Do not include the stopped I7 branch (Origin PR **#32**). Do not block Job 017's merge. This job's product branch may stack on `c1c9ba9` while 017 is still landing. Once 017 has landed on product main, move the 018 diff onto a **fresh branch from that main**. Never force-push.  
**Related:** `ac.md` (copy of `AC_COUNTY_CAD_LINK_v0.md`) · Job 017 I6 tip `c1c9ba9` · stopped I7 in `docs/job-017-build.md` and Origin PR #32 · Job 014 H4 TxGIO property lines (`export` only) · `note.md` (UI-check screenshots stay out of the product repo; merges go through the normal permitted path only)  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** **One** Origin product pull request. The product PR merges through the normal permitted path only. The builder writes `factory/jobs/018-county-cad-link/build.md` in this repo and documents everything listed under Constraints, including token usage. Lane runs the iOS Simulator sweep and captures the shots and recordings listed in Constraints for the ui worker.

Beau's go came via Finley on 2026-09-30 at 10:30pm CT. Status: **FINAL, approved to build.** Add just a county appraisal district (CAD) link. No owner names. **The AI's user-facing name stays Scout.** **USGS The National Map `USGSTopo` tiles stay approved.** Weather and wind stay stubs, with no keys or spend. This brief is approved and final for Kai.

**This job recovers the CAD-link part of Job 017's stopped I7.** I7 stopped because TxGIO `identify` always returns owner fields and iOS may cache them (`docs/job-017-build.md`, Origin PR #32). This job delivers the CAD link with **no parcel service call at all**.

Chrome north star: Job 003/006–017 quiet field tool: dark by default, calm neutrals, burnt orange `#BF5700` for accents only, pin style A. This job does not restyle chrome. The new row is a small secondary line, not a new control style.

## What to build

Keep this scope exactly. **One product PR.** Nothing else.

1. **Offline county lookup.** A bundled, simplified Texas county boundary file built from US Census cartographic boundary counties (public domain, for example `cb_<year>_us_county_500k`, `STATEFP=48`). A committed script generates it. Simplify it so the asset stays small, aiming for about 1 MB or less. The product PR states the size. Ship a pure function `countyAt(lat, lon) → {name, fips} | null`. It uses a bbox prefilter plus point-in-polygon. The file header names the source, the year, and the license.
2. **County → CAD URL table.** A static, committed table of all **254** Texas counties mapped to their CAD website, built from the Texas Comptroller's appraisal district directory. The header names that source and the as-of date. A missing or blank URL falls back to the Comptroller's county directory page. No runtime fetching. No scraping.
3. **Where the link shows.**
   - **The existing tap-to-pin popup** (provisional pin, name, type, Save/Cancel). When the tap point is in Texas, add a small secondary row: `<County> County appraisal district ›`. A tap still opens the same popup and still drops the provisional pin. Save and Cancel work exactly as in 017.
   - **Pin detail:** the same row, for that pin's county.
   - The row shows whether or not the property-lines layer is on. Outside Texas, the row is hidden.
4. **Opening it.** In-app browser via `expo-web-browser`. The URL is the CAD home or property-search page only. It carries no parcel data and no owner data. Offline or a failed open shows a short toast and does not crash.

**Bar order stays: Map | Pins | Forecast | Scout.** Map stays the default home. The top-right three-line You menu is unchanged. The user-facing word is **pin**.

Everything else from Jobs 005–017 I6 stays the same. **Weather and wind data stay PLACEHOLDER/STUB.** Sun and shooting-light times stay on-device. The Scout chat stays an on-device stub. Property lines stay the 014/017 `export` overlay. Job 017 I1–I6 behavior stays.

**Network:** the only new network use is opening the CAD URL in the in-app browser. No TxGIO `identify`. No TxGIO `query`. No directory fetch. **All 306 existing tests at `c1c9ba9` stay green.** The builder records the count on that commit before and after. New tests are added on top. **No new dependencies.** **No new native code.** No secrets, no API keys, no spend, no proxy, no server. No store submit. No bundle-id or scheme change.

## Hard rules

- No owner names and no phone numbers anywhere, ever (Beau's decision 2026-09-30, carried from the 9:48pm CT delta and confirmed by the 10:30pm CT go). No TxGIO `identify` call. No TxGIO `query` call.
- No new native code.
- No new dependencies. `expo-web-browser` is already in the repo. If it is missing at `c1c9ba9`, stop and report. Do not add it.

## Build order

1. Commit the Census generation script and the simplified Texas county asset. Header: source, year, license. Record the byte size. `countyAt` passes the points in `ac.md`, including a deterministic point within about 50 m of a county line, in 5 ms or less in the test benchmark.
2. Commit the 254-row CAD table. Header: Comptroller directory source and as-of date. Every URL is `https`. A missing or blank URL returns the Comptroller county directory page. The join from `countyAt` to a row is tested for Rockwall, Dallas, Llano, and Brewster.
3. Add the secondary row to the existing tap-to-pin popup and to pin detail. Hide it when `countyAt` returns null. Show it with property lines on and with property lines off.
4. Open the row with `expo-web-browser`. The URL is the CAD home or property-search page only. A failed or offline open shows a short toast and leaves the popup and the provisional pin in place.
5. Grep the product tree. The product PR shows no TxGIO `identify` call and no TxGIO `query` call. No owner field and no phone field is rendered, stored, requested, or logged.
6. Run the full existing suite (306) plus the new tests, and the 014–017 regression checklist, before hand-off to Lane.

One product PR. It merges through the normal permitted path only. If Job 017 has not yet landed on product main, the branch may stack on `c1c9ba9`. Once 017 lands, rebuild this diff on a fresh branch from the new main. Never force-push.

### Builder constraint: no Simulator in the cloud

Cloud builders run on Linux and **cannot run the iOS Simulator**. The builder does the deepest reproduction possible without a device:

- **Code tracing:** the tap-to-pin popup (provisional pin, name, type, Save, Cancel), pin detail, the property-lines toggle, and every path that could call TxGIO. Confirm `expo-web-browser` is already a dependency. Confirm the 014 `export` overlay is unchanged.
- **Unit tests** for `countyAt` and the CAD table, including the fallback, the out-of-Texas nulls, the county-line point, and a benchmark at 5 ms or less. Component tests for the row when the setup allows (Texas vs outside Texas, property lines on and off, Save/Cancel still wired). If a true in-app browser session cannot be unit tested, the test asserts the opener is `expo-web-browser` with the table URL, and the PR explains the gap.
- **Root cause of the I7 stop** is already recorded in `docs/job-017-build.md` and Origin PR #32. This job does not retry `identify`. It does not add native cache control.
- **Exact Simulator steps for Lane (Mobile)**, who does the on-device confirmation for AC C4–C6, C8, and C10. If Lane's device result disagrees with the builder's trace, that's reported back before merge, not patched around.

## 1. Offline county lookup

- **Asset.** A simplified boundary file for Texas counties only (`STATEFP=48`), from US Census cartographic boundary counties (public domain). Example source name: `cb_<year>_us_county_500k`. The builder picks the vintage, records it, and does not bundle the rest of the United States.
- **Script.** A committed script generates the asset. It runs with Node and dependencies already in the product repo. No new app dependency and no new dev dependency. The script and the generated asset are both committed. The product PR describes the simplification (tool and tolerance, if any) and the resulting byte size.
- **Size.** Aim for about 1 MB or less. The product PR states the size. If the asset is materially larger, the PR says why, and the C1 points still pass.
- **Header.** The generated file names the source, the year, and the license.
- **`countyAt(lat, lon)`.** Pure function. No network. No disk writes. Return `{name, fips}` inside Texas and `null` outside Texas, including offshore. Implementation: bbox prefilter, then point-in-polygon.
- **Name.** `name` is the county name without the word "County" (Rockwall, Dallas, Llano, Brewster), so the row can read `{name} County appraisal district ›`.
- **Speed.** Lookup takes 5 ms or less on a typical device or in the test benchmark. The test benchmark asserts that bound. The PR states the machine and the measured time.
- **County line.** Add one point within about 50 m of a county line. Assert one deterministic county. Record the coordinates and the expected county in the test so the result cannot flake.

## 2. County → CAD URL table

- **254 rows.** One row per Texas county. The product PR states the path.
- **Source.** Built from the Texas Comptroller's appraisal district directory. The header names that source and the as-of date. The builder records the exact directory URL in the header and in the product PR. The app does not fetch or scrape the directory at runtime, and it does not download the directory when the link is tapped.
- **URLs.** Every CAD URL is `https`. Link to that county's CAD **home or property-search page only**. No parcel id, no owner name, no mailing address, no phone, and no value in the URL. No `PROP_ID` deep link.
- **Join.** `countyAt`'s `name` and/or `fips` resolves to exactly one row. Unit tests prove Rockwall, Dallas, Llano, and Brewster resolve to `https` CAD URLs, not the fallback.
- **Fallback.** A missing or blank URL returns the Comptroller's county directory page (also `https`). The builder records that exact fallback URL. The fallback is for a known Texas county with no CAD URL. It is not shown for a null `countyAt`.
- **Header.** Source and as-of date live in the file header.

## 3. Where the link shows

- **Tap-to-pin popup.** The existing popup stays: provisional pin, name, type, Save, Cancel. When `countyAt` of the tap point returns a county, add a small secondary row whose label is `{name} County appraisal district ›` (for example `Rockwall County appraisal district ›`). The row is a control. Tapping it opens the in-app browser and does not Save and does not Cancel.
- **Same tap behavior.** A tap on empty map still opens this same popup and still drops the provisional pin. The new row does not replace that flow.
- **Return.** Closing the in-app browser returns to the popup with the provisional pin intact. Name and type are as the user left them.
- **Save and Cancel.** They work exactly as in 017 at `c1c9ba9`.
- **Pin detail.** The same row, for `countyAt` of that pin's coordinates. Same label, same opener, same fallback rule. Compute it from the pin's coordinates. Do not add a stored county field.
- **Property lines.** The row shows when the property-lines layer is on and when it is off.
- **Outside Texas.** Taps outside Texas and pins outside Texas show no row. No fallback link. No disabled row. Shreveport, a Gulf offshore point, and a tap across the Red River are outside Texas.

## 4. Opening the link

- **Opener.** `expo-web-browser`, in-app browser. Already in the repo. Do not add the package. Do not add native code to open the link.
- **URL.** The county's CAD home or property-search page from the table, or the Comptroller county directory page when that URL is missing or blank. Nothing else is appended.
- **Failure.** Offline, or a failed open, shows a short toast. The app does not crash. The popup stays open and the provisional pin stays. The builder records the exact toast sentence in the product PR. One short sentence.
- **No other network.** Opening that URL is the only new request. No identify, no query, no directory fetch.

## Research

- **Base:** Job 017 milestones I1–I6 are Origin PRs #27–#31, tip `c1c9ba9`. Sage recorded **306** tests at that tip. Don't open on an older commit, and don't start from the stopped I7 branch.
- **Why I7 stopped:** TxGIO `identify` always returns owner fields, and iOS may cache them (`docs/job-017-build.md`, Origin PR #32). This job does not call the parcel service. The 014 H4 layer remains `export` tiles only.
- **County geometry:** US Census cartographic boundary counties, public domain, Texas only (`STATEFP=48`). The builder records the vintage year in the asset header.
- **CAD URLs:** Texas Comptroller appraisal district directory, snapshotted into a committed table with an as-of date. No runtime copy of that directory.
- **Browser:** `expo-web-browser` is already in the product repo at the 017 tip. No new dependency.
- User-facing word is **pin**, never "spot".
- **Nav lock:** Tabs stay **Map | Pins | Forecast | Scout** (Map default); You menu stays top-right. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. This job does not amend the nav lock.
- Do not edit Job 001–017 files. Another SoftwareFactory PR that marks job 017 built may land first. This ticket touches only `factory/jobs/018-county-cad-link/`.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### C1. `countyAt`

- [ ] Rockwall (32.93, -96.46) returns Rockwall
- [ ] Dallas (32.7767, -96.7970) returns Dallas
- [ ] Llano (30.75, -98.68) returns Llano
- [ ] A point in Brewster County returns Brewster
- [ ] Shreveport LA (32.52, -93.75) returns null
- [ ] A Gulf offshore point returns null
- [ ] A point within about 50 m of a county line returns one deterministic county

### C2. Boundary asset

- [ ] The asset is committed with its generation script
- [ ] The file header names the source, the year, and the license
- [ ] The product PR states the asset size (aim about 1 MB or less)
- [ ] Lookup takes 5 ms or less in the test benchmark

### C3. CAD table

- [ ] Exactly 254 entries
- [ ] Every URL is `https`
- [ ] A missing or blank URL falls back to the Comptroller county directory page
- [ ] Unit tested, including Rockwall, Dallas, Llano, and Brewster
- [ ] The header names the source and the as-of date

### C4. Tap-to-pin popup

- [ ] In Texas, the popup shows `<County> County appraisal district ›`
- [ ] Tapping the row opens the CAD site in the in-app browser
- [ ] Closing the browser returns to the popup with the provisional pin intact
- [ ] Save and Cancel work exactly as in 017

### C5. Pin detail and outside Texas

- [ ] Pin detail shows the same row for the pin's county
- [ ] Pins outside Texas show no row
- [ ] Taps outside Texas show no row

### C6. Property lines

- [ ] The link appears when property lines are on and when they are off

### C7. No parcel call and no owner data

- [ ] No network call other than opening the CAD URL
- [ ] No TxGIO `identify` or `query` call exists in the codebase (grep proof in the product PR)
- [ ] No owner field and no phone field anywhere

### C8. Failed open

- [ ] Offline or a failed open shows a short toast and does not crash

### C9. Regression

- [ ] 014–017 behavior holds: sun stack glass, tab switching, locate-me, parcel outlines at zoom 13, GPS sun times, per-pin forecast
- [ ] All **306** existing tests at `c1c9ba9` pass

### C10. Lane

- [ ] Simulator steps include Custom Location, a tap in Rockwall, Dallas, and Llano, a tap across the Red River, opening and closing the CAD link, and pin detail

## User-facing UI

Tap the map in Texas and the usual new-pin popup appears, with the provisional pin, the name, the type, and Save/Cancel. Under that, a small row reads `{County} County appraisal district ›`. Tap the row and that county's appraisal district site opens inside the app. Close it and the popup is still there, pin included. Save and Cancel do what they did in 017. Open a saved pin and the same row is on pin detail. Outside Texas the row is absent. Turning property lines on or off does not change the row. If the link cannot open, a short toast appears and the app stays up.

- Tap-to-pin in Rockwall, Dallas, and Llano: county row, in-app CAD page, close back to the same popup and provisional pin.
- Save and Cancel on that popup, unchanged from 017.
- Pin detail for a Texas pin: the same row. Pin detail for a pin across the Red River: no row.
- A tap across the Red River: popup with no CAD row.
- Property lines on, then off: the row still shows in Texas.
- Airplane mode or a failed open: short toast, no crash, popup still there.

## Payments and auth

- Payments: none. Do not invent spend. Weather stays the on-device stub. Wind stays the `WindSource` stub. The Scout chat stays an on-device stub. No live weather or live wind API. No keys, accounts, or spend. No store billing change. No new parcel source, proxy, or server. The CAD link is a public https page opened in the in-app browser. The app does not send a parcel id, an owner name, or a phone number.
- Auth: unchanged (Apple primary, email secondary, no guest). No auth or BaaS provider swap. No account or backend change. Storage keys stay, so an existing install keeps pins, logs, the tour flag, and settings.
- Maps: existing Apple Maps stack plus the 010 USGS `USGSTopo` `UrlTile` plus the 014/017 TxGIO `export` overlay. No `identify`. No `query`. No new API keys or paid map SDKs. No new dependency.
- Location: unchanged from 017 I3/I6. The county lookup uses the tap coordinate or the pin coordinate on device. It does not send location to a new service.
- Schema: no stored schema changes. County is computed by `countyAt`. It is not a new stored field.

## Decisions for Beau

None that block this build. The 10:30pm CT go is the approval. Do not wait.

Acreage, parcel ID, and the full parcel popup (017 option (a)) are out of scope. They come back only if Beau asks.

## Later (not in this job)

- Acreage, parcel ID, and the full parcel popup from 017 option (a). Those return only if Beau asks.
- Any retry of TxGIO `identify`, including a native `NSURLCache` bypass. I7 stays stopped.
- `PROP_ID` deep links into a CAD site.
- Owner names and phone numbers. They are not a later feature. They never appear.
- Anything else still on the 014–017 Later lists that this job does not name.

## Out of scope

- TxGIO `identify` and TxGIO `query`
- Owner names, phone numbers, mailing addresses, values, and legal descriptions
- Acreage, parcel ID, and the full parcel popup (017 option (a))
- New native code
- New dependencies, including adding `expo-web-browser` if it were absent (stop and report instead)
- Runtime fetching or scraping of the Comptroller directory or the Census file
- A stored county column on the pin
- Restyling chrome, the sun stack, locate-me, property lines, or the popup beyond the secondary row
- Holding Job 017's merge until this job is ready
- Force-pushing the product branch. After 017 lands, use a fresh branch from main
- Editing Job 001–017 files
- Product code changes from this SoftwareFactory ticket
- UI-check screenshots committed to the product repo

## Constraints

- Status: **FINAL, approved to build** (Beau's go via Finley, 2026-09-30 at 10:30pm CT).
- Base: Job 017 I1–I6, Origin PRs **#27–#31**, tip **`c1c9ba9`**. Stopped I7 is Origin PR **#32** and is not the base. Do not block 017's merge. Once 017 lands on product main, move this diff to a fresh branch from that main. Never force-push.
- Do not touch product code from this SoftwareFactory ticket. Workers build on the product repo.
- **One product PR.** It merges through the normal permitted path only.
- **Build notes must include:**
  - Asset path, generation script path, Census source, year, license, simplification used, and byte size
  - `countyAt` results for the C1 points, the county-line coordinates, and the benchmark time and machine
  - CAD table path, 254-row count, Comptroller directory URL, as-of date, and the fallback directory URL
  - Confirmation that Rockwall, Dallas, Llano, and Brewster resolve to `https` CAD home or property-search URLs with no parcel or owner data
  - Where the row sits in the tap-to-pin popup and on pin detail
  - Confirmation that `expo-web-browser` was already in the repo and was not added
  - The toast sentence
  - Grep proof of no TxGIO `identify` and no TxGIO `query`
  - Confirmation that no owner field and no phone field is rendered, stored, requested, or logged
  - Exact Simulator steps for Lane covering C4–C6, C8, and C10
  - Test count before and after on `c1c9ba9` (306 existing, all green, plus new tests)
  - Token usage
  - Confirmation that no new dependency and no new native code was added
  - The product branch name, and whether it is still stacked on `c1c9ba9` or already rebuilt on main after 017 landed
- **Lane Simulator signoff (shots / recordings):**
  - Custom Location, then a tap in Rockwall, Dallas, and Llano. Each popup shows `{County} County appraisal district ›`. The provisional pin is down. Save and Cancel still work
  - Open the CAD link from the Rockwall popup, then close the in-app browser. The popup and the provisional pin are still there
  - Save a Texas pin and open pin detail. The same row is there. Open it and close it
  - Custom Location across the Red River. The tap popup has no CAD row. A pin saved there has no CAD row on pin detail
  - Property lines on, then off, at a Texas tap. The row shows both times
  - Offline or a failed open: short toast, no crash, popup still up
  - Spot-check from C9: sun stack glass, a tab switch back to Map, locate-me, parcel outlines at zoom 13, GPS sun times, a per-pin forecast row
  - Test run output all green
- UI-check screenshots must not be committed to the product repo. Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this job folder. See `note.md`. The same rule is already in `.cursor/agents/ui.md` from Job 008.
- Merges go through the normal permitted path only. See `note.md`. Never force-push. After 017 lands, rebuild on a fresh branch from main.
- Document token usage and the items above in `factory/jobs/018-county-cad-link/build.md`.
- iOS-first. Cloud Agents only for code. One product PR.
- Hard hygiene: no live weather, no live wind, no backend, no new paid SDKs, no keys, no spend, no proxy. No new dependency. No new native code. No `identify`. No `query`. No owner names. No phone numbers.
- This public job tree stays free of secrets. Do not commit signing keys, store credentials, or EAS tokens. Do not paste live owner names into this ticket.
- Do not edit any Job 001–017 files. Touch only `factory/jobs/018-county-cad-link/`.

## Design intent (one line)

A tap in Texas still drops a pin, and one small row opens that county's appraisal district, with no owner name and no parcel lookup.
