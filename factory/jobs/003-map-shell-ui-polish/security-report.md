# Security report

Origin security pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/4, branch `cursor/map-shell-ui-polish-c442`, through the tester commits (example `4843d60`).

Product code was not changed by security.

## Result

Pass. No critical, high, or medium findings.

## Critical

None.

## High

None.

## Medium

None.

## Low

- Web preview `fieldTileUrl` sends the viewport and tile grid around pins to Esri and OSM. The requests are keyless. Native iOS uses Apple Maps and does not call `fieldTileUrl`.
- Stack screens `spot-detail`, `spot-new`, `hunt-detail`, and `hunt-new` still lack the tab-layout session redirect. This is unchanged from job 001. The vault is empty when signed out.

## Secrets and providers

No new Mapbox, Google, or weather keys. No paid map SDK. The weather stub is untouched. Auth and BaaS are untouched. `showsUserLocation` is false.
