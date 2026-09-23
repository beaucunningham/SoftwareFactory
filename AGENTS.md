# SoftwareFactory agent guide

Grok bots are managers. Cursor agents are workers.

Beau talks to Grok bots. Those bots research and write the brief. Cursor agents build the code, run tests, then check security and UI.

## Repositories

SoftwareFactory (this GitHub repo) holds tickets, briefs, and the CLI. Product code is the hunting companion app on Cursor Origin (name TBD):

https://cursor.com/codebase/beau-cunningham/tmp-9883dbb9b4ecf3e0

`productRepo` in `factory/config.json` is that URL. See `factory/PRODUCT.md`. Grok bots write `factory/jobs/<id>/brief.md` here and launch builder, tester, security, and ui Cloud Agents on the product repo. Give each worker that brief (path or content). Briefs stay free of secrets. This GitHub repo is public.

## Pipeline

```text
Beau → Grok bot → brief.md → builder → tester → security → ui → Grok bot
```

| Who | Reads | Writes |
| --- | --- | --- |
| Grok bot | Beau, research | `brief.md`, accept/reject |
| builder | `brief.md` | product code, `build.md` |
| tester | brief + code | tests, `test-report.md` |
| security | brief + code | `security-report.md` |
| ui | brief + running app | `ui-report.md` |

Job tickets live in `factory/jobs/<id>/`. Worker prompts live in `.cursor/agents/`. Manager instructions live in `factory/managers/GROKBOT.md`. Product code lives in the Origin repo from `productRepo`.

## Commands

Print worker prompts here. Start the Cloud Agent on the product repo and include the brief from `factory/jobs/<id>/`.

```bash
npm start -- new-job "Add checkout"
npm start -- ready 001-add-checkout
npm start -- prompt builder 001-add-checkout
npm start -- set-status built 001-add-checkout
npm start -- prompt tester 001-add-checkout
npm start -- set-status tested 001-add-checkout
npm start -- prompt security 001-add-checkout
npm start -- set-status secured 001-add-checkout
npm start -- prompt ui 001-add-checkout
npm start -- set-status ui-checked 001-add-checkout
npm start -- accept 001-add-checkout
npm start -- status
npm test
```

`set-status` is how workers record a result. `accept` is the manager close, and it only works from `ui-checked`. On a failed check, set `test-failed`, `security-failed`, `ui-failed`, or `changes-requested` instead of the passing status.

## Worker rules

- Do not write `brief.md`.
- Do not research product direction or invent requirements.
- If the brief is missing or unclear, stop and return it to the Grok bot.
- Do not mark a job accepted. That is a manager decision.
