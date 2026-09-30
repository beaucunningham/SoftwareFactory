# Brief — Job 016: Nock brand rename + Map wordmark + Forecast glass bug + Beau's logo assets + Job 015 UI check

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `016-nock-brand-forecast-glass`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: product `main` at `0c7a6729600bd6ba3196a12891c15edc16a236ff` (Job 015 hotfix merged). Do not follow an older tmp product URL. Do not start from an older product tip. Do not open on a commit before `0c7a6729600bd6ba3196a12891c15edc16a236ff`.  
**Stack:** Expo SDK 57, React Native, expo-router, react-native-maps (Apple Maps on iOS), in-house NOAA sun math (012), 013 sun stack + shooting-light popover, 011/012 in-house coach-mark tour (`placeTooltip`), 009 glass (`expo-glass-effect` `GlassView` on iOS 26+ / `expo-blur` `BlurView` fallback), 014 H1 Map-scene opacity guard, 015 Map `animation: 'none'` freeze fix, existing `expo-splash-screen` config  
**Build on:** Job 015 at Origin main `0c7a6729600bd6ba3196a12891c15edc16a236ff`. Do not regress Job 005–015 behavior. **All 282 existing tests stay green.** New tests are added on top. **No new dependencies.**  
**Related:** `ac.md` (copy of `AC_NOCK_BRAND_FORECAST_GLASS_v0.md`, including section F and Delta 2026-09-30 5:43pm) · Job 015 freeze fix (Origin PR #25, merged) · Job 014 H1 sun-stack glass · Job 003/006–015 quiet field-tool chrome (north star) · brand burnt orange `#BF5700` for accents only · pin style A (locked in 007) · `note.md` (UI-check screenshots stay out of the product repo; merges go through the normal permitted path only)  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** **One** Origin product pull request for every item below. Sage's handoff is one product PR. This job must not ship half-fixed. The product PR merges through the normal permitted path only. The builder writes `factory/jobs/016-nock-brand-forecast-glass/build.md` in this repo and documents everything listed under Constraints, including token usage. Lane runs the iOS Simulator sweep and captures the shots and recordings listed in Constraints for the ui worker.

Beau's go came via Finley on 2026-09-30 at 5:43pm CT. Status: **FINAL, approved to build.** The logo-asset Delta below is part of that go. **The AI's user-facing name stays Scout.** **USGS The National Map `USGSTopo` tiles stay approved.** Weather and wind stay stubs, with no keys or spend. This brief is approved and final for Kai.

**Job 015 UI check (carried into this job).** Job 015 (`015-map-tab-freeze-hotfix`) sits at `secured` by Beau's choice. Beau approved skipping the 015 UI check for that hotfix only (4:14pm CT on 2026-09-30, via Finley). Tester and security on 015 passed. The skipped check runs as part of this job, against product main with the 015 hotfix (`0c7a672`). Cover tab-switch smoothness, the single tap to Map, the map staying interactive, and the sun-stack glass. Report findings in the product PR. Fix only clear 015 regressions. After that real check, job 015 gets `ui-checked` and `accept` through the status CLI only. Never set those by hand. Never edit `job.json` directly. Do not set them before the check runs:

```bash
npm start -- set-status ui-checked 015-map-tab-freeze-hotfix
npm start -- accept 015-map-tab-freeze-hotfix
```

`accept` is the manager close, and it only works from `ui-checked`. The ui worker records `ui-checked` after the real check. A Grok bot runs `accept`. Findings of the 015 check go in the product PR and in this job's `ui-report.md`. Do not rewrite Job 015 files to record the result.

Chrome north star: Job 003/006–015 quiet field tool: dark by default, calm neutrals, burnt orange `#BF5700` for accents only, pin style A. Beau's logo colors (cream, rust-orange, black) are his art. Do not recolor them, and do not spread them into chrome that this job does not name.

## What to build

Priority order. Keep this scope exactly. **One product PR.** Nothing else.

1. **Brand rename to Nock.** The app name is **Nock**. The App Store name is **Nock: Hunt** (store listing only; the store submit itself is a Beau gate, not in this job). The AI guide stays **Scout**. Rename every user-facing place the app name or its old placeholder appears: `app.json` / `app.config` `name` and the iOS display name (home-screen label "Nock"), the splash/launch screen, the sign-in/onboarding screens, tour/coach-mark copy, the You menu (About/version row), Scout's intro/system copy that names the app, and permission prompt strings (location and the rest) that name the app. The builder lists every string and file changed in the product PR. **Do not change** the bundle identifier, the Expo slug/owner, the EAS project ID, the URL scheme, or storage keys. **Do not change** any repo or package names. An existing install upgrades in place. Pins, logs, the tour flag, and settings stay.
2. **Map wordmark, from Beau's wordmark file (Delta item 7).** This replaces the earlier plain-text wordmark. Do not ship an app-font, semibold, white "Nock" string as the mark. Top-center on the Map screen is the cream **NOCK** wordmark, on a transparent background, derived from `nock-logo-wordmark.jpg` by crop and key only. Placement and hit-testing from the earlier wordmark spec still hold: inside the safe area, clear of the Dynamic Island, the top-left Forecast button and sun stack, and the top-right hamburger, on iPhone SE, iPhone 15, and iPhone 15 Pro Max. It is not a tap target (`pointerEvents` none) so pan, zoom, and pin taps under it work. Map screen only. Legible on Satellite, Standard, and Topo in dark mode (AA contrast via a pill or shadow if the cream mark needs it). No black box and no JPG artifacts around the letters.
3. **Bug: square black box behind the Forecast control.** The Map's top-left Forecast control shows a square black background behind it. Make it match the rounded glass style of the other floating controls (same corner radius, blur, and tint). No square corners and no black fill in any state: at rest, pressed, after a tab switch, after a style change, after background/foreground, and after an Appearance change. Find the cause and write it in the product PR with file and lines. Likely suspects, confirmed with evidence: a parent `View` with a background color and no `borderRadius` / `overflow: 'hidden'`, the glass view failing to clip, or the fallback background showing when the glass isn't mounted. The fix must not regress the 014 H1 / 015 glass fixes on the sun stack. Their regression tests still pass.
4. **Beau's logo assets (Delta 2026-09-30 5:43pm).** Icon, splash, the Map wordmark in item 2, and optional sign-in/tour use. Source JPGs are committed unmodified under `assets/brand/source/` in the product repo. **Hard rule:** Beau's design is never redrawn, recolored, or re-lettered. Crop, background keying, and resize only. The product PR includes side-by-side renders of the source and the exported asset for the icon, the splash, and the wordmark.
5. **Carry-over: Job 015 UI check.** Run the UI check skipped on the 015 hotfix against main at `0c7a672`. Switching back to Map from each tab is smooth. One tap always shows Map. The map stays interactive after 10 quick cycles. The sun-stack glass holds. Findings go in the product PR. Fix only clear 015 regressions, in this same PR.

**Bar order stays: Map | Pins | Forecast | Scout.** Map stays the default home. The top-right three-line You menu is unchanged.

Everything else from Jobs 005–015 stays the same. **Weather and wind data stay PLACEHOLDER/STUB** (no live feed, no keys, no spend). Sun and shooting-light times stay on-device. The Scout chat stays an on-device stub. Tour steps and tour behavior do not change except where a step's sentence names the old app name; that sentence becomes "Nock" and stays one short sentence. Property lines do not change. The 015 Map-tab freeze fix does not change (`animation: 'none'` on Map stays).

**Network:** no new network source. **All 282 existing tests at `0c7a6729600bd6ba3196a12891c15edc16a236ff` stay green.** The builder records the count on that commit before and after. New tests are added on top. **No new dependencies.** No secrets, no API keys, no spend, no proxy/server hosting. No store submit. No bundle-id or scheme change.

## Build order

1. Commit the two source JPGs unmodified under `assets/brand/source/`. Verify the sha256 values below before any export. If either hash differs, stop and report. Do not recompress or resave the JPGs.
2. Trace the Forecast control's backing. Rule the suspects in or out with evidence. Write the root cause (file and lines) before changing the look.
3. Fix the Forecast control so the square black box is gone in every state in item 3. Add a regression test where the setup allows, aimed at the cause (clip, radius, or fallback fill). The 014 H1 and 015 tab-switch tests still pass.
4. Export the icon, splash, and Map wordmark by crop, key, and resize only. Wire the icon and the splash. Place the wordmark on Map only.
5. Rename user-facing app-name strings to Nock. Leave Scout, bundle id, slug, EAS project, URL scheme, storage keys, and repo/package names alone. List every changed string and file in the PR. Record "Nock: Hunt" as the intended App Store name and state that no store listing was changed.
6. Run the full existing suite (282) plus the new tests, and the 008–015 regression checklist, before hand-off to Lane.
7. The ui check for this job includes the 015 carry-over. Findings go in the product PR. After that real 015 check, record job 015 with the status CLI only, as written above.

One product PR. It merges through the normal permitted path only.

### Builder constraint: no Simulator in the cloud

Cloud builders run on Linux and **cannot run the iOS Simulator**. The builder does the deepest reproduction possible without a device:

- **Code tracing:** every user-facing string that names the app; `app.json` / `app.config` name, icon, splash, iOS display name, bundle id, slug, scheme, and EAS project id; every storage key; the Forecast control's parent views, glass/blur mount, radius, overflow, and fallback fill; the sun-stack backing from 014/015; the Map header layout against the safe area, Forecast button, sun stack, and hamburger; tab-switch and single-tap paths from 015 (`animation: 'none'` on Map).
- **Asset work:** crop, key, and resize only. Measure the exported PNG (1024×1024, no alpha for the icon). Confirm the source JPG bytes are unchanged (sha256). Produce the side-by-side renders for the PR.
- **Unit/component tests** where the setup allows (string inventory, wordmark `pointerEvents` none and Map-only, Forecast backing radius/clip/fill, icon file dimensions and color type if the test runner can read the PNG).
- **Root cause with evidence** for the Forecast black box (code path, the trigger, file and lines). A test that fails before the fix and passes after, where that is feasible. If a true on-device square cannot be unit tested, the test asserts the condition that draws it is gone, and the PR explains the gap.
- **Exact Simulator steps for Lane (Mobile)**, who does the on-device confirmation for AC sections A–F and the 015 carry-over. If Lane's device result disagrees with the builder's root cause, that's reported back before merge, not patched around.

## 1. Brand rename to Nock

- The app name is **Nock**. The home-screen label and the iOS display name read **Nock**.
- The App Store name is **Nock: Hunt**. That string is recorded in the product PR as the intended listing name. This job does not submit the app, does not edit a store listing, and does not change screenshots, descriptions, or pricing.
- The AI guide stays **Scout** everywhere the user can see it, including the tab, the tour step, and Scout's own name. Only sentences that name the *app* change to Nock.
- Rename every user-facing place the app name or its old placeholder appears:
  - `app.json` / `app.config` `name`
  - iOS display name (home-screen label "Nock")
  - splash / launch screen
  - sign-in / onboarding screens
  - tour / coach-mark copy
  - You menu About / version row
  - Scout intro / system copy that names the app
  - permission prompt strings (location and any other permission) that name the app
- **Do not change:** bundle identifier, Expo slug, Expo owner, EAS project ID, URL scheme, storage keys, repo name, package name, or any other install/identity key. An existing install upgrades in place. Pins, logs, the tour flag, and settings stay.
- The product PR lists every changed string and every changed file. A repo-wide search finds no leftover old placeholder name in user-facing strings. The builder records what that old placeholder was.

## 2. Map wordmark (Delta item 7, from Beau's file)

The earlier plain-text spec (app font, semibold, white "Nock" on a glass pill) is **replaced** by this. Do not ship that text treatment as the mark.

- Source: `assets/brand/source/nock-logo-wordmark.jpg` (see asset rules below).
- Derive the Map asset by cropping and keying the black background out of the wordmark file so the cream **NOCK** styling (and the rust underline if it is part of the cropped wordmark) sits on a transparent background. The brief allows rendering text that matches the source only if a clean key is not possible, and the PR must say so. That line is not permission to invent letterforms. Shapes, colors, spacing, and letterforms match the source. If keying cannot be done cleanly, say so in the PR and do not redraw, recolor, or re-letter the mark.
- Top center of the **Map** screen only. Not on Pins, Forecast, Scout, or the You menu.
- Inside the safe area. Clear of the Dynamic Island, the top-left Forecast button, the sun stack, and the top-right hamburger, on iPhone SE, iPhone 15, and iPhone 15 Pro Max.
- Not a tap target. `pointerEvents` none. Pan, zoom, and pin taps under it work.
- Legible on Satellite, Standard, and Topo in dark mode. AA contrast may use a pill or shadow behind the asset. The pill or shadow does not recolor the mark and does not put a black JPG box back behind the letters.
- No black box. No JPG fringe or compression artifacts ringing the letters.

## 3. Forecast control: square black box

**Symptom:** the Map's top-left Forecast control shows a square black background behind it. The other floating controls are rounded glass.

- Match those controls: same corner radius, same blur, same tint. No square corners. No black fill.
- **States (builder traces each; Lane runs each):** at rest, pressed, after a tab switch, after a map style change (Standard, Satellite, Topo), after background/foreground, after an Appearance change.
- **Suspects (confirm with evidence, do not guess):**
  - A parent `View` with a background color and no `borderRadius` / `overflow: 'hidden'`.
  - The glass view failing to clip to the rounded rect.
  - The fallback background showing when the glass view is not mounted.
- **Root cause** goes in the product PR and in build notes, with file and lines.
- **Do not regress** the 014 H1 sun-stack glass or the 015 tab-switch behavior. The sun stack still has its glass after the states above. The 014 H1 regression test and the 015 single-tap / ten-cycle tests still pass.
- Add a regression test where feasible. If the square itself cannot be unit tested, the test asserts the causing condition is gone (unclipped fill, missing radius, fallback mounted as a square), and the PR explains the gap.

## 4. Beau's logo assets (Delta 2026-09-30 5:43pm)

Source files are Beau's own art. Finley described them as 1024. They are **1408×1408** RGB JPGs. On Sage's box they live at `/workspace/hunting-app-guide/product/brand/`. In the product repo they are committed unmodified under `assets/brand/source/`.

| File | What it is | sha256 |
| --- | --- | --- |
| `nock-app-icon.jpg` | 1408×1408 RGB JPG. A cream angular "N" with a rust-orange triangle on black, drawn inside a rounded-square outline. | `a17ea03a1da0b1b0c477f1d50310a383deccaf0cc50cb3ab2219aba34a7c36d3` |
| `nock-logo-wordmark.jpg` | 1408×1408 RGB JPG. The same N mark over a spaced "NOCK" wordmark with a rust underline, on black. | `18dc275e67e64702c1777cbf9c651e68f6374017b46d4146634408368be882c0` |

- **Unmodified sources.** Commit both JPGs byte-for-byte. The product PR notes the path. Build notes record `sha256sum` (or equivalent) and show both hashes match the table. Do not recompress, resave, re-export, or strip metadata from the source JPGs.
- **App icon.** Built from the N mark. Crop to the mark on full-bleed black. Drop the drawn rounded-square outline, because iOS masks the corners. Export a **1024×1024 PNG with no alpha channel**. Wire it to `app.json` `icon` and `ios.icon`. The N mark stays centered. No edge halo and no outline remnants on the home screen (Lane: iPhone Simulator home screen, light wallpaper and dark wallpaper).
- **Splash.** The N + NOCK logo on black. Splash background `#000` or the logo's exact black, so there is no visible seam. Use the existing `expo-splash-screen` config. Dark mode. No white flash at launch. No new dependency.
- **Map wordmark.** Item 2 above. Cream NOCK on transparent. This is the same asset family, not a second design.
- **Sign-in / tour.** May use the logo, on black or other dark backgrounds. If it is used, no boxy JPG background is visible. If it is not used, say so in the PR. Do not put the logo on a light panel.
- **Hard rule.** Do not redraw, recolor, re-letter, or otherwise alter the design. Only crop, background cleanup/keying, and resizing are allowed. Shapes, colors, and letterforms match the source. The product PR includes side-by-side renders of the source and the exported asset for the icon, the splash, and the wordmark.

## 5. Job 015 UI check (carry-over)

Job 015 is `secured`. Its ui report records a skip, not a pass. This job runs the check that was skipped.

- Base for the check: product main with the 015 hotfix, `0c7a6729600bd6ba3196a12891c15edc16a236ff`, plus this job's changes. The check is about 015 behavior still holding, not only about the new brand.
- Cover: tab-switch smoothness, a single tap to Map from each other tab, the map staying interactive (pan, zoom, pin tap) after 10 quick cycles, and the sun-stack glass.
- Also the 015 states that were left for Lane: Wind on, Property lines on, Topo, Satellite, and Standard, and the shooting-light popover opened and closed before a switch, where this job's sweep already has the device up.
- Findings go in the product PR and in this job's UI report.
- Fix only clear 015 regressions. A clear regression is a return of the freeze, a second tap required before Map shows, a map that will not pan, zoom, or open a pin after the cycles, or sun-stack glass missing after those switches. Do not restyle 015, do not bump Expo again, and do not reopen the freeze root cause unless the check shows the fix failed.
- After the real check passes, record job 015 with the CLI only (`set-status ui-checked`, then manager `accept`). Never hand-edit `factory/jobs/015-map-tab-freeze-hotfix/job.json`. Do not edit any other Job 001–015 file.

## Research

- **Base:** Job 015 hotfix merged at Origin main `0c7a6729600bd6ba3196a12891c15edc16a236ff`. Don't open on an older commit. Factory job 015 sits at `secured` (Beau's choice). Its product PR #25 is the hotfix this job builds on.
- **Names:** the app becomes **Nock**. The AI stays **Scout**. The intended App Store name **Nock: Hunt** is recorded only. Topo stays USGS `USGSTopo` (approved, attribution required). Sun math stays the in-house NOAA module from 012. The 013 shooting-light table, state text, and note do not change.
- User-facing word is **pin**, never "spot".
- **Nav lock:** Tabs stay **Map | Pins | Forecast | Scout** (Map default); You menu stays top-right. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. This job does not amend the nav lock. The home-screen name and the Map wordmark are not a new tab.
- **Assets:** Beau's two JPGs, 1408×1408, hashes above. Finley's "1024" description was the export size for the icon, not the source size.
- No live weather/wind, no AI model, no keys, no spend. No schema changes. Storage keys stay so an existing install keeps pins, logs, the tour flag, and settings.
- Do not edit Job 001–015 files, except the CLI status moves on job 015 after the real UI check.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### A. Rename to Nock

- [ ] Home-screen label and iOS display name read "Nock"
- [ ] Splash, sign-in/onboarding, tour, You/About, Scout intro/system copy that names the app, and permission prompts say "Nock" wherever the app is named. A repo-wide search finds no leftover old placeholder name in user-facing strings
- [ ] The AI guide is still "Scout" everywhere
- [ ] Bundle ID, slug, EAS project, URL scheme, storage keys, and repo/package names are unchanged. An existing install upgrades in place with pins, logs, the tour flag, and settings kept
- [ ] The PR lists every changed string and file, and records "Nock: Hunt" as the intended App Store name with no store changes

### B. Map wordmark

- [ ] Cream "NOCK" from Beau's wordmark file is centered at the top of the Map, inside the safe area, and clear of the Dynamic Island, Forecast button, sun stack, and hamburger on iPhone SE, iPhone 15, and iPhone 15 Pro Max
- [ ] Legible on Satellite, Standard, and Topo in dark mode (AA contrast via a pill or shadow). No black box and no JPG artifacts
- [ ] It is not tappable. Pan, zoom, and pin taps under it work
- [ ] It shows on Map only

### C. Forecast control shape

- [ ] No square or black box behind the Forecast control. Corners match the other glass controls, at rest, when pressed, after a tab switch, after a style change, after background/foreground, and after an Appearance change
- [ ] The PR states the root cause with file and lines
- [ ] Sun-stack glass (014 H1) and 015 tab-switch behavior are unchanged, and their regression tests still pass

### D. 015 UI check carry-over

- [ ] The UI check runs on main with 015 (`0c7a672`) plus this job. Switching back to Map from each tab is smooth, one tap always shows Map, and the map stays interactive after 10 quick cycles. Findings go in the PR
- [ ] Only clear 015 regressions are fixed. After the real check, job 015 is moved with `set-status ui-checked` and `accept` through the CLI only

### E. Guardrails

- [ ] All **282** existing tests pass. No new dependencies. Exact Simulator steps are in the PR for Lane

### F. Logo assets

- [ ] Source JPGs are committed unmodified at `assets/brand/source/`. sha256 matches the table above. Path noted in the PR
- [ ] App icon is a 1024×1024 PNG with no alpha, full-bleed black, N mark centered, drawn rounded outline removed. No edge halo or outline remnants on the home screen, light and dark wallpaper
- [ ] Splash shows the N+NOCK logo on black, no seam, no white flash at launch
- [ ] Map wordmark is cream NOCK on transparent, and B1–B4 still hold
- [ ] Sign-in and tour use of the logo, if used, sits on dark backgrounds with no boxy JPG background
- [ ] Design unaltered (crop, key, resize only). PR includes side-by-side renders of source and export for icon, splash, and wordmark

### Regression checklist (008–015 behavior must hold)

- [ ] **Tests:** all **282** existing tests at `0c7a6729600bd6ba3196a12891c15edc16a236ff` stay green (count recorded before and after). New tests are added on top
- [ ] **008 motion:** Pins, Forecast, and Scout still switch. Reduce Motion stays a plain fade (008 B3). Map return stays the 015 non-fade so the transition can settle, and it finishes with the map interactive. **008 ruler** drag still works on Topo, with Wind on, and with Property lines on. Pins empty state and most-recently-hunted sort stay
- [ ] **009 C7 tap-to-pin:** 20 single taps on empty map (3 styles, Wind on, Property lines on, next to the sun stack, including under the wordmark) all open the new-pin popup
- [ ] **Pin popup:** 20 pin taps (3 styles, Wind on, Property lines on) all open that pin's popup
- [ ] **009 glass** see-through on the bar; "Scout" everywhere the guide is named; "pin" not "spot"; dark default; pin style A; `#BF5700` accent only, except Beau's logo art which keeps its own cream and rust
- [ ] **010/011 Topo:** stays Topo at every zoom, attribution visible (and not overlapped by the parcel attribution or the wordmark)
- [ ] **011 E3** thin gray tab line; **011 E4** no Scout suggestion chips (hunt-log step chips only while logging)
- [ ] **012 F1 wind:** arrows visible on all 3 styles, badge + legend only while showing; Wind off leaves nothing; toggling does not remount the map
- [ ] **012 F2 tour arrows** on target for every step (8). Copy changes only where a sentence names the app
- [ ] **012 F3 sun times** on every forecast row; no "sample" label on sun times
- [ ] **012 F4a/F4b** still work if shipped
- [ ] **013 G1 min zoom:** street → floor → street on all 3 styles, Wind on and off, Property lines on: no blank, no jolt, same style
- [ ] **013 G2/G3:** sun stack under Forecast, ≥ 44pt, opens the popover, never drops a pin; popover phases/colors/game selector/timer/persistence per the 013 Delta (Squirrel row, "No hour limit on private land", "Advisory only. Check local regs and verify current TPWD regulations.")
- [ ] **014 H1:** sun-times glass holds. The H1 regression test still passes. Floor tint stays backup only. The Forecast-control fix does not strip this glass
- [ ] **014 H2:** "Log a hunt" on Pins, ≥ 44pt, existing form, no pin preselected from Pins; 0 pins still shows "Drop a pin first. Hunts are saved to a pin." After save the user is back on Pins and the new log shows under its pin. Pin detail still preselects that pin
- [ ] **014 H3:** 8-step tour, per-account auto-launch, never over a modal, replay from You → App tour. This job does not change tour behavior. A step that named the app now says Nock and stays one short sentence
- [ ] **014 H4:** Property lines stay off by default, TxGIO lines only, no owner data, attribution and Texas/zoom notes unchanged
- [ ] **015:** one tap on the Map tab from Pins, Forecast, and Scout shows the map, including after switching from every other tab 10 times. A second tap is never required. Ten quick Map → Pins → Map → Forecast → Map → Scout → Map cycles leave the map able to pan, pinch-zoom, and open a pin. Sun-stack glass is visible after those switches. `animation: 'none'` on Map stays. Expo stays at `expo` ~57.0.26, `expo-constants` ~57.0.20, `expo-router` ~57.0.24. No new Expo bump
- [ ] Forecast button still opens Forecast; no pin or log data lost

### Hygiene

- [ ] Only the Nock rename, the Map wordmark, the Forecast-control shape fix, Beau's logo assets, and clear 015 regressions (if the carry-over check finds any) are new
- [ ] No live weather or wind, no backend changes, no keys, no spend, no proxy, no store submit
- [ ] No new dependencies
- [ ] No schema changes. Storage keys unchanged
- [ ] Bundle ID, slug, owner, EAS project ID, URL scheme, and repo/package names unchanged
- [ ] iOS-first; Cloud Agents only; one product PR
- [ ] UI-check screenshots are not committed to the product repo. Only the UI report markdown is. Side-by-side asset renders are in the product PR
- [ ] Source JPGs under `assets/brand/source/` are the unmodified files (hashes above)

## User-facing UI

The app on the home screen is named Nock. Opening it shows Beau's N + NOCK mark on black, with no white flash and no seam. On the Map, "NOCK" sits at the top center in his cream lettering, clear of the Forecast control and the menu, and the map still moves under it. The Forecast control is the same rounded glass as the other floating controls, with no square black box behind it. Scout is still Scout. Coming back to the Map is still one tap, and the map still works.

- Home-screen label "Nock" on light and dark wallpaper, icon full-bleed black, no leftover rounded outline or halo.
- Splash: N + NOCK on black, no seam, no white flash.
- Map only: cream NOCK wordmark, top center, not tappable, legible on Satellite, Standard, and Topo.
- Forecast control matches the other glass controls in every state listed above.
- Sign-in and tour show the logo only if the builder uses it, and only on a dark background.
- 015 carry-over: one tap returns to Map from each tab, the map stays interactive after 10 quick cycles, and the sun-stack glass is still there.

## Payments and auth

- Payments: none. Do not invent spend. Weather stays the on-device stub. Wind stays the `WindSource` stub. The Scout chat stays an on-device stub. No live weather or live wind API. No keys, accounts, or spend. No store billing change. No new parcel source, proxy, or server.
- Auth: unchanged behavior (Apple primary, email secondary, no guest). No auth/BaaS provider swap. No account or backend change. Storage keys stay, so an existing install keeps pins, logs, the tour flag, and settings.
- Maps: existing Apple Maps stack plus the 010 USGS `USGSTopo` `UrlTile` plus the 014 TxGIO `WMSTile` overlay. No other tile provider. No new API keys or paid map SDKs. No new dependency.
- Location: permission copy may say Nock where it names the app. Sun times and shooting light stay on the map center, not GPS. No new location-permission dependency.
- Schema: no stored schema changes.

## Decisions for Beau

None that block this build. The 5:43pm CT go is the approval. Do not wait.

These are **out of scope Beau gates**. Do not do them in this job, and do not treat them as defaults to invent:

- **Bundle ID / scheme rename.** Bundle identifier, Expo slug/owner, EAS project ID, URL scheme, and storage keys stay as they are. A later Beau go is required before any of those change.
- **Store submit.** "Nock: Hunt" is the intended App Store name. This job does not submit the app or edit the store listing.

## Later (not in this job)

The draft brief's "Later / pending" list, after the 5:43pm go:

- **Closed by this go:** "more items from Beau before go." The logo Delta is the go. It is in this job, not later.
- **Moved into this job by the Delta:** the logo, the app icon, the splash, and the Map wordmark. They are not waiting on another design pick.
- **Still later, Beau gates (out of scope):** bundle ID / scheme rename (bundle identifier, Expo slug/owner, EAS project ID, URL scheme, storage keys). App Store submit, including actually listing the name "Nock: Hunt".
- Anything still on the 015 Later list that this job does not name (tour changes beyond a renamed app string, parcels features, a different tab animation, Expo upgrades).

## Out of scope

- Bundle identifier, Expo slug, Expo owner, EAS project ID, URL scheme, or storage-key changes (Beau gate)
- Repo or package renames
- App Store submit, store listing edits, or shipping under the name "Nock: Hunt" beyond recording that name in the PR (Beau gate)
- Redrawing, recoloring, or re-lettering Beau's logo. Any export that is not crop, key, and resize
- A plain-text stand-in for the Map wordmark when the keyed asset can be made
- New features other than the rename, the wordmark, the Forecast-control shape, the logo assets, and clear 015 regressions found by the carry-over check
- Restyling chrome, the sun stack, the glass bar, or pins to match the logo
- Live weather/wind or any live data API
- Backend, auth, schema, keys, or spend
- New dependencies, including a new splash or image library
- An Expo version bump
- Editing Job 001–015 files, except the CLI status moves on job 015 after the real UI check
- Product code changes from this SoftwareFactory ticket
- Setting job 015 to `ui-checked` or `accepted` before the real UI check, or by editing `job.json` by hand

## Constraints

- Status: **FINAL, approved to build** (Beau's go via Finley, 2026-09-30 at 5:43pm CT, including the logo-asset Delta).
- Base: Origin main **`0c7a6729600bd6ba3196a12891c15edc16a236ff`** (Job 015 hotfix merged). Factory job 015 is `secured` by Beau's choice.
- Do not touch product code from this SoftwareFactory ticket. Workers build on the product repo.
- **One product PR.** It merges through the normal permitted path only.
- **Build notes must include:**
  - Every user-facing string and file changed in the rename, and the old placeholder that was removed
  - Confirmation that bundle id, slug, owner, EAS project ID, URL scheme, storage keys, and repo/package names are unchanged, with the values cited
  - "Nock: Hunt" recorded as the intended App Store name, and a statement that no store listing was submitted or edited
  - Forecast-control root cause in plain words, with the exact file and lines, and each suspect ruled in or out
  - The regression test for that cause, or the gap if a true square cannot be unit tested
  - How the sun-stack glass and the 015 `animation: 'none'` path stay intact
  - Source path `assets/brand/source/`, both sha256 values, and that they match the table in this brief
  - Export steps for icon, splash, and wordmark: crop, key, and resize only. Icon size 1024×1024, no alpha, outline dropped. Splash background color. Wordmark keying method. If a text fallback was used, why keying failed
  - Where the side-by-side renders are in the PR
  - Whether sign-in/tour use the logo
  - 015 UI-check findings (smooth return, single tap, map interactive after 10 cycles, sun-stack glass), and any clear 015 regression that was fixed
  - Exact Simulator steps for Lane covering AC A–F and the 015 carry-over
  - Test count before and after on `0c7a672` (282 existing, all green, plus new tests)
  - Token usage
  - Confirmation that no new dependency was added
- **Lane Simulator signoff (shots / recordings):**
  - Home screen, light wallpaper and dark wallpaper: label "Nock", full-bleed black icon, no halo, no drawn rounded outline
  - Launch recording: splash N+NOCK on black, no seam, no white flash, then Map
  - Map on iPhone SE, iPhone 15, and iPhone 15 Pro Max: wordmark clear of Dynamic Island, Forecast, sun stack, and hamburger, on Satellite, Standard, and Topo. A pan, a pinch, and a pin tap that starts under the wordmark
  - Forecast control stills at rest and pressed, after a tab switch, after each map style, after background/foreground, and after an Appearance change. No square, no black box
  - Sun-stack glass still visible in those states, including bright Satellite
  - Sign-in and tour, if the logo is used: dark background, no JPG box
  - 015 carry-over recording: one tap back to Map from Pins, Forecast, and Scout; 10 quick cycles; then pan, zoom, and a pin tap. Sun-stack glass after the cycles
  - Side-by-side renders of source vs export for icon, splash, and wordmark are in the PR (these are asset proofs, not the UI-check screenshot set)
  - Test run output all green
- UI-check screenshots must not be committed to the product repo. Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this job folder. See `note.md`. The same rule is already in `.cursor/agents/ui.md` from Job 008. Side-by-side asset renders required by section F still go in the product PR.
- Merges go through the normal permitted path only. See `note.md`.
- Document token usage and the items above in `factory/jobs/016-nock-brand-forecast-glass/build.md`.
- iOS-first. Cloud Agents only for code. One product PR.
- Hard hygiene: no live weather, no live wind, no backend, no new paid SDKs, no keys, no spend, no proxy, no store submit. No new dependency. USGS topo tiles from 010 remain. The 014 TxGIO parcels overlay stays as it is. Sun math and shooting-light math stay on-device. The shooting-light table, state text, and note do not change. Beau's design is never redrawn, recolored, or re-lettered.
- This public job tree stays free of secrets. Do not commit signing keys, store credentials, or EAS tokens. The source JPGs are Beau's art and are not secrets; they belong in the product repo, unmodified, not in this SoftwareFactory ticket.
- Do not edit any Job 001–015 files, except the CLI status moves on job 015 after the real UI check.

## Design intent (one line)

The home screen says Nock, Beau's mark is unchanged except for crop, key, and size, the Forecast control is rounded glass, and one tap still brings the map back.
