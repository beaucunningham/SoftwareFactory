# SoftwareFactory agent guide

This repository is a software factory. Specialized agents work in sequence to ship small, tested changes for programming apps.

## Pipeline

```text
request → planner → builder → tester → reviewer → approved
```

If tests fail or review requests changes, the builder goes again.

| Role | Reads | Writes |
| --- | --- | --- |
| planner | `request.md` | `spec.md` |
| builder | `spec.md` | product code, `build.md` |
| tester | spec + code | tests, `test-report.md` |
| reviewer | everything | `review.md` |

Job tickets live in `factory/jobs/<id>/`. Role prompts live in `.cursor/agents/`.

## Commands

```bash
npm start              # show factory help
npm start -- roles     # list specialist agents
npm start -- new-job "Add a notes API"
npm start -- status
npm start -- prompt planner 001-add-a-notes-api
npm test
```

## How to run a job

1. Create a job and edit `request.md`.
2. Start a Cloud Agent (or local Agent) with the prompt from `npm start -- prompt <role> <id>`.
3. Or start one parent agent and tell it to `/run-factory` on that job.

Do not implement product code until a spec exists.
