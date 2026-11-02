# Assessment: @wilnertech/itglue-mcp-server (`wilnertech-itglue`)

| | |
|---|---|
| Maintainer | WilnerTech |
| Source | https://www.npmjs.com/package/@wilnertech/itglue-mcp-server |
| Assessed at | version `2.3.0` (sha512-AxUQgxGajnKUAXiJSjX+ZBHbbIDeAtRfVx7R8v/mvIXYa6ysiqRzuypURfienPOw3C9St0Qkxk8SxbBmfA/fkA==) |
| Date | 2026-11-02 |
| Score | **74/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ✅ | 0 git tags, 6 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-05-13 |
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
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | dist/index.js:10 |
| T1 | Tool list readable | ✅ | 32 tools found |
| T2 | Read-only possible | ❌ (script: pass) | 3 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ (script: flag) | dist/tools/documentation-standard.js:126 \| Link \| \`<a href="..." target="_blank">Link Text</a>\` \| All URLs. **Never use raw URLs.** Always use descriptive link text. \| |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Passwords:** `manage_itglue_passwords` with action `get` always asks for `show_password=true` (`dist/tools/passwords.js:70`). Action `get_credential` finds a password named `API - {Application} - {Qualifier}` in the organization named by `ITGLUE_CREDENTIAL_ORG` and returns its username, password and notes (`dist/tools/passwords.js:138-146`). No setting turns this off; denying the tool also removes password listing and create/update.
- **T2 (confirmed):** most tools are `manage_itglue_*` with an `action` argument that covers both reads and writes, so a deny rule can't separate them, and there is no read-only switch (it reads only the API key, base URL and credential org/folder from the environment). The script's hit is a `readOnly` field in lookup config.
- **T4:** the flagged line is HTML formatting guidance in its documentation standard.
- Published to npm only; the repository it names (`WilnerTech/itglue-mcp-server`) isn't public, so what's in the package can't be compared with source (P2). No lockfile; last published May 2026.

## Tools (32, read from source)

audit_itglue_document_against_standard, **bulk_create_itglue**, **bulk_delete_itglue**, **bulk_update_itglue**, get_itglue_batch, get_itglue_documentation_standard, itglue_deduplication, itglue_list_loaded_tools, itglue_load_tools, list_itglue_logs, list_itglue_reference_data, list_itglue_user_metrics, manage_itglue_attachments, manage_itglue_checklists, manage_itglue_compliant_document, manage_itglue_configuration_interfaces, manage_itglue_configurations, manage_itglue_contacts, manage_itglue_document_images, manage_itglue_document_sections, manage_itglue_documents, manage_itglue_exports, manage_itglue_flexible_asset_fields, manage_itglue_flexible_assets, manage_itglue_groups, manage_itglue_locations, manage_itglue_lookups, manage_itglue_organizations, manage_itglue_password_folders, manage_itglue_passwords, manage_itglue_related_items, manage_itglue_users

Bold: changes data (by its name).
