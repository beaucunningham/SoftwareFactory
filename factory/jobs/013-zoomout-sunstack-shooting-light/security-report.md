# Security report

Origin security pass (bc-c7244025) on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/16, branch `cursor/sun-stack-shooting-light-8f8a`, and G1 https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/15, branch `cursor/zoomout-root-cause-8f8a`. Re-check at G2+G3 tip `0f548818350a5a4e0b41bf5accdb0c7925cb0b67` (G1 merged in) and G1 tip `a7df6678e6f0cf760a59d63b7a19b6ddb58d42d5`, base `244b0ba`.

No security commit. Product code was not changed by security. The first pass had one Low: the popover `arm()` timer leaked on repeated 'active' events. It's fixed by `createSecondChain`, which clears the pending timeout and stops when paused. Re-check passed with no findings.

## Result

Pass. No critical, high, medium, or low findings.

No new dependencies (the lockfile is unchanged). No new network calls; USGS is still the only map source. The game pick is the local AsyncStorage key `shootingLight.game.v1`, which stores the id only and falls back to Duck. No location is logged or sent, and location permission stays when-in-use. No Invalid Date or NaN, and no MapKit path gets a 0 min. `createSecondChain` clears the pending timeout and stops when paused.

## Critical

None.

## High

None.

## Medium

None.

## Low

None.

## Secrets and providers

No live weather or wind. No new env vars, secrets, dependencies, or install scripts. The lockfile is unchanged. USGS tiles stay the only network map source. The game pick is the local AsyncStorage key `shootingLight.game.v1`, which stores the id only and falls back to Duck. No location is logged or sent. Location stays when-in-use. `sunTimesUTC` adds 24h when sunset is at or before sunrise, so there is no Invalid Date or NaN. Standard and Satellite use a 10 m min and Topo keeps 3,200 m, both under a 7,000 km max; no MapKit path gets a 0 min. `createSecondChain` clears the pending timeout and stops when paused. Payments, auth, and card handling are unchanged: no spend, no new accounts, no stored card data.
