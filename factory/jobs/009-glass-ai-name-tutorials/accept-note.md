# Accept note

Kai accepted job `009-glass-ai-name-tutorials`.

- Builder, tester, security, and ui passed on Origin https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/11, branch `cursor/glass-scout-tours-d746` (docs tip `57b0bf7`, product tip `b5493dab7bfef46422c32a41a8c875b0b9665b59`, base `b52e433`)
- Builder: M1 `2c6dc98`, M2 `ab68a62`, M3 `ef55f97`, M4 `cd1a1c5`, tester locks `41f1522`, Map Tools hit and icon halo fixes `58b2a53`, UI report `57b0bf7`, empty-chat lead fix `b5493da`
- Tester first pass at `cd1a1c5` failed 2 of 224 (Map Tools `pointerEvents="none"`, inactive icons without a halo). Lock commit `41f1522`. Re-check at `58b2a53` PASSED 224/224, typecheck clean. Final tip `b5493da` is 224/224 with a clean typecheck
- Security PASS with no findings at `cd1a1c5` (diff `b52e433..cd1a1c5`). The later diff is UI-only fixes, tests, and docs
- UI PASS 7/7 on Expo web at 390×844 with a light system scheme and resize checks at 375×667 and 430×932, done at product `cd1a1c5`. The docs report is `docs/job-009-ui-report.md` at `57b0bf7`. Screenshots stay in the UI agent artifacts (`01-sign-in` through `30-show-on-map`), not in the product repo
- Web uses the blur fallback, not Liquid Glass. The bar is transparent with only the blur material `rgba(37,37,37,0.55)`. The 008 `rgba(22,20,17,0.53)` scrim is gone. Labels are white with a 0.58 halo. Active is orange on a black capsule. The hairline is kept. Map Tools is a 48px circle, 14px from the right and 12px above the bar
- User-facing name is Scout. Bar order is Map | Pins | Forecast | Scout. No user-facing Guide and no suggested prompts. The only new dependency is free `expo-glass-effect`. Tour flags are local only
- One Low was fixed in-job: the empty Scout chat still showed the 008 header lead. The builder fixed it at `b5493da`
- Remaining lows (not blocking): web `textShadow` / `shadow` deprecation warning; web Standard is still OSM with extra web zoom buttons
- The UI worker changed no product code
- Lane's iOS Simulator sweep: Liquid Glass on iOS 26 beside an 008 shot over bright Satellite and dark Standard, the halo on real Satellite, Reduce Transparency solid `#161411`, VoiceOver through both tours, Reduce Motion during a tour, 20 native empty-map taps after pan, zoom, sheet close, and measure Done, press-and-hold does nothing, Map Tools button tap on device, SE and Pro Max placement beside zoom and the Apple legal label, the Scout empty state, and a stub reply starting with a full sentence
- Merge order: Finley squash-merges this SoftwareFactory PR, then Origin #11 (mark it ready first if it's still a draft)
- Factory status is `accepted`
