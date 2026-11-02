# Assessment: NinjaRMM_MCP (`timothiasthegreat-ninjarmm`)

| | |
|---|---|
| Maintainer | timothiasthegreat |
| Source | https://github.com/timothiasthegreat/NinjaRMM_MCP |
| Assessed at | `main` — commit `30deecab9ea2d529988f6458e5183d5947641ed1` |
| Date | 2026-11-02 |
| Score | **50/100** — capped: open to the network without authentication by default (max 50), no commercial-use licence (max 60) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ❌ | no licence |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-04-02 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.11: GHSA-92pp-h63x-v22m, @hono/node-server@1.19.11: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.11: GHSA-rmxm-3fg6-px4f, @modelcontextprotocol/sdk@1.27.1: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.27.1: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.27.1: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.27.1: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.27.1: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.27.1: GHSA-rvq5-wwqv-78pq, body-parser@2.2.2: GHSA-27r3-jxmh-p828, body-parser@2.2.2: GHSA-v422-hmwv-36x6, body-parser@1.20.4: GHSA-27r3-jxmh-p828 (+60 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 4 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 1 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ❌ | no local stdio transport found |
| T1 | Tool list readable | ✅ | 5 tools found |
| T2 | Read-only possible | ✅ | 1 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ❌ (open by default) (script: flag) | src/index.ts:154 app.listen(config.port, "0.0.0.0", () => { |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **D1 (confirmed):** HTTP only, listening on `0.0.0.0` (`src/index.ts:154`) with no authentication on `/mcp` (`src/index.ts:86`), so anyone who can reach the port reads your NinjaOne data with the server's credentials. The tools are read-only, which limits what can be done.
- **T2:** read-only by design: five tools, all reads. The script counted `run_query_report` as a write ("run" is on its verb list); it calls a fixed list of read-only query endpoints.
- **C2:** the OAuth request body is logged only on token errors and with `client_secret` replaced by `[REDACTED]` (`src/ninja-client.ts:408-412`).
- **C4:** HTTP only (Docker), no stdio.
- No licence (caps the score). Last changed April 2026.

## Tools (5, read from source)

get_device, get_ticket, list_organization_devices, list_organizations, **run_query_report**

Bold: changes data (by its name).
