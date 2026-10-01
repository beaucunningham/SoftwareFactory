# Security report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Final main `bab84f57c7cf8061cec6a69b24a2a52e1d0d06bd` (Origin #89).

Ari (data/security reviewer) PASSED D on data/privacy.

Only trimmed query text goes to Apple's geocoder on iOS and Google's on Android. No storage, logging, keys, hosts, or packages. Search uses the existing expo-location geocoder. No new package or key.

Round 1 required a reverse-call cap, a stale stop, and a cache. All three are fixed: at most 2 reverse geocodes per search, a stale stop, and an in-memory cache. Ari re-checked and passed.

No privacy doc exists in the repo. Recommend adding one later.

## Critical

None.

## High

None.

## Medium

None.

## Low

- No privacy doc exists in the repo. Recommend adding one later.

## Result

PASS. Ari passed D on data/privacy. Only trimmed query text goes to Apple's geocoder on iOS and Google's on Android. No storage, logging, keys, hosts, or packages. The round-1 reverse-call cap, stale stop, and cache are in place.
