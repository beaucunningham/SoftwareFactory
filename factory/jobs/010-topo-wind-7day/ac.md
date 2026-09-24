# AC — Topo map style + stub wind layer + 7-day forecast (job 010)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_TOPO_WIND_7DAY_v0.md`. No secrets. Beau approved as scoped via Finley at 1:26pm CT on 2026-09-24. The draft "do not open until" lines are satisfied. **Final for Kai.** **The AI's user-facing name stays Scout** (locked in Job 009). It replaces `<AI_NAME>` everywhere the user can see it. **USGS The National Map `USGSTopo` tiles are approved** (answered yes). Attribution is required. Weather and wind stay placeholder / stub only. No live weather or wind API.

**Job id:** `010-topo-wind-7day`  
**Builds on:** Job 009 at Origin main `f43723f4d4351866f79ee8bd91984c79ab6b647c` (Job 009 merged, Origin PR #11)  
**Product repo:** https://cursor.com/codebase/beau-cunningham/hunting-companion

Brief: `brief.md` in this folder.  
If D2 (wind) is too large, split it to `011-wind-layer` and ship D1+D3 under this job; note the split in build notes.  
Lane captures shots: Topo with attribution and a pin; ruler on Topo; Wind ON over Standard, Satellite, and Topo (Sample wind + legend); Wind + Reduce Motion (static); Forecast with 7-day above 3-day and Sample forecast note; Map Forecast button opening Forecast. Those screenshots stay out of the product repo (see `note.md`).

## Must pass

1. **Topo** appears in Map Tools → Map style as **Standard | Satellite | Topo**. Uses USGS `USGSTopo` tiles: `https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}` via `UrlTile` / MKTileOverlay. No key. USGS attribution visible and clear of the bar, the Map Tools button, and the Apple legal label. Pins, pin popup, ruler, and wind draw above topo. Dark chrome; readable. Graceful past ~zoom 16 and outside US coverage. No crash. No other tile provider.
2. **Wind** toggle in Map Tools works over Standard, Satellite, and Topo. Calm `@shopify/react-native-skia` particle or streamline overlay with mph legend and **"Sample wind"** badge. Stub data only behind a `WindSource` interface (deterministic, plausible TX winds). Coarse ~8×8 grid; re-samples after map moves; pauses when backgrounded or OFF. Never steals taps. Smooth on Simulator. **Reduce Motion** → static arrows. No live weather or wind API calls.
3. **Forecast:** compact **7-day** list on top (day, icon, high/low, wind speed and direction, precip chance; no spot suggestions). Existing **3-day** section unchanged below; its days are the first 3 of the 7. Stub extended to 7 days. **"Sample forecast"** note stays. Map Forecast button still opens this screen.
4. Bar order, glass, Scout, tours, Pins, measure, and tap-to-pin from 009 unchanged. No live weather/wind, no new keys, accounts, or spend (topo tiles are the only new network map source). The only new dependency allowed is free `@shopify/react-native-skia` (Expo SDK 57).

## Fail if

- Topo uses OpenTopoMap, a paid provider, or any source that needs a key/account/spend
- No USGS attribution when Topo is selected, or attribution collides with the bar, Map Tools button, or Apple legal label
- Pins, ruler, popup, or controls render under topo tiles or become untappable
- Wind calls a live API, lacks the Sample wind badge, looks garish, drops taps, or ignores Reduce Motion
- Wind has no `WindSource` seam (hard-wired stub that can't swap later)
- 7-day replaces or breaks the 3-day / #1 pin ranking, or days don't align
- Sample forecast / Sample wind badges are missing
- Any live weather wiring, paid layer, new key, or scope creep
- Job 005–009 behavior changes

## Simulator sweep

1. Map Tools → Map style → Topo. Contours readable; USGS attribution visible and clear of bar / Map Tools button / Apple legal. Drop a pin, open popup, run measure: all above topo. Zoom past ~16 and pan outside the US: no crash.
2. Switch Standard / Satellite / Topo with Wind OFF: styles switch cleanly.
3. Wind ON over each style: particles move with direction/speed; legend + Sample wind badge visible; map taps, pin taps, and Map Tools still work. Background the app: animation pauses. Wind OFF: overlay gone.
4. Reduce Motion on, Wind ON: static arrows (or equivalent), no motion. Reduce Motion off: motion returns.
5. Forecast tab: 7-day on top, 3-day below with #1 pins; days 1–3 match; Sample forecast note present. Map Forecast button opens the same screen.
6. Spot-check 009: glass bar see-through, Scout tab, no suggested prompts, tours replay from You, tap-to-pin still reliable, stub AI replies start with full sentences.

Lane captures shots: Topo with attribution and a pin; ruler on Topo; Wind ON over Standard, Satellite, and Topo (Sample wind + legend); Wind + Reduce Motion (static); Forecast with 7-day above 3-day and Sample forecast note; Map Forecast button opening Forecast.
