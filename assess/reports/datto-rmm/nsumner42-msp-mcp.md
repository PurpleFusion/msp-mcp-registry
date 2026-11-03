# Assessment: MSP-MCP (datto) (`nsumner42-msp-mcp`)

| | |
|---|---|
| Maintainer | nsumner42 |
| Source | https://github.com/nsumner42/MSP-MCP |
| Assessed at | `main` — commit `1d0dd9332a680d28cc5948057397d71070df9d22` |
| Date | 2026-11-02 |
| Score | **60/100** — capped: no commercial-use licence (max 60) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ❌ | no licence |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-11-02 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | uv.lock |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | certifi@2026.7.22: GHSA-6q48-6c7w-9gw2, certifi@2026.7.22: PYSEC-2026-4320 |
| S4 | 30 or fewer direct dependencies | ✅ | 2 direct |
| N1 | Only the vendor's API | ✅ (script: fail) | login.assetpanda.com (src/msp_mcp/assetpanda/client.py:31), api.cloudns.net (src/msp_mcp/cloudns/client.py:5), api.services.mimecast.com (src/msp_mcp/mimecast/client.py:5), clear.portnox.com (src/msp_mcp/portnox/client.py:6), portalapi.f.threatlocker.com (src/msp_mcp/threatlocker/client.py:33) |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 17 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ (script: flag) | src/msp_mcp/core/guard.py:39 with audit_path().open("a", encoding="utf-8") as f: |
| C4 | Runs locally (stdio) | ✅ | src/msp_mcp/assetpanda/server.py:383 |
| T1 | Tool list readable | ✅ | 60 tools found |
| T2 | Read-only possible | ✅ | read-only switch: src/msp_mcp/crowdstrike/server.py:8 |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ (script: flag) | src/msp_mcp/core/credentials.py:19 import subprocess \| src/msp_mcp/core/credentials.py:78 r = subprocess.run( \| src/msp_mcp/core/credentials.py:82 creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0), \| src/msp_mcp/core/credentials.py:84 except (OSError, subprocess.TimeoutExpired): \| src/msp_mcp/crowdstrike/server.py:18 import subprocess |

## Notes from the person checking

- **Monorepo:** one Python package with separate stdio servers for Datto RMM, CrowdStrike, Mimecast, ThreatLocker, Portnox, AssetPanda and ClouDNS. The other hosts belong to those servers; the Datto RMM server's client talks only to `*-api.centrastage.net` (`src/msp_mcp/datto/client.py:17`).
- **Writes off by default:** Datto write tools refuse unless `MSP_MCP_DATTO_WRITES=1` is set (`src/msp_mcp/core/guard.py:43-52`). Every write attempt, allowed or refused, is appended to `%LOCALAPPDATA%\MSP-MCP\audit.log` (action and target, no credentials). That log is the C3 hit; it isn't a data cache.
- **Running jobs on devices:** `run_quick_job` and `run_quick_job_many` run a component on one or many devices once writes are on (`datto/server.py:430,479`). The many-device version defaults to a dry run and refuses more than 25 devices unless `max_devices` is raised.
- **C1, D2:** credentials don't come from environment variables but from a DPAPI-encrypted file in the user's profile, or from a `Credential.ps1` that it runs with `powershell.exe` (`core/credentials.py:26-32,78`). That is a fixed command with the credential name passed in an environment variable; no model input reaches it. The script you dot-source isn't part of the repo.
- No licence (caps the score). No tags.

## Tools (60, read from source)

account_summary, **activity_log**, **add_record**, approval_requests, asset_counts, attachment_logs, audit_events, block_device, bypass_greylisting, computer_groups, **delete_greylisting_policy**, **delete_record**, device_software, duplicate_assets, employee_assets, file_history, find_computers, find_devices, get_action, get_approval_request, get_asset, get_device, get_job, get_mab_account, get_message, get_records, greylist_report, greylisting_policies, held_messages, impersonation_logs, list_components, list_fields, list_filters, list_mab_accounts, list_nas, list_open_alerts, list_sites, list_zones, **mab_add_macs**, **mab_remove_macs**, organizations, permit_by_hash, permit_sender, propagation_status, **release_held_messages**, **resolve_alert**, **run_quick_job**, **run_quick_job_many**, search_action_log, search_assets, search_collection, search_devices, search_employees, search_messages, **set_device_udf**, udf_report, unblock_device, **update_record**, url_clicks, **write_status**

Bold: changes data (by its name).
