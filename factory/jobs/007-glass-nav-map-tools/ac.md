# AC — Glass tab bar + top-right menu + Map Tools + pin icon refresh + dark mode (job 007)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_GLASS_NAV_MAP_TOOLS_v0.md`. No secrets. Beau gave the go. **Final for Kai.** Pin style A is locked (solid type-color teardrop, thin white outline, bold white glyph; General gets a white center dot instead of the star). Style B is not a choice.

**Job id:** `007-glass-nav-map-tools` (reuses number 007; the old 007 map-markers files were folded into Job 005 and are superseded stubs, not part of this job)  
**Builds on:** Job 006 at Origin main `3d8dbb4`  
**Product repo:** https://cursor.com/codebase/beau-cunningham/hunting-companion

Brief: `brief.md` in this folder.  
Lane captures shots: bar over Satellite and Standard, Reduce Transparency on, menu open, Map Tools sheet, measure line, all 9 pin types on Satellite and dark Standard in style A, type picker row, and each dark screen with the iPhone in light mode.

## Must pass

1. Bottom bar is a floating, rounded, **dark glass** (blurred translucent) bar inset from the edges, not solid white. It's readable over Satellite and Standard, falls back to solid dark with Reduce Transparency, and never hides content, the Guide composer, or the Apple Maps legal label.
2. Bar order is **Map | Map Tools | Forecast | Guide**. Map is the default home.
3. "You" is gone from the bar. A three-line button in the top right (same spot on every tab) opens all the old You content, including sign out and Unpinned hunts.
4. Map Tools opens a sheet over the Map with, in order: Map style, My location, Fit to pins, Add pin at center, Measure distance. No placeholder or "coming soon" items.
5. My location centers on the blue dot; a denied permission shows one plain line plus a Settings link. Nothing stored.
6. Measure mode: taps add points and draw a line, total shows in yards under half a mile and then miles (one decimal), Undo last and Done work, taps don't drop pins while measuring, and Done restores normal tap-to-drop.
7. Floating Map options button is gone. Map Forecast button stays and opens the same screen as the Forecast tab. No new floating map controls (Forecast button plus the existing zoom +/− only).
8. **Pin icons, style A locked:** no star anywhere (Map pins, provisional pin, type picker, Forecast). All 9 types use style A (solid type-color pin, thin white outline, bold white glyph; General is a white center dot) and the brief's glyph table, readable on Satellite, the dark Standard map, and dark screens (picker/Forecast show glyphs inside a small badge, never dark glyphs on dark). Teardrop shape, tip anchor, 44pt target, type colors, and calm selected state unchanged. No stored data changes. Style B is not allowed.
9. **Dark by default:** every screen is dark whatever the iPhone setting (Map chrome, Forecast, Guide, You menu, pin popup/detail, type picker, log form, sign-in/onboarding, sheets, Map Tools). No white screens or white launch flash. Text meets 4.5:1. Orange only for buttons, active tab, selection, and General pins. Apple sign-in button uses the white style. Standard map is dark; Satellite unchanged. Light palette kept in code.
10. All Job 006 behavior unchanged (tap-to-drop popup and type picker, press-and-hold does nothing, teardrop pins, #1 pin per day, Guide chip fix, stub sign-in and weather, logs in pins).

## Fail if

- Bar is still solid white, touches the screen edges, or is hard to read over Satellite or Standard
- Bar covers the last list row, the Guide composer, or the Apple Maps legal label
- "You" is still in the bar, the menu button moves around between tabs, or any You feature is lost
- Map Tools is missing a v1 tool, shows placeholder items, or leaves you somewhere other than the Map
- A tap drops a pin while measuring, or tap-to-drop doesn't come back after Done
- Floating Map options button still exists, or the Map Forecast button is gone
- A star still appears on any pin, picker option, or Forecast row, or pin types use mixed icon styles, or style B is used
- Pin glyphs are hard to read on Satellite or Standard, or the teardrop shape or tip anchor changed
- Any white or light screen, sheet, or popup remains, or a white flash on launch
- Hard-to-read text on dark (below 4.5:1), small orange text on dark, or orange panels
- App switches to light when the iPhone is in light mode
- Any Job 006 behavior regressed, or any logs or pins lost
- Scope creep (Later items, live weather, paid layers, new keys)

## Simulator sweep

1. Sign in; lands on Map. Bar reads Map | Map Tools | Forecast | Guide and floats over the map.
2. Satellite, then Standard: bar readable on both. Turn on Reduce Transparency: bar goes solid.
3. Scroll Forecast and a long pin history to the bottom; last row is visible above the bar. Guide composer is visible.
4. Tap the top-right menu on Map, Forecast, and Guide: same spot each time, You content opens, close works, sign out works.
5. Map Tools: sheet opens over Map. Try each tool: style switch, My location (allow, then test denied if easy), Fit to pins, Add pin at center (popup, Save).
6. Measure: tap 3 points, check the total and units, Undo last, Done. Then tap the map and confirm a pin popup appears again.
7. Map Forecast button opens the forecast; Forecast tab shows the same screen.
8. Pin icons: drop one pin of each of the 9 types; check them on Satellite and Standard. Confirm no star on the provisional pin, the type picker, or Forecast suggestions. Confirm style A (type-color teardrop, thin white outline, white glyph; General is a white center dot). Select a pin and confirm the calm selected state.
9. Set the iPhone (Simulator) to **light** mode, relaunch: the app is still dark on sign-in, Map chrome, Forecast, Guide, You menu, pin popup, pin detail, type picker, log form, and Map Tools. No white flash on launch.

Lane captures shots: bar over Satellite and Standard, Reduce Transparency on, menu open, Map Tools sheet, measure line, all 9 pin types on Satellite and dark Standard, type picker row, and each dark screen with the iPhone in light mode.
