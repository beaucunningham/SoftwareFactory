# AC — Map shell + quiet UI (job 003)

## Must pass (tester / ui)

1. Land on **Map** after auth.
2. Map pan/zoom works; spots = clean pins.
3. **Factory pick: hybrid default** on Map load (cheap Apple Maps hybrid). Lane accepts default **or** a one-tap toggle; this job does not leave that OR open. Optional Standard toggle counts as one control.
4. Overlay chrome restrained; primary map floating controls ≤ ~2 (style and/or “+ spot”). If a third is needed, note it for Sage; do not silently ship three.
5. Pin tap → spot detail; create-spot still works.
6. App-wide quieter: less busy chrome; burnt orange as accent only (`#BF5700` / muted `#F5E6D8`).
7. Job 001 auth + job 002 weather stub behaviors unchanged.
8. No new API keys / paid map or weather services. No paid topo — Apple Maps satellite/hybrid + clean pins is the bar.
9. Lane AC is **iOS Simulator only**. Do not break Android if that project is present.

## Fail if

- Guide becomes home again
- Loud orange full-bleed / tacky stacked cards remain as default look
- onX feature-parity scope creep (layers, tracks, property lines)
- Secrets or paid SDKs added
- Paid topo or a third map floating control shipped with no note for Sage

## Lane Mobile notes

Full Simulator checklist and repro steps: `mobile-notes.md` (Lane, 2026-09-23 CT). Gaps folded into this AC:

1. Default vs toggle — Lane accepts either; prefer default hybrid if cheap. **This job picks default hybrid.**
2. No paid topo. Satellite/hybrid + clean pins is the bar.
3. Primary floating controls ≤ ~2. A third goes to Sage first.
4. iOS Simulator only. Do not break Android if present.
