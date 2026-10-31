# Review: <Server name> (`<id>`)

| | |
|---|---|
| Reviewer | <name> (`<reviewer id>`) |
| Date | YYYY-MM-DD |
| Pinned version | `<version>` — commit `<sha>` — sha256 `<hash>` |
| Maintainer | <name / org> |
| Verdict | **Reviewed** / stays **Listed** |
| Re-review due | YYYY-MM-DD |
| Conflicts of interest | None / <disclose> |

> This review records what a named person found in one specific version of this server. It is not a certification, a guarantee, or an endorsement of the vendor. A later version is unreviewed until someone reviews it.

## Summary (what the user sees)
Two or three sentences a technician can read before clicking Install. What it does, what it can change, the one thing to be careful of.

## 1. Identity and provenance
- Source: 
- Package built from source: yes/no — how verified
- Licence: 

## 2. Dependencies
- Count: 
- Post-install scripts: none / <list>
- Audit result: 

## 3. Network
- Endpoints: 
- Telemetry: none / <describe>
- TLS: verification intact

## 4. Credentials
- Read from env only: yes/no
- Appears in logs/errors: no / <where>
- Written to disk: no / <where>
- Least-privilege setup: 

## 5. Tools
| Tool | Reads | Writes | Returns secrets | Third-party text |
|---|---|---|---|---|
| | | | | |

- Read-only mode: native (`ENV=value`) / denyTools pattern `<pattern>` — verified covers all write tools: yes/no
- High-impact tools: 

## 6. Prompt-injection exposure
- Injection paths: 
- Mitigations in server: 
- Combination risk: 

## 7. Data handling
- Local cache: none / <path, contents>
- Tenant scoping: 
- Note: everything returned by a tool is sent to Anthropic as conversation context under the user's plan.

## 8. Operational
- Windows 11 install: 
- Tools exercised: 
- Bad-credential behaviour: 

## 9. Findings
Numbered. Severity: Blocker / Should fix / Note.

1. 

## Verdict reasoning
One paragraph.
