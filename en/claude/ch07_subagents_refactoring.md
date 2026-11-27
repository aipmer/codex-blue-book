---
title: "Ch.07 Isolated Subagents & Long-Horizon Autonomous Refactoring | Claude Blue Book"
description: "Configure .claude/agents/*.md isolated subagents and break down official Rakuten (7-hour autonomous refactor) and Anthropic Python-to-Rust migration playbooks."
lastUpdated: 2026-11-26
---

[Home](/en/) | [Prev (Ch.06)](./ch06_legacy_governance.md) | [Next (Ch.08)](./ch08_ship_pr_steward.md) | [中文版](/claude/ch07_subagents_refactoring)

# Ch.07 Isolated Subagents & Long-Horizon Autonomous Refactoring

> **The Real Problem**: Mixing codebase search, multi-file edits, noisy test logs, and self-review inside one thread clogs context and blinds the model to its own flawed assumptions.  
> **Tangible Output & Takeaway**: Production `.claude/agents/*.md` templates (Haiku explorer + Opus independent reviewer) plus deep breakdowns of Rakuten's 7-hour run and Anthropic's Python-to-Rust migration.  
> **Viral Screenshot Quote**: *"Never let the same context window both author and approve a refactor. Split exploration, editing, and adversarial review into isolated Subagents."*

Long-horizon refactors hit two walls in a single conversation: search noise fills the window, and the authoring context defends its own mistakes during review. **Claude Code Subagents (`.claude/agents/*.md`)** isolate each role into its own context window, tool allowlist, and model tier—returning only a crisp summary to the coordinator.

---

## Intuitive Metaphor: Splitting One Overloaded Worker into Scout, Builder & Inspector

```text
[Single Thread] ──> One person drafts, builds, and signs their own inspection sheet on a cluttered desk.
[Subagent Division] ──> Coordinator (Opus 5.5) dispatches isolated specialists:
                        ├── Scout (`repo-explorer`, Haiku 5.5, read-only): scans 100 files, returns 30-line map;
                        ├── Builder (`domain-refactor`, Sonnet/Opus 5.5): edits scoped directory and runs tests;
                        └── Inspector (`arch-reviewer`, Opus 5.5, no Bash): audits diffs with zero authoring bias.
```

---

## Beginner Quickstart: 3 Steps to Launch

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
   └──► New Rust Service ──► Response B (status, headers, JSON)
                                       │
                                       ▼
                Diff harness catches any mismatch ──► Subagent patches Rust & re-verifies
```

You can apply the exact same differential harness whenever migrating legacy services, ORMs, or billing engines: replay captured payloads against both old and new paths until zero diffs remain.

---

## Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Parallel write subagents overwrite each other's files** | Multiple writers sharing one working tree | Partition mutually exclusive directories or give each writer a dedicated `git worktree` |
| **Subagent dumps 3,000 lines of raw logs into main thread** | Missing output budget in agent prompt | Require concise `<40`-line summaries with file paths only |
| **Main session never delegates to your custom subagent** | Trigger conditions missing from `description` | Add explicit trigger scenarios to `description` or invoke `@arch-reviewer` directly | ---

[Home](/en/) | [Prev (Ch.06)](./ch06_legacy_governance.md) | [Next (Ch.08)](./ch08_ship_pr_steward.md) | [中文版](/claude/ch07_subagents_refactoring)
