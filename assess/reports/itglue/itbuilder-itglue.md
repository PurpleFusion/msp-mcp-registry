# Assessment: itglue-mcp (ITbuilder) (`itbuilder-itglue`)

| | |
|---|---|
| Maintainer | ITbuilder Ltd |
| Source | https://github.com/ITbuilder-Ltd/itglue-mcp |
| Assessed at | `main` — commit `fd6835e89e68ac7c944e72496a8a31871654a40d` |
| Date | 2026-11-02 |
| Score | **84/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-20 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ | 0 direct |
| N1 | Only the vendor's API | ✅ (script: fail) | login.microsoftonline.com (itglue_mcp/server/entra.py:68), global.consent.azure-apim.net (itglue_mcp/server/entra.py:75) |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 4 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | itglue_mcp/server/serve.py:32 |
| T1 | Tool list readable | ✅ (script: fail) | 0 tools found |
| T2 | Read-only possible | ✅ (script: unknown) | 0 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ (script: unknown) |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ (script: flag) | itglue_mcp/server/serve.py:44 """True for localhost and for an address that ipaddress says is loopback. "0.0.0.0", "::" and every |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Passwords:** none, whatever the key's Password Access setting. A password guard refuses any request whose URL or body mentions a password (including percent-encoded), a password version or an export, and strips password relationships, attributes and included records from every reply (`itglue_mcp/api/guard.py`; `itglue_mcp/api/client.py:519-521,768`). Writes that would change a flexible asset's password field are refused (`client.py:647-694`), and credential-like text in documents is redacted.
- **T1:** 10 tools in `itglue_mcp/server/tools.py` (`describe_resources`, `list_records`, `get_record`, `create_record`, `update_records`, `publish_document`, `delete_records`, `find_documents`, `get_document`, `list_document_folders`), registered through a decorator the script doesn't read. A tool the policy can't perform isn't offered.
- **T2, T3:** read-only by default; writes need `ITGLUE_WRITES=1` plus an allow-list of organizations. The record tools take a resource name from a fixed list, never a path, verb or URL.
- **N1:** the Microsoft hosts are Entra sign-in for HTTP mode (`itglue_mcp/server/entra.py:68,75`).
- **D1:** binds 127.0.0.1 by default and refuses to listen on another address without Entra sign-in unless `ITGLUE_MCP_UNAUTHENTICATED=1` (`itglue_mcp/server/serve.py:63-68`). The flagged line is a docstring.
- The default transport is HTTP on localhost; `serve --transport stdio` runs it locally.
- **S1:** `fastmcp==4.1.0` is pinned, but there is no lockfile for its dependencies.
- **T2:** read-only by default: a deployment's grant is `READ_ONLY` unless configured otherwise, and anything unexpected falls back to it (`itglue_mcp/server/deployment.py:35-61`).
