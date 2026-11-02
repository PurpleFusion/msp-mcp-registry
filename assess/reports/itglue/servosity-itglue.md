# Assessment: msp-skills itglue (`servosity-itglue`)

| | |
|---|---|
| Maintainer | Servosity |
| Source | https://github.com/Servosity/msp-skills/tree/e9c7c7e2a5bfa1753cf464257a3f8b54994f7853/skills/itglue |
| Assessed at | `itglue-v0.1.7` — commit `e9c7c7e2a5bfa1753cf464257a3f8b54994f7853` |
| Date | 2026-11-02 |
| Score | **77/100** |

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
| C1 | Credentials from environment | ✅ | 16 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ❌ (script: flag) | cli/internal/cache/cache.go:8 // or sqlite (modernc.org/sqlite). \| cli/internal/cache/cache.go:48 _ = os.WriteFile(s.path(key), []byte(value), 0o600) \| cli/internal/cli/deliver.go:83 if err := os.WriteFile(tmp, body, 0o600); err != nil { \| cli/internal/cli/export.go:72 f, err := os.Create(outputFile) \| cli/internal/cli/helpers.go:1904 return filepath.Join(home, ".local", "share", name, "data.db") |
| C4 | Runs locally (stdio) | ✅ | cli/cmd/itglue-mcp/main.go:46 |
| T1 | Tool list readable | ✅ | 28 tools found |
| T2 | Read-only possible | ❌ | 12 write tools; 4 don't start with a verb: organizations_relationships_create-organization-configuration, organizations_relationships_create-organization-contact, organizations_relationships_create-organization-document, organizations_relationships_update-organization-contact |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ (script: flag) | cli/internal/cliutil/text.go:14 // HTML entities. Always use this when extracting strings from HTML or |
| D1 | HTTP mode safe | ❌ (script: n/a) |  |
| D2 | No shell or eval | ✅ (script: flag) | cli/internal/cli/auth.go:33 // the verifier is running this in a sandboxed subprocess. \| cli/internal/cli/auth.go:72 c = exec.Command("open", url) \| cli/internal/cli/auth.go:74 c = exec.Command("xdg-open", url) \| cli/internal/cli/auth.go:76 c = exec.Command("rundll32", "url.dll,FileProtocolHandler", url) \| cli/internal/cliutil/verifyenv.go:9 // mock-mode subprocess. Generated commands that perform visible side |

## Notes from the person checking

- **Passwords:** `passwords_get` calls `GET /passwords/{id}` without `show_password=false` (`cli/internal/mcp/tools.go:415`). IT Glue's API documents `show_password` on that endpoint as defaulting to true, so with an API key that has Password Access the stored password comes back into the conversation, although the tool describes itself as "Retrieve a password metadata record". No switch removes it; a deny rule on `passwords_get` does. Sync and `passwords stale` use the list endpoint, which returns metadata only.
- **C3 (confirmed):** the MCP server turns its response cache off (`c.NoCache = true`, `tools.go:850`). The companion CLI, which the skill also drives, saves every GET response as a file under `~/.cache/itglue-cli/http` (owner-only, `cli/internal/client/client.go:67,251`) and writes it through to the SQLite store `~/.local/share/itglue-cli/data.db` (`cli/internal/cli/data_source.go:159,274`). So `itglue-cli passwords get` leaves the password value on disk, in the table the `sql` MCP tool reads.
- **D1:** `--transport http` (or `PP_MCP_TRANSPORT=http`) serves on `:7777`, all interfaces, with no authentication (`cli/cmd/itglue-mcp/main.go:23,49`). Opt-in, so it fails D1 without the open-by-default cap.
- **P2, P3:** assessed at the monorepo's latest release commit (`hudu-v0.1.17`); `skills/itglue` there is identical to its own tag `itglue-v0.1.7`. Release binaries ship with SHA-256 checksums but no build attestations.
- **N1, N2, T4:** the hits are an example host in another product's help text (`your-instance.zammad.com`) and code comments.
- **D2:** each tool runs the project's own companion CLI binary directly (`exec.CommandContext`, no shell), and sign-in opens the browser. No shell or code evaluation.
- **T2:** the "read-only switch" hit is the `readOnlyHint` annotation, not a switch. Write tools end in `_create` / `_update` and there are no delete tools.
- **S3:** `golang.org/x/mod` and `golang.org/x/sys` versions with Go advisories.

## Tools (28, read from source)

**configurations_create**, configurations_get, configurations_list, **configurations_update**, **contacts_create**, contacts_get, contacts_list, **contacts_update**, context, **documents_create**, documents_get, documents_list, **documents_update**, organizations_get, organizations_list, **organizations_relationships_create-organization-configuration**, **organizations_relationships_create-organization-contact**, **organizations_relationships_create-organization-document**, organizations_relationships_list-organization-configurations, organizations_relationships_list-organization-contacts, organizations_relationships_list-organization-documents, **organizations_relationships_update-organization-contact**, **passwords_create**, passwords_get, passwords_list, **passwords_update**, search, sql

Bold: changes data (by its name).
