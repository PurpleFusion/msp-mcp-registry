# Assessment: @teamnetwork-nz/ninjaone-mcp-server (npm) (`teamnetwork-ninjaone`)

| | |
|---|---|
| Maintainer | teamnetwork-nz |
| Source | https://www.npmjs.com/package/@teamnetwork-nz/ninjaone-mcp-server |
| Assessed at | version `0.5.1` (sha512-ZLveVnlK6gW+c/nhf88cr8B1iuGJflFeZ0uUd+QVd5WY48G5cgQR3mR62v3M+1h8FjxP/bcuFEJ0TZBukZpE9w==) |
| Date | 2026-11-02 |
| Score | **83/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ✅ | 0 git tags, 7 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-20 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ | 4 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 12 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | dist/index.js:3 |
| T1 | Tool list readable | ✅ | 27 tools found |
| T2 | Read-only possible | ✅ | 0 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ | dist/http-server.js:48 return http.createServer(async (req, res) => { \| dist/index.js:101 createHttpServer(createConfiguredServer, { host, port, serverName: packageName, bearerToken: process.env.NINJAONE_HTTP_BEARER_TOKEN, allowedHosts: process.env.N |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **T2:** read-only. All 27 tools read; the script counted `ninja_explain_patch_status` as a write ("patch" is on its verb list). The default OAuth scope is `monitoring`, and `NINJAONE_READWRITE=true` is needed to request `management` (`dist/config.js:49-52`).
- **D1:** HTTP mode binds 127.0.0.1 by default and refuses a non-loopback address without a bearer token and an allowed-hosts list (`dist/http-server.js:39-41`). Default transport is stdio.
- Published to npm only; the package names no source repository, so what's in it can't be compared with source (P2). No lockfile ships, so dependencies resolve on the day you install.

## Tools (27, read from source)

ninja_explain_patch_status, ninja_get_device, ninja_get_device_activities, ninja_get_device_custom_fields, ninja_get_device_disks, ninja_get_device_last_user, ninja_get_device_network, ninja_get_device_os_patches, ninja_get_device_processors, ninja_get_device_software, ninja_get_device_volumes, ninja_get_organization, ninja_list_activities, ninja_list_alerts, ninja_list_devices, ninja_list_locations, ninja_list_organizations, ninja_list_policies, ninja_query_antivirus_status, ninja_query_computer_systems, ninja_query_device_health, ninja_query_operating_systems, ninja_query_os_patches, ninja_query_policy_overrides, ninja_query_volumes, ninja_search_devices, ninja_test_connection

Bold: changes data (by its name).
