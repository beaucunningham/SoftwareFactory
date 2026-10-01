# Factory note

UI-check screenshots must not be committed to the product repo.

Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this SoftwareFactory job folder (`factory/jobs/018-county-cad-link/`).

Job 007's screenshots bloated the hunting-companion export from about 6 MB to 24.5 MB. Do not repeat that.

Merges go through the normal permitted path only. This job is one product pull request.

The product work stacks on Job 017 I1–I6 (Origin PRs #27–#31, tip `c1c9ba9`). Do not block 017's merge. Once 017 has landed on product main, move the 018 diff onto a fresh branch from that main. Never force-push.

This job recovers the CAD-link part of Job 017's stopped I7 (Origin PR #32). It does not restart `identify`.

Beau's go came via Finley on 2026-09-30 at 10:30pm CT.

Do not edit any Job 001–017 files from this ticket. Another open SoftwareFactory PR that marks job 017 built may land first. Touch only `factory/jobs/018-county-cad-link/`.
