# SoftwareFactory

A software factory for programming apps. Specialist Cursor cloud agents work in sequence so ideas become small, tested pull requests instead of one-shot dumps of code.

> **Description:** A multi-agent factory that plans, builds, tests, and reviews app work.

## How the factory works

```text
request → planner → builder → tester → reviewer → approved
```

| Agent | Job |
| --- | --- |
| **planner** | Turns a request into a small spec with acceptance criteria |
| **builder** | Implements only what the spec asked for |
| **tester** | Proves the acceptance criteria with tests |
| **reviewer** | Approves the change or sends it back |

They hand work to each other through job tickets in `factory/jobs/`. Cursor can also run the four roles as subagents from one parent Cloud Agent.

## Getting started

**Requirements:** [Node.js](https://nodejs.org/) 18 or later

```bash
git clone https://github.com/beaucunningham/SoftwareFactory.git
cd SoftwareFactory
npm start
npm test
```

## Run a job

1. Create a ticket and describe the work:

   ```bash
   npm start -- new-job "Add a notes API"
   ```

   Edit `factory/jobs/<id>/request.md`.

2. Launch the next specialist. From [cursor.com/agents](https://cursor.com/agents), start a Cloud Agent on this repo and paste:

   ```bash
   npm start -- prompt planner <id>
   ```

   Repeat with `builder`, `tester`, and `reviewer` as the ticket moves forward.

3. Or start one parent Cloud Agent and tell it to follow `.cursor/skills/run-factory/SKILL.md` for that job. It will delegate to the project subagents in `.cursor/agents/`.

Check progress with:

```bash
npm start -- status
npm start -- roles
```

## Project structure

```text
.cursor/agents/    Specialist agent prompts (planner, builder, tester, reviewer)
.cursor/rules/     Quality bar and pipeline rules
.cursor/skills/    How a parent agent runs the factory
factory/jobs/      Job tickets and handoff artifacts
src/               Factory CLI
AGENTS.md          Operating guide for cloud agents
```

## License

[MIT](LICENSE)
