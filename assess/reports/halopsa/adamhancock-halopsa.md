# Assessment: @adamhancock/halopsa-mcp (`adamhancock-halopsa`)

| | |
|---|---|
| Maintainer | adamhancock |
| Source | https://www.npmjs.com/package/@adamhancock/halopsa-mcp |
| Assessed at | version `0.1.1` (sha512-9GpUl0XB1i+uE8SI5Huhnn3lThQmwPAUWa1+wnxs8AzOlVXt1AykCfbpA6zC8IYvbvis2AgYl5uYFU0EK+zHOQ==) |
| Date | 2026-11-02 |
| Score | **76/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | ISC |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ✅ | 0 git tags, 2 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2025-08-30 |
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
| T1 | Tool list readable | ✅ | 10 tools found |
| T2 | Read-only possible | ✅ | 0 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ❌ | halopsa_api_call |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **T3:** `halopsa_api_call` sends GET, POST, PUT, PATCH or DELETE to any HaloPSA path with any body (`dist/index.js:232`), so no deny rule can make the server read-only. The other tools read schema, or run SQL through HaloPSA's reporting endpoint (`halopsa_query`).
- The token is requested with scope `all` (`dist/halopsa-client.js:17`).
- Published to npm only, with no linked repository; last published August 2025. `superfast-halopsa-mcp` (Superfast IT, July 2026) is a republished copy that credits this package; it lets `halopsa_api_call` accept an array body and isn't assessed separately.

## Tools (10, read from source)

halopsa_api_call, halopsa_build_query, halopsa_get_api_endpoint_details, halopsa_get_api_schemas, halopsa_list_api_endpoints, halopsa_list_columns, halopsa_list_tables, halopsa_query, halopsa_search_api_endpoints, halopsa_table_info

Bold: changes data (by its name).
