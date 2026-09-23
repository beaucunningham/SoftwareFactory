# SoftwareFactory

A software factory for programming apps. **Grok bots are the managers.** **Cursor cloud agents are the workers.**

You tell a Grok bot what you want. It researches and writes the brief. You paste each worker prompt into a Cursor Cloud Agent. The agent builds, tests, and checks security and UI. The Grok bot then accepts the result or sends it back.

> **Description:** Grok bots manage. Cursor agents build, test, and check.

## How a run starts

You start every step by hand from this CLI and [cursor.com/agents](https://cursor.com/agents). A fresh clone has an empty `factory/jobs/` directory. That empty queue is the normal cold start. See `factory/jobs/EXAMPLE.md` for the ticket skeleton.

GitHub Actions runs `npm test` on pull requests and on pushes to `main`.

```text
Beau → Grok bot → brief → builder → tester → security → ui → Grok bot
```

| Who | Role | Job |
| --- | --- | --- |
| **Grok bot** | Manager / admin | Talk to you, research, write the brief, accept or reject the result |
| **builder** | Cursor worker | Implement only the brief |
| **tester** | Cursor worker | Prove the acceptance criteria with tests |
| **security** | Cursor worker | Check secrets, auth, and payment safety |
| **ui** | Cursor worker | Walk the user-facing flow, or skip if there is no UI |

Cursor agents do not plan the product, do research, or approve releases.

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

2. A Grok bot fills `factory/jobs/<id>/brief.md` using `factory/managers/GROKBOT.md` and `factory/templates/brief.md`, then marks it ready:

   ```bash
   npm start -- ready <id>
   ```

3. Launch Cursor workers from [cursor.com/agents](https://cursor.com/agents). Paste the prompt from each command, in order. Each worker records its own status before it stops:

   ```bash
   npm start -- prompt builder <id>
   npm start -- prompt tester <id>
   npm start -- prompt security <id>
   npm start -- prompt ui <id>
   ```

   Or start one parent Cursor agent and tell it to follow `.cursor/skills/run-factory/SKILL.md` after the brief is ready.

4. Check progress, then accept or send the job back:

   ```bash
   npm start -- status
   npm start -- accept <id>
   npm start -- set-status changes-requested <id>
   ```

   `accept` works only when status is `ui-checked`. Workers use `set-status` for `built`, `tested`, `secured`, `ui-checked`, `test-failed`, `security-failed`, and `ui-failed`. If a worker stops without recording status, run the matching `set-status` command yourself.

```bash
npm start -- roles
npm start -- help
```

## Project structure

```text
.cursor/agents/           Cursor workers: builder, tester, security, ui
.cursor/rules/            Worker quality and pipeline rules
.github/workflows/        npm test on pull requests and main
factory/managers/         Grok bot manager guide
factory/jobs/             Briefs and worker artifacts (empty until the first job)
factory/templates/        Brief template copied by new-job
src/                      Factory CLI
AGENTS.md                 Operating guide
```

## License

[MIT](LICENSE)
