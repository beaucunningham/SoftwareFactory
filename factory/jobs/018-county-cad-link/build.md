# Build

Origin builder shipped one draft Origin PR stacked on Job 017 I6. Product notes and the Simulator steps for Lane are in Origin `docs/job-018-build.md`. The builder had no Simulator.

- Origin PR #33: https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/33 (draft), branch `cursor/county-cad-link-8418`, tip `0ae26c69b2d4`. Stacked on Job 017 I6 (`cursor/gps-forecast-point-6493`). I6 has since moved to `7071230` after a security fix, and that fix is being merged into #33.
- Tests: 313 pass, 0 fail across the default zone, TZ=UTC, and TZ=Pacific/Auckland, including 7 new tests in `src/ac018.test.ts`. `tsc` is clean. `expo-doctor` 21/21.
- Boundaries: Census `cb_2025_us_county_500k`, public domain, simplified with Douglas-Peucker at 0.002 degrees. `src/county/boundaries.generated.ts` is 382,950 bytes (125,900 gzipped). Generator: `scripts/build-texas-counties.py`. `countyAt` returns null outside Texas.
- CAD table: Comptroller directory as of 2026-10-01. 253 counties have https sites. Motley falls back to its Comptroller county page. The table is committed and the app does not fetch it.
- Bundle added: 432,152 bytes (133,522 gzipped). No new dependencies, no native code, no identify or query calls, no owner data.
