# Assessment: itglue-mcp (MSPbots) (`mspbots-itglue`)

| | |
|---|---|
| Maintainer | MSPbots AI Framework |
| Source | https://github.com/MSPbotsAIFramework/itglue-mcp |
| Assessed at | `main` — commit `abf9dd779c984d29f16887f69d34025565e4891d` |
| Date | 2026-11-02 |
| Score | **80/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | Apache-2.0 |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-31 |
| P5 | More than one contributor | ✅ | 4 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | uv.lock |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | certifi@2026.7.22: GHSA-6q48-6c7w-9gw2, certifi@2026.7.22: PYSEC-2026-4320 |
| S4 | 30 or fewer direct dependencies | ✅ | 5 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ❌ (script: unknown) | no environment reads found |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ❌ (script: pass) | src/itglue_mcp/__main__.py:18 |
| T1 | Tool list readable | ✅ | 40 tools found |
| T2 | Read-only possible | ✅ | 17 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ (script: flag) | src/itglue_mcp/config.py:29 mcp_http_host: str = "0.0.0.0" |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Passwords:** `get_password` returns the secret by default (`show_password` defaults to true, `src/itglue_mcp/tools/passwords.py:98-104`). No setting removes the password tools. `search_passwords` and the write tools drop `password` and `otp_secret` from what they return (`SECRET_FIELDS`, :30), and secrets passed to writes are masked from error text.
- **C1, C4 (confirmed):** built for the MSPbots gateway. The IT Glue key is read only from each request's `X-ITGlue-API-Key` header (`src/itglue_mcp/credentials.py`). stdio exists for "local debugging only", where every tool reports not_configured (`src/itglue_mcp/__main__.py:16-19`), so it can't be run locally with your own key.
- **D1:** the default is HTTP on 0.0.0.0:8080 (`src/itglue_mcp/config.py:28-30`), but every request must carry its own IT Glue key; there is no stored credential to borrow. DNS-rebinding protection is turned off (`src/itglue_mcp/server.py:51`).
- **T2:** the "read-only switch" hit is the `readOnlyHint` annotation. There is no read-only switch, but every write tool starts with a verb (`create_`, `update_`, `delete_`, `archive_`, `unarchive_`, `publish_`).
- No tags or releases.
- **S3:** `certifi` 2026.7.22 in `uv.lock` has advisories.

## Tools (40, read from source)

**archive_configuration**, **archive_document**, **create_attachment**, **create_document**, **create_document_section**, **create_flexible_asset**, **create_location**, **create_password**, **delete_attachment**, **delete_document**, **delete_document_section**, get_configuration, get_document, get_flexible_asset, get_flexible_asset_type, get_location, get_organization, get_password, **itglue_create_flexible_asset_type**, itglue_health_check, itglue_list_account_users, list_attachments, list_document_folders, list_document_sections, list_flexible_asset_types, publish_document, search_configurations, search_documents, search_flexible_assets, search_locations, search_organizations, search_passwords, search_user_metrics, unarchive_configuration, unarchive_document, **update_document**, **update_document_section**, **update_flexible_asset**, **update_location**, **update_password**

Bold: changes data (by its name).
