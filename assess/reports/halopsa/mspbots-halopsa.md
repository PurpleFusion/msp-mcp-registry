# Assessment: halopsa-mcp (`mspbots-halopsa`)

| | |
|---|---|
| Maintainer | MSPbots |
| Source | https://github.com/MSPbotsAIFramework/halopsa-mcp |
| Assessed at | `main` — commit `e56b427ac8e5a76dbc039b6106f4e4c6ba238757` |
| Date | 2026-11-02 |
| Score | **80/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | Apache-2.0 |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-11-01 |
| P5 | More than one contributor | ✅ | 2 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | uv.lock |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ✅ | 40 locked packages, none with known vulnerabilities |
| S4 | 30 or fewer direct dependencies | ✅ | 5 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ❌ (script: unknown) | no environment reads found |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ❌ (script: pass) | src/halopsa_mcp/__main__.py:18 |
| T1 | Tool list readable | ✅ | 29 tools found |
| T2 | Read-only possible | ❌ | 7 write tools; 7 don't start with a verb: halopsa_clients_create, halopsa_tickets_add_action, halopsa_tickets_add_attachment, halopsa_tickets_create, halopsa_tickets_update, halopsa_users_create, halopsa_users_update |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ (script: flag) | src/halopsa_mcp/config.py:26 mcp_http_host: str = "0.0.0.0" |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **C1, C4 (confirmed):** built to run behind MSPbots' hosted gateway (connect.mspbots.ai), which stores each tenant's HaloPSA credentials and sends them as request headers on every call (`src/halopsa_mcp/config.py:9-12`). It reads no credentials from the environment. Its stdio mode exists for debugging only: with no headers, every tool reports `not_configured` (`__main__.py:15-18`; HTTP is the default, `config.py:25`).
- **D1:** HTTP on `0.0.0.0:8080` by default (`config.py:26`) without its own authentication, but every call must carry the caller's own HaloPSA client ID and secret, so there's no shared credential to borrow. The base-URL header must be https (`credentials.py:100`).
- **T2 (confirmed):** the script's "read-only switch" is a `readOnlyHint` annotation (`tools/_common.py:23`). There is no read-only setting, and write tools put the verb third (`halopsa_tickets_create`, `halopsa_users_update`). The gateway offers a per-tool allowlist, but that's MSPbots' hosted service, not this code.
- No tags or releases.

## Tools (29, read from source)

halopsa_agents_get, halopsa_agents_list, halopsa_assets_get, halopsa_assets_list, halopsa_assets_list_types, halopsa_assets_search, **halopsa_clients_create**, halopsa_clients_get, halopsa_clients_list, halopsa_clients_search, halopsa_invoices_get, halopsa_invoices_list, halopsa_lookups_get, halopsa_navigate, halopsa_sites_list, halopsa_sla_get, halopsa_status, halopsa_teams_list, **halopsa_tickets_add_action**, **halopsa_tickets_add_attachment**, **halopsa_tickets_create**, halopsa_tickets_get, halopsa_tickets_list, halopsa_tickets_list_actions, **halopsa_tickets_update**, **halopsa_users_create**, halopsa_users_get, halopsa_users_search, **halopsa_users_update**

Bold: changes data (by its name).
