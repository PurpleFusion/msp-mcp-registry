# Assessment: mcp-ninjaone (`fredriksknese-ninjaone`)

| | |
|---|---|
| Maintainer | fredriksknese |
| Source | https://github.com/fredriksknese/mcp-ninjaone |
| Assessed at | `v1.0.0` — commit `ff566f9a9bed96d8002a47c2aacc0148a0f275ba` |
| Date | 2026-11-02 |
| Score | **60/100** — capped: no commercial-use licence (max 60) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ❌ | SEE LICENSE IN LICENSE |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ✅ | 1 git tags, 0 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-05-29 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.9: GHSA-92pp-h63x-v22m, @hono/node-server@1.19.9: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.9: GHSA-wc8c-qw6v-h7f6, @modelcontextprotocol/sdk@1.27.1: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.27.1: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.27.1: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.27.1: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.27.1: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.27.1: GHSA-rvq5-wwqv-78pq, body-parser@2.2.2: GHSA-27r3-jxmh-p828, body-parser@2.2.2: GHSA-v422-hmwv-36x6, express-rate-limit@8.2.1: GHSA-46wh-pxpv-q5gq (+61 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 2 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 3 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | src/index.ts:4 |
| T1 | Tool list readable | ✅ | 22 tools found |
| T2 | Read-only possible | ✅ | 4 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **P1:** the licence is a paid commercial licence ("Subject to the payment of the License Fee ...", `LICENSE`), not an open-source one. That caps the score.
- **T2:** the script counted `get_device_os_patch_status` as a write ("patch" is on its verb list); every real write tool starts with a verb (`run_script_on_device`, `create_maintenance_window`, `cancel_device_maintenance`, `reset_alert`).
- `run_script_on_device` runs a library script with no confirmation step (`src/tools/jobs.ts:89`). One commit (v1.0.0, February 2026).

## Tools (22, read from source)

**cancel_device_maintenance**, **create_maintenance_window**, get_device, get_device_activities, get_device_disks, get_device_jobs, get_device_os_patch_status, get_device_processor_info, get_device_software, get_organization, get_organization_locations, get_organization_policies, list_alert_conditions, list_alerts, list_device_alerts, list_devices, list_maintenance_windows, list_organization_devices, list_organizations, list_running_jobs, **reset_alert**, **run_script_on_device**

Bold: changes data (by its name).
