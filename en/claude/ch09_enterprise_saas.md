---
title: "Ch.09 Enterprise ToB SaaS: Prompt-Cached Auditing & Agent SDK | Claude Blue Book"
description: "Build high-margin B2B code auditing and document intelligence SaaS using Claude 5.5 1M context, Prompt Caching, Claude Agent SDK, and strict JSON citations."
lastUpdated: 2026-11-26
---

[ 🏠 Home ](/en/) | [ ⬅️ Prev (Ch.08) ](./ch08_ship_pr_steward.md) | [ ➡️ Next (Ch.10) ](./ch10_frontier_cowork_critique.md) | [ 🌐 中文版 ](/claude/ch09_enterprise_saas)

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

[ 🏠 Home ](/en/) | [ ⬅️ Prev (Ch.08) ](./ch08_ship_pr_steward.md) | [ ➡️ Next (Ch.10) ](./ch10_frontier_cowork_critique.md) | [ 🌐 中文版 ](/claude/ch09_enterprise_saas)
