# Assessment: datto-rmm-mcp (`mspbots-datto-rmm`)

| | |
|---|---|
| Maintainer | MSPbots |
| Source | https://github.com/MSPbotsAIFramework/datto-rmm-mcp |
| Assessed at | `main` — commit `7828b102b97c197ae93c938ac2f55404c42e1489` |
| Date | 2026-11-02 |
| Score | **80/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | Apache-2.0 |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-29 |
| P5 | More than one contributor | ✅ | 3 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | uv.lock |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | certifi@2026.7.22: GHSA-6q48-6c7w-9gw2, certifi@2026.7.22: PYSEC-2026-4320, mcp@1.29.1: GHSA-5h93-6whr-6q8j, mcp@1.29.1: GHSA-84m7-p3x7-pcfv, mcp@1.29.1: GHSA-rwrf-2pqf-9j8j, mcp@1.29.1: GHSA-w4fh-qvv9-3v23, pyjwt@2.13.0: GHSA-2gx3-rcp4-g85q, pyjwt@2.13.0: GHSA-42vr-xj54-vc7v, pyjwt@2.13.0: GHSA-8wjv-2p76-3863, pyjwt@2.13.0: GHSA-9j54-fg26-wv3r, pyjwt@2.13.0: GHSA-9v7f-9g4p-ffgj, pyjwt@2.13.0: GHSA-ffc3-869f-jxw9 (+23 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 0 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ❌ (script: unknown) | no environment reads found |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ❌ | no local stdio transport found |
| T1 | Tool list readable | ✅ | 6 tools found |
| T2 | Read-only possible | ✅ | 2 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ (script: flag) | src/datto_rmm_mcp/config.py:10 mcp_http_host: str = "0.0.0.0" |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **C4, C1:** HTTP only; there is no stdio mode (`src/datto_rmm_mcp/__main__.py:41`). Datto keys aren't read from the environment: each request carries the caller's own key and secret in `X-Datto-Api-Key` / `X-Datto-Api-Secret` headers (`server.py:99-100`). It's built to sit behind MSPbots' gateway.
- **D1:** listens on all interfaces, port 8080 (`config.py:9-10`), but every `/mcp` request without both key headers gets a 401 (`server.py:102-117`); there is no shared credential to borrow.
- **Caller-chosen API host:** an `X-Datto-Api-Url` header, when sent, replaces the regional host with no check that it is a Datto host (`server.py:53-57`), and the key and secret go to that URL for the token exchange. Whoever runs the server can be made to send requests to any address it can reach.
- **Running jobs on devices:** `dattormm_run_component` runs a component on a device right away (`tools/jobs.py:27`). It refuses unless `confirm=true`, which the model sets itself; there is no read-only switch. Only six tools in all.
- **S3:** the lockfile pins `mcp` 1.29.1, `pyjwt` 2.13.0 and `certifi` versions with advisories.

## Tools (6, read from source)

dattormm_get_alerts, dattormm_get_components, dattormm_get_devices, dattormm_get_job_status, **dattormm_resolve_alert**, **dattormm_run_component**

Bold: changes data (by its name).
