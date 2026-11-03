# Assessment: dattormm-mcp (`am3cramirez-dattormm`)

| | |
|---|---|
| Maintainer | am3cramirez |
| Source | https://github.com/am3cramirez/dattormm-mcp |
| Assessed at | `claude/datto-rmm-mcp-enhance-5xt2xm` — commit `55b71722ce3c05bbd8e45786a0dd329964ab4b4f` |
| Date | 2026-11-02 |
| Score | **80/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-07-10 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.14: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.14: GHSA-rmxm-3fg6-px4f, @modelcontextprotocol/sdk@1.29.0: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.29.0: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.29.0: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.29.0: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.29.0: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.29.0: GHSA-rvq5-wwqv-78pq, body-parser@2.3.0: GHSA-27r3-jxmh-p828, fast-uri@3.1.3: GHSA-333x-w4r6-6crp, fast-uri@3.1.3: GHSA-5jgf-p345-68v8, fast-uri@3.1.3: GHSA-7p8r-x3mc-p8w7 (+31 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 2 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 6 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | src/index.ts:3 |
| T1 | Tool list readable | ✅ | 46 tools found |
| T2 | Read-only possible | ✅ | 15 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ❌ (script: flag) | src/index.ts:62 httpServer.listen(port, () => { |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **P2:** `dattormm-mcp` is not on npm; the script read npm's "not found" reply as a package without provenance. Installed from the pinned commit.
- **D1:** stdio is the default. With `MCP_TRANSPORT=http` it calls `listen(port)` with no host, which listens on all interfaces, port 3000, and has no authentication (`src/index.ts:19-64`); anyone who can reach that port uses your Datto keys, including the job tool. The script missed it because no `0.0.0.0` appears in the call. Opt-in, so it fails D1 without the open-by-default cap.
- **Running jobs on devices:** `datto_run_quickjob` runs a component on a device. There is no read-only switch; all 15 write tools start with `datto_` followed by a verb a deny rule can match.
- One commit (July 2026), single contributor, no tags.

## Tools (46, read from source)

**datto_create_account_variable**, **datto_create_site**, **datto_create_site_variable**, **datto_delete_account_variable**, **datto_delete_site_proxy**, **datto_delete_site_variable**, datto_get_account, datto_get_alert, datto_get_audit_by_mac, datto_get_device, datto_get_device_audit, datto_get_device_by_id, datto_get_device_by_mac, datto_get_device_software, datto_get_esxi_audit, datto_get_job, datto_get_job_components, datto_get_job_results, datto_get_job_stderr, datto_get_job_stdout, datto_get_printer_audit, datto_get_site, datto_get_site_settings, datto_get_system_info, datto_list_account_variables, datto_list_activity_logs, datto_list_alerts, datto_list_components, datto_list_devices, datto_list_dnet_site_mappings, datto_list_filters, datto_list_site_devices, datto_list_site_filters, datto_list_site_network_interfaces, datto_list_site_variables, datto_list_sites, datto_list_users, **datto_move_device**, **datto_resolve_alert**, **datto_run_quickjob**, **datto_set_device_udf**, **datto_set_device_warranty**, **datto_set_site_proxy**, **datto_update_account_variable**, **datto_update_site**, **datto_update_site_variable**

Bold: changes data (by its name).
