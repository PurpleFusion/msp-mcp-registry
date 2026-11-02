# Assessment: itglue-docs-mcp (`johngilligan2-itglue-docs`)

| | |
|---|---|
| Maintainer | JohnGilligan2 |
| Source | https://github.com/JohnGilligan2/itglue-docs-mcp |
| Assessed at | `main` — commit `4a904dd787206a70cee0cc853716f95546ccc484` |
| Date | 2026-11-02 |
| Score | **60/100** — capped: no commercial-use licence (max 60) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ❌ | no licence |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-08-22 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | fastmcp@3.4.5: GHSA-7xgj-8392-5q4r |
| S4 | 30 or fewer direct dependencies | ✅ | 2 direct |
| N1 | Only the vendor's API | ✅ (script: fail) | login.microsoftonline.com (itglue_mcp/server.py:96) |
| N2 | No telemetry | ✅ (script: flag) | itglue_mcp/instrumentation.py:3, itglue_mcp/instrumentation.py:22, itglue_mcp/instrumentation.py:34, itglue_mcp/instrumentation.py:156, itglue_mcp/instrumentation.py:158 |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 22 reads |
| C2 | Credentials never logged | ✅ (script: flag) | itglue_mcp/instrumentation.py:315 logger.info("published identity: %d tools, ~%d schema tokens per request", |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ❌ (script: pass) | itglue_mcp/instrumentation.py:252 |
| T1 | Tool list readable | ✅ | 12 tools found |
| T2 | Read-only possible | ✅ | 0 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ (script: flag) | itglue_mcp/instrumentation.py:241 # gauge alone could never tell you. |
| D1 | HTTP mode safe | ✅ (script: flag) | itglue_mcp/config.py:163 host: str = "0.0.0.0" \| itglue_mcp/config.py:234 host=os.environ.get("MCP_HOST", "0.0.0.0"), |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Passwords:** never returned. The client is GET-only and refuses any query containing `show_password` (`itglue_mcp/client.py:22,49`); `itglue_find_credential` returns a pointer to the credential and an IT Glue link, never the password or its notes (`itglue_mcp/server.py:148`).
- **C4 (confirmed):** HTTP only (`mcp.run(transport="http")`, `itglue_mcp/server.py:1076`); the stdio pattern matched that call. It's built as a hosted container.
- **D1:** Entra sign-in is on by default (`MCP_AUTH_ENABLED` defaults to true and startup fails without the tenant and client settings, `itglue_mcp/config.py:174`); it can be switched off.
- **N1:** the Microsoft host is Entra sign-in, used to verify callers.
- **N2:** per-call metrics (tool name, status, the caller's username, response size) go to an OpenTelemetry collector you configure, and only when `OTEL_EXPORTER_OTLP_ENDPOINT` is set (`itglue_mcp/telemetry.py:304-318`). Nothing is sent to a third party by default.
- **C2, T4:** the flagged lines log a tool count and are a code comment.
- Read-only by design: no write tools. No licence (caps the score).

## Tools (12, read from source)

itglue_capabilities, itglue_documentation_health, itglue_expirations, itglue_find_configuration, itglue_find_credential, itglue_find_organization, itglue_get_document, itglue_health_check, itglue_list_contacts, itglue_list_locations, itglue_organization_brief, itglue_search_documents

Bold: changes data (by its name).
