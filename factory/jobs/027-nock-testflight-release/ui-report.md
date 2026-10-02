# UI report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

The app is Nock. Final shipping main `c08df858` (Origin #113). #111 main `6b598fb`, reviewed head `97d0d6f`.

This report is markdown only. No screenshots.

The Mobile QA Lead bounced two heads on #111. The AI Product Owner passed throughout. Both reviewers (the Mobile QA Lead and the AI Product Owner) passed 027b.

## a08b887

The Mobile QA Lead bounced `a08b887`:

- Wind arrows and the Apple mark over the Map Tools sheet.
- West TX, St. George, and Kanab zones.

## 73e194d

The Mobile QA Lead bounced `73e194d`:

- Mid-slide sheet measurement.
- Van Horn.

## Passing head

The Mobile QA Lead passed `97d0d6f`. #111 squash-merged Fri 10/2/2026 9:43am CT as main `6b598fb`.

## 027b

Origin #113 squash-merged Fri 10/2/2026 1:20pm CT as main `c08df858`. It adds `NSMotionUsageDescription` (ExpoLocation and Reanimated, unused) and `NSPhotoLibraryUsageDescription` (ExpoFileSystem, unused). Both reviewers passed.

## TestFlight

Build 9 is live in internal TestFlight at 3:41pm CT Fri 10/2/2026 (EAS `633d1c10`, submission `ff49de5e`). Internal group "Nock Internal", Beau only.

EAS labels it "snapshot 6b598fb" because of working-tree changes. The shipping files match `c08df85`. Two test files are at their `6b598fb` versions.

Build 8 (`6b598fb`) was rejected by Apple with ITMS-90683 before 027b.

## Result

PASS for internal TestFlight. The Mobile QA Lead passed `97d0d6f` after the `a08b887` and `73e194d` bounces. Both reviewers passed 027b. Build 9 is live for "Nock Internal".
