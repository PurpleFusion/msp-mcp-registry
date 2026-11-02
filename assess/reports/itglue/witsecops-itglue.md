# Assessment: @wit-secops/itglue-mcp (`witsecops-itglue`)

| | |
|---|---|
| Maintainer | WIT-SecOps |
| Source | https://www.npmjs.com/package/@wit-secops/itglue-mcp |
| Assessed at | version `1.11.0` (sha512-mSGkEa7pJ7I4/51SdZKE/gqwEBQET14PeOcOOJH5CszkzpAdgvFhbBHrta1Fj7/F49IR9tA5nAClqjjwMtSkKg==) |
| Date | 2026-11-02 |
| Score | **79/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ✅ | 0 git tags, 13 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-30 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ | 3 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 4 reads |
| C2 | Credentials never logged | ✅ (script: flag) | dist/index.js:118 console.error("Warning: --api-key is visible in process listings; prefer the ITGLUE_API_KEY environment variable."); |
| C3 | Nothing written to disk | ❌ (script: flag) | dist/services/index/store.js:18 await fs.writeFile(tmp, payload, { mode: 0o600 }); |
| C4 | Runs locally (stdio) | ✅ | dist/index.js:5 |
| T1 | Tool list readable | ✅ | 30 tools found |
| T2 | Read-only possible | ✅ | read-only switch: dist/index.js:78 |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ | dist/index.js:145 function createServer(config) { \| dist/index.js:180 const server = createServer(config); |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Passwords:** no password tools.
- **N2:** both hits are `isEntryPoint` ("sentry" inside the name). No telemetry.
- **C2:** the flagged line warns that `--api-key` shows in process listings; it doesn't print the key.
- **C3 (confirmed):** `itglue_index_documents`, available by default, builds a keyword index of document and configuration content and saves it as gzip JSON (owner-only) under `ITGLUE_CACHE_DIR`, `%LOCALAPPDATA%` or `$XDG_CACHE_HOME` (`dist/services/index/store.js:6-18`).
- Read-only by default; writes need `--read-write` or `ITGLUE_ALLOW_WRITE` (`dist/index.js:136-137`).
- Published to npm only. The repository it names (`WIT-SecOps/itglue-mcp`) isn't public, so what's in the package can't be compared with source (P2), and there's no lockfile.

## Tools (30, read from source)

**itglue_create_configuration**, **itglue_create_configuration_interface**, **itglue_create_contact**, **itglue_create_document**, **itglue_create_document_section**, **itglue_create_flexible_asset**, **itglue_create_related_items**, **itglue_delete_configurations**, **itglue_delete_contacts**, **itglue_delete_document_section**, **itglue_delete_documents**, **itglue_delete_flexible_assets**, **itglue_delete_related_items**, itglue_get_document, itglue_get_document_section, itglue_index_documents, itglue_index_status, itglue_list_document_sections, itglue_list_documents, itglue_list_related_items, itglue_publish_document, itglue_search_documents, **itglue_update_configuration**, **itglue_update_configuration_interface**, **itglue_update_contact**, **itglue_update_document**, **itglue_update_document_section**, **itglue_update_flexible_asset**, **itglue_update_flexible_assets**, **itglue_update_related_item**

Bold: changes data (by its name).
