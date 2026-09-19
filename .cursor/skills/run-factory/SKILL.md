---
name: run-factory
description: Run the SoftwareFactory pipeline on a product request using planner, builder, tester, and reviewer agents.
---

# Run the software factory

Use this when the user wants an app feature, bug fix, or programming task built by the factory.

## Steps

1. Create a job if one does not exist:

   ```bash
   npm start -- new-job "short title"
   ```

2. Put the user's request in `factory/jobs/<id>/request.md`.

3. Delegate in order, using the project subagents in `.cursor/agents/`:

   1. `planner` — write the spec
   2. `builder` — implement the spec
   3. `tester` — prove the acceptance criteria
   4. `reviewer` — approve or send back

4. If the reviewer requests changes or tests fail, return to the builder with those notes, then tester and reviewer again.

5. Stop when `job.json` status is `approved`.
