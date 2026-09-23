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

A Grok bot replaces the placeholders in `brief.md`, then you run `npm start -- ready 001-short-title`. Workers add `build.md`, `test-report.md`, `security-report.md`, and `ui-report.md` in that same folder.

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

Change status with the CLI. `new-job` sets `draft`. `ready` sets `briefed`. Workers use `set-status` for `built`, `tested`, `secured`, `ui-checked`, and the matching failure statuses. A Grok bot sets `changes-requested` or runs `accept` once status is `ui-checked`.

This file is only an example. It is not a live job, and `npm start -- status` ignores it.
