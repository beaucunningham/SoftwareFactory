# Brief — Job 019: Nock polish, parcels at zoom 12, wind streamlines, keyboard, rotation, camera

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `019-nock-polish-parcels-wind`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: product `main` at `25626283c55778c83f39c9b4fef9265bd1ca6310` (short `2562628`). Jobs 017 I1–I6 and 018 have landed. Do not follow an older tmp product URL. Do not open on anything older than that commit.  
**Stack:** Expo SDK 57 (patch levels per 015), React Native, expo-router, react-native-maps (Apple Maps on iOS; `WMSTile` for parcels, `UrlTile` for USGS Topo), expo-splash-screen, 009/014 glass (`expo-glass-effect` / `expo-blur`, 014 H1 backing rules), 010/017 `WindSource` stub (sampled per lat/lon), 012 static wind arrows, `@shopify/react-native-skia` + `react-native-reanimated` (J7 only; see Dependencies).  
**Build on:** product `main` `25626283c55778c83f39c9b4fef9265bd1ca6310`. Do not regress Jobs 005–018. **All existing tests stay green (313+ at that base; the count is likely 318). The builder records the real count at that base and after each product PR.** New tests are added on top. **No new dependency unless the product PR justifies it.** The only pre-justified re-add is `@shopify/react-native-skia` or Reanimated, via `npx expo install`, and only if one of them is missing at that base. `react-native-keyboard-controller` is allowed only for J8, and only when the PR shows KeyboardAvoidingView, keyboard events, or Reanimated `useAnimatedKeyboard` cannot meet J8. `expo-system-ui` is allowed only for J4, and only when the PR shows it is required to stop a light flash. Nothing else.  
**Related:** `ac.md` (copy of `AC_NOCK_POLISH_PARCELS_WIND_v0.md`, plus the 1:30am, 1:33am, 1:36am, and 1:37am decisions) · Job 017 I1–I6 and Job 018 on `2562628` · Job 014 H1 glass and H4 property lines · Job 015 Map freeze fix · Job 016 brand · Job 012 wind arrows · Job 010 Topo and the Skia wind failure · `note.md` (UI-check screenshots stay out of the product repo; merges go through the normal permitted path only)  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** One Origin product pull request per milestone, in this order: **J1+J2** (may share one, because both touch the sun stack), **J8** (its own small PR), **J9** (its own small PR), **J10** (its own small PR), **J3**, **J4**, **J5**, **J6** (one each), **J7** (its own PR, last). J7 accounts for the J9 camera heading. J7 cannot block J1–J6, J8, J9, or J10. Each product PR merges through the normal permitted path only. After a lower PR is squash-merged, the next PR is rebuilt on the new main on a fresh branch (never force-pushed). The builder writes `factory/jobs/019-nock-polish-parcels-wind/build.md` in this repo and documents everything listed under Constraints, including token usage. Lane runs the iOS Simulator sweep and captures the shots and recordings listed in Constraints for the ui worker.

Beau's go came via Finley at 1:21am CT on 2026-10-01. Status: **FINAL, approved to build.** **The AI's user-facing name stays Scout.** **USGS The National Map `USGSTopo` tiles stay approved.** Weather and wind stay stubs, with no keys or spend, sampled per lat/lon. This brief is approved and final for Kai. Decisions for Beau below are **locked defaults**. The alternatives, and every Later item, are **out-of-scope Beau gates**. Do not wait. Do not build the alternatives.

**Sage decision 2026-10-01 1:30am CT (Beau).** This replaces Decision 2. Remove every visible "Map center" / "at map center" fallback string, including the sun stack, the shooting-light popover source note, and the Forecast caption. "Last known location" and "at last known location" go with them. The fallback **logic** stays (`gps` → `lastKnown` → `mapCenter`). Do not build the old default that kept those source lines.

**Delta 2026-10-01 1:33am CT (Beau).** J8 keyboard avoidance. The tap-to-pin popup sits fully above the keyboard. Own small PR after J1+J2.

**Delta 2026-10-01 1:36am CT (Beau, approved 1:35am CT).** J9 map rotation and reset-north. Own small PR after J8 and before J10, so J7 (last) can account for heading.

**Delta 2026-10-01 1:37am CT (Beau).** J10 keeps the camera position. Own small PR after J9 and before J3.

Chrome north star: Job 003/006–018 quiet field tool: dark by default, calm neutrals, burnt orange `#BF5700` for accents only, pin style A. Beau's logo colors stay on the splash, icon, and sign-in/tour art except where J3 and J4 derive the N mark and the wordmark by crop, key, and resize only.

## What to build

Priority order is the delivery order above. Keep this scope exactly. Nothing else.

| Milestone | Beau item | What |
| --- | --- | --- |
| **J1** | 5 | Remove visible fallback text from the sun stack, the shooting-light popover, and the Forecast caption. 017 I6 fallback logic unchanged |
| **J2** | 6 | Tighten the sun-stack glass pill to hug its content; 44pt via `hitSlop` |
| **J8** | keyboard | Tap-to-pin popup fully above the keyboard. No autofocus. Same for pin rename, log-hunt notes, and Pins search |
| **J9** | rotation | Two-finger rotation. Native compass off. Compass button above locate-me, only past about 2°, reset north in about 300ms |
| **J10** | camera | Map return restores the exact last camera. No auto-fit. Persists per account |
| **J3** | 3 | Top-center "Nock" text becomes the N mark, just under the status bar / Dynamic Island |
| **J4** | 4 | In-app N + NOCK wordmark loading screen, and native splash = wordmark on dev/standalone |
| **J5** | 7 | Remove the watermark-like box over Property lines / Topo. Keep a small compliant attribution |
| **J6** | 1 | Property lines when zoomed out. Honest tile math. Floor zoom 12. Hint below it |
| **J7** | 8 | Wind streamlines on the UI thread. Reduce Motion, or a perf miss, uses the 012 arrows. Own PR, last |
| (none) | 2 | Tap with Property lines on drops a pin. **No change** |

**Bar order stays: Map | Pins | Forecast | Scout.** Map stays the default home. The top-right three-line You menu is unchanged. The user-facing word is **pin**.

**Network:** no new map source. No TxGIO `identify`. No TxGIO `query`. Parcels stay the server-rendered `export` raster. No keys, no tokens, no accounts, no proxy, no spend. No store submit. No bundle-id or scheme change.

## Build order

1. **J1 + J2**, one PR or two. Remove the visible fallback text. Tighten the pill. Glass stays mounted.
2. **J8**, its own small PR. Keyboard avoidance on the named fields.
3. **J9**, its own small PR. Rotation and the compass button.
4. **J10**, its own small PR. Restore the last camera. Stop the automatic fit on Map focus.
5. **J3**, its own PR. N mark.
6. **J4**, its own PR. Loading wordmark and native splash.
7. **J5**, its own PR. Name the box with evidence, then remove it.
8. **J6**, its own PR. Honest tiles, floor 12. If Dallas p95 at 12 exceeds about 5s on Lane's normal connection, propose 13 back to Sage with the data. Do not ship a silent change.
9. **J7 last**, its own PR. Streamlines that account for heading. If the perf bar or the 010 guard fails and cannot be fixed in that PR, ship `WIND_RENDERER: 'arrows'` and report. J1–J6, J8, J9, and J10 still ship.

Run the full existing suite plus the new tests, and the 014–018 regression checklist, before each hand-off to Lane.

### Builder constraint: no Simulator in the cloud

Cloud builders run on Linux and **cannot run the iOS Simulator**. For every milestone the builder:

- **Traces the code deeply.** Write down every path that mounts, positions, restyles, or removes the touched views. Cite file and line at `2562628`.
- **Reasons from source** for the lockfile versions (`AIRMapWMSTile.m`, `AIRMapUrlTile*.m`, expo-splash-screen, Skia, Reanimated/worklets, `expo-glass-effect`, `expo-blur`), citing file/line or docs. Beau tests in Expo Go, so also cite what Expo Go SDK 57 bundles (`expo/bundledNativeModules.json` at the lockfile version). Anything Expo Go does not ship cannot be used.
- **Writes unit and component tests** (Jest, `testID`s, mocked `fetch`, `AppState`, `AccessibilityInfo`, navigation focus, fake timers).
- **Hits the live services from Linux with `curl`** for J5 and J6 and records the numbers.
- **Writes exact Simulator steps for Lane (Mobile).** Lane runs them on the Simulator. Where Expo Go and a dev build differ, Lane runs both: **J4 always**, and **J7 performance**. Lane runs **J8** on iPhone SE (3rd gen), iPhone 15, iPhone 15 Pro Max, and a real iPhone. Lane runs **J9** and **J10** on those three Simulators and records whether Expo Go and a dev build differ. If Lane's result disagrees with the trace, the PR goes back to the builder before merge. Do not patch around it.

## J1. Remove visible fallback text (Beau item 5, plus the 1:30am call)

- **Remove** the visible third line ("Map center" / "Last known location", and any other fallback text) from the Map sun stack. The stack shows only the sunrise row and the sunset row in every mode.
- **Keep** 017 I6's `resolveForecastPoint` and every fallback behavior: `gps` → `lastKnown` → `mapCenter`, recompute on map settle in `mapCenter` mode, refresh rules, permission timing. Only the visible wording goes. Delete the render branches and styles. Do not hide them: no reserved height, no empty row, no `opacity: 0` text.
- **1:30am call, replacing Decision 2.** The shooting-light popover and the Forecast caption also lose visible fallback wording in every mode. Absent strings include "At map center (location off)", "At last known location", "at map center", and "at last known location". Delete those branches the same way. The GPS-success phrases "At your location" and "at your location" may remain when the source is `gps`. The builder records that. Do not keep the old default.
- **No tiny dimmed icon** in place of the stack label.
- **Accessibility:** the stack's VoiceOver label may still say where the times are for. That is non-visual. The builder records the decision. It is not required.
- **Glass:** the backing stays mounted and keeps its key across the label removal and every source change (014 H1 / 017 tests stay green). New assertions: no label node in any source, and no fallback source string on the popover or the Forecast caption in `mapCenter` and `lastKnown`.
- **Tests:** update 017's label tests to assert absence. Keep `resolveForecastPoint` truth-table tests unchanged. Record each changed test.

## J2. Tighten the sun-stack pill (Beau item 6)

- The glass container sizes to its two rows. Start at horizontal padding 9pt (8–10 allowed), vertical padding 6pt, row gap about 2pt. Icon about 14pt. Time about 13–14pt semibold with tabular numerals. Corner radius matches the glass family (10–12pt if there is no token). Record the finals. No fixed width or `minWidth` wider than the content. The "—" state hugs too.
- Hit area is at least 44×44pt via `hitSlop`, computed from the measured size (`max(0, (44 − h) / 2)` and the same for width). The slop does not overlap the N mark, the You menu, locate-me, or Map Tools. Tap still opens the shooting-light popover (013 G3 + Delta).
- Same top-left position as 017 I2. The resize is style only: no conditional render, no re-key, no new wrapper, no animated resize, no `opacity`.
- Popover arrow stays on the stack (±4pt) via 012 `placeTooltip`. Tour step 2 is re-measured (arrow ±4pt, SE and Pro Max, first run and replay). Copy and step count stay 8.
- Text contrast stays at least 4.5:1 over bright Satellite through the glass. Reduce Transparency uses solid dark, same size.

## J8. Keyboard avoidance (Delta 1:33am CT)

When Beau drops a pin, the keyboard covers the tap-to-pin popup ("Name this pin", type picker, county CAD row, Save/Cancel).

- The popup sits fully above the keyboard. Use `KeyboardAvoidingView`, or the keyboard height from keyboard events or Reanimated `useAnimatedKeyboard`. No new dependency unless `react-native-keyboard-controller` is clearly justified in the PR. If the content is taller than the space left, the focused field scrolls into view.
- The name field does not autofocus. The default "Pin n" name is fine. The keyboard opens only when the user taps the name field.
- A tap on the popup background outside the field dismisses the keyboard. It does not close the popup or cancel the pin. The return key reads "Done" and dismisses. Save with the keyboard open saves in one tap and closes both. Cancel removes the provisional pin and closes the keyboard.
- The map does not pan or jump when the keyboard opens or closes. The provisional pin stays visible above the popup where space allows.
- The same behavior applies to pin detail rename, the log-hunt notes field, and Pins search. A Done or dismiss-on-scroll is fine for lists.
- Show and hide have no layout flash. No `opacity` on a glass ancestor or on the Map scene. 014 H1 and 015 stay green.
- Lane checks SE, iPhone 15, iPhone 15 Pro Max, and a real iPhone.

## J9. Map rotation and reset-north (Delta 1:36am CT)

- Enable two-finger twist rotation (`rotateEnabled`). Pan and zoom still work. Pitch and tilt stay off unless they are already on at `2562628`. This is not follow-me and not heading mode. Those stay Later.
- Compass button: a 44pt or larger glass round button stacked directly above locate-me. The column is Map Tools, then locate-me, then the compass, with even spacing. The needle or N tracks the heading live. It appears when the heading is more than about 2° from north and hides at north-up. A tap animates the camera to heading 0 in about 250–300ms, then the button hides.
- Show and hide by mount or scale. Never fade a parent to `opacity` 0. Turn off the native MapKit compass (`showsCompass={false}`) so only one compass shows.
- While rotated: a pin tap opens that pin, tap-to-pin drops at the tapped point, property lines align with the basemap, and the ruler measures correctly. Locate-me either recenters without resetting heading, or recenters and resets it. Pick one and state it in the PR. Wind arrows stay geographically correct through the camera heading. J7 streamlines must do the same and must not undo this. Sun stack, wordmark, and controls stay screen-fixed.
- No `opacity` < 1 on a glass ancestor or on the Map scene. Locate-me stays directly above Map Tools when the compass is hidden.

## J10. Keep the camera position (Delta 1:37am CT)

Returning to the Map tab restores the exact last camera. It does not auto-fit the pins.

- **Restore.** Center, zoom, and heading (J9) come back when the user returns from Pins, Forecast, Scout, or pin detail. No jump. No second animation that recenters. No automatic `fitToCoordinates` on Map focus.
- **Persist per account.** The camera is saved for the signed-in account and restored after a kill and relaunch. Another account does not inherit it. Do not change the storage keys that keep pins, logs, the tour flag, and settings.
- **Fit-to-pins** runs only on the first run for that account, when no camera is saved yet, or when the user takes an explicit action. Map Tools "Fit to pins" stays that explicit action. This supersedes the 004/005 behavior "leave and return to Map: fit-to-pins".
- Locate-me and the J9 compass reset still move the camera. The camera they leave is the one that is restored. Do not add follow-me.
- **No fade and no freeze.** The restore does not set `opacity` on the Map scene or on a glass ancestor, does not remount `MapView`, and does not touch the 015 tab config. One tap still returns to Map, and the map is interactive. 014 H1 stays green.
- The builder traces every focus path that fits or animates the camera and names which ones remain. Tests cover: saved camera is not a fit; a second focus restores; first run with no camera may fit once; the saved payload includes center, zoom, and heading; the key is the account.

## J3. Top-center N mark (Beau item 3)

- Replace 017 I1's "Nock" text on the Map with an image of the N mark. Delete the text component and its styles. Update the tests and record each one. Splash, app icon, and sign-in/tour logo are unchanged by this milestone (J4 touches the splash).
- Derive it from `nock-app-icon.jpg` (1408×1408, already committed by 016) by crop, key, and resize only. No redraw, recolor, stroke, or baked shadow. The cream/rust bbox measured on Sage's box is x 429–991, y 349–1006. With about 24px padding the crop is about 611×706. The drawn outline (about x 225–1183) stays outside the crop. Key black to transparent with color-to-alpha (unpremultiply against black), not a hard threshold, so edges have no dark fringe. The triangle stays the art's rust, not `#BF5700`.
- Resize to @1x/@2x/@3x for about 28pt tall (26–32 allowed). Example for 28pt: 24×28, 49×56, 73×84. Record the final. PNG with alpha, for example `assets/brand/nock-n-mark{,@2x,@3x}.png`. Reuse 016's derivation script if it exists and add an `n-mark` target. If it does not, commit a script under `scripts/brand/` that uses a tool already in the repo, or a documented one-off CLI such as ImageMagick with the command in the script header. No new npm dependency. The PR includes a side-by-side of the source crop and the exported @3x over black and over mid-gray.
- Placement: horizontally centered, top edge at `insets.top + 2pt` (±2), inside the safe area, never over the Dynamic Island or the status bar glyphs. Higher than 017's text. Record old and new top offsets for SE (3rd gen), iPhone 15, and 15 Pro Max. Fixed size, not affected by Dynamic Type.
- Legibility: a subtle image shadow, for example `shadowColor #000`, `shadowOpacity` 0.6–0.75, `shadowRadius` 3–4, `shadowOffset {0, 1}`. No `backgroundColor` and no `overflow: hidden` on the image or its wrapper. No pill, chip, or glass. Lane stills on bright Satellite (31.9, −102.3), mid Topo, and dark Standard.
- `pointerEvents="none"`. Pan, pinch, pin taps, and tap-to-pin under it work. VoiceOver either skips it or reads "Nock" as a header. Never a button. Map tab only. Clear of the sun stack (including hit slop), the You menu, and the tour bubbles.
- The N mark is not an ancestor or a sibling wrapper of any glass view. Adding it creates no new parent around the sun stack or the You menu.

## J4. Loading wordmark and native splash (Beau item 4)

- **Expo Go:** the native launch is Expo Go's own loading UI, which shows the project icon (the N). The 016 splash config does not apply there, or applies only partly. The builder records what Expo Go SDK 57 actually shows, and Lane captures it.
- **Dev build / standalone:** the native splash comes from the expo-splash-screen config (016 F3: N + NOCK on black). Confirm at `2562628` that it points at the wordmark, not the icon, on `#000000`. Fix it if it does not.
- **JS loading screen** in Expo Go and in builds: full-screen `#000000` with the full N + NOCK wordmark, including the rust underline, centered. Derive it from `nock-logo-wordmark.jpg` by crop, key, and resize only. Bright-pixel bbox x 390–1019, y 328–1066. Key with color-to-alpha. The JPG's black is `rgb(1,1,1)`, so an unkeyed JPG shows a faint box. Reuse 016's keyed wordmark if it already includes the underline. The pin glyph inside the triangle stays as drawn.
- Size and position match the native splash (same width in pt, centered in the full window, not the safe area). Suggested width about 200pt. Record it.
- Visible at least about 600ms from the loading screen's first `onLayout`, and longer if init is not done. Gives up at about 8s and proceeds to the normal error or empty handling. Never traps the user. The builder lists the real init tasks: fonts if any, AsyncStorage hydration, auth or session hydration, and anything else gating the first route.
- `SplashScreen.preventAutoHideAsync()` at module scope if it is not already there, then `hideAsync()` only after the JS screen has laid out. In Expo Go those calls are harmless. Cite the installed expo-splash-screen behavior in Expo Go.
- No white flash. Root view, navigation theme, and every container between the native root and the first screen are `#000` or the theme background. Check `expo.backgroundColor` / `ios.backgroundColor`. Add `expo-system-ui` only if this SDK requires it, and justify it. Mount the app under the loading screen. Remove the loading screen only after the first screen (Map, or sign-in) has laid out.
- No fade. The overlay is a sibling above the app, never a parent. Hard cut on unmount. No `opacity` on the app tree or the Map scene. The auto tour cannot start while the overlay is up (treat it as a modal) and starts normally after, per 014 H3. VoiceOver: "Nock, loading".
- Native splash config: keyed wordmark, `backgroundColor` `#000000`, `imageWidth` equal to the JS width, dark variant the same. The app icon stays the N.
- Tests: `shouldDismissLoading({ initDone, elapsedMs, firstScreenLaidOut, timedOut })` (599ms no; init + layout + at least 600ms yes; 8s yes); a fake-timer component test; no ancestor opacity below 1 on the Map scene during or after; splash image path is the wordmark and the background is `#000000`.
- Lane captures Expo Go and a dev build, dark and light, signed out, and offline.

## J5. Remove the watermark-like box (Beau item 7)

Sage checked the services from Linux on 2026-10-01, about 1:22–1:27am CT. The builder re-verifies and records the date and time.

- USGS Topo in Texas, z8–z16: 200 JPEG, opaque, normal topo. Cached tiles stop at z16. z17–z20 in Texas: 404 HTML, not an image. Outside the US: blank light opaque tiles, or 404 offshore.
- TxGIO `export` outside Texas, beyond max scale, or with unsubstituted placeholders: 200 PNG, fully transparent. Broken `dynamicLayers`: 200 text, not an image. `export` without `transparent=true` (or `format=jpg`): 200 image, about 100% opaque near-white. That looks like a watermark box.
- Neither service returned a logo or a "no data" image in the cases Sage tried. The box is an opaque parcel tile, a blank USGS tile outside coverage, or an app view (a long attribution, a placeholder, or a stale overlay).
- `maximumNativeZ` on `WMSTile` / `UrlTile` switches iOS to the cached overlay, which passes the HTTP body through regardless of status and crops parent tiles with Core Image. The builder checks that path against our transparent PNGs for the lockfile version.

Investigation, in the PR:

1. Inventory every view and overlay while Topo and/or Property lines are on. Cite file and line. Include URL templates, `tileSize`, opacity, min/max/native Z, `shouldReplaceMapContent`, and every attribution, hint, badge, probe, and placeholder.
2. Decode every mounted parcel template and curl one tile per band at Dallas (32.81, −96.75) z13 and z15. Report percent opaque. An opaque tile is the box.
3. Lane screenshots the box at base (location, zoom, style, layers) and toggles Topo and Property lines independently.
4. Name the root cause with evidence, plus a test that fails before and passes after where that is testable.

Fix it at the source. Do not cover it. Do not lower opacity on a parent. If USGS outside-coverage tiles are involved, cap `maximumZ` / `maximumNativeZ` at 16 (011 E2) and leave the non-US case as the existing quiet "Topo is US-only" behavior (010 D1).

Attribution stays compliant and small. This is the locked default:

- USGS, while Topo is on: a short credit naming USGS / The National Map.
- TxGIO, while Property lines are on: "Property lines: TxGIO, Texas appraisal districts. Not a survey." A short form may be used if it keeps "TxGIO" and "not a survey".
- One small text line, no box and no glass, 10–11pt, light text with a soft dark shadow, bottom-left above Apple's logo and Legal. Legal stays visible and untouched. Truncation never hides "Not a survey." When both layers are on, a short form such as "USGS The National Map · Property lines: TxGIO, not a survey".
- Full credits live in Map Tools → "Map credits" (or You → About): USGS's acknowledgment ("Map services and data available from U.S. Geological Survey, National Geospatial Program."), the TxGIO line, and "Coverage varies by county." Record the final copy.
- The line never overlaps Map Tools, locate-me, the compass (J9), the glass bar, the wind badge or legend, the zoom hint, pin popups, or Apple Legal. Check SE and Pro Max for every Topo × Property lines × Wind combination.
- The 014 status lines stay ("Zoom in to see property lines", "Property lines cover Texas only for now", "Property lines couldn't load. Check your connection."). One line at a time, same small style. Suggested priority: error, then Texas-only, then zoom hint, then attribution. Record the order.

## J6. Property lines when zoomed out (Beau item 1)

Sage measured the service on 2026-10-01, about 1:22–1:26am CT. The builder re-verifies.

- Service and layer `minScale` 1:500,000, `maxScale` 1:1,000. Unchanged since 014.
- Server scale = bbox width in meters (EPSG:3857) ÷ (image px ÷ dpi × 0.0254). It draws only when scale ≤ 500,000.
- A standard 512px tile at dpi 192: z10 is 1:577,791 and always empty. z11 is 1:288,895 and draws. Do not misreport dpi. z10 at dpi 96 draws, takes 5.5–6.6s per urban tile, and hazes the city. That is forbidden.
- Dallas at z11 with the 017 hairline is 3.2–3.5s per tile, 47.5% of pixels at alpha ≥ 200, and 5.9s for a full screen. At z12 the same city is about 1.4–1.5s and a full screen about 3.1s. A thinner band Z (cream width 0.25, alpha 140) at Dallas z12 has 0.0% of pixels at alpha ≥ 200. z11 is still a haze. Floor 12 is the locked default. Floor 11 is an out-of-scope Beau gate.

The builder says which of these are real, with evidence:

- (a) The 017 client gate at display zoom 13.
- (b) Tile z / bbox math. With `tileSize` 512, MapKit can request one z lower than the display zoom.
- (c) The JS zoom formula disagreeing with MapKit.
- (d) Server `minScale` (display zoom 11 is the honest server floor).
- (e) Density and time, which set the practical floor at 12.

**Tile math.** Every parcel request's server scale equals the standard web scale of the displayed zoom, ±1%. Recommended: `tileSize={256}` with a literal `size=512,512&dpi=192` in the template. Or 512pt tiles with a literal `size=1024,1024&dpi=192` if the builder shows that performs better. No fake-dpi hack. `serverScaleFor({ z, sizePx, dpi })` is tested: z11 at 512/192 → 288,895 ±1%; z10 → 577,791 and is never requested.

**Bands**, all outline-only (`esriSFS` + `esriSFSNull` + alpha-0 fill + `esriSLS` outline, `png32`, `transparent=true` exactly once, 017 I4 rules):

- Band Z, display z12–12.99: cream `[255,236,190,140]`, width 0.25, no casing.
- Band A, z13–14.99: 017 hairline `[255,236,190,170]`, width 0.4, no casing.
- Band B, z ≥ 15: cream 0.6 over dark casing `[0,0,0,140]` width 1.4.

Widths assume 512px images at dpi 192. Tune with Lane stills and record. `minimumZ` / `maximumZ` are in MapKit `path.z` terms, consistent with the tile math. Stable keys. Mounted only while the layer is on and the map is in Texas.

Below 12: no parcel requests, and the small line "Zoom in to see property lines" shows while the layer is on.

**Measurements required** with the final template, from Linux, plus Lane on device: per-tile time, KB, percent non-transparent, percent alpha ≥ 200, and percent alpha ≥ 100 at Rockwall, Dallas residential, Llano, and one more rural county (Brewster or Lufkin 31.34, −94.73) for z11, z12, and z13. At z12, Dallas has at most about 5% of pixels at alpha ≥ 200 and Llano is under 10% non-transparent. Tile requests per screen at display zoom 12.0 and 12.9 on SE (375×667) and 15 Pro (393×852). p50/p95 time to the last tile for a cold pan at Dallas and Llano. If Dallas p95 at 12 exceeds about 5s, take the data back to Sage before merge.

Unchanged from 014/017: off by default, persists `mapLayer.propertyLines.v1`, z-order, no `shouldReplaceMapContent`, no disk tile cache, TX-only `isInTexas`, health probe uses the current band and the same tile math, offline line, no remount on toggle, no identify/query.

Tests: `serverScaleFor`; band selection (11.9 none + hint, 12.0 Z, 12.99 Z, 13 A, 14.99 A, 15 B); URL builder per band with literal size and dpi; probe uses the band and the math. Update 017's "12.9 → none / 13 → A" tests and record them.

The PR includes MapKit `path.z` at display zoom 11.0, 12.0, and 13.0, from source and from Lane's captured request URLs.

## J7. Wind streamlines (Beau item 8; own PR, last)

010's Skia particles blanked the map and froze touches: the canvas had no `opaque={false}` and the loop ran on the JS thread. 011 and 012 shipped static arrows. 017 I5 samples `WindSource` per lat/lon. This PR does not block anything before it.

- Look: thin white or translucent lines, about 1–1.5pt, round caps, fading trails (tail alpha to 0). Speed shows as motion plus line alpha (about 0.35 calm to 0.85 at the top of the legend). No orange. No fills. A faint dark under-stroke is allowed only if white fails on bright Satellite, and it is recorded.
- On map settle (`onRegionChangeComplete`, debounced 250–500ms), sample a grid over the visible region (about 8×12 to 12×16), convert to screen-space px/s, Mercator-correct in y, and rotate by the J9 camera heading. Hand the field to the UI thread as a shared value. Interpolate across the 0.05° stub cells. Wind from the north moves down the screen at heading 0, and screen-left-to-right at heading 90°. If the map is pitched, use the static arrows. J9 leaves pitch off unless it was already on.
- Particle count = `clamp(round(width × height / 650), 300, 600)`. Lifetime about 2–4s. Trail of about 6–10 points, drawn as a few batched paths by alpha bucket, not one draw per particle.
- `@shopify/react-native-skia` `<Canvas opaque={false}>` plus Reanimated `useFrameCallback` (or Skia's Reanimated clock). Particle state advances in worklets. No per-frame `setState`, `requestAnimationFrame`, `setInterval`, or `Animated` loop on the JS thread. Do not fade trails with a full-screen translucent rect.
- On pan or zoom, pause and clear (draw nothing; no wrapper opacity). Resume within about 300ms of settle. The gesture flag is set once.
- Stop all per-frame work when Wind is off (canvas unmounted), the Map tab is unfocused, the app is not `active`, or a gesture is in progress.
- Reduce Motion uses the 012 static arrows, and those arrows also respect heading. Switching does not remount `MapView`.
- "Sample wind" badge and the mph legend show whenever wind is drawn. The legend matches the alpha ramp. Placement stays clear of the bar, Map Tools, locate-me, the compass, the J5 line, and the sun stack.
- The canvas is a sibling above `MapView` and below all RN chrome. It is not a child of `MapView`. `pointerEvents="none"`. It never takes touches.
- Kill switch: `WIND_RENDERER: 'streamlines' | 'arrows'`. If Lane's perf or the 010 guard fails and cannot be fixed here, ship `'arrows'` and report.

**010 regression guard.** Each item is a named test or a Lane check:

1. `<Canvas opaque={false}>`. No `<Fill>`, no full-size `Rect`, no `backgroundColor` on the canvas or its wrapper.
2. Wrapper `pointerEvents="none"` and `StyleSheet.absoluteFill`. No gesture handler wraps it.
3. The canvas is never a child of `MapView`. Toggles and renderer switches never change `MapView`'s `key` or `mapType` and never remount it.
4. Per-frame work runs in worklets. JS work is only on settle and on lifecycle changes. JS fps stays at least 55 with wind on.
5. Particle count is at most 600. Trail length is bounded.
6. Fully stopped when off, unfocused, backgrounded, or gesturing.
7. No opacity animation on any wrapper.
8. Static render test for `opaque`, `pointerEvents`, no `Fill`, and a stable `MapView` key across 20 toggles. Pure tests for `particleCount`, `sampleGrid`, `stepParticle` (from-N moves +y, respawn, NaN-safe), and heading rotation (heading 90° points screen-left-to-right for a from-north field).
9. Lane re-runs the 011/012 20-toggle test and the 2-minute soak with streamlines.

**Performance.** Perf Monitor UI and JS fps on the Simulator, plus Skia debug or Instruments if available. Record device and iOS version. Scenarios: wind off; wind on idle 30s (Satellite, Dallas, 20+ pins); pan 10s; pinch 10s; Pro Max at 600 particles; and the same with the map rotated. Targets: UI 55–60 fps p50 while animating (min at least 50); JS at least 55; during gestures, map UI fps within about 3 fps of wind-off; resume within about 300ms; no memory growth over the 2-minute soak. Lane records Expo Go and a dev build where they differ. If Skia is not in Expo Go's `bundledNativeModules.json`, Expo Go shows arrows and builds show streamlines.

Use the Skia and Reanimated already in the repo. Re-add a missing one with `npx expo install` only. That is the one pre-justified dependency.

## Item 2. No change

A map tap with Property lines on opens the tap-to-pin popup. In Texas that popup already shows "<County> County appraisal district ›" (018). There is no parcel query. Any parcel-specific tap needs `identify`, which returns owner fields and is banned. **No change.** After J8, that same popup also clears the keyboard checks.

## Regression (014–018 must hold)

014 H1 glass matrix at the tightened sun stack, and at the compass when it is showing. 014 H2 Pins "Log a hunt". 014 H3 tour (8 steps, step 2 re-measured, auto-launch never over a modal, the loading screen, or the keyboard). 014 H4 property lines at the new floor. 015 tab switching (smooth, one tap, no freeze), including with streamlines, Property lines, the keyboard, and a rotated map. 016 rename, N icon, sign-in/tour logo. 017 locate-me above Map Tools, "My location" gone, outline-only parcels, per-pin stub forecast, GPS sun times with silent fallback. 018 CAD link, no identify/query, no owner or phone fields. Forecast tab. 013 floor zoom. 012 arrows under Reduce Motion. 010/011 Topo plus the J5 attribution. 008 ruler. Dark default. Pin style A. No data lost.

The 004/005 "leave and return to Map: fit-to-pins" check is superseded by J10. Return restores the last camera. Fit to pins remains the explicit Map Tools action, and the first run when nothing is saved.

## Research

- **Base:** `25626283c55778c83f39c9b4fef9265bd1ca6310`. 017 I1–I6 and 018 have landed. 313+ tests, likely 318. Record the real count.
- **Names:** the app is **Nock**. The AI stays **Scout**. Topo stays USGS `USGSTopo`. User-facing word is **pin**.
- **Nav lock amendment (2026-10-01, Job 019 approved, Beau GO 1:21am CT via Finley), as handed.** Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. The new amendment, in full:

  > Amendment 2026-10-01 (Job 019 approved, Beau GO 1:21 AM CT via Finley). Base main `2562628` (Jobs 017 and 018 landed). Tabs stay **Map | Pins | Forecast | Scout** (Map default); You menu stays top-right.
  > - **Correction to the 017 amendment:** the parcel tap popup did **not** ship (017 I7 stopped: TxGIO `identify` always returns owner data). Job 018 added a **"<County> County appraisal district ›"** row to the tap-to-pin popup and pin detail instead. With Property lines on, a map tap drops a pin (no change in 019). Owner names and phone numbers never appear in the app (permanent), and the app makes no TxGIO identify/query calls.
  > - **N mark top center:** the Map's top-center branding is Beau's **N mark** (cream N + rust triangle, derived from the app icon by crop/key/resize, transparent, no box or outline), just under the status bar / Dynamic Island, non-interactive. Supersedes 017's "Nock" text.
  > - **Sun pill tightened:** the top-left sunrise/sunset glass hugs its two rows (about 8–10pt horizontal, 6pt vertical padding), with a 44pt+ target via hit slop.
  > - **No fallback label:** the sun pill never shows "Map center" / "Last known location". GPS-first with a silent fallback; the popover and Forecast caption still name the source.
  > - **Wind streamlines:** the Wind layer draws animated Windy-style streamlines on stub data (UI-thread Skia/Reanimated), pausing during map gestures. Reduce Motion (or a perf fallback) shows the static arrows.
  > - **Launch:** a full N + NOCK wordmark loading screen on black (≥ ~0.6s, no white flash) in Expo Go and builds; the native splash (builds) is the wordmark; the app icon stays the N.
  > - **Property lines** show from about zoom **12** (was 13; the server can't draw wider than about zoom 11), with "Zoom in to see property lines" below. Map attribution is one small line (no box), with full credits in Map Tools.

The 1:30am call supersedes the sentence "the popover and Forecast caption still name the source." Those visible fallback lines go too. The logic stays. J8, J9, and J10 are approved additions and are not in that handed amendment. Workers still do not edit the lock file in job 001.

- No live weather or wind. No schema change except the per-account camera J10 saves. Storage keys from 016 stay so an existing install keeps pins, logs, the tour flag, and settings.
- Do not edit Job 001–018 files.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### J1

- [ ] Sun stack is two rows in `gps`, `lastKnown`, and `mapCenter`. No fallback text and no dimmed icon. The render branch is deleted
- [ ] Popover and Forecast caption have no "Map center", "at map center", "Last known location", or "at last known location"
- [ ] `resolveForecastPoint` truth-table tests are unchanged. Glass key and mount are unchanged

### J2

- [ ] The pill hugs its content, including the "—" state. Hit area is at least 44×44 via `hitSlop`. Slop does not cover other controls
- [ ] Resize is style only. Tour stays 8 steps. Step 2 arrow is on the smaller pill (±4pt)

### J8

- [ ] Dropping a pin does not open the keyboard. The name field is not autofocused
- [ ] With the keyboard open, the whole popup is above it on SE, 15, Pro Max, and a real iPhone. The focused field scrolls into view if needed
- [ ] Tap outside or Done dismisses the keyboard and keeps the popup and the provisional pin. Save is one tap. The map does not jump
- [ ] Pin rename, log-hunt notes, and Pins search do the same

### J9

- [ ] Two-finger rotation works. Pitch stays off unless it was already on. Native compass is off
- [ ] The compass button shows only past about 2°, sits above locate-me, is at least 44pt, tracks heading, and resets to north in about 300ms or less
- [ ] Show and hide use mount or scale, never an opacity fade
- [ ] Pins, tap-to-pin, property lines, the ruler, and wind stay geographically correct while rotated

### J10

- [ ] Returning to Map restores the exact last center, zoom, and heading. No auto-fit
- [ ] That camera persists per account across a restart, and does not leak to another account
- [ ] Fit-to-pins runs only on first run with no saved camera, or on an explicit action such as Map Tools "Fit to pins"
- [ ] The restore does not fade the map, remount `MapView`, or freeze a tab switch

### J3

- [ ] The Map brand is the keyed N mark, transparent, not redrawn, top edge at `insets.top + 2pt`, about 28pt, not a button
- [ ] Splash, icon, and sign-in/tour logo are unchanged by this PR

### J4

- [ ] JS wordmark screen on black for at least about 600ms and at most about 8s, in Expo Go and in a dev build, with no white flash and no fade
- [ ] Dev/standalone native splash is the same wordmark on `#000000`

### J5

- [ ] Root cause is named with evidence. The box is gone at the source
- [ ] Attribution is one small line plus a Map credits row. It does not cover Apple Legal or a control

### J6

- [ ] Server scale matches the displayed zoom ±1%. Literal size and dpi. No dpi trick. Floor is display zoom 12
- [ ] Bands Z / A / B, outline-only, TX-only, no identify/query. Measurements are in the PR

### J7

- [ ] Streamlines run on the UI thread with `opaque={false}`, or the PR ships arrows and says why
- [ ] The 010 guard items each have a named test or Lane check. Perf numbers meet the targets or the kill switch is `'arrows'`
- [ ] Heading from J9 is accounted for. J7 does not block the earlier PRs

### Item 2 and guardrails

- [ ] A tap with Property lines on still drops a pin and shows the 018 CAD row in Texas. No parcel query
- [ ] All existing tests pass at every PR. Count recorded at `2562628` and after each PR
- [ ] No unjustified dependency. No keys, tokens, accounts, spend, or proxy
- [ ] UI-check screenshots are not committed to the product repo
- [ ] No Job 001–018 file is edited

## User-facing UI

Open Nock and the full logo greets you, on black, with no flash. On the map, just the N sits quietly at the top. Sunrise and sunset are a tight glass pill with no extra words. The keyboard does not cover the pin popup. A two-finger twist rotates the map, and a compass brings it back to north. Leaving the map and coming back puts you where you left the camera. Property lines appear one zoom sooner and stay hairline-thin, with no mystery box. Wind flows across the map and gets out of the way when you touch it.

## Payments and auth

- Payments: none. Do not invent spend. Weather and wind stay stubs. The Scout chat stays an on-device stub. No keys, accounts, or spend. No new parcel vendor, proxy, or server.
- Auth: unchanged (Apple primary, email secondary, no guest). No provider swap. No backend change. The J10 camera is stored per account on device. Other storage keys stay.
- Maps: existing Apple Maps stack, USGS `USGSTopo`, and the TxGIO `export` overlay. No `identify`. No `query`.
- Location: unchanged from 017. No "Always" permission. No background mode. J9 is user rotation, not GPS heading.
- Schema: no stored schema change except the per-account camera.

## Decisions for Beau

None that block this build. Beau's go came via Finley at 1:21am CT on 2026-10-01. The 1:30am, 1:33am, 1:35am, and 1:37am additions are in force. Do not wait. Each locked default is the one to build. The alternative is an **out-of-scope Beau gate**.

1. **Property-line floor zoom. Locked at 12.** Zoom 11 is an out-of-scope Beau gate.
2. **Fallback wording. Beau's call at 1:30am replaces the old default.** Visible fallback text goes from the sun stack, the popover source note, and the Forecast caption. The logic stays. Keeping those source lines is an out-of-scope Beau gate.
3. **Attribution. Locked.** One small map line (USGS short form plus "Property lines: TxGIO, not a survey") and full credits in a Map Tools "Map credits" row. Another layout is an out-of-scope Beau gate.
4. **Wind fallback. Locked.** If streamlines miss the perf bar or the 010 guard, ship arrows and report. Shipping a broken renderer, or blocking earlier milestones on J7, is out.
5. **Item 2. Locked. No change.** A parcel identify popup is an out-of-scope Beau gate, and `identify` is permanently banned.

## Later (not in this job)

These are **out-of-scope Beau gates**. Do not do them here.

- Parcel lines at z11 (density-adaptive styling, or a vector source), offline parcels, and county-gap detection.
- Masking streamlines around pins, a wind time slider, gusts, streamline color by speed, and live wind or weather (Beau go via Finley → Morgan → Beau).
- Animated brand moments, and a light-mode N mark.
- Highlighting a tapped parcel outline. That needs a PII-free geometry source. Never `identify`.
- Follow-me / heading mode, and GPS for wind. J9 is two-finger rotation only.
- Everything still on the 017 Later list, except owner names and phone numbers, which are permanently out.

## Out of scope

- The alternatives under Decisions for Beau, and every Later item
- Owner names or phone numbers, in any form, ever
- TxGIO `identify` or `query`
- Any new map source, live weather, or live wind
- Moving Map Tools or locate-me
- Tour copy changes beyond re-measuring step 2
- The shooting-light table, copy, or timer
- Bundle ID, scheme, store submission, backend changes
- A new dependency that the PR does not justify
- Follow-me, pitch (unless it is already on), and sharing one camera across accounts
- Editing Job 001–018 files, including `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001
- Product code changes from this SoftwareFactory ticket
- UI-check screenshots committed to the product repo

## Constraints

- Status: **FINAL, approved to build** (Beau's go via Finley, 2026-10-01 at 1:21am CT). The 1:30am wording call, the 1:33am J8 addition, the 1:35am J9 addition, and the 1:37am J10 addition are in this brief.
- Base: Origin main **`25626283c55778c83f39c9b4fef9265bd1ca6310`**. Existing tests stay green. Record the count (313+; likely 318).
- Do not touch product code from this SoftwareFactory ticket. Workers build on the product repo.
- **One product PR per milestone**, in the order under Delivery. J7 is last and cannot block the others. Each PR merges through the normal permitted path only. After a squash-merge, rebuild the next PR on a fresh branch from the new main. Never force-push. See `note.md`.
- **Build notes must include:**
  - Test count at base `2562628` and after each PR, all green; every changed test and why
  - **J1:** removed nodes and styles; proof the fallback logic is untouched; proof the popover and Forecast caption lost the fallback strings
  - **J2:** final padding, radius, size per device, `hitSlop` math; proof the backing key and mount are unchanged; tour and popover re-anchor
  - **J8:** the avoidance approach; why any new dependency was or was not added; Simulator and real-device results
  - **J9:** `rotateEnabled`; compass thresholds, spacing, and animation duration; mount-or-scale proof; the locate-me choice; heading math for the current arrows
  - **J10:** every camera-fit path found at `2562628`; the storage key and account scope; proof return, relaunch, and a second account behave as specified; proof there is no opacity change and no `MapView` remount
  - **J3:** script path and command; crop box; @1x/@2x/@3x sizes; side-by-side; top offsets old vs new per device; shadow values
  - **J4:** what Expo Go shows vs a dev build; init task list; min and max timings; splash config; how the white flash is prevented; any `expo-system-ui` justification
  - **J5:** the overlay and view inventory; root cause with evidence; the fix; final attribution copy and placement
  - **J6:** which of (a)–(e) were real, with `path.z` proof; the final template per band (no secrets); `serverScaleFor` values; measurement tables; tile counts per screen; why 12
  - **J7:** who runs where; the 010 guard checklist with test names; perf numbers per scenario, including heading; Expo Go support; the `WIND_RENDERER` value shipped
  - Exact Simulator steps for Lane
  - Token usage
- **Lane Simulator signoff** is the sweep in `ac.md`. UI-check screenshots go in agent artifacts or in this job folder, not in the product repo. Only the UI report markdown goes in the product repo.
- Document token usage and the items above in `factory/jobs/019-nock-polish-parcels-wind/build.md`.
- This public job tree stays free of secrets. Do not commit signing keys, store credentials, or EAS tokens.
- Do not edit any Job 001–018 files. Touch only `factory/jobs/019-nock-polish-parcels-wind/`.

## Design intent (one line)

Open Nock and the full logo is there, the map stays where you left it, sunrise and sunset are a tight pill, property lines show a zoom sooner with no mystery box, and the wind flows until you touch the map.
