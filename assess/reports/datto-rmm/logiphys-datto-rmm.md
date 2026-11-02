# Assessment: lgp-mcp-servers datto-rmm-mcp (`logiphys-datto-rmm`)

| | |
|---|---|
| Maintainer | Logiphys |
| Source | https://github.com/Logiphys/lgp-mcp-servers |
| Assessed at | `v1.3.1` — commit `7850bf4e2e7747224150c3b45950ff49f5ad4063` |
| Date | 2026-11-02 |
| Score | **98/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ✅ | 3 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-18 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ✅ | SECURITY.md |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | go.sum |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ✅ | 15 locked packages, none with known vulnerabilities |
| S4 | 30 or fewer direct dependencies | ✅ | 2 direct |
| N1 | Only the vendor's API | ✅ (script: fail) | webservices18.autotask.net (pkg/autotask/client.go:51), public-api.backup.net (pkg/dattobackup/client.go:25), login.backup.net (pkg/dattobackup/client.go:26), yourorg.infocyte.com (pkg/dattoedr/client.go:17), api.itglue.com (pkg/itglue/client.go:16), api.eu.itglue.com (pkg/itglue/client.go:17), api.au.itglue.com (pkg/itglue/client.go:18), logiphys.de (pkg/mcputil/serverinfo.go:37), reporting.live.myitprocess.com (pkg/myitprocess/client.go:36) |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 3 reads |
| C2 | Credentials never logged | ✅ (script: flag) | pkg/itglue/tools_metadata.go:103 logger.Error("itglue_list_password_categories failed", "error", err) \| pkg/itglue/tools_passwords.go:63 logger.Error("itglue_search_passwords failed", "error", err) \| pkg/itglue/tools_passwords.go:110 logger.Error("itglue_get_password failed", "id", id, "error", err) |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | cmd/autotask-mcp/main.go:38 |
| T1 | Tool list readable | ✅ | 231 tools found |
| T2 | Read-only possible | ✅ | 51 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Monorepo:** one Go module with separate servers for Autotask, IT Glue, Datto RMM, Datto Backup/EDR/Network and others; the whole repo was read because they share `go.sum`. The Datto RMM binary (`cmd/datto-rmm-mcp/main.go`) loads only `pkg/dattormm`, `pkg/config` and `pkg/mcputil`, and runs over stdio only.
- **N1:** the other hosts belong to the other servers. `pkg/dattormm/client.go:25-30` lists only the six `*-api.centrastage.net` hosts; `https://logiphys.de` is a text field in the server-info tool's output, not a request (`pkg/mcputil/serverinfo.go:37`).
- **C2:** the flagged lines (IT Glue server) log the tool name and error, not a secret.
- **T2:** the two names flagged (`get_activity_log`, `list_alerts_archive`) are reads in other servers. The Datto RMM server has no read-only switch, but all its write tools start with a verb.
- **Running jobs on devices:** `create_quick_job` runs a component on a device (`pkg/dattormm/tools_devices.go:185`), marked destructive, with no confirmation step or switch. Other writes include `move_device`, `update_site_proxy` and variable create/delete.
- `DATTO_BASE_URL` can replace the regional host.

## Tools (231, read from source)

**create_account_variable**, **create_company**, **create_company_note**, **create_contact**, **create_document**, **create_document_section**, **create_expense_item**, **create_expense_report**, **create_opportunity**, **create_phase**, **create_project**, **create_project_note**, **create_quick_job**, **create_quote**, **create_quote_item**, **create_service_call**, **create_service_call_ticket**, **create_service_call_ticket_resource**, **create_site**, **create_site_variable**, **create_task**, **create_ticket**, **create_ticket_charge**, **create_ticket_note**, **create_time_entry**, **delete_account_variable**, **delete_document**, **delete_document_section**, **delete_quote_item**, **delete_service_call**, **delete_service_call_ticket**, **delete_service_call_ticket_resource**, **delete_site_proxy**, **delete_site_variable**, **delete_ticket_charge**, **execute_tool**, get_account, get_activity_log, get_activity_logs, get_agent, get_agent_count, get_agent_version, get_alert, get_alert_count, get_billing_item, get_company_note, get_configuration, get_contact, get_dashboard, get_defender, get_device, get_device_applications, get_device_audit, get_device_audit_by_mac, get_device_by_id, get_device_by_mac, get_device_clients_overview, get_device_clients_usage, get_device_software, get_device_volume_assets, get_device_wan_usage, get_devices_overview, get_dnet_site_mappings, get_document, get_document_section, get_dtc_asset, get_dtc_storage_pool, get_esxi_audit, get_event_summary, get_expense_report, get_field_info, get_job, get_job_components, get_job_results, get_job_stderr, get_job_stdout, get_location, get_office, get_opportunity, get_organization, get_pagination_config, get_password, get_printer_audit, get_product, get_project_note, get_quote, get_quote_item, get_rate_limit, get_recommendation_configurations, get_reseller_overview, get_router, get_saas_applications, get_saas_seats, get_service, get_service_bundle, get_service_call, get_site, get_site_network_interfaces, get_site_settings, get_suppression_rule, get_system_status, get_ticket_attachment, get_ticket_charge, get_ticket_details, get_ticket_note, get_user_devices, get_whoami, health_check, isolate_host, list_account_variables, list_agents, list_alerts, list_alerts_archive, list_appliances, list_apps, list_assets, list_backups, list_categories, list_category_tools, list_clients, list_components, list_configuration_statuses, list_configuration_types, list_custom_filters, list_customers, list_default_filters, list_device_agents, list_device_alerts, list_device_assets, list_device_groups, list_device_open_alerts, list_device_resolved_alerts, list_device_shares, list_device_vm_restores, list_devices, list_document_sections, list_dtc_assets, list_dtc_client_assets, list_dtc_rmm_templates, list_endpoint_assets, list_entra_domains, list_events, list_expirations, list_extensions, list_findings, list_firewalls, list_flexible_asset_types, list_incidents, list_initiatives, list_locations, list_meetings, list_open_alerts, list_organizations, list_overdue_reviews, list_password_categories, list_phases, list_policies, list_quarantined_files, list_queues, list_recommendations, list_resolved_alerts, list_reviews, list_rules, list_saas_domains, list_site_devices, list_site_filters, list_site_open_alerts, list_site_resolved_alerts, list_site_variables, list_sites, list_spanning_domain_users, list_spanning_domains, list_suppression_rules, list_ticket_priorities, list_ticket_statuses, list_users, **move_device**, publish_document, **resolve_alert**, restore_host, router, scan_agent, search_billing_item_approval_levels, search_billing_items, search_companies, search_company_notes, search_configuration_interfaces, search_configuration_items, search_configurations, search_contacts, search_contracts, search_documents, search_domains, search_expense_reports, search_flexible_assets, search_invoices, search_locations, search_opportunities, search_organizations, search_passwords, search_products, search_project_notes, search_projects, search_quote_items, search_quotes, search_resources, search_service_bundles, search_service_call_ticket_resources, search_service_call_tickets, search_service_calls, search_services, search_tasks, search_ticket_attachments, search_ticket_charges, search_ticket_notes, search_tickets, search_time_entries, **set_device_udf**, **set_device_warranty**, test_connection, **update_account_variable**, **update_company**, **update_document**, **update_document_section**, **update_quote_item**, **update_service_call**, **update_site**, **update_site_proxy**, **update_site_variable**, **update_ticket**, **update_ticket_charge**

Bold: changes data (by its name).
