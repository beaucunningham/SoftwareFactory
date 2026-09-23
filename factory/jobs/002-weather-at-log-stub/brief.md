# Brief — Job 002: Weather-at-log (stub bind)

Filled by Sage (Product) for Kai / SoftwareFactory. Cursor workers do not invent product direction.

**Job id:** `002-weather-at-log-stub`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). This replaces any temporary slug, including `beau-cunningham/tmp-9883dbb9b4ecf3e0`. Workers use this Origin repo (main after job 001). Do not follow an older tmp product URL.  
**Related:** `stub-spec.md` (copy of `STUB_WEATHER_BIND_v0.md`), `ac.md` (copy of `AC_WEATHER_AT_LOG_STUB_v0.md`), `CORE_SCHEMA_v0.md`, `PRODUCT_NAV_LOCK_2026-09-23.md` (do not rework nav/auth).

## What to build

On hunt create/save, **best-effort** attach a `weatherAtLog` snapshot using the stub shape. Missing or failed weather **never** blocks save. Surfaces: Logs list + hunt detail show a weather one-liner when present, or “Weather unavailable” when null/omitted. Optional local `weatherPending` for a later retry. **No paid weather APIs. No API keys.**

## Research

- Product lock: accounts + Map-home done (job 001 accepted). Next core-loop slice is weather-at-log without spend.
- Spec: `factory/jobs/002-weather-at-log-stub/stub-spec.md` in this public job tree (source `STUB_WEATHER_BIND_v0.md`; also mirrored under hunting-companion).
- Live OpenWeather / real provider = gated (Finley → Morgan → Beau). Out of this job.
- Unknown: none blocking — stub may return all-null numeric fields with `source: "stub"` and `capturedAt`.

## Acceptance criteria

- [ ] Online hunt create/save → hunt persists with `weatherAtLog` stub object present (`source` is `"stub"`, `capturedAt` set; `tempF` / `windMph` / `conditions` may be null)
- [ ] Offline (or stub timeout/failure) hunt create/save → hunt still persists; `weatherAtLog` is null or omitted; **no error toast that blocks save**
- [ ] Logs list shows weather one-liner when stub present, or “Weather unavailable” / empty when missing
- [ ] Hunt detail shows the same weather row/chips; never crashes on null weather
- [ ] Optional: `weatherPending: true` when save succeeded without weather (for future retry) — nice-to-have, not required to accept
- [ ] Map and Logs tabs still work (no auth/nav regressions from job 001)
- [ ] No weather API keys, tokens, or paid SDK calls in repo; no inventing a live provider

## User-facing UI

- Hunt create: no extra required field for weather; optional quiet “attaching weather…” that must not gate Save
- Logs list row: one-line weather or “Weather unavailable”
- Hunt detail: weather section with stub fields or unavailable state

## Payments and auth

- Payments: none  
- Auth: unchanged (stub AuthSession from job 001)  
- Secrets: none — stub only. This public job tree must not contain API keys, tokens, or other secrets.

## Out of scope

- Live OpenWeather
- Any paid or free live weather API
- Weather API keys, tokens, paid SDKs, or secrets in this public job tree
- Guide memory / Guide prompt changes
- BaaS / auth provider swap
- Map or auth screen changes
- Android-first work; App Store submit

## Constraints

- Keep the change small; match existing Expo / HuntLog patterns
- Field names stable for a future gated provider swap: `tempF`, `windMph`, `windDir`, `precipIn`, `conditions`, `source`, `capturedAt`
- Add tests for: online stub attach; offline save without weather; UI null-safe render
- iOS-first

## Shape reminder

```json
{
  "tempF": null,
  "windMph": null,
  "windDir": null,
  "precipIn": null,
  "conditions": null,
  "source": "stub",
  "capturedAt": "<ISO-8601>"
}
```

Or omit / null entire `weatherAtLog`.
