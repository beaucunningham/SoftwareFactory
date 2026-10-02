# Job tickets

`factory/jobs/` stays empty until you create a ticket. An empty queue is the normal cold start.

Create the first job from the repo root:

```bash
npm start -- new-job "Short title"
```

That writes:

```text
factory/jobs/001-short-title/
  job.json    # id, title, status, timestamps
  brief.md    # copied from factory/templates/brief.md
```

A Grok bot replaces the placeholders in `brief.md`, then you run `npm start -- ready 001-short-title`. That brief is its own pull request.

From Job 020, one builder session implements the brief and runs the tests. After the Mobile QA Lead and the AI Product Owner review the diff, one SoftwareFactory pull request adds `build.md`, `test-report.md`, `security-report.md`, and `ui-report.md` and records `built`, `tested`, `secured`, and `ui-checked` with one `set-status` command. The reports cite the builder's in-session results and that review. The UI report is markdown only.

## Example job.json

```json
{
  "id": "001-short-title",
  "title": "Short title",
  "status": "draft",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

Change status with the CLI. Do not hand-edit `job.json`. `new-job` sets `draft`. `ready` sets `briefed`. From Job 020, one `set-status` command records `built`, `tested`, `secured`, and `ui-checked`. Failure statuses are `test-failed`, `security-failed`, `ui-failed`, and `changes-requested`. A Grok bot runs `accept` once status is `ui-checked`. The Engineering Manager merges.

This file is only an example. It is not a live job, and `npm start -- status` ignores it.
