# Assessment: @veeemlab/datto-rmm-mcp (`veeemlab-datto-rmm`)

| | |
|---|---|
| Maintainer | veeemlab (Vitalii Morgunov) |
| Source | https://github.com/veeemlab/datto-rmm-mcp |
| Assessed at | `v0.5.3` — commit `577c32e0b5fb53b799be5ff25039ca428be0bc84` |
| Date | 2026-11-02 |
| Score | **83/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | npm provenance (https://slsa.dev/provenance/v1) |
| P3 | Versioned releases | ✅ | 9 git tags, 9 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-05-24 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ❌ | prepare: npm run build \|\| echo 'prepare: build skipped' |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.14: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.14: GHSA-rmxm-3fg6-px4f, @modelcontextprotocol/sdk@1.29.0: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.29.0: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.29.0: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.29.0: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.29.0: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.29.0: GHSA-rvq5-wwqv-78pq, body-parser@2.2.2: GHSA-27r3-jxmh-p828, body-parser@2.2.2: GHSA-v422-hmwv-36x6, fast-uri@3.1.2: GHSA-333x-w4r6-6crp, fast-uri@3.1.2: GHSA-4c8g-83qw-93j6 (+39 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 1 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 4 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | src/index.ts:7 |
| T1 | Tool list readable | ✅ | 55 tools found |
| T2 | Read-only possible | ✅ | read-only switch: src/security.ts:31 |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Read-only switch:** `DATTO_MCP_READONLY=true` leaves out every tool in `DESTRUCTIVE_TOOLS`, including `create-quick-job` (`src/security.ts:3-31`, `src/index.ts:34`).
- **Running jobs on devices:** with the switch off, `create-quick-job` runs a component on a device. It and nine other tools (`reset-api-keys`, `move-device`, `set-site-proxy`, variable deletes and others) require a `confirm` argument equal to the tool's name in capitals (`src/security.ts:26-28`). The model can fill that in itself, so it slows a mistaken call rather than requiring a person.
- **S2:** `prepare` runs the project's own TypeScript build (`npm run build`) when installed from git; it doesn't run when installed from npm. Published to npm with a provenance attestation.
- Runs over stdio only. Last changed May 2026, single maintainer.
- **S3:** the shipped lockfile pins versions with advisories, including `@modelcontextprotocol/sdk` 1.29.0 and `@hono/node-server`.

## Tools (55, read from source)

**create-account-variable**, **create-quick-job**, **create-site**, **create-site-variable**, **delete-account-variable**, **delete-site-proxy**, **delete-site-variable**, get-account, get-activity-logs, get-alert, get-device, get-device-audit, get-device-audit-by-mac, get-device-by-id, get-device-by-mac, get-device-software, get-esxi-audit, get-job, get-job-components, get-job-results, get-job-stderr, get-job-stdout, get-pagination-config, get-printer-audit, get-rate-limit, get-site, get-site-settings, get-site-variables, get-system-status, list-account-components, list-account-devices, list-account-open-alerts, list-account-resolved-alerts, list-account-sites, list-account-users, list-account-variables, list-custom-filters, list-default-filters, list-device-open-alerts, list-device-resolved-alerts, list-dnet-site-mappings, list-site-device-filters, list-site-devices, list-site-devices-network, list-site-open-alerts, list-site-resolved-alerts, **move-device**, **reset-api-keys**, **resolve-alert**, **set-device-udf**, **set-device-warranty**, **set-site-proxy**, **update-account-variable**, **update-site**, **update-site-variable**

Bold: changes data (by its name).
