# Assessment: @wilnertech/halopsa-mcp-server (`wilnertech-halopsa`)

| | |
|---|---|
| Maintainer | WilnerTech |
| Source | https://www.npmjs.com/package/@wilnertech/halopsa-mcp-server |
| Assessed at | version `1.7.2` (sha512-fK4IFC9az0LHDxUaT0Yj9lQBFEdU6l/bGSquGLNK16IclMK2UiXVND5cjrvK5/tAAH7XS5OVgqOPn4Px0B/svA==) |
| Date | 2026-11-02 |
| Score | **79/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ✅ | 0 git tags, 12 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-05-13 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ | 3 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 5 reads |
| C2 | Credentials never logged | ✅ (script: flag) | dist/api/client.js:138 console.error(`HaloPSA: New access token obtained. Expires at: ${new Date(this.tokenExpiresAt).toISOString()}`); |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | dist/index.js:15 |
| T1 | Tool list readable | ✅ | 72 tools found |
| T2 | Read-only possible | ✅ (script: fail) | 24 write tools; 1 don't start with a verb: validate_halopsa_create_ticket |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **C2:** the flagged line logs the token's expiry time, not the token (`dist/api/client.js:138`).
- **T2:** `validate_halopsa_create_ticket` only reads the ticket type to check fields (`dist/tools/tickets.js:1035`), so every write tool starts with a verb. `hold_halopsa_ticket_sla` and `release_halopsa_ticket_sla` also change data and start with their verb.
- 72 tools, including deletes (`delete_halopsa_ticket`, `delete_halopsa_asset`, `delete_halopsa_workflow`) and `bulk_update_halopsa_tickets`. Lookups are cached in memory only.
- Published to npm only; the linked GitHub repo (`SuperGaco/halopsa-mcp-server`) isn't public, so the package can't be compared with source (P2). No lockfile in the package. Last published May 2026.

## Tools (72, read from source)

**add_halopsa_ticket_action**, **add_halopsa_ticket_milestone**, **bulk_update_halopsa_tickets**, **close_halopsa_ticket**, **create_halopsa_asset**, **create_halopsa_budget_type**, **create_halopsa_site**, **create_halopsa_ticket**, **create_halopsa_user**, **create_halopsa_workflow**, **delete_halopsa_asset**, **delete_halopsa_budget_type**, **delete_halopsa_ticket**, **delete_halopsa_workflow**, find_halopsa_asset_match, find_halopsa_site_match, find_halopsa_user_match, get_halopsa_asset, get_halopsa_asset_field_schema, get_halopsa_assets_batch, get_halopsa_client, get_halopsa_current_milestone, get_halopsa_site, get_halopsa_sites_batch, get_halopsa_ticket, get_halopsa_ticket_budget, get_halopsa_ticket_field_schema, get_halopsa_tickets_batch, get_halopsa_tickettype, get_halopsa_user, get_halopsa_users_batch, get_halopsa_workflow, **hold_halopsa_ticket_sla**, list_halopsa_agents, list_halopsa_asset_custom_fields, list_halopsa_asset_statuses, list_halopsa_asset_types, list_halopsa_assets, list_halopsa_budget_types, list_halopsa_clients, list_halopsa_contact_types, list_halopsa_linked_tickets, list_halopsa_loaded_tools, list_halopsa_sites, list_halopsa_ticket_actions, list_halopsa_ticket_categories, list_halopsa_ticket_custom_fields, list_halopsa_ticket_milestones, list_halopsa_ticket_outcomes, list_halopsa_ticket_priorities, list_halopsa_ticket_statuses, list_halopsa_tickets, list_halopsa_tickettypes, list_halopsa_users, list_halopsa_workflow_steps, list_halopsa_workflows, **release_halopsa_ticket_sla**, **remove_halopsa_ticket_milestone**, scan_halopsa_asset_duplicates, scan_halopsa_user_duplicates, search_halopsa_assets_by_hostname, search_halopsa_assets_by_serial, search_halopsa_clients, search_halopsa_tickets, search_halopsa_users_by_email, **set_halopsa_ticket_budget**, **set_halopsa_ticket_milestones**, **update_halopsa_asset**, **update_halopsa_ticket**, **update_halopsa_user**, **update_halopsa_workflow**, **validate_halopsa_create_ticket**

Bold: changes data (by its name).
