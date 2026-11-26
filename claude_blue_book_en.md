# Claude Practical Blue Book: Programmable Primitives, Canvases & Legacy Governance

**v1.0.0 · Sources verified November 26, 2026**

![Claude Practical Blue Book Cover](./images/claude_cover.jpg)


Author: [Hunk Wu](https://pmer.cn) (X: [@ai_pmer](https://x.com/ai_pmer))

[ 🌐 中文 PDF 版 ](./claude_blue_book_zh.pdf) | [ 🌐 Online Hub ](https://book.pmer.cn/en/claude/)

## 🧭 Table of Contents

### Part 1: Programmable Engineering Primitives
- Ch.01 From Chat Coding to Programmable Engineering: Claude 5.5
- Ch.02 Context Economics: Lean `CLAUDE.md`, Skills & MCP
- Ch.03 Deterministic Guardrails: `Hooks` & Experimental Code Mode

### Part 2: Visual Canvases & Persistent Workspaces
- Ch.04 From Messy Brainstorms to Architecture: Claude Whiteboards & Docs
- Ch.05 Terminal-to-Canvas: `/design` Artboards & Code Handoff

### Part 3: 1M-Context Legacy Governance
- Ch.06 Legacy Monolith Reverse Engineering & Safe Debt Cleanup
- Ch.07 Isolated Subagents & Long-Horizon Autonomous Refactoring

### Part 4: Automated Shipping & Enterprise Monetization
- Ch.08 Closing the Last Mile: `/ship`, PR Steward & Team Governance
- Ch.09 Commercial ToB SaaS: Prompt-Cached Auditing & Agent SDK

### Part 5: Critical Product Review & Frontier Watch
- Ch.10 2026 Frontier & Honest Critique: Claude Cowork & Async Memory

---

## 🔌 Companion Engineering Kit

*   **[Claude Hooks & Subagents Kit](https://github.com/aipmer/codex-blue-book/tree/main/examples/claude-hooks-kit)**: Runnable `PreToolUse` Bash danger blocker, secret-file write guard, and read-only architecture reviewer subagent.

*   **[Multi-Agent Rules Generator](https://book.pmer.cn/en/generator)**: Export `CLAUDE.md`, `settings.json` Hooks, and shared `AGENTS.md` templates.

---

# Ch.01 From Chat Coding to Programmable Engineering: Claude 5.5 & Core Primitives

> 🎯 **The Real Problem**: Treating Claude Code like a terminal chat window, stuffing every rule into prompts, and burning budgets on wrong model tiers during large refactors.  
> 💡 **Tangible Output & Takeaway**: Claude 5.5 / Fable 5.2 routing ledger, the 5-primitive trigger matrix, and a read-only diagnostic command for 100k-LOC repositories.  
> ⚡ **Viral Screenshot Quote**: *"Chat windows write snippets; programmable primitives govern 100,000-line repositories. Mastery starts with knowing who pulls each trigger."*

Most engineers install Claude Code and immediately use it like a browser chat box: paste a stack trace, wait for a patch, repeat. That works for a five-file demo. On a multi-module legacy repository, terminal logs quickly drown your context window and you end up repeating the same project rules five times a day.

As of **November 26, 2026**, Anthropic's Claude 5.5 family (Opus / Sonnet / Haiku 5.5) and Fable 5.2 share a **1-million-token context window and 128K max output**, while Claude Code has matured into a programmable engineering platform. This chapter establishes your foundation: model economics, clean setup, and who triggers each of the five core primitives.

---

## 🎯 Intuitive Metaphor: Moving From a Freelance Typist to a Structured Factory

```text
[Ad-Hoc Chat Coding] ──> Giving verbal instructions at a single workbench and repeating safety rules every shift.
[Claude Code Stack]  ──> Five distinct layers with clear ownership:
                         - CLAUDE.md : Wall-mounted plant rules (auto-loaded every session; keep lean)
                         - Skills    : Station SOP cards (opened only when a matching task arrives)
                         - Subagents : Isolated specialist booths (separate context; return concise briefs)
                         - Hooks     : Physical circuit breakers (deterministic code; never rely on AI memory)
                         - MCP       : Standardized pipes to databases, trackers, and remote team skills
```

---

## 🚀 Beginner Quickstart: 3 Steps to Launch

1. **Step 1: Install and verify Claude Code CLI**
   ```bash
   npm install -g @anthropic-ai/claude-code
   claude --version
   ```
2. **Step 2: Run a read-only architecture scan first**
   Start in `plan` permission mode so no files are edited before you inspect the repo map:
   ```bash
   claude --permission-mode plan "Map directory layout, entry points, data layer, and test commands into a concise summary"
   ```
3. **Step 3: Inspect live diffs and resume across surfaces**
   Type `/diff` inside any session for a live side-by-side diff panel, or run `/resume` in the Desktop app to continue the exact same terminal thread.

---

## 1.1 Claude 5.5 & Fable 5.2 Routing Ledger

Picking one frontier model for every keystroke is the fastest way to blow a team budget. Reference standard API text pricing as of **November 26, 2026** (per 1M tokens; verify plan quotas and cache rates on [Anthropic Pricing](https://www.anthropic.com/pricing)):

| Model Tier | Role | Input (/1M) | Output (/1M) | Recommended Engineering Fit |
| :--- | :--- | ---: | ---: | :--- |
| **Claude Fable 5.2** | Extreme architecture & deep reasoning | $8.00 | $40.00 | Hardest system designs or bugs where high-effort Opus stalls |
| **Claude Opus 5.5** | Default flagship workhorse | $4.00 | $20.00 | Multi-file refactoring, legacy decoupling, heavy engineering (~40% cheaper than Opus 5) |
| **Claude Sonnet 5.5** | Fast daily execution | $2.00 | $10.00 | Feature delivery, routine bug fixes, unit tests (30%+ faster than Opus at half the rate) |
| **Claude Haiku 5.5** | Ultra-fast routing & subagents | $0.10 | $0.50 | Read-only codebase exploration, log triage, extraction, parallel lightweight subagents |

Rule of thumb: keep **Opus 5.5** or **Sonnet 5.5** in the driver's seat, and route read-only repo scans to **Haiku 5.5** subagents.

---

## 1.2 Trigger Ownership: The Five Engineering Primitives

The fastest way to master Claude Code's extension model is to track **who pulls the trigger** (the runtime harness, the LLM, or you):

| Primitive | Triggered By | Purpose | Context Cost |
| :--- | :--- | :--- | :--- |
| **`CLAUDE.md`** | Harness (session start) | Standing boundaries, build/test commands, off-limits dirs | High (sent every turn—keep short) |
| **`Skills`** | Model (semantic match) or User (`/name`) | On-demand procedural SOPs (`SKILL.md` + scripts) | Low (loaded only when relevant) |
| **`Subagents`** | Model or User | Parallel isolated exploration, refactors, and reviews | Isolated (returns summary only) |
| **`Hooks`** | Harness (lifecycle events) | Deterministic security blocks, auto-formatting, audit logs | Zero (runs as local shell/HTTP) |
| **`MCP`** | Model / Server startup | External tools, live data, and remote `server:skill` flows | Varies by tool payload |

---

## 1.3 Hands-On: 10-Minute Read-Only Audit for a 100k-LOC Repo

Before changing a single line in an unfamiliar codebase, export a structured diagnostic report:

```bash
claude --permission-mode plan -p "
Analyze this repository without editing any source file and write a Markdown diagnostic report:
1. Identify runtime versions, core frameworks, and package manager;
2. List the top 5 business entry points and persistence layer files;
3. Collect exact build, lint, typecheck, and test commands;
4. Flag high-risk directories with circular imports, zero tests, or raw SQL concatenation.
" > docs/repo-diagnosis.md
```

Verify the commands in `docs/repo-diagnosis.md`, then distill them into a lean `CLAUDE.md` in Chapter 2.

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Claude forgets early instructions after 40 turns** | Verbose terminal logs crowded context and triggered compaction | Use `/compact` with explicit focus notes, and move invariants to `CLAUDE.md` / `Hooks` |
| **Quota drains rapidly on simple edits** | Running Opus/Fable for routine searches and small patches | Switch daily loops to Sonnet 5.5 via `/model` and pin explorer subagents to Haiku 5.5 |
| **12 files edited in the wrong direction** | Skipped `plan` mode and live `/diff` review | Lock file scope in `--permission-mode plan` before granting edits |

---

---

# Ch.02 Context Economics: Lean `CLAUDE.md` & On-Demand `Skills`

> 🎯 **The Real Problem**: Dumping every team handbook, migration note, and style guide into `CLAUDE.md` inflates every prompt's token bill while drowning out critical red lines.  
> 💡 **Tangible Output & Takeaway**: 150-line `CLAUDE.md` + `@AGENTS.md` shared-rule pattern, open-standard `SKILL.md` template, and `claude plugin eval` benchmarking.  
> ⚡ **Viral Screenshot Quote**: *"Stuffing 1,000 lines into `CLAUDE.md` is like plastering a wall with warning signs—the one rule that prevents an outage disappears in the noise."*

After a week with Claude Code, most teams append every new edge case straight into `CLAUDE.md`. Within a month it balloons past a thousand lines covering CSS conventions, database migrations, and release notes. Now even a two-line UI fix pays to load the entire manual—and attention drifts away from actual guardrails.

The cure is **progressive disclosure**: keep standing rules razor-thin and move specialized procedures into on-demand **Skills**.

---

## 🎯 Intuitive Metaphor: Lanyard Card vs. Toolbox Manuals

```text
[Bloated CLAUDE.md]  ──> Forcing every technician to carry a 10kg encyclopedia just to tighten one bolt.
[Layered Context]    ──> 1. Back of badge (CLAUDE.md / @AGENTS.md): 10 universal red lines and exact commands;
                         2. Toolbox drawers (.claude/skills/*/SKILL.md): pull out the migration guide only
                            when touching schema files; otherwise only the drawer label sits in context.
```

---

## 🚀 Beginner Quickstart: 3 Steps to Launch

1. **Step 1: Reuse one shared `AGENTS.md` across all four coding agents**
   If your repo already maintains `AGENTS.md` for Codex, Antigravity, or Kimi, keep `CLAUDE.md` minimal:
   ```markdown
   @AGENTS.md

   ## Claude Code Specifics
   - Enter plan mode before multi-file refactors and confirm the file list first.
   - All edits must pass `.claude/settings.json` Hooks before completion.
   ```
2. **Step 2: Create your first on-demand Skill folder**
   ```bash
   mkdir -p .claude/skills/db-migration
   ```
3. **Step 3: Trigger via `/db-migration` or matching task context**
   Ask Claude Code to add an index to `User` and confirm it loads `.claude/skills/db-migration/SKILL.md` dynamically.

---

## 2.1 The 150-Line Rule for `CLAUDE.md`

Because `CLAUDE.md` loads on every turn, keep only facts that apply to almost every task:
- **Project fingerprint**: stack, package manager, core directory boundaries (<15 lines);
- **Exact commands**: runnable `build`, `lint`, `typecheck`, and `test` commands;
- **Hard red lines**: read-only directories, secret isolation rules, mandatory test checks.

Move everything else out:
- Task-specific procedures (migrations, release checklists) → `.claude/skills/`
- Non-negotiable safety blocks (`rm -rf`, auto-format) → Chapter 3 `Hooks`
- Formatting nitpicks → ESLint / Biome / Ruff

---

## 2.2 Authoring Open-Standard `SKILL.md` Packages

Under the open Agent Skills format, Claude reads only `name` and `description` at startup and loads the full body and scripts only when triggered:

```markdown
---
name: db-migration
description: Author and validate production Prisma/PostgreSQL migrations. Trigger whenever editing schema.prisma, adding indexes, or changing tables.
model: inherit
allowed-tools:
  - Read
  - Edit
  - Bash
---

# Safe Database Migration SOP

1. Run `npx prisma validate` first.
2. Generate diff SQL without touching production: `npx prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma --script`.
3. Flag locking DDL risks:
   - `ADD COLUMN ... NOT NULL` without a `DEFAULT` on large tables;
   - `CREATE INDEX` without `CONCURRENTLY`.
4. Execute locally and require `npm run test:db` to exit 0 before delivery.
```

---

## 2.3 MCP Skills (`server:skill`) for Shared Team Workflows

Claude Code's November 2026 release supports **Skills shipped directly by MCP servers (`server:skill`)**. Instead of letting the agent guess how to sequence fifteen internal API tools, the server packages its canonical workflow alongside the tools:

```bash
claude mcp list
# Invoke a server-provided skill directly from the slash menu:
/sentry:triage-production-spike
```

Updating the workflow on the MCP server updates every developer terminal immediately—and pairing it with `PreSkillShellCommand` Hooks (Chapter 3) blocks unauthorized shell commands on load.

---

## 2.4 Benchmark Skills with `claude plugin eval`

Never guess whether a custom Skill actually helps. Run Claude Code's built-in evaluator against a no-plugin baseline:

```bash
claude plugin eval ./plugins/db-migration-kit --baseline none
```

If a skill adds 30% token overhead without improving pass rate, trim its prose immediately.

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **`SKILL.md` never triggers automatically** | Vague `description` missing concrete file names or verbs | Include explicit triggers such as `schema.prisma` or `database migration` in `description` |
| **`CLAUDE.md` and `AGENTS.md` drift out of sync** | Maintaining duplicate rule files by hand | Keep `AGENTS.md` as single source of truth and start `CLAUDE.md` with `@AGENTS.md` |
| **Third-party skill injects unexpected shell commands** | Missing `PreSkillShellCommand` guardrail | Audit every external `SKILL.md` and enforce the Chapter 3 Hooks kit |

---

---

# Ch.03 Deterministic Guardrails: `Hooks` & Experimental Code Mode

> 🎯 **The Real Problem**: Repeating "never run `rm -rf` or force push" in prompts still leaves production safety up to probability, while serial one-by-one tool calls crawl across 30-file edits.  
> 💡 **Tangible Output & Takeaway**: Runnable starter kit [examples/claude-hooks-kit](https://github.com/aipmer/codex-blue-book/tree/main/examples/claude-hooks-kit) (`.claude/settings.json` + shell blockers) and practical v2.1.323+ Code Mode patterns.  
> ⚡ **Viral Screenshot Quote**: *"Asking an LLM nicely not to drop a table is probabilistic hope. Blocking the tool call in a `PreToolUse` Hook is deterministic engineering."*

Prompt compliance is always probabilistic. Even 99.5% adherence fails once in two hundred runs—and one reckless `git reset --hard` or `.env` read costs more than a month of saved typing.

Claude Code solves this with **Hooks**: deterministic scripts executed by the harness at fixed lifecycle boundaries, consuming **zero context tokens** and enforcing rules regardless of model reasoning. Meanwhile, **Experimental Code Mode** (introduced in Claude Code `v2.1.323+`) lets the agent orchestrate batches of reads, filters, and edits via JavaScript instead of slow serial tool round-trips.

---

## 🎯 Intuitive Metaphor: Physical Security Turnstiles

```text
[Prompt-Only Rules] ──> A paper sign saying "No flammables inside." Under pressure, mistakes slip past.
[Hooks Turnstiles]  ──> Hardware metal detectors at the gate (`PreToolUse`):
                        - Commands matching `rm -rf`, `git push --force`, or `.env` access exit with code 2
                          and bounce a clear rejection message back to the agent before anything executes;
                        - Edited `.ts` files run through your formatter automatically (`PostToolUse`).
```

---

## 🚀 Beginner Quickstart: 3 Steps to Launch

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
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(*)",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-bash.sh"
          }
        ]
      },
      {
        "matcher": "Read|Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-secrets.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "if": "Edit(*.ts)",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/format-on-edit.sh"
          }
        ]
      }
    ],
    "PreSkillShellCommand": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-bash.sh"
          }
        ]
      }
    ]
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

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Hook script silently fails or prints permission denied** | Missing execute bit or relative path broke in subdirectory | Run `chmod +x .claude/hooks/*.sh` and prefix paths with `"$CLAUDE_PROJECT_DIR"` |
| **`PostToolUse` formatter slows down Markdown edits** | Missing `if` file-extension filter | Restrict via `"if": "Edit(*.ts)"` or `"if": "Edit(*.tsx)"` |
| **Session hangs when reading managed `.env` named pipes** | Blocking FIFO/named pipe read | Upgrade to Claude Code v2.1.308+ and block `.env` reads via `protect-secrets.sh` |

---

---

# Ch.04 From Messy Brainstorms to Architecture: Claude Whiteboards & Workspaces

> 🎯 **The Real Problem**: Diving straight into terminal coding before requirements settle buries critical architecture decisions across 100 screens of linear chat history.  
> 💡 **Tangible Output & Takeaway**: End-to-end Whiteboards → Claude Docs / Sheets → Git `docs/adr/` pipeline and a concise Architecture Decision Record (ADR) template.  
> ⚡ **Viral Screenshot Quote**: *"Chat windows are linear; real software architecture is spatial. Converge messy flows on a whiteboard before Claude Code edits line one."*

Most AI rework is not caused by weak coding ability—it comes from coding against half-baked requirements. Debating state transitions, edge permissions, and billing exceptions inside a one-dimensional chat scroll leaves even the human author unsure which revision was approved.

Anthropic's persistent workspace suite—**Claude Whiteboards**, **Claude Docs**, **Claude Sheets**, and **Claude Data**—separates messy discovery from deterministic execution.

---

## 🎯 Intuitive Metaphor: Drawing Red Lines in the War Room Before Breaking Ground

```text
[Coding Inside Linear Chat] ──> Moving load-bearing walls on turn 30 after concrete has already poured.
[Workspace Relay Flow]      ──> 1. Whiteboards: dump voice notes, sticky notes, and edge cases; let Claude cluster flows;
                                2. Docs & Sheets: convert approved blocks into PRDs and capacity spreadsheets;
                                3. Git docs/adr/: commit immutable contracts that Claude Code reads before editing.
```

---

## 🚀 Beginner Quickstart: 3 Steps to Launch

1. **Step 1: Brain-dump raw requirements into Claude Whiteboards**
   Paste meeting notes or speak through user flows; ask Claude to organize cards by swimlanes, happy paths, and failure states.
2. **Step 2: Select a single board region to stress-test**
   Highlight only the "Refund & Webhook Retry" box and probe edge cases without disturbing approved modules.
3. **Step 3: Convert to Docs / Sheets and commit an ADR**
   Turn the finalized board into a Claude Doc (or export to Miro/Lucid), then save the key architectural contract under `docs/adr/` in Git.

---

## 4.1 Persistent Workspace Roles at a Glance

| Workspace Surface | Engineering Role | Handoff Into Codebase |
| :--- | :--- | :--- |
| **Claude Whiteboards** | Spatial brainstorming, swimlanes, system boundaries, retros | Convert to Claude Docs/Slides or export to Miro / Lucid |
| **Claude Docs** | Formal PRDs, API contracts, technical specs | Export Markdown into `docs/specs/` for Claude Code |
| **Claude Sheets** | Multi-tab cost models, rate tables, permission matrices with formulas | Export CSV/JSON fixtures for tests and billing guards |
| **Claude Data** | Live connectors to Snowflake, Salesforce, Mixpanel, Amplitude | Prioritize refactors using real production funnel/error data |

---

## 4.2 Anchoring Decisions in Git (`docs/adr/`)

Cloud boards are great for alignment, but codebases need versioned truth. Store each major decision in `docs/adr/`:

```markdown
# ADR-004: Append-Only Order Events Instead of Direct Status Overwrites

- **Date**: 2026-11-26
- **Status**: Accepted (Source: Claude Whiteboard Order Refactor Board)
- **Decision**: Add an append-only `order_events` table; every transition must pass through `transitionOrder()`.
- **Rejected**: Direct `UPDATE orders SET status = ...` in controllers (causes webhook race conditions).
- **Code Anchors**:
  - `src/domain/order/stateMachine.ts`
  - `src/domain/order/stateMachine.test.ts`
```

Add one index line in `CLAUDE.md` pointing to `docs/adr/004-order-state-machine.md` so future Claude Code sessions respect the contract automatically.

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Whiteboard turns into an unreadable giant wall** | Stuffing field-level schemas onto a high-level canvas | Keep Whiteboards at module/flow granularity; move field details into Docs & Sheets |
| **Claude Code ignores decisions agreed on the board** | Decisions stayed in cloud workspaces outside Git | Export final decisions to `docs/adr/*.md` and index them in `CLAUDE.md` |
| **Stale ADR misleads Claude months later** | Code evolved without updating the ADR | Add a PR check rule requiring ADR updates whenever core domain contracts change |

---

---

# Ch.05 Terminal-to-Canvas: `/design` Prototypes & Direct Code Handoff

> 🎯 **The Real Problem**: Tuning frontend UI spacing and visual hierarchy purely through CLI text prompts takes ten blind iterations and still produces generic "AI purple gradient" templates.  
> 💡 **Tangible Output & Takeaway**: Complete `/design` workflow from Claude Code to `claude.ai/design`, reusable `docs/design-tokens.json` guardrails, and single-day design-to-code handoff specs.  
> ⚡ **Viral Screenshot Quote**: *"Stop describing padding over a text terminal. Run `/design`, pick the winning live artboard on canvas, and pull real components straight into your repo."*

CLI coding agents excel at backend logic, but text terminals are blind to visual hierarchy. **Claude Design (`claude.ai/design`)** and the built-in **`/design` command** in Claude Code bridge that gap directly. Instead of generating flat mock images, Claude Design renders **live, interactive HTML/CSS/JavaScript artboards** with layers, pages, inline comments, and sliders—then hands the approved option straight back to Claude Code for implementation.

---

## 🎯 Intuitive Metaphor: Walking Through Live Model Rooms

```text
[Text-Only UI Tweaks]  ──> Directing interior renovations over a walkie-talkie with your eyes closed.
[Static Image Mockups] ──> Painting a pretty poster that engineers still have to re-measure and code from scratch.
[/design Artboards]    ──> Typing `/design` opens three clickable, live model rooms:
                           inspect breakpoints, leave inline comments, adjust spacing sliders,
                           approve Option B, and let Claude Code wire it into your React/Vue codebase.
```

---

## 🚀 Beginner Quickstart: 3 Steps to Launch

1. **Step 1: Trigger `/design` inside Claude Code**
   ```text
   /design Redesign the mobile navigation and pricing grid using our neutral palette in src/styles/tokens.css; propose 3 high-density engineering options
   ```
2. **Step 2: Review and refine on the companion canvas**
   Open the generated `claude.ai/design` link, compare artboards, and leave inline comments or tweak sliders until layout and contrast look right.
3. **Step 3: Implement the approved artboard into source files**
   Tell Claude Code: "Implement Artboard B into `src/components/PricingSection.tsx` using existing Tailwind tokens and verify `npm run build`."

---

## 5.1 Locking Brand Taste with Design Systems & Token Files

Team plans support persistent **Design Systems** inside Claude Design. Solo builders can achieve consistent discipline by keeping `docs/design-tokens.json` in the repo and referencing it in `/design`:

```json
{
  "brand": "Acme Engineering Console",
  "palette": {
    "bgCanvas": "#0F172A",
    "bgSurface": "#1E293B",
    "textPrimary": "#F8FAFC",
    "textSecondary": "#94A3B8",
    "accentPrimary": "#2563EB",
    "borderSubtle": "rgba(148, 163, 184, 0.18)"
  },
  "typography": {
    "minBodyPx": 14,
    "minCaptionPx": 12
  },
  "banPatterns": [
    "No neon purple gradients",
    "No translateY jump on card hover",
    "No visible text smaller than 12px"
  ]
}
```

---

## 5.2 Single-Day Design-to-Code Relay & Multi-Format Exports

Enterprise case studies using this relay compress multi-week mockup-to-production cycles into a single day:

```text
Whiteboards (Ch.04 flows) → /design (3 live artboards) → Inline approval → Claude Code component PR
```

When handing off an approved artboard back to Claude Code, attach strict reuse constraints:
- Map colors and spacing to existing `tailwind.config.ts` tokens instead of hardcoded hex values;
- Reuse existing `src/components/ui/Button.tsx` primitives;
- Verify `390px`, `768px`, and `1440px` viewports with zero horizontal overflow.

Need stakeholder buy-in before coding? Export the same artboard directly to standalone **HTML**, **PPTX**, **Google Slides**, or **Canva** without rebuilding slides manually.

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Implemented component hardcodes raw hex colors and inline styles** | Handoff prompt omitted existing Tailwind/CSS token mapping | Require mapping to project design tokens and forbid arbitrary inline styles |
| **Desktop looks sharp but 390px mobile overflows** | Artboard review inspected desktop width only | Request a mobile artboard variant and verify 390px / 768px in browser |
| **Redesigning the whole app at once creates tangled components** | `/design` scope was too broad | Scope one section per pass (nav bar, pricing table, settings panel) |

---

---

# Ch.06 Legacy Monolith Reverse Engineering & Minimally Invasive Debt Cleanup

> 🎯 **The Real Problem**: Inheriting a five-year-old undocumented monolith where one innocent field rename triggers a production outage, or staring at a breaking major framework upgrade with no safe starting point.  
> 💡 **Tangible Output & Takeaway**: Vertical 1M-context slicing strategy, L1–L4 refactor risk matrix, and automated characterization-test generation specs.  
> ⚡ **Viral Screenshot Quote**: *"Legacy code isn't scary because it's ugly—it's scary because nobody remembers which hidden contracts it protects. Lock existing behavior in snapshot tests before deleting a single line."*

Almost any coding agent can scaffold a greenfield app quickly. Real engineering leverage shows up in **hundred-thousand-line revenue-generating monoliths** touched by five generations of engineers. Claude Opus 5.5 and Sonnet 5.5 pair a **1M-token context window** with low cache-read costs—ideal for tracing hidden cross-module side effects when fed cleanly.

---

## 🎯 Intuitive Metaphor: Reinforcing a Century-Old Bridge Without Closing Traffic

```text
[Full Rewrite]       ──> Close the bridge for six months, starve the business, and miss 30 historic edge cases.
[Minimally Invasive] ──> 1. Ultrasonic scan (plan mode): rank structural beams by risk tier (L1–L4);
                         2. Temporary steel bracing (characterization tests): lock current load behavior as baseline;
                         3. Swap one beam at a time (anti-corruption layer): run tests green after every piece.
```

---

## 🚀 Beginner Quickstart: 3 Steps to Launch

1. **Step 1: Slice vertically along one live business path**
   ```bash
   claude --permission-mode plan "Trace src/routes/billing.ts down through services, repositories, and DB models; write call graph and side effects to docs/billing-map.md"
   ```
2. **Step 2: Generate characterization tests with zero production edits**
   Ask Claude Code to create `*.characterization.test.ts` locking exact current inputs and outputs—including quirky legacy edge cases.
3. **Step 3: Wrap legacy logic in an Anti-Corruption Layer before replacing internals**
   Introduce a clean adapter interface first, verify all snapshot tests pass, then swap internals incrementally.

---

## 6.1 Four-Tier Refactor Risk Classification (L1–L4)

| Tier | Typical Code Smell | Execution Strategy | Approval Gate |
| :--- | :--- | :--- | :--- |
| **L1 Zero Risk** | Dead code, unused exports, duplicate helpers, missing types | Batch cleanup via Sonnet 5.5 + typecheck | Automated green tests |
| **L2 Low Risk** | Fat functions, duplicate validation, N+1 queries | Add unit tests first, split via Opus 5.5 | `/diff` spot review |
| **L3 Medium Risk** | Major framework or ORM upgrades, shared middleware swaps | Dedicated branch + smoke suite + phased rollout | Explicit rollback plan |
| **L4 High Risk** | Billing math, auth core, primary schema migrations | Never big-bang rewrite; shadow traffic + characterization locks | Line-by-line human sign-off |

---

## 6.2 Characterization Tests: Capturing Reality Before Touching Logic

Unit tests verify intended specs; **characterization tests** verify what undocumented production code actually does today:

```markdown
# Goal
Create `tests/invoiceCalculator.char.test.ts` locking current behavior of `src/legacy/invoiceCalculator.ts`.

# Constraints
- Do NOT edit `src/legacy/invoiceCalculator.ts`.
- Cover normal invoices, negative refunds, zero-tax regions, rounding edges (10.005), and missing discounts.
- Mark unexpected legacy quirks with `// LEGACY_BEHAVIOR` comments; lock current output instead of fixing it yet.

# Validation
- `npm test -- invoiceCalculator.char.test.ts` exits 0.
```

Commit the green characterization suite first. Separate structural refactoring from intentional bug fixes into two PRs.

---

## 6.3 Batching Major Framework Upgrades Without Breaking Builds

Never prompt "upgrade React 17 to 19 across the repo." Generate a risk-tagged file checklist first (`docs/upgrade-checklist.md`), then migrate directory by directory (5–8 files per atomic commit) running `npm run typecheck && npm test` after every batch.

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Refactoring quietly "fixed" a quirk and broke an upstream consumer** | Upstream callers depended on the old edge-case payload | Lock `LEGACY_BEHAVIOR` first; split refactors and behavior changes into separate PRs |
| **Upgrading 60 files at once causes 200+ TypeScript errors** | Batch scope exceeded safe blast radius | `git reset --hard HEAD` and migrate one directory (5–8 files) per green commit |
| **Long-context session loses precision mid-audit** | Lockfiles and build artifacts polluted context | Exclude `dist/`, `coverage/`, and `*.lock` in `.claudeignore` |

---

---

# Ch.07 Isolated Subagents & Long-Horizon Autonomous Refactoring

> 🎯 **The Real Problem**: Mixing codebase search, multi-file edits, noisy test logs, and self-review inside one thread clogs context and blinds the model to its own flawed assumptions.  
> 💡 **Tangible Output & Takeaway**: Production `.claude/agents/*.md` templates (Haiku explorer + Opus independent reviewer) plus deep breakdowns of Rakuten's 7-hour run and Anthropic's Python-to-Rust migration.  
> ⚡ **Viral Screenshot Quote**: *"Never let the same context window both author and approve a refactor. Split exploration, editing, and adversarial review into isolated Subagents."*

Long-horizon refactors hit two walls in a single conversation: search noise fills the window, and the authoring context defends its own mistakes during review. **Claude Code Subagents (`.claude/agents/*.md`)** isolate each role into its own context window, tool allowlist, and model tier—returning only a crisp summary to the coordinator.

---

## 🎯 Intuitive Metaphor: Splitting One Overloaded Worker into Scout, Builder & Inspector

```text
[Single Thread]     ──> One person drafts, builds, and signs their own inspection sheet on a cluttered desk.
[Subagent Division] ──> Coordinator (Opus 5.5) dispatches isolated specialists:
                        ├── Scout (`repo-explorer`, Haiku 5.5, read-only): scans 100 files, returns 30-line map;
                        ├── Builder (`domain-refactor`, Sonnet/Opus 5.5): edits scoped directory and runs tests;
                        └── Inspector (`arch-reviewer`, Opus 5.5, no Bash): audits diffs with zero authoring bias.
```

---

## 🚀 Beginner Quickstart: 3 Steps to Launch

1. **Step 1: Create `.claude/agents/` in your repository**
   ```bash
   mkdir -p .claude/agents
   ```
2. **Step 2: Add read-only explorer and independent reviewer markdown configs**
   Declare explicit `model`, `tools`, and `disallowedTools` in YAML frontmatter.
3. **Step 3: Orchestrate from the main session**
   Prompt: *"Dispatch `repo-explorer` to locate every direct write to `orders`, refactor by module, then invoke `arch-reviewer` on the final diff."*

---

## 7.1 Production `.claude/agents/*.md` Templates

### Read-Only Scout: `.claude/agents/repo-explorer.md` (Haiku 5.5)

```markdown
---
name: repo-explorer
description: Fast read-only dependency and symbol mapping across large repositories when no files should be modified.
model: claude-haiku-5-5
tools:
  - Read
  - Grep
  - Glob
disallowedTools:
  - Edit
  - Write
  - Bash
permissionMode: plan
---

# Read-Only Exploration Rules
1. Return exact file paths, line numbers, and call chains—never dump raw file bodies.
2. Keep total output under 40 Markdown lines, sorted by risk.
```

### Independent Reviewer: `.claude/agents/arch-reviewer.md` (Opus 5.5)

```markdown
---
name: arch-reviewer
description: Critically review diffs for edge cases, concurrency races, security holes, and ADR violations before PR merge.
model: claude-opus-5-5
tools:
  - Read
  - Grep
  - Glob
disallowedTools:
  - Edit
  - Write
  - Bash
permissionMode: plan
---

# Independent Review Protocol
You did not author these edits. Audit strictly:
1. Check compliance with `docs/adr/` and read-only path boundaries;
2. Flag auth gaps, injection vectors, null edges, and async races;
3. Report only verifiable issues (`file:line` + repro + fix), or reply `PASS`.
```

---

## 7.2 Official Case Study 1: Rakuten's 7-Hour Autonomous Refactor

In Anthropic's published enterprise case study, **Rakuten** deployed Claude Code across 70+ business units spanning e-commerce, fintech, and media. On a major open-source refactor, Claude Code ran autonomously for **7 sustained hours** with **99.9% numerical accuracy**, cutting new-feature time-to-market by **79% (from 24 days down to 5 days)**.

Three patterns make 7-hour runs reliable instead of chaotic:
1. **Machine-verifiable Outcomes**: Define numerical and behavioral assertions up front instead of babysitting line-by-line;
2. **Isolated worker contexts**: Keep heavy search and compile logs inside subagents so the lead orchestrator stays focused;
3. **Tight local test loops**: Catch drift every few minutes rather than letting broken state compound across hours.

---

## 7.3 Official Case Study 2: Anthropic's Python-to-Rust Differential Migration

Anthropic's own engineering team migrated their core **Messages API from Python to Rust** using teams of Claude agents backed by **differential testing** against the live Python service:

```text
Shared Request Corpus
   ├──► Legacy Python Service ──► Response A (status, headers, JSON)
   └──► New Rust Service      ──► Response B (status, headers, JSON)
                                       │
                                       ▼
                Diff harness catches any mismatch ──► Subagent patches Rust & re-verifies
```

You can apply the exact same differential harness whenever migrating legacy services, ORMs, or billing engines: replay captured payloads against both old and new paths until zero diffs remain.

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Parallel write subagents overwrite each other's files** | Multiple writers sharing one working tree | Partition mutually exclusive directories or give each writer a dedicated `git worktree` |
| **Subagent dumps 3,000 lines of raw logs into main thread** | Missing output budget in agent prompt | Require concise `<40`-line summaries with file paths only |
| **Main session never delegates to your custom subagent** | Trigger conditions missing from `description` | Add explicit trigger scenarios to `description` or invoke `@arch-reviewer` directly |

---

---

# Ch.08 Closing the Last Mile: `/ship`, PR Steward & Team Governance

> 🎯 **The Real Problem**: AI finishes coding in ten minutes, yet PRs sit stalled in CI queues for three days over flaky lint errors, missing test edge cases, and review bottlenecks.  
> 💡 **Tangible Output & Takeaway**: End-to-end **Claude Ship (`/ship`) + PR Steward + Claude Approvals** rollout guide, declarative approval policy YAML, and team cost guardrails.  
> ⚡ **Viral Screenshot Quote**: *"Generating code is only half the job—merging cleanly into main is shipping. Hand CI ping-pong to `/ship` so humans review real risk."*

For modern teams, the bottleneck has shifted from code authoring to **PR review and CI rework**. In late November 2026, Anthropic introduced **Claude Ship (`/ship`)**, **PR Steward (Beta)**, and **Claude Approvals** to close the gap between local diffs and production merges.

---

## 🎯 Intuitive Metaphor: Automated Airport Security & Boarding Lanes

```text
[Manual PR Queue] ──> Push PR → wait for CI failure → read logs manually → push fix → wait days for review.
[Claude Ship]     ──> Run `/ship` in terminal:
                      1. PR Steward watches CI checks, pulls failure logs, and pushes targeted fixes;
                      2. Claude Approvals checks diffs against team policy—approving low-risk changes
                         automatically while routing auth, billing, and schema edits to human sign-off.
```

---

## 🚀 Beginner Quickstart: 3 Steps to Launch

1. **Step 1: Verify local Hooks and tests pass cleanly**
   ```bash
   git status --short
   npm run lint && npm test && npm run build
   ```
2. **Step 2: Run `/ship` inside Claude Code**
   Generates clean commits, structured PR summaries (impact + test evidence), and pushes the branch.
3. **Step 3: Lock high-risk paths behind mandatory human review**
   Allow policy-driven approvals for `docs/` and `tests/`, while keeping auth, billing, migrations, and `.claude/settings.json` strictly human-gated.

---

## 8.1 Declarative Approval Boundaries (`.claude/approval-policy.yml`)

```yaml
version: 1
auto_approve_eligible:
  paths:
    - "docs/**"
    - "tests/**"
    - "src/components/ui/**"
  require_checks:
    - "ci/typecheck"
    - "ci/unit-tests"
    - "ci/build"
  max_changed_lines: 300

mandatory_human_review:
  paths:
    - "prisma/migrations/**"
    - "src/auth/**"
    - "src/billing/**"
    - ".github/workflows/**"
    - ".claude/settings.json"
```

Always lock `.claude/settings.json` and `.github/workflows/**` under mandatory human review so no automated agent can relax its own guardrails.

---

## 8.2 Team Budget Brakes & Enterprise Security

Before scaling automated PR workflows across a team, enable three controls:
1. **Efficient Mode**: Route routine CI checks and fixes to fast tiers (Sonnet / Haiku 5.5) while reserving Opus 5.5 / Fable 5.2 for explicit architectural escalations;
2. **Tiered Spending Caps**: Enforce hard monthly caps at individual, group, and organization levels;
3. **Identity & Compliance**: Pair SAML SSO / SCIM offboarding with Compliance API logs routed to your SIEM.

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **PR Steward deletes a failing test to turn CI green** | Policy lacked anti-weakening guard | Block any diff that removes or skips assertions via `arch-reviewer` and CI checks |
| **Concurrent PR fixes spike daily API spend** | Missing Efficient Mode and spending caps | Set hard org caps immediately and route CI triage to Sonnet 5.5 |
| **Automated merge lands a locking DB migration** | `migrations/` omitted from human-review paths | Protect migration paths via GitHub CODEOWNERS and mandatory human approval |

---

---

# Ch.09 Commercial ToB SaaS: High-Margin Code Auditing & Document Intelligence

> 🎯 **The Real Problem**: Generic \$9.90 chat wrappers get crushed by free native apps, while naive 1M-token document tools burn through gross margins on raw API input costs.  
> 💡 **Tangible Output & Takeaway**: Runnable TypeScript compliance audit engine using Prompt Caching + tiered Sonnet/Opus routing, Claude Agent SDK packaging, and B2B procurement checklist.  
> ⚡ **Viral Screenshot Quote**: *"Don't fight a price war with \$9.90 chat wrappers. Package 1M context and low-cost Prompt Caching into high-stakes compliance workflows that enterprises pay annual seats for."*

While *Codex Blue Book* Ch.10 focuses on rapid 2-hour solo subscription MVPs, Claude's strongest commercial moat is **high-ACV B2B engineering and compliance software**: automated SOC2/OWASP PR auditing, multi-contract legal deviation reports, and vertical intelligence workbenches backed by **Claude Agent SDK**.

---

## 🎯 Intuitive Metaphor: From Street Fortune Teller to Licensed Audit Firm

```text
[Generic Chat Wrapper] ──> Answers ad-hoc questions anyone can copy; thin margins.
[Vertical Audit Suite] ──> 1. Warm static policy manuals in Prompt Cache (pay once, read cheaply);
                           2. Audit every incoming PR or 100-page contract against fixed baselines;
                           3. Return structured JSON with verbatim `evidenceQuote`, line numbers, and audit logs.
```

---

## 🚀 Beginner Quickstart: 3 Steps to Launch

1. **Step 1: Pick a high-cost-of-error vertical workflow**
   Examples: pre-release OWASP/SOC2 PR gates, RFP compliance deviation matrices, or privacy-policy audits.
2. **Step 2: Pin static policy manuals in Prompt Cache**
   Place unchanging rulebooks in a top `system` block with `cache_control: { type: "ephemeral" }` to slash repeat input costs by 80%+.
3. **Step 3: Enforce strict JSON outputs + verbatim citation checks**
   Never ship free-form prose to enterprise buyers—validate that every `evidenceQuote` exists verbatim in the source input.

---

## 9.1 Core Audit Engine: Prompt Caching + Tiered Routing (TypeScript)

```typescript
// src/server/auditEngine.ts
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export interface AuditFinding {
  ruleId: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  filePath: string
  lineRange: string
  evidenceQuote: string
  remediation: string
}

export async function runComplianceAudit(params: {
  tenantId: string
  policyManualMarkdown: string
  targetPayload: string
  deepReview?: boolean
}) {
  const model = params.deepReview ? 'claude-opus-5-5' : 'claude-sonnet-5-5'

  const response = await client.messages.create({
    model,
    max_tokens: 4096,
    system: [
      {
        type: 'text',
        text: 'You are a strict compliance auditor. Return ONLY valid JSON matching {"findings": AuditFinding[]}. Every finding must cite an exact verbatim evidenceQuote from the input.'
      },
      {
        type: 'text',
        text: params.policyManualMarkdown,
        cache_control: { type: 'ephemeral' }
      }
    ],
    messages: [
      {
        role: 'user',
        content: `Audit the following submission strictly against the cached policy manual:\n\n${params.targetPayload}`
      }
    ]
  })

  const rawText = response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('')

  const parsed = JSON.parse(rawText) as { findings: AuditFinding[] }
  return {
    tenantId: params.tenantId,
    model,
    findings: parsed.findings,
    usage: {
      inputTokens: response.usage.input_tokens,
      cacheReadTokens: response.usage.cache_read_input_tokens ?? 0,
      outputTokens: response.usage.output_tokens
    }
  }
}
```

When your SaaS needs multi-step repo inspection, tool calls, and hooks inside your own backend, embed the official **Claude Agent SDK (Python / TypeScript)** instead of reinventing the agent loop.

---

## 9.2 Margin Architecture & Enterprise Procurement Readiness

1. **Three-tier routing**: Pre-filter with `Haiku 5.5` (\$0.10/\$0.50), run 90% of audits on `Sonnet 5.5` + Prompt Caching, and escalate only `critical` flags to `Opus 5.5`.
2. **Strict tenant isolation**: Never share cached contexts across customer tenants.
3. **Procurement checklist**: Explicit zero-training data policy (with optional ZDR), exportable tenant audit logs, and base-seat + usage-tier annual pricing.

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Prompt Cache hit rate stays at 0%** | Dynamic timestamps or request IDs placed before static policy text | Move all static policy blocks to the top of `system` and keep dynamic values in `messages` |
| **`JSON.parse` fails on fenced Markdown blocks** | Missing schema enforcement or parser guard | Use official Structured Outputs / Tool Use plus server-side Zod validation |
| **Enterprise buyers question hallucinated findings** | Findings lack verifiable verbatim quotes | Verify every `evidenceQuote` substring exists in the raw input before rendering |

---

---

# Ch.10 2026 Frontier & Honest Critique: Claude Cowork, Computer Use & Async Memory

> 🎯 **The Real Problem**: Vendors ship new concepts every month (Cowork, Computer Use, Dreaming); blindly migrating production teams onto half-baked surfaces wastes weeks, while ignoring real shifts leaves leverage behind.  
> 💡 **Tangible Output & Takeaway**: Unvarnished product evaluation of Claude Cowork, enterprise Computer Use compliance boundaries, and Anthropic's harness-pruning & async memory trajectory.  
> ⚡ **Viral Screenshot Quote**: *"Great engineering handbooks call half-baked products by their real name. Understand Claude Cowork's ambition—and why local Claude Code still wins production today."*

A useful handbook never reads like a vendor press release. Chapters 1–9 focused on proven, production-ready Claude Code primitives. This closing chapter takes an honest product-builder's look at three emerging surfaces—especially **Claude Cowork**, where the direction is promising but the current product shape remains immature.

---

## 🎯 Intuitive Metaphor: High-Speed Rail vs. Experimental Maglev Track

```text
[Production Rail (Bet Today)]   ──> Claude Code 5 primitives (CLAUDE.md / Skills / Subagents / Hooks / MCP),
                                    `/design` artboard handoff, 1M-context characterization refactors, Prompt Caching.
[Experimental Track (Sandbox)]  ──> Claude Cowork cloud VMs, enterprise Computer Use, async Dreaming memory.
                                    Right direction, but UX cohesion, compliance, and cost controls still lag.
```

---

## 🚀 Beginner Quickstart: 3 Steps to Launch

1. **Step 1: Separate your team's production stack from a sandbox track**
   Keep production branches strictly on local Claude Code + Hooks + CI; test beta surfaces in isolated repos for two weeks first.
2. **Step 2: Cap spend before launching asynchronous cloud tasks**
   Unattended cloud loops burn quotas invisibly when assertions are vague—lock caps before enabling background jobs.
3. **Step 3: Follow primary engineering sources**
   Track `@AnthropicAI`, `@claudeai`, `@bcherny`, and official Claude Code release notes directly.

---

## 10.1 Honest Product Critique: Why Claude Cowork Is Still Immature

Anthropic unified chat and **Claude Cowork** so multi-step jobs run inside cloud virtual machines even after you close your laptop. The core promise—true asynchronous delegation—is right. In daily software engineering practice, however, **Claude Cowork currently behaves like an unfinished transitional product**:

| Dimension | Genuine Strength | Current Real-World Shortcoming |
| :--- | :--- | :--- |
| **Runtime Environment** | Cloud sandbox survives closing your laptop | Opaque environment; connecting private registries, local Docker DBs, or corporate VPNs adds far more friction than local CLI |
| **Interaction Loop** | Smooth entry for non-technical office tasks | Lacks the crisp local `/diff`, instant `Ctrl+C` steering, and tight IDE loop of Claude Code—easy to wait 30 minutes for an off-target output |
| **Cost Predictability** | Autonomous multi-step completion | Weakly bounded cloud runs can spin through quotas out of sight with limited replay visibility |
| **Compliance** | Unified web/desktop/mobile UI | Hard to clear for teams requiring strict local code residency, deterministic local Hooks, or ZDR |

**Practical verdict**: Keep **local Claude Code + Hooks + `/design` + `/ship`** as your core engineering driver. Use Cowork selectively for low-risk public research or lightweight spreadsheet/document chores until its developer UX and transparency mature.

---

## 10.2 Enterprise Computer Use: Strict Boundaries

Anthropic's desktop **Computer Use (Beta)** for Team and Enterprise is wisely conservative: **strictly off by default**, requiring explicit Organization Owner activation and app allowlists (blocking password managers). Crucially, visual screenshot logging makes it **incompatible with strict Zero Data Retention (ZDR) and HIPAA compliance**.

Rule of thumb: whenever an **API, CLI, or MCP** exists, never automate via GUI pixel clicking. Reserve Computer Use solely for legacy closed desktop apps with zero programmatic interface.

---

## 10.3 Harness Pruning & Asynchronous "Dreaming" Memory

In late-2026 talks, Claude Code lead Boris Cherny highlighted a revealing trend: **as Claude 5.5 and Fable grow stronger, Anthropic aggressively deletes up to 80% of legacy system-prompt workarounds once needed to patch older models.**

That reinforces the thesis of this entire book: durable engineering leverage lives in clean project boundaries, automated tests, and deterministic Hooks—not fragile prompt hacks. Looking ahead, watch two roadmap areas closely:
1. **File-system persistent memory**: human-auditable Markdown memory shared across sessions;
2. **Idle-time "Dreaming"**: background sessions that review past work, consolidate recurring conventions, and flag stale assumptions automatically.

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Migrated a core repo into Cowork and hit private-network failures** | Treating a transitional cloud surface as a full local dev workstation | Return core coding to local Claude Code CLI + local Docker + Hooks |
| **Enabling Computer Use triggers a ZDR/HIPAA compliance alert** | Screenshot retention conflicts with strict ZDR/HIPAA settings | Disable Computer Use in org settings and use MCP connectors instead |
| **Legacy mega-prompts perform worse after upgrading to Claude 5.5** | Over-prescriptive old workarounds fight stronger native planning | Prune `CLAUDE.md` down to goals, constraints, and verification commands |

---

---
