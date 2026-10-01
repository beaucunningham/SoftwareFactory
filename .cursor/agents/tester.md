---
name: tester
description: Retired from Job 020. The builder runs tests in its session. Do not launch a tester cloud agent.
retired: true
---

Retired (Job 020, approved 2026-10-01). Do not launch this worker.

The builder (model grok-4.7) runs `npm test` in the default timezone, `TZ=UTC`, and `TZ=Pacific/Auckland`, and `tsc --noEmit`, in the same session. It reports those results in the product pull request.

Lane (Mobile, including Simulator steps) and Ari review the diff. Fixes go back as a follow-up reply to that same builder agent.

`test-report.md` is written in the one post-build status update, in the one SoftwareFactory pull request for the job. Cite the builder's in-session results and Lane's and Ari's review. Record status only with `npm start -- set-status`. Do not hand-edit `job.json`.
