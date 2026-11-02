# Assessment: halopsa-workflows-mcp (`ssmanji89-halopsa-workflows`)

| | |
|---|---|
| Maintainer | ssmanji89 |
| Source | https://github.com/ssmanji89/halopsa-workflows-mcp |
| Assessed at | `main` — commit `cf165d7fcbc50dd9d7fb83a04957bddb3760fcc2` |
| Date | 2026-11-02 |
| Score | **83/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ✅ | 0 git tags, 11 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2025-04-02 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | package-lock.json |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | @modelcontextprotocol/sdk@1.8.0: GHSA-46jr-4wx8-v453, @modelcontextprotocol/sdk@1.8.0: GHSA-6prh-2h8m-c8cw, @modelcontextprotocol/sdk@1.8.0: GHSA-8r9q-7v3j-jr4g, @modelcontextprotocol/sdk@1.8.0: GHSA-rvq5-wwqv-78pq, @modelcontextprotocol/sdk@1.8.0: GHSA-w48q-cv73-mx4w, body-parser@2.2.0: GHSA-27r3-jxmh-p828, body-parser@2.2.0: GHSA-v422-hmwv-36x6, body-parser@2.2.0: GHSA-wqch-xfxh-vrr4, qs@6.14.0: GHSA-4mjr-xmp4-gh2g, qs@6.14.0: GHSA-6pq8-jhm2-2vcw, qs@6.14.0: GHSA-6rw7-vpxm-498p, qs@6.14.0: GHSA-q8mj-m7cp-5q26 (+78 more) |
| S4 | 30 or fewer direct dependencies | ✅ | 7 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 42 reads |
| C2 | Credentials never logged | ✅ (script: flag) | src/api/client.js:35 logger.info(`Client Secret: ${this.config.clientSecret.substring(0, 10)}...`); \| src/api/client.js:55 logger.debug('Using cached token'); \| src/api/client.js:59 logger.info('Getting new auth token...'); \| src/api/client.js:65 logger.debug(`Token URL: ${tokenUrl}`); \| src/api/client.js:90 logger.info(`Successfully obtained auth token, expires in ${expires_in} seconds`); |
| C3 | Nothing written to disk | ✅ (script: flag) | src/utils/logging.js:45 fs.appendFileSync(LOG_FILE, message + '\n'); |
| C4 | Runs locally (stdio) | ✅ | src/config/index.js:52 |
| T1 | Tool list readable | ✅ | 7 tools found |
| T2 | Read-only possible | ✅ | 2 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **C4:** stdio is the default; the script's pattern misses FastMCP's `transportType: 'stdio'` (`src/config/index.js:52`).
- **C2, C3, D2:** the hits are in folders the script doesn't skip but the installed server never loads: `backup/`, `patches/`, and test scripts at the repo root (`test-*.js`, `halopsa-mcp-test.js`). The server (`halopsa-mcp.js` → `src/index.js`) writes a log file only if `LOG_TO_FILE=true` (`src/utils/logging.js:14`). An older alternative entry point, `src/halopsa-mcp.js`, prints the client secret's first and last 3 characters at startup (`src/halopsa-direct.js:65`), but the package's `bin` doesn't run it.
- Only workflow tools (8), including `createWorkflows` and `deleteWorkflow`.
- Last changed April 2025, single maintainer. Published to npm as `halopsa-workflows-mcp` 1.1.0 without a provenance attestation. The repo also commits old package tarballs (`halopsa-workflows-mcp-0.x.tgz`).
- **S3:** the lockfile pins `@modelcontextprotocol/sdk` 1.8.0 and other versions with published advisories.

## Tools (7, read from source)

**createWorkflows**, **deleteWorkflow**, getWorkflow, getWorkflowSteps, getWorkflows, halopsa-workflows, healthcheck

Bold: changes data (by its name).
