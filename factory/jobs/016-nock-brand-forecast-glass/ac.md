# AC — Nock brand rename + Map wordmark + Forecast glass + logo assets + Job 015 UI check (job 016)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_NOCK_BRAND_FORECAST_GLASS_v0.md`, including section F, updated by **Delta 2026-09-30 5:43pm** (Beau's logo assets, go via Finley). No secrets. **Status: FINAL, approved to build.** Beau's go came via Finley on 2026-09-30 at 5:43pm CT. The app name is **Nock**. The intended App Store name is **Nock: Hunt** (recorded only; store submit is a Beau gate). **The AI's user-facing name stays Scout.** Weather and wind stay stubs (no live feed, no keys, no spend). Sun and shooting-light times stay on-device; the 013 shooting-light table and copy don't change. Bar is **Map | Pins | Forecast | Scout**. Dark default, `#BF5700` accent only, pin style A. USGS topo stays approved. User-facing word is **pin**. **All 282 existing tests stay green.** No new dependencies. No secrets, no API keys, no spend, no proxy.

**Hard rule:** Beau's design is never redrawn, recolored, or re-lettered. Crop, background keying, and resize only. The product PR includes side-by-side renders of the source and the exported asset for the icon, the splash, and the Map wordmark.

**Job id:** `016-nock-brand-forecast-glass`  
**Builds on:** Job 015 at Origin main `0c7a6729600bd6ba3196a12891c15edc16a236ff` (Job 015 hotfix merged). Factory job 015 sits at `secured` by Beau's choice.  
**Product repo:** https://cursor.com/codebase/beau-cunningham/hunting-companion

Brief: `brief.md` in this folder. Full product detail is in that brief.  
**Delivery:** one product pull request. The PR merges through the normal permitted path only.  
Lane captures the shots and recordings listed at the end of this file. Those UI-check screenshots stay out of the product repo (see `note.md`). Side-by-side source-vs-export renders still go in the product PR.

**Out of scope Beau gates (do not build, do not wait):** bundle ID / scheme rename (bundle identifier, Expo slug/owner, EAS project ID, URL scheme, storage keys). App Store submit.

**Job 015:** the UI check skipped at 4:14pm CT on 2026-09-30 runs inside this job. After that real check, `npm start -- set-status ui-checked 015-map-tab-freeze-hotfix` and then `npm start -- accept 015-map-tab-freeze-hotfix`. Never hand-edit `job.json`. Do not set those statuses before the check.

**Builder constraint:** cloud builders run on Linux and can't run the iOS Simulator. Deepest reproduction possible: code tracing, asset export by crop/key/resize with sha256 of the unmodified sources, unit/component tests, root cause with file and lines for the Forecast black box. **Lane (Mobile) does the on-device confirmation** from the exact steps below and in build notes. If Lane disagrees with a root cause, it's reported before merge.

Source JPGs, committed unmodified at `assets/brand/source/`:

- `nock-app-icon.jpg` sha256 `a17ea03a1da0b1b0c477f1d50310a383deccaf0cc50cb3ab2219aba34a7c36d3` (1408×1408 RGB; cream angular N, rust-orange triangle, black, inside a drawn rounded-square outline)
- `nock-logo-wordmark.jpg` sha256 `18dc275e67e64702c1777cbf9c651e68f6374017b46d4146634408368be882c0` (1408×1408 RGB; same N over spaced NOCK with a rust underline, on black)

## Must pass

### 1. Rename to Nock (AC A)

1.1. The home-screen label and the iOS display name read **Nock**.
1.2. The splash, sign-in/onboarding, tour, You/About, Scout intro/system copy that names the app, and permission prompts say **Nock** wherever the app is named. A repo-wide search finds no leftover old placeholder name in user-facing strings. The builder records what that placeholder was.
1.3. The AI guide is still **Scout** everywhere (tab, tour, Scout's own name).
1.4. Bundle ID, Expo slug/owner, EAS project ID, URL scheme, and storage keys are unchanged. Repo and package names are unchanged. An existing install upgrades in place with pins, logs, the tour flag, and settings kept.
1.5. The product PR lists every changed string and file. It records **Nock: Hunt** as the intended App Store name. No store listing is created or edited.

### 2. Map wordmark (AC B, Delta item 7)

2.1. The top-center Map mark is the cream **NOCK** styling from `nock-logo-wordmark.jpg`, on a transparent background. It is not an app-font white "Nock" string. It is centered at the top of the Map, inside the safe area, and clear of the Dynamic Island, the Forecast button, the sun stack, and the hamburger on iPhone SE, iPhone 15, and iPhone 15 Pro Max.
2.2. It is legible on Satellite, Standard, and Topo in dark mode (AA contrast via a pill or shadow). No black box. No JPG artifacts around the letters.
2.3. It is not tappable (`pointerEvents` none). Pan, zoom, and pin taps under it work.
2.4. It shows on Map only.
2.5. The asset is cropped and keyed from the source wordmark. Shapes, colors, and letterforms match the source. A text render is allowed only if a clean key is impossible, and the PR says so. That fallback still must not redraw, recolor, or re-letter the mark.

### 3. Forecast control shape (AC C)

3.1. There is no square and no black box behind the Forecast control. Its corners match the other glass controls (same corner radius, blur, and tint), at rest, when pressed, after a tab switch, after a style change, after background/foreground, and after an Appearance change.
3.2. The product PR states the root cause with file and lines. Suspects ruled in or out with evidence: a parent `View` with a background and no `borderRadius` / `overflow: 'hidden'`; the glass view failing to clip; the fallback background showing when the glass is not mounted.
3.3. The sun-stack glass (014 H1) and the 015 tab-switch behavior are unchanged. Their regression tests still pass. Map stays `animation: 'none'`.

### 4. 015 UI check carry-over (AC D)

4.1. The UI check runs on main with 015 (`0c7a6729600bd6ba3196a12891c15edc16a236ff`) plus this job's changes. Switching back to Map from each tab is smooth. One tap always shows Map. The map stays interactive after 10 quick cycles (pan, pinch-zoom, pin tap). The sun-stack glass holds. The findings go in the product PR.
4.2. Fix only clear 015 regressions (freeze returns, a second tap is required, the map will not pan/zoom/open a pin, or the sun-stack glass is missing after those switches).
4.3. After that real check, job 015 is set to `ui-checked` and then accepted with the status CLI only. Never by editing `job.json`.

### 5. Guardrails (AC E)

5.1. All **282** existing tests pass. No new dependencies. Nothing outside this scope changes. The builder records the test count on `0c7a672` before and after.
5.2. The product PR includes the exact Simulator steps for sections 1–4 and 6 so Lane can confirm on device.

### 6. Logo assets (AC F)

6.1. Both source JPGs are committed unmodified at `assets/brand/source/`. The PR notes the path. sha256 matches the table above.
6.2. The app icon is a 1024×1024 PNG with no alpha, full-bleed black, N mark centered, drawn rounded-square outline removed. Wired to `app.json` `icon` and `ios.icon`. No edge halo or outline remnants on the iPhone Simulator home screen, light wallpaper and dark wallpaper.
6.3. The splash shows the N+NOCK logo on black. The splash background is `#000` or the logo's exact black, so there is no seam and no color mismatch. No white flash at launch. Existing `expo-splash-screen` config. No new dependency.
6.4. The Map top-center wordmark is the cream NOCK styling on a transparent background, with no black box or JPG artifacts. It is legible on Satellite, Standard, and Topo. Section 2 still holds.
6.5. Sign-in and tour use of the logo, if used, sits on dark backgrounds with no boxy JPG background visible. If unused, the PR says so.
6.6. The design is unaltered: shapes, colors, and letterforms match the source (crop, key, and resize only). The PR includes side-by-side renders of the source and the exported asset for the icon, the splash, and the wordmark.

### 7. Regression (008–015)

Every existing test on `0c7a6729600bd6ba3196a12891c15edc16a236ff` stays green (282), plus the new tests.

- **008:** Pins, Forecast, and Scout still switch. Reduce Motion stays a plain fade (008 B3). Map return stays non-fade (015) and finishes with the map interactive. Ruler drag on Topo, with Wind on, and with Property lines on. Pins empty state and most-recently-hunted sort stay.
- **009:** 20 tap-to-pin taps on empty map (3 styles, Wind on, Property lines on, next to the sun stack, including under the wordmark) open the new-pin popup. Glass see-through on the bar. "Scout" everywhere the guide is named. User-facing word is "pin". Dark default. Pin style A. `#BF5700` accent only, except the logo art keeps Beau's cream and rust.
- **010/011:** Topo stays Topo at every zoom. Attribution stays visible and is not covered by the parcel attribution or the wordmark. Thin gray tab line. No Scout suggestion chips (hunt-log step chips only while logging).
- **012:** Wind arrows, badge, and legend on all 3 styles; Wind off leaves nothing and does not remount the map. Tour arrows on target (8 steps). Forecast sun times on every row, no "sample" label. F4a/F4b still work if shipped. Tour copy changes only where a sentence names the app, and that sentence stays one short sentence.
- **013:** Min zoom, street → floor → street, on all 3 styles, Wind on and off, Property lines on: no blank, no jolt, same style. Sun stack under Forecast, ≥ 44pt, opens the popover, never drops a pin. Popover per the 013 Delta: Squirrel row, "No hour limit on private land", "Advisory only. Check local regs and verify current TPWD regulations."
- **014 H1:** sun-times glass holds through the Forecast-control states and the 015 cycles. The H1 glass test still passes. Floor tint is backup only.
- **014 H2:** "Log a hunt" on Pins, ≥ 44pt, existing form, no pin preselected from Pins. Zero pins: "Drop a pin first. Hunts are saved to a pin." After save, back on Pins with the new log under its pin. Pin detail still preselects that pin.
- **014 H3:** 8-step tour, per-account auto-launch, never over a modal, replay from You → App tour. Tour behavior does not change.
- **014 H4:** Property lines stay off by default. TxGIO lines only. No owner data. Attribution and Texas/zoom notes unchanged.
- **015:** From Pins, Forecast, and Scout, one tap shows Map, including after 10 switches from every other tab. Ten quick Map → Pins → Map → Forecast → Map → Scout → Map cycles leave the map able to pan, pinch-zoom, and open a pin. Sun-stack glass is visible after those switches. `animation: 'none'` on Map stays. `expo` ~57.0.26, `expo-constants` ~57.0.20, `expo-router` ~57.0.24 stay. No second Expo bump.
- 20 pin taps (3 styles, Wind on, Property lines on) open that pin's popup. Forecast button opens Forecast. No pin or log data lost.

## Fail if

- The home-screen label or iOS display name is not "Nock", or a user-facing string still uses the old app placeholder
- Scout is renamed, or a user-facing guide name is anything other than Scout
- Bundle ID, slug, owner, EAS project ID, URL scheme, storage keys, or a repo/package name changes
- An existing install loses pins, logs, the tour flag, or settings
- The PR omits the changed-string list, or it submits or edits a store listing
- The Map mark is plain app-font text when a keyed asset was possible, or it overlaps the Dynamic Island, Forecast button, sun stack, or hamburger on SE, iPhone 15, or 15 Pro Max
- The wordmark is tappable, blocks pan/zoom/pin taps, shows off the Map, or sits in a black box or JPG fringe
- Any square or black box remains behind the Forecast control in any listed state, or the root cause has no file and lines
- The 014 H1 sun-stack glass or the 015 single-tap / ten-cycle behavior regresses, or their tests fail
- The 015 UI check is skipped again, or job 015 is marked `ui-checked` or accepted before that check, or `job.json` is hand-edited
- A 015 regression other than a clear freeze, second-tap, dead-map, or missing sun-stack glass is "fixed" by restyling or a new Expo bump
- Either source JPG is missing, modified, or has a different sha256
- The icon is not 1024×1024, has an alpha channel, keeps the drawn rounded outline, or shows a halo on light or dark wallpaper
- The splash seams, mismatches the black, or flashes white
- Sign-in or tour shows the logo on a light or boxy JPG background
- The design is redrawn, recolored, or re-lettered, or the PR has no side-by-side renders for icon, splash, and wordmark
- Any of the 282 existing tests fails, any 008–015 regression item fails, a new dependency is added, or anything outside this scope changes
- UI-check screenshots are committed to the product repo

## Simulator sweep (Lane signoff)

Setup: clean build of the product PR; iPhone SE (3rd gen), iPhone 15, and iPhone 15 Pro Max; fresh install and an existing install that already has pins, logs, a finished tour flag, and settings; dark mode. Run the map pass on Satellite, Standard, and Topo.

**Rename and icon**

1. Home screen, light wallpaper and dark wallpaper. Label reads Nock. Icon is full-bleed black, N mark centered, no drawn rounded outline, no edge halo.
2. Delete nothing on the existing install. Open the app. Pins, logs, tour-already-done, and settings are still there.

**Splash**

3. Cold launch. N+NOCK on black. No seam between the image and the background. No white flash. Lands on Map.

**Wordmark**

4. On each phone size, Map, dark mode: cream NOCK is top center, inside the safe area, clear of the Dynamic Island, Forecast button, sun stack, and hamburger, on Satellite, Standard, and Topo.
5. Pan, pinch-zoom, and tap a pin through the wordmark area. The mark does not take the touch. The map moves, and the pin popup opens.
6. Pins, Forecast, Scout, and the You menu do not show the wordmark.

**Forecast control**

7. Forecast control at rest and pressed. No square, no black fill. Corners match the other floating glass controls.
8. Switch tabs and return. Change style Standard → Satellite → Topo. Background and foreground. Change Appearance. The control stays rounded glass in each state. Sun-stack glass is still there, including on bright Satellite (for example West Texas sand, ≈ 31.9, −102.3). Open the shooting-light popover: countdown, colors, and game selector still work.

**Sign-in / tour**

9. If the logo is on sign-in or in the tour, it sits on black or another dark background. No boxy JPG rectangle. Scout is still named Scout. Any tour sentence that names the app says Nock and is still one short sentence.

**015 carry-over**

10. From Pins, tap Map once. The map shows. Do not tap Map again. Pan, pinch-zoom, tap a pin. Glass behind the sun stack is visible.
11. Same from Forecast. Same from Scout.
12. From each other tab, switch away and back to Map 10 times, one tap on Map each time. Every tap shows the map.
13. Cycle Map → Pins → Map → Forecast → Map → Scout → Map ten times quickly. Then pan, pinch-zoom, and pin tap. No freeze.
14. Repeat a short pass with Wind on and Property lines on.

**Regression spot-check**

Forecast button opens Forecast. Log a hunt is still on Pins. Property lines still default off. Topo attribution still visible and not covered by the wordmark. Test output all green.

Lane captures: home-screen stills on light and dark wallpaper; a launch recording (splash through Map); wordmark stills on SE, iPhone 15, and 15 Pro Max on all three map styles; a recording of pan/zoom/pin-tap under the wordmark; Forecast-control stills in each state; sun-stack glass on bright Satellite; sign-in/tour if the logo is used; a 015 recording of steps 10–13; test output all green.

The product PR also includes side-by-side renders of the source JPG and the exported asset for the icon, the splash, and the wordmark. Those renders are the design proof. Lane's UI-check screenshots stay out of the product repo. Only the UI report markdown goes in the product repo. See `note.md`.
