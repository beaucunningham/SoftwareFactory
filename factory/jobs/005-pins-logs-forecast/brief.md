# Brief — Job 005: Pins, logs-in-pins, forecast (combined)

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `005-pins-logs-forecast`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: `main` @ `11d37ab` (Job 004 merged) or later. Do not follow an older tmp product URL.  
**Build on:** Job 004 map system (spots on Map, small tap popup, fit-to-pins, Satellite/Standard toggle). Do not regress.  
**Related:** `ac.md` (copy of `AC_PINS_LOGS_FORECAST_v0.md`), `PRODUCT_NAV_LOCK_2026-09-23.md` (amended 2026-09-24 by this job: tabs are Map | Guide | You) · brand burnt orange `#BF5700` · job 001 auth/tabs · job 002 weather stub (do not regress) · job 004 map system (accepted, merged at `11d37ab`)  
**Supersedes:** the old Job 005 forecast-spot-suggestions brief (`FACTORY_BRIEF_005_forecast-spot-suggestions.md`) and all of Job 007 map markers (`FACTORY_BRIEF_007_map-markers.md`, `AC_MAP_MARKERS_v0.md`). Those are pointers only. They are not tickets in this repo; leave them alone and do not recreate them. Job 006 (app-wide visual modernize) stays held and builds on this job; it must not redesign markers or bring back Logs.  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** ONE Origin product pull request with four milestone commits, in order: M1, M2, M3, M4. Document those commits, the icon per type, the forecast chrome layout, and `ForecastProvider` in `docs/job-005-build.md` in the product repo. The builder also writes `factory/jobs/005-pins-logs-forecast/build.md` in this repo and points it at that product doc.

Paid weather stays behind the spend gate (Finley → Morgan → Beau). This job ships the stub only. No API keys.

## What to build

Everything starts at a pin. Build these milestones **in order**. Each milestone must pass its AC section in `ac.md` **and all regression locks** before the next starts.

| # | Milestone | AC section |
| --- | --- | --- |
| M1 | Typed pins (type picker in the Job 004 small tap popup) + new marker + "Pin" copy. No long-press. No instant-save toast. | A |
| M2 | Multi-animal defaults | B |
| M3 | Logs live in pins; remove the Logs tab; one-time idempotent migration. Tabs are Map \| Guide \| You. | C |
| M4 | 3-day stub forecast + per-day pin suggestions behind `ForecastProvider` | D |

M4 depends on M1 (types) and M2 (`defaultAnimals[]`). M3 depends on M1.

### M1. Typed pins + tap-to-pin popup

Keep Job 004's small popup. Beau likes it. Add a type picker. Do not replace it with a long form, a long-press, or an instant-save toast.

- **Single tap on empty map** places a **provisional pin** at the tap point and opens the **existing Job 004 small popup** (compact name sheet with Save / Cancel). Keep its size and feel.
- **Add a type picker** to that popup: compact row or grid of type icons + labels, default **General**.
- Name field defaults to `Pin n` (editable). If the user changes type before editing the name, the default follows the type (see Auto names).
- **Save** persists the pin (user-scoped) with the chosen name and type. **Cancel** clears the provisional pin with no orphan anywhere (map, pickers, suggestions).
- No instant-save and **no Rename/Type/Undo toast**.
- **Tap existing pin** opens full pin detail (see M3). The full UI appears only there.
- **Accidental-create guard:** if a pin is selected, the popup or detail sheet is open, or the forecast sheet is open, a tap on empty map **only dismisses** that state (an open popup dismisses as Cancel). Pan, pinch, and rotate never create.
- **Press-and-hold does nothing.** It used to pull up the whole spot UI; remove it as a create path.
- Accessibility path: a small `+` control places a provisional pin at **map center** and opens the same small popup (replaces "New spot").

**Auto names**

- `{Type label} {n}`, n = next number for that type for this user (`Pin 1`, `Blind 1`, `Tree stand 3`).
- In the popup or in pin detail, changing type while the name is still the untouched auto name updates it to the new type's auto name. After a manual rename, type changes never touch the name.

**Types (fixed enum, stable keys)**

| key | Label | Icon intent |
| --- | --- | --- |
| `general` | Pin | map pin / star (default) |
| `blind` | Blind | blind / hide |
| `duck_pond` | Duck pond | duck |
| `tree_stand` | Tree stand | stand / ladder |
| `feeder` | Feeder | feeder / grain |
| `trail_cam` | Trail cam | camera |
| `parking` | Parking / access | car / P |
| `camp` | Camp | tent |
| `water` | Water | droplet |

- "Custom" = General with a user-chosen name. No user-defined types, colors, or icons in v0.
- Icons from a set already bundled in the Expo stack (for example `@expo/vector-icons` / MaterialCommunityIcons) or simple in-repo SVGs. No paid icon packs. onX is a pattern reference only; do not copy its assets or styling. Document the icon per type in `docs/job-005-build.md`.

**Marker visual**

- **Icon-in-pin** marker (teardrop or rounded badge) with a white type icon, white ~2pt outline, soft shadow. No plain dots.
- Readable on **Satellite/Hybrid and Standard**. Visual ~32–36pt; **tap target ≥44pt**.
- Body color per type from a fixed palette of ≤6 colors (types may share). **Burnt orange `#BF5700` is reserved for General and the selected state.**
- Selected: scale ~1.15 plus burnt-orange ring or name callout. One selected at a time.

**Copy**

- User-facing noun is **Pin** everywhere ("spot" disappears from visible UI). Code and data may keep the `Spot` entity name with a new `type` field; document the mapping. A code rename is optional and only if trivially safe.
- Remove the current pin explanation. Empty map shows exactly one line: **"Tap the map to drop a pin."** No hint once ≥1 pin exists.

### M2. Multi-animal defaults

- Onboarding "set your defaults" animal step becomes **multi-select chips**; Continue needs ≥1.
- You tab shows and edits the same list with the same control.
- Data: `defaultAnimals: string[]`; existing single value migrates to a one-item list. Any surface that needs one value (for example a Guide greeting) uses the first item. Keep the Job 001 animal option set.

### M3. Logs live in pins

**Navigation**

- **Remove the Logs tab.** Tabs become **Map | Guide | You**, Map default.
- Forecast does **not** become a tab and does not take Logs' slot.
- No hunt list exists outside pins, except the "Unpinned hunts" recovery list below.

**Pin detail (full UI, opened by tapping a pin)**

- Header: name, type icon/label (editable), coords.
- **Log a hunt** button (primary action). Opens the existing hunt log form with **this pin preselected**. User may switch to another pin inside the form; a pin is required to save.
- **Hunt history** for this pin: newest first, each row shows date, animal(s), and short result. Tap a row to open hunt detail (view/edit/delete, "Ask Guide" if it exists today).
- Empty history: one calm line ("No hunts logged here yet.").
- Weather-at-log stub (Job 002) keeps working and uses the pin's lat/lng.
- Notes (if present), delete pin.

**Deleting a pin that has hunts**

- Confirm dialog states the count: "This pin has N hunts. They'll move to Unpinned hunts." Deleting the pin **moves its hunts to Unpinned hunts**; nothing is deleted with it.

**Guide "log with Guide"**

- Every Guide-created log must end attached to a pin before it saves.
- If Guide was opened from a pin or hunt, that pin is preselected.
- Otherwise Guide shows a pin chooser (user's pins with type icons, most recently used first). If the user has 0 pins, Guide says to drop a pin first and offers a button that opens Map; the draft log is kept and resumes attached to the new pin, or is discarded only if the user cancels.
- Guide keeps grounding on all of the user's logs (no change to what Guide can read).

**Migration of existing logs (runs once, idempotent, nothing lost)**

1. Log already has a spot/pin id → stays attached (that pin migrates to type General).
2. Log has no pin but has its own lat/lng → attach to the **nearest pin within 400 m (~0.25 mi)**.
3. Log has lat/lng but no pin within 400 m → **create a General pin at the log's coordinates** (auto name) and attach. Reason: it's a real place the user hunted, and a pin is where logs now live.
4. Log has no pin and no coordinates → goes to **Unpinned hunts**.
- Migration writes a count per case to the dev log and to `docs/job-005-build.md` test output. Re-running it changes nothing.

**Unpinned hunts**

- Shown on **You** as "Unpinned hunts (N)" **only when N > 0**.
- Each row: open detail, **Assign to pin** (pin chooser), or delete (with confirm).
- When N reaches 0 the entry disappears.

### M4. 3-day forecast + per-day pin suggestions

**Entry**

- One compact **Forecast** control on Map (small chip, for example "3-day") that opens a bottom sheet. Map floating chrome stays quiet: at most 3 floating elements total (style toggle, `+`, forecast). Grouping style + forecast into one cluster is fine. Document the layout in `docs/job-005-build.md`.
- Not a tab. Not reachable from You or Guide in this job.

**Forecast data (spend gate)**

| Mode | When | Behavior |
| --- | --- | --- |
| **Stub (this job)** | Default | Fixed 3-day shape, `source: "stub"`, UI fully wired |
| **Live** | Only after Finley → Morgan → Beau unlock; keys outside this job tree | Swap provider behind the same `ForecastProvider` interface; no keys in the brief or git |

Stable shape (exactly 3 days, today + next 2; null numerics OK for stub):

```json
{
  "days": [
    { "date": "2026-09-24", "highF": null, "lowF": null, "windMph": null,
      "windDir": null, "conditions": null, "precipChance": null, "summary": "Stub day 1" }
  ],
  "source": "stub",
  "capturedAt": "<ISO-8601>"
}
```

**Suggestions (0–3 pins per day, rules only, no LLM)**

1. **Exclude** `parking`, `camp`, `trail_cam` (not places you sit and hunt).
2. **Weight by type vs `defaultAnimals[]`:**

| Animal group | Boosted types |
| --- | --- |
| Duck / goose (waterfowl) | `duck_pond`, `water`, `blind` |
| Deer, hog | `tree_stand`, `feeder`, `blind` |
| Dove | `water`, `feeder`, `general` |
| Other / unknown animal | no boost |

`general` is neutral (eligible, no boost) except where listed.

3. Tie-break by most recent hunt at that pin, then newest pin.
4. Each suggestion is `{ pinId, name, type, reason }`. Reason is short and true: "Duck pond, fits your duck default", "You hunted here Sep 20", "Your newest blind".
5. With stub weather, the same pins may appear on all 3 days. That's acceptable. When live fields exist later, wind/precip can rotate picks; not this job.
6. Guide tip per day is optional; it must never invent hunts or pins.

**Sheet behavior**

- Day 1 | Day 2 | Day 3, each with a weather row (null-safe) and its suggested pins (type icon + name + reason).
- Tap a suggestion: close sheet, center and select that pin on Map.
- 0 eligible pins: calm line "Drop a pin to get suggestions."
- Stub/provider failure: "Forecast unavailable" in the sheet; Map and pins keep working.

### Data model

- Pin (`Spot` entity OK): add `type` enum, default `general`; existing pins migrate to `general`.
- Hunt log: `pinId` required for new logs; nullable only for migrated Unpinned hunts.
- User: `defaultAnimals: string[]`.
- Forecast: `ForecastProvider` interface, stub implementation only.
- Local stub store OK; no backend/BaaS.
- Stable contracts for Guide (Ari) and later jobs: type keys, `defaultAnimals[]`, `pinId` on logs, forecast shape.

## Research

- Beau tested Job 004 on the Simulator (2026-09-24) and decided: keep the Job 004 tap popup and add a type picker; pins must be clearly visible and typed (blind, stand, feeder, and the rest of the fixed enum), like onX waypoints as a pattern only.
- Press-and-hold and the confusing pin explanation go away. No instant-save and no Rename/Type/Undo toast.
- Onboarding should allow more than one animal.
- The Logs tab goes away. A hunt log belongs to the pin where the hunt happened.
- The 3-day forecast and per-day pin suggestions ship in this same job, opened from Map, behind a stub `ForecastProvider`.
- Job 004 is merged on product `main` at `11d37ab`. Build on that tip or later.
- Nav lock file `PRODUCT_NAV_LOCK_2026-09-23.md` still lists Map | Logs | Guide | You. This job amends the live tabs to **Map | Guide | You**. Do not edit that lock file in this repo; the amendment is this brief.
- Old forecast-spot-suggestions (prior 005) and Job 007 map markers are superseded by this brief. They are not job folders here.
- Live weather is not researched for implementation. It stays gated. No provider keys belong in this public tree.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator happy path are in `ac.md`. Summary the tester must prove:

### A. Typed pins + tap-to-pin popup (M1)

- [ ] A1. Single tap on empty map: provisional pin at the tap point + the existing Job 004 small popup (name + Save/Cancel), same compact size
- [ ] A2. Popup includes a type picker, default General; name defaults to `Pin n` and is editable
- [ ] A3. Save persists the pin with chosen name + type; it appears on Map without relaunch. Cancel removes the provisional pin with no orphan (map, pickers, suggestions)
- [ ] A4. No instant-save and no Rename/Type/Undo toast anywhere
- [ ] A5. With a pin selected, popup/detail open, or forecast sheet open, a tap on empty map only dismisses (open popup = Cancel); no new pin. Pan/pinch/rotate never create
- [ ] A6. Press-and-hold on the map does nothing (no popup, no full UI, no pin)
- [ ] A7. `+` places a provisional pin at map center and opens the same small popup. Tapping an existing pin opens full detail, never the create popup
- [ ] A8. All 9 types available (Pin, Blind, Duck pond, Tree stand, Feeder, Trail cam, Parking / access, Camp, Water), each with a distinct icon
- [ ] A9. Type change (popup or detail) on an untouched auto name renames to `{Type} n`; after manual rename, type change keeps the name
- [ ] A10. Icon-in-pin markers (white icon, colored body, white outline, shadow); no dots remain
- [ ] A11. Markers readable on Satellite/Hybrid and Standard (screenshots of both with ≥3 types)
- [ ] A12. Tap target ≥44pt; selected = slight scale + burnt-orange ring/callout; one selected at a time; orange used only for General + selected
- [ ] A13. No visible "spot" wording anywhere; noun is "Pin"
- [ ] A14. Old pin explanation gone; empty map shows exactly "Tap the map to drop a pin."; no hint once ≥1 pin exists
- [ ] A15. Existing Job 004 pins load as General with names/coords unchanged

### B. Multi-animal defaults (M2)

- [ ] B1. Onboarding animal step is multi-select; Continue disabled until ≥1 selected
- [ ] B2. You tab shows and edits the same list; persists across relaunch
- [ ] B3. Existing single saved animal migrates to a one-item list and shows preselected; nothing that used the old value crashes

### C. Logs live in pins (M3)

- [ ] C1. Tabs are exactly **Map | Guide | You**; Map default; no Logs tab and no forecast tab
- [ ] C2. Pin detail shows name, type (editable), coords, **Log a hunt**, and that pin's hunt history (newest first: date, animal, short result)
- [ ] C3. Log a hunt from pin: form opens with that pin preselected; save requires a pin; new log appears in that pin's history without relaunch
- [ ] C4. Tapping a history row opens hunt detail; edit and delete work; "Ask Guide" still works where it existed
- [ ] C5. Weather-at-log stub attaches using the pin's coordinates and stays null-safe
- [ ] C6. Deleting a pin with hunts shows the count and moves those hunts to Unpinned hunts; no log is deleted
- [ ] C7. Guide "log with Guide" cannot save without a pin: preselected when opened from a pin/hunt, otherwise a pin chooser; with 0 pins, Guide sends the user to Map and the draft resumes attached to the new pin
- [ ] C8. Migration (seeded): log with pin stays attached; log with coords within 400 m of a pin attaches to the nearest; log with coords and no pin within 400 m gets a new General pin at its coords; log with neither lands in Unpinned hunts. Total log count before = after
- [ ] C9. Migration is idempotent: relaunch/re-run creates no duplicate pins and moves nothing
- [ ] C10. You shows "Unpinned hunts (N)" only when N > 0; Assign to pin moves the log into that pin's history; entry disappears at 0

### D. Forecast + suggestions (M4)

- [ ] D1. One compact Forecast control on Map opens a bottom sheet; map floating chrome ≤3 elements
- [ ] D2. Sheet shows exactly 3 days (today + 2) with null-safe weather rows; `source: "stub"`; no live provider call; no keys in repo
- [ ] D3. Each day lists 0–3 pins with type icon, name, and a short true reason
- [ ] D4. `parking`, `camp`, `trail_cam` pins never appear as suggestions
- [ ] D5. Type weighting follows `defaultAnimals[]` (for example a user with Duck default and a Duck pond + a Tree stand: Duck pond ranks first)
- [ ] D6. Tap suggestion: sheet closes, Map centers and selects that pin
- [ ] D7. 0 eligible pins: "Drop a pin to get suggestions."; provider failure: "Forecast unavailable"; Map keeps working
- [ ] D8. Forecast sits behind a `ForecastProvider` interface (stub only), documented in `docs/job-005-build.md`

### R. Regression locks (every milestone)

- [ ] R1. Stub sign-in unchanged (Apple primary, email secondary, no guest)
- [ ] R2. Satellite/Hybrid ↔ Standard toggle works; markers survive the toggle
- [ ] R3. Fit-to-pins on Map focus works with typed markers
- [ ] R4. Burnt-orange accent `#BF5700` unchanged; Map default home; Guide not home
- [ ] R5. No existing hunt log lost; no new API keys, paid SDKs, tile sources, or auth/BaaS changes

## User-facing UI

- Map home: full-bleed map, style toggle, `+`, typed icon-in-pin markers, selected pin affordance, empty line "Tap the map to drop a pin.", compact Forecast chip. Floating chrome ≤3.
- Create: Job 004 small popup with name, type picker, Save, Cancel. Provisional pin until Save.
- Pin detail: name, type, coords, Log a hunt, hunt history, notes if present, delete.
- Tabs: Map | Guide | You. Map is the default home. No Logs tab. Forecast is a sheet, not a tab.
- Onboarding and You: multi-select animal chips (`defaultAnimals[]`).
- You: "Unpinned hunts (N)" only when N > 0, with Assign to pin.
- Forecast sheet: Day 1 | Day 2 | Day 3, null-safe weather row, 0–3 suggested pins. Tap selects that pin on Map.
- Guide log: pin required; chooser when none is preselected.

## Payments and auth

- Payments: none. Do not invent spend. Forecast is the stub. Live weather waits on the spend gate and must not add keys to this public job tree or the product repo.
- Auth: unchanged stub sign-in (Apple primary, email secondary, no guest). No BaaS.
- Maps: Apple Maps via the existing Expo maps stack only. No new API keys, paid map SDKs, or new tile sources.

## Out of scope

- Parcels / property lines
- Job 006 visual redesign of other screens (only the surfaces this job touches get consistent, quiet styling)
- Paid map SDKs, new tile sources, paid weather without the spend gate, any new API key in the repo
- Auth / BaaS / sync
- User-defined types, colors, or icons
- Clustering, photos on pins, sharing, tracks, offline packs
- New Guide intents beyond making "log with Guide" attach to a pin
- Long-press create, instant-save, and Rename/Type/Undo toasts
- Bringing back the Logs tab, or making Forecast a tab
- onX asset or styling copies (pattern reference only)
- Secrets of any kind in this public job tree

## Constraints

- One product PR. Four commits, M1 then M2 then M3 then M4. Do not stack a second product PR for this job.
- Do not start a later milestone until that milestone's AC section and every regression lock pass.
- Document commits, icons, forecast layout, migration case counts, and `ForecastProvider` in product `docs/job-005-build.md`.
- Tester and ui: a **real finger tap on the Simulator must be exercised** (Job 004 signoff could not drive one headless). If tooling cannot, flag it. Lane runs that tap manually after merge before PASS.
- Seed the migration check with four logs: one with a pin, one with coords near a pin, one with coords far from any pin, one with neither. Counts before = after, and a second run changes nothing.
- iOS-first; Cloud Agents only for code.
- Hard hygiene: no paid weather, no API keys, no paid map SDKs, no new tile sources, no auth/BaaS, no parcels, no Job 006 redesign, no user-defined types, no clustering, no photos.
- This public job tree stays free of secrets.

## Design intent (one line)

Everything starts at a pin: tap, name it, pick its type, see what it is at a glance, log hunts there, and see which pins fit the next three days.
