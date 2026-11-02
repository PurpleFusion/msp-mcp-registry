# Assessment: itglue-mcp (am3cramirez) (`am3cramirez-itglue`)

| | |
|---|---|
| Maintainer | am3cramirez |
| Source | https://github.com/am3cramirez/itglue-mcp |
| Assessed at | `claude/itglue-mcp-hermes-3anfph` — commit `c7d9b54530ac03cd95fef721af27a32ebe072bf3` |
| Date | 2026-11-02 |
| Score | **77/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-07-10 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.14: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.14: GHSA-rmxm-3fg6-px4f, @modelcontextprotocol/sdk@1.29.0: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.29.0: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.29.0: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.29.0: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.29.0: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.29.0: GHSA-rvq5-wwqv-78pq, body-parser@2.3.0: GHSA-27r3-jxmh-p828, fast-uri@3.1.3: GHSA-333x-w4r6-6crp, fast-uri@3.1.3: GHSA-5jgf-p345-68v8, fast-uri@3.1.3: GHSA-7p8r-x3mc-p8w7 (+31 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 2 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 8 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | src/index.ts:4 |
| T1 | Tool list readable | ✅ (script: fail) | 0 tools found |
| T2 | Read-only possible | ✅ | read-only switch: src/client.ts:32 |
| T3 | No arbitrary-request tool | ❌ (script: unknown) |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ❌ (script: flag) | src/index.ts:75 httpServer.listen(port, () => { |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Passwords:** `get_password` returns the decrypted value by default (`show_password` defaults to true, `src/tools/passwords.ts:47-58`), and `itglue_raw_request` can also reach `/passwords`. `ITGLUE_ALLOW_WRITES=false` blocks writes, not password reads.
- **P2:** not on npm (`package.json` names `@am3cramirez/itglue-mcp`, which the registry doesn't have), so it is installed from a pinned commit.
- **T1:** 49 tools, registered through a `tool(server, client, "name", ...)` helper (`src/helpers.ts`) the script doesn't read.
- **T2:** `ITGLUE_ALLOW_WRITES=false` blocks every non-GET request, and deletes are off unless `ITGLUE_ALLOW_DELETES=true` (`src/client.ts:32-33,120-129`).
- **T3 (confirmed):** `itglue_raw_request` sends GET, POST, PATCH or DELETE to any path (`src/tools/misc.ts:249-268`), subject to those switches.
- **D1:** the default is stdio. `MCP_TRANSPORT=http` listens on all interfaces (`httpServer.listen(port)`, `src/index.ts:75`) and checks a bearer token only when `MCP_HTTP_AUTH_TOKEN` is set. Opt-in, so it fails D1 without the open-by-default cap.
- Single commit, on a `claude/` default branch; no tags.
