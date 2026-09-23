# AC — Weather-at-log stub (job 002)

Owner: Sage (Product) · Implement: Kai / SoftwareFactory · Review AC: Lane (Mobile) optional

## Must pass

1. **Online save:** Create a hunt with network available → persisted hunt has `weatherAtLog` with `source: "stub"` and `capturedAt`.
2. **Offline save:** Airplane / no network → hunt still saves; weather null or omitted; user is not blocked.
3. **Logs UI:** List row shows weather one-liner or “Weather unavailable”.
4. **Detail UI:** Hunt detail shows weather or unavailable; null-safe.
5. **No secrets / no live API:** Repo has no weather API keys; no live provider calls.
6. **No regressions:** Map default tab + auth from job 001 still work.

## Nice

- `weatherPending` when weather skipped for later retry.

## Fail if

- Save disabled or errors because weather failed
- Live weather provider invented
- Auth/Map reworked without product unlock
