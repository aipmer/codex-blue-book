---
title: "Ch.04 From Messy Brainstorms to Architecture: Claude Whiteboards & Docs | Claude Blue Book"
description: "Break out of linear chat transcripts with Claude Whiteboards, convert boards cleanly into Claude Docs, Sheets, and Miro, and lock decisions into Git ADRs."
lastUpdated: 2026-11-26
---

[Home](/en/) | [Prev (Ch.03)](./ch03_hooks_code_mode.md) | [Next (Ch.05)](./ch05_design_canvas.md) | [中文版](/claude/ch04_whiteboards_docs)

# Ch.04 From Messy Brainstorms to Architecture: Claude Whiteboards & Workspaces

> **The Real Problem**: Diving straight into terminal coding before requirements settle buries critical architecture decisions across 100 screens of linear chat history.  
> **Tangible Output & Takeaway**: End-to-end Whiteboards → Claude Docs / Sheets → Git `docs/adr/` pipeline and a concise Architecture Decision Record (ADR) template.  
> **Viral Screenshot Quote**: *"Chat windows are linear; real software architecture is spatial. Converge messy flows on a whiteboard before Claude Code edits line one."*

Most AI rework is not caused by weak coding ability—it comes from coding against half-baked requirements. Debating state transitions, edge permissions, and billing exceptions inside a one-dimensional chat scroll leaves even the human author unsure which revision was approved.

Anthropic's persistent workspace suite—**Claude Whiteboards**, **Claude Docs**, **Claude Sheets**, and **Claude Data**—separates messy discovery from deterministic execution.

---

## Intuitive Metaphor: Drawing Red Lines in the War Room Before Breaking Ground

```text
[Coding Inside Linear Chat] ──> Moving load-bearing walls on turn 30 after concrete has already poured.
[Workspace Relay Flow] ──> 1. Whiteboards: dump voice notes, sticky notes, and edge cases; let Claude cluster flows;
                                2. Docs & Sheets: convert approved blocks into PRDs and capacity spreadsheets;
                                3. Git docs/adr/: commit immutable contracts that Claude Code reads before editing.
```

---

## Beginner Quickstart: 3 Steps to Launch

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
| **Claude Data** | Live connectors to Snowflake, Salesforce, Mixpanel, Amplitude | Prioritize refactors using real production funnel/error data | ---

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

## Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Whiteboard turns into an unreadable giant wall** | Stuffing field-level schemas onto a high-level canvas | Keep Whiteboards at module/flow granularity; move field details into Docs & Sheets |
| **Claude Code ignores decisions agreed on the board** | Decisions stayed in cloud workspaces outside Git | Export final decisions to `docs/adr/*.md` and index them in `CLAUDE.md` |
| **Stale ADR misleads Claude months later** | Code evolved without updating the ADR | Add a PR check rule requiring ADR updates whenever core domain contracts change | ---

[Home](/en/) | [Prev (Ch.03)](./ch03_hooks_code_mode.md) | [Next (Ch.05)](./ch05_design_canvas.md) | [中文版](/claude/ch04_whiteboards_docs)
