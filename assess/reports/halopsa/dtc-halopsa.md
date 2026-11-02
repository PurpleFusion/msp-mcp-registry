# Assessment: halopsa-mcp (Rust) (`dtc-halopsa`)

| | |
|---|---|
| Maintainer | DTC-Inc |
| Source | https://github.com/DTC-Inc/halopsa-mcp |
| Assessed at | `main` — commit `24eea35bb98b6715b32cf4fee91218e9cb26deb0` |
| Date | 2026-11-02 |
| Score | **60/100** — capped: no commercial-use licence (max 60) |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ❌ | no licence |
| P2 | Install provably built from source | ✅ | installed from a pinned commit |
| P3 | Versioned releases | ❌ | 0 git tags, 0 published versions |
| P4 | Changed in last 90 days | ✅ | last change 2026-10-30 |
| P5 | More than one contributor | ✅ | 2 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ✅ | Cargo.lock |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❌ | anyhow@1.0.102: RUSTSEC-2026-0190, core2@0.4.0: RUSTSEC-2026-0105, crossbeam-epoch@0.9.18: RUSTSEC-2026-0204, event-listener@5.4.1: RUSTSEC-2026-0221, h2@0.4.13: RUSTSEC-2026-0258, number_prefix@0.4.0: RUSTSEC-2025-0119, paste@1.0.15: RUSTSEC-2024-0436, tokio@1.50.0: RUSTSEC-2026-0386, webpki-root-certs@1.0.6: RUSTSEC-2026-0383, webpki-roots@1.0.6: RUSTSEC-2026-0381 |
| S4 | 30 or fewer direct dependencies | ❔ |  |
| N1 | Only the vendor's API | ✅ (script: fail) | api.openai.com (crates/hmcp-embedder/src/main.rs:44) |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 26 reads |
| C2 | Credentials never logged | ✅ (script: flag) | crates/hmcp-server/src/oauth.rs:240 eprintln!("HaloPSA token exchange failed: {e}"); \| crates/hmcp-server/src/oauth.rs:251 eprintln!("HaloPSA token exchange error: {body}"); \| crates/hmcp-server/src/sse.rs:156 eprintln!("Token cleanup error: {e}"); |
| C3 | Nothing written to disk | ❌ (script: pass) |  |
| C4 | Runs locally (stdio) | ❌ | no local stdio transport found |
| T1 | Tool list readable | ✅ (script: fail) | 0 tools found |
| T2 | Read-only possible | ✅ (script: unknown) | 0 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ (script: unknown) |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | ✅ (script: flag) | crates/hmcp-embedder/src/main.rs:114 let host = env::var("HMCP_EMBED_HOST").unwrap_or_else(\|_\| "0.0.0.0".into()); \| crates/hmcp-server/src/main.rs:32 let host = env::var("HMCP_HOST").unwrap_or_else(\|_\| "0.0.0.0".into()); |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- **C4:** a hosted service only: SSE and Streamable HTTP, with Postgres (pgvector) required (`crates/hmcp-server/src/main.rs`). There is no stdio mode.
- **C1:** settings come from `env::var` (`main.rs:24-46`); the script's pattern only matches `std::env::var`.
- **D1:** listens on `0.0.0.0:8080` by default, but every MCP request needs a bearer token from its OAuth relay to HaloPSA (`sse.rs:163-234`), and calls run with that user's HaloPSA permissions.
- **D2:** the hits are `tokio::spawn` (async tasks), not processes.
- **N1:** the optional semantic-search embedder sends ticket text to `api.openai.com` only if `HMCP_EMBED_PROVIDER=openai` (`crates/hmcp-embedder/src/main.rs:41-46`). The default is a local model (fastembed), which downloads its model files on first run.
- **C3 (confirmed):** stores HaloPSA tokens in Postgres, encrypted with AES-256-GCM (`HMCP_ENCRYPTION_KEY`), and, with semantic search on, ticket text and embeddings in a `chunks` table (`crates/hmcp-db-postgres/src/lib.rs:134,441`).
- **C2:** the flagged lines log HaloPSA's error response to a token exchange, not the secret.
- **T1, T2, T3:** 18 tools defined as JSON in `crates/hmcp-server/src/tools.rs`, which the script's patterns don't read. The write tools start with a verb (`create_ticket`, `update_ticket`, `create_action`, `execute_workflow_action`, `reembed`). `execute_workflow_action` runs a workflow transition on a ticket, not an arbitrary request.
- **S3:** `Cargo.lock` is present but the script doesn't check Rust crates with OSV.
- No licence (caps the score), no tags.
