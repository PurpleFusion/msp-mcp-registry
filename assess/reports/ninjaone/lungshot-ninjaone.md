# Assessment: NinjaOneMCP (`lungshot-ninjaone`)

| | |
|---|---|
| Maintainer | Lungshot |
| Source | https://github.com/Lungshot/NinjaOneMCP |
| Assessed at | `v1.3.0` — commit `53f0946115a2bb0ad8e9bcaec8130c31e1d8ee3b` |
| Date | 2026-11-02 |
| Score | **89/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ✅ | 11 git tags, 11 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-08-25 |
| P5 | More than one contributor | ✅ | 4 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @modelcontextprotocol/sdk@1.17.1: GHSA-345p-7cg4-v4c7, @modelcontextprotocol/sdk@1.17.1: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.17.1: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.17.1: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.17.1: GHSA-8r9q-7v3j-jr4g, @modelcontextprotocol/sdk@1.17.1: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.17.1: GHSA-rvq5-wwqv-78pq, @modelcontextprotocol/sdk@1.17.1: GHSA-w48q-cv73-mx4w, body-parser@2.2.0: GHSA-27r3-jxmh-p828, body-parser@2.2.0: GHSA-v422-hmwv-36x6, body-parser@2.2.0: GHSA-wqch-xfxh-vrr4, qs@6.14.0: GHSA-4mjr-xmp4-gh2g (+17 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 4 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 18 reads |
| C2 | Credentials never logged | ✅ (script: flag) | server/ninja-api.js:97 logger.info(`OAuth token acquired successfully (region: ${candidate})`); \| server/ninja-api.js:110 logger.info('OAuth token acquired successfully'); \| src/ninja-api.ts:84 console.error(`OAuth token acquired successfully (region: ${candidate})`); \| src/ninja-api.ts:96 console.error('OAuth token acquired successfully'); |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | server/index.js:4 |
| T1 | Tool list readable | ✅ | 72 tools found |
| T2 | Read-only possible | ✅ | 22 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ (script: flag) | src/transport/http.ts:102 const server = app.listen(port, () => { \| src/transport/http.ts:179 const server = app.listen(port, () => { |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **C2:** the flagged lines log fixed "token acquired" messages, not the token.
- **T2:** there is no read-only switch (the script's hit is a TypeScript `readonly` field modifier, `src/ninja-api.ts:24`), but every write tool starts with a verb a deny rule can match (`reboot_device`, `control_windows_service`, `apply_device_os_patches`, `create_organization`, ...). It has no script-run tool.
- **D1:** the optional HTTP and SSE modes listen on all interfaces without authentication and with `CORS_ORIGIN` defaulting to `*` (`src/transport/http.ts:19,102,179`), but they expose only health, info, a fixed tool list and a heartbeat; no tool can be called over them. Default transport is stdio (`src/index.ts:1288`).
- **P2:** the npm package `ninjaone-mcp-server` (1.2.13, November 2025) lags the GitHub release assessed here (v1.3.0) and has no provenance attestation. The repo also checks in a prebuilt Claude Desktop bundle (`ninjaone-rmm.mcpb`, 18 MB) and a separate JavaScript build under `server/`, which can't be compared with `src/`.
- **S3:** the lockfile pins `@modelcontextprotocol/sdk` 1.17.1, `body-parser`, `qs` and others with published advisories.
- A copy of this repo with a few extra commits exists at `Astec-IT-Consultancy/NinjaOneMCP`; it was not assessed separately.

## Tools (72, read from source)

**add_role_members**, **apply_device_os_patches**, **apply_device_software_patches**, **approve_devices**, **configure_windows_service**, **control_windows_service**, **create_contact**, **create_end_user**, **create_location**, **create_organization**, **delete_contact**, **delete_end_user**, find_windows11_devices, generate_organization_installer, get_alert, get_alerts, get_contact, get_contacts, get_device, get_device_activities, get_device_alerts, get_device_dashboard_url, get_device_policy_overrides, get_device_software, get_devices, get_end_user, get_end_users, get_organization, get_organization_locations, get_organization_policies, get_organizations, get_policies, get_technician, get_technicians, list_regions, query_antivirus_status, query_antivirus_threats, query_backup_usage, query_computer_systems, query_custom_fields, query_custom_fields_detailed, query_device_health, query_disks, query_logged_on_users, query_network_interfaces, query_operating_systems, query_os_patch_installs, query_os_patches, query_policy_overrides, query_processors, query_raid_controllers, query_raid_drives, query_scoped_custom_fields, query_scoped_custom_fields_detailed, query_software, query_software_patch_installs, query_software_patches, query_volumes, query_windows_services, **reboot_device**, **remove_role_members**, **reset_alert**, **reset_device_policy_overrides**, scan_device_os_patches, scan_device_software_patches, search_devices_by_name, **set_device_maintenance**, **set_region**, **update_contact**, **update_end_user**, **update_location**, **update_organization**

Bold: changes data (by its name).
