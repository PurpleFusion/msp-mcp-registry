# Assessment: mcp-itglue (`mspstack-itglue`)

| | |
|---|---|
| Maintainer | mspstack |
| Source | https://github.com/mspstack/mcp-itglue |
| Assessed at | `v0.6.0` — commit `05304bfdcfe998b8e9795b34336c2bf563772420` |
| Date | 2026-11-02 |
| Score | **83/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | npm provenance (https://slsa.dev/provenance/v1) |
| P3 | Versioned releases | ✅ | 13 git tags, 11 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-09-16 |
| P5 | More than one contributor | ✅ | 2 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @azure/msal-node@6.0.1: GHSA-xcx6-jx8p-x3h5, @hono/node-server@1.19.14: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.14: GHSA-rmxm-3fg6-px4f, @modelcontextprotocol/sdk@1.29.0: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.29.0: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.29.0: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.29.0: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.29.0: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.29.0: GHSA-rvq5-wwqv-78pq, body-parser@2.3.0: GHSA-27r3-jxmh-p828, fast-uri@3.1.3: GHSA-333x-w4r6-6crp, fast-uri@3.1.3: GHSA-5jgf-p345-68v8 (+32 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 6 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 3 reads |
| C2 | Credentials never logged | ✅ (script: flag) | src/index.ts:50 console.error(`[auth] ${entries.length} token(s) configured: ${byRole}`); |
| C3 | Nothing written to disk | ✅ (script: flag) | src/vector/store.ts:6 import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"; \| src/vector/store.ts:71 writeFileSync(this.path, JSON.stringify(this.entries), "utf-8"); |
| C4 | Runs locally (stdio) | ✅ | src/config.ts:53 |
| T1 | Tool list readable | ✅ | 33 tools found |
| T2 | Read-only possible | ❌ | 14 write tools; 1 don't start with a verb: itglue_request_upload |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ (script: flag) | src/tools/document-images.ts:106 "(1) INLINE — omit gallery_id; the result carries inline_resource_url, a relative path you must use " + |
| D1 | HTTP mode safe | ❌ (script: flag) | src/index.ts:92 app.listen(config.port, "0.0.0.0", () => resolve()); |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Passwords:** no password tools. `itglue_get` (a GET to any endpoint) refuses any path with a `passwords` segment and any `show_password` parameter (`src/tools/advanced.ts:41-50,161-165`).
- **C2:** the flagged line logs token labels and roles, not token values.
- **C3:** writes to disk only for the opt-in semantic search. With `OPENAI_API_KEY` or Azure OpenAI configured, `itglue_build_vector_index` stores document titles, plain text and embeddings in `./vector-index.json` (`src/vector/store.ts:71`), and document text is sent to OpenAI or Azure OpenAI to be embedded (`src/vector/embeddings.ts:55`). Without those settings the vector tools are off.
- **T4:** "a relative path you must use" explains the inline image URL format.
- **D1:** the default is stdio. In HTTP mode it listens on 0.0.0.0 (`src/index.ts:92`) and, with no `MCP_TOKENS_*` set, accepts every request with full admin rights on the server's IT Glue key; it logs a warning and starts. Opt-in, so it fails D1 without the open-by-default cap.
- **T3:** `itglue_get` sends any request, but GET only, so it can't change data.
- Published to npm with a provenance attestation.
- **S3:** the shipped lockfile pins versions with advisories, including `@modelcontextprotocol/sdk` 1.29.0, `@hono/node-server` and `@azure/msal-node`.

## Tools (33, read from source)

itglue_build_vector_index, **itglue_create_attachment**, **itglue_create_document**, **itglue_create_document_image**, **itglue_create_document_section**, **itglue_create_flexible_asset**, **itglue_delete_attachment**, **itglue_delete_document_image**, **itglue_delete_document_section**, **itglue_delete_documents**, **itglue_delete_flexible_asset**, itglue_find_endpoint, itglue_get, itglue_get_document, itglue_get_document_image, itglue_get_document_section, itglue_get_flexible_asset, itglue_get_flexible_asset_type, itglue_get_organization, itglue_list_attachments, itglue_list_document_folders, itglue_list_document_sections, itglue_list_documents, itglue_list_flexible_asset_types, itglue_list_flexible_assets, itglue_list_organizations, itglue_publish_document, **itglue_request_upload**, **itglue_update_document**, **itglue_update_document_section**, **itglue_update_flexible_asset**, itglue_vector_index_status, itglue_vector_search

Bold: changes data (by its name).
