# Assessment: connectwise-mcp (`xssentials-connectwise`)

| | |
|---|---|
| Maintainer | Xssentials |
| Source | https://github.com/Xssentials/connectwise-mcp |
| Assessed at | `main` — commit `b73f4478dd6dfff15bf713b091955e65ce3a5223` |
| Date | 2026-11-02 |
| Score | **60/100** — capped: no commercial-use licence (max 60) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ❌ | no licence |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-09-02 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ | 2 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 2 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | connectwise_mcp/__main__.py:2948 |
| T1 | Tool list readable | ✅ | 24 tools found |
| T2 | Read-only possible | ✅ | 1 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- The README describes 23 read-only tools. Secrets are meant to come from 1Password (`op run`), which keeps them out of files.
- Its API client is a second package installed from git without a pinned commit (`XssentialsAI/xssentials`), so what you get changes with that repo.
- No licence (caps the score).

## Tools (24, read from source)

cw_ar_aging, cw_company, cw_configurations, **cw_create_member**, cw_expense_reports, cw_find, cw_inventory, cw_invoice_list, cw_invoice_lookup, cw_opportunity_status, cw_pick_ship_status, cw_ping, cw_product_catalog, cw_project_list, cw_project_status, cw_purchase_approvals, cw_purchasing_status, cw_query, cw_report, cw_sales_orders, cw_schedule_entries, cw_service_tickets, cw_ticket_detail, cw_time_entries

Bold: changes data (by its name).
