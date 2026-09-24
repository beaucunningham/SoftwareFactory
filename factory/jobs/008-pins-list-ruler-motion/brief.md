# Brief — Job 008: Clearer glass bar + ruler measure + calm motion + Pins tab + Map Tools button

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `008-pins-list-ruler-motion`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: product `main` at `6b58f12` (Job 007 merged). Do not follow an older tmp product URL. Do not start from an older product tip.  
**Build on:** Job 007 glass nav and map tools at Origin main `6b58f12`. Do not regress Job 005–007 behavior.  
**Related:** `ac.md` (copy of `AC_PINS_LIST_RULER_MOTION_v0.md`, with Sage's units correction) · Job 003/006/007 quiet field-tool chrome (north star) · brand burnt orange `#BF5700` for accents only · pin style A (locked in 007) · `note.md` (UI-check screenshots stay out of the product repo)  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** Small focused Origin product pull request(s). The builder writes `factory/jobs/008-pins-list-ruler-motion/build.md` in this repo and documents token usage and the final glass tint value in those build notes. Lane runs the iOS Simulator sweep and captures the shots listed in Constraints for the ui worker.

Beau approved this as scoped on 2026-09-24 and said build. This brief is final for Kai. **Decision D1 is locked** (see B2). It is not an open choice.

Chrome north star: Job 003/006/007 quiet field tool: dark by default, calm neutrals, burnt orange `#BF5700` for accents only, pin style A (locked in 007).

## What to build

1. **Clearer glass bar.** The dark glass bottom bar gets more see-through, closer to Apple's own bars: less dark tint, stronger blur (see B1).
2. **Ruler measure.** The measure line looks like a ruler (ticks plus a live distance label) and follows your finger while you drag (see B2).
3. **Calm motion.** Tab switches, sheets, tool panels, the pin popup, and selection animate in briefly and quietly (see B3).
4. **New Pins tab.** A lean list of every pin. Tapping one opens that pin's hunt logs (see B4).
5. **Map Tools becomes a round floating button** on the Map, bottom right, above the bar. It opens the same Map Tools sheet (see B5).
6. **Carry-over fix from Job 007:** pin detail and hunt detail screens show the bottom bar (see B6).

**Bar order becomes: Map | Pins | Forecast | Guide.** Pins takes Map Tools' old slot (Finley proposal, already shared with Beau). Map stays the default home. The top-right three-line You menu is unchanged.

Everything else from Jobs 005–007 stays the same (tap-to-drop popup and type picker, press-and-hold does nothing, teardrop pins in style A, #1 pin per forecast day, Map Forecast button, dark by default, Guide chip fix, logs in pins, Unpinned hunts in the You menu).

### B1. Clearer glass bar

- The bar is visibly **more see-through** than Job 007: map colors and shapes show through it on Satellite and Standard (compare side by side with a 007 screenshot).
- Uses a lighter dark system material (Thin or Ultra-thin dark, or equivalent) with **low added tint**. The iOS system materials go from darkest to clearest as Thick, Regular, Thin, Ultra-thin. 007 is effectively a heavy dark tint. 008 moves toward the Thin/Ultra-thin dark materials (`expo-blur` tints such as `systemThinMaterialDark` / `systemUltraThinMaterialDark`), which are free and bundled. Blur is strong enough that map detail behind it is soft, not sharp.
- Labels and icons stay readable: active tab orange, inactive a light neutral, text/icon contrast **at least 4.5:1** measured over the brightest test area (bright Satellite ground such as sand, concrete, or a pale field, and the light parts of the dark Standard map). If the lightest material fails that check, the builder adds only as much tint as needed to pass and notes the final value in build notes.
- Keeps the hairline edge so the bar outline is visible over dark map areas.
- **Reduce Transparency on:** bar becomes solid dark (unchanged 007 fallback).
- Shape, inset, position, 44pt targets, and content padding unchanged from 007.

### B2. Ruler measure

Entering and leaving measure mode is unchanged from 007 (Map Tools, then Measure distance; banner with running total, **Undo last**, **Done**; nothing saved; no pins dropped while measuring; Done restores tap-to-drop).

**Look**

- The line is drawn like a ruler: a solid white line with a thin dark outline (readable on Satellite and dark Standard) and **tick marks** across it.
- Ticks sit at round distances that adapt to zoom (for example every 10, 25, 50, or 100 yards; or every 0.1, 0.25, or 0.5 miles), with slightly longer ticks at every 5th mark. Ticks are never closer than about 8pt on screen; if they would be, the next larger interval is used.
- Each placed point is a small round dot; the **end dot** is slightly larger so it reads as grabbable (44pt touch area).
- Each finished segment shows a small length label at its middle when the segment is long enough on screen (about 80pt or more); shorter segments skip the label.
- Labels are light text on a small dark pill (4.5:1). No orange panels; orange is not used for the line.

**Drag — D1 locked**

**D1 is locked.** In measure mode, dragging from the end dot draws the next segment; dragging anywhere else moves the map. It is not an open choice. Do not build the alternative (every one-finger drag draws, and two fingers move the map). That alternative was rejected because two-finger panning is awkward on the iOS Simulator. Reason for the locked rule: keeps map panning with one finger and stays testable with a mouse on the Simulator.

- First point: tap the map (as in 007), **or** press and drag from anywhere to start a line at the press point.
- **Pressing the end dot and dragging** draws a live segment from the end dot to your finger. The line, ticks, and a **live label near the finger** update continuously while dragging. The live label shows this segment's length and the running total (for example `140 yd · total 410 yd`).
- Releasing adds a point where you let go; the segment stays and the next drag starts from the new end dot.
- Tapping the map while at least one point exists still adds a point there (007 behavior), so tap-only and drag can be mixed freely.
- Dragging anywhere that isn't the end dot **moves the map** as usual; pinch zoom and the zoom +/− buttons still work during measure.
- **Undo last** removes the most recent point (and its segment). Done exits and clears the line.
- Dragged points are never pins: no popup, no provisional pin, nothing saved.
- On the iOS Simulator, a mouse drag from the end dot behaves exactly like a finger drag.
- **Web (only if the app is running as a web build):** after the first point, the live segment and label follow the pointer as it moves, without pressing; a click adds the point. Not required to pass the iOS job.

**Units** (unchanged from Job 007): yards (whole numbers) under half a mile (880 yd), then miles to **one decimal** (for example 0.5 mi, 1.3 mi). Applies to the banner total, segment labels, and the live label. Sage corrected an earlier "two decimals" typo on 2026-09-24; one decimal is the Job 007 rule and the rule for this job.

### B3. Calm motion

- **Tab switches:** quick crossfade (about 150–200ms). No sliding between tabs.
- **Sheets and tool panels** (Map Tools sheet, Forecast/pin sheets, type picker, You menu): slide up or in with an ease-out curve, about 200–250ms; closing is slightly faster (about 150–200ms).
- **Pin popup:** fades and scales in from about 0.95 to 1 at the pin, about 150ms.
- **Selection:** a pin's selected state (1.15× scale plus orange ring, from 006/007) animates in and out over about 150ms; chips (Guide pin chips, type picker options, forecast day chips if present) fade their selected color over about 150ms.
- **Measure:** a newly placed point and segment label fade in over about 150ms (the live drag line itself is not animated; it tracks the finger directly).
- Everything is calm: no bounce, no overshoot, no spring wobble, nothing longer than about 250ms, and no animation blocks a tap (you can tap through or interrupt it).
- **Reduce Motion on:** no sliding or scaling. Changes become a plain fade of about 150ms or less, or appear instantly.
- No visible stutter on the Simulator during tab switches or sheet opens with 20+ pins on the map.
- Motion uses React Native Animated / Reanimated and the navigation library's built-in transitions (free, already standard in Expo). No new paid SDKs or keys.

### B4. Pins tab

- New **Pins** tab in the second slot (**Map | Pins | Forecast | Guide**), with a pin-list icon (builder picks from the bundled icon set, for example a marker-list glyph; confirm the name exists).
- Header: "Pins" with the count (for example "Pins · 12").
- One row per pin, lean:
  - Left: the pin's type icon in its style A badge (type color with white glyph), same glyph table as 007.
  - Main line: pin name (one line, truncated with an ellipsis).
  - Second line, muted: `3 hunts · last Sep 21` or `1 hunt · last Aug 30`; pins with no logs show `No hunts yet`. Date format is short month and day; add the year only when it isn't the current year.
- **Sort:** most recently hunted first; pins with no hunts after that, newest pin first.
- Rows are at least 44pt tall and show a pressed state; the list scrolls and its last row is never hidden behind the bar.
- **Tap a row** opens that pin's existing detail screen (Job 005 pin detail with hunt history and "Log a hunt"). The Pins tab stays highlighted, the bar stays visible (B6), and Back returns to the list at the same scroll position.
- Pin detail opened from Pins has a **"Show on map"** action that switches to the Map tab, centers on the pin, and selects it.
- The list updates without a restart when a pin is added, renamed, retyped, or deleted, or a hunt is logged.
- **Empty state:** "No pins yet. Tap the map to drop one." with a "Go to Map" button.
- Dark by default, 4.5:1 text, orange only for the active tab and pressed/selected accents.
- Unpinned hunts stay in the You menu (not in this list).
- Pins list info is Sage's call per Finley: type icon, name, and one short line with hunt count and last-hunted date. Nothing else in v1.
- No stored data changes. Hunt counts and last-hunted dates are computed from the logs that already live inside pins (Job 005).

### B5. Map Tools floating button

- "Map Tools" leaves the bottom bar. A **round floating button** (about 48pt, 44pt minimum target) sits on the **Map tab only**, bottom right: about 12–16pt from the right edge and about 12pt above the top of the glass bar.
- Same dark glass look as the bar (with the same Reduce Transparency solid fallback); icon in a light neutral (builder picks a tools/sliders glyph from the bundled set and confirms the name exists); accessibility label "Map Tools".
- Tapping it opens the **same Map Tools sheet** as 007, with the same tools in the same order (Map style, My location, Fit to pins, Add pin at center, Measure distance).
- **No collisions**, checked on the smallest and largest supported iPhones (for example iPhone SE and a Pro Max size):
  - Does not overlap the Map **Forecast button** (top left).
  - Does not overlap the **zoom +/−** controls; if they share the right edge, zoom sits above the Map Tools button with at least 12pt between them.
  - Does not cover the **Apple Maps legal label** or logo (keep the map's bottom padding so they sit above the bar and clear of the button).
  - Does not overlap any **location control** if one is shown on the Map; if so, it stacks in the same right-side column with at least 12pt gaps.
  - Does not overlap the **pin popup**: while a sheet, the pin popup, or the You menu is open, the button fades out (about 150ms) and returns when it closes.
- Hidden during **measure mode** (the measure banner owns the screen) and back after Done.
- Map floating controls are now: Forecast button, zoom +/−, and Map Tools button. Nothing else.

### B6. Bar on detail screens (Job 007 low)

- **Pin detail** and **hunt detail** screens show the glass bottom bar, whether opened from Map, Pins, Forecast, or Guide. The tab you came from stays highlighted.
- Tapping the highlighted tab again returns to that tab's top screen (for example the Pins list or the Map).
- Detail content is padded so the last row and the "Log a hunt" button are never hidden behind the bar.
- Forms with their own Save/Cancel (log-a-hunt form, pin popup, type picker, sign-in) may cover the bar; browse screens may not.

## Research

- Beau tested Job 007 on 2026-09-24 and said it looks good; these asks came via Finley the same day. Beau approved Job 008 as scoped and said build.
- Glass: see B1. The limit is legibility: labels must still pass 4.5:1 over the brightest map we test.
- **D1 is locked** (Beau / Sage per Finley, 2026-09-24). Build end-dot drag. Dragging anywhere else moves the map. The two-finger-pan alternative is not built. It is not an open choice for the builder.
- Measure units are unchanged from Job 007: whole yards under 880 yd, then miles to one decimal. An earlier draft of this brief said "two decimals"; that was a typo. Sage corrected the B2 units line and AC item 3 on 2026-09-24.
- Pins list info is Sage's call per Finley: type icon, name, and one short line with hunt count and last-hunted date. Nothing else in v1.
- Motion uses React Native Animated / Reanimated and the navigation library's built-in transitions. No new paid SDKs or keys.
- No stored data or schema changes. No new keys.
- Job 007 is merged. Product work landed on `main` at `6b58f12`. Build on that tip.
- Nav after this job is **Map | Pins | Forecast | Guide** (Map default). Job 007's tabs were Map | Map Tools | Forecast | Guide. Map Tools leaves the bar for the round floating button on the Map. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001; the Job 008 amendment is this brief:

  > Amendment 2026-09-24 (Job 008, Beau go). Tabs become **Map | Pins | Forecast | Guide** (Map default). Pins is a lean list of every pin; tapping one opens its hunt logs. Map Tools leaves the bar and becomes a round floating button on the Map (bottom right, above the bar) that opens the same sheet. Pin and hunt detail screens show the bar. Locked: Beau approved Job 008 as scoped.

- Live weather is not researched for implementation. It stays gated. No provider keys belong in this public tree.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### B1. Clearer glass bar

- [ ] The bar is visibly **more see-through** than Job 007: map colors and shapes show through it on Satellite and Standard (compare side by side with a 007 screenshot)
- [ ] Uses a lighter dark system material (Thin or Ultra-thin dark, or equivalent) with **low added tint**; blur is strong enough that map detail behind it is soft, not sharp
- [ ] Labels and icons stay readable: active tab orange, inactive a light neutral, text/icon contrast **at least 4.5:1** measured over the brightest test area (bright Satellite ground such as sand, concrete, or a pale field, and the light parts of the dark Standard map). If the lightest material fails that check, the builder adds only as much tint as needed to pass and notes the final value in build notes
- [ ] Keeps the hairline edge so the bar outline is visible over dark map areas
- [ ] **Reduce Transparency on:** bar becomes solid dark (unchanged 007 fallback)
- [ ] Shape, inset, position, 44pt targets, and content padding unchanged from 007

### B2. Ruler measure

- [ ] Entering and leaving measure mode is unchanged from 007 (Map Tools, then Measure distance; banner with running total, **Undo last**, **Done**; nothing saved; no pins dropped while measuring; Done restores tap-to-drop)
- [ ] The line is a solid white line with a thin dark outline (readable on Satellite and dark Standard) and **tick marks** across it
- [ ] Ticks sit at round distances that adapt to zoom (for example every 10, 25, 50, or 100 yards; or every 0.1, 0.25, or 0.5 miles), with slightly longer ticks at every 5th mark. Ticks are never closer than about 8pt on screen; if they would be, the next larger interval is used
- [ ] Each placed point is a small round dot; the **end dot** is slightly larger so it reads as grabbable (44pt touch area)
- [ ] Each finished segment shows a small length label at its middle when the segment is long enough on screen (about 80pt or more); shorter segments skip the label
- [ ] Labels are light text on a small dark pill (4.5:1). No orange panels; orange is not used for the line
- [ ] **D1 locked:** first point is a tap (as in 007), **or** a press and drag from anywhere that starts a line at the press point
- [ ] **D1 locked:** pressing the end dot and dragging draws a live segment from the end dot to the finger. The line, ticks, and a live label near the finger update continuously. The live label shows this segment's length and the running total (for example `140 yd · total 410 yd`)
- [ ] Releasing adds a point where you let go; the segment stays and the next drag starts from the new end dot
- [ ] Tapping the map while at least one point exists still adds a point there (007 behavior), so tap-only and drag can be mixed freely
- [ ] Dragging anywhere that isn't the end dot **moves the map**; pinch zoom and the zoom +/− buttons still work during measure
- [ ] **Undo last** removes the most recent point (and its segment). Done exits and clears the line
- [ ] Dragged points are never pins: no popup, no provisional pin, nothing saved
- [ ] On the iOS Simulator, a mouse drag from the end dot behaves exactly like a finger drag
- [ ] **Web (only if the app is running as a web build):** after the first point, the live segment and label follow the pointer as it moves, without pressing; a click adds the point. Not required to pass the iOS job
- [ ] **Units** (unchanged from Job 007): yards (whole numbers) under half a mile (880 yd), then miles to **one decimal** (for example 0.5 mi, 1.3 mi). Applies to the banner total, segment labels, and the live label

### B3. Calm motion

- [ ] **Tab switches:** quick crossfade (about 150–200ms). No sliding between tabs
- [ ] **Sheets and tool panels** (Map Tools sheet, Forecast/pin sheets, type picker, You menu): slide up or in with an ease-out curve, about 200–250ms; closing is slightly faster (about 150–200ms)
- [ ] **Pin popup:** fades and scales in from about 0.95 to 1 at the pin, about 150ms
- [ ] **Selection:** a pin's selected state (1.15× scale plus orange ring, from 006/007) animates in and out over about 150ms; chips (Guide pin chips, type picker options, forecast day chips if present) fade their selected color over about 150ms
- [ ] **Measure:** a newly placed point and segment label fade in over about 150ms (the live drag line itself is not animated; it tracks the finger directly)
- [ ] Everything is calm: no bounce, no overshoot, no spring wobble, nothing longer than about 250ms, and no animation blocks a tap (you can tap through or interrupt it)
- [ ] **Reduce Motion on:** no sliding or scaling. Changes become a plain fade of about 150ms or less, or appear instantly
- [ ] No visible stutter on the Simulator during tab switches or sheet opens with 20+ pins on the map

### B4. Pins tab

- [ ] New **Pins** tab in the second slot (**Map | Pins | Forecast | Guide**), with a pin-list icon from the bundled icon set (confirm the name exists)
- [ ] Header: "Pins" with the count (for example "Pins · 12")
- [ ] One lean row per pin: style A type badge (type color with white glyph, same glyph table as 007), name (one line, ellipsis), second line `3 hunts · last Sep 21` or `1 hunt · last Aug 30`, or `No hunts yet`
- [ ] Date format is short month and day; add the year only when it isn't the current year
- [ ] **Sort:** most recently hunted first; pins with no hunts after that, newest pin first
- [ ] Rows are at least 44pt tall and show a pressed state; the list scrolls and its last row is never hidden behind the bar
- [ ] **Tap a row** opens Job 005 pin detail (hunt history and "Log a hunt"). The Pins tab stays highlighted, the bar stays visible (B6), and Back returns to the list at the same scroll position
- [ ] Pin detail opened from Pins has a **"Show on map"** action that switches to the Map tab, centers on the pin, and selects it
- [ ] The list updates without a restart when a pin is added, renamed, retyped, or deleted, or a hunt is logged
- [ ] **Empty state:** "No pins yet. Tap the map to drop one." with a "Go to Map" button
- [ ] Dark by default, 4.5:1 text, orange only for the active tab and pressed/selected accents
- [ ] Unpinned hunts stay in the You menu (not in this list)

### B5. Map Tools floating button

- [ ] "Map Tools" leaves the bottom bar. A **round floating button** (about 48pt, 44pt minimum target) sits on the **Map tab only**, bottom right: about 12–16pt from the right edge and about 12pt above the top of the glass bar
- [ ] Same dark glass look as the bar (with the same Reduce Transparency solid fallback); icon in a light neutral from the bundled set (confirm the name exists); accessibility label "Map Tools"
- [ ] Tapping it opens the **same Map Tools sheet** as 007, with the same tools in the same order (Map style, My location, Fit to pins, Add pin at center, Measure distance)
- [ ] Does not overlap the Map **Forecast button** (top left), checked on iPhone SE and a Pro Max size
- [ ] Does not overlap the **zoom +/−** controls; if they share the right edge, zoom sits above the Map Tools button with at least 12pt between them
- [ ] Does not cover the **Apple Maps legal label** or logo (map bottom padding keeps them above the bar and clear of the button)
- [ ] Does not overlap any **location control** if one is shown on the Map; if so, it stacks in the same right-side column with at least 12pt gaps
- [ ] While a sheet, the pin popup, or the You menu is open, the button fades out (about 150ms) and returns when it closes
- [ ] Hidden during **measure mode** and back after Done
- [ ] Map floating controls are now: Forecast button, zoom +/−, and Map Tools button. Nothing else

### B6. Bar on detail screens (Job 007 low)

- [ ] **Pin detail** and **hunt detail** screens show the glass bottom bar, whether opened from Map, Pins, Forecast, or Guide. The tab you came from stays highlighted
- [ ] Tapping the highlighted tab again returns to that tab's top screen (for example the Pins list or the Map)
- [ ] Detail content is padded so the last row and the "Log a hunt" button are never hidden behind the bar
- [ ] Forms with their own Save/Cancel (log-a-hunt form, pin popup, type picker, sign-in) may cover the bar; browse screens may not

### Hygiene

- [ ] Only B1–B6 are new; no other features
- [ ] No live weather, parcels, paid map layers, new keys, or provider swaps
- [ ] No stored data or schema changes; no pins or logs lost
- [ ] iOS-first; Cloud Agents only; small focused PR(s)
- [ ] All Job 005–007 behavior unchanged (tap-to-drop popup and type picker, press-and-hold does nothing, style A teardrop pins, #1 pin per day, Map Forecast button, dark by default, Guide chip fix, logs in pins, Unpinned hunts in the You menu)

## User-facing UI

The map shows through more, measuring feels like laying a ruler on the map, the app moves just enough to feel finished, and every pin is one tap away in a simple list.

- Tabs: Map | Pins | Forecast | Guide. Map is the default home after sign-in and on relaunch. The bar is a lighter dark glass (Thin or Ultra-thin), still with a hairline edge, and a solid-dark fallback when Reduce Transparency is on. Shape, inset, and padding stay as in 007.
- Pins: a lean list. Each row is a style A type badge, the pin name, and `n hunts · last <date>` or `No hunts yet`. Most recently hunted first. Empty state says "No pins yet. Tap the map to drop one." with "Go to Map". A row opens that pin's hunt logs. Back returns to the same scroll spot. "Show on map" centers and selects the pin.
- Map Tools: a round dark-glass button on the Map tab only, bottom right, above the bar. It opens the same sheet as 007. It fades out under popups, sheets, and the You menu, and it is hidden in measure mode.
- Measure: a white ruler line with a dark outline, zoom-adaptive ticks, segment labels when the segment is about 80pt or longer, and a live label while dragging from the end dot (`140 yd · total 410 yd`). Units are whole yards under 880 yd, then miles to one decimal. Dragging elsewhere pans the map. Undo last and Done are unchanged. Nothing is saved. No pins.
- Motion: tab crossfade about 150–200ms; sheets about 200–250ms ease-out; popup and selection about 150ms. No bounce. Reduce Motion turns movement into a short fade or an instant change.
- Pin detail and hunt detail show the bar, with the tab you came from highlighted. The last row and "Log a hunt" stay above the bar.

## Payments and auth

- Payments: none. Do not invent spend. Forecast stays the Job 005/006/007 stub. Live weather, parcels, and paid map layers stay out. No new keys in this public job tree or the product repo.
- Auth: unchanged behavior (Apple primary, email secondary, no guest). No auth/BaaS provider swap.
- Maps: existing map stack only. No new API keys, paid map SDKs, or new tile sources. Blur is the bundled Expo/iOS system blur.
- Location: unchanged from Job 007. No new location storage.

## Later (not in v1)

Not shown in the app as placeholders. Each needs its own job.

- Pins list search, filter by type, and other sort orders
- Unpinned hunts shown at the bottom of the Pins list
- Two-finger panning in measure mode (the D1 alternative), only if Beau asks
- Drag an existing measure point to move it; measure area (acres); saving measurements
- Appearance choice (Dark / Match iPhone) in the You menu (from 007)
- Everything on the 007 Later list (property lines, topo, offline, tracks, wind/sun overlays)

## Out of scope

- Changing pin creation, the popup, type picker behavior, pin types, colors, or the teardrop style A look
- Changing Forecast ranking or content, or Guide features
- Changing the You menu contents or position
- App rename / App Store
- Stored data or schema changes, new keys, live weather, parcels, paid layers, or provider swaps
- The D1 alternative (every one-finger drag draws; two fingers move the map)
- The Later list above

## Constraints

- Opened after Beau's go, routed Finley → Sage → Kai. This brief is final. D1 is locked.
- Do not touch product code from this SoftwareFactory ticket. Workers build on the product repo.
- Lane Simulator shots: bar over bright Satellite and dark Standard next to a 007 shot, Reduce Transparency on, ruler line with ticks and a segment label, live label mid-drag, Pins list (full and empty), pin detail from Pins with the bar visible, hunt detail with the bar visible, Map Tools button on SE and Pro Max sizes with the zoom controls and legal label visible, Reduce Motion on. Lane also runs the sweep in `ac.md`.
- UI-check screenshots must not be committed to the product repo. Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this job folder. See `note.md`.
- Document token usage and the final glass tint value in `factory/jobs/008-pins-list-ruler-motion/build.md`.
- iOS-first. Cloud Agents only for code. Small focused PR(s).
- Hard hygiene: no live weather, no parcels, no paid layers, no new keys, no provider swaps, no stored data or schema changes, no lost logs or pins.
- This public job tree stays free of secrets.
- Do not edit Job 007 files. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001.

## Design intent (one line)

The map shows through more, measuring feels like laying a ruler on the map, the app moves just enough to feel finished, and every pin is one tap away in a simple list.
