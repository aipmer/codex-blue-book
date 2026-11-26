#!/usr/bin/env bash
set -euo pipefail

PAYLOAD="$(cat)"

node -e '
const input = JSON.parse(process.argv[1] || "{}");
const target = String(input?.tool_input?.file_path || input?.tool_input?.path || "");
if (/(^|\/)\.env(\.[^/]+)?$|credentials\.env$|\.pem$|\.key$/i.test(target) && !target.endsWith(".env.example")) {
  console.error(`[Claude Hook Blocked] Direct access to secret file is forbidden: ${target}`);
  process.exit(2);
}
' "$PAYLOAD"
