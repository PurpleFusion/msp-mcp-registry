# Assessment: mcp-itglue (Python) (`jamesdeane2-itglue`)

| | |
|---|---|
| Maintainer | jamesdeane2 |
| Source | https://github.com/jamesdeane2/mcp-itglue |
| Assessed at | `main` — commit `b4e56ca8d288f3abced8b8d0c9e54249b95f2b3e` |
| Date | 2026-11-02 |
| Score | **85/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-19 |
| P5 | More than one contributor | ✅ | 3 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | uv.lock |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | certifi@2026.1.4: GHSA-6q48-6c7w-9gw2, certifi@2026.1.4: PYSEC-2026-4320 |
| S4 | 30 or fewer direct dependencies | ✅ | 0 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ (script: unknown) | no environment reads found |
| C2 | Credentials never logged | ✅ (script: flag) | capture_jwt_token.py:25 print("IT Glue JWT Token Capture") \| capture_jwt_token.py:31 print(f"\nExisting token found:") \| capture_jwt_token.py:37 print("Using existing token.") \| capture_jwt_token.py:49 print("Token captured successfully!") \| capture_jwt_token.py:50 print(f"  User: {token.email}") |
| C3 | Nothing written to disk | ❌ (script: flag) | src/mcp_itglue/jwt_auth.py:130 with open(TOKEN_CACHE_FILE, "w") as f: \| src/mcp_itglue/session_auth.py:92 with open(SESSION_CACHE_FILE, "w") as f: \| src/mcp_itglue/tools/output.py:83 with open(filepath, "w") as f: |
| C4 | Runs locally (stdio) | ✅ | src/mcp_itglue/server.py:91 |
| T1 | Tool list readable | ✅ | 105 tools found |
| T2 | Read-only possible | ✅ (script: fail) | 36 write tools; 1 don't start with a verb: session_browser_close |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Passwords:** `get_password` returns the value only with `show_password=true`, and then also returns the OTP secret (`otp-secret`) (`src/mcp_itglue/tools/passwords.py:36-40,119`). List and search never include values. No setting removes the tool; a deny rule on `get_password` does.
- **C1:** reads `ITGLUE_*` settings from the environment through pydantic settings (`env_prefix="ITGLUE_"`, `src/mcp_itglue/config.py:18`), which the pattern doesn't catch.
- **C2:** the flagged lines are in the helper scripts and print the user's email and token expiry; `capture_session.py:53` prints the first 20 characters of the captured XSRF token to the terminal. The server itself logs no secrets.
- **C3 (confirmed):** the optional browser sign-in (Playwright, for checklist tools the API lacks) saves the IT Glue JWT and session cookies under `~/.config/mcp-itglue/` with owner-only permissions (`src/mcp_itglue/jwt_auth.py:36,130`, `session_auth.py:35,92`). `save_to_file=true` on search tools writes results to `/tmp` (`src/mcp_itglue/tools/output.py:81-84`).
- **T2:** the one write tool the script couldn't match, `session_browser_close`, closes the local browser and doesn't change IT Glue data. All other write tools start with a verb. No read-only switch.
- The same code is also at `vanphu1511/mcp-itglue` (same author's commits); that copy wasn't assessed separately.
- **S3:** `certifi` 2026.1.4 in `uv.lock` has advisories.

## Tools (105, read from source)

**browser_close**, browser_keep_open, browser_status, **complete_checklist**, **complete_checklist_task_jwt**, **create_checklist_from_template_jwt**, **create_checklist_jwt**, **create_checklist_task_jwt**, **create_configuration**, **create_contact**, **create_document**, **create_document_jwt**, **create_flexible_asset**, **create_location**, **create_organization**, **create_password**, **create_related_item**, **delete_checklist_task_jwt**, **delete_checklists**, **delete_contact**, **delete_document**, **delete_flexible_asset**, **delete_location**, **delete_password**, **delete_related_items**, get_all_reference_data, get_checklist, get_checklist_template, get_configuration, get_configuration_relationships, get_contact, get_contact_relationships, get_document, get_document_folder, get_domain, get_flexible_asset, get_flexible_asset_relationships, get_flexible_asset_type, get_location, get_organization, get_organization_checklists, get_organization_documents, get_organization_domains, get_organization_flexible_assets, get_organization_locations, get_password, jwt_clear_token, jwt_token_status, list_checklist_templates, list_checklists, list_configuration_statuses, list_configuration_types, list_configurations, list_contact_types, list_contacts, list_countries, list_document_folders, list_documents, list_domains, list_expiring_domains, list_flexible_asset_fields, list_flexible_asset_types, list_flexible_assets, list_incomplete_checklists, list_locations, list_manufacturers, list_models, list_operating_systems, list_organization_statuses, list_organization_types, list_organizations, list_password_categories, list_passwords, list_regions, list_related_items, search_configurations, search_contacts, search_documents, search_domains, search_flexible_assets, search_locations, search_manufacturers, search_models, search_operating_systems, search_organizations, search_passwords, **session_browser_close**, session_browser_keep_open, session_browser_status, session_clear, session_status, uncomplete_checklist, uncomplete_checklist_task_jwt, **update_checklist**, **update_checklist_task_jwt**, **update_configuration**, **update_contact**, **update_document**, **update_document_jwt**, **update_flexible_asset**, **update_location**, **update_organization**, **update_password**, **update_related_item**, **upload_file_to_itglue**

Bold: changes data (by its name).
