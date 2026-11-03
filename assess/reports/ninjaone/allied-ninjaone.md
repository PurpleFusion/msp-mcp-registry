# Assessment: ninjaone-mcp (`allied-ninjaone`)

| | |
|---|---|
| Maintainer | Allied Business Solutions |
| Source | https://github.com/Allied-Business-Solutions/ninjaone-mcp |
| Assessed at | `master` — commit `a734ddb5ee7e34857e0fc49db3f5f1547deedbcc` |
| Date | 2026-11-02 |
| Score | **60/100** — capped: no commercial-use licence (max 60) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ❌ | no licence |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-05-15 |
| P5 | More than one contributor | ❌ | 0 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.14: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.14: GHSA-rmxm-3fg6-px4f, @modelcontextprotocol/sdk@1.29.0: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.29.0: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.29.0: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.29.0: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.29.0: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.29.0: GHSA-rvq5-wwqv-78pq, axios@1.16.1: GHSA-3pq3-5fj3-cg6v, axios@1.16.1: GHSA-42h9-826w-cgv3, axios@1.16.1: GHSA-44g4-m2mj-wpvx, axios@1.16.1: GHSA-4hqw-qxg8-jxx2 (+69 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 2 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 1 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | src/index.ts:3 |
| T1 | Tool list readable | ✅ | 78 tools found |
| T2 | Read-only possible | ✅ | 18 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **T2:** the script counted `ninja_get_ticket_log` as a write ("log" is on its verb list); every real write tool starts with a verb (`ninja_run_script`, `ninja_reboot_device`, `ninja_update_device`, ...). There is no read-only switch.
- **Webhooks:** `ninja_configure_webhook` registers a URL that NinjaOne will push events to (`src/tools/system.ts:88`), so data can be sent to any host through NinjaOne itself.
- Also has `ninja_run_script` and `ninja_reboot_device` (`src/tools/devices.ts:379,400`) with no confirmation step.
- No licence (caps the score). Two commits, May 2026.

## Tools (78, read from source)

**ninja_add_ticket_comment**, **ninja_approve_devices**, **ninja_configure_webhook**, **ninja_create_organization**, **ninja_create_organization_location**, **ninja_create_ticket**, **ninja_disable_webhook**, ninja_get_backup_jobs, ninja_get_device, ninja_get_device_active_jobs, ninja_get_device_activities, ninja_get_device_alerts, ninja_get_device_custom_fields, ninja_get_device_dashboard_url, ninja_get_device_disks, ninja_get_device_installed_os_patches, ninja_get_device_installed_software_patches, ninja_get_device_last_logged_on_user, ninja_get_device_network_interfaces, ninja_get_device_os_patches, ninja_get_device_policy_overrides, ninja_get_device_processors, ninja_get_device_scripting_options, ninja_get_device_software, ninja_get_device_software_patches, ninja_get_device_volumes, ninja_get_device_windows_services, ninja_get_devices_detailed, ninja_get_end_user, ninja_get_group_device_ids, ninja_get_integrity_check_jobs, ninja_get_organization, ninja_get_organization_custom_fields, ninja_get_organization_devices, ninja_get_organization_end_users, ninja_get_organization_locations, ninja_get_organizations_detailed, ninja_get_technician, ninja_get_ticket, ninja_get_ticket_attributes, ninja_get_ticket_form, ninja_get_ticket_log, ninja_get_tickets_by_board, ninja_list_activities, ninja_list_alerts, ninja_list_automation_scripts, ninja_list_boards, ninja_list_contacts, ninja_list_custom_fields, ninja_list_devices, ninja_list_end_users, ninja_list_groups, ninja_list_locations, ninja_list_node_roles, ninja_list_notification_channels, ninja_list_organizations, ninja_list_policies, ninja_list_scheduled_tasks, ninja_list_software_products, ninja_list_technicians, ninja_list_ticket_forms, ninja_list_ticket_statuses, ninja_list_ticketing_users, ninja_list_user_roles, ninja_list_users, ninja_query_policy_overrides, **ninja_reboot_device**, **ninja_reset_alert**, **ninja_run_script**, ninja_search_devices, **ninja_submit_os_patch_apply**, **ninja_submit_os_patch_scan**, **ninja_submit_software_patch_apply**, **ninja_submit_software_patch_scan**, **ninja_update_device**, **ninja_update_device_custom_fields**, **ninja_update_organization**, **ninja_update_ticket**

Bold: changes data (by its name).
