# AC: Job 027 nock-testflight-release

The app is Nock. The original AC text is not in this repository. These are the checks recorded with the status.

## Release identity

#111 squash-merged Fri 10/2/2026 9:43am CT as main `6b598fb`.

- Bundle `com.nockhunt.app`.
- Display name Nock.
- ascAppId `6818538348`.
- `ITSAppUsesNonExemptEncryption=false`.
- Prod env: weather and Scout URLs set. Scout, history weather, weather stub, and gesture debug unset. Auth stub.
- #111 includes the trip fixes, the weather host pin plus `redirect:'manual'`, 028b, and doc renames.

## Review

The Mobile QA Lead bounced `a08b887` (wind arrows and the Apple mark over the Map Tools sheet; west TX / St. George / Kanab zones) and `73e194d` (mid-slide sheet measurement; Van Horn). PASS at `97d0d6f`. The AI Product Owner passed throughout.

## Apple rejection and 027b

Build 8 (`6b598fb`) was rejected by Apple with ITMS-90683. `NSMotionUsageDescription` was missing. ExpoLocation links `CMMotionActivityManager` and does not use it.

027b (Origin #113, main `c08df858`, squash-merged Fri 10/2/2026 1:20pm CT) adds `NSMotionUsageDescription` (ExpoLocation and Reanimated, unused) and `NSPhotoLibraryUsageDescription` (ExpoFileSystem, unused). Both reviewers (the Mobile QA Lead and the AI Product Owner) passed.

## Internal TestFlight

Build 9 is live at 3:41pm CT Fri 10/2/2026. EAS `633d1c10`. Submission `ff49de5e`. Internal group "Nock Internal", Beau only.

EAS labels the build "snapshot 6b598fb" because of working-tree changes. The shipping files match `c08df85`. Two test files are at their `6b598fb` versions.

## Not in this job

Follow-ups for Job 024, and the pre-App-Store list: reword the motion and photo strings as plain non-use statements before external beta or the App Store; the Worker `civilTime.ts` zone table must match the app before history weather turns on (Midland, St. George, Van Horn, Kent); AZ/UT border snapping; Navajo Nation DST; Edit Captured zone; Presidio County edge; sheet layout cleared on close; SE3 mark touching N; the town-search gate; hint height first frame; `weatherProxyUrl` drops a port; `~5 km` in the location string; the preview profile has no env; App Privacy label (Beau, by hand in ASC: Coarse Location, App Functionality, not linked, no tracking); App Attest; expo-secure-store for the Scout token; scout `deleteAccount`; NetInfo; real auth before external testers.
