---
title: "Ch.06 Legacy Monolith Reverse Engineering & Safe Debt Cleanup | Claude Blue Book"
description: "Slice 1M-token context vertically across legacy monoliths, classify tech debt into L1-L4 risk tiers, lock behavior with characterization tests, and upgrade safely."
lastUpdated: 2026-11-26
---

[Home](/en/) | [Prev (Ch.05)](./ch05_design_canvas.md) | [Next (Ch.07)](./ch07_subagents_refactoring.md) | [中文版](/claude/ch06_legacy_governance)

# Ch.06 Legacy Monolith Reverse Engineering & Minimally Invasive Debt Cleanup

> **The Real Problem**: Inheriting a five-year-old undocumented monolith where one innocent field rename triggers a production outage, or staring at a breaking major framework upgrade with no safe starting point.  
> **Tangible Output & Takeaway**: Vertical 1M-context slicing strategy, L1–L4 refactor risk matrix, and automated characterization-test generation specs.  
> **Viral Screenshot Quote**: *"Legacy code isn't scary because it's ugly—it's scary because nobody remembers which hidden contracts it protects. Lock existing behavior in snapshot tests before deleting a single line."*

Almost any coding agent can scaffold a greenfield app quickly. Real engineering leverage shows up in **hundred-thousand-line revenue-generating monoliths** touched by five generations of engineers. Claude Opus 5.5 and Sonnet 5.5 pair a **1M-token context window** with low cache-read costs—ideal for tracing hidden cross-module side effects when fed cleanly.

---

## Intuitive Metaphor: Reinforcing a Century-Old Bridge Without Closing Traffic

```text
[Full Rewrite] ──> Close the bridge for six months, starve the business, and miss 30 historic edge cases.
[Minimally Invasive] ──> 1. Ultrasonic scan (plan mode): rank structural beams by risk tier (L1–L4);
                         2. Temporary steel bracing (characterization tests): lock current load behavior as baseline;
                         3. Swap one beam at a time (anti-corruption layer): run tests green after every piece.
```

---

## Beginner Quickstart: 3 Steps to Launch

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
| **L4 High Risk** | Billing math, auth core, primary schema migrations | Never big-bang rewrite; shadow traffic + characterization locks | Line-by-line human sign-off | ---

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

## Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Refactoring quietly "fixed" a quirk and broke an upstream consumer** | Upstream callers depended on the old edge-case payload | Lock `LEGACY_BEHAVIOR` first; split refactors and behavior changes into separate PRs |
| **Upgrading 60 files at once causes 200+ TypeScript errors** | Batch scope exceeded safe blast radius | `git reset --hard HEAD` and migrate one directory (5–8 files) per green commit |
| **Long-context session loses precision mid-audit** | Lockfiles and build artifacts polluted context | Exclude `dist/`, `coverage/`, and `*.lock` in `.claudeignore` | ---

[Home](/en/) | [Prev (Ch.05)](./ch05_design_canvas.md) | [Next (Ch.07)](./ch07_subagents_refactoring.md) | [中文版](/claude/ch06_legacy_governance)
