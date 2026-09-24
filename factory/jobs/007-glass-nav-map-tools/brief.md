# Brief — Job 007: Glass tab bar + top-right menu + Map Tools + pin icon refresh + dark mode

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `007-glass-nav-map-tools`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: product `main` at `3d8dbb4` (Job 006 merged). Do not follow an older tmp product URL. Do not start from an older product tip.  
**Build on:** Job 006 app UI modernize at Origin main `3d8dbb4`. Do not regress Job 006 behavior (A6).  
**Related:** `ac.md` (copy of `AC_GLASS_NAV_MAP_TOOLS_v0.md`) · Job 003/006 quiet field-tool chrome (north star) · brand burnt orange `#BF5700` for accents only · job 006 accepted and merged at `3d8dbb4`  
**Supersedes:** the older Job 007 map-markers idea. That idea was folded into Job 005 and is superseded. Its files (`FACTORY_BRIEF_007_map-markers.md`, `AC_MAP_MARKERS_v0.md`) are superseded stubs and are not part of this job. They are not tickets in this repo. If a `007-map-markers` folder exists here, leave it alone and do not reuse it. Job number 007 is reused for this ticket.  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** Small focused Origin product pull request(s). The builder writes `factory/jobs/007-glass-nav-map-tools/build.md` in this repo and documents token usage in those build notes. Lane runs the iOS Simulator sweep and captures the shots listed in Constraints for the ui worker.

Beau gave the go. This brief is final for Kai. **Pin style A is locked** (see A7). It is not an open choice.

Chrome north star: Job 003/006 quiet field tool: calm neutrals, burnt orange `#BF5700` for accents only.

## What to build

1. **Floating glass tab bar.** The solid white bottom bar becomes a floating, rounded, translucent blurred bar inset from the screen edges. The glass is **dark** (A1, A8).
2. **"You" moves to a top-right menu button** (three lines). It opens the You/account content. "You" leaves the bottom bar.
3. **New "Map Tools" tab** that opens a tools sheet over the Map. v1 tools are listed in A3. Beau gave the go on this list.
4. The floating **Map options button goes away**; its items move into Map Tools.
5. **Pin icon refresh, style A locked:** keep the teardrop, replace the star, and give all 9 types one cleaner inner-icon style (see A7). Solid type-color teardrop, thin white outline, bold white glyph. General gets a white center dot instead of the star.
6. **Dark mode by default** everywhere, regardless of the iPhone setting, with a dark glass bottom bar (see A8).

**Bar order: Map | Map Tools | Forecast | Guide.** Map Tools sits next to Map because it acts on the map; Forecast and Guide are the two "read and ask" screens. Map remains the default home.

Everything else from Job 006 stays the same (Forecast tab and Map Forecast button opening the same screen, #1 pin per day, teardrop shape and tip anchor, pin popup and type picker behavior, Guide chip fix).

### A1. Floating glass tab bar

- The bar is **not solid white**. It floats: inset from the left, right, and bottom edges (roughly 12–16pt), rounded corners, sits above the home indicator.
- Background is **dark glass**: translucent with the system dark blur material, plus a hairline light border and/or soft shadow so its edge is visible over dark map areas.
- **Readable on Satellite and Standard maps**: tab icons and labels stay legible over dark imagery and light map tiles (check both). Active tab uses the orange accent; inactive tabs use a light neutral that contrasts on both.
- The same bar appears on every tab (Map, Map Tools, Forecast, Guide).
- Scrolling screens (Forecast, Guide, pin detail, You) pad their content so the last row or the Guide composer is never hidden behind the bar.
- The Apple Maps legal/attribution label stays visible and isn't covered by the bar.
- With iOS **Reduce Transparency** turned on, the bar falls back to a solid dark background.
- Tap targets are at least 44pt.
- Blur uses the Expo/iOS system blur (for example `expo-blur`), free and bundled. No paid SDKs or keys.

### A2. "You" moves to a top-right menu

- "You" is **removed from the bottom bar**.
- A **three-line menu button** sits in the top-right corner, in the same spot on Map, Forecast, and Guide (and over the Map Tools sheet's map).
- Tapping it opens the existing You/account content (profile, animals + region edit, Unpinned hunts, sign out) as a sheet or pushed screen, with a clear close/back.
- Everything that was on You still works and is still reachable; nothing is dropped.
- On the Map, the menu button doesn't overlap the Map Forecast button, the search/other top chrome, or the safe area.

### A3. Map Tools tab (v1)

- Tapping **Map Tools** shows the Map with a **tools sheet** over its lower part (switching to the Map first if you were on another tab). Closing the sheet leaves you on the Map.
- The sheet is a simple quiet list or grid with icons and short labels. No "coming soon" or disabled placeholder items.
- v1 tools, in this order:
  1. **Map style**: Satellite / Standard (same behavior as the 006 map options)
  2. **My location**: centers the map on the user with the standard blue dot. If permission is denied, one plain line explains why and offers a link to iOS Settings. No location is stored or sent anywhere. Uses iOS when-in-use location permission. If the app doesn't already ask for it, this job adds the permission prompt and a plain-language Info.plist reason.
  3. **Fit to pins**: same behavior as 006
  4. **Add pin at center**: opens the same small pin popup (name, type picker, Save/Cancel) at map center, same as 006
  5. **Measure distance**: see A4
- Tapping a tool closes the sheet and applies it (except Measure, which enters measure mode).

### A4. Measure distance

- Choosing Measure enters a clear **measure mode** with a small banner showing the running total and **Undo last** and **Done** buttons.
- In measure mode, each tap on the map adds a point and draws a line from the previous point. **Taps do not drop pins while measuring.**
- Total distance shows in **yards under half a mile, then miles** (one decimal), updating as points are added.
- Undo last removes the most recent point. Done exits measure mode, clears the line, and restores normal tap-to-drop-a-pin.
- Measurements are not saved (v1).

### A5. Map floating controls

- The **floating Map options button is removed**; its three items live in Map Tools.
- The **Map Forecast button stays** and still opens the same forecast screen as the Forecast tab.
- After this job the Map shows only the Forecast button and the existing zoom +/− pair as floating controls. No new floating controls; the top-right menu button is page chrome, not a map control.

### A7. Pin icon refresh (Beau 2026-09-24) — style A locked

**Where the star is today (Job 006, main `3d8dbb4`):** it is the **General pin type's glyph**. `src/pins.ts` sets `general: { icon: 'star' }` (MaterialCommunityIcons, white on a burnt-orange teardrop). Every surface reads it through `pinIconName()`, so the star shows on:

- every General pin on the Map (`components/SpotPin.tsx`), including the provisional pin while the popup is open, since new pins default to General
- any pin with a missing or unknown type (`pinTypeOf()` falls back to General), which includes migrated logs that auto-created pins
- the "Pin" option in the type picker (`components/PinTypePicker.tsx`)
- General suggestions on the Forecast screen (`components/ForecastScreen.tsx`)

The selected state is not a star (it's a 1.15× scale plus orange ring), so it doesn't need a redesign.

**Fix:** change the icon map in one place so all four surfaces update together, and restyle the inner glyphs to one consistent set.

**Style A is locked by Beau.** Do not implement style B. Do not leave the style as a builder choice.

- **A (locked).** Solid color pin, white icon. Teardrop filled in the type color with a thin white outline; one bold white glyph inside. General gets a plain white center dot instead of the star.

**Glyphs (MaterialCommunityIcons, already bundled; builder confirms each name exists and lists them in `build.md`):**

| Type | Glyph | Note |
| --- | --- | --- |
| general (Pin) | `circle-medium` (center dot) | replaces `star` |
| blind | `binoculars` | keep |
| duck_pond | `duck` | keep |
| tree_stand | `ladder` | keep |
| feeder | `corn` | replaces `barley`, reads better small |
| trail_cam | `camera` | keep |
| parking | `car` | replaces the "P" glyph; matches "Parking / access" |
| camp | `tent` | keep |
| water | `water` | keep |

- **No star anywhere** in pins, the type picker, or Forecast.
- All 9 types use style A consistently, with one glyph family and one weight.
- Glyph readable at normal zoom on Satellite and Standard: at least 16pt inside the head, white outline and soft shadow kept.
- Type colors stay as in 006; orange stays reserved for General and the selected state.
- Teardrop shape, tip anchor on the coordinate, 44pt tap target, and calm selected state unchanged.
- Type picker and Forecast rows show the same new glyphs as the Map.
- No stored data changes: pin `type` values stay the same; only presentation changes.
- **On dark UI** (type picker, Forecast rows, pin detail header): show each type's glyph inside a small pin or circle badge in style A (type color with white glyph), never a dark-colored glyph straight on a dark background.
- Map pins read on Satellite and on the dark Standard map (see A8).

### A6. Job 006 behavior unchanged

- Map is the default home after sign-in and on relaunch.
- Tap empty map drops a provisional teardrop pin with the small popup; Cancel leaves no orphan; press-and-hold does nothing; tapping a pin opens detail.
- Forecast tab and Map Forecast button open the same screen; each day shows at most the #1 pin.
- Guide pin-chip selection still works.
- Stub sign-in, stub weather, logs in pins, burnt orange, no lost logs or pins.

### A8. Dark mode by default (Beau 2026-09-24)

- The app is **dark on every screen regardless of the iPhone's light/dark setting**: Map chrome, Forecast, Guide, the You menu, pin popup, pin detail and history, type picker, log form, pin picker, sign-in and onboarding, all sheets, and the Map Tools panel.
- Use the existing dark palette tokens in `src/theme/colors.ts` (tune values if needed for contrast). No hard-coded white or light-gray backgrounds remain; audit for literal `#FFFFFF` / light hex backgrounds and switch them to tokens.
- **No white flash**: launch/splash background and navigation container background are dark.
- Status bar uses light content; keyboards use the dark appearance.
- **Text contrast**: body text and labels meet WCAG AA (4.5:1) on their surface; muted/secondary text is still readable.
- **Burnt orange stays an accent only**: primary buttons (orange fill, white text), active tab, selected states, General pin. No small orange body text on dark backgrounds (it doesn't meet 4.5:1); no orange panels.
- Sign in with Apple uses Apple's **white** button style on the dark background (per Apple's guidelines); email path matches the dark shell.
- Standard map uses Apple's dark map style to match the app; Satellite is unchanged.
- Keep the light palette in code and working (don't delete it), so following the iPhone setting later is a small change.
- **Later, not this job:** an Appearance choice (Dark / Match iPhone) in the You menu. Easy because both palettes exist; it needs a light-mode check of the new 007 surfaces.

## Research

- Beau gave the go. This brief is final for Kai.
- Beau request 2026-09-24 via Finley: all white screens go dark by default, not only when the iPhone is in dark mode.
- Current state (006, `3d8dbb4`): the app already has light and dark palettes in `src/theme/colors.ts` and `app.json` has `userInterfaceStyle: "automatic"`, so today it follows the iPhone. This job forces dark. Following the iPhone again later is a small job (see A8). Do not ship that Appearance choice in this job.
- Beau request 2026-09-24 via Finley: new pin design. He likes the teardrop and dislikes the star.
- **Pin style A is locked by Beau (2026-09-24).** Solid type-color teardrop, thin white outline, bold white glyph. General gets a white center dot instead of the star. Style B (white pin, colored icon) is not a choice. Do not implement it.
- Beau request 2026-09-24 via Finley: glassy floating bar, You in a top-right three-line menu, and a new Map Tools section. Beau didn't specify the tools. Sage proposed the v1 list in A3. Beau gave the go, so that list is the job: Map style, My location, Fit to pins, Add pin at center, Measure distance. No placeholders, and no extra tools.
- onX is a pattern reference only (tool list, measure behavior). No onX assets or data.
- Blur uses the Expo/iOS system blur (for example `expo-blur`), free and bundled. No paid SDKs or keys.
- "Go to my location" uses iOS when-in-use location permission. If the app doesn't already ask for it, this job adds the permission prompt and a plain-language Info.plist reason. No location is stored or sent anywhere.
- Job 006 is accepted and merged. Product work landed on `main` at `3d8dbb4`. Build on that tip.
- Nav after this job is **Map | Map Tools | Forecast | Guide**. Job 006's tabs were Map | Forecast | Guide | You. You leaves the bar for the top-right menu. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in this repo; the amendment is this brief.
- History: 2026-09-24 the older Job 007 map-markers idea was folded into `005-pins-logs-forecast`. This ticket reuses number 007 for glass nav and map tools. Leave any `007-map-markers` folder alone.
- Live weather is not researched for implementation. It stays gated. No provider keys belong in this public tree.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### A1. Floating glass tab bar

- [ ] The bar is **not solid white**. It floats: inset from the left, right, and bottom edges (roughly 12–16pt), rounded corners, sits above the home indicator
- [ ] Background is **dark glass**: translucent with the system dark blur material, plus a hairline light border and/or soft shadow so its edge is visible over dark map areas
- [ ] **Readable on Satellite and Standard maps**: tab icons and labels stay legible over dark imagery and light map tiles (check both). Active tab uses the orange accent; inactive tabs use a light neutral that contrasts on both
- [ ] Bar order is **Map | Map Tools | Forecast | Guide**. Map remains the default home
- [ ] The same bar appears on every tab (Map, Map Tools, Forecast, Guide)
- [ ] Scrolling screens (Forecast, Guide, pin detail, You) pad their content so the last row or the Guide composer is never hidden behind the bar
- [ ] The Apple Maps legal/attribution label stays visible and isn't covered by the bar
- [ ] With iOS **Reduce Transparency** turned on, the bar falls back to a solid dark background
- [ ] Tap targets are at least 44pt

### A2. "You" moves to a top-right menu

- [ ] "You" is **removed from the bottom bar**
- [ ] A **three-line menu button** sits in the top-right corner, in the same spot on Map, Forecast, and Guide (and over the Map Tools sheet's map)
- [ ] Tapping it opens the existing You/account content (profile, animals + region edit, Unpinned hunts, sign out) as a sheet or pushed screen, with a clear close/back
- [ ] Everything that was on You still works and is still reachable; nothing is dropped
- [ ] On the Map, the menu button doesn't overlap the Map Forecast button, the search/other top chrome, or the safe area

### A3. Map Tools tab (v1)

- [ ] Tapping **Map Tools** shows the Map with a **tools sheet** over its lower part (switching to the Map first if you were on another tab). Closing the sheet leaves you on the Map
- [ ] The sheet is a simple quiet list or grid with icons and short labels. No "coming soon" or disabled placeholder items
- [ ] v1 tools, in this order: **Map style** (Satellite / Standard, same behavior as the 006 map options); **My location** (centers on the user with the standard blue dot; if permission is denied, one plain line explains why and offers a link to iOS Settings; no location is stored or sent anywhere); **Fit to pins** (same behavior as 006); **Add pin at center** (same small pin popup as 006); **Measure distance** (see A4)
- [ ] Tapping a tool closes the sheet and applies it (except Measure, which enters measure mode)

### A4. Measure distance

- [ ] Choosing Measure enters a clear **measure mode** with a small banner showing the running total and **Undo last** and **Done** buttons
- [ ] In measure mode, each tap on the map adds a point and draws a line from the previous point. **Taps do not drop pins while measuring**
- [ ] Total distance shows in **yards under half a mile, then miles** (one decimal), updating as points are added
- [ ] Undo last removes the most recent point. Done exits measure mode, clears the line, and restores normal tap-to-drop-a-pin
- [ ] Measurements are not saved (v1)

### A5. Map floating controls

- [ ] The **floating Map options button is removed**; its three items live in Map Tools
- [ ] The **Map Forecast button stays** and still opens the same forecast screen as the Forecast tab
- [ ] After this job the Map shows only the Forecast button and the existing zoom +/− pair as floating controls. No new floating controls; the top-right menu button is page chrome, not a map control

### A7. Pin icon refresh — style A locked

- [ ] **No star anywhere** in pins, the type picker, or Forecast
- [ ] All 9 types use **style A** (solid type-color teardrop, thin white outline, bold white glyph). General uses a white center dot (`circle-medium`), not a star. One glyph family and one weight. Style B is not allowed
- [ ] Glyphs match the table in A7 (`circle-medium`, `binoculars`, `duck`, `ladder`, `corn`, `camera`, `car`, `tent`, `water`)
- [ ] Glyph readable at normal zoom on Satellite and Standard: at least 16pt inside the head, white outline and soft shadow kept
- [ ] Type colors stay as in 006; orange stays reserved for General and the selected state
- [ ] Teardrop shape, tip anchor on the coordinate, 44pt tap target, and calm selected state unchanged
- [ ] Type picker and Forecast rows show the same new glyphs as the Map
- [ ] No stored data changes: pin `type` values stay the same; only presentation changes
- [ ] **On dark UI** (type picker, Forecast rows, pin detail header): each type's glyph sits inside a small pin or circle badge in style A (type color with white glyph), never a dark-colored glyph straight on a dark background
- [ ] Map pins read on Satellite and on the dark Standard map (see A8)

### A6. Job 006 behavior unchanged

- [ ] Map is the default home after sign-in and on relaunch
- [ ] Tap empty map drops a provisional teardrop pin with the small popup; Cancel leaves no orphan; press-and-hold does nothing; tapping a pin opens detail
- [ ] Forecast tab and Map Forecast button open the same screen; each day shows at most the #1 pin
- [ ] Guide pin-chip selection still works
- [ ] Stub sign-in, stub weather, logs in pins, burnt orange, no lost logs or pins

### A8. Dark mode by default

- [ ] The app is **dark on every screen regardless of the iPhone's light/dark setting**: Map chrome, Forecast, Guide, the You menu, pin popup, pin detail and history, type picker, log form, pin picker, sign-in and onboarding, all sheets, and the Map Tools panel
- [ ] Use the existing dark palette tokens in `src/theme/colors.ts` (tune values if needed for contrast). No hard-coded white or light-gray backgrounds remain; audit for literal `#FFFFFF` / light hex backgrounds and switch them to tokens
- [ ] **No white flash**: launch/splash background and navigation container background are dark
- [ ] Status bar uses light content; keyboards use the dark appearance
- [ ] **Text contrast**: body text and labels meet WCAG AA (4.5:1) on their surface; muted/secondary text is still readable
- [ ] **Burnt orange stays an accent only**: primary buttons (orange fill, white text), active tab, selected states, General pin. No small orange body text on dark backgrounds (it doesn't meet 4.5:1); no orange panels
- [ ] Sign in with Apple uses Apple's **white** button style on the dark background (per Apple's guidelines); email path matches the dark shell
- [ ] Standard map uses Apple's dark map style to match the app; Satellite is unchanged
- [ ] Keep the light palette in code and working (don't delete it), so following the iPhone setting later is a small change
- [ ] **Later, not this job:** an Appearance choice (Dark / Match iPhone) in the You menu

### Hygiene

- [ ] Only A1–A5, A7, and A8 are new; no other features
- [ ] No live weather, parcels, paid map layers, new keys, or provider swaps
- [ ] iOS-first; Cloud Agents only; small focused PR(s)

## User-facing UI

The map gets more screen: a dark glass bar floating over it, account tucked into a corner menu, map actions gathered in one Map Tools sheet, cleaner pin icons with no star, and a dark look everywhere.

- Tabs: Map | Map Tools | Forecast | Guide. Map is the default home after sign-in and on relaunch. The bar floats, inset, rounded, dark glass, with a solid-dark fallback when Reduce Transparency is on.
- Top-right: the same three-line menu on every tab opens all You content (profile, animals + region, Unpinned hunts, sign out) with a clear close/back.
- Map Tools: a sheet over the Map. Tools in order: Map style, My location, Fit to pins, Add pin at center, Measure distance. No placeholders.
- Measure mode: a banner with the running total (yards under half a mile, then miles to one decimal), Undo last, and Done. Taps draw a line and do not drop pins. Done clears the line and restores tap-to-drop. Measurements are not saved.
- Map floating controls: Forecast button and the existing zoom +/− pair only. The Map options button is gone. The top-right menu is page chrome, not a map control.
- Pins: style A teardrops (type-color fill, thin white outline, bold white glyph). General is a white center dot. No star. Same glyphs in the type picker and on Forecast, inside a small style-A badge on dark UI.
- Every screen is dark even when the iPhone is in light mode. Sign in with Apple uses the white button. Standard map is dark. Satellite is unchanged.

## Payments and auth

- Payments: none. Do not invent spend. Forecast stays the Job 005/006 stub. Live weather, parcels, and paid map layers stay out. No new keys in this public job tree or the product repo.
- Auth: unchanged behavior (Apple primary, email secondary, no guest). Sign in with Apple uses Apple's white button style on the dark background. Email path matches the dark shell. No auth/BaaS provider swap.
- Maps: existing map stack only. No new API keys, paid map SDKs, or new tile sources. Blur is the bundled Expo/iOS system blur.
- Location: when-in-use permission only, for centering the map. If permission is denied, one plain line plus a Settings link. Nothing is stored or sent.

## Later (not in v1)

Not shown in the app as placeholders. Each needs its own job and some need the spend gate.

- **Property lines / ownership**: paid parcel data outside the free TX option (see `MEMO_property-lines-ownership_TX_v0.md`)
- **Topo layer**: needs a tile source; likely free options exist but it's new map-layer work
- **Offline maps**: large new work (tile downloads, storage)
- **Track recording / breadcrumbs**: new data type and background location
- **Measure area** (acres) and saving measurements
- **Wind / sun / moon overlays**: wind needs live weather (spend gate); sun/moon times could be computed free later
- **Filter pins by type** (show/hide types on the map)
- **Appearance choice** (Dark / Match iPhone) in the You menu

## Out of scope

- Changing pin creation, the popup, or type picker behavior (beyond moving Add pin at center into Map Tools and the A7 icon restyle)
- Changing the teardrop shape, pin types, or type colors
- Changing Forecast ranking or content
- New Guide features
- App rename / App Store
- Style B pins, or any pin style other than locked style A
- An Appearance setting in this job
- Live weather, parcels, paid map layers, new keys, or provider swaps
- The Later list above

## Constraints

- Opened after Beau's go, routed Finley → Kai. This brief is final. Pin style A is locked.
- Do not touch product code from this SoftwareFactory ticket. Workers build on the product repo.
- Lane Simulator shots: bar over Satellite and over Standard, Reduce Transparency on, menu open, Map Tools sheet, measure mode with a line, all 9 pin types on Satellite and dark Standard in style A, type picker row, and dark screens (sign-in, Forecast, Guide, You menu, pin popup, pin detail, Map Tools). Lane also runs the sweep in `ac.md`, including the iPhone set to light mode so the app stays dark.
- Document token usage in `factory/jobs/007-glass-nav-map-tools/build.md`.
- iOS-first. Cloud Agents only for code. Small focused PR(s).
- Hard hygiene: no live weather, no parcels, no paid layers, no new keys, no provider swaps, no lost logs or pins. Pin `type` values stay the same.
- This public job tree stays free of secrets.
- If a `007-map-markers` folder exists, leave it alone.

## Design intent (one line)

A dark floating glass bar, You in a corner menu, map actions in one Map Tools sheet, style A pins with no star, and a dark app on every screen.
