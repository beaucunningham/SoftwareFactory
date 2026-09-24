# Build

Origin builder finished on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/9 (draft), branch `cursor/glass-nav-map-tools-757f`, base main `3d8dbb4` (Job 006).

Product notes: `docs/job-007-build.md` in the hunting-companion repo.

- M1 `131ebfa` dark by default
- M2 `f0f1b98` glass bar + top-right account menu
- M3 `004504b` Map Tools
- M4 `545de33` measure distance
- M5 `eaede26` pin glyphs (style A) + build notes
- Glyphs confirmed in bundled MaterialCommunityIcons: general `circle-medium`, `binoculars`, `duck`, `ladder`, `corn`, `camera`, `car`, `tent`, `water`
- Token usage and contrast ratios in `docs/job-007-build.md`
- `npx tsc --noEmit` clean
- Product `npm test` 201 pass / 0 fail
- Known lows: active tab label `#BF5700` on the dark bar is about 3.6:1 (body text is not orange; white on orange button 4.59:1); pin detail and hunt detail are stack screens so the glass bar is not shown on them, but their scroll content keeps bottom padding; web preview Standard map is still OpenStreetMap (not Apple dark), web has no system blue dot, web-only zoom buttons unchanged
- Real iOS Simulator pass: Lane
