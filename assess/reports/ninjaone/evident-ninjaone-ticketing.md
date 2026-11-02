# Assessment: NinjaOne-Ticketing-MCP-Server (`evident-ninjaone-ticketing`)

| | |
|---|---|
| Maintainer | Evident-Dev |
| Source | https://github.com/Evident-Dev/NinjaOne-Ticketing-MCP-Server |
| Assessed at | `master` — commit `49e2242c0dd13a4d51f7dd87457e6b87c1b69af4` |
| Date | 2026-11-02 |
| Score | **40/100** — capped: TLS checks off (max 40), open to the network without authentication by default (max 50), no commercial-use licence (max 60) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ❌ | no licence |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-22 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.14: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.14: GHSA-rmxm-3fg6-px4f, @modelcontextprotocol/sdk@1.29.0: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.29.0: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.29.0: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.29.0: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.29.0: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.29.0: GHSA-rvq5-wwqv-78pq, body-parser@2.2.2: GHSA-27r3-jxmh-p828, body-parser@2.2.2: GHSA-v422-hmwv-36x6, fast-uri@3.1.2: GHSA-333x-w4r6-6crp, fast-uri@3.1.2: GHSA-4c8g-83qw-93j6 (+44 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 4 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ❌ (script: flag) | src/db.ts:42 : { rejectUnauthorized: false } |
| C1 | Credentials from environment | ✅ | 6 reads |
| C2 | Credentials never logged | ✅ (script: flag) | src/index.ts:240 console.log("[tech-store] view the new tokens in Railway → Postgres → Data → technicians"); \| src/index.ts:251 console.warn("WARNING: No MCP_SHARED_SECRET, no DATABASE_URL, no NINJA_TECHNICIANS."); |
| C3 | Nothing written to disk | ❌ (script: flag) | src/user-oauth.ts:85 // Atomic write: writeFile to .tmp, then rename. Prevents partial writes from \| src/user-oauth.ts:100 await fs.writeFile(temporaryPath, JSON.stringify(tokens, null, 2), { mode: 0o600 }); |
| C4 | Runs locally (stdio) | ❌ | no local stdio transport found |
| T1 | Tool list readable | ✅ | 52 tools found |
| T2 | Read-only possible | ❌ | 11 write tools; 11 don't start with a verb: ninja_alert_reset, ninja_billing_add_ticket_product, ninja_device_reboot, ninja_device_set_maintenance, ninja_org_create, ninja_scangroup_upload_csv, ninja_ticket_add_billable_time, ninja_ticket_add_comment |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ❌ (open by default) (script: flag) | src/index.ts:186 app.listen(config.port, async () => { |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **N1:** `app.ninjaone.us` is NinjaOne's `fed` region (`src/config.ts:10`).
- **N3 (confirmed):** when `DATABASE_URL` points anywhere other than localhost, the Postgres connection is opened with `rejectUnauthorized: false` (`src/db.ts:39-42`). That database holds each technician's access token and NinjaOne sign-in. NinjaOne API calls keep normal TLS checks.
- **D1 (confirmed):** HTTP only, listening on all interfaces (`app.listen(config.port)`, `src/index.ts:186`). With no `MCP_SHARED_SECRET`, `DATABASE_URL` or `NINJA_TECHNICIANS` set, the `/mcp` endpoints are unauthenticated; the server prints a warning and carries on (`src/index.ts:250-254`).
- **C3 (confirmed):** the shared NinjaOne refresh token is saved to `/data/refresh-token.json` (owner-only, `src/user-oauth.ts:100`, `src/config.ts:149`); per-technician sign-ins go to Postgres.
- **C2:** the flagged lines print fixed messages and point to where tokens are stored; they don't print tokens.
- **C4:** HTTP only, built to be hosted (Railway). Destructive tools such as `ninja_device_decommission` require the user to type a confirmation word and offer a dry run.
- No licence (caps the score).

## Tools (52, read from source)

ninja_alert_list, **ninja_alert_reset**, ninja_alert_summary, **ninja_billing_add_ticket_product**, ninja_billing_get_agreement, ninja_billing_get_invoice, ninja_billing_list_accounts, ninja_billing_list_agreements, ninja_billing_list_invoices, ninja_billing_list_products, ninja_billing_list_ticket_products, ninja_billing_list_ticket_time, ninja_contact_find, ninja_device_clear_maintenance, ninja_device_decommission, ninja_device_get, ninja_device_last_logged_on_user, ninja_device_list, ninja_device_list_activities, ninja_device_list_disks, ninja_device_list_os_patches, ninja_device_list_processors, ninja_device_list_services, ninja_device_list_software, ninja_device_list_volumes, **ninja_device_reboot**, **ninja_device_set_maintenance**, **ninja_org_create**, ninja_org_find, ninja_org_find_by_domain, ninja_org_get, ninja_org_list_locations, ninja_scangroup_get, ninja_scangroup_list, **ninja_scangroup_upload_csv**, ninja_system_auth_status, ninja_system_status, ninja_system_whoami, **ninja_ticket_add_billable_time**, **ninja_ticket_add_comment**, **ninja_ticket_create**, ninja_ticket_get, ninja_ticket_get_log, ninja_ticket_list_attributes, ninja_ticket_list_boards, ninja_ticket_list_for_board, ninja_ticket_list_forms, ninja_ticket_list_statuses, **ninja_ticket_resolve**, **ninja_ticket_update**, ninja_user_find, ninja_user_list

Bold: changes data (by its name).
