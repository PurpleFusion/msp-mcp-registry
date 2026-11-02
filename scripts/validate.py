#!/usr/bin/env python3
"""Validate registry.json against the schema and the registry's own rules.

Usage: python scripts/validate.py [registry.json]
Exit code 0 = valid, 1 = problems found.
"""
import json
import re
import sys
from pathlib import Path

try:
    from jsonschema import Draft202012Validator
except ImportError:  # pragma: no cover
    print("pip install jsonschema", file=sys.stderr)
    sys.exit(2)

ROOT = Path(__file__).resolve().parent.parent
REG = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "registry.json"
SCHEMA = ROOT / "schema" / "registry.schema.json"

problems: list[str] = []


def err(msg: str) -> None:
    problems.append(msg)


reg = json.loads(REG.read_text(encoding="utf-8"))
schema = json.loads(SCHEMA.read_text(encoding="utf-8"))

for e in sorted(Draft202012Validator(schema).iter_errors(reg), key=lambda e: list(e.path)):
    loc = "/".join(str(p) for p in e.path) or "<root>"
    err(f"schema: {loc}: {e.message}")

reviewer_ids = {r["id"] for r in reg.get("reviewers", [])}
seen_ids: set[str] = set()

for s in reg.get("servers", []):
    sid = s.get("id", "?")
    if sid in seen_ids:
        err(f"{sid}: duplicate id")
    seen_ids.add(sid)

    tier = s.get("tier")
    review = s.get("review")

    if tier == "reviewed":
        if not review:
            err(f"{sid}: tier reviewed requires a review block")
        else:
            if review.get("reviewer") not in reviewer_ids:
                err(f"{sid}: review.reviewer '{review.get('reviewer')}' not in reviewers list")
            report = ROOT / review.get("report", "")
            if not report.is_file():
                err(f"{sid}: review.report '{review.get('report')}' does not exist")
            elif "Verdict" not in report.read_text(encoding="utf-8"):
                err(f"{sid}: review report has no Verdict section")
        pin = s.get("pin", {})
        if not (pin.get("commit") or pin.get("sha256")):
            err(f"{sid}: reviewed entries must pin a commit or sha256, not just a version")

    assessment = s.get("assessment")
    if assessment:
        if assessment.get("by") not in reviewer_ids:
            err(f"{sid}: assessment.by '{assessment.get('by')}' not in reviewers list")
        if not 0 <= assessment.get("score", -1) <= 100:
            err(f"{sid}: assessment.score must be 0 to 100")
        report = ROOT / assessment.get("report", "")
        if not report.is_file():
            err(f"{sid}: assessment.report '{assessment.get('report')}' does not exist")
        else:
            # The pin must be exactly what was assessed: the report names the commit or version.
            text = report.read_text(encoding="utf-8")
            pin = s.get("pin", {})
            if not any(v and v in text for v in (pin.get("commit"), pin.get("version") and f"`{pin.get('version')}`")):
                err(f"{sid}: pin doesn't match the commit or version in {assessment.get('report')}")
            m = re.search(r"\| Score \| \*\*(\d+)/100\*\*", text)
            if m and int(m.group(1)) != assessment.get("score"):
                err(f"{sid}: assessment.score {assessment.get('score')} but the report says {m.group(1)}")
    if tier == "assessed" and not (s.get("pin", {}).get("commit") or s.get("pin", {}).get("sha256")):
        err(f"{sid}: assessed entries must pin a commit or sha256, not just a version")

    if tier == "vendor-verified" and not s.get("maintainer", {}).get("vendorOfficial"):
        err(f"{sid}: vendor-verified requires maintainer.vendorOfficial = true")

    scope = s.get("scope", {})
    if scope.get("writes") and not scope.get("readOnlyMode"):
        err(f"{sid}: has write tools but no readOnlyMode block (document native switch or denyTools)")
    ro = scope.get("readOnlyMode") or {}
    if ro and not ro.get("supported") and not ro.get("denyTools"):
        err(f"{sid}: readOnlyMode.supported=false requires a denyTools list")

    texts = [(w.get("risk", "") + " " + w.get("detail", "")).lower() for w in s.get("warnings", []) if isinstance(w, dict)]
    if scope.get("touchesSecrets") and not any("password" in t or "secret" in t for t in texts):
        err(f"{sid}: touchesSecrets=true but no warning mentions passwords/secrets")

    inst = s.get("install", {})
    m = inst.get("method")
    need = {"claude-plugin": ["marketplace", "plugin"], "npx": ["package"], "uvx": ["package"], "remote-http": ["url"], "docker": ["image"]}
    for k in need.get(m, []):
        if not inst.get(k):
            err(f"{sid}: install.method {m} requires install.{k}")

    srv = s.get("server")
    if srv:
        envs = {c.get("env") for c in s.get("credentials", [])}
        if srv.get("transport") == "http":
            for k in ("url", "hostedBy"):
                if not srv.get(k):
                    err(f"{sid}: http server requires server.{k}")
            if srv.get("hostedBy") and not any("hosted" in t for t in texts):
                err(f"{sid}: http server hosted by someone needs a warning that says who hosts it")
            for v in (srv.get("headers") or {}).values():
                for ref in re.findall(r"\$\{([A-Z0-9_]+)\}", v):
                    if ref not in envs:
                        err(f"{sid}: header refers to ${{{ref}}} but no credential has that env")
        else:
            rt = srv.get("runtime")
            if not rt:
                err(f"{sid}: stdio server requires server.runtime")
            if rt in ("npx", "uvx") and not (srv.get("package") and srv.get("version")):
                err(f"{sid}: {rt} server requires server.package and an exact server.version")
            if rt == "docker" and not srv.get("image"):
                err(f"{sid}: docker server requires server.image pinned by digest")
            if rt == "binary":
                names = {f.get("name") for f in srv.get("files", [])}
                if not names:
                    err(f"{sid}: binary server requires server.files")
                if srv.get("command") not in names:
                    err(f"{sid}: server.command must be one of server.files[].name")
        if set(srv.get("env") or {}) & envs:
            err(f"{sid}: server.env must not set a credential's env var")

    for c in s.get("credentials", []):
        if c.get("secret", True) and c.get("type") in ("url", "username", "tenant-id"):
            err(f"{sid}: credential {c['env']} of type {c['type']} is probably not secret; set secret=false")
        if not re.fullmatch(r"[A-Z0-9_]+", c.get("env", "")):
            err(f"{sid}: credential env '{c.get('env')}' must be UPPER_SNAKE")

if problems:
    print(f"{len(problems)} problem(s):")
    for p in problems:
        print(" -", p)
    sys.exit(1)

print(f"OK: {len(reg['servers'])} servers, {len(reviewer_ids)} reviewers, updated {reg['updated']}")
