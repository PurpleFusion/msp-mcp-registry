# Assessment: itglue-mcp (`wyre-itglue`)

| | |
|---|---|
| Maintainer | WYRE Technology |
| Source | https://github.com/WYRE-AI/itglue-mcp |
| Assessed at | `v1.20.2` — commit `b90ee178da1e95cdf748cf0794ba81c4636bc31f` |
| Date | 2026-11-02 |
| Score | **93/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | Apache-2.0 |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ✅ | 57 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-11-02 |
| P5 | More than one contributor | ✅ | 5 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.9: GHSA-92pp-h63x-v22m, @hono/node-server@1.19.9: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.9: GHSA-wc8c-qw6v-h7f6, @modelcontextprotocol/sdk@1.31.0: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.31.0: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.31.0: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.31.0: GHSA-rvq5-wwqv-78pq, ajv@8.17.1: GHSA-2g4f-4pwh-qvx6, body-parser@2.2.2: GHSA-27r3-jxmh-p828, body-parser@2.2.2: GHSA-v422-hmwv-36x6, express-rate-limit@8.2.1: GHSA-46wh-pxpv-q5gq, fast-uri@3.1.0: GHSA-333x-w4r6-6crp (+59 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 1 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 13 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | src/index.ts:24 |
| T1 | Tool list readable | ✅ | 36 tools found |
| T2 | Read-only possible | ✅ | 11 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ (script: flag) | src/mcp-server.ts:1849 description: "Publish an IT Glue document to make section changes visible. Always call this after creating, updating, or deleting sections.", |
| D1 | HTTP mode safe | ✅ (script: flag) | src/index.ts:120 return configured \|\| "0.0.0.0"; |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Passwords:** `get_password` returns the stored password by default (`show_password` defaults to true, `src/mcp-server.ts:2529`) as IT Glue's raw JSON. No setting turns the password tools off; a deny rule on `get_password` blocks it. `search_passwords` sends `show_password=false` and also strips any `password` field from the listing (`src/mcp-server.ts:2503`, `stripPasswordValues` at :749). No password value is logged or cached.
- **N2:** both hits are `neutralizeClosingTag(` in `src/utils/untrusted-content.ts`, which the telemetry pattern reads as `gtag(`. No telemetry.
- **T4:** "Always call this after creating, updating, or deleting sections" (`publish_document`) is guidance on how IT Glue's API works.
- **D1:** HTTP mode refuses to start without `CONDUIT_S2S_SECRET` and checks it on every `/mcp` request (`src/index.ts:100-125`); with no secret it runs only when `MCP_ALLOW_INSECURE_DEV=1`, and then only on 127.0.0.1.
- **T2:** the script's "read-only switch" is a match in generated HTML. There is no read-only switch, but every write tool starts with a verb (`create_`, `update_`, `delete_`, `archive_`, `publish_`), so deny rules can match them.
- **P2:** not published to npm (the `itglue-mcp` name there is unpublished); left unknown, as in the ConnectWise pilot.
- **S3:** the shipped lockfile pins versions with published advisories, including `@modelcontextprotocol/sdk` 1.31.0, `@hono/node-server`, `ajv` and `body-parser`.

## Tools (36, read from source)

**archive_configuration**, **archive_document**, **create_attachment**, **create_document**, **create_document_section**, **create_location**, **delete_document**, **delete_document_section**, doc-completeness, get_configuration, get_document, get_location, get_organization, get_password, itglue_health_check, list_attachments, list_document_folders, list_document_sections, list_flexible_asset_types, org_name, password-audit, publish_document, runbook-check, search_configurations, search_documents, search_flexible_assets, search_locations, search_organizations, search_passwords, search_user_metrics, system_name, unarchive_configuration, unarchive_document, **update_document**, **update_document_section**, **update_location**

Bold: changes data (by its name).
