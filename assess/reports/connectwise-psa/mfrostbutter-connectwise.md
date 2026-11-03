# Assessment: connectwise-mcp (PyPI) (`mfrostbutter-connectwise`)

| | |
|---|---|
| Maintainer | Mfrostbutter |
| Source | https://github.com/Mfrostbutter/connectwise-mcp |
| Assessed at | `main` — commit `15d3794c703bfdc613466abf601071a8170c5f90` |
| Date | 2026-11-02 |
| Score | **50/100** — capped: open to the network without authentication by default (max 50) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ❔ (script: pass) | installed from a pinned commit |
| P3 | Versioned releases | ✅ (script: fail) | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-06-21 |
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
| C1 | Credentials from environment | ✅ | 7 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | server.py:2197 |
| T1 | Tool list readable | ✅ | 45 tools found |
| T2 | Read-only possible | ✅ | 12 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ❌ (open by default) (script: flag) | server.py:2201 mcp.run(transport="http", host="0.0.0.0", port=port) |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **P2, P3:** published to PyPI as `connectwise-mcp` 0.1.0 (the script checks npm only). The PyPI release isn't checked here for a provenance attestation.
- **D1 (confirmed):** the default transport is HTTP on all interfaces, port 8085 (`server.py:2201`). Authentication applies only if `MCP_AUTH_TOKEN` is set, so with the defaults anyone who can reach that port on your network uses your ConnectWise API keys. Set `MCP_TRANSPORT=stdio`, which is how Tabby9 would run it.
- Single maintainer, one release (0.1.0), no git tags, no lockfile.

## Tools (45, read from source)

**add_agreement_addition**, **add_project_note**, **add_project_phase**, **add_ticket_note**, **create_agreement**, **create_opportunity**, **create_project**, **create_ticket**, get_aging_invoices, get_agreement, get_agreement_additions, get_agreement_count_by_type, get_agreement_types, get_agreements, get_board_statuses, get_boards, get_client_mrr, get_company, get_company_statuses, get_company_types, get_configuration, get_configuration_statuses, get_configurations, get_contacts, get_invoice, get_invoices, get_members, get_open_tickets, get_opportunities, get_priorities, get_project_statuses, get_project_tickets, get_projects, get_ticket, get_ticket_count, get_ticket_time, get_time_entries, get_work_types, **log_time**, search_companies, search_cw_kb_articles, search_tickets, **update_agreement**, **update_project**, **update_ticket_status**

Bold: changes data (by its name).
