# Brief — Job 009: Real glass bar + AI rename + remove suggested prompts + app tour + AI tutorial + stub reply and tap-to-pin fixes

Filled by Sage (Product) for Finley → Kai / SoftwareFactory. Workers do not invent product direction. App Desk = AC only; Cursor Cloud Agents code only.

**Job id:** `009-glass-ai-name-tutorials`  
**Product repo:** Origin https://cursor.com/codebase/beau-cunningham/hunting-companion (also known as `beau-cunningham/hunting-companion`). Workers use this Origin repo. Base: product `main` at `b52e4339db01c97e52886560d8f9b11d17168904` (Job 008 merged, Origin PR #10). Do not follow an older tmp product URL. Do not start from an older product tip.  
**Build on:** Job 008 at Origin main `b52e4339db01c97e52886560d8f9b11d17168904`. Do not regress Job 005–008 behavior.  
**Related:** `ac.md` (copy of `AC_GLASS_AI_NAME_TUTORIALS_v0.md`, with the locked name Scout substituted for `<AI_NAME>`) · Job 003/006/007/008 quiet field-tool chrome (north star) · brand burnt orange `#BF5700` for accents only · pin style A (locked in 007) · `note.md` (UI-check screenshots stay out of the product repo)  
**Pipeline:** builder → tester → security → ui → accept  
**Delivery:** Small focused Origin product pull request(s). The builder writes `factory/jobs/009-glass-ai-name-tutorials/build.md` in this repo and documents token usage, the glass path (Liquid Glass vs BlurView), any residual tint alpha, the C7 root cause, and the name Scout in those build notes. Lane runs the iOS Simulator sweep and captures the shots listed in Constraints for the ui worker.

Beau approved this as scoped at 1:26pm CT on 2026-09-24 and said build. The draft "do not open until" lines are satisfied. This brief is approved and final for Kai. **The AI's user-facing name is locked: Scout** (see C2). It is not an open choice. Drake and Ridge are not built.

Chrome north star: Job 003/006/007/008 quiet field tool: dark by default, calm neutrals, burnt orange `#BF5700` for accents only, pin style A (locked in 007).

## What to build

1. **Real glass bar (C1).** Replace the 008 opaque scrim with true see-through glass: Apple Liquid Glass via `expo-glass-effect` on iOS 26+, BlurView ultra-thin dark with no full-bar scrim as the fallback. Legibility from labels (full-opacity white + soft dark halo) and a small solid capsule behind the active tab. Same treatment for the round Map Tools button.
2. **AI rename (C2).** Stop calling the AI "Guide." The user-facing name is **Scout** (locked). Tab label, chat header, composer, empty state, tutorials, You menu, and any "Guide" user-facing strings. Tab icon unchanged. Internal code names may stay Guide.
3. **Remove suggested prompts (C3).** Drop the "Try one of these" section from the AI chat. Empty state is one short line plus the composer. C5 takes over "show me what to ask."
4. **First-launch app tour (C4).** Five short full-screen cards (or coach-mark overlay) once after first sign-in, on the Map. Skip / Next / Done, page dots, Replay from You menu. Local "shown" flag per install.
5. **First-time Scout chat tutorial (C5).** Once the first time the Scout tab opens: labeled Example walkthrough with sample Q and A (sample data only, never saved). Skippable. Replay from You menu and a help button in the chat header.
6. **Stub reply fragment bug (C6).** Fix the stray "birds." fragment at the start of AI stub replies.
7. **Tap-to-pin reliability (C7).** Single taps on empty map reliably open the new-pin draft popup again.

**Bar order stays: Map | Pins | Forecast | Scout.** Map stays the default home. The top-right three-line You menu is unchanged (gains Replay tour entries).

Everything else from Jobs 005–008 stays the same (ruler measure, calm motion, Pins tab, Map Tools floating button, style A pins, #1 pin per day, Map Forecast button, dark by default, logs in pins, Unpinned hunts in the You menu). Weather stays a STUB. The AI chat stays an on-device stub (no real model).

**This job is on-device only. No gates.** No live network data, keys, accounts, or spend. The only new dependency allowed is the free `expo-glass-effect` (Expo SDK 57).

### C1. Real glass bar

- Floating bar and round Map Tools button use **`expo-glass-effect` `GlassView`** when `isLiquidGlassAvailable()` and `isGlassEffectAPIAvailable()` are true (iOS 26+).
- On older iOS: `expo-blur` BlurView ultra-thin dark material with **no full-bar scrim**. If any residual tint remains, alpha is **at most ~0.15**. Not the 008 `rgba(22,20,17,0.53)` scrim.
- Bar is **visibly see-through** vs an 008 screenshot over the same map (bright Satellite and dark Standard).
- Labels and icons: **full-opacity white** (inactive) with a soft dark shadow/halo (for example black ~50–60%, radius 2–3). Active tab uses orange on a **small solid capsule** (dark or orange-tinted) so active contrast is guaranteed.
- Contrast: label/icon vs its immediate backing (halo or capsule) passes **4.5:1** over the brightest test area (bright Satellite sand/concrete; light parts of dark Standard) and stays readable over the darkest area.
- Hairline edge kept so the bar outline is visible over dark map.
- **Reduce Transparency on:** solid dark fallback (unchanged from 007/008).
- Shape, inset, position, 44pt targets, content padding, and Map Tools button placement unchanged from 008.
- Builder notes which path ran (Liquid Glass vs BlurView) and any residual tint alpha in build notes.

### C2. AI rename to Scout

**The name is locked: Scout.** Beau locked it when he approved this job at 1:26pm CT on 2026-09-24. It is not an open choice. Do not ship Drake or Ridge. Do not leave `<AI_NAME>` or "Guide" in any user-facing string.

- Renamed everywhere user-facing: tab label, chat header, composer placeholder, empty state, C4/C5 tour copy, You menu entries that said Guide, and any other "Guide" string the user can see.
- Tab icon unchanged.
- Internal code / file / symbol names may stay Guide.
- Bar order reads **Map | Pins | Forecast | Scout**.
- Note in build notes: no trademark clearance; app name still TBD. The chosen name is Scout.

### C3. Remove "Try one of these"

- The suggested-prompts / "Try one of these" block is gone from the AI chat screen.
- Empty state is **one short line** plus the composer (no prompt chips).
- C5 is the only "show me what to ask" path for first-time users.

### C4. First-launch app tour

- Shows **once**, the first time the app opens **after first sign-in** (never before sign-in), starting on the Map.
- Five short full-screen cards **or** a coach-mark overlay, dark chrome, orange accent only:
  1. Map and dropping pins by tapping
  2. Pins list and logs inside pins
  3. Forecast
  4. Scout (answers from your logs, pins, and weather; limits: stub for now / beta)
  5. The You menu top right (mentions you can replay the tour here)
- Every card has **Skip**, **Next** (last card **Done**), and page dots.
- "Shown" flag stored locally per install (AsyncStorage). Does not reappear after dismiss unless Replay.
- **Replay** from You menu: "App tour".
- Respects Reduce Motion (008 rules: short fade or instant; no bounce).
- VoiceOver readable (labels, roles, focus order).

### C5. First-time Scout chat tutorial

- Shows once the first time the Scout tab opens. If C4 is on screen, C5 waits until C4 is dismissed; otherwise independent.
- Clearly labeled **Example** walkthrough of 2–3 steps: sample question (for example "Where should I hunt Saturday?") and sample answer that references a sample pin, a hunt log, and the forecast.
- Uses **SAMPLE data only**, clearly marked; never the user's real data; never saved to chat history.
- Final step **Try it** focuses the composer.
- Skippable. Flag stored locally per install.
- Replay from You menu ("Scout tour") and from a small help button in the chat header.
- After reinstall the flags reset; after sign-out alone they stay. Replay always works.

### C6. Stub reply fragment bug

- Root fix in the reply template / assembly (not a band-aid in the UI).
- **20 varied prompts** in the Simulator: **none** start with a fragment or stray word (including no leading "birds.").
- Every reply begins with a **full sentence**.

### C7. Tap-to-pin reliability

- **20 single taps** on empty map areas (Satellite and Standard, various zooms, right after pan/zoom ends, after closing a sheet, after measure Done): **every one** opens the new-pin draft popup/sheet.
- Exceptions only: tap on a pin or control, measure mode, or during an active pan.
- Press-and-hold still does nothing.
- Root cause noted in build notes (likely a Job 008 gesture conflict with the Map Tools fade layer, animation overlay, or tap-vs-pan detection). The builder records the real cause.

## Research

- Job 008 landed clearer glass attempt, ruler measure, calm motion, Pins tab, Map Tools floating button at Origin main `b52e4339db01c97e52886560d8f9b11d17168904` (Origin PR #10). The 008 bar used `systemUltraThinMaterialDark` plus a full `rgba(22,20,17,0.53)` scrim to hit 4.5:1. That scrim kills the glass. C1 fixes it.
- **`expo-glass-effect` verified (Expo SDK 57):** package exists; `GlassView` renders native Liquid Glass on **iOS 26+** and falls back to a regular `View` on unsupported platforms. Availability checks: `isLiquidGlassAvailable()` (compile-time / Info.plist) and `isGlassEffectAPIAvailable()` (runtime; needed because some iOS 26 betas lack the API). Docs: https://docs.expo.dev/versions/v57.0.0/sdk/glass-effect/ and https://docs.expo.dev/versions/latest/sdk/glass-effect. Install: `npx expo install expo-glass-effect`. Free, no key. This is the only new dependency allowed.
- Fallback path (pre-iOS 26): `expo-blur` BlurView with ultra-thin dark material and **no full-bar scrim** (if any residual tint remains, cap at about **0.15 alpha**). Same Reduce Transparency solid-dark fallback as 007/008.
- Note only: expo-router native tabs could replace the custom floating bar later. Keep the custom layout unless native is clearly better on review. Do not switch in this job.
- **The AI display name is locked: Scout.** Beau approved that name with this job at 1:26pm CT on 2026-09-24. The draft alternates Drake and Ridge are not a choice. No trademark / name clearance done; app name still TBD. Record Scout in build notes.
- Tours: flags are **per install** (AsyncStorage). They do not reset on sign-out alone; a reinstall clears them. Replay is always available from the You menu regardless.
- C5 waits if C4 is showing; otherwise independent. Sample tutorial data is never the user's real data and never written to chat history.
- C7 root cause (likely): gesture conflicts from 008 (Map Tools button fade layer, animation overlay, or tap-vs-pan detection). Builder notes the real cause in build notes.
- No stored schema changes beyond local tour flags. No live weather, no AI model, no keys.
- Beau approved this as scoped and said build at 1:26pm CT on 2026-09-24. The draft status is closed. This brief is approved.
- Job 010 (topo-wind-7day) is queued after this job. Do not create it. Do not build topo, wind, or a 7-day forecast layout here.
- Do not edit Job 007 or Job 008 files. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. The Job 009 amendment is this brief:

  > Amendment 2026-09-24 (Job 009, Beau go at 1:26pm CT). User-facing AI name is **Scout** (locked). Tabs read **Map | Pins | Forecast | Scout** (Map default). The bar and Map Tools button become real glass (`expo-glass-effect` on iOS 26+ when both availability checks pass; older iOS is ultra-thin dark blur with no full-bar scrim). Suggested prompts are removed. A five-card app tour and a first-time Scout tutorial are added. Stub replies start with a full sentence. Empty-map taps open the new-pin popup again. Locked: Beau approved Job 009 as scoped.

- Live weather is not researched for implementation. It stays a stub. No provider keys belong in this public tree.

## Acceptance criteria

Full checklist, fail conditions, and the Simulator sweep are in `ac.md`. Summary the tester must prove:

### C1. Real glass bar

- [ ] Floating bar and round Map Tools button use **`expo-glass-effect` `GlassView`** when `isLiquidGlassAvailable()` and `isGlassEffectAPIAvailable()` are true (iOS 26+)
- [ ] On older iOS: BlurView ultra-thin dark material with **no full-bar scrim**. If any residual tint remains, alpha is **at most ~0.15**. Not the 008 0.53 scrim
- [ ] Bar is **visibly see-through** vs an 008 screenshot over the same map (bright Satellite and dark Standard)
- [ ] Labels and icons: **full-opacity white** (inactive) with a soft dark shadow/halo (for example black ~50–60%, radius 2–3). Active tab uses orange on a **small solid capsule** (dark or orange-tinted) so active contrast is guaranteed
- [ ] Contrast: label/icon vs its immediate backing (halo or capsule) passes **4.5:1** over the brightest test area (bright Satellite sand/concrete; light parts of dark Standard) and stays readable over the darkest area
- [ ] Hairline edge kept so the bar outline is visible over dark map
- [ ] **Reduce Transparency on:** solid dark fallback (unchanged)
- [ ] Shape, inset, position, 44pt targets, content padding, and Map Tools button placement unchanged from 008
- [ ] Builder notes which path ran (Liquid Glass vs BlurView) and any residual tint alpha in build notes

### C2. AI rename to Scout

- [ ] Display name is **Scout**. Locked. Drake and Ridge are not shipped
- [ ] Renamed everywhere user-facing: tab label, chat header, composer placeholder, empty state, C4/C5 tour copy, You menu entries that said Guide, and any other "Guide" string the user can see
- [ ] Tab icon unchanged
- [ ] Internal code / file / symbol names may stay Guide
- [ ] Bar order reads **Map | Pins | Forecast | Scout**
- [ ] Note in build notes: no trademark clearance; app name still TBD; the name is Scout

### C3. Remove "Try one of these"

- [ ] The suggested-prompts / "Try one of these" block is gone from the AI chat screen
- [ ] Empty state is **one short line** plus the composer (no prompt chips)
- [ ] C5 is the only "show me what to ask" path for first-time users

### C4. First-launch app tour

- [ ] Shows **once**, the first time the app opens **after first sign-in** (never before sign-in), starting on the Map
- [ ] Five short full-screen cards **or** a coach-mark overlay, dark chrome, orange accent only: (1) Map and dropping pins by tapping (2) Pins list and logs inside pins (3) Forecast (4) Scout, answers from your logs, pins, and weather; limits: stub for now / beta (5) The You menu top right, including that you can replay the tour here
- [ ] Every card has **Skip**, **Next** (last card **Done**), and page dots
- [ ] "Shown" flag stored locally per install (AsyncStorage). Does not reappear after dismiss unless Replay
- [ ] **Replay** from You menu: "App tour"
- [ ] Respects Reduce Motion (008 rules: short fade or instant; no bounce)
- [ ] VoiceOver readable (labels, roles, focus order)

### C5. First-time Scout chat tutorial

- [ ] Shows once the first time the Scout tab opens. If C4 is on screen, C5 waits until C4 is dismissed; otherwise independent
- [ ] Clearly labeled **Example** walkthrough of 2–3 steps: sample question (for example "Where should I hunt Saturday?") and sample answer that references a sample pin, a hunt log, and the forecast
- [ ] Uses **SAMPLE data only**, clearly marked; never the user's real data; never saved to chat history
- [ ] Final step **Try it** focuses the composer
- [ ] Skippable. Flag stored locally per install
- [ ] Replay from You menu ("Scout tour") and from a small help button in the chat header
- [ ] After reinstall the flags reset; after sign-out alone they stay. Replay always works

### C6. Stub reply fragment bug

- [ ] Root fix in the reply template / assembly (not a band-aid in the UI)
- [ ] **20 varied prompts** in the Simulator: **none** start with a fragment or stray word (including no leading "birds.")
- [ ] Every reply begins with a **full sentence**

### C7. Tap-to-pin reliability

- [ ] **20 single taps** on empty map areas (Satellite and Standard, various zooms, right after pan/zoom ends, after closing a sheet, after measure Done): **every one** opens the new-pin draft popup/sheet
- [ ] Exceptions only: tap on a pin or control, measure mode, or during an active pan
- [ ] Press-and-hold still does nothing
- [ ] Root cause noted in build notes

### Hygiene

- [ ] Only C1–C7 are new; no other features
- [ ] No live weather, parcels, paid map layers, new keys, accounts, or spend
- [ ] No AI model swap; chat stays on-device stub
- [ ] No pin / log data lost; tour flags are local only
- [ ] iOS-first; Cloud Agents only; small focused PR(s)
- [ ] The only new dependency is free `expo-glass-effect` (Expo SDK 57)
- [ ] All Job 005–008 behavior unchanged otherwise
- [ ] Job 010 is not created and not built

## User-facing UI

The bar finally looks like glass again. The AI is named Scout and has a gentle first-run path that shows what to ask without cluttering the chat. Taps drop pins again, and stub replies read like sentences.

- Tabs: Map | Pins | Forecast | Scout. Map is the default home after sign-in and on relaunch. The bar and the round Map Tools button are real glass on iOS 26+ when both availability checks pass, and ultra-thin dark blur with no full-bar scrim on older iOS. Inactive labels are full-opacity white with a soft dark halo. The active tab sits on a small solid capsule. Hairline edge stays. Reduce Transparency makes the bar and button solid dark. Shape, inset, targets, and Map Tools placement stay as in 008.
- Scout chat: no "Try one of these" and no prompt chips. Empty state is one short line plus the composer. Header, composer, and empty state say Scout. The tab icon is unchanged.
- App tour: five short dark cards after first sign-in, on the Map, with Skip, Next, Done, and page dots. Replay is You menu → "App tour". It does not show before sign-in or on every launch.
- Scout tour: a labeled Example of 2–3 steps with SAMPLE data only, never saved. Try it focuses the composer. Replay is You menu → "Scout tour" and a small help button in the chat header. If the app tour is up, this tour waits.
- Stub replies start with a full sentence. There is no leading "birds."
- A single tap on empty map opens the new-pin popup. Press-and-hold does nothing. Measure mode does not drop pins.

## Payments and auth

- Payments: none. Do not invent spend. Weather stays the on-device stub. The AI chat stays an on-device stub. No live network data, keys, accounts, or spend. No parcels or paid map layers.
- Auth: unchanged behavior (Apple primary, email secondary, no guest). No auth/BaaS provider swap. The app tour never shows before sign-in. Tour flags live in AsyncStorage per install and do not reset on sign-out alone.
- Maps: existing map stack only. No new API keys, paid map SDKs, or new tile sources. The only new dependency is free `expo-glass-effect` (Expo SDK 57). The older-iOS fallback uses bundled `expo-blur`.
- Location: unchanged from Job 008. No new location storage.

## Later (not in this job)

Not shown in the app as placeholders. Each needs its own job.

- Live weather everywhere and live wind (needs Beau go; Finley → Morgan → Beau for any key/account/spend)
- Trademark / name clearance for Scout and the app name
- Switching the custom floating bar to expo-router native tabs (only if clearly better)
- Tutorial analytics
- Appearance choice (Dark / Match iPhone) in the You menu (from 007)
- Everything on the 008 Later list
- Job 010 (topo-wind-7day) is queued after this job. Do not create it here.

## Out of scope

- Topo, wind layer, 7-day forecast layout (Job 010). Do not create job 010.
- Changing pin creation beyond the C7 reliability fix, type picker, pin types, colors, or style A
- Changing Forecast ranking or content
- Changing You menu contents beyond adding the two Replay tour entries ("App tour" and "Scout tour")
- App rename / App Store
- Any live network data source
- Shipping Drake, Ridge, or leaving "Guide" or `<AI_NAME>` user-facing
- Changing the tab icon
- A second new dependency besides `expo-glass-effect`

## Constraints

- Opened after Beau's go at 1:26pm CT on 2026-09-24. This brief is approved and final. The user-facing AI name is locked: Scout.
- Base: Origin main `b52e4339db01c97e52886560d8f9b11d17168904` (Job 008 merged, Origin PR #10).
- Do not touch product code from this SoftwareFactory ticket. Workers build on the product repo.
- Lane Simulator shots: bar over bright Satellite and dark Standard beside an 008 shot (and Reduce Transparency on); Map Tools button glass; empty AI chat without suggested prompts; C4 card 1 and card 5; C5 Example step with sample badge; stub reply that starts with a full sentence; tap-to-pin popup after a single tap; Reduce Motion on during a tour. Lane also runs the sweep in `ac.md`.
- UI-check screenshots must not be committed to the product repo. Only the UI report markdown goes in the product repo. Screenshots go in agent artifacts or in this job folder. See `note.md`. The same rule is already in `.cursor/agents/ui.md` from Job 008.
- Document token usage, glass path (Liquid Glass vs BlurView), any residual tint alpha, C7 root cause, and the name Scout in `factory/jobs/009-glass-ai-name-tutorials/build.md`.
- iOS-first. Cloud Agents only for code. Small focused PR(s).
- Hard hygiene: no live weather, no parcels, no paid layers, no new keys, no accounts, no spend, no AI model swap, no lost logs or pins. Tour flags are local only.
- This public job tree stays free of secrets.
- Do not edit Job 007 files. Do not edit Job 008 files. Do not edit `PRODUCT_NAV_LOCK_2026-09-23.md` in job 001. Do not create Job 010.

## Design intent (one line)

The bar finally looks like glass again. Scout has a hunter's name and a gentle first-run path that shows what to ask without cluttering the chat. Taps drop pins again, and stub replies read like sentences.
