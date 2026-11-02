#!/usr/bin/env node
// Sign registry.json so Tabby9 can tell it came from us.
//
//   node scripts/sign.js           bump serial, set updated to today, sign
//   node scripts/sign.js --verify  check registry.json.sig against keys/ (CI)
//   node scripts/sign.js --new-key generate a signing key (once; keep it offline)
//
// The private key never goes in this repo or in CI. It lives at
// REGISTRY_SIGNING_KEY, default ~/.purplefusion/registry-signing-key.pem.
// Tabby9 bundles the public keys in keys/ and refuses a registry whose
// signature doesn't verify or whose serial is lower than one it has seen.
//
// What is signed is registry.json exactly as GitHub serves it: UTF-8 with LF
// line endings (.gitattributes keeps the working copy the same).
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const REG = path.join(ROOT, 'registry.json');
const SIG = REG + '.sig';
const KEYS = path.join(ROOT, 'keys');
const PRIVATE = process.env.REGISTRY_SIGNING_KEY || path.join(os.homedir(), '.purplefusion', 'registry-signing-key.pem');

const bytes = () => Buffer.from(fs.readFileSync(REG, 'utf8').replace(/\r\n/g, '\n'), 'utf8');
const fail = msg => { console.error(msg); process.exit(1); };

function publicKeys() {
  const keys = {};
  for (const f of fs.existsSync(KEYS) ? fs.readdirSync(KEYS) : []) {
    if (f.endsWith('.pub.pem')) keys[f.slice(0, -'.pub.pem'.length)] = fs.readFileSync(path.join(KEYS, f), 'utf8');
  }
  return keys;
}

function verify() {
  if (!fs.existsSync(SIG)) fail('registry.json.sig is missing: run node scripts/sign.js');
  const sig = JSON.parse(fs.readFileSync(SIG, 'utf8'));
  const pem = publicKeys()[sig.keyId];
  if (!pem) fail(`registry.json.sig names key ${sig.keyId}, which is not in keys/`);
  if (sig.alg !== 'ed25519' || !crypto.verify(null, bytes(), pem, Buffer.from(sig.sig, 'base64'))) {
    fail('registry.json.sig does not match registry.json: re-sign after every change (node scripts/sign.js)');
  }
  console.log(`OK: signature by ${sig.keyId}, serial ${JSON.parse(bytes()).serial}`);
}

function newKey() {
  if (fs.existsSync(PRIVATE)) fail(`${PRIVATE} already exists; not overwriting it`);
  const id = `pf-${new Date().toISOString().slice(0, 7)}`;
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
  fs.mkdirSync(path.dirname(PRIVATE), { recursive: true });
  fs.writeFileSync(PRIVATE, privateKey.export({ type: 'pkcs8', format: 'pem' }), { mode: 0o600 });
  fs.writeFileSync(PRIVATE.replace(/\.pem$/, '.id'), id + '\n');
  fs.mkdirSync(KEYS, { recursive: true });
  fs.writeFileSync(path.join(KEYS, `${id}.pub.pem`), publicKey.export({ type: 'spki', format: 'pem' }));
  console.log(`Private key: ${PRIVATE}  (back it up somewhere offline, e.g. your password manager)`);
  console.log(`Public key:  keys/${id}.pub.pem  (commit it; Tabby9 bundles it)`);
}

function sign() {
  if (!fs.existsSync(PRIVATE)) fail(`No signing key at ${PRIVATE}. Set REGISTRY_SIGNING_KEY, or run --new-key once.`);
  const keyId = fs.readFileSync(PRIVATE.replace(/\.pem$/, '.id'), 'utf8').trim();
  // Bump the serial and date in place, keeping the file's layout.
  let text = fs.readFileSync(REG, 'utf8').replace(/\r\n/g, '\n');
  const reg = JSON.parse(text);
  const serial = (Number.isInteger(reg.serial) ? reg.serial : 0) + 1;
  const today = new Date().toISOString().slice(0, 10);
  text = /"serial": \d+/.test(text) ? text.replace(/"serial": \d+/, `"serial": ${serial}`) : text.replace('"schemaVersion": 1,', `"schemaVersion": 1,\n  "serial": ${serial},`);
  text = text.replace(/"updated": "[^"]*"/, `"updated": "${today}"`);
  fs.writeFileSync(REG, text);
  const sig = crypto.sign(null, bytes(), fs.readFileSync(PRIVATE, 'utf8')).toString('base64');
  fs.writeFileSync(SIG, JSON.stringify({ alg: 'ed25519', keyId, sig }, null, 2) + '\n');
  console.log(`Signed serial ${serial} (${today}) with ${keyId}`);
  verify();
}

const arg = process.argv[2];
if (arg === '--verify') verify();
else if (arg === '--new-key') newKey();
else if (!arg) sign();
else fail('usage: node scripts/sign.js [--verify | --new-key]');
