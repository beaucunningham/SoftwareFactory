# SoftwareFactory agent guide

Grok bots are managers. Cursor agents are workers.

Beau talks to Grok bots. Those bots research and write the brief. From Job 020, one Cursor cloud agent (model grok-4.7) builds the job and runs its tests in that same session.

## Repositories

SoftwareFactory (this GitHub repo) holds tickets, briefs, and the CLI. Product code is the hunting companion app on Cursor Origin (name TBD):

https://cursor.com/codebase/beau-cunningham/tmp-9883dbb9b4ecf3e0

`productRepo` in `factory/config.json` is that URL. See `factory/PRODUCT.md`. Grok bots write `factory/jobs/<id>/brief.md` here and launch one builder Cloud Agent on the product repo. Give that builder the brief (path or content). Briefs stay free of secrets. This GitHub repo is public.

## Pipeline

Applies from Job 020. Jobs 001–019 keep their historical records.

```text
Beau → Grok bot → brief.md → builder (grok-4.7) → Lane and Ari review → one status update → Grok bot
```

| Who | Reads | Writes |
| --- | --- | --- |
| Grok bot | Beau, research | `brief.md`, accept/reject |
| builder | `brief.md` | product code, test results in the product pull request |
| Lane and Ari | the diff | review. Lane (Mobile) also runs Simulator steps |
| status update | builder results, that review | one SoftwareFactory pull request: `build.md`, `test-report.md`, `security-report.md`, `ui-report.md`, and status |

Tester, security, and ui cloud agents are retired. Their prompts in `.cursor/agents/` point here.

The builder runs `npm test` in the default timezone, `TZ=UTC`, and `TZ=Pacific/Auckland`, and `tsc --noEmit`, in the build session, and reports those results in the product pull request. `test-report.md`, `security-report.md`, and `ui-report.md` cite those results and Lane's and Ari's diff review. They are not written by separate check agents.

Real fixes go back as a follow-up reply to the same builder agent. Do not start a new agent for a review fix.

Status checks and merge readiness come from reading pull request state, mergeability, and CI checks directly. Never through a cloud run.

Job tickets live in `factory/jobs/<id>/`. The builder prompt lives in `.cursor/agents/builder.md`. Manager instructions live in `factory/managers/GROKBOT.md`. Product code lives in the Origin repo from `productRepo`.

## Commands

Print the builder prompt here. Start one Cloud Agent on the product repo and include the brief from `factory/jobs/<id>/`.

```bash
npm start -- new-job "Add checkout"
npm start -- ready 020-add-checkout
npm start -- prompt builder 020-add-checkout
npm start -- prompt follow-up 020-add-checkout
npm start -- prompt status 020-add-checkout
npm start -- set-status built tested secured ui-checked 020-add-checkout
npm start -- accept 020-add-checkout
npm start -- status
npm test
```

`set-status` and `accept` are the only way to change SoftwareFactory status. Do not hand-edit `job.json`. From Job 020, `built`, `tested`, `secured`, and `ui-checked` go in one status update and one SoftwareFactory pull request. The status prompt is short and does not restate the job. `accept` is the manager close, and it only works from `ui-checked`. On a failed check, set `test-failed`, `security-failed`, `ui-failed`, or `changes-requested` instead of the passing chain, then follow up with the same builder.

## Standing rules

- The brief is its own pull request: `new-job`, then `ready`.
- Never force-push or rebase. If a branch conflicts after a squash, open a fresh branch from main with the identical diff.
- UI reports are markdown only. Never screenshots.
- Finley merges.

## Worker rules

- Do not write `brief.md`.
- Do not research product direction or invent requirements.
- If the brief is missing or unclear, stop and return it to the Grok bot.
- Do not mark the job accepted. That is a manager decision.
