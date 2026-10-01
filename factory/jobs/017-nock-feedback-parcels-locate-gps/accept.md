# Accept

Job `017-nock-feedback-parcels-locate-gps` is accepted.

I1–I6 shipped on Origin #27–#31, stacked on main `5bddc51`.

- Wordmark and sun stack
- Locate-me sits bottom-right, above Map Tools. Beau confirmed that placement via Finley at 10:36pm on 9/30
- Parcel outlines with no fill at zoom 13+
- Forecast at coordinates
- GPS forecast point

Final I6 has 310 tests passing in three time zones.

I7 (parcel identify popup, CAD link, county table) was stopped per the brief's hard rule. TxGIO identify returns owner fields with `cache-control: public`, and React Native's protocol cache could write them to Cache.db. That cannot be prevented without native code. Origin #32 holds the stop record only.

The CAD-link portion was recovered as Job 018 (offline county lookup, no identify).

Merges go on the normal path through Finley.

Factory status is `accepted`.
