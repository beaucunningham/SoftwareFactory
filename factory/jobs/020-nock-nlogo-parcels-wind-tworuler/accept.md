# Accept

Job `020-nock-nlogo-parcels-wind-tworuler` is accepted.

Brief: `FACTORY_BRIEF_020_nock-nlogo-parcels-wind-tworuler.md`. AC: `AC_NOCK_NLOGO_PARCELS_WIND_TWORULER_v0.md`. Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Go: Beau via Finley, 2026-10-01 3:38am CT. Lane's Simulator PASS was at 6:27am CT on final main `2baf6c2` (2h49 go to landed).

Every final product pull request was squash-merged to main:

- #71 K1 N mark centered on the sun stack, from measured layout → `496e8ccab4b15a66b5031549d220d6d9f9647fd4` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/71
- #75 K2 property lines at the closest camera (native z19 + overzoom to z25; floor stays z12 because z11 measured 4.8s Dallas load and 51% coverage, failing the AC bars; z9–10 underzoom not shipped and hint kept) → `8d7abc6579314ef24a23c72a3f23bf2c683b6eef` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/75. Replaces #73.
- #78 K3+K5 wind: arrows are the default (streamlines behind the flag, with a 1s fallback to arrows), arrow heading is geographic, the mph badge and legend are deleted, and "Sample wind, not live" shows as a second map-credit line and as the Map Tools sub-label → `57138d59702d791edbc46b104cd08e5c0819da4c` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/78. Replaces #72 and #76.
- #79 K4 two-finger long-press ruler (light haptic via expo-haptics ~57.0.3) → `2baf6c25ddf4df3d72aea797c41d9f8f1b6630c9` (final main) — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/79. Replaces #74 and #77.

- Tested: one builder ran its own tests. At the final PR head, `npm test` was 390 pass / 0 fail with TZ unset, UTC, and Pacific/Auckland. `tsc --noEmit` was 0. Merge-tree against main was clean.
- Secured: Ari PASSED K2 and K3+K5. No identify/query calls (a grep test walks `src/components/app` for `/identify`, `/query`, `/find`, `outFields`, `f=json`, and owner fields). No new hosts, storage, keys, or logging. The only dependency addition is `expo-haptics` ~57.0.3 (approved by Finley). No version bump.
- UI-checked: Lane PASSED K1, K3+K5, and K4 on diff review, then ran the Simulator final gate on `2baf6c2`: PASS at 6:27am CT. K4 is still to be checked on Beau's iPhone, and streamlines stay off by default until confirmed on his phone.

Open low notes:

- Lane's K1 nits: re-measure on safe-area change, hide the parked N from VoiceOver, wordmarkFrame fallback.
- The K4 lockfile test should also match 57.0.x.
- No-op `maxFontSizeMultiplier` on the credit texts.
- Optional K2 overzoom double-fetch at z19.
- Forecast stub labeling and the two-finger ruler fixes from Beau's phone are Job 021.

Factory status is `accepted`.
