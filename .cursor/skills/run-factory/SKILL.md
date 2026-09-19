---
name: run-factory
description: Run Cursor worker agents on a Grok bot brief. Use only after a manager has finished the brief.
---

# Run factory workers

Use this when a Grok bot (or Beau) has a ready job brief and Cursor should build and test it.

## Steps

1. Confirm `factory/jobs/<id>/brief.md` is finished and `job.json` status is `briefed`. If not, stop. Do not write the brief.
2. Delegate to the `builder` subagent.
3. Delegate to the `tester` subagent.
4. If status is `test-failed`, send the tester report back to the builder and retry once.
5. Stop when status is `tested` or when the brief is unclear. Hand the ticket back to the Grok bot.

Do not plan the product. Do not accept the release.
