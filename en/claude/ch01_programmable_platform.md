---
title: "Ch.01 From Chat Coding to Programmable Engineering: Claude 5.5 | Claude Blue Book"
description: "Verified Nov 26, 2026: Claude Opus/Sonnet/Haiku 5.5 & Fable 5.2 routing economics, Claude Code's 5 extension primitives, and 10-minute 100k-LOC repo audits."
lastUpdated: 2026-11-26
---

[Home](/en/) | [Claude Hub](/en/claude/) | [Next (Ch.02)](./ch02_context_economics.md) | [中文版](/claude/ch01_programmable_platform)

# Ch.01 From Chat Coding to Programmable Engineering: Claude 5.5 & Core Primitives

> **The Real Problem**: Treating Claude Code like a terminal chat window, stuffing every rule into prompts, and burning budgets on wrong model tiers during large refactors.  
> **Tangible Output & Takeaway**: Claude 5.5 / Fable 5.2 routing ledger, the 5-primitive trigger matrix, and a read-only diagnostic command for 100k-LOC repositories.  
> **Viral Screenshot Quote**: *"Chat windows write snippets; programmable primitives govern 100,000-line repositories. Mastery starts with knowing who pulls each trigger."*

Most engineers install Claude Code and immediately use it like a browser chat box: paste a stack trace, wait for a patch, repeat. That works for a five-file demo. On a multi-module legacy repository, terminal logs quickly drown your context window and you end up repeating the same project rules five times a day.

As of **November 26, 2026**, Anthropic's Claude 5.5 family (Opus / Sonnet / Haiku 5.5) and Fable 5.2 share a **1-million-token context window and 128K max output**, while Claude Code has matured into a programmable engineering platform. This chapter establishes your foundation: model economics, clean setup, and who triggers each of the five core primitives.

---

## Intuitive Metaphor: Moving From a Freelance Typist to a Structured Factory

```text
[Ad-Hoc Chat Coding] ──> Giving verbal instructions at a single workbench and repeating safety rules every shift.
[Claude Code Stack] ──> Five distinct layers with clear ownership:
                         - CLAUDE.md : Wall-mounted plant rules (auto-loaded every session; keep lean)
                         - Skills : Station SOP cards (opened only when a matching task arrives)
                         - Subagents : Isolated specialist booths (separate context; return concise briefs)
                         - Hooks : Physical circuit breakers (deterministic code; never rely on AI memory)
                         - MCP : Standardized pipes to databases, trackers, and remote team skills
```

---

## Beginner Quickstart: 3 Steps to Launch

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
| **Claude Haiku 5.5** | Ultra-fast routing & subagents | $0.10 | $0.50 | Read-only codebase exploration, log triage, extraction, parallel lightweight subagents | Rule of thumb: keep **Opus 5.5** or **Sonnet 5.5** in the driver's seat, and route read-only repo scans to **Haiku 5.5** subagents.

---

## 1.2 Trigger Ownership: The Five Engineering Primitives

The fastest way to master Claude Code's extension model is to track **who pulls the trigger** (the runtime harness, the LLM, or you):

| Primitive | Triggered By | Purpose | Context Cost |
| :--- | :--- | :--- | :--- |
| **`CLAUDE.md`** | Harness (session start) | Standing boundaries, build/test commands, off-limits dirs | High (sent every turn—keep short) |
| **`Skills`** | Model (semantic match) or User (`/name`) | On-demand procedural SOPs (`SKILL.md` + scripts) | Low (loaded only when relevant) |
| **`Subagents`** | Model or User | Parallel isolated exploration, refactors, and reviews | Isolated (returns summary only) |
| **`Hooks`** | Harness (lifecycle events) | Deterministic security blocks, auto-formatting, audit logs | Zero (runs as local shell/HTTP) |
| **`MCP`** | Model / Server startup | External tools, live data, and remote `server:skill` flows | Varies by tool payload | ---

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

## Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Claude forgets early instructions after 40 turns** | Verbose terminal logs crowded context and triggered compaction | Use `/compact` with explicit focus notes, and move invariants to `CLAUDE.md` / `Hooks` |
| **Quota drains rapidly on simple edits** | Running Opus/Fable for routine searches and small patches | Switch daily loops to Sonnet 5.5 via `/model` and pin explorer subagents to Haiku 5.5 |
| **12 files edited in the wrong direction** | Skipped `plan` mode and live `/diff` review | Lock file scope in `--permission-mode plan` before granting edits | ---

[Home](/en/) | [Claude Hub](/en/claude/) | [Next (Ch.02)](./ch02_context_economics.md) | [中文版](/claude/ch01_programmable_platform)
