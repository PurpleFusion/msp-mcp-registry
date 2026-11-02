# Assessment: @alfe.ai/connectwise-psa-mcp (`alfe-connectwise-psa`)

| | |
|---|---|
| Maintainer | Alfe (kevupton) |
| Source | https://www.npmjs.com/package/@alfe.ai/connectwise-psa-mcp |
| Assessed at | version `0.1.13` (sha512-+DCo+1Wjl3S1JLFYKl57/7/G1mnJ37heiELMO72qHZxSBuOXoghU+g0Yj29xjE+gMMsbki9XFjg5Wc72qcyCaA==) |
| Date | 2026-11-02 |
| Score | **60/100** — capped: no commercial-use licence (max 60) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ❌ | UNLICENSED |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ✅ | 0 git tags, 14 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-28 |
| P5 | More than one contributor | ✅ | 2 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ | 4 direct |
| N1 | Only the vendor's API | ❌ (script: pass) | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ❌ (script: unknown) | no environment reads found |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | dist/server2.cjs:478 |
| T1 | Tool list readable | ✅ | 5 tools found |
| T2 | Read-only possible | ✅ | read-only switch: dist/server2.cjs:325 |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ (script: flag) | dist/server2.cjs:41 ["0.0.0.0", 8], \| dist/server2.cjs:457 function createServer(connect, options = {}) { \| dist/server2.cjs:479 const server = createServer(connect); \| dist/server2.js:41 ["0.0.0.0", 8], |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **N1, C1 (confirmed):** every ConnectWise call goes through Alfe's API (`@alfe.ai/agent-api-client`, URL from `alfe login`). Your ConnectWise credentials are stored in Alfe's "Connections", not on your machine, so Alfe sees credentials and data.
- **D1:** `0.0.0.0` appears in a blocklist of private address ranges, not a listener; the server runs over stdio only.
- Licence is `UNLICENSED` (no right to use granted), which caps the score.

## Tools (5, read from source)

**connectwise_psa_add_ticket_note**, **connectwise_psa_create_ticket**, connectwise_psa_list_board_statuses, connectwise_psa_list_ticket_notes, **connectwise_psa_update_ticket**

Bold: changes data (by its name).
