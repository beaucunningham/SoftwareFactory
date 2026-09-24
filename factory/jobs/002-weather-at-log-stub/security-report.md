# Security report

Origin security pass on https://cursor.com/codebase/beau-cunningham/hunting-companion/pull/3 at `49d32a1`.

Product code was not changed by security.

## Result

Pass. No critical or high findings.

## Critical

None.

## High

None.

## Medium

None.

## Low

- Vault-trusted weather strings are displayed.
- Attach window can race on account switch.
- `/hunt-detail` uses the same pattern as the other detail routes.

## Secrets and providers

No weather API keys, live weather providers, or paid SDKs.
