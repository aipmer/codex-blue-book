---
title: "Ch.03 Deterministic Guardrails: Claude Code Hooks & Code Mode | Claude Blue Book"
description: "Configure PreToolUse, PostToolUse, and PreSkillShellCommand hooks in .claude/settings.json and batch multi-file edits with Claude Code v2.1.323+ Code Mode."
lastUpdated: 2026-11-26
---

[Home](/en/) | [Prev (Ch.02)](./ch02_context_economics.md) | [Next (Ch.04)](./ch04_whiteboards_docs.md) | [中文版](/claude/ch03_hooks_code_mode)

# Ch.03 Deterministic Guardrails: `Hooks` & Experimental Code Mode

> **The Real Problem**: Repeating "never run `rm -rf` or force push" in prompts still leaves production safety up to probability, while serial one-by-one tool calls crawl across 30-file edits.  
> **Tangible Output & Takeaway**: Runnable starter kit [examples/claude-hooks-kit](https://github.com/aipmer/codex-blue-book/tree/main/examples/claude-hooks-kit) (`.claude/settings.json` + shell blockers) and practical v2.1.323+ Code Mode patterns.  
> **Viral Screenshot Quote**: *"Asking an LLM nicely not to drop a table is probabilistic hope. Blocking the tool call in a `PreToolUse` Hook is deterministic engineering."*

Prompt compliance is always probabilistic. Even 99.5% adherence fails once in two hundred runs—and one reckless `git reset --hard` or `.env` read costs more than a month of saved typing.

Claude Code solves this with **Hooks**: deterministic scripts executed by the harness at fixed lifecycle boundaries, consuming **zero context tokens** and enforcing rules regardless of model reasoning. Meanwhile, **Experimental Code Mode** (introduced in Claude Code `v2.1.323+`) lets the agent orchestrate batches of reads, filters, and edits via JavaScript instead of slow serial tool round-trips.

---

## Intuitive Metaphor: Physical Security Turnstiles

```text
[Prompt-Only Rules] ──> A paper sign saying "No flammables inside." Under pressure, mistakes slip past.
[Hooks Turnstiles] ──> Hardware metal detectors at the gate (`PreToolUse`):
                        - Commands matching `rm -rf`, `git push --force`, or `.env` access exit with code 2
                          and bounce a clear rejection message back to the agent before anything executes;
                        - Edited `.ts` files run through your formatter automatically (`PostToolUse`).
```

---

## Beginner Quickstart: 3 Steps to Launch

1. **Step 1: Install the companion hook scripts**
   Copy `examples/claude-hooks-kit/.claude/` into your repo and mark scripts executable:
   ```bash
   chmod +x .claude/hooks/*.sh
   ```
2. **Step 2: Register conditional `if` matchers in `.claude/settings.json`**
   Use `if` patterns (`Bash(*)`, `Edit(*.ts)`) so hooks run only on matching tool calls.
3. **Step 3: Red-team your own hooks locally**
   Verify exit code `2` on blocked commands and exit code `0` on safe commands:
   ```bash
   echo '{"tool_input":{"command":"git push --force origin main"}}' | .claude/hooks/block-dangerous-bash.sh; echo "exit=$?"
   ```

---

## 3.1 Production `.claude/settings.json` Three-Layer Guardrail

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "hooks": {
    "PreToolUse": [{
        "matcher": "Bash",
        "hooks": [{
            "type": "command",
            "if": "Bash(*)",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-bash.sh"
          }]
      },
      {
        "matcher": "Read|Edit|Write",
        "hooks": [{
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-secrets.sh"
          }]
      }],
    "PostToolUse": [{
        "matcher": "Edit|Write",
        "hooks": [{
            "type": "command",
            "if": "Edit(*.ts)",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/format-on-edit.sh"
          }]
      }],
    "PreSkillShellCommand": [{
        "hooks": [{
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-bash.sh"
          }]
      }]
  }
}
```

### Command Blocker: `.claude/hooks/block-dangerous-bash.sh`

Claude Code passes event JSON via `stdin`. Using `node` avoids external `jq` dependencies and returns exit code `2` to block dangerous execution:

```bash
#!/usr/bin/env bash
set -euo pipefail

PAYLOAD="$(cat)"

node -e '
const input = JSON.parse(process.argv[1] || "{}");
const cmd = String(input?.tool_input?.command || input?.command || "");
const blocked = [{ re: /\brm\s+-[a-zA-Z]*r[a-zA-Z]*f\b|\brm\s+-[a-zA-Z]*f[a-zA-Z]*r\b/, reason: "Blocked recursive force delete (rm -rf)" },
  { re: /\bgit\s+push\b.*(--force|-f)\b/, reason: "Blocked force push to remote repository" },
  { re: /\bgit\s+reset\s+--hard\b/, reason: "Blocked destructive git reset --hard" },
  { re: /\b(DROP\s+TABLE|TRUNCATE\s+TABLE)\b/i, reason: "Blocked destructive SQL DDL statement" },
  { re: /curl\b.*\|\s*(sh|bash)\b/, reason: "Blocked piping remote script directly to shell" }];
for (const rule of blocked) {
  if (rule.re.test(cmd)) {
    console.error(`[Claude Hook Blocked] ${rule.reason}: ${cmd}`);
    process.exit(2);
  }
}
' "$PAYLOAD"
```

---

## 3.2 Experimental Code Mode (v2.1.323+): Parallel JS Tool Orchestration

Migrating 40 route files one `Read` and `Edit` turn at a time burns minutes and resends conversation history on every hop. In **Code Mode**, Claude writes a short JavaScript orchestration snippet that fans out reads, filters noise, and executes coordinated edits in a single turn.

Best fits for Code Mode:
1. **Cross-directory codemods**: migrating loggers, import paths, or validation schemas across dozens of files;
2. **Log deduplication**: collapsing 10,000 lines of test failures into 5 distinct root causes before feeding results back to the model;
3. **Cross-file parity audits**: diffing all i18n JSON locale keys in one pass.

Always combine Code Mode with `PreToolUse` Hooks and a clean Git branch so high-throughput edits stay reversible.

---

## Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Hook script silently fails or prints permission denied** | Missing execute bit or relative path broke in subdirectory | Run `chmod +x .claude/hooks/*.sh` and prefix paths with `"$CLAUDE_PROJECT_DIR"` |
| **`PostToolUse` formatter slows down Markdown edits** | Missing `if` file-extension filter | Restrict via `"if": "Edit(*.ts)"` or `"if": "Edit(*.tsx)"` |
| **Session hangs when reading managed `.env` named pipes** | Blocking FIFO/named pipe read | Upgrade to Claude Code v2.1.308+ and block `.env` reads via `protect-secrets.sh` | ---

[Home](/en/) | [Prev (Ch.02)](./ch02_context_economics.md) | [Next (Ch.04)](./ch04_whiteboards_docs.md) | [中文版](/claude/ch03_hooks_code_mode)
