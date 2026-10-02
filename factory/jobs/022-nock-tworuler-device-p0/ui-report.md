# UI report

Origin repo: https://cursor.com/codebase/beau-cunningham/hunting-companion

Final main `ee700dd0f5f3a22fb1b8c516d5da4021d1ebd944` (Origin #92).

UI QA passed #90, #91, and #92 after one bounce each.

Lane finished the Simulator gate at 2:28pm CT on 2026-10-01 on final main `ee700dd0f5f3a22fb1b8c516d5da4021d1ebd944`.

This report is markdown only. No screenshots.

## What landed

- M1+M2. Two-finger gesture host (Origin #90).
- M3+M4. Wind clears the status bar. Pins sit above wind (Origin #91).
- M5. Search field fills the top bar (Origin #92). PR3 was re-cut onto the new main after #91.

## Result

UI QA passed #90, #91, and #92 after one bounce each. Simulator gate at 2:28pm CT: M1/M2 PASS (a real two-finger hold can't be tested in the Simulator; Beau verified it on his iPhone at about 7:54pm CT, "all looks good"), AC 4.1 PASS, M5 PASS, Forecast caption PASS. AC 3.1 on Pro/Pro Max FAILED (wind arrows in the status band). The Engineering Manager deferred it to Job 023 as item B1.
