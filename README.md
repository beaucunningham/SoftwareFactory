# SoftwareFactory

A software factory for programming apps. **Grok bots are the managers.** **Cursor cloud agents are the workers.**

You tell a Grok bot what you want. It researches and writes the brief. Cursor agents only build the code and run the tests. The Grok bot then accepts the result or sends it back.

> **Description:** Grok bots manage. Cursor agents build and test.

## How the factory works

```text
Beau → Grok bot → brief → Cursor builder → Cursor tester → Grok bot
```

| Who | Role | Job |
| --- | --- | --- |
| **Grok bot** | Manager / admin | Talk to you, research, write the brief, accept or reject the result |
| **builder** | Cursor worker | Implement only the brief |
| **tester** | Cursor worker | Prove the acceptance criteria with tests |

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
   npm start -- new-job "Add a notes API"
   ```

2. A Grok bot fills `factory/jobs/<id>/brief.md` using `factory/managers/GROKBOT.md`, then marks it ready:

   ```bash
   npm start -- ready <id>
   ```

3. Launch Cursor workers from [cursor.com/agents](https://cursor.com/agents) with:

   ```bash
   npm start -- prompt builder <id>
   npm start -- prompt tester <id>
   ```

   Or start one parent Cursor agent and tell it to follow `.cursor/skills/run-factory/SKILL.md` after the brief is ready.

4. The Grok bot reads `build.md` and `test-report.md`, then accepts the job or updates the brief.

Check progress with:

```bash
npm start -- status
npm start -- roles
```

## Project structure

```text
.cursor/agents/           Cursor workers: builder, tester
.cursor/rules/            Worker quality and pipeline rules
factory/managers/         Grok bot manager guide
factory/jobs/             Briefs and worker artifacts
src/                      Factory CLI
AGENTS.md                 Operating guide
```

## License

[MIT](LICENSE)
