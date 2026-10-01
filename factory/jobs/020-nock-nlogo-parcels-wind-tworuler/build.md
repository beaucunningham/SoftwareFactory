# Build

Brief: `FACTORY_BRIEF_020_nock-nlogo-parcels-wind-tworuler.md`. AC: `AC_NOCK_NLOGO_PARCELS_WIND_TWORULER_v0.md`. Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Go: Beau via Finley, 2026-10-01 3:38am CT. Lane's Simulator PASS was at 6:27am CT on final main `2baf6c2` (2h49 go to landed).

One builder ran the items and its own tests. There was no separate brief pull request (SoftwareFactory #90). Every final product pull request was squash-merged to main. Replaced pull requests were re-cuts onto a newer main. No force-push or rebase.

| Milestone | Origin PR | Main |
| --- | --- | --- |
| K1 N mark centered on the sun stack, from measured layout | https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/71 | `496e8ccab4b15a66b5031549d220d6d9f9647fd4` |
| K2 property lines at the closest camera (native z19 + overzoom to z25). Floor stays z12 because z11 measured 4.8s Dallas load and 51% coverage, failing the AC bars. z9–10 underzoom not shipped; hint kept. Replaces #73. | https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/75 | `8d7abc6579314ef24a23c72a3f23bf2c683b6eef` |
| K3+K5 wind. Arrows are the default (streamlines behind the flag, with a 1s fallback to arrows). Arrow heading is geographic. The mph badge and legend are deleted. "Sample wind, not live" shows as a second map-credit line and as the Map Tools sub-label. Replaces #72 and #76. | https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/78 | `57138d59702d791edbc46b104cd08e5c0819da4c` |
| K4 two-finger long-press ruler (light haptic via expo-haptics ~57.0.3). Replaces #74 and #77. | https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/79 | `2baf6c25ddf4df3d72aea797c41d9f8f1b6630c9` |

Final main is `2baf6c25ddf4df3d72aea797c41d9f8f1b6630c9` (#79).

9 Origin pull requests were opened (#71–#79). 4 were merged (#71, #75, #78, #79). 5 were replaced by re-cuts onto a newer main (#72, #73, #74, #76, #77).
