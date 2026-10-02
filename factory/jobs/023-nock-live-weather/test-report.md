# Test report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Builders: `bc-d9b374b6` (main job) and `bc-c8415162-1cd5-5b37-8707-41e368ae8458` (023b).

In-session `npm test` counts (TZ unset, `TZ=UTC`, and `TZ=Pacific/Auckland`) and `tsc --noEmit` results were not copied into this repository. Pass and fail counts: unknown.

023b adds the envLiteral test. `weatherProxyUrl`, the weather stub, and the history gate are literal reads so a release build inlines `EXPO_PUBLIC_*`.

## Merged tips

- #100 final live-weather merge → `cde4ee972e706fd54b9d4165068335f86f2cfa6f` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/100
- #109 023b → `68d69d83208ebc3a2637097901b02ea06357a85a` — https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/109. Merged 2026-10-02 at about 2:22am CT.

Earlier pull requests in the series are unknown.

## Result

The Simulator gate passed on `68d69d8`. In-session unit-test and `tsc` counts are unknown.
