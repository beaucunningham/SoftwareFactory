# Brief — Job 006: App-wide UI modernize + Forecast tab + teardrop pins

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `006-app-ui-modernize`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: product `main` after Job 005 `005-pins-logs-forecast` (accepted product tip `e8233a6` on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/7, or later once that is on `main`). Do not follow an older tmp product URL. Do not start from Job 004's `11d37ab`.  
**Build on:** Job 005 pins, logs-in-pins, and stub forecast. Do not regress Job 004/005 pin behavior.  
**Related:** `ac.md` (copy of `AC_APP_UI_MODERNIZE_v0.md`) · Job 003 quiet field-tool chrome (north star) · brand burnt orange `#BF5700` primary, `#FFFFFF` onPrimary, `#F5E6D8` muted, `#9A4600` pressed · job 001 auth/tabs · job 002 weather stub (do not regress) · job 004 map system · job 005 pins/logs/forecast (accepted)  
**Supersedes:** the narrow log-only brief `FACTORY_BRIEF_006_log-hunt-ui-polish.md` and `AC_LOG_HUNT_UI_POLISH_v0.md`. Those are pointers only. They are not tickets in this repo; leave them alone and do not recreate them. Beau override 2026-09-23: the whole app felt tacky; modernize quiet and simple. Amended 2026-09-24 (Beau via Finley, after testing Job 005): Forecast tab, one #1 pin per day, and teardrop pins. These override the earlier "no new features", "tabs unchanged", and "don't redesign 005 markers" lines, which are rewritten below.  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** Small focused Origin product pull request(s). The builder writes `factory/jobs/006-app-ui-modernize/build.md` in this repo and documents token usage in those build notes. Lane runs the iOS Simulator sweep and captures before/after shots (Map pins on satellite and standard, and the Forecast tab) for the ui worker.

Stub weather only. Paid weather stays behind the spend gate (Finley → Morgan → Beau). No API keys.

## What to build

One coherent **visual modernize** across the app, plus three scoped product changes Beau asked for. Apart from B1–B3 and the Job 005 Guide pin-chip carry-over bug, no new product features. Everything else is the same flows in a quieter shell.

| Surface | What changes |
| --- | --- |
| Map | Restrained chrome. Pins redrawn as teardrop map pins (B3). Forecast button stays. At most two floating controls (B1). |
| Forecast | New tab. The Job 005 3-day stub forecast is a full screen here. One #1 pin per day (B1–B2). |
| Log a hunt + pin picker/attach | Quiet modern form. Fields unchanged. |
| Pin detail + hunt history + Unpinned hunts | Quiet rows and empty states. |
| Guide | Chat chrome only. No new Guide intelligence. Fix the pin-chip carry-over bug, with a test. |
| You / profile + auth / onboarding | Match the quiet shell. Auth behavior unchanged. |

**Scope rule:** allowed product changes are only B1–B3 and the carry-over bug. Job 004/005 own map **behavior** (tap to drop, popup, type picker, logs in pins). This job changes presentation and where the forecast lives, not pin behavior.

### Global look

- Shared look: neutral/white surfaces, clear type hierarchy, generous spacing, one accent color for primary actions / active tab / General + selected pin.
- Absent or removed: loud gradients, thick multi-color borders, stacked toy cards, competing primary buttons, full-bleed orange panels.
- Tabs are **Map | Forecast | Guide | You**. Map remains the default home after sign-in and on relaunch.
- Chrome north star is Job 003: calm neutrals, burnt-orange **accents only**.

### B1. Forecast gets its own tab; Map Forecast button stays

Beau 2026-09-24, revised at go.

- New **Forecast** tab between Map and Guide, with a simple quiet icon. The active tab uses the orange accent like the others.
- The Job 005 3-day forecast lives in this tab as a **full screen** (not a sheet).
- The **Map Forecast button stays**. Tapping it opens the **same forecast screen** as the tab (switch to the Forecast tab, or present the same screen component). One forecast screen, not two versions.
- Map has **2 or fewer floating controls, counting the Forecast button**. Layout: (1) the Forecast button, and (2) one quiet **map options** button that opens a small menu with Satellite/Standard, Fit to pins, and Add pin at center.
- Add pin at center opens the same small popup the old `+` did. Tap-on-map stays the primary way to drop a pin.
- Satellite/Standard and Fit to pins behave exactly as before, just reached from the map options menu.
- Weather stays the Job 005 stub behind `ForecastProvider`. **No live weather API, no keys.** Live weather still needs the spend gate.
- Keep the stub/placeholder labeling Job 005 already shows so nobody mistakes it for real weather.
- Empty state when the user has no pins: one quiet line pointing back to the Map (for example "Drop a pin on the Map to get suggestions."), with no suggestion rows.
- Stub failure stays the Job 005 behavior: "Forecast unavailable"; Map and pins keep working.
- Unchanged stub contract (exactly 3 days, today + next 2; null numerics OK; `source: "stub"`):

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

This replaces Job 005's "forecast is a bottom sheet, not a tab" and "map floating chrome ≤3 (style toggle, `+`, forecast)".

### B2. One suggested pin per day

Beau 2026-09-24. This replaces Job 005's "0–3 pins per day". Ranking rules do not change. Only the count changes: show the #1 pin, or none.

- Each forecast day shows **only the #1 suggested pin** (0 or 1 per day), not up to 3.
- The #1 pin uses the existing Job 005 ranking unchanged:
  1. **Exclude** `parking`, `camp`, and `trail_cam`.
  2. **Boost by `defaultAnimals[]`** (unchanged table):

| Animal group | Boosted types |
| --- | --- |
| Duck / goose (waterfowl) | `duck_pond`, `water`, `blind` |
| Deer, hog | `tree_stand`, `feeder`, `blind` |
| Dove | `water`, `feeder`, `general` |
| Other / unknown animal | no boost |

`general` is neutral (eligible, no boost) except where listed.

  3. Tie-break by most recent hunt at that pin, then newest pin.
- The single suggestion row still uses the Job 005 row: type icon, name, and a short true reason (`{ pinId, name, type, reason }`). Do not invent a new ranking or a new reason style.
- If no pin is eligible for a day, that day shows the weather with no suggestion row (no error, no filler).
- Tapping the suggested pin opens that pin (switches to Map centered on it, or opens pin detail; pick one and use it consistently).
- User-facing word is "pin", never "spot".
- With stub weather, the same pin may appear on all 3 days. That is still acceptable.

### B3. Teardrop pins

Beau 2026-09-24. This replaces Job 005's "teardrop or rounded badge" marker and the "selected = scale ~1.15 plus burnt-orange ring" treatment. Type icons, type colors, and orange reserved for General + selected stay.

- All pin markers use the traditional **teardrop map-pin shape** (round head, pointed tip), not circles.
- The **tip sits on the pin's coordinate** (marker anchored at the bottom point, not the center), so a pin does not shift when the shape changes.
- Each of the 9 Job 005 types keeps its **own icon and color inside the pin head**. Orange stays reserved for General and the selected state.
- Readable on satellite and standard: white outline + soft shadow (or equivalent), icon legible at normal zoom.
- Tap target stays at least 44pt.
- Selected state is **calm**: a modest size bump or outline/ring, no bouncing, pulsing, or large glow.
- The provisional pin shown while the popup is open uses the same teardrop shape.
- Changing the type in the popup updates the pin's icon/color inside the teardrop live, as it does today.

### Map (behavior unchanged, chrome quieter)

Job 004/005 behaviors stay intact:

- Live map.
- Tap empty map places a provisional pin and opens the small popup (name, type picker, Save/Cancel).
- Cancel leaves no orphan.
- Add pin at center (formerly the standalone `+`, now in the map options control) opens the same popup at center.
- Press-and-hold does nothing.
- Pin tap opens detail.
- User scoping.
- Style control and the add/create path stay discoverable without dense toolbars.
- Empty map still shows the one line "Tap the map to drop a pin."

### Pin detail + Log hunt (from pin)

- Pin hunt history + Unpinned hunts: simple rows, quiet empty state.
- Log create/edit: modern simple form; one orange Save; seen/harvest/species/date/notes/weather row unchanged functionally.
- Pin picker/attach: calm sheet/list; select/clear/empty CTA; no tacky chrome.

### Guide shell + carry-over bug

- Chat bubbles, composer, and empty starters quieter and consistent with the shell.
- No new intents, memory, or model work. The chip bug below is a fix, not a new intent.

**Carry-over bug from Job 005 (fix in this job).** Source: Job 005 UI review, rated low (`docs/job-005-ui-report.md` in `hunting-companion`). In Guide chat, when Guide asks which pin a hunt belongs to, **tapping a pin chip must select that pin and continue the save**, exactly the same as typing the pin's number. Today a tap makes Guide describe the pin instead.

- Tap a pin chip: that pin is selected and the hunt saves to it (it shows in that pin's hunt history), same result as typing its number.
- Typing the pin number still works.
- Tapping a chip does not trigger a pin description or any extra Guide turn before the save.
- Add a test covering chip-tap selection.

### You + auth / onboarding

- Profile / sign out / animals + region edit surfaces match the quiet shell.
- Auth + onboarding screens updated enough to not clash with the modernized app. Behavior unchanged: Apple primary, email secondary, no guest.

## Research

- Beau override: whole app tacky; modernize (quiet, modern, simple).
- Beau tested Job 005 on 2026-09-24 ("way better") and asked for B1–B3 in this job.
- Do **not** ask Beau to pick job order. Finley sequences.
- Beau gave the go. This brief is final for Kai.
- Job 004/005 own map behavior. This job changes presentation and the forecast's location, not pin create/select behavior.
- Tokens: `#BF5700` primary, `#FFFFFF` onPrimary, `#F5E6D8` muted, `#9A4600` pressed. Document token usage in build notes.
- Job 005 is accepted. Product work for that job landed on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/7 at tip `e8233a6`. Build on product `main` after that job.
- Nav after this job is **Map | Forecast | Guide | You**. Job 005's live tabs were Map | Guide | You. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in this repo; the amendment is this brief.
- The log-only 006 brief is replaced. Do not file it.
- Live weather is not researched for implementation. It stays gated. No provider keys belong in this public tree.
- History: 2026-09-24 Job 007 was merged into `005-pins-logs-forecast`, which removed the Logs tab and moved logs into pin detail; 006 dropped the Logs list surface. The Job 005 carry-over chip bug was added the same day. Beau (via Finley) added B1, B2, and B3, replacing earlier notes that said tabs stay Map | Guide | You and that 006 must not redesign 005 markers. At go, Beau kept the Map Forecast button alongside the new tab; both open the same forecast screen, and Map stays at 2 or fewer floating controls counting that button.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### Global

- [ ] Shared look: neutral/white surfaces, clear type hierarchy, generous spacing, one accent color for primary actions / active tab / General + selected pin
- [ ] Absent or removed: loud gradients, thick multi-color borders, stacked toy cards, competing primary buttons, full-bleed orange panels
- [ ] Tabs are **Map | Forecast | Guide | You** (changed in this job, see B1); Map remains the default home after sign-in and on relaunch
- [ ] Job 004/005 behaviors intact: live map, tap empty map places a provisional pin and opens the small popup (name, type picker, Save/Cancel), Cancel leaves no orphan, add-pin-at-center (formerly the standalone `+`, now in the map options control, see B1) opens the same popup at center, press-and-hold does nothing, pin tap opens detail, user scoping

### B1. Forecast gets its own tab; Map Forecast button stays

- [ ] New **Forecast** tab between Map and Guide, with a simple quiet icon; the active tab uses the orange accent like the others
- [ ] The Job 005 3-day forecast lives in this tab as a full screen (not a sheet)
- [ ] The **Map Forecast button stays**. Tapping it opens the **same forecast screen** as the tab (switch to the Forecast tab, or present the same screen component; either way one forecast screen, not two versions)
- [ ] Map has **2 or fewer floating controls, counting the Forecast button**. Layout to hit that: (1) the Forecast button, and (2) one quiet **map options** button that opens a small menu with Satellite/Standard, Fit to pins, and Add pin at center. Add pin at center opens the same small popup the old `+` did. Tap-on-map stays the primary way to drop a pin
- [ ] Satellite/Standard and Fit to pins behave exactly as before, just reached from the map options menu
- [ ] Weather stays the Job 005 stub behind `ForecastProvider`; **no live weather API, no keys** (live weather still needs the spend gate)
- [ ] Keep the stub/placeholder labeling Job 005 already shows so nobody mistakes it for real weather
- [ ] Empty state when the user has no pins: one quiet line pointing back to the Map (for example "Drop a pin on the Map to get suggestions."), with no suggestion rows

### B2. One suggested pin per day

- [ ] Each forecast day shows **only the #1 suggested pin** (0 or 1 per day), not up to 3
- [ ] The #1 pin uses the existing Job 005 ranking unchanged: parking, camp, and trail_cam excluded; types boosted by `defaultAnimals`; ties go to most recent hunt, then newest pin
- [ ] If no pin is eligible for a day, that day shows the weather with no suggestion row (no error, no filler)
- [ ] Tapping the suggested pin opens that pin (switches to Map centered on it, or opens pin detail; pick one and use it consistently)
- [ ] User-facing word is "pin", never "spot"

### B3. Teardrop pins

- [ ] All pin markers use the traditional **teardrop map-pin shape** (round head, pointed tip), not circles
- [ ] The **tip sits on the pin's coordinate** (marker anchored at the bottom point, not the center), so a pin doesn't shift when the shape changes
- [ ] Each of the 9 Job 005 types keeps its **own icon and color inside the pin head**; orange stays reserved for General and the selected state
- [ ] Readable on satellite and standard: white outline + soft shadow (or equivalent), icon legible at normal zoom
- [ ] Tap target stays at least 44pt
- [ ] Selected state is **calm**: a modest size bump or outline/ring, no bouncing, pulsing, or large glow
- [ ] The provisional pin shown while the popup is open uses the same teardrop shape
- [ ] Changing the type in the popup updates the pin's icon/color inside the teardrop live, as it does today

### Map

- [ ] Style control + add/create path still discoverable without dense toolbars
- [ ] Empty map still shows the one line "Tap the map to drop a pin."

### Pin detail + Log hunt (from pin)

- [ ] Pin hunt history + Unpinned hunts: simple rows, quiet empty state
- [ ] Log create/edit: modern simple form; one orange Save; seen/harvest/species/date/notes/weather row unchanged functionally
- [ ] Pin picker/attach: calm sheet/list; select/clear/empty CTA; no tacky chrome

### Guide shell

- [ ] Chat bubbles/composer/empty starters quieter and consistent with shell
- [ ] No new intents, memory, or model work (the chip bug below is a fix, not a new intent)

### Carry-over bug from Job 005

- [ ] Tap a pin chip: that pin is selected and the hunt saves to it (it shows in that pin's hunt history), same result as typing its number
- [ ] Typing the pin number still works
- [ ] Tapping a chip doesn't trigger a pin description or any extra Guide turn before the save
- [ ] Add a test covering chip-tap selection

### You + auth / onboarding

- [ ] Profile / sign out / animals + region edit surfaces match quiet shell
- [ ] Auth + onboarding screens updated enough to not clash with the modernized app (behavior unchanged: Apple primary, email secondary, no guest)

### Hygiene

- [ ] Allowed product changes are only B1–B3 and the carry-over bug; nothing else new
- [ ] No live weather API, no parcels, no auth/BaaS provider swap, no new secrets or paid SDKs
- [ ] No lost logs, pins, or `defaultAnimals` data (no data migration expected in this job)
- [ ] iOS-first; Cloud Agents only; small focused PR(s)

## User-facing UI

Field tool, not toy. Same product, modern quiet chrome everywhere the hunter looks daily. Forecast is one tap away from its own tab or the Map button, and the Map keeps just two calm controls.

- Tabs: Map | Forecast | Guide | You. Map is the default home after sign-in and on relaunch.
- Map: teardrop pins (tip on the coordinate, per-type icon and color, calm selected state), Forecast button, one map options menu (Satellite/Standard, Fit to pins, Add pin at center). Empty line "Tap the map to drop a pin."
- Forecast screen: 3 stub days, placeholder labeling, at most one suggested pin per day. No-pins state is one quiet line pointing back to the Map. The Map Forecast button opens this same screen.
- Create: Job 004/005 small popup (name, type picker, Save/Cancel). Provisional pin is a teardrop. Type changes update the teardrop live.
- Pin detail and hunt history: simple rows, quiet empty state. Log form: one orange Save, fields unchanged. Pin picker: calm sheet/list.
- Guide: quieter chat chrome. Pin chip tap selects that pin and saves the hunt.
- You, auth, and onboarding: same quiet shell. Apple primary, email secondary, no guest.

## Payments and auth

- Payments: none. Do not invent spend. Forecast is the Job 005 stub. Live weather waits on the spend gate and must not add keys to this public job tree or the product repo.
- Auth: unchanged behavior (Apple primary, email secondary, no guest). No auth/BaaS provider swap.
- Maps: existing map stack only. No new API keys, paid map SDKs, or new tile sources.

## Out of scope

- Live weather / any weather API or key (still gated)
- Changing the forecast ranking rules beyond showing only the #1 pin
- Property lines / ownership
- New log fields, Guide intelligence, Map layers beyond pin/chrome polish
- Changing pin create/select behavior from Job 004/005 (tap to drop, popup, type picker, Cancel, add pin at center, press-and-hold does nothing); only the marker shape and styling change, plus add-pin-at-center moving into the map options menu
- Bringing back a Logs tab
- App rename / App Store
- Parcels, paid SDKs, secrets of any kind in this public job tree

## Constraints

- Opened after Beau's go, routed Finley → Kai. This brief is final.
- Replace/ignore the old log-only 006 brief. Do not recreate it here.
- Lane runs the iOS Simulator sweep, with before/after shots (Map pins on satellite + standard, Forecast tab) for the ui worker.
- Document token usage in `factory/jobs/006-app-ui-modernize/build.md`.
- The chip-tap fix needs a test. Typing the pin number must still work.
- iOS-first. Cloud Agents only for code. Small focused PR(s).
- Hard hygiene: no live weather API, no keys, no parcels, no auth/BaaS provider swap, no new secrets or paid SDKs, no lost logs, pins, or `defaultAnimals` data. No data migration is expected.
- This public job tree stays free of secrets.

## Design intent (one line)

One quiet modern shell, with teardrop pins on the Map and forecast in its own tab (still reachable from the Map button). No other new features.
