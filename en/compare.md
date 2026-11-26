---
title: "2026 AI Coding Agents Comparison: Codex vs Claude Code vs Gemini Antigravity vs Kimi Code"
description: "Verified November 26, 2026: side-by-side comparison of OpenAI Codex (GPT-6.2), Claude Code (Claude 5.5), Google Antigravity (Gemini 4), and Kimi Code (K3.1 Pro) pricing, primitives, and fit."
lastUpdated: 2026-11-26
---

# 2026 AI Coding Agents Comparison: Codex vs Claude Code vs Gemini Antigravity vs Kimi Code

> **Bottom line (verified November 26, 2026)**: No single coding agent dominates every workflow. Choose **OpenAI Codex** for solo 0-to-1 full-stack MVPs and mobile approvals; **Claude Code** for large legacy refactors, `/design` canvases, and deterministic Hooks/`/ship` pipelines; **Google Antigravity (Gemini 4)** for multimodal products wired into AI Studio, Workspace, and Colab; and **Kimi Code (K3.1 Pro)** for open-weight self-hosting, ACP IDE integration, regulated verticals (finance/legal/medical), Slides, and 3D spatial coding.

---

## 1. Side-by-Side Matrix (November 2026 Baseline)

| Dimension | OpenAI Codex | Claude Code | Google Antigravity (Gemini) | Kimi Code |
| :--- | :--- | :--- | :--- | :--- |
| **Latest Flagship Models** | GPT-6.2 Astra / Sol · GPT-6.1 Terra · GPT-6 Luna | Claude 5.5 (Opus / Sonnet / Haiku) · Fable 5.2 | Gemini 4 (Carbon / Argon / Neon / Hydrogen) | Kimi K3.1 Pro (2.8T–3T MoE) · K3 · K2.5 |
| **Context Window** | 1.05M (922K input / 128K output) | 1M (128K output) | 1M unified | 1M native (Gated DSA sparse attention) |
| **Primary Surfaces** | CLI `0.172.0` · ChatGPT Desktop Code Mode | Claude Code v2.1.323+ · Whiteboards · `/design` | Antigravity 2.x IDE · `agy` CLI · AI Studio | `kimi` TUI · `kimi web` · `kimi acp` |
| **Project Rules Spec** | `AGENTS.md` + `~/.codex/config.toml` | `CLAUDE.md` + `.claude/settings.json` | `AGENTS.md` + `.agents/rules/` | `AGENTS.md` + `~/.kimi-code/config.toml` |
| **Multi-Agent Support** | Ultra UI subagents · Thread links | Isolated Subagents · Code Mode JS orchestration | `/swarm` (Git worktrees + adversarial verifiers) | `explore/plan/coder` subagents · `/swarm` |
| **Visual & Design Stack** | Desktop Computer Use + GPT-6.1 Terra | `/design` live HTML/JS artboards + Whiteboards | Built-in browser QA + native image gen + Live API | MoonViT-V2 video debugging + Figma MCP + 3D Make |
| **Signature Ecosystem Edge** | Feishu Assistant approvals · Sites preview · Bedrock | Deterministic Hooks · `/ship` PR Steward · MCP Skills | AI Studio context-preserving export · Workspace MCP · Colab `%%agy` | ACP for Zed/JetBrains · Open weights · Kimi Slides |
| **Blue Book Guide** | [Codex Blue Book v1.5.0 (Live)](/en/codex/) | [Claude Blue Book v1.0.0 (Live)](/en/claude/) | [Gemini Blue Book v1.0.0 (Live)](/en/gemini/) | [Kimi Blue Book v1.0.0 (Live)](/en/kimi/) |

---

## 2. Standard API Text Pricing Reference (Per 1M Tokens, Nov 26, 2026)

> Subscription plan quotas (ChatGPT Plus/Pro, Claude Pro/Max, Google AI Pro/Ultra) are billed separately from raw API token rates. Verify long-context and speed multipliers against each vendor's pricing page.

| Provider / Model | Input (/1M) | Cached Read (/1M) | Output (/1M) | Best Tier Fit |
| :--- | ---: | ---: | ---: | :--- |
| OpenAI `gpt-6.2-astra` | $8.00 | $0.40 | $40.00 | Hardest architecture & verification |
| OpenAI `gpt-6.2-sol` | $2.00 | $0.10 | $10.00 | Everyday complex coding |
| OpenAI `gpt-6.1-terra` | $1.00 | $0.05 | $5.00 | Visual reasoning & Computer Use |
| OpenAI `gpt-6-luna` | $0.10 | $0.01 | $0.50 | Fast routing & extraction |
| Anthropic `Claude Fable 5.2` | $8.00 | Discounted | $40.00 | Frontier architecture & reasoning |
| Anthropic `Claude Opus 5.5` | $4.00 | Ultra-low read | $20.00 | Heavy engineering & long refactors |
| Anthropic `Claude Sonnet 5.5` | $2.00 | Ultra-low read | $10.00 | Fast everyday coding |
| Anthropic `Claude Haiku 5.5` | $0.10 | Ultra-low read | $0.50 | Lightweight subagents & batching |
| Moonshot `Kimi K3.1 Pro` | \$2.00 | \$0.20 (90% off) | \$10.00 | Full-stack / 3D / finance + 2.8T MoE open weights |
| Google `gemini-4-argon` / `carbon` | \$2.00 (Argon \$4.00 Dec 1) | \$0.10 (\$0.20) | \$10.00 (\$20.00) | Frontier reasoning & deep debugging |
| Google `gemini-4-neon` | \$3.00 | \$0.15 | \$15.00 | Default Orchestrator & complex coding |
| Google `gemini-4-hydrogen` | \$1.50 | Discounted | \$7.50 | Flat 1M rapid execution & swarm workers |

---

## 3. Decision Shortcuts by Workflow

1. **Solo builder shipping web/mobile MVPs with mobile remote approvals**  
   → Start with **[Codex Blue Book](/en/codex/)**, paired with [Codex Switch](https://github.com/aipmer/codex-switch) to fail over to Kimi Code or DeepSeek without losing thread history.
2. **Large legacy codebase governance, strict Hooks, and canvas-to-code delivery**  
   → Follow **[Claude Blue Book](/en/claude/)** (`CLAUDE.md` + `Hooks` + `/design` + `/ship`).
3. **Multimodal apps (vision/audio/video), Chrome extensions, and Workspace/Colab pipelines**  
   → Follow **[Gemini Blue Book](/en/gemini/)** (AI Studio → Antigravity `/swarm` → Workspace MCP).
4. **Finance/legal/medical 1M-token analysis, native `.pptx` decks, Blender/FreeCAD 3D, or offline open weights**  
   → Follow **[Kimi Blue Book](/en/kimi/)** (`K3.1 Pro` + `kimi acp`).

---

## 4. Frequently Asked Questions (FAQ)

### Q1: Do I need four separate rule files for the same repository?
No. Maintain shared boundaries once in root **`AGENTS.md`**: Codex, Antigravity, and Kimi Code read it natively, while Claude Code reuses it via a one-line `@AGENTS.md` inside `CLAUDE.md`. Add tool-specific Hooks or `config.toml` only where needed using the [Multi-Agent Rules Generator](/en/generator).

### Q2: How do I avoid hitting single-vendor rate limits during heavy refactors?
Combine smart routing with failover: enable Antigravity's Orchestrator (planning with Carbon, executing with Hydrogen), or use [Codex Switch](https://github.com/aipmer/codex-switch) to switch providers mid-session while keeping conversation history intact.

### Q3: Which late-2026 retirements require immediate migration?
For OpenAI users: **`/v1/prompts`** and **Agent Builder** deprecate and **Evals** becomes read-only on **November 30, 2026**; **`GPT-5.6 Sol` and `GPT-5.6 Terra`** retire from ChatGPT Work and Codex on **December 23, 2026**. Migrate configs to `gpt-6.2-sol` or `gpt-6.1-terra` (see [Codex Ch.13](/en/ch13_2026_frontier)).
