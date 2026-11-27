---
title: "Ch.02 Context Economics: Lean CLAUDE.md, Skills & MCP | Claude Blue Book"
description: "Apply the 150-line CLAUDE.md rule with @AGENTS.md reuse, author progressive SKILL.md workflows, load MCP server:skill commands, and run claude plugin eval."
lastUpdated: 2026-11-26
---

[Home](/en/) | [Prev (Ch.01)](./ch01_programmable_platform.md) | [Next (Ch.03)](./ch03_hooks_code_mode.md) | [中文版](/claude/ch02_context_economics)

# Ch.02 Context Economics: Lean `CLAUDE.md` & On-Demand `Skills`

> **The Real Problem**: Dumping every team handbook, migration note, and style guide into `CLAUDE.md` inflates every prompt's token bill while drowning out critical red lines.  
> **Tangible Output & Takeaway**: 150-line `CLAUDE.md` + `@AGENTS.md` shared-rule pattern, open-standard `SKILL.md` template, and `claude plugin eval` benchmarking.  
> **Viral Screenshot Quote**: *"Stuffing 1,000 lines into `CLAUDE.md` is like plastering a wall with warning signs—the one rule that prevents an outage disappears in the noise."*

After a week with Claude Code, most teams append every new edge case straight into `CLAUDE.md`. Within a month it balloons past a thousand lines covering CSS conventions, database migrations, and release notes. Now even a two-line UI fix pays to load the entire manual—and attention drifts away from actual guardrails.

The cure is **progressive disclosure**: keep standing rules razor-thin and move specialized procedures into on-demand **Skills**.

---

## Intuitive Metaphor: Lanyard Card vs. Toolbox Manuals

```text
[Bloated CLAUDE.md] ──> Forcing every technician to carry a 10kg encyclopedia just to tighten one bolt.
[Layered Context] ──> 1. Back of badge (CLAUDE.md / @AGENTS.md): 10 universal red lines and exact commands;
                         2. Toolbox drawers (.claude/skills/*/SKILL.md): pull out the migration guide only
                            when touching schema files; otherwise only the drawer label sits in context.
```

---

## Beginner Quickstart: 3 Steps to Launch

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

## Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **`SKILL.md` never triggers automatically** | Vague `description` missing concrete file names or verbs | Include explicit triggers such as `schema.prisma` or `database migration` in `description` |
| **`CLAUDE.md` and `AGENTS.md` drift out of sync** | Maintaining duplicate rule files by hand | Keep `AGENTS.md` as single source of truth and start `CLAUDE.md` with `@AGENTS.md` |
| **Third-party skill injects unexpected shell commands** | Missing `PreSkillShellCommand` guardrail | Audit every external `SKILL.md` and enforce the Chapter 3 Hooks kit | ---

[Home](/en/) | [Prev (Ch.01)](./ch01_programmable_platform.md) | [Next (Ch.03)](./ch03_hooks_code_mode.md) | [中文版](/claude/ch02_context_economics)
