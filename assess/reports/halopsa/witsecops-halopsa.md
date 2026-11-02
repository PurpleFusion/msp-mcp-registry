# Assessment: @wit-secops/halopsa-mcp (`witsecops-halopsa`)

| | |
|---|---|
| Maintainer | WIT-SecOps (Winona IT) |
| Source | https://www.npmjs.com/package/@wit-secops/halopsa-mcp |
| Assessed at | version `0.8.0` (sha512-npXKN+8iGvsiaafAHYBgZ6BDx21bMEWVCw6gfnK/8teO7/yBOOVmmwCD8umSCDv/SGG+2oYbkgdD2VNpK7Hguw==) |
| Date | 2026-11-02 |
| Score | **83/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ✅ | 0 git tags, 6 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-05 |
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
| C1 | Credentials from environment | ✅ | 1 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | dist/index.js:5 |
| T1 | Tool list readable | ✅ | 17 tools found |
| T2 | Read-only possible | ✅ | read-only switch: dist/index.js:75 |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ | dist/index.js:193 function createServer(config) { \| dist/index.js:216 const server = createServer(config); |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **N2:** a false positive: `isEntryPoint` contains the letters "sEntry", which match the script's `sentry` pattern (`dist/index.js:227,238`).
- Read-only by default: write tools register only with `--read-write` or `HALOPSA_ALLOW_WRITE`, and `--read-only` always wins (`dist/index.js:164-171`). The OAuth scopes requested follow the mode, so a read-only server asks HaloPSA for read scopes only. Emailing customers (`halopsa_send_reply`) is a separate opt-in (`HALOPSA_ALLOW_EMAIL`).
- Published to npm only; the linked GitHub repo (`WIT-SecOps/halopsa-mcp`) isn't public, so the package can't be compared with source (P2). npm packages rarely ship a lockfile, so S1/S3 can't pass.

## Tools (17, read from source)

**halopsa_add_note**, **halopsa_assign_ticket**, halopsa_get_asset, halopsa_get_client, halopsa_get_project, halopsa_get_ticket, halopsa_get_user, halopsa_list_actions, halopsa_list_appointments, halopsa_list_asset_types, halopsa_list_projects, halopsa_list_ticket_actions, halopsa_list_tickets, **halopsa_send_reply**, **halopsa_set_ticket_client**, **halopsa_update_ticket_status**, halopsa_whoami

Bold: changes data (by its name).
