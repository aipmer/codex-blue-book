# Gemini Antigravity Starter Kit

Companion runnable kit for **Gemini Practical Blue Book (v1.0.0)** on [book.pmer.cn/gemini/](https://book.pmer.cn/gemini/).

## What Is Inside

- `AGENTS.md`: Root workspace contract for Antigravity IDE, `agy` CLI, and `/swarm` workers.
- `.agents/rules/ui-multimodal.md`: Path-scoped rule enforcing 12px minimum readable typography, 3-viewport zero-overflow checks, and raw-vs-runtime media separation.
- `.agents/skills/visual-audit/SKILL.md`: On-demand Antigravity skill for repeatable responsive UI inspection.
- `scripts/check_gemini_quota.mjs`: Zero-dependency Node.js budget gate for Gemini 4 (`carbon` / `argon` / `neon` / `hydrogen`) including cached input discounts, video frame token estimation (1 FPS), and the December 1, 2026 Argon price step-up check.

## Quick Verification

```bash
# 1. Estimate a Neon + Hydrogen mixed batch against a $5 ceiling
node scripts/check_gemini_quota.mjs --model gemini-4-hydrogen --input-tokens 800000 --cached-tokens 400000 --output-tokens 120000 --budget 5

# 2. Simulate an Argon run after December 1, 2026 ($4/$20 standard rate)
node scripts/check_gemini_quota.mjs --model gemini-4-argon --date 2026-12-05 --input-tokens 900000 --output-tokens 150000 --budget 5
```

Copy `AGENTS.md` and `.agents/` into your repository root to activate the rules and skill immediately in Google Antigravity or `agy` CLI.
