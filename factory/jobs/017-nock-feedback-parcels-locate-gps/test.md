# Test report

Origin tester (bc-86a4f024) on the hunting-companion stack built from Job 016 main `5bddc51` (`5bddc511dcaf6514115b13b997566d182df78d85`).

PASS for I1–I6 plus #32.

## Origin stack

| PR | Milestone | Tip |
| --- | --- | --- |
| #27 | I1+I2 | `909619e` |
| #28 | I3 | `0a9db08` |
| #29 | I4 | `f3b1597` |
| #30 | I5 | `4017b1b` |
| #31 | I6, final tip | `2478868f4932` |
| #32 | I7 stop record | `0bdca32de8b2` |

## Commands

Final suite at I6 (`2478868f4932`):

- `npm test` — 310 pass, 0 fail, under the default zone, `TZ=UTC`, and `TZ=Pacific/Auckland`
- `tsc` — clean

## I6 failures found and fixed

Two I6 tester failures were found and fixed. Both regression tests are tester-authored and pass unchanged.

1. The 5 km hysteresis ignored a nearby fix after a miss, so the forecast fell back to map center. Fixed in `3eedbc6`.
2. A NaN sample after a miss got stored and blocked the next fix. Fixed in `2478868`. Non-finite or out-of-range GPS and OS samples are now ignored.

## Map tap

A map tap still opens the original Save/Cancel provisional-pin popup exactly as on base, with property lines on and off and at zoom 13–15. No parcel-tap path exists.

## Gaps

Simulator-only items are for Lane: device sun times, the system permission sheet, and Custom Location moves under and over 5 km.

## Result

PASS for I1–I6 plus #32. 310 pass, 0 fail at I6 tip `2478868f4932` under three time zones. `tsc` is clean.
