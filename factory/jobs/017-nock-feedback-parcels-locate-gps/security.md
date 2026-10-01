# Security report

Origin security reviewer (bc-eec4fb28) on the hunting-companion stack built from Job 016 main `5bddc51`.

PASS for I1–I6 and I7.

## Medium

One Medium I6 finding was fixed. The when-in-use prompt could fire before the tour flag loaded. Fixed in `7071230`: the ask waits for tours ready and the tour hidden, and it latches only on a real request.

The later fixes `3eedbc6` and `2478868` passed.

## Location

There is no background location or `watchPosition`. Location is a one-shot Balanced read. The OS last-known is limited to 24h and kept in memory. There is no new logging, no new disk writes beyond the existing map-center key, and no new dependencies.

## I7

I7 / #32 (`0bdca32de8b2`) is a stop note only. No identify or query client and no owner fields. It was stopped because RN's protocol cache could store owner data.

## Result

PASS for I1–I6 and I7. No open critical or high findings. The one Medium I6 finding is fixed in `7071230`. `3eedbc6` and `2478868` passed.
