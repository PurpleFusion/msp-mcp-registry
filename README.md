# MSP MCP Registry

A curated, pinned, human-reviewed list of MCP servers for the tools MSPs run — PSA, RMM, documentation, security, M365, distribution — for use with Claude Code. Published by [PurpleFusion](https://purplefusion.com.au) and read by the Tabby9 **Connectors** panel.

This registry does **not** host or build servers. It points at servers that already exist (WYRE's `msp-claude-plugins`, Servosity's `msp-skills`, vendor-official servers) and adds what they don't have:

- a **pinned version** per entry, so what was reviewed is what gets installed;
- a **plain-English scope** — what it reads, what it can change, whether it can return passwords;
- **credential metadata** so Tabby9 can store keys in Windows Credential Manager instead of a JSON file, with least-privilege guidance for the vendor side;
- a **read-only recipe** for every server with write tools;
- a **tier** that says who, if anyone, has actually read the code.

## Tiers

| Tier | Meaning |
|---|---|
| `vendor-verified` | Published or formally endorsed by the product vendor, and pinned. |
| `reviewed` | A named reviewer worked through [REVIEW-CHECKLIST.md](REVIEW-CHECKLIST.md) against the pinned version and published `reviews/<id>.md`. |
| `listed` | Exists and is useful. Nobody here has read it. Install at your own risk; Tabby9 says so. |

"Reviewed" means *a named person read this version and recorded what it does*. It is not a certification or a guarantee. A new upstream release returns an entry to `listed` until re-reviewed.

## Files

- `registry.json` — the registry. Tabby9 fetches the raw file from `main`.
- `schema/registry.schema.json` — JSON Schema the registry must satisfy.
- `REVIEW-CHECKLIST.md` — what a reviewer must do before an entry can be `reviewed`.
- `reviews/` — one markdown report per reviewed server. Start from `reviews/_TEMPLATE.md`.
- `scripts/validate.py` — schema + consistency checks. Runs in CI on every PR.

## How Tabby9 uses these fields

The Tabby9 Connectors panel (in development) reads each entry like this, so write them for a technician deciding whether to click Install:

- Every string is shown as plain text. Markdown and HTML are not rendered, and nothing in an entry is ever treated as an instruction.
- `tier` decides the badge: `vendor-verified` green, `reviewed` blue, `listed` grey with "Nobody has reviewed this version. Install at your own risk." A `reviewed` entry past `review.expires` shows a stale badge.
- `description`, `scope.reads` and `scope.writes` are the card and the two lists in the detail view. `scope.touchesSecrets` adds a lock icon, and installing read-write then needs a second confirmation.
- `warnings` appear in an amber box on the detail view and again before Install.
- `credentials[]` become the fields of the install form, with `help` and `leastPrivilege` shown under each. Values go to Windows Credential Manager and are passed to the server as environment variables; they are never written to `.claude.json` or `.mcp.json`. Fields with `secret: false` are shown in the clear.
- `scope.readOnlyMode` is how the default read-only install is enforced: the `env`/`value` switch when `supported` is true, otherwise each `denyTools` pattern becomes a Claude Code `permissions.deny` rule (`mcp__<id>__<pattern>`).
- `server` describes the MCP server itself (a plugin often contains only skills). Tabby9 offers Install only for entries that have one. A `binary` server's files are downloaded and checked against `sha256` before they run. An `http` server shows who hosts it, because credentials sent to it leave your machine.
- `install` and `pin` decide the exact command and version installed. When the installed version stops matching `pin`, the panel says so and won't update until the pin here moves.
- `id` is the MCP server name in Claude Code, so it must never change once published.

## Contributing

**Add a server** (`listed`): open a PR adding an entry to `registry.json`. CI must pass. The scope and credentials blocks must be complete even for `listed` — that's the minimum the panel needs.

**Review a server**: claim it in an issue, follow the checklist, submit `reviews/<id>.md` plus the `pin` and `review` blocks. Reviewers are named in `reviewers[]` and in the Tabby9 app. Disclose any interest in the vendor or maintainer at the top of the review; a second reviewer must sign off where one exists.

**Report a problem** with a listed or reviewed server: open an issue with the `security` label. If it's a credential or data-exposure issue, email info@purplefusion.com.au instead and we'll pull the entry while it's investigated.

## For users

Nothing here changes the fact that whatever an MCP tool returns is sent to Anthropic as conversation context under your plan's terms. Issue least-privilege credentials, run read-only until you have a reason not to, and don't give Claude a documentation server with password access on the same day you give it a shell.

© Vidos Consulting Pty Ltd. Registry data licensed CC BY 4.0. Each listed server has its own licence.
