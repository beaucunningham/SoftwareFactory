# Brief — Job 011: Simulator fixes (wind + topo) + clean tab indicator + no Scout chips + coach-mark tour + one-question Scout tutorial + patch bumps

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `011-sim-fixes-coachmarks`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: product `main` at `6a94bc3f3926f5c08593a1b38bfe4e4f15fce624` (Jobs 009 + 010 merged, Origin PR #12). Do not follow an older tmp product URL. Do not start from an older product tip. Do not open on `f43723f` or `b52e433`.  
**Build on:** Jobs 009 and 010 at Origin main `6a94bc3f3926f5c08593a1b38bfe4e4f15fce624`. Do not regress Job 005–010 behavior.  
**Related:** `ac.md` (copy of `AC_SIM_FIXES_COACHMARKS_v0.md`) · Job 003/006/007/008/009/010 quiet field-tool chrome (north star) · brand burnt orange `#BF5700` for accents only · pin style A (locked in 007) · `note.md` (UI-check screenshots stay out of the product repo)  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** Small focused Origin product pull request(s). The builder writes `factory/jobs/011-sim-fixes-coachmarks/build.md` in this repo and documents everything listed under Constraints, including token usage. Lane runs the iOS Simulator sweep and captures the shots and recordings listed in Constraints for the ui worker.

Beau tested Jobs 009 + 010 on the iOS Simulator on 2026-09-24. His feedback is the build go, confirmed via Finley. Status: **FINAL, approved to build.** No open Decisions for Beau. **The AI's user-facing name stays Scout** (Beau approved 2026-09-24). **USGS The National Map `USGSTopo` tiles stay approved.** Weather and wind stay stubs. This brief is approved and final for Kai.

Chrome north star: Job 003/006/007/008/009/010 quiet field tool: dark by default, calm neutrals, burnt orange `#BF5700` for accents only, pin style A.

## What to build

Priority order. Keep this scope exactly.

1. **E1 — BLOCKER: Wind breaks the map.** With Wind on, the app keeps running but the map area goes blank (no tiles) and ignores touches. Map and wind must work together on Topo, Satellite, and Standard. Find and write down the root cause. If the Skia overlay cannot be made solid, ship a simpler wind rendering. **The map must never break.**
2. **E2 — BUG: Topo flips to Standard when zooming in.** Topo stays Topo at every zoom. At the USGS limit (~16), cap zoom or overzoom the last tile. Never switch style, never blank. Find and write down the root cause.
3. **E3 — Glass bar selected tab.** Replace the grey outline / pill / capsule around the selected tab with a thin light gray line. "Super clean." Supersedes 009's solid capsule behind the active tab.
4. **E4 — Scout chat: no suggestion chips.** The 4 preset chips still appear after sending a message. Remove suggestion chips from the chat entirely (empty state and after messages).
5. **E5 — Coach-mark app tour.** Replace the text-only tour cards with a coach-mark tour that dims the screen, spotlights the real UI element, and points at it with a short tip. User taps the highlighted element to continue, or Skip to end.
6. **E6 — Scout tutorial: one question.** One example question (plus its answer if the flow needs it), then **Try it** focuses the composer. Remove all "this isn't your data" / sample-disclaimer wording from the tutorial.
7. **E7 — Non-blocking: Expo patch bumps.** Apply the `npx expo install --fix` bumps Lane found (expo ~57.0.25, expo-constants ~57.0.19, expo-linking ~57.0.11, expo-router ~57.0.23).

**Bar order stays: Map | Pins | Forecast | Scout.** Map stays the default home. The top-right three-line You menu is unchanged (its "App tour" and "Scout tour" entries replay E5 and E6).

Everything else from Jobs 005–010 stays the same. **Weather and wind stay STUBS** (no live data, no keys, no spend). The Scout chat stays an on-device stub (no real model).

**This job is on-device only. No gates.** The USGS topo tiles from 010 remain the only network map source.

## Build order

1. **E1 and E2 first.** They are what Beau hit on the Simulator.
2. **E1 must not ship broken.** Time-box the Skia fix. If the Skia overlay is not passing the E1 toggle test by roughly the halfway point of the job (or it passes but still stutters/freezes intermittently), **ship the simpler fallback wind rendering** (see E1) and move on. Leave the Skia path disabled behind a local constant, and write down why.
3. Then E3, E4 (small), E5 (largest UI item), E6, and E7 last (E7 may go in its own small PR at any point if convenient).
4. Run the regression checklist before handing to Lane.

### E1. Wind on no longer breaks the map (BLOCKER)

With Wind on (iOS Simulator), the app keeps running but the map area stops working: map tiles don't show and the map doesn't respond to touches. Make map and wind work together on Topo, Satellite, and Standard.

- With Wind **on**, map tiles stay visible on **Topo, Satellite, and Standard**; the wind overlay is see-through everywhere except the wind marks themselves (no full-screen tint or fill).
- With Wind on, the map fully responds: **pan, pinch zoom, zoom +/− buttons, single tap on empty map opens the new-pin popup (009 C7), tapping a pin opens its popup, Map Tools button and sheet, Forecast button, glass bar tabs, and You menu**.
- The overlay never receives touches (`pointerEvents="none"` on its wrapper, or fallback markers that are non-interactive).
- Toggling Wind does **not** remount or reset the map: style, region, zoom, pins, and any open measure line stay as they were.
- **Toggle test:** toggle Wind on/off **20 times** spread across all three styles (switching style between toggles, with some pans/zooms in between). Every time: map visible, responsive within about a second, no freeze, no blank, no stuck overlay after Wind off.
- Wind on for **2 minutes** while panning/zooming around TX with 20+ pins: no freeze, no growing lag, taps still land.
- Wind animation runs off the JS thread (UI-thread Skia/Reanimated) **or** the fallback is used; no per-frame `setState`.
- **Reduce Motion on:** static arrows, no moving particles (both Skia and fallback paths).
- **"Sample wind" badge** and **mph legend** show whenever Wind is on, placed clear of the bar, Map Tools button, Topo attribution, and Apple legal label.
- Wind pauses when the app is backgrounded and stops fully when Wind is off (010 rules).
- Data still from the 010 `WindSource` stub; no live wind call.
- **Fallback rule:** if the Skia overlay can't pass every item above, ship the simpler rendering (arrow markers or lightweight overlay, same stub, badge, and legend). **The map must never break.** Build notes say which path shipped and why.
- **Root cause** written in build notes with evidence (what blanked the map, what swallowed touches) and the fix.

**Fallback (if Skia isn't solid by ~half the job):** keep the 010 `WindSource` stub and interface. Render wind as a small grid of direction **arrows** (e.g. ~5×5 to 8×8 over the visible region) as `react-native-maps` `Marker`s with `tracksViewChanges={false}`, or as a lightweight transparent overlay with `pointerEvents="none"`. Arrows may pulse/fade gently (≤ ~1 update per second) or be static. Color/opacity by speed, same mph legend and "Sample wind" badge. Re-sample when the map settles after pan/zoom. This is acceptable to Beau; a broken map is not. Leave the Skia path disabled behind a local constant.

### E2. Topo stays Topo at every zoom

- In Topo, zooming in **never** changes the map style: the style picker still shows Topo and the tiles are USGS topo at every zoom.
- At and past the last USGS zoom (~16): **either** Topo caps max zoom (can't zoom further) **or** the last available tile is overzoomed (upscaled). Never blank/white, never Apple Standard showing through. Never switch style.
- Leaving Topo restores normal Standard/Satellite max zoom (no cap left behind).
- USGS attribution text stays visible in Topo at every zoom.
- Pins, pin popup, measure ruler, and wind (if on) still draw above topo tiles at every zoom.
- **Zoom test:** at **at least 4 TX locations** (e.g. a Hill Country ridge, a Gulf Coast marsh, a Panhandle field, an East TX timber tract), zoom from about 5 to max and back out with pinch and with the +/− buttons. Style label and tiles stay Topo throughout.
- Also with Wind on: same result.
- **Root cause** and the chosen approach (cap vs overzoom, props used, final zoom value) in build notes.

Fix options (`react-native-maps` `UrlTile` props; builder picks, records the choice, and confirms at several TX spots):

- `maximumNativeZ={16}`: the highest zoom level the tile server provides. Tiles are auto-scaled for higher zoom levels (iOS: Apple Maps only). This is the overzoom path. **Verify on the Simulator** that it actually upscales in our react-native-maps version; on some versions iOS auto-scaling only runs through the cached tile overlay (i.e. with `tileCachePath` set). Note what was needed.
- `shouldReplaceMapContent` (iOS, maps to MKTileOverlay `canReplaceMapContent`): hides the Apple base under Topo so Standard can never show through. Use together with overzoom or a zoom cap so the user never sees blank.
- Or cap zoom while in Topo: `MapView` `maxZoomLevel={16}` (or the measured last good level) only while Topo is selected; restore the normal max when leaving Topo.

### E3. Selected tab: thin light gray line

Replace 009's solid capsule behind the active tab.

- **No filled capsule, pill, or heavy outline** behind or around the selected tab.
- The selected tab shows a **thin light gray line** (about **1–2pt** thick, light gray such as ~`#D0D0D0`–`#E6E6E6` or white at ~70–85% opacity). Builder picks placement (e.g. short line centered under the label, or above the icon), length (e.g. about icon/label width), and exact color, and records them in build notes.
- The line stays visible over bright Satellite and dark Standard (a faint dark hairline shadow under it is allowed; no extra shapes).
- Selected tab is clearly distinguishable from the others at a glance (line plus label treatment, e.g. weight or color); inactive tabs unchanged.
- **Contrast:** active and inactive labels/icons pass **4.5:1** against their immediate backing (009 halo treatment) over the brightest test area (bright Satellite sand/concrete) and stay readable over the darkest. If the active label/icon is orange and that fails 4.5:1 over bright Satellite without a capsule, keep the active label white (optionally semibold) and use orange only where contrast holds. Builder records the final treatment.
- Selected state switches with the 008 calm timing (≈150ms fade) or instantly under Reduce Motion; no sliding indicator bounce.
- VoiceOver still announces the selected tab (`accessibilityState={{ selected: true }}`).
- **Reduce Transparency on:** solid dark bar fallback kept, with the same thin line indicator.
- Glass material, shape, inset, 44pt targets, and Map Tools button unchanged from 009.

### E4. Scout chat: no suggestion chips

009 C3 removed "Try one of these" from the empty state, but the 4 preset chips still show after a message is sent. Remove suggestion chips from the chat entirely.

- No preset suggestion chips in the Scout chat: **not** in the empty state, **not** after sending a message, **not** under replies, **not** above the composer.
- Chip component and the code that feeds it are **removed** (not just hidden). Stub replies no longer produce follow-up chips.
- Empty state stays one short line plus the composer (009 C3).
- Checked on: fresh install, reinstall, after sending 1 and 5 messages, after leaving the tab and coming back, after killing and reopening the app.
- Chat header help button (replays E6) still present.

### E5. Coach-mark app tour

Replace the text-only tour cards with a coach-mark spotlight tour on the real UI. **Build in-house (recommended).** A **free** library (e.g. react-native-copilot or similar) is acceptable only if it is confirmed compatible with Expo SDK 57 and the New Architecture, adds no native module that needs a key or spend, and fits the behavior below. **No paid or heavy library.** Builder notes the choice and why.

**Look**

- Each step dims the whole screen (dark scrim, e.g. black ~60–70%) **except a cutout/highlight around the real UI element**, with a thin light outline or soft glow on the cutout (no orange panels; orange only for a small accent such as the step counter or Skip text if contrast holds).
- A short **tip bubble** (one or two short lines) sits next to the highlight with a small arrow pointing at it; it flips above/below or left/right so it never goes off screen or under the notch / Dynamic Island / home indicator.
- A **step counter** (e.g. "2 of 6") and a **Skip** button are visible on every step.

**Steps** (same topics as 009 C4 where they exist; suggested copy, builder may tighten):

1. **Map** — highlight the open map area. "Tap the map to drop a pin."
2. **Map Tools button** — "Map style, Wind, and measuring live here."
3. **Pins tab** — "Every pin in one list. Hunt logs live inside each pin."
4. **Forecast tab** — "The week ahead, plus the best pin for each of the next 3 days."
5. **Scout tab** — "Ask Scout about your pins, hunts, and the forecast."
6. **You menu (top-right three lines)** — "Your profile and settings. Replay this tour here anytime."

**Behavior**

- **Tapping inside the highlight advances** to the next step. Recommended (builder confirms or picks otherwise and records it):
  - Step 1 (map): advances only; does **not** create a pin draft
  - Step 2 (Map Tools): advances only; does **not** open the sheet
  - Steps 3–5 (tabs): **switch to that tab**, then highlight the next target on the new screen (the bar stays visible so the next tab target is present)
  - Step 6 (You menu): **finishes** the tour and returns to the **Map** tab; does not leave the menu open
  - The user is never left stranded mid-flow (no half-open sheet, no stuck scrim, no hidden target)
- **Taps outside the highlight do nothing** (they don't reach the map or controls underneath, and they don't advance).
- **Skip** ends the tour immediately from any step, returns to the Map tab, and sets the flag.
- Shows **once**, the first time the app opens **after first sign-in** (never before sign-in), starting on the Map. Flag stored locally per install (AsyncStorage). Use a **new** per-install flag key (e.g. `tour.coachmarks.v1`) so installs that already dismissed 009's card tour, including Beau's Simulator, see the new tour once after their next sign-in. The Scout tutorial (E6) keeps its existing flag. Does not reappear after finish or Skip unless replayed. Reinstall resets it; sign-out alone does not.
- **Replay** from You menu → **"App tour"** always works and starts on the Map tab.
- If a target isn't on screen or hasn't measured yet, the tour waits briefly and re-measures; if still missing, that step is skipped rather than showing a cutout in the wrong place.
- Cutouts line up with the real element on the **smallest and largest iPhone Simulators** (e.g. iPhone SE and a Pro Max) and respect safe areas. If the app supports rotation, positions re-measure on rotation; if the app is portrait-only, confirm and note it.
- **Reduce Motion on:** no sliding/scaling spotlight; steps change instantly or with a plain fade ≤ ~150ms (008 B3).
- **VoiceOver:** focus lands on the tip text first (step counter + tip read aloud); the highlighted element is reachable and announced with a hint like "Double-tap to continue"; **Skip** is reachable; nothing behind the scrim is focusable.
- The Scout tutorial (E6) **waits** until the tour is finished or skipped (reaching the Scout tab during step 5 must not start E6).
- Map Tools, tap-to-pin, and tabs work normally the moment the tour ends.

**Implementation notes:** targets register with a small tour context (e.g. `useTourTarget('pinsTab')`) and report their frame with `measureInWindow` (after `onLayout`, and again on size/orientation change and tab switch). One root-level overlay draws the dim layer with a cutout (four dim rects around the target need no new dependency; a rounded cutout can use Skia, already installed, or `react-native-svg` if already in the project) plus a tip bubble with an arrow that flips above/below to stay on screen.

### E6. Scout tutorial: one example, then Try it

Beau wants the tutorial short and without disclaimers.

- Shows once the first time the Scout tab opens (after the E5 tour is finished or skipped); per-install flag unchanged from 009.
- Shows **one** example question (e.g. "Where should I hunt Saturday?") and, only if the flow needs it, **one** short example answer. No 2nd or 3rd example step.
- Then a **Try it** prompt that closes the tutorial and **focuses the composer** (keyboard up, cursor in the field).
- **All** disclaimer wording is removed from the tutorial: no "sample data", "not your data", "Example only", SAMPLE badge, or similar.
- The example answer doesn't invent specific pin names or claim facts about the user's own data (keep it general, e.g. about wind and the time of day). The example answer is still **not real user data**.
- The example question/answer is **never saved** to chat history (check history after finishing, after Skip, and after relaunch).
- Skippable at any point.
- Replay from You menu → **"Scout tour"** and from the chat-header help button both work.
- Reduce Motion and VoiceOver respected (same rules as E5).

### E7. Expo patch bumps (non-blocking, droppable)

- Run `npx expo install --fix`; resulting versions are **expo ~57.0.25, expo-constants ~57.0.19, expo-linking ~57.0.11, expo-router ~57.0.23** (patch bumps only; nothing else upgraded beyond what `--fix` requires).
- Lockfile updated and committed.
- `npx expo-doctor` passes clean (or any remaining warning is unrelated, pre-existing, and listed in build notes).
- App builds and runs on the iOS Simulator after the bump (clean build; pods reinstalled if the project uses a prebuilt `ios/` folder).
- If a bump causes trouble, E7 may be dropped from this job without blocking E1–E6; note it.

## Research

- **Base:** Jobs 009 and 010 landed at Origin main `6a94bc3f3926f5c08593a1b38bfe4e4f15fce624` (Origin PR #12). Do not open on an older commit.
- **AI name is final: Scout** (Beau approved 2026-09-24). No placeholder anywhere. No trademark clearance done; app name still TBD.
- **Topo source is approved** (Beau, 2026-09-24): USGS The National Map `USGSTopo` tiles, `https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}`, free, public domain, no key, attribution required. Unchanged in this job.
- **Nav lock amendment (2026-09-24, Jobs 009/010 landed; Job 011 approved):** tabs are **Map | Pins | Forecast | Scout** (Map default). No user-facing "Guide". Topo is Standard | Satellite | Topo with USGS attribution. Weather and wind stay stubs. Job 011 changes: the app tour becomes a coach-mark tour; Scout chat has no suggestion chips; the selected tab is a thin light gray line, replacing 009's solid capsule. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. The amended lock text Sage handed with this brief is the source for those three Job 011 nav changes; they are already specified in E3, E4, and E5 above.
- **E1 — what Beau saw (not a crash):** the app keeps running; with Wind on, the map area goes blank (no tiles) and ignores touches. The most likely cause is the wind overlay covering or blanking the map view and swallowing touches. Suspects to check, in order:
  - The Skia `Canvas` (or its wrapper) is full-screen and **opaque**: `opaque` prop set, a `<Fill>` / full-size background rect drawn each frame, or a non-transparent `backgroundColor` on the canvas or wrapper. On iOS the canvas is a `CAMetalLayer`; if it paints every pixel, the map underneath is hidden.
  - The overlay **catches touches**: no `pointerEvents="none"` on the overlay's wrapping `View` (put it on the wrapper; don't rely on the Canvas alone), or a gesture handler / Pressable wrapping the canvas.
  - The overlay is mounted **inside `MapView`** as a child, or toggling Wind **remounts `MapView`** (e.g. a `key` change or conditional render), so the map re-initializes or loses its tile overlay.
  - A per-frame render loop on the **JS thread** (e.g. `setState` / `requestAnimationFrame` each frame) starving JS so map `onPress`, pin taps, and controls stop responding. Animation should run on the UI thread (Skia + Reanimated `useFrameCallback` / `useClock`, shared values), with a capped particle count.
  - Skia rendering problems specific to the Simulator (Metal on Simulator). If this is the cause, that alone justifies the fallback.
  The builder confirms the real cause with evidence (what covered or blanked the map, what swallowed touches) and writes it in build notes.
- **E2 — likely cause:** Topo is a `UrlTile` (MKTileOverlay) drawn on top of Apple's standard map. Past the tile overlay's `maximumZ` (or where USGS has no tiles), the overlay draws nothing and the **Apple Standard base shows through**, which looks exactly like "flipped to Standard." Another possibility: 010's "graceful past zoom 16" fallback switches `mapType` or the style state in code. Builder confirms which and notes it.
- **E4 — likely location:** a second chip component, e.g. under the last reply or above the composer, or a "follow-up suggestions" block in the stub reply. Remove the chip UI and the code that feeds it.
- **E7:** patch bumps only, no minor/major upgrades. Lane saw these from `npx expo install --fix` / `npx expo-doctor`.
- No stored schema changes beyond local tour flags. No live weather/wind, no AI model, no keys, no spend.
- Do not edit Job 001–010 files.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### E1. Wind on no longer breaks the map (BLOCKER)

- [ ] With Wind **on**, map tiles stay visible on **Topo, Satellite, and Standard**; the wind overlay is see-through everywhere except the wind marks themselves (no full-screen tint or fill)
- [ ] With Wind on, the map fully responds: **pan, pinch zoom, zoom +/− buttons, single tap on empty map opens the new-pin popup (009 C7), tapping a pin opens its popup, Map Tools button and sheet, Forecast button, glass bar tabs, and You menu**
- [ ] The overlay never receives touches (`pointerEvents="none"` on its wrapper, or fallback markers that are non-interactive)
- [ ] Toggling Wind does **not** remount or reset the map: style, region, zoom, pins, and any open measure line stay as they were
- [ ] **Toggle test:** toggle Wind on/off **20 times** spread across all three styles (switching style between toggles, with some pans/zooms in between). Every time: map visible, responsive within about a second, no freeze, no blank, no stuck overlay after Wind off
- [ ] Wind on for **2 minutes** while panning/zooming around TX with 20+ pins: no freeze, no growing lag, taps still land
- [ ] Wind animation runs off the JS thread (UI-thread Skia/Reanimated) **or** the fallback is used; no per-frame `setState`
- [ ] **Reduce Motion on:** static arrows, no moving particles (both Skia and fallback paths)
- [ ] **"Sample wind" badge** and **mph legend** show whenever Wind is on, placed clear of the bar, Map Tools button, Topo attribution, and Apple legal label
- [ ] Wind pauses when the app is backgrounded and stops fully when Wind is off (010 rules)
- [ ] Data still from the 010 `WindSource` stub; no live wind call
- [ ] **Fallback rule:** if the Skia overlay can't pass every item above, ship the simpler rendering (arrow markers or lightweight overlay, same stub, badge, and legend). **The map must never break.** Build notes say which path shipped and why
- [ ] **Root cause** written in build notes with evidence (what blanked the map, what swallowed touches) and the fix

### E2. Topo stays Topo at every zoom

- [ ] In Topo, zooming in **never** changes the map style: the style picker still shows Topo and the tiles are USGS topo at every zoom
- [ ] At and past the last USGS zoom (~16): **either** Topo caps max zoom (can't zoom further) **or** the last available tile is overzoomed (upscaled). Never blank/white, never Apple Standard showing through
- [ ] Leaving Topo restores normal Standard/Satellite max zoom (no cap left behind)
- [ ] USGS attribution text stays visible in Topo at every zoom
- [ ] Pins, pin popup, measure ruler, and wind (if on) still draw above topo tiles at every zoom
- [ ] **Zoom test:** at **at least 4 TX locations** (e.g. a Hill Country ridge, a Gulf Coast marsh, a Panhandle field, an East TX timber tract), zoom from about 5 to max and back out with pinch and with the +/− buttons. Style label and tiles stay Topo throughout
- [ ] Also with Wind on: same result
- [ ] **Root cause** and the chosen approach (cap vs overzoom, props used, final zoom value) in build notes

### E3. Selected tab: thin light gray line

- [ ] **No filled capsule, pill, or heavy outline** behind or around the selected tab (supersedes 009 C1's "small solid capsule")
- [ ] The selected tab shows a **thin light gray line** (about **1–2pt** thick, light gray such as ~`#D0D0D0`–`#E6E6E6` or white at ~70–85% opacity). Builder picks placement (e.g. short line centered under the label, or above the icon), length (e.g. about icon/label width), and exact color, and records them in build notes
- [ ] The line stays visible over bright Satellite and dark Standard (a faint dark hairline shadow under it is allowed; no extra shapes)
- [ ] Selected tab is clearly distinguishable from the others at a glance (line plus label treatment, e.g. weight or color); inactive tabs unchanged
- [ ] **Contrast:** active and inactive labels/icons pass **4.5:1** against their immediate backing (009 halo treatment) over the brightest test area (bright Satellite sand/concrete) and stay readable over the darkest. If orange fails without the capsule, the active label goes white/semibold and orange is used only where it passes
- [ ] Selected state switches with the 008 calm timing (≈150ms fade) or instantly under Reduce Motion; no sliding indicator bounce
- [ ] VoiceOver still announces the selected tab (`accessibilityState={{ selected: true }}`)
- [ ] **Reduce Transparency on:** solid dark bar fallback kept, with the same thin line indicator
- [ ] Glass material, shape, inset, 44pt targets, and Map Tools button unchanged from 009

### E4. Scout chat: no suggestion chips anywhere

- [ ] No preset suggestion chips in the Scout chat: **not** in the empty state, **not** after sending a message, **not** under replies, **not** above the composer
- [ ] Chip component / data feed removed (not just hidden); stub replies no longer produce follow-up chips
- [ ] Empty state stays one short line plus the composer (009 C3)
- [ ] Checked on: fresh install, reinstall, after sending 1 and 5 messages, after leaving the tab and coming back, after killing and reopening the app
- [ ] Chat header help button (replays E6) still present

### E5. Coach-mark app tour

- [ ] Each step dims the whole screen (dark scrim, e.g. black ~60–70%) **except a cutout/highlight around the real UI element**, with a thin light outline or soft glow on the cutout (no orange panels; orange only for a small accent such as the step counter or Skip text if contrast holds)
- [ ] A short **tip bubble** (one or two short lines) sits next to the highlight with a small arrow pointing at it; it flips above/below or left/right so it never goes off screen or under the notch / Dynamic Island / home indicator
- [ ] A **step counter** (e.g. "2 of 6") and a **Skip** button are visible on every step
- [ ] Steps: (1) Map — "Tap the map to drop a pin." (2) Map Tools button — "Map style, Wind, and measuring live here." (3) Pins tab — "Every pin in one list. Hunt logs live inside each pin." (4) Forecast tab — "The week ahead, plus the best pin for each of the next 3 days." (5) Scout tab — "Ask Scout about your pins, hunts, and the forecast." (6) You menu — "Your profile and settings. Replay this tour here anytime."
- [ ] **Tapping inside the highlight advances.** Recommended: step 1 advances only (no pin draft); step 2 advances only (sheet stays closed); steps 3–5 switch to that tab then highlight the next target; step 6 finishes and returns to Map without leaving the menu open. Builder records the final behavior. The user is never left stranded
- [ ] **Taps outside the highlight do nothing**
- [ ] **Skip** ends the tour immediately from any step, returns to the Map tab, and sets the flag
- [ ] Shows **once** after first sign-in (never before), starting on the Map. New local flag (e.g. `tour.coachmarks.v1`). Replay from You → **"App tour"** starts on Map. Reinstall resets it; sign-out alone does not
- [ ] Missing targets are re-measured, then skipped if still missing
- [ ] Cutouts line up on iPhone SE and a Pro Max and respect safe areas. Rotation re-measures, or portrait-only is confirmed and noted
- [ ] **Reduce Motion on:** instant or plain fade ≤ ~150ms; no sliding/scaling spotlight
- [ ] **VoiceOver:** tip first (step counter + tip); highlight hint "Double-tap to continue"; Skip reachable; nothing behind the scrim is focusable
- [ ] E6 waits until the tour is finished or skipped (Scout tab during step 5 must not start E6)
- [ ] Map Tools, tap-to-pin, and tabs work normally the moment the tour ends
- [ ] Implementation choice (in-house vs free library, and why) recorded in build notes; no paid or heavy library

### E6. Scout tutorial: one example, then Try it

- [ ] Shows once the first time the Scout tab opens (after the E5 tour is finished or skipped); per-install flag unchanged from 009
- [ ] Shows **one** example question (e.g. "Where should I hunt Saturday?") and, only if the flow needs it, **one** short example answer. No 2nd or 3rd example step
- [ ] Then a **Try it** prompt that closes the tutorial and **focuses the composer** (keyboard up, cursor in the field)
- [ ] **All** disclaimer wording is removed from the tutorial: no "sample data", "not your data", "Example only", SAMPLE badge, or similar
- [ ] The example answer doesn't invent specific pin names or claim facts about the user's own data (keep it general)
- [ ] The example question/answer is **never saved** to chat history (check history after finishing, after Skip, and after relaunch)
- [ ] Skippable at any point
- [ ] Replay from You menu → **"Scout tour"** and from the chat-header help button both work
- [ ] Reduce Motion and VoiceOver respected (same rules as E5)

### E7. Expo patch bumps (non-blocking)

- [ ] Run `npx expo install --fix`; resulting versions are **expo ~57.0.25, expo-constants ~57.0.19, expo-linking ~57.0.11, expo-router ~57.0.23** (patch bumps only; nothing else upgraded beyond what `--fix` requires)
- [ ] Lockfile updated and committed
- [ ] `npx expo-doctor` passes clean (or any remaining warning is unrelated, pre-existing, and listed in build notes)
- [ ] App builds and runs on the iOS Simulator after the bump (clean build; pods reinstalled if the project uses a prebuilt `ios/` folder)
- [ ] If a bump causes trouble, E7 may be dropped from this job without blocking E1–E6; note it

### Regression checklist (008 / 009 / 010 behavior must hold)

- [ ] **008 ruler measure:** ticks adapt to zoom; drag from the end dot draws a live segment with a live label near the finger; Undo last and Done work; no pins dropped while measuring; works on Topo and with Wind on
- [ ] **008 calm motion:** tab crossfade, sheet timing, no bounce; Reduce Motion gives plain fades
- [ ] **008 Pins tab and Map Tools button:** list opens pin logs; floating button opens the sheet
- [ ] **009 C1 glass bar:** still see-through (Liquid Glass or BlurView path); Reduce Transparency → solid dark (with the new E3 indicator)
- [ ] **009 C2 name:** "Scout" everywhere user-facing; no "Guide" visible; tab icon unchanged
- [ ] **009 C6 stub replies:** 20 varied Scout prompts; none starts with "birds." or any fragment; every reply starts with a full sentence
- [ ] **009 C7 tap-to-pin:** 20 single taps on empty map (Satellite, Standard, **and Topo**; after pan/zoom, after closing a sheet, after measure Done, **and with Wind on**) all open the new-pin popup. Press-and-hold still does nothing
- [ ] **Pin tap popup:** 20 taps on existing pins across styles (and with Wind on) all open that pin's popup
- [ ] **010 Topo:** USGS attribution visible, clear of bar / Map Tools button / Apple legal
- [ ] **010 Forecast:** 7-day list on top; 3-day with #1 pin per day below; days 1–3 match; "Sample forecast" note present; Map Forecast button opens the same screen
- [ ] Dark by default; pin style A; orange accent only; no pin/log data lost

### Hygiene

- [ ] Only E1–E7 are new; no other features
- [ ] No live weather or wind, no backend changes, no account changes, no new paid SDKs, keys, or spend
- [ ] No AI model swap; Scout chat stays an on-device stub
- [ ] No schema changes beyond local tour flags
- [ ] iOS-first; Cloud Agents only; small focused PR(s) (E7 may be its own PR)

## User-facing UI

Wind sits quietly on top of a map that always works. Topo stays topo however close you look. The bar gets a single clean line under the selected tab. Scout's chat is just you and a composer. The tour points at the real buttons instead of describing them, and Scout's first-run shows one good question and hands you the keyboard.

- With Wind on, tiles stay visible on Topo, Satellite, and Standard. The overlay is see-through and never takes touches. Pan, zoom, tap-to-pin, pin taps, Map Tools, Forecast, tabs, and the You menu all keep working. Toggling Wind does not remount the map. "Sample wind" badge and mph legend stay. Reduce Motion shows static arrows. If Skia cannot pass, hunters still see the same stub wind as simple arrows.
- Topo stays Topo at every zoom. Past ~16 the last USGS tile is overzoomed or zoom is capped. Apple Standard never shows through. Attribution stays.
- The selected tab is a thin (~1–2pt) light gray line. No capsule. Labels stay readable over bright Satellite (4.5:1). Reduce Transparency keeps the line on a solid dark bar.
- Scout chat has no suggestion chips, empty or after a message.
- The first-run tour spotlights Map, Map Tools, Pins, Forecast, Scout, and the You menu. Tap the highlight to continue, or Skip. Taps outside do nothing. Replay from You → App tour.
- Scout's tutorial is one example question (plus one short answer only if needed), then Try it focuses the composer. No sample/not-your-data wording. The example is never saved.

## Payments and auth

- Payments: none. Do not invent spend. Weather stays the on-device stub. Wind stays the 010 `WindSource` stub. The Scout chat stays an on-device stub. No live weather or live wind API. No keys, accounts, or spend. No parcels or paid map layers. No paid or heavy tour library.
- Auth: unchanged behavior (Apple primary, email secondary, no guest). No auth/BaaS provider swap. No account changes.
- Maps: existing Apple Maps stack plus the 010 USGS `USGSTopo` `UrlTile` only. No other tile provider. No new API keys or paid map SDKs. No new dependency unless a free Expo SDK 57-compatible coach-mark library is chosen and noted. E7 is patch bumps only (`npx expo install --fix`).
- Location: unchanged from Job 010. No new location storage.
- Schema: no stored schema changes beyond local tour flags (new coach-mark flag; E6 keeps the 009 flag).

## Decisions for Beau

- None open. AI name (Scout) and USGS topo are approved; weather and wind stay stubs.

## Later (not in this job)

Not shown in the app as placeholders beyond the Sample wind and Sample forecast badges already required. Each needs its own job.

- **Live wind and live weather** (needs Beau go; Finley → Morgan → Beau for any key/account/spend). Flip `WindSource` + weather stub without rewriting UI
- Wind forecast time slider
- Gusts
- Offline topo cache
- Tour / tutorial analytics
- Re-trying the Skia streamline wind overlay later if E1 shipped the fallback
- Everything on the 009 and 010 Later lists (trademark/name clearance, Appearance Dark / Match iPhone, native tabs only if clearly better, paid topo/wind providers as a gate)

## Out of scope

- Live weather/wind or any live data API
- Backend, sync, or account changes
- New paid SDKs, keys, or spend; new tile providers
- New map features, new pin types, Forecast ranking/content changes
- Changing You menu contents (the existing "App tour" / "Scout tour" entries now launch E5 / E6)
- App rename / App Store
- Anything not in E1–E7
- Editing Job 001–010 files

## Constraints

- Status: **FINAL, approved to build** (Beau's Simulator feedback is the go, 2026-09-24, confirmed via Finley)
- Base: Origin main **`6a94bc3f3926f5c08593a1b38bfe4e4f15fce624`** (Jobs 009 + 010 landed, Origin PR #12). Not `f43723f`. Not `b52e433`.
- Do not touch product code from this SoftwareFactory ticket. Workers build on the product repo.
- **Build notes must include:**
  - **E1 root cause** with evidence, the fix, and which wind path shipped (Skia fixed vs fallback) and why
  - **E2 root cause**, cap vs overzoom choice, props used, final Topo max zoom
  - E3 indicator placement, size, color, and active label treatment, with contrast checks
  - E4 where the chips came from and what was removed
  - E5 tap behavior per step, in-house vs library choice, flag key, how rotation / portrait-only is handled
  - E6 final question/answer copy
  - E7 versions before/after and `expo-doctor` result
  - Token usage
- **Lane Simulator signoff (shots / recordings):**
  - **Recording:** Wind on over **Topo, Satellite, and Standard**, including a pan, a zoom, a tap-to-pin, and a pin tap while wind is on; Wind toggled off and on again
  - Stills: Wind on each style with Sample wind badge + legend; Wind + Reduce Motion (static arrows)
  - **Recording:** Topo zooming from ~5 to max and back at one TX spot (style stays Topo, attribution visible)
  - Glass bar selected-tab line over bright Satellite and dark Standard; Reduce Transparency on
  - Scout chat after sending a message (no chips)
  - **Recording:** full coach-mark tour, all 6 steps, on iPhone SE and a Pro Max; one still with Reduce Motion on; one still with VoiceOver focus on the tip / Skip
  - Scout tutorial: example question and Try it with composer focused
  - `npx expo-doctor` output after E7
- UI-check screenshots must not be committed to the product repo. Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this job folder. See `note.md`. The same rule is already in `.cursor/agents/ui.md` from Job 008.
- Document token usage and the items above in `factory/jobs/011-sim-fixes-coachmarks/build.md`.
- iOS-first. Cloud Agents only for code. Small focused PR(s). E7 may be its own PR.
- Hard hygiene: no live weather, no live wind, no backend, no account changes, no new paid SDKs, no keys, no spend, no schema changes beyond local tour flags. USGS topo tiles from 010 remain the only network map source.
- This public job tree stays free of secrets.
- Do not edit any Job 001–010 files.

## Design intent (one line)

Wind sits quietly on top of a map that always works. Topo stays topo however close you look. The bar gets a single clean line under the selected tab. Scout's chat is just you and a composer. The tour points at the real buttons instead of describing them, and Scout's first-run shows one good question and hands you the keyboard.
