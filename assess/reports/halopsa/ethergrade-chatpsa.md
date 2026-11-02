# Assessment: ChatPSA open (`ethergrade-chatpsa`)

| | |
|---|---|
| Maintainer | ethergrade (INTELGUARD-IO) |
| Source | https://github.com/ethergrade/ChatPSA |
| Assessed at | `main` — commit `354d70132b392b094ad5166e41de6cd12dcd3679` |
| Date | 2026-11-02 |
| Score | **93/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-21 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | uv.lock |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ✅ | 48 locked packages, none with known vulnerabilities |
| S4 | 30 or fewer direct dependencies | ✅ | 0 direct |
| N1 | Only the vendor's API | ✅ (script: fail) | api.openai.com (src/chatpsa/ai.py:15) |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 39 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ (script: flag) | src/chatpsa/approvals.py:8 import sqlite3 \| src/chatpsa/approvals.py:82 else project_root() / "data" / "approvals.sqlite3" \| src/chatpsa/approvals.py:85 def _connect(self) -> sqlite3.Connection: \| src/chatpsa/approvals.py:87 connection = sqlite3.connect(self.path) \| src/chatpsa/approvals.py:88 connection.row_factory = sqlite3.Row |
| C4 | Runs locally (stdio) | ✅ | src/chatpsa/config.py:34 |
| T1 | Tool list readable | ✅ | 31 tools found |
| T2 | Read-only possible | ✅ | read-only switch: src/chatpsa/change_control.py:514 |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ | src/chatpsa/web.py:1231 uvicorn.run(app, host=host, port=port, log_level="info") |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **N1, C3:** the repo holds two programs. The MCP server (`chatpsa`, `src/chatpsa/server.py`) imports neither the OpenAI client (`ai.py`) nor the SQLite stores (`approvals.py`, `history.py`); those belong to the separate web "agent desk" (`chatpsa-web`, `src/chatpsa/web.py`), which listens on 127.0.0.1 by default (`web.py:1230`) and sends ticket images and questions to `api.openai.com`. Run only the MCP server and it talks to HaloPSA only and writes nothing to disk.
- **T2:** read-only by default: all 31 tools are registered, but write tools refuse to run unless `CHATPSA_ENABLE_WRITES` is true (`change_control.py:503`; default off, `src/chatpsa/config.py:33,117`), and each write also needs an exact confirmation phrase (corrected 2026-11-03: an earlier version said write tools weren't registered), and each write supports dry-run, confirmation and read-back. The script's "switch" hit is an unrelated `read_only` field in `web.py:188`.
- Its writes are to HaloPSA configuration (statuses, ticket types, categories), not tickets.
- Single contributor, no tags. Some user-facing text is in Italian.

## Tools (31, read from source)

get_ticket_safe, **halo_category_create**, **halo_category_delete**, halo_category_get, halo_category_list, **halo_category_update**, halo_connection_status, **halo_kb_article_create_plan**, halo_kb_get, halo_kb_search, halo_kb_tags, halo_outcome_get, halo_outcome_list, **halo_status_create**, **halo_status_delete**, halo_status_get, halo_status_list, **halo_status_update**, halo_ticket_investigate, halo_ticketrule_change_plan, halo_ticketrule_get, halo_ticketrule_list, **halo_tickettype_create**, **halo_tickettype_delete**, halo_tickettype_get, halo_tickettype_list, **halo_tickettype_update**, halo_workflow_change_plan, halo_workflow_diagnose, halo_workflow_get, halo_workflow_list

Bold: changes data (by its name).
