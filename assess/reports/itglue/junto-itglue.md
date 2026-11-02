# Assessment: itglue-mcp-server (`junto-itglue`)

| | |
|---|---|
| Maintainer | Junto Platforms |
| Source | https://github.com/Junto-Platforms/itglue-mcp-server |
| Assessed at | `v1.0.3` — commit `b6eb12d15bab37652720552ee38337a95156395a` |
| Date | 2026-11-02 |
| Score | **83/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ✅ | npm provenance (https://slsa.dev/provenance/v1) |
| P3 | Versioned releases | ✅ | 4 git tags, 4 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-02-21 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.9: GHSA-92pp-h63x-v22m, @hono/node-server@1.19.9: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.9: GHSA-wc8c-qw6v-h7f6, @modelcontextprotocol/sdk@1.25.3: GHSA-22jm-h49p-29qw, @modelcontextprotocol/sdk@1.25.3: GHSA-345p-7cg4-v4c7, @modelcontextprotocol/sdk@1.25.3: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.25.3: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.25.3: GHSA-6qxp-vccf-f47h, @modelcontextprotocol/sdk@1.25.3: GHSA-f897-62hf-6gxq, @modelcontextprotocol/sdk@1.25.3: GHSA-rvq5-wwqv-78pq, ajv@8.17.1: GHSA-2g4f-4pwh-qvx6, axios@1.13.4: GHSA-35jp-ww65-95wh (+92 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 3 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 4 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | src/index.ts:6 |
| T1 | Tool list readable | ✅ | 13 tools found |
| T2 | Read-only possible | ✅ | 6 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ❌ (script: flag) | src/index.ts:325 app.listen(config.port, "0.0.0.0", () => { |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **Passwords:** no password tools. It covers documents, document sections and organizations only (13 tools).
- **D1:** the default is stdio. `--transport http` listens on 0.0.0.0 (`src/index.ts:325`) with no authentication on `/mcp`, using the server's IT Glue key. Opt-in, so it fails D1 without the open-by-default cap.
- **T2:** the "read-only switch" hit is a TypeScript `readonly` field (`src/services/itglue-client.ts:225`), not a switch. Every write tool starts with `itglue_create_`, `itglue_update_`, `itglue_delete_` or `itglue_publish_`.
- Published to npm with a provenance attestation. Last changed February 2026. `jason-sager/itglue-mcp-server` (npm `@jasonsager/itglue-mcp-server`) is a fork of this and wasn't assessed separately.
- **S3:** the lockfile pins `@modelcontextprotocol/sdk` 1.25.3 and `@hono/node-server` versions with advisories.

## Tools (13, read from source)

**itglue_create_document**, **itglue_create_document_section**, **itglue_delete_document_section**, **itglue_delete_documents**, itglue_get_document, itglue_get_document_section, itglue_get_organization, itglue_list_document_sections, itglue_list_documents, itglue_list_organizations, itglue_publish_document, **itglue_update_document**, **itglue_update_document_section**

Bold: changes data (by its name).
