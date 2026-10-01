---
name: run-factory
description: Run the one builder cloud agent on a Grok bot brief. Use only after a manager has finished the brief. From Job 020 there is no separate tester, security, or ui agent.
---

# Run the factory builder

Use this when a Grok bot (or Beau) has a ready job brief and Cursor should build it. Applies from Job 020.

## Steps

1. Confirm `factory/jobs/<id>/brief.md` is finished and `job.json` status is `briefed`. If not, stop. Do not write the brief.
2. Delegate to one `builder` subagent (model grok-4.7).
3. That session runs `npm test` in the default timezone, `TZ=UTC`, and `TZ=Pacific/Auckland`, and `tsc --noEmit`, and reports the results in the product pull request.
4. Do not delegate to tester, security, or ui. Those workers are retired. See `.cursor/agents/tester.md`, `.cursor/agents/security.md`, and `.cursor/agents/ui.md`.
5. Lane (Mobile, including Simulator steps) and Ari review the diff. Real fixes are a follow-up reply to the same builder agent (`npm start -- prompt follow-up <id>`). Do not start a new agent.
6. Read pull request state, mergeability, and CI checks directly. Do not start a cloud run for status or merge readiness.
7. After review, record `built`, `tested`, `secured`, and `ui-checked` with one `npm start -- set-status` update and one SoftwareFactory pull request. Use `npm start -- prompt status <id>`. That prompt stays short and does not restate the job. The reports cite the builder's in-session results and Lane's and Ari's review. The UI report is markdown only.
8. Stop when status is `ui-checked` or when the brief is unclear. Hand the ticket back to the Grok bot. Finley merges.

Status changes use `npm start -- set-status` and `npm start -- accept`. Do not hand-edit `job.json`. Read status back with `npm start -- status`. The Grok bot accepts from `ui-checked`, or sends the job back with `npm start -- set-status changes-requested <id>`.

Do not plan the product. Do not accept the release.
