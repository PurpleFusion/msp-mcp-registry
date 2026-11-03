# Assessment: haloitsm-mcp (`alexthorne-haloitsm`)

| | |
|---|---|
| Maintainer | alex-thorne |
| Source | https://github.com/alex-thorne/haloitsm-mcp |
| Assessed at | `main` — commit `eae5e885e9eb7009203b9c4e888fd6d120a3ea8d` |
| Date | 2026-11-02 |
| Score | **79/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-08-05 |
| P5 | More than one contributor | ✅ | 2 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | uv.lock |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | anyio@4.14.1: GHSA-3w57-8xmc-8v26, anyio@4.14.1: GHSA-5p39-cfhj-2xmp, anyio@4.14.1: GHSA-82r6-8w77-94w6, anyio@4.14.1: PYSEC-2026-4023, anyio@4.14.1: PYSEC-2026-4024, anyio@4.14.1: PYSEC-2026-4025, authlib@1.7.2: GHSA-6v38-4h7w-rj9h, authlib@1.7.2: GHSA-7vr2-2fgp-9w7p, authlib@1.7.2: GHSA-8m4g-j4wp-wgcg, authlib@1.7.2: GHSA-c5mf-xmp2-59rc, authlib@1.7.2: GHSA-c73q-w75p-j82v, authlib@1.7.2: GHSA-fch4-3c6x-j4gc (+53 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 4 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ❔ | no environment reads found |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ❌ | no local stdio transport found |
| T1 | Tool list readable | ✅ | 49 tools found |
| T2 | Read-only possible | ✅ | read-only switch: src/halo_mcp/server.py:4 |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Not scored:** the repo contains two symbolic links (`CLAUDE.md`, `.github/copilot-instructions.md`), which Windows `tar` can't extract, so the script stopped before any check ran. Read by hand at commit `eae5e885e9eb7009203b9c4e888fd6d120a3ea8d`:
- Written for HaloITSM, which uses the same API as HaloPSA. Stdio only (`src/halo_mcp/server.py:89`); settings come from `HALO_*` environment variables (`config.py:31`).
- Read-only by default: write tools (`create_ticket`, `update_ticket`, `bulk_assign`, …) are loaded only when `HALO_ENABLE_WRITES` is set (`server.py:74-78`), and each write asks for confirmation.
- The only host in the code is the configured `HALO_API_URL`; logs go to stderr with no tokens, secrets or bodies (`observability.py:1-7`). No telemetry, no disk writes, no shell.
- Dependencies locked in `uv.lock`; 4 direct dependencies. No tags or releases.
- **No licence** file or licence field, so no right to use is granted (that would cap the score at 60).

## Tools (49, read from source)

**add_action**, **assign_ticket**, **bulk_assign**, **bulk_set_status**, **create_asset**, **create_site**, **create_ticket**, get_agent, get_appointment, get_asset, get_invoice, get_item, get_opportunity, get_project, get_site, get_supplier, get_ticket, list_agents, list_appointments, list_assets, list_attachments, list_categories, list_clients, list_invoices, list_items, list_opportunities, list_overdue_tickets, list_priorities, list_projects, list_reports, list_sites, list_slas, list_statuses, list_suppliers, list_teams, list_ticket_actions, list_ticket_types, list_tickets, list_users, search_tickets, **set_ticket_priority**, **set_ticket_status**, summarise_tickets, **update_asset**, **update_client**, **update_site**, **update_ticket**, **update_user**, whoami

Bold: changes data (by its name).
