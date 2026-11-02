# Assessment: HaloPSA-MCP-Server (`impendingtech-halopsa`)

| | |
|---|---|
| Maintainer | Tim-ImpendingTech |
| Source | https://github.com/Tim-ImpendingTech/HaloPSA-MCP-Server |
| Assessed at | `main` — commit `6cab248f7f3da9ae091fc6ab9fd3d6bdced0ad86` |
| Date | 2026-11-02 |
| Score | **86/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-02-26 |
| P5 | More than one contributor | ✅ | 2 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.9: GHSA-92pp-h63x-v22m, @hono/node-server@1.19.9: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.9: GHSA-wc8c-qw6v-h7f6, @modelcontextprotocol/sdk@1.27.1: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.27.1: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.27.1: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.27.1: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.27.1: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.27.1: GHSA-rvq5-wwqv-78pq, body-parser@2.2.2: GHSA-27r3-jxmh-p828, body-parser@2.2.2: GHSA-v422-hmwv-36x6, express-rate-limit@8.2.1: GHSA-46wh-pxpv-q5gq (+61 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 2 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 4 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | src/index.ts:4 |
| T1 | Tool list readable | ✅ | 46 tools found |
| T2 | Read-only possible | ✅ | 12 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **P2:** the script marked this unknown because `npm view` of the manifest name (`halopsa-mcp-server`) returned a 404 error object, which it read as a package. It isn't on npm; you install it by cloning and building, which pins the commit.
- No flags. Stdio only, credentials from the environment, token kept in memory. The OAuth scope defaults to `all` (`src/config.ts:19`); set `HALOPSA_SCOPE` to narrow it.
- Write tools start with a verb after the `halo_` prefix (`halo_create_ticket`, `halo_update_client`), so a deny rule can match them. There are no delete tools.
- Last changed February 2026, no tags, single maintainer.
- **S3:** the lockfile pins versions with published advisories, including `@modelcontextprotocol/sdk` 1.27.1 and `@hono/node-server` 1.19.9.

## Tools (46, read from source)

**halo_create_action**, **halo_create_appointment**, **halo_create_asset**, **halo_create_client**, **halo_create_kb_article**, **halo_create_project**, **halo_create_site**, **halo_create_ticket**, halo_get_agent, halo_get_appointment, halo_get_asset, halo_get_client, halo_get_contract, halo_get_invoice, halo_get_kb_article, halo_get_my_tickets, halo_get_opportunity, halo_get_project, halo_get_quotation, halo_get_site, halo_get_supplier, halo_get_ticket, halo_list_actions, halo_list_agents, halo_list_appointments, halo_list_assets, halo_list_assigned_tickets, halo_list_clients, halo_list_contracts, halo_list_created_tickets, halo_list_invoices, halo_list_opportunities, halo_list_priorities, halo_list_projects, halo_list_quotations, halo_list_sites, halo_list_statuses, halo_list_suppliers, halo_list_teams, halo_list_ticket_types, halo_list_tickets, halo_search_kb_articles, **halo_update_asset**, **halo_update_client**, **halo_update_project**, **halo_update_ticket**

Bold: changes data (by its name).
