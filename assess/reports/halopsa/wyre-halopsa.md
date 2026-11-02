# Assessment: halopsa-mcp (`wyre-halopsa`)

| | |
|---|---|
| Maintainer | WYRE Technology |
| Source | https://github.com/WYRE-AI/halopsa-mcp |
| Assessed at | `v1.8.2` — commit `efb4b73ca4280bc8f5325c8a02079cab709bb553` |
| Date | 2026-11-02 |
| Score | **50/100** — capped: open to the network without authentication by default (max 50) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | Apache-2.0 |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ✅ | 42 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-29 |
| P5 | More than one contributor | ✅ | 4 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @hono/node-server@1.19.9: GHSA-92pp-h63x-v22m, @hono/node-server@1.19.9: GHSA-frvp-7c67-39w9, @hono/node-server@1.19.9: GHSA-wc8c-qw6v-h7f6, body-parser@2.2.2: GHSA-27r3-jxmh-p828, body-parser@2.2.2: GHSA-v422-hmwv-36x6, express-rate-limit@8.2.1: GHSA-46wh-pxpv-q5gq, fast-uri@3.1.0: GHSA-333x-w4r6-6crp, fast-uri@3.1.0: GHSA-4c8g-83qw-93j6, fast-uri@3.1.0: GHSA-7p8r-x3mc-p8w7, fast-uri@3.1.0: GHSA-f65p-4m7j-42xc, fast-uri@3.1.0: GHSA-hrr3-gc8f-f4qj, fast-uri@3.1.0: GHSA-jqff-g426-hqxp (+55 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 3 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 14 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | src/index.ts:31 |
| T1 | Tool list readable | ✅ | 29 tools found |
| T2 | Read-only possible | ❌ | 4 write tools; 4 don't start with a verb: halopsa_clients_create, halopsa_tickets_add_action, halopsa_tickets_create, halopsa_tickets_update |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ❌ (open by default) (script: flag) | src/index.ts:46 const host = process.env.MCP_HTTP_HOST \|\| "0.0.0.0"; |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **P2:** the script marked this unknown because `npm view` of the manifest name (`@wyre-ai/halopsa-mcp`) returned a 404 error object, which it read as a package. The package isn't on the public npm registry (WYRE publishes it to GitHub Packages), so installing from source at the commit above is the provable path.
- **D1 (confirmed):** stdio is the default when run from source or npm (`src/index.ts:183`). The Docker image and compose file switch to HTTP: `Dockerfile:28-31` sets `MCP_TRANSPORT=http`, `MCP_HTTP_HOST=0.0.0.0`, `AUTH_MODE=env`, and `docker-compose.yml:11` publishes port 8080 on all host interfaces. In that mode `/mcp` checks nothing unless `CONDUIT_S2S_SECRET` is set (`src/index.ts:72-77`), and every request runs with the HaloPSA client ID and secret from the environment, so anyone who can reach the port acts with them. The README's Docker example and DigitalOcean one-click deploy use that image. Run it over stdio, which is how Tabby9 would.
- **T2 (confirmed):** the "read-only switch" the script found is the word `readonly` inside an embedded HTML ticket card (`src/generated/ticket-card-html.ts:3`). There is no read-only setting, and write tools put the verb third (`halopsa_tickets_create`, `halopsa_tickets_update`, `halopsa_tickets_add_action`, `halopsa_clients_create`), so a deny rule has to name each one.
- Tools load in stages: only `halopsa_navigate` and `halopsa_status` are listed until a domain is picked, so a client sees a different list over a session. The HaloPSA HTTP client lives in a separate package (`@wyre-ai/node-halopsa`), which this assessment didn't read.
- **S3:** the lockfile pins versions with published advisories, including `@hono/node-server` 1.19.9, `body-parser` 2.2.2, `express-rate-limit` and `fast-uri`.

## Tools (29, read from source)

client-ticket-summary, client_name, days, halopsa_agents_get, halopsa_agents_list, halopsa_assets_get, halopsa_assets_list, halopsa_assets_list_types, halopsa_assets_search, halopsa_categories_get, halopsa_categories_list, **halopsa_clients_create**, halopsa_clients_get, halopsa_clients_list, halopsa_clients_search, halopsa_invoices_get, halopsa_invoices_list, halopsa_navigate, halopsa_status, halopsa_teams_list, **halopsa_tickets_add_action**, **halopsa_tickets_create**, halopsa_tickets_get, halopsa_tickets_list, **halopsa_tickets_update**, hours_ahead, queue-triage, sla-breach-alert, team_name

Bold: changes data (by its name).
