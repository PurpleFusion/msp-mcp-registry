# Assessment: halopsa-mcp (`redanthrax-halopsa`)

| | |
|---|---|
| Maintainer | redanthrax (Sumerian Software) |
| Source | https://github.com/redanthrax/halopsa-mcp |
| Assessed at | `v1.0.32` — commit `1ed19dd71459cda37c3859f5834d3b9324da1e1c` |
| Date | 2026-11-02 |
| Score | **91/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ✅ | 18 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-29 |
| P5 | More than one contributor | ✅ | 3 contributor(s) |
| P6 | Security policy | ✅ | SECURITY.md |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | packages.lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ (script: unknown) |  |
| N1 | Only the vendor's API | ✅ (script: fail) | claude.ai (Modules/Common/Security/McpCorsConfiguration.cs:10) |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 22 reads |
| C2 | Credentials never logged | ✅ (script: flag) | Modules/Authentication/Endpoints/CallbackEndpoint.cs:117 logger.LogError(ex, "OAuth callback token exchange error"); \| Modules/Authentication/Endpoints/TokenExchangeEndpoint.cs:85 logger.LogWarning("Token rejected — client_id mismatch \| codeHint={CodeHint}", \| Modules/Authentication/Endpoints/TokenExchangeEndpoint.cs:98 logger.LogWarning("Token rejected — redirect_uri mismatch \| codeHint={CodeHint}", \| Modules/Authentication/Endpoints/TokenExchangeEndpoint.cs:118 logger.LogWarning("Token rejected — PKCE mismatch \| codeHint={CodeHint}", \| Modules/Authentication/Services/FileTokenStore.cs:62 _logger.LogWarning(ex, "Could not start token-file watcher; cross-process token sync disabled"); |
| C3 | Nothing written to disk | ❌ (script: pass) |  |
| C4 | Runs locally (stdio) | ✅ | Program.cs:213 |
| T1 | Tool list readable | ✅ (script: fail) | 0 tools found |
| T2 | Read-only possible | ✅ (script: unknown) | 0 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ (script: unknown) |  |
| T4 | Descriptions don't steer the model | ✅ (script: flag) | Modules/Common/Models/HaloPsaSchema.cs:14 "WORKFLOW: When you don't know which table or column holds a concept, ALWAYS call halopsa_db_search FIRST (e.g. db_search('elapsed'), db_search('contract hours' \| Modules/Mcp/HaloPsaMcpConstants.cs:191 Get the HaloPSA database schema cheat sheet plus live lookup IDs (statuses, agents). ALWAYS call this before writing SQL. Returns key tables, common joins, and  \| Modules/Mcp/HaloPsaMcpConstants.cs:201 Check the current authentication status with HaloPSA. ALWAYS call this first when the user asks anything about HaloPSA data. Times out after 10 seconds if HaloP \| Modules/Mcp/McpSessionInstructions.cs:52 On this first connection you must help the user sign in before any other HaloPSA tool: |
| D1 | HTTP mode safe | ✅ | Modules/Mcp/BrowserLauncher.cs:10 Process.Start("open", url); \| Modules/Mcp/BrowserLauncher.cs:19 Process.Start("xdg-open", url); \| Modules/Mcp/DesktopLoginBootstrapService.cs:8 /// Desktop stdio mode: when no HaloPSA session exists, open the login page once Kestrel is up. \| Program.cs:99 builder.WebHost.ConfigureKestrel(options => { |
| D2 | No shell or eval | ✅ (script: flag) | Modules/Mcp/BrowserLauncher.cs:10 Process.Start("open", url); \| Modules/Mcp/BrowserLauncher.cs:15 Process.Start(new ProcessStartInfo(url) { UseShellExecute = true }); \| Modules/Mcp/BrowserLauncher.cs:19 Process.Start("xdg-open", url); |

## Notes from the person checking

- Written in C#, which the script doesn't read, so every code check below was done by hand.
- **S1, S3, S4:** dependencies are locked in `packages.lock.json` (NuGet), which OSV wasn't asked about, so S3 stays unknown. 11 direct packages (`HaloPsaMcp.csproj`).
- **C1, C4:** settings come from environment variables (`AppConfig.LoadFromEnvironment`); stdio is the default, and HTTP needs `--http` (`Program.cs:28`, `.WithStdioServerTransport()`).
- **D1:** in stdio mode the built-in OAuth sign-in page listens on localhost only, unless `HTTP_BIND_ALL` is set (`Program.cs:197-200`). HTTP mode listens on all interfaces (`Program.cs:100`), but every `/mcp` request needs a bearer token issued after a HaloPSA sign-in (`McpAuthenticationMiddleware.cs:39-67`).
- **C3 (confirmed):** stdio mode writes a daily log to `logs/mcp.log` (`Program.cs:163`), and keeps OAuth tokens and client registrations in `./data/tokens.json` and `clients.json`, encrypted with ASP.NET DataProtection (`FileTokenStore.cs:13`).
- **C2:** token-related log lines go through `SecretRedactor.Hint` (e.g. `FileTokenStore.cs:79`).
- **D2:** `Process.Start` only opens the sign-in URL in your browser (`Modules/Mcp/BrowserLauncher.cs`).
- **T1, T2, T3:** 21 tools (`Modules/Mcp/HaloPsaMcpServer.cs`), named with the verb second (`halopsa_create_ticket`, `halopsa_update_timesheet`, `halopsa_delete_timesheet_event`). `MCP_ENABLED_TOOLS` limits the server to a list of tools (`McpToolAllowlist.cs:39`). `halopsa_query` runs SQL against HaloPSA's reporting API, which only reads.
- **T4:** descriptions say "ALWAYS call this first" for the auth-status and schema tools (`HaloPsaMcpConstants.cs:191,201`). That's usage advice, not an attempt to steer the model elsewhere.
- HaloPSA calls run under the signed-in agent's own permissions (OAuth authorisation code with PKCE).
- **N1, C2, T4 (C# now read by the script, checked 2026-11-02):** `claude.ai` appears only as an allowed browser origin in `McpCorsConfiguration.cs:10`, not a host it calls; `CallbackEndpoint.cs:117` logs the exception from a failed token exchange, not the token; the "ALWAYS" text in `HaloPsaSchema.cs:14` is guidance on finding tables for its SQL tool, usage advice like mspstack's.
