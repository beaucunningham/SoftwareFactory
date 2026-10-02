# SoftwareFactory

A software factory for programming apps. **Grok bots are the managers.** **One Cursor cloud agent builds each job.**

You tell a Grok bot what you want. It researches and writes the brief. From Job 020, you start one builder (model grok-4.7). That agent implements the brief and runs the tests in the same session. The Mobile QA Lead and the AI Product Owner review the diff. The Grok bot then accepts the result or sends a follow-up to that same builder.

> **Description:** Grok bots manage. One builder (grok-4.7) builds and tests each job.

## How a run starts

You start every step by hand from this CLI and [cursor.com/agents](https://cursor.com/agents). A fresh clone has an empty `factory/jobs/` directory. That empty queue is the normal cold start. See `factory/jobs/EXAMPLE.md` for the ticket skeleton.

GitHub Actions runs `npm test` on pull requests and on pushes to `main`.

```text
Beau → Grok bot → brief → builder (grok-4.7) → Mobile QA Lead and AI Product Owner review → one status update → Grok bot
```

| Who | Role | Job |
| --- | --- | --- |
| **Grok bot** | Manager / admin | Talk to you, research, write the brief, accept or reject the result |
| **builder** | Cursor worker (grok-4.7) | Implement the brief and run tests in that session |
| **Mobile QA Lead and AI Product Owner** | Review | Review the diff. The Mobile QA Lead also runs Simulator steps |
| **Engineering Manager** | Merge | Merges when the pull request state, mergeability, and CI say it is ready |

Tester, security, and ui cloud agents are retired from Job 020. Their prompts point at this flow. Cursor agents do not plan the product, do research, or approve releases.

The builder runs `npm test` in the default timezone, with `TZ=UTC`, and with `TZ=Pacific/Auckland`, plus `tsc --noEmit`, and reports the results in the product pull request. Later reports cite those results and the review. They are not a second cloud run.

## Two repositories

| Repo | Holds |
| --- | --- |
| **SoftwareFactory** (this GitHub repo) | Tickets, briefs, and the CLI |
| **Hunting companion** on Cursor Origin | Product code |

Product repository: https://cursor.com/codebase/beau-cunningham/tmp-9883dbb9b4ecf3e0

Also known as `beau-cunningham/tmp-9883dbb9b4ecf3e0`. The name is hunting companion (name TBD). See `factory/PRODUCT.md`.

`factory/config.json` is plain JSON, so it has no comments. The `productRepo` field is the Origin URL above. Grok bots read it and launch one builder Cloud Agent there. They write briefs in `factory/jobs/<id>/` in this repo. This GitHub repo is public, so those briefs must not contain secrets.

## Getting started

**Requirements:** [Node.js](https://nodejs.org/) 20. The CLI has no dependencies.

```bash
git clone https://github.com/beaucunningham/SoftwareFactory.git
cd SoftwareFactory
npm start
npm test
```

`index.html` is a one-button browser page for checking that a cloud agent can edit this repo. Open it in a browser when you want that check. Factory jobs run through the CLI below.

## Run a job

1. Create a ticket:

   ```bash
   npm start -- new-job "Add checkout"
   ```

2. A Grok bot fills `factory/jobs/<id>/brief.md` using `factory/managers/GROKBOT.md` and `factory/templates/brief.md`, then marks it ready. That brief is its own pull request.

   ```bash
   npm start -- ready <id>
   ```

3. Start one Cursor builder on the product repo, not in SoftwareFactory:

   https://cursor.com/codebase/beau-cunningham/tmp-9883dbb9b4ecf3e0

   Open that Cloud Agent from [cursor.com/agents](https://cursor.com/agents). Use model grok-4.7. Paste the prompt and include the brief at `factory/jobs/<id>/brief.md` (the path in this repo, or the brief content):

   ```bash
   npm start -- prompt builder <id>
   ```

   A parent Cursor agent can follow `.cursor/skills/run-factory/SKILL.md` after the brief is ready. That still means one builder on the product repo. Do not start tester, security, or ui agents.

4. The Mobile QA Lead (including Simulator steps) and the AI Product Owner review the diff. A real fix is a follow-up reply to the same builder, not a new agent:

   ```bash
   npm start -- prompt follow-up <id>
   ```

   That prompt is short and does not restate the job. Read pull request state, mergeability, and CI directly when you want status or merge readiness. Do not check those through a cloud run.

5. Record post-build status in one update and one SoftwareFactory pull request. The prompt for that step is short and does not restate the job:

   ```bash
   npm start -- prompt status <id>
   npm start -- set-status built tested secured ui-checked <id>
   ```

   `build.md`, `test-report.md`, `security-report.md`, and `ui-report.md` go in that same pull request. Cite the builder's in-session test results and the Mobile QA Lead's and the AI Product Owner's diff review. The UI report is markdown only. Never screenshots. Do not hand-edit `job.json`.

6. Check progress, then accept or send the job back:

   ```bash
   npm start -- status
   npm start -- accept <id>
   npm start -- set-status changes-requested <id>
   ```

   `accept` works only when status is `ui-checked`. A Grok bot runs it. Failure statuses are `test-failed`, `security-failed`, `ui-failed`, and `changes-requested`. The Engineering Manager merges. Never force-push or rebase. If a branch conflicts after a squash, open a fresh branch from main with the identical diff.

```bash
npm start -- roles
npm start -- help
```

## Project structure

```text
.cursor/agents/           builder, plus retired tester, security, and ui prompts
.cursor/rules/            Worker quality and pipeline rules
.github/workflows/        npm test on pull requests and main
factory/config.json       productRepo Origin URL and status flow
factory/PRODUCT.md        Product name and Origin link
factory/managers/         Grok bot manager guide
factory/jobs/             Briefs and job records (empty until the first job; no secrets)
factory/templates/        Brief template copied by new-job
src/                      Factory CLI
AGENTS.md                 Operating guide
```

## License

[MIT](LICENSE)
