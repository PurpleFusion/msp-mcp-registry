# Assessment: Ninjaone-MCP (`soroushalamdari-ninjaone`)

| | |
|---|---|
| Maintainer | SoroushAlamdari |
| Source | https://github.com/SoroushAlamdari/Ninjaone-MCP |
| Assessed at | `main` — commit `27de20c4b08d3f603b0949bf2389cece014c1765` |
| Date | 2026-11-02 |
| Score | **77/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-25 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ | 3 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 24 reads |
| C2 | Credentials never logged | ✅ (script: flag) | get-oauth-token.js:93 console.error("Authorization failed:", error); \| get-oauth-token.js:114 console.log(`Token saved to ${TOKEN_FILE}`); \| get-oauth-token.js:122 console.error("Token exchange failed:", e.response ? JSON.stringify(e.response.data) : e.message); \| src/index.ts:34 if (process.env.DEBUG) console.error("Using saved token file"); \| src/index.ts:38 if (process.env.DEBUG) console.error("Using token from NINJA_ACCESS_TOKEN"); |
| C3 | Nothing written to disk | ❌ (script: flag) | get-oauth-token.js:110 fs.writeFileSync(TOKEN_FILE, JSON.stringify(token, null, 2), { mode: 0o600 }); \| src/oauth.ts:112 fs.writeFileSync(TOKEN_FILE, JSON.stringify(this.token, null, 2), { mode: 0o600 }); |
| C4 | Runs locally (stdio) | ✅ (script: fail) | no local stdio transport found |
| T1 | Tool list readable | ✅ | 21 tools found |
| T2 | Read-only possible | ✅ | 6 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ❌ | api_post |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ (script: flag) | get-oauth-token.js:127 server.listen(port, () => console.log(`Waiting for sign-in on port ${port}...`)); |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **C4:** runs over stdio through its own JSON-RPC loop rather than the MCP SDK (`src/index.ts:144`), which is why the script didn't find a transport.
- **T3 (confirmed):** `api_get` and `api_post` send a GET or POST to any API path (`src/index.ts:123-128`, `src/tools.ts:273,288`).
- **C3 (confirmed):** the OAuth token, including the refresh token, is saved to `token.json` in the install folder unless `NINJA_TOKEN_FILE` says otherwise (owner-only, `src/oauth.ts:8-10,112`).
- **C2:** the flagged lines log the token file's path, NinjaOne's error response and debug messages, not the token.
- Also has `run_script` and `reboot_device` (`src/tools.ts:73,92`) and no read-only switch.
- No lockfile; `@anthropic-ai/sdk` is a runtime dependency used only for a type.
- **D1:** the only listener is `get-oauth-token.js:127`, a one-off sign-in helper that waits for the OAuth redirect; the MCP server itself has no HTTP mode.

## Tools (21, read from source)

**add_ticket_comment**, api_get, **api_post**, **create_ticket**, get_all_alerts, get_antivirus_status, get_device, get_device_alerts, get_device_health, get_device_software, get_organization, get_os_patches, get_software_patches, get_ticket, list_contacts, list_devices, list_organizations, **reboot_device**, **run_script**, search_devices, **update_ticket**

Bold: changes data (by its name).
