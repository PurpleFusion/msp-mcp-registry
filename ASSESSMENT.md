# Assessment rubric

An **assessment** is a desk review: the source and the published release are read, and nothing is run against a tenant. It answers "what does this code do and how was it shipped?" in about the time it takes to read a README, so servers for the same product can be compared side by side. It sits below a full **review** ([REVIEW-CHECKLIST.md](REVIEW-CHECKLIST.md)), which also runs the server with real, least-privilege credentials.

`scripts/assess.js` does the reading: it downloads the source at one commit (or the published package), searches it, and asks GitHub, npm, PyPI and [OSV](https://osv.dev) about it. It never runs the candidate's code. Its pattern searches can be wrong in both directions, so every flagged item gets a human look, and the report says what was confirmed. A score applies to the commit or version it names, nothing else.

## Checks and weights

Each check passes, fails, or doesn't apply (n/a). The score is the share of applicable weight that passed, out of 100. "Unknown" counts as not passed.

| # | Category | Check | Weight |
|---|---|---|---|
| P1 | Provenance | Has a licence that allows commercial use (MIT, Apache-2.0, BSD, ISC, MPL) | 4 |
| P2 | Provenance | What you install is provably built from the source: npm/PyPI provenance attestation, or installed from a pinned commit | 4 |
| P3 | Provenance | Ships versioned releases or tags | 3 |
| P4 | Provenance | Changed in the last 90 days | 3 |
| P5 | Provenance | More than one contributor | 2 |
| P6 | Provenance | Has a security policy (SECURITY.md) | 2 |
| P7 | Provenance | Not archived | 2 |
| S1 | Supply chain | Dependencies are locked (lockfile) | 4 |
| S2 | Supply chain | No install-time scripts (preinstall, install, postinstall, prepare, custom setup.py) | 4 |
| S3 | Supply chain | No known vulnerabilities in locked dependencies (OSV) | 5 |
| S4 | Supply chain | 30 or fewer direct dependencies | 2 |
| N1 | Network | Talks only to the vendor's API (no other hosts in code) | 8 |
| N2 | Network | No telemetry or analytics | 6 |
| N3 | Network | TLS certificate checks never turned off | 6 |
| C1 | Credentials | Reads credentials from environment variables | 5 |
| C2 | Credentials | Never logs credentials | 6 |
| C3 | Credentials | Writes nothing to disk (no token or data cache) | 4 |
| C4 | Credentials | Runs on your machine (stdio), not only as a hosted service | 5 |
| T1 | Tools | Tool list can be read from the source | 3 |
| T2 | Tools | Read-only switch built in, or every write tool starts with a verb a deny rule can match | 5 |
| T3 | Tools | No tool that sends an arbitrary API request (which no deny rule can make read-only) | 3 |
| T4 | Tools | Tool descriptions describe tools; none tries to instruct the model | 4 |
| D1 | Data | Any HTTP mode binds to localhost or requires a token | 5 |
| D2 | Data | Doesn't run shell commands or evaluate code | 5 |

## Caps

Some findings matter more than any total, so they cap the score, confirmed by a person before it is published:

| Finding | Score capped at |
|---|---|
| Archived | 30 |
| Telemetry or analytics confirmed | 40 |
| TLS checks turned off confirmed | 40 |
| Credentials logged confirmed | 40 |
| By default, open to the network without authentication | 50 |
| No licence | 60 |
| Tool description instructs the model, confirmed | 60 |

## What an assessment is not

It isn't a review: nothing is run, and pattern searches miss things. It isn't a judgement of the maintainer; it's a record of what a given version contains, with the evidence (file and line) for every finding so the maintainer can check it and tell us if we got it wrong.
