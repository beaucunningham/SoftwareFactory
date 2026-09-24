# Accept note

Kai accepted job `011-sim-fixes-coachmarks`.

- Builder, tester, security, and ui passed on Origin https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/13, branch `cursor/sim-fixes-coachmarks-ade4` (docs tip `b3c9bc49bd51ab0efcacf0436a3bc596ab111509`, product tip `11df3c2`, base `6a94bc3`)
- Builder: M1 E1 `8a9d270`, M2 E2 `9fceb5f`, M3 E3 `3524a91`, M4 E4 `b6231a6`, M5 E5 `886ae51`, M6 E6 `ec80948`, M7 E7 `2af7118`, tester fixes `c6fa99c` and `560e6d9`, step-1 Skip layout `11df3c2`, UI report `b3c9bc4`
- Tester first pass at `2af7118` failed (open chat called `looksLikeGuidedLog`, and `findNodeHandle` crashed web). Re-check at `560e6d9` PASSED. Final code tip `11df3c2` is 237 pass / 0 fail with a clean typecheck. Docs tip `b3c9bc49bd51ab0efcacf0436a3bc596ab111509` is docs only
- Security PASS with no findings at `2af7118` (diff `6a94bc3..2af7118`). The later diff is chat intent routing, web map rendering, tour focus, the step-1 Skip layout, tests, and docs
- UI first run FAIL at `2af7118` (E5 High: web `findNodeHandle` crash, no web map tour target, web capped every style at zoom 16). The builder fixed these at `c6fa99c` and `560e6d9`. Re-run PASS at `560e6d9` on Expo web at 390×844, 375×667, and 430×932. Narrow E5 re-check PASS at `11df3c2`. The docs report is `docs/job-011-ui-report.md` at `b3c9bc4`. Screenshots stay in the UI agent artifacts (bc-8c3a8f05), not in the product repo
- E1–E7 are all delivered
- E1 root cause: the Skia canvas lacked `opaque={false}`, and its rAF particle loop ran on the JS thread. Wind is now static rotated arrows (`USE_SKIA_WIND=false`). Skia 2.6.2 is still installed but unused
- E2: native Topo-only `maxZoomLevel={16}`, UrlTile `maximumNativeZ={16}`, `maximumZ={20}`, `shouldReplaceMapContent`
- E4: open chat no longer calls `looksLikeGuidedLog`, and `GUIDE_STARTER_PROMPTS` is removed
- E5: an in-house tour with flag `tour.coachmarks.v1`. The app is portrait-only
- E7: expo 57.0.25, expo-constants 57.0.19, expo-linking 57.0.11, expo-router 57.0.23. expo-doctor 21/21. No new direct dependencies and no new network sources. npm audit shows 14 moderate issues, all pre-existing
- One Low was fixed in-job: the step-1 Skip box ran past the 844px viewport. The builder fixed it at `11df3c2` by placing the step-1 counter, tip, and Skip inside the cutout, clamped to the safe area, and added a layout test. The Skip box is at y=140, h=44 at all 3 sizes, inside the viewport and above the tab bar
- The UI worker changed no product code
- Lane's iOS Simulator list, not verifiable on web: Wind on all 3 styles with 20 toggles, a 2-minute pan with 20+ pins, backgrounding, Reduce Motion, and badge and legend placement; Topo zoom from 5 to max and back at 4 TX spots, with and without Wind (`maxZoomLevel` 16 stops pinch, and Standard does not show through); the tab line over bright Satellite and dark Standard, with Reduce Transparency, and the VoiceOver selected state; Scout after 'hi' and 'saw 3 doves' shows no chips; the full 6-step tour on SE and Pro Max, with Skip (the step-1 safe area), replay, Reduce Motion, and VoiceOver; the Scout tutorial's Try it focuses the composer; expo-doctor, and a clean Simulator build after the bumps; ruler drag on Topo and with Wind on, glass, and Forecast 7-day above 3-day
- Merge order: Finley squash-merges this SoftwareFactory PR, then Origin #13 (mark it ready first if it's still a draft)
- Factory status is `accepted`
