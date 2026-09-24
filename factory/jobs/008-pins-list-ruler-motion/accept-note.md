# Accept note

Kai accepted job `008-pins-list-ruler-motion`.

- Builder, tester, security, and ui passed on Origin https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/10, branch `cursor/pins-list-ruler-motion-8a42` (docs tip `4b1fadc`, product tip `9a81ce4`, base `6b58f12`)
- Builder: M1 `5738c3f`, M2 `2911b61`, M3 `c0bc709`, M4 `4a2a051`, build notes `6621d4d`, web fix `137a94c`, Map Tools clearance `9a81ce4`
- Tester PASS (214/214) at `137a94c`, typecheck clean. After the clearance fix, the tester re-checked `137a94c..9a81ce4` and PASSED: 214/214, typecheck clean, the placement test asserts a 12pt gap, zoom is 12pt above, the button is clear of the legal label, location slot, and Forecast button, and the web Map renders
- Security PASS with no findings at `137a94c` (diff `6b58f12..137a94c`)
- UI PASS 8/8 on Expo web at 390×844 with a light system scheme and resize checks at 375×667 and 430×932, done at product `137a94c`. The docs report is `docs/job-008-ui-report.md` at `4b1fadc`. Screenshots stay in the UI agent artifacts, not in the product repo
- Glass is `systemUltraThinMaterialDark` with scrim `rgba(22,20,17,0.53)`. Motion is 180ms tabs, 220/170ms sheets, 150ms popup and selection. Units are whole yards under 880 yd, then one-decimal miles
- One Low was fixed in-job: the Map Tools button sat about 24pt above the bar instead of the AC's about 12pt. The builder fixed it at `9a81ce4` (button bottom is bottomInset + 14 + 64 + 12, so 90pt on SE and 124pt on Pro Max). Bar clearance and sheet/scroll padding are unchanged
- Remaining lows (not blocking): the active tab icon orange is about 1.9:1 on bright glass (the label carries contrast, a 007 choice); the You menu uses 200ms for open and close; pre-existing map camera moves are 280–350ms; log-a-hunt and new pin are platform modals; the web Standard map is OSM with no blue dot and has web-only zoom
- No new dependencies, schema changes, or keys. The UI worker changed no product code
- Lane's iOS Simulator sweep: system blur over Apple Satellite and dark Standard beside a 007 shot, Reduce Transparency on the bar and button, Reduce Motion, finger drag on the end dot, pinch while measuring, Pins full and empty, pin/hunt detail with the bar and the originating tab highlighted, Map Tools on SE and Pro Max beside zoom and the Apple legal label, the teardrop tip on the coordinate, and no stutter with 20+ pins
- Merge order: Finley squash-merges this SoftwareFactory PR, then Origin #10 (mark it ready first if it's still a draft)
- Factory status is `accepted`
