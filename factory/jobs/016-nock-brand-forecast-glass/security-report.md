# Security report

Origin security pass (bc-7c4c8841) on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/26, branch `cursor/nock-brand-forecast-glass-cbca`. Checked at `83fe994` (`83fe9943174cd5b42abe2b82074426ff8f365f2c`).

Pass. No findings.

The lockfile is identical. `package.json` only adds the test file.

`app.json` identity is unchanged: slug, scheme, bundle id, and Apple Sign In. Only the display name, icon, and splash changed. Storage keys are unchanged.

`scripts/derive-nock-brand.py` is author-time only. Pillow and numpy run on the author's machine. They are not in npm or CI. Paths are fixed and local. The script does not use the network.

Derived PNGs have no ancillary metadata chunks. Source JPGs carry EXIF and C2PA metadata (software agent "Grok Imagine", no GPS, no file paths). They stay because the brief requires unmodified originals, and the app does not bundle them. The repo grew by 843 KB.

No new network, env, analytics, logging, or permissions. Location stays when-in-use. Forecast `GlassSurface` listeners clean up.

The UI check for this job, and the carried-over 015 UI check, are still running. This record does not include them.

## Result

Pass. No critical, high, medium, or low findings.

The lockfile is identical. `package.json` only adds the test file. `app.json` identity is unchanged (slug, scheme, bundle id, Apple Sign In); only the display name, icon, and splash changed. Storage keys are unchanged. No new network, env, analytics, logging, or permissions. Location stays when-in-use.

## Critical

None.

## High

None.

## Medium

None.

## Low

None.

## Secrets and providers

No live weather or wind. No new env vars, secrets, or install scripts. The lockfile is identical. `package.json` only adds the test file. The derive script is author-time only (Pillow and numpy on the author's machine, not in npm or CI), with fixed local paths and no network. Derived PNGs have no ancillary metadata chunks. Source JPGs keep EXIF and C2PA metadata (software agent "Grok Imagine", no GPS, no file paths) because the brief requires unmodified originals, and the app does not bundle them. No new network destinations. No new analytics or logging. No permission changes. Location stays when-in-use. Payments, auth, and card handling are unchanged: no spend, no new accounts, no stored card data. Apple Sign In in `app.json` is unchanged.

## Still to confirm

On a device: an upgrade over an existing install keeps pins, logs, the tour flag, and settings. Storage keys are unchanged in the diff. Lane's Simulator items are not security findings.
