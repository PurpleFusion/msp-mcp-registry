# Assessment: @wellforce/ninjaone-mcp (npm) (`wellforce-ninjaone`)

| | |
|---|---|
| Maintainer | wellforce |
| Source | https://www.npmjs.com/package/@wellforce/ninjaone-mcp |
| Assessed at | version `1.0.2` (sha512-5VX3ab58ZjhuLMa+SAwwUn1S3wbnLXq8f3eH79cZ1Pax6W+oo4VrKwKb/DrWnADUdUcWCcyGG8sx/9LaCx4qZQ==) |
| Date | 2026-11-02 |
| Score | **76/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ✅ | 0 git tags, 2 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-03-11 |
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
| C2 | Credentials never logged | ✅ (script: flag) | dist/index.js:15 console.error('Set NINJAONE_CLIENT_ID and NINJAONE_CLIENT_SECRET in the "env" block of your claude_desktop_config.json.'); |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | dist/index.js:3 |
| T1 | Tool list readable | ✅ | 77 tools found |
| T2 | Read-only possible | ✅ | 23 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ❌ | ninjaone_api_call |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **T3 (confirmed):** `ninjaone_api_call` sends any method (GET to DELETE) to any API path (`dist/tools/api.js:4-12`). The default OAuth scope is `monitoring management` (`dist/config.js:22`), so writes through it are allowed by default.
- **T2:** the script counted `ninjaone_get_ticket_log_entries` as a write ("log" is on its verb list); every named write tool starts with a verb. There is no read-only switch.
- **C2:** the flagged line tells you which variables to set, without values.
- Also has `ninjaone_run_script`, `ninjaone_reboot_device` and `ninjaone_set_webhook` (registers a URL NinjaOne pushes events to) with no confirmation step (`dist/tools/jobs.js:42`, `dist/tools/devices.js:64`, `dist/tools/webhooks.js:4`).
- Published to npm only (1.0.2, March 2026); the repository it names (`Support-Forge/MCP`) isn't public, so the package can't be compared with source.

## Tools (77, read from source)

**ninjaone_add_role_members**, **ninjaone_add_ticket_comment**, ninjaone_api_call, **ninjaone_apply_os_patches**, **ninjaone_apply_software_patches**, **ninjaone_approve_devices**, **ninjaone_cancel_maintenance**, **ninjaone_configure_windows_service**, **ninjaone_control_windows_service**, **ninjaone_create_contact**, **ninjaone_create_maintenance_window**, **ninjaone_create_ticket**, **ninjaone_delete_contact**, **ninjaone_delete_webhook**, ninjaone_generate_installer, ninjaone_get_alerts_summary, ninjaone_get_contact, ninjaone_get_device, ninjaone_get_device_activities, ninjaone_get_device_alerts, ninjaone_get_device_custom_fields, ninjaone_get_device_dashboard_url, ninjaone_get_device_jobs, ninjaone_get_device_last_user, ninjaone_get_device_policy_overrides, ninjaone_get_device_software, ninjaone_get_end_user, ninjaone_get_group_devices, ninjaone_get_organization, ninjaone_get_organization_devices, ninjaone_get_organization_locations, ninjaone_get_organization_policies, ninjaone_get_technician, ninjaone_get_ticket_log_entries, ninjaone_get_windows_services, ninjaone_list_alert_conditions, ninjaone_list_alerts, ninjaone_list_board_tickets, ninjaone_list_contacts, ninjaone_list_devices, ninjaone_list_end_users, ninjaone_list_jobs, ninjaone_list_organizations, ninjaone_list_policies, ninjaone_list_technicians, ninjaone_query_antivirus_status, ninjaone_query_antivirus_threats, ninjaone_query_backup_usage, ninjaone_query_computer_systems, ninjaone_query_custom_fields, ninjaone_query_device_health, ninjaone_query_disks, ninjaone_query_logged_on_users, ninjaone_query_network_interfaces, ninjaone_query_operating_systems, ninjaone_query_os_patches, ninjaone_query_processors, ninjaone_query_raid_controllers, ninjaone_query_raid_drives, ninjaone_query_software, ninjaone_query_software_patches, ninjaone_query_volumes, ninjaone_query_windows_services, **ninjaone_reboot_device**, **ninjaone_remove_role_members**, **ninjaone_reset_alert**, **ninjaone_reset_device_policy_overrides**, **ninjaone_run_script**, ninjaone_scan_os_patches, ninjaone_scan_software_patches, ninjaone_search, ninjaone_search_devices, **ninjaone_set_device_maintenance**, **ninjaone_set_webhook**, **ninjaone_update_contact**, **ninjaone_update_device_custom_fields**, **ninjaone_update_ticket**

Bold: changes data (by its name).
