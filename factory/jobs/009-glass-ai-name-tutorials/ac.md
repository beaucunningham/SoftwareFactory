# AC — Real glass bar + AI rename + tours + stub/tap fixes (job 009)

Owner: Sage · Implement: Kai / SoftwareFactory · iOS Sim: Lane

Copy of `AC_GLASS_AI_NAME_TUTORIALS_v0.md`. No secrets. Beau approved as scoped at 1:26pm CT on 2026-09-24 and said build. The draft "do not open until" lines are satisfied. **Final for Kai.** **The AI's user-facing name is locked: Scout.** It replaces "Guide" everywhere the user can see it. Drake and Ridge are not a choice. Internal code names may stay Guide. The tab icon is unchanged.

**Job id:** `009-glass-ai-name-tutorials`  
**Builds on:** Job 008 at Origin main `b52e4339db01c97e52886560d8f9b11d17168904` (Job 008 merged, Origin PR #10)  
**Product repo:** https://cursor.com/codebase/beau-cunningham/hunting-companion

Brief: `brief.md` in this folder.  
Lane captures shots: bar over bright Satellite and dark Standard beside an 008 shot; Reduce Transparency on; Map Tools glass button; AI empty state without prompts; C4 cards 1 and 5; C5 Example with SAMPLE badge; a stub reply starting with a full sentence; tap-to-pin popup after a single tap; Reduce Motion during a tour. Those screenshots stay out of the product repo (see `note.md`).

## Must pass

1. **Glass bar + Map Tools button** are visibly see-through vs an 008 shot over the same map. iOS 26+ uses `expo-glass-effect` `GlassView` when `isLiquidGlassAvailable()` and `isGlassEffectAPIAvailable()` allow it; older iOS uses BlurView ultra-thin dark with **no full-bar scrim** (residual tint ≤ ~0.15 alpha if any). Labels: full-opacity white with soft dark halo; active tab on a small solid capsule. Label/icon vs immediate backing passes **4.5:1** over bright Satellite sand/concrete and light Standard areas, readable on darkest too. Reduce Transparency → solid dark. Shape, inset, targets, and Map Tools placement unchanged from 008.
2. Bar order is **Map | Pins | Forecast | Scout**. Map is default home. Top-right You menu unchanged except new Replay tour entries.
3. All user-facing "Guide" strings become **Scout** (tab, header, composer, empty state, tours, You menu). Tab icon unchanged. Internal names may stay Guide.
4. **"Try one of these"** / suggested prompts are gone. Empty Scout chat is one short line plus the composer.
5. **App tour (C4):** once after first sign-in, on Map, 5 short dark cards (Map/pins, Pins+logs, Forecast, Scout limits, You menu + replay). Skip / Next / Done, page dots. AsyncStorage per-install flag. Replay from You → "App tour". Reduce Motion and VoiceOver respected.
6. **Scout tutorial (C5):** once on first Scout tab open (waits if C4 showing). Labeled Example, 2–3 steps, sample Q/A with SAMPLE data only (never saved). Final "Try it" focuses composer. Skippable. Replay from You ("Scout tour") and chat-header help. Flags per install; Replay always works.
7. **Stub replies:** 20 varied prompts; none start with a fragment/stray word; each begins with a full sentence. Fix is in the reply template/assembly.
8. **Tap-to-pin:** 20 single taps on empty map (Satellite + Standard, varied zoom, after pan/zoom, after sheet close, after measure Done) all open the new-pin popup unless on a pin/control, in measure mode, or during active pan. Press-and-hold still does nothing. Root cause in build notes.
9. Jobs 005–008 behavior unchanged otherwise. Weather stub. AI on-device stub. No live network data, keys, accounts, or spend. No data lost. The only new dependency is free `expo-glass-effect` (Expo SDK 57). Job 010 is not created.

## Fail if

- Bar still looks as opaque as 008 (full ~0.53 scrim still present), or labels fail 4.5:1 over bright Satellite
- Liquid Glass path used without the availability checks on a device that can crash
- "Guide" still visible anywhere user-facing, the name is not Scout, or the tab icon changed
- Suggested prompts still on the AI empty state
- App tour shows before sign-in, every launch, or with no Skip/Replay
- Scout tutorial uses real user pins/logs, saves sample turns to history, or blocks the composer forever
- Any stub reply starts with "birds." or another fragment
- Single taps on empty map often fail to open the pin popup
- Any live weather, paid layer, new key, account, spend, or scope creep (topo/wind/7-day belong in 010; do not create 010)
- Drake, Ridge, or an unset `<AI_NAME>` is shipped

## Simulator sweep

1. Sign in; lands on Map. Compare bar to an 008 shot over the same bright Satellite area: clearly more glass, labels readable. Standard: readable. Reduce Transparency: solid. Map Tools button matches.
2. Bar reads **Map | Pins | Forecast | Scout**. Open Scout tab: no "Try one of these"; empty state is one line + composer. Header and composer use Scout.
3. Fresh install path: after sign-in, C4 tour appears on Map. Walk all 5 cards; Skip works; Done sets the flag. Relaunch: no tour. You menu → App tour replays.
4. Open Scout tab first time: C5 Example walkthrough with SAMPLE badge; sample answer never lands in history; Try it focuses composer. Help button and You → Scout tour replay.
5. Send 20 varied stub prompts: every reply starts with a full sentence; no leading "birds." or fragment.
6. Tap-to-pin: 20 single taps on empty Satellite and Standard (after pan, after zoom, after closing Map Tools, after measure Done). Every one opens the popup. Press-and-hold: nothing. Measure mode: taps don't drop pins.
7. Spot-check 005–008: Pins list, ruler measure, calm motion / Reduce Motion, style A pins, Forecast + Map Forecast button, You menu, Unpinned hunts, dark by default.

Lane captures shots: bar over bright Satellite and dark Standard beside an 008 shot; Reduce Transparency on; Map Tools glass button; AI empty state without prompts; C4 cards 1 and 5; C5 Example with SAMPLE badge; a stub reply starting with a full sentence; tap-to-pin popup after a single tap; Reduce Motion during a tour.
