# Build

Origin builder finished on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/11 (draft), branch `cursor/glass-scout-tours-d746`, base main `b52e433` (Job 008).

Product notes: `docs/job-009-build.md` in the hunting-companion repo.

- M1 `2c6dc98` real glass
- M2 `ab68a62` Scout rename, suggested prompts removed, stub `birds.` fragment fix
- M3 `ef55f97` app tour after sign-in + SAMPLE Scout walkthrough, replay from You, AsyncStorage per-install flags that survive sign-out
- M4 `cd1a1c5` tap-to-pin fix + tests + build notes (tip)
- Glass: `expo-glass-effect` `GlassView` only when `isLiquidGlassAvailable()` and `isGlassEffectAPIAvailable()` both pass; otherwise ultra-thin dark blur. The 008 0.53 scrim is removed. Residual tint alpha 0.
- User-facing AI name: Scout (no trademark clearance; app name TBD)
- Contrast: white label on 0.58 black halo 5.33:1 over white, 6.17:1 over sand, 7.78:1 over light Standard; `#BF5700` on the black active capsule 4.58:1
- C6: cold-start and scale-hint copy put `birds.` at a sentence boundary and hook assembly could leave it as the first sentence; templates rewritten, `assembleStubReply` also strips a leftover leading fragment
- C7: empty-map `onPress` was deferred with `setTimeout(0)` while `onLongPress` set `suppressTap` for 400ms, so a pan or slightly long touch swallowed the tap, and the Map Tools fade layer stayed in the hit tree; the tap is now decided in the same turn
- Token usage in `docs/job-009-build.md`
- `npx tsc --noEmit` clean
- Product `npm test` 222 pass / 0 fail
- Known lows: web Standard is still OSM; web still draws extra zoom buttons from 008
- Real iOS Simulator pass: Lane (iOS 26 Liquid Glass, glass over bright Satellite and dark Standard beside an 008 shot, Reduce Transparency, VoiceOver focus order, tours, Scout walkthrough, 20 stub prompts, 20 taps)
