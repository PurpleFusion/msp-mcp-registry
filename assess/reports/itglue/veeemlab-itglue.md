# Assessment: @veeemlab/itglue-mcp (`veeemlab-itglue`)

| | |
|---|---|
| Maintainer | veeemlab |
| Source | https://github.com/veeemlab/itglue-mcp |
| Assessed at | `v0.5.3` — commit `1815b3e36fa898efe463b4fb737a649cdee74117` |
| Date | 2026-11-02 |
| Score | **84/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | npm provenance (https://slsa.dev/provenance/v1) |
| P3 | Versioned releases | ✅ | 12 git tags, 10 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-05-28 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ❌ | prepare: npm run build \|\| echo 'prepare: build skipped' |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.14: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.14: GHSA-rmxm-3fg6-px4f, @modelcontextprotocol/sdk@1.29.0: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.29.0: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.29.0: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.29.0: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.29.0: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.29.0: GHSA-rvq5-wwqv-78pq, body-parser@2.2.2: GHSA-27r3-jxmh-p828, body-parser@2.2.2: GHSA-v422-hmwv-36x6, fast-uri@3.1.2: GHSA-333x-w4r6-6crp, fast-uri@3.1.2: GHSA-4c8g-83qw-93j6 (+39 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 1 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 14 reads |
| C2 | Credentials never logged | ✅ (script: flag) | dist/index.js:31 console.error("[itglue-mcp] ITGLUE_TRANSPORT=http requires ITGLUE_HTTP_TOKEN " + |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | dist/index.js:3 |
| T1 | Tool list readable | ✅ | 56 tools found |
| T2 | Read-only possible | ✅ | read-only switch: dist/index.js:16 |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ (script: flag) | dist/tools/flexibleAssets.js:69 description: "Search flexible assets. You must supply filterFlexibleAssetTypeId — IT Glue requires it.", \| src/tools/flexibleAssets.ts:92 "Search flexible assets. You must supply filterFlexibleAssetTypeId — IT Glue requires it.", |
| D1 | HTTP mode safe | ✅ | dist/index.js:44 const httpServer = http.createServer((req, res) => { \| dist/index.js:73 httpServer.listen(port, host, () => { \| src/index.ts:60 const httpServer = http.createServer((req, res) => { \| src/index.ts:90 httpServer.listen(port, host, () => { |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Passwords:** the tool descriptions say the value is included only with `showPassword=true` plus `confirm: "SHOW_PASSWORD"`. But without them `itglue_get_password` sends no `show_password` parameter at all (`src/tools/passwords.ts:117-120`), and IT Glue's API returns the password on that endpoint by default, so the value comes back either way when the key has Password Access. The confirm string is an argument the model fills in itself. `ITGLUE_READ_ONLY=true` removes write tools only; password reads stay. Password responses are never cached (`src/cache.ts:77`; the cache is in memory), and error bodies are redacted (`src/redact.ts`).
- **C2:** the flagged line is the message that HTTP mode needs a token.
- **T4:** "You must supply filterFlexibleAssetTypeId" restates an IT Glue API requirement.
- **D1:** HTTP mode refuses to start without an `ITGLUE_HTTP_TOKEN` of 16+ characters and binds 127.0.0.1 by default (`src/index.ts:37-46`).
- **S2:** `prepare` runs a build when installed from git (the README's npx-from-GitHub route), not when installed from npm.
- **S3:** the lockfile pins `@modelcontextprotocol/sdk` 1.29.0, `@hono/node-server` and `body-parser` versions with advisories.

## Tools (56, read from source)

**itglue_bulk_delete**, **itglue_bulk_update**, **itglue_create_configuration**, **itglue_create_contact**, **itglue_create_document**, **itglue_create_document_section**, **itglue_create_flexible_asset**, **itglue_create_location**, **itglue_create_password**, **itglue_create_related_item**, **itglue_delete_attachment**, **itglue_delete_configuration**, **itglue_delete_contact**, **itglue_delete_document_section**, **itglue_delete_flexible_asset**, **itglue_delete_location**, **itglue_delete_password**, **itglue_delete_related_item**, itglue_find_config_match, itglue_find_contact_match, itglue_find_org_match, itglue_get_configuration, itglue_get_contact, itglue_get_document, itglue_get_flexible_asset, itglue_get_group, itglue_get_location, itglue_get_organization, itglue_get_password, itglue_get_user, itglue_health_check, itglue_list_attachments, itglue_list_configuration_statuses, itglue_list_configuration_types, itglue_list_document_sections, itglue_list_flexible_asset_fields, itglue_list_flexible_asset_types, itglue_list_groups, itglue_list_locations, itglue_list_password_categories, itglue_list_related_items, itglue_list_users, itglue_publish_document, itglue_scan_duplicates, itglue_search_configurations, itglue_search_contacts, itglue_search_documents, itglue_search_flexible_assets, itglue_search_organizations, itglue_search_passwords, **itglue_update_configuration**, **itglue_update_contact**, **itglue_update_document_section**, **itglue_update_flexible_asset**, **itglue_update_location**, **itglue_update_password**

Bold: changes data (by its name).
