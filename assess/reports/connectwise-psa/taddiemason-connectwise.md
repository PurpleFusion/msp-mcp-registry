# Assessment: Connectwise-MCP-Server (`taddiemason-connectwise`)

| | |
|---|---|
| Maintainer | taddiemason |
| Source | https://github.com/taddiemason/Connectwise-MCP-Server |
| Assessed at | `main` — commit `c0910076ef4a6976f7cbeda3dba51dfe90c4ae66` |
| Date | 2026-11-02 |
| Score | **86/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-30 |
| P5 | More than one contributor | ✅ | 2 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ | 2 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 15 reads |
| C2 | Credentials never logged | ✅ (script: flag) | connectwise_mcp.py:1537 "    python -c \"import secrets; print(secrets.token_urlsafe(32))\"\n" |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | connectwise_mcp.py:1552 |
| T1 | Tool list readable | ✅ | 51 tools found |
| T2 | Read-only possible | ✅ | 0 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ (script: flag) | connectwise_mcp.py:1546 uvicorn.run(build_http_app(), host="0.0.0.0", port=port, log_level="info") |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **C2:** the flagged line is help text showing how to generate a token.
- **D1:** HTTP mode refuses to start without `MCP_AUTH_TOKEN` and checks a bearer token on every request.
- Read-only by default: writes are off unless `CW_ENABLE_WRITES` names categories (`enabled_writes()`). Its write tools (e.g. `add_ticket_note`, `create_time_entry`) are registered behind that switch, which is why none were counted from the source.

## Tools (51, read from source)

connectwise_get_activities, connectwise_get_agreement_additions, connectwise_get_agreements, connectwise_get_billing_cycles, connectwise_get_board_statuses, connectwise_get_board_subtypes, connectwise_get_board_teams, connectwise_get_board_types, connectwise_get_companies, connectwise_get_company, connectwise_get_company_note_types, connectwise_get_company_notes, connectwise_get_company_sites, connectwise_get_company_statuses, connectwise_get_company_teams, connectwise_get_company_types, connectwise_get_configuration, connectwise_get_configuration_types, connectwise_get_configurations, connectwise_get_contact, connectwise_get_contact_notes, connectwise_get_contact_types, connectwise_get_contacts, connectwise_get_departments, connectwise_get_documents, connectwise_get_expense_entries, connectwise_get_invoices, connectwise_get_manufacturers, connectwise_get_members, connectwise_get_opportunities, connectwise_get_product_catalog, connectwise_get_product_types, connectwise_get_products, connectwise_get_project_phases, connectwise_get_project_team_members, connectwise_get_project_tickets, connectwise_get_projects, connectwise_get_purchase_order_line_items, connectwise_get_purchase_orders, connectwise_get_schedule_entries, connectwise_get_service_boards, connectwise_get_slas, connectwise_get_ticket, connectwise_get_ticket_configurations, connectwise_get_ticket_notes, connectwise_get_ticket_priorities, connectwise_get_ticket_schedules, connectwise_get_ticket_sources, connectwise_get_ticket_tasks, connectwise_get_tickets, connectwise_get_time_entries

Bold: changes data (by its name).
