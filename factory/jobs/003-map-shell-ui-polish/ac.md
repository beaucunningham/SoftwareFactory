# AC — Map shell + quiet UI (job 003)

## Must pass (tester / ui)

1. Land on **Map** after auth.
2. Map pan/zoom works; spots = clean pins.
3. Satellite/hybrid default **or** one-tap Standard ↔ Satellite/Hybrid.
4. Overlay chrome restrained; primary map actions ≤ ~2 obvious controls.
5. Pin tap → spot detail; create-spot still works.
6. App-wide quieter: less busy chrome; burnt orange as accent only (`#BF5700` / muted `#F5E6D8`).
7. Job 001 auth + job 002 weather stub behaviors unchanged.
8. No new API keys / paid map or weather services.

## Fail if

- Guide becomes home again
- Loud orange full-bleed / tacky stacked cards remain as default look
- onX feature-parity scope creep (layers, tracks, property lines)
- Secrets or paid SDKs added

## Lane Mobile notes

Optional attach: Simulator repro steps for map style toggle + pin tap on iOS. Gaps → Finley → Kai.
