# Assessment: msp-skills halopsa (`servosity-halopsa`)

| | |
|---|---|
| Maintainer | Servosity |
| Source | https://github.com/Servosity/msp-skills/tree/e9c7c7e2a5bfa1753cf464257a3f8b54994f7853/skills/halopsa |
| Assessed at | `halopsa-v0.2.22` — commit `e9c7c7e2a5bfa1753cf464257a3f8b54994f7853` |
| Date | 2026-11-02 |
| Score | **75/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | Apache-2.0 |
| P2 | Install provably built from source | ❔ (script: pass) | installed from a pinned commit |
| P3 | Versioned releases | ❌ (script: pass) | 100 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-30 |
| P5 | More than one contributor | ✅ | 6 contributor(s) |
| P6 | Security policy | ✅ | SECURITY.md |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | cli/go.sum |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | golang.org/x/mod@v0.24.0: GO-2026-6179, golang.org/x/mod@v0.24.0: GO-2026-6180, golang.org/x/sys@v0.31.0: GO-2026-5024 |
| S4 | 30 or fewer direct dependencies | ✅ | 4 direct |
| N1 | Only the vendor's API | ✅ (script: fail) | your-instance.zammad.com (cli/internal/cli/doctor_verdict.go:79) |
| N2 | No telemetry | ✅ (script: flag) | cli/internal/cli/halo-integration_create-halointegration.go:6390, cli/internal/cli/tickets_create-object.go:6390, cli/internal/cliutil/jwtshape.go:16, cli/internal/mcp/cobratree/shellout.go:285 |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 42 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ❌ (script: flag) | cli/internal/cache/cache.go:8 // or sqlite (modernc.org/sqlite). \| cli/internal/cache/cache.go:48 _ = os.WriteFile(s.path(key), []byte(value), 0o600) \| cli/internal/cli/data_source.go:645 if err := st.DB().QueryRow(`SELECT 1 FROM sqlite_master WHERE type='table' AND name='resources' LIMIT 1`).Scan(&one); err != nil { \| cli/internal/cli/deliver.go:83 if err := os.WriteFile(tmp, body, 0o600); err != nil { \| cli/internal/cli/export.go:80 f, err := os.Create(outputFile) |
| C4 | Runs locally (stdio) | ✅ | cli/cmd/halopsa-mcp/main.go:46 |
| T1 | Tool list readable | ✅ | 5 tools found |
| T2 | Read-only possible | ❌ (script: pass) | 1 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ❌ | halopsa_execute |
| T4 | Descriptions don't steer the model | ✅ (script: flag) | cli/internal/cliutil/text.go:14 // HTML entities. Always use this when extracting strings from HTML or |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ (script: flag) | cli/internal/cliutil/verifyenv.go:9 // mock-mode subprocess. Generated commands that perform visible side \| cli/internal/cliutil/verifyenv.go:21 // VerifyLiveHTTPEnvVar opts a verify-mode subprocess back in to the \| cli/internal/cliutil/verifyenv.go:27 // subprocesses (so the httptest server keeps exercising the real wire \| cli/internal/cliutil/verifyenv.go:30 // both vars from subprocess env entirely so they cannot inherit a \| cli/internal/cliutil/verifyenv.go:35 // sets in every subprocess. Distinct from VerifyEnvVar because dogfood |

## Notes from the person checking

- **P2, P3:** the commit assessed is the repo's latest release (`hudu-v0.1.17`); none of the repo's tags is for the HaloPSA connector (manifest version 0.2.22). Installs come as a prebuilt binary (`manifest.json` `server.type: binary`), and without a release or build attestation for this connector, the binary can't be shown to come from this source.
- **N1, N2, T4:** the hits are a placeholder host in the setup checker (`cli/internal/cli/doctor_verdict.go:79`), a `datadog-id` field on HaloPSA's integration endpoint, and a code comment.
- **T3 (confirmed):** `halopsa_execute` (`cli/internal/mcp/code_orch.go:43`, always registered from `tools.go:41`) runs any endpoint in its catalogue by ID. The catalogue holds 806 GET, 404 POST and 246 DELETE endpoints, so denying writes means denying the tool outright.
- **T2 (confirmed):** there is no read-only setting. `mcp:read-only` (`cli/internal/mcp/cobratree/classify.go:21`) only adds a `readOnlyHint` annotation to read commands. Tool names are the CLI command path joined with underscores (`names.go`), so some put the verb third (e.g. `halo_integration_create_halointegration`). The script's "switch" hit is in a generated command file.
- **D2:** each generated tool runs the project's own companion CLI binary directly (`exec.CommandContext`, no shell, `cobratree/shellout.go:287`). That is how it's built, not shell access or code evaluation.
- **C3 (confirmed):** keeps a response cache under your user profile (`cli/internal/cache/cache.go:48`, owner-only files) and a local SQLite store of synced HaloPSA data. The maintainer documents this.
- **T1:** most tools are generated at runtime from the CLI's command tree, so the 5 found in the source understate the real number by a long way.
- **S3:** `golang.org/x/mod` and `golang.org/x/sys` versions with Go advisories.

## Tools (5, read from source)

context, **halopsa_execute**, halopsa_search, search, sql

Bold: changes data (by its name).
