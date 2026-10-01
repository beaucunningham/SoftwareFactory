# Factory note

UI-check screenshots must not be committed to the product repo.

Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this SoftwareFactory job folder (`factory/jobs/019-nock-polish-parcels-wind/`).

Job 007's screenshots bloated the hunting-companion export from about 6 MB to 24.5 MB. Do not repeat that.

Merges go through the normal permitted path only. One product pull request per milestone, in this order:

1. **J1 + J2** may share one pull request, because both touch the sun stack.
2. **J8** is its own small pull request, next, because the keyboard covering the tap-to-pin popup is a usability blocker.
3. **J9** is its own small pull request, next: two-finger map rotation and the reset-north compass.
4. **J10** is its own small pull request, next: returning to Map restores the last camera. No auto-fit.
5. **J3, J4, J5, J6**, one pull request each, in that order.
6. **J7** is its own pull request, last. It accounts for the J9 camera heading. It cannot block J1–J6, J8, J9, or J10.

After a lower pull request is squash-merged, the next pull request is rebuilt on the new main on a fresh branch (never force-pushed).

Builders run on Linux and cannot run the iOS Simulator. They trace the code and write exact Simulator steps. Lane runs those steps. Where Expo Go and a dev build differ, Lane runs both: J4 always, and J7 performance. J8 is checked on iPhone SE (3rd gen), iPhone 15, and iPhone 15 Pro Max, and Lane also runs it on a real iPhone.

Beau's go came via Finley at 1:21am CT on 2026-10-01. The 1:30am fallback-wording call, the 1:33am J8 keyboard addition, the 1:35am J9 rotation addition (recorded in the 1:36am delta), and the 1:37am J10 camera-position addition are in `brief.md` and `ac.md`. J9 and J10 are checked on the Simulator. Lane writes whether Expo Go and a dev build differ.

Do not edit any Job 001–018 files from this ticket. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. The Job 019 nav-lock amendment is in this job's `brief.md`.
