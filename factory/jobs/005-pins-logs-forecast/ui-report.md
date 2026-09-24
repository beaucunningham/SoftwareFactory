# UI report

Origin UI pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/7, branch `cursor/pins-logs-forecast-0c75` (docs tip `4c944a5`, product tip `e8233a6`).

The UI worker filed a docs-only report on that same branch: `docs/job-005-ui-report.md` and screenshots in `docs/job-005-ui/`.

Product code was not changed by the UI worker.

## What I opened

Expo web at 390×844. Stub Apple sign-in and onboarding.

## What worked

All 12 happy-path steps passed.

- Stub sign-in, multi-select Deer and Duck, land on Map. Tabs are Map | Guide | You.
- Empty map shows exactly "Tap the map to drop a pin."
- Popup opens as Pin 1 / General. Choosing Duck pond renames it to Duck pond 1.
- Cancel clears the provisional pin. Press-and-hold does nothing. With a pin selected, a tap on empty map only dismisses.
- `+` places a provisional pin at map center.
- Log a hunt opens with the pin preselected.
- A renamed pin keeps that name when the type changes.
- Satellite and Standard both show at least 3 types. Markers are icon-in-pin. One burnt-orange ring at 1.15x. Unselected non-General pins have no orange. Fit-to-pins works.
- The 3-day stub sheet suggests pins and never Parking. Tapping a suggestion selects it.
- Guide log chooses a pin. Sending the number selects and saves.
- Delete pin shows the hunt count, then You shows Unpinned hunts (1). Assign clears the entry.
- Reload persists pins, types, names, and logs.
- No visible "spot".
- The create sheet is the Job 004 card plus one 44pt type row.

## Issues

- Low. Guide pin chooser: tapping a pin chip describes the pin instead of selecting it. Sending the number selects and saves.
- Note. Web +/− zoom buttons are web-only.

## Not scored

- Hunt-row edit and delete (C4). Tester passed this in source.
- Seeded migration C8/C9. Tester passed by unit test: 1/1/1/1, 4=4, idempotent.

## Gaps for Lane

- Real iOS Simulator finger tap was not performed. Lane owns it after merge.

## Result

Pass. A person can finish pins, logs-in-pins, and the stub forecast on Expo web. Lane still owns iOS Simulator sign-off.
