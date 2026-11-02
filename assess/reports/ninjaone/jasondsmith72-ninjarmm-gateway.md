# Assessment: NinjaRMM-API-Gateway-MCP (`jasondsmith72-ninjarmm-gateway`)

| | |
|---|---|
| Maintainer | jasondsmith72 |
| Source | https://github.com/jasondsmith72/NinjaRMM-API-Gateway-MCP |
| Assessed at | `main` — commit `d6a30e7466612d5e9f17b04ac2f9504e0964bb9c` |
| Date | 2026-11-02 |
| Score | **76/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-09-19 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ | 4 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 6 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ❌ (script: pass) |  |
| C4 | Runs locally (stdio) | ✅ | src/ninja_mcp/server.py:282 |
| T1 | Tool list readable | ✅ | 7 tools found |
| T2 | Read-only possible | ✅ | 1 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ❌ | call, raw_call |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **T3 (confirmed):** `call` sends any method to any endpoint in the bundled API spec, and `raw_call` takes a free-form `"METHOD /path"` string (`src/ninja_mcp/server.py:172,202`). The script's name patterns miss both. There is no read-only switch, so the API scopes you grant are the only limit.
- **C3 (confirmed):** its "fast memory" saves queries, including request bodies, to `~/.ninja-mcp/fast_memory.json` (`src/ninja_mcp/memory.py:13-16,40-60`), so client data can land on disk.
- **P1:** MIT is declared in `pyproject.toml` only; the repo has no licence file.
- No lockfile and no releases. `jasondsmith72/ninja-mcp` holds the same code and was not assessed separately.

## Tools (7, read from source)

call, describe_endpoint, find_endpoint, **memory_delete**, memory_list, memory_save, raw_call

Bold: changes data (by its name).
