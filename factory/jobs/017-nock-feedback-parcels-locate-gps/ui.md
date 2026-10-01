# UI report

Origin UI checker (bc-ac2da844) on the hunting-companion stack built from Job 016 main `5bddc51`.

PASS for I1–I5 at `4017b1b` and for I6 at `2478868`.

## Reports

- I1–I5: `docs/job-017-ui-report-i1-i5.md` on the I5 branch, tip `4017b1b`
- I6: `docs/job-017-ui-report-i6.md` on the I6 branch, tip `2478868`

## I6 walk

- Granted current fix shows "At your location" and has no third stack line
- Last known: the stack grows and reads "Last known location"
- Map-center fallback follows pans and reads "at map center"
- Sun stack is 120×72, top-left, with glass
- One tap returns to Map from every tab

## Note

At a 320×568 web viewport, the Nock wordmark's layout box overlaps the sun stack by about 4pt of glyph. The wordmark is clear at 375, 390, and 430. This is non-blocking.

## Gaps for Lane

Simulator-only items: native glass, MapKit parcel lines, the blue dot, a new fix after backgrounding, a real Never status, and Core Location last-known.

## Result

PASS for I1–I5 at `4017b1b` and for I6 at `2478868`.
