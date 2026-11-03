# Assessment: Autotask_MCP-public (RMM tools) (`aaroncampbell-autotask-rmm`)

| | |
|---|---|
| Maintainer | Aaron Campbell |
| Source | https://github.com/AaronCampbellit/Autotask_MCP-public |
| Assessed at | `main` — commit `b53c61d381c0325bc6db585f0a78c6343d8bd8d1` |
| Date | 2026-11-02 |
| Score | **60/100** — capped: no commercial-use licence (max 60) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ❌ | licence file present |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-09 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @modelcontextprotocol/server@2.0.0: GHSA-46jr-4wx8-v453, @modelcontextprotocol/server@2.0.0: GHSA-f897-62hf-6gxq, @modelcontextprotocol/server@2.0.0: GHSA-jm63-cq47-j5jp, @modelcontextprotocol/server@2.0.0: GHSA-rvq5-wwqv-78pq, zod@4.6.2: GHSA-mrhx-c7xc-m3w5 |
| S4 | 30 or fewer direct dependencies | ✅ | 4 direct |
| N1 | Only the vendor's API | ❌ | login.microsoftonline.com (apps/server/src/app.ts:213), autotask.net (packages/autotask/src/impersonation.ts:8), webservices3.autotask.net (packages/autotask/src/index.ts:651), api.itglue.com (packages/itglue/src/client.ts:5), api.eu.itglue.com (packages/itglue/src/client.ts:5), api.au.itglue.com (packages/itglue/src/client.ts:5), graph.microsoft.com (packages/onboarding/src/index.ts:22), ww2.autotask.net (packages/technician/src/web-links.ts:2) |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 12 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ❌ (script: flag) | apps/server/src/main.ts:3 import { mkdir,writeFile } from 'node:fs/promises'; \| apps/server/src/main.ts:15 if('tokens'in system){await mkdir('work',{recursive:true});await writeFile('work/demo-credentials.json',JSON.stringify(system.tokens.map(({name,token})=>({name, \| packages/artifacts/src/files.ts:3 import { lstat, mkdir, open, realpath, unlink, writeFile } from 'node:fs/promises'; \| packages/artifacts/src/files.ts:45 try { await writeFile(await this.path(record), Buffer.concat([magic, nonce, cipher.getAuthTag(), encrypted]), { flag: 'wx', mode: 0o600, signal }); } \| packages/autotask-config/src/handoff.ts:2 import {mkdir,readFile,writeFile,stat} from 'node:fs/promises'; |
| C4 | Runs locally (stdio) | ❌ | no local stdio transport found |
| T1 | Tool list readable | ✅ | 10 tools found |
| T2 | Read-only possible | ✅ | read-only switch: apps/console/public/autotask.js:1 |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ (script: flag) | packages/workflows/src/ticket-tags.ts:20 /** One ticket tag association at a time; mutations always use the Tickets child route. */ |
| D1 | HTTP mode safe | ✅ (script: flag) | apps/server/src/main.ts:58 server.listen(port,fixture?'127.0.0.1':'0.0.0.0',()=>{if(process.env.JOB_WORKER_ENABLED!=='false'&&(!('recoveryMode'in system)\|\|!system.recoveryMode))system.wor |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **What it is:** a hosted, multi-user Autotask PSA server with a web console that also has 55 Datto RMM tools (`docs/DATTO-RMM.md`). It needs PostgreSQL and Microsoft Entra ID sign-in, and has no stdio mode (C4).
- **Licence:** "All rights reserved"; no right to copy or deploy is granted (`LICENSE`), which caps the score.
- **P2:** the package name `rarity-autotask-mcp` is not on npm; the script read npm's "not found" reply as a package without provenance.
- **D1:** listens on all interfaces, but `/mcp` requires an Entra ID bearer token on every request (`apps/server/src/app.ts:225-227`).
- **C3 (confirmed):** state lives in PostgreSQL, including the Datto key and secret, which are stored encrypted (`docs/DATTO-RMM.md`); fixture mode writes demo tokens to `work/demo-credentials.json` (`apps/server/src/main.ts:15`).
- **N1:** the other hosts are its other integrations (Autotask, IT Glue, Microsoft Graph and sign-in).
- **Running jobs on devices:** `rmm_quickjob_run` only runs components an administrator approved in the console, with fixed variable values the model can't change, for users granted `rmm.execute` (`packages/rmm/src/service.ts:29,40`).
- **T1:** the RMM tools are declared in a form the script doesn't read, so the 10 tools found are mostly Autotask.
- **T4:** the hit is a code comment.
- **S3:** the lockfile pins `@modelcontextprotocol/server` 2.0.0 and `zod` versions with advisories.

## Tools (10, read from source)

at_operation_resume, at_operation_status, at_whoami, ticket_context, ticket_document_work, **ticket_note_add**, ticket_search, **ticket_update**, time_entry_search, **time_log_ticket**

Bold: changes data (by its name).
