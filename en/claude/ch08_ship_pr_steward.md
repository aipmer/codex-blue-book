---
title: "Ch.08 Closing the Last Mile: /ship, PR Steward & Team Governance | Claude Blue Book"
description: "Automate PR delivery with November 2026 Claude Ship (/ship), PR Steward CI self-healing, Claude Approvals policy gates, and team spending caps."
lastUpdated: 2026-11-26
---

[Home](/en/) | [Prev (Ch.07)](./ch07_subagents_refactoring.md) | [Next (Ch.09)](./ch09_enterprise_saas.md) | [中文版](/claude/ch08_ship_pr_steward)

# Ch.08 Closing the Last Mile: `/ship`, PR Steward & Team Governance

> **The Real Problem**: AI finishes coding in ten minutes, yet PRs sit stalled in CI queues for three days over flaky lint errors, missing test edge cases, and review bottlenecks.  
> **Tangible Output & Takeaway**: End-to-end **Claude Ship (`/ship`) + PR Steward + Claude Approvals** rollout guide, declarative approval policy YAML, and team cost guardrails.  
> **Viral Screenshot Quote**: *"Generating code is only half the job—merging cleanly into main is shipping. Hand CI ping-pong to `/ship` so humans review real risk."*

For modern teams, the bottleneck has shifted from code authoring to **PR review and CI rework**. In late November 2026, Anthropic introduced **Claude Ship (`/ship`)**, **PR Steward (Beta)**, and **Claude Approvals** to close the gap between local diffs and production merges.

---

## Intuitive Metaphor: Automated Airport Security & Boarding Lanes

```text
[Manual PR Queue] ──> Push PR → wait for CI failure → read logs manually → push fix → wait days for review.
[Claude Ship] ──> Run `/ship` in terminal:
                      1. PR Steward watches CI checks, pulls failure logs, and pushes targeted fixes;
                      2. Claude Approvals checks diffs against team policy—approving low-risk changes
                         automatically while routing auth, billing, and schema edits to human sign-off.
```

---

## Beginner Quickstart: 3 Steps to Launch

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

## Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **PR Steward deletes a failing test to turn CI green** | Policy lacked anti-weakening guard | Block any diff that removes or skips assertions via `arch-reviewer` and CI checks |
| **Concurrent PR fixes spike daily API spend** | Missing Efficient Mode and spending caps | Set hard org caps immediately and route CI triage to Sonnet 5.5 |
| **Automated merge lands a locking DB migration** | `migrations/` omitted from human-review paths | Protect migration paths via GitHub CODEOWNERS and mandatory human approval | ---

[Home](/en/) | [Prev (Ch.07)](./ch07_subagents_refactoring.md) | [Next (Ch.09)](./ch09_enterprise_saas.md) | [中文版](/claude/ch08_ship_pr_steward)
