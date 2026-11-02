# Assessment: mcp-connectwise-psa (`mspstack-connectwise-psa`)

| | |
|---|---|
| Maintainer | mspstack |
| Source | https://github.com/mspstack/mcp-connectwise-psa |
| Assessed at | `v0.12.0` — commit `35638a8853fd69c2e0fb54c030334a216eabaac2` |
| Date | 2026-11-02 |
| Score | **91/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | npm provenance (https://slsa.dev/provenance/v1) |
| P3 | Versioned releases | ✅ | 14 git tags, 14 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-07 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @azure/msal-node@5.6.0: GHSA-xcx6-jx8p-x3h5, @hono/node-server@1.19.14: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.14: GHSA-rmxm-3fg6-px4f, @modelcontextprotocol/sdk@1.29.0: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.29.0: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.29.0: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.29.0: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.29.0: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.29.0: GHSA-rvq5-wwqv-78pq, body-parser@2.3.0: GHSA-27r3-jxmh-p828, fast-uri@3.1.3: GHSA-333x-w4r6-6crp, fast-uri@3.1.3: GHSA-5jgf-p345-68v8 (+32 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 4 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 1 reads |
| C2 | Credentials never logged | ✅ (script: flag) | src/tools/toolsets.ts:105 console.error(`[toolsets] ignoring unknown toolset "${token}" in x-cw-toolsets header.`); |
| C3 | Nothing written to disk | ✅ (script: flag) | src/sql/library.ts:45 writeFile(path: string, data: string): Promise<void>; \| src/sql/library.ts:63 const { readFile, writeFile, rename, stat } = await import("node:fs/promises"); \| src/sql/library.ts:66 writeFile: (path, data) => writeFile(path, data, "utf8"), \| src/sql/library.ts:206 await fs.writeFile(temp, `${JSON.stringify(file, null, 2)}\n`); |
| C4 | Runs locally (stdio) | ✅ | src/config.ts:59 |
| T1 | Tool list readable | ✅ | 45 tools found |
| T2 | Read-only possible | ✅ | 8 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ (script: flag) | src/server.ts:82 - Find tables with cw_db_find_table and check cw_db_find_query for a saved query before writing SQL; always use TOP and a WHERE clause. Results are capped by ro |
| D1 | HTTP mode safe | ✅ (script: flag) | src/index.ts:89 app.listen(config.port, "0.0.0.0", () => resolve()); |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **C2:** the flagged line logs an unknown toolset name, not a secret.
- **C3:** the only file it writes is its library of saved SQL queries (query text, no credentials or results).
- **T4:** the server instructions give SQL guidance ("always use TOP and a WHERE clause"), which is usage advice, not an attempt to steer the model elsewhere.
- **D1:** HTTP mode listens on all interfaces, but every request must carry the caller's own ConnectWise keys; there is no shared credential to borrow.
- **Optional SQL toolset (on-prem only):** when `CW_DB_*` is configured, `cw_db_query` reads the whole Manage database through one server-wide read-only login, bypassing each member's ConnectWise permissions, and it is in the default tool selection. The README says so plainly. Leave `CW_DB_*` unset unless you need it.
- Two write tools aren't counted by name in the tool list below: `cw_bundle_tickets` (merges tickets) and `cw_schedule_ticket` (creates a schedule entry); its README lists both. Only one destructive tool (`cw_delete_schedule_entry`); finance is read-only. Published to npm with a provenance attestation.
- **S3:** the shipped lockfile pins about 40 versions with advisories, including `@modelcontextprotocol/sdk` 1.29.0, `@hono/node-server` and `@azure/msal-node`.

## Tools (45, read from source)

**cw_add_ticket_note**, cw_bundle_tickets, **cw_create_ticket**, **cw_create_time_entry**, cw_db_find_query, cw_db_find_table, cw_db_query, cw_db_save_query, **cw_delete_schedule_entry**, cw_find_endpoint, cw_get, cw_get_agreement, cw_get_board, cw_get_company, cw_get_configuration, cw_get_contact, cw_get_invoice, cw_get_member, cw_get_ticket, cw_list_agreements, cw_list_boards, cw_list_company_sites, cw_list_configurations, cw_list_invoices, cw_list_members, cw_list_my_time, cw_list_my_timesheets, cw_list_priorities, cw_list_schedule_entries, cw_list_ticket_tasks, cw_list_ticket_time, cw_list_unbilled_time, cw_list_work_roles, cw_list_work_types, cw_member_availability, cw_my_schedule, cw_my_tickets, cw_schedule_ticket, cw_search_companies, cw_search_contacts, cw_search_tickets, **cw_submit_timesheet**, **cw_update_schedule_entry**, **cw_update_ticket**, **cw_update_time_entry**

Bold: changes data (by its name).
