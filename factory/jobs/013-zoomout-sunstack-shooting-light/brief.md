# Brief — Job 013: Zoom-out bug (root-cause fix) + sun stack under Forecast + shooting-light popover

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `013-zoomout-sunstack-shooting-light`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: product `main` at `244b0ba7868c09813db961ccc58f9636e1216144` (Job 012 merged, Origin PR #14). Do not follow an older tmp product URL. Do not start from an older product tip. Do not open on a commit before `244b0ba`.  
**Stack:** Expo SDK 57, React Native, expo-router, react-native-maps (Apple Maps on iOS), in-house NOAA sun math from 012 (e.g. `src/sun/solar.ts`), 012 wind rendering (whichever path shipped: fixed markers / native `Polyline` arrows)  
**Build on:** Job 012 at Origin main `244b0ba7868c09813db961ccc58f9636e1216144`. Do not regress Job 005–012 behavior. **All 244 existing tests stay green**; new tests are added on top.  
**Related:** `ac.md` (copy of `AC_ZOOMOUT_SUNSTACK_SHOOTING_LIGHT_v0.md`, updated by Delta 2026-09-25) · Job 003/006–012 quiet field-tool chrome (north star) · brand burnt orange `#BF5700` for accents only · pin style A (locked in 007) · `note.md` (UI-check screenshots stay out of the product repo)  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** Small focused Origin product pull request(s). G1 ships in its own PR and must not ship broken. G2 and G3 may share a PR or split. The builder writes `factory/jobs/013-zoomout-sunstack-shooting-light/build.md` in this repo and documents everything listed under Constraints, including token usage. Lane runs the iOS Simulator sweep and captures the shots and recordings listed in Constraints for the ui worker.

Beau tested Job 012 on the iOS Simulator. His feedback is the build go, confirmed via Finley. Status: **FINAL, approved to build.** **The AI's user-facing name stays Scout.** **USGS The National Map `USGSTopo` tiles stay approved.** Weather and wind stay stubs, with no keys or spend. This brief is approved and final for Kai.

Chrome north star: Job 003/006–012 quiet field tool: dark by default, calm neutrals, burnt orange `#BF5700` for accents only, pin style A.

## Delta 2026-09-25

Product delta from Sage (2026-09-25). Ellis verified the per-game hours against TPWD 2026-27. This delta is already folded into G3 and the acceptance criteria below. It supersedes the earlier "pending Ellis" wording, including the nav-lock sentence that said hours were pending and the old note "Check local regs. Not legal advice."

1. Per-game hours are **FINAL**. The non-blocking "pending Ellis" item is closed. Duck and dove run sunrise −30 min to sunset. Turkey, quail & pheasant (replaces `upland`), and deer run sunrise −30 min to sunset +30 min. Feral hogs and predators have no limit.
2. Add a **Squirrel** row: sunrise −30 min to sunset +30 min. Game key `squirrel`, label `Squirrel`.
3. The hogs and predators text is **"No hour limit on private land"** (replaces "No hour limit"). Neutral gray. No countdown.
4. The note is **"Advisory only. Check local regs and verify current TPWD regulations."**

`upland` is removed. The replacement row key is `quailPheasant`, label `Quail & pheasant`. Row order: duck, dove, turkey, quailPheasant, deer, squirrel, feralHogs, predators. Default stays Duck.

Public-land warnings, public-land hog hours, and dormant dove and goose variants are Later (out of scope).

**Non-blocking, still open:** the default-animals tie-in is out of scope unless Beau says yes. The selector defaults to Duck either way. The last pick persists locally and is not tied to the profile.

## What to build

Priority order. Keep this scope exactly.

1. **G1 — TOP PRIORITY. Zooming all the way out bugs the map.** Its own PR. Must not ship broken. Beau: zooming the map all the way out bugs it (no further detail yet). Reproduce as deeply as possible without the Simulator, across **Topo, Satellite, and Standard**, with **Wind on and off**, **pins present**, and the **sun display showing**. Write the root cause with evidence. The fix direction is a native minimum zoom via `cameraZoomRange` at about continental-US scale, with no JS snap-back jolt. One `cameraZoomRange` object also owns 011's Topo max-zoom cap, with no deprecated `minZoomLevel`/`maxZoomLevel` fighting it. Add a shared region-clean function (`normalizeRegion`), and keep wind at 80 arrows or fewer with a clamped arrow length. Add regression tests and exact Simulator steps for Lane.
2. **G2 — Sun stack under the Forecast button.** The Forecast button stays top-left. The sunrise/sunset display sits **directly beneath it**, stacked **vertically**: sunrise icon + time on top, sunset icon + time below. Hit target **44pt or larger**. Supersedes 012's side-by-side chip. Same styling family as 012's chip.
3. **G3 — Shooting-light popover.** Tapping the stack opens a **small popover anchored to it** (not a screen, not a tab) with a **live `H:MM:SS` countdown** in device local time. **Red** before shooting light, **green** during, and **red** after sunset counting to the next day's shooting light, with text labels plus **"Advisory only. Check local regs and verify current TPWD regulations."** A game selector defaults to **Duck** on a fresh install. The last pick persists locally and is not tied to the profile. Per-game hours live in **ONE config table**. Hogs and predators show **"No hour limit on private land"** in neutral gray. The state logic is a pure function with per-game transition tests. Table values are final (Delta 2026-09-25): duck and dove run 30 min before sunrise to sunset. Turkey, quail & pheasant, deer, and squirrel run 30 min before sunrise to 30 min after sunset (TPWD). Hogs and predators have no limit.

**Bar order stays: Map | Pins | Forecast | Scout.** Map stays the default home. The top-right three-line You menu is unchanged.

Everything else from Jobs 005–012 stays the same. **Weather and wind data stay PLACEHOLDER/STUB** (no live feed, no keys, no spend). Sun times and shooting-light times are **calculated on the device** from the 012 NOAA math (not a feed, allowed under the hold). The Scout chat stays an on-device stub.

**This job is on-device only. No gates.** The USGS topo tiles (010) are still the only network map source. **No new dependencies unless truly needed** (justify any in build notes; none are expected).

## Build order

1. **G1 first.** Trace, reproduce in tests, root cause, fix, regression tests. **G1 must not ship broken:** the PR that merges G1 must pass every G1 item on all three styles, Wind on and off (Lane confirms on device). If the chosen clamp feels like a jolt on device, fix the feel before merge.
2. **G2** (layout only; small).
3. **G3:** config table + pure state function + tests first, then the popover UI, then the game selector, then timer/pause/VoiceOver wiring.
4. Run the full test suite (244 existing + new) and the regression checklist before handing to Lane.

Small, focused PRs: **G1 alone**. G2 and G3 may share a PR or split (builder's call).

### Builder constraint: no Simulator in the cloud

Cloud builders run on Linux and **cannot run the iOS Simulator**. For G1 especially, the builder does the **deepest reproduction possible without a device**:

- **Code tracing:** follow every path that runs on a zoom-out: `onRegionChange` / `onRegionChangeComplete` handlers, the wind re-grid, the Topo `UrlTile` props, the sun recompute, pin fit/cluster, any zoom-cap logic from 011. Write down what each one does with a world-scale region.
- **Unit/integration tests** that feed the real handlers the regions Apple Maps actually reports at world scale (see G1 "Regions to test") and assert they stay finite, bounded, and fast.
- **Reasoning about react-native-maps iOS / MapKit behavior**, citing the react-native-maps source/docs for the version in the lockfile (e.g. `minZoomLevel`/`maxZoomLevel` are **deprecated on Apple Maps in favor of `cameraZoomRange`**, per the current `docs/mapview.md`).
- **Root cause with evidence** (the code path, the input that breaks it, a failing test before the fix and passing after).
- **Exact Simulator steps for Lane**, who does the on-device confirmation (see Lane's sweep). If Lane's device result disagrees with the builder's root cause, that's reported back before merge, not patched around.

## G1. Zoom-out never bugs the map (TOP PRIORITY)

Beau: zooming the map all the way out bugs it. Reproduce at max zoom-out on **Topo, Satellite, and Standard**, with **Wind on and off**, with **pins present**, and with the **sun display showing**. Find the root cause, write it in build notes with evidence, and fix it.

- **Symptom detail from Beau: _pending_.** Finley will forward exactly what "bugs it" means (blank, frozen, flips style, arrows everywhere, crash, globe, something else). When it arrives, Finley adds a dated line here and to the AC. The builder doesn't wait: trace and test every suspect below, record what the code does at world scale, and give Lane steps that would expose each failure mode. When Beau's detail arrives, compare, and cover it if it's different.
- **Suspects (builder confirms with evidence, not guesses):**
  - **Wind re-grid at world scale.** 012 re-grids on `onRegionChangeComplete` from the visible region. At full zoom-out Apple Maps can report `latitudeDelta` near or above 180 and `longitudeDelta` near or **above 360**, centers outside [-180, 180), or regions that **cross the antimeridian**. Check for: grid counts not capped (or capped after an expensive loop), NaN/Infinity from `cos(lat)` or Mercator math at ±90°, zero/negative deltas, degenerate regions producing zero or thousands of points, arrow length in meters growing to thousands of km (native `Polyline` arrows that span huge distances draw as geodesics, curve, and can **wrap around the world as horizontal streaks**), and per-arrow overlay counts (3 polylines per arrow = 3× overlays). The 012 cap (~80 arrows) must hold for **every** region.
  - **USGS Topo `UrlTile` at low zoom.** At z 0–3 USGS tiles may be empty, slow, or missing; if `shouldReplaceMapContent` is on (011), the Apple base is hidden, so missing tiles = **blank map**. Check `minimumZ` / `maximumZ` / `maximumNativeZ`: a `minimumZ` above the current zoom with `shouldReplaceMapContent` = blank. Also tile request floods while zooming out fast.
  - **011 Topo zoom cap vs min zoom.** 011 may cap max zoom in Topo via `maxZoomLevel` (deprecated on Apple Maps) or `cameraZoomRange`. Changing one bound at runtime, mixing the deprecated props with `cameraZoomRange` (which **takes precedence** when they conflict, per the react-native-maps docs), or recomputing the range on every region change can snap the camera, fight the user's pinch, or reset the style.
  - **Sun display recomputes.** The 012 chip recalculates at the map center on settle. At world scale the center can be at extreme latitudes (polar day/night → dashes), longitudes outside [-180, 180) (bad NOAA input), or recompute many times in a burst (debounce broken, or recompute on `onRegionChange` instead of `...Complete`). Must never throw, never show NaN, never re-render the map each time.
  - **Pin clustering / fit.** Any `fitToCoordinates`, clustering, or "keep pins in view" logic that fires at world scale (e.g. snapping back, or clusters recomputed per frame).
  - **MapKit at world scale.** On recent iOS, Apple Maps may render a **3D globe** when zoomed far out; tile overlays and polylines can behave differently (or vanish) there. Builder checks what the installed react-native-maps / iOS version does and records it (a min zoom above globe scale avoids it).
  - **Remounts / style reset.** Anything that changes a `MapView` `key`, `mapType`, or conditionally renders `MapView` in response to a region/zoom value.
- **Regions to test (as unit/integration inputs):** full world `{lat 0, lng 0, latΔ 180, lngΔ 360}`; `lngΔ` 400 and 720; negative and zero deltas; NaN / Infinity fields; center lng 179.9 with lngΔ 20 (crosses antimeridian); center lng 200 and −190 (un-normalized); center lat 89.9 and −89.9; the continental-US clamp region; a normal street-level TX region. Each must produce: finite values, arrow count ≤ cap (never zero for a valid region, **or** an explicit "zoom in for wind" state, see below), sun values finite or "—", no throw, and fast (e.g. under ~5 ms per call in Jest).
- **Min zoom / clamp:**
  - The fix direction is the **native** limit: `MapView` `cameraZoomRange={{ maxCenterCoordinateDistance, animated: true }}` (iOS 13+), so MapKit stops the zoom-out itself with its normal rubber-band feel. **No JS snap-back** (`animateToRegion` after the user lets go reads as a jolt; only acceptable as a last-resort safety net for invalid regions).
  - **Scale:** continental US fits on screen. Rough math: showing the lower 48 (about 58° of longitude) across a 375–440pt-wide portrait screen is about **zoom 3–3.5**; as a camera distance, roughly **6,000–8,000 km** for `maxCenterCoordinateDistance`. Builder tunes on device (with Lane) and records the final value and the device it was tuned on.
  - Keep the 011 Topo max-zoom behavior in the **same** `cameraZoomRange` object (min distance for the Topo cap, max distance for the new min zoom) so one prop owns both bounds; don't leave the deprecated `minZoomLevel`/`maxZoomLevel` fighting it. Leaving Topo restores the normal max zoom (011 rule), without touching the min zoom.
  - Also normalize regions in one **pure** shared helper (`normalizeRegion(region)`: longitude wrapped to [-180, 180), latitude clamped to about ±85, deltas clamped to sane maxima, NaN → null), used by wind, sun, and anything else that reads the region.
- **Wind at low zoom:** keep the 012 density and the **~80-arrow cap** (≤ ~240 polyline segments if arrows are 3 segments). Arrow length in meters is clamped so arrows stay about the same on-screen size and never exceed a sane maximum (builder records it). Builder may hide wind arrows below a zoom threshold instead, **only if** the badge then says so (e.g. "Sample wind: zoom in to see arrows"); 012's rule still holds that a badge never implies a visible layer that isn't there. Prefer arrows that just work at the min zoom.
- **Tests to add:** `normalizeRegion` on all inputs above; wind grid builder on world/extreme regions (finite, capped, inside the region, fast); the zoom-range config (min/max distances per style; Topo cap preserved; one `cameraZoomRange` object, no deprecated zoom props fighting it); sun recompute at extreme centers (dash, no throw); a debounce test (a burst of 50 region changes → one recompute).

## G2. Sun stack under the Forecast button

- **Layout:** Forecast button top-left (unchanged). The sun stack sits **directly beneath it**, left edges aligned, about 8pt gap. Two rows: sunrise icon + time, then sunset icon + time. Nothing else (no labels, date, place).
- **Clear of:** safe area / status bar / **Dynamic Island**, the **wind badge + legend** (move the badge if it now collides; record where), the **glass bar**, the **top-right hamburger (You menu)**, Map Tools button, Topo attribution / Apple legal, and the coach-mark tour's cutouts.
- **Styling:** same family as 012's chip (glass or dark like the bar; Reduce Transparency → solid dark; text/icons 4.5:1 over bright Satellite and dark Standard; no orange panel).
- **Now tappable (supersedes 012's "non-interactive"):** whole stack is one button with at least a 44×44pt hit target; tapping opens the G3 popover and **never drops a pin**.
- **Devices:** smallest and largest iPhone Simulators installed (e.g. iPhone SE 3rd gen 375×667pt and a Pro Max 440×956pt class); builder records devices and insets.
- **Values unchanged from 012 rules** (today at map center; recalc on settle, foreground, midnight).
- VoiceOver: "Sunrise 7:31 AM, sunset 6:54 PM, button. Shows shooting light."

## G3. Shooting-light popover

- **What it is:** a **small popover anchored to the sun stack** (below/right of it, with a small arrow pointing at the stack). Placement can reuse 012's pure `placeTooltip` function. Not a new screen, sheet, or tab.
- **Dismiss:** tap outside (the dismissing tap is **consumed**: it does not also drop a pin or hit a control, recommended; builder confirms and records), **map pan/zoom** closes it, **tab switch** closes it, opening the You menu / Map Tools / coach-mark tour closes it. Builder confirms each.
- **Contents (top to bottom):**
  1. **Game selector:** a tappable row, e.g. "Duck ▾". Opens a small in-popover menu/list of games (in-house; **no new menu library**). Default **Duck** on a fresh install. Choosing a game updates everything below immediately. Last pick persists locally and is not tied to the profile.
  2. **Clock:** `H:MM:SS` countdown (e.g. "1:12:05", "11:15:00"), large, tabular digits so it doesn't jitter.
  3. **State text** (so color is never the only signal): **"Until shooting light"** (before), **"Shooting light ends in"** (during), **"Until tomorrow's shooting light"** (after), **"No hour limit on private land"** (no-limit games), **"Sun times unavailable here"** (polar/invalid).
  4. **Labels:** "Shooting light 7:01 AM" and the end label: **"Sunset 6:54 PM"** when the end is sunset, **"Ends 7:24 PM (30 min after sunset)"** style when offset (builder picks exact copy; must be clear). After sunset, labels show **tomorrow's** start (e.g. "Shooting light tomorrow 7:02 AM").
  5. **Note:** "Advisory only. Check local regs and verify current TPWD regulations."
- **Location and time:** sun math at the **map center when the popover opens** (pan closes it, so the point is fixed while open). Times in the **device's local time zone** (012 rule), `h:mm AM/PM`, rounded to the nearest minute for labels; the countdown runs to the **exact** instant (seconds).
- **Phases (per selected game's rule):**
  - **Before** (now < today's start): **red**, counting down to today's start.
  - **During** (start ≤ now < end): **green**, counting down to today's end.
  - **After** (now ≥ today's end): **red**, counting down to the **next local day's** start, computed from **tomorrow's sunrise** (not today's + 24h).
  - **No limit** (start and end both null): **neutral gray**, clock replaced by "No hour limit on private land".
  - **Unavailable** (sunrise/sunset missing for a day needed, e.g. polar night/midnight sun, or invalid coords): neutral, clock shows "—", state text "Sun times unavailable here". Never NaN, never a wrong-day time, never a throw.
  - Boundaries: **start is inclusive, end is exclusive** (at exactly start → During; at exactly end → After). Remaining seconds = `ceil((target − now) / 1000)`.
  - "Today"/"tomorrow" are **device local calendar days**. Watch the trap: after ~7 PM CDT the **UTC** date is already tomorrow; computing "tomorrow" from the UTC date would skip a day.
- **Config table (ONE place):** e.g. `src/sun/shootingLightRules.ts`. Values are **FINAL** (Ellis verified 2026-09-25 against TPWD 2026-27). The builder must not change them.

  ```ts
  // FINAL. Ellis (Hunt Research) verified 2026-09-25 against TPWD 2026-27.
  // Builder must NOT change these values.
  type Anchor = { anchor: 'sunrise' | 'sunset'; offsetMin: number };
  type GameRule = { game: GameKey; label: string; start: Anchor | null; end: Anchor | null };

  export const DEFAULT_GAME: GameKey = 'duck';
  export const SHOOTING_LIGHT_RULES: GameRule[] = [
    { game: 'duck',          label: 'Duck',             start: { anchor: 'sunrise', offsetMin: -30 }, end: { anchor: 'sunset', offsetMin: 0 } },
    { game: 'dove',          label: 'Dove',             start: { anchor: 'sunrise', offsetMin: -30 }, end: { anchor: 'sunset', offsetMin: 0 } },
    { game: 'turkey',        label: 'Turkey',           start: { anchor: 'sunrise', offsetMin: -30 }, end: { anchor: 'sunset', offsetMin: 30 } },
    { game: 'quailPheasant', label: 'Quail & pheasant', start: { anchor: 'sunrise', offsetMin: -30 }, end: { anchor: 'sunset', offsetMin: 30 } },
    { game: 'deer',          label: 'Deer',             start: { anchor: 'sunrise', offsetMin: -30 }, end: { anchor: 'sunset', offsetMin: 30 } },
    { game: 'squirrel',      label: 'Squirrel',         start: { anchor: 'sunrise', offsetMin: -30 }, end: { anchor: 'sunset', offsetMin: 30 } },
    { game: 'feralHogs',     label: 'Feral hogs',       start: null, end: null },
    { game: 'predators',     label: 'Predators',        start: null, end: null },
  ];
  ```

  - Duck covers waterfowl for now (label may read "Duck"; builder doesn't add a separate goose row). Dormant dove and goose variants are Later.
  - `upland` is not a key. Quail & pheasant replaces it.
  - v0 supports only `start`/`end` both set, or both null. Anything else (one null, unknown anchor) is rejected by a test on the table, so a bad edit can't ship.
- **TPWD cross-check (Sage, 2026-09-25; Ellis verified the table the same day):**
  - **Duck and dove: one-half hour before sunrise to sunset. Verified.** TPWD Outdoor Annual, valid Sep. 1, 2026 – Aug. 31, 2027: Migratory Game Bird General Rules, "Shooting Hours: One-half hour before sunrise to sunset." https://tpwd.texas.gov/regulations/outdoor-annual/hunting/migratory-game-bird-regulations/general-rules · Hunting Definitions, "Legal shooting hours for migratory game birds: one-half hour before official sunrise to official sunset except during the Special White-winged Dove Days (noon to sunset)." https://tpwd.texas.gov/regulations/outdoor-annual/hunting/general-regulations/definitions · also the Duck and Dove species pages (https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/duck, https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/dove): "From one-half hour before sunrise to sunset." Rule text: 31 TAC §65.313(c) (https://www.law.cornell.edu/regulations/texas/31-Tex-Admin-Code-SS-65-313).
  - **Turkey, quail & pheasant, deer, and squirrel: one-half hour before sunrise to one-half hour after sunset.** Definitions page covers game animals and nonmigratory (upland) game birds. This table labels that bird row **Quail & pheasant** (not `upland`). **Squirrel** uses the same window; Ellis verified it against TPWD 2026-27.
  - **Feral hogs / predators: no hour limit on private land.** TPWD Nongame, Exotic… Species: nongame species "may be hunted at any time by any lawful means or methods on private property… If hunting at night, as a courtesy please contact your local game warden"; feral hogs and coyotes covered there (https://tpwd.texas.gov/regulations/outdoor-annual/hunting/nongame-and-other-species). The on-screen line is **"No hour limit on private land"**. Public-land warnings and public-land hog hours are Later.
  - **Later, not built:** public-land warnings, public-land hog hours, dormant dove and goose variants, Special White-winged Dove Days (noon to sunset; eliminated in the South Zone for 2026-27, TPWD news release 2026-04-01, https://tpwd.texas.gov/newsmedia/releases/?req=20260401b), the Light Goose Conservation Order (eliminated, TPWD Commission 2024), falconry, youth/special seasons, and furbearers at night with artificial light. TPWD's "official sunrise/sunset" comes from its Sunrise/Sunset Computations tables, which may differ by a minute or so from NOAA at the map center; the advisory note covers this.
- **Game selection persistence:** last selected game saved locally per install (AsyncStorage, e.g. `shootingLight.game.v1`). **Fresh install starts on Duck.** An unknown/removed stored key falls back to Duck. **Not tied to profile default animals** (out of scope unless Beau says yes).
- **Pure state function (required):** e.g. `getShootingLightState({ now: Date, lat: number, lon: number, rule: GameRule })` → `{ phase: 'before' | 'during' | 'after' | 'noLimit' | 'unavailable', target: Date | null, remainingSec: number | null, start: Date | null, end: Date | null, startIsTomorrow: boolean, stateText: string }`. No `Date.now()`, no React, no time-zone globals inside; the caller passes `now`. Uses the 012 NOAA sunrise/sunset for the local date (and next local date). Per-game transition tests are required.
- **Colors (dark surface, no orange):** popover backing is **solid dark** (e.g. `#1C1C1E` at ≥ 95% opacity, or glass with a dark scrim behind the clock) so contrast doesn't depend on the basemap. Suggested: **red `#FF6B6B`** (≈ 6.1:1 on `#1C1C1E`), **green `#4ADE80`** (≈ 9.8:1), neutral gray `#E6E6E6` (≈ 13.6:1) for "No hour limit on private land". Builder may pick others that pass **4.5:1** and are clearly distinct from the `#BF5700` accent; records final values and ratios.
- **Timer approach:** the clock lives **inside the popover component** (the Map screen must not re-render every second). Tick with a `setTimeout` aligned to the next whole second, and on every tick **recompute from the current time** via the pure function (never decrement a counter, so it can't drift). **Pause** (clear the timer) when the popover closes or the app goes to `background`/`inactive` (`AppState`); on return to `active`, **resync immediately** from the current time. Phase changes (e.g. hitting shooting light while open) happen on the next tick with no reopen.
- **Reduce Motion:** popover appears/disappears instantly or with a plain fade ≤ ~150ms; digits change with no animation (no flip/slide/pulse); color changes are instant.
- **VoiceOver:** focus moves into the popover on open; the popover reads as one summary, e.g. "Duck. Until shooting light, 1 hour 12 minutes. Shooting light 7:01 AM. Sunset 6:54 PM. Advisory only. Check local regs and verify current TPWD regulations." The clock's accessibility label updates at **minute** granularity (no live region ticking each second). Announce once on phase change (e.g. "Shooting light started") via `AccessibilityInfo.announceForAccessibility`. The game selector reads "Game, Duck, button" and the menu items are reachable. Escape (two-finger Z) closes the popover.
- **Dev-only time override (optional):** if the builder adds a debug time override to hit phases, it must be **`__DEV__`-only**, unreachable in release builds, and never persisted into production state. Build notes say how to use it.
- **Verified test values (±2 min where from sources; seconds from NOAA eq.):** Dallas, TX (32.7767, −96.7970). Sources and cross-checks for sunrise/sunset are in the 012 brief (timeanddate.com, USNO API, NOAA equations). Derived shooting-light instants below were computed by Sage with the NOAA equations at those coords (they reproduce 012's NOAA values to the second). Turkey, quail & pheasant, deer, and squirrel share the sunset +30 end. Duck and dove share sunset +0.

| Local date | Sunrise | Sunset | Duck/dove start (−30) | Deer/turkey/quail/squirrel end (+30) | Zone |
|---|---|---|---|---|---|
| 2026-10-15 | 7:31:21 AM (12:31:21Z) | 6:53:57 PM (23:53:57Z) | **7:01:21 AM** (12:01:21Z) | 7:23:57 PM (00:23:57Z Oct 16) | CDT |
| 2026-10-16 | 7:32:06 AM (12:32:06Z) | 6:52:46 PM | **7:02:06 AM** (12:02:06Z) | — | CDT |
| 2026-10-31 | 7:44:08 AM | 6:36:56 PM (23:36:56Z) | 7:14:08 AM | — | CDT |
| 2026-11-01 (DST ends 2 AM) | **6:45:00 AM CST** (12:45:00Z) | 5:36:01 PM CST | **6:15:00 AM CST** (12:15:00Z) | — | CST |
| 2027-03-13 | 6:40:10 AM CST | 6:33:33 PM CST (00:33:33Z Mar 14) | 6:10:10 AM CST | — | CST |
| 2027-03-14 (DST starts 2 AM) | **7:38:53 AM CDT** (12:38:53Z) | 7:34:18 PM CDT | **7:08:53 AM CDT** (12:08:53Z) | — | CDT |

  - Dallas 2026-10-15 matches the 012 AC (sunrise 7:31 AM, sunset ~6:54 PM → shooting light ~7:01 AM).
  - Tests assert **UTC instants** (or pin `TZ=America/Chicago`) so they pass on any CI time zone; ±2 min tolerance on instants, exact arithmetic on offsets and phase logic.

## Research

- **Base:** Job 012 landed at Origin main `244b0ba7868c09813db961ccc58f9636e1216144` (Origin PR #14). Don't open on an older commit.
- **Names/sources unchanged:** AI is **Scout**; topo is USGS `USGSTopo` (approved, attribution required); sun math is the in-house NOAA module from 012.
- **Nav lock amendment (2026-09-25, Job 012 landed; Job 013 approved, Beau go):** Job 012 landed on main `244b0ba`. Tabs stay **Map | Pins | Forecast | Scout** (Map default); You menu stays top-right. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. The amended lock text Sage handed with this brief is the source for the Job 013 nav changes; G2 and G3 above are the working spec, and **Delta 2026-09-25** updates the note and closes the "pending Ellis" sentence in the lock text. The new amendment, as handed, in full:

  > Amendment 2026-09-25 (Job 012 landed; Job 013 approved, Beau go). Job 012 landed on main `244b0ba`. Tabs stay **Map | Pins | Forecast | Scout** (Map default); You menu stays top-right.
  > - **Sun stack replaces the side-by-side chip:** the Forecast button stays **top-left**; the sunrise/sunset display sits **directly beneath it**, stacked vertically (sunrise icon + time, then sunset icon + time). Supersedes 012's side-by-side top-left chip. It stays clear of the safe area, Dynamic Island, wind badge/legend, glass bar, and You menu. It still doesn't count toward Map's floating controls.
  > - **Shooting-light popover:** tapping the sun stack opens a small popover anchored to it (not a screen or tab) with a game selector (default Duck, not tied to profile animals), a live countdown to/through legal shooting light, and "Check local regs. Not legal advice." Per-game hours live in one config table, pending Ellis (Hunt Research) verification.
  > - **Map minimum zoom:** the Map stops zooming out at about continental-US scale (Job 013 G1).
  > - Sun and shooting-light times are calculated on the device (no network, no key). Weather and wind data stay placeholder until Beau's go.

  Delta 2026-09-25 replaces that popover sentence for workers: the note is **"Advisory only. Check local regs and verify current TPWD regulations."** Hours are **final** (Ellis verified), the table includes Squirrel and Quail & pheasant (not `upland`), and hogs and predators say **"No hour limit on private land"**.

- No live weather/wind, no AI model, no keys, no spend. Sun math and shooting-light math are on-device. No schema changes beyond the local game-selection preference.
- Do not edit Job 001–012 files.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### G1. Zoom-out never bugs the map (TOP PRIORITY)

**Symptom detail from Beau: _pending_** (Finley to forward; add the dated text here).  
**Failure mode found by builder:** _(filled in build notes: suspect, code path, breaking input, evidence)_

- [ ] Builder traced every zoom-out code path (wind re-grid, Topo `UrlTile`, zoom range/caps, sun recompute, pin fit/cluster, anything keyed on region) and recorded what each does at world scale, across Topo, Satellite, and Standard, Wind on and off, pins present, sun display showing
- [ ] **Root cause** in build notes with evidence: the code path, the input that breaks it, and a test that **failed before the fix and passes after**. If several causes, each is listed
- [ ] **Minimum zoom** set natively via `cameraZoomRange` at about **continental-US scale**; final value (distance and/or zoom), and why, recorded. Zoom-out stops with MapKit's normal feel; **no snap-back jolt**
- [ ] One `cameraZoomRange` object owns the min zoom and the 011 Topo max-zoom cap. Deprecated `minZoomLevel`/`maxZoomLevel` do not fight it. Topo stays Topo at max zoom-in; leaving Topo restores normal max
- [ ] **10-cycle test (Lane):** street level → minimum zoom → street level, **10 times on each of Topo, Satellite, Standard**, once with **Wind on** and once with **Wind off**, with **20+ pins** and the **sun stack** showing. Every cycle: map stays visible (tiles or basemap, never blank beyond a brief tile load), responsive (pan/pinch/taps within about a second), **same style** (picker and tiles), no freeze, no jank beyond a brief tile load, no crash
- [ ] **Wind arrow count bounded** at every zoom: **≤ 80 arrows** (≤ ~240 polyline segments if 3 per arrow); arrow length clamped; arrows stay about the same on-screen size, no world-wrapping streaks; never zero for a valid region unless the badge explicitly says "zoom in" (and that state is recorded)
- [ ] **Sun display sane** at every zoom and center: real times or "—", never NaN / Invalid Date, no recompute storm (one recompute per settle)
- [ ] No `MapView` remount or style change triggered by zoom
- [ ] One pure shared `normalizeRegion` (or equivalent) used by wind and sun
- [ ] **Regression tests:** `normalizeRegion` + wind grid on world / `lngΔ` > 360 / negative / zero / NaN / antimeridian / un-normalized center / ±89.9° regions (finite, ≤ cap, fast); zoom-range config per style; sun at extreme centers; debounce burst → one recompute
- [ ] Exact Simulator steps for Lane are in build notes. When Beau's symptom arrives: Lane repeats his exact steps; covered

### G2. Sun stack under the Forecast button

- [ ] Forecast button stays **top-left**; the sun stack sits **directly beneath it**, left-aligned, ~8pt gap
- [ ] **Vertical:** sunrise icon + time on top, sunset icon + time below. Nothing else. Supersedes 012's side-by-side chip
- [ ] Clear of safe area / status bar / Dynamic Island, wind badge + legend, glass bar, top-right You menu, Map Tools, Topo attribution / Apple legal, and coach-mark cutouts, on the **smallest and largest iPhone** (devices and insets recorded)
- [ ] Same styling family as 012's chip; Reduce Transparency → solid; 4.5:1 over bright Satellite and dark Standard; no orange panel
- [ ] Hit target ≥ 44×44pt; tap opens G3; **never drops a pin**; doesn't block map taps around it
- [ ] Values unchanged from 012 rules (today at map center; recalc on settle, foreground, midnight)
- [ ] VoiceOver: "Sunrise 7:31 AM, sunset 6:54 PM, button. Shows shooting light."
- [ ] Nav lock amendment in place (supersedes 012 side-by-side chip)

### G3. Shooting-light popover

**Popover**

- [ ] Tap the sun stack → **small popover anchored to it** (arrow pointing at the stack), on-screen and clear of the Dynamic Island, bar, and You menu on SE and Pro Max
- [ ] Closes on: tap outside (tap consumed; no pin drop, recorded), map pan/zoom, tab switch, opening You menu / Map Tools / tour. Builder confirms each
- [ ] Contents: game selector, `H:MM:SS` clock (tabular digits), state text, start/end labels, "Advisory only. Check local regs and verify current TPWD regulations."

**Game selector**

- [ ] Tappable row (e.g. "Duck ▾") opens an in-popover list of the games in the config table (including Squirrel and Quail & pheasant; no `upland`); choosing one updates clock, color, state text, and labels immediately
- [ ] **Default Duck** on fresh install; last selection persists locally; unknown stored key → Duck
- [ ] Not tied to the profile or to profile default animals
- [ ] No new menu/dropdown dependency

**Phases and clock**

- [ ] **Before** start: **red**, "Until shooting light", counting to today's start
- [ ] **During:** **green**, "Shooting light ends in", counting to today's end (sunset for Duck and dove; sunset + 30 for Turkey, Quail & pheasant, Deer, and Squirrel)
- [ ] **After** end: **red**, "Until tomorrow's shooting light", counting to **tomorrow's** start from **tomorrow's sunrise**; labels show tomorrow's start
- [ ] **No-limit games** (Feral hogs, Predators): "No hour limit on private land", **neutral gray**, no countdown
- [ ] **Polar / invalid:** "—" + "Sun times unavailable here", neutral, no throw
- [ ] Start inclusive, end exclusive; remaining = ceil(seconds); format `H:MM:SS` (e.g. 0:00:01, 1:12:05, 11:15:00)
- [ ] Device local time; labels `h:mm AM/PM`; Dallas 2026-10-15 Duck shows "Shooting light 7:01 AM", "Sunset 6:53–6:54 PM"
- [ ] Red / green / neutral pass **4.5:1** on the popover surface; distinct from `#BF5700`; color never the only signal (state text always shown). Final hex values + ratios recorded

**Config**

- [ ] **One** config table keyed by game (`start`/`end` = `{anchor, offsetMin}` or `null`); UI and state function read only from it
- [ ] Values exactly as in Delta 2026-09-25 and the table in G3 above, with the "FINAL. Ellis verified 2026-09-25 against TPWD 2026-27; builder must not change" comment
- [ ] A table-validation test (both set or both null, known anchors, finite offsets, unique keys, Duck present as default, `quailPheasant` and `squirrel` present, no `upland` key)

**Timer**

- [ ] Clock lives in the popover; the Map screen doesn't re-render each second
- [ ] Aligned 1s tick, recomputed from current time each tick (no drift); phase flips live while open
- [ ] **Pauses** when closed or backgrounded; **resyncs** immediately on foreground (no stale value, no catch-up burst)

**Accessibility**

- [ ] Reduce Motion: instant or ≤150ms fade; no digit animation
- [ ] VoiceOver: focus into the popover; reads game, state, remaining (minute granularity), start/end labels, the advisory note; **no per-second announcements**; one announcement on phase change; selector and menu items reachable; escape closes

**Tests (pure function, TZ-independent)**

- [ ] Dallas 2026-10-15, **Duck:** 12:01:20Z → before, 1s; 12:01:21Z → during; 23:53:56Z → during, 1s to end; 23:53:57Z → after, target = Oct 16 start ≈ 12:02:06Z (not 12:01:21Z + 24h)
- [ ] Dallas 2026-10-15, **Deer:** 23:53:57Z (sunset) → **still during**; 00:23:56Z Oct 16 → during, 1s; 00:23:57Z → after. Turkey, quail & pheasant, and squirrel share this end offset (asserted by the table test)
- [ ] **Feral hogs** (and Predators) → noLimit at any time, state text "No hour limit on private land", target/remaining null
- [ ] **Local-day trap:** Dallas 2026-10-15 20:00 CDT (01:00Z Oct 16) → after, target = Oct 16 start (not Oct 17)
- [ ] **DST end:** now 2026-10-31 20:00 CDT (01:00Z Nov 1), Duck → after, target Nov 1 start ≈ 12:15:00Z (6:15 AM CST), remaining ≈ **11:15:00** (not 12:15:00)
- [ ] **DST start:** now 2027-03-13 20:00 CST (02:00Z Mar 14), Duck → after, target ≈ 12:08:53Z (7:08 AM CDT), remaining ≈ 10:08:53
- [ ] Polar: Longyearbyen (78.2232, 15.6267) 2026-12-21 and 2026-06-21 → unavailable, no throw; NaN coords → unavailable
- [ ] `H:MM:SS` formatter (0, 1, 59, 3600, 40500 s); game persistence (fresh → Duck; stored → restored; unknown → Duck); timer pause/resync (fake timers + mocked `AppState`) if the test setup supports it, otherwise documented

### Regression checklist (008–012 behavior must hold)

- [ ] **Tests:** all **244 existing tests green**, plus the new G1–G3 tests
- [ ] **012 F1 wind:** Wind on shows visible sample arrows on **Topo, Satellite, and Standard** over a working map (pan, pinch, taps land); **"Sample wind" badge** + mph legend only while arrows show; Wind off leaves nothing behind, no remount
- [ ] **010/011 Topo:** stays Topo at every zoom (now including min zoom), never Standard or blank; USGS attribution visible
- [ ] **012 F2 tour arrows:** tip on the target center on SE and Pro Max, first run and after replay
- [ ] **012 F3 sun times** on every 7-day and 3-day forecast row; no "sample" label on sun times
- [ ] **011 E3:** thin light gray selected-tab line (no capsule)
- [ ] **011 E4:** no Scout **suggestion** chips (hunt-log step chips only while logging)
- [ ] **008 ruler:** drag from the end dot, live segment + label, Undo/Done; works on Topo and with Wind on
- [ ] **009 C7 tap-to-pin:** 20 single taps on empty map (3 styles, Wind on, next to the sun stack) all open the new-pin popup
- [ ] **Pin popup:** 20 taps on existing pins (3 styles, Wind on) all open that pin's popup
- [ ] **012 F4 extras, if they shipped:** F4a Appearance (Dark / Match iPhone) still works, and the sun stack + popover look right in light if Match iPhone is on; F4b Pins search filters/clears
- [ ] Forecast button opens Forecast; glass see-through; "Scout" everywhere; dark default; pin style A; orange accent only; no pin/log data lost

### Hygiene

- [ ] Only G1–G3 are new
- [ ] No live weather or wind, no backend or account changes, no keys, no spend
- [ ] No new dependencies (or each one justified in build notes)
- [ ] Sun and shooting-light math on-device; no new network calls; USGS tiles still the only network map source
- [ ] No schema changes beyond the local game-selection preference
- [ ] Any debug time override is `__DEV__`-only
- [ ] iOS-first; Cloud Agents only; small focused PR(s) (G1 on its own)

## User-facing UI

Zoom out as far as the app lets you and the map just stops there: same style, arrows still sane, nothing broken. The sunrise and sunset stack sits right under Forecast, and one tap tells a hunter how long until it's legal, and how long until it isn't, for the game they're after.

- Street zoom to the minimum and back, on Topo, Satellite, and Standard, Wind on and off, stays a working map. The stop is MapKit's own feel, not a snap back.
- The sun stack is vertical under the top-left Forecast button (sunrise on top, sunset below), at least 44pt, and opens the popover without dropping a pin.
- The popover is red before shooting light, green during, and red after sunset counting to tomorrow. Hogs and predators say "No hour limit on private land" in neutral gray. The note says "Advisory only. Check local regs and verify current TPWD regulations." Duck is the fresh-install default; the last pick sticks on the device.

## Payments and auth

- Payments: none. Do not invent spend. Weather stays the on-device stub. Wind stays the `WindSource` stub. The Scout chat stays an on-device stub. No live weather or live wind API. No keys, accounts, or spend. No parcels or paid map layers. Sun times and shooting-light times are calculated on the device; that is not a feed and not a key.
- Auth: unchanged behavior (Apple primary, email secondary, no guest). No auth/BaaS provider swap. No account changes. Game selection is not stored on the profile.
- Maps: existing Apple Maps stack plus the 010 USGS `USGSTopo` `UrlTile` only. No other tile provider. No new API keys or paid map SDKs. No new dependency unless justified in build notes.
- Location: sun times and shooting light use the map center, not GPS. No new location-permission dependency.
- Schema: no stored schema changes beyond the local game-selection preference.

## Decisions for Beau

- **Non-blocking:** the default-animals tie-in is out of scope unless Beau says yes. The selector defaults to Duck either way. The last pick persists locally and is not tied to the profile.
- Per-game hours are **final** (Ellis verified 2026-09-25 against TPWD 2026-27). Not an open item. See Delta 2026-09-25.

## Later (not in this job)

- **State-specific legal hours** (TX only for now) and **tying the selector to the user's default animals** (unless Beau says yes)
- **Public-land warnings**, **public-land hog hours**, and **dormant dove and goose variants**
- Special cases: white-winged dove special days (eliminated for 2026-27), conservation-order hours, falconry, public-land / refuge stricter hours, youth/special seasons, night hunting rules for furbearers
- Using TPWD's official sunrise/sunset tables instead of NOAA at the map center
- Shooting-light **alarm notification**
- The popover on **pin detail** and **forecast rows**
- **Moon phase**
- Everything still on the 012 Later list (live wind/weather behind a Beau go, wind time slider, gusts, offline topo cache, GPS-location sun times, 24-hour setting, viewed-place time zone, Skia wind retry)

## Out of scope

- Live weather/wind or any live data API
- Backend, sync, or account changes
- New paid SDKs, keys, or spend; new tile providers
- Notifications/alarms
- State-specific rules (beyond the TX table)
- Tying to profile default animals (unless Beau says yes)
- Public-land warnings, public-land hog hours, and dormant dove and goose variants
- Anything not in G1–G3
- Editing Job 001–012 files

## Constraints

- Status: **FINAL, approved to build** (Beau's Simulator feedback on 012 is the go, confirmed via Finley)
- Base: Origin main **`244b0ba7868c09813db961ccc58f9636e1216144`** (Job 012 landed, Origin PR #14)
- Do not touch product code from this SoftwareFactory ticket. Workers build on the product repo.
- **Build notes must include:**
  - **G1:** Beau's symptom (once forwarded) and how it compares; the failure mode(s) found; the **root cause** with evidence (code path, breaking input, failing-then-passing test); the fix; the **min-zoom choice** (prop, value in distance/zoom, device tuned on, why it feels natural); that one `cameraZoomRange` owns both bounds; final wind cap and arrow-length clamp; exact Simulator steps and what Lane should see on device
  - **G2:** final layout (offsets, gap, where the wind badge sits now), devices and insets tested
  - **G3:** **config location** (file path) and shape; state-function signature; **timer approach** (tick alignment, recompute, pause/resync, AppState handling); dismiss behavior (tap outside consumed or not); colors + contrast ratios; persistence key; VoiceOver copy; the dev-only time override (if added) and how to use it
  - Any dependency added and why (none expected)
  - Test count before/after (244 → N), all green
  - Token usage
- **Lane Simulator signoff (shots / recordings):**
  - **Recording:** zoom street → min → street on **Topo, Satellite, Standard**, Wind **on**, with 20+ pins and the sun stack (a couple of cycles each), plus a note that all 10 cycles per style (Wind on and off) passed
  - Stills at **minimum zoom** on each style, Wind on (arrow count sane, badge + legend) and Wind off
  - **Recording:** fast repeated pinch-out at min zoom (clamp feels natural, no jolt)
  - Sun stack under the Forecast button on **SE and Pro Max**, over bright Satellite and dark Standard, with Wind on (badge clear)
  - **Popover stills in all three phases** (Before red, During green, After red with tomorrow's time), plus **Feral hogs "No hour limit on private land"** and **Deer** (or Squirrel) during the sunset→sunset+30 window if reachable
  - **Recording:** popover open ~10 seconds (ticking), then game switch Duck → Deer → Squirrel → Feral hogs, then dismiss by tap outside (no pin dropped), then reopen and dismiss by pan
  - Background ~30s and return with the popover open (clock resynced)
  - VoiceOver on the popover; Reduce Motion on
  - Kill and relaunch: last game restored
  - Test run output showing all tests green
  - **How to hit the phases** (any of): (a) **no-code:** pan the map center, since sun math follows the map center while times show in device time. During a US morning, a center in **Hawaii** is before shooting light, **Dallas** late morning is during, **Tokyo** is after sunset; pick by time of day; (b) change the **Mac's** time zone / date (the Simulator follows the host clock) and relaunch the app; (c) the builder's `__DEV__`-only time override, if added
- UI-check screenshots must not be committed to the product repo. Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this job folder. See `note.md`. The same rule is already in `.cursor/agents/ui.md` from Job 008.
- Document token usage and the items above in `factory/jobs/013-zoomout-sunstack-shooting-light/build.md`.
- iOS-first. Cloud Agents only for code. Small focused PR(s). G1 gets its own PR. G2 and G3 may share a PR or split.
- Hard hygiene: no live weather, no live wind, no backend, no account changes, no new paid SDKs, no keys, no spend. No new dependency unless justified in build notes. USGS topo tiles from 010 remain the only network map source. Sun math and shooting-light math are on-device.
- This public job tree stays free of secrets.
- Do not edit any Job 001–012 files.

## Design intent (one line)

Zoom out as far as the app lets you and the map just stops there, like it's supposed to: same style, arrows still sane, nothing broken. The sunrise and sunset stack sits right under Forecast, and one tap tells a hunter the only thing that matters at 6:40 in the blind: how long until it's legal, and how long until it isn't, for the game they're after.
