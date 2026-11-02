# Assessment: ninjaone-mcp (`wyre-ninjaone`)

| | |
|---|---|
| Maintainer | WYRE Technology |
| Source | https://github.com/WYRE-AI/ninjaone-mcp |
| Assessed at | `v2.5.2` — commit `3d838fa5ce0c2f30a81f8d4dc689839edc957dbc` |
| Date | 2026-11-02 |
| Score | **88/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | Apache-2.0 |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ✅ | 61 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-11-02 |
| P5 | More than one contributor | ✅ | 5 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.17: GHSA-rmxm-3fg6-px4f, zod@4.3.6: GHSA-mrhx-c7xc-m3w5 |
| S4 | 30 or fewer direct dependencies | ✅ | 3 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 25 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | src/index.ts:41 |
| T1 | Tool list readable | ✅ | 42 tools found |
| T2 | Read-only possible | ❌ | 10 write tools; 9 don't start with a verb: ninjaone_alerts_reset, ninjaone_alerts_reset_all, ninjaone_devices_reboot, ninjaone_devices_update_custom_fields, ninjaone_organizations_create, ninjaone_organizations_update_custom_fields, ninjaone_tickets_add_comment, ninjaone_tickets_create |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ | src/index.ts:213 const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => { \| src/index.ts:281 httpServer.listen(port, host, () => { |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **T2 (confirmed):** there is no read-only switch; the script's hit is the word `readonly` inside a bundled UI script (`src/generated/alert-card-html.ts:3`). Write tools put the verb last (`ninjaone_devices_reboot`, `ninjaone_tickets_create`, `ninjaone_alerts_reset_all`), so a verb-prefix deny rule doesn't match them; each has to be denied by its full name.
- **Running scripts:** `ninjaone_scripts_run` is off until you list approved script IDs in `NINJAONE_ALLOWED_SCRIPT_IDS` (unset means deny-all), asks for confirmation (elicitation, or `confirm: true`), and writes a separate audit log line (`src/domains/scripts.ts:1-30`).
- **Reboots:** `ninjaone_devices_reboot` calls the API directly with no confirmation step (`src/domains/devices.ts:300-304`); `ninjaone_alerts_reset_all` likewise.
- **D1:** HTTP mode refuses to start without `CONDUIT_S2S_SECRET` unless `MCP_ALLOW_INSECURE_DEV=1`, and then binds 127.0.0.1 only (`src/index.ts:115-138`). Default transport is stdio.
- **Hosting:** the repo also ships a Cloudflare Workers deployment (`src/worker.ts`) and a gateway mode for WYRE's hosted service. This assessment is of running the source yourself over stdio.
- **S3:** the lockfile pins `@hono/node-server` 1.19.17 and `zod` 4.3.6, both with published advisories.

## Tools (42, read from source)

device-health-summary, ninjaone_alerts_get, ninjaone_alerts_list, **ninjaone_alerts_reset**, **ninjaone_alerts_reset_all**, ninjaone_alerts_summary, ninjaone_debug_elicitation_check, ninjaone_devices_activities, ninjaone_devices_alerts, ninjaone_devices_get, ninjaone_devices_get_custom_fields, ninjaone_devices_list, **ninjaone_devices_reboot**, ninjaone_devices_services, **ninjaone_devices_update_custom_fields**, ninjaone_navigate, **ninjaone_organizations_create**, ninjaone_organizations_devices, ninjaone_organizations_get, ninjaone_organizations_get_custom_fields, ninjaone_organizations_list, ninjaone_organizations_locations, **ninjaone_organizations_update_custom_fields**, ninjaone_scripts_list, ninjaone_scripts_run, ninjaone_status, **ninjaone_tickets_add_comment**, ninjaone_tickets_attributes_list, ninjaone_tickets_boards_list, ninjaone_tickets_comments, ninjaone_tickets_contacts_list, **ninjaone_tickets_create**, ninjaone_tickets_form_get, ninjaone_tickets_forms_list, ninjaone_tickets_get, ninjaone_tickets_list, ninjaone_tickets_statuses_list, **ninjaone_tickets_update**, ninjaone_tickets_users_list, offline-devices, org_name, **patch-gaps**

Bold: changes data (by its name).
