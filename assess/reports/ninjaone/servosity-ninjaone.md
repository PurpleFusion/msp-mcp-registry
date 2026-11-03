# Assessment: msp-skills ninjaone (`servosity-ninjaone`)

| | |
|---|---|
| Maintainer | Servosity |
| Source | https://github.com/Servosity/msp-skills/tree/038c2353152bf822d0f183d33304c442bea3b239/skills/ninjaone |
| Assessed at | `ninjaone-v0.1.21` — commit `038c2353152bf822d0f183d33304c442bea3b239` |
| Date | 2026-11-02 |
| Score | **92/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | Apache-2.0 |
| P2 | Install provably built from source | ❔ (script: pass) | installed from a pinned commit |
| P3 | Versioned releases | ✅ | 100 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-30 |
| P5 | More than one contributor | ✅ | 6 contributor(s) |
| P6 | Security policy | ✅ | SECURITY.md |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | cli/go.sum |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ✅ | 43 locked packages, none with known vulnerabilities |
| S4 | 30 or fewer direct dependencies | ✅ | 3 direct |
| N1 | Only the vendor's API | ✅ (script: fail) | your-instance.zammad.com (cli/internal/cli/doctor_verdict.go:60) |
| N2 | No telemetry | ✅ (script: flag) | cli/internal/cli/learnings_candidates.go:243, cli/internal/cli/learnings_candidates.go:441, cli/internal/cli/teach.go:449, cli/internal/cli/teach.go:707, cli/internal/cli/teach.go:1011 |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 44 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ❌ (script: flag) | cli/internal/cache/cache.go:9 // or sqlite (modernc.org/sqlite). \| cli/internal/cache/cache.go:49 _ = os.WriteFile(s.path(key), []byte(value), 0o600) \| cli/internal/cli/helpers.go:4924 return "data.db" \| cli/internal/cli/helpers.go:4930 unscoped := filepath.Join(dir, "data.db") \| cli/internal/cli/helpers.go:4933 scoped := filepath.Join(dir, "data-"+scopeHash+".db") |
| C4 | Runs locally (stdio) | ✅ | cli/cmd/ninjaone-mcp/main.go:77 |
| T1 | Tool list readable | ✅ | 7 tools found |
| T2 | Read-only possible | ✅ | read-only switch: cli/internal/cliutil/verifyenv.go:143 |
| T3 | No arbitrary-request tool | ✅ (script: fail) | ninjaone_execute |
| T4 | Descriptions don't steer the model | ✅ (script: flag) | cli/internal/cli/tab_get-custom-public-api.go:20 Short:   "Gets a custom tab. NOTE: This will _not_ fetch tab extensions. You must use the GET tab/{tabId}/role/{roleId} for that", \| cli/internal/cli/tag_merge.go:235 cmd.Flags().IntVar(&bodyMergeIntoTagId, "merge-into-tag-id", 0, "If merging into an existing tag, you must provide the target tag id here") \| cli/internal/cli/tag_merge.go:237 cmd.Flags().StringVar(&bodyName, "name", "", "If creating a new tag, you must supply the new tag name here") \| cli/internal/cliutil/text.go:17 // HTML entities. Always use this when extracting strings from HTML or \| cli/internal/mcp/code_orch.go:2664 Summary:        "Gets a custom tab. NOTE: This will _not_ fetch tab extensions. You must use the GET tab/{tabId}/role/{roleId} for that", |
| D1 | HTTP mode safe | ✅ | cli/cmd/ninjaone-mcp/main.go:100 err = httpSrv.ListenAndServeTLS(*tlsCert, *tlsKey) \| cli/cmd/ninjaone-mcp/main.go:102 err = httpSrv.ListenAndServe() \| cli/cmd/ninjaone-mcp/main.go:143 // ListenAndServe lookup cannot bind a remapped non-loopback host. |
| D2 | No shell or eval | ✅ (script: flag) | cli/internal/cliutil/darwin_acl_darwin.go:83 out, err := exec.Command("/usr/bin/dsmemberutil", "getuuid", "-u", strconv.FormatUint(uint64(uid), 10)).CombinedOutput() // #nosec G204 -- fixed system path plu \| cli/internal/cliutil/verifyenv.go:13 // mock-mode subprocess. Generated commands that perform visible side \| cli/internal/cliutil/verifyenv.go:25 // VerifyLiveHTTPEnvVar opts a verify-mode subprocess back in to the \| cli/internal/cliutil/verifyenv.go:31 // subprocesses (so the httptest server keeps exercising the real wire \| cli/internal/cliutil/verifyenv.go:34 // both vars from subprocess env entirely so they cannot inherit a |

## Notes from the person checking

- **Assessed at the connector's own release** (`ninjaone-v0.1.21`); the repo's "latest release" belongs to another connector.
- **P2:** the release workflow builds binaries in CI and publishes SHA-256 checksums, but without build attestations, so a binary can't be shown to come from this source.
- **N1, N2, T4:** the hits are a placeholder host for another product in shared doctor code (`cli/internal/cli/doctor_verdict.go`), code comments that call local measurement "telemetry-class" (nothing is sent anywhere), and help text copied from NinjaOne's API spec ("You must use the GET tab/... endpoint").
- **D2:** each mirrored tool runs the project's own companion CLI binary directly (`cli/internal/mcp/cobratree/shellout.go`, `exec.CommandContext`, no shell); the other hit runs a fixed macOS system path (`/usr/bin/dsmemberutil`). That is its design, not a shell or code evaluation.
- **C3 (confirmed):** keeps a local cache (files written owner-only, `cli/internal/cache/cache.go:49`) and a SQLite store of synced NinjaOne data under your user profile (`cli/internal/cli/helpers.go`, `defaultDBPath`). The maintainer documents this.
- **T2:** `NINJAONE_MCP_READ_ONLY=1` hides mutating tools and refuses non-GET calls (`cli/internal/cliutil/verifyenv.go:143`, used in `cli/internal/mcp/code_orch.go` and `cobratree/walker.go`). Without it, `ninjaone_execute` can call any state-changing endpoint in the spec (including script runs and reboots); it returns a preview and only runs with `confirm: true`.
- **T1:** tools are generated at runtime from the CLI's command tree, so the count read from source understates the real number.
- **D1:** HTTP mode requires a bearer token in all cases and TLS for any non-loopback address (`cli/cmd/ninjaone-mcp/main.go`).
- **T3:** `ninjaone_execute` calls any endpoint, but `NINJAONE_MCP_READ_ONLY=1` removes write tools and blocks write methods through it (`codeOrchBlockedByMCPReadOnly`), so the server can be made read-only.

## Tools (7, read from source)

context, **ninjaone_execute**, ninjaone_get, ninjaone_read, ninjaone_search, search, sql

Bold: changes data (by its name).
