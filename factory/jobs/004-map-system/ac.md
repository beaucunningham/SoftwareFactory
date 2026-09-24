# AC — Map system (job 004)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS notes: Lane optional

Copy of `AC_MAP_SYSTEM_v0.md`. No secrets.

## Must pass

1. Sign in → **Map** tab visible and selected; live map renders (not blank placeholder).
2. Job 003 hybrid default + style control + quiet chrome still pass.
3. Create spot via map pin drop → save → pin appears for current user without relaunch.
4. All user spots show as pins; tap → select + spot detail.
5. Empty state calm with map still usable + one Add action.
6. With ≥2 spots, both pins visible/findable (camera fit or documented center policy).
7. Archive/delete or equivalent removes/hides pin.
8. No new paid APIs/keys; auth + weather stub unchanged.

## Fail if

- Map tab missing, not default, or map surface blank after normal sign-in
- Pins don’t reflect spot CRUD
- Drop/create flaky (save without coords, orphan pins, requires restart)
- Regress Job 003 chrome or add paid/topo/onX scope
- Guide becomes home

## Simulator happy path

1. Sign in → land Map (hybrid).  
2. No spots → empty CTA.  
3. Add spot → long-press/drop → name → save → pin shows.  
4. Tap pin → detail.  
5. Add second spot → both pins; pan/zoom OK.  
6. Toggle style; pins still readable.
