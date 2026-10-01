# Factory note

UI-check screenshots must not be committed to the product repo.

Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this SoftwareFactory job folder (`factory/jobs/017-nock-feedback-parcels-locate-gps/`).

Job 007's screenshots bloated the hunting-companion export from about 6 MB to 24.5 MB. Do not repeat that.

Merges go through the normal permitted path only. One product pull request per milestone, in order: I1, I2, I3, I4, I5, I6, I7. I1 and I2 may share one pull request, because both touch the Map top chrome. I4 and I7 can stop without blocking the others. After a lower pull request is squash-merged, the next pull request is rebuilt on the new main on a fresh branch (never force-pushed) to avoid stacked-squash conflicts.

Do not edit any Job 001–016 files from this ticket. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. The Job 017 nav-lock amendment is in this job's `brief.md`.
