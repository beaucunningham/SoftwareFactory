# Build

Origin builder finished on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/13 (draft), branch `cursor/sim-fixes-coachmarks-ade4`, base main `6a94bc3` (Jobs 009+010). One PR (E7 included).

Product notes: `docs/job-011-build.md` in the hunting-companion repo.

- M1 E1 `8a9d270`: wind FALLBACK shipped. Root cause: Job 010's full-screen Skia canvas had no `opaque={false}` (the Metal layer painted every pixel, so tiles vanished), and particles stepped with `requestAnimationFrame` on the JS thread (taps stopped landing). `USE_SKIA_WIND = false`. Wind on draws an 8x8 `stubWindSource` arrow grid, `pointerEvents="none"`, transparent, static (also under Reduce Motion). Badge and mph legend unchanged. Toggling Wind does not change the MapView key.
- M2 E2 `9fceb5f`: Topo stays Topo. MapView `maxZoomLevel={16}` only while Topo is selected (undefined otherwise, so Standard/Satellite keep normal max); UrlTile `maximumNativeZ={16}`, `maximumZ={20}`, `shouldReplaceMapContent`. Final Topo max zoom 16.
- M3 E3 `3524a91`: 2pt `#D8D8D8` line under the selected tab, capsule removed.
- M4 E4 `b6231a6`: Scout chat suggestion chips removed.
- M5 E5 `886ae51`: 6-step coach-mark tour, new flag `tour.coachmarks.v1`, app is portrait-only.
- M6 E6 `ec80948`: one Scout example question, then Try it focuses the composer.
- M7 E7 `2af7118` (tip): expo 57.0.23 to 57.0.25, expo-constants 57.0.18 to 57.0.19, expo-linking 57.0.10 to 57.0.11, expo-router 57.0.21 to 57.0.23; `npx expo-doctor` 21/21; tests and `docs/job-011-build.md`.
- Token usage in `docs/job-011-build.md`
- `npx tsc --noEmit` clean
- Product `npm test` 236 pass / 0 fail
- Known lows: guided-log chips (species, pin, save) still show during an in-progress hunt log (not the open Scout chat); Skia wind left disabled.
- Not verified by builder (goes to Lane's real iOS Simulator pass): 20 Wind toggles and a 2-minute pan, Topo zoom at four TX spots, coach-mark alignment on SE and Pro Max, VoiceOver, Reduce Motion, and a clean Simulator build after the patch bumps.
