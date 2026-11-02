# Review checklist

A server earns the **Reviewed** tier when a named reviewer has worked through every item below against one pinned version and recorded the result in `reviews/<id>.md`. A review applies to that version only. A new upstream release returns the entry to **Listed** until re-reviewed, and the Tabby9 panel shows a stale badge when `review.expires` has passed.

"Reviewed" means *we read it and this is what it does*. It is not a guarantee, a certification or an endorsement of the vendor. Say so in the review.

## 1. Identity and provenance
- [ ] Source repository identified; the published package (npm/PyPI/image) is built from it. Spot-check: the tarball's `package.json` version and a hash of one file match the tagged commit.
- [ ] Maintainer is a real, findable person or company. Record who.
- [ ] Pinned: version, commit, and sha256 of the published artifact recorded in `registry.json`.
- [ ] Licence allows commercial use.

## 2. Dependencies
- [ ] `npm ls` / `pip freeze` captured. Dependency count noted. Anything unusual (post-install scripts, native builds, obfuscated packages) called out.
- [ ] No post-install scripts that download or execute code.
- [ ] Known-vulnerability scan run (`npm audit`, `pip-audit`, or `osv-scanner`) with the result recorded.

## 3. Network behaviour
- [ ] Every outbound hostname in the code listed. Expected: the vendor's API only.
- [ ] No telemetry, analytics, update checks or "phone home" to the maintainer or any third party. If there is any, `network.telemetry = true` and the entry **cannot** be Reviewed until it can be disabled by env var.
- [ ] TLS verification not disabled anywhere (search for `rejectUnauthorized`, `verify=False`, `NODE_TLS_REJECT_UNAUTHORIZED`).

## 4. Credential handling
- [ ] Credentials are read from environment variables only. Never from a file the server writes, never hard-coded, never logged.
- [ ] Credentials never appear in tool results, error messages or debug output. Grep for the env var names near any `console.log`, `logger`, `print`, or thrown error.
- [ ] Tokens are not written to disk (no cache files containing OAuth tokens unless the location and permissions are documented and acceptable).
- [ ] Least-privilege guidance written: the minimum vendor-side role or scope that makes the server work. This goes in `credentials[].leastPrivilege`.

## 5. Tool surface
- [ ] Every tool listed with a one-line description of what it reads or changes. Attach the list to the review.
- [ ] `scope.reads` and `scope.writes` in `registry.json` are complete and in plain English a tech would recognise.
- [ ] Any tool that can return a stored password, key, secret, or connection string identified. `scope.touchesSecrets` set accordingly.
- [ ] Any tool that executes code on an endpoint, changes security settings, deletes data, or sends outbound mail/notifications identified and listed under `warnings`.
- [ ] Read-only mode: either a native switch (env var / scope) documented, or a `denyTools` pattern that Tabby9 can enforce. Verified that the deny list actually covers every write tool.
- [ ] Tool descriptions contain no instructions aimed at the model beyond describing the tool (no "always", "ignore", "you must" style text). Tool descriptions are prompt surface; treat anything odd here as a finding.

## 6. Prompt-injection exposure
- [ ] Which tools return data authored by third parties (ticket bodies, emails, document contents, device names)? Those are injection paths. Listed in the review.
- [ ] Does the server sanitise, truncate or label untrusted content? Note what it does; note if it does nothing.
- [ ] Combination risk: if this server has write tools and also returns third-party text, say so plainly in `warnings`. Recommend running it read-only or alongside no shell/browser tools.

## 7. Data handling
- [ ] Nothing is cached to disk beyond what's documented (some servers mirror the tenant into local SQLite; if so, where, and does it contain secrets?).
- [ ] Multi-tenant: can the server be scoped to one client/tenant? Document how, or record that it cannot.
- [ ] Note for the user: everything a tool returns is sent to Anthropic as conversation context under the user's plan terms. Reviewer confirms the review text says this.

## 8. Operational
- [ ] Installs cleanly on Windows 11 via the documented method with no admin rights.
- [ ] Runs with the least-privilege credentials from §4 and the documented read-only mode. At least three read tools exercised against a real or sandbox tenant.
- [ ] Error behaviour on bad credentials is sane (fails closed, no credential echo).
- [ ] Reasonable startup time (< 5s) and no runaway processes.

## 9. Verdict
- [ ] Tier recommended: `reviewed` or stays `listed`, with one paragraph of reasoning.
- [ ] `warnings` finalised: each one a fact with a `source`, at the level defined in README.md (critical / high / medium / low / info). It is what the user sees in Tabby9 before they click Install.
- [ ] `review.expires` set: 6 months, or sooner if the maintainer ships fast.
- [ ] Reviewer has no undisclosed interest in the vendor or maintainer. If any, disclosed at the top of the review and a second reviewer signs off.

## What a review is not
It is not a penetration test of the vendor's API, a legal opinion on the vendor's terms, or a promise that the maintainer won't ship something different tomorrow — which is exactly why reviews are pinned to a version and Tabby9 pins installs to the reviewed version.
