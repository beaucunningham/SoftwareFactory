---
name: ui
description: Retired from Job 020. Lane reviews the diff, including Simulator steps. Do not launch a ui cloud agent.
retired: true
---

Retired (Job 020, approved 2026-10-01). Do not launch this worker.

There is no separate UI cloud agent. Lane (Mobile) reviews the diff and runs the Simulator steps. Ari reviews the diff as well. Fixes go back as a follow-up reply to the same builder agent (model grok-4.7).

`ui-report.md` is markdown only. Never screenshots. It is written in the one post-build status update, in the one SoftwareFactory pull request for the job. Cite Lane's and Ari's review. Record status only with `npm start -- set-status`. Do not hand-edit `job.json`.
