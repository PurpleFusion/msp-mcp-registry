# Assessment: msp-skills connectwise-manage (`servosity-connectwise-manage`)

| | |
|---|---|
| Maintainer | Servosity |
| Source | https://github.com/Servosity/msp-skills/tree/99cfdab03abe7b6b310429cad4f76d55a16619bf/skills/connectwise-manage |
| Assessed at | `main` — commit `99cfdab03abe7b6b310429cad4f76d55a16619bf` |
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
| N2 | No telemetry | ✅ (script: flag) | cli/internal/cliutil/jwtshape.go:16, cli/internal/mcp/cobratree/shellout.go:285 |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 20 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ❌ (script: flag) | cli/internal/cache/cache.go:8 // or sqlite (modernc.org/sqlite). \| cli/internal/cache/cache.go:48 _ = os.WriteFile(s.path(key), []byte(value), 0o600) \| cli/internal/cli/deliver.go:83 if err := os.WriteFile(tmp, body, 0o600); err != nil { \| cli/internal/cli/helpers.go:1907 return filepath.Join(home, ".local", "share", name, "data.db") \| cli/internal/cli/profile.go:75 if err := os.WriteFile(tmp, data, 0o600); err != nil { |
| C4 | Runs locally (stdio) | ✅ | cli/cmd/connectwise-manage-mcp/main.go:46 |
| T1 | Tool list readable | ✅ | 5 tools found |
| T2 | Read-only possible | ❌ | 1 write tools; 1 don't start with a verb: connectwise-manage_execute |
| T3 | No arbitrary-request tool | ❌ | connectwise-manage_execute |
| T4 | Descriptions don't steer the model | ✅ (script: flag) | cli/internal/cliutil/text.go:14 // HTML entities. Always use this when extracting strings from HTML or |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ (script: flag) | cli/internal/cli/auth.go:30 // the verifier is running this in a sandboxed subprocess. \| cli/internal/cliutil/verifyenv.go:9 // mock-mode subprocess. Generated commands that perform visible side \| cli/internal/cliutil/verifyenv.go:21 // VerifyLiveHTTPEnvVar opts a verify-mode subprocess back in to the \| cli/internal/cliutil/verifyenv.go:27 // subprocesses (so the httptest server keeps exercising the real wire \| cli/internal/cliutil/verifyenv.go:30 // both vars from subprocess env entirely so they cannot inherit a |

## Notes from the person checking

- **P2, P3:** this connector has no release yet; the repo's tags are for its other connectors. Its release workflow builds binaries in CI and publishes SHA-256 checksums, but without build attestations, so a binary can't yet be shown to come from this source.
- **N1, N2, T4:** the hits are an example host in another product's help text and code comments.
- **D2:** each tool runs the project's own companion CLI binary directly (`exec.CommandContext`, no shell). That is its design, not a shell or code evaluation.
- **C3 (confirmed):** keeps a local cache (files written with owner-only permissions) and a SQLite store of synced data under your user profile. The maintainer documents this.
- **T1:** tools are generated at runtime from the CLI's command tree, so the 5 found in the source understate the real number by a long way.
- **T2, T3 (corrected 2026-11-02):** `connectwise-manage_execute` (`cli/internal/mcp/code_orch.go:43`) is always registered and calls any catalogued API endpoint by id, writes included, so no deny rule can make the server read-only. What the first version of this report took for a read-only switch (`cli/internal/mcp/cobratree/classify.go`) marks tools with read-only hints; it doesn't remove the execute tool.
- **S3:** `golang.org/x/mod` and `golang.org/x/sys` versions with Go advisories.

## Tools (5, read from source)

**connectwise-manage_execute**, connectwise-manage_search, context, search, sql

Bold: changes data (by its name).
