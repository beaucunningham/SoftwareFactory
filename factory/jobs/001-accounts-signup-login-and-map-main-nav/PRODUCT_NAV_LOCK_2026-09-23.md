# Product nav lock — 2026-09-23 (Beau via Finley)

Supersedes Guide-first home from UI polish (305c307 era).

## Lock

**Map is the primary home surface.** Spots/pins are first-class navigation — the main map section is where the signed-in user lands and where they manage place context for hunts.

**AI Guide chat is a side feature.** It is not the main/home tab and must not be the default landing screen. Reach Guide from a secondary tab and/or from hunt flow entry points (e.g. hunt detail “Ask Guide”, post-log debrief). Guide still grounds on the user’s logs/spots/weather; demotion is navigation priority only, not feature kill.

**Core product unchanged:** multi-user iOS-first hunting companion (TX beta → nationwide). Core loop remains hunt logs + spots + weather → Guide assists. App name TBD.

## Recommended tab IA (TX beta)

Authenticated main tabs (order):

1. **Map** — default landing; pins for spots; create/select spot; jump to spot detail / attach from hunt
2. **Logs** — hunt list + create/edit
3. **Guide** — secondary chat (not home)
4. **You** — profile, niche/region, sign out, sync status

Unauthenticated: auth stack only (see ACCOUNTS_SIGNUP_LOGIN_v0).

## Out

- Do not restore Guide as default home without a new Beau/Finley unlock
- Do not remove Guide entirely in this job
- Social / public map / shared spots still out of TX beta
