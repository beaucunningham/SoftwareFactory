# Accept

Job `027-nock-testflight-release` is accepted for internal TestFlight.

Brief: `FACTORY_BRIEF_027_nock-testflight-release.md`. AC: `AC_NOCK_TESTFLIGHT_RELEASE_v0.md`. Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

The app is Nock. Go: about 9:55pm Thu 10/1/2026 (Beau GO for the Scout-first order). Build 9 landed in internal TestFlight at 3:41pm CT Fri 10/2/2026. Duration from go to landed: about 17h46m. The slip from the 2-3pm target was the Apple rejection (about 1h30). No job record for 027 was in this repository before this status pull request.

Recorded product pull requests:

- #111 TestFlight release, squash-merged Fri 10/2/2026 9:43am CT → `6b598fb` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/111. Reviewed head `97d0d6f`. Bundle `com.nockhunt.app`, display name Nock, ascAppId `6818538348`, `ITSAppUsesNonExemptEncryption=false`. Prod env: weather and Scout URLs set; Scout, history weather, weather stub, and gesture debug unset; auth stub. Includes the trip fixes, the weather host pin plus `redirect:'manual'`, 028b, and doc renames.
- #113 027b, squash-merged Fri 10/2/2026 1:20pm CT → `c08df858` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/113. Adds `NSMotionUsageDescription` (ExpoLocation and Reanimated, unused) and `NSPhotoLibraryUsageDescription` (ExpoFileSystem, unused).

- Tested: in-session `npm test` and `tsc --noEmit` counts were not copied into this repository. Build 9 is live (EAS `633d1c10`, submission `ff49de5e`).
- Secured: Build 8 (`6b598fb`) was rejected by Apple with ITMS-90683 (`NSMotionUsageDescription` missing; linked-but-unused `CMMotionActivityManager` in ExpoLocation). 027b is the fix. The AI Product Owner passed throughout on #111. Both reviewers passed #113.
- UI-checked: the Mobile QA Lead bounced `a08b887` (wind arrows and the Apple mark over the Map Tools sheet; west TX / St. George / Kanab zones) and `73e194d` (mid-slide sheet measurement; Van Horn), then passed `97d0d6f`. The UI report is markdown only.

Build 9 is in internal group "Nock Internal", Beau only. EAS labels it "snapshot 6b598fb" because of working-tree changes. The shipping files match `c08df85`. Two test files are at their `6b598fb` versions.

Follow-ups for Job 024, and the pre-App-Store list:

- Reword the motion and photo strings as plain non-use statements before external beta or the App Store.
- Worker `civilTime.ts` zone table must match the app before history weather turns on (Midland, St. George, Van Horn, Kent).
- AZ/UT border snapping, Navajo Nation DST, Edit Captured zone, Presidio County edge, sheet layout cleared on close, SE3 mark touching N, the town-search gate, and hint height first frame.
- `weatherProxyUrl` drops a port; `~5 km` in the location string; the preview profile has no env.
- Pre-App-Store: App Privacy label (Beau, by hand in ASC: Coarse Location, App Functionality, not linked, no tracking), App Attest, expo-secure-store for the Scout token, scout `deleteAccount`, NetInfo, and real auth before external testers.

Factory status is `accepted`. Build 9 is live in internal TestFlight.
