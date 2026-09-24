# AC — Clearer glass bar + ruler measure + calm motion + Pins tab + Map Tools button (job 008)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_PINS_LIST_RULER_MOTION_v0.md`. No secrets. Beau approved as scoped 2026-09-24. **Final for Kai.** **D1 is locked:** in measure mode, dragging from the end dot draws the next segment; dragging anywhere else moves the map. The two-finger-pan alternative is not a choice. Measure units are unchanged from Job 007: whole yards under 880 yd, then miles to **one decimal** (for example 0.5 mi, 1.3 mi). Sage corrected an earlier "two decimals" typo in the brief's B2 units line and in item 3 below.

**Job id:** `008-pins-list-ruler-motion`  
**Builds on:** Job 007 at Origin main `6b58f12`  
**Product repo:** https://cursor.com/codebase/beau-cunningham/hunting-companion

Brief: `brief.md` in this folder.  
Lane captures shots: bar over bright Satellite and dark Standard beside a 007 shot, Reduce Transparency on, ruler with ticks and segment labels, live label mid-drag, Pins list (full and empty), pin detail from Pins with the bar, hunt detail with the bar, Map Tools button on SE and Pro Max with zoom and legal label visible, and Reduce Motion on. Those screenshots stay out of the product repo (see `note.md`).

## Must pass

1. **Glass bar** is visibly more see-through than 007 (lighter dark system material, low tint, strong blur), still has its hairline edge, labels pass 4.5:1 over bright Satellite and the dark Standard map, and goes solid dark with Reduce Transparency.
2. Bar order is **Map | Pins | Forecast | Guide**. Map is the default home. The top-right You menu is unchanged.
3. **Ruler measure:** white line with dark outline and zoom-adaptive tick marks; finished segments show a length label when long enough; units stay whole yards under half a mile (880 yd), then miles to **one decimal** (for example 0.5 mi, 1.3 mi).
4. **Drag (D1 locked):** pressing the end dot and dragging draws a live segment that follows the finger (or Simulator mouse) with a live label showing segment length and total; release adds a point; the next drag continues from the new end dot. Taps still add points. Dragging elsewhere moves the map. Undo last and Done work. No pins, popups, or saved data while measuring.
5. **Motion:** tab crossfade about 150–200ms; sheets and tool panels about 200–250ms ease-out; pin popup and selection states about 150ms; no bounce or anything over about 250ms; taps never blocked. **Reduce Motion** turns movement into a short fade or instant change.
6. **Pins tab:** one lean row per pin (style A type badge, name, `n hunts · last <date>` or `No hunts yet`), sorted most recently hunted first, count in the header, empty state with "Go to Map". Tapping a row opens that pin's hunt logs (Job 005 pin detail) with Back to the same scroll spot and a "Show on map" action. List updates live.
7. **Map Tools button:** round dark glass button on the Map tab only, bottom right above the bar, opens the same Map Tools sheet. It doesn't overlap the Forecast button, zoom +/−, the Apple Maps legal label, any location control, or the pin popup (it fades out while popups, sheets, or the menu are open), and it's hidden during measure mode. Checked on SE and Pro Max sizes.
8. **Bar on detail screens:** pin detail and hunt detail show the bar with the originating tab highlighted; nothing hidden behind it. Save/Cancel forms may cover it.
9. All Job 005–007 behavior unchanged (tap-to-drop popup and type picker, press-and-hold does nothing, style A teardrop pins, #1 pin per day, Map Forecast button, dark by default, Guide chip fix, logs in pins, Unpinned hunts in the You menu). No data lost.

## Fail if

- Bar looks as dark as 007, or labels are hard to read over bright Satellite ground
- Measure line has no ticks, doesn't follow the drag, or only appears on tap
- A drag or tap drops a pin, opens the popup, or saves anything while measuring
- Map can't be moved with a one-finger drag away from the end dot while measuring
- Wrong units (including miles shown to two decimals), or labels hard to read on Satellite or Standard
- Any bounce, overshoot, animation over about 250ms, animation that blocks taps, or motion that ignores Reduce Motion
- Pins list shows extra fields, wrong counts or dates, wrong sort, or a row that doesn't open that pin's logs
- Map Tools is still in the bar, the floating button overlaps any control, label, or popup, or it shows on tabs other than Map
- Pin or hunt detail still hides the bar, or the bar covers their content
- Any 005–007 regression, data change, or scope creep (Later items, live weather, paid layers, new keys)
- D1 is treated as optional, or the two-finger-pan alternative is built

## Simulator sweep

1. Sign in; lands on Map. Bar reads **Map | Pins | Forecast | Guide**. Compare the bar with a 007 screenshot over the same bright Satellite area: clearly more see-through, labels still readable. Switch to Standard: still readable. Turn on Reduce Transparency: bar and Map Tools button go solid.
2. Map Tools button: bottom right, above the bar, clear of the Forecast button, zoom +/−, and legal label. Repeat on an SE-size and a Pro Max-size Simulator. Tap it: same Map Tools sheet. Open a pin popup: the button fades out, then returns.
3. Measure: tap a start point. Mouse-drag from the end dot about 300 yd: line, ticks, and live label follow the pointer. Release. Drag again from the new end dot. Tap to add a third point. Check segment labels and the total (whole yards under 880 yd, then miles to one decimal). Drag elsewhere: the map moves. Undo last, then Done. Tap the map: pin popup is back.
4. Motion: switch tabs, open and close the Map Tools sheet, open a pin popup, select a pin, and select a Guide chip; all quick and calm. Turn on Reduce Motion and repeat: fades only or instant.
5. Pins tab: check the count, rows, second-line text, and sort (log a hunt on an older pin and confirm it moves to the top). Tap a row: pin detail with hunt logs, bar visible, Pins highlighted. Back returns to the same scroll spot. "Show on map" centers and selects the pin.
6. Open pin detail from the Map and a hunt detail: bar visible, correct tab highlighted, last row and "Log a hunt" not hidden. Open the log-a-hunt form: it may cover the bar.
7. Delete or sign out to a fresh account (or clear pins in a test build): Pins empty state appears; "Go to Map" works.
8. Spot-check 005–007: tap-to-drop popup and type picker, style A pins on Satellite and Standard, Forecast tab and Map Forecast button, dark with the iPhone in light mode, You menu, Unpinned hunts.

Lane captures shots: bar over bright Satellite and dark Standard beside a 007 shot, Reduce Transparency on, ruler with ticks and segment labels, live label mid-drag, Pins list (full and empty), pin detail from Pins with the bar, hunt detail with the bar, Map Tools button on SE and Pro Max with zoom and legal label visible, and Reduce Motion on.
