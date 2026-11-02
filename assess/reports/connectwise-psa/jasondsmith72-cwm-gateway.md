# Assessment: CWM-API-Gateway-MCP (`jasondsmith72-cwm-gateway`)

| | |
|---|---|
| Maintainer | jasondsmith72 |
| Source | https://github.com/jasondsmith72/CWM-API-Gateway-MCP |
| Assessed at | `main` — commit `a34642e234a811cc8959d8a94d4912fe3cd4ff47` |
| Date | 2026-11-02 |
| Score | **60/100** — capped: no commercial-use licence (max 60) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ❌ | UNLICENSED |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ❌ | 0 git tags, 1 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2025-03-25 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ | 1 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 6 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ❌ (script: flag) | api_gateway/api_db_utils.py:9 import sqlite3 \| api_gateway/api_db_utils.py:24 self.conn = sqlite3.connect(self.db_path) \| api_gateway/api_db_utils.py:26 self.conn.row_factory = sqlite3.Row \| api_gateway/api_db_utils.py:344 db = APIDatabase("connectwise_api.db") \| api_gateway/fast_memory_db.py:10 import sqlite3 |
| C4 | Runs locally (stdio) | ✅ | api_gateway/server.py:710 |
| T1 | Tool list readable | ✅ | 11 tools found |
| T2 | Read-only possible | ✅ | 3 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ❌ | execute_api_call, send_raw_api_request |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **C3 (confirmed):** its "fast memory" saves queries, including request bodies, to a local SQLite file, so client data can land on disk.
- **T3:** `execute_api_call` and `send_raw_api_request` send any method to any endpoint, so no deny rule can make it read-only.
- No licence (caps the score). Last changed March 2025.

## Tools (11, read from source)

clear_fast_memory, **delete_from_fast_memory**, **execute_api_call**, get_api_endpoint_details, get_category_endpoints, list_api_categories, list_fast_memory, natural_language_api_search, save_to_fast_memory, search_api_endpoints, **send_raw_api_request**

Bold: changes data (by its name).
