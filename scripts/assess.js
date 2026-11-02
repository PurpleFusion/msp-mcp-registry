#!/usr/bin/env node
// Desk assessment of MCP servers (see ASSESSMENT.md). Reads code; never runs it.
//
//   node scripts/assess.js assess/candidates/connectwise-psa.json
//
// The candidates file is { "group": "...", "vendorHosts": [regex...], "candidates": [
//   { "id", "name", "maintainer", "source": { "github": "owner/repo", "path"?, "ref"? } | { "npm": "pkg" } }
// ] }. Writes assess/results/<group>/<id>.json, assess/reports/<group>/<id>.md and
// assess/reports/<group>/RANKING.md. Needs gh (signed in), curl and tar.
//
// Downloaded code is untrusted: each one goes in its own new temp folder, is
// only read as text, and is deleted afterwards.
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TAR = fs.existsSync('C:\\Windows\\System32\\tar.exe') ? 'C:\\Windows\\System32\\tar.exe' : 'tar';
const CODE_EXT = /\.(ts|tsx|js|mjs|cjs|py|go|rs)$/;
const SKIP_DIR = /(^|[\\/])(node_modules|\.git|tests?|__tests__|spec|examples?|docs?|\.github|vendor|fixtures?|scripts|testdata)([\\/]|$)/i;
// Test files and build tooling, not code the server runs.
const NOT_RUNTIME = /(\.(test|spec)\.[a-z]+$|(^|\/)test_[^/]*\.py$|_test\.(py|go)$|(^|\/)conftest\.py$|\.d\.ts$|\.min\.js$|(^|\/)(build|bundle|setup)[^/]*\.(m?js|py)$)/;
const DAY = 86400e3;

const run = (cmd, args, opts = {}) => {
  const r = spawnSync(cmd, args, { encoding: opts.encoding ?? 'utf8', maxBuffer: 64 << 20, ...opts });
  return { ok: r.status === 0, out: r.stdout, err: r.stderr };
};
const gh = (api, jq) => { const r = run('gh', ['api', api, ...(jq ? ['--jq', jq] : [])]); return r.ok ? r.out.trim() : null; };
const ghJson = api => { const r = gh(api); try { return r ? JSON.parse(r) : null; } catch { return null; } };
// npm.cmd needs a shell on Windows, so the name is checked before it goes near one.
const npmView = pkg => {
  if (!/^(@[\w.-]+\/)?[\w.-]+$/.test(pkg)) return null;
  const r = run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['view', pkg, '--json'], { shell: process.platform === 'win32' });
  try { return JSON.parse(r.out); } catch { return null; }
};

function download(url, dir) {
  const tgz = path.join(dir, 'src.tgz');
  if (!run('curl', ['-sSfL', '-o', tgz, url]).ok) throw new Error(`download failed: ${url}`);
  const out = path.join(dir, 'x');
  fs.mkdirSync(out);
  if (!run(TAR, ['-xzf', tgz, '-C', out]).ok) throw new Error('extract failed');
  // Archives have one top folder.
  const top = fs.readdirSync(out);
  return top.length === 1 ? path.join(out, top[0]) : out;
}

function walk(dir, base = dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    const rel = path.relative(base, p).replace(/\\/g, '/');
    if (e.isSymbolicLink()) continue;
    if (e.isDirectory()) { if (!SKIP_DIR.test(rel + '/')) walk(p, base, acc); }
    else acc.push(rel);
  }
  return acc;
}

// Every match of re in the code files, as { file, line, text }.
function grep(files, root, re, { code = true } = {}) {
  const hits = [];
  for (const f of files) {
    if (code && !CODE_EXT.test(f)) continue;
    if (NOT_RUNTIME.test(f)) continue;
    const lines = fs.readFileSync(path.join(root, f), 'utf8').split('\n');
    lines.forEach((l, i) => { if (re.test(l)) hits.push({ file: f, line: i + 1, text: l.trim().slice(0, 160) }); });
  }
  return hits;
}

const WRITE_VERBS = new Set(['create', 'update', 'delete', 'remove', 'add', 'patch', 'put', 'post', 'set', 'close', 'assign', 'merge', 'run', 'execute', 'send', 'reset', 'reopen', 'move', 'archive', 'approve', 'reject', 'resolve', 'log', 'submit', 'cancel', 'edit', 'modify', 'upload', 'attach', 'bulk', 'link', 'unlink', 'complete', 'convert', 'copy', 'import', 'write']);
const tokens = name => name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase().split(/[_\-.\s]+/).filter(Boolean);

function extractTools(files, root) {
  const res = [
    /\.(?:tool|registerTool)\(\s*['"`]([\w.-]+)['"`]/g, // server.tool("name", ...)
    /\bname:\s*['"`]([a-z][\w.-]*)['"`]\s*,\s*(?:\/\/[^\n]*\n\s*)?(?:title:[^\n]*\n\s*)?description:/g, // { name: 'x', description }
    /@\w+\.tool(?:\((?:[^)]*name\s*=\s*['"]([\w.-]+)['"])?[\s\S]{0,600}?\))?\s*\n\s*(?:async\s+)?def\s+(\w+)/g, // @mcp.tool / @mcp.tool(...) def x
    /\bTool\(\s*name\s*=\s*['"]([\w.-]+)['"]/g, // Tool(name="x")
    /NewTool\(\s*"([\w.-]+)"/g, // Go mcp.NewTool("x")
  ];
  const names = new Set();
  for (const f of files) {
    if (!CODE_EXT.test(f) || NOT_RUNTIME.test(f)) continue;
    const text = fs.readFileSync(path.join(root, f), 'utf8');
    for (const re of res) for (const m of text.matchAll(re)) names.add(m[1] || m[2]);
  }
  return [...names].filter(n => n && n.length < 80).sort();
}

// Locked dependency versions, for OSV.
// The shallowest file with this name, as text (a server may live in a subfolder, e.g. cli/go.sum).
function locate(root, files, name) {
  const f = files.filter(x => x === name || x.endsWith('/' + name)).sort((a, b) => a.split('/').length - b.split('/').length)[0];
  return f ? fs.readFileSync(path.join(root, f), 'utf8') : null;
}

function lockedDeps(root, files) {
  const deps = [];
  const npmLock = locate(root, files, 'package-lock.json');
  if (npmLock) {
    const lock = JSON.parse(npmLock);
    // Dev-only packages never ship, so they don't count.
    for (const [k, v] of Object.entries(lock.packages || {})) if (k && v.version && !v.dev) deps.push({ ecosystem: 'npm', name: k.replace(/^.*node_modules\//, ''), version: v.version });
  }
  for (const f of ['uv.lock', 'poetry.lock']) {
    const t = locate(root, files, f);
    if (t) for (const m of t.matchAll(/\[\[package\]\]\s*\nname\s*=\s*"([^"]+)"\s*\nversion\s*=\s*"([^"]+)"/g)) deps.push({ ecosystem: 'PyPI', name: m[1], version: m[2] });
  }
  const req = locate(root, files, 'requirements.txt');
  if (req) for (const m of req.matchAll(/^([A-Za-z0-9_.-]+)==([^\s;#]+)/gm)) deps.push({ ecosystem: 'PyPI', name: m[1], version: m[2] });
  const goSum = locate(root, files, 'go.sum');
  if (goSum) {
    const seen = new Set();
    for (const m of goSum.matchAll(/^(\S+) (v[^\s/]+) h1:/gm)) {
      const k = m[1] + '@' + m[2];
      if (!seen.has(k)) { seen.add(k); deps.push({ ecosystem: 'Go', name: m[1], version: m[2] }); }
    }
  }
  return deps;
}

async function osv(deps) {
  const vulns = [];
  for (let i = 0; i < deps.length; i += 500) {
    const batch = deps.slice(i, i + 500);
    const res = await fetch('https://api.osv.dev/v1/querybatch', { method: 'POST', body: JSON.stringify({ queries: batch.map(d => ({ package: { name: d.name, ecosystem: d.ecosystem }, version: d.version })) }) });
    if (!res.ok) return null;
    const { results } = await res.json();
    results.forEach((r, j) => { for (const v of r.vulns || []) vulns.push(`${batch[j].name}@${batch[j].version}: ${v.id}`); });
  }
  return vulns;
}

function directDeps(root, files) {
  const pj = locate(root, files, 'package.json');
  if (pj) return Object.keys(JSON.parse(pj).dependencies || {}).length;
  const py = locate(root, files, 'pyproject.toml');
  const m = py && /\ndependencies\s*=\s*\[([^\]]*)\]/.exec(py);
  if (m) return (m[1].match(/["'][^"']+["']/g) || []).length;
  const req = locate(root, files, 'requirements.txt');
  if (req) return req.split('\n').filter(l => l.trim() && !l.trim().startsWith('#')).length;
  const mod = locate(root, files, 'go.mod');
  if (mod) {
    const block = [...mod.matchAll(/require \(([^)]*)\)/g)].map(x => x[1]).join('\n');
    return block.split('\n').filter(l => l.trim() && !/\/\/ indirect/.test(l)).length;
  }
  return null;
}

async function assess(c, vendorHosts) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'assess-'));
  const meta = { id: c.id, name: c.name, maintainer: c.maintainer, assessedOn: new Date().toISOString().slice(0, 10) };
  const checks = [];
  const add = (id, result, evidence = '') => checks.push({ id, result, evidence });
  try {
    let root; let repo = null; let pkg = null;
    if (c.source.github) {
      repo = ghJson(`repos/${c.source.github}`);
      if (!repo) throw new Error(`repo not found: ${c.source.github}`);
      const latest = ghJson(`repos/${c.source.github}/releases/latest`);
      const ref = c.source.ref || latest?.tag_name || repo.default_branch;
      const sha = gh(`repos/${c.source.github}/commits/${encodeURIComponent(ref)}`, '.sha');
      Object.assign(meta, { source: `https://github.com/${c.source.github}${c.source.path ? '/tree/' + sha + '/' + c.source.path : ''}`, ref, commit: sha });
      root = download(`https://codeload.github.com/${c.source.github}/tar.gz/${sha}`, tmp);
      if (c.source.path) root = path.join(root, c.source.path);
      meta.latestRelease = latest ? { tag: latest.tag_name, date: latest.published_at?.slice(0, 10) } : null;
    } else {
      pkg = npmView(c.source.npm);
      if (!pkg) throw new Error(`npm package not found: ${c.source.npm}`);
      Object.assign(meta, { source: `https://www.npmjs.com/package/${c.source.npm}`, version: pkg.version, tarball: pkg.dist?.tarball, integrity: pkg.dist?.integrity });
      root = download(pkg.dist.tarball, tmp);
      const repoUrl = /github\.com[/:]([^/]+\/[^/.#]+)/.exec(pkg.repository?.url || '')?.[1];
      if (repoUrl) repo = ghJson(`repos/${repoUrl}`);
    }
    const files = walk(root);
    const read = f => fs.readFileSync(path.join(root, f), 'utf8');
    const npmName = c.source.npm || (files.includes('package.json') && JSON.parse(read('package.json')).name);
    if (!pkg && npmName) pkg = npmView(npmName);

    // Provenance
    // The repo's licence, else a manifest's (a plugin in a monorepo declares its own).
    const manifest = ['package.json', '.claude-plugin/plugin.json', 'pyproject.toml'].filter(m => files.includes(m)).map(m => /"license"\s*:\s*"([^"]+)"|^license\s*=\s*(?:\{\s*text\s*=\s*)?"([^"]+)"/m.exec(read(m))).find(Boolean);
    const lic = repo?.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION' ? repo.license.spdx_id : (pkg?.license || (manifest && (manifest[1] || manifest[2])) || (files.find(f => /(^|\/)LICEN[CS]E/i.test(f)) ? 'licence file present' : null));
    add('P1', lic && /^(MIT|Apache-2\.0|BSD-[23]-Clause|ISC|MPL-2\.0|0BSD|Unlicense)$/i.test(lic) ? 'pass' : 'fail', lic || 'no licence');
    const provenance = pkg?.dist?.attestations?.provenance?.predicateType;
    add('P2', provenance ? 'pass' : c.source.github && !pkg ? 'pass' : 'unknown', provenance ? `npm provenance (${provenance})` : c.source.github && !pkg ? 'installed from a pinned commit' : 'published package has no provenance attestation; cannot show it matches the source');
    const tags = repo ? Number(gh(`repos/${repo.full_name}/tags?per_page=100`, 'length') || 0) : 0;
    add('P3', tags > 0 || (pkg?.versions?.length || 0) > 1 ? 'pass' : 'fail', `${tags} git tags, ${pkg?.versions?.length ?? 0} published versions`);
    const last = repo?.pushed_at || pkg?.time?.modified;
    add('P4', last && Date.now() - Date.parse(last) < 90 * DAY ? 'pass' : 'fail', `last change ${last?.slice(0, 10) || 'unknown'}`);
    const contributors = repo ? Number(gh(`repos/${repo.full_name}/contributors?per_page=100`, 'length') || 0) : (pkg?.maintainers?.length || 0);
    add('P5', contributors > 1 ? 'pass' : 'fail', `${contributors} contributor(s)`);
    const security = files.some(f => /(^|\/)SECURITY\.md$/i.test(f)) || (repo && gh(`repos/${repo.full_name}/contents/SECURITY.md`, '.name'));
    add('P6', security ? 'pass' : 'fail', security ? 'SECURITY.md' : 'none');
    add('P7', repo?.archived ? 'fail' : 'pass', repo?.archived ? 'archived' : '');

    // Supply chain
    const lock = files.find(f => /(^|\/)(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|uv\.lock|poetry\.lock|go\.sum|Cargo\.lock)$/.test(f)) || (files.includes('requirements.txt') && !/^[A-Za-z0-9_.-]+\s*($|[<>~!]=?|>=)/m.test(read('requirements.txt')) ? 'requirements.txt (all pinned)' : null);
    add('S1', lock ? 'pass' : 'fail', lock || 'no lockfile');
    const pj = files.includes('package.json') ? JSON.parse(read('package.json')) : null;
    const hooks = pj ? ['preinstall', 'install', 'postinstall', 'prepare'].filter(h => pj.scripts?.[h]).map(h => `${h}: ${pj.scripts[h]}`) : [];
    if (files.includes('setup.py') && /cmdclass/.test(read('setup.py'))) hooks.push('setup.py cmdclass');
    // An npm package's prepare only runs when installed from git, not from the registry.
    const installHooks = c.source.npm ? hooks.filter(h => !h.startsWith('prepare')) : hooks;
    add('S2', installHooks.length ? 'fail' : 'pass', installHooks.join('; '));
    const locked = lockedDeps(root, files);
    const vulns = locked.length ? await osv(locked) : null;
    add('S3', !locked.length ? 'unknown' : vulns === null ? 'unknown' : vulns.length ? 'fail' : 'pass', !locked.length ? 'nothing locked to check' : vulns === null ? 'OSV unavailable' : vulns.length ? vulns.slice(0, 12).join(', ') + (vulns.length > 12 ? ` (+${vulns.length - 12} more)` : '') : `${locked.length} locked packages, none with known vulnerabilities`);
    const direct = directDeps(root, files);
    add('S4', direct === null ? 'unknown' : direct <= 30 ? 'pass' : 'fail', direct === null ? '' : `${direct} direct`);

    // Network
    const hostHits = grep(files, root, /https?:\/\/[a-z0-9.-]+\.[a-z]{2,}/i);
    const ignorable = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|.*\.?example\.(com|org|net)|json-schema\.org|.*modelcontextprotocol\.io|github\.com|www\.w3\.org|schemas?\..*|spdx\.org|opensource\.org|semver\.org|.*\.?npmjs\.(com|org))$/i;
    const vendor = new RegExp(vendorHosts.join('|'), 'i');
    const others = new Map();
    for (const h of hostHits) for (const m of h.text.matchAll(/https?:\/\/([a-z0-9.-]+\.[a-z]{2,})/gi)) {
      const host = m[1].toLowerCase();
      if (!vendor.test(host) && !ignorable.test(host)) others.set(host, others.get(host) || `${h.file}:${h.line}`);
    }
    add('N1', others.size ? 'fail' : 'pass', others.size ? [...others].map(([h, at]) => `${h} (${at})`).join(', ') : 'vendor hosts only');
    const telemetry = grep(files, root, /posthog|sentry|segment\.(io|com)|mixpanel|amplitude|datadog|google-analytics|gtag\(|telemetry|opentelemetry/i);
    const telemetryDeps = pj ? Object.keys({ ...pj.dependencies }).filter(d => /posthog|sentry|segment|mixpanel|amplitude|datadog|opentelemetry/i.test(d)) : [];
    add('N2', telemetry.length || telemetryDeps.length ? 'flag' : 'pass', [...telemetryDeps.map(d => `dependency ${d}`), ...telemetry.slice(0, 5).map(h => `${h.file}:${h.line}`)].join(', '));
    const tls = grep(files, root, /rejectUnauthorized\s*:\s*false|NODE_TLS_REJECT_UNAUTHORIZED|verify\s*=\s*False|InsecureSkipVerify\s*:\s*true|_create_unverified_context|CERT_NONE/);
    add('N3', tls.length ? 'flag' : 'pass', tls.slice(0, 5).map(h => `${h.file}:${h.line} ${h.text}`).join(' | '));

    // Credentials
    const env = grep(files, root, /process\.env|os\.environ|os\.getenv|os\.Getenv|std::env::var/);
    add('C1', env.length ? 'pass' : 'unknown', env.length ? `${env.length} reads` : 'no environment reads found');
    const logged = grep(files, root, /(console\.(log|error|warn|info|debug)|logger\.\w+|logging\.\w+\(|\bprint\(|log\.(Print|Info|Debug|Error)|fmt\.Print|eprintln!|println!)/)
      .filter(h => /(private_?key|privatekey|secret|password|passwd|token|authorization|api_?key|PRIVATE_KEY)/i.test(h.text) && !/redact|mask|\*{3}|\[hidden\]|has_?|is_?set|missing|required|not set|invalid|expired|refresh/i.test(h.text));
    add('C2', logged.length ? 'flag' : 'pass', logged.slice(0, 5).map(h => `${h.file}:${h.line} ${h.text}`).join(' | '));
    const disk = grep(files, root, /writeFile|createWriteStream|fs\.write|appendFile|open\([^)]*['"][wa]b?\+?['"]|sqlite|\.db['"]|os\.WriteFile|os\.Create\(|shelve|pickle\.dump/);
    add('C3', disk.length ? 'flag' : 'pass', disk.slice(0, 5).map(h => `${h.file}:${h.line} ${h.text}`).join(' | '));
    const stdio = grep(files, root, /StdioServerTransport|stdio_server|transport\s*=\s*['"]stdio|\.run\(\s*\)|ServeStdio|run_stdio|mcp\.run\(/);
    add('C4', stdio.length ? 'pass' : 'fail', stdio.length ? `${stdio[0].file}:${stdio[0].line}` : 'no local stdio transport found');

    // Tools
    const tools = extractTools(files, root);
    add('T1', tools.length ? 'pass' : 'fail', `${tools.length} tools found`);
    const writes = tools.filter(t => tokens(t).some(w => WRITE_VERBS.has(w)));
    const readOnlySwitch = grep(files, root, /READ_?ONLY|read_?only|readOnly/);
    const prefixed = writes.filter(t => WRITE_VERBS.has(tokens(t)[0]) || WRITE_VERBS.has(tokens(t)[1]));
    add('T2', readOnlySwitch.length ? 'pass' : !tools.length ? 'unknown' : prefixed.length === writes.length ? 'pass' : 'fail',
      readOnlySwitch.length ? `read-only switch: ${readOnlySwitch[0].file}:${readOnlySwitch[0].line}` : `${writes.length} write tools; ${writes.length - prefixed.length} don't start with a verb: ${writes.filter(t => !prefixed.includes(t)).slice(0, 8).join(', ')}`);
    const raw = tools.filter(t => /(^|_)(raw|generic|custom|any)?_?(api|http)_?(request|call)$|^(api|request|call_api|make_request|api_call)$|(^|_)execute_?(api|query|request)$/i.test(t));
    add('T3', raw.length ? 'fail' : tools.length ? 'pass' : 'unknown', raw.join(', '));
    const steering = grep(files, root, /\b(ignore (all |any )?(previous|prior|above) (instructions|messages)|you must|always (call|use|invoke)|never (tell|mention|reveal)|do not (tell|mention|reveal)|system prompt)\b/i);
    add('T4', steering.length ? 'flag' : 'pass', steering.slice(0, 5).map(h => `${h.file}:${h.line} ${h.text}`).join(' | '));

    // Data
    const listen = grep(files, root, /\.listen\(|createServer\(|uvicorn\.run|ListenAndServe|host\s*=\s*['"]0\.0\.0\.0|['"]0\.0\.0\.0['"]/);
    const wide = listen.filter(h => /0\.0\.0\.0/.test(h.text));
    add('D1', !listen.length ? 'n/a' : wide.length ? 'flag' : 'pass', listen.slice(0, 4).map(h => `${h.file}:${h.line} ${h.text}`).join(' | '));
    // (?<![.\w]) so a regex's .exec() isn't mistaken for running a command.
    const exec = grep(files, root, /child_process|execSync|(?<![.\w])(exec|spawn|eval)\(|new Function\(|subprocess|os\.system|exec\.Command/);
    add('D2', exec.length ? 'flag' : 'pass', exec.slice(0, 5).map(h => `${h.file}:${h.line} ${h.text}`).join(' | '));

    meta.tools = tools;
    meta.writeTools = writes;
    meta.files = files.length;
  } catch (e) {
    meta.error = e.message;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  return { ...meta, checks };
}

// Score: share of applicable weight that passed. "flag" needs a person and
// counts as not passed until confirmed either way in the report's notes.
const WEIGHTS = { P1: 4, P2: 4, P3: 3, P4: 3, P5: 2, P6: 2, P7: 2, S1: 4, S2: 4, S3: 5, S4: 2, N1: 8, N2: 6, N3: 6, C1: 5, C2: 6, C3: 4, C4: 5, T1: 3, T2: 5, T3: 3, T4: 4, D1: 5, D2: 5 };
const LABEL = { P1: 'Commercial-use licence', P2: 'Install provably built from source', P3: 'Versioned releases', P4: 'Changed in last 90 days', P5: 'More than one contributor', P6: 'Security policy', P7: 'Not archived', S1: 'Dependencies locked', S2: 'No install-time scripts', S3: 'No known vulnerable dependencies', S4: '30 or fewer direct dependencies', N1: 'Only the vendor\'s API', N2: 'No telemetry', N3: 'TLS checks intact', C1: 'Credentials from environment', C2: 'Credentials never logged', C3: 'Nothing written to disk', C4: 'Runs locally (stdio)', T1: 'Tool list readable', T2: 'Read-only possible', T3: 'No arbitrary-request tool', T4: 'Descriptions don\'t steer the model', D1: 'HTTP mode safe', D2: 'No shell or eval' };

function score(r, confirmed = {}) {
  let got = 0; let of = 0;
  for (const c of r.checks) {
    const result = confirmed[c.id] || c.result;
    if (result === 'n/a') continue;
    of += WEIGHTS[c.id];
    if (result === 'pass') got += WEIGHTS[c.id];
  }
  let s = of ? Math.round((100 * got) / of) : 0;
  const caps = [];
  const res = id => confirmed[id] || r.checks.find(c => c.id === id)?.result;
  if (res('P7') === 'fail') caps.push(['archived', 30]);
  if (confirmed.N2 === 'fail') caps.push(['telemetry', 40]);
  if (confirmed.N3 === 'fail') caps.push(['TLS checks off', 40]);
  if (confirmed.C2 === 'fail') caps.push(['credentials logged', 40]);
  if (confirmed.D1 === 'fail') caps.push(['open to the network without authentication by default', 50]);
  if (res('P1') === 'fail') caps.push(['no commercial-use licence', 60]);
  if (confirmed.T4 === 'fail') caps.push(['tool description steers the model', 60]);
  for (const [, cap] of caps) s = Math.min(s, cap);
  return { score: s, caps: caps.map(([w, n]) => `${w} (max ${n})`) };
}

const md = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

function report(r, group, notes) {
  const { score: s, caps } = score(r, notes.confirmed);
  const icon = { pass: '✅', fail: '❌', flag: '⚠️', unknown: '❔', 'n/a': '—' };
  const lines = [
    `# Assessment: ${r.name} (\`${r.id}\`)`, '',
    `| | |`, `|---|---|`,
    `| Maintainer | ${md(r.maintainer)} |`,
    `| Source | ${r.source} |`,
    r.commit ? `| Assessed at | \`${r.ref}\` — commit \`${r.commit}\` |` : `| Assessed at | version \`${r.version}\` (${r.integrity || 'no integrity'}) |`,
    `| Date | ${r.assessedOn} |`,
    `| Score | **${s}/100**${caps.length ? ` — capped: ${caps.join(', ')}` : ''} |`, '',
    '> Desk assessment under [ASSESSMENT.md](../../../ASSESSMENT.md): source read by `scripts/assess.js`, flagged items checked by a person. Nothing was run. It applies to the commit or version above only.', '',
  ];
  if (r.error) lines.push(`**Could not assess:** ${r.error}`, '');
  lines.push('| # | Check | Result | Evidence |', '|---|---|---|---|');
  for (const c of r.checks) {
    const final = notes.confirmed?.[c.id];
    lines.push(`| ${c.id} | ${LABEL[c.id]} | ${icon[final || c.result]}${final && final !== c.result ? ` (script: ${c.result})` : ''} | ${md(c.evidence)} |`);
  }
  if (notes.text) lines.push('', '## Notes from the person checking', '', notes.text);
  if (r.tools?.length) lines.push('', `## Tools (${r.tools.length}, read from source)`, '', r.tools.map(t => (r.writeTools.includes(t) ? `**${t}**` : t)).join(', '), '', 'Bold: changes data (by its name).');
  return { text: lines.join('\n') + '\n', score: s, caps };
}

async function main() {
  const file = process.argv[2];
  if (!file) { console.error('usage: node scripts/assess.js <candidates.json>'); process.exit(2); }
  const spec = JSON.parse(fs.readFileSync(file, 'utf8'));
  const resDir = path.join(ROOT, 'assess', 'results', spec.group);
  const repDir = path.join(ROOT, 'assess', 'reports', spec.group);
  fs.mkdirSync(resDir, { recursive: true });
  fs.mkdirSync(repDir, { recursive: true });
  const rows = [];
  for (const c of spec.candidates) {
    const resFile = path.join(resDir, `${c.id}.json`);
    const r = process.argv.includes('--rescore') && fs.existsSync(resFile) ? JSON.parse(fs.readFileSync(resFile, 'utf8')) : await assess(c, spec.vendorHosts);
    fs.writeFileSync(resFile, JSON.stringify(r, null, 2) + '\n');
    const notes = c.notes || {};
    const rep = report(r, spec.group, notes);
    fs.writeFileSync(path.join(repDir, `${c.id}.md`), rep.text);
    rows.push({ c, r, ...rep });
    console.log(`${String(rep.score).padStart(3)}  ${c.id}${r.error ? '  ERROR ' + r.error : ''}`);
  }
  rows.sort((a, b) => b.score - a.score);
  const flags = r => r.checks.filter(c => c.result === 'flag' && !(r.notesConfirmed || {})[c.id]).map(c => c.id);
  const out = [`# ${spec.title}`, '', `Desk assessments under [ASSESSMENT.md](../../../ASSESSMENT.md), ${new Date().toISOString().slice(0, 10)}. Nothing was run; each score applies to the commit or version in its report.`, '',
    '| Rank | Server | Maintainer | Score | Only talks to the vendor | Tools found (write) | Open flags | Report |', '|---|---|---|---|---|---|---|---|'];
  rows.forEach(({ c, r, score: s, caps }, i) => {
    const final = id => c.notes?.confirmed?.[id] || r.checks.find(k => k.id === id)?.result;
    const open = r.checks.filter(k => k.result === 'flag' && !c.notes?.confirmed?.[k.id]).map(k => k.id);
    out.push(`| ${i + 1} | ${md(c.name)} | ${md(c.maintainer)} | **${s}**${caps.length ? ' (capped)' : ''} | ${final('N1') === 'pass' ? 'yes' : 'no'} | ${r.tools ? `${r.tools.length} (${r.writeTools.length})` : '—'} | ${open.join(', ') || '—'} | [${c.id}](${c.id}.md) |`);
  });
  out.push('', 'Tool counts are what the script could read from the source; see each report where they understate (tools generated at runtime, or registered behind a write switch).');
  fs.writeFileSync(path.join(repDir, 'RANKING.md'), out.join('\n') + '\n');
  void flags;
}

main().catch(e => { console.error(e); process.exit(1); });
