# Factory note

UI-check screenshots must not be committed to the product repo.

Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this SoftwareFactory job folder (`factory/jobs/016-nock-brand-forecast-glass/`).

Job 007's screenshots bloated the hunting-companion export from about 6 MB to 24.5 MB. Do not repeat that.

The side-by-side source-vs-export renders required for the icon, splash, and Map wordmark belong in the product pull request. They are the proof the design was only cropped, keyed, and resized. They are not a substitute for the UI report, and they are not Lane's UI-check screenshot dump.

Merges go through the normal permitted path only. This job is one product pull request.

Do not edit any Job 001–015 files from this ticket. Job 015 (`015-map-tab-freeze-hotfix`) sits at `secured` by Beau's choice. After the real 015 UI check in this job, `ui-checked` and `accept` for job 015 are recorded with the status CLI only. Never hand-edit `job.json`.
