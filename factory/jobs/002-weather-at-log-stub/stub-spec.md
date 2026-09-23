# Stub weather bind notes (v0)

**For:** Lane (`AriClient` / offline hunt log)  
**Owner:** Ari  
**Gate:** no paid weather APIs until Morgan → Finley → Beau  
**Status:** implementable alongside Guide contract v0.2

---

## Goal

On hunt log create, attach a weather snapshot when possible. Missing weather **never** blocks save. Week 1 uses a stub — real providers later behind the spend gate.

---

## Shape (`weatherAtLog`)

Nullable object on `HuntLog`:

```json
{
  "tempF": null,
  "windMph": null,
  "windDir": null,
  "precipIn": null,
  "conditions": null,
  "source": "stub",
  "capturedAt": "2026-09-18T07:30:00-05:00"
}
```

| Field | Type | Week 1 |
|-------|------|--------|
| tempF | number \| null | null |
| windMph | number \| null | null |
| windDir | string \| null | null |
| precipIn | number \| null | null |
| conditions | string \| null | null |
| source | string | always `"stub"` until a gated provider |
| capturedAt | ISO-8601 | client or server time when stub ran |

Also allowed: omit `weatherAtLog` entirely (`null` / missing key).

---

## Client behavior (Lane)

1. User saves a hunt (online or offline). Required fields only: `date` + `speciesPrimary` (+ `clientId` for idempotency).
2. **Do not** wait on weather before persisting locally.
3. When online at create/submit, call stub attach (or server fills on sync) — best effort.
4. If stub fails / offline / timeout: save hunt with `weatherAtLog: null` (or omit). Optional local flag `weatherPending: true` for a later retry.
5. UI: show “Weather unavailable” / empty chips — never error the save.

### Suggested `AriClient` stubs

```ts
// Pseudocode — align names to your Expo types
type WeatherAtLog = {
  tempF: number | null;
  windMph: number | null;
  windDir: string | null;
  precipIn: number | null;
  conditions: string | null;
  source: "stub" | string;
  capturedAt: string;
};

/** Week 1: returns stub object or null. Never throws into the save path. */
async function attachWeatherStub(opts: {
  lat?: number;
  lng?: number;
  at?: string; // ISO; default now
}): Promise<WeatherAtLog | null> {
  try {
    // No network provider. Optional: POST /v1/weather/stub later.
    return {
      tempF: null,
      windMph: null,
      windDir: null,
      precipIn: null,
      conditions: null,
      source: "stub",
      capturedAt: opts.at ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
```

Server (when Auth/BaaS exists): same rule — on `POST /v1/hunts`, if body has no weather, may attach stub; never reject for missing weather.

---

## Acceptance tie-in (Sage)

- Weather present on ≥95% of successful creates **when network available** — with stub, that means ≥95% get a stub object (`source: "stub"`) or explicit null after best-effort; product bar for *real* fields waits on a gated provider.
- Missing weather does not block save — hard requirement now.

---

## Later (gated)

Replace stub with a real provider only after Finley → Morgan → Beau spend/API approval. Keep `source` as the provider id; keep the same field names so Lane’s UI bindings stay stable.

---

## Out of scope here

Auth session, base URL, Origin repo — Finley / Beau. This file only unblocks log UI + sync payload shape.
