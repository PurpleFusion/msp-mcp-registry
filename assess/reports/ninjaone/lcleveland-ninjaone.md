# Assessment: ninjaone-mcp (`lcleveland-ninjaone`)

| | |
|---|---|
| Maintainer | lcleveland |
| Source | https://github.com/lcleveland/ninjaone-mcp |
| Assessed at | `main` — commit `4118a1c188493529fcf461555a95cd291f02a0c2` |
| Date | 2026-11-02 |
| Score | **95/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-30 |
| P5 | More than one contributor | ✅ | 2 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | go.sum |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ✅ | 12 locked packages, none with known vulnerabilities |
| S4 | 30 or fewer direct dependencies | ✅ | 2 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 1 reads |
| C2 | Credentials never logged | ✅ (script: flag) | internal/server/http.go:78 log.Info("user signed in: script runs and ticket writes now use their token") \| internal/server/http.go:94 log.Info("listening", "addr", cfg.Addr, "path", cfg.Path, "authenticated", cfg.HTTPAuthToken != "") |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | cmd/ninjaone-mcp/main.go:59 |
| T1 | Tool list readable | ✅ (script: fail) | 0 tools found |
| T2 | Read-only possible | ✅ (script: unknown) | 0 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ (script: unknown) |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ | internal/server/http.go:95 err := srv.ListenAndServe() |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **T1:** about 21 tools are defined in tables (`internal/tools/table_*.go`, `{Name: "ninjaone_device", ...}`), each with several actions, plus `ninjaone_api` and `ninjaone_status`. The script's patterns don't read this shape.
- **T2:** read-only by default. Every write capability (tickets, documentation, custom fields, device maintenance, device actions, scripts, device admin) is off until enabled with its own `--allow-<capability>` flag (`internal/config/config.go:129`).
- **T3:** `ninjaone_api` calls any v2 endpoint, but only GET (and reads NinjaOne serves over POST) unless a capability is enabled, and then only routes on an allowlist for that capability; tenant administration, users, roles, webhooks, installers and billing are never allowed (`internal/tools/generic.go:20-60,185-200`).
- **Destructive actions:** script runs, forced reboots and decommissioning require `confirm` to be the device's exact display name, looked up live (`internal/tools/write.go:132`).
- **C2:** the flagged lines log fixed messages and whether an HTTP token is set, not the token; the config's log form leaves secrets out (`internal/config/config.go:76`).
- **D1:** HTTP mode binds 127.0.0.1:8233 by default and refuses a non-loopback address without `--http-auth-token-file` (`internal/config/config.go:232`).
- **C3:** nothing is written by default. If you enable the optional NinjaOne user sign-in (needed for script runs and ticket writes as a user), it keeps the rotating refresh token in an owner-only file (`internal/ninjaone/user.go:201`).
- **C1:** reads environment variables through a `getenv` helper; it prefers secrets from files or systemd credentials and warns when the secret comes from the environment.
- No releases or tags yet.
