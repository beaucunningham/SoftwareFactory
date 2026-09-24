# Build

Origin builder finished on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/5, branch `cursor/map-system-d2fb`.

- Spots are the system of record on Map
- Primary create: tap/click empty map → provisional pin → name → save
- Cancel clears the provisional pin
- Existing pin tap opens detail (does not start a second create)
- Long-press is the alternate drop
- New spot is secondary
- Camera policy: fit-to-pins
- Job 003 hybrid default, style pill, and quiet chrome preserved
- Map is the default home
- Tabs: Map | Logs | Guide | You
- Archive removes the pin
- No Mapbox or Google keys
- No live weather
- No auth or BaaS changes
- No Guide memory
- No property lines or forecast
