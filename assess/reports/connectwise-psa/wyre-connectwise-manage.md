# Assessment: connectwise-manage-mcp (`wyre-connectwise-manage`)

| | |
|---|---|
| Maintainer | WYRE Technology |
| Source | https://github.com/WYRE-AI/connectwise-manage-mcp |
| Assessed at | `v1.15.11` — commit `cdb17bdaeee6ed65c5cf627f04ae7c3ff0ae07d6` |
| Date | 2026-11-02 |
| Score | **89/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | Apache-2.0 |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ✅ | 51 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-29 |
| P5 | More than one contributor | ✅ | 13 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @modelcontextprotocol/sdk@1.31.0: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.31.0: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.31.0: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.31.0: GHSA-rvq5-wwqv-78pq, body-parser@2.3.0: GHSA-27r3-jxmh-p828, fast-uri@3.1.8: GHSA-333x-w4r6-6crp, fast-uri@3.1.8: GHSA-w74x-v6f9-j3xg, fast-uri@3.1.8: GHSA-wjr9-j795-jxcr, fast-uri@3.1.8: GHSA-xhq7-xmqj-769h, qs@6.16.0: GHSA-6pq8-jhm2-2vcw, undici@8.11.2: GHSA-2m5v-pch6-74hx, undici@8.11.2: GHSA-4qv8-2p9j-2685 (+7 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 3 direct |
| N1 | Only the vendor's API | ✅ (script: fail) | login.microsoftonline.com (src/auth/middleware.ts:44), mcp.yourdomain.com (src/auth/types.ts:7), cwm.yourcompany.com (src/index.ts:17) |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ (script: flag) | src/api-client.ts:17 * via the process-global NODE_TLS_REJECT_UNAUTHORIZED env var, which would \| src/api-client.ts:140 ? new Agent({ connect: { rejectUnauthorized: false } }) \| src/tools/procurement.ts:38 * rejectUnauthorized to its own undici Agent and never writes NODE_TLS_REJECT_UNAUTHORIZED. |
| C1 | Credentials from environment | ✅ | 27 reads |
| C2 | Credentials never logged | ✅ (script: flag) | src/index.ts:127 console.error(PLACEHOLDER_S2S_SECRET_ERROR); \| src/index.ts:200 console.error("[auth] Static bearer token fallback enabled (CLI/Desktop)"); \| src/index.ts:255 console.error("[auth] /token error:", err); |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | src/index.ts:48 |
| T1 | Tool list readable | ✅ | 84 tools found |
| T2 | Read-only possible | ✅ | read-only switch: src/api-client.ts:77 |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ | src/index.ts:204 httpServer = createServer((req: IncomingMessage, res: ServerResponse) => { \| src/index.ts:441 httpServer!.listen(port, host, () => { |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **N1:** the other hosts are Microsoft sign-in (`login.microsoftonline.com`), used only by its hosted HTTP mode, and two placeholder examples. Run locally over stdio, it talks to ConnectWise only.
- **N3:** TLS checks are turned off only if you set `CW_MANAGE_REJECT_UNAUTHORIZED=false` (for a self-hosted server with a self-signed certificate), and only for that connection.
- **C2:** the flagged lines log fixed messages, not secrets; `src/safe-error.ts` strips secrets from error text.
- **Hosting:** WYRE's Claude Code plugin points at WYRE's hosted copy of this server by default. This assessment is of running the source yourself.
- **S3:** the shipped lockfile pins versions with published advisories, including `@modelcontextprotocol/sdk` 1.31.0, `undici`, `fast-uri`, `qs` and `body-parser`.

## Tools (84, read from source)

**cw_add_adjustment_detail**, **cw_add_project_ticket_note**, **cw_add_ticket_note**, **cw_close_adjustment**, **cw_create_activity**, **cw_create_adjustment**, **cw_create_agreement_addition**, **cw_create_catalog_item**, **cw_create_company**, **cw_create_contact**, **cw_create_project**, **cw_create_schedule_entry**, **cw_create_ticket**, **cw_create_time_entry**, **cw_delete_time_entry**, cw_get_activity, cw_get_adjustment, cw_get_agreement, cw_get_agreement_additions, cw_get_agreement_recap, cw_get_catalog_item, cw_get_company, cw_get_configuration, cw_get_contact, cw_get_inventory_on_hand, cw_get_invoice, cw_get_member, cw_get_opportunity, cw_get_procurement_product, cw_get_project, cw_get_project_ticket, cw_get_project_ticket_notes, cw_get_purchase_order, cw_get_purchase_order_items, cw_get_sales_order, cw_get_sales_order_products, cw_get_ticket, cw_get_ticket_configurations, cw_get_ticket_notes, cw_get_time_entry, cw_list_adjustment_types, cw_list_boards, cw_list_catalog_categories, cw_list_catalog_subcategories, cw_list_communication_types, cw_list_manufacturers, cw_list_priorities, cw_list_schedule_statuses, cw_list_schedule_types, cw_list_statuses, cw_list_warehouse_bins, cw_list_warehouses, cw_search_activities, cw_search_agreement_recaps, cw_search_agreements, cw_search_catalog_items, cw_search_companies, cw_search_configurations, cw_search_contacts, cw_search_invoices, cw_search_members, cw_search_opportunities, cw_search_opportunity_forecasts, cw_search_opportunity_notes, cw_search_procurement_products, cw_search_project_tickets, cw_search_projects, cw_search_purchase_orders, cw_search_sales_orders, cw_search_sales_stages, cw_search_schedule_entries, cw_search_tickets, cw_search_time_entries, cw_test_connection, **cw_update_agreement_addition**, **cw_update_catalog_item**, **cw_update_company**, **cw_update_contact**, **cw_update_contact_types**, **cw_update_invoice**, **cw_update_schedule_entry**, **cw_update_ticket**, **cw_update_ticket_configurations**, **cw_update_time_entry**

Bold: changes data (by its name).
