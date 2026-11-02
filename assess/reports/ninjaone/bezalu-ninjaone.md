# Assessment: Bezalu.NinjaOne.MCP (`bezalu-ninjaone`)

| | |
|---|---|
| Maintainer | Bezalu LLC |
| Source | https://github.com/BezaluLLC/Bezalu.NinjaOne.MCP |
| Assessed at | `main` — commit `d8a6e45e5d86510ec5692db5c172a30eef7ef5a4` |
| Date | 2026-11-02 |
| Score | **74/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-07-17 |
| P5 | More than one contributor | ✅ | 3 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ (script: unknown) |  |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ (script: unknown) | no environment reads found |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ❌ (script: pass) |  |
| C4 | Runs locally (stdio) | ❌ | no local stdio transport found |
| T1 | Tool list readable | ✅ (script: fail) | 0 tools found |
| T2 | Read-only possible | ✅ (script: unknown) | 0 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ (script: unknown) |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ (script: n/a) |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Written in C#**, which the script doesn't read, so every code check was done by hand: hosts (`app.ninjarmm.com` and a placeholder only), TLS, logging, shell and telemetry searches found nothing.
- **C1:** configuration comes from environment variables (`NINJAONE_INSTANCE`, `NINJAONE_CLIENT_ID`, `NINJAONE_CLIENT_SECRET`, `Auth/OAuth/OAuthServerOptions.cs:51-63`).
- **C4 (confirmed fail):** HTTP only (ASP.NET Core, `Program.cs`); there is no stdio transport. It is built as a container (published to GHCR by `.github/workflows/publish.yml`) where each user signs in with their own NinjaOne account.
- **D1:** the MCP endpoint requires a bearer token the server issued after the user's NinjaOne OAuth sign-in (`app.MapMcp().RequireAuthorization()`, `Program.cs`).
- **C3 (confirmed):** each user's NinjaOne access and refresh tokens are saved as JSON in `tokens.json` under `MCP_DATA_PATH` (default `/app/data`) (`Auth/OAuth/FileOAuthStore.cs:42-45,184-192`, `Auth/OAuth/Models.cs:69-71`).
- **T1, T2, T3:** 25 tools registered with `[McpServerTool]`, each carrying a `ReadOnly` annotation; only two write (`reset_alert`, `update_device_custom_fields`), both verb-first. No script, reboot or raw-request tool.
- **S1, S3:** NuGet packages are not locked (no `packages.lock.json`), so OSV could not be checked. Two direct dependencies (`ModelContextProtocol.AspNetCore`, `NinjaOne.Client`).
