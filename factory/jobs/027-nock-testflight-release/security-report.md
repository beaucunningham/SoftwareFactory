# Security report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

The app is Nock. Shipping main `c08df858` (Origin #113). #111 reviewed head `97d0d6f` is main `6b598fb`.

The AI Product Owner passed throughout on #111. Both reviewers (the Mobile QA Lead and the AI Product Owner) passed 027b.

Build 8 (`6b598fb`) was rejected by Apple with ITMS-90683. `NSMotionUsageDescription` was missing. ExpoLocation links `CMMotionActivityManager` and does not use it. 027b adds `NSMotionUsageDescription` (ExpoLocation and Reanimated, unused) and `NSPhotoLibraryUsageDescription` (ExpoFileSystem, unused).

Prod env: weather and Scout URLs set. Scout, history weather, weather stub, and gesture debug unset. Auth is the stub. `ITSAppUsesNonExemptEncryption=false`. ascAppId `6818538348`. Bundle `com.nockhunt.app`.

## Critical

None recorded.

## High

None recorded.

## Medium

None recorded.

## Low

None recorded.

## Result

PASS for internal TestFlight. The ITMS-90683 rejection is fixed on `c08df858` (Build 9). Reword the motion and photo strings as plain non-use statements before external beta or the App Store. Real auth, App Attest, expo-secure-store for the Scout token, scout `deleteAccount`, and NetInfo stay on the pre-App-Store list. The App Privacy label is Beau's, by hand in ASC: Coarse Location, App Functionality, not linked, no tracking.
