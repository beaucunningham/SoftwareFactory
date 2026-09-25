# AC — Zoom-out fix (root cause) + sun stack under Forecast + shooting-light popover (job 013)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_ZOOMOUT_SUNSTACK_SHOOTING_LIGHT_v0.md`, updated by **Delta 2026-09-25**. No secrets. **Status: FINAL, approved to build.** Beau's iOS Simulator feedback on Job 012 is the build go, confirmed via Finley. Per-game hours are **final** (Ellis verified 2026-09-25 against TPWD 2026-27). Weather and wind stay stubs (no live feed, no keys, no spend). Sun and shooting-light times are calculated on the device (012 NOAA math). **The AI's user-facing name stays Scout.** Bar is **Map | Pins | Forecast | Scout**. Dark default, `#BF5700` accent only, pin style A. USGS topo stays approved. **All 244 existing tests stay green.** No new dependencies unless justified in build notes.

**Job id:** `013-zoomout-sunstack-shooting-light`  
**Builds on:** Job 012 at Origin main `244b0ba7868c09813db961ccc58f9636e1216144` (Job 012 merged, Origin PR #14)  
**Product repo:** https://cursor.com/codebase/beau-cunningham/hunting-companion

Brief: `brief.md` in this folder. Full product detail, including **Delta 2026-09-25**, is in that brief.  
**Build order:** G1 first, and G1 must not ship broken (its own PR). Then G2, then G3 (config + pure function + tests first). G2 and G3 may share a PR or split.  
Lane captures the shots and recordings listed at the end of this file. Those screenshots stay out of the product repo (see `note.md`).

**Symptom detail from Beau: _pending_** (Finley to forward; add a dated line here when it arrives). The builder does not wait. Reproduce as deeply as possible without the Simulator and record what the code does at world scale.

**Builder constraint:** cloud builders run on Linux and can't run the iOS Simulator. Deepest reproduction possible: code tracing, unit/integration tests with world-scale regions, reasoning from react-native-maps/MapKit behavior, root cause with evidence. **Lane does the on-device confirmation** from exact steps in build notes.

## Delta 2026-09-25

Product delta from Sage (2026-09-25). Ellis verified the per-game hours against TPWD 2026-27. Folded into G3 below. The earlier "pending Ellis" item is closed.

1. Per-game hours are **FINAL**. Duck and dove run sunrise −30 min to sunset. Turkey, quail & pheasant (replaces `upland`), and deer run sunrise −30 min to sunset +30 min. Feral hogs and predators have no limit.
2. **Squirrel** is a row: sunrise −30 min to sunset +30 min.
3. Hogs and predators read **"No hour limit on private land"**.
4. The note is **"Advisory only. Check local regs and verify current TPWD regulations."**

Public-land warnings, public-land hog hours, and dormant dove and goose variants are Later (out of scope).

## Must pass

1. **G1 (TOP PRIORITY): Zoom-out never bugs the map.** G1 is its own PR and must not ship broken. Builder traces every zoom-out path (wind re-grid, Topo `UrlTile` low-zoom / `minimumZ` / `shouldReplaceMapContent`, 011 Topo zoom cap vs min zoom, sun recompute at extreme centers, pin fit/cluster, MapKit globe at world scale, remounts) across **Topo, Satellite, and Standard**, with **Wind on and off**, **pins present**, and the **sun display showing**, and writes the **root cause with evidence** (code path, breaking input, a test that fails before and passes after). **Min zoom at about continental-US scale** set natively via `cameraZoomRange` (`minZoomLevel`/`maxZoomLevel` are deprecated on Apple Maps). **One `cameraZoomRange` object owns both** the new min zoom and the 011 Topo max-zoom cap, with no deprecated `minZoomLevel`/`maxZoomLevel` fighting it. **No JS snap-back jolt.** Final value recorded. One shared pure region-clean function (`normalizeRegion`) used by wind and sun. **Wind ≤ 80 arrows** at every zoom, arrow length clamped, no world-wrapping streaks (a "zoom in to see arrows" badge state is allowed only if explicit). Sun display: real times or "—", one recompute per settle. **Lane: street → min → street 10× on each of Topo, Satellite, Standard, Wind on and off, 20+ pins, sun stack showing: map visible, responsive, same style, no freeze/jank beyond a brief tile load.** Exact Simulator steps go in build notes. Tests: `normalizeRegion` + wind grid on world, `lngΔ` > 360, negative/zero/NaN, antimeridian, un-normalized center, ±89.9° (finite, ≤ cap, fast); zoom-range config per style; sun at extreme centers; debounce burst → one recompute.
2. **G2: Sun stack under the Forecast button.** Forecast button stays **top-left**; sun display moves **directly beneath it**, stacked **vertically** (sunrise icon + time on top, sunset icon + time below), nothing else. This supersedes 012's side-by-side chip. Clear of safe area / Dynamic Island, wind badge + legend (move the badge if needed; record), glass bar, top-right You menu, Map Tools, attribution, tour cutouts, on **smallest and largest iPhones**. Same styling family as 012's chip (Reduce Transparency → solid; 4.5:1). Hit target **≥ 44pt**. Tap opens G3 and **never drops a pin**. Nav lock amended (supersedes 012's side-by-side chip).
3. **G3: Shooting-light popover.** Tap the sun stack → **small popover anchored to it** (not a screen/tab). Closes on tap outside (tap consumed, no pin; recorded), map pan/zoom, tab switch, You menu / Map Tools / tour. Contents: **game selector** (in-house menu; **default Duck** on a fresh install; last choice persists locally; unknown → Duck; **not tied to the profile** or to profile default animals), **live `H:MM:SS` countdown**, state text, start/end labels, **"Advisory only. Check local regs and verify current TPWD regulations."** Math at the map center at open, device local time. State logic is a **pure function** with per-game transition tests.
   - **Before** start: **red**, "Until shooting light" → today's start
   - **During:** **green**, "Shooting light ends in" → today's end
   - **After** sunset (or the game's end): **red**, "Until tomorrow's shooting light" → next local day's start from **tomorrow's sunrise** (not +24h)
   - **No hour limit** (Feral hogs, Predators): **neutral gray**, **"No hour limit on private land"**, no countdown
   - **Polar/invalid:** "—", "Sun times unavailable here", neutral, no throw
   - Start inclusive, end exclusive; remaining = ceil(seconds). Red/green/neutral ≥ **4.5:1** on the popover surface, distinct from `#BF5700` (suggested `#FF6B6B` / `#4ADE80` / `#E6E6E6` on `#1C1C1E`); state text always shown
   - **Pure** `getShootingLightState({ now, lat, lon, rule })` → phase, target, remainingSec, start, end, stateText
   - Clock lives in the popover (Map doesn't re-render each second); 1s tick aligned to the second, recomputed from the current time; **pauses** when closed or backgrounded, **resyncs** on return
   - Reduce Motion: instant/≤150ms fade, no digit animation. VoiceOver: one summary (game, state, remaining at minute granularity, labels, note), **no per-second announcements**, one announcement on phase change, selector reachable
   - Any debug time override is **`__DEV__`-only**
4. **G3 config table (ONE place, keyed by game;** `start`/`end` = `{ anchor: 'sunrise' | 'sunset', offsetMin }` or `null`). Values are **FINAL**. Ellis verified them 2026-09-25 against TPWD 2026-27. The builder must not change them.

   | game | label | start | end |
   |---|---|---|---|
   | `duck` (default) | Duck | sunrise −30 | sunset +0 |
   | `dove` | Dove | sunrise −30 | sunset +0 |
   | `turkey` | Turkey | sunrise −30 | sunset +30 |
   | `quailPheasant` | Quail & pheasant | sunrise −30 | sunset +30 |
   | `deer` | Deer | sunrise −30 | sunset +30 |
   | `squirrel` | Squirrel | sunrise −30 | sunset +30 |
   | `feralHogs` | Feral hogs | null | null |
   | `predators` | Predators | null | null |

   `upland` is removed. Quail & pheasant replaces it. Squirrel is the new row. Duck and dove share sunrise −30 to sunset. Turkey, quail & pheasant, deer, and squirrel share sunrise −30 to sunset +30. Feral hogs and predators are both null.

   **TPWD cross-check (Sage, 2026-09-25; Ellis verified the table the same day):** migratory game birds (duck, dove) **one-half hour before sunrise to sunset**: https://tpwd.texas.gov/regulations/outdoor-annual/hunting/migratory-game-bird-regulations/general-rules and https://tpwd.texas.gov/regulations/outdoor-annual/hunting/general-regulations/definitions (Outdoor Annual valid Sep. 1, 2026 – Aug. 31, 2027); 31 TAC §65.313(c). Deer, turkey, and nonmigratory (upland) game birds, which this table labels **Quail & pheasant**, are 30 min before sunrise to 30 min after sunset. **Squirrel** is the same window (Ellis, TPWD 2026-27). Feral hogs / nongame "at any time… on private property": https://tpwd.texas.gov/regulations/outdoor-annual/hunting/nongame-and-other-species. The on-screen no-limit line is **"No hour limit on private land"**. Public-land warnings, public-land hog hours, and dormant dove and goose variants are **Later**.
5. **G3 test values** (Dallas 32.7767, −96.7970; NOAA eq., ±2 min on instants; 012 sources): 2026-10-15 sunrise 12:31:21Z (7:31 AM CDT), sunset 23:53:57Z (6:54 PM), **Duck start 12:01:21Z (7:01 AM)**, Deer end 00:23:57Z Oct 16; 2026-10-16 Duck start ≈ 12:02:06Z; 2026-11-01 (DST ends) Duck start ≈ 12:15:00Z (6:15 AM CST); 2027-03-14 (DST starts) Duck start ≈ 12:08:53Z (7:08 AM CDT). Quail & pheasant and squirrel use the deer offsets. Required tests:
   - **Duck:** 12:01:20Z before (0:00:01); 12:01:21Z during; 23:53:56Z during (0:00:01); 23:53:57Z after → target Oct 16 start (≈ 12:02:06Z, not +24h)
   - **Deer:** 23:53:57Z still during; 00:23:56Z during (0:00:01); 00:23:57Z after. Turkey, quail & pheasant, and squirrel share this end offset (table test)
   - **Feral hogs / Predators:** noLimit at any time; state text **"No hour limit on private land"**; target/remaining null
   - **Local-day trap:** 2026-10-15 20:00 CDT (01:00Z Oct 16) → target Oct 16 start, not Oct 17
   - **DST end:** 2026-10-31 20:00 CDT (01:00Z Nov 1) → remaining ≈ **11:15:00**; **DST start:** 2027-03-13 20:00 CST (02:00Z Mar 14) → remaining ≈ **10:08:53**
   - Polar Longyearbyen (78.2232, 15.6267) 2026-12-21 / 2026-06-21 and NaN coords → unavailable, no throw
   - Table validation (both set or both null, known anchors, unique keys, Duck present as default, `quailPheasant` and `squirrel` present, no `upland` key); `H:MM:SS` formatter; game persistence (fresh → Duck, restore, unknown → Duck); timer pause/resync if the setup supports it
   - The note string is exactly **"Advisory only. Check local regs and verify current TPWD regulations."**
   - TZ-independent (assert UTC or pin `TZ=America/Chicago`)
6. **Regression (008–012):** 244 existing + new tests green; wind arrows visible on all 3 styles over a working map with the Sample wind badge + legend; Topo stays Topo at every zoom (incl. min) with attribution; tour arrows on target (SE, Pro Max, replay); sun times on every forecast row, no sample label; thin gray tab line; no Scout suggestion chips; ruler drag; 20 tap-to-pin taps (3 styles, Wind on, next to the sun stack); 20 pin-tap popups; F4a/F4b still work if they shipped; dark default, pin style A, no data lost.

## Fail if

- On any style, Wind on or off, any zoom-out cycle blanks the map (beyond a brief tile load), freezes it, changes the style, remounts it, jolts back, or crashes
- Wind shows more than 80 arrows, world-wrapping streaks, or huge/invisible arrows at any zoom; or a badge with no visible arrows and no "zoom in" wording
- The sun display shows NaN / Invalid Date or recomputes in a storm
- No G1 root cause with evidence (code path + failing-then-passing test), or no min-zoom choice recorded
- Deprecated `minZoomLevel` / `maxZoomLevel` fight `cameraZoomRange`
- The sun stack isn't under the Forecast button, is side by side, collides with the Dynamic Island / badge / bar / You menu on SE or Pro Max, has a hit target under 44pt, or drops a pin when tapped
- The popover is a new screen/tab, doesn't close on tap outside / pan / tab switch, or its dismissing tap drops a pin (unless recorded otherwise and accepted)
- Wrong color or phase at any tested boundary; after-sunset target uses today + 24h or the UTC date; DST cases off by an hour
- A no-limit game shows a countdown, red/green, or any text other than **"No hour limit on private land"**
- Polar input throws or shows NaN
- Shooting-light offsets live anywhere but the one table, the table still has `upland`, squirrel or quail & pheasant is missing, or table values differ from this AC
- The note is the old "Check local regs. Not legal advice." line, or any other wording
- Fresh install doesn't start on Duck, or the selection is tied to the profile or to profile default animals
- Color is the only phase signal, or red/green/neutral fail 4.5:1
- The timer drifts, keeps running when closed/backgrounded, shows a stale value on return, or re-renders the Map each second
- VoiceOver announces every second, or can't reach the selector
- A debug time override exists in release builds
- Any existing test fails, or any regression item fails
- Any live weather/wind, backend or account change, key, spend, notification, unjustified new dependency, or scope creep (including public-land warnings, public-land hog hours, or dormant dove and goose variants)

## Simulator sweep (Lane signoff)

1. **G1:** Clean build at the job commit, 20+ pins, sun stack showing. On **Topo, Satellite, Standard**, each with **Wind on** and **Wind off**: pinch (and −) from street level to the minimum zoom and back, **10 cycles**. Every cycle: tiles/basemap visible, style picker unchanged, pan/pinch/tap respond within ~1s, arrows sane (≤ 80, normal size, no streaks), sun stack shows times or "—". At min zoom: keep pinching out fast (stops naturally, no jolt), pan across the Pacific/antimeridian and over Alaska/Arctic (no streaks, no NaN), tap empty map (pin popup), tap a pin (popup). Switch styles at min zoom. Topo: zoom back in to max (still Topo, cap intact). When Beau's symptom arrives, repeat his exact steps. The builder writes these steps in build notes before Lane runs them.
2. **G2:** SE and Pro Max, over bright Satellite and dark Standard, Wind on: Forecast button top-left, sun stack directly under it, vertical, clear of Dynamic Island / badge / bar / You menu. Tap the stack: popover opens, no pin. VoiceOver reads the stack. Reduce Transparency: solid.
3. **G3:** Open the popover; watch it tick ~10s. Hit **Before (red)**, **During (green)**, **After (red, tomorrow's time)** by: (a) panning the map center (sun follows the center; times show in device time; e.g. during a US morning: Hawaii = before, Dallas late morning = during, Tokyo = after), (b) changing the Mac's time zone/date and relaunching, or (c) the dev-only override if the builder added one. Switch games Duck → Deer → Squirrel → Feral hogs (**"No hour limit on private land"**, neutral gray) → back. Confirm the note reads **"Advisory only. Check local regs and verify current TPWD regulations."** Dismiss: tap outside (no pin), pan, tab switch. Background ~30s with it open, return: clock resynced. Kill/relaunch: last game restored; fresh install: Duck. Reduce Motion on. VoiceOver: summary read, no per-second chatter, selector reachable.
4. **Regression:** full test run green (244 + new); Wind on all 3 styles with badge; Topo 5 → max → min → back; tour arrows on SE/Pro Max + replay; forecast sun times; tab line; no Scout suggestion chips; ruler drag; 20 tap-to-pin (incl. next to the sun stack); 20 pin taps; F4a/F4b if shipped.

Lane captures: **recording** of street → min → street on Topo, Satellite, Standard with Wind on, 20+ pins, sun stack (plus notes that all 10 cycles per style, Wind on and off, passed); stills at min zoom on each style, Wind on and off; **recording** of fast pinch-out at min zoom (no jolt); sun stack under Forecast on SE and Pro Max over bright Satellite and dark Standard with Wind on; **popover stills in all 3 phases** (Before red, During green, After red) plus Feral hogs "No hour limit on private land" and Deer (or Squirrel) in the sunset→+30 window if reachable; **recording** of the popover ticking, game switch Duck → Deer → Squirrel → Feral hogs, tap-outside dismiss (no pin), reopen, pan dismiss; background/return resync; VoiceOver and Reduce Motion; relaunch restoring the game; test output all green.
