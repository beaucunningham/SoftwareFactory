# SoftwareFactory agent guide

Grok bots are managers. Cursor agents are workers.

Beau talks to Grok bots. Those bots research and write the brief. Cursor agents only build the code and run the tests.

## Pipeline

```text
Beau → Grok bot → brief.md → builder → tester → Grok bot
```

| Who | Reads | Writes |
| --- | --- | --- |
| Grok bot | Beau, research | `brief.md`, accept/reject |
| builder | `brief.md` | product code, `build.md` |
| tester | brief + code | tests, `test-report.md` |

Job tickets live in `factory/jobs/<id>/`. Worker prompts live in `.cursor/agents/`. Manager instructions live in `factory/managers/GROKBOT.md`.

## Commands

```bash
npm start -- new-job "Add a notes API"
npm start -- ready 001-add-a-notes-api
npm start -- prompt builder 001-add-a-notes-api
npm start -- prompt tester 001-add-a-notes-api
npm start -- status
npm test
```

## Worker rules

- Do not write `brief.md`.
- Do not research product direction or invent requirements.
- If the brief is missing or unclear, stop and return it to the Grok bot.
- Do not mark a job accepted. That is a manager decision.
