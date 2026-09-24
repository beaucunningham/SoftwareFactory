# Build

Origin builder finished on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/7, branch `cursor/pins-logs-forecast-0c75`, base `11d37ab`.

Product notes: `docs/job-005-build.md` in the hunting-companion repo.

- M1 `a9553c0` typed pins + tap popup type picker + icon markers
- M2 `2f0ce81` multi-animal defaults
- M3 `25e561d` tabs Map | Guide | You, hunts live on pins, Unpinned hunts, migration
- M4 `3e29ce7` 3-day stub forecast sheet + rule-based suggestions behind ForecastProvider
- Migration test output `{"stayed":1,"attachedNearest":1,"createdPin":1,"unpinned":1,"huntsBefore":4,"huntsAfter":4}`; second run created no pins
- `npx tsc --noEmit` clean
- Product `npm test` 150 pass / 0 fail
- Real iOS Simulator finger tap not driven; Lane must run it before final sign-off
- No live weather, no API keys, no auth or BaaS changes
