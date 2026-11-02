# Assessment: datto-rmm-mcp (`wyre-datto-rmm`)

| | |
|---|---|
| Maintainer | WYRE Technology |
| Source | https://github.com/WYRE-AI/datto-rmm-mcp |
| Assessed at | `v1.10.1` — commit `dd0633d9454f84257c42734e2c3bba067be1c03d` |
| Date | 2026-11-02 |
| Score | **93/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | Apache-2.0 |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ✅ | 40 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-11-02 |
| P5 | More than one contributor | ✅ | 5 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @modelcontextprotocol/sdk@1.31.0: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.31.0: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.31.0: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.31.0: GHSA-rvq5-wwqv-78pq, body-parser@2.3.0: GHSA-27r3-jxmh-p828, fast-uri@3.1.8: GHSA-333x-w4r6-6crp, fast-uri@3.1.8: GHSA-w74x-v6f9-j3xg, fast-uri@3.1.8: GHSA-wjr9-j795-jxcr, fast-uri@3.1.8: GHSA-xhq7-xmqj-769h, ip-address@10.7.2: GHSA-rxp7-6hxx-x8q5, proxy-addr@2.0.7: GHSA-jqcg-44mw-7w3h, qs@6.16.0: GHSA-6pq8-jhm2-2vcw (+1 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 2 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 16 reads |
| C2 | Credentials never logged | ✅ (script: flag) | src/index.ts:89 console.error(PLACEHOLDER_S2S_SECRET_ERROR); |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | src/index.ts:20 |
| T1 | Tool list readable | ✅ | 18 tools found |
| T2 | Read-only possible | ✅ | 2 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ (script: flag) | src/index.ts:112 return configured \|\| "0.0.0.0"; |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **P2:** `@wyre-ai/datto-rmm-mcp` is not on the public npm registry; the script read npm's "not found" reply as a package without provenance. Installed from the pinned commit, as for the other GitHub sources.
- **N2:** the hits are the function name `neutralizeClosingTag(` matching the `gtag(` pattern (`src/untrusted-content.ts:135,146`). No telemetry.
- **C2:** the flagged line prints a fixed error message; the code states the secret is never logged (`src/index.ts:80-90`).
- **D1:** stdio is the default (`src/index.ts:297`). HTTP mode refuses to start without `CONDUIT_S2S_SECRET` and checks the `X-Gateway-S2S` header on every request (`src/index.ts:87-99,172`); without a secret it only runs with `MCP_ALLOW_INSECURE_DEV=1`, and then only on 127.0.0.1.
- **Running jobs on devices:** `datto_run_quickjob` runs a component on one device with caller-supplied variables (`src/mcp-server.ts:620,1098`). Writes are limited to that and `datto_resolve_alert`; there is no read-only switch, but both names can be matched by a deny rule. Tool output is wrapped in a `<datto-data>` block marked as data, not instructions (`src/untrusted-content.ts`).
- **API client not read here:** the Datto calls are made by a separate package, `@wyre-ai/node-datto-rmm`, resolved from GitHub Packages (`package-lock.json:1946`), which needs a GitHub token even to install. Its code isn't part of this assessment. The regional `*-api.centrastage.net` hosts appear in `src/patches.ts:29-34`.
- **Hosting:** WYRE's Claude Code plugin points at WYRE's hosted gateway by default. This assessment is of running the source yourself. The copy under `WYRE-AI/msp-claude-plugins/msp-claude-plugins/mcp-servers/datto-rmm-mcp` is an older vendored snapshot of this repo.
- **S3:** the shipped lockfile pins versions with published advisories, including `@modelcontextprotocol/sdk` 1.31.0, `body-parser` and `fast-uri`.

## Tools (18, read from source)

datto_find_device, datto_get_alert, datto_get_device, datto_get_device_audit, datto_get_device_patches, datto_get_job, datto_get_job_components, datto_get_job_results, datto_get_job_stderr, datto_get_job_stdout, datto_get_site, datto_get_site_patches, datto_list_alerts, datto_list_components, datto_list_devices, datto_list_sites, **datto_resolve_alert**, **datto_run_quickjob**

Bold: changes data (by its name).
