---
title: "Ch.03 Tiered Subagents (explore / plan / coder) & /swarm Parallel Refactors"
description: "Separate read-only exploration, zero-side-effect planning, and isolated coding in Kimi Code, throttle /swarm concurrency with KIMI_CODE_AGENT_SWARM_MAX_CONCURRENCY, and stop retry loops."
lastUpdated: 2026-11-26
---

[Back to Kimi Hub](/en/kimi/) | [Prev: config.toml & kimi acp](/en/kimi/ch02_acp_config_failover) | [Next: MoonViT-V2 & Figma MCP](/en/kimi/ch04_moonvit_video_figma)

# Ch.03 Tiered Subagents (`explore / plan / coder`) & Parallel Multi-Agent Refactors

> **Engineering pain solved**: Refactoring 40 files in a single chat fills context with stale stack traces and breaks earlier edits—while uncapped parallel agents immediately trigger `429` rate limits.
>
> **What you ship**: A disciplined `explore → plan → coder` workflow, rate-controlled `/swarm` execution (`KIMI_CODE_AGENT_SWARM_MAX_CONCURRENCY`), and a three-strike loop breaker.
>
> **Bottom line**: Isolate noisy exploration from code editing, freeze shared types before fanning out, and let 90%-discounted prefix caching multiply swarm ROI.

---

## 3.1 Separating `explore`, `plan`, and `coder`

| Subagent | Permission Scope | Primary Deliverable | Why Context Isolation Matters |
| :--- | :--- | :--- | :--- |
| **`explore`** | Read-only | Symbol map, dependency graph, blast radius | Absorbs raw search noise; returns a concise 1-page map |
| **`plan`** | Zero writes | Phased rollout plan, disjoint directory slices, test commands | Surfaces architectural conflicts before touching source files |
| **`coder`** | Scoped writes + shell tests | Atomic diff + passing test output | Executes cleanly against frozen specs without stale chatter | ```mermaid
flowchart LR
    Req["Large Refactor Goal"] --> Exp["explore (Read-only repo scan)"]
    Exp -->|"Compact dependency map"| Plan["plan (Disjoint slices + assertions)"]
    Plan -->|"Human sign-off"| Swarm["/swarm (MAX_CONCURRENCY=4)"]
    Swarm --> C1["coder-1: Module A"]
    Swarm --> C2["coder-2: Module B"]
    Swarm --> C3["coder-3: Tests & Types"]
    C1 --> Merge["Full Build & Regression Gate"]
    C2 --> Merge
    C3 --> Merge
```

---

## 3.2 Throttled `/swarm` Execution & Cached-Prefix Economics

Cap parallel workers explicitly to avoid `429` storms while keeping all workers hitting the same **\$0.20/1M cached prefix** (`AGENTS.md` + frozen shared interfaces):

```bash
KIMI_CODE_AGENT_SWARM_MAX_CONCURRENCY=4 kimi
```

```markdown
/swarm Execute the approved design-token migration plan across disjoint slices:
- Shared contract `src/shared/tokens.ts` is frozen (read-only for all coders).
- Slice 1 (`src/features/auth/**`): Replace legacy hex values and add Vitest coverage.
- Slice 2 (`src/features/billing/**`): Migrate to typed SDK client and pass mock integration tests.
- Slice 3 (`src/features/dashboard/**`): Align chart tokens with zero TypeScript errors.
- Halt after 3 consecutive identical test failures and report root cause; never weaken assertions.
```

---

## 3.3 Three-Strike Loop Protection

Enforce three guardrails in `AGENTS.md` and `config.toml`:
1. State root-cause hypothesis before every retry;
2. Hard-stop after `max_retries_per_error = 3` on the same failure;
3. Forbid `@ts-ignore`, `.skip()`, or `|| true` workarounds to fake green CI.

---

## 3-Step Quickstart

1. **Practice the 3-step handoff**: Run `explore → plan → coder` sequentially on one medium PR.
2. **Launch a 2-slice swarm**: Run `KIMI_CODE_AGENT_SWARM_MAX_CONCURRENCY=2 kimi` on two non-overlapping directories and inspect `git diff --stat`.
3. **Run unified verification**: Finish with `npm run typecheck && npm test && npm run build`.

---

## Pitfall Recovery Table

| Failure Mode | Root Cause | Immediate Fix |
| :--- | :--- | :--- |
| Swarm workers flood `429 Too Many Requests` | Uncapped concurrency exceeds account RPM/TPM | Set `KIMI_CODE_AGENT_SWARM_MAX_CONCURRENCY=2` or `3` and batch slices |
| Worker deletes failing unit tests to pass | Test diff not audited and weakening assertions not explicitly forbidden | Audit `git diff -- '*.test.*' '*.spec.*'` and reject skipped assertions |
| Slices pass locally but fail combined build | Shared exports changed mid-swarm without freezing contracts | Freeze shared types on base branch first, then run repo-wide `tsc --noEmit` | ---

[Back to Kimi Hub](/en/kimi/) | [Prev: config.toml & kimi acp](/en/kimi/ch02_acp_config_failover) | [Next: MoonViT-V2 & Figma MCP](/en/kimi/ch04_moonvit_video_figma)
