# Assessment: datto-rmm-mcp-server (`joshfisher-datto-rmm`)

| | |
|---|---|
| Maintainer | josh-fisher |
| Source | https://github.com/josh-fisher/datto-rmm/tree/a86ec2b4940afe0c531a1c289c0807060e11e093/apps/mcp-server |
| Assessed at | `main` — commit `a86ec2b4940afe0c531a1c289c0807060e11e093` |
| Date | 2026-11-02 |
| Score | **89/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ✅ | 1 git tags, 1 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-09-03 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ✅ | SECURITY.md |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | pnpm-lock.yaml (repository root) |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.8: GHSA-92pp-h63x-v22m, @hono/node-server@1.19.8: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.8: GHSA-wc8c-qw6v-h7f6, @modelcontextprotocol/sdk@1.25.2: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.25.2: GHSA-345p-7cg4-v4c7, @modelcontextprotocol/sdk@1.25.2: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.25.2: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.25.2: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.25.2: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.25.2: GHSA-rvq5-wwqv-78pq, @vitest/mocker@2.1.9: GHSA-82fw-gwwq-j7x9, @vitest/mocker@2.1.9: GHSA-qxg6-89mg-rqv8 (+164 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 2 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 3 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | src/server.ts:2 |
| T1 | Tool list readable | ✅ | 52 tools found |
| T2 | Read-only possible | ✅ | 15 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ | src/server.ts:18 export function createServer(config: ServerConfig): { server: Server; client: DattoClient } { \| src/server.ts:97 const { server } = createServer(config); |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **S1:** the lockfile is `pnpm-lock.yaml` at the monorepo root, outside the assessed folder. The script doesn't read pnpm lockfiles, so S3 couldn't be checked.
- **P2:** published to npm as `datto-rmm-mcp-server` 0.1.0 without a provenance attestation. Building from source needs the pnpm workspace, since the API client is the sibling package `datto-rmm-api` (`workspace:*`). That client talks only to the six `*-api.centrastage.net` hosts.
- **Running jobs on devices:** `create-quick-job` (`src/tools/index.ts:352`, a `PUT /v2/device/{deviceUid}/quickjob` in `src/tools/devices.ts:263`) runs a component on a device. There is no read-only switch; every write tool (15, including `move-device`, `update-site-proxy` and variable deletes) starts with a verb a deny rule can match.
- One release (v0.1.0, January 2026), single maintainer. A copy without the lockfile exists at `floriand-mspblue/datto-rmm-mcp-dev`; it isn't assessed separately.

## Tools (52, read from source)

**create-account-variable**, **create-quick-job**, **create-site**, **create-site-variable**, **delete-account-variable**, **delete-site-proxy**, **delete-site-variable**, get-account, get-activity-logs, get-alert, get-device, get-device-audit, get-device-audit-by-mac, get-device-by-id, get-device-by-mac, get-device-software, get-esxi-audit, get-job, get-job-components, get-job-results, get-job-stderr, get-job-stdout, get-pagination-config, get-printer-audit, get-rate-limit, get-site, get-site-settings, get-system-status, list-account-variables, list-components, list-custom-filters, list-default-filters, list-device-open-alerts, list-device-resolved-alerts, list-devices, list-open-alerts, list-resolved-alerts, list-site-devices, list-site-filters, list-site-open-alerts, list-site-resolved-alerts, list-site-variables, list-sites, list-users, **move-device**, **resolve-alert**, **set-device-udf**, **set-device-warranty**, **update-account-variable**, **update-site**, **update-site-proxy**, **update-site-variable**

Bold: changes data (by its name).
