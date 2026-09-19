# SoftwareFactory

A software factory for programming apps. **Grok bots are the managers.** **Cursor cloud agents are the workers.**

You tell a Grok bot what you want. It researches and writes the brief. Cursor agents build, test, and check security and UI. The Grok bot then accepts the result or sends it back.

> **Description:** Grok bots manage. Cursor agents build, test, and check.

## How the factory works

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

**Requirements:** [Node.js](https://nodejs.org/) 18 or later

```bash
git clone https://github.com/beaucunningham/SoftwareFactory.git
cd SoftwareFactory
npm start
npm test
```

## Run a job

1. Create a ticket:

   ```bash
   npm start -- new-job "Add checkout"
   ```

2. A Grok bot fills `factory/jobs/<id>/brief.md` using `factory/managers/GROKBOT.md`, then marks it ready:

   ```bash
   npm start -- ready <id>
   ```

3. Launch Cursor workers from [cursor.com/agents](https://cursor.com/agents) with:

   ```bash
   npm start -- prompt builder <id>
   npm start -- prompt tester <id>
   npm start -- prompt security <id>
   npm start -- prompt ui <id>
   ```

   Or start one parent Cursor agent and tell it to follow `.cursor/skills/run-factory/SKILL.md` after the brief is ready.

4. The Grok bot reads the worker reports, then accepts the job or updates the brief.

Check progress with:

```bash
npm start -- status
npm start -- roles
```

## Project structure

```text
.cursor/agents/           Cursor workers: builder, tester, security, ui
.cursor/rules/            Worker quality and pipeline rules
factory/managers/         Grok bot manager guide
factory/jobs/             Briefs and worker artifacts
src/                      Factory CLI
AGENTS.md                 Operating guide
```

## License

[MIT](LICENSE)
