# Build

Origin builder finished on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/10 (draft), branch `cursor/pins-list-ruler-motion-8a42`, base main `6b58f12` (Job 007).

Product notes: `docs/job-008-build.md` in the hunting-companion repo.

- M1 `5738c3f` clearer ultra-thin glass
- M2 `2911b61` Pins tab + Map Tools floating button + bar on pin/hunt detail
- M3 `c0bc709` ruler measure with end-dot drag (D1)
- M4 `4a2a051` calm motion
- build notes `6621d4d`
- web fix `137a94c` pin hit wins over an empty-map drop (tip)
- Glass: `systemUltraThinMaterialDark` with scrim `rgba(22,20,17,0.53)` (final tint value)
- Inactive label `#C4B8AA` 4.55:1 over white; orange stays on the active icon/indicator
- Motion: tab crossfade 180ms, sheets 220ms open / 170ms close, popup, selection, and new ruler marks 150ms fade; Reduce Motion respected
- Units unchanged from 007: whole yards under 880 yd, then miles to one decimal, all via `formatMeasureDistance`
- Token usage, tint, contrast, and durations in `docs/job-008-build.md`
- `npx tsc --noEmit` clean
- Product `npm test` 214 pass / 0 fail
- Known lows: web Standard map is still OpenStreetMap, web has no blue dot, web-only zoom buttons unchanged
- Real iOS Simulator pass: Lane (bright Satellite and light dark-Standard legibility, Reduce Transparency, Reduce Motion, ruler ticks/end-dot drag/live label, Pins empty and full, pin/hunt detail with bar, Map Tools button on SE and Pro Max beside zoom and legal label)
