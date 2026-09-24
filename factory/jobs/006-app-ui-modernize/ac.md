# AC — App-wide UI modernize + Forecast tab + teardrop pins (job 006)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_APP_UI_MODERNIZE_v0.md`. No secrets.

**Job id:** `006-app-ui-modernize`  
**Supersedes:** `AC_LOG_HUNT_UI_POLISH_v0.md` (pointer only; not a ticket in this repo).  
**Amended 2026-09-24:** Beau added a Forecast tab (Map Forecast button kept, same screen), one suggested pin per day, and teardrop pins (see brief B1–B3). **Final for Kai.**

Brief: `brief.md` in this folder.  
Product repo: https://cursor.com/codebase/beau-cunningham/hunting-companion, base `main` after Job 005.  
Lane captures before/after shots of Map pins (satellite + standard) and the Forecast tab.

## Must pass

1. App no longer reads as tacky/dated across Map, Forecast, pin detail + hunt history, Log form, Guide shell, You, auth (spot-check each tab).
2. Tabs are **Map | Forecast | Guide | You**; Map is the default home after sign-in and on relaunch.
3. **Forecast tab:** shows the 3-day stub forecast (still placeholder, no live API or keys, stub labeling kept). The Map Forecast button stays and opens the same forecast screen as the tab. Map has 2 or fewer floating controls counting the Forecast button (Forecast + one map options menu holding Satellite/Standard, Fit to pins, Add pin at center). No-pins state shows one quiet line pointing to the Map.
4. **One pin per day:** each forecast day shows at most one suggested pin, picked by the unchanged Job 005 ranking (parking/camp/trail_cam excluded, `defaultAnimals` boost, tie-breaks). A day with no eligible pin shows no suggestion row. Tapping the suggestion opens that pin. Copy says "pin", never "spot".
5. **Teardrop pins:** every marker is a teardrop map pin with its tip on the coordinate, per-type icon and color inside the head, readable on satellite and standard, tap target at least 44pt, calm selected state (no bounce/pulse/glow). The provisional pin uses the same shape.
6. **Job 004/005 pin behavior unchanged:** tap empty map drops a provisional pin and opens the small popup (name, type picker defaulting to General / "Pin n", Save/Cancel); changing type updates the pin live; Cancel leaves no orphan; Add pin at center (in the map options menu) opens the same popup at center; press-and-hold does nothing; tapping a pin opens detail; logs-in-pins and Unpinned hunts still work.
7. Log form + pin picker quiet; one orange Save; fields unchanged.
8. Only B1–B3 and the carry-over bug are new; no parcels, live APIs, keys, or provider swaps.

### Carry-over bug from Job 005 (see `docs/job-005-ui-report.md`)

- Guide "which pin?" step: tapping a pin chip selects that pin and continues the save, same result as typing its number. Typing the number still works. No pin description or extra Guide turn on a chip tap. Test required.

## Fail if

- The Forecast tab is missing, the Map Forecast button is missing, the two open different forecast screens, or Map isn't the default home
- Map shows more than 2 floating controls (counting the Forecast button), or Satellite/Standard, Fit to pins, or Add pin at center is no longer reachable
- Any forecast day shows more than one suggested pin, or the ranking rules changed
- Forecast calls a live weather API or needs a key
- Any pin still renders as a circle, the tip isn't anchored to the coordinate (pins visibly shift), or type icons/colors are lost
- Selected pin bounces, pulses, or glows loudly
- Any Job 004/005 pin behavior regressed (tap to drop, popup, type picker, Cancel, add pin at center, press-and-hold, pin detail)
- Tapping a pin chip in Guide's "which pin?" step still describes the pin instead of selecting it and saving
- Only the Log form is polished while Map/Guide/You stay tacky
- Behavior regressions on auth / weather stub / logs-in-pins, or any lost logs or pins
- Scope creep beyond B1–B3 and the chip bug (parcels, live weather, new Guide intelligence, Logs tab)

## Simulator sweep

1. Sign in; confirm the app lands on Map and tabs read Map | Forecast | Guide | You.
2. Map on satellite, then standard: pins are teardrops with type icons, readable; Forecast button present; 2 or fewer floating controls total. Open map options and use Satellite/Standard and Fit to pins.
3. Real tap on empty map: provisional teardrop + popup; change type (icon updates); Cancel (no orphan); tap again and Save. Press-and-hold does nothing. Add pin at center (map options) opens the same popup.
4. Tap a pin: calm selected state; pin detail opens; Log a hunt from pin.
5. Tap the Map Forecast button, confirm it opens the forecast screen; then open the Forecast tab and confirm it's the same screen. 3 days, stub labeling visible, at most one pin per day; tap a suggestion and confirm it opens that pin. Check the no-pins state on a fresh account if easy.
6. Guide: log a hunt, reach "which pin?", tap a chip, confirm the hunt shows in that pin's history. Repeat by typing the number.
7. You, then a brief auth glance if easy.

Lane captures before/after shots of Map pins (satellite + standard) and the Forecast tab.
