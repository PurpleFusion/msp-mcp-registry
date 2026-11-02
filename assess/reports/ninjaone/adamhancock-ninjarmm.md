# Assessment: @adamhancock/ninjarmm-mcp (npm) (`adamhancock-ninjarmm`)

| | |
|---|---|
| Maintainer | adamhancock |
| Source | https://www.npmjs.com/package/@adamhancock/ninjarmm-mcp |
| Assessed at | version `0.1.11` (sha512-jZN5Ql5IgVaJKp+S6u6RpwktCEjWTSaQAfdVT88gXsUDIZbzJl8WqCZAUeU1L84gz3+MNGt1Y0lsdlWqhFcYLg==) |
| Date | 2026-11-02 |
| Score | **76/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ✅ | 0 git tags, 3 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2025-08-29 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ | 1 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 8 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | dist/index.js:3 |
| T1 | Tool list readable | ✅ | 27 tools found |
| T2 | Read-only possible | ✅ | 3 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ❌ | ninjaone_api_call |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **T3:** `ninjaone_api_call` sends any method to any `/v2/` path (`src/index.ts:371-390,516`). The default OAuth scope is `monitoring` (`src/index.ts:29`), under which NinjaOne refuses writes, so it stays read-only until you set `NINJAONE_SCOPE` to include `management`.
- Also has `ninjaone_run_script` (needs the `control` scope) and `ninjaone_update_device_custom_fields`.
- Published to npm only (0.1.11, August 2025); the package names no source repository. A Key Vault launcher for it exists at `dspray/claude-ninjaone-mcp` (archived).

## Tools (27, read from source)

ninjaone_api_call, ninjaone_get_activities, ninjaone_get_alerts, ninjaone_get_api_endpoint_details, ninjaone_get_api_schema_overview, ninjaone_get_device, ninjaone_get_device_activities, ninjaone_get_device_custom_fields, ninjaone_get_device_roles, ninjaone_get_device_software, ninjaone_get_devices, ninjaone_get_devices_by_org, ninjaone_get_job, ninjaone_get_jobs, ninjaone_get_location, ninjaone_get_locations, ninjaone_get_org_software, ninjaone_get_organization, ninjaone_get_organizations, ninjaone_get_policies, ninjaone_get_policy, ninjaone_get_tasks, ninjaone_get_users, **ninjaone_reset_alert**, **ninjaone_run_script**, ninjaone_search_devices, **ninjaone_update_device_custom_fields**

Bold: changes data (by its name).
