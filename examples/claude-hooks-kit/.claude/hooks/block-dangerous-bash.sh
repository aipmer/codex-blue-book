#!/usr/bin/env bash
set -euo pipefail

PAYLOAD="$(cat)"

node -e '
const input = JSON.parse(process.argv[1] || "{}");
const cmd = String(input?.tool_input?.command || input?.command || "");
const blocked = [
  { re: /\brm\s+-[a-zA-Z]*r[a-zA-Z]*f\b|\brm\s+-[a-zA-Z]*f[a-zA-Z]*r\b/, reason: "Blocked recursive force delete (rm -rf)" },
  { re: /\bgit\s+push\b.*(--force|-f)\b/, reason: "Blocked force push to remote repository" },
  { re: /\bgit\s+reset\s+--hard\b/, reason: "Blocked destructive git reset --hard" },
  { re: /\b(DROP\s+TABLE|TRUNCATE\s+TABLE)\b/i, reason: "Blocked destructive SQL DDL statement" },
  { re: /curl\b.*\|\s*(sh|bash)\b/, reason: "Blocked piping remote script directly to shell" }
];
for (const rule of blocked) {
  if (rule.re.test(cmd)) {
    console.error(`[Claude Hook Blocked] ${rule.reason}: ${cmd}`);
    process.exit(2);
  }
}
' "$PAYLOAD"
