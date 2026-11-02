# Assessment: msp-skills datto-rmm (`servosity-datto-rmm`)

| | |
|---|---|
| Maintainer | Servosity |
| Source | https://github.com/Servosity/msp-skills/tree/e9c7c7e2a5bfa1753cf464257a3f8b54994f7853/skills/datto-rmm |
| Assessed at | `datto-rmm-v0.1.10` — commit `e9c7c7e2a5bfa1753cf464257a3f8b54994f7853` |
| Date | 2026-11-02 |
| Score | **74/100** |

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
| S3 | No known vulnerable dependencies | ❌ | golang.org/x/mod@v0.24.0: GO-2026-6179, golang.org/x/mod@v0.24.0: GO-2026-6180, golang.org/x/sys@v0.31.0: GO-2026-5024 |
| S4 | 30 or fewer direct dependencies | ✅ | 4 direct |
| N1 | Only the vendor's API | ✅ (script: fail) | your-instance.zammad.com (cli/internal/cli/doctor_verdict.go:79) |
| N2 | No telemetry | ✅ (script: flag) | cli/internal/cliutil/jwtshape.go:16, cli/internal/mcp/cobratree/shellout.go:285 |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 27 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ❌ (script: flag) | cli/internal/cache/cache.go:8 // or sqlite (modernc.org/sqlite). \| cli/internal/cache/cache.go:48 _ = os.WriteFile(s.path(key), []byte(value), 0o600) \| cli/internal/cli/deliver.go:83 if err := os.WriteFile(tmp, body, 0o600); err != nil { \| cli/internal/cli/helpers.go:1910 return filepath.Join(home, ".local", "share", name, "data.db") \| cli/internal/cli/profile.go:75 if err := os.WriteFile(tmp, data, 0o600); err != nil { |
| C4 | Runs locally (stdio) | ✅ | cli/cmd/datto-rmm-mcp/main.go:46 |
| T1 | Tool list readable | ✅ | 5 tools found |
| T2 | Read-only possible | ❌ | 1 write tools; 1 don't start with a verb: datto-rmm_execute |
| T3 | No arbitrary-request tool | ❌ | datto-rmm_execute |
| T4 | Descriptions don't steer the model | ✅ (script: flag) | cli/internal/cliutil/text.go:14 // HTML entities. Always use this when extracting strings from HTML or |
| D1 | HTTP mode safe | ❌ (script: n/a) |  |
| D2 | No shell or eval | ✅ (script: flag) | cli/internal/cli/auth.go:34 // the verifier is running this in a sandboxed subprocess. \| cli/internal/cli/auth.go:71 c = exec.Command("open", url) \| cli/internal/cli/auth.go:73 c = exec.Command("xdg-open", url) \| cli/internal/cli/auth.go:75 c = exec.Command("rundll32", "url.dll,FileProtocolHandler", url) \| cli/internal/cliutil/verifyenv.go:9 // mock-mode subprocess. Generated commands that perform visible side |

## Notes from the person checking

- **P2:** what you install is the prebuilt binary from the `datto-rmm-v0.1.10` release. GitHub's release attestation records each asset's SHA-256 against commit `e9c7c7e` (it matches the registry pin `6b867287…`), but there is no build-provenance attestation, so the binary can't be shown to be built from this source.
- **N1, N2, T4:** the hits are code comments and an example host in help text (`cli/internal/cli/doctor_verdict.go:79`, `cli/internal/cliutil/jwtshape.go:16`, `cli/internal/mcp/cobratree/shellout.go:285`, `cli/internal/cliutil/text.go:14`). Datto calls go only to `*-api.centrastage.net`.
- **D2:** tools run the project's own companion CLI binary directly (`exec.CommandContext`, no shell, `cobratree/shellout.go:287`); the other hits open a browser for sign-in. That is its design, not a shell or code evaluation.
- **C3 (confirmed):** `sync` copies the fleet (sites, devices, alerts, audits) into a SQLite store at `~/.local/share/<name>/data.db` (`cli/internal/cli/helpers.go:1910`), plus a response cache written with owner-only permissions (`cli/internal/cache/cache.go:48`). The maintainer documents the local fleet store.
- **T3 (confirmed), running jobs on devices:** `datto-rmm_execute` (`cli/internal/mcp/code_orch.go:43`) is always registered and calls any endpoint in its built-in list by `endpoint_id`, including `device.quickjob.create-quick-job` (runs a component on a device, `code_orch.go:366`), `device.site.move-device`, site/account variable and proxy changes, and `user.reset-api-keys` (`code_orch.go:656`). Because the endpoint is a parameter, a deny rule on the tool name can't separate reads from writes.
- **T2 (confirmed fail):** the matched `readOnlyIntent` (`cli/internal/client/client.go:422`) is an internal flag for the generator's test harness, and `mcp:read-only` is a hint annotation on generated tools (`cobratree/classify.go:20`); neither is a switch you can turn on. No environment setting disables writes; the README's advice is an API user with a read-only security level in Datto.
- **D1:** HTTP mode is opt-in (`--transport http` or `PP_MCP_TRANSPORT=http`), listens on `:7777`, all interfaces, with no authentication (`cmd/datto-rmm-mcp/main.go:23,52`), and uses the server's own Datto credentials. The default is stdio, which is how the registry runs it. Opt-in, so it fails D1 without the open-by-default cap.
- **T1:** tools are generated at runtime from the CLI's command tree, so the 5 found in the source understate the real number.
- **S3:** `golang.org/x/mod` and `golang.org/x/sys` versions with Go advisories.

## Tools (5, read from source)

context, **datto-rmm_execute**, datto-rmm_search, search, sql

Bold: changes data (by its name).
