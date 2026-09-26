# Factory note

UI-check screenshots must not be committed to the product repo.

Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this SoftwareFactory job folder (`factory/jobs/014-loghunt-parcels-sunglass-tour/`).

Job 007's screenshots bloated the hunting-companion export from about 6 MB to 24.5 MB. Do not repeat that.

Milestone PRs merge through the normal permitted path. One PR per milestone, in order: H1, H2, H3, H4. After a lower PR is squash-merged, the next PR is rebuilt on the new main on a fresh branch (never force-pushed) to avoid stacked-squash conflicts.

Do not edit any Job 001–013 files.
