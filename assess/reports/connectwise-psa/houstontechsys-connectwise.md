# Assessment: connectwise-mcp-server (npm) (`houstontechsys-connectwise`)

| | |
|---|---|
| Maintainer | houstontechsys |
| Source | https://www.npmjs.com/package/connectwise-mcp-server |
| Assessed at | version `1.0.0` (sha512-QCf4+Fq9JpEYaVXfNSoKseiJUi++vFoioPYjxGoDZLPDMCPOhC1ny/SoaiAXFC7K+AWREuFV/0kiS19oS2ZKdw==) |
| Date | 2026-11-02 |
| Score | **76/100** |

> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.

| # | Check | Result | Evidence |
|---|---|---|---|
| P1 | Commercial-use licence | ✅ | MIT |
| P2 | Install provably built from source | ❔ | published package has no provenance attestation; cannot show it matches the source |
| P3 | Versioned releases | ❌ | 0 git tags, 1 published versions |
| P4 | Changed in last 90 days | ❌ | last change 2026-07-02 |
| P5 | More than one contributor | ❌ | 1 contributor(s) |
| P6 | Security policy | ❌ | none |
| P7 | Not archived | ✅ |  |
| S1 | Dependencies locked | ❌ | no lockfile |
| S2 | No install-time scripts | ✅ |  |
| S3 | No known vulnerable dependencies | ❔ | nothing locked to check |
| S4 | 30 or fewer direct dependencies | ✅ | 3 direct |
| N1 | Only the vendor's API | ✅ | vendor hosts only |
| N2 | No telemetry | ✅ |  |
| N3 | TLS checks intact | ✅ |  |
| C1 | Credentials from environment | ✅ | 1 reads |
| C2 | Credentials never logged | ✅ |  |
| C3 | Nothing written to disk | ✅ |  |
| C4 | Runs locally (stdio) | ✅ | dist/index.js:10 |
| T1 | Tool list readable | ✅ | 12 tools found |
| T2 | Read-only possible | ✅ | 4 write tools; 0 don't start with a verb:  |
| T3 | No arbitrary-request tool | ✅ |  |
| T4 | Descriptions don't steer the model | ✅ |  |
| D1 | HTTP mode safe | — |  |
| D2 | No shell or eval | ✅ |  |

## Notes from the person checking

- No flags. Published to npm only (1.0.0, July 2026); there is no public source repository, so what's in the package can't be compared with source (P2).
- npm packages rarely ship a lockfile, so S1/S3 can't pass for any npm-only package: dependencies resolve on the day you install.

## Tools (12, read from source)

**connectwise_add_ticket_note**, **connectwise_add_time_entry**, **connectwise_create_ticket**, connectwise_get_company, connectwise_get_contact, connectwise_get_ticket, connectwise_list_ticket_notes, connectwise_search_companies, connectwise_search_contacts, connectwise_search_tickets, connectwise_test_connection, **connectwise_update_ticket**

Bold: changes data (by its name).
