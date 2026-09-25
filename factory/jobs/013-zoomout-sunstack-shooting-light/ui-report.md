# UI report

Origin UI pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/16, branch `cursor/sun-stack-shooting-light-8f8a` (docs tip `ed6d17f`, product tip `0f54881`, base `244b0ba`). G1 is https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/15, branch `cursor/zoomout-root-cause-8f8a`, tip `a7df667`.

The UI worker filed a docs-only report on the G2+G3 branch: `docs/job-013-ui-report.md` at docs commit `ed6d17f`. Screenshots were not committed to the product repo. They are in the UI agent's artifacts (bc-89b3cda1). Product code was not changed by the UI worker.

## What I opened

Expo web at 390×844, plus resize checks at 375×667 and 430×932.

The first run was at product `1524533`. The re-run was at `0f54881`. The later commit `ed6d17f` is docs only (`docs/job-013-ui-report.md`) on top of code tip `0f54881`. Full tip `ed6d17f303fc4c7fc4379de1ecdfe09922475e10`.

## What worked

Re-run PASS at `0f54881` on the Expo web sweep at 390×844, 375×667, and 430×932. No High or Medium findings remain.

- Duck before shows red 0:59:30 'Until shooting light'. During (a live 10:57 AM CDT September morning) shows green with a same-evening 7:32 PM sunset. After shows red 'Until tomorrow's shooting light'.
- Deer and Squirrel end at 8:02 PM (30 min after sunset). Feral hogs show gray 'No hour limit on private land'. The note copy is exact.
- The countdown ticks at 1Hz and the chain stops on close. Tapping outside drops no pin.
- G1: zoom stops at zoom 3 on all 3 styles with Wind on and off. There are 55, 45, and 72 arrows at 390, 375, and 430 widths. The badge shows only while arrows are visible.
- G2: the stack sits under Forecast at 92.6×64, and a tap drops no pin, at 3 sizes.
- The 008–012 spot checks passed.
- Web can't show `cameraZoomRange`, the globe, or native polylines.

## Screenshots

Named in the UI agent artifacts (bc-89b3cda1). Not committed to this repo or the product repo.

## Issues

First run FAIL at `1524533`. G3 was High because on a September Texas morning, sunset was placed on the previous evening, so the popover showed 'after'. The builder fixed it with a +24h roll in `sunTimesUTC`. Re-run PASS at `0f54881`. 249 pass at the G1 tip and 256 pass at the G2+G3 tip, 0 fail under 3 time zones, with a clean typecheck.

## Gaps for Lane

Lane owns the iOS Simulator list after merge. These were not verifiable on web:

- `cameraZoomRange`, the 3D globe, and native one-path Polyline arrows inside MapView.
- Street zoom to the minimum and back, 10 cycles on Topo, Satellite, and Standard, Wind on and off, with 20+ pins and the sun stack. The stop should feel like MapKit's own rubber band, with no snap-back jolt.
- Stills at minimum zoom on each style, Wind on (arrow count sane, badge and legend) and Wind off.
- Sun stack under Forecast on SE and Pro Max, over bright Satellite and dark Standard, with Wind on (badge clear of the stack).
- Popover stills in Before, During, and After, plus Feral hogs and Deer or Squirrel in the sunset-to-sunset+30 window.
- Popover open about 10 seconds, then Duck → Deer → Squirrel → Feral hogs, dismiss by tap outside (no pin) and by pan.
- Background about 30 seconds and return with the popover open (clock resynced). VoiceOver on the popover. Reduce Motion on.
- Kill and relaunch restores the last game. Dynamic Island clearance on SE and Pro Max.

## Result

Pass. A person can finish the zoom-out stop, the sun stack under Forecast, and the shooting-light popover on Expo web. Lane still owns iOS Simulator sign-off.
