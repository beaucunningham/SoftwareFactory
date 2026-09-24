# AC — Pins, logs, forecast (job 005)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_PINS_LOGS_FORECAST_v0.md`. No secrets.

Brief: `brief.md` in this folder.  
Build order: M1 (A) then M2 (B) then M3 (C) then M4 (D). Regression locks (R) must pass at every milestone.  
Delivery: one Origin product PR, four milestone commits, noted in product `docs/job-005-build.md`.

## Must pass

### A. Typed pins + tap-to-pin popup (M1)

- [ ] A1. Single tap on empty map: provisional pin at the tap point + the existing Job 004 small popup (name + Save/Cancel), same compact size.
- [ ] A2. Popup includes a type picker, default General; name defaults to `Pin n` and is editable.
- [ ] A3. Save persists the pin with chosen name + type; it appears on Map without relaunch. Cancel removes the provisional pin with no orphan (map, pickers, suggestions).
- [ ] A4. No instant-save and no Rename/Type/Undo toast anywhere.
- [ ] A5. With a pin selected, popup/detail open, or forecast sheet open, a tap on empty map only dismisses (open popup = Cancel); no new pin. Pan/pinch/rotate never create.
- [ ] A6. Press-and-hold on the map does nothing (no popup, no full UI, no pin).
- [ ] A7. `+` places a provisional pin at map center and opens the same small popup. Tapping an existing pin opens full detail, never the create popup.
- [ ] A8. All 9 types available (Pin, Blind, Duck pond, Tree stand, Feeder, Trail cam, Parking / access, Camp, Water), each with a distinct icon.
- [ ] A9. Type change (popup or detail) on an untouched auto name renames to `{Type} n`; after manual rename, type change keeps the name.
- [ ] A10. Icon-in-pin markers (white icon, colored body, white outline, shadow); no dots remain.
- [ ] A11. Markers readable on Satellite/Hybrid **and** Standard (screenshots of both with ≥3 types).
- [ ] A12. Tap target ≥44pt; selected = slight scale + burnt-orange ring/callout; one selected at a time; orange used only for General + selected.
- [ ] A13. No visible "spot" wording anywhere; noun is "Pin".
- [ ] A14. Old pin explanation gone; empty map shows exactly "Tap the map to drop a pin."; no hint once ≥1 pin exists.
- [ ] A15. Existing Job 004 pins load as General with names/coords unchanged.

### B. Multi-animal defaults (M2)

- [ ] B1. Onboarding animal step is multi-select; Continue disabled until ≥1 selected.
- [ ] B2. You tab shows and edits the same list; persists across relaunch.
- [ ] B3. Existing single saved animal migrates to a one-item list and shows preselected; nothing that used the old value crashes.

### C. Logs live in pins (M3)

- [ ] C1. Tabs are exactly **Map | Guide | You**; Map default; no Logs tab and no forecast tab.
- [ ] C2. Pin detail shows name, type (editable), coords, **Log a hunt**, and that pin's hunt history (newest first: date, animal, short result).
- [ ] C3. Log a hunt from pin: form opens with that pin preselected; save requires a pin; new log appears in that pin's history without relaunch.
- [ ] C4. Tapping a history row opens hunt detail; edit and delete work; "Ask Guide" still works where it existed.
- [ ] C5. Weather-at-log stub attaches using the pin's coordinates and stays null-safe.
- [ ] C6. Deleting a pin with hunts shows the count and moves those hunts to Unpinned hunts; no log is deleted.
- [ ] C7. Guide "log with Guide" cannot save without a pin: preselected when opened from a pin/hunt, otherwise a pin chooser; with 0 pins, Guide sends user to Map and the draft resumes attached to the new pin.
- [ ] C8. Migration (seeded): log with pin stays attached; log with coords within 400 m of a pin attaches to the nearest; log with coords and no pin within 400 m gets a new General pin at its coords; log with neither lands in Unpinned hunts. Total log count before = after.
- [ ] C9. Migration is idempotent: relaunch/re-run creates no duplicate pins and moves nothing.
- [ ] C10. You shows "Unpinned hunts (N)" only when N > 0; Assign to pin moves the log into that pin's history; entry disappears at 0.

### D. Forecast + suggestions (M4)

- [ ] D1. One compact Forecast control on Map opens a bottom sheet; map floating chrome ≤3 elements.
- [ ] D2. Sheet shows exactly 3 days (today + 2) with null-safe weather rows; `source: "stub"`; no live provider call; no keys in repo.
- [ ] D3. Each day lists 0–3 pins with type icon, name, and a short true reason.
- [ ] D4. `parking`, `camp`, `trail_cam` pins never appear as suggestions.
- [ ] D5. Type weighting follows `defaultAnimals[]` (e.g. user with Duck default and a Duck pond + a Tree stand: Duck pond ranks first).
- [ ] D6. Tap suggestion: sheet closes, Map centers and selects that pin.
- [ ] D7. 0 eligible pins: "Drop a pin to get suggestions."; provider failure: "Forecast unavailable"; Map keeps working.
- [ ] D8. Forecast sits behind a `ForecastProvider` interface (stub only), documented in `docs/job-005-build.md`.

### R. Regression locks (every milestone)

- [ ] R1. Stub sign-in unchanged (Apple primary, email secondary, no guest).
- [ ] R2. Satellite/Hybrid ↔ Standard toggle works; markers survive the toggle.
- [ ] R3. Fit-to-pins on Map focus works with typed markers.
- [ ] R4. Burnt-orange accent unchanged (`#BF5700`); Map default home; Guide not home.
- [ ] R5. No existing hunt log lost; no new API keys, paid SDKs, tile sources, or auth/BaaS changes.

## Fail if

- Tap opens the full pin UI instead of the small popup, the popup lacks a type picker, Cancel leaves an orphan, press-and-hold still does anything, or dismiss-taps create pins
- Pin delete loses a hunt log, or migration drops/duplicates anything
- Logs tab still present, forecast becomes a tab, or a new log can save without a pin
- Any dot marker remains or markers disappear on Satellite
- Onboarding still single-select or migration drops the saved animal
- Suggestions include parking/camp/trail cam, invent pins/hunts, or call a live weather API
- Any regression lock breaks, or scope creeps into parcels, Job 006 redesign, or paid services
- Real Simulator tap not exercised and not flagged

## Simulator happy path

1. Fresh stub sign-in → onboarding → pick Deer + Duck → Map (hybrid). Tabs: Map | Guide | You.
2. Empty map: "Tap the map to drop a pin."
3. Tap map → provisional pin + small popup (`Pin 1`, General) → pick Duck pond → name becomes `Duck pond 1` → Save.
4. Tap map → popup → Cancel → no pin left. Press-and-hold → nothing. With a pin selected, tap empty map → dismiss only.
5. `+` → popup at map center → Tree stand → Save. Tap map again → Parking / access → Save.
6. Tap `Duck pond 1` → detail → Log a hunt (pin preselected) → save → appears in history.
7. Rename `Duck pond 1` to "North pond", change type to Blind → name stays "North pond".
8. Toggle Standard ↔ Satellite: all markers readable. Leave and return to Map: fit-to-pins.
9. Forecast chip → 3 days; suggestions show North pond / Tree stand, never Parking; tap one → Map selects it.
10. Guide → log with Guide → choose pin → save → shows in that pin's history.
11. Delete a pin with a hunt → confirm → You shows "Unpinned hunts (1)" → Assign to pin → entry disappears.
12. You → animals Deer + Duck; remove Duck; persists.
13. Relaunch: pins, types, names, logs, animals persist.

Migration check: run on a seeded build with the four log cases (pin already attached, coords within 400 m, coords farther than 400 m, neither). Verify C8/C9 counts. If the test tooling cannot drive a real Simulator finger tap, flag that gap; Lane runs the tap manually after merge before PASS.
