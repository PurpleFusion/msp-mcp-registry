# Assessment: ITGlue-MCP (`ellswoau-itglue`)

| | |
|---|---|
| Maintainer | ellswoau |
| Source | https://github.com/ellswoau/ITGlue-MCP |
| Assessed at | `main` — commit `05d1a9b0ec682fe16b51ddfd36f281210d83f756` |
| Date | 2026-11-02 |
| Score | **60/100** — capped: no commercial-use licence (max 60) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ❌ | no licence |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-01 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ | 4 direct |
| N1 | Only the vendor's API | ✅ (script: fail) | jsonapi.org (itglue_mcp/client.py:3), itg-prod-paperclip.s3.us-west-2.amazonaws.com (tests_sanity.py:352) |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 24 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | itglue_mcp/server.py:175 |
| T1 | Tool list readable | ✅ | 16 tools found |
| T2 | Read-only possible | ✅ | 3 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ❌ (script: flag) | itglue_mcp/server.py:211 host=args.host or "0.0.0.0", |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Passwords:** no password tools; it covers documents and organizations.
- **N1:** `jsonapi.org` is in a comment and the S3 host is in `tests_sanity.py`.
- **D1:** the default is stdio. `--transport http` or `sse` binds 0.0.0.0 (`itglue_mcp/server.py:211`) and checks a bearer token only when `ITGLUE_MCP_AUTH_TOKEN` is set (`server.py:75-78`); the bundled `docker-compose.yml` requires one. Opt-in, so it fails D1 without the open-by-default cap.
- **Local files:** `upload_document_file` reads any local path it is given and uploads the file to IT Glue (`itglue_mcp/tools/write_tools.py:80-97`).
- **N3:** `ITGLUE_VERIFY_SSL=false` turns certificate checks off for IT Glue calls; on by default.
- `config init` saves the API key in a JSON config file (owner-only) if you choose to use it.
- No licence (caps the score).

## Tools (16, read from source)

**create_document**, **create_document_section**, get_document, get_document_images, get_organization, get_related_items, itglue_config, list_document_folders, list_document_images, list_documents, list_organizations, publish_document, render_markdown_blocks, search_document_contents, search_documents, **upload_document_file**

Bold: changes data (by its name).
